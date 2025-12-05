const client = require("../database/connection");
const bcrypt = require('bcrypt');
const addUser = async (req, res)=>{
    try {
        
        const {name, address, email, password, role} = req.body;
        
        if(!name || !email || !password || !role){
            return res.status(400).json({ message: "All fields are required" });
        }

        const validRoles = ["ADMIN", "USER", "OWNER"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
        
        const exist = await client.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        
        if(exist.rows.length > 0) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const hash = await bcrypt.hash(password, 10);

        await client.query(
            "INSERT INTO users (name, email, address, password, role) VALUES ($1, $2, $3, $4, $5)",
            [name, email, address, hash, role]
        )

        res.json({message: 'User Created Succesfully'})
    } catch (error) {
        res.status(500).json({message: 'Error in user adding', error: error.message});
    }
    
}

const getDashboard = async (req, res)=>{
    try {
        const totalUsers = await client.query('SELECT count(*) FROM users')
        const totalStores = await client.query('SELECT count(*) FROM stores')
        const totalRatings = await client.query('SELECT count(*) FROM ratings')

        res.json({
            totalUsers: totalUsers.rows[0].count,
            totalStores: totalStores.rows[0].count,
            totalRatings: totalRatings.rows[0].count
        })
    } catch (error) {
        res.json({message: 'Dashboard Error', error: error.message})
    }
}

getUsers = async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      address = "",
      role = "",
      sort = "",
      order = "asc"
    } = req.query;

    let query = `
      SELECT id, name, email, address, role
      FROM users
      WHERE 1=1
    `;

    let params = [];


    if (name) {
      params.push(`%${name}%`);
      query += ` AND name ILIKE $${params.length}`;
    }

    if (email) {
      params.push(`%${email}%`);
      query += ` AND email ILIKE $${params.length}`;
    }

    if (address) {
      params.push(`%${address}%`);
      query += ` AND address ILIKE $${params.length}`;
    }

    if (role) {
      params.push(role);
      query += ` AND role = $${params.length}`;
    }


    const validSortFields = ["name", "email", "address", "role"];

    if (validSortFields.includes(sort)) {
      query += ` ORDER BY ${sort} ${order.toUpperCase()}`;
    }

    const result = await client.query(query, params);
    res.json(result.rows);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};


const getUserById = async (req, res)=> {
    try {
        const userId = req.params.id;

        const userResult = await client.query(
            "SELECT id, name, email, address, role FROM users WHERE id = $1",
            [userId]
        )

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = userResult.rows[0]



        if (user.role === "OWNER") {
            const store = await client.query(
                "SELECT id, name FROM stores WHERE owner_id = $1",
                [userId]
            );

            if (store.rows.length > 0) {
                const storeId = store.rows[0].id;

                const avgRating = await client.query(
                    "SELECT AVG(rating_value) AS avg FROM ratings WHERE store_id = $1",
                    [storeId]
                )

                user.store_name = store.rows[0].name;
                user.store_rating = avgRating.rows[0].avg 
                    ? Number(avgRating.rows[0].avg).toFixed(1) 
                    : null;
            }
        }
        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching user details",
            error: error.message
        })
    }
}



module.exports = {addUser, getDashboard, getUsers, getUserById}
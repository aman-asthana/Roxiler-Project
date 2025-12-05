const client = require("../database/connection")

const getStores = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name = "",
      address = "",
      sort = "",
      order = "asc"
    } = req.query;

    let query = `
      SELECT 
        s.id,
        s.name,
        s.email,
        s.address,
        COALESCE(AVG(r.rating_value), 0) AS overall_rating,
        (
          SELECT rating_value 
          FROM ratings 
          WHERE store_id = s.id AND user_id = $1
        ) AS user_rating

      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE 1 = 1
    `;

    let params = [userId]; 

    if (name) {
      params.push(`%${name}%`);
      query += ` AND s.name ILIKE $${params.length}`;
    }

    if (address) {
      params.push(`%${address}%`);
      query += ` AND s.address ILIKE $${params.length}`;
    }

    query += ` GROUP BY s.id `;

    const validFields = ["name", "email", "address", "rating"];

    if (validFields.includes(sort)) {
      if (sort === "rating") {
        query += ` ORDER BY overall_rating ${order.toUpperCase()}`;
      } else {
        query += ` ORDER BY s.${sort} ${order.toUpperCase()}`;
      }
    }

    const result = await client.query(query, params);

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching stores",
      error: error.message,
    });
  }
};



const addStore = async (req, res) => {
    try {
        const{name, email, address, owner_id} = req.body;

        if (!name || !email || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const exist = await client.query(
            'SELECT * FROM stores WHERE email = $1',
            [email]
        )
        
        if (exist.rows.length > 0) {
            return res.status(400).json({ message: "Store already exists with this email" });
        }

        if (owner_id) {
            const owner = await client.query(
                "SELECT * FROM users WHERE id = $1 AND role = 'OWNER'",
                [owner_id]
            );

            if (owner.rows.length === 0) {
                return res.status(400).json({ message: "Invalid owner ID" });
            }
        }
    
        await client.query(
            "INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4)",
            [name, email, address, owner_id || null]
        );

        res.json({ message: "Store added successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error adding store", error: error.message });
    }
}

module.exports = {getStores, addStore}

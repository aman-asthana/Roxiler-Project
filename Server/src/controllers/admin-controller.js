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
module.exports = {addUser}
const client = require('../database/connection')
require('dotenv').config
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res)=>{

    try {

        
        const {name, email, password, address} = req.body;
        
        if (!name || name.length < 20 || name.length > 60) {
            return res.status(400).json({ message: "Name must be 20–60 characters." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        if (!address || address.length > 400) {
            return res.status(400).json({ message: "Address max length is 400 characters." });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    message: "Password must be 8–16 chars, 1 uppercase, 1 special character."
                });
            }


        const exist = await client.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if(exist.rows.length > 0){
            return res.status(400).json({message: 'User already exist'})
        }

        const hashCode = await bcrypt.hash(password, 10);

        await client.query(
            'INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4)',
            [name, email, hashCode, address]
        )
        res.json({message : 'Signup succesfull'})
    } catch (error) {
        res.status(500).json({message: 'Error in signup', error: error.message})
    }
}

const login = async (req, res)=>{
    try {
        const {email, password} = req.body;

        const exist = await client.query(
            "SELECT * from users WHERE email = $1",
            [email]
        )

        if(exist.rows.length === 0){
            return res.status(400).json({message: "Invalid Email or Password"})
        }
        
        const user = exist.rows[0];
        const userVerify = await bcrypt.compare(password, user.password);
        
        if(!userVerify){
            return res.status(500).json({message: "Invalid Email or Password"})
        }

        const token = jwt.sign(
            {
                id : user.id,
                role : user.role
            },
            process.env.SECRET_KEY,
            {
                expiresIn : '1d'
            }
        )
        res.json({message: "Login succesfull", token})
    } catch (error) {
        res.status(500).json({message: "Login Error", error: error.message})
    }

}
    module.exports = {signup, login}

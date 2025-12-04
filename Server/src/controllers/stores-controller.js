const client = require("../database/connection")

const getStores = async (req, res) =>{
    try {
        const userId = req.user.id;
        const {name, address} = req.query
        let query = "SELECT * FROM stores WHERE 1=1";
        let params = [];

        if (name) {
            params.push(`%${name}%`);
            query += ` AND name ILIKE $${params.length}`;
        }
        if(address){
            params.push(`%${address}%`);
            query += ` And address ILIKE $${params.length}`
        }

        const result = await client.query(query, params)
        const stores = result.rows;

        const lastResponse = [];

        for (let store of stores) {
            const overall = await client.query(
                "SELECT AVG(rating_value) AS avg FROM ratings WHERE store_id = $1",
                [store.id]
            );


            const userRate = await client.query(
                "SELECT rating_value FROM ratings WHERE store_id = $1 AND user_id = $2",
                [store.id, userId]
            );

            lastResponse.push({
                id: store.id,
                name: store.name,
                email: store.email,
                address: store.address,
                owner_id: store.owner_id,
                overall_rating: overall.rows[0].avg ? Number(overall.rows[0].avg).toFixed(1) : null,
                user_rating: userRate.rows.length > 0 ? userRate.rows[0].rating_value : null
            })
        }

        res.json(lastResponse)

        res.json(result.rows)

    } catch (error) {
        res.status(500).json({ message: "Error fetching stores", error: error.message })
    }
}


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

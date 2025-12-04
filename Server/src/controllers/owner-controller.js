const client = require('../database/connection');

const getOwnerDashboard = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const storeResult = await client.query(
            "SELECT id, name FROM stores WHERE owner_id = $1",
            [ownerId]
        )

        if (storeResult.rows.length === 0) {
            return res.status(404).json({ message: "No store assigned to this owner" })
        }

        const store = storeResult.rows[0];


        const avgResult = await client.query(
            "SELECT AVG(rating_value) AS avg, COUNT(*) AS count FROM ratings WHERE store_id = $1",
            [store.id]
        )

        const avg = avgResult.rows[0].avg 
            ? Number(avgResult.rows[0].avg).toFixed(1) 
            : null;

        const count = avgResult.rows[0].count;

        

        const userRatings = await client.query(
            `SELECT 
                r.rating_value,
                u.name, 
                u.email 
            FROM ratings r
            JOIN users u ON r.user_id = u.id
            WHERE r.store_id = $1`,
            [store.id]
        )

        res.json({
            store_id: store.id,
            store_name: store.name,
            average_rating: avg,
            total_ratings: count,
            rated_users: userRatings.rows
        })

    } catch (error) {
        res.status(500).json({
            message: "Owner dashboard fetch error",
            error: error.message
        })
    }
}

module.exports = { getOwnerDashboard }

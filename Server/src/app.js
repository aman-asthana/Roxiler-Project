const express = require('express');
const app = express();

//middlewares
app.use(express.json());


//Routes
const auth = require('./routes/auth-routes')
app.use('/auth', auth)

const userRoutes = require('./routes/users-routes');
app.use('/users', userRoutes);

const storeRoutes = require('./routes/stores-routes')
app.use('/stores', storeRoutes)

const adminRoutes = require('./routes/admin-routes')
app.use('/admin', adminRoutes)

module.exports = app;
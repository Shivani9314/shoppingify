const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './server/.env') });

const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const categoryRoutes = require('./routes/categoryRoutes');
const itemsRoutes = require('./routes/itemsRoutes');
const listRoutes = require('./routes/listRoutes');
const userRoutes = require('./routes/userRoutes');
const listItemsRoutes = require('./routes/listItemRoutes');
const shoppingHistoryRoutes = require('./routes/shoppingHistoryRoutes');
const cors = require('cors');

sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://shoppingify-steel.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/users', userRoutes); 
app.use('/category', categoryRoutes); 
app.use('/items', itemsRoutes); 
app.use('/list', listRoutes); 
app.use('/list-items', listItemsRoutes); 
app.use('/shopping-history', shoppingHistoryRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

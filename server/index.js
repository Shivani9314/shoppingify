const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const categoryRoutes = require('./routes/categoryRoutes');
const itemsRoutes = require('./routes/itemsRoutes');
const listRoutes = require('./routes/listRoutes');
const userRoutes = require('./routes/userRoutes')
const listItemsRoutes = require('./routes/listItemRoutes');
const shoppingHistoryRoutes = require('./routes/shoppingHistoryRoutes');
const db = require('./models');
const cors = require('cors');

db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });


const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
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
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

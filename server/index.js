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

db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });


const app = express();
app.use(bodyParser.json());

app.use('', userRoutes);
app.use('/category', categoryRoutes);
app.use('/categories' , itemsRoutes);
app.use('/list', listRoutes);
app.use('', listItemsRoutes)
app.use('' , shoppingHistoryRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

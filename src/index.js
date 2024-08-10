const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Импорт маршрутов
const countryRoutes = require('./routes/countryRoutes');
const regionRoutes = require('./routes/regionRoutes');
const cityRoutes = require('./routes/cityRoutes');
const districtRoutes = require('./routes/districtRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const postRoutes = require('./routes/postRoutes');
const animalSpeciesRoutes = require('./routes/animalSpeciesRoutes');
const breedRoutes = require('./routes/breedRoutes');
const animalRoutes = require('./routes/animalRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Swagger документация
const setupSwagger = require('./swagger');
setupSwagger(app);

// Использование маршрутов
app.use('/api/countries', countryRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/animalspecies', animalSpeciesRoutes);
app.use('/api/breeds', breedRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api', searchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

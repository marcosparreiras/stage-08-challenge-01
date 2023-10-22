require('express-async-errors');
const express = require('express');
const routes = require('./routes');
const runMigrations = require('./database/sqlite/migrations');
const AppError = require('./utils/AppError');

const PORT = 3000;
runMigrations();
const app = express();

app.use(express.json());
app.use(routes);

app.use((error, _req, res, _next) => {
    if (error instanceof AppError) {
        return res
            .status(error.statusCode)
            .json({ message: error.errorMessage });
    }
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running o port ${PORT}`);
});

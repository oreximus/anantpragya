'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

// Read all models files
const files = fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
});

module.exports = files;

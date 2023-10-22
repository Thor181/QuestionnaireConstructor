const path = require('path');

module.exports = {
    entry: 'wwwroot/js/blocks/**',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
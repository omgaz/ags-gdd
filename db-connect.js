exports = mongoose = require('mongoose');
mongoose.connect(config[process.env.NODE_ENV || "development"].db.uri);
exports = Schema = mongoose.Schema;
const mongoose = require('mongoose');

const modulesmadeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    moduleID: { type: String, required: true },
    type: { type: String, required: true }
});

module.exports = mongoose.model('Modulesmade', modulesmadeSchema);
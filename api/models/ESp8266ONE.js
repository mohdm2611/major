const mongoose = require('mongoose');

const esp8266oneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    moduleID: { type: String, required: true },
    mappedTo: { type: String, required: true},
    value: { type: String, required: true},
    datetime: { type: String, required: true}
});

module.exports = mongoose.model('esp8266one', esp8266oneSchema);
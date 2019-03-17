const mongoose = require('mongoose');

const modulesoverflowSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    moduleID: { type: String, required: true },
    time: { type: String, required: true },
    value: { type: String, required: true },
    lat: { type: String, required: true},
    lng: { type: String, required: true}
});

module.exports = mongoose.model('Modulesoverflow', modulesoverflowSchema);
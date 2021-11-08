const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const areaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: 'cities', required: true },
});

const Area = mongoose.model('areas', areaSchema);

module.exports = Area;
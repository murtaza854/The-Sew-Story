const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const stateSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

stateSchema.virtual('cities', {
    ref: 'cities',
    localField: '_id',
    foreignField: 'state',
    justOne: false,
});

stateSchema.set('toObject', { virtuals: true });
stateSchema.set('toJSON', { virtuals: true });

const State = mongoose.model('states', stateSchema);

module.exports = State;
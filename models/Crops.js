const mongoose = require('mongoose')
const validator = require('validator')

const cropSchema = new mongoose.Schema({
    cropId: {
        type: String,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    owner: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    cropResId: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {
    collection: 'crops'
})

const cropModel = mongoose.model('crop', cropSchema);

module.exports = {
    cropModel,
    cropSchema
}
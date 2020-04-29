const mongoose = require('mongoose')
const validator = require('validator')

const cropSchema = new mongoose.Schema({
    cropId: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    owner: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    }
}, {
    collection: 'crops'
})

const cropModel = mongoose.model('crop', cropSchema);

module.exports = {
    cropModel,
    cropSchema
}
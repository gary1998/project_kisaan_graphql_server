const mongoose = require('mongoose')
const validator = require('validator')

const fieldSchema = new mongoose.Schema({
    fieldId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
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
    location: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
        },
        coordinates: {
            type: [[[Number]]],
            required: true
        }

    }
}, {
    collection: 'fields'
})

const fieldModel = mongoose.model('field', fieldSchema);

module.exports = {
    fieldModel,
    fieldSchema
}
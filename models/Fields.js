const mongoose = require('mongoose')
const validator = require('validator')

const fieldSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    data: {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        geo_json: {
            type: {
                type: String,
                enum: ['FeatureCollection'],
                required: true
            },
            features: [{
                type: {
                    type: String,
                    enum: ['Feature'],
                    required: true,
                },
                properties: {
                    type: mongoose.Schema.Types.Mixed,
                    required: true,
                    default: {}
                },
                geometry: {
                    type: {
                        type: String,
                        enum: ['Polygon'],
                        required: true,
                    },
                    coordinates: {
                        type: [[[Number]]]
                    }
                }
            }],
            coordinates: {
                type: [[[Number]]],
                required: true
            }
        }
    },
    fieldResId: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {
    minimize: false,
    collection: 'fields'
})

const fieldModel = mongoose.model('field', fieldSchema);

module.exports = {
    fieldModel,
    fieldSchema
}
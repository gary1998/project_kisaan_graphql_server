const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        trim: true,
        required: false
    },
    gender: {
        type: String,
        trim: true,
        enum: ['male', 'female', 'others'],
        required: false
    },
    location: {
        latitude: {
            type: Number,
            trim: true,
            required: true
        },
        longitude: {
            type: Number,
            trim: true,
            required: true
        }
    },
    photo: {
        type: String,
        trim: true,
        required: false
    },
    updated: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'users'
})

const userModel = mongoose.model('user', userSchema);

module.exports = {
    userModel,
    userSchema
}
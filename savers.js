const { userModel } = require ('./models/Users');
const { fieldModel } = require('./models/Fields');
const { cropModel } = require('./models/Crops');
const winston = require('./winston');
const logger = winston.initLogger("saver");

const saveUser = (data) => {
    return new Promise((resolve, reject) => {
        new userModel(data).save((err, user) => {
            if(err) {
                logger.error(`error while saving new USER: ${err}`);
                reject(err);
            } else {
                logger.info(`new USER saved: ${user.email}`);
                resolve(user);
            }
        });
    })
}

const saveField = (data) => {
    return new Promise((resolve, reject) => {
        new fieldModel(data).save((err, field) => {
            if(err) {
                logger.error(`error while saving new FIELD: ${err}`);
                reject(err);
            } else {
                logger.info(`new FIELD saved: ${field.fieldId}`);
                resolve(field);
            }
        });
    })
}

const saveCrop = (data) => {
    return new Promise((resolve, reject) => {
        new cropModel(data).save((err, crop) => {
            if(err) {
                logger.error(`error while saving new CROP: ${err}`);
                reject(err);
            } else {
                logger.info(`new CROP saved: ${crop.cropId}`);
                resolve(crop);
            }
        });
    })
}

module.exports = {
    saveCrop,
    saveField,
    saveUser
}
var { userModel } = require ('./models/Users');
var { fieldModel } = require('./models/Fields');
var { cropModel } = require('./models/Crops');
const winston = require('./winston');
const logger = winston.initLogger("remover");

const deleteUser = (data) => {
    return new Promise((resolve, reject) => {
        userModel.deleteOne({email: data.email}, err => {
            if(err){
                logger.error(`error while removing USER: ${err}`);
                reject(err);
            } else {
                logger.info(`USER removed: ${data.email}`);
                resolve(`USER removed: ${data.email}`);
            }
        });
    });
}

const deleteField = (fieldId) => {
    return new Promise((resolve, reject) => {
        fieldModel.deleteOne({fieldId}, err => {
            if(err){
                logger.error(`error while removing FIELD: ${err}`);
                reject(err);
            } else {
                logger.info(`FIELD removed: ${fieldId}`);
                resolve(`FIELD removed: ${fieldId}`);
            }
        });
    });
}

const deleteCrop = (cropId) => {
    return new Promise((resolve, reject) => {
        cropModel.deleteOne({cropId}, err => {
            if(err){
                logger.error(`error while removing CROP: ${err}`);
                reject(err);
            } else {
                logger.info(`CROP removed: ${cropId}`);
                resolve(`CROP removed: ${cropId}`);
            }
        });
    });
}

module.exports = {
    deleteUser,
    deleteField,
    deleteCrop
}
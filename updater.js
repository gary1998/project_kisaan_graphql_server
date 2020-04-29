var { userModel } = require ('./models/Users');
var { fieldModel } = require('./models/Fields');
var { cropModel } = require('./models/Crops');
const winston = require('./winston');
const logger = winston.initLogger("updater");

const editUser = (data) => {
    return new Promise((resolve, reject) => {
        userModel.updateOne({email: data.email}, data, (err, _) => {
            if(err){
                logger.error(`error while updating USER: ${err}`);
                reject(err);
            } else {
                logger.info(`updated USER: ${data.email}`);
                resolve(`updated USER: ${data.email}`);
            }
        });
    });
}

const editField = (data) => {
    return new Promise((resolve, reject) => {
        fieldModel.updateOne({fieldResId}, data, (err, _) => {
            if(err){
                logger.error(`error while updating FIELD: ${err}`);
                reject(err);
            } else {
                logger.info(`updated FIELD: ${data.fieldResId}`);
                resolve(`updated FIELD: ${data.fieldResId}`);
            }
        });
    });
}

const editCrop = (data) => {
    return new Promise((resolve, reject) => {
        cropModel.updateOne({cropResId}, data, (err, _) => {
            if(err){
                logger.error(`error while updating CROP: ${err}`);
                reject(err);
            } else {
                logger.info(`updated CROP: ${data.cropResId}`);
                resolve(`updated CROP: ${data.cropResId}`);
            }
        });
    });
}

module.exports = {
    editUser,
    editField,
    editCrop
}
var { userModel } = require ('./models/Users');
var { fieldModel } = require('./models/Fields');
var { cropModel } = require('./models/Crops');

const loginUser = (data) => {
    return new Promise((resolve, reject) => {
        userModel.findOne(data, (err, user) => {
            if(err){
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
}

const getUsers = () => {
    return new Promise((resolve, reject) => {
        userModel.find({}, (err, users) => {
            if(err){
                reject(err);
            } else {
                resolve(users);
            }
        });
    });
}

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({email}, (err, user) => {
            if(err){
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

const getUserByFieldId = (fieldId) => {
    return new Promise((resolve, reject) => {
        fieldModel.findOne({fieldId}, (err, field) => {
            if(err){
                reject(err);
            } else if(field){
                getUserByEmail(field.owner.email).then(user => {
                    resolve(user);
                }).catch(err => {
                    reject(err);
                });
            } else {
                resolve(null);
            }
        });
    });
}

const getUserByCropId = (cropId) => {
    return new Promise((resolve, reject) => {
        cropModel.findOne({cropId}, (err, crop) => {
            if(err){
                reject(err);
            } else if(crop){
                getUserByEmail(crop.owner.email).then(user => {
                    resolve(user);
                }).catch(err => {
                    reject(err);
                })
            } else {
                resolve(null);
            }
        });
    });
}

const getFields = () => {
    return new Promise((resolve, reject) => {
        fieldModel.find({}, (err, success) => {
            if(err){
                reject(err);
            } else {
                resolve(success);
            }
        });
    });
}

const getFieldByFieldId = (fieldId) => {
    return new Promise((resolve, reject) => {
        fieldModel.findOne({fieldId}, (err, field) => {
            if(err){
                reject(err);
            } else {
                resolve(field);
            }
        });
    });
}

const getFieldsByUserEmail = (email) => {
    return new Promise((resolve, reject) => {
        fieldModel.find({"owner.email": email}, (err, fields) => {
            if(err){
                reject(err);
            } else {
                resolve(fields);
            }
        });
    });
}

const getCrops = () => {
    return new Promise((resolve, reject) => {
        cropModel.find({}, (err, success) => {
            if(err){
                reject(err);
            } else {
                resolve(success);
            }
        });
    });
}

const getCropByCropId = (cropId) => {
    return new Promise((resolve, reject) => {
        fieldModel.findOne({cropId}, (err, crop) => {
            if(err){
                reject(err);
            } else {
                resolve(crop);
            }
        });
    });
}

const getCropsByUserEmail = (email) => {
    return new Promise((resolve, reject) => {
        cropModel.find({"owner.email": email}, (err, fields) => {
            if(err){
                reject(err);
            } else {
                resolve(fields);
            }
        });
    });
}

module.exports = {
    loginUser,
    getUsers,
    getUserByEmail,
    getUserByFieldId,
    getUserByCropId,
    getFields, 
    getFieldByFieldId,
    getFieldsByUserEmail,
    getCrops,
    getCropByCropId,
    getCropsByUserEmail
}
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

const getUserByFieldResId = (fieldResId) => {
    return new Promise((resolve, reject) => {
        fieldModel.findOne({fieldResId}, (err, field) => {
            if(err){
                reject(err);
            } else if(field){
                getUserByEmail(field.owner).then(user => {
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

const getUserByCropResId = (cropResId) => {
    return new Promise((resolve, reject) => {
        cropModel.findOne({cropResId}, (err, crop) => {
            if(err){
                reject(err);
            } else if(crop){
                getUserByEmail(crop.owner).then(user => {
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

const getFieldByFieldResId = (fieldResId) => {
    return new Promise((resolve, reject) => {
        fieldModel.findOne({fieldResId}, (err, field) => {
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
        fieldModel.find({"owner": email}, (err, fields) => {
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

const getCropByCropResId = (cropResId) => {
    return new Promise((resolve, reject) => {
        fieldModel.findOne({cropResId}, (err, crop) => {
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
        cropModel.find({"owner": email}, (err, fields) => {
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
    getUserByFieldResId,
    getUserByCropResId,
    getFields, 
    getFieldByFieldResId,
    getFieldsByUserEmail,
    getCrops,
    getCropByCropResId,
    getCropsByUserEmail
}
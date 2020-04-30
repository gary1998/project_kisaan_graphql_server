const mongoose = require('mongoose');
const winston = require('./winston');
const logger = winston.initLogger("server");
const express = require('express');
const cors = require('cors');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const { saveUser, saveField, saveCrop } = require('./savers');
const { editUser, editField, editCrop } = require('./updater');
const { deleteUser, deleteField, deleteCrop } = require('./remover');
const { loginUser, getUsers, getUserByEmail, getUserByFieldResId, getUserByCropResId, getFields, getFieldsByUserEmail, getFieldByFieldResId, getCrops, getCropsByUserEmail, getCropByCropResId } = require('./getters'); 
try {
    mongoose.connect('mongodb+srv://gary29198:0001221149@projectkissan-woslg.mongodb.net/dev-db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info("mongoDB server connected!");
} catch(err) {
    logger.error(`error while connecting to mongoDB server: ${err}`);
}
const port = process.env.PORT || 4000;

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type GeoJSONGeometry {
        type: String,
        coordinates: [[[Float]]]
    }
    
    type GeoJSONFeatures {
        type: String,
        geometry: GeoJSONGeometry
    }

    type GeoJSONType {
        type: String,
        features: [GeoJSONFeatures]
    }

    type FieldData {
        name: String,
        geo_json: GeoJSONType
    }
    
    type Location {
        latitude: String,
        longitude: String
    }

    type Field {
        fieldResId: String,
        owner: String,
        data: FieldData
    }

    type Crop {
        cropResId: String,
        cropId: String,
        name: String,
        owner: String
    }

    type User {
        email: String,
        name: String,
        age: Int,
        gender: String,
        location: Location,
        photo: String
        updated: String
    }

    type Query {
        users: [User]
        user(email: String, fieldResId: String, cropResId: String): User
        allFields: [Field]
        fields(email: String): [Field]
        field(fieldResId: String): Field
        allCrops: [Crop]
        crops(email: String): [Crop]
        crop(cropResId: String): Crop
        login(email: String, password: String): User
    }

    input LocationInput {
        latitude: String,
        longitude: String
    }

    input GeoJSONInputGeometry {
        type: String,
        coordinates: [[[Float]]]
    }
    
    input GeoJSONInputFeatures {
        type: String,
        geometry: GeoJSONInputGeometry
    }

    input GeoJSONInputType {
        type: String,
        features: [GeoJSONInputFeatures]
    }

    input FieldInputData {
        name: String,
        geo_json: GeoJSONInputType
    }

    type Mutation {
        createUser(email: String, password: String, name: String, age: Int, gender: String, location: LocationInput, photo: String, updated: String): User
        createField(fieldResId: String, owner: String, data: FieldInputData): Field
        createCrop(cropResId: String, cropId: String, owner: String, name: String): Crop

        updateUser(email: String, password: String, name: String, age: Int, gender: String, location: LocationInput, photo: String, updated: String): String
        updateField(fieldResId: String, owner: String, data: FieldInputData): String
        updateCrop(cropResId: String, cropId: String, owner: String, name: String): String

        removeUser(email: String): String
        removeField(fieldResId: String): String
        removeCrop(cropResId: String): String
    }
`);

// The root provides a resolver function for each API endpoint
var root = {
    user: ({email, fieldResId, cropResId}) => {
        if(email){
            return getUserByEmail(email);
        }
        else if(fieldResId){
            return getUserByFieldResId(fieldResId);
        }
        else if(cropResId){
            return getUserByCropResId(cropResId);
        } else {
            return null;
        }
    },
    users: () => {
        return getUsers();
    },
    field: ({email, fieldResId}) => {
        if(email){
            return getFieldsByUserEmail(email);
        } else if(fieldResId){
            return getFieldByFieldResId(fieldResId);
        } else {
            return null;
        }
    },
    fields: (email) => {
        return getFieldsByUserEmail(email.email);
    },
    allFields: () => {
        return getFields();
    },
    crop: ({email, cropResId}) => {
        if(email){
            return getCropsByUserEmail(email);
        } else if(cropResId){
            return getCropByCropResId(cropResId);
        } else {
            return null;
        }
    },
    crops: (email) => {
        return getCropsByUserEmail(email.email);
    },
    allCrops: () => {
        return getCrops();
    },
    createUser: ({email, password, name, age, gender, photo, location, updated}) => {
        return saveUser({email, password, name, age, gender, photo, location, updated});
    },
    createField: ({fieldResId, owner, data}) => {
        return saveField({fieldResId, owner, data});
    },
    createCrop: ({cropResId, cropId, name, owner}) => {
        return saveCrop({cropResId, cropId, name, owner});
    },
    updateUser: ({email, name, age, gender, photo, location, updated}) => {
        return editUser({email, name, age, gender, photo, location, updated});
    },
    updateField: ({fieldResId, owner, data}) => {
        return editField({fieldResId, owner, data});
    },
    updateCrop: ({cropResId, cropId, name, owner}) => {
        return editCrop({cropResId, cropId, name, owner});
    },
    removeUser: ({email}) => {
        return deleteUser({email});
    },
    removeField: (fieldResId) => {
        return deleteField(fieldResId.fieldResId);
    },
    removeCrop: (cropResId) => {
        return deleteCrop(cropResId.cropResId);
    },
    login: ({email, password}) => {
        return loginUser({email, password});
    }
};

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`); 

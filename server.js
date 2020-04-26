const mongoose = require('mongoose');
const winston = require('./winston');
const logger = winston.initLogger("server");
const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const { saveUser, saveField, saveCrop } = require('./savers');
const { getUsers, getUserByEmail, getUserByFieldId, getUserByCropId, getFields, getFieldsByUserEmail, getFieldByFieldId, getCrops, getCropsByUserEmail, getCropByCropId } = require('./getters'); 
try {
    mongoose.connect('mongodb+srv://gary29198:0001221149@projectkissan-woslg.mongodb.net/dev-db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info("mongoDB server connected!");
} catch(err) {
    logger.error(`error while connecting to mongoDB server: ${err}`);
}
const port = process.env.PORT || 4000;

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Owner {
        email: String
    }

    type GeoJSON {
        type: String,
        coordinates: [[[Int]]]
    }

    type Location {
        latitude: Int,
        longitude: Int
    }

    type Field {
        fieldId: String,
        owner: Owner,
        location: GeoJSON
    }

    type Crop {
        cropId: String,
        name: String,
        owner: Owner
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
        user(email: String, fieldId: String, cropId: String): User
        fields: [Field]
        field(email: String, fieldId: String): Field
        crops: [Crop]
        crop(email: String, cropId: String): Crop
    }

    input LocationInput {
        latitude: Int,
        longitude: Int
    }

    type Mutation {
        createUser(email: String, name: String, age: Int, gender: String, location: LocationInput, photo: String, updated: String): User
    }
`);

// The root provides a resolver function for each API endpoint
var root = {
    user: ({email, fieldId, cropId}) => {
        if(email){
            return getUserByEmail(email);
        }
        else if(fieldId){
            return getUserByFieldId(fieldId);
        }
        else if(cropId){
            return getUserByCropId(cropId);
        } else {
            return null;
        }
    },
    users: () => {
        return getUsers();
    },
    field: ({email, fieldId}) => {
        if(email){
            return getFieldsByUserEmail(email);
        } else if(fieldId){
            return getFieldByFieldId(fieldId);
        } else {
            return null;
        }
    },
    fields: () => {
        return getFields();
    },
    crop: ({email, cropId}) => {
        if(email){
            return getCropsByUserEmail(email);
        } else if(cropId){
            return getCropByCropId(cropId);
        } else {
            return null;
        }
    },
    crops: () => {
        return getCrops();
    },
    createUser: ({email, name, age, gender, photo, location, updated}) => {
        return saveUser({email, name, age, gender, photo, location, updated});
    },
    createField: ({fieldId, owner, location}) => {
        return saveField({fieldId, owner, location});
    },
    createCrop: ({cropId, name, owner}) => {
        return saveCrop({cropId, name, owner});
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`); 

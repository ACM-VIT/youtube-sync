import { db, environment } from '../config';
import mongoose from 'mongoose';
import Logger from '../core/Logger';


let dbURI: string;

if (environment === 'development')
    dbURI = `mongodb://localhost:27017/ysDB`
else
    dbURI = `mongodb+srv://${db.user}:${db.password}@riddlercsi2020-oi8yk.mongodb.net/${db.name}?retryWrites=true&w=majority`;


const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

Logger.debug(dbURI);


mongoose
    .connect(dbURI, options)
    .then(() => {
        Logger.info('Mongoose connection successful');
    })
    .catch((e) => {
        Logger.info('Mongoose connection error');
        Logger.error(e);
    });

//Connection Events

mongoose.connection.on('connection', () => {
    Logger.info('Mongoose default connection open to ' + dbURI);
})


mongoose.connection.on('error', (e) => {
    Logger.error('Mongoose connection error: ' + e);
})

mongoose.connection.on('disconnected', () => {
    Logger.info('Mongoose deafult connection disconnected');
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        Logger.info('Mongoose deafult connection disconnected through app termination');
        process.exit(0);
    })
})




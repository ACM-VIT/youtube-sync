import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import path from 'path';
import fs from 'fs';

import { logDirectory, environment } from '../config';


let dir = logDirectory
if (!dir) dir = path.resolve('logs');

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

/* const logLevel = environment === 'development' ? 'debug' : 'warn'; */
const logLevel = 'debug';
const options = {
    file: {
        level: logLevel,
        filename: dir + '/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        timestamp: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        prettyPrint: true,
        json: true,
        maxSize: '20m',
        colorize: true,
        maxFiles: '14d',
    },
};

export default createLogger({
    transports: [
        new transports.Console({
            level: logLevel,
            format: format.combine(format.errors({ stack: true }), format.prettyPrint()),
        }),
    ],
    exceptionHandlers: [new DailyRotateFile(options.file)],
    exitOnError: false, // do not exit on handled exceptions
});



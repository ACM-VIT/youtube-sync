import app from "./app";
import { port, host } from "./config";
import Logger from "./core/Logger";
import './sockets';


/* app
    .listen(port, () => {
        Logger.info(`Server running on : ${port}`);
    })
    .on('error', (e) => Logger.error(e));  */
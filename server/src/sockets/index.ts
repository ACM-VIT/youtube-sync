import app from '../app';
import { SocketServer } from './SoketServer';


const ss = new SocketServer(app);

export { ss };
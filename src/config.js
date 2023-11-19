import {config} from 'dotenv'
config();

export default {
    port: process.env.port || 3002//configuramos el puerto que se usara
};

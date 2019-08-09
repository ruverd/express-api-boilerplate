import winston from "winston";
import app from './App';
import config from './config/config';
import './config/db';

const PORT = config.PORT;

// start the Express server
app.listen( PORT, () => {
    winston.info(`Listening on port ${ PORT }...`)
});
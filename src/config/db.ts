import winston from "winston";
import mongoose from 'mongoose';
import config from './config';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// Connecting to the database
export default (async () => {
  try {
    await mongoose.connect(
      config.DB_HOST,
      { useNewUrlParser: true }
    );
    // listen for requests
    winston.info(`Connected to ${config.DB_HOST}...`)
  } catch (err) {
    winston.error(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
})();
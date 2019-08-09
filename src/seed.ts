import User from './v1/user/model';
import mongoose from 'mongoose';
import config from './config/config';
import bcrypt from 'bcrypt';

export default (async () => {

  const salt: number = Number(config.SALT_ROUNDS);
  const hash = await bcrypt.hash("secret", salt);
  const data = [
    {
      name: "Admin",
      email: "admin@mail.com",
      password: hash
    },
    {
      name: "User",
      email: "user@mail.com",
      password: hash
    }
  ];

  try {
    await mongoose.connect(
        config.DB_HOST,
        { useNewUrlParser: true }
    );

    await User.deleteMany({});
    
    for (let user of data) {
      const { _id: genreId } = await new User({ 
        name: user.name,
        email: user.email,
        password: user.password 
      }).save();
    }
  
    mongoose.disconnect();
  
    console.info("Done!");
  } catch (err) {
    console.error(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
})();
import * as mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import config from '../../config/config';

export type UserDocument = mongoose.Document & {
  name: string;
  email: string;
  password: string;
  generateAuthToken(): string;
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({
      _id: this._id,
      name: this.name,
      email: this.email
    },
    config.JWT_ENCRYPTION,
    {
      expiresIn: config.JWT_EXPIRATION
    }
  );
  
  return token;
};

// handle not found errors
export default mongoose.model<UserDocument>("User", userSchema);
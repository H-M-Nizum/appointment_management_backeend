/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { AuthModel, TUser } from './auth.interface';
import config from '../../config';



const userSchema = new Schema<TUser,AuthModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      
    },
    role: {
      type: String,
      enum: ['admin', 'compounder'],
      default: 'compounder',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);




userSchema.pre('save',async function (next){
    const user = this;
    user.password=await bcrypt.hash(user.password,Number(config.salt_round))
    next();
})
userSchema.post('save',async function(doc,next){
    doc.password='';
    next();
})




userSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await Auth.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
//   passwordChangedTimestamp: Date,
//   jwtIssuedTimestamp: number,
// ) {
//   const passwordChangedTime =
//     new Date(passwordChangedTimestamp).getTime() / 1000;
//   return passwordChangedTime > jwtIssuedTimestamp;
// };


export const Auth = mongoose.model<TUser,AuthModel>('auth',userSchema)
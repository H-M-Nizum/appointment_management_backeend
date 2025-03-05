import { Model } from "mongoose";
import { USER_ROLE } from "./auth.constant";


export type TUser = {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'manager' | 'seller';

  };
  
  export type TUserLogin = {
    email: string;
    password: string;
  };


  export interface AuthModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByCustomId(email: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
    // isJWTIssuedBeforePasswordChanged(
    //   passwordChangedTimestamp: Date,
    //   jwtIssuedTimestamp: number,
    // ): boolean;
  }
  
export type TUserRole = keyof typeof USER_ROLE;
  
  
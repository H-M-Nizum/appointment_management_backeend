/* eslint-disable no-unused-vars */

export interface TSerial {
  id:any;
  serial_no: Number;
  day: string;
  time: string;
  date: string;
  name: string;
  phone: string;
  age: string;
  serial: string;
  sequence: Number;
  status: string;
  isPreviousPatient: boolean;
}

// export interface UserModel extends Model<TUser> {
//   //instance methods for checking if the user exist
//   isUserExistsByCustomId(id: string): Promise<TUser>;
//   //instance methods for checking if passwords are matched
//   isPasswordMatched(
//     plainTextPassword: string,
//     hashedPassword: string,
//   ): Promise<boolean>;
//   isJWTIssuedBeforePasswordChanged(
//     passwordChangedTimestamp: Date,
//     jwtIssuedTimestamp: number,
//   ): boolean;
// }

// export type TUserRole = keyof typeof USER_ROLE;

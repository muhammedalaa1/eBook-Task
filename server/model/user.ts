import mongoose, { Document, Schema, model } from "mongoose";
import validator from "validator";
export interface IUser extends Document {
  userName: string;
  email: string;
  phone: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      min: 2,
      max: 15,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (v: string) {
          return validator.isEmail(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid email!`,
      },
      required: [true, "User email required"],
    },
    phone: {
      type: String,
      validate: {
        validator: function (v: string) {
          return validator.isMobilePhone(v, "ar-EG");
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid phone!`,
      },
      required: [true, "User phone required"],
    },
    password: {
      type: String,
      required: [true, "User password required"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", UserSchema);

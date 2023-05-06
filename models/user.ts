import bcrypt from 'bcryptjs';
import { model, Model, models, Schema } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
}

const userSchema = new Schema<IUser, Model<IUser>>({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);

export default User;

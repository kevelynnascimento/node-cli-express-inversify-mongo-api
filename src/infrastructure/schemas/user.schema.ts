import mongoose, { Schema } from 'mongoose';
import { UserEntity } from '../../domain/entities/user.entity';

const userEntitySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  creationDate: { type: Date, required: true },
  updateDate: { type: Date, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

userEntitySchema.index({ email: 1 }, { name: 'emailIndex', background: true, unique: true });
userEntitySchema.index({ username: 1 }, { name: 'usernameIndex', background: true, unique: true });
userEntitySchema.index({ role: 1 }, { name: 'roleIndex', background: true });

const UserModel = mongoose.model<UserEntity>('user', userEntitySchema);

export { UserModel };

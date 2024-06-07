import { Document } from 'mongoose';

export class UserEntity extends Document {
  id: string;
  name: string;
  email: string;
  creationDate: Date;
  updateDate: Date;
  username: string;
  password: string;
  role: string;
}
import { Document } from 'mongoose';

export class CompanyEntity extends Document {
  id: string;
  name: string;
  creationDate: Date;
  updateDate: Date;
  deactivationDate: Date;
}
import mongoose, { Schema } from 'mongoose';
import { CompanyEntity } from '../../domain/entities/company.entity';

const companyEntitySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  updateDate: { type: Date, required: true, default: Date.now },
  deactivationDate: { type: Date },
});

companyEntitySchema.index({ deactivationDate: 1 }, { name: 'deactivationDateIndex', background: true });
companyEntitySchema.index({ name: 1 }, { name: 'nameIndex', background: true });


const CompanyModel = mongoose.model<CompanyEntity>('company', companyEntitySchema);

export { CompanyModel };

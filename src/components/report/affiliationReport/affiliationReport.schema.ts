import { Schema } from 'mongoose';

export interface IAffiliationReport {
  _id?: string;
  affiliation: string;
  characters: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const affiliationReportSchema = new Schema<IAffiliationReport>(
  {
    affiliation: {
      type: String,
    },
    characters: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

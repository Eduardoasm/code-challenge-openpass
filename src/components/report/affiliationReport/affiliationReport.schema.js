import { Schema } from 'mongoose';

export const affiliationReportSchema = new Schema(
  {
    affiliation: {
      type: String
    },
    characters: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

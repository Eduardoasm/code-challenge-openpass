import { Schema } from 'mongoose';
import { reportCharacterSchema } from '../reportCharacter/reportCharacter.schema.js';

export const reportAffiliationSchema = new Schema(
  {
    affiliation: {
      type: String
    },
    characters: {
      type: [reportCharacterSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

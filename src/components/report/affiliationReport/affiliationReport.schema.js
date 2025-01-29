import { Schema } from 'mongoose';
import { characterSchema } from '../character/character.schema.js';

export const affiliationReportSchema = new Schema(
  {
    affiliation: {
      type: String
    },
    characters: {
      type: [characterSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

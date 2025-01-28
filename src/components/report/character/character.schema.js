import { Schema } from 'mongoose';

export const characterSchema = new Schema(
  {
    characterId: {
      type: String
    },
    name: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

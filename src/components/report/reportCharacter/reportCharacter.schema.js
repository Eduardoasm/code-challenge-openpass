import { Schema } from 'mongoose';

export const reportCharacterSchema = new Schema(
  {
    characterId: {
      type: Number
    },
    name: {
      type: String,
      trim: true,
    },
    ki: {
      type: String,
      trim: true,
    },
    race: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true
  }
);

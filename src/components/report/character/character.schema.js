import { Schema } from 'mongoose';

export const characterSchema = new Schema(
  {
    characterId: {
      type: Number
    },
    name: {
      type: String
    },
    ki: {
      type: String
    },
    race: {
      type: String
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

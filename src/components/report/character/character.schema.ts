import { Schema } from 'mongoose';

export interface ICharacter {
  _id?: string;
  characterId: string;
  name: string;
  ki: string;
  race: string;
  image: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const characterSchema = new Schema<ICharacter>(
  {
    characterId: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

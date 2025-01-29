import mongoose, { Schema } from 'mongoose';
import { affiliationReportSchema } from '../affiliationReport/affiliationReport.schema.js';

export const reportSchema = new Schema(
  {
    planetId: {
      type: Number,
      required: ['Please insert a planet id', true],
      unique: true
    },
    name: {
      type: String,
      required: ['Please insert a planet name', true],
      unique: true
    },
    affiliationReport: {
      type: [affiliationReportSchema],
      default: []
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Report = mongoose.model('Report', reportSchema);

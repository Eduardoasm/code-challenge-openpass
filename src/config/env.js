import * as dotenv from 'dotenv'
dotenv.config();

const {
  PORT,
  MONGO_URI,
  MONGO_ROOT_USERNAME,
  MONGO_ROOT_PASSWORD,
} = process.env

export const EnvConfig = () => ({
  PORT,
  MONGO_URI,
  MONGO_ROOT_USERNAME,
  MONGO_ROOT_PASSWORD
})
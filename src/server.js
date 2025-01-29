import { EnvConfig } from './config/env.js';
import mongoose from 'mongoose';
import app from './app.js';

async function initServer() {
  let connection = null;

  try {
    connection = await mongoose
      .connect(EnvConfig().MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((connection) => {
        console.log('Info: Connected to MongoDB');
        return connection;
      });

    mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);

    const PORT = EnvConfig().PORT;

    app.listen(PORT, () => {
      console.log(`Info: Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    if (connection) {
      connection.connection.close();
    }
    console.log(error);
    process.exit(1);
  }
}

initServer();

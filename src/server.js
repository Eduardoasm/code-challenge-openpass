import mongoose from 'mongoose';
import app from './app.js';

async function initServer() {
  let connection = null;

  try {
    connection = await mongoose
      .connect('mongodb+srv://challenge-open-pass:challenge123@cluster0.k7ja3.mongodb.net', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((connection) => {
        console.log('Info: Connected to MongoDB');
        return connection;
      });

    mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);

    const PORT = 3000;

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

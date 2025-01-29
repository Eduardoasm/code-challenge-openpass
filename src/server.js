// import 'module-alias/register.js';
import express from 'express';
import mongoose from 'mongoose';
import characterRouter from './components/character/character.routes.js';
import reportRouter from './components/report/report/report.routes.js';

async function initServer() {
  let connection = null;

  try {
    connection = await mongoose
      .connect('mongodb+srv://challenge-open-pass:challenge123@cluster0.k7ja3.mongodb.net', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((connection) => {
        console.log('Connected to MongoDB');
        return connection;
      });

    mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);

    const PORT = 3000;

    const app = express();

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.use('/characters', characterRouter);
    app.use('/report', reportRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
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

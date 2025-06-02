const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Routes would be connected here using app.use()

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Smart Library API is running!'));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));

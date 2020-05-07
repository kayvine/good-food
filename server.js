import express, { json, urlencoded } from 'express';
import { PORT } from './config/config';
import cors from 'cors';
import Authentication from './middleware/Authentication';
import mongoose from 'mongoose';
import authRoutes from './authentication/auth.route';
import userRoutes from './users/user.route';
import productRoutes from './products/product.route';

var app = express();

app.use(cors());

// JWT Authentication for security
// app.use(Authentication({ whitelist: ['/authentication'] }));

// add req.body to Express
app.use(json());
app.use(urlencoded({ extended: false }));

// connect to mongodb (Should be in config)
mongoose.connect('mongodb://localhost/goodfood', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to database...'));

// Get routes
app.use('/authentication', authRoutes);
app.use('/products', productRoutes);
userRoutes(app);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
  console.log(err.stack);

  res.status(err.status || 500);

  res.json({
    error: {
      message: err.message,
      status: err.status
    },
  });
});

// Let's start our server...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

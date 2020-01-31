import express, { json, urlencoded } from 'express';
import { PORT } from './configuration/configuration';
import cors from 'cors';
import Authentication from './middleware/Authentication';
import mongoose from 'mongoose';
import authRoutes from './authentication/auth.route';
import userRoutes from './users/api/users.route';

var app = express();

app.use(cors());

// JWT Authentication for security
app.use(Authentication);

// Normal express config defaultsrs
app.use(json());
app.use(urlencoded({ extended: false }));

// connect to mongodb (Should be in config)
mongoose.connect('mongodb://localhost/goodfood', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to database...'));

// Get routes
authRoutes(app);
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
    'errors': {
      message: err.message,
      error: err
    }
  });
});

// if (production) {
//   app.use((err, req, res, next) => {
//     // Some other way to handle error handling
//   })
// }


// Let's start our server...
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });

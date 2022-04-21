import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import path from 'path';
import session from 'express-session';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import discountRoutes from './routes/discountRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import Stripe from 'stripe';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import uploadRoutes from './routes/uploadRoutes.js';
import {MongoClient} from 'mongodb';
import connectMongo from 'connect-mongodb-session';
const sessionStore = connectMongo(session);

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

let store = new sessionStore({
  uri: process.env.MONGO_URI,
  collection: 'mongoSessions',
  expires: 1000 * 60 * 60 * 24 * 30,
});

app.use(
  session({
    key: 'userId',
    secret: 'subscribe',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: false,
    },
    store: store,
  })
);

app.get('/user/sessions', (req, res) => {
  if (req.session) {
    res.send({user: req.session.user});
  } else {
    res.send({loggedOut: true});
  }
});

app.get('/user/logout', (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI);

  const start = async () => {
    await client.connect();
    var db = client.db('userData');
    if (req.session && req.session.user) {
      await db
        .collection('mongoSessions')
        .deleteOne({_id: req.session.user._id});
    }

    req.session.destroy(() => {
      res
        .clearCookie('userId', {
          path: '/',
          httpOnly: true,
        })
        .sendStatus(200);
    });
  };
  start();
});

export const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/checkouts', checkoutRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

app.use(notFound);
app.use(errorHandler);

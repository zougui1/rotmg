import { MongoClient } from 'mongodb';
import Papr from 'papr';

import { env } from '~/env';

export const papr = new Papr();

MongoClient
  .connect(env.DATABASE_HOST)
  .then(connection => {
    papr.initialize(connection.db(env.DATABASE_NAME));
    return papr.updateSchemas();
  })
  .catch(error => {
    console.log('MongoDB connection error:', error);
  });

export type WithStringId<T> = Omit<T, '_id'> & { _id: string };

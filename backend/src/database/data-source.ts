import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

// helps with dynamic db config, see: https://github.com/typeorm/typeorm/issues/8914
dotenvExpand.expand(dotenv.config());

const __isProd__ = process.env.NODE_ENV == 'production';

export const dataSource: DataSourceOptions = {
  type: 'postgres',

  synchronize: !__isProd__,
  entities: ['dist/**/*.entity.js'],
  url: process.env.POSTGRES_URL,
  migrations: ['dist/database/migrations/*.js'],
};

export default new DataSource(dataSource);

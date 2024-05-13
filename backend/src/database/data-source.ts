import { DataSource, DataSourceOptions, createConnection } from 'typeorm';

import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

// helps with dynamic db config, see: https://github.com/typeorm/typeorm/issues/8914
dotenvExpand.expand(dotenv.config());

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',

  synchronize: true,
  entities: ['dist/**/*.entity.js'],
  url: process.env.POSTGRES_URL,
  migrations: ['dist/database/migrations/*.js'],
  logging: ['error', 'migration'],
};

(async () => {
  try {
    const connection = await createConnection({
      ...dataSourceOptions,
      logging: true,
    });

    await connection.runMigrations({
      transaction: 'none',
    });

    await connection.close();
  } catch (error) {
    console.log('an error occured while applying migrations');
  }
})();

export default new DataSource(dataSourceOptions);

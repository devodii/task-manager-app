import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const createDataSourceOptions = async (
  configService: ConfigService,
): Promise<DataSourceOptions> => {
  return {
    type: 'postgres',
    entities: ['dist/**/*.entity.js'],
    url: configService.get<string>('POSTGRES_URL'),
    migrations: ['dist/database/migrations/*.js'],
  };
};

const createDataSource = async (
  configService: ConfigService,
): Promise<DataSource> => {
  const dataSourceOptions = await createDataSourceOptions(configService);
  return new DataSource(dataSourceOptions);
};

export default createDataSource;

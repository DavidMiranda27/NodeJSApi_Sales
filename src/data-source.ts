import 'reflect-metadata';
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5431,
  username: "postgres",
  password: "docker",
  database: "apivendas",
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})

export default AppDataSource;

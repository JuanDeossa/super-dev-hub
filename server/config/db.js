import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env;

export const sequelize = new Sequelize(
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT ? Number.parseInt(POSTGRES_PORT) : 5432,
    dialect: "postgres",
    logging: false,
  }
);

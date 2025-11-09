import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST } =
  process.env;

console.log({
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
});

export const sequelize = new Sequelize(
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  {
    host: POSTGRES_HOST,
    dialect: "postgres",
    logging: false,
  }
);

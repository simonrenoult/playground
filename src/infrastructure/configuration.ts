export interface Configuration {
  port: number;
  host: string;
  databaseUrl: string;
}

const configuration: Configuration = {
  host: process.env.HOST || "0.0.0.0",
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgres://playground:playground@localhost:5432/playground",
};

export default configuration;

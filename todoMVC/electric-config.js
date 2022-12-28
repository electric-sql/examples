import { data } from "./migrations";

const config = {
  app: "example-app",
  token: "my-token",
  replication: {
    host: "localhost",
    port: 5133,
    ssl: false,
  },
  migrations: data.migrations,
  debug: true,
};

export default config;

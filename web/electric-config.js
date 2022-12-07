import { data } from "./migrations";

const config = {
  app: "example-app",
  env: "test",
  token: "my-token",
  replication: {
    address: "localhost",
    port: 5133,
  },
  migrations: data.migrations
};

export default config;

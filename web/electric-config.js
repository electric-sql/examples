import { data as bundle } from './migrations/dist'

// Default -- replicates via cloud service.
const config = {
  app: '<YOUR APP ID>',
  env: 'default',
  migrations: bundle.migrations
}

// // XXX Alternative -- use the local backend.
// const config = {
//   app: '<YOUR APP ID>',
//   env: 'default',
//   migrations: bundle.migrations,
//   replication: {
//     host: "localhost",
//     port: 5133,
//     ssl: false,
//   },
//   token: "unused-auth-token"
// }

export default config

import { data as bundle } from './migrations/dist'

const config = {
  app: '<YOUR APP ID>',
  env: 'default',
  migrations: bundle.migrations
}

export default config

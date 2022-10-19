import { ElectricWorker } from 'electric-sql/browser'
import { data as migrationsData } from './migrations'

ElectricWorker.start(self, migrationsData)

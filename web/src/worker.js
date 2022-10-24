import { ElectricWorker } from 'electric-sql/browser'
import { data } from "../migrations";
import config from "../electric-config";

ElectricWorker.start(self, { config, migrations: data.migrations });
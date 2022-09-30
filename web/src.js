import { initElectricSqlJs, resultToRows } from 'electric-sql-ts/browser'

export const randomValue = () => {
  return Math.random().toString(16).substr(2)
}

const url = new URL('./worker.js', import.meta.url)
const worker = new Worker(url, {type: "module"})

initElectricSqlJs(worker, {locateFile: file => `/${file}`})
  .then(SQL => SQL.openDatabase('example.db'))
  .then(db =>
    db.run(`
      CREATE TABLE IF NOT EXISTS items (value TEXT PRIMARY KEY);
      INSERT INTO items VALUES('${randomValue()}');
    `)
    .then(() => db.exec('SELECT value from items'))
    .then(([result]) => {
      console.log(resultToRows(result))
    })
  )

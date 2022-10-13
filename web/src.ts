import { initElectricSqlJs, resultToRows } from "electric-sql/browser";

export const randomValue = () => {
  return Math.random().toString(16).substr(2);
};

const url = new URL("./worker.js", import.meta.url);
const worker = new Worker(url, { type: "module" });

initElectricSqlJs(worker, { locateFile: (file) => `/${file}` })
  .then((SQL) => SQL.openDatabase("example.db"))
  .then(async (db) => {
    await db.run(`CREATE TABLE IF NOT EXISTS items (value TEXT PRIMARY KEY)`)
    await db.run(`INSERT INTO items VALUES('${randomValue()}')`)
    const result = await db.exec(`BEGIN; SELECT value from items; COMMIT;`)
    console.log(resultToRows(result));
  })

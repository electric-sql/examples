import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'

import styles from '../styles/Home.module.css'

// N.b.: this is just for the demo, this shouldn't be done every page load.
// To persist on the server, we can load the DB file:
//   const fs = require('fs')
//   const path = require('path')
//   const filebuffer = fs.readFileSync(path.join(__dirname, 'foo.db'))
// To persist in the browser, we can use https://github.com/jlongster/absurd-sql
function hydrate(db) {
  db.run(`
    DROP TABLE IF EXISTS example;
    CREATE TABLE example (
      a int,
      b char
    );

    INSERT INTO example VALUES (0, 'hello');
    INSERT INTO example VALUES (1, 'world');
  `)

  return db
}
function extend(db) {
  db.run(`
    INSERT INTO example VALUES (2, 'browser');
    INSERT INTO example VALUES (3, 'here');
  `)

  return db
}

function useDB() {
  const [db, setDb] = useState(null)

  useEffect(() => {
    initSqlJs({locateFile: file => `/${file}`}).then((SQL) => {
      const db_ = new SQL.Database()

      setDb(extend(hydrate(db_)))
    })
  }, [])

  return db
}

function useQuery(db, sqlStatement, initialResults) {
  const [results, setResults] = useState(initialResults)

  useEffect(() => {
    if (!db) { return }

    const clientResults = db.exec(sqlStatement)
    console.log('clientResults')
    console.log(clientResults)

    setResults(clientResults)
  }, [db, sqlStatement, initialResults])

  return results
}

function Home({results: serverResults}) {
  const db = useDB()
  const results = useQuery(db, 'select * from example', serverResults)

  return (
    <div className={styles.container}>
      <Head>
        <title>Next + sql.js Example</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Electric SQL
        </h1>

        <p className={styles.description}>
          Original server query results:
          <br />{JSON.stringify(serverResults)}
        </p>

        <p className={styles.description}>
          Results:<br />
          {JSON.stringify(results)}
        </p>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const initSqlJs = require('sql.js')
  const fs = require('fs')
  const path = require('path')

  const appRoot = require('app-root-path')
  const devDir = path.join(appRoot.path, 'public')
  const prodDir = path.join(appRoot.path, '.next', 'server', 'static')
  const dir = fs.existsSync(prodDir) ? prodDir : devDir

  const SQL = await initSqlJs({locateFile: fileName => path.join(dir, fileName)})
  const db = hydrate(new SQL.Database())

  const results = db.exec('select * from example')
  console.log('serverResults')
  console.log(results)

  return {
    props: {
      results: results
    }
  }
}

export default Home

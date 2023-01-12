import React, { useContext, useEffect, useState } from 'react'
import './Example.css'

// XXX Uncomment these imports.
// import { ElectrifiedDatabase, initElectricSqlJs } from 'electric-sql/browser'
// import { configure } from 'electric-sql/config'
// import { ElectricProvider, useElectric, useElectricQuery } from 'electric-sql/react'

// XXX Delete this in favour of `initElectricSqlJs`.
import initSqlJs from '@aphro/sql.js'

// XXX Delete this in favour of `ElectricProvider`.
const DbContext = React.createContext(undefined)

const locateOpts = {
  locateFile: (file: string) => `/${file}`
}

// XXX Import your application config and bundled migrations.
// import app from '../electric.json'
// import migrations from '../migrations/dist'
// const config = configure(app, migrations)

// XXX Enable the ElectricSQL worker.
// XXX N.b.: don't forget to also uncomment the source of the `./worker.js` file.
// const worker = new Worker("./worker.js", { type: "module" });

export const Example = () => {
  // XXX Swap `useState()` for `useState<ElectrifiedDatabase>()`.
  const [ db, setDb ] = useState()

  useEffect(() => {
    const init = async () => {
      // XXX Replace this static database connection instantiation.
      const SQL = await initSqlJs(locateOpts)
      const original = new SQL.Database()
      // XXX With this electrified version.
      // const SQL = await initElectricSqlJs(worker, locateOpts)
      // const electrified = await SQL.openDatabase('example.db', config)

      // XXX Delete this -- no need to manually run DDL.
      const ddl = `
        CREATE TABLE items (
          value TEXT PRIMARY KEY NOT NULL
        )
      `
      original.run(ddl)

      // XXX Swap `original` for `electrified`.
      setDb(original)
      // setDb(electrified)
    }

    init()
  }, [])

  if (db === undefined) {
    return null
  }

  return (
    // XXX Swap out `DbContext.Provider value=` for `ElectricProvider db=`.
    <DbContext.Provider value={db}>
      <ExampleComponent />
    </DbContext.Provider>
    // <ElectricProvider db={db}>
    //   <ExampleComponent />
    // </ElectricProvider>
  )
}

const ExampleComponent = () => {
  // XXX Swap out `useContext(DbContext)` to `useElectric`.
  const db = useContext(DbContext) as any
  // const db = useElectric() as ElectrifiedDatabase

  // XXX Replace the manual state bindings, `triggerQuery` hack
  // XXX and the full `useEffect` function call below ...
  const [ results, setResults ] = useState([])
  const [ counter, setCounter ] = useState(0)
  const triggerQuery = () => setCounter(val => val + 1)

  useEffect(() => {
    const queryItems = () => {
      const results = db.exec('SELECT value FROM items')
      const resultValues = results && results[0] && results[0].values
        ? results[0].values
        : []

      const values = resultValues.map((x: string[]) => {
        return {
          value: x[0]
        }
      })

      setResults(values)
    }

    queryItems()
  }, [counter])

  // XXX ... with a live `useElectricQuery` binding.
  // const { results } = useElectricQuery('SELECT value FROM items', [])

  const addItem = () => {
    db.run('INSERT INTO items VALUES(?)', [crypto.randomUUID()])

    // XXX You no longer need this.
    triggerQuery()
  }

  const clearItems = () => {
    db.run('DELETE FROM items where true')

    // XXX You no longer need this.
    triggerQuery()
  }

  // All the markup is unchanged.
  return (
    <div>
      <div className='controls'>
        <button className='button' onClick={addItem}>
          Add
        </button>
        <button className='button' onClick={clearItems}>
          Clear
        </button>
      </div>
      {results && results.map((item: any, index: any) => (
        <p key={ index } className='item'>
          <code>{ item.value }</code>
        </p>
      ))}
    </div>
  )
}

/*

  This is the original, static, local-only code that's the
  starting point for the Quickstart guide.

  It's equivalent to the starting state of `Example.tsx` with
  the comments removed. If you want to use this file instead
  of `Example.tsx` you can change the import in `App.tsx`.


*/
import React, { useContext, useEffect, useState } from 'react'
import './Example.css'

import { genUUID } from 'electric-sql/dist/util/random'

import initSqlJs from '@aphro/sql.js'

const DbContext = React.createContext(undefined)

const locateOpts = {
  locateFile: (file: string) => `/${file}`
}

export const Example = () => {
  const [ db, setDb ] = useState()

  useEffect(() => {
    const init = async () => {
      const SQL = await initSqlJs(locateOpts)
      const original = new SQL.Database()

      const ddl = `
        CREATE TABLE items (
          value TEXT PRIMARY KEY NOT NULL
        )
      `
      original.run(ddl)

      setDb(original)
    }

    init()
  }, [])

  if (db === undefined) {
    return null
  }

  return (
    <DbContext.Provider value={db}>
      <ExampleComponent />
    </DbContext.Provider>
  )
}

const ExampleComponent = () => {
  const db = useContext(DbContext) as any

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

  const addItem = () => {
    db.run('INSERT INTO items VALUES(?)', [genUUID()])

    triggerQuery()
  }

  const clearItems = () => {
    db.run('DELETE FROM items where true')

    triggerQuery()
  }

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

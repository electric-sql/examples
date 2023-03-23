import React, { useEffect, useState } from 'react'
import './Example.css'

import { ElectrifiedDatabase, initElectricSqlJs } from 'electric-sql/browser'
import { ElectricProvider, useElectric, useElectricQuery } from 'electric-sql/react'

import config from '../.electric/@config'

const locateOpts = {
  locateFile: (file: string) => `/${file}`
}

const worker = new Worker("./worker.js", { type: "module" });

export const Example = () => {
  const [ db, setDb ] = useState<ElectrifiedDatabase>()

  useEffect(() => {
    const init = async () => {
      const SQL = await initElectricSqlJs(worker, locateOpts)
      const electrified = await SQL.openDatabase('web-example.db', config)

      setDb(electrified)
    }

    init()
  }, [])

  if (db === undefined) {
    return null
  }

  return (
    <ElectricProvider db={db}>
      <ExampleComponent />
    </ElectricProvider>
  )
}

const ExampleComponent = () => {
  const db = useElectric() as ElectrifiedDatabase
  const { results } = useElectricQuery('SELECT value FROM items', [])

  const addItem = () => {
    db.run('INSERT INTO items VALUES(?)', [crypto.randomUUID()])
  }

  const clearItems = () => {
    db.run('DELETE FROM items where true')
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

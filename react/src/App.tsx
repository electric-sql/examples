import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import './style.css'

import { initElectricSqlJs, Database, ElectrifiedDatabase } from "electric-sql/browser"
import { ElectricProvider, useElectric, useElectricQuery } from 'electric-sql/frameworks/react'

import { data as migrationsData } from '../migrations'

const Example = () => {
  const [ db, setDb ] = useState<Database>()
  const worker = new Worker("./worker.js", { type: "module" });

  useEffect(() => {
    initElectricSqlJs(worker, {locateFile: (file: any) => `/${file}`})
      .then((SQL: any) => SQL.openDatabase('example.db'))
      .then((db: Database) => setDb(db))
  }, [])

  return (
    <ElectricProvider db={db}>
      <ExampleComponent />
    </ElectricProvider>
  )
}

const ExampleComponent = () => {
  const { results, error } = useElectricQuery('SELECT value FROM items', [])
  const db = useElectric() as ElectrifiedDatabase

  if (error !== undefined) {
    return (
      <div>
        <p className='text'>
          Error: { `${error}` }
        </p>
      </div>
    )
  }

  if (db === undefined || results === undefined) {
    return null
  }

  const addItem = () => {
    const randomValue = Math.random().toString(16).substr(2)

    db.exec('INSERT INTO items VALUES(?)', [randomValue])
    db.electric.notifier.potentiallyChanged()
  }

  const clearItems = () => {
    db.exec('DELETE FROM items where true')
    db.electric.notifier.potentiallyChanged()
  }  

  return (
    <div>
      {results.map((item: any, index: any) => (
        <p key={ index } className='item'>
          Item: { item.value }
        </p>
      ))}

      <button className='button' onClick={addItem}>
        <p className='text'>Add</p>
      </button>
      <button className='button' onClick={clearItems}>
      <p className='text'>Clear</p>
      </button>
    </div>
  )
}

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Example/>
      </header>
    </div>
  );
}
import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import './style.css'

import { initElectricSqlJs, ElectrifiedDatabase } from "electric-sql/browser"
import { ElectricProvider, useElectric, useElectricQuery } from 'electric-sql/react'

const ElectrifiedComponent = () => {
  const [ db, setDb ] = useState<ElectrifiedDatabase>()
  const worker = new Worker("./worker.js", { type: "module" });

  useEffect(() => {
    initElectricSqlJs(worker, {locateFile: (file: any) => `/${file}`})
      .then((SQL: any) => SQL.openDatabase('example.db'))
      .then((db: ElectrifiedDatabase) => setDb(db))
  }, [])

  return (
    <ElectricProvider db={db}>
      <Component />
    </ElectricProvider>
  )
}

const Component = () => {
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
  }

  const clearItems = () => {
    db.exec('DELETE FROM items where true')
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
        <ElectrifiedComponent/>
      </header>
    </div>
  );
}
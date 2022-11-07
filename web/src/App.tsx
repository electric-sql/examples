import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import './style.css'

import { initElectricSqlJs, ElectrifiedDatabase} from "electric-sql/browser"
import { ElectricProvider, useElectric, useElectricQuery } from 'electric-sql/react'

const worker = new Worker("./worker.js", { type: "module" });
let initialized: boolean | null = null

export const ElectrifiedExample = () => {
  const [ db, setDb ] = useState<ElectrifiedDatabase>()

  useEffect(() => {
    const init = async () => {
      const SQL = await initElectricSqlJs(worker, {locateFile: (file: string) => `/${file}`})
      const electrified = await SQL.openDatabase('example.db')

      setDb(electrified)
      initialized = true
    }

    if(initialized === null){
      initialized = false
      init();
    }
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
        <ElectrifiedExample />
      </header>
    </div>
  );
}

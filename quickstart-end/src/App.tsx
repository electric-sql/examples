import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import './style.css'

// de-comment imports as necessary
import {ElectrifiedDatabase, initElectricSqlJs} from "electric-sql/browser"
import { ElectricProvider, useElectric, useElectricQuery } from 'electric-sql/react'

import {data} from '../migrations/dist'


const app = 'APP-ID'

const config = {
  app,
  migrations: data.migrations,  
}

const getToken = async () => {
  const res = await fetch("https://console.electric-sql.com/api/v1/jwt/auth/login", {
    body: JSON.stringify({ data: {app, env: "default", username: "anything"} }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
  
  return res.json()
}

const worker = new Worker("./worker.js", { type: "module" });
export const ElectrifiedExample = () => {
  const [ db, setDb ] = useState<ElectrifiedDatabase>()

  useEffect(() => {
    const init = async () => {
      const {data: {token}} = await getToken()

      const SQL = await initElectricSqlJs(worker, {locateFile: (file: string) => `/${file}`})
      const electrified = await SQL.openDatabase('example.db', {...config, token})

      setDb(electrified)
    }

    init()
  }, [])

  return (
    <ElectricProvider db={db}>
		  <ExampleComponent />
	  </ElectricProvider>
  )
}

const ExampleComponent = () => {
  const db = useElectric() as ElectrifiedDatabase
  const { results } = useElectricQuery('SELECT value FROM items', [])
  
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

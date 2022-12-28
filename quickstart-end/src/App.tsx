import React from 'react'
import logo from './logo.svg'
import './App.css'
import './style.css'

// de-comment imports as necessary
// import {ElectrifiedDatabase} from "electric-sql/browser"
// import { ElectricProvider, useElectric, useElectricQuery } from 'electric-sql/react'
// import { ElectricDatabase } from 'electric-sql/dist/drivers'

export const ElectrifiedExample = () => {
  // 1. Set configuration
  // 2. Electrify database
  // 3. Wrap application inside ElectricProvider

  return (
      <ExampleComponent />    
  )
}

const ExampleComponent = () => {
  const addItem = () => {
    // TODO
  }

  const clearItems = () => {
    // TODO
  }  

  return (
    <div>
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

/*

  This is the electrified, end point of the example code
  you should get to at the end of the Quickstart guide.

  You should get the same code by following the instructions
  in the Quickstart guide and/or by following the comments
  in `Example.tsx`. If you want to use this file instead
  of `Example.tsx` you can change the import in `App.tsx`.

  However, YOU MUST EDIT `<YOUR APP ID>` in the `config`
  on line 35 in order for this file to work.

  This version of the example has the same basic functionality
  as the original but also provides built in cloud sync and
  active-active replication between devices, users and cloud
  Postgres. Data is also persisted between page loads.

  The `ExampleComponent` is much simpler because the live
  query abstracts away the need to manually bind state,
  format query results and re-query when data changes.


*/
import React, { useEffect, useState } from 'react'
import './Example.css'

import { ElectrifiedDatabase, initElectricSqlJs } from 'electric-sql/browser'
import { ElectricProvider, useElectric, useElectricQuery } from 'electric-sql/react'
import config from '../electric-config'

const locateOpts = {
  locateFile: (file: string) => `/${file}`
}

// N.b.: don't forget to also uncomment the source of the `./worker.js` file.
const worker = new Worker("./worker.js", { type: "module" });

export const Example = () => {
  const [ db, setDb ] = useState<ElectrifiedDatabase>()

  useEffect(() => {
    const init = async () => {
      const SQL = await initElectricSqlJs(worker, locateOpts)
      const electrified = await SQL.openDatabase('example.db', config)

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

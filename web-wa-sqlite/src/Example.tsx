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

import { start, ElectricDatabase } from 'electric-sql/wa-sqlite'
import { ElectricProvider, useElectric, useElectricQuery } from 'electric-sql/react'

import config from '../.electric/@config'
import {ElectricNamespace} from "electric-sql";

export const Example = () => {
  const [ db, setDb ] = useState<ElectricDatabase & { electric: ElectricNamespace }>()

  useEffect(() => {
    const init = async () => {
      const { db, electric } = await start('electric.db', '', config)
      db.electric = electric // because the hook for live queries expects `electric` to be present on the `db`
      setDb(db)
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
  const db = useElectric() as ElectricDatabase & { electric: ElectricNamespace }
  const electric = db.electric
  const { results } = useElectricQuery('SELECT value FROM items', [])

  const addItem = async () => {
    await electric.adapter.run({
        sql: 'INSERT INTO items VALUES(?)',
        args: [crypto.randomUUID()]
      }
    )
    electric.notifier.potentiallyChanged() // need to be called manually because the wa-sqlite driver is not proxied
  }

  const clearItems = async () => {
    await electric.adapter.run({
      sql : 'DELETE FROM items where true'
    })
    electric.notifier.potentiallyChanged() // need to be called manually because the wa-sqlite driver is not proxied
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

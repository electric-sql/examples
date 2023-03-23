import React, { useEffect, useState } from 'react'
import './Example.css'

import { start, ElectricDatabase } from 'electric-sql/wa-sqlite'
import { ElectricProvider, useElectric, useElectricQuery } from 'electric-sql/react'

import config from '../.electric/@config'
import { ElectricNamespace } from "electric-sql"

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

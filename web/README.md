<a href="https://electric-sql.com">
  <picture>
    <source media="(prefers-color-scheme: dark)"
        srcset="https://raw.githubusercontent.com/electric-sql/meta/main/identity/ElectricSQL-logo-light-trans.svg"
    />
    <source media="(prefers-color-scheme: light)"
        srcset="https://raw.githubusercontent.com/electric-sql/meta/main/identity/ElectricSQL-logo-black.svg"
    />
    <img alt="ElectricSQL logo"
        src="https://raw.githubusercontent.com/electric-sql/meta/main/identity/ElectricSQL-logo-black.svg"
    />
  </picture>
</a>

# ElectricSQL - Web example

This is an example web application using ElectricSQL in the browser with [wa-sqlite](https://github.com/rhashimoto/wa-sqlite).

## Install

Clone this repo and change directory into this folder:

```sh
git clone https://github.com/electric-sql/examples
cd examples/web
```

Install the dependencies:

```sh
yarn
```

## Run

Build and run:

```sh
yarn start
```

## Sync

The application is setup to sync via a local instance of the Electric sync service. See the docs for more information on [how to run the backend locally](https://electric-sql.com/docs/overview/examples#option-3--run-the-backend-locally).

Open [localhost:3001](http://localhost:3001) in two different browsers (so they're backed by different databases) and try it out. You'll see data being replicated between the client applications.

## Notes on the code

In this example, Electric uses wa-sqlite in the browser with IndexedDB for persistence.

The main code to look at is in [`./src/Example.tsx`](./src/Example.tsx):

```tsx
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
```

This opens an electrified database client and passes it to the application using the React Context API. Components can then use the [`useElectric`](https://electric-sql.com/docs/usage/frameworks#useelectric-hook) and [`useElectricQuery`](https://electric-sql.com/docs/usage/frameworks#useelectricquery-hook) to access the database client and bind reactive queries to the component state.
This example explicitly calls `potentiallyChanged` on the notifier because unlike the other drivers, the wa-sqlite driver is not proxied.

```tsx
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
    electric.notifier.potentiallyChanged()
  }

  const clearItems = async () => {
    await electric.adapter.run({
      sql : 'DELETE FROM items where true'
    })
    electric.notifier.potentiallyChanged()
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
```

## More information

See the [documentation](https://electric-sql.com/docs) and [community guidelines](https://github.com/electric-sql/meta). If you need help [let us know on Discord](https://discord.gg/B7kHGwDcbj).

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

This is an example web application using ElectricSQL in the browser with [SQL.js](https://sql.js.org) and [absurd-sql](https://github.com/jlongster/absurd-sql).

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

The application is setup to autmatically sync via the cloud (when connected).

Open [localhost:3000](http://localhost:3000) in two different browsers (so they're backed by different databases) and try it out. You'll see data being replicated between the client applications.

See [Running the Examples](/docs/overview/examples) for information on how to:

- [connect to your own sync service](/docs/overview/examples#option-2--connect-to-your-own-sync-service)
- [run the backend locally](/docs/overview/examples#option-3--run-the-backend-locally)

## Notes on the code

Electric uses SQL.js in the browser with absurd-sql for persistence. This runs in a web worker (which we also use to keep background replication off the main thread). As a result, the electrified db client provides an asynchronous version of a subset of the [SQL.js driver interface](https://sql.js.org/documentation).

The main code to look at is in [`./src/Example.tsx`](./src/Example.tsx):

```tsx
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
```

This spins up a web worker, initialises the persistence machinery, opens an electrified database client and passes it to the application using the React Context API. Components can then use the [`useElectric`](https://electric-sql.com/docs/usage/frameworks#useelectric-hook) and [`useElectricQuery`](https://electric-sql.com/docs/usage/frameworks#useelectricquery-hook) to access the database client and bind reactive queries to the component state.

```tsx
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
```

## More information

See the [documentation](https://electric-sql.com/docs) and [community guidelines](https://github.com/electric-sql/meta). If you need help [let us know on Discord](https://discord.gg/B7kHGwDcbj).

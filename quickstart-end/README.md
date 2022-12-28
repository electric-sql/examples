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

Install the dependencies, either using Yarn:

```sh
yarn
```

Or using npm:

```sh
npm install
```

## Configure

As a local-first system, ElectricSQL defaults to working without a backend. So you can run this example application without connecting to a replication service. However, to run with replication working, you'll need to configure a backend to connect to.

The simplest way is to [sign up to ElectricSQL](https://console.electric-sql.com/auth/signup) and create an application. This will give you a globally unique `app` slug. Paste this into your [application config](https://electric-sql.com/docs/usage/configure) in [`./electric-config.js`](./electric-config.js).

Alternatively, see [these instructions](https://github.com/electric-sql/examples#running-the-backend-locally) to run and connect to the backend locally.

## Run

Build:

```sh
yarn build
```

Run:

```sh
yarn start
```

Open [localhost:3000](http://localhost:3000) in two different browsers (so they're backed by different databases) and try it out. You'll see data being replicated between the client applications.

## Notes on the code

Electric uses SQL.js in the browser with absurd-sql for persistence. This runs in a web worker (which we also use to keep background replication off the main thread). As a result, the electrified db client provides an asynchronous version of a subset of the [SQL.js driver interface](https://sql.js.org/documentation).

The main code to look at is in [`./src/App.tsx`](./src/App.tsx).

```tsx
const worker = new Worker("./worker.js", { type: "module" });

export const ElectrifiedExample = () => {
  const [ db, setDb ] = useState<ElectrifiedDatabase>()

  useEffect(() => {
    initElectricSqlJs(worker, {locateFile: (file: string) => `/${file}`})
      .then((SQL) => SQL.openDatabase('example.db'))
      .then((db) => setDb(db))
  }, [])

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
```

## More information

See the [documentation](https://electric-sql.com/docs) and [community guidelines](https://github.com/electric-sql/meta). If you need help [let us know on Discord](https://discord.gg/B7kHGwDcbj).

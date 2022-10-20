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

# ElectricSQL - React Native example

This example shows how create a React Native application backed by an electrified SQLite database, synching data across devices through the Cloud.

For this example we uses an electrified `react-native-sqlite-storage` driver to access SQLite on the device. The process is simple: open the database, electrify it, and use it as normal. Electric will detect database changes and synch them through the Cloud.

```jsx
export const ElectrifiedExample = () => {
  const [db, setDb] = useState<ElectrifiedDatabase>();

  useEffect(() => {
    const promisesEnabled = true;
    SQLite.enablePromise(promisesEnabled);

    SQLite.openDatabase({name: 'example.db'})
      .then((sqlDb: SQLiteDatabase) =>
        electrify(sqlDb as any, promisesEnabled, config as any),
      )
      .then((edb: ElectrifiedDatabase) => setDb(edb))
      .catch((err: Error) => {
        console.warn('Error electrifying database');

        throw err;
      });
  }, []);

  return (
    <ElectricProvider db={db}>
      <Example />
    </ElectricProvider>
  );
};
```

To try out the example, you can run the application from ElectricSQL hosted service, or use a local development cluster. To launch the cluster you will need Makefile and Docker:

```bash
 git clone https://github.com/electric-sql/electric
 cd electric
make start_dev_env && make deps compile shell

```

You can tear down all containers with `make stop_dev_env`.

**Note**: you’ll notice that the scripts launches two Antidote clusters and a pair of Postgres instances. This is a lot more than what we actually need for this example.

Now, clone this project and install it:

```bash
 git clone https://github.com/electric-sql/examples
 cd examples/react-native
 yarn
```

You can edit ElectricSQL [configurations](https://electric-sql/docs/usage/configure) in `satellite-config.js`:

```javascript
const config = {
  app: 'example-app',
  migrations: migrationsData,
};
```

When running your application from Electric service, edit `app` to match your application name.
When running Electric yourself, you can set `url` to override the location of the service ( default is "http://localhost:5133").

Run the application on the simulator or the device

```bash
 yarn run ios
```

Go ahead and try the [web](https://github.com/electric-sql/examples/tree/main/web) example and see data replication across device and browser, without any extra code to handle replication.

We are launching our hosted service soon. You can join the [waitlist](https://console.electric-sql.com/join/waitlist) to get early access.

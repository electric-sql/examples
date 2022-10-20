# Web browser example
This example shows how create a React application backed by an electrified SQLite database, synching data across devices through the Cloud.

To use SQLite in the browser there is a bit of fiddling with configurations. To get you started, we provide an electrified SQL.JS driver that relays operations to an absurd-sql database running inside a worker. It sounds complicated, but all boils down to the following block of code:
```jsx
const ElectrifiedComponent = () => {
  const [ db, setDb ] = useState<ElectrifiedDatabase>()
  const worker = new Worker("./worker.js", { type: "module" });

  useEffect(() => {
    initElectricSqlJs(worker, {locateFile: (file: any) => `/${file}`})
      .then((SQL: any) => SQL.openDatabase('example.db'))
      .then((db: ElectrifiedDatabase) => setDb(db))
  }, [])

  return (
    <ElectricProvider db={db}>
      <Component />
    </ElectricProvider>
  )
}
```

To try out the example, you can run the application from ElectricSQL hosted service, or use a local development cluster. To launch the cluster you will need Makefile and Docker:
```bash
 git clone https://github.com/electric-sql/electric
 cd electric
 make start_dev_env && make deps compile shell
```
You can tear down all containers with ```make stop_dev_env```.

**Note**: you’ll notice that the scripts launches two Antidote clusters and a pair of Postgres instances. This is a lot more than what we actually need for this example.
 
Now, clone this project and install it:
```bash
 git clone https://github.com/electric-sql/examples
 cd examples/web
 yarn
```

You can edit ElectricSQL [configurations](https://electric-sql/docs/usage/configure) in  ```satellite-config.js```:
```javascript
const config = {
  app: "example-app",
  migrations: migrationsData,
};
```
When running your application from Electric service, edit ```app``` to match your application name.
When running Electric yourself, you can set ```url``` to override the location of the service (  default is "http://localhost:5133").

Bundle the Javascript and start the server:
```bash
 yarn run build && yarn run start
```

Open the url http://localhost:3000/ in two different browsers (so they are backed by different databases) and try out. You'll see data being replicated across databases, without any extra code to handle replication.

We are launching our hosted service soon. You can join the [waitlist](https://console.electric-sql.com/join/waitlist) to get early access.
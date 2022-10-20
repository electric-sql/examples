# React example
This example shows how create a React application backed by Electrified SQLite database.

To use SQLite in the browser there is a bit of fiddling with configurations. To get you started, we provide an Electrified SQL.JS driver that relays operations to an absurd-sql database running inside a worker. It sounds complicated, but all boils down to the following block of code:
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

To try out the example, we first need to launch ElectricSQL infrastructure. You are going to need Makefile and Docker for this.

Clone the Electric repository and launch the development cluster:
```bash
 git clone https://github.com/electric-sql/electric
 cd electric
 make start\_dev\_env && make deps compile shell
```
When you’re done experimenting, you can tear down all containers with ```make stop_dev_env```.

**Note**: you’ll notice that the scripts launches two Antidote clusters and a pair of Postgres instances. This is a lot more than what we actually need for this example.
 
Now, clone this project and install it:
```bash
 git clone https://github.com/electric-sql/examples
 cd examples/web
 npm install
```

Bundle the Javascript and start the server:
```bash
 npm run build && npm run start
```

Open the url http://localhost:3000/ in two different browsers (so they are backed by different databases) and try out. You'll see data being replicated across databases, without any extra code to handle replication.

We are launching our hosted service soon. You can join the [waitlist](https://console.electric-sql.com/join/waitlist) to get early access.
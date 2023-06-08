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

This is an example mobile app using [React Native](https://reactnative.dev) with the [react-native-sqlite-storage](https://www.npmjs.com/package/react-native-sqlite-storage) driver.

## Pre-reqs

See the React Native CLI Quickstart section at [reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup).

## Install

Clone this repo and change directory into this folder:

```sh
git clone https://github.com/electric-sql/examples
cd examples/react-native
```

Install the dependencies:

```sh
yarn
```

Install the [pods](https://cocoapods.org):

```sh
cd ios && pod install && cd ..
```

You may want to also check the [install section of the react-native-sqlite-storage driver README](https://github.com/andpor/react-native-sqlite-storage#installation).

## Run

Run in the Android simulator:

```sh
yarn android
```

Run in the iOS simulator:

```sh
yarn ios
```

Or open in Xcode:

```sh
open ios/ElectricSQLExample.xcworkspace
```

## Sync

The application is setup to sync via a local instance of the Electric sync service. See the docs for more information on [how to run the backend locally](https://electric-sql.com/docs/overview/examples#option-3--run-the-backend-locally).

## Notes on the code

The main code to look at is in [`./src/Example.tsx`](./src/Example.tsx).

```tsx
export const ElectrifiedExample = () => {
  const [db, setDb] = useState<ElectrifiedDatabase>();

  useEffect(() => {
    SQLite.openDatabase('example.db')
      .then((db: Database) => electrify(db, promisesEnabled, config))
      .then((db: ElectrifiedDatabase) => setDb(db))
  }, []);

  if (db === undefined) {
    return null
  }

  return (
    <ElectricProvider db={db}>
      <Example />
    </ElectricProvider>
  );
};
```

This pens an electrified database client and passes it to the application using the React Context API. Components can then use the [`useElectric`](https://electric-sql.com/docs/usage/frameworks#useelectric-hook) and [`useElectricQuery`](https://electric-sql.com/docs/usage/frameworks#useelectricquery-hook) to access the database client and bind reactive queries to the component state.

```tsx
const ExampleComponent = () => {
  const {results, error} = useElectricQuery('SELECT value FROM items', []);
  const db = useElectric() as ElectrifiedDatabase;

  if (error !== undefined) {
    return (
      <View>
        <Text style={styles.item}>Error: {`${error}`}</Text>
      </View>
    );
  }

  if (results === undefined) {
    return null;
  }

  const addItem = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO items VALUES(?)', [uuidv4()]);
    });
  };

  const clearItems = async () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM items where true', undefined);
    });
  };

  return (
    <View>
      {results.map((item, index) => (
        <Text key={index} style={styles.item}>
          Item: {item.value}
        </Text>
      ))}

      <Pressable style={styles.button} onPress={addItem}>
        <Text style={styles.text}>Add</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={clearItems}>
        <Text style={styles.text}>Clear</Text>
      </Pressable>
    </View>
  );
};
```

## More information

See the [documentation](https://electric-sql.com/docs) and [community guidelines](https://github.com/electric-sql/meta). If you need help [let us know on Discord](https://discord.gg/B7kHGwDcbj).

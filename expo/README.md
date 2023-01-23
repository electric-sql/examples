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

# ElectricSQL - Expo example

This is an example mobile app using [Expo](https://expo.de) with the [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) driver.

## Pre-reqs

See the [Expo installation docs](https://docs.expo.dev/get-started/installation/).

## Install

Clone this repo and change directory into this folder:

```sh
git clone https://github.com/electric-sql/examples
cd examples/expo
```

Install the dependencies:

```sh
yarn
```

## Run

Run in the Android simulator:

```sh
yarn android
```

Run in the iOS simulator:

```sh
yarn ios
```

## Sync

The application is setup to autmatically sync via the cloud (when connected). See [Running the Examples](https://electric-sql.com/docs/overview/examples) for information on how to:

- [connect to your own sync service](https://electric-sql.com/docs/overview/examples#option-2--connect-to-your-own-sync-service)
- [run the backend locally](https://electric-sql.com/docs/overview/examples#option-3--run-the-backend-locally)

## Notes on the code

The main code to look at is in [`./src/Example.tsx`](./src/Example.tsx).

```tsx
export const ElectrifiedExample = () => {
  const [db, setDb] = useState<ElectrifiedDatabase>();

  useEffect(() => {
    const init = async () => {
      const original = SQLite.openDatabase('example.db');
      const db = await electrify(original, config)

      setDb(db)
    }

    init();
  }, []);

  if (db === null) {
    return null
  }

  return (
    <ElectricProvider db={db}>
      <Example />
    </ElectricProvider>
  );
};
```

This opens an electrified database client and passes it to the application using the React Context API. Components can then use the [`useElectric`](https://electric-sql.com/docs/usage/frameworks#useelectric-hook) and [`useElectricQuery`](https://electric-sql.com/docs/usage/frameworks#useelectricquery-hook) to access the database client and bind reactive queries to the component state.

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

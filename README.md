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

# ElectricSQL Examples

This repo contains example applications illustrating how to use [ElectricSQL](https://electric-sql.com) with various drivers and frameworks.

See the sub folders for the actual applications. These include:

- [expo](./expo) &mdash; example mobile app using [Expo](https://expo.dev) with the [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) driver
- [react-native](./react-native) &mdash; example mobile app using [React Native](https://reactnative.dev) with the [react-native-sqlite-storage](https://www.npmjs.com/package/react-native-sqlite-storage) driver
- [web](./web) &mdash; a simple web application using ElectricSQL in the browser with [SQL.js](https://sql.js.org) and [absurd-sql](https://github.com/jlongster/absurd-sql)

## Running the examples

Each example has usage instructions in the `README.md`.

See [Running the Examples](/docs/overview/examples) for information on how to:

- [connect to your own sync service](/docs/overview/examples#option-2--connect-to-your-own-sync-service)
- [run the backend locally](/docs/overview/examples#option-3--run-the-backend-locally)

## More information

See the [documentation](https://electric-sql.com/docs) and [community guidelines](https://github.com/electric-sql/meta). If you need help [let us know on Discord](https://discord.gg/B7kHGwDcbj).

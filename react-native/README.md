
# Electric SQL React Native Demo

This is a Local-first SQL demo app for React Native, using the [react-native-electric-sql](https://github.com/vaxine-io/react-native-electric-sql) library.

There is a single React Native `App.js` component that runs two demos:

1. `ElectricDemo` -- shows reactive SQL queries with active data sync using a WebSQL compliant driver
2. `TypeORMDemo` -- shows the same, using an ORM (specifically TypeORM) rather than the raw SQL driver

## Usage

The example show the use of `ElectricProvider` in App.js. This should be included once, as the root element of your React app. This provides a configured Electric SQL Database client, which uses a single, shared database connection.

The shared database connection handle ties into the SQLite:

- [update hook](https://www.sqlite.org/c3ref/update_hook.html) for change notifications (enabling live queries); and
- [session machinery](https://www.sqlite.org/sessionintro.html) for replication (enabling active-active cloud sync)

The two demos show how to use the configured client to read and write data, including binding live queries to your reactive components that update whenever data is changed -- either locally, or by another user/device via the active-active replication.

## Targets

It's iOS only, because the `react-native-electric-sql` dependency is currently iOS only. The typescript config is to support TypeORM with its decorated entities (it's not mandatory to use Typescript to use Electric SQL).

## Install

```sh
yarn
cd ios && pod install && cd ..
```

## Run

```sh
yarn run ios
```

Or open `ios/ElectricSQLDemo.xcworkspace` in XCode.

## Develop

If using this to drive `react-native-electric-sql` in development, `yalc` is a
useful tool to link the local dependency as per [this article](https://www.viget.com/articles/how-to-use-local-unpublished-node-packages-as-project-dependencies/).

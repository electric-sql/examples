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

See the sub folders for the actual applications:

- [expo](./expo) &mdash; example mobile app using [Expo](https://expo.dev) with the [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) driver
- [react-native](./react-native) &mdash; example mobile app using [React Native](https://reactnative.dev) with the [react-native-sqlite-storage](https://www.npmjs.com/package/react-native-sqlite-storage) driver
- [web](./web) &mdash; example web application using ElectricSQL in the browser with [SQL.js](https://sql.js.org) and [absurd-sql](https://github.com/jlongster/absurd-sql)

## Running the examples

Each example has usage instructions in the README. It may also be helpful to read through the [ElectricSQL usage documentation](https://electric-sql.com/docs/usage), including the sections on [configuration](https://electric-sql.com/docs/usage/configure), [migrations](https://electric-sql.com/docs/usage/migrations) and the relevant section of the [drivers guide](https://electric-sql.com/docs/usage/drivers).

### Connecting to the backend

As a local-first system, ElectricSQL defaults to working without a backend. So you can run these applications without connecting to a replication service. However, to develop, test and run with replication working, you'll need to configure a backend to connect to.

### Using the ElectricSQL service

The simplest way to configure a backend is to [sign up to ElectricSQL](https://console.electric-sql.com/auth/signup) and create an application. This will give you a globally unique `app` slug and an environment name. Paste this into your [application config](https://electric-sql.com/docs/usage/configure), which in these examples is typically defined in an `electric-config.js` file in the root of the example folder, e.g.:

```js
const config = {
  app: '<YOUR APP SLUG>',
  env: '<YOUR ENV NAME>',
  // ... other configuration options ...
};
```

### Running the backend locally

Alternatively, you can clone the [electric-sql/electric](https://github.com/electric-sql/electric) repo and run locally using Makefile, Docker and [Elixir 1.14 compiled with Erlang 24](https://thinkingelixir.com/install-elixir-using-asdf/).

See the [electric repo README](https://github.com/electric-sql/electric) for instructions but in short:

```sh
git clone https://github.com/electric-sql/electric
cd electric
make start_dev_env
make deps compile
```

Make sure you've [built your migrations](https://electric-sql.com/docs/usage/migrations) in your application folder, then set the `MIGRATIONS_DIR` environment variable to the path to the migrations folder:

```sh
export MIGRATIONS_DIR='../path/to/migrations'
```

Now run the electric service:

```sh
make shell
```

Apply the migrations locally:

```sh
make apply_migration name=$MIGRATION_NAME
```

Where `MIGRATION_NAME` is the name of a migration folder created using [`electric migrations new`](https://electric-sql.com/docs/usage/migrations#2-schema-evolution), for example:

```sh
make apply_migration name=1666288253_create_items
```

You can then configure your application to connect to the local backend using the `replication` config options:

```js
const config = {
  replication: {
    address: 'localhost',
    port: 5133
  },
  // ... other configuration options ...
};
```

## More information

See the [documentation](https://electric-sql.com/docs) and [community guidelines](https://github.com/electric-sql/meta). If you need help [let us know on Discord](https://discord.gg/B7kHGwDcbj).

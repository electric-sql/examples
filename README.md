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

- [expo](./expo) &mdash; example mobile app using [Expo](https://expo.de) with the [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) driver
- [react-native](./react-native) &mdash; example mobile app using [React Native](https://reactnative.dev) with the [react-native-sqlite-storage](https://www.npmjs.com/package/react-native-sqlite-storage) driver
- [web](./web) &mdash; example web application using ElectricSQL in the browser with [SQL.js](https://sql.js.org) and [absurd-sql](https://github.com/jlongster/absurd-sql)

## Running the examples

Each example has usage instructions in the README. It may also be helpful to read through the [ElectricSQL usage documentation](https://electric-sql.com/docs/usage), including the sections on [configuration](https://electric-sql.com/docs/usage/configure), [migrations](https://electric-sql.com/docs/usage/migrations) and the relevant section of the [drivers guide](https://electric-sql.com/docs/usage/drivers).

### Connecting to the backend

As a local-first system, ElectricSQL defaults to working without a backend. So you can run these applications without connecting to a replication service. However, to develop, test and run with replication working, you'll need to configure a backend to connect to.

#### Using the ElectricSQL service

The simplest way to configure a backend is to [sign up to ElectricSQL](https://console.electric-sql.com/auth/signup) and create an application. This will give you a globally unique `app` slug. Paste this into your [application config](https://electric-sql.com/docs/usage/configure), which in these examples is typically defined in an `electric-config.js` file in the root of the example folder.

#### Running the backend locally

Alternatively, you can clone the [electric-sql/electric](https://github.com/electric-sql/electric) repo and run locally using Makefile, Docker and [Elixir 1.14 compiled with Erlang 24](https://thinkingelixir.com/install-elixir-using-asdf/):

```sh
 git clone https://github.com/electric-sql/electric
 cd electric
 make start_dev_env && ELECTRIC_MIGRATIONS_DIR='path to migration folder in the example' make deps compile shell
```
**Note**: we are improving our images so you don't have to install Elixir in the future.

This runs a replication service on `localhost:5133`, which you can specify to connect to using the `replication` config option:

```js
const config = {
  replication: {
    address: 'localhost'
    port: 5133,
  },
  // ... other configuration options ...
};
```
```ELECTRIC_MIGRATIONS_DIR``` specifies the location of the migration files for the example. This is a temporary workaround while we add support for uploading migrations.

Note that you can tear down all the containers with:

```sh
make stop_dev_env
```

#### Applying migrations

To apply the migrations that were loaded in the previous section, run the commands:

```bash
  curl -v -X PUT http://localhost:5050/api/migrations/postgres_1 -H 'Content-Type: application/json' -d '{"vsn":"1666288253_create_items"}'
  curl -v -X PUT http://localhost:5050/api/migrations/postgres_2 -H 'Content-Type: application/json' -d '{"vsn":"1666288253_create_items"}'
```
This applies the migration with name ```1666288253_create_items``` on the specified Postgres instances.

## More information

See the [documentation](https://electric-sql.com/docs) and [community guidelines](https://github.com/electric-sql/meta). If you need help [let us know on Discord](https://discord.gg/B7kHGwDcbj).

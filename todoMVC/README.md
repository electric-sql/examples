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

# ElectricSQL - TodoMVC

This is an example web application using ElectricSQL in the browser with [SQL.js](https://sql.js.org) and [absurd-sql](https://github.com/jlongster/absurd-sql).

## Install

Clone this repo and change directory into this folder:

```sh
git clone https://github.com/electric-sql/examples
cd examples/todoMVC
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

## More information

See the [documentation](https://electric-sql.com/docs) and [community guidelines](https://github.com/electric-sql/meta). If you need help [let us know on Discord](https://discord.gg/B7kHGwDcbj).

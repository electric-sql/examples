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

This is an example TodoMVC web application using ElectricSQL in the browser with [SQL.js](https://sql.js.org) and [absurd-sql](https://github.com/jlongster/absurd-sql).

## Install

Clone this repo and change directory into this folder:

```sh
git clone https://github.com/electric-sql/examples
cd examples/todoMVC
```

Install the dependencies:


```sh
yarn
```

## Run

Build and run:


```sh
yarn start

```

## Sync

The application is setup to sync via a local instance of the Electric sync service. See the docs for more information on [how to run the backend locally](https://electric-sql.com/docs/overview/examples#option-3--run-the-backend-locally).

Open [localhost:3001](http://localhost:3001) in two different browsers (so they're backed by different databases) and try it out. You'll see data being replicated between the client applications.

## More information

See the [documentation](https://electric-sql.com/docs) and [community guidelines](https://github.com/electric-sql/meta). If you need help [let us know on Discord](https://discord.gg/B7kHGwDcbj).

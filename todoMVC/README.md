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

This is an example TodoMVC web application using ElectricSQL in the browser with [wa-sqlite](https://github.com/rhashimoto/wa-sqlite).

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
yarn prepare # prepares wa-sqlite and electric
yarn prisma-generate # prepares prisma and generates an Electric client from your Prisma schema
yarn start # runs the app
```

## Sync


The application is setup to automatically sync via the cloud (when connected).



Open [localhost:3001](http://localhost:3001) in two different browsers (so they're backed by different databases) and try it out. You'll see data being replicated between the client applications.



See [Running the Examples](https://electric-sql.com/docs/overview/examples) for information on how to:

- [connect to your own sync service](https://electric-sql.com/docs/overview/examples#option-2--connect-to-your-own-sync-service)
- [run the backend locally](https://electric-sql.com/docs/overview/examples#option-3--run-the-backend-locally)

## More information

See the [documentation](https://electric-sql.com/docs) and [community guidelines](https://github.com/electric-sql/meta). If you need help [let us know on Discord](https://discord.gg/B7kHGwDcbj).

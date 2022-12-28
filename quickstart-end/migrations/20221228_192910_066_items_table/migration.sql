/*
Electric SQL Migration
name: 20221228_192910_066_items_table
title: items table

When you build or sync these migrations we will add some triggers and metadata
so that Electric Satellite can sync your data.

Write your SQLite migration below.
*/
CREATE TABLE IF NOT EXISTS items (
  value TEXT PRIMARY KEY NOT NULL
) WITHOUT ROWID;

/*
ElectricDB Migration
{"metadata": {"title": "init", "name": "1666288242_init", "sha256": "065f6851ac11a34c6ed61e57d5d93a34252d1d8cd8eeeb73271e9e74586676ab"}}
*/

/*---------------------------------------------
Below are templated triggers added by Satellite
---------------------------------------------*/

-- The ops log table
CREATE TABLE IF NOT EXISTS _electric_oplog (
  rowid INTEGER PRIMARY KEY AUTOINCREMENT,
  namespace String NOT NULL,
  tablename String NOT NULL,
  optype String NOT NULL,
  primaryKey String NOT NULL,
  newRow String,
  oldRow String,
  timestamp TEXT
);

-- Somewhere to keep our metadata
CREATE TABLE IF NOT EXISTS _electric_meta (
  key TEXT,
  value BLOB
);

-- Somewhere to track migrations
CREATE TABLE IF NOT EXISTS _electric_migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  sha256 TEXT NOT NULL,
  applied_at TEXT NOT NULL
);

-- Initialisation of the metadata table
INSERT INTO _electric_meta (key, value) VALUES ('compensations', 0), ('lastAckdRowId','0'), ('lastSentRowId', '0'), ('lsn', 'MA==');


-- These are toggles for turning the triggers on and off
DROP TABLE IF EXISTS _electric_trigger_settings;
CREATE TABLE _electric_trigger_settings(tablename STRING PRIMARY KEY, flag INTEGER);



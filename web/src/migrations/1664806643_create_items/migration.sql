/*
ElectricDB Migration
{"metadata": {"title": "create_items", "name": "1664806643_create_items"}}
*/

CREATE TABLE IF NOT EXISTS main.items (
  value TEXT PRIMARY KEY
) STRICT, WITHOUT ROWID;

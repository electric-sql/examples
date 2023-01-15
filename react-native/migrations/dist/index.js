export default {
  "app": "glossy-party-1694",
  "env": "default",
  "migrations": [
    {
      "encoding": "escaped",
      "name": "20230113_164423_656_init",
      "satellite_body": [],
      "sha256": "01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b",
      "status": "applying",
      "title": "init"
    },
    {
      "encoding": "escaped",
      "name": "20230113_164716_291_create_items",
      "satellite_body": [
        "CREATE TABLE IF NOT EXISTS items (\n  value TEXT PRIMARY KEY NOT NULL\n) WITHOUT ROWID;",
        "DROP TABLE IF EXISTS _electric_trigger_settings;",
        "CREATE TABLE _electric_trigger_settings(tablename STRING PRIMARY KEY, flag INTEGER);",
        "INSERT INTO _electric_trigger_settings(tablename,flag) VALUES ('main.items', 1);",
        "DROP TRIGGER IF EXISTS update_ensure_main_items_primarykey;",
        "CREATE TRIGGER update_ensure_main_items_primarykey\n   BEFORE UPDATE ON main.items\nBEGIN\n  SELECT\n    CASE\n      WHEN old.value != new.value THEN\n        RAISE (ABORT,'cannot change the value of column value as it belongs to the primary key')\n    END;\nEND;",
        "DROP TRIGGER IF EXISTS insert_main_items_into_oplog;",
        "CREATE TRIGGER insert_main_items_into_oplog\n   AFTER INSERT ON main.items\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'INSERT', json_object('value', new.value), json_object('value', new.value), NULL, NULL);\nEND;",
        "DROP TRIGGER IF EXISTS update_main_items_into_oplog;",
        "CREATE TRIGGER update_main_items_into_oplog\n   AFTER UPDATE ON main.items\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'UPDATE', json_object('value', new.value), json_object('value', new.value), json_object('value', old.value), NULL);\nEND;",
        "DROP TRIGGER IF EXISTS delete_main_items_into_oplog;",
        "CREATE TRIGGER delete_main_items_into_oplog\n   AFTER DELETE ON main.items\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'DELETE', json_object('value', old.value), NULL, json_object('value', old.value), NULL);\nEND;"
      ],
      "sha256": "e4ad678b013b634a667ada6b4094be250bbdd90300457c1f70f3cde78022abc0",
      "status": "not_applied",
      "title": "create items"
    }
  ]
}

export const data = {
  migrations: [
    {
      satellite_body: [
        "-- Temporary fix LSN issue: \nUPDATE _electric_meta SET value='MA==' WHERE key='lsn';",
        'CREATE TABLE IF NOT EXISTS main.items (\n  value TEXT PRIMARY KEY\n);',
        '-- These are toggles for turning the triggers on and off\nDROP TABLE IF EXISTS _electric_trigger_settings;',
        'CREATE TABLE _electric_trigger_settings(tablename STRING PRIMARY KEY, flag INTEGER);',
        "INSERT INTO _electric_trigger_settings(tablename,flag) VALUES ('main.items', 1);",
        '-- Ensures primary key is immutable\nDROP TRIGGER IF EXISTS update_ensure_main_items_primarykey;',
        "CREATE TRIGGER update_ensure_main_items_primarykey\n   BEFORE UPDATE ON main.items\nBEGIN\n  SELECT\n    CASE\n      WHEN old.value != new.value THEN\n        RAISE (ABORT,'cannot change the value of column value as it belongs to the primary key')\n    END;\nEND;",
        '-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\n\nDROP TRIGGER IF EXISTS insert_main_items_into_oplog;',
        "CREATE TRIGGER insert_main_items_into_oplog\n   AFTER INSERT ON main.items\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'INSERT', json_object('value', new.value), json_object('value', new.value), NULL, NULL);\nEND;",
        'DROP TRIGGER IF EXISTS update_main_items_into_oplog;',
        "CREATE TRIGGER update_main_items_into_oplog\n   AFTER UPDATE ON main.items\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'UPDATE', json_object('value', new.value), json_object('value', new.value), json_object('value', old.value), NULL);\nEND;",
        'DROP TRIGGER IF EXISTS delete_main_items_into_oplog;',
        "CREATE TRIGGER delete_main_items_into_oplog\n   AFTER DELETE ON main.items\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'DELETE', json_object('value', old.value), NULL, json_object('value', old.value), NULL);\nEND;",
      ],
      encoding: 'escaped',
      name: '1666288253_create_items',
      sha256:
        'ddf6ba15a0c6c8a5955ad8c29bc0a785416a47e4d22e0aa8f5f5e2be2e70b46c',
      title: 'create_items',
    },
  ],
};

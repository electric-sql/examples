/*
ElectricDB Migration
{"metadata": {"title": "todoMVC", "name": "1666777137_todomvc", "sha256": "667dcfd510936db646994998ca109aef583387d881333e79df5d9a2c34535ac3"}}
*/

CREATE TABLE "todolist" (
    "id" TEXT,
    "filter" TEXT,
    "editing" TEXT,
    PRIMARY KEY ("id")
);

CREATE TABLE "todo" (
    "id" TEXT,
    "listid" TEXT,
    "text" TEXT,
    "completed" INTEGER DEFAULT 0 NOT NULL,
    PRIMARY KEY ("id")
  );
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
INSERT INTO _electric_trigger_settings(tablename,flag) VALUES ('main.todo', 1);
INSERT INTO _electric_trigger_settings(tablename,flag) VALUES ('main.todolist', 1);


/* Triggers for table todo */

-- Ensures primary key is immutable
DROP TRIGGER IF EXISTS update_ensure_main_todo_primarykey;
CREATE TRIGGER update_ensure_main_todo_primarykey
   BEFORE UPDATE ON main.todo
BEGIN
  SELECT
    CASE
      WHEN old.id != new.id THEN
        RAISE (ABORT,'cannot change the value of column id as it belongs to the primary key')
    END;
END;

-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table

DROP TRIGGER IF EXISTS insert_main_todo_into_oplog;
CREATE TRIGGER insert_main_todo_into_oplog
   AFTER INSERT ON main.todo
   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.todo')
BEGIN
  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)
  VALUES ('main', 'todo', 'INSERT', json_object('id', new.id), json_object('id', new.id, 'listid', new.listid, 'text', new.text, 'completed', new.completed), NULL, NULL);
END;

DROP TRIGGER IF EXISTS update_main_todo_into_oplog;
CREATE TRIGGER update_main_todo_into_oplog
   AFTER UPDATE ON main.todo
   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.todo')
BEGIN
  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)
  VALUES ('main', 'todo', 'UPDATE', json_object('id', new.id), json_object('id', new.id, 'listid', new.listid, 'text', new.text, 'completed', new.completed), json_object('id', old.id, 'listid', old.listid, 'text', old.text, 'completed', old.completed), NULL);
END;

DROP TRIGGER IF EXISTS delete_main_todo_into_oplog;
CREATE TRIGGER delete_main_todo_into_oplog
   AFTER DELETE ON main.todo
   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.todo')
BEGIN
  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)
  VALUES ('main', 'todo', 'DELETE', json_object('id', old.id), NULL, json_object('id', old.id, 'listid', old.listid, 'text', old.text, 'completed', old.completed), NULL);
END;




/* Triggers for table todolist */

-- Ensures primary key is immutable
DROP TRIGGER IF EXISTS update_ensure_main_todolist_primarykey;
CREATE TRIGGER update_ensure_main_todolist_primarykey
   BEFORE UPDATE ON main.todolist
BEGIN
  SELECT
    CASE
      WHEN old.id != new.id THEN
        RAISE (ABORT,'cannot change the value of column id as it belongs to the primary key')
    END;
END;

-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table

DROP TRIGGER IF EXISTS insert_main_todolist_into_oplog;
CREATE TRIGGER insert_main_todolist_into_oplog
   AFTER INSERT ON main.todolist
   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.todolist')
BEGIN
  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)
  VALUES ('main', 'todolist', 'INSERT', json_object('id', new.id), json_object('id', new.id, 'filter', new.filter, 'editing', new.editing), NULL, NULL);
END;

DROP TRIGGER IF EXISTS update_main_todolist_into_oplog;
CREATE TRIGGER update_main_todolist_into_oplog
   AFTER UPDATE ON main.todolist
   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.todolist')
BEGIN
  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)
  VALUES ('main', 'todolist', 'UPDATE', json_object('id', new.id), json_object('id', new.id, 'filter', new.filter, 'editing', new.editing), json_object('id', old.id, 'filter', old.filter, 'editing', old.editing), NULL);
END;

DROP TRIGGER IF EXISTS delete_main_todolist_into_oplog;
CREATE TRIGGER delete_main_todolist_into_oplog
   AFTER DELETE ON main.todolist
   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.todolist')
BEGIN
  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)
  VALUES ('main', 'todolist', 'DELETE', json_object('id', old.id), NULL, json_object('id', old.id, 'filter', old.filter, 'editing', old.editing), NULL);
END;





/*
ElectricDB Migration
{"metadata": {"title": "todoMVC", "name": "1666777137_todomvc"}}
*/

CREATE TABLE "todolist" (
    "id" TEXT,
    "filter" TEXT,
    "editing" INTEGER,
    PRIMARY KEY ("id")
);

CREATE TABLE "todo" (
    "id" TEXT,
    "listid" TEXT,
    "text" TEXT,
    "completed" INTEGER DEFAULT 0 NOT NULL,
    PRIMARY KEY ("id")
  );
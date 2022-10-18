import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import * as SQLite from "expo-sqlite";

import { electrify } from "electric-sql/dist/drivers/expo-sqlite";
import { ElectricProvider, useElectric, useElectricQuery } from "electric-sql/dist/frameworks/react";

import { data as migrationsData } from "./migrations";
import { StatusBar } from "expo-status-bar";

export default Example = () => {
  const [db, setDb] = useState();

  useEffect(() => {
    const odb = SQLite.openDatabase("example.db");
    new Promise((res) =>
      electrify(odb, migrationsData)
        .then((db) => setDb(db))
        .catch((err) => {
          console.warn("Error electrifying database");
          console.log(JSON.stringify(err));
          throw err;
        })
        .finally(() => res())
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ElectricProvider db={db}>
        <ExampleComponent />
      </ElectricProvider>
    </View>
  );
};

const ExampleComponent = () => {
  const { results, error } = useElectricQuery("SELECT value FROM items", []);
  const db = useElectric();

  if (error !== undefined) {
    return (
      <View>
        <Text style={styles.item}>Error: {`${error}`}</Text>
      </View>
    );
  }

  if (db === undefined || results === undefined) {
    return null;
  }

  const addItem = () => {
    const randomValue = Math.random().toString(16).substr(2);

    db.transaction((tx) => {
      tx.executeSql("INSERT INTO items VALUES(?)", [randomValue], () => {
        db.electric.notifier.potentiallyChanged();
      });
    });
  };

  const clearItems = async () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM items where true", undefined, () => {
        db.electric.notifier.potentiallyChanged();
      });
    });
  };

  return (
    <View>
      {results.map((item, index) => (
        <Text key={index} style={styles.item}>
          Item: {item.value}
        </Text>
      ))}

      <Pressable style={styles.button} onPress={addItem}>
        <Text style={styles.text}>Add</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={clearItems}>
        <Text style={styles.text}>Clear</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 18,
    marginBottom: 8,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#404040",
  },
  item: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    margin: 18,
    marginBottom: 4,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    color: "black",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#efefef",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

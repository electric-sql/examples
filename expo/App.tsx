import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import * as SQLite from "expo-sqlite";

// Metro does not support package.json exports. Use resolver.
// https://github.com/facebook/metro/issues/670
import { ElectrifiedDatabase, electrify } from "electric-sql/expo";
import { ElectricProvider, useElectric, useElectricQuery } from "electric-sql/react";

import { data as migrationsData } from "./migrations";

export default () => {
  const [db, setDb] = useState<ElectrifiedDatabase>();

  useEffect(() => {
    const odb = SQLite.openDatabase("example.db");
    new Promise<void>((res) =>
      electrify(odb as any, migrationsData as any)
        .then((db: ElectrifiedDatabase) => setDb(db))
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
  const db = useElectric()  as ElectrifiedDatabase;; // FIXME

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
        db.electric.potentiallyChanged();
      });
    });
  };

  const clearItems = async () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM items where true", undefined, () => {
        db.electric.potentiallyChanged();
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

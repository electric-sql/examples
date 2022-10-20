import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

import * as SQLite from "expo-sqlite";

// Metro does not support package.json exports. Use resolver.
// https://github.com/facebook/metro/issues/670
import {electrify, ElectrifiedDatabase} from 'electric-sql/expo';
import {
  ElectricProvider,
  useElectric,
  useElectricQuery,
} from 'electric-sql/react';

import {styles} from './Styles';

import config from '../electric-config';

export const ElectrifiedExample = () => {
  const [db, setDb] = useState<ElectrifiedDatabase>();

  useEffect(() => {
    const odb = SQLite.openDatabase('example.db');
    const init = async () => {     
      await electrify(odb as any, config as any)
        .then((db: ElectrifiedDatabase) => setDb(db))
        .catch((err) => {
          console.warn("Error electrifying database");
          console.log(JSON.stringify(err));
          throw err;
        })
      }
    init();
  }, []);

  return (
    <ElectricProvider db={db}>
      <Example />
    </ElectricProvider>
  );
};

const Example = () => {
  const {results, error} = useElectricQuery('SELECT value FROM items', []);
  const db = useElectric() as ElectrifiedDatabase;

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

    db.transaction(tx => {
      tx.executeSql('INSERT INTO items VALUES(?)', [randomValue], () => {
        db.electric.notifier.potentiallyChanged();
      });
    });
  };

  const clearItems = async () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM items where true', undefined, () => {
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

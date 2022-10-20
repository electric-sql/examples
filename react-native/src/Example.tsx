import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

// Metro does not support package.json exports. Use resolver.
// https://github.com/facebook/metro/issues/670
import {electrify, ElectrifiedDatabase} from 'electric-sql/react-native';
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
    const promisesEnabled = true;
    SQLite.enablePromise(promisesEnabled);

    SQLite.openDatabase({name: 'example.db'})
      .then((sqlDb: SQLiteDatabase) =>
        electrify(sqlDb as any, promisesEnabled, config as any),
      )
      .then((edb: ElectrifiedDatabase) => setDb(edb))
      .catch((err: Error) => {
        console.warn('Error electrifying database');

        throw err;
      });
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
      tx.executeSql('INSERT INTO items VALUES(?)', [randomValue]);
    });
  };

  const clearItems = async () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM items where true', undefined);
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

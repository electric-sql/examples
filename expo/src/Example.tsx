import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

import * as SQLite from "expo-sqlite";

// Metro does not support package.json exports. Use resolver.
// https://github.com/facebook/metro/issues/670
import {Database, ElectrifiedDatabase, electrify} from 'electric-sql/expo';
import { configure } from 'electric-sql/config'
import {ElectricProvider, useElectric, useElectricQuery} from 'electric-sql/react';

import {styles} from './Styles';

import app from '../electric.json'
import migrations from '../migrations/dist'
const config = configure(app, migrations)

export const Example = () => {
  const [db, setDb] = useState<ElectrifiedDatabase>();

  useEffect(() => {
    const init = async () => {
      const original = SQLite.openDatabase('example.db') as Database;
      const electrified = await electrify(original, config)
      setDb(electrified)
    }

    init();
  }, []);

  if (db === undefined) {
    return null
  }

  return (
    <ElectricProvider db={db}>
      <ExampleComponent />
    </ElectricProvider>
  );
};

const ExampleComponent = () => {
  const db = useElectric() as ElectrifiedDatabase
  const { results } = useElectricQuery('SELECT value FROM items', [])

  const addItem = () => {
    const randomValue = Math.random().toString(16).substr(2);
    db.transaction(tx => {
      tx.executeSql('INSERT INTO items VALUES(?)', [randomValue]);
    });
  }

  const clearItems = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM items where true');
    });
  }

  return (
    <View>
      <View>
        <Pressable style={styles.button} onPress={addItem}>
          <Text style={styles.text}>Add</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={clearItems}>
          <Text style={styles.text}>Clear</Text>
        </Pressable>
      </View>
      <View>
        {results && results.map((item, index) => (
          <Text key={index} style={styles.item}>
            Item: {item.value}
          </Text>
        ))}
      </View>
    </View>
  );
};

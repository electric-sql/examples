import React, {useEffect, useState} from 'react'
import {Pressable, Text, View} from 'react-native'

import * as SQLite from "expo-sqlite"

// Metro does not support package.json exports. Use resolver.
// https://github.com/facebook/metro/issues/670
import {Database, ElectrifiedDatabase, electrify} from 'electric-sql/expo'
import {ElectricProvider, useElectric, useElectricQuery} from 'electric-sql/react'

import {styles} from './Styles';
import config from '../electric-config';

export const ElectrifiedExample = () => {
  const [db, setDb] = useState<ElectrifiedDatabase>()

  useEffect(() => {
    const init = async () => {
      const original = SQLite.openDatabase('example.db') as unknown as Database

      const electrified = await electrify(original, config)
      setDb(electrified)
    }

    init()
  }, [])

  if (db === undefined) {
    return null
  }

  return (
    <ElectricProvider db={db}>
      <ExampleComponent />
    </ElectricProvider>
  )
}

const ExampleComponent = () => {
  const {results, error} = useElectricQuery('SELECT value FROM items', [])
  const db = useElectric() as ElectrifiedDatabase

  if (error !== undefined) {
    return (
      <View>
        <Text style={styles.item}>Error: {`${error}`}</Text>
      </View>
    )
  }

  if (results === undefined) {
    return null
  }

  const addItem = () => {
    const randomValue = Math.random().toString(16).substr(2)

    db.transaction(tx => {
      tx.executeSql('INSERT INTO items VALUES(?)', [randomValue])
    })
  }

  const clearItems = async () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM items where true', undefined)
    })
  }

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
  )
}

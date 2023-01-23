import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

import React, {useEffect, useState} from 'react'
import {Pressable, Text, View} from 'react-native'

import * as SQLite from "expo-sqlite"

// Metro does not support package.json exports. Use resolver.
// https://github.com/facebook/metro/issues/670
import {Database, ElectrifiedDatabase, electrify} from 'electric-sql/expo'
import {ElectricProvider, useElectric, useElectricQuery} from 'electric-sql/react'

import {styles} from './Styles'

// Vanilla metro doesn't support symlinks, so we import the config
// bundle by explicit path rather than `../.electric/@config`.
import config from '../.electric/items-example/default'

export const ElectrifiedExample = () => {
  const [db, setDb] = useState<ElectrifiedDatabase>()

  useEffect(() => {
    const init = async () => {
      const original = SQLite.openDatabase('expo-example.db') as unknown as Database

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
    db.transaction(tx => {
      tx.executeSql('INSERT INTO items VALUES(?)', [uuidv4()])
    })
  }

  const clearItems = async () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM items where true', undefined)
    })
  }

  return (
    <View>
      {results && results.map((item: any, index: any) => (
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

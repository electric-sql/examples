import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import SQLite from 'react-native-sqlite-storage'

// XXX why don't the nice entrypoints work?
import { ElectrifiedDatabase, electrify } from 'electric-sql/dist/drivers/react-native-sqlite-storage'
import { Database } from 'electric-sql/dist/drivers/react-native-sqlite-storage/database'
import { ElectricProvider, useElectric, useElectricQuery } from 'electric-sql/dist/frameworks/react'

import { data as migrationsData } from '../migrations'

export const Example = () => {
  const [ db, setDb ] = useState()

  useEffect(() => {
    const promisesEnabled = true
    SQLite.enablePromise(promisesEnabled)

    SQLite.openDatabase('example4.db')
      .then((db: Database) => electrify(db, promisesEnabled, migrationsData))
      .then((db: ElectrifiedDatabase) => setDb(db))
      .catch((err) => console.warn('ERR', err))
  }, [])

  return (
    <ElectricProvider db={db}>
      <ExampleComponent />
    </ElectricProvider>
  )
}

const ExampleComponent = () => {
  const { results, error } = useElectricQuery('SELECT value FROM main.items')
  const db = useElectric()

  if (error !== undefined) {
    return (
      <View>
        <Text style={styles.item}>
          Error: { `${error}` }
        </Text>
      </View>
    )
  }

  if (db === undefined || results === undefined) {
    return null
  }

  const addItem = () => {
    const randomValue = Math.random().toString(16).substr(2)

    db.transaction((tx) => {
      tx.executeSql('INSERT INTO items VALUES(?)', [randomValue])
    })
  }

  const clearItems = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM items where true')
    })
  }

  return (
    <View>
      {results.map((item, index) => (
        <Text key={ index } style={styles.item}>
          Item: { item.value }
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

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 18,
    marginBottom: 8,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#404040',
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
    color: 'black',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#efefef',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})

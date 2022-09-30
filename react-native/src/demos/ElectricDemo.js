'use strict';

import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useElectric, useElectricQuery, randomValue } from 'react-native-electric-sql'

export const ElectricDemo = ({ children }) => {
  // Query `results` are kept in sync automatically.
  const [ results ] = useElectricQuery('SELECT value FROM items')

  // Writes are made using standard SQL.
  const [ sql ] = useElectric()
  const addItem = () => sql.execute('INSERT INTO items VALUES(?)', [randomValue()])

  // Known quirk: you must provide a where clause to `DELETE`
  // statements in order to trigger data change notifications.
  const clearItems = () => sql.execute('DELETE FROM items where true')

  return (
    <View>
      <Text style={styles.sectionTitle}>
        Electric Demo
      </Text>

      { children }

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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 24
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})

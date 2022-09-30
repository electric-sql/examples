'use strict';

import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { DataSource } from 'typeorm'
import { ReactNativeDriver } from 'typeorm/driver/react-native/ReactNativeDriver'

import { makeUseTypeORMHook, useElectricQueryBuilder, randomValue } from 'react-native-electric-sql'
const useTypeORM = makeUseTypeORMHook(DataSource, ReactNativeDriver)

// Define your database schema using TypeORM entities.
import { Item } from '../entities/Item.ts'

export const TypeORMDemo = ({ children }) => {
  // Use a dataSource and repos configured to use Electric SQL.
  const [ dataSource, itemRepo ] = useTypeORM([Item])

  // Define queries using the composable QueryBuilder API.
  // The `results` are kept in sync automatically.
  const [ results ] = useElectricQueryBuilder(dataSource, (_source) => {
    return itemRepo.createQueryBuilder()
      .select()
      // .where(...)
      // .orderBy()
      // .limit()
  })

  // Write data using the standard TypeORM repo APIs.
  const addItem = () => {
    const item = new Item()
    item.value = randomValue()

    itemRepo.save(item)
  }

  // Known quirk: using `itemRepo.clear()` to drop/truncate a table
  // won't trigger the data change notifications Electric needs.
  // Instead use `delete()` but note that delete requires passing
  // in a where clause, hence the `.where('true')` in this example.
  const clearItems = () => {
    itemRepo.createQueryBuilder()
      .delete()
      .where('true')
      .execute()
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>
        TypeORM Demo
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

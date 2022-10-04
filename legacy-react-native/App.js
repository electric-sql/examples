/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { useState } from 'react'

import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { Header } from 'react-native/Libraries/NewAppScreen'

import { ElectricProvider } from 'react-native-electric-sql'

import { ElectricDemo } from './src/demos/ElectricDemo'
import { TypeORMDemo } from './src/demos/TypeORMDemo'

const Section = ({children, title}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle]}>
        {title}
      </Text>
      <Text style={[styles.sectionDescription]}>
        {children}
      </Text>
    </View>
  )
}

const App = () => {
  const STATES = {
    initial: 'INITIAL',
    electric: 'ELECTRIC',
    typeorm: 'TYPEORM'
  }
  const [state, setState] = useState(STATES.initial)

  return (
    <ElectricProvider>
      <SafeAreaView>
        <StatusBar barStyle={'light-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Header />
          <View>
            <Section title="React Native Electric SQL">
              Local-first SQL examples for React Native.
              See the source code in `src/demos`.
            </Section>
            <Section title="1. Electric SQL Demo">
              Reactive demo showing the `useElectric
              and `useElectricQuery` hooks.
            </Section>
            <Pressable style={styles.button} onPress={() => setState(STATES.electric)}>
              <Text style={styles.text}>Run demo</Text>
            </Pressable>
            <Modal animationType="slide"
                transparent={false}
                visible={state == STATES.electric}
                onRequestClose={() => { setState(STATES.initial) }}>
              <SafeAreaView>
                <ElectricDemo>
                  <Pressable style={styles.button} onPress={() => setState(STATES.initial)}>
                    <Text style={styles.text}>Close</Text>
                  </Pressable>
                </ElectricDemo>
              </SafeAreaView>
            </Modal>
            <Section title="2. TypeORM Demo">
              The same reactive demo using TypeORM
              entity schemas and queryBuilder.
            </Section>
            <Pressable style={styles.button} onPress={() => setState(STATES.typeorm)}>
              <Text style={styles.text}>Run demo</Text>
            </Pressable>
            <Modal animationType="slide"
                transparent={false}
                visible={state == STATES.typeorm}
                onRequestClose={() => { setState(STATES.initial) }}>
              <SafeAreaView>
                <TypeORMDemo>
                  <Pressable style={styles.button} onPress={() => setState(STATES.initial)}>
                    <Text style={styles.text}>Close</Text>
                  </Pressable>
                </TypeORMDemo>
              </SafeAreaView>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ElectricProvider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})

export default App

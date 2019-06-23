// utils/_decks.js

import { AsyncStorage } from 'react-native'
import { generateUID } from './helpers'

export const DECKS_STORAGE_KEY = 'flashcards:decks'

function getRandomNumber (max) {
  return Math.floor(Math.random() * max) + 0
}

function setData () {
  let data = {}
  const GUID = generateUID()

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

  return data
}
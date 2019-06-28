import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './_decks'
import { CARDS_STORAGE_KEY } from './_cards'


export function getInitialData () {
  return Promise.all([
    fetchDeckResults(),
    fetchCardResults()
  ]).then(([decks, cards]) => ({
    decks,
    cards
  }))
}


export function fetchDeckResults () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => JSON.parse(results))
      .then( (results) =>
        Object.keys(results).map(function(key){
          return {[key] : results[key]}
        })
      )
}

export function createDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function editDeck ({deck, key}) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function addCardCount(key){
  return fetchDeckResults()
    .then((results) => {
      var deck = results.filter((d) => Object.keys(d)[0] == key)[0][key]
      ++deck.cardCount
      editDeck({key, deck})
    })
}

export function removeDeck (key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function fetchCardResults () {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
      .then((results) => JSON.parse(results))
      .then( (results) =>
        Object.keys(results).map(function(key){
          return {[key] : results[key]}
        })
      )
}

export function createCard ({ card, key }) {
  addCardCount(card.deckKey)
  return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
    [key]: card
  }))
}

export function removeCard (key) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(data))
    })
}
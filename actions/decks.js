import { fetchDeckResults } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_DECK_BY_KEY = 'RECEIVE_DECK_BY_KEY'
export const ADD_DECK = 'ADD_DECK'
export const CARDS_COUNT_DECK = 'CARDS_COUNT_DECK'

export const UP_COUNT_CARD = 'UP_COUNT_CARD'
export const DOWN_COUNT_CARD = 'DOWN_COUNT_CARD'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function handleReceiveDecks(){
    return (dispatch) => {

        return fetchDeckResults()
                .then((decks) => dispatch(receiveDecks(decks)))
    }
}

export function receiveDeckByKey(deckKey) {
    return {
        type: RECEIVE_DECK_BY_KEY,
        deckKey
    }
}

export function addDeck (deck) {
    return {
      type: ADD_DECK,
      deck,
    }
}

export function cardsCountDeck(deckKey, cardCountOption) {
    return {
        type: CARDS_COUNT_DECK,
        cardCountOption,
        deckKey,
    }
}
export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const ADD_CARD = 'ADD_CARD'
import { cardsCountDeck, UP_COUNT_CARD, DOWN_COUNT_CARD } from './decks'
import { createCard, fetchCardResults } from '../utils/api'

export function receiveCards(cards) {
    return {
        type: RECEIVE_CARDS,
        cards,
    }
}

export function handleReceiveCards(){
    return (dispatch) => {
        return fetchCardResults(deckKey)
                .then((decks) => dispatch(receiveCards(decks)))
    }
}

function addCard (card) {
    return {
      type: ADD_CARD,
      card,
    }
}

export function handleCreateCard(key, card){
    return (dispatch) => {
        
        return createCard({ key, card })
            .then(() => {
                dispatch(addCard({[key]: card}))
                dispatch(cardsCountDeck(card.deckKey, UP_COUNT_CARD))
            })
    }
}
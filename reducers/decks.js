import { 
    RECEIVE_DECKS,
    RECEIVE_DECK_BY_KEY,
    ADD_DECK, 
    CARDS_COUNT_DECK, 
    UP_COUNT_CARD, 
    DOWN_COUNT_CARD
 } from '../actions/decks'

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECK_BY_KEY:
            return {
                ...state,
                item: state.items.filter((d) => Object.keys(d).shift() === action.deckKey)[0]
            }
        case RECEIVE_DECKS:
            return {
                ...state,
                items: action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                item: action.deck,
                items: state.items != null ? state.items.concat(action.deck) : [action.deck]
            }
        case CARDS_COUNT_DECK: 
            var cardCount = 0
            if(action.cardCountOption === UP_COUNT_CARD){
                cardCount = ++state.item[action.deckKey].cardCount
            }
            if(action.cardCountOption === DOWN_COUNT_CARD){
                cardCount = --state.item[action.deckKey].cardCount
            }
            return {
                ...state,
                item: {
                    ...state.item,
                },
                items: state.items.map((d) => {
                    if(Object.keys(d).shift() === action.deckKey){
                         d = state.item
                    }
                    return d
                })
            }
        default:
            return state
    }
}
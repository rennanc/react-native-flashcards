import { RECEIVE_DECKS, ADD_DECK } from '../actions/decks'

export default function decks(state = {}, action) {
    switch (action.type) {
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
        default:
            return state
    }
}
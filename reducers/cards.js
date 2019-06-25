import { RECEIVE_CARDS, ADD_CARD } from '../actions/cards'

export default function cards(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CARDS:
            return {
                ...state,
                items: action.cards
            }
        case ADD_CARD:
            return {
                ...state,
                item: action.card,
                items: state.items != null ? state.items.concat(action.card) : [action.card]
            }
        default:
            return state
    }
}
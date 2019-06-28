import { receiveDecks } from "../actions/decks"
import { receiveCards } from "../actions/cards"
import { getInitialData } from '../utils/api'

export function handleInitialData() {
    return (dispatch) => {
        //dispatch(showLoading())
        return getInitialData()
            .then(({decks, cards}) => {
                dispatch(receiveDecks(decks))
                dispatch(receiveCards(cards))
                //dispatch(hideLoading())
            })
    }
}
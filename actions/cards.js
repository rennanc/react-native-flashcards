export const RECEIVE_CARDS = 'RECEIVE_CARDS'

export function receiveCards(cards) {
    return {
        type: RECEIVE_CARDS,
        cards,
    }
}
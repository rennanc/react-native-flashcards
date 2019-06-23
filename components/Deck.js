import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { container } from '../utils/genericStyles'


showCards = () => {

}

function Deck({deck}) {
    return(
        <TouchableOpacity 
            onPress={() => {showCards(deck.key)}}
            >
            <ListItem 
                key={deck.key}
                title={deck.name}
                subtitle={deck.numberCards + ' Carta(s)'}
            />
        </TouchableOpacity>
    )
}

export const styles = StyleSheet.create({
    ...container,
})

export default connect()(Deck)
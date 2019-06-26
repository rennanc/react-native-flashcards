import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { container } from '../utils/genericStyles'



class Deck extends Component {

    render(){
        const { deck } = this.props;
        const key = Object.keys(deck)
        return(
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('DeckDetails',
              { deck: deck })}
                >
                <ListItem 
                    key={key}
                    title={deck[key].name}
                    subtitle={deck[key].cardCount + ' Card(s)'}
                />
            </TouchableOpacity>
        )
    }
}

export const styles = StyleSheet.create({
    ...container,
})

export default withNavigation(connect()(Deck))
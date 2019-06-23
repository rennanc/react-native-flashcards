import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { fetchDeckResults } from '../utils/api'
import { receiveDecks } from '../actions/decks'
import Deck from './Deck'

class DeckCollection extends Component {

    componentDidMount () {
        const { dispatch } = this.props
    
        fetchDeckResults()
          .then((decks) => dispatch(receiveDecks(decks)))
    }

    render(){
        const { decks } = this.props
        const decksMock = [
            {
                key: '04934920492304',
                name: 'numero 1',
                numberCards: 3
            },
            {
                key: '049353452304',
                name: 'numero 2',
                numberCards: 8
            }
        ]
        return (
            <View style={styles.container}>
                <FlatList 
                    data={decksMock}
                    renderItem={({ item }) => (
                        <Deck deck={item}/>
                    )}
                />
            </View>
        )
    }
}


const margin = Platform.OS == 'ios' ? 20 : 0;

const styles = StyleSheet.create({
    container: {
      marginTop: margin,
      flex: 1,
    }
})

function mapStateToProps (decks) {
    return {
      decks
    }
  }
  
export default connect(mapStateToProps)(DeckCollection)
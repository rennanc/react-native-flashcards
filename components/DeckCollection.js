import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native'
import { handleReceiveDecks, receiveDecks } from '../actions/decks'
import Deck from './Deck'
import { MaterialIcons } from '@expo/vector-icons'
import { AsyncStorage } from 'react-native'

class DeckCollection extends Component {

    state = {
        loading: false,
        refreshing: false,
    }

    componentDidMount () {
        this.loadDecks()
    }

    loadDecks = () => {
        const { dispatch } = this.props

        dispatch(handleReceiveDecks())
            .then(() =>
                this.setState({
                loading: false,
                refreshing: false
                })
            )
    }

    handleRefresh = () => {
        this.setState({ refreshing: true })
        this.loadDecks()
    };

    render(){
        const { decks } = this.props
        const decksMock = [
            {'04934920492304':{
                    name: 'numero 1',
                    cardCount: 3
                }
            },
            {'049353452304' :{
                    name: 'numero 2',
                    cardCount: 8
                }
            }
        ]
        return (
            <View style={styles.container}>
                <FlatList 
                    data={decks}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    keyExtractor={(item, index) => 'key'+index }
                    renderItem={({ item }) => (
                        <Deck deck={item}/>
                    )}
                />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('DeckForm')}
                    style={{
                        borderWidth:1,
                        borderColor:'rgba(0,0,0,0.2)',
                        alignItems:'center',
                        justifyContent:'center',
                        width:70,
                        position: 'absolute',                                          
                        bottom: 10,                                                    
                        right: 10,
                        height:70,
                        backgroundColor:'#01a699',
                        borderRadius:100,
                        }}
                    >
                    <MaterialIcons name="add" size={30} color="#fff" />
                </TouchableOpacity>
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

function mapStateToProps ({decks}) {
    return {
      decks: decks.items
    }
  }
  
export default connect(mapStateToProps)(DeckCollection)
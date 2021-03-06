import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { container } from '../utils/genericStyles'
import { receiveDeckByKey } from '../actions/decks'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import {purple} from '../utils/colors'


class DeckDetails extends Component {

    componentDidMount () {
        const { dispatch, navigation } = this.props
        const deckNav = navigation.getParam('deck', {});
        dispatch(receiveDeckByKey(Object.keys(deckNav)[0]))
    }

    render(){
        const { deck } = this.props
        const key = deck ? Object.keys(deck)[0] : 0
        return(
            <View style={styles.container}>
            { deck != null && key != null && (
                <View style={styles.container} >
                    <View style={styles.cover}>
                        <MaterialCommunityIcons name="cards" size={70} color={purple} />
                        <Text style={styles.coverTitle}>{deck[key].name}</Text>
                        <Text style={styles.coverSubtitle}>{deck[key].cardCount + ' card(s)'}</Text>
                    </View>
                    <View style={styles.coverOptions}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('CardForm',{ deckKey: key })}
                            >
                            <MaterialIcons name="add-circle" size={30} color="#000" />
                            <Text>Add Card</Text>
                        </TouchableOpacity>
                        { deck[key].cardCount > 0 && (
                            <TouchableOpacity 
                                style={[styles.button,styles.buttonQuiz]}
                                onPress={() => this.props.navigation.navigate('Quiz',{ deckKey: key })}
                                >
                                <MaterialIcons name="play-circle-filled" size={30} color="#fff" />
                                <Text style={{color: '#fff'}}>Start Quiz</Text>
                            </TouchableOpacity>
                        )}
                        
                    </View>
                    <View style={styles.footer} />
                </View>
            )}
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    ...container,
    cover: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverTitle: {
        fontSize: 40,
        alignItems: 'stretch',
    },
    coverSubtitle: {
        fontSize: 25,
        color: '#757575'
    },
    coverOptions: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderRadius: 4,
        marginTop: 10,
    },
    buttonQuiz: {
        backgroundColor: '#0aa',
    },
    footer:{
        flex: 1,
    }
})

function mapStateToProps ({decks}, router) {
    const deckNav = router.navigation.getParam('deck', {});
    Object.keys(deckNav)[0]
    if(decks.item != null){
        return {
            deck: decks.item
        }
    }
    return {}
}

export default withNavigation(connect(mapStateToProps)(DeckDetails))
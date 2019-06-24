import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { container } from '../utils/genericStyles'


onPressAddCard = () => {
    
}

onPressStartQuiz = () => {
    
}

class DeckDetails extends Component {
    render(){
        const { navigation } = this.props;
        const deck = navigation.getParam('deck', {});
        const key = Object.keys(deck)
        return(
            <View style={styles.container}>
                <View style={styles.cover}>
                    <Text style={styles.coverTitle}>{deck[key].name}</Text>
                    <Text style={styles.coverSubtitle}>{deck[key].numberCards + ' card(s)'}</Text>
                </View>
                <View style={styles.coverOptions}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={onPressAddCard}
                        >
                        <Text>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button,styles.buttonQuiz]}
                        onPress={onPressAddCard}
                        >
                        <Text style={{color: '#fff'}}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer} />
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

export default connect()(DeckDetails)
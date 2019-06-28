import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { container } from '../utils/genericStyles'
import Card from './Card'

class Quiz extends Component {

    state = {
        card: {}
    }

    componentDidMount() {
        const { cards } = this.props

        this.setState({
            card: cards[0]
        })
    }

    render(){

        const { card } = this.state
        
        return(
            <View style={styles.container}>
                <Card  cardData={card}/>
                <View style={styles.coverOptions}>
                    <TouchableOpacity 
                        style={styles.button}
                        >
                        <Text>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button,styles.buttonQuiz]}
                        >
                        <Text style={{color: '#fff'}}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer} />
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    ...container,
    card:{
        flex: 6,
    },
    coverOptions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    button: {
        flex: 1,
        height: 100,
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

function mapStateToProps ({cards}, router) {
    const deckNav = router.navigation.getParam('deckKey', {});
    return {
        cards: cards.items.filter((c) => Object.values(c).shift().deckKey === deckNav)
    }
}

export default withNavigation(connect(mapStateToProps)(Quiz))
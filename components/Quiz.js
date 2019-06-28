import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { container } from '../utils/genericStyles'
import Card from './Card'

class Quiz extends Component {

    state = {
        card: {},
        cardIndex: 0
    }

    componentDidMount() {
        const { cards } = this.props

        this.setState({
            card: cards[0],
            cardIndex: 0
        })
    }

    handleAnswer = () => {

    }

    handleNextCard = () => {
        const { cards } = this.props
        const cardIndex = ++this.state.cardIndex
        this.setState({
            card: cards[cardIndex],
            cardIndex
        })
    }

    render(){

        const { card } = this.state
        
        return(
            <View style={styles.container}>
                <Card cardData={card}/>
                <View style={styles.coverOptions}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.handleNextCard()}
                        >
                        <Text style={{color: '#fff'}}>Correct</Text>
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
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        bottom: 0
    },
    button: {
        flex: 1,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01a699',
        borderWidth: 0.5,
        borderRadius: 4,
        margin: 20,
        fontSize: 30,
    },
    buttonQuiz: {
        backgroundColor: '#b71845',
    },
    footer:{
        flex: 1,
        justifyContent: 'flex-end',
    }
})

function mapStateToProps ({cards}, router) {
    const deckNav = router.navigation.getParam('deckKey', {});
    return {
        cards: cards.items.filter((c) => Object.values(c).shift().deckKey === deckNav)
    }
}

export default withNavigation(connect(mapStateToProps)(Quiz))
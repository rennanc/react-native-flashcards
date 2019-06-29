import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { container } from '../utils/genericStyles'
import Card from './Card'

const CORRECT_ANSWER = 1
const INCORRECT_ANSWER = 2

class Quiz extends Component {

    state = {
        card: {},
        cardIndex: 0,
        score: 0
    }

    componentDidMount() {
        const { cards } = this.props

        this.setState({
            card: cards[0],
            cardIndex: 0,
            score: 0,
        })
    }

    handleAnswer = (answer) => {
        const { card } = this.state
        answer = answer === 1 ? true : false
        const key = this.getObjectKey(card)
        if(card[key].answer === answer){
            this.setState({
                ...this.state,
                score: ++this.state.score
            })
        }

        this.handleNextCard()
    }

    getObjectKey = (object) => {
        return Object.keys(object)[0]
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
        const { cards } = this.props
        const { card, cardIndex } = this.state
        
        return(
            <View style={styles.container}>
                <Text style={styles.scoreText}>{"Score: " + this.state.score}</Text>
                { cardIndex < cards.length && (
                    <View style={styles.quizBox}>
                    <Text>{(cardIndex+1) + "/" +  cards.length}</Text>
                        <Card style={styles.card} cardData={card}/>
                        <View style={styles.coverOptions}>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => this.handleAnswer(CORRECT_ANSWER)}
                                >
                                <Text style={{color: '#fff'}}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.button,styles.buttonQuiz]}
                                onPress={() => this.handleAnswer(INCORRECT_ANSWER)}
                                >
                                <Text style={{color: '#fff'}}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                <View style={styles.footer} />
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    ...container,
    quizBox:{
        flex: 10,
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
    },
    scoreText:{
        fontSize: 30,
        textAlign: 'center',
    }
})

function mapStateToProps ({cards}, router) {
    const deckNav = router.navigation.getParam('deckKey', {});
    return {
        cards: cards.items.filter((c) => Object.values(c).shift().deckKey === deckNav)
    }
}

export default withNavigation(connect(mapStateToProps)(Quiz))
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, Text , StyleSheet, TouchableOpacity } from 'react-native'
import { container } from '../utils/genericStyles'
import CardFlip from 'react-native-card-flip'

class Card extends Component {

    render(){
        const { cardData } = this.props
        const key = cardData != null ? Object.keys(cardData)[0] : null
        return(
            <View style={styles.container} >
                {key != null && (
                    <CardFlip style={styles.cardContainer}  ref={(card) => this.card = card} >
                        <TouchableOpacity activeOpacity={1} style={[styles.card, styles.card1]} onPress={() => this.card.flip()} >
                            <View style={{flex:1}}>
                                <Text style={styles.label}>{cardData[key].question}</Text>
                                <Text style={styles.instruction}>Show Answer</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={[styles.card, styles.card2]} onPress={() => this.card.flip()} >
                            <Text style={styles.label}>{cardData[key].answer}</Text>
                            <Text style={styles.instruction}>Question</Text>
                        </TouchableOpacity>
                    </CardFlip>
                )}
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    ...container,
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    cardContainer:{
        width: 320,
        height: 470,
    },
    card:{
        width: 320,
        height: 470,
        backgroundColor: '#01a699',
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity:0.5,
    },
    card1: {
        backgroundColor: '#01a699',
    },
    card2: {
        backgroundColor: '#4e4cb8',
    },
    label: {
        //lineHeight: 470,
        marginTop:120,
        textAlign: 'center',
        fontSize: 55,
        fontFamily: 'System',
        color: '#ffffff',
        flexDirection:'row',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
    },
    instruction: {
        textAlign: 'center',
        fontSize: 24,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }
})

export default withNavigation(connect()(Card))
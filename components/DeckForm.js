import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet } from 'react-native'
import { container } from '../utils/genericStyles'
import { Button, Input } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons'
import { createDeck } from '../utils/api'
import { addDeck } from '../actions/decks'
import { generateUID } from '../utils/helpers'

class DeckForm extends Component {

    state = {
        name: '',
        toHome: false,
    }

    onPressSubmit = () => {
        const { dispatch, navigation } = this.props

        const key = generateUID()
        const deck = {
            name: this.state.name,
            cardCount: 0,
        }
        dispatch(addDeck({[key]: deck}))
        createDeck({ key, deck })
            .then(() => navigation.pop())
            .then(() => navigation.navigate('DeckDetails',{deck:{[key]: deck}}))
    }

    render(){
        return(
            <View>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <View style={styles.inputText}>
                    <Input 
                        placeholder="Deck Name"
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}/>
                </View>
                <Button
                    onPress={() => this.onPressSubmit()}
                    title="Submit"
                    disabled={this.state.name === ''}
                    buttonStyle={styles.buttonSubmit}
                    icon={
                        <MaterialIcons name="save" size={30} color="#fff" />
                    }
                />
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    ...container,
    title:{
        fontSize: 45,
        marginTop: 50,
        textAlign: 'center',
    },
    inputText:{
        margin: 50,
        borderWidth: 1,
        height: 70,
        borderRadius: 10,
    },
    buttonSubmit:{
        marginTop: 10,
        margin: 50,
        borderRadius: 10,
        backgroundColor: '#01a699',
    }
})

export default withNavigation(connect()(DeckForm))
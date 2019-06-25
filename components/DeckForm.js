import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
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
        const { dispatch } = this.props

        const key = generateUID()
        const deck = {
            name: this.state.name,
            numberCards: 0,
        }
        dispatch(addDeck({[key]: deck}))
        createDeck({ key, deck })
        /*createDeck({
            [key]: deck
          })
          .then((deck) => dispatch(addDeck(deck)))
          .then(() => console.warn('foi?!'))*/

        this.setState(() => ({
           toHome: key ? false : true,
        }))
    }

    render(){

       const { toHome } = this.state

        if(toHome === true){
            return this.props.navigation.goBack()
        }

        return(
            <View>
                <Input 
                    style={styles.inputText}
                    placeholder="Deck Name"
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}/>
                <Button
                    onPress={() => this.onPressSubmit()}
                    style={styles.buttonSubmit}
                    title="Salvar"
                    type="outline"
                    icon={
                        <MaterialIcons name="save" size={30} color="#01a699" />
                    }
                />
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    ...container,
    inputText:{
    },
    buttonSubmit:{
        marginTop: 10
    }
})

export default withNavigation(connect()(DeckForm))
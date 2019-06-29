import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
        const { dispatch, id } = this.props

        const key = generateUID()
        const deck = {
            name: this.state.name,
            cardCount: 0,
        }
        dispatch(addDeck({[key]: deck}))
        createDeck({ key, deck })
            .then(() => this.props.navigation.goBack())
    }

    render(){
        return(
            <View>
                <Text style={styles.title}>What is the title of your new deck?</Text>
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
    title:{
        fontSize: 45,
        textAlign: 'center',
    },
    inputText:{
        marginTop: 20,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        height: 70
    },
    buttonSubmit:{
        marginTop: 10
    }
})

export default withNavigation(connect()(DeckForm))
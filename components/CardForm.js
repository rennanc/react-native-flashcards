import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, Text , Switch, StyleSheet, TouchableOpacity } from 'react-native'
import { container } from '../utils/genericStyles'
import { Button, Input } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons'
import { handleCreateCard } from '../actions/cards'
import { generateUID } from '../utils/helpers'

class CardForm extends Component {

    state = {
        text: '',
        answer: false
    }

    onPressSubmit = () => {
        const { dispatch, navigation } = this.props

        const deckKey = navigation.getParam('deckKey', null)
        const key = generateUID()
        const card = {
            text: this.state.text,
            answer: this.state.answer,
            deckKey: deckKey
        }
        dispatch(handleCreateCard(key, card))
            .then(() => this.props.navigation.goBack(null))
    }

    render(){
        return(
            <View>
                <Input 
                    style={styles.inputText}
                    placeholder="Card Text"
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}/>
                <Text>Falso ou Verdadeiro?</Text>
                <Switch disabled={this.state.answer} />
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

export default withNavigation(connect()(CardForm))
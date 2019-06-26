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

    onChangeSwitch = (value) => {
        this.setState({ 
            ...this.state,
            answer: value
        })
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
            <View style={styles.container}>
                <Input 
                    style={styles.inputText}
                    placeholder="Do it a question"
                    onChangeText={(name) => this.setState({...this.state,text: name})}
                    value={this.state.name}/>
                <View style={{flex:1}}>
                    <Text >Falso ou Verdadeiro?</Text>
                    <Switch 
                        value={this.state.answer}
                        onValueChange={this.onChangeSwitch}
                        />
                </View>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    inputText:{
        flex: 1,
    },
    buttonSubmit:{
        flex: 1,
    },
    switchButton: {
        flex: 1,
    }
})

export default withNavigation(connect()(CardForm))
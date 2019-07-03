import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons'
import { handleCreateCard } from '../actions/cards'
import { generateUID } from '../utils/helpers'

class CardForm extends Component {

    state = {
        question: '',
        answer: ''
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
            question: this.state.question,
            answer: this.state.answer,
            deckKey: deckKey
        }
        dispatch(handleCreateCard(key, card))
            .then(() => this.props.navigation.goBack(null))
    }

    render(){
        const { question, answer } = this.state

        return(
            <View style={styles.container}>
                <Text style={styles.title}>Do it a question</Text>
                <Input 
                    style={styles.inputText}
                    placeholder="Do it a question"
                    onChangeText={(q) => this.setState({...this.state, question: q})}
                    value={question}/>
                <Text style={styles.title}>Write a answer</Text>
                <Input 
                    style={styles.inputText}
                    placeholder="Write a answer"
                    onChangeText={(a) => this.setState({...this.state, answer: a})}
                    value={answer}/>
                <Button
                    onPress={() => this.onPressSubmit()}
                    buttonStyle={styles.buttonSubmit}
                    disabled={answer === '' || question === ''}
                    title="Submit"
                    icon={
                        <MaterialIcons name="save" size={30} color="#fff" />
                    }
                />
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
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
        marginTop: 30,
        margin: 50,
        borderRadius: 10,
        backgroundColor: '#01a699',
    },
    switchButton: {
        flex: 1,
    }
})

export default withNavigation(connect()(CardForm))
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, StyleSheet } from 'react-native'
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
                <Card cardData={card}/>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    ...container,
})

function mapStateToProps ({cards}, router) {
    const deckNav = router.navigation.getParam('deckKey', {});
    return {
        cards: cards.items.filter((c) => Object.values(c).shift().deckKey === deckNav)
    }
}

export default withNavigation(connect(mapStateToProps)(Quiz))
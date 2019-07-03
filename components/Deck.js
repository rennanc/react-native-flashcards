import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { container } from '../utils/genericStyles'


class Deck extends Component {

    render(){
        const { deck } = this.props;
        const key = Object.keys(deck)
        return(
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('DeckDetails',
              { deck: deck })}
                >
                <ListItem 
                    key={key}
                    title={deck[key].name}
                    titleStyle={{ fontWeight: 'bold', fontSize: 30 }}
                    subtitle={deck[key].cardCount + ' Card(s)'}
                    subtitleStyle={{fontSize: 15}}
                    leftIcon={{name: 'cards', type: 'material-community', color:'#4e4cb8', size:40}}
                    bottomDivider={true}
                    containerStyle={styles.ListItem}
                />
            </TouchableOpacity>
        )
    }
}

export const styles = StyleSheet.create({
    ...container,
    ListItem:{
        margin:10,
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 2,
    }
})

export default withNavigation(connect()(Deck))
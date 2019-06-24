import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckCollection from './components/DeckCollection'
import DeckDetails from './components/DeckDetails'
import DeckForm from './components/DeckForm'
import StatusBarApp from './components/StatusBarApp'
import {purple} from './utils/colors'
import {createStackNavigator, createAppContainer} from 'react-navigation';

const StackRouteConfigs = createStackNavigator({
  Home: {
    screen: DeckCollection,
    navigationOptions: {
      title: 'Decks'
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      title: 'DeckDetails'
    }
  },
  DeckForm: {
    screen: DeckForm,
    navigationOptions: {
      title: 'New Deck'
    }
  }
});

const MainNavigator = createAppContainer(StackRouteConfigs);

export default class App extends React.Component {
  render(){
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <StatusBarApp 
            backgroundColor={purple}
            barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

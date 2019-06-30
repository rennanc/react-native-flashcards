import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from "./middleware"
import DeckCollection from './components/DeckCollection'
import DeckDetails from './components/DeckDetails'
import DeckForm from './components/DeckForm'
import CardForm from './components/CardForm'
import Quiz from './components/Quiz'
import StatusBarApp from './components/StatusBarApp'
import {purple, white} from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import {createStackNavigator, createAppContainer} from 'react-navigation';


const navigationOptionsDefault = {
  title: 'Flashcards',
  headerStyle: {
    backgroundColor: purple,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: white
  }
}

const StackRouteConfigs = createStackNavigator({
  Home: {
    screen: DeckCollection,
    navigationOptions: {
      ...navigationOptionsDefault,
      title: 'Flashcards',
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      ...navigationOptionsDefault,
      title: 'Deck'
    }
  },
  DeckForm: {
    screen: DeckForm,
    navigationOptions: {
      ...navigationOptionsDefault,
      title: 'New Deck'
    }
  },
  CardForm: {
    screen: CardForm,
    navigationOptions: {
      ...navigationOptionsDefault,
      title: 'New Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      ...navigationOptionsDefault,
      title: 'Quiz'
    }
  }
});

const MainNavigator = createAppContainer(StackRouteConfigs);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render(){
    return (
      <Provider store={createStore(reducer, middleware)}>
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

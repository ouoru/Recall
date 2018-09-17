import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from '../services/firebaseService';
import HomeNavigation from '../modules/navigation/HomeNavigation';

export default class AppView extends Component {
  componentDidMount() {
    firebase._test()
  }

  render() {
    return (
      <View style={styles.container}>
        <HomeNavigation />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
}

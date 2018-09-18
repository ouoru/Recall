import React, { Component } from 'react';
import { View } from 'react-native';
import HomeNavigation from '../modules/navigation/HomeNavigation';

export default class AppView extends Component {
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

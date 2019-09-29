import React, {Component} from 'react';
import {StyleSheet, Text, Image, StatusBar} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class Splash extends Component {
  render() {
    return (
      <LinearGradient
        colors={['#dbdbdb', '#F5D372']}
        style={styles.linearGradient}>
        <Image source={require('../assets/am.png')} style={styles.logoSplash} />
        <Text>ANEKA MUSIK</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSplash: {
    width: 200,
    height: 200,
  },
});

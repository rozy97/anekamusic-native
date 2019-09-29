import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, View} from 'native-base';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

class LoginButton extends Component {
  toLogin = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    return (
      <TouchableOpacity onPress={this.toLogin}>
        <View
          style={{
            width: 40,
            height: 40,
            marginTop: 8,
            paddingTop: 6,
            paddingLeft: 10,
            borderRadius: 20,
            borderColor: 'black',
            backgroundColor: '#323232',
          }}>
          <Text style={{fontSize: 20, color: '#F5C372'}}>IN</Text>
        </View>
        {/* <Icon name="login" style={{fontSize: 35}}></Icon> */}
      </TouchableOpacity>
    );
  }
}

export default withNavigation(LoginButton);

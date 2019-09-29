import React from 'react';
import {Image, View, Text} from 'react-native';
import {Header, Body, Right} from 'native-base';

import LoginButton from './login-button';
import LogoutButton from './logout-button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class HeaderComponent extends React.Component {
  state = {
    user: {
      id: '',
      name: '',
      email: '',
    },
    token: '',
  };

  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(value => {
      if (value !== null) {
        value = parseInt(value);
        this.setState({user: {...this.state.user, id: value}});
      }
    });
  };

  resetID = () => {
    this.setState({
      user: {
        id: null,
      },
    });
  };

  toHome = () => {
    this.props.navigation.navigate('CategoryScreen');
  };

  render() {
    return (
      <Header
        style={{backgroundColor: '#F5D372', alignItems: 'flex-start'}}
        androidStatusBarColor="#F5C372">
        <TouchableOpacity style={{alignItems: 'center'}} onPress={this.toHome}>
          <View style={{flexDirection: 'row', marginTop: 8, marginBottom: 7}}>
            <Text
              style={{
                fontSize: 23,
                padding: 4,
                borderWidth: 1,
                borderColor: 'black',
              }}>
              ANEKA
            </Text>
            <Text
              style={{
                backgroundColor: 'black',
                color: '#F5D372',
                fontSize: 23,
                padding: 4,
              }}>
              MUSIK
            </Text>
          </View>
        </TouchableOpacity>
        <Right />
        {this.props.user.id ? (
          <TouchableOpacity>
            <LogoutButton resetID={this.resetID} />
          </TouchableOpacity>
        ) : (
          <React.Fragment>
            {!this.state.user.id ? (
              <LoginButton />
            ) : (
              <TouchableOpacity>
                <LogoutButton resetID={this.resetID} />
              </TouchableOpacity>
            )}
          </React.Fragment>
        )}
      </Header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    token: state.user.token,
  };
}

export default withNavigation(connect(mapStateToProps)(HeaderComponent));
// export default withNavigation(HeaderComponent);

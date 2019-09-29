import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import {Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import {logout} from '../public/redux/actions/user';
import {resetWishlist} from '../public/redux/actions/wishlist';
import {resetCart} from '../public/redux/actions/cart';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {connect} from 'react-redux';

import HeaderComponent from '../components/header-component';

class LogoutButton extends Component {
  logout = () => {
    this.props.resetID();
    AsyncStorage.removeItem('userName');
    AsyncStorage.removeItem('id');
    AsyncStorage.removeItem('userEmail');
    AsyncStorage.removeItem('userLevel');
    AsyncStorage.removeItem('token');
    this.props.dispatch(logout());
    this.props.dispatch(resetWishlist());
    this.props.dispatch(resetCart());
    this.props.navigation.navigate('CategoryScreen');
    alert('Logout Success');
  };

  render() {
    return (
      // <Button
      //   bordered
      //   warning
      //   style={{width: 40, height: 40, borderRadius: 10, margin: 5}}
      //   onPress={this.logout}>
      //   <Image
      //     style={{width: 40, height: 40, borderRadius: 10}}
      //     source={require('../assets/logout.png')}
      //   />
      // </Button>
      <TouchableOpacity onPress={this.logout}>
        {/* <View
          style={{
            width: 50,
            height: 50,
            marginTop: 4,
            padding: 7,
          }}>
          <Icon name="logout" style={{fontSize: 35}}></Icon>
        </View> */}
        <View
          style={{
            width: 40,
            height: 40,
            marginTop: 8,
            paddingTop: 9,
            paddingLeft: 6,
            borderRadius: 20,
            borderColor: 'black',
            backgroundColor: 'black',
          }}>
          <Text style={{fontSize: 15, color: '#F5C372'}}>OUT</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(connect()(LogoutButton));

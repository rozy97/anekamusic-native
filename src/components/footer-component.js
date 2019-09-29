import React, {Component} from 'react';
import {Footer, FooterTab, Button, Text} from 'native-base';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';

class FooterComponent extends Component {
  toHome = () => {
    this.props.navigation.navigate('CategoryScreen');
  };

  toTransaction = () => {
    this.props.navigation.navigate('TransactionScreen');
  };

  toWishlist = () => {
    this.props.navigation.navigate('WishlistScreen');
  };

  toCart = () => {
    this.props.navigation.navigate('CartScreen');
  };

  render() {
    return (
      <Footer>
        <FooterTab style={{backgroundColor: '#F5D372'}}>
          <Button vertical onPress={this.toHome}>
            <Icon name="home" style={{color: 'black', fontSize: 30}} />
            <Text style={{color: 'black'}}>Home</Text>
          </Button>

          <Button vertical onPress={this.toWishlist}>
            <Icon name="heart" style={{color: 'black', fontSize: 30}} />
            <Text style={{color: 'black'}}>Wishlist</Text>
          </Button>

          <Button vertical onPress={this.toCart}>
            <Icon
              active
              name="shopping-cart"
              style={{color: 'black', fontSize: 30}}
            />
            <Text style={{color: 'black'}}>Cart</Text>
          </Button>
          <Button vertical onPress={this.toTransaction}>
            <Icon active name="user" style={{color: 'black', fontSize: 30}} />
            <Text style={{color: 'black'}}>PROFILE</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
export default withNavigation(FooterComponent);

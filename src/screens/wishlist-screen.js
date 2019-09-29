import React, {Fragment} from 'react';
import {Text} from 'react-native';
import HeaderComponent from '../components/header-component';
import FooterComponent from '../components/footer-component';
// import {getWishlist} from '../public/redux/actions/wishlist';
import {connect} from 'react-redux';
// import AsyncStorage from '@react-native-community/async-storage'

import Wishlist from '../components/wishlist';

class WishlistScreen extends React.Component {
  // state = {
  //   user:{
  //     id:''
  //   },
  //   token:''
  // }

  // componentDidMount = async () => {
  //   await AsyncStorage.getItem('token').then((value) => {
  //     if (value !== null) {
  //       this.setState({token:value})
  //     }
  //   });

  //   await AsyncStorage.getItem('id').then((value) => {
  //     value = parseInt(value);
  //     if (value !== null) {
  //       this.setState({user:{...this.state.user, id:value}})
  //     }
  //   });
  //   console.log('state',this.state);

  //   const header = {headers:{'authorization':'Bearer '+this.state.token}};
  //   await this.props.dispatch(getWishlist(this.state.user.id, header))
  //   console.log('wish',this.props.wishlist);

  // }

  render() {
    return (
      <Fragment>
        <HeaderComponent />
        <Text>Wishlist</Text>
        <Wishlist whishlist={this.props.wishlist} />

        <FooterComponent />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    // user: state.user.user,
    // token: state.user.token,
    wishlist: state.wishlist.wishlist,
  };
}

export default connect(mapStateToProps)(WishlistScreen);

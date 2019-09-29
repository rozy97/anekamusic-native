import React, {Component, Fragment} from 'react';
import {Image, Dimensions, View, ScrollView} from 'react-native';
import {Card, CardItem, Container, Text, Icon, Left, Right} from 'native-base';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getCart, addCart} from '../public/redux/actions/cart';
import {
  getWishlist,
  addWishlist,
  deleteWishlist,
} from '../public/redux/actions/wishlist';
import {getItemDetails} from '../public/redux/actions/items';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderComponent from '../components/header-component';
import FooterComponent from '../components/footer-component';
// import CategoryList from '../components/category-list';
import SearchBar from '../components/search-bar';

class ItemDetails extends Component {
  state = {
    itemDetails: {},
    itemstock: [],
    cart: [],
    wishlist: [],
    isWishlisted: false,
    isAddedtoCart: false,
    id: '',

    user: {
      id: '',
      level: '',
    },
    token: '',
    header: '',
  };

  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(value => {
      // console.log(value);
      if (value !== null) {
        value = parseInt(value);
        this.setState({user: {...this.state.user, id: value}});
      }
    });

    await AsyncStorage.getItem('userLevel').then(value => {
      console.log('val', value);
      if (value !== null) {
        value = parseInt(value);
        this.setState({user: {...this.state.user, level: value}});
      }
    });

    await AsyncStorage.getItem('token').then(value => {
      if (value !== null) {
        this.setState({token: value});
      }
    });

    const header = {headers: {authorization: 'Bearer ' + this.state.token}};
    this.setState({header: header});

    const {navigation} = this.props;
    const id = navigation.getParam('id');
    this.setState({id: id});

    await this.props.dispatch(getItemDetails(this.state.id));
    await this.setState({itemDetails: this.props.itemDetails});
    await this.setState({itemstock: this.state.itemDetails.itemstock});

    //wishlist//////////////////////////////////////////////////////////
    await this.props.dispatch(
      getWishlist(this.state.user.id, this.state.header),
    );
    await this.setState({wishlist: this.props.wishlist});

    this.state.wishlist.map(item => {
      if (this.state.id == item.id) {
        // eslint-disable-line
        this.setState({isWishlisted: true});
      }
      return null;
    });

    //cart///////////////////////////////////////////////////////
    await this.props.dispatch(getCart(this.state.user.id, this.state.header));
    await this.setState({cart: this.props.cart});
  };

  //wishlist//////////////////////////////////////////////////////
  addRemoveWishlist = async (user, item, command) => {
    if (command == 'add') {
      // eslint-disable-line
      await this.props.dispatch(addWishlist(user, item, this.state.header));
      await this.setState({
        wishlist: this.props.wishlist,
        isWishlisted: true,
      });
    } else if (command == 'remove') {
      // eslint-disable-line
      await this.props.dispatch(deleteWishlist(user, item, this.state.header));
      await this.setState({
        wishlist: this.props.wishlist,
        isWishlisted: false,
      });
    }
  };

  //cart///////////////////////////////////////////////////////////
  addToCart = async (user, itemID, item, branchID, branch, price, quantity) => {
    await this.state.cart.map(cartitem => {
      if (cartitem != undefined) {
        // eslint-disable-line
        if (item == cartitem.item && branch == cartitem.branch) {
          // eslint-disable-line
          this.setState({isAddedtoCart: true});
        }
      }
      return null;
    });

    if (!this.state.isAddedtoCart) {
      const data = {
        itemID,
        item,
        price,
        branchID,
        branch,
        quantity,
      };

      await this.props.dispatch(addCart(user, data, this.state.header));

      await this.setState({
        cart: this.props.cart,
        isAddedtoCart: true,
      });

      alert('Item has been added to cart.');
    } else {
      alert('The item is ready, go to checkout.');
      this.setState({isAddedtoCart: false});
    }
  };

  render(props) {
    const {height, width} = Dimensions.get('window');
    return (
      <Fragment>
        <HeaderComponent />

        <ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                textTransform: 'uppercase',
                marginTop: 20,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {this.props.itemDetails.name}
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{
                uri: this.props.itemDetails.image,
              }}
              style={{
                width: 250,
                height: 250,
                marginTop: 20,
                marginBottom: 16,
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 150,
                margin: 'auto',
              }}
            />
          </View>
          <Card>
            <CardItem>
              <View
                style={{
                  flex: 3,
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                  // width: width - 70,
                  margin: 0,
                  flexDirection: 'column',
                }}>
                <Text>Category : {this.props.itemDetails.category}</Text>
              </View>

              {this.state.user.level > 0 ? (
                <Fragment>
                  {this.state.isWishlisted ? (
                    <View>
                      <Icon
                        name="heart"
                        style={{paddingTop: 10, color: 'red', fontSize: 40}}
                        onPress={() =>
                          this.addRemoveWishlist(
                            this.state.user.id,
                            this.state.id,
                            'remove',
                          )
                        }
                      />
                    </View>
                  ) : (
                    <View>
                      <Icon
                        name="heart"
                        style={{paddingTop: 10, color: 'grey', fontSize: 40}}
                        onPress={() =>
                          this.addRemoveWishlist(
                            this.state.user.id,
                            this.state.id,
                            'add',
                          )
                        }
                      />
                    </View>
                  )}
                </Fragment>
              ) : null}
            </CardItem>

            <CardItem
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              {this.state.itemstock ? (
                <Fragment>
                  {this.state.itemstock.map((item, index) => {
                    return (
                      <View
                        style={{
                          flex: 3,
                          paddingBottom: 0,
                          width: width - 50,
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          marginBottom: 8,
                        }}>
                        <Text style={{padding: 8}}>{item.branch}</Text>
                        <Text style={{padding: 8}}>{item.quantity}</Text>
                        <Text style={{padding: 8}}>
                          {item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Text>
                        {this.state.user.level > 0 ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.addToCart(
                                this.state.user.id,
                                this.state.id,
                                this.state.itemDetails.name,
                                item.branchID,
                                item.branch,
                                item.price,
                                1,
                              );
                            }}>
                            <Text
                              style={{
                                color: 'black',
                                backgroundColor: '#F5D372',
                                borderRadius: 5,
                                padding: 8,
                                textTransform: 'uppercase',
                              }}>
                              Cart
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    );
                  })}
                </Fragment>
              ) : (
                alert('error itemstock not loaded')
              )}
            </CardItem>
          </Card>
          <View
            style={{
              marginTop: 12,
              marginBottom: 15,
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <Text>{this.props.itemDetails.description}</Text>
          </View>
        </ScrollView>
        <FooterComponent />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    itemDetails: state.items.itemDetails,
    cart: state.cart.cart,
    wishlist: state.wishlist.wishlist,
    user: state.user.user,
  };
}

export default connect(mapStateToProps)(ItemDetails);

import React, {Fragment} from 'react';
import {ScrollView, View, Text, Image, Dimensions} from 'react-native';
// import ItemCard from '../Components/ItemCard';

import {Card, CardItem, Body, Icon, Left, Right} from 'native-base';
import HeaderComponent from '../components/header-component';
import FooterComponent from '../components/footer-component';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {
  getCart,
  editCart,
  deleteCart,
  clearCart,
} from '../public/redux/actions/cart';
import {newTransaction} from '../public/redux/actions/transactions';
import AsyncStorage from '@react-native-community/async-storage';

// import Cart from './Cart';

class CartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      user: {
        id: '',
        name: '',
        email: '',
      },
      token: '',
      header: '',
      total: 0,

      receipt: false,
    };
  }

  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(value => {
      // console.log(value);
      if (value !== null) {
        value = parseInt(value);
        this.setState({user: {...this.state.user, id: value}});
      }
    });

    await AsyncStorage.getItem('token').then(value => {
      if (value !== null) {
        this.setState({token: value});
      }
    });

    const header = {headers: {authorization: 'Bearer ' + this.state.token}};
    this.setState({header: header});

    await this.props.dispatch(getCart(this.state.user.id, this.state.header));
    await this.setState({cart: this.props.cart});
  };

  editQuantity = async (user, item, branch, quantity) => {
    const data = {
      item,
      branch,
      quantity,
    };
    if (quantity > 0) {
      await this.props.dispatch(editCart(user, data, this.state.header));
      await this.setState({cart: this.props.cart});
    } else {
      await this.props.dispatch(
        deleteCart(user, item, branch, this.state.header),
      );
      await this.setState({cart: this.props.cart});
    }
  };

  //count total price/////////////////////////////////////////////////
  total = () => {
    let tot = 0;
    this.state.cart.map(item => {
      // eslint-disable-line
      tot += item.quantity * item.price;
    });

    this.setState({total: tot});
    return null;
  };

  handleCheckout = async () => {
    const tmp = [];
    this.state.cart.map(cartitem => {
      tmp.push({
        item: cartitem.itemID,
        branch: cartitem.branchID,
        quantity: cartitem.quantity,
        price: cartitem.price * cartitem.quantity,
        itemName: cartitem.item,
        location: cartitem.branch,
      });
      return null;
    });
    const data = {
      transactionitems: [...tmp],
    };

    await this.props.dispatch(
      newTransaction(this.state.user.id, data, this.state.header),
    );
    alert('Transaction success \n Recorded in transaction history');
    await this.setState({receipt: true});
    await this.props.dispatch(clearCart(this.state.user.id, this.state.header));
    this.setState({total: 0});
  };

  render() {
    const {height, width} = Dimensions.get('window');
    console.log('width', width);

    return (
      <Fragment>
        <HeaderComponent />
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            textTransform: 'uppercase',
            fontSize: 30,
            fontWeight: 'bold',
            letterSpacing: 4,
          }}>
          Cart
        </Text>
        {/* {console.log('asd',this.props.cart)}
            <Cart cart={this.props.cart}/> */}

        {/* cart ////////////////////////////////////////// */}
        <React.Fragment>
          <ScrollView style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              {console.log(this.props.cart)}
              {this.props.cart.length ? (
                <React.Fragment>
                  {this.props.cart.map((item, index) => {
                    return (
                      // <ItemCard item={item} isCart='true' key={index}/>

                      // itemcard Card /////////////////////////////////////////////
                      <Card
                        style={{
                          width: width,
                          height: height / 4,
                          borderColor: '#F5D372',
                          marginBottom: 5,
                          padding: 0,
                          borderColor: 'orange',
                          borderWidth: 2,
                        }}>
                        <CardItem style={{flex: 10}}>
                          <Body
                            style={{
                              flex: 8,
                              marginLeft: 20,
                              padding: 20,
                              flexDirection: 'column',
                            }}>
                            <CardItem
                              style={{paddingBottom: 10, paddingTop: 0}}>
                              <Text>{item.item}</Text>
                            </CardItem>

                            <Fragment>
                              <CardItem
                                style={{paddingBottom: 0, paddingTop: 0}}>
                                <Text>{item.branch}</Text>
                              </CardItem>

                              <CardItem
                                style={{paddingBottom: 0, paddingTop: 0}}>
                                <Text>
                                  Rp.{' '}
                                  {item.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </Text>
                              </CardItem>

                              <CardItem
                                style={{paddingBottom: 0, paddingTop: 0}}>
                                <Text>
                                  Subtotal : Rp.{' '}
                                  {(item.price * item.quantity)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </Text>
                              </CardItem>
                            </Fragment>
                          </Body>

                          <Right style={{flex: 2, flexWrap: 'nowrap'}}>
                            <Body>
                              <Fragment>
                                <CardItem
                                  button
                                  onPress={() => {
                                    this.editQuantity(
                                      this.state.user.id,
                                      item.itemID,
                                      item.branchID,
                                      (item.quantity += 1),
                                    );
                                  }}
                                  style={{
                                    paddingBottom: 0,
                                    flexWrap: 'nowrap',
                                  }}>
                                  <Text>+</Text>
                                </CardItem>

                                <Text
                                  style={{
                                    paddingBottom: 0,
                                    paddingTop: 0,
                                    flexWrap: 'nowrap',
                                  }}>
                                  {item.quantity}
                                </Text>

                                <CardItem
                                  button
                                  onPress={() => {
                                    this.editQuantity(
                                      this.state.user.id,
                                      item.itemID,
                                      item.branchID,
                                      (item.quantity -= 1),
                                    );
                                  }}
                                  style={{
                                    paddingBottom: 0,
                                    paddingTop: 0,
                                    flexWrap: 'nowrap',
                                  }}>
                                  <Text>-</Text>
                                </CardItem>
                              </Fragment>
                            </Body>
                          </Right>
                        </CardItem>
                      </Card>
                      //end of itemcard////////////////////////////////////////////////////////////////////////////
                    );
                  })}
                </React.Fragment>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 200,
                    textTransform: 'uppercase',
                    fontSize: 20,
                    fontWeight: 'bold',
                    letterSpacing: 4,
                  }}>
                  >empty
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  // backgroundColor: 'black',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  height: 40,
                  width: 200,
                  alignSelf: 'center',
                  marginBottom: 20,
                  marginTop: 20,
                  fontSize: 20,
                }}>
                Total : Rp.{' '}
                {this.state.total
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    backgroundColor: 'black',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    height: 40,
                    width: 200,
                    alignSelf: 'center',
                    marginBottom: 20,
                    fontSize: 20,
                  }}
                  onPress={() => this.handleCheckout()}>
                  Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </React.Fragment>

        <FooterComponent />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
  };
}

export default connect(mapStateToProps)(CartScreen);

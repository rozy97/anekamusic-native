import React, {Fragment} from 'react';

import CategoryScreen from '../screens/category-screen';
import ItemListScreen from '../screens/item-list-screen';
import TransactionScreen from '../screens/transaction-screen';
import WishlistScreen from '../screens/wishlist-screen';
import CartScreen from '../screens/cart-screen';
import LoginScreen from '../screens/login-screen';
import RegisterScreen from '../screens/register-screen';
import SearchResultScreen from '../screens/search-result-screen';
import ItemDetails from '../screens/item-details-screen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  {
    CategoryScreen: {
      screen: CategoryScreen,
    },
    ItemListScreen: {
      screen: ItemListScreen,
    },
    TransactionScreen: {
      screen: TransactionScreen,
    },
    WishlistScreen: {
      screen: WishlistScreen,
    },
    CartScreen: {
      screen: CartScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
    },
    RegisterScreen: {
      screen: RegisterScreen,
    },
    SearchResultScreen: {
      screen: SearchResultScreen,
    },
    ItemDetails: {
      screen: ItemDetails,
    },
  },
  {
    initialRouteName: 'CategoryScreen',
    headerMode: 'none',
    style: {backgroundColor: 'red'},
  },
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;

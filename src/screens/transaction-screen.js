import React, {Fragment} from 'react';
import {Text} from 'react-native';
import HeaderComponent from '../components/header-component';
import FooterComponent from '../components/footer-component';

// import TransactionList from './TransactionList';
import AsyncStorage from '@react-native-community/async-storage';

import {getUserTransactions} from '../public/redux/actions/transactions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'native-base';

class TransactionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userTransactions: [],
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
    await AsyncStorage.getItem('userName').then(value => {
      if (value !== null) {
        this.setState({user: {...this.state.user, name: value}});
      }
    });

    await AsyncStorage.getItem('id').then(value => {
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

    await this.props.dispatch(
      getUserTransactions(this.state.user.id, this.state.header),
    );
    await this.setState({userTransactions: this.props.userTransactions});
    console.log('usr tran', this.props.userTransactions);
  };
  render() {
    return (
      <Fragment>
        <HeaderComponent />
        <ScrollView>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Icon
                name="user"
                style={{fontSize: 300, marginTop: 50, marginBottom: 50}}
              />
            </View>
            <Text style={{fontSize: 50, textTransform: 'uppercase'}}>
              {this.state.user.name}
            </Text>
          </View>
          {/* <TransactionList/> */}
        </ScrollView>
        <FooterComponent />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userTransactions: state.transactions.userTransactions,
  };
}

export default connect(mapStateToProps)(TransactionScreen);

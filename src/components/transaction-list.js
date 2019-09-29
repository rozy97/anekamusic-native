import React from 'react';
import {ScrollView, View} from 'react-native';

import TransactionCard from './transaction-card';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class TransactionList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            <TransactionCard />

            <TransactionCard />
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

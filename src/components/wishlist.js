import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import ItemCard from './Item-card';
import {connect} from 'react-redux';

class Wishlist extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            {this.props.wishlist.length > 0 ? (
              <React.Fragment>
                {this.props.whishlist.map((item, index) => {
                  return <ItemCard item={item} key={index} />;
                })}
              </React.Fragment>
            ) : (
              <Text>No item(s) in your wishlist</Text>
            )}
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.wishlist,
  };
}

export default connect(mapStateToProps)(Wishlist);

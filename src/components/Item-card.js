import React, {Component, Fragment} from 'react';
import {Image, Dimensions} from 'react-native';
import {Card, CardItem, Text, Body, Icon, Left, Right} from 'native-base';
import {connect} from 'react-redux';

class ItemCard extends Component {
  render(props) {
    const {height, width} = Dimensions.get('window');
    return (
      <Card
        style={{
          width: width - 30,
          height: height / 3,
          // borderColor: '#F5D372',
          marginBottom: 15,
          // padding: 0,
          // borderColor: 'orange',
          // borderWidth: 2,
          paddingLeft: 30,
        }}>
        <CardItem style={{marginLeft: 20}}>
          {!this.props.isCart ? (
            <Left
              style={{
                width: width,
                height: height / 3 - 30,
                flex: 4,
                paddingRight: 0,
                paddingLeft: 0,
              }}>
              <CardItem style={{paddingRight: 0, paddingLeft: 0}} button>
                <Image
                  source={{uri: this.props.item.image}}
                  style={{
                    width: width / 3,
                    height: height / 5,
                    marginLeft: 0,
                    paddingLeft: 0,
                    borderColor: 'black',
                    resizeMode: 'contain',
                  }}
                />
              </CardItem>
            </Left>
          ) : null}

          <Body
            style={{
              flex: 8,
              marginLeft: 20,
              padding: 20,
              flexDirection: 'column',
            }}>
            <CardItem style={{paddingBottom: 10, paddingTop: 0}}>
              {!this.props.isCart ? (
                <Text>{this.props.item.name}</Text>
              ) : (
                <Text>{this.props.item.item}</Text>
              )}
            </CardItem>

            {this.props.isCart ? (
              <Fragment>
                <CardItem style={{paddingBottom: 0, paddingTop: 0}}>
                  <Text>{this.props.item.branch}</Text>
                </CardItem>

                <CardItem style={{paddingBottom: 0, paddingTop: 0}}>
                  <Text>{this.props.item.price}</Text>
                </CardItem>
              </Fragment>
            ) : null}
          </Body>

          <Right style={{flex: 2, flexWrap: 'nowrap'}}>
            <Body>
              {this.props.isCart ? (
                <Fragment>
                  <CardItem
                    button
                    onPress={() => alert('This is Plus')}
                    style={{paddingBottom: 0, flexWrap: 'nowrap'}}>
                    <Text>+</Text>
                  </CardItem>

                  <Text
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      flexWrap: 'nowrap',
                    }}>
                    {this.props.item.quantity}
                  </Text>

                  <CardItem
                    button
                    onPress={() => alert('This is Minus')}
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      flexWrap: 'nowrap',
                    }}>
                    <Text>-</Text>
                  </CardItem>
                </Fragment>
              ) : null}
            </Body>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.wishlist,
  };
}

export default connect(mapStateToProps)(ItemCard);
// export default ItemCard;

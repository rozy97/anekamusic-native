import React, {Component} from 'react';
import {Image, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from 'native-base';

export default class CategoryCard extends Component {
  render(props) {
    const {height, width} = Dimensions.get('window');
    return (
      <Card
        style={{
          width: width - 30,
          height: height / 3,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 5,
          marginTop: 20,
          marginBottom: 20,
          padding: 0,
        }}>
        <CardItem cardBody>
          <Image
            source={{
              uri: this.props.category.image,
            }}
            style={{
              height: height / 3 - 30,
              width: width / 2,
              flex: 1,
              borderWidth: 1,
              borderColor: 'black',
              borderTopRadius: 5,
            }}
          />
        </CardItem>
        <CardItem
          footer
          style={{
            backgroundColor: '#F5D372',
            borderBottomWidth: 1,
            borderBottomColor: 'black',
          }}>
          <Text
            style={{
              width: '100%',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              letterSpacing: 4,
              textAlign: 'center',
            }}>
            {this.props.category.name}
          </Text>
        </CardItem>
      </Card>
    );
  }
}

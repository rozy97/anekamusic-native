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
  Left,
  Right,
} from 'native-base';
import ItemCard from './Item-card';

export default class TransactionCard extends Component {
  render(props) {
    const {height, width} = Dimensions.get('window');
    return (
      <Card
        style={{
          width: width - 10,
          borderColor: '#F5D372',
          marginBottom: 20,
          padding: 0,
        }}>
        <CardItem cardBody>
          <Left>
            <Text>Date</Text>
          </Left>
        </CardItem>

        <Body>
          <ItemCard
            item={{
              name: 'gitar',
              image:
                'https://d1aeri3ty3izns.cloudfront.net/media/25/253487/600/preview.jpg',
              branch: 'balikgitar',
              price: 20000,
            }}
          />
          <ItemCard
            item={{
              name: 'gotar',
              image:
                'https://d1aeri3ty3izns.cloudfront.net/media/25/253487/600/preview.jpg',
              branch: 'balikgotar',
              price: 12000,
            }}
          />
        </Body>

        <CardItem footer style={{backgroundColor: '#F5D372'}}>
          <Left>
            <Text>total:</Text>
          </Left>
          <Right>
            <Text>totalprice:</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

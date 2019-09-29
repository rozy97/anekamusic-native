import React, {Component} from 'react';
import {Item, Input, Icon} from 'native-base';
import {withNavigation} from 'react-navigation';

class SearchBar extends Component {
  state = {
    name: '',
  };

  inputHandler = (name, value) => {
    this.setState(() => ({[name]: value}));
  };

  search = () => {
    this.props.navigation.navigate('SearchResultScreen', {
      name: this.state.name,
    });
  };

  render() {
    return (
      <Item
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 15,
          backgroundColor: '#f1f1f1',
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        }}>
        <Input
          placeholder="search..."
          style={{
            paddingLeft: 15,
            fontSize: 20,
            // borderRadius: 20,
            // border: 'black',
          }}
          onChangeText={txt => this.inputHandler('name', txt)}
        />
        <Icon active name="search" button onPress={() => this.search()} />
      </Item>
    );
  }
}

export default withNavigation(SearchBar);
// export default SearchBar;

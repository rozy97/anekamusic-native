import React, {Fragment} from 'react';

import HeaderComponent from '../components/header-component';
import FooterComponent from '../components/footer-component';
import ItemList from '../components/item-list';

import {connect} from 'react-redux';
import {getItemsByName} from '../public/redux/actions/items';
import {Text} from 'native-base';

class SearchResultScreen extends React.Component {
  state = {
    name: '',
  };
  componentDidMount = async () => {
    const {navigation} = this.props;
    const name = navigation.getParam('name');
    this.setState({name: name});
    console.log('navparamsearch', name);

    await this.props.dispatch(getItemsByName(name));
  };

  render() {
    return (
      <Fragment>
        <HeaderComponent />
        <Text>{'Search result for keyword : ' + this.state.name}</Text>
        <ItemList items={this.props.items} />

        <FooterComponent />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items.items,
  };
}

export default connect(mapStateToProps)(SearchResultScreen);
// export default SearchResultScreen ;

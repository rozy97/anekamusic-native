import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {getCategories} from '../public/redux/actions/categories';

import HeaderComponent from '../components/header-component';
import FooterComponent from '../components/footer-component';
import CategoryList from '../components/category-list';
import SearchBar from '../components/search-bar';

class CategoryScreen extends React.Component {
  state = {
    user: {
      id: '',
      name: '',
      email: '',
    },
    token: '',
  };

  componentDidMount = async () => {
    await this.props.dispatch(getCategories());
  };

  toItemList = id => {
    this.props.navigation.navigate('ItemListScreen', {id: id});
  };

  render() {
    return (
      <Fragment>
        <HeaderComponent />
        <SearchBar />

        <CategoryList
          categories={this.props.categories}
          toItemList={this.toItemList}
        />
        <FooterComponent />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
  };
}

export default connect(mapStateToProps)(CategoryScreen);
// export default (CategoryScreen);

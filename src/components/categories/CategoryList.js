import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productAction";
import { ListGroup, ListGroupItem } from "reactstrap";

class CategoryList extends Component {
  componentDidMount() {
    console.log("CategoryList componentDidMount");
    this.props.actions.getCategories();
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id)
  };

  render() {
    return (
      <div>
        <h3>Categories</h3>
        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
              onClick={() => this.selectCategory(category)}
              key={category.id}
              active={category.id === this.props.currentCategory.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps state", state);
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  console.log("mapDispatchToProps dispatch", dispatch);
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategories,
        dispatch
      ),
       getProducts: bindActionCreators(
        productActions.getProducts,
        dispatch
      )
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);

import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Badge,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";

class CartSummary extends Component {
  renderEmpty = () => {
    return (
      <NavItem>
        <NavLink>Sepetiniz Boş</NavLink>
      </NavItem>
    );
  };

  removeFromCart = (product, quantity) => {
    this.props.action.removeFromCart({quantity: quantity, product: product});
    if (quantity === 1) {
      alertify.error(product.productName + "\tsepetten silindi")
    }else{
      alertify.warning(product.productName + "\t isimli ürün sepetten 1 adet çıkarıldı")
    }
    
  }

  renderSummary = () => {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Options
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
            <Badge color="danger" onClick={() => this.removeFromCart(cartItem.product, cartItem.quantity)} >{cartItem.quantity > 1 ? "-" : "X"}</Badge>
              {" " + cartItem.product.productName + " "}
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Sepete Git</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

function mapDispatchToProps(dispatch){
    return {
        action: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);

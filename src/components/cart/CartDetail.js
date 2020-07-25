import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import { Table, Button } from "reactstrap";

class CartDetail extends Component {
  renderCart = () => {
    const { cart } = this.props;

    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Id</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Units In Stock</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cartItem) => (
            <tr key={cartItem.product.id}>
              <td>{cartItem.product.id}</td>
              <td>{cartItem.product.categoryId}</td>
              <td>{cartItem.product.productName}</td>
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.product.unitsInStock}</td>
              <td>{cartItem.quantity}</td>
              <td>
                {" "}
                <Button
                  color="danger"
                  onClick={() =>
                    this.removeFromCart(cartItem.product, cartItem.quantity)
                  }
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  renderEmptyCart = () => {
      return (
          <h3 style={{textAlign: "center", marginTop: "50px"}}>Sepetiniz Boş...</h3>
      );
  }

  removeFromCart = (product, quantity) => {
    this.props.action.removeFromCart({ quantity: quantity, product: product });
    if (quantity === 1) {
      alertify.error(product.productName + "\tsepetten silindi");
    } else {
      alertify.warning(
        product.productName + "\t isimli ürün sepetten 1 adet çıkarıldı"
      );
    }
  };

  render() {
    const { cart } = this.props;
    return (
      <div>{cart.length > 0 ? this.renderCart() : this.renderEmptyCart()}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);

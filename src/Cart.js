import React, { Component } from 'react';
import './Cart.css';

class Cart extends Component {
  render() {
    let listItem = this.props.cartItems.map((val,i) => (
      <tr key={i}>
        <td>{i}</td>
        <td>{val.item.name}</td>
        <td>{val.item.qty}</td>
        <td>{(Number(val.item.price) * Number(val.item.qty)).toFixed(2)}</td>
        <td><button className="btn btn-danger" onClick={() => this.props.removeFromCart(val.item.name)}>X</button></td>
      </tr> 
    ))
    let total = this.props.cartItems.reduce((prev,next)=> {
      prev[0] += (Number(next.item.price) * Number(next.item.qty));
      prev[1] += next.item.qty;
      return prev;
    }, [0,0])
    return (
      <div className="container">
        {this.props.cartItems.length !== 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price ($)</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
          {listItem}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>Total:</td>
              <td>{total[1]}</td>
              <td>{total[0].toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        )
        : <h1><strong>No items added to cart</strong></h1> }
      </div>
    )
  }
}

export default Cart;
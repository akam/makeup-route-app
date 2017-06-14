import React, { Component } from 'react';
import './App.css';
import {
  Route,
  Link
} from 'react-router-dom';
import Brand from './Brand';
import Cart from './Cart';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchParam: null,
      cartItems: [],
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  updateSearch(e){
    this.setState({searchParam:e.target.innerText, cart: false})
  }

  removeFromCart(name){
    let cartItems = [...this.state.cartItems];
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].item.name === name) break;
    }
    cartItems.splice(i,1);
    this.setState({cartItems});
  }

  toggleCart(){
    this.setState({cart: !this.state.cart})
  }

  addToCart(item){
    let cartItems = [...this.state.cartItems];
    let push = true;
    for (var i = 0; i < cartItems.length; i++){
      if(cartItems[i].item.name === item.name){
        push = false;
        cartItems[i].item.qty++;
        break;
      }
    }
    if(push){
      item.qty = 1;
      cartItems.push({item});
    }
    this.setState({cartItems});
  }
  
  render() {
    let brands = this.props.brands.map((el,i)=> (
      <div className="brandName" key={i}><Link  onClick={this.updateSearch} to={`/brands/${el}`}>{el[0].toUpperCase() + el.slice(1)}</Link></div>
    ));
    return (
      <div className="App">
        <div className="App-header">
          <span className="header"><Link style={{ textDecoration: 'none', color: '#888' }} to='/brands'>💅Makeup Mega Market💄</Link></span>
          <span className="titles"><Link style={{ textDecoration: 'none', color: '#888' }} to='/brands'>Brands</Link></span>
          <span role="img" className="cart" onClick={this.toggleCart.bind(this)}><Link to="/cart">🛒</Link></span>
        </div>
        {brands}
        <Route path={`/brands/${this.state.searchParam}`} render={props => (
          <Brand brand={this.state.searchParam} addToCart={this.addToCart}/> )}/>
        <Route path={`/cart`} render={props =>(
          <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}/> )}/>
      </div>
    );
  }
}

App.defaultProps = {
  brands: ["almay", "annabelle", "benefit", "covergirl",
         "dalish", "e.l.f.", "essie", "iman", "l'oreal",
         "marcelle", "maybelline", "milani", "misa",
         "mistura", "moov", "nyx", "orly", "pacifica",
         "revlon",
         "sante", "smashbox", "stila",
         "suncoat", "zorah"]
}

export default App;

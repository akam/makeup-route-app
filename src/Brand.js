import React, { Component } from 'react';
import './Brand.css';
import axios from 'axios';
import Item from './Item';

class Brand extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
  }
    
  // shouldComponentUpdate(nextProps){
  //   console.log("Will I Update? ", this.props.brand !== nextProps.brand)
  //   if(this.props.brand === nextProps.brand){
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  componentDidUpdate(prevProps){
    if(this.props.brand !== prevProps.brand){
    axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${this.props.brand}`)
      .then(response => {
        this.setState({data:response.data})
      })
    }
  }

  componentWillMount(){
    axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${this.props.brand}`)
      .then(response => {
        this.setState({data:response.data})
      })
  }

  render() {

    let items = this.state.data.map((el,i) => (
      <Item key={i} data={el} addToCart={this.props.addToCart}/>
    ))
    return (
      <div>
        <h2>{this.props.brand}</h2>
        {items}
      </div>
    )
  }
}

export default Brand;
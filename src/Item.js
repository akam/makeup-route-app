import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
  constructor(props){
    super(props);
    this.state = {
      animation: null
    }
  }

  toggleAnimation(){
    this.props.addToCart(this.props.data);
    this.setState({
      animation: "fade 1s 1"
    })
    setTimeout(()=>{
      this.setState({
        animation: null
      })
    }, 1000);
  }

  render() {
    if(this.props.data.product_colors){
      var colors = this.props.data.product_colors.map((val,i) => (
        <div className="colorBox" style={{background: val.hex_value}} key={i}></div>
      ))
    }
    return (
      <div className="itemCard">
        <h4 className="name">{this.props.data.name}</h4>
        <button className="price" onClick={this.toggleAnimation.bind(this)}>${Number(this.props.data.price).toFixed(2)}</button>
        <span style={{"color": "white", "animation": this.state.animation}}>&nbsp;&nbsp;Added to Cart!</span>
        <img className="img" src={this.props.data.image_link} alt={this.props.data.name} />
        <p>Category: {this.props.data.category}</p>
        <p>Colors:</p>
        <p className="colors">{colors}</p>
        <p className="desc">{this.props.data.description}</p>
      </div>
    )
  }
}

export default Item;
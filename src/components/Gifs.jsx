import React, { Component } from "react";

export default class Gifs extends Component {
  
  render() {
    return (
      <figure className="mx-auto" data-width= "220">
            <img src={this.props.details.media[0].tinygif.url} className="figure-img img-fluid rounded" alt={this.props.i}  />
      </figure>
    )
  }
}

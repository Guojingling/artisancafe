import React, { Component } from 'react';
import background from '../assets/artisan-salmon.jpg';

export class Info extends Component {
  static displayName = Info.name;

  render() {
    return (
      <div class="container">
        <img src={background} className="img-fluid" alt="background img" />
        <h1>Hello, world!</h1>
      </div>
    );
  }
}
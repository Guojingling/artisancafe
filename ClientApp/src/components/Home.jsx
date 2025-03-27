import React, { Component } from 'react';
import image from '../assets/artisan-salmon.jpg'
import logo from '../assets/logo.png'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col ">
            <div class="container">
              <div class="row">
                <div class="col">
                  <img src={logo} class="img-thumbnail" width="200rem" height="200rem" alt="logo"/>
                </div>
              </div>
              <div class="row">
                <div class="col">
                    this is where the images go
                  </div>
              </div>
            </div>
          </div>
          <div class="col">
            <img src={image} class="" width="1000" height="1000" alt="food" />
          </div>
        </div>
      </div>
    );
  }
}

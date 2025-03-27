import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu className= "border-0" />
        <div className="">
          {this.props.children}
        </div>
      </div>
    );
  }
}

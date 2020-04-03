import React from "react";
import "./styles.css";

export default class App extends React.Component {
  state = {
    childrenOn: true
  };

  toggleChildren() {
    this.setState(state => ({ childrenOn: !state.childrenOn }));
  }

  render() {
    const wcRenderId = this.props.wcRenderId;

    const c = this.props.children;
    return (
      <div>
        <button onClick={() => this.toggleChildren()}>Toggle children</button>
        <div>
          {this.state.childrenOn &&
            c &&
            React.Children.map(c, childComp =>
              React.cloneElement(childComp, {
                "data-rid": wcRenderId,
                rid: wcRenderId
              })
            )}
          {!this.state.childrenOn && (
            <strong>I switched off the children for you</strong>
          )}
        </div>
      </div>
    );
  }
}

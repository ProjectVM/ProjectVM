import React, { Component, setState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "reactstrap";

class Counter extends Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"],
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h1 className={this.getBadgeClasses()}>ProjectVM</h1>
        <div>
          <span className="badge bg-primary">{this.formatCount()}</span>
        </div>
        <ul>
          {this.state.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <Button onClick={this.handleIncrement}>Increment</Button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 bg-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;

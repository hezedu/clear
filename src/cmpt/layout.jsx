import { Component} from 'react';
import { Link } from 'react-router';

export class Top extends Component {
  render() {
    return (
      <div>
        <div className="top"><Link to='/' onlyActiveOnIndex={true} activeClassName='active'>home</Link></div>
        <div className="bottom">{this.props.children}</div>
      </div>
    );
  }
}

export class NotFound extends Component {
  render() {
    return (
      <h1>404 NotFound</h1>
    );
  }
}

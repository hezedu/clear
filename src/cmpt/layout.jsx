import { Component} from 'react';
import { Link } from 'react-router';

export class Top extends Component {
  render() {
    return (
      <div>
        <div className="top"><Link to='/'>home</Link></div>
        <div className="bottom">{this.props.children}</div>
      </div>
    );
  }
}

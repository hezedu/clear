import { Component } from 'react';
import { Link } from 'react-router';
import style from '../css/style.scss';

export class About extends Component {
  render() {
    //console.log('this.props.route', this);
    return (<div>
      <Link to={this.props.route.path + '/about'} activeClassName={style.active}>
      this.props.route.path: {this.props.route.path}
      </Link>
      <br/>
      <Link to='about' activeClassName={style.active}>
      </Link>
      </div>
    );
  }
}

import { Component , PropTypes} from 'react';
import style from '../css/style.scss';
import countStore from '../store/count';
import {connect, Provider} from 'react-redux';

class Title extends Component {
  static PropTypes = {
    msg: PropTypes.string
  };
  state = {msg: 'world'}
  handleClick(){
    this.props.dispatch({type:'INCREMENT'})
  }
  render() {
    return (<div>
      <h1 className={style.title} >
        <span onClick={::this.handleClick}>{this.props.msg} {this.state.msg} ! </span>
      </h1>
      <p>{this.props.count}</p>
      </div>);
  }
}

const mapStateToProps = (state) => { return {count:state}; };
const CountTitle = connect(mapStateToProps)(Title);

export default class extends Component {
  render() {
    return (
      <div>
      <Provider store={countStore}>
        <CountTitle msg="hello" />
      </Provider>
      </div>
    );
  }
}

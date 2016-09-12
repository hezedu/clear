import { Component, PropTypes} from 'react';
import { Link } from 'react-router';
import userStore from '../store/user';
import style from '../css/style.scss';
import {connect} from 'react-redux';
const testData = {
  id:1,
  name: 'dw'
};

export const isLogin = (nextState, replace) => {
  if(!userStore.getState()){
    replace('/login');
  }
};

export class LoginBox extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };
  state = testData;
  submit(){
    userStore.dispatch({type: 'login', data: this.state});
    this.context.router.push('/');
  }
  setName(event){
    this.setState({name: event.target.value});
  }
  render() {
    return (
      <div className={style.loginBox}>
        <div className={style.loginBox_title}>登录</div>
        <hr/>
        <input type="text" name='name' onChange={::this.setName} placeholder='用户名' />
        <input type='password' disabled='disabled' placeholder='密码' />
        <hr/>
        <button onClick={::this.submit} className={style.btn}>确定</button>
      </div>
    );
  }
}

class Bar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };
  logout(){
    this.props.dispatch({type: 'logout'});
    this.context.router.push('/');
  }
  render() {
    if(!this.props.user){
      return (
        <div className={style.loginBar}>
          <Link to="/login">测试登录</Link>
        </div>
      );
    }
    return (
      <div className={style.loginBar}>
        <span>{this.props.user.name}</span>
        <a onClick={::this.logout}>退出</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => { return {user:state}; };
export const LoginBar = connect(mapStateToProps)(Bar);

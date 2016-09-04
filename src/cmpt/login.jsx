import { Component} from 'react';
import { ClearLink } from '../lib/hack.jsx';
import userStore from '../store/user';
import style from '../css/style.scss';
import {connect} from 'react-redux';
import app from 'clear';
const testData = {
  id:1,
  name: 'dw'
};

export class LoginBox extends Component {
  state = testData;
  submit(){
    userStore.dispatch({type: 'login', data: this.state});
    app.router.push('/');
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
  logout(){
    this.props.dispatch({type: 'logout'});
    app.router.push('/login');
  }
  render() {
    if(!this.props.user){
      return (
        <div className={style.loginBar}>
          <ClearLink to="/login">登录</ClearLink>
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

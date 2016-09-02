import { Component } from 'react';
import { Link } from 'react-router';
import style from '../css/style.scss';
import userStore from '../store/user';
import {LoginBar} from './login.jsx';
import {Provider} from 'react-redux';

export class Root extends Component {//一个虚类，容器为：整个屏幕
  render() {
    return (
      <div className='height100'>
        {this.props.children}
      </div>
    );
  }
}

export class Top extends Component {//出现上导航，容器为：上导航以下。
  static isLogin(nextState, replace){
    if(!userStore.getState()){
      replace('/login');
    }
  }
  render() {
    return (
      <div className='height100'>
        <div className={style.topNavWarp}>
          <Link className={style.title} to="/">clear前端架构</Link>
          <div className={style.topNav}>
            <Link to="/env" activeClassName={style.active}>环境</Link>
            <Link to="/React">React</Link>
            <Link to="/cmpt">组件库</Link>
          </div>
          <Provider store={userStore}>
            <LoginBar />
          </Provider>
        </div>
        <div className={style.bottomWarp}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class Home extends Component {
  render() {
    return (
      <div className={style.homeTitle}>Home</div>
    );
  }
}

export class Left extends Component {
  render() {
    return (
      <div>
        <div className={style.leftNav}>
          <Link to={this.props.route.path + '/about'} activeClassName={style.active}>About</Link>
        </div>
        <div className={style.mainWarp}>
          <div className={style.main}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export class About extends Component {
  render() {
    return (
      <div>About</div>
    );
  }
}

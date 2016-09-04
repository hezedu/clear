import { Component } from 'react';
import { ClearLink } from '../lib/hack.jsx';
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
          <ClearLink className={style.title} to="/">Home</ClearLink>
          <div className={style.topNav}>
            <ClearLink to='env' activeClassName={style.active}>环境</ClearLink>
            <ClearLink to="React">学习</ClearLink>
            <ClearLink to="cmpt">组件库</ClearLink>
          </div>
          <div className={style.topRightBar}>
          <Provider store={userStore}>
            <LoginBar />
          </Provider>
          <a href='https://github.com/hezedu/clear' target='_blank' className={style.githubIcon}>
          <img src='https://assets-cdn.github.com/pinned-octocat.svg' />
          </a>
          </div>
        </div>
        <div className={style.bottomWarp}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class Home extends Component { //默认首页
  render() {
    return (
      <div className={style.homeTitle}>
        <big>Clear</big><small>前端架构</small>
        <br/>
        webpack + sass + possCss
         + <a href='https://github.com/reactjs/react-router/tree/master/docs'>react-router</a>
         + react + redux
        </div>
    );
  }
}

export class Left extends Component { //出现左导航，容器为：main。
  render() {
    return (
      <div>
        <div className={style.leftNav}>
          <ClearLink to={this.props.route.path + '/about'} activeClassName={style.active}>About</ClearLink>
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

export class LeftNav extends Component { //左导航
  render() {
    return (
      <ClearLink to={this.props.route.path + '/about'} activeClassName={style.active}>About</ClearLink>
    );
  }
}

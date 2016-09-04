import { Component, PropTypes} from 'react';
import { ClearLink } from '../lib/hack.jsx';
import style from '../css/style.scss';
import userStore from '../store/user';
import {LoginBar} from './login.jsx';
import {Provider} from 'react-redux';
import clear from 'clear';

export class Root extends Component {//出现router
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentWillMount(){
    clear.router = this.context.router;
    clear.$root = this.props;
  }
  render() {
    //console.log('this.props', this.props);
    return this.props.children;
  }
}

export class Top extends Component {//出现上导航
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
            <ClearLink to='./env' activeClassName={style.active}>环境</ClearLink>
            <ClearLink to="./study" activeClassName={style.active}>学习</ClearLink>
            <ClearLink to="./cmpt" activeClassName={style.active}>组件库</ClearLink>
          </div>
          <div className={style.topRightBar}>
          <Provider store={userStore}>
            <LoginBar />
          </Provider>
          <a href='https://github.com/hezedu/clear' target="_blank" className={style.githubIcon}>
          <img src={clear.rootPath + '/static/pinned-octocat.svg'} />
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
          <ClearLink to='about' activeClassName={style.active}>About</ClearLink>
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

export class About extends Component { //左导航
  render() {
    //console.log('this.props.route', this);
    return (
      <ClearLink to={this.props.route.path + '/about'} activeClassName={style.active}>About</ClearLink>
    );
  }
}

export class Study extends Component { //左导航
  render() {
    //console.log('this.props.route', this);
    return (
      <ClearLink to={this.props.route.path + '/Study'} activeClassName={style.active}>About</ClearLink>
    );
  }
}

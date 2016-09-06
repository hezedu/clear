import { Component, PropTypes} from 'react';
import { Link } from 'react-router';
import style from '../css/style.scss';
import userStore from '../store/user';
import {LoginBar} from './login.jsx';
import {Provider} from 'react-redux';
import clear from 'clear';
import {navRoutes} from '../router.conf';
import find from 'lodash/find';
export class Root extends Component {//出现router
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentWillMount(){
    clear.router = this.context.router;
    // clear.$root = this.props;
    // console.log('routes', clear.$root.routes);
  }
  render() {
    return this.props.children;
  }
}

clear.isLogin = (nextState, replace)=>{
  if(!userStore.getState()){
    replace('/login');
  }
};

export class Top extends Component {//出现上导航
  NavList(){
    const arr = [];
    navRoutes.forEach((v, i) => {
      const link = `/${v.path}`;
      // if (!v.link && v.childRoutes && v.childRoutes.length) {
      //   link = `${link}/${v.childRoutes[0].path}`;
      // }
      arr[i] = <Link to={link} key={v.path} activeClassName={style.active}>{v.title}</Link>;
    });
    return arr;
  }
  render() {
    return (
      <div className='height100'>
        <div className={style.topNavWarp}>
          <Link className={style.title} to="/">Home</Link>
          <div className={style.topNav}>
            {this.NavList()}
          </div>
          <div className={style.topRightBar}>
          <Provider store={userStore}>
            <LoginBar />
          </Provider>
          <a href='https://github.com/hezedu/clear' target="_blank" className={style.githubIcon}>
          <img src={clear.baseStatic + '/static/pinned-octocat.svg'} />
          </a>
          </div>
        </div>
          {this.props.children}
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

const tree = (arr, rpath) => {
  const arr2 = [];
  arr.forEach((v, i) => {
    v.link = `${rpath}/${v.path}`;
    let childRoutes = '';
    if (v.childRoutes) {
      childRoutes = <ul>{tree(v.childRoutes, v.link)}</ul>;
    }
    arr2[i] = (
      <li key={v.path}>
        <Link to={v.link} activeClassName={style.active}>{v.title}</Link>
        {childRoutes}
      </li>);
  });
  return arr2;
};

export class Left extends Component { //出现左导航，容器为：main。
  NavList(){
    const key = this.props.route.path;
    const data = find(navRoutes, {path: key}).childRoutes;
    return tree(data, `/${key}`);
  }
  render() {
    return (
      <div className={style.bottomWarp}>
        <ul className={style.leftNav}>
          {this.NavList()}
        </ul>
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
      <Link to={this.props.route.path + '/about'} activeClassName={style.active}>About</Link>
    );
  }
}

export class Main extends Component { //左导航
  loadHtml(){
    return require(`html!./main${this.props.route.link}.html`);
  }
  render() {
    //-console.log('this.props', this.props);
    return (
      <div dangerouslySetInnerHTML={{__html:this.loadHtml()}}/>
    );
  }
}

export class Error extends Component {//出现router
  render() {
    return (<div className={style.homeTitle}>
            <big>404</big><small>notFound</small>
            <br/>
             <Link to='/'>返回首页</Link>
            </div>);
  }
}

import { Component, PropTypes} from 'react';
import { Link } from 'react-router';
import style from '../css/style.scss';
import userStore from '../store/user';
import {LoginBar} from './login.jsx';
import {Provider} from 'react-redux';
import NavTree from './tree.jsx';
import clear from 'clear';
import {navRoutes} from '../router.conf';
import find from 'lodash/find';

//======================router======================
export class Root extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };
  componentWillMount(){
    clear.router = this.context.router;
    clear.location = this.context.location;
  }
  render() {
    return this.props.children;
  }
}

// clear.isLogin = (nextState, replace) => {
//   if(!userStore.getState()){
//     replace('/login');
//   }
// };
//======================上导航======================
export class Top extends Component {
  NavList(){
    const arr = [];
    navRoutes.forEach((v, i) => {
      v.path = v.path[0] !== '/' ? `/${v.path}` : v.path;
      arr[i] = <Link to={v.path} key={v.path} activeClassName={style.active}>{v.title}</Link>;
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
          <img src={clear.BASE_STATIC + '/static/pinned-octocat.svg'} />
          </a>
          </div>
        </div>
          {this.props.children}
      </div>
    );
  }
}

//======================默认首页======================
export class Home extends Component {
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

//======================左导航======================
export class Left extends Component {
  NavList(){
    const key = this.props.route.path;
    const data = find(navRoutes, {path: key}).childRoutes;
    return tree(data, `/${key}`);
  }
  componentWillMount(){
    console.log('componentWillMount');
    const key = this.props.route.path;
    this.setState({
      rootPath: key,
      routes: find(navRoutes, {path: key}).childRoutes
    });
  }
  render() {
    console.log('render');
    return (
      <div className={style.bottomWarp}>
        <ul className={style.leftNav}>
          {/*this.NavList()*/}
          <NavTree {...this.state} />
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

//======================主展示区======================
export class Main extends Component {
  loadHtml(){
    console.log('test');
    //return require(`html!./main${this.props.route.link}.html`);
  }
  state = {
    html:''
  }
  componentWillMount(){
    var that = this;
    require([`html!./main${that.props.route.link}.html`], function(html){
      that.setState({html});
    });
  }
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html:this.state.html}}/>
    );
  }
}

//======================错误页（目前仅支持404）======================
export class Error extends Component {//router
  render() {
    return (
      <div className={style.homeTitle}>
        <big>404</big>
        <small>notFound</small>
        <br/>
        <Link to='/'>返回首页</Link>
      </div>
    );
  }
}

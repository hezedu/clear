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
    clear.location = this.props.location;
  }
  render() {
    //console.log('render');
    return this.props.children;
  }
}


//======================上导航======================
function topNavOnEnter (nextState, replace){
  replace(this.IndexRedirect);
}
export class Top extends Component {
  NavList(){
    const arr = [];
    navRoutes.forEach((v, i) => {
      if(v.path){
        v.path = v.path[0] !== '/' ? `/${v.path}` : v.path;
        if(typeof v.firstChildIndex && v.childRoutes && v.childRoutes[0]){
          v.indexRoute = {
            IndexRedirect : v.path + '/' + (v.childRoutes[0].path || ''),
            onEnter : topNavOnEnter
          };
        }
        arr.push(<Link to={v.path} key={v.path + i} activeClassName={style.active}>{v.title}</Link>);
      }
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
        <a href='http://webpack.github.io/docs/' target='_blank'>webpack</a>
         + <a href='http://sass-lang.com/documentation/file.SASS_REFERENCE.html#css_extensions' target='_blank'>sass</a>
         + <a href='http://simplaio.github.io/rucksack/docs/#autoprefixing' target='_blank'>possCss</a>
         + <a href='https://github.com/reactjs/react-router/tree/master/docs' target='_blank'>react-router</a>
         + <a href='https://facebook.github.io/react/docs/getting-started.html' target='_blank'>react</a>
         + <a href='http://redux.js.org/index.html' target='_blank'>redux</a>
        </div>
    );
  }
}

//======================左导航======================
export class Left extends Component {
  mountNav(){
    const key = this.props.route.path;
    const prop = {
      rootPath: key,
      list: find(navRoutes, {path: key}).childRoutes
    };
    return <NavTree {...prop} />;
  }
  render() {
    return (
      <div className={style.bottomWarp}>
        <ul className={style.leftNav}>
          {this.mountNav()}
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
    const path = this.props.filePath || this.props.route.link;
    return require(`./main${path}.html`);
  }
  render() {
    if(this.props.children){
      return this.props.children;
    }
    return (
      <div dangerouslySetInnerHTML={{__html:this.loadHtml()}}/>
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

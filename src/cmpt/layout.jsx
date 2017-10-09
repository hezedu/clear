import { Component} from 'react';
import { Link } from 'react-router';
import style from '../css/style.scss';
import NavTree from './tree.jsx';
import * as routes from '../router.config';
import find from 'lodash/find';
import virgin from 'virgin';
//======================router======================
export class Root extends Component {
  // static contextTypes = {
  //   router: PropTypes.object.isRequired,
  //   location: PropTypes.object.isRequired
  // };
  componentWillMount(){
    virgin.history = this.props.history;
    virgin.router = this.props.router;
    virgin.location = this.props.location;
  }
  render() {
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
    routes.navRoutes.forEach((v, i) => {
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
  reload(){
    routes.default.childRoutes = routes.defChildRoutes;
    const {history , location} = virgin;
    history.replace(location.pathname);
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
          <button onClick={this.reload}>reload</button>
          <a href='https://github.com/hezedu/clear' target="_blank" className={style.githubIcon}>
          <img src={window.SERVER_CONFIG.BASE_STATIC + '/static/pinned-octocat.svg'} />
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
      list: find(routes.navRoutes, {path: key}).childRoutes
    };
    return <NavTree {...prop} />;
  }
  render() {
    return (
      <div>
        <ul className={style.leftNav}>
          {this.mountNav()}
        </ul>
        <div className={style.mainWarp}>
            {this.props.children}
        </div>
      </div>
    );
  }
}

//======================主展示区======================

// const hljs = {
//   initHighlighting: function(){}
// };
// const hljs = require('highlight.js/lib/highlight');
// require('github-markdown-css');
// require('highlight.js/styles/github.css');
// hljs.registerLanguage('js', require('highlight.js/lib/languages/javascript'));
// hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
export class Main extends Component {
  state = {
    html: ''
  }
  loadHtml(){
    const self = this;
    const {$, markdown } = window;
    const path = this.props.filePath || this.props.route.link || this.props.route.path;
    $.ajax({
      url: `/md${path}.md`,
      dataType: 'text',
      success(data){
        self.setState({
          html: markdown.toHTML(data)
        })
        self.highlight();
        //console.log('data', data);
      }
    })
    // const html = require(`../md${path}.md`);
    // return html;
  }
  highlight(){
    const hljs = window.hljs;
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  componentWillMount(){
    this.loadHtml();
  }

  componentWillReceiveProps(){
    this.loadHtml();
  }
  // componentDidUpdate(){
  //   this.loadHtml();
  // }
  render() {
    if(this.props.children){
      return this.props.children;
    }
    return (
      <div className='markdown-body' dangerouslySetInnerHTML={{__html:this.state.html}}/>
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

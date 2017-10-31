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
// function topNavOnEnter (nextState, replace){
//   replace(this.IndexRedirect);
// }
export class Top extends Component {
  state = {
    data: {},
    isInit: false,
    projectName: ''
  }
  NavList(){
    const arr = [];
    routes.navRoutes.forEach((v) => {
      //if(v.path){
        // if(v.firstChildIndex && v.childRoutes && v.childRoutes[0]){
        //   v.indexRoute = {
        //     IndexRedirect : v.childRoutes[0].link,
        //     onEnter : topNavOnEnter
        //   };
        // }
      arr.push(
      <Link to={v.link} key={v.link} activeClassName={style.active}>
        {v.title}
      </Link>);
      //}
    });
    return arr;
  }
  reload(){
    routes.default.childRoutes = routes.defChildRoutes;
    // const {history , location} = virgin;
    // history.replace(location.pathname);
  }
  componentWillUnmount(){
    this.reload();
  }
  componentWillMount(){
    this.getData();
  }
  getProjectName(name){
    name = name || '';
    name = name.replace('clear-docs-', '');
    return name;
  }
  getData(){

    const self = this;
    const projectId = self.props.params.id;
    window.$.ajax({
      url: '/api/v3/projects/' + projectId,
      success(data){
        //console.log('data', data)
        let projectName = self.getProjectName(data.name);
        window.path_with_namespace = data.path_with_namespace;
        window.projectName = projectName;
        document.title = projectName;
        self.setState({
          data,
          projectName,
          isInit: true
        })
      }
    })
  }
  render() {
    if(!this.state.isInit){
      return null;
    }
    let name = this.state.projectName;

    return (
      <div className='height100'>
        <div className={style.topNavWarp}>
          <div className={style.title}>
            <Link to='/' style={{fontSize: ".6em"}}>clear-docs</Link>
            <Link to={'/' + this.props.params.id}  activeClassName={style.active} className={style.title_name} onlyActiveOnIndex={true}>{name}</Link>
          </div>
          <div className={style.topNav}>
            {this.NavList()}
          </div>
          <div className={style.topRightBar}>
            <button className='clear-reload' onClick={this.reload}>reload</button>
            <a href='https://github.com/hezedu/clear/tree/doc-new' target="_blank" className={style.githubIcon}>
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
  state = {
    data: []
  }
  getData(){
    const self = this;
    window.$.ajax({
      url: '/api/v3/projects?simple=true&search=clear-docs-',
      success(data){
        self.setState({data})
      }
    })
  }
  componentWillMount(){
    document.title = 'home';
    this.getData();
  }
  getList(){
    return this.state.data.map(v => {
      return (<li key={v.id}><Link to={"/" + v.id}>{v.name.replace('clear-docs-', '')}</Link></li>)
    })
  }
  render() {
    const arr = this.getList()
    return (
      <div className='height100'>
        <div className={style.topNavWarp}>
          <Link className={style.title} to="/" activeClassName={style.active} onlyActiveOnIndex={true}>clear-docs</Link>
          <div className={style.topRightBar}>
            <button className='clear-reload' onClick={this.reload}>reload</button>
            <a href='https://github.com/hezedu/clear/tree/doc-new' target="_blank" className={style.githubIcon}>
              <img src={window.SERVER_CONFIG.BASE_STATIC + '/static/pinned-octocat.svg'} />
            </a>
          </div>
        </div>
        <div className={style.bottomWarp}>
          <div className='markdown-body clear-index' style={{fontSize:"1.2em"}}>
            <ul>{arr}</ul>
          </div>
        </div>
      </div>

    );
  }
}

//======================左导航======================
export class Left extends Component {
  mountNav(){
    const key = this.props.route.link;
    const prop = {
      rootPath: key,
      list: find(routes.navRoutes, {link: key}).childRoutes
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
var md = window.markdownit();
export class Main extends Component {
  state = {
    html: ''
  }
  loadHtml(props){
    props = props || this.props;
    const self = this;
    const {$} = window;
    const path = props.filePath || props.route.link || props.route.path;
    const projectId = self.props.params.id;
    let file_path = path + '.md';
    file_path = file_path.substr(projectId.length + 2);
    $.ajax({
      url: '/md/' + window.path_with_namespace + '/raw/master/' + file_path,
      // data: {
      //   file_path,
      //   ref: "master"
      // },
      dataType: 'text',
      success(data){
        self.setState({
          html: md.render(data)
        })
      }
    })
    return file_path;
  }
  highlight(){
    const hljs = window.hljs;
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  componentWillMount(){
    let filePath = this.loadHtml();
    filePath = filePath.split('/');
    filePath.reverse();
    filePath = filePath.join(' · ');
    document.title = filePath + ' · ' + window.projectName;
  }

  componentWillReceiveProps(props){
    this.loadHtml(props);
  }
  componentDidUpdate(){
    this.highlight();
  }
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

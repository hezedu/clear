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
    routes.navRoutes.forEach((v) => {
      if(v.path){
        if(v.firstChildIndex && v.childRoutes && v.childRoutes[0]){
          v.indexRoute = {
            IndexRedirect : v.childRoutes[0].link,
            onEnter : topNavOnEnter
          };
        }
        arr.push(<Link to={v.link} key={v.link} activeClassName={style.active}>{v.title}</Link>);
      }
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
  render() {
    return (
      <div className='height100'>
        <div className={style.topNavWarp}>
          <Link className={style.title} to="/" activeClassName={style.active} onlyActiveOnIndex={true}>Home</Link>
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
    setTimeout(() => {
      this.setState({data: devProjectsData()})
    }, 200);
  }
  componentWillMount(){
    this.getData();
  }
  getList(){
    return this.state.data.map(v => {
      return (<li key={v.id}><Link to={"/" + v.id}>{v.name}</Link></li>)
    })
  }
  render() {
    const arr = this.getList()
    return (
      <div className='height100'>
        <div className={style.topNavWarp}>
          <Link className={style.title} to="/" activeClassName={style.active} onlyActiveOnIndex={true}>Home</Link>
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
    $.ajax({
      url: `/md${path}.md`,
      dataType: 'text',
      success(data){
        self.setState({
          html: md.render(data)
        })
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

function devProjectsData(){
  return [{"id":15,"http_url_to_repo":"http://localhost:10080/RD/Even_Miniprog.git","web_url":"http://localhost:10080/RD/Even_Miniprog","name":"Even_Miniprog","name_with_namespace":"RD / Even_Miniprog","path":"Even_Miniprog","path_with_namespace":"RD/Even_Miniprog"},{"id":14,"http_url_to_repo":"http://localhost:10080/duwei/doc2.git","web_url":"http://localhost:10080/duwei/doc2","name":"doc2","name_with_namespace":"都威 / doc2","path":"doc2","path_with_namespace":"duwei/doc2"},{"id":13,"http_url_to_repo":"http://localhost:10080/RD/Even_Bond_Miniprog.git","web_url":"http://localhost:10080/RD/Even_Bond_Miniprog","name":"Even_Bond_Miniprog","name_with_namespace":"RD / Even_Bond_Miniprog","path":"Even_Bond_Miniprog","path_with_namespace":"RD/Even_Bond_Miniprog"},{"id":11,"http_url_to_repo":"http://localhost:10080/RD/Even_Official.git","web_url":"http://localhost:10080/RD/Even_Official","name":"Even_Official","name_with_namespace":"RD / Even_Official","path":"Even_Official","path_with_namespace":"RD/Even_Official"},{"id":10,"http_url_to_repo":"http://localhost:10080/RD/Even_Bond_Backend.git","web_url":"http://localhost:10080/RD/Even_Bond_Backend","name":"Even_Bond_Backend","name_with_namespace":"RD / Even_Bond_Backend","path":"Even_Bond_Backend","path_with_namespace":"RD/Even_Bond_Backend"},{"id":9,"http_url_to_repo":"http://localhost:10080/RD/Even_Bond.git","web_url":"http://localhost:10080/RD/Even_Bond","name":"Even_Bond_Frontend","name_with_namespace":"RD / Even_Bond_Frontend","path":"Even_Bond","path_with_namespace":"RD/Even_Bond"},{"id":8,"http_url_to_repo":"http://localhost:10080/liujie/lp_chengan_html.git","web_url":"http://localhost:10080/liujie/lp_chengan_html","name":"lp_chengan_html","name_with_namespace":"liujie / lp_chengan_html","path":"lp_chengan_html","path_with_namespace":"liujie/lp_chengan_html"},{"id":6,"http_url_to_repo":"http://localhost:10080/RD/Even_LP.git","web_url":"http://localhost:10080/RD/Even_LP","name":"Even_LP","name_with_namespace":"RD / Even_LP","path":"Even_LP","path_with_namespace":"RD/Even_LP"},{"id":5,"http_url_to_repo":"http://localhost:10080/RD/even-admin.git","web_url":"http://localhost:10080/RD/even-admin","name":"Even_admin","name_with_namespace":"RD / Even_admin","path":"even-admin","path_with_namespace":"RD/even-admin"},{"id":1,"http_url_to_repo":"http://localhost:10080/RD/Even.git","web_url":"http://localhost:10080/RD/Even","name":"Even","name_with_namespace":"RD / Even","path":"Even","path_with_namespace":"RD/Even"}]
}

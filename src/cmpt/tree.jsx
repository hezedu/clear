import { Link } from 'react-router';
import { Component , PropTypes} from 'react';
import style from '../css/style.scss';
import virgin from 'virgin';
export default class extends Component {
  state = {
    list:[],
    rootPath:''
  };
  static PropTypes = {
    routes: PropTypes.optionalArray,
    rootPath: PropTypes.optionalString
  }
  handleTreeNodeClick(e){
    const $dom = window.$(e.target);
    const $next = $dom.next();
    const display = $next.css('display');
    $next.css('display', display === 'block' ? 'none' : 'block');
    e.preventDefault();
  }

  render(){
    return <ul>{tree(this.props.list, this.props.rootPath, this)}</ul>;
  }
}
function replaceOnEnter (nextState, replace){
  replace(this.IndexRedirect);
}
const tree = (arr, rpath, self) => {
  const arr2 = [];
  const pathname = virgin.location.pathname;
  arr.forEach((v, i) => {
    v.link = `${rpath}/${v.path}`;
    //let target = '';
    let childRoutes = '';
    if (v.childRoutes) {
      if(v.firstChildIndex && v.childRoutes[0]){
        v.indexRoute = {
          IndexRedirect : v.redirectTo,
          onEnter : replaceOnEnter
        };
      }
      let isShow = false;
      if(pathname.indexOf(v.link) === 0){
        isShow = true;
        console.log('ok', v.link, pathname);
      }
      childRoutes = <ul style={{"display": isShow ?  "block" : "none"}}>{tree(v.childRoutes, v.link)}</ul>;
    }
    let LinkOrNode;
    if(v.component){
      LinkOrNode = <Link to={v.link} activeClassName={style.active} onlyActiveOnIndex={true}>{v.title}</Link>;
    }else{
      //LinkOrNode = <div className="clear-tree-node">{v.title}</div>;
      LinkOrNode = <Link to={v.link}
      className="clear-tree-node"
      activeClassName='clear-tree-node-active' onClick={self.handleTreeNodeClick}>
        {v.title}
      </Link>;
    }
    arr2[i] = (
      <li key={v.path}>
        {LinkOrNode}
        {childRoutes}
      </li>);
  });
  return arr2;
};

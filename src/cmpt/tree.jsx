import { Link } from 'react-router';
import { Component , PropTypes} from 'react';
import style from '../css/style.scss';

export default class extends Component {
  state = {
    list:[],
    rootPath:''
  };
  static PropTypes = {
    routes: PropTypes.optionalArray,
    rootPath: PropTypes.optionalString
  }
  handleClick(e){
    e.preventDefault();
    console.log(e);
  }
  render(){
    //console.log('this.props', this.props);
    return <ul>{tree(this.props.list, this.props.rootPath, this)}</ul>;
  }
}

const tree = (arr, rpath, self) => {
  const arr2 = [];
  arr.forEach((v, i) => {
    v.link = `${rpath}/${v.path}`;
    //let target = '';
    let childRoutes = '';
    if (v.childRoutes) {
      childRoutes = <ul>{tree(v.childRoutes, v.link)}</ul>;
    }
    let LinkOrNode;
    if(v.component){
      LinkOrNode = <Link to={v.link} activeClassName={style.active} onlyActiveOnIndex={true}>{v.title}</Link>;
    }else{
      //LinkOrNode = <div className="clear-tree-node">{v.title}</div>;
      LinkOrNode = <Link to={v.link}
      activeClassName={style.active} onClick={self.handleClick}>
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

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
  render(){
    //console.log('this.props', this.props);
    return <ul>{tree(this.props.list, this.props.rootPath)}</ul>;
  }
}

const tree = (arr, rpath) => {
  const arr2 = [];
  arr.forEach((v, i) => {
    v.link = `${rpath}/${v.path}`;
    //let target = '';
    let childRoutes = '';
    if (v.childRoutes) {
      childRoutes = <ul>{tree(v.childRoutes, v.link)}</ul>;
    }
    arr2[i] = (
      <li key={v.path}>
        <Link to={v.link} activeClassName={style.active} onlyActiveOnIndex={true}>{v.title}</Link>
        {childRoutes}
      </li>);
  });
  return arr2;
};

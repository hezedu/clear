import { Component , PropTypes} from 'react';
import { Link } from 'react-router';
//增加 Component this.context
Component.contextTypes = {
  router: PropTypes.object.isRequired
};

//增加了 rootPath 特性
//to 前面不加 “/” 的话，自动添加rootPath + 父级path
export class ClearLink extends Link {
  static contextTypes = {
    location: PropTypes.object.isRequired
  };
  render() {
    console.log('this', this.props);
    let to = this.props.to;
    let pathname = (typeof to === 'string') ? to : to.pathname;
    if(pathname[0] !== '/'){
      pathname = (this.props.route ? this.props.route.path : '') + '/' + pathname;
    }
    pathname = ClearLink.rootPath + pathname;
    if(typeof to === 'string'){
      to = this.context.location.pathname + pathname;
    }else{
      to.pathname = this.context.location.pathname + pathname;
    }
    return (
      <Link {...this.props} to={to} />
    );
  }
}
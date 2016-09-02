import { Component} from 'react';
export class Root extends Component {//一个虚类，容器为：整个屏幕
  render() {
    return (
      <div className='height100'>
        {this.props.children}
      </div>
    );
  }
}

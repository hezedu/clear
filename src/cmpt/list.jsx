import { Component} from 'react';
import { Link } from 'react-router';
import style from '../css/style.scss';
export default class extends Component {
  state = {list:[]};
  componentDidMount(){
    const that = this;
    setTimeout(()=> {
      that.setState({list:
      [
       {id:1, title: 'aaa'},
       {id:2, title: 'bbb'},
       {id:3, title: 'ccc'},
      ]
       })
    }, 2000)
  }
  ul(){
    const arr = [];
    this.state.list.forEach((v) => {
      arr.push(<li key={v.id}>
        <Link to={'/detail/' + v.id}>{v.title}</Link>
        </li>)
    })
    return <ul>{arr}</ul>;
  }
  render() {
    return (
      <div>
      <h1 className={style.title} >
        list
      </h1>
      {this.ul()}
      </div>
    );
  }
}

import { Component} from 'react';
import style from '../css/style.scss';
export default class extends Component {
  render() {
    return (
      <div>
      <h1 className={style.title} >
        Detail:{this.props.params.id}
      </h1>
      </div>
    );
  }
}

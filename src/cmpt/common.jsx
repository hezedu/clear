import { Component } from 'react';
const hljs = require('highlight.js');

export class MakeDownHLHtml extends Component {
  componentWillMount(){
    const md = require(this.props.filePath);
    this.setState({html:hljs.highlightBlock(md)});
  }
  render(){
    return (<div dangerouslySetInnerHTML={{__html:this.state.html}}/>);
  }
}

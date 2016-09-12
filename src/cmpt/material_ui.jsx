import { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
if(!injectTapEventPlugin.called){
  injectTapEventPlugin.called = true;
  injectTapEventPlugin();
}

export class Theme extends Component{
  render(){
    return (
      <MuiThemeProvider>
      <AppBar title='前端架构' iconElementRight={<IconButton
              iconClassName="muidocs-icon-custom-github"
              href="https://github.com/callemall/material-ui"
            />}>
      hehe
      </AppBar>
      </MuiThemeProvider>
    );
  }
}

// export class AppBar extends Component{
//   render(){
//     return (    {this.props.children}
//       <h1>AppBar</h1>
//     );
//   }
// }

import { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
if(!injectTapEventPlugin.called){
  injectTapEventPlugin.called = true;
  injectTapEventPlugin();
}

const muiTheme = getMuiTheme({
  fontFamily:["Microsoft YaHei", "Hiragino Sans GB", "Courier new"]
  // palette: {
  //   textColor: cyan500,
  // },
  // appBar: {
  //   height: 50,
  // },
});

const TabsStyle = {
  width:'auto'
}
export  default class Theme extends Component{
  render(){
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <AppBar title={<Tabs style={TabsStyle}>
              <Tab label={<Link to = "/">Item One</Link>} />
              <Tab label="Item Two" />
              <Tab label="onActive" data-route="/home"/>
              </Tabs>}  iconElementRight={<FlatButton label="Save" />}>

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

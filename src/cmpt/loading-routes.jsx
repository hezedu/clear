import { Component , PropTypes} from 'react';
import * as layout from '../cmpt/layout';
//import * as routes from '../router.config';
import * as routes from '../router.config';

export default class extends Component {
  state = {
    list:[],
    rootPath:''
  };
  static PropTypes = {
    routes: PropTypes.optionalArray,
    rootPath: PropTypes.optionalString
  }
  initLeftTree(arr){
    if(arr){
      arr.forEach(v => {
        v.component = layout.Main;
        v.firstChildIndex = true;
        let child = v.childRoutes;
        this.initLeftTree(child);
      })
    }

  }
  getData(){
    const self = this;
    window.$.ajax({
      url: '/routes.json',
      dataType: 'json',
      success(data){
        const navRoutes = self.getNavRoutes(data);
        routes.navRoutes = navRoutes;
        routes.default.childRoutes =  [{
          component: layout.Top,
          indexRoute: {
            component: layout.Home
          },
          childRoutes: navRoutes
        },
        { path: '*', component: layout.Error}
        ]
        const {history , location} = self.props;
        history.replace(location.pathname);
      },
      error(res){
        console.log('error res', res);
      }
    })
  }
  getNavRoutes(data){
    const navRoutes = [];
    data.forEach(v => {
      if(v.childRoutes){
        v.component = layout.Left;
        v.firstChildIndex = true;
        this.initLeftTree(v.childRoutes);
      }else{
        v.component = layout.Main;
      }
      navRoutes.push(v);
    });
    return navRoutes;
  }
  componentWillMount(){
    this.getData();
  }
  render(){
    return (
      <h1>正在加载。。。</h1>
    );
  }
}
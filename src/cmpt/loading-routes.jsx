import { Component , PropTypes} from 'react';
import * as layout from '../cmpt/layout';
import * as routes from '../router.config';
import {forMatData, initRouter } from './util';

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
        let child = v.childRoutes;
        if(child){
          v.firstChildIndex = true;
        }else{
          if(v.isIndex){
            v.path = '';
            v.indexRoute = {
              component : layout.Main,
              link: v.link
            }
          }else{
            v.component = layout.Main;
          }
        }

        this.initLeftTree(child);
      })
    }

  }
  getData(){
    const self = this;
    const projectId = self.props.params.id;
    //console.log('projectId', projectId)

    window.$.ajax({
      url: '/api/v3/projects/' + projectId + '/repository/tree?recursive=true',
      success(data){
        data = forMatData(data);
        data = initRouter(data, '/' + projectId);
        const {navRoutes, indexRoute} = self.getNavRoutes(data);
        routes.navRoutes = navRoutes;
        routes.default.childRoutes =  [{
          path: ':id',
          component: layout.Top,
          indexRoute,
          childRoutes: navRoutes
        },
        { path: '*', component: layout.Error}
        ]
        const {history , location} = self.props;
        history.replace(location.pathname);
      }
    });

    // setTimeout(() => {
    //   let data = get14TreeData();

    // }, 200)
    /*
    window.$.ajax({
      url: '/routes.json',
      dataType: 'json',
      success(data){
        const navRoutes = self.getNavRoutes(data);
        routes.navRoutes = navRoutes;
        routes.default.childRoutes =  [{
          path: '/',
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
    */
  }
  getNavRoutes(data){
    const navRoutes = [];
    let indexRoute;
    data.forEach(v => {
      if(v.childRoutes){
        v.component = layout.Left;
        v.firstChildIndex = true;
        this.initLeftTree(v.childRoutes);
      }else{
        v.component = layout.Main;
      }
      if(v.isIndex){
        indexRoute = {
          component : layout.Main,
          link: v.link
        }
      }else{
        navRoutes.push(v);
      }
    });
    return {navRoutes, indexRoute};
  }
  componentWillMount(){
    this.getData();
  }
  render(){
    return (
      <div>正在加载。。。</div>
    );
  }
}

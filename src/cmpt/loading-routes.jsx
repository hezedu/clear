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
          v.component = layout.Main;
        }
        this.initLeftTree(child);
      })
    }

  }
  getData(){
    const self = this;
    const projectId = self.props.params.id;
    console.log('projectId', projectId)
    // window.$.ajax({
    //
    // });
    setTimeout(() => {
      let data = get14TreeData();
      console.log('data', data)
      data = forMatData(data);
      console.log('data', data)
      data = initRouter(data, '/' + projectId);
      console.log('initRouter data', data);
      const navRoutes = self.getNavRoutes(data);
      routes.navRoutes = navRoutes;
      routes.default.childRoutes =  [{
        path: ':id',
        component: layout.Top,
        childRoutes: navRoutes
      },
      { path: '*', component: layout.Error}
      ]
      const {history , location} = self.props;
      history.replace(location.pathname);
    }, 200)
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
      <div>正在加载。。。</div>
    );
  }
}


function get14TreeData(){
  return [{"name":"Directory","type":"tree","path":"Directory","mode":"040000"},
  {"name":".gitlab-ci.yml","type":"blob","path":".gitlab-ci.yml","mode":"100644"},
  {"name":".gitkeep","type":"blob","path":"Directory/.gitkeep","mode":"100644"},
  {"name":"hellowordp.md","type":"blob","path":"Directory/hellowordp.md","mode":"100644"},
  {"name":"dir2","type":"tree","path":"Directory/dir2"},
  {"name":"dir2File.md","type":"blob","path":"Directory/dir2/dir2File.md"},
  {"id":"524aac15ffcaa557695a0a1daacd9f6f04f927a1","name":"README.md","type":"blob","path":"README.md","mode":"100644"},
  {"id":"0b7630f0f5f541da02a5cb5238c6347624163053","name":"login.md","type":"blob","path":"login.md","mode":"100644"},
  {"id":"7639dee25307cbe450a7d3a8f8b45fe0bd2cefc7","name":"rrr.md","type":"blob","path":"rrr.md","mode":"100644"}]
}

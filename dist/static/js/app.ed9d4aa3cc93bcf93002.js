webpackJsonp([1],{AnS9:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"container my-5"},[e("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-light"},[e("ul",{staticClass:"navbar-nav"},[e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/",exact:""}},[this._v("首頁")])],1),this._v(" "),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/page"}},[this._v("單元作業")])],1),this._v(" "),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/aqi"}},[this._v("空氣品質指標")])],1)])]),this._v(" "),e("router-view",{staticClass:"my-3"})],1)])},staticRenderFns:[]};var i=a("VU/8")({name:"App",components:{}},n,!1,function(t){a("AnS9")},null,null).exports,c=a("/ocq"),l={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"hello"},[this._v("\n  首頁\n")])},staticRenderFns:[]},o=a("VU/8")({name:"HelloWorld",data:function(){return{}}},l,!1,null,null,null).exports,r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"navs"},[e("nav",{staticClass:"navbar navbar-expand-lg navbar-light"},[e("ul",{staticClass:"navbar-nav"},[e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/page",exact:""}},[this._v("TodoList")])],1),this._v(" "),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/page/sort"}},[this._v("表格排序")])],1)])])])},staticRenderFns:[]},d={name:"page",components:{Navs:a("VU/8")({name:"navs",data:function(){return{}}},r,!1,null,null,null).exports},data:function(){return{}}},u={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page"},[e("Navs"),this._v(" "),e("router-view")],1)},staticRenderFns:[]},v=a("VU/8")(d,u,!1,null,null,null).exports,p={name:"TodoList",data:function(){return{newTodo:"",todos:[{title:"Default",id:0,completed:!1}],status:"all",cacheTodo:[],cacheTitle:""}},methods:{addTodo:function(){var t=this.newTodo.trim(),e=Math.floor(Date.now());t&&(this.todos.push({title:t,id:e,completed:!1}),this.newTodo="")},removeTodo:function(t){var e=this.todos.findIndex(function(e){return t.id==e.id});this.todos.splice(e,1)},cleanTodo:function(){this.todos=[]},editTodo:function(t){this.cacheTodo=t,this.cacheTitle=t.title},doneEdit:function(t){t.title=this.cacheTitle,this.cacheTodo=[],this.cacheTitle=""},cancelEdit:function(){this.cacheTodo=[]}},computed:{activeTodo:function(){return this.todos.filter(function(t){return!t.completed})},completedTodo:function(){return this.todos.filter(function(t){return t.completed})},filterTodo:function(){switch(this.status){case"all":return this.todos;case"active":return this.activeTodo;case"completed":return this.completedTodo}}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"todo"}},[a("div",{staticClass:"input-group"},[t._m(0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newTodo,expression:"newTodo"}],staticClass:"form-control",attrs:{type:"text",placeholder:"準備要做的任務"},domProps:{value:t.newTodo},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e)},input:function(e){e.target.composing||(t.newTodo=e.target.value)}}}),t._v(" "),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-primary",on:{click:t.addTodo}},[t._v("新增")])])]),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("ul",{staticClass:"nav nav-tabs card-header-tabs"},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"all"==t.status},attrs:{href:""},on:{click:function(e){e.preventDefault(),t.status="all"}}},[t._v("全部")])]),t._v(" "),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"active"==t.status},attrs:{href:""},on:{click:function(e){e.preventDefault(),t.status="active"}}},[t._v("進行中")])]),t._v(" "),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"completed"==t.status},attrs:{href:""},on:{click:function(e){e.preventDefault(),t.status="completed"}}},[t._v("已完成")])])])]),t._v(" "),a("ul",{staticClass:"list-group list-group-flush"},t._l(t.filterTodo,function(e){return a("li",{key:e.id,staticClass:"list-group-item",on:{dblclick:function(a){return t.editTodo(e)}}},[t.cacheTodo.id!==e.id?a("div",{staticClass:"d-flex"},[a("div",{staticClass:"form-check"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.completed,expression:"item.completed"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:e.id},domProps:{checked:Array.isArray(e.completed)?t._i(e.completed,null)>-1:e.completed},on:{change:function(a){var s=e.completed,n=a.target,i=!!n.checked;if(Array.isArray(s)){var c=t._i(s,null);n.checked?c<0&&t.$set(e,"completed",s.concat([null])):c>-1&&t.$set(e,"completed",s.slice(0,c).concat(s.slice(c+1)))}else t.$set(e,"completed",i)}}}),t._v(" "),a("label",{staticClass:"form-check-label",class:{completed:e.completed},attrs:{for:e.id}},[t._v(t._s(e.title))])]),t._v(" "),a("button",{staticClass:"close ml-auto",on:{click:function(a){return t.removeTodo(e)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]):t._e(),t._v(" "),t.cacheTodo.id===e.id?a("input",{directives:[{name:"model",rawName:"v-model",value:t.cacheTitle,expression:"cacheTitle"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.cacheTitle},on:{keyup:[function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.doneEdit(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.cancelEdit(e)}],input:function(e){e.target.composing||(t.cacheTitle=e.target.value)}}}):t._e()])}),0),t._v(" "),a("div",{staticClass:"card-footer d-flex justify-content-between"},[a("span",[t._v("還有 "+t._s(t.activeTodo.length)+" 筆任務未完成")]),t._v(" "),a("a",{attrs:{href:"#"},on:{click:t.cleanTodo}},[t._v("清除所有任務")])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[this._v("待辦事項")])])}]};var m=a("VU/8")(p,h,!1,function(t){a("iRE7")},null,null).exports,f={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sort"},[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",[t._v("品名")]),t._v(" "),a("th",{staticClass:"click"},[t._v("價格 \n\t\t\t\t\t\t"),a("span",{staticClass:"icon"},[a("i",{staticClass:" fas fa-angle-up text-success"})])]),t._v(" "),a("th",{staticClass:"click"},[t._v("到期日\n\t\t\t\t\t\t"),a("span",{staticClass:"icon"},[a("i",{staticClass:" fas fa-angle-up text-success"})])])]),t._v(" "),a("tr",[a("td"),t._v(" "),a("td"),t._v(" "),a("td")])])])])}]},_=a("VU/8")({name:"TableSort",data:function(){return{}}},f,!1,null,null,null).exports;s.a.use(c.a);var C=new c.a({linkActiveClass:"active",routes:[{name:"首頁",path:"/",component:o},{path:"/page",component:v,children:[{name:"待辦事項",path:"",component:m},{name:"表格排序",path:"sort",component:_}]}]}),k=a("mtWM"),T=a.n(k),g=a("Rf8U"),y=a.n(g);s.a.use(y.a,T.a),s.a.config.productionTip=!1,new s.a({el:"#app",components:{App:i},template:"<App/>",router:C})},iRE7:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.ed9d4aa3cc93bcf93002.js.map
webpackJsonp([1],{"1K8f":function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"container my-5"},[a("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-light"},[a("ul",{staticClass:"navbar-nav"},[a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/",exact:""}},[t._v("首頁")])],1),t._v(" "),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/page"}},[t._v("單元作業")])],1),t._v(" "),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/aqi"}},[t._v("空氣品質指標")])],1),t._v(" "),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/product"}},[t._v("產品頁")])],1)])]),t._v(" "),a("router-view",{staticClass:"my-3"})],1)])},staticRenderFns:[]};var i=a("VU/8")({name:"App",components:{}},n,!1,function(t){a("ea+M")},null,null).exports,r=a("/ocq"),c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hello"},this._l(this.data,function(t,a){return e("div",{key:a},[e("img",{attrs:{src:t,alt:""}})])}),0)},staticRenderFns:[]};var o=a("VU/8")({name:"HelloWorld",data:function(){return{data:[]}},created:function(){var t=this;this.axios.get("https://api.unsplash.com/search/photos?query=cats&client_id=L39YcRzMRt9ZweiuAsM7Pjq_jiY-N_PE5KMvlnV1sS0").then(function(e){t.data.push(e.data.results[5].urls.regular)})}},c,!1,function(t){a("qfDg")},null,null).exports,l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"navs"},[e("nav",{staticClass:"navbar navbar-expand-lg navbar-light"},[e("ul",{staticClass:"navbar-nav"},[e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/page",exact:""}},[this._v("TodoList")])],1),this._v(" "),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/page/sort"}},[this._v("表格排序")])],1)])])])},staticRenderFns:[]},u={name:"page",components:{Navs:a("VU/8")({name:"navs",data:function(){return{}}},l,!1,null,null,null).exports},data:function(){return{}}},d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page"},[e("Navs"),this._v(" "),e("router-view")],1)},staticRenderFns:[]},v=a("VU/8")(u,d,!1,null,null,null).exports,p={name:"TodoList",data:function(){return{newTodo:"",todos:[{title:"Default",id:0,completed:!1}],status:"all",cacheTodo:[],cacheTitle:""}},methods:{addTodo:function(){var t=this.newTodo.trim(),e=Math.floor(Date.now());t&&(this.todos.push({title:t,id:e,completed:!1}),this.newTodo="")},removeTodo:function(t){var e=this.todos.findIndex(function(e){return t.id==e.id});this.todos.splice(e,1)},cleanTodo:function(){this.todos=[]},editTodo:function(t){this.cacheTodo=t,this.cacheTitle=t.title},doneEdit:function(t){t.title=this.cacheTitle,this.cacheTodo=[],this.cacheTitle=""},cancelEdit:function(){this.cacheTodo=[]}},computed:{activeTodo:function(){return this.todos.filter(function(t){return!t.completed})},completedTodo:function(){return this.todos.filter(function(t){return t.completed})},filterTodo:function(){switch(this.status){case"all":return this.todos;case"active":return this.activeTodo;case"completed":return this.completedTodo}}}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"todo"}},[a("div",{staticClass:"input-group"},[t._m(0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newTodo,expression:"newTodo"}],staticClass:"form-control",attrs:{type:"text",placeholder:"準備要做的任務"},domProps:{value:t.newTodo},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e)},input:function(e){e.target.composing||(t.newTodo=e.target.value)}}}),t._v(" "),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-primary",on:{click:t.addTodo}},[t._v("新增")])])]),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("ul",{staticClass:"nav nav-tabs card-header-tabs"},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"all"==t.status},attrs:{href:""},on:{click:function(e){e.preventDefault(),t.status="all"}}},[t._v("全部")])]),t._v(" "),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"active"==t.status},attrs:{href:""},on:{click:function(e){e.preventDefault(),t.status="active"}}},[t._v("進行中")])]),t._v(" "),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"completed"==t.status},attrs:{href:""},on:{click:function(e){e.preventDefault(),t.status="completed"}}},[t._v("已完成")])])])]),t._v(" "),a("ul",{staticClass:"list-group list-group-flush"},t._l(t.filterTodo,function(e){return a("li",{key:e.id,staticClass:"list-group-item",on:{dblclick:function(a){return t.editTodo(e)}}},[t.cacheTodo.id!==e.id?a("div",{staticClass:"d-flex"},[a("div",{staticClass:"form-check"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.completed,expression:"item.completed"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:e.id},domProps:{checked:Array.isArray(e.completed)?t._i(e.completed,null)>-1:e.completed},on:{change:function(a){var s=e.completed,n=a.target,i=!!n.checked;if(Array.isArray(s)){var r=t._i(s,null);n.checked?r<0&&t.$set(e,"completed",s.concat([null])):r>-1&&t.$set(e,"completed",s.slice(0,r).concat(s.slice(r+1)))}else t.$set(e,"completed",i)}}}),t._v(" "),a("label",{staticClass:"form-check-label",class:{completed:e.completed},attrs:{for:e.id}},[t._v(t._s(e.title))])]),t._v(" "),a("button",{staticClass:"close ml-auto",on:{click:function(a){return t.removeTodo(e)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]):t._e(),t._v(" "),t.cacheTodo.id===e.id?a("input",{directives:[{name:"model",rawName:"v-model",value:t.cacheTitle,expression:"cacheTitle"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.cacheTitle},on:{keyup:[function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.doneEdit(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.cancelEdit(e)}],input:function(e){e.target.composing||(t.cacheTitle=e.target.value)}}}):t._e()])}),0),t._v(" "),a("div",{staticClass:"card-footer d-flex justify-content-between"},[a("span",[t._v("還有 "+t._s(t.activeTodo.length)+" 筆任務未完成")]),t._v(" "),a("a",{attrs:{href:"#"},on:{click:t.cleanTodo}},[t._v("清除所有任務")])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[this._v("待辦事項")])])}]};var m=a("VU/8")(p,f,!1,function(t){a("iRE7")},null,null).exports,h={name:"TableSort",data:function(){return{sortItem:"",isReverse:!0,data:[{name:"巧呼呼蘇打水",price:30,expiryDate:90},{name:"心驚膽跳羊肉飯",price:65,expiryDate:2},{name:"郭師傅武功麵包",price:32,expiryDate:1},{name:"不太會過期的新鮮牛奶",price:75,expiryDate:600},{name:"金殺 巧粒粒",price:120,expiryDate:200}]}},methods:{dateTime:function(t){return t.getFullYear()+"."+((t.getMonth()+1<10?"0":"")+(t.getMonth()+1))+"."+((t.getDate()<10?"0":"")+t.getDate())},addDays:function(t){var e=864e5*t,a=Date.now(),s=new Date(a+e);return this.dateTime(s)}},computed:{sortData:function(){var t=this;return t.data.sort(function(e,a){return t.isReverse?e[t.sortItem]-a[t.sortItem]:a[t.sortItem]-e[t.sortItem]})}}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sort"},[a("table",{staticClass:"table"},[a("thead",{staticClass:"thead-light"},[a("tr",[a("th",[t._v("品名")]),t._v(" "),a("th",{staticClass:"click",on:{click:function(e){t.sortItem="price",t.isReverse=!t.isReverse}}},[t._v("價格\n            "),"price"==t.sortItem?a("span",{staticClass:"icon",class:{inverse:!t.isReverse}},[a("i",{staticClass:"fas fa-angle-up"})]):t._e()]),t._v(" "),a("th",{staticClass:"click",on:{click:function(e){t.sortItem="expiryDate",t.isReverse=!t.isReverse}}},[t._v("到期天數\n            "),"expiryDate"==t.sortItem?a("span",{staticClass:"icon",class:{inverse:!t.isReverse}},[a("i",{staticClass:"fas fa-angle-up"})]):t._e()]),t._v(" "),a("th",[t._v("到期日")])]),t._v(" "),t._l(t.sortData,function(e,s){return a("tr",{key:s},[a("td",[t._v(t._s(e.name))]),t._v(" "),a("td",[t._v(t._s(e.price))]),t._v(" "),a("td",[t._v(t._s(e.expiryDate))]),t._v(" "),a("td",[t._v(t._s(t.addDays(e.expiryDate)))])])})],2)])])},staticRenderFns:[]};var C=a("VU/8")(h,_,!1,function(t){a("VS+T")},null,null).exports,y=a("mvHQ"),g=a.n(y),k=a("Gu7T"),T=a.n(k),x={name:"aqi",components:{},data:function(){return{data:[],location:[],filter:"",stared:JSON.parse(localStorage.getItem("citys"))||[]}},created:function(){var t=this;this.axios.get("https://script.google.com/macros/s/AKfycbzl6KKgb4v2-F3SCVxVaXjnMwM_XQvnk2A08nw7NjmGfuRVmak0/exec?url=http://opendata2.epa.gov.tw/AQI.json").then(function(e){var a;(a=t.data).push.apply(a,T()(e.data))})},methods:{addStared:function(){this.$emit("starevent",this.data.SiteName)},toggleStared:function(t){var e=this.stared.findIndex(function(e){if(e==t)return e});-1==e?this.stared.push(t):this.stared.splice(e,1),localStorage.setItem("citys",g()(this.stared))},statusClass:function(t){switch(t.Status){case"良好":default:return"";case"普通":return"status-aqi2";case"對敏感族群不健康":return"status-aqi3";case"對所有族群不健康":return"status-aqi4";case"非常不健康":return"status-aqi5";case"危害":return"status-aqi6"}}},computed:{filterCounty:function(){var t=this;return t.data.forEach(function(e){t.location.push(e.County)}),t.location.filter(function(t,e,a){if(a.indexOf(t)===e)return t})},staredData:function(){var t=this;return t.data.filter(function(e,a){return t.stared.includes(e.SiteName)})},filterData:function(){var t=this,e=t.data.filter(function(e,a){if(!t.stared.includes(e.SiteName))return e});return""!==t.filter?e.filter(function(e){if(t.filter==e.County)return e}):e}}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"aqi"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.filter,expression:"filter"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.filter=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:""}},[t._v(" --- 請選擇城市 ---")]),t._v(" "),t._l(t.filterCounty,function(e,s){return a("option",{key:s,domProps:{value:e}},[t._v("\n        "+t._s(e)+"\n      ")])})],2),t._v(" "),a("div",{staticClass:"alert alert-secondary my-3"},[t._v("關注城市")]),t._v(" "),a("div",{staticClass:"card-columns"},t._l(t.staredData,function(e,s){return a("div",{key:s,staticClass:"card",class:t.statusClass(e)},[a("div",{staticClass:"card-header"},[t._v("\n        "+t._s(e.County)+" - "+t._s(e.SiteName)+"\n        "),a("a",{staticClass:"float-right",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.toggleStared(e.SiteName)}}},[a("i",{staticClass:"fas fa-star"})])]),t._v(" "),a("div",{staticClass:"card-body"},[a("ul",{staticClass:"list-unstyled"},[a("li",[t._v("AQI 指數: "+t._s(e.AQI))]),t._v(" "),a("li",[t._v("PM2.5: "+t._s(e["PM2.5"]))]),t._v(" "),a("li",[t._v("說明: "+t._s(e.Status))])]),t._v("\n        "+t._s(e.PublishTime)+"\n      ")])])}),0),t._v(" "),a("hr"),t._v(" "),a("div",{staticClass:"card-columns my-4"},t._l(t.filterData,function(e,s){return a("div",{key:s,staticClass:"card",class:t.statusClass(e)},[a("div",{staticClass:"card-header"},[t._v("\n        "+t._s(e.County)+" - "+t._s(e.SiteName)+"\n        "),a("a",{staticClass:"float-right",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.toggleStared(e.SiteName)}}},[a("i",{staticClass:"far fa-star"})])]),t._v(" "),a("div",{staticClass:"card-body"},[a("ul",{staticClass:"list-unstyled"},[a("li",[t._v("AQI 指數: "+t._s(e.AQI))]),t._v(" "),a("li",[t._v("PM2.5: "+t._s(e["PM2.5"]))]),t._v(" "),a("li",[t._v("說明: "+t._s(e.Status))])]),t._v("\n        "+t._s(e.PublishTime)+"\n      ")])])}),0)])},staticRenderFns:[]};var D=a("VU/8")(x,b,!1,function(t){a("1K8f")},null,null).exports,w={name:"product",data:function(){return{data:[]}},created:function(){var t=this;this.axios.get("https://vue-course-api.hexschool.io/api/erica/products/").then(function(e){var a;(a=t.data).push.apply(a,T()(e.data.products))})}},R={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"product"},t._l(t.data,function(e){return a("div",{key:e.id},[a("div",{staticClass:"alert alert-info"},[a("h5",[t._v("標題："+t._s(e.title))]),t._v(" "),a("p",[t._v("ID："+t._s(e.id))])])])}),0)},staticRenderFns:[]},S=a("VU/8")(w,R,!1,null,null,null).exports;s.a.use(r.a);var E=new r.a({linkActiveClass:"active",routes:[{name:"首頁",path:"/",component:o},{path:"/page",component:v,children:[{name:"待辦事項",path:"",component:m},{name:"表格排序",path:"sort",component:C}]},{name:"空氣品質監控",path:"/aqi",component:D},{name:"產品頁",path:"/product",component:S}]}),I=a("mtWM"),N=a.n(I),A=a("Rf8U"),M=a.n(A),q=a("1e6/"),V=a("C/JF"),P=a("fhbW"),$=a("Yu89");V.d.add(P.a,P.b,$.a),s.a.component("font-awesome-icon",q.a),V.b.watch(),s.a.use(M.a,N.a),s.a.config.productionTip=!1,new s.a({el:"#app",components:{App:i},template:"<App/>",router:E})},"VS+T":function(t,e){},"ea+M":function(t,e){},iRE7:function(t,e){},qfDg:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.17bcec133c624ca3f78a.js.map
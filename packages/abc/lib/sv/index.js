!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("vue"),require("@blazes/utils"),require("@blazes/theme"));else if("function"==typeof define&&define.amd)define([,"@blazes/utils","@blazes/theme"],t);else{var o="object"==typeof exports?t(require("vue"),require("@blazes/utils"),require("@blazes/theme")):t(e.Vue,e["@blazes/utils"],e["@blazes/theme"]);for(var r in o)("object"==typeof exports?exports:e)[r]=o[r]}}(window,(function(e,t,o){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=30)}({0:function(t,o){t.exports=e},1:function(e,o){e.exports=t},16:function(e,t,o){},25:function(e,t,o){"use strict";o(16)},3:function(e,t){e.exports=o},30:function(e,t,o){"use strict";o.r(t);var r=o(0);const n=Object(r.withScopeId)("data-v-601ef8f4");Object(r.pushScopeId)("data-v-601ef8f4");const c={class:"label"},l={class:"detail"};Object(r.popScopeId)();const s=n((e,t,o,s,a,u)=>{const i=Object(r.resolveComponent)("a-col"),f=Object(r.resolveComponent)("a-row");return Object(r.openBlock)(),Object(r.createBlock)(f,{gutter:e.sv.gutter},{default:n(()=>[(Object(r.openBlock)(!0),Object(r.createBlock)(r.Fragment,null,Object(r.renderList)(e.sv.options,t=>(Object(r.openBlock)(),Object(r.createBlock)(i,{key:t.label,class:["item",t.classes]},{default:n(()=>[Object(r.createVNode)("div",c,Object(r.toDisplayString)(t.label),1),Object(r.createVNode)("div",l,[t.renderValue?Object(r.renderSlot)(e.$slots,t.renderValue,{key:0,value:t.value},void 0,!0):(Object(r.openBlock)(),Object(r.createBlock)(r.Fragment,{key:1},[Object(r.createTextVNode)(Object(r.toDisplayString)(t.value),1)],2112))])]),_:2},1032,["class"]))),128))]),_:1},8,["gutter"])});var a=o(1);class u{constructor(e,t,o=""){this.col=0;const{label:r,value:n,renderValue:c}=e;this.label="string"==typeof r?r:r(t),this.renderValue=c;const l="string"==typeof n?Object(a.deepGet)(t,n):n?n(t):null;this.value=null==l?o:l}}class i{constructor(e,t){const{defaultVal:o,options:r,gutter:n,labelWidth:c,col:l}=e;this.defaultVal=o||"-",this.gutter=n||32,this.labelWidth=c?c+"px":"",this.col=l||3,this.options=r.map(e=>{const o=new u(e,t,this.defaultVal);return o.col=e.col||this.col,o})}}var f=o(3),p=Object(r.defineComponent)({name:"sv",props:{isv:Object,data:Object},setup(e){const t=Object(r.ref)({});return Object(r.watch)(e,({isv:e,data:o})=>{const r=new i(e,o);r.options=r.options.map(e=>(e.classes=f.responseService.genClass(e.col),e)),t.value=r},{immediate:!0}),{sv:t}}});o(25);p.render=s,p.__scopeId="data-v-601ef8f4";var b=p;b.install=e=>{e.component(b.name,b)};const d=b;t.default=d}})}));
//# sourceMappingURL=index.js.map
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("vue"),require("@blazes/utils"),require("@blazes/theme"),require("vue-router"));else if("function"==typeof define&&define.amd)define([,"@blazes/utils","@blazes/theme","vue-router"],t);else{var o="object"==typeof exports?t(require("vue"),require("@blazes/utils"),require("@blazes/theme"),require("vue-router")):t(e.Vue,e["@blazes/utils"],e["@blazes/theme"],e["vue-router"]);for(var r in o)("object"==typeof exports?exports:e)[r]=o[r]}}(window,(function(e,t,o,r){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var c=t[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,o),c.l=!0,c.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)o.d(r,c,function(t){return e[t]}.bind(null,c));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=33)}({0:function(t,o){t.exports=e},1:function(e,o){e.exports=t},12:function(e,t,o){},21:function(e,t,o){"use strict";o(12)},3:function(e,t){e.exports=o},33:function(e,t,o){"use strict";o.r(t);var r=o(0);const c=Object(r.withScopeId)("data-v-36f8c908");Object(r.pushScopeId)("data-v-36f8c908");const n={class:"page-header"},l={class:"breadcrumb"},a={class:"detail fx"},i={key:0,class:"logo"},s={class:"main"},u={class:"row"},d={class:"title"},b={key:0,class:"action"},p={class:"row"},j={key:0,class:"desc"},O={key:1,class:"extra"};Object(r.popScopeId)();const f=c((e,t,o,f,v,m)=>{const k=Object(r.resolveComponent)("router-link"),y=Object(r.resolveComponent)("a-breadcrumb-item"),x=Object(r.resolveComponent)("a-breadcrumb");return Object(r.openBlock)(),Object(r.createBlock)("div",n,[Object(r.createVNode)("div",l,[e.$slots.breadcrumb?Object(r.renderSlot)(e.$slots,"breadcrumb",{key:0},void 0,!0):(Object(r.openBlock)(),Object(r.createBlock)(x,{key:1,separator:"/"},{default:c(()=>[(Object(r.openBlock)(!0),Object(r.createBlock)(r.Fragment,null,Object(r.renderList)(e.paths,e=>(Object(r.openBlock)(),Object(r.createBlock)(y,{key:e.text},{default:c(()=>[e.link?(Object(r.openBlock)(),Object(r.createBlock)(k,{key:0,to:e.link},{default:c(()=>[Object(r.createTextVNode)(Object(r.toDisplayString)(e.text),1)]),_:2},1032,["to"])):(Object(r.openBlock)(),Object(r.createBlock)(r.Fragment,{key:1},[Object(r.createTextVNode)(Object(r.toDisplayString)(e.text),1)],2112))]),_:2},1024))),128))]),_:1}))]),Object(r.createVNode)("div",a,[e.$slots.logo?(Object(r.openBlock)(),Object(r.createBlock)("div",i,[Object(r.renderSlot)(e.$slots,"logo",{},void 0,!0)])):Object(r.createCommentVNode)("v-if",!0),Object(r.createVNode)("div",s,[Object(r.createVNode)("div",u,[Object(r.createVNode)("h1",d,[e.$slots.title?Object(r.renderSlot)(e.$slots,"title",{key:0,title:e.title$},void 0,!0):(Object(r.openBlock)(),Object(r.createBlock)(r.Fragment,{key:1},[Object(r.createTextVNode)(Object(r.toDisplayString)(e.title$),1)],2112))]),e.$slots.action?(Object(r.openBlock)(),Object(r.createBlock)("div",b,[Object(r.renderSlot)(e.$slots,"action",{},void 0,!0)])):Object(r.createCommentVNode)("v-if",!0)]),Object(r.createVNode)("div",p,[e.$slots.default?(Object(r.openBlock)(),Object(r.createBlock)("div",j,[Object(r.renderSlot)(e.$slots,"default",{},void 0,!0)])):Object(r.createCommentVNode)("v-if",!0),e.$slots.extra?(Object(r.openBlock)(),Object(r.createBlock)("div",O,[Object(r.renderSlot)(e.$slots,"extra",{},void 0,!0)])):Object(r.createCommentVNode)("v-if",!0)])])]),Object(r.renderSlot)(e.$slots,"tab",{},void 0,!0)])});var v=o(4),m=o(1),k=o(3),y=Object(r.defineComponent)({name:"page-header",props:{title:String},setup(e){var t;const o=Object(v.useRoute)(),c=m.ArrayService.getLast(o.matched),n=c?k.menuService.getPathByUrl(null==c?void 0:c.path):[];c&&(null===(t=m.ArrayService.getLast(n))||void 0===t?void 0:t.link)!==c.path&&n.push({text:c.name,link:c.path});const l=Object(r.computed)(()=>{var t;return e.title||(null===(t=m.ArrayService.getLast(n))||void 0===t?void 0:t.text)});return{paths:n,title$:l}}});o(21);y.render=f,y.__scopeId="data-v-36f8c908";var x=y;x.install=e=>{e.component(x.name,x)};const B=x;t.default=B},4:function(e,t){e.exports=r}})}));
//# sourceMappingURL=index.js.map
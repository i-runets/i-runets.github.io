!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([,,,,,,,,function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){(function(n){var o,r;/*! smooth-scroll v14.2.0 | (c) 2018 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */r=void 0!==n?n:"undefined"!=typeof window?window:this,void 0===(o=function(){return function(e){"use strict";var t={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},n=function(){for(var e={},t=0;t<arguments.length;t++)!function(t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}(arguments[t]);return e},o=function(t){return parseInt(e.getComputedStyle(t).height,10)},r=function(e){var t;try{t=decodeURIComponent(e)}catch(n){t=e}return t},i=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,r=-1,i="",s=n.charCodeAt(0);++r<o;){if(0===(t=n.charCodeAt(r)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");i+=t>=1&&t<=31||127==t||0===r&&t>=48&&t<=57||1===r&&t>=48&&t<=57&&45===s?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(r):"\\"+n.charAt(r)}var a;try{a=decodeURIComponent("#"+i)}catch(e){a="#"+i}return a},s=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},a=function(e){return e?o(e)+e.offsetTop:0},c=function(t,n,o,r){if(n.emitEvents&&"function"==typeof e.CustomEvent){var i=new CustomEvent(t,{bubbles:!0,detail:{anchor:o,toggle:r}});document.dispatchEvent(i)}};return function(o,l){var u,f,d,h,m,p,v={cancelScroll:function(e){cancelAnimationFrame(p),p=null,e||c("scrollCancel",u)},animateScroll:function(o,r,i){var l=n(u||t,i||{}),f="[object Number]"===Object.prototype.toString.call(o),m=f||!o.tagName?null:o;if(f||m){var g=e.pageYOffset;l.header&&!d&&(d=document.querySelector(l.header)),h||(h=a(d));var y,b,S,w=f?o:function(t,n,o,r){var i=0;if(t.offsetParent)do{i+=t.offsetTop,t=t.offsetParent}while(t);return i=Math.max(i-n-o,0),r&&(i=Math.min(i,s()-e.innerHeight)),i}(m,h,parseInt("function"==typeof l.offset?l.offset(o,r):l.offset,10),l.clip),E=w-g,I=s(),O=0,L=function(t,n){var i=e.pageYOffset;if(t==n||i==n||(g<n&&e.innerHeight+i)>=I)return v.cancelScroll(!0),function(t,n,o){0===t&&document.body.focus(),o||(t.focus(),document.activeElement!==t&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))}(o,n,f),c("scrollStop",l,o,r),y=null,p=null,!0},C=function(t){y||(y=t),b=(O+=t-y)/parseInt(l.speed,10),S=g+E*function(e,t){var n;return"easeInQuad"===e.easing&&(n=t*t),"easeOutQuad"===e.easing&&(n=t*(2-t)),"easeInOutQuad"===e.easing&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===e.easing&&(n=t*t*t),"easeOutCubic"===e.easing&&(n=--t*t*t+1),"easeInOutCubic"===e.easing&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e.easing&&(n=t*t*t*t),"easeOutQuart"===e.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===e.easing&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e.easing&&(n=t*t*t*t*t),"easeOutQuint"===e.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e.easing&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),e.customEasing&&(n=e.customEasing(t)),n||t}(l,b=b>1?1:b),e.scrollTo(0,Math.floor(S)),L(S,w)||(p=e.requestAnimationFrame(C),y=t)};0===e.pageYOffset&&e.scrollTo(0,0),function(e,t,n){t||history.pushState&&n.updateURL&&history.pushState({smoothScroll:JSON.stringify(n),anchor:e.id},document.title,e===document.documentElement?"#top":"#"+e.id)}(o,f,l),c("scrollStart",l,o,r),v.cancelScroll(!0),e.requestAnimationFrame(C)}}},g=function(t){if(!("matchMedia"in e&&e.matchMedia("(prefers-reduced-motion)").matches)&&0===t.button&&!t.metaKey&&!t.ctrlKey&&"closest"in t.target&&(f=t.target.closest(o))&&"a"===f.tagName.toLowerCase()&&!t.target.closest(u.ignore)&&f.hostname===e.location.hostname&&f.pathname===e.location.pathname&&/#/.test(f.href)){var n=i(r(f.hash)),s=u.topOnEmptyHash&&"#"===n?document.documentElement:document.querySelector(n);(s=s||"#top"!==n?s:document.documentElement)&&(t.preventDefault(),v.animateScroll(s,f))}},y=function(e){if(history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(u)&&history.state.anchor){var t=document.querySelector(i(r(history.state.anchor)));t&&v.animateScroll(t,null,{updateURL:!1})}},b=function(e){m||(m=setTimeout(function(){m=null,h=a(d)},66))};return v.destroy=function(){u&&(document.removeEventListener("click",g,!1),e.removeEventListener("resize",b,!1),e.removeEventListener("popstate",y,!1),v.cancelScroll(),u=null,f=null,d=null,h=null,m=null,p=null)},v.init=function(o){if(!("querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";v.destroy(),u=n(t,o||{}),d=u.header?document.querySelector(u.header):null,h=a(d),document.addEventListener("click",g,!1),d&&e.addEventListener("resize",b,!1),u.updateURL&&u.popstate&&e.addEventListener("popstate",y,!1)},v.init(l),v}}(r)}.apply(t,[]))||(e.exports=o)}).call(this,n(8))},function(e,t,n){
/*! MenuSpy v1.3.0 (Jan 31 2018) - http://leocs.me/menuspy/ - Copyright (c) 2018 Leonardo Santos; MIT License */
e.exports=function(){"use strict";var e={extend:function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},offset:function(e){var t=e.getBoundingClientRect();return{top:t.top+window.pageYOffset,left:t.left+window.pageXOffset}},scrollTop:function(){return window.pageYOffset||document.documentElement.scrollTop},addClass:function(e,t){if(e.classList)e.classList.add(t);else{var n=e.className.split(" "),o=n.indexOf(t);-1===o&&n.push(t),e.className=n.join(" ")}},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")},debounce:function(e,t){var n=null;return function(){var o=arguments,r=this;n||(n=setTimeout(function(){return n=0,e.apply(r,o)},t))}}},t=function(t,n){var o=this;t&&(this.element="string"==typeof t?document.querySelector(t):t,this.options=e.extend({menuItemSelector:'a[href^="#"]',activeClass:"active",threshold:15,enableLocationHash:!0,hashTimeout:600,callback:null},n),this.assignValues(),this.debouncedAssignValuesFn=e.debounce(function(){return o.assignValues()}),window.addEventListener("resize",this.debouncedAssignValuesFn),this.debouncedHashFn=e.debounce(function(){var t=o.lastInViewElm?"#"+o.lastInViewElm.id:"#";if(history.replaceState)history.replaceState(null,null,t);else{var n=e.scrollTop();window.location.hash=t,window.scrollTo(0,n)}},this.options.hashTimeout),this.cacheItems(),this.scrollFn())};return t.prototype.assignValues=function(){this.currScrollTop=0,this.lastInViewElm=null,this.menuHeight=this.element.offsetHeight+this.options.threshold,this.menuItems=[].slice.call(this.element.querySelectorAll(this.options.menuItemSelector)),this.raf=null},t.prototype.cacheItems=function(){this.scrollItems=this.menuItems.map(function(t){var n=t.dataset.target?document.querySelector(t.dataset.target):document.getElementById(t.hash.slice(1));return!!n&&{elm:t,target:n,offset:Math.floor(e.offset(n).top)}}),this.scrollItems=this.scrollItems.filter(Boolean).sort(function(e,t){return e.offset-t.offset})},t.prototype.tick=function(){var e=this.currScrollTop+this.menuHeight,t=this.scrollItems.filter(function(t){return t.offset<e});this.activateItem(t.pop())},t.prototype.activateItem=function(t){var n=this,o=this.options,r=o.activeClass,i=o.callback;if(!t)return this.scrollItems.forEach(function(t){return e.removeClass(t.elm.parentNode,r)}),this.lastInViewElm=null,void(this.options.enableLocationHash&&this.debouncedHashFn());this.lastInViewElm!==t.target&&(this.lastInViewElm=t.target,this.scrollItems.forEach(function(o){e.removeClass(o.elm.parentNode,r),o.target===t.target&&(e.addClass(o.elm.parentNode,r),"function"==typeof i&&i.call(n,o),n.options.enableLocationHash&&n.debouncedHashFn())}))},t.prototype.scrollFn=function(){var t=e.scrollTop();this.currScrollTop!==t&&(this.currScrollTop=t,this.tick()),this.raf=window.requestAnimationFrame(this.scrollFn.bind(this))},t.prototype.destroy=function(){this.raf&&window.cancelAnimationFrame(this.raf),window.removeEventListener("resize",this.debouncedAssignValuesFn)},t}()},function(e,t,n){"use strict";var o=n(10),r=n(9),i=1,s=function(e){var t,n=document.querySelectorAll(".screenshots-item");for(e>n.length&&(i=1),e<1&&(i=n.length),t=0;t<n.length;t++)n[t].style.display="none";n[i-1].style.display="block"},a=function(e){s(i+=e)};s(i);var c=document.querySelector(".next"),l=document.querySelector(".prev");c.addEventListener("click",function(e){e.preventDefault(),a(1)}),l.addEventListener("click",function(e){e.preventDefault(),a(-1)});new o(document.querySelector(".header")),new r('a[href*="#"]')}]);
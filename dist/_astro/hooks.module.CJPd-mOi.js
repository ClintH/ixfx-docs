var o;o={__e:function(_,n){for(var r,t,e;n=n.__;)if((r=n.__c)&&!r.__)try{if((t=r.constructor)&&t.getDerivedStateFromError!=null&&(r.setState(t.getDerivedStateFromError(_)),e=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(_),e=r.__d),e)return r.__E=r}catch(i){_=i}throw _}},typeof Promise=="function"&&Promise.prototype.then.bind(Promise.resolve());var a,c,v,f=0,E=[],s=o.__b,l=o.__r,H=o.diffed,d=o.__c,p=o.unmount;function m(_,n){o.__h&&o.__h(c,_,f||n),f=0;var r=c.__H||(c.__H={__:[],__h:[]});return _>=r.__.length&&r.__.push({}),r.__[_]}function D(_){return f=1,A(F,_)}function A(_,n,r){var t=m(a++,2);return t.t=_,t.__c||(t.__=[F(void 0,n),function(e){var i=t.t(t.__[0],e);t.__[0]!==i&&(t.__=[i,t.__[1]],t.__c.setState({}))}],t.__c=c),t.__}function P(_,n){var r=m(a++,3);!o.__s&&g(r.__H,n)&&(r.__=_,r.__H=n,c.__H.__h.push(r))}function S(_){return f=5,b(function(){return{current:_}},[])}function b(_,n){var r=m(a++,7);return g(r.__H,n)&&(r.__=_(),r.__H=n,r.__h=_),r.__}function q(){for(var _;_=E.shift();)if(_.__P)try{_.__H.__h.forEach(u),_.__H.__h.forEach(h),_.__H.__h=[]}catch(n){_.__H.__h=[],o.__e(n,_.__v)}}o.__b=function(_){c=null,s&&s(_)},o.__r=function(_){l&&l(_),a=0;var n=(c=_.__c).__H;n&&(n.__h.forEach(u),n.__h.forEach(h),n.__h=[])},o.diffed=function(_){H&&H(_);var n=_.__c;n&&n.__H&&n.__H.__h.length&&(E.push(n)!==1&&v===o.requestAnimationFrame||((v=o.requestAnimationFrame)||function(r){var t,e=function(){clearTimeout(i),y&&cancelAnimationFrame(t),setTimeout(r)},i=setTimeout(e,100);y&&(t=requestAnimationFrame(e))})(q)),c=null},o.__c=function(_,n){n.some(function(r){try{r.__h.forEach(u),r.__h=r.__h.filter(function(t){return!t.__||h(t)})}catch(t){n.some(function(e){e.__h&&(e.__h=[])}),n=[],o.__e(t,r.__v)}}),d&&d(_,n)},o.unmount=function(_){p&&p(_);var n,r=_.__c;r&&r.__H&&(r.__H.__.forEach(function(t){try{u(t)}catch(e){n=e}}),n&&o.__e(n,r.__v))};var y=typeof requestAnimationFrame=="function";function u(_){var n=c,r=_.__c;typeof r=="function"&&(_.__c=void 0,r()),c=n}function h(_){var n=c;_.__c=_.__(),c=n}function g(_,n){return!_||_.length!==n.length||n.some(function(r,t){return r!==_[t]})}function F(_,n){return typeof n=="function"?n(_):n}export{D as l,S as s,P as y};
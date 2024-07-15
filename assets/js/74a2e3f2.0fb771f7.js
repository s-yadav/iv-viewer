"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[839],{202:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>s,metadata:()=>u,toc:()=>d});var t=i(4848),r=i(8453),a=i(1470),o=i(9365);const s={sidebar_position:1,title:"Introduction",description:"iv-viewer is a zooming and panning plugin inspired by Google Photos for your web images. It provides a smooth and intuitive way to view images with features like full-screen mode, touch device support, and high-resolution image loading."},l="Getting Started",u={id:"iv-viewer/intro-iv",title:"Introduction",description:"iv-viewer is a zooming and panning plugin inspired by Google Photos for your web images. It provides a smooth and intuitive way to view images with features like full-screen mode, touch device support, and high-resolution image loading.",source:"@site/docs/iv-viewer/intro-iv.md",sourceDirName:"iv-viewer",slug:"/iv-viewer/intro-iv",permalink:"/iv-viewer/docs/iv-viewer/intro-iv",draft:!1,unlisted:!1,editUrl:"https://github.com/s-yadav/iv-viewer/edit/master/documentation/docs/iv-viewer/intro-iv.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Introduction",description:"iv-viewer is a zooming and panning plugin inspired by Google Photos for your web images. It provides a smooth and intuitive way to view images with features like full-screen mode, touch device support, and high-resolution image loading."},sidebar:"tutorialSidebar",previous:{title:"iv-viewer",permalink:"/iv-viewer/docs/category/iv-viewer"},next:{title:"API",permalink:"/iv-viewer/docs/iv-viewer/api"}},c={},d=[{value:"Features",id:"features",level:3},{value:"Install",id:"install",level:3},{value:"Usage",id:"usage",level:2},{value:"ES6",id:"es6",level:3}];function v(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"getting-started",children:"Getting Started"}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"iv-viewer"})," is a zooming and panning plugin inspired by Google Photos for your web images. It provides a smooth and intuitive way to view images with features like full-screen mode, touch device support, and high-resolution image loading."]}),"\n",(0,t.jsx)(n.h3,{id:"features",children:"Features"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Smooth dragging and panning of images"}),"\n",(0,t.jsx)(n.li,{children:"Support for touch devices"}),"\n",(0,t.jsx)(n.li,{children:"Double tap to zoom in/zoom out"}),"\n",(0,t.jsx)(n.li,{children:"Pinch in/out to control zoom"}),"\n",(0,t.jsx)(n.li,{children:"Snap view for better panning and zooming experience"}),"\n",(0,t.jsx)(n.li,{children:"Quick display of loaded images with progressive loading of high-quality images"}),"\n",(0,t.jsx)(n.li,{children:"Exposed API to control zoom programmatically"}),"\n",(0,t.jsx)(n.li,{children:"Custom events to listen for state changes"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"install",children:"Install"}),"\n",(0,t.jsxs)(a.A,{defaultValue:"npm",values:[{label:"npm",value:"npm"},{label:"yarn",value:"yarn"}],children:[(0,t.jsx)(o.A,{value:"npm",children:(0,t.jsx)("div",{children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm install iv-viewer --save\n"})})})}),(0,t.jsx)(o.A,{value:"yarn",children:(0,t.jsx)("div",{children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"yarn add iv-viewer\n"})})})})]}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(n.h3,{id:"es6",children:"ES6"}),"\n",(0,t.jsx)(n.p,{children:"Image Viewer"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import ImageViewer from 'iv-viewer';\nimport 'iv-viewer/dist/iv-viewer.css';\n\nconst container = document.querySelector('#image-container');\nconst viewer = new ImageViewer(container, options);\n\nviewer.load('images/low-res-img', 'images/hi-res-img');\n"})}),"\n",(0,t.jsx)(n.p,{children:"Fullscreen Viewer"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import { FullScreenViewer } from 'iv-viewer';\nimport 'iv-viewer/dist/iv-viewer.css';\n\nconst viewer = new FullScreenViewer(options);\n\nviewer.show('images/low-res-img', 'images/hi-res-img');\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This Markdown provides a clear and concise introduction to ",(0,t.jsx)(n.code,{children:"iv-viewer"}),", its features, installation instructions, and usage examples for both normal and fullscreen viewers in an ES6 environment."]}),"\n",(0,t.jsxs)(n.p,{children:["Click ",(0,t.jsx)(n.a,{href:"/iv-viewer/docs/iv-viewer/api",children:"Options"})," to get the list of options."]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(v,{...e})}):v(e)}},9365:(e,n,i)=>{i.d(n,{A:()=>o});i(6540);var t=i(4164);const r={tabItem:"tabItem_Ymn6"};var a=i(4848);function o(e){let{children:n,hidden:i,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,t.A)(r.tabItem,o),hidden:i,children:n})}},1470:(e,n,i)=>{i.d(n,{A:()=>y});var t=i(6540),r=i(4164),a=i(3104),o=i(6347),s=i(205),l=i(7485),u=i(1682),c=i(679);function d(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function v(e){const{values:n,children:i}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:i,attributes:t,default:r}}=e;return{value:n,label:i,attributes:t,default:r}}))}(i);return function(e){const n=(0,u.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,i])}function h(e){let{value:n,tabValues:i}=e;return i.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:i}=e;const r=(0,o.W6)(),a=function(e){let{queryString:n=!1,groupId:i}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!i)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return i??null}({queryString:n,groupId:i});return[(0,l.aZ)(a),(0,t.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(r.location.search);n.set(a,e),r.replace({...r.location,search:n.toString()})}),[a,r])]}function m(e){const{defaultValue:n,queryString:i=!1,groupId:r}=e,a=v(e),[o,l]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:i}=e;if(0===i.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:i}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${i.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=i.find((e=>e.default))??i[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:a}))),[u,d]=p({queryString:i,groupId:r}),[m,g]=function(e){let{groupId:n}=e;const i=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,a]=(0,c.Dv)(i);return[r,(0,t.useCallback)((e=>{i&&a.set(e)}),[i,a])]}({groupId:r}),f=(()=>{const e=u??m;return h({value:e,tabValues:a})?e:null})();(0,s.A)((()=>{f&&l(f)}),[f]);return{selectedValue:o,selectValue:(0,t.useCallback)((e=>{if(!h({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),g(e)}),[d,g,a]),tabValues:a}}var g=i(2303);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var w=i(4848);function b(e){let{className:n,block:i,selectedValue:t,selectValue:o,tabValues:s}=e;const l=[],{blockElementScrollPositionUntilNextRender:u}=(0,a.a_)(),c=e=>{const n=e.currentTarget,i=l.indexOf(n),r=s[i].value;r!==t&&(u(n),o(r))},d=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const i=l.indexOf(e.currentTarget)+1;n=l[i]??l[0];break}case"ArrowLeft":{const i=l.indexOf(e.currentTarget)-1;n=l[i]??l[l.length-1];break}}n?.focus()};return(0,w.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":i},n),children:s.map((e=>{let{value:n,label:i,attributes:a}=e;return(0,w.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>l.push(e),onKeyDown:d,onClick:c,...a,className:(0,r.A)("tabs__item",f.tabItem,a?.className,{"tabs__item--active":t===n}),children:i??n},n)}))})}function x(e){let{lazy:n,children:i,selectedValue:r}=e;const a=(Array.isArray(i)?i:[i]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===r));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,w.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function j(e){const n=m(e);return(0,w.jsxs)("div",{className:(0,r.A)("tabs-container",f.tabList),children:[(0,w.jsx)(b,{...n,...e}),(0,w.jsx)(x,{...n,...e})]})}function y(e){const n=(0,g.A)();return(0,w.jsx)(j,{...e,children:d(e.children)},String(n))}},8453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>s});var t=i(6540);const r={},a=t.createContext(r);function o(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);
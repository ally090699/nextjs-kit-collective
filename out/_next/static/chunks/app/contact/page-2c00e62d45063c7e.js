(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[977],{7419:(e,t,s)=>{Promise.resolve().then(s.bind(s,3398))},8766:(e,t,s)=>{e.exports=s(7259)},7259:(e,t,s)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useRouter",{enumerable:!0,get:function(){return l}});let a=s(2115),r=s(3576);function l(){return(0,a.useContext)(r.RouterContext)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3576:(e,t,s)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return a}});let a=s(306)._(s(2115)).default.createContext(null)},3398:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var a=s(5155),r=s(2115),l=s(8766),n=s(5760);function c(){(0,l.useRouter)();let[e,t]=(0,r.useState)({name:"",phone:"",email:"",status:"",productID:"",message:""}),[s,c]=(0,r.useState)({name:!1,phone:!1,email:!1,productID:!1,message:!1}),[i,o]=(0,r.useState)({name:"",phone:"",email:"",productID:"",message:""}),d=e=>{let t=e.length>=4&&/^[A-Za-z]+(\s[A-Za-z]+)*$/.test(e);c(e=>({...e,name:!t})),o(e=>({...e,name:t?"":"Name must be at least 4 characters long and contain only letters and spaces."}))},m=e=>{let t=/^\d{3} \d{3} \d{4}$/.test(e);c(e=>({...e,phone:!t})),o(e=>({...e,phone:t?"":"Phone number must be in the format: 888 888 8888."}))},x=e=>{let t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);c(e=>({...e,email:!t})),o(e=>({...e,email:t?"":"Please enter a valid email address."}))},h=e=>{let t=["SS101","AA101","SS102","PS101"].includes(e);c(e=>({...e,productID:!t})),o(e=>({...e,productID:t?"":"Invalid product ID. Please enter a valid product ID."}))},u=e=>{let t=e.length>=10&&e.length<=300;c(e=>({...e,message:!t})),o(e=>({...e,message:t?"":"Message must be between 10 and 300 characters."}))},p=e=>{let{name:s,value:a}=e.target;t(e=>({...e,[s]:a})),"name"===s&&d(a),"phone"===s&&m(a),"email"===s&&x(a),"productID"===s&&h(a),"message"===s&&u(a)},g=e=>{e.persist(),t(t=>({...t,status:e.target.id}))},j=async s=>{s.preventDefault();let a={name:e.name.trim(),phone:e.phone.trim(),email:e.email.trim(),status:e.status||"General Inquiry",productID:e.productID.trim()||null,message:e.message.trim()};if(!a.name||!a.email||!a.message){o(e=>({...e,general:"Please fill in all required fields."}));return}try{let e=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!e.ok)throw Error("Server Error");let s=await e.json();console.log("Success:",s.message),t({name:"",phone:"",email:"",status:"",productID:"",message:""}),o(e=>({...e,general:"Form submitted successfully!"}))}catch(e){console.error("Error:",e),o(e=>({...e,general:"There was an issue submitting the form. Please try again."}))}};return(0,a.jsx)(n.default,{children:(0,a.jsx)("div",{className:"container bg-gray-100 mx-auto max-w-full px-6 py-8 flex justify-center",children:(0,a.jsxs)("section",{id:"contactsect",className:"container bg-gray-150 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",children:[(0,a.jsx)("h4",{id:"contact-title",className:"text-3xl text-gray-800 font-bold mb-6",children:"\uD83D\uDCDE Contact Us"}),(0,a.jsx)("form",{onSubmit:j,children:(0,a.jsxs)("div",{id:"contactform",className:"space-y-6",children:[i.general&&(0,a.jsx)("p",{className:"text-red-500",children:i.general}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{htmlFor:"name",className:"block text-gray-700",children:["Name ",(0,a.jsx)("span",{className:s.name?"text-red-500":"",children:"*"})]}),(0,a.jsx)("input",{type:"text",id:"inputname",name:"name",placeholder:"Jane Doe",value:e.name,onChange:p,onBlur:()=>d(e.name),className:"w-full p-3 border-2 text-gray-500 rounded-md ".concat(s.name?"border-red-500":"border-gray-300"),required:!0}),i.name&&(0,a.jsx)("p",{className:"text-sm text-red-500",children:i.name})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"phone",className:"block text-gray-700",children:"Phone Number"}),(0,a.jsx)("input",{type:"text",id:"inputphone",name:"phone",placeholder:"888 888 8888",value:e.phone,onChange:p,onBlur:()=>m(e.phone),className:"w-full p-3 border-2 text-gray-500 rounded-md ".concat(s.phone?"border-red-500":"border-gray-300")}),i.phone&&(0,a.jsx)("p",{className:"text-sm text-red-500",children:i.phone})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{htmlFor:"email",className:"block text-gray-700",children:["Email ",(0,a.jsx)("span",{className:s.email?"text-red-500":"",children:"*"})]}),(0,a.jsx)("input",{type:"email",id:"inputemail",name:"email",placeholder:"janedoe123@example.com",value:e.email,onChange:p,onBlur:()=>x(e.email),className:"w-full p-3 border-2 text-gray-500 rounded-md ".concat(s.email?"border-red-500":"border-gray-300"),required:!0}),i.email&&(0,a.jsx)("p",{className:"text-sm text-red-500",children:i.email})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h6",{className:"text-xl text-gray-800 font-semibold",children:"Reason for Message"}),["General Inquiry","Pricing","Product Info","Shipping","Other"].map(t=>{let s=t.toLowerCase().replace(/\s+/g,"");return(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsx)("input",{type:"radio",name:"status",id:s,onChange:g,checked:e.status===s,className:"h-5 w-5 text-gray-700"}),(0,a.jsx)("label",{htmlFor:s,className:"text-gray-500",children:t})]},s)})]}),"productinfo"===e.status&&(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"productnum",className:"block text-gray-700",children:"Product ID"}),(0,a.jsx)("input",{type:"text",id:"productnum",name:"productID",value:e.productID,onChange:p,onBlur:()=>h(e.productID),className:"w-full p-3 border-2 text-gray-500 rounded-md ".concat(s.productID?"border-red-500":"border-gray-300")}),i.productID&&(0,a.jsx)("p",{className:"text-sm text-red-500",children:i.productID})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{htmlFor:"msg",className:"block text-gray-700",children:["Message ",(0,a.jsx)("span",{className:s.message?"text-red-500":"",children:"*"})]}),(0,a.jsx)("textarea",{id:"inputMessage",name:"message",placeholder:"Enter message here ...",value:e.message,onChange:p,onBlur:()=>u(e.message),className:"w-full p-3 border-2 text-gray-500 rounded-md ".concat(s.message?"border-red-500":"border-gray-300"),required:!0}),i.message&&(0,a.jsx)("p",{className:"text-sm text-red-500",children:i.message})]}),(0,a.jsx)("div",{className:"mt-6",children:(0,a.jsx)("button",{type:"submit",className:"px-6 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none",children:"Send"})})]})})]})})})}},5760:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>m});var a=s(5155);s(347);var r=s(6793),l=s.n(r),n=s(8173),c=s.n(n),i=s(2115);function o(){let[e,t]=(0,i.useState)(!1);return(0,a.jsxs)("nav",{className:"bg-gray-900 shadow-md py-4 px-6",children:[(0,a.jsxs)("div",{className:"max-w-6xl mx-auto flex justify-between items-center",children:[(0,a.jsxs)(c(),{href:"/",className:"flex items-center space-x-3",children:[(0,a.jsx)("img",{src:"/images/banner.jpg",alt:"Kit Collective Logo",className:"w-10 h-10 object-cover rounded-xl"}),(0,a.jsx)("span",{className:"text-xl font-bold text-white hover:text-blue-200",children:"Kit Collective"})]}),(0,a.jsxs)("div",{className:"hidden md:flex space-x-6",children:[(0,a.jsx)(c(),{href:"/",className:"text-white hover:text-blue-200 transition",children:"Home"}),(0,a.jsx)(c(),{href:"/about",className:"text-white hover:text-blue-200 transition",children:"About"}),(0,a.jsx)(c(),{href:"/products",className:"text-white hover:text-blue-200 transition",children:"Products"}),(0,a.jsx)(c(),{href:"/contact",className:"text-white hover:text-blue-200 transition",children:"Contact"})]}),(0,a.jsx)("button",{className:"md:hidden text-gray-300",onClick:()=>t(!e),"aria-label":"Toggle menu",children:(0,a.jsx)("span",{className:"material-icons",children:e?"✕":"☰"})})]}),(0,a.jsxs)("div",{className:"md:hidden ".concat(e?"block":"hidden"," bg-gray-800 text-gray-200 py-4 mt-4"),children:[(0,a.jsx)(c(),{href:"/",className:"block text-center text-gray-200 hover:text-blue-200 py-2",children:"Home"}),(0,a.jsx)(c(),{href:"/about",className:"block text-center text-gray-200 hover:text-blue-200 py-2",children:"About"}),(0,a.jsx)(c(),{href:"/products",className:"block text-center text-gray-200 hover:text-blue-200 py-2",children:"Products"}),(0,a.jsx)(c(),{href:"/contact",className:"block text-center text-gray-200 hover:text-blue-200 py-2",children:"Contact"})]})]})}function d(){return(0,a.jsxs)("div",{className:"bg-gray-900 text-white py-8",children:[(0,a.jsxs)("div",{className:"max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6",children:[(0,a.jsx)("div",{className:"text-center md:text-left",children:(0,a.jsxs)("ul",{className:"space-y-2",children:[(0,a.jsx)("li",{children:(0,a.jsx)(c(),{href:"/",className:"hover:text-green-400 transition",children:"Home"})}),(0,a.jsx)("li",{children:(0,a.jsx)(c(),{href:"/about",className:"hover:text-green-400 transition",children:"About"})}),(0,a.jsx)("li",{children:(0,a.jsx)(c(),{href:"/products",className:"hover:text-green-400 transition",children:"Products"})}),(0,a.jsx)("li",{children:(0,a.jsx)(c(),{href:"/contact",className:"hover:text-green-400 transition",children:"Contact"})})]})}),(0,a.jsxs)("div",{className:"text-center md:text-right mt-6 md:mt-0",children:[(0,a.jsx)("p",{className:"font-semibold text-lg",children:"Kit Collective"}),(0,a.jsx)("p",{children:"Ontario, Canada"}),(0,a.jsx)("p",{children:"kitcollective@hotmail.com"}),(0,a.jsx)("a",{href:"https://www.linkedin.com/in/allxnso/",target:"_blank",rel:"noopener noreferrer",className:"inline-block mt-2",children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"currentColor",className:"bi bi-linkedin text-white hover:text-green-400 transition",viewBox:"0 0 16 16",children:(0,a.jsx)("path",{d:"M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"})})})]})]}),(0,a.jsx)("div",{className:"text-center text-sm text-gray-400 mt-6",children:"\xa9 2024 Kit Collective. All rights reserved."})]})}function m(e){let{children:t}=e;return(0,a.jsxs)("html",{lang:"en",children:[(0,a.jsxs)(l(),{children:[(0,a.jsx)("title",{children:"Home Page"}),(0,a.jsx)("link",{rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"}),(0,a.jsx)("script",{src:"https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"})]}),(0,a.jsxs)("body",{children:[(0,a.jsx)(o,{}),t,(0,a.jsx)(d,{})]})]})}},347:()=>{}},e=>{var t=t=>e(e.s=t);e.O(0,[690,909,441,517,358],()=>t(7419)),_N_E=e.O()}]);
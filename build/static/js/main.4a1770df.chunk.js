(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t(15),a=t.n(r),o=(t(20),t(6)),u=t(3),s=t(0),i=function(e){return Object(s.jsxs)("div",{children:["filter shown with",Object(s.jsx)("input",{value:e.filter,onChange:function(n){return e.setFilter(n.target.value)}})]})},l=function(e){var n=e.message,t=e.className;return null===n?null:Object(s.jsx)("div",{className:t,children:n})},d=function(e){return Object(s.jsxs)("div",{children:[e.name," ",e.number+" ",Object(s.jsx)("button",{onClick:function(n){return e.handleRemovePerson(n,e.id)},children:"Delete"})]})},m=function(e){return Object(s.jsx)("div",{children:e.persons.map((function(n){return n.name.toLowerCase().includes(e.filter.toLowerCase())?Object(s.jsx)(d,{id:n.id,name:n.name,number:n.number,handleRemovePerson:e.handleRemovePerson},n.name):null}))})},f=function(e){return Object(s.jsxs)("form",{onSubmit:e.handleNewPerson,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:e.newName,onChange:e.handleNewName})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{value:e.newNumber,onChange:e.handleNewNumber})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},b=t(4),j=t.n(b),h="/api/persons",O={getAll:function(){return j.a.get(h).then((function(e){return e.data}))},create:function(e){return j.a.post(h,e).then((function(e){return e.data}))},remove:function(e){return j.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},change:function(e,n){return j.a.put("".concat(h,"/").concat(n),e).then((function(e){return e.data}))}},v=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),d=Object(u.a)(a,2),b=d[0],j=d[1],h=Object(c.useState)(""),v=Object(u.a)(h,2),g=v[0],p=v[1],w=Object(c.useState)(""),x=Object(u.a)(w,2),N=x[0],k=x[1],P=Object(c.useState)({message:null,class:null}),C=Object(u.a)(P,2),S=C[0],y=C[1];Object(c.useEffect)((function(){return O.getAll().then((function(e){return r(e)}))}),[]);return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(l,{message:S.message,className:S.class}),Object(s.jsx)(i,{filter:N,setFilter:k}),Object(s.jsx)("h3",{children:"add a new"}),Object(s.jsx)(f,{handleNewPerson:function(e){e.preventDefault();var n={name:b,number:g};t.some((function(e){return e.name===b}))?window.confirm("".concat(b," is already added to phonebook, replace the old number with a new one?"))&&O.change(n,t.find((function(e){return e.name===b})).id).then((function(){r(t.map((function(e){return e.name===b?Object(o.a)(Object(o.a)({},n),{},{id:e.id}):e}))),y({message:"The number of ".concat(b," has been changed"),class:"notification"})})).catch((function(){r(t.filter((function(e){return e.name!==b}))),y({message:"Information of ".concat(b," has already been removed from the server"),class:"error"})})):(O.create(n).then((function(e){return r(t.concat(e))})),y({message:"Added ".concat(b),class:"notification"})),setTimeout((function(){y({message:null,class:null})}),2e3),j(""),p("")},handleNewName:function(e){return j(e.target.value)},handleNewNumber:function(e){return p(e.target.value)},newName:b,newNumber:g}),Object(s.jsx)("h3",{children:"Numbers"}),Object(s.jsx)(m,{persons:t,filter:N,handleRemovePerson:function(e,n){e.preventDefault(),!0===window.confirm("Delete ".concat(t.find((function(e){return e.id===n})).name,"?"))&&(O.remove(n).then((function(){return r(t.filter((function(e){return e.id!==n})))})),y({message:"".concat(t.find((function(e){return e.id===n})).name," removed"),class:"notification"}),setTimeout((function(){y({message:null,class:null})}),2e3))}})]})};a.a.render(Object(s.jsx)(v,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.4a1770df.chunk.js.map
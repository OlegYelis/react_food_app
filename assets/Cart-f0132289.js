import{h as u,j as t,L as v,k as i,e as m,w as C,x as N,H as h,B as k,l as w,m as b,q as F}from"./index-b7650272.js";const y="_item_3fo7s_1",$="_cart__link_3fo7s_23",H="_cart__image_3fo7s_31",A="_cart__description_3fo7s_53",B="_cart__name_3fo7s_69",E="_cart__price_3fo7s_85",I="_cart__total_3fo7s_101",P="_cart__right_3fo7s_117",R="_cart__actions_3fo7s_135",L="_cart__plus_3fo7s_153",S="_cart__minus_3fo7s_155",T="_decreaseCount__icon_3fo7s_181",q="_incrementCount__icon_3fo7s_183",D="_cart__remove_3fo7s_191",Y="_removeFromCart__icon_3fo7s_211",z="_cart__count_3fo7s_239",c={item:y,cart__link:$,cart__image:H,cart__description:A,cart__name:B,cart__price:E,cart__total:I,cart__right:P,cart__actions:R,cart__plus:L,cart__minus:S,decreaseCount__icon:T,incrementCount__icon:q,cart__remove:D,removeFromCart__icon:Y,cart__count:z},G=s=>{const o=u(),e=()=>{o(i.decrease(s.id))},l=()=>{o(i.add(s.id))},d=()=>{o(i.remove(s.id))};return t.jsxs("div",{className:c.item,children:[t.jsx(v,{to:`/product/${s.id}`,className:c.cart__link,children:t.jsx("img",{className:c.cart__image,src:`${s.image[0].sm}`,alt:"product image",width:"82px"})}),t.jsxs("div",{className:c.cart__description,children:[t.jsx("p",{className:c.cart__name,children:s.name}),t.jsxs("p",{className:c.cart__price,children:[s.price," $"]})]}),t.jsxs("div",{className:c.cart__right,children:[t.jsxs("div",{className:c.cart__actions,children:[t.jsx("button",{className:c.cart__minus,onClick:e,children:t.jsx("svg",{className:c.decreaseCount__icon,width:"20px",height:"20px",children:t.jsx("use",{href:"/images/icons.svg#icon-minus"})})}),t.jsx("p",{className:c.cart__count,children:s.count}),t.jsx("button",{className:c.cart__plus,onClick:l,children:t.jsx("svg",{className:c.incrementCount__icon,width:"20px",height:"20px",children:t.jsx("use",{href:"/images/icons.svg#icon-plus"})})}),t.jsx("button",{className:c.cart__remove,onClick:d,children:t.jsx("svg",{className:c.removeFromCart__icon,width:"24px",height:"24px",children:t.jsx("use",{href:"/images/icons.svg#icon-close"})})})]}),t.jsxs("p",{className:c.cart__total,children:["Total: ",(s.price*s.count).toFixed(2)," $"]})]})]})},J="_cart__headling_hkw59_1",K="_cart__info_hkw59_9",M="_cart__order_hkw59_17",O="_cart__total_hkw59_43",Q="_cart__txt_hkw59_65",U="_cart__price_hkw59_93",V="_cart__checkout_hkw59_117",n={cart__headling:J,cart__info:K,cart__order:M,cart__total:O,cart__txt:Q,cart__price:U,cart__checkout:V},tt=()=>{const[s,o]=m.useState([]),e=C(a=>a.cart.items),l=N(),d=u(),x=e.map(a=>{const _=s.find(r=>r.id===a.id);return _?a.count*_.price:0}).reduce((a,_)=>a+=_,0).toFixed(2),g=async a=>{const _=w(b,"burgers");return(await F(_)).val().find(j=>j.id===a)},p=async()=>{const _=(await Promise.all(e.map(r=>g(r.id)))).filter(r=>r!==void 0);o(_)};m.useEffect(()=>{p()},[e]);const f=()=>{d(i.clean()),l("/success")};return t.jsxs(t.Fragment,{children:[t.jsx(h,{className:n.cart__headling,children:"Cart"}),!e.length&&t.jsx(h,{className:n.cart__info,children:"Your cart is empty"}),!!e.length&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:n.cart__order,children:e.map(a=>{const _=s.find(r=>r.id===a.id);if(_)return t.jsx(G,{count:a.count,image:_.images,..._},_.id)})}),t.jsxs("div",{className:n.cart__total,children:[t.jsxs("p",{className:n.cart__txt,children:["Total ",t.jsxs("span",{children:["(",e.length,")"]})]}),t.jsxs("p",{className:n.cart__price,children:[x," ",t.jsx("span",{children:"$"})]})]}),t.jsx("div",{className:n.cart__checkout,children:t.jsx(k,{appearence:"big",onClick:f,children:"Checkout"})})]})]})};export{tt as default};

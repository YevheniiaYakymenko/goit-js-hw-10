import{i as s}from"./vendor-77e16229.js";function n(e,t){return new Promise((r,i)=>{setTimeout(()=>{t==="fulfilled"?r(e):i(e)},e)})}document.querySelector(".form").addEventListener("submit",function(e){e.preventDefault();const t=parseInt(document.querySelector('input[name="delay"]').value),r=document.querySelector('input[name="state"]:checked').value;n(t,r).then(()=>{s.success({title:"OK",message:`✅ Fulfilled promise in ${t}ms`})}).catch(()=>{s.error({title:"Error",message:`❌ Rejected promise in ${t}ms`})})});
//# sourceMappingURL=2-snackbar-d2793e99.js.map
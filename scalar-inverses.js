/* Safe symbolic isolation of a single occurrence. No evaluation of JavaScript,
   no numerical root guesses and no automatic selection of square/trig branches. */
(function(root){'use strict';function inverses(expression,target){
const tokens=expression.match(/(?:\d*\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?|[A-Za-z_]\w*|[()+\-*/^]/g)||[];let i=0;
const node=(op,a,b)=>({op,a,b});
function atom(){const t=tokens[i++];if(t==='('){const n=sum();if(tokens[i++]!==')')throw Error('Unclosed expression');return n;}if(tokens[i]==='('){i++;const n=sum();if(tokens[i++]!==')')throw Error('Unclosed function');return node(t,n);}return node('leaf',t);}
function power(){let n=atom();if(tokens[i]==='^'){i++;n=node('^',n,unary());}return n;}
function unary(){if(tokens[i]==='+'){i++;return unary();}if(tokens[i]==='-'){i++;return node('neg',unary());}return power();}
function product(){let n=unary();while(['*','/'].includes(tokens[i])){const t=tokens[i++];n=node(t,n,unary());}return n;}
function sum(){let n=product();while(['+','-'].includes(tokens[i])){const t=tokens[i++];n=node(t,n,product());}return n;}
const tree=sum();if(i!==tokens.length)throw Error('Incomplete expression');
const text=n=>n.op==='leaf'?n.a:n.op==='neg'?'(-'+text(n.a)+')':n.b?'('+text(n.a)+n.op+text(n.b)+')':n.op+'('+text(n.a)+')';
const count=(n,id)=>n.op==='leaf'?Number(n.a===id):count(n.a,id)+(n.b?count(n.b,id):0);
const ids=[...new Set(tokens.filter(t=>/^[A-Za-z_]/.test(t)&&t!=='pi'&&count(tree,t)))];
function isolate(n,id,rhs){if(n.op==='leaf')return n.a===id?rhs:null;const left=count(n.a,id);if(n.op==='neg')return isolate(n.a,id,'(-'+rhs+')');if(!n.b){const r=n.op==='ln'?'exp('+rhs+')':n.op==='log'?'10^('+rhs+')':n.op==='exp'?'ln('+rhs+')':null;return r?isolate(n.a,id,r):null;}const other=text(left?n.b:n.a);let r;
switch(n.op){case '+':r='('+rhs+'-'+other+')';break;case '-':r=left?'('+rhs+'+'+other+')':'('+other+'-'+rhs+')';break;case '*':r='('+rhs+'/'+other+')';break;case '/':r=left?'('+rhs+'*'+other+')':'('+other+'/'+rhs+')';break;case '^':if(left)return null;r='(ln('+rhs+')/ln('+other+'))';break;default:return null;}
return isolate(left?n.a:n.b,id,r);}
const out={};for(const id of ids)if(count(tree,id)===1){const expr=isolate(tree,id,target);if(expr)out[id]=expr;}return out;
}root.ScalarInverses=inverses;if(typeof module!=='undefined')module.exports=inverses;})(typeof globalThis!=='undefined'?globalThis:this);

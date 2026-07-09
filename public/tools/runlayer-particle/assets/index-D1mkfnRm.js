(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const cr="170",zi={ROTATE:0,DOLLY:1,PAN:2},Oi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},lu=0,Ur=1,cu=2,Kl=1,uu=2,Tn=3,jn=0,Ye=1,An=2,Dn=0,qe=1,da=2,Fr=3,Nr=4,hu=5,li=100,du=101,fu=102,pu=103,mu=104,gu=200,vu=201,_u=202,xu=203,fa=204,pa=205,yu=206,Su=207,Mu=208,Eu=209,Tu=210,bu=211,Au=212,wu=213,Cu=214,ma=0,ga=1,va=2,Yi=3,_a=4,xa=5,ya=6,Sa=7,Zl=0,Ru=1,Pu=2,$n=0,Du=1,Lu=2,Iu=3,Uu=4,Fu=5,Nu=6,Ou=7,Jl=300,qi=301,$i=302,Ma=303,Ea=304,Es=306,Ta=1e3,wn=1001,ba=1002,Re=1003,Bu=1004,Oo=1005,pn=1006,Ls=1007,fi=1008,Un=1009,Ql=1010,tc=1011,bo=1012,ur=1013,gi=1014,Ae=1015,Ji=1016,hr=1017,dr=1018,ji=1020,ec=35902,nc=1021,ic=1022,ye=1023,oc=1024,sc=1025,Hi=1026,Ki=1027,ac=1028,fr=1029,rc=1030,pr=1031,mr=1033,hs=33776,ds=33777,fs=33778,ps=33779,Aa=35840,wa=35841,Ca=35842,Ra=35843,Pa=36196,Da=37492,La=37496,Ia=37808,Ua=37809,Fa=37810,Na=37811,Oa=37812,Ba=37813,ka=37814,za=37815,Ha=37816,Va=37817,Ga=37818,Wa=37819,Xa=37820,Ya=37821,ms=36492,qa=36494,$a=36495,lc=36283,ja=36284,Ka=36285,Za=36286,ku=3200,zu=3201,Hu=0,Vu=1,Xn="",on="srgb",Qi="srgb-linear",Ts="linear",ee="srgb",Mi=7680,Or=519,Gu=512,Wu=513,Xu=514,cc=515,Yu=516,qu=517,$u=518,ju=519,Br=35044,kr="300 es",Cn=2e3,_s=2001;class _i{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const o=this._listeners[t];if(o!==void 0){const s=o.indexOf(e);s!==-1&&o.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const o=n.slice(0);for(let s=0,a=o.length;s<a;s++)o[s].call(this,t);t.target=null}}}const De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let zr=1234567;const So=Math.PI/180,Ao=180/Math.PI;function to(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(De[i&255]+De[i>>8&255]+De[i>>16&255]+De[i>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]).toLowerCase()}function Ie(i,t,e){return Math.max(t,Math.min(e,i))}function gr(i,t){return(i%t+t)%t}function Ku(i,t,e,n,o){return n+(i-t)*(o-n)/(e-t)}function Zu(i,t,e){return i!==t?(e-i)/(t-i):0}function Mo(i,t,e){return(1-e)*i+e*t}function Ju(i,t,e,n){return Mo(i,t,1-Math.exp(-e*n))}function Qu(i,t=1){return t-Math.abs(gr(i,t*2)-t)}function th(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function eh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function nh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ih(i,t){return i+Math.random()*(t-i)}function oh(i){return i*(.5-Math.random())}function sh(i){i!==void 0&&(zr=i);let t=zr+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ah(i){return i*So}function rh(i){return i*Ao}function lh(i){return(i&i-1)===0&&i!==0}function ch(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function uh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function hh(i,t,e,n,o){const s=Math.cos,a=Math.sin,r=s(e/2),l=a(e/2),h=s((t+n)/2),u=a((t+n)/2),c=s((t-n)/2),f=a((t-n)/2),p=s((n-t)/2),g=a((n-t)/2);switch(o){case"XYX":i.set(r*u,l*c,l*f,r*h);break;case"YZY":i.set(l*f,r*u,l*c,r*h);break;case"ZXZ":i.set(l*c,l*f,r*u,r*h);break;case"XZX":i.set(r*u,l*g,l*p,r*h);break;case"YXY":i.set(l*p,r*u,l*g,r*h);break;case"ZYZ":i.set(l*g,l*p,r*u,r*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function Ni(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ne(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const et={DEG2RAD:So,RAD2DEG:Ao,generateUUID:to,clamp:Ie,euclideanModulo:gr,mapLinear:Ku,inverseLerp:Zu,lerp:Mo,damp:Ju,pingpong:Qu,smoothstep:th,smootherstep:eh,randInt:nh,randFloat:ih,randFloatSpread:oh,seededRandom:sh,degToRad:ah,radToDeg:rh,isPowerOfTwo:lh,ceilPowerOfTwo:ch,floorPowerOfTwo:uh,setQuaternionFromProperEuler:hh,normalize:Ne,denormalize:Ni};class Ot{constructor(t=0,e=0){Ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6],this.y=o[1]*e+o[4]*n+o[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),o=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*o+t.x,this.y=s*o+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ut{constructor(t,e,n,o,s,a,r,l,h){Ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,o,s,a,r,l,h)}set(t,e,n,o,s,a,r,l,h){const u=this.elements;return u[0]=t,u[1]=o,u[2]=r,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,o=e.elements,s=this.elements,a=n[0],r=n[3],l=n[6],h=n[1],u=n[4],c=n[7],f=n[2],p=n[5],g=n[8],v=o[0],m=o[3],d=o[6],x=o[1],E=o[4],S=o[7],D=o[2],C=o[5],w=o[8];return s[0]=a*v+r*x+l*D,s[3]=a*m+r*E+l*C,s[6]=a*d+r*S+l*w,s[1]=h*v+u*x+c*D,s[4]=h*m+u*E+c*C,s[7]=h*d+u*S+c*w,s[2]=f*v+p*x+g*D,s[5]=f*m+p*E+g*C,s[8]=f*d+p*S+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],o=t[2],s=t[3],a=t[4],r=t[5],l=t[6],h=t[7],u=t[8];return e*a*u-e*r*h-n*s*u+n*r*l+o*s*h-o*a*l}invert(){const t=this.elements,e=t[0],n=t[1],o=t[2],s=t[3],a=t[4],r=t[5],l=t[6],h=t[7],u=t[8],c=u*a-r*h,f=r*l-u*s,p=h*s-a*l,g=e*c+n*f+o*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=c*v,t[1]=(o*h-u*n)*v,t[2]=(r*n-o*a)*v,t[3]=f*v,t[4]=(u*e-o*l)*v,t[5]=(o*s-r*e)*v,t[6]=p*v,t[7]=(n*l-h*e)*v,t[8]=(a*e-n*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,o,s,a,r){const l=Math.cos(s),h=Math.sin(s);return this.set(n*l,n*h,-n*(l*a+h*r)+a+t,-o*h,o*l,-o*(-h*a+l*r)+r+e,0,0,1),this}scale(t,e){return this.premultiply(Is.makeScale(t,e)),this}rotate(t){return this.premultiply(Is.makeRotation(-t)),this}translate(t,e){return this.premultiply(Is.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let o=0;o<9;o++)if(e[o]!==n[o])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Is=new Ut;function uc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function xs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function dh(){const i=xs("canvas");return i.style.display="block",i}const Hr={};function vo(i){i in Hr||(Hr[i]=!0,console.warn(i))}function fh(i,t,e){return new Promise(function(n,o){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:o();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function ph(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function mh(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qt={enabled:!0,workingColorSpace:Qi,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ee&&(i.r=Ln(i.r),i.g=Ln(i.g),i.b=Ln(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ee&&(i.r=Vi(i.r),i.g=Vi(i.g),i.b=Vi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Xn?Ts:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Ln(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Vi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Vr=[.64,.33,.3,.6,.15,.06],Gr=[.2126,.7152,.0722],Wr=[.3127,.329],Xr=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yr=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[Qi]:{primaries:Vr,whitePoint:Wr,transfer:Ts,toXYZ:Xr,fromXYZ:Yr,luminanceCoefficients:Gr,workingColorSpaceConfig:{unpackColorSpace:on},outputColorSpaceConfig:{drawingBufferColorSpace:on}},[on]:{primaries:Vr,whitePoint:Wr,transfer:ee,toXYZ:Xr,fromXYZ:Yr,luminanceCoefficients:Gr,outputColorSpaceConfig:{drawingBufferColorSpace:on}}});let Ei;class gh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ei===void 0&&(Ei=xs("canvas")),Ei.width=t.width,Ei.height=t.height;const n=Ei.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ei}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=xs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const o=n.getImageData(0,0,t.width,t.height),s=o.data;for(let a=0;a<s.length;a++)s[a]=Ln(s[a]/255)*255;return n.putImageData(o,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ln(e[n]/255)*255):e[n]=Ln(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let vh=0;class hc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vh++}),this.uuid=to(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},o=this.data;if(o!==null){let s;if(Array.isArray(o)){s=[];for(let a=0,r=o.length;a<r;a++)o[a].isDataTexture?s.push(Us(o[a].image)):s.push(Us(o[a]))}else s=Us(o);n.url=s}return e||(t.images[this.uuid]=n),n}}function Us(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?gh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _h=0;class ke extends _i{constructor(t=ke.DEFAULT_IMAGE,e=ke.DEFAULT_MAPPING,n=wn,o=wn,s=pn,a=fi,r=ye,l=Un,h=ke.DEFAULT_ANISOTROPY,u=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=to(),this.name="",this.source=new hc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=o,this.magFilter=s,this.minFilter=a,this.anisotropy=h,this.format=r,this.internalFormat=null,this.type=l,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Jl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ta:t.x=t.x-Math.floor(t.x);break;case wn:t.x=t.x<0?0:1;break;case ba:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ta:t.y=t.y-Math.floor(t.y);break;case wn:t.y=t.y<0?0:1;break;case ba:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=Jl;ke.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,n=0,o=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=o}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,o){return this.x=t,this.y=e,this.z=n,this.w=o,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,o=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*o+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*o+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*o+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*o+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,o,s;const l=t.elements,h=l[0],u=l[4],c=l[8],f=l[1],p=l[5],g=l[9],v=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(c-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(c+v)<.1&&Math.abs(g+m)<.1&&Math.abs(h+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(h+1)/2,S=(p+1)/2,D=(d+1)/2,C=(u+f)/4,w=(c+v)/4,U=(g+m)/4;return E>S&&E>D?E<.01?(n=0,o=.707106781,s=.707106781):(n=Math.sqrt(E),o=C/n,s=w/n):S>D?S<.01?(n=.707106781,o=0,s=.707106781):(o=Math.sqrt(S),n=C/o,s=U/o):D<.01?(n=.707106781,o=.707106781,s=0):(s=Math.sqrt(D),n=w/s,o=U/s),this.set(n,o,s,e),this}let x=Math.sqrt((m-g)*(m-g)+(c-v)*(c-v)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(c-v)/x,this.z=(f-u)/x,this.w=Math.acos((h+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xh extends _i{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const o={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new ke(o,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let r=0;r<a;r++)this.textures[r]=s.clone(),this.textures[r].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let o=0,s=this.textures.length;o<s;o++)this.textures[o].image.width=t,this.textures[o].image.height=e,this.textures[o].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,o=t.textures.length;n<o;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new hc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gn extends xh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class dc extends ke{constructor(t=null,e=1,n=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:o},this.magFilter=Re,this.minFilter=Re,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class yh extends ke{constructor(t=null,e=1,n=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:o},this.magFilter=Re,this.minFilter=Re,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vi{constructor(t=0,e=0,n=0,o=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=o}static slerpFlat(t,e,n,o,s,a,r){let l=n[o+0],h=n[o+1],u=n[o+2],c=n[o+3];const f=s[a+0],p=s[a+1],g=s[a+2],v=s[a+3];if(r===0){t[e+0]=l,t[e+1]=h,t[e+2]=u,t[e+3]=c;return}if(r===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=v;return}if(c!==v||l!==f||h!==p||u!==g){let m=1-r;const d=l*f+h*p+u*g+c*v,x=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const D=Math.sqrt(E),C=Math.atan2(D,d*x);m=Math.sin(m*C)/D,r=Math.sin(r*C)/D}const S=r*x;if(l=l*m+f*S,h=h*m+p*S,u=u*m+g*S,c=c*m+v*S,m===1-r){const D=1/Math.sqrt(l*l+h*h+u*u+c*c);l*=D,h*=D,u*=D,c*=D}}t[e]=l,t[e+1]=h,t[e+2]=u,t[e+3]=c}static multiplyQuaternionsFlat(t,e,n,o,s,a){const r=n[o],l=n[o+1],h=n[o+2],u=n[o+3],c=s[a],f=s[a+1],p=s[a+2],g=s[a+3];return t[e]=r*g+u*c+l*p-h*f,t[e+1]=l*g+u*f+h*c-r*p,t[e+2]=h*g+u*p+r*f-l*c,t[e+3]=u*g-r*c-l*f-h*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,o){return this._x=t,this._y=e,this._z=n,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,o=t._y,s=t._z,a=t._order,r=Math.cos,l=Math.sin,h=r(n/2),u=r(o/2),c=r(s/2),f=l(n/2),p=l(o/2),g=l(s/2);switch(a){case"XYZ":this._x=f*u*c+h*p*g,this._y=h*p*c-f*u*g,this._z=h*u*g+f*p*c,this._w=h*u*c-f*p*g;break;case"YXZ":this._x=f*u*c+h*p*g,this._y=h*p*c-f*u*g,this._z=h*u*g-f*p*c,this._w=h*u*c+f*p*g;break;case"ZXY":this._x=f*u*c-h*p*g,this._y=h*p*c+f*u*g,this._z=h*u*g+f*p*c,this._w=h*u*c-f*p*g;break;case"ZYX":this._x=f*u*c-h*p*g,this._y=h*p*c+f*u*g,this._z=h*u*g-f*p*c,this._w=h*u*c+f*p*g;break;case"YZX":this._x=f*u*c+h*p*g,this._y=h*p*c+f*u*g,this._z=h*u*g-f*p*c,this._w=h*u*c-f*p*g;break;case"XZY":this._x=f*u*c-h*p*g,this._y=h*p*c-f*u*g,this._z=h*u*g+f*p*c,this._w=h*u*c+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,o=Math.sin(n);return this._x=t.x*o,this._y=t.y*o,this._z=t.z*o,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],o=e[4],s=e[8],a=e[1],r=e[5],l=e[9],h=e[2],u=e[6],c=e[10],f=n+r+c;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-h)*p,this._z=(a-o)*p}else if(n>r&&n>c){const p=2*Math.sqrt(1+n-r-c);this._w=(u-l)/p,this._x=.25*p,this._y=(o+a)/p,this._z=(s+h)/p}else if(r>c){const p=2*Math.sqrt(1+r-n-c);this._w=(s-h)/p,this._x=(o+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+c-n-r);this._w=(a-o)/p,this._x=(s+h)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ie(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const o=Math.min(1,e/n);return this.slerp(t,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,o=t._y,s=t._z,a=t._w,r=e._x,l=e._y,h=e._z,u=e._w;return this._x=n*u+a*r+o*h-s*l,this._y=o*u+a*l+s*r-n*h,this._z=s*u+a*h+n*l-o*r,this._w=a*u-n*r-o*l-s*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,o=this._y,s=this._z,a=this._w;let r=a*t._w+n*t._x+o*t._y+s*t._z;if(r<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,r=-r):this.copy(t),r>=1)return this._w=a,this._x=n,this._y=o,this._z=s,this;const l=1-r*r;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*o+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const h=Math.sqrt(l),u=Math.atan2(h,r),c=Math.sin((1-e)*u)/h,f=Math.sin(e*u)/h;return this._w=a*c+this._w*f,this._x=n*c+this._x*f,this._y=o*c+this._y*f,this._z=s*c+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),o=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(o*Math.sin(t),o*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,n=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qr.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qr.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,o=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*o,this.y=s[1]*e+s[4]*n+s[7]*o,this.z=s[2]*e+s[5]*n+s[8]*o,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,o=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*o+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*o+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*o+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*o+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,o=this.z,s=t.x,a=t.y,r=t.z,l=t.w,h=2*(a*o-r*n),u=2*(r*e-s*o),c=2*(s*n-a*e);return this.x=e+l*h+a*c-r*u,this.y=n+l*u+r*h-s*c,this.z=o+l*c+s*u-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,o=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*o,this.y=s[1]*e+s[5]*n+s[9]*o,this.z=s[2]*e+s[6]*n+s[10]*o,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,o=t.y,s=t.z,a=e.x,r=e.y,l=e.z;return this.x=o*l-s*r,this.y=s*a-n*l,this.z=n*r-o*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fs.copy(this).projectOnVector(t),this.sub(Fs)}reflect(t){return this.sub(Fs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,o=this.z-t.z;return e*e+n*n+o*o}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const o=Math.sin(e)*t;return this.x=o*Math.sin(n),this.y=Math.cos(e)*t,this.z=o*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),o=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=o,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fs=new A,qr=new vi;class Do{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,r=s.count;a<r;a++)t.isMesh===!0?t.getVertexPosition(a,ln):ln.fromBufferAttribute(s,a),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Bo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bo.copy(n.boundingBox)),Bo.applyMatrix4(t.matrixWorld),this.union(Bo)}const o=t.children;for(let s=0,a=o.length;s<a;s++)this.expandByObject(o[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ao),ko.subVectors(this.max,ao),Ti.subVectors(t.a,ao),bi.subVectors(t.b,ao),Ai.subVectors(t.c,ao),Bn.subVectors(bi,Ti),kn.subVectors(Ai,bi),Jn.subVectors(Ti,Ai);let e=[0,-Bn.z,Bn.y,0,-kn.z,kn.y,0,-Jn.z,Jn.y,Bn.z,0,-Bn.x,kn.z,0,-kn.x,Jn.z,0,-Jn.x,-Bn.y,Bn.x,0,-kn.y,kn.x,0,-Jn.y,Jn.x,0];return!Ns(e,Ti,bi,Ai,ko)||(e=[1,0,0,0,1,0,0,0,1],!Ns(e,Ti,bi,Ai,ko))?!1:(zo.crossVectors(Bn,kn),e=[zo.x,zo.y,zo.z],Ns(e,Ti,bi,Ai,ko))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const xn=[new A,new A,new A,new A,new A,new A,new A,new A],ln=new A,Bo=new Do,Ti=new A,bi=new A,Ai=new A,Bn=new A,kn=new A,Jn=new A,ao=new A,ko=new A,zo=new A,Qn=new A;function Ns(i,t,e,n,o){for(let s=0,a=i.length-3;s<=a;s+=3){Qn.fromArray(i,s);const r=o.x*Math.abs(Qn.x)+o.y*Math.abs(Qn.y)+o.z*Math.abs(Qn.z),l=t.dot(Qn),h=e.dot(Qn),u=n.dot(Qn);if(Math.max(-Math.max(l,h,u),Math.min(l,h,u))>r)return!1}return!0}const Sh=new Do,ro=new A,Os=new A;class Lo{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Sh.setFromPoints(t).getCenter(n);let o=0;for(let s=0,a=t.length;s<a;s++)o=Math.max(o,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(o),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ro.subVectors(t,this.center);const e=ro.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),o=(n-this.radius)*.5;this.center.addScaledVector(ro,o/n),this.radius+=o}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Os.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ro.copy(t.center).add(Os)),this.expandByPoint(ro.copy(t.center).sub(Os))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yn=new A,Bs=new A,Ho=new A,zn=new A,ks=new A,Vo=new A,zs=new A;class bs{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yn.copy(this.origin).addScaledVector(this.direction,e),yn.distanceToSquared(t))}distanceSqToSegment(t,e,n,o){Bs.copy(t).add(e).multiplyScalar(.5),Ho.copy(e).sub(t).normalize(),zn.copy(this.origin).sub(Bs);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Ho),r=zn.dot(this.direction),l=-zn.dot(Ho),h=zn.lengthSq(),u=Math.abs(1-a*a);let c,f,p,g;if(u>0)if(c=a*l-r,f=a*r-l,g=s*u,c>=0)if(f>=-g)if(f<=g){const v=1/u;c*=v,f*=v,p=c*(c+a*f+2*r)+f*(a*c+f+2*l)+h}else f=s,c=Math.max(0,-(a*f+r)),p=-c*c+f*(f+2*l)+h;else f=-s,c=Math.max(0,-(a*f+r)),p=-c*c+f*(f+2*l)+h;else f<=-g?(c=Math.max(0,-(-a*s+r)),f=c>0?-s:Math.min(Math.max(-s,-l),s),p=-c*c+f*(f+2*l)+h):f<=g?(c=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+h):(c=Math.max(0,-(a*s+r)),f=c>0?s:Math.min(Math.max(-s,-l),s),p=-c*c+f*(f+2*l)+h);else f=a>0?-s:s,c=Math.max(0,-(a*f+r)),p=-c*c+f*(f+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,c),o&&o.copy(Bs).addScaledVector(Ho,f),p}intersectSphere(t,e){yn.subVectors(t.center,this.origin);const n=yn.dot(this.direction),o=yn.dot(yn)-n*n,s=t.radius*t.radius;if(o>s)return null;const a=Math.sqrt(s-o),r=n-a,l=n+a;return l<0?null:r<0?this.at(l,e):this.at(r,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,o,s,a,r,l;const h=1/this.direction.x,u=1/this.direction.y,c=1/this.direction.z,f=this.origin;return h>=0?(n=(t.min.x-f.x)*h,o=(t.max.x-f.x)*h):(n=(t.max.x-f.x)*h,o=(t.min.x-f.x)*h),u>=0?(s=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||s>o||((s>n||isNaN(n))&&(n=s),(a<o||isNaN(o))&&(o=a),c>=0?(r=(t.min.z-f.z)*c,l=(t.max.z-f.z)*c):(r=(t.max.z-f.z)*c,l=(t.min.z-f.z)*c),n>l||r>o)||((r>n||n!==n)&&(n=r),(l<o||o!==o)&&(o=l),o<0)?null:this.at(n>=0?n:o,e)}intersectsBox(t){return this.intersectBox(t,yn)!==null}intersectTriangle(t,e,n,o,s){ks.subVectors(e,t),Vo.subVectors(n,t),zs.crossVectors(ks,Vo);let a=this.direction.dot(zs),r;if(a>0){if(o)return null;r=1}else if(a<0)r=-1,a=-a;else return null;zn.subVectors(this.origin,t);const l=r*this.direction.dot(Vo.crossVectors(zn,Vo));if(l<0)return null;const h=r*this.direction.dot(ks.cross(zn));if(h<0||l+h>a)return null;const u=-r*zn.dot(zs);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pe{constructor(t,e,n,o,s,a,r,l,h,u,c,f,p,g,v,m){pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,o,s,a,r,l,h,u,c,f,p,g,v,m)}set(t,e,n,o,s,a,r,l,h,u,c,f,p,g,v,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=o,d[1]=s,d[5]=a,d[9]=r,d[13]=l,d[2]=h,d[6]=u,d[10]=c,d[14]=f,d[3]=p,d[7]=g,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,o=1/wi.setFromMatrixColumn(t,0).length(),s=1/wi.setFromMatrixColumn(t,1).length(),a=1/wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*o,e[1]=n[1]*o,e[2]=n[2]*o,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,o=t.y,s=t.z,a=Math.cos(n),r=Math.sin(n),l=Math.cos(o),h=Math.sin(o),u=Math.cos(s),c=Math.sin(s);if(t.order==="XYZ"){const f=a*u,p=a*c,g=r*u,v=r*c;e[0]=l*u,e[4]=-l*c,e[8]=h,e[1]=p+g*h,e[5]=f-v*h,e[9]=-r*l,e[2]=v-f*h,e[6]=g+p*h,e[10]=a*l}else if(t.order==="YXZ"){const f=l*u,p=l*c,g=h*u,v=h*c;e[0]=f+v*r,e[4]=g*r-p,e[8]=a*h,e[1]=a*c,e[5]=a*u,e[9]=-r,e[2]=p*r-g,e[6]=v+f*r,e[10]=a*l}else if(t.order==="ZXY"){const f=l*u,p=l*c,g=h*u,v=h*c;e[0]=f-v*r,e[4]=-a*c,e[8]=g+p*r,e[1]=p+g*r,e[5]=a*u,e[9]=v-f*r,e[2]=-a*h,e[6]=r,e[10]=a*l}else if(t.order==="ZYX"){const f=a*u,p=a*c,g=r*u,v=r*c;e[0]=l*u,e[4]=g*h-p,e[8]=f*h+v,e[1]=l*c,e[5]=v*h+f,e[9]=p*h-g,e[2]=-h,e[6]=r*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,p=a*h,g=r*l,v=r*h;e[0]=l*u,e[4]=v-f*c,e[8]=g*c+p,e[1]=c,e[5]=a*u,e[9]=-r*u,e[2]=-h*u,e[6]=p*c+g,e[10]=f-v*c}else if(t.order==="XZY"){const f=a*l,p=a*h,g=r*l,v=r*h;e[0]=l*u,e[4]=-c,e[8]=h*u,e[1]=f*c+v,e[5]=a*u,e[9]=p*c-g,e[2]=g*c-p,e[6]=r*u,e[10]=v*c+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Mh,t,Eh)}lookAt(t,e,n){const o=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),Hn.crossVectors(n,je),Hn.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),Hn.crossVectors(n,je)),Hn.normalize(),Go.crossVectors(je,Hn),o[0]=Hn.x,o[4]=Go.x,o[8]=je.x,o[1]=Hn.y,o[5]=Go.y,o[9]=je.y,o[2]=Hn.z,o[6]=Go.z,o[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,o=e.elements,s=this.elements,a=n[0],r=n[4],l=n[8],h=n[12],u=n[1],c=n[5],f=n[9],p=n[13],g=n[2],v=n[6],m=n[10],d=n[14],x=n[3],E=n[7],S=n[11],D=n[15],C=o[0],w=o[4],U=o[8],T=o[12],M=o[1],R=o[5],V=o[9],k=o[13],$=o[2],j=o[6],X=o[10],Z=o[14],H=o[3],st=o[7],ht=o[11],Mt=o[15];return s[0]=a*C+r*M+l*$+h*H,s[4]=a*w+r*R+l*j+h*st,s[8]=a*U+r*V+l*X+h*ht,s[12]=a*T+r*k+l*Z+h*Mt,s[1]=u*C+c*M+f*$+p*H,s[5]=u*w+c*R+f*j+p*st,s[9]=u*U+c*V+f*X+p*ht,s[13]=u*T+c*k+f*Z+p*Mt,s[2]=g*C+v*M+m*$+d*H,s[6]=g*w+v*R+m*j+d*st,s[10]=g*U+v*V+m*X+d*ht,s[14]=g*T+v*k+m*Z+d*Mt,s[3]=x*C+E*M+S*$+D*H,s[7]=x*w+E*R+S*j+D*st,s[11]=x*U+E*V+S*X+D*ht,s[15]=x*T+E*k+S*Z+D*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],o=t[8],s=t[12],a=t[1],r=t[5],l=t[9],h=t[13],u=t[2],c=t[6],f=t[10],p=t[14],g=t[3],v=t[7],m=t[11],d=t[15];return g*(+s*l*c-o*h*c-s*r*f+n*h*f+o*r*p-n*l*p)+v*(+e*l*p-e*h*f+s*a*f-o*a*p+o*h*u-s*l*u)+m*(+e*h*c-e*r*p-s*a*c+n*a*p+s*r*u-n*h*u)+d*(-o*r*u-e*l*c+e*r*f+o*a*c-n*a*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const o=this.elements;return t.isVector3?(o[12]=t.x,o[13]=t.y,o[14]=t.z):(o[12]=t,o[13]=e,o[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],o=t[2],s=t[3],a=t[4],r=t[5],l=t[6],h=t[7],u=t[8],c=t[9],f=t[10],p=t[11],g=t[12],v=t[13],m=t[14],d=t[15],x=c*m*h-v*f*h+v*l*p-r*m*p-c*l*d+r*f*d,E=g*f*h-u*m*h-g*l*p+a*m*p+u*l*d-a*f*d,S=u*v*h-g*c*h+g*r*p-a*v*p-u*r*d+a*c*d,D=g*c*l-u*v*l-g*r*f+a*v*f+u*r*m-a*c*m,C=e*x+n*E+o*S+s*D;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/C;return t[0]=x*w,t[1]=(v*f*s-c*m*s-v*o*p+n*m*p+c*o*d-n*f*d)*w,t[2]=(r*m*s-v*l*s+v*o*h-n*m*h-r*o*d+n*l*d)*w,t[3]=(c*l*s-r*f*s-c*o*h+n*f*h+r*o*p-n*l*p)*w,t[4]=E*w,t[5]=(u*m*s-g*f*s+g*o*p-e*m*p-u*o*d+e*f*d)*w,t[6]=(g*l*s-a*m*s-g*o*h+e*m*h+a*o*d-e*l*d)*w,t[7]=(a*f*s-u*l*s+u*o*h-e*f*h-a*o*p+e*l*p)*w,t[8]=S*w,t[9]=(g*c*s-u*v*s-g*n*p+e*v*p+u*n*d-e*c*d)*w,t[10]=(a*v*s-g*r*s+g*n*h-e*v*h-a*n*d+e*r*d)*w,t[11]=(u*r*s-a*c*s-u*n*h+e*c*h+a*n*p-e*r*p)*w,t[12]=D*w,t[13]=(u*v*o-g*c*o+g*n*f-e*v*f-u*n*m+e*c*m)*w,t[14]=(g*r*o-a*v*o-g*n*l+e*v*l+a*n*m-e*r*m)*w,t[15]=(a*c*o-u*r*o+u*n*l-e*c*l-a*n*f+e*r*f)*w,this}scale(t){const e=this.elements,n=t.x,o=t.y,s=t.z;return e[0]*=n,e[4]*=o,e[8]*=s,e[1]*=n,e[5]*=o,e[9]*=s,e[2]*=n,e[6]*=o,e[10]*=s,e[3]*=n,e[7]*=o,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],o=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,o))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),o=Math.sin(e),s=1-n,a=t.x,r=t.y,l=t.z,h=s*a,u=s*r;return this.set(h*a+n,h*r-o*l,h*l+o*r,0,h*r+o*l,u*r+n,u*l-o*a,0,h*l-o*r,u*l+o*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,o,s,a){return this.set(1,n,s,0,t,1,a,0,e,o,1,0,0,0,0,1),this}compose(t,e,n){const o=this.elements,s=e._x,a=e._y,r=e._z,l=e._w,h=s+s,u=a+a,c=r+r,f=s*h,p=s*u,g=s*c,v=a*u,m=a*c,d=r*c,x=l*h,E=l*u,S=l*c,D=n.x,C=n.y,w=n.z;return o[0]=(1-(v+d))*D,o[1]=(p+S)*D,o[2]=(g-E)*D,o[3]=0,o[4]=(p-S)*C,o[5]=(1-(f+d))*C,o[6]=(m+x)*C,o[7]=0,o[8]=(g+E)*w,o[9]=(m-x)*w,o[10]=(1-(f+v))*w,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,this}decompose(t,e,n){const o=this.elements;let s=wi.set(o[0],o[1],o[2]).length();const a=wi.set(o[4],o[5],o[6]).length(),r=wi.set(o[8],o[9],o[10]).length();this.determinant()<0&&(s=-s),t.x=o[12],t.y=o[13],t.z=o[14],cn.copy(this);const h=1/s,u=1/a,c=1/r;return cn.elements[0]*=h,cn.elements[1]*=h,cn.elements[2]*=h,cn.elements[4]*=u,cn.elements[5]*=u,cn.elements[6]*=u,cn.elements[8]*=c,cn.elements[9]*=c,cn.elements[10]*=c,e.setFromRotationMatrix(cn),n.x=s,n.y=a,n.z=r,this}makePerspective(t,e,n,o,s,a,r=Cn){const l=this.elements,h=2*s/(e-t),u=2*s/(n-o),c=(e+t)/(e-t),f=(n+o)/(n-o);let p,g;if(r===Cn)p=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(r===_s)p=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+r);return l[0]=h,l[4]=0,l[8]=c,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,o,s,a,r=Cn){const l=this.elements,h=1/(e-t),u=1/(n-o),c=1/(a-s),f=(e+t)*h,p=(n+o)*u;let g,v;if(r===Cn)g=(a+s)*c,v=-2*c;else if(r===_s)g=s*c,v=-1*c;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+r);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let o=0;o<16;o++)if(e[o]!==n[o])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const wi=new A,cn=new pe,Mh=new A(0,0,0),Eh=new A(1,1,1),Hn=new A,Go=new A,je=new A,$r=new pe,jr=new vi;class Fn{constructor(t=0,e=0,n=0,o=Fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,o=this._order){return this._x=t,this._y=e,this._z=n,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const o=t.elements,s=o[0],a=o[4],r=o[8],l=o[1],h=o[5],u=o[9],c=o[2],f=o[6],p=o[10];switch(e){case"XYZ":this._y=Math.asin(Ie(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(r,p),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-c,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-c,p),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ie(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(Ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-c,s)):(this._x=0,this._y=Math.atan2(r,p));break;case"XZY":this._z=Math.asin(-Ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(r,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return $r.makeRotationFromQuaternion(t),this.setFromRotationMatrix($r,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jr.setFromEuler(this),this.setFromQuaternion(jr,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fn.DEFAULT_ORDER="XYZ";class fc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Th=0;const Kr=new A,Ci=new vi,Sn=new pe,Wo=new A,lo=new A,bh=new A,Ah=new vi,Zr=new A(1,0,0),Jr=new A(0,1,0),Qr=new A(0,0,1),tl={type:"added"},wh={type:"removed"},Ri={type:"childadded",child:null},Hs={type:"childremoved",child:null};class ze extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=to(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ze.DEFAULT_UP.clone();const t=new A,e=new Fn,n=new vi,o=new A(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new pe},normalMatrix:{value:new Ut}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=ze.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.premultiply(Ci),this}rotateX(t){return this.rotateOnAxis(Zr,t)}rotateY(t){return this.rotateOnAxis(Jr,t)}rotateZ(t){return this.rotateOnAxis(Qr,t)}translateOnAxis(t,e){return Kr.copy(t).applyQuaternion(this.quaternion),this.position.add(Kr.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zr,t)}translateY(t){return this.translateOnAxis(Jr,t)}translateZ(t){return this.translateOnAxis(Qr,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Wo.copy(t):Wo.set(t,e,n);const o=this.parent;this.updateWorldMatrix(!0,!1),lo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(lo,Wo,this.up):Sn.lookAt(Wo,lo,this.up),this.quaternion.setFromRotationMatrix(Sn),o&&(Sn.extractRotation(o.matrixWorld),Ci.setFromRotationMatrix(Sn),this.quaternion.premultiply(Ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(tl),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wh),Hs.child=t,this.dispatchEvent(Hs),Hs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Sn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Sn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(tl),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,o=this.children.length;n<o;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const o=this.children;for(let s=0,a=o.length;s<a;s++)o[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,t,bh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,Ah,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,o=e.length;n<o;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,o=e.length;n<o;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,o=e.length;n<o;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const o=this.children;for(let s=0,a=o.length;s<a;s++)o[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(r=>({boxInitialized:r.boxInitialized,boxMin:r.box.min.toArray(),boxMax:r.box.max.toArray(),sphereInitialized:r.sphereInitialized,sphereRadius:r.sphere.radius,sphereCenter:r.sphere.center.toArray()})),o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function s(r,l){return r[l.uuid]===void 0&&(r[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=s(t.geometries,this.geometry);const r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){const l=r.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){const c=l[h];s(t.shapes,c)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const r=[];for(let l=0,h=this.material.length;l<h;l++)r.push(s(t.materials,this.material[l]));o.material=r}else o.material=s(t.materials,this.material);if(this.children.length>0){o.children=[];for(let r=0;r<this.children.length;r++)o.children.push(this.children[r].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let r=0;r<this.animations.length;r++){const l=this.animations[r];o.animations.push(s(t.animations,l))}}if(e){const r=a(t.geometries),l=a(t.materials),h=a(t.textures),u=a(t.images),c=a(t.shapes),f=a(t.skeletons),p=a(t.animations),g=a(t.nodes);r.length>0&&(n.geometries=r),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),u.length>0&&(n.images=u),c.length>0&&(n.shapes=c),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=o,n;function a(r){const l=[];for(const h in r){const u=r[h];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const o=t.children[n];this.add(o.clone())}return this}}ze.DEFAULT_UP=new A(0,1,0);ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new A,Mn=new A,Vs=new A,En=new A,Pi=new A,Di=new A,el=new A,Gs=new A,Ws=new A,Xs=new A,Ys=new ue,qs=new ue,$s=new ue;class hn{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,o){o.subVectors(n,e),un.subVectors(t,e),o.cross(un);const s=o.lengthSq();return s>0?o.multiplyScalar(1/Math.sqrt(s)):o.set(0,0,0)}static getBarycoord(t,e,n,o,s){un.subVectors(o,e),Mn.subVectors(n,e),Vs.subVectors(t,e);const a=un.dot(un),r=un.dot(Mn),l=un.dot(Vs),h=Mn.dot(Mn),u=Mn.dot(Vs),c=a*h-r*r;if(c===0)return s.set(0,0,0),null;const f=1/c,p=(h*l-r*u)*f,g=(a*u-r*l)*f;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,o){return this.getBarycoord(t,e,n,o,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(t,e,n,o,s,a,r,l){return this.getBarycoord(t,e,n,o,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,En.x),l.addScaledVector(a,En.y),l.addScaledVector(r,En.z),l)}static getInterpolatedAttribute(t,e,n,o,s,a){return Ys.setScalar(0),qs.setScalar(0),$s.setScalar(0),Ys.fromBufferAttribute(t,e),qs.fromBufferAttribute(t,n),$s.fromBufferAttribute(t,o),a.setScalar(0),a.addScaledVector(Ys,s.x),a.addScaledVector(qs,s.y),a.addScaledVector($s,s.z),a}static isFrontFacing(t,e,n,o){return un.subVectors(n,e),Mn.subVectors(t,e),un.cross(Mn).dot(o)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,o){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[o]),this}setFromAttributeAndIndices(t,e,n,o){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,o),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),un.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,o,s){return hn.getInterpolation(t,this.a,this.b,this.c,e,n,o,s)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,o=this.b,s=this.c;let a,r;Pi.subVectors(o,n),Di.subVectors(s,n),Gs.subVectors(t,n);const l=Pi.dot(Gs),h=Di.dot(Gs);if(l<=0&&h<=0)return e.copy(n);Ws.subVectors(t,o);const u=Pi.dot(Ws),c=Di.dot(Ws);if(u>=0&&c<=u)return e.copy(o);const f=l*c-u*h;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(Pi,a);Xs.subVectors(t,s);const p=Pi.dot(Xs),g=Di.dot(Xs);if(g>=0&&p<=g)return e.copy(s);const v=p*h-l*g;if(v<=0&&h>=0&&g<=0)return r=h/(h-g),e.copy(n).addScaledVector(Di,r);const m=u*g-p*c;if(m<=0&&c-u>=0&&p-g>=0)return el.subVectors(s,o),r=(c-u)/(c-u+(p-g)),e.copy(o).addScaledVector(el,r);const d=1/(m+v+f);return a=v*d,r=f*d,e.copy(n).addScaledVector(Pi,a).addScaledVector(Di,r)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const pc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Xo={h:0,s:0,l:0};function js(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class St{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const o=t;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=on){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,o=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,o),this}setHSL(t,e,n,o=qt.workingColorSpace){if(t=gr(t,1),e=Ie(e,0,1),n=Ie(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=js(a,s,t+1/3),this.g=js(a,s,t),this.b=js(a,s,t-1/3)}return qt.toWorkingColorSpace(this,o),this}setStyle(t,e=on){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=o[1],r=o[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=o[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=on){const n=pc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ln(t.r),this.g=Ln(t.g),this.b=Ln(t.b),this}copyLinearToSRGB(t){return this.r=Vi(t.r),this.g=Vi(t.g),this.b=Vi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=on){return qt.fromWorkingColorSpace(Le.copy(this),t),Math.round(Ie(Le.r*255,0,255))*65536+Math.round(Ie(Le.g*255,0,255))*256+Math.round(Ie(Le.b*255,0,255))}getHexString(t=on){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(Le.copy(this),e);const n=Le.r,o=Le.g,s=Le.b,a=Math.max(n,o,s),r=Math.min(n,o,s);let l,h;const u=(r+a)/2;if(r===a)l=0,h=0;else{const c=a-r;switch(h=u<=.5?c/(a+r):c/(2-a-r),a){case n:l=(o-s)/c+(o<s?6:0);break;case o:l=(s-n)/c+2;break;case s:l=(n-o)/c+4;break}l/=6}return t.h=l,t.s=h,t.l=u,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(Le.copy(this),e),t.r=Le.r,t.g=Le.g,t.b=Le.b,t}getStyle(t=on){qt.fromWorkingColorSpace(Le.copy(this),t);const e=Le.r,n=Le.g,o=Le.b;return t!==on?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(o*255)})`}offsetHSL(t,e,n){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(Xo);const n=Mo(Vn.h,Xo.h,e),o=Mo(Vn.s,Xo.s,e),s=Mo(Vn.l,Xo.l,e);return this.setHSL(n,o,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,o=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*o,this.g=s[1]*e+s[4]*n+s[7]*o,this.b=s[2]*e+s[5]*n+s[8]*o,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Le=new St;St.NAMES=pc;let Ch=0;class eo extends _i{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=to(),this.name="",this.blending=qe,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fa,this.blendDst=pa,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new St(0,0,0),this.blendAlpha=0,this.depthFunc=Yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Or,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mi,this.stencilZFail=Mi,this.stencilZPass=Mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const o=this[e];if(o===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(n):o&&o.isVector3&&n&&n.isVector3?o.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==qe&&(n.blending=this.blending),this.side!==jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fa&&(n.blendSrc=this.blendSrc),this.blendDst!==pa&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Yi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Or&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function o(s){const a=[];for(const r in s){const l=s[r];delete l.metadata,a.push(l)}return a}if(e){const s=o(t.textures),a=o(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const o=e.length;n=new Array(o);for(let s=0;s!==o;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class vr extends eo{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=Zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new A,Yo=new Ot;class At{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Br,this.updateRanges=[],this.gpuType=Ae,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let o=0,s=this.itemSize;o<s;o++)this.array[t+o]=e.array[n+o];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Yo.fromBufferAttribute(this,e),Yo.applyMatrix3(t),this.setXY(e,Yo.x,Yo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ni(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ni(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ni(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ni(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ni(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,o){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),o=Ne(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=o,this}setXYZW(t,e,n,o,s){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),o=Ne(o,this.array),s=Ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=o,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Br&&(t.usage=this.usage),t}}class mc extends At{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class gc extends At{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Fe extends At{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Rh=0;const en=new pe,Ks=new ze,Li=new A,Ke=new Do,co=new Do,Te=new A;class de extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=to(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(uc(t)?gc:mc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ut().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(en),this}lookAt(t){return Ks.lookAt(t),Ks.updateMatrix(),this.applyMatrix4(Ks.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Li).negate(),this.translate(Li.x,Li.y,Li.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let o=0,s=t.length;o<s;o++){const a=t[o];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Fe(n,3))}else{for(let n=0,o=e.count;n<o;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Do);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,o=e.length;n<o;n++){const s=e[n];Ke.setFromBufferAttribute(s),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const r=e[s];co.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(Ke.min,co.min),Ke.expandByPoint(Te),Te.addVectors(Ke.max,co.max),Ke.expandByPoint(Te)):(Ke.expandByPoint(co.min),Ke.expandByPoint(co.max))}Ke.getCenter(n);let o=0;for(let s=0,a=t.count;s<a;s++)Te.fromBufferAttribute(t,s),o=Math.max(o,n.distanceToSquared(Te));if(e)for(let s=0,a=e.length;s<a;s++){const r=e[s],l=this.morphTargetsRelative;for(let h=0,u=r.count;h<u;h++)Te.fromBufferAttribute(r,h),l&&(Li.fromBufferAttribute(t,h),Te.add(Li)),o=Math.max(o,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,o=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new At(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),r=[],l=[];for(let U=0;U<n.count;U++)r[U]=new A,l[U]=new A;const h=new A,u=new A,c=new A,f=new Ot,p=new Ot,g=new Ot,v=new A,m=new A;function d(U,T,M){h.fromBufferAttribute(n,U),u.fromBufferAttribute(n,T),c.fromBufferAttribute(n,M),f.fromBufferAttribute(s,U),p.fromBufferAttribute(s,T),g.fromBufferAttribute(s,M),u.sub(h),c.sub(h),p.sub(f),g.sub(f);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(c,-p.y).multiplyScalar(R),m.copy(c).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),r[U].add(v),r[T].add(v),r[M].add(v),l[U].add(m),l[T].add(m),l[M].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let U=0,T=x.length;U<T;++U){const M=x[U],R=M.start,V=M.count;for(let k=R,$=R+V;k<$;k+=3)d(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const E=new A,S=new A,D=new A,C=new A;function w(U){D.fromBufferAttribute(o,U),C.copy(D);const T=r[U];E.copy(T),E.sub(D.multiplyScalar(D.dot(T))).normalize(),S.crossVectors(C,T);const R=S.dot(l[U])<0?-1:1;a.setXYZW(U,E.x,E.y,E.z,R)}for(let U=0,T=x.length;U<T;++U){const M=x[U],R=M.start,V=M.count;for(let k=R,$=R+V;k<$;k+=3)w(t.getX(k+0)),w(t.getX(k+1)),w(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new At(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const o=new A,s=new A,a=new A,r=new A,l=new A,h=new A,u=new A,c=new A;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);o.fromBufferAttribute(e,g),s.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),u.subVectors(a,s),c.subVectors(o,s),u.cross(c),r.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,m),r.add(u),l.add(u),h.add(u),n.setXYZ(g,r.x,r.y,r.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let f=0,p=e.count;f<p;f+=3)o.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,s),c.subVectors(o,s),u.cross(c),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(r,l){const h=r.array,u=r.itemSize,c=r.normalized,f=new h.constructor(l.length*u);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){r.isInterleavedBufferAttribute?p=l[v]*r.data.stride+r.offset:p=l[v]*u;for(let d=0;d<u;d++)f[g++]=h[p++]}return new At(f,u,c)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new de,n=this.index.array,o=this.attributes;for(const r in o){const l=o[r],h=t(l,n);e.setAttribute(r,h)}const s=this.morphAttributes;for(const r in s){const l=[],h=s[r];for(let u=0,c=h.length;u<c;u++){const f=h[u],p=t(f,n);l.push(p)}e.morphAttributes[r]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let r=0,l=a.length;r<l;r++){const h=a[r];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const h=n[l];t.data.attributes[l]=h.toJSON(t.data)}const o={};let s=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],u=[];for(let c=0,f=h.length;c<f;c++){const p=h[c];u.push(p.toJSON(t.data))}u.length>0&&(o[l]=u,s=!0)}s&&(t.data.morphAttributes=o,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const r=this.boundingSphere;return r!==null&&(t.data.boundingSphere={center:r.center.toArray(),radius:r.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const o=t.attributes;for(const h in o){const u=o[h];this.setAttribute(h,u.clone(e))}const s=t.morphAttributes;for(const h in s){const u=[],c=s[h];for(let f=0,p=c.length;f<p;f++)u.push(c[f].clone(e));this.morphAttributes[h]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,u=a.length;h<u;h++){const c=a[h];this.addGroup(c.start,c.count,c.materialIndex)}const r=t.boundingBox;r!==null&&(this.boundingBox=r.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nl=new pe,ti=new bs,qo=new Lo,il=new A,$o=new A,jo=new A,Ko=new A,Zs=new A,Zo=new A,ol=new A,Jo=new A;class Je extends ze{constructor(t=new de,e=new vr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const o=e[n[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=o.length;s<a;s++){const r=o[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=s}}}}getVertexPosition(t,e){const n=this.geometry,o=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(o,t);const r=this.morphTargetInfluences;if(s&&r){Zo.set(0,0,0);for(let l=0,h=s.length;l<h;l++){const u=r[l],c=s[l];u!==0&&(Zs.fromBufferAttribute(c,t),a?Zo.addScaledVector(Zs,u):Zo.addScaledVector(Zs.sub(e),u))}e.add(Zo)}return e}raycast(t,e){const n=this.geometry,o=this.material,s=this.matrixWorld;o!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qo.copy(n.boundingSphere),qo.applyMatrix4(s),ti.copy(t.ray).recast(t.near),!(qo.containsPoint(ti.origin)===!1&&(ti.intersectSphere(qo,il)===null||ti.origin.distanceToSquared(il)>(t.far-t.near)**2))&&(nl.copy(s).invert(),ti.copy(t.ray).applyMatrix4(nl),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ti)))}_computeIntersections(t,e,n){let o;const s=this.geometry,a=this.material,r=s.index,l=s.attributes.position,h=s.attributes.uv,u=s.attributes.uv1,c=s.attributes.normal,f=s.groups,p=s.drawRange;if(r!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=a[m.materialIndex],x=Math.max(m.start,p.start),E=Math.min(r.count,Math.min(m.start+m.count,p.start+p.count));for(let S=x,D=E;S<D;S+=3){const C=r.getX(S),w=r.getX(S+1),U=r.getX(S+2);o=Qo(this,d,t,n,h,u,c,C,w,U),o&&(o.faceIndex=Math.floor(S/3),o.face.materialIndex=m.materialIndex,e.push(o))}}else{const g=Math.max(0,p.start),v=Math.min(r.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const x=r.getX(m),E=r.getX(m+1),S=r.getX(m+2);o=Qo(this,a,t,n,h,u,c,x,E,S),o&&(o.faceIndex=Math.floor(m/3),e.push(o))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=a[m.materialIndex],x=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=x,D=E;S<D;S+=3){const C=S,w=S+1,U=S+2;o=Qo(this,d,t,n,h,u,c,C,w,U),o&&(o.faceIndex=Math.floor(S/3),o.face.materialIndex=m.materialIndex,e.push(o))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const x=m,E=m+1,S=m+2;o=Qo(this,a,t,n,h,u,c,x,E,S),o&&(o.faceIndex=Math.floor(m/3),e.push(o))}}}}function Ph(i,t,e,n,o,s,a,r){let l;if(t.side===Ye?l=n.intersectTriangle(a,s,o,!0,r):l=n.intersectTriangle(o,s,a,t.side===jn,r),l===null)return null;Jo.copy(r),Jo.applyMatrix4(i.matrixWorld);const h=e.ray.origin.distanceTo(Jo);return h<e.near||h>e.far?null:{distance:h,point:Jo.clone(),object:i}}function Qo(i,t,e,n,o,s,a,r,l,h){i.getVertexPosition(r,$o),i.getVertexPosition(l,jo),i.getVertexPosition(h,Ko);const u=Ph(i,t,e,n,$o,jo,Ko,ol);if(u){const c=new A;hn.getBarycoord(ol,$o,jo,Ko,c),o&&(u.uv=hn.getInterpolatedAttribute(o,r,l,h,c,new Ot)),s&&(u.uv1=hn.getInterpolatedAttribute(s,r,l,h,c,new Ot)),a&&(u.normal=hn.getInterpolatedAttribute(a,r,l,h,c,new A),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:r,b:l,c:h,normal:new A,materialIndex:0};hn.getNormal($o,jo,Ko,f.normal),u.face=f,u.barycoord=c}return u}class Io extends de{constructor(t=1,e=1,n=1,o=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:o,heightSegments:s,depthSegments:a};const r=this;o=Math.floor(o),s=Math.floor(s),a=Math.floor(a);const l=[],h=[],u=[],c=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,o,a,2),g("x","z","y",1,-1,t,n,-e,o,a,3),g("x","y","z",1,-1,t,e,n,o,s,4),g("x","y","z",-1,-1,t,e,-n,o,s,5),this.setIndex(l),this.setAttribute("position",new Fe(h,3)),this.setAttribute("normal",new Fe(u,3)),this.setAttribute("uv",new Fe(c,2));function g(v,m,d,x,E,S,D,C,w,U,T){const M=S/w,R=D/U,V=S/2,k=D/2,$=C/2,j=w+1,X=U+1;let Z=0,H=0;const st=new A;for(let ht=0;ht<X;ht++){const Mt=ht*R-k;for(let kt=0;kt<j;kt++){const oe=kt*M-V;st[v]=oe*x,st[m]=Mt*E,st[d]=$,h.push(st.x,st.y,st.z),st[v]=0,st[m]=0,st[d]=C>0?1:-1,u.push(st.x,st.y,st.z),c.push(kt/w),c.push(1-ht/U),Z+=1}}for(let ht=0;ht<U;ht++)for(let Mt=0;Mt<w;Mt++){const kt=f+Mt+j*ht,oe=f+Mt+j*(ht+1),W=f+(Mt+1)+j*(ht+1),nt=f+(Mt+1)+j*ht;l.push(kt,oe,nt),l.push(oe,W,nt),H+=6}r.addGroup(p,H,T),p+=H,f+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Io(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Zi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const o=i[e][n];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=o.clone():Array.isArray(o)?t[e][n]=o.slice():t[e][n]=o}}return t}function Oe(i){const t={};for(let e=0;e<i.length;e++){const n=Zi(i[e]);for(const o in n)t[o]=n[o]}return t}function Dh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function vc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const _c={clone:Zi,merge:Oe};var Lh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ih=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Se extends eo{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lh,this.fragmentShader=Ih,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zi(t.uniforms),this.uniformsGroups=Dh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const o in this.uniforms){const a=this.uniforms[o].value;a&&a.isTexture?e.uniforms[o]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[o]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[o]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[o]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[o]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[o]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[o]={type:"m4",value:a.toArray()}:e.uniforms[o]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const o in this.extensions)this.extensions[o]===!0&&(n[o]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class xc extends ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=Cn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Gn=new A,sl=new Ot,al=new Ot;class sn extends xc{constructor(t=50,e=1,n=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=o,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ao*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(So*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ao*2*Math.atan(Math.tan(So*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Gn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z),Gn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z)}getViewSize(t,e){return this.getViewBounds(t,sl,al),e.subVectors(al,sl)}setViewOffset(t,e,n,o,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=o,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(So*.5*this.fov)/this.zoom,n=2*e,o=this.aspect*n,s=-.5*o;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;s+=a.offsetX*o/l,e-=a.offsetY*n/h,o*=a.width/l,n*=a.height/h}const r=this.filmOffset;r!==0&&(s+=t*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+o,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ii=-90,Ui=1;class Uh extends ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new sn(Ii,Ui,t,e);o.layers=this.layers,this.add(o);const s=new sn(Ii,Ui,t,e);s.layers=this.layers,this.add(s);const a=new sn(Ii,Ui,t,e);a.layers=this.layers,this.add(a);const r=new sn(Ii,Ui,t,e);r.layers=this.layers,this.add(r);const l=new sn(Ii,Ui,t,e);l.layers=this.layers,this.add(l);const h=new sn(Ii,Ui,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,o,s,a,r,l]=e;for(const h of e)this.remove(h);if(t===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),r.up.set(0,1,0),r.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_s)n.up.set(0,-1,0),n.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),r.up.set(0,-1,0),r.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:o}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,r,l,h,u]=this.children,c=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,o),t.render(e,s),t.setRenderTarget(n,1,o),t.render(e,a),t.setRenderTarget(n,2,o),t.render(e,r),t.setRenderTarget(n,3,o),t.render(e,l),t.setRenderTarget(n,4,o),t.render(e,h),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,o),t.render(e,u),t.setRenderTarget(c,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class yc extends ke{constructor(t,e,n,o,s,a,r,l,h,u){t=t!==void 0?t:[],e=e!==void 0?e:qi,super(t,e,n,o,s,a,r,l,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Fh extends gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},o=[n,n,n,n,n,n];this.texture=new yc(o,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:pn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new Io(5,5,5),s=new Se({name:"CubemapFromEquirect",uniforms:Zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:Dn});s.uniforms.tEquirect.value=e;const a=new Je(o,s),r=e.minFilter;return e.minFilter===fi&&(e.minFilter=pn),new Uh(1,10,this).update(t,a),e.minFilter=r,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,o){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,o);t.setRenderTarget(s)}}const Js=new A,Nh=new A,Oh=new Ut;class Wn{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,o){return this.normal.set(t,e,n),this.constant=o,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const o=Js.subVectors(n,e).cross(Nh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(o,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Js),o=this.normal.dot(n);if(o===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/o;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Oh.getNormalMatrix(t),o=this.coplanarPoint(Js).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-o.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new Lo,ts=new A;class Sc{constructor(t=new Wn,e=new Wn,n=new Wn,o=new Wn,s=new Wn,a=new Wn){this.planes=[t,e,n,o,s,a]}set(t,e,n,o,s,a){const r=this.planes;return r[0].copy(t),r[1].copy(e),r[2].copy(n),r[3].copy(o),r[4].copy(s),r[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Cn){const n=this.planes,o=t.elements,s=o[0],a=o[1],r=o[2],l=o[3],h=o[4],u=o[5],c=o[6],f=o[7],p=o[8],g=o[9],v=o[10],m=o[11],d=o[12],x=o[13],E=o[14],S=o[15];if(n[0].setComponents(l-s,f-h,m-p,S-d).normalize(),n[1].setComponents(l+s,f+h,m+p,S+d).normalize(),n[2].setComponents(l+a,f+u,m+g,S+x).normalize(),n[3].setComponents(l-a,f-u,m-g,S-x).normalize(),n[4].setComponents(l-r,f-c,m-v,S-E).normalize(),e===Cn)n[5].setComponents(l+r,f+c,m+v,S+E).normalize();else if(e===_s)n[5].setComponents(r,c,v,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(t){return ei.center.set(0,0,0),ei.radius=.7071067811865476,ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(t){const e=this.planes,n=t.center,o=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<o)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const o=e[n];if(ts.x=o.normal.x>0?t.max.x:t.min.x,ts.y=o.normal.y>0?t.max.y:t.min.y,ts.z=o.normal.z>0?t.max.z:t.min.z,o.distanceToPoint(ts)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Mc(){let i=null,t=!1,e=null,n=null;function o(s,a){e(s,a),n=i.requestAnimationFrame(o)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(o),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Bh(i){const t=new WeakMap;function e(r,l){const h=r.array,u=r.usage,c=h.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,h,u),r.onUploadCallback();let p;if(h instanceof Float32Array)p=i.FLOAT;else if(h instanceof Uint16Array)r.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)p=i.SHORT;else if(h instanceof Uint32Array)p=i.UNSIGNED_INT;else if(h instanceof Int32Array)p=i.INT;else if(h instanceof Int8Array)p=i.BYTE;else if(h instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:f,type:p,bytesPerElement:h.BYTES_PER_ELEMENT,version:r.version,size:c}}function n(r,l,h){const u=l.array,c=l.updateRanges;if(i.bindBuffer(h,r),c.length===0)i.bufferSubData(h,0,u);else{c.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<c.length;p++){const g=c[f],v=c[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,c[f]=v)}c.length=f+1;for(let p=0,g=c.length;p<g;p++){const v=c[p];i.bufferSubData(h,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function o(r){return r.isInterleavedBufferAttribute&&(r=r.data),t.get(r)}function s(r){r.isInterleavedBufferAttribute&&(r=r.data);const l=t.get(r);l&&(i.deleteBuffer(l.buffer),t.delete(r))}function a(r,l){if(r.isInterleavedBufferAttribute&&(r=r.data),r.isGLBufferAttribute){const u=t.get(r);(!u||u.version<r.version)&&t.set(r,{buffer:r.buffer,type:r.type,bytesPerElement:r.elementSize,version:r.version});return}const h=t.get(r);if(h===void 0)t.set(r,e(r,l));else if(h.version<r.version){if(h.size!==r.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,r,l),h.version=r.version}}return{get:o,remove:s,update:a}}class no extends de{constructor(t=1,e=1,n=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:o};const s=t/2,a=e/2,r=Math.floor(n),l=Math.floor(o),h=r+1,u=l+1,c=t/r,f=e/l,p=[],g=[],v=[],m=[];for(let d=0;d<u;d++){const x=d*f-a;for(let E=0;E<h;E++){const S=E*c-s;g.push(S,-x,0),v.push(0,0,1),m.push(E/r),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let x=0;x<r;x++){const E=x+h*d,S=x+h*(d+1),D=x+1+h*(d+1),C=x+1+h*d;p.push(E,S,C),p.push(S,D,C)}this.setIndex(p),this.setAttribute("position",new Fe(g,3)),this.setAttribute("normal",new Fe(v,3)),this.setAttribute("uv",new Fe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new no(t.width,t.height,t.widthSegments,t.heightSegments)}}var kh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Hh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Yh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,$h=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Jh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,od=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ld=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ud=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,hd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,md="gl_FragColor = linearToOutputTexel( gl_FragColor );",gd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,_d=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,yd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Md=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ed=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Td=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ad=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,wd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Dd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ld=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Id=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ud=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Od=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Bd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,zd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$d=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ef=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,of=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,af=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,df=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ff=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_f=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Mf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ef=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Tf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Af=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Rf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Df=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,If=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Uf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Bf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Yf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$f=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,tp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,np=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ip=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,op=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ap=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,up=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,pp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,vp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_p=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Nt={alphahash_fragment:kh,alphahash_pars_fragment:zh,alphamap_fragment:Hh,alphamap_pars_fragment:Vh,alphatest_fragment:Gh,alphatest_pars_fragment:Wh,aomap_fragment:Xh,aomap_pars_fragment:Yh,batching_pars_vertex:qh,batching_vertex:$h,begin_vertex:jh,beginnormal_vertex:Kh,bsdfs:Zh,iridescence_fragment:Jh,bumpmap_pars_fragment:Qh,clipping_planes_fragment:td,clipping_planes_pars_fragment:ed,clipping_planes_pars_vertex:nd,clipping_planes_vertex:id,color_fragment:od,color_pars_fragment:sd,color_pars_vertex:ad,color_vertex:rd,common:ld,cube_uv_reflection_fragment:cd,defaultnormal_vertex:ud,displacementmap_pars_vertex:hd,displacementmap_vertex:dd,emissivemap_fragment:fd,emissivemap_pars_fragment:pd,colorspace_fragment:md,colorspace_pars_fragment:gd,envmap_fragment:vd,envmap_common_pars_fragment:_d,envmap_pars_fragment:xd,envmap_pars_vertex:yd,envmap_physical_pars_fragment:Dd,envmap_vertex:Sd,fog_vertex:Md,fog_pars_vertex:Ed,fog_fragment:Td,fog_pars_fragment:bd,gradientmap_pars_fragment:Ad,lightmap_pars_fragment:wd,lights_lambert_fragment:Cd,lights_lambert_pars_fragment:Rd,lights_pars_begin:Pd,lights_toon_fragment:Ld,lights_toon_pars_fragment:Id,lights_phong_fragment:Ud,lights_phong_pars_fragment:Fd,lights_physical_fragment:Nd,lights_physical_pars_fragment:Od,lights_fragment_begin:Bd,lights_fragment_maps:kd,lights_fragment_end:zd,logdepthbuf_fragment:Hd,logdepthbuf_pars_fragment:Vd,logdepthbuf_pars_vertex:Gd,logdepthbuf_vertex:Wd,map_fragment:Xd,map_pars_fragment:Yd,map_particle_fragment:qd,map_particle_pars_fragment:$d,metalnessmap_fragment:jd,metalnessmap_pars_fragment:Kd,morphinstance_vertex:Zd,morphcolor_vertex:Jd,morphnormal_vertex:Qd,morphtarget_pars_vertex:tf,morphtarget_vertex:ef,normal_fragment_begin:nf,normal_fragment_maps:of,normal_pars_fragment:sf,normal_pars_vertex:af,normal_vertex:rf,normalmap_pars_fragment:lf,clearcoat_normal_fragment_begin:cf,clearcoat_normal_fragment_maps:uf,clearcoat_pars_fragment:hf,iridescence_pars_fragment:df,opaque_fragment:ff,packing:pf,premultiplied_alpha_fragment:mf,project_vertex:gf,dithering_fragment:vf,dithering_pars_fragment:_f,roughnessmap_fragment:xf,roughnessmap_pars_fragment:yf,shadowmap_pars_fragment:Sf,shadowmap_pars_vertex:Mf,shadowmap_vertex:Ef,shadowmask_pars_fragment:Tf,skinbase_vertex:bf,skinning_pars_vertex:Af,skinning_vertex:wf,skinnormal_vertex:Cf,specularmap_fragment:Rf,specularmap_pars_fragment:Pf,tonemapping_fragment:Df,tonemapping_pars_fragment:Lf,transmission_fragment:If,transmission_pars_fragment:Uf,uv_pars_fragment:Ff,uv_pars_vertex:Nf,uv_vertex:Of,worldpos_vertex:Bf,background_vert:kf,background_frag:zf,backgroundCube_vert:Hf,backgroundCube_frag:Vf,cube_vert:Gf,cube_frag:Wf,depth_vert:Xf,depth_frag:Yf,distanceRGBA_vert:qf,distanceRGBA_frag:$f,equirect_vert:jf,equirect_frag:Kf,linedashed_vert:Zf,linedashed_frag:Jf,meshbasic_vert:Qf,meshbasic_frag:tp,meshlambert_vert:ep,meshlambert_frag:np,meshmatcap_vert:ip,meshmatcap_frag:op,meshnormal_vert:sp,meshnormal_frag:ap,meshphong_vert:rp,meshphong_frag:lp,meshphysical_vert:cp,meshphysical_frag:up,meshtoon_vert:hp,meshtoon_frag:dp,points_vert:fp,points_frag:pp,shadow_vert:mp,shadow_frag:gp,sprite_vert:vp,sprite_frag:_p},it={common:{diffuse:{value:new St(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new St(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new St(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new St(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},fn={basic:{uniforms:Oe([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:Oe([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new St(0)}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:Oe([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new St(0)},specular:{value:new St(1118481)},shininess:{value:30}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:Oe([it.common,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.roughnessmap,it.metalnessmap,it.fog,it.lights,{emissive:{value:new St(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:Oe([it.common,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.gradientmap,it.fog,it.lights,{emissive:{value:new St(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:Oe([it.common,it.bumpmap,it.normalmap,it.displacementmap,it.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:Oe([it.points,it.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:Oe([it.common,it.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:Oe([it.common,it.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:Oe([it.common,it.bumpmap,it.normalmap,it.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:Oe([it.sprite,it.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distanceRGBA:{uniforms:Oe([it.common,it.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distanceRGBA_vert,fragmentShader:Nt.distanceRGBA_frag},shadow:{uniforms:Oe([it.lights,it.fog,{color:{value:new St(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};fn.physical={uniforms:Oe([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new St(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new St(0)},specularColor:{value:new St(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};const es={r:0,b:0,g:0},ni=new Fn,xp=new pe;function yp(i,t,e,n,o,s,a){const r=new St(0);let l=s===!0?0:1,h,u,c=null,f=0,p=null;function g(x){let E=x.isScene===!0?x.background:null;return E&&E.isTexture&&(E=(x.backgroundBlurriness>0?e:t).get(E)),E}function v(x){let E=!1;const S=g(x);S===null?d(r,l):S&&S.isColor&&(d(S,1),E=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(x,E){const S=g(E);S&&(S.isCubeTexture||S.mapping===Es)?(u===void 0&&(u=new Je(new Io(1,1,1),new Se({name:"BackgroundCubeMaterial",uniforms:Zi(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,C,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(u)),ni.copy(E.backgroundRotation),ni.x*=-1,ni.y*=-1,ni.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(xp.makeRotationFromEuler(ni)),u.material.toneMapped=qt.getTransfer(S.colorSpace)!==ee,(c!==S||f!==S.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,c=S,f=S.version,p=i.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(h===void 0&&(h=new Je(new no(2,2),new Se({name:"BackgroundMaterial",uniforms:Zi(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(h)),h.material.uniforms.t2D.value=S,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.toneMapped=qt.getTransfer(S.colorSpace)!==ee,S.matrixAutoUpdate===!0&&S.updateMatrix(),h.material.uniforms.uvTransform.value.copy(S.matrix),(c!==S||f!==S.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,c=S,f=S.version,p=i.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null))}function d(x,E){x.getRGB(es,vc(i)),n.buffers.color.setClear(es.r,es.g,es.b,E,a)}return{getClearColor:function(){return r},setClearColor:function(x,E=1){r.set(x),l=E,d(r,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,d(r,l)},render:v,addToRenderList:m}}function Sp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},o=f(null);let s=o,a=!1;function r(M,R,V,k,$){let j=!1;const X=c(k,V,R);s!==X&&(s=X,h(s.object)),j=p(M,k,V,$),j&&g(M,k,V,$),$!==null&&t.update($,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,S(M,R,V,k),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function l(){return i.createVertexArray()}function h(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function c(M,R,V){const k=V.wireframe===!0;let $=n[M.id];$===void 0&&($={},n[M.id]=$);let j=$[R.id];j===void 0&&(j={},$[R.id]=j);let X=j[k];return X===void 0&&(X=f(l()),j[k]=X),X}function f(M){const R=[],V=[],k=[];for(let $=0;$<e;$++)R[$]=0,V[$]=0,k[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:V,attributeDivisors:k,object:M,attributes:{},index:null}}function p(M,R,V,k){const $=s.attributes,j=R.attributes;let X=0;const Z=V.getAttributes();for(const H in Z)if(Z[H].location>=0){const ht=$[H];let Mt=j[H];if(Mt===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(Mt=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(Mt=M.instanceColor)),ht===void 0||ht.attribute!==Mt||Mt&&ht.data!==Mt.data)return!0;X++}return s.attributesNum!==X||s.index!==k}function g(M,R,V,k){const $={},j=R.attributes;let X=0;const Z=V.getAttributes();for(const H in Z)if(Z[H].location>=0){let ht=j[H];ht===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor));const Mt={};Mt.attribute=ht,ht&&ht.data&&(Mt.data=ht.data),$[H]=Mt,X++}s.attributes=$,s.attributesNum=X,s.index=k}function v(){const M=s.newAttributes;for(let R=0,V=M.length;R<V;R++)M[R]=0}function m(M){d(M,0)}function d(M,R){const V=s.newAttributes,k=s.enabledAttributes,$=s.attributeDivisors;V[M]=1,k[M]===0&&(i.enableVertexAttribArray(M),k[M]=1),$[M]!==R&&(i.vertexAttribDivisor(M,R),$[M]=R)}function x(){const M=s.newAttributes,R=s.enabledAttributes;for(let V=0,k=R.length;V<k;V++)R[V]!==M[V]&&(i.disableVertexAttribArray(V),R[V]=0)}function E(M,R,V,k,$,j,X){X===!0?i.vertexAttribIPointer(M,R,V,$,j):i.vertexAttribPointer(M,R,V,k,$,j)}function S(M,R,V,k){v();const $=k.attributes,j=V.getAttributes(),X=R.defaultAttributeValues;for(const Z in j){const H=j[Z];if(H.location>=0){let st=$[Z];if(st===void 0&&(Z==="instanceMatrix"&&M.instanceMatrix&&(st=M.instanceMatrix),Z==="instanceColor"&&M.instanceColor&&(st=M.instanceColor)),st!==void 0){const ht=st.normalized,Mt=st.itemSize,kt=t.get(st);if(kt===void 0)continue;const oe=kt.buffer,W=kt.type,nt=kt.bytesPerElement,_t=W===i.INT||W===i.UNSIGNED_INT||st.gpuType===ur;if(st.isInterleavedBufferAttribute){const at=st.data,Ct=at.stride,Dt=st.offset;if(at.isInstancedInterleavedBuffer){for(let zt=0;zt<H.locationSize;zt++)d(H.location+zt,at.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let zt=0;zt<H.locationSize;zt++)m(H.location+zt);i.bindBuffer(i.ARRAY_BUFFER,oe);for(let zt=0;zt<H.locationSize;zt++)E(H.location+zt,Mt/H.locationSize,W,ht,Ct*nt,(Dt+Mt/H.locationSize*zt)*nt,_t)}else{if(st.isInstancedBufferAttribute){for(let at=0;at<H.locationSize;at++)d(H.location+at,st.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let at=0;at<H.locationSize;at++)m(H.location+at);i.bindBuffer(i.ARRAY_BUFFER,oe);for(let at=0;at<H.locationSize;at++)E(H.location+at,Mt/H.locationSize,W,ht,Mt*nt,Mt/H.locationSize*at*nt,_t)}}else if(X!==void 0){const ht=X[Z];if(ht!==void 0)switch(ht.length){case 2:i.vertexAttrib2fv(H.location,ht);break;case 3:i.vertexAttrib3fv(H.location,ht);break;case 4:i.vertexAttrib4fv(H.location,ht);break;default:i.vertexAttrib1fv(H.location,ht)}}}}x()}function D(){U();for(const M in n){const R=n[M];for(const V in R){const k=R[V];for(const $ in k)u(k[$].object),delete k[$];delete R[V]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;const R=n[M.id];for(const V in R){const k=R[V];for(const $ in k)u(k[$].object),delete k[$];delete R[V]}delete n[M.id]}function w(M){for(const R in n){const V=n[R];if(V[M.id]===void 0)continue;const k=V[M.id];for(const $ in k)u(k[$].object),delete k[$];delete V[M.id]}}function U(){T(),a=!0,s!==o&&(s=o,h(s.object))}function T(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:r,reset:U,resetDefaultState:T,dispose:D,releaseStatesOfGeometry:C,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function Mp(i,t,e){let n;function o(h){n=h}function s(h,u){i.drawArrays(n,h,u),e.update(u,n,1)}function a(h,u,c){c!==0&&(i.drawArraysInstanced(n,h,u,c),e.update(u,n,c))}function r(h,u,c){if(c===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,u,0,c);let p=0;for(let g=0;g<c;g++)p+=u[g];e.update(p,n,1)}function l(h,u,c,f){if(c===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<h.length;g++)a(h[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,h,0,u,0,f,0,c);let g=0;for(let v=0;v<c;v++)g+=u[v]*f[v];e.update(g,n,1)}}this.setMode=o,this.render=s,this.renderInstances=a,this.renderMultiDraw=r,this.renderMultiDrawInstances=l}function Ep(i,t,e,n){let o;function s(){if(o!==void 0)return o;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");o=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function a(w){return!(w!==ye&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function r(w){const U=w===Ji&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Un&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Ae&&!U)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const u=l(h);u!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);const c=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:r,precision:h,logarithmicDepthBuffer:c,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:x,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:D,maxSamples:C}}function Tp(i){const t=this;let e=null,n=0,o=!1,s=!1;const a=new Wn,r=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(c,f){const p=c.length!==0||f||n!==0||o;return o=f,n=c.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(c,f){e=u(c,f,0)},this.setState=function(c,f,p){const g=c.clippingPlanes,v=c.clipIntersection,m=c.clipShadows,d=i.get(c);if(!o||g===null||g.length===0||s&&!m)s?u(null):h();else{const x=s?0:n,E=x*4;let S=d.clippingState||null;l.value=S,S=u(g,f,E,p);for(let D=0;D!==E;++D)S[D]=e[D];d.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(c,f,p,g){const v=c!==null?c.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const d=p+v*4,x=f.matrixWorldInverse;r.getNormalMatrix(x),(m===null||m.length<d)&&(m=new Float32Array(d));for(let E=0,S=p;E!==v;++E,S+=4)a.copy(c[E]).applyMatrix4(x,r),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function bp(i){let t=new WeakMap;function e(a,r){return r===Ma?a.mapping=qi:r===Ea&&(a.mapping=$i),a}function n(a){if(a&&a.isTexture){const r=a.mapping;if(r===Ma||r===Ea)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new Fh(l.height);return h.fromEquirectangularTexture(i,a),t.set(a,h),a.addEventListener("dispose",o),e(h.texture,a.mapping)}else return null}}return a}function o(a){const r=a.target;r.removeEventListener("dispose",o);const l=t.get(r);l!==void 0&&(t.delete(r),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class _r extends xc{constructor(t=-1,e=1,n=1,o=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=o,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,o,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=o,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let s=n-t,a=n+t,r=o+e,l=o-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,a=s+h*this.view.width,r-=u*this.view.offsetY,l=r-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,r,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Bi=4,rl=[.125,.215,.35,.446,.526,.582],ci=20,Qs=new _r,ll=new St;let ta=null,ea=0,na=0,ia=!1;const ai=(1+Math.sqrt(5))/2,Fi=1/ai,cl=[new A(-ai,Fi,0),new A(ai,Fi,0),new A(-Fi,0,ai),new A(Fi,0,ai),new A(0,ai,-Fi),new A(0,ai,Fi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)];class ul{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,o=100){ta=this._renderer.getRenderTarget(),ea=this._renderer.getActiveCubeFace(),na=this._renderer.getActiveMipmapLevel(),ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,o,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ta,ea,na),this._renderer.xr.enabled=ia,t.scissorTest=!1,ns(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qi||t.mapping===$i?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ta=this._renderer.getRenderTarget(),ea=this._renderer.getActiveCubeFace(),na=this._renderer.getActiveMipmapLevel(),ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:Ji,format:ye,colorSpace:Qi,depthBuffer:!1},o=hl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hl(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ap(s)),this._blurMaterial=wp(s,t,e)}return o}_compileMaterial(t){const e=new Je(this._lodPlanes[0],t);this._renderer.compile(e,Qs)}_sceneToCubeUV(t,e,n,o){const r=new sn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,c=u.autoClear,f=u.toneMapping;u.getClearColor(ll),u.toneMapping=$n,u.autoClear=!1;const p=new vr({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),g=new Je(new Io,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(ll),v=!0);for(let d=0;d<6;d++){const x=d%3;x===0?(r.up.set(0,l[d],0),r.lookAt(h[d],0,0)):x===1?(r.up.set(0,0,l[d]),r.lookAt(0,h[d],0)):(r.up.set(0,l[d],0),r.lookAt(0,0,h[d]));const E=this._cubeSize;ns(o,x*E,d>2?E:0,E,E),u.setRenderTarget(o),v&&u.render(g,r),u.render(t,r)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=c,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,o=t.mapping===qi||t.mapping===$i;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dl());const s=o?this._cubemapMaterial:this._equirectMaterial,a=new Je(this._lodPlanes[0],s),r=s.uniforms;r.envMap.value=t;const l=this._cubeSize;ns(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Qs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const o=this._lodPlanes.length;for(let s=1;s<o;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),r=cl[(o-s-1)%cl.length];this._blur(t,s-1,s,a,r)}e.autoClear=n}_blur(t,e,n,o,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,o,"latitudinal",s),this._halfBlur(a,t,n,n,o,"longitudinal",s)}_halfBlur(t,e,n,o,s,a,r){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,c=new Je(this._lodPlanes[o],h),f=h.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ci-1),v=s/g,m=isFinite(s)?1+Math.floor(u*v):ci;m>ci&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ci}`);const d=[];let x=0;for(let w=0;w<ci;++w){const U=w/v,T=Math.exp(-U*U/2);d.push(T),w===0?x+=T:w<m&&(x+=2*T)}for(let w=0;w<d.length;w++)d[w]=d[w]/x;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",r&&(f.poleAxis.value=r);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-n;const S=this._sizeLods[o],D=3*S*(o>E-Bi?o-E+Bi:0),C=4*(this._cubeSize-S);ns(e,D,C,3*S,2*S),l.setRenderTarget(e),l.render(c,Qs)}}function Ap(i){const t=[],e=[],n=[];let o=i;const s=i-Bi+1+rl.length;for(let a=0;a<s;a++){const r=Math.pow(2,o);e.push(r);let l=1/r;a>i-Bi?l=rl[a-i+Bi-1]:a===0&&(l=0),n.push(l);const h=1/(r-2),u=-h,c=1+h,f=[u,u,c,u,c,c,u,u,c,c,u,c],p=6,g=6,v=3,m=2,d=1,x=new Float32Array(v*g*p),E=new Float32Array(m*g*p),S=new Float32Array(d*g*p);for(let C=0;C<p;C++){const w=C%3*2/3-1,U=C>2?0:-1,T=[w,U,0,w+2/3,U,0,w+2/3,U+1,0,w,U,0,w+2/3,U+1,0,w,U+1,0];x.set(T,v*g*C),E.set(f,m*g*C);const M=[C,C,C,C,C,C];S.set(M,d*g*C)}const D=new de;D.setAttribute("position",new At(x,v)),D.setAttribute("uv",new At(E,m)),D.setAttribute("faceIndex",new At(S,d)),t.push(D),o>Bi&&o--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function hl(i,t,e){const n=new gn(i,t,e);return n.texture.mapping=Es,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ns(i,t,e,n,o){i.viewport.set(t,e,n,o),i.scissor.set(t,e,n,o)}function wp(i,t,e){const n=new Float32Array(ci),o=new A(0,1,0);return new Se({name:"SphericalGaussianBlur",defines:{n:ci,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:xr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function dl(){return new Se({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function fl(){return new Se({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function xr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Cp(i){let t=new WeakMap,e=null;function n(r){if(r&&r.isTexture){const l=r.mapping,h=l===Ma||l===Ea,u=l===qi||l===$i;if(h||u){let c=t.get(r);const f=c!==void 0?c.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==f)return e===null&&(e=new ul(i)),c=h?e.fromEquirectangular(r,c):e.fromCubemap(r,c),c.texture.pmremVersion=r.pmremVersion,t.set(r,c),c.texture;if(c!==void 0)return c.texture;{const p=r.image;return h&&p&&p.height>0||u&&p&&o(p)?(e===null&&(e=new ul(i)),c=h?e.fromEquirectangular(r):e.fromCubemap(r),c.texture.pmremVersion=r.pmremVersion,t.set(r,c),r.addEventListener("dispose",s),c.texture):null}}}return r}function o(r){let l=0;const h=6;for(let u=0;u<h;u++)r[u]!==void 0&&l++;return l===h}function s(r){const l=r.target;l.removeEventListener("dispose",s);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Rp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let o;switch(n){case"WEBGL_depth_texture":o=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=i.getExtension(n)}return t[n]=o,o}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const o=e(n);return o===null&&vo("THREE.WebGLRenderer: "+n+" extension not supported."),o}}}function Pp(i,t,e,n){const o={},s=new WeakMap;function a(c){const f=c.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,d=v.length;m<d;m++)t.remove(v[m])}f.removeEventListener("dispose",a),delete o[f.id];const p=s.get(f);p&&(t.remove(p),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function r(c,f){return o[f.id]===!0||(f.addEventListener("dispose",a),o[f.id]=!0,e.memory.geometries++),f}function l(c){const f=c.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const p=c.morphAttributes;for(const g in p){const v=p[g];for(let m=0,d=v.length;m<d;m++)t.update(v[m],i.ARRAY_BUFFER)}}function h(c){const f=[],p=c.index,g=c.attributes.position;let v=0;if(p!==null){const x=p.array;v=p.version;for(let E=0,S=x.length;E<S;E+=3){const D=x[E+0],C=x[E+1],w=x[E+2];f.push(D,C,C,w,w,D)}}else if(g!==void 0){const x=g.array;v=g.version;for(let E=0,S=x.length/3-1;E<S;E+=3){const D=E+0,C=E+1,w=E+2;f.push(D,C,C,w,w,D)}}else return;const m=new(uc(f)?gc:mc)(f,1);m.version=v;const d=s.get(c);d&&t.remove(d),s.set(c,m)}function u(c){const f=s.get(c);if(f){const p=c.index;p!==null&&f.version<p.version&&h(c)}else h(c);return s.get(c)}return{get:r,update:l,getWireframeAttribute:u}}function Dp(i,t,e){let n;function o(f){n=f}let s,a;function r(f){s=f.type,a=f.bytesPerElement}function l(f,p){i.drawElements(n,p,s,f*a),e.update(p,n,1)}function h(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,s,f*a,g),e.update(p,n,g))}function u(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function c(f,p,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)h(f[d]/a,p[d],v[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,f,0,v,0,g);let d=0;for(let x=0;x<g;x++)d+=p[x]*v[x];e.update(d,n,1)}}this.setMode=o,this.setIndex=r,this.render=l,this.renderInstances=h,this.renderMultiDraw=u,this.renderMultiDrawInstances=c}function Lp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,r){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=r*(s/3);break;case i.LINES:e.lines+=r*(s/2);break;case i.LINE_STRIP:e.lines+=r*(s-1);break;case i.LINE_LOOP:e.lines+=r*s;break;case i.POINTS:e.points+=r*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function o(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:o,update:n}}function Ip(i,t,e){const n=new WeakMap,o=new ue;function s(a,r,l){const h=a.morphTargetInfluences,u=r.morphAttributes.position||r.morphAttributes.normal||r.morphAttributes.color,c=u!==void 0?u.length:0;let f=n.get(r);if(f===void 0||f.count!==c){let M=function(){U.dispose(),n.delete(r),r.removeEventListener("dispose",M)};var p=M;f!==void 0&&f.texture.dispose();const g=r.morphAttributes.position!==void 0,v=r.morphAttributes.normal!==void 0,m=r.morphAttributes.color!==void 0,d=r.morphAttributes.position||[],x=r.morphAttributes.normal||[],E=r.morphAttributes.color||[];let S=0;g===!0&&(S=1),v===!0&&(S=2),m===!0&&(S=3);let D=r.attributes.position.count*S,C=1;D>t.maxTextureSize&&(C=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const w=new Float32Array(D*C*4*c),U=new dc(w,D,C,c);U.type=Ae,U.needsUpdate=!0;const T=S*4;for(let R=0;R<c;R++){const V=d[R],k=x[R],$=E[R],j=D*C*4*R;for(let X=0;X<V.count;X++){const Z=X*T;g===!0&&(o.fromBufferAttribute(V,X),w[j+Z+0]=o.x,w[j+Z+1]=o.y,w[j+Z+2]=o.z,w[j+Z+3]=0),v===!0&&(o.fromBufferAttribute(k,X),w[j+Z+4]=o.x,w[j+Z+5]=o.y,w[j+Z+6]=o.z,w[j+Z+7]=0),m===!0&&(o.fromBufferAttribute($,X),w[j+Z+8]=o.x,w[j+Z+9]=o.y,w[j+Z+10]=o.z,w[j+Z+11]=$.itemSize===4?o.w:1)}}f={count:c,texture:U,size:new Ot(D,C)},n.set(r,f),r.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<h.length;m++)g+=h[m];const v=r.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",h)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function Up(i,t,e,n){let o=new WeakMap;function s(l){const h=n.render.frame,u=l.geometry,c=t.get(l,u);if(o.get(c)!==h&&(t.update(c),o.set(c,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",r)===!1&&l.addEventListener("dispose",r),o.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),o.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;o.get(f)!==h&&(f.update(),o.set(f,h))}return c}function a(){o=new WeakMap}function r(l){const h=l.target;h.removeEventListener("dispose",r),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:s,dispose:a}}class Ec extends ke{constructor(t,e,n,o,s,a,r,l,h,u=Hi){if(u!==Hi&&u!==Ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Hi&&(n=gi),n===void 0&&u===Ki&&(n=ji),super(null,o,s,a,r,l,u,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=r!==void 0?r:Re,this.minFilter=l!==void 0?l:Re,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Tc=new ke,pl=new Ec(1,1),bc=new dc,Ac=new yh,wc=new yc,ml=[],gl=[],vl=new Float32Array(16),_l=new Float32Array(9),xl=new Float32Array(4);function io(i,t,e){const n=i[0];if(n<=0||n>0)return i;const o=t*e;let s=ml[o];if(s===void 0&&(s=new Float32Array(o),ml[o]=s),t!==0){n.toArray(s,0);for(let a=1,r=0;a!==t;++a)r+=e,i[a].toArray(s,r)}return s}function Me(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function As(i,t){let e=gl[t];e===void 0&&(e=new Int32Array(t),gl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Fp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Np(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function Op(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function Bp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function kp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(Me(e,n))return;xl.set(n),i.uniformMatrix2fv(this.addr,!1,xl),Ee(e,n)}}function zp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(Me(e,n))return;_l.set(n),i.uniformMatrix3fv(this.addr,!1,_l),Ee(e,n)}}function Hp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(Me(e,n))return;vl.set(n),i.uniformMatrix4fv(this.addr,!1,vl),Ee(e,n)}}function Vp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Gp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function Wp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function Xp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function Yp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function qp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function $p(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function jp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function Kp(i,t,e){const n=this.cache,o=e.allocateTextureUnit();n[0]!==o&&(i.uniform1i(this.addr,o),n[0]=o);let s;this.type===i.SAMPLER_2D_SHADOW?(pl.compareFunction=cc,s=pl):s=Tc,e.setTexture2D(t||s,o)}function Zp(i,t,e){const n=this.cache,o=e.allocateTextureUnit();n[0]!==o&&(i.uniform1i(this.addr,o),n[0]=o),e.setTexture3D(t||Ac,o)}function Jp(i,t,e){const n=this.cache,o=e.allocateTextureUnit();n[0]!==o&&(i.uniform1i(this.addr,o),n[0]=o),e.setTextureCube(t||wc,o)}function Qp(i,t,e){const n=this.cache,o=e.allocateTextureUnit();n[0]!==o&&(i.uniform1i(this.addr,o),n[0]=o),e.setTexture2DArray(t||bc,o)}function tm(i){switch(i){case 5126:return Fp;case 35664:return Np;case 35665:return Op;case 35666:return Bp;case 35674:return kp;case 35675:return zp;case 35676:return Hp;case 5124:case 35670:return Vp;case 35667:case 35671:return Gp;case 35668:case 35672:return Wp;case 35669:case 35673:return Xp;case 5125:return Yp;case 36294:return qp;case 36295:return $p;case 36296:return jp;case 35678:case 36198:case 36298:case 36306:case 35682:return Kp;case 35679:case 36299:case 36307:return Zp;case 35680:case 36300:case 36308:case 36293:return Jp;case 36289:case 36303:case 36311:case 36292:return Qp}}function em(i,t){i.uniform1fv(this.addr,t)}function nm(i,t){const e=io(t,this.size,2);i.uniform2fv(this.addr,e)}function im(i,t){const e=io(t,this.size,3);i.uniform3fv(this.addr,e)}function om(i,t){const e=io(t,this.size,4);i.uniform4fv(this.addr,e)}function sm(i,t){const e=io(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function am(i,t){const e=io(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function rm(i,t){const e=io(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function lm(i,t){i.uniform1iv(this.addr,t)}function cm(i,t){i.uniform2iv(this.addr,t)}function um(i,t){i.uniform3iv(this.addr,t)}function hm(i,t){i.uniform4iv(this.addr,t)}function dm(i,t){i.uniform1uiv(this.addr,t)}function fm(i,t){i.uniform2uiv(this.addr,t)}function pm(i,t){i.uniform3uiv(this.addr,t)}function mm(i,t){i.uniform4uiv(this.addr,t)}function gm(i,t,e){const n=this.cache,o=t.length,s=As(e,o);Me(n,s)||(i.uniform1iv(this.addr,s),Ee(n,s));for(let a=0;a!==o;++a)e.setTexture2D(t[a]||Tc,s[a])}function vm(i,t,e){const n=this.cache,o=t.length,s=As(e,o);Me(n,s)||(i.uniform1iv(this.addr,s),Ee(n,s));for(let a=0;a!==o;++a)e.setTexture3D(t[a]||Ac,s[a])}function _m(i,t,e){const n=this.cache,o=t.length,s=As(e,o);Me(n,s)||(i.uniform1iv(this.addr,s),Ee(n,s));for(let a=0;a!==o;++a)e.setTextureCube(t[a]||wc,s[a])}function xm(i,t,e){const n=this.cache,o=t.length,s=As(e,o);Me(n,s)||(i.uniform1iv(this.addr,s),Ee(n,s));for(let a=0;a!==o;++a)e.setTexture2DArray(t[a]||bc,s[a])}function ym(i){switch(i){case 5126:return em;case 35664:return nm;case 35665:return im;case 35666:return om;case 35674:return sm;case 35675:return am;case 35676:return rm;case 5124:case 35670:return lm;case 35667:case 35671:return cm;case 35668:case 35672:return um;case 35669:case 35673:return hm;case 5125:return dm;case 36294:return fm;case 36295:return pm;case 36296:return mm;case 35678:case 36198:case 36298:case 36306:case 35682:return gm;case 35679:case 36299:case 36307:return vm;case 35680:case 36300:case 36308:case 36293:return _m;case 36289:case 36303:case 36311:case 36292:return xm}}class Sm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=tm(e.type)}}class Mm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ym(e.type)}}class Em{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const o=this.seq;for(let s=0,a=o.length;s!==a;++s){const r=o[s];r.setValue(t,e[r.id],n)}}}const oa=/(\w+)(\])?(\[|\.)?/g;function yl(i,t){i.seq.push(t),i.map[t.id]=t}function Tm(i,t,e){const n=i.name,o=n.length;for(oa.lastIndex=0;;){const s=oa.exec(n),a=oa.lastIndex;let r=s[1];const l=s[2]==="]",h=s[3];if(l&&(r=r|0),h===void 0||h==="["&&a+2===o){yl(e,h===void 0?new Sm(r,i,t):new Mm(r,i,t));break}else{let c=e.map[r];c===void 0&&(c=new Em(r),yl(e,c)),e=c}}}class gs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const s=t.getActiveUniform(e,o),a=t.getUniformLocation(e,s.name);Tm(s,a,this)}}setValue(t,e,n,o){const s=this.map[e];s!==void 0&&s.setValue(t,n,o)}setOptional(t,e,n){const o=e[n];o!==void 0&&this.setValue(t,n,o)}static upload(t,e,n,o){for(let s=0,a=e.length;s!==a;++s){const r=e[s],l=n[r.id];l.needsUpdate!==!1&&r.setValue(t,l.value,o)}}static seqWithValue(t,e){const n=[];for(let o=0,s=t.length;o!==s;++o){const a=t[o];a.id in e&&n.push(a)}return n}}function Sl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const bm=37297;let Am=0;function wm(i,t){const e=i.split(`
`),n=[],o=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=o;a<s;a++){const r=a+1;n.push(`${r===t?">":" "} ${r}: ${e[a]}`)}return n.join(`
`)}const Ml=new Ut;function Cm(i){qt._getMatrix(Ml,qt.workingColorSpace,i);const t=`mat3( ${Ml.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case Ts:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function El(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),o=i.getShaderInfoLog(t).trim();if(n&&o==="")return"";const s=/ERROR: 0:(\d+)/.exec(o);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+o+`

`+wm(i.getShaderSource(t),a)}else return o}function Rm(i,t){const e=Cm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Pm(i,t){let e;switch(t){case Du:e="Linear";break;case Lu:e="Reinhard";break;case Iu:e="Cineon";break;case Uu:e="ACESFilmic";break;case Nu:e="AgX";break;case Ou:e="Neutral";break;case Fu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const is=new A;function Dm(){qt.getLuminanceCoefficients(is);const i=is.x.toFixed(4),t=is.y.toFixed(4),e=is.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_o).join(`
`)}function Im(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Um(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let o=0;o<n;o++){const s=i.getActiveAttrib(t,o),a=s.name;let r=1;s.type===i.FLOAT_MAT2&&(r=2),s.type===i.FLOAT_MAT3&&(r=3),s.type===i.FLOAT_MAT4&&(r=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:r}}return e}function _o(i){return i!==""}function Tl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Fm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ja(i){return i.replace(Fm,Om)}const Nm=new Map;function Om(i,t){let e=Nt[t];if(e===void 0){const n=Nm.get(t);if(n!==void 0)e=Nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ja(e)}const Bm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Al(i){return i.replace(Bm,km)}function km(i,t,e,n){let o="";for(let s=parseInt(t);s<parseInt(e);s++)o+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return o}function wl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function zm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Kl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===uu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Tn&&(t="SHADOWMAP_TYPE_VSM"),t}function Hm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case qi:case $i:t="ENVMAP_TYPE_CUBE";break;case Es:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Vm(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case $i:t="ENVMAP_MODE_REFRACTION";break}return t}function Gm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Zl:t="ENVMAP_BLENDING_MULTIPLY";break;case Ru:t="ENVMAP_BLENDING_MIX";break;case Pu:t="ENVMAP_BLENDING_ADD";break}return t}function Wm(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Xm(i,t,e,n){const o=i.getContext(),s=e.defines;let a=e.vertexShader,r=e.fragmentShader;const l=zm(e),h=Hm(e),u=Vm(e),c=Gm(e),f=Wm(e),p=Lm(e),g=Im(s),v=o.createProgram();let m,d,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_o).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_o).join(`
`),d.length>0&&(d+=`
`)):(m=[wl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_o).join(`
`),d=[wl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMap?"#define "+c:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?Nt.tonemapping_pars_fragment:"",e.toneMapping!==$n?Pm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,Rm("linearToOutputTexel",e.outputColorSpace),Dm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_o).join(`
`)),a=Ja(a),a=Tl(a,e),a=bl(a,e),r=Ja(r),r=Tl(r,e),r=bl(r,e),a=Al(a),r=Al(r),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===kr?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===kr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=x+m+a,S=x+d+r,D=Sl(o,o.VERTEX_SHADER,E),C=Sl(o,o.FRAGMENT_SHADER,S);o.attachShader(v,D),o.attachShader(v,C),e.index0AttributeName!==void 0?o.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&o.bindAttribLocation(v,0,"position"),o.linkProgram(v);function w(R){if(i.debug.checkShaderErrors){const V=o.getProgramInfoLog(v).trim(),k=o.getShaderInfoLog(D).trim(),$=o.getShaderInfoLog(C).trim();let j=!0,X=!0;if(o.getProgramParameter(v,o.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(o,v,D,C);else{const Z=El(o,D,"vertex"),H=El(o,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(v,o.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+V+`
`+Z+`
`+H)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(k===""||$==="")&&(X=!1);X&&(R.diagnostics={runnable:j,programLog:V,vertexShader:{log:k,prefix:m},fragmentShader:{log:$,prefix:d}})}o.deleteShader(D),o.deleteShader(C),U=new gs(o,v),T=Um(o,v)}let U;this.getUniforms=function(){return U===void 0&&w(this),U};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=o.getProgramParameter(v,bm)),M},this.destroy=function(){n.releaseStatesOfProgram(this),o.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Am++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=D,this.fragmentShader=C,this}let Ym=0;class qm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,o=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(o)===!1&&(a.add(o),o.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new $m(t),e.set(t,n)),n}}class $m{constructor(t){this.id=Ym++,this.code=t,this.usedTimes=0}}function jm(i,t,e,n,o,s,a){const r=new fc,l=new qm,h=new Set,u=[],c=o.logarithmicDepthBuffer,f=o.vertexTextures;let p=o.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(T){return h.add(T),T===0?"uv":`uv${T}`}function m(T,M,R,V,k){const $=V.fog,j=k.geometry,X=T.isMeshStandardMaterial?V.environment:null,Z=(T.isMeshStandardMaterial?e:t).get(T.envMap||X),H=Z&&Z.mapping===Es?Z.image.height:null,st=g[T.type];T.precision!==null&&(p=o.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const ht=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Mt=ht!==void 0?ht.length:0;let kt=0;j.morphAttributes.position!==void 0&&(kt=1),j.morphAttributes.normal!==void 0&&(kt=2),j.morphAttributes.color!==void 0&&(kt=3);let oe,W,nt,_t;if(st){const Qt=fn[st];oe=Qt.vertexShader,W=Qt.fragmentShader}else oe=T.vertexShader,W=T.fragmentShader,l.update(T),nt=l.getVertexShaderID(T),_t=l.getFragmentShaderID(T);const at=i.getRenderTarget(),Ct=i.state.buffers.depth.getReversed(),Dt=k.isInstancedMesh===!0,zt=k.isBatchedMesh===!0,he=!!T.map,Wt=!!T.matcap,me=!!Z,F=!!T.aoMap,Qe=!!T.lightMap,Ht=!!T.bumpMap,Vt=!!T.normalMap,bt=!!T.displacementMap,re=!!T.emissiveMap,Tt=!!T.metalnessMap,b=!!T.roughnessMap,_=T.anisotropy>0,N=T.clearcoat>0,Y=T.dispersion>0,K=T.iridescence>0,G=T.sheen>0,xt=T.transmission>0,rt=_&&!!T.anisotropyMap,dt=N&&!!T.clearcoatMap,Xt=N&&!!T.clearcoatNormalMap,Q=N&&!!T.clearcoatRoughnessMap,ft=K&&!!T.iridescenceMap,wt=K&&!!T.iridescenceThicknessMap,Rt=G&&!!T.sheenColorMap,pt=G&&!!T.sheenRoughnessMap,Gt=!!T.specularMap,Ft=!!T.specularColorMap,se=!!T.specularIntensityMap,P=xt&&!!T.transmissionMap,ot=xt&&!!T.thicknessMap,z=!!T.gradientMap,q=!!T.alphaMap,ut=T.alphaTest>0,lt=!!T.alphaHash,Lt=!!T.extensions;let fe=$n;T.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(fe=i.toneMapping);const Pe={shaderID:st,shaderType:T.type,shaderName:T.name,vertexShader:oe,fragmentShader:W,defines:T.defines,customVertexShaderID:nt,customFragmentShaderID:_t,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:zt,batchingColor:zt&&k._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&k.instanceColor!==null,instancingMorph:Dt&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Qi,alphaToCoverage:!!T.alphaToCoverage,map:he,matcap:Wt,envMap:me,envMapMode:me&&Z.mapping,envMapCubeUVHeight:H,aoMap:F,lightMap:Qe,bumpMap:Ht,normalMap:Vt,displacementMap:f&&bt,emissiveMap:re,normalMapObjectSpace:Vt&&T.normalMapType===Vu,normalMapTangentSpace:Vt&&T.normalMapType===Hu,metalnessMap:Tt,roughnessMap:b,anisotropy:_,anisotropyMap:rt,clearcoat:N,clearcoatMap:dt,clearcoatNormalMap:Xt,clearcoatRoughnessMap:Q,dispersion:Y,iridescence:K,iridescenceMap:ft,iridescenceThicknessMap:wt,sheen:G,sheenColorMap:Rt,sheenRoughnessMap:pt,specularMap:Gt,specularColorMap:Ft,specularIntensityMap:se,transmission:xt,transmissionMap:P,thicknessMap:ot,gradientMap:z,opaque:T.transparent===!1&&T.blending===qe&&T.alphaToCoverage===!1,alphaMap:q,alphaTest:ut,alphaHash:lt,combine:T.combine,mapUv:he&&v(T.map.channel),aoMapUv:F&&v(T.aoMap.channel),lightMapUv:Qe&&v(T.lightMap.channel),bumpMapUv:Ht&&v(T.bumpMap.channel),normalMapUv:Vt&&v(T.normalMap.channel),displacementMapUv:bt&&v(T.displacementMap.channel),emissiveMapUv:re&&v(T.emissiveMap.channel),metalnessMapUv:Tt&&v(T.metalnessMap.channel),roughnessMapUv:b&&v(T.roughnessMap.channel),anisotropyMapUv:rt&&v(T.anisotropyMap.channel),clearcoatMapUv:dt&&v(T.clearcoatMap.channel),clearcoatNormalMapUv:Xt&&v(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&v(T.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&v(T.iridescenceMap.channel),iridescenceThicknessMapUv:wt&&v(T.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&v(T.sheenColorMap.channel),sheenRoughnessMapUv:pt&&v(T.sheenRoughnessMap.channel),specularMapUv:Gt&&v(T.specularMap.channel),specularColorMapUv:Ft&&v(T.specularColorMap.channel),specularIntensityMapUv:se&&v(T.specularIntensityMap.channel),transmissionMapUv:P&&v(T.transmissionMap.channel),thicknessMapUv:ot&&v(T.thicknessMap.channel),alphaMapUv:q&&v(T.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Vt||_),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!j.attributes.uv&&(he||q),fog:!!$,useFog:T.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:c,reverseDepthBuffer:Ct,skinning:k.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:kt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:fe,decodeVideoTexture:he&&T.map.isVideoTexture===!0&&qt.getTransfer(T.map.colorSpace)===ee,decodeVideoTextureEmissive:re&&T.emissiveMap.isVideoTexture===!0&&qt.getTransfer(T.emissiveMap.colorSpace)===ee,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===An,flipSided:T.side===Ye,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Lt&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&T.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Pe.vertexUv1s=h.has(1),Pe.vertexUv2s=h.has(2),Pe.vertexUv3s=h.has(3),h.clear(),Pe}function d(T){const M=[];if(T.shaderID?M.push(T.shaderID):(M.push(T.customVertexShaderID),M.push(T.customFragmentShaderID)),T.defines!==void 0)for(const R in T.defines)M.push(R),M.push(T.defines[R]);return T.isRawShaderMaterial===!1&&(x(M,T),E(M,T),M.push(i.outputColorSpace)),M.push(T.customProgramCacheKey),M.join()}function x(T,M){T.push(M.precision),T.push(M.outputColorSpace),T.push(M.envMapMode),T.push(M.envMapCubeUVHeight),T.push(M.mapUv),T.push(M.alphaMapUv),T.push(M.lightMapUv),T.push(M.aoMapUv),T.push(M.bumpMapUv),T.push(M.normalMapUv),T.push(M.displacementMapUv),T.push(M.emissiveMapUv),T.push(M.metalnessMapUv),T.push(M.roughnessMapUv),T.push(M.anisotropyMapUv),T.push(M.clearcoatMapUv),T.push(M.clearcoatNormalMapUv),T.push(M.clearcoatRoughnessMapUv),T.push(M.iridescenceMapUv),T.push(M.iridescenceThicknessMapUv),T.push(M.sheenColorMapUv),T.push(M.sheenRoughnessMapUv),T.push(M.specularMapUv),T.push(M.specularColorMapUv),T.push(M.specularIntensityMapUv),T.push(M.transmissionMapUv),T.push(M.thicknessMapUv),T.push(M.combine),T.push(M.fogExp2),T.push(M.sizeAttenuation),T.push(M.morphTargetsCount),T.push(M.morphAttributeCount),T.push(M.numDirLights),T.push(M.numPointLights),T.push(M.numSpotLights),T.push(M.numSpotLightMaps),T.push(M.numHemiLights),T.push(M.numRectAreaLights),T.push(M.numDirLightShadows),T.push(M.numPointLightShadows),T.push(M.numSpotLightShadows),T.push(M.numSpotLightShadowsWithMaps),T.push(M.numLightProbes),T.push(M.shadowMapType),T.push(M.toneMapping),T.push(M.numClippingPlanes),T.push(M.numClipIntersection),T.push(M.depthPacking)}function E(T,M){r.disableAll(),M.supportsVertexTextures&&r.enable(0),M.instancing&&r.enable(1),M.instancingColor&&r.enable(2),M.instancingMorph&&r.enable(3),M.matcap&&r.enable(4),M.envMap&&r.enable(5),M.normalMapObjectSpace&&r.enable(6),M.normalMapTangentSpace&&r.enable(7),M.clearcoat&&r.enable(8),M.iridescence&&r.enable(9),M.alphaTest&&r.enable(10),M.vertexColors&&r.enable(11),M.vertexAlphas&&r.enable(12),M.vertexUv1s&&r.enable(13),M.vertexUv2s&&r.enable(14),M.vertexUv3s&&r.enable(15),M.vertexTangents&&r.enable(16),M.anisotropy&&r.enable(17),M.alphaHash&&r.enable(18),M.batching&&r.enable(19),M.dispersion&&r.enable(20),M.batchingColor&&r.enable(21),T.push(r.mask),r.disableAll(),M.fog&&r.enable(0),M.useFog&&r.enable(1),M.flatShading&&r.enable(2),M.logarithmicDepthBuffer&&r.enable(3),M.reverseDepthBuffer&&r.enable(4),M.skinning&&r.enable(5),M.morphTargets&&r.enable(6),M.morphNormals&&r.enable(7),M.morphColors&&r.enable(8),M.premultipliedAlpha&&r.enable(9),M.shadowMapEnabled&&r.enable(10),M.doubleSided&&r.enable(11),M.flipSided&&r.enable(12),M.useDepthPacking&&r.enable(13),M.dithering&&r.enable(14),M.transmission&&r.enable(15),M.sheen&&r.enable(16),M.opaque&&r.enable(17),M.pointsUvs&&r.enable(18),M.decodeVideoTexture&&r.enable(19),M.decodeVideoTextureEmissive&&r.enable(20),M.alphaToCoverage&&r.enable(21),T.push(r.mask)}function S(T){const M=g[T.type];let R;if(M){const V=fn[M];R=_c.clone(V.uniforms)}else R=T.uniforms;return R}function D(T,M){let R;for(let V=0,k=u.length;V<k;V++){const $=u[V];if($.cacheKey===M){R=$,++R.usedTimes;break}}return R===void 0&&(R=new Xm(i,M,T,s),u.push(R)),R}function C(T){if(--T.usedTimes===0){const M=u.indexOf(T);u[M]=u[u.length-1],u.pop(),T.destroy()}}function w(T){l.remove(T)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:S,acquireProgram:D,releaseProgram:C,releaseShaderCache:w,programs:u,dispose:U}}function Km(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let r=i.get(a);return r===void 0&&(r={},i.set(a,r)),r}function n(a){i.delete(a)}function o(a,r,l){i.get(a)[r]=l}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:o,dispose:s}}function Zm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Cl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Rl(){const i=[];let t=0;const e=[],n=[],o=[];function s(){t=0,e.length=0,n.length=0,o.length=0}function a(c,f,p,g,v,m){let d=i[t];return d===void 0?(d={id:c.id,object:c,geometry:f,material:p,groupOrder:g,renderOrder:c.renderOrder,z:v,group:m},i[t]=d):(d.id=c.id,d.object=c,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=c.renderOrder,d.z=v,d.group=m),t++,d}function r(c,f,p,g,v,m){const d=a(c,f,p,g,v,m);p.transmission>0?n.push(d):p.transparent===!0?o.push(d):e.push(d)}function l(c,f,p,g,v,m){const d=a(c,f,p,g,v,m);p.transmission>0?n.unshift(d):p.transparent===!0?o.unshift(d):e.unshift(d)}function h(c,f){e.length>1&&e.sort(c||Zm),n.length>1&&n.sort(f||Cl),o.length>1&&o.sort(f||Cl)}function u(){for(let c=t,f=i.length;c<f;c++){const p=i[c];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:o,init:s,push:r,unshift:l,finish:u,sort:h}}function Jm(){let i=new WeakMap;function t(n,o){const s=i.get(n);let a;return s===void 0?(a=new Rl,i.set(n,[a])):o>=s.length?(a=new Rl,s.push(a)):a=s[o],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Qm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new St};break;case"SpotLight":e={position:new A,direction:new A,color:new St,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new St,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new St,groundColor:new St};break;case"RectAreaLight":e={color:new St,position:new A,halfWidth:new A,halfHeight:new A};break}return i[t.id]=e,e}}}function t0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let e0=0;function n0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function i0(i){const t=new Qm,e=t0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new A);const o=new A,s=new pe,a=new pe;function r(h){let u=0,c=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let p=0,g=0,v=0,m=0,d=0,x=0,E=0,S=0,D=0,C=0,w=0;h.sort(n0);for(let T=0,M=h.length;T<M;T++){const R=h[T],V=R.color,k=R.intensity,$=R.distance,j=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=V.r*k,c+=V.g*k,f+=V.b*k;else if(R.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(R.sh.coefficients[X],k);w++}else if(R.isDirectionalLight){const X=t.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Z=R.shadow,H=e.get(R);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,n.directionalShadow[p]=H,n.directionalShadowMap[p]=j,n.directionalShadowMatrix[p]=R.shadow.matrix,x++}n.directional[p]=X,p++}else if(R.isSpotLight){const X=t.get(R);X.position.setFromMatrixPosition(R.matrixWorld),X.color.copy(V).multiplyScalar(k),X.distance=$,X.coneCos=Math.cos(R.angle),X.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),X.decay=R.decay,n.spot[v]=X;const Z=R.shadow;if(R.map&&(n.spotLightMap[D]=R.map,D++,Z.updateMatrices(R),R.castShadow&&C++),n.spotLightMatrix[v]=Z.matrix,R.castShadow){const H=e.get(R);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,n.spotShadow[v]=H,n.spotShadowMap[v]=j,S++}v++}else if(R.isRectAreaLight){const X=t.get(R);X.color.copy(V).multiplyScalar(k),X.halfWidth.set(R.width*.5,0,0),X.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=X,m++}else if(R.isPointLight){const X=t.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),X.distance=R.distance,X.decay=R.decay,R.castShadow){const Z=R.shadow,H=e.get(R);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,H.shadowCameraNear=Z.camera.near,H.shadowCameraFar=Z.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=R.shadow.matrix,E++}n.point[g]=X,g++}else if(R.isHemisphereLight){const X=t.get(R);X.skyColor.copy(R.color).multiplyScalar(k),X.groundColor.copy(R.groundColor).multiplyScalar(k),n.hemi[d]=X,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=it.LTC_FLOAT_1,n.rectAreaLTC2=it.LTC_FLOAT_2):(n.rectAreaLTC1=it.LTC_HALF_1,n.rectAreaLTC2=it.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=c,n.ambient[2]=f;const U=n.hash;(U.directionalLength!==p||U.pointLength!==g||U.spotLength!==v||U.rectAreaLength!==m||U.hemiLength!==d||U.numDirectionalShadows!==x||U.numPointShadows!==E||U.numSpotShadows!==S||U.numSpotMaps!==D||U.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=S+D-C,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=w,U.directionalLength=p,U.pointLength=g,U.spotLength=v,U.rectAreaLength=m,U.hemiLength=d,U.numDirectionalShadows=x,U.numPointShadows=E,U.numSpotShadows=S,U.numSpotMaps=D,U.numLightProbes=w,n.version=e0++)}function l(h,u){let c=0,f=0,p=0,g=0,v=0;const m=u.matrixWorldInverse;for(let d=0,x=h.length;d<x;d++){const E=h[d];if(E.isDirectionalLight){const S=n.directional[c];S.direction.setFromMatrixPosition(E.matrixWorld),o.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(o),S.direction.transformDirection(m),c++}else if(E.isSpotLight){const S=n.spot[p];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(E.matrixWorld),o.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(o),S.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(E.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const S=n.point[f];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),f++}else if(E.isHemisphereLight){const S=n.hemi[v];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(m),v++}}}return{setup:r,setupView:l,state:n}}function Pl(i){const t=new i0(i),e=[],n=[];function o(u){h.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function a(u){n.push(u)}function r(){t.setup(e)}function l(u){t.setupView(e,u)}const h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:o,state:h,setupLights:r,setupLightsView:l,pushLight:s,pushShadow:a}}function o0(i){let t=new WeakMap;function e(o,s=0){const a=t.get(o);let r;return a===void 0?(r=new Pl(i),t.set(o,[r])):s>=a.length?(r=new Pl(i),a.push(r)):r=a[s],r}function n(){t=new WeakMap}return{get:e,dispose:n}}class s0 extends eo{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class a0 extends eo{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const r0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,l0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function c0(i,t,e){let n=new Sc;const o=new Ot,s=new Ot,a=new ue,r=new s0({depthPacking:zu}),l=new a0,h={},u=e.maxTextureSize,c={[jn]:Ye,[Ye]:jn,[An]:An},f=new Se({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:r0,fragmentShader:l0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new de;g.setAttribute("position",new At(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Je(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kl;let d=this.type;this.render=function(C,w,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const T=i.getRenderTarget(),M=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Dn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const k=d!==Tn&&this.type===Tn,$=d===Tn&&this.type!==Tn;for(let j=0,X=C.length;j<X;j++){const Z=C[j],H=Z.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;o.copy(H.mapSize);const st=H.getFrameExtents();if(o.multiply(st),s.copy(H.mapSize),(o.x>u||o.y>u)&&(o.x>u&&(s.x=Math.floor(u/st.x),o.x=s.x*st.x,H.mapSize.x=s.x),o.y>u&&(s.y=Math.floor(u/st.y),o.y=s.y*st.y,H.mapSize.y=s.y)),H.map===null||k===!0||$===!0){const Mt=this.type!==Tn?{minFilter:Re,magFilter:Re}:{};H.map!==null&&H.map.dispose(),H.map=new gn(o.x,o.y,Mt),H.map.texture.name=Z.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const ht=H.getViewportCount();for(let Mt=0;Mt<ht;Mt++){const kt=H.getViewport(Mt);a.set(s.x*kt.x,s.y*kt.y,s.x*kt.z,s.y*kt.w),V.viewport(a),H.updateMatrices(Z,Mt),n=H.getFrustum(),S(w,U,H.camera,Z,this.type)}H.isPointLightShadow!==!0&&this.type===Tn&&x(H,U),H.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(T,M,R)};function x(C,w){const U=t.update(v);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new gn(o.x,o.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(w,null,U,f,v,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(w,null,U,p,v,null)}function E(C,w,U,T){let M=null;const R=U.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(R!==void 0)M=R;else if(M=U.isPointLight===!0?l:r,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const V=M.uuid,k=w.uuid;let $=h[V];$===void 0&&($={},h[V]=$);let j=$[k];j===void 0&&(j=M.clone(),$[k]=j,w.addEventListener("dispose",D)),M=j}if(M.visible=w.visible,M.wireframe=w.wireframe,T===Tn?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:c[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const V=i.properties.get(M);V.light=U}return M}function S(C,w,U,T,M){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===Tn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,C.matrixWorld);const k=t.update(C),$=C.material;if(Array.isArray($)){const j=k.groups;for(let X=0,Z=j.length;X<Z;X++){const H=j[X],st=$[H.materialIndex];if(st&&st.visible){const ht=E(C,st,T,M);C.onBeforeShadow(i,C,w,U,k,ht,H),i.renderBufferDirect(U,null,k,ht,C,H),C.onAfterShadow(i,C,w,U,k,ht,H)}}}else if($.visible){const j=E(C,$,T,M);C.onBeforeShadow(i,C,w,U,k,j,null),i.renderBufferDirect(U,null,k,j,C,null),C.onAfterShadow(i,C,w,U,k,j,null)}}const V=C.children;for(let k=0,$=V.length;k<$;k++)S(V[k],w,U,T,M)}function D(C){C.target.removeEventListener("dispose",D);for(const U in h){const T=h[U],M=C.target.uuid;M in T&&(T[M].dispose(),delete T[M])}}}const u0={[ma]:ga,[va]:ya,[_a]:Sa,[Yi]:xa,[ga]:ma,[ya]:va,[Sa]:_a,[xa]:Yi};function h0(i,t){function e(){let P=!1;const ot=new ue;let z=null;const q=new ue(0,0,0,0);return{setMask:function(ut){z!==ut&&!P&&(i.colorMask(ut,ut,ut,ut),z=ut)},setLocked:function(ut){P=ut},setClear:function(ut,lt,Lt,fe,Pe){Pe===!0&&(ut*=fe,lt*=fe,Lt*=fe),ot.set(ut,lt,Lt,fe),q.equals(ot)===!1&&(i.clearColor(ut,lt,Lt,fe),q.copy(ot))},reset:function(){P=!1,z=null,q.set(-1,0,0,0)}}}function n(){let P=!1,ot=!1,z=null,q=null,ut=null;return{setReversed:function(lt){if(ot!==lt){const Lt=t.get("EXT_clip_control");ot?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT);const fe=ut;ut=null,this.setClear(fe)}ot=lt},getReversed:function(){return ot},setTest:function(lt){lt?at(i.DEPTH_TEST):Ct(i.DEPTH_TEST)},setMask:function(lt){z!==lt&&!P&&(i.depthMask(lt),z=lt)},setFunc:function(lt){if(ot&&(lt=u0[lt]),q!==lt){switch(lt){case ma:i.depthFunc(i.NEVER);break;case ga:i.depthFunc(i.ALWAYS);break;case va:i.depthFunc(i.LESS);break;case Yi:i.depthFunc(i.LEQUAL);break;case _a:i.depthFunc(i.EQUAL);break;case xa:i.depthFunc(i.GEQUAL);break;case ya:i.depthFunc(i.GREATER);break;case Sa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}q=lt}},setLocked:function(lt){P=lt},setClear:function(lt){ut!==lt&&(ot&&(lt=1-lt),i.clearDepth(lt),ut=lt)},reset:function(){P=!1,z=null,q=null,ut=null,ot=!1}}}function o(){let P=!1,ot=null,z=null,q=null,ut=null,lt=null,Lt=null,fe=null,Pe=null;return{setTest:function(Qt){P||(Qt?at(i.STENCIL_TEST):Ct(i.STENCIL_TEST))},setMask:function(Qt){ot!==Qt&&!P&&(i.stencilMask(Qt),ot=Qt)},setFunc:function(Qt,an,vn){(z!==Qt||q!==an||ut!==vn)&&(i.stencilFunc(Qt,an,vn),z=Qt,q=an,ut=vn)},setOp:function(Qt,an,vn){(lt!==Qt||Lt!==an||fe!==vn)&&(i.stencilOp(Qt,an,vn),lt=Qt,Lt=an,fe=vn)},setLocked:function(Qt){P=Qt},setClear:function(Qt){Pe!==Qt&&(i.clearStencil(Qt),Pe=Qt)},reset:function(){P=!1,ot=null,z=null,q=null,ut=null,lt=null,Lt=null,fe=null,Pe=null}}}const s=new e,a=new n,r=new o,l=new WeakMap,h=new WeakMap;let u={},c={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,x=null,E=null,S=null,D=null,C=null,w=new St(0,0,0),U=0,T=!1,M=null,R=null,V=null,k=null,$=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Z=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=Z>=1):H.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=Z>=2);let st=null,ht={};const Mt=i.getParameter(i.SCISSOR_BOX),kt=i.getParameter(i.VIEWPORT),oe=new ue().fromArray(Mt),W=new ue().fromArray(kt);function nt(P,ot,z,q){const ut=new Uint8Array(4),lt=i.createTexture();i.bindTexture(P,lt),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Lt=0;Lt<z;Lt++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,q,0,i.RGBA,i.UNSIGNED_BYTE,ut):i.texImage2D(ot+Lt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ut);return lt}const _t={};_t[i.TEXTURE_2D]=nt(i.TEXTURE_2D,i.TEXTURE_2D,1),_t[i.TEXTURE_CUBE_MAP]=nt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[i.TEXTURE_2D_ARRAY]=nt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_t[i.TEXTURE_3D]=nt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),r.setClear(0),at(i.DEPTH_TEST),a.setFunc(Yi),Ht(!1),Vt(Ur),at(i.CULL_FACE),F(Dn);function at(P){u[P]!==!0&&(i.enable(P),u[P]=!0)}function Ct(P){u[P]!==!1&&(i.disable(P),u[P]=!1)}function Dt(P,ot){return c[P]!==ot?(i.bindFramebuffer(P,ot),c[P]=ot,P===i.DRAW_FRAMEBUFFER&&(c[i.FRAMEBUFFER]=ot),P===i.FRAMEBUFFER&&(c[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function zt(P,ot){let z=p,q=!1;if(P){z=f.get(ot),z===void 0&&(z=[],f.set(ot,z));const ut=P.textures;if(z.length!==ut.length||z[0]!==i.COLOR_ATTACHMENT0){for(let lt=0,Lt=ut.length;lt<Lt;lt++)z[lt]=i.COLOR_ATTACHMENT0+lt;z.length=ut.length,q=!0}}else z[0]!==i.BACK&&(z[0]=i.BACK,q=!0);q&&i.drawBuffers(z)}function he(P){return g!==P?(i.useProgram(P),g=P,!0):!1}const Wt={[li]:i.FUNC_ADD,[du]:i.FUNC_SUBTRACT,[fu]:i.FUNC_REVERSE_SUBTRACT};Wt[pu]=i.MIN,Wt[mu]=i.MAX;const me={[gu]:i.ZERO,[vu]:i.ONE,[_u]:i.SRC_COLOR,[fa]:i.SRC_ALPHA,[Tu]:i.SRC_ALPHA_SATURATE,[Mu]:i.DST_COLOR,[yu]:i.DST_ALPHA,[xu]:i.ONE_MINUS_SRC_COLOR,[pa]:i.ONE_MINUS_SRC_ALPHA,[Eu]:i.ONE_MINUS_DST_COLOR,[Su]:i.ONE_MINUS_DST_ALPHA,[bu]:i.CONSTANT_COLOR,[Au]:i.ONE_MINUS_CONSTANT_COLOR,[wu]:i.CONSTANT_ALPHA,[Cu]:i.ONE_MINUS_CONSTANT_ALPHA};function F(P,ot,z,q,ut,lt,Lt,fe,Pe,Qt){if(P===Dn){v===!0&&(Ct(i.BLEND),v=!1);return}if(v===!1&&(at(i.BLEND),v=!0),P!==hu){if(P!==m||Qt!==T){if((d!==li||S!==li)&&(i.blendEquation(i.FUNC_ADD),d=li,S=li),Qt)switch(P){case qe:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case da:i.blendFunc(i.ONE,i.ONE);break;case Fr:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nr:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case qe:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case da:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Fr:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nr:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}x=null,E=null,D=null,C=null,w.set(0,0,0),U=0,m=P,T=Qt}return}ut=ut||ot,lt=lt||z,Lt=Lt||q,(ot!==d||ut!==S)&&(i.blendEquationSeparate(Wt[ot],Wt[ut]),d=ot,S=ut),(z!==x||q!==E||lt!==D||Lt!==C)&&(i.blendFuncSeparate(me[z],me[q],me[lt],me[Lt]),x=z,E=q,D=lt,C=Lt),(fe.equals(w)===!1||Pe!==U)&&(i.blendColor(fe.r,fe.g,fe.b,Pe),w.copy(fe),U=Pe),m=P,T=!1}function Qe(P,ot){P.side===An?Ct(i.CULL_FACE):at(i.CULL_FACE);let z=P.side===Ye;ot&&(z=!z),Ht(z),P.blending===qe&&P.transparent===!1?F(Dn):F(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);const q=P.stencilWrite;r.setTest(q),q&&(r.setMask(P.stencilWriteMask),r.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),r.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),re(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):Ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(P){M!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),M=P)}function Vt(P){P!==lu?(at(i.CULL_FACE),P!==R&&(P===Ur?i.cullFace(i.BACK):P===cu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ct(i.CULL_FACE),R=P}function bt(P){P!==V&&(X&&i.lineWidth(P),V=P)}function re(P,ot,z){P?(at(i.POLYGON_OFFSET_FILL),(k!==ot||$!==z)&&(i.polygonOffset(ot,z),k=ot,$=z)):Ct(i.POLYGON_OFFSET_FILL)}function Tt(P){P?at(i.SCISSOR_TEST):Ct(i.SCISSOR_TEST)}function b(P){P===void 0&&(P=i.TEXTURE0+j-1),st!==P&&(i.activeTexture(P),st=P)}function _(P,ot,z){z===void 0&&(st===null?z=i.TEXTURE0+j-1:z=st);let q=ht[z];q===void 0&&(q={type:void 0,texture:void 0},ht[z]=q),(q.type!==P||q.texture!==ot)&&(st!==z&&(i.activeTexture(z),st=z),i.bindTexture(P,ot||_t[P]),q.type=P,q.texture=ot)}function N(){const P=ht[st];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function G(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function xt(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function rt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function dt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Xt(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Q(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ft(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function wt(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Rt(P){oe.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),oe.copy(P))}function pt(P){W.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),W.copy(P))}function Gt(P,ot){let z=h.get(ot);z===void 0&&(z=new WeakMap,h.set(ot,z));let q=z.get(P);q===void 0&&(q=i.getUniformBlockIndex(ot,P.name),z.set(P,q))}function Ft(P,ot){const q=h.get(ot).get(P);l.get(ot)!==q&&(i.uniformBlockBinding(ot,q,P.__bindingPointIndex),l.set(ot,q))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},st=null,ht={},c={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,x=null,E=null,S=null,D=null,C=null,w=new St(0,0,0),U=0,T=!1,M=null,R=null,V=null,k=null,$=null,oe.set(0,0,i.canvas.width,i.canvas.height),W.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),r.reset()}return{buffers:{color:s,depth:a,stencil:r},enable:at,disable:Ct,bindFramebuffer:Dt,drawBuffers:zt,useProgram:he,setBlending:F,setMaterial:Qe,setFlipSided:Ht,setCullFace:Vt,setLineWidth:bt,setPolygonOffset:re,setScissorTest:Tt,activeTexture:b,bindTexture:_,unbindTexture:N,compressedTexImage2D:Y,compressedTexImage3D:K,texImage2D:ft,texImage3D:wt,updateUBOMapping:Gt,uniformBlockBinding:Ft,texStorage2D:Xt,texStorage3D:Q,texSubImage2D:G,texSubImage3D:xt,compressedTexSubImage2D:rt,compressedTexSubImage3D:dt,scissor:Rt,viewport:pt,reset:se}}function Dl(i,t,e,n){const o=d0(n);switch(e){case nc:return i*t;case oc:return i*t;case sc:return i*t*2;case ac:return i*t/o.components*o.byteLength;case fr:return i*t/o.components*o.byteLength;case rc:return i*t*2/o.components*o.byteLength;case pr:return i*t*2/o.components*o.byteLength;case ic:return i*t*3/o.components*o.byteLength;case ye:return i*t*4/o.components*o.byteLength;case mr:return i*t*4/o.components*o.byteLength;case hs:case ds:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case fs:case ps:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wa:case Ra:return Math.max(i,16)*Math.max(t,8)/4;case Aa:case Ca:return Math.max(i,8)*Math.max(t,8)/2;case Pa:case Da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case La:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Fa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Na:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ka:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case za:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Xa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ya:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ms:case qa:case $a:return Math.ceil(i/4)*Math.ceil(t/4)*16;case lc:case ja:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ka:case Za:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function d0(i){switch(i){case Un:case Ql:return{byteLength:1,components:1};case bo:case tc:case Ji:return{byteLength:2,components:1};case hr:case dr:return{byteLength:2,components:4};case gi:case ur:case Ae:return{byteLength:4,components:1};case ec:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function f0(i,t,e,n,o,s,a){const r=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Ot,u=new WeakMap;let c;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return p?new OffscreenCanvas(b,_):xs("canvas")}function v(b,_,N){let Y=1;const K=Tt(b);if((K.width>N||K.height>N)&&(Y=N/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const G=Math.floor(Y*K.width),xt=Math.floor(Y*K.height);c===void 0&&(c=g(G,xt));const rt=_?g(G,xt):c;return rt.width=G,rt.height=xt,rt.getContext("2d").drawImage(b,0,0,G,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+G+"x"+xt+")."),rt}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),b;return b}function m(b){return b.generateMipmaps}function d(b){i.generateMipmap(b)}function x(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(b,_,N,Y,K=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let G=_;if(_===i.RED&&(N===i.FLOAT&&(G=i.R32F),N===i.HALF_FLOAT&&(G=i.R16F),N===i.UNSIGNED_BYTE&&(G=i.R8)),_===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(G=i.R8UI),N===i.UNSIGNED_SHORT&&(G=i.R16UI),N===i.UNSIGNED_INT&&(G=i.R32UI),N===i.BYTE&&(G=i.R8I),N===i.SHORT&&(G=i.R16I),N===i.INT&&(G=i.R32I)),_===i.RG&&(N===i.FLOAT&&(G=i.RG32F),N===i.HALF_FLOAT&&(G=i.RG16F),N===i.UNSIGNED_BYTE&&(G=i.RG8)),_===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(G=i.RG8UI),N===i.UNSIGNED_SHORT&&(G=i.RG16UI),N===i.UNSIGNED_INT&&(G=i.RG32UI),N===i.BYTE&&(G=i.RG8I),N===i.SHORT&&(G=i.RG16I),N===i.INT&&(G=i.RG32I)),_===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(G=i.RGB8UI),N===i.UNSIGNED_SHORT&&(G=i.RGB16UI),N===i.UNSIGNED_INT&&(G=i.RGB32UI),N===i.BYTE&&(G=i.RGB8I),N===i.SHORT&&(G=i.RGB16I),N===i.INT&&(G=i.RGB32I)),_===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(G=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(G=i.RGBA16UI),N===i.UNSIGNED_INT&&(G=i.RGBA32UI),N===i.BYTE&&(G=i.RGBA8I),N===i.SHORT&&(G=i.RGBA16I),N===i.INT&&(G=i.RGBA32I)),_===i.RGB&&N===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),_===i.RGBA){const xt=K?Ts:qt.getTransfer(Y);N===i.FLOAT&&(G=i.RGBA32F),N===i.HALF_FLOAT&&(G=i.RGBA16F),N===i.UNSIGNED_BYTE&&(G=xt===ee?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function S(b,_){let N;return b?_===null||_===gi||_===ji?N=i.DEPTH24_STENCIL8:_===Ae?N=i.DEPTH32F_STENCIL8:_===bo&&(N=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===gi||_===ji?N=i.DEPTH_COMPONENT24:_===Ae?N=i.DEPTH_COMPONENT32F:_===bo&&(N=i.DEPTH_COMPONENT16),N}function D(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Re&&b.minFilter!==pn?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function C(b){const _=b.target;_.removeEventListener("dispose",C),U(_),_.isVideoTexture&&u.delete(_)}function w(b){const _=b.target;_.removeEventListener("dispose",w),M(_)}function U(b){const _=n.get(b);if(_.__webglInit===void 0)return;const N=b.source,Y=f.get(N);if(Y){const K=Y[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&T(b),Object.keys(Y).length===0&&f.delete(N)}n.remove(b)}function T(b){const _=n.get(b);i.deleteTexture(_.__webglTexture);const N=b.source,Y=f.get(N);delete Y[_.__cacheKey],a.memory.textures--}function M(b){const _=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let K=0;K<_.__webglFramebuffer[Y].length;K++)i.deleteFramebuffer(_.__webglFramebuffer[Y][K]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const N=b.textures;for(let Y=0,K=N.length;Y<K;Y++){const G=n.get(N[Y]);G.__webglTexture&&(i.deleteTexture(G.__webglTexture),a.memory.textures--),n.remove(N[Y])}n.remove(b)}let R=0;function V(){R=0}function k(){const b=R;return b>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+o.maxTextures),R+=1,b}function $(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function j(b,_){const N=n.get(b);if(b.isVideoTexture&&bt(b),b.isRenderTargetTexture===!1&&b.version>0&&N.__version!==b.version){const Y=b.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(N,b,_);return}}e.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+_)}function X(b,_){const N=n.get(b);if(b.version>0&&N.__version!==b.version){W(N,b,_);return}e.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+_)}function Z(b,_){const N=n.get(b);if(b.version>0&&N.__version!==b.version){W(N,b,_);return}e.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+_)}function H(b,_){const N=n.get(b);if(b.version>0&&N.__version!==b.version){nt(N,b,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+_)}const st={[Ta]:i.REPEAT,[wn]:i.CLAMP_TO_EDGE,[ba]:i.MIRRORED_REPEAT},ht={[Re]:i.NEAREST,[Bu]:i.NEAREST_MIPMAP_NEAREST,[Oo]:i.NEAREST_MIPMAP_LINEAR,[pn]:i.LINEAR,[Ls]:i.LINEAR_MIPMAP_NEAREST,[fi]:i.LINEAR_MIPMAP_LINEAR},Mt={[Gu]:i.NEVER,[ju]:i.ALWAYS,[Wu]:i.LESS,[cc]:i.LEQUAL,[Xu]:i.EQUAL,[$u]:i.GEQUAL,[Yu]:i.GREATER,[qu]:i.NOTEQUAL};function kt(b,_){if(_.type===Ae&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===pn||_.magFilter===Ls||_.magFilter===Oo||_.magFilter===fi||_.minFilter===pn||_.minFilter===Ls||_.minFilter===Oo||_.minFilter===fi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,st[_.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,st[_.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,st[_.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,ht[_.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,ht[_.minFilter]),_.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,Mt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Re||_.minFilter!==Oo&&_.minFilter!==fi||_.type===Ae&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");i.texParameterf(b,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,o.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function oe(b,_){let N=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",C));const Y=_.source;let K=f.get(Y);K===void 0&&(K={},f.set(Y,K));const G=$(_);if(G!==b.__cacheKey){K[G]===void 0&&(K[G]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),K[G].usedTimes++;const xt=K[b.__cacheKey];xt!==void 0&&(K[b.__cacheKey].usedTimes--,xt.usedTimes===0&&T(_)),b.__cacheKey=G,b.__webglTexture=K[G].texture}return N}function W(b,_,N){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);const K=oe(b,_),G=_.source;e.bindTexture(Y,b.__webglTexture,i.TEXTURE0+N);const xt=n.get(G);if(G.version!==xt.__version||K===!0){e.activeTexture(i.TEXTURE0+N);const rt=qt.getPrimaries(qt.workingColorSpace),dt=_.colorSpace===Xn?null:qt.getPrimaries(_.colorSpace),Xt=_.colorSpace===Xn||rt===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt);let Q=v(_.image,!1,o.maxTextureSize);Q=re(_,Q);const ft=s.convert(_.format,_.colorSpace),wt=s.convert(_.type);let Rt=E(_.internalFormat,ft,wt,_.colorSpace,_.isVideoTexture);kt(Y,_);let pt;const Gt=_.mipmaps,Ft=_.isVideoTexture!==!0,se=xt.__version===void 0||K===!0,P=G.dataReady,ot=D(_,Q);if(_.isDepthTexture)Rt=S(_.format===Ki,_.type),se&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,Rt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,Rt,Q.width,Q.height,0,ft,wt,null));else if(_.isDataTexture)if(Gt.length>0){Ft&&se&&e.texStorage2D(i.TEXTURE_2D,ot,Rt,Gt[0].width,Gt[0].height);for(let z=0,q=Gt.length;z<q;z++)pt=Gt[z],Ft?P&&e.texSubImage2D(i.TEXTURE_2D,z,0,0,pt.width,pt.height,ft,wt,pt.data):e.texImage2D(i.TEXTURE_2D,z,Rt,pt.width,pt.height,0,ft,wt,pt.data);_.generateMipmaps=!1}else Ft?(se&&e.texStorage2D(i.TEXTURE_2D,ot,Rt,Q.width,Q.height),P&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,ft,wt,Q.data)):e.texImage2D(i.TEXTURE_2D,0,Rt,Q.width,Q.height,0,ft,wt,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ft&&se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,Rt,Gt[0].width,Gt[0].height,Q.depth);for(let z=0,q=Gt.length;z<q;z++)if(pt=Gt[z],_.format!==ye)if(ft!==null)if(Ft){if(P)if(_.layerUpdates.size>0){const ut=Dl(pt.width,pt.height,_.format,_.type);for(const lt of _.layerUpdates){const Lt=pt.data.subarray(lt*ut/pt.data.BYTES_PER_ELEMENT,(lt+1)*ut/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,z,0,0,lt,pt.width,pt.height,1,ft,Lt)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,z,0,0,0,pt.width,pt.height,Q.depth,ft,pt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,z,Rt,pt.width,pt.height,Q.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?P&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,z,0,0,0,pt.width,pt.height,Q.depth,ft,wt,pt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,z,Rt,pt.width,pt.height,Q.depth,0,ft,wt,pt.data)}else{Ft&&se&&e.texStorage2D(i.TEXTURE_2D,ot,Rt,Gt[0].width,Gt[0].height);for(let z=0,q=Gt.length;z<q;z++)pt=Gt[z],_.format!==ye?ft!==null?Ft?P&&e.compressedTexSubImage2D(i.TEXTURE_2D,z,0,0,pt.width,pt.height,ft,pt.data):e.compressedTexImage2D(i.TEXTURE_2D,z,Rt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?P&&e.texSubImage2D(i.TEXTURE_2D,z,0,0,pt.width,pt.height,ft,wt,pt.data):e.texImage2D(i.TEXTURE_2D,z,Rt,pt.width,pt.height,0,ft,wt,pt.data)}else if(_.isDataArrayTexture)if(Ft){if(se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,Rt,Q.width,Q.height,Q.depth),P)if(_.layerUpdates.size>0){const z=Dl(Q.width,Q.height,_.format,_.type);for(const q of _.layerUpdates){const ut=Q.data.subarray(q*z/Q.data.BYTES_PER_ELEMENT,(q+1)*z/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,q,Q.width,Q.height,1,ft,wt,ut)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ft,wt,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Rt,Q.width,Q.height,Q.depth,0,ft,wt,Q.data);else if(_.isData3DTexture)Ft?(se&&e.texStorage3D(i.TEXTURE_3D,ot,Rt,Q.width,Q.height,Q.depth),P&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ft,wt,Q.data)):e.texImage3D(i.TEXTURE_3D,0,Rt,Q.width,Q.height,Q.depth,0,ft,wt,Q.data);else if(_.isFramebufferTexture){if(se)if(Ft)e.texStorage2D(i.TEXTURE_2D,ot,Rt,Q.width,Q.height);else{let z=Q.width,q=Q.height;for(let ut=0;ut<ot;ut++)e.texImage2D(i.TEXTURE_2D,ut,Rt,z,q,0,ft,wt,null),z>>=1,q>>=1}}else if(Gt.length>0){if(Ft&&se){const z=Tt(Gt[0]);e.texStorage2D(i.TEXTURE_2D,ot,Rt,z.width,z.height)}for(let z=0,q=Gt.length;z<q;z++)pt=Gt[z],Ft?P&&e.texSubImage2D(i.TEXTURE_2D,z,0,0,ft,wt,pt):e.texImage2D(i.TEXTURE_2D,z,Rt,ft,wt,pt);_.generateMipmaps=!1}else if(Ft){if(se){const z=Tt(Q);e.texStorage2D(i.TEXTURE_2D,ot,Rt,z.width,z.height)}P&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ft,wt,Q)}else e.texImage2D(i.TEXTURE_2D,0,Rt,ft,wt,Q);m(_)&&d(Y),xt.__version=G.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function nt(b,_,N){if(_.image.length!==6)return;const Y=oe(b,_),K=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+N);const G=n.get(K);if(K.version!==G.__version||Y===!0){e.activeTexture(i.TEXTURE0+N);const xt=qt.getPrimaries(qt.workingColorSpace),rt=_.colorSpace===Xn?null:qt.getPrimaries(_.colorSpace),dt=_.colorSpace===Xn||xt===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Xt=_.isCompressedTexture||_.image[0].isCompressedTexture,Q=_.image[0]&&_.image[0].isDataTexture,ft=[];for(let q=0;q<6;q++)!Xt&&!Q?ft[q]=v(_.image[q],!0,o.maxCubemapSize):ft[q]=Q?_.image[q].image:_.image[q],ft[q]=re(_,ft[q]);const wt=ft[0],Rt=s.convert(_.format,_.colorSpace),pt=s.convert(_.type),Gt=E(_.internalFormat,Rt,pt,_.colorSpace),Ft=_.isVideoTexture!==!0,se=G.__version===void 0||Y===!0,P=K.dataReady;let ot=D(_,wt);kt(i.TEXTURE_CUBE_MAP,_);let z;if(Xt){Ft&&se&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Gt,wt.width,wt.height);for(let q=0;q<6;q++){z=ft[q].mipmaps;for(let ut=0;ut<z.length;ut++){const lt=z[ut];_.format!==ye?Rt!==null?Ft?P&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ut,0,0,lt.width,lt.height,Rt,lt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ut,Gt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ut,0,0,lt.width,lt.height,Rt,pt,lt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ut,Gt,lt.width,lt.height,0,Rt,pt,lt.data)}}}else{if(z=_.mipmaps,Ft&&se){z.length>0&&ot++;const q=Tt(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Gt,q.width,q.height)}for(let q=0;q<6;q++)if(Q){Ft?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ft[q].width,ft[q].height,Rt,pt,ft[q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Gt,ft[q].width,ft[q].height,0,Rt,pt,ft[q].data);for(let ut=0;ut<z.length;ut++){const Lt=z[ut].image[q].image;Ft?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ut+1,0,0,Lt.width,Lt.height,Rt,pt,Lt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ut+1,Gt,Lt.width,Lt.height,0,Rt,pt,Lt.data)}}else{Ft?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Rt,pt,ft[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Gt,Rt,pt,ft[q]);for(let ut=0;ut<z.length;ut++){const lt=z[ut];Ft?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ut+1,0,0,Rt,pt,lt.image[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ut+1,Gt,Rt,pt,lt.image[q])}}}m(_)&&d(i.TEXTURE_CUBE_MAP),G.__version=K.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function _t(b,_,N,Y,K,G){const xt=s.convert(N.format,N.colorSpace),rt=s.convert(N.type),dt=E(N.internalFormat,xt,rt,N.colorSpace),Xt=n.get(_),Q=n.get(N);if(Q.__renderTarget=_,!Xt.__hasExternalTextures){const ft=Math.max(1,_.width>>G),wt=Math.max(1,_.height>>G);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,G,dt,ft,wt,_.depth,0,xt,rt,null):e.texImage2D(K,G,dt,ft,wt,0,xt,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,b),Vt(_)?r.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,K,Q.__webglTexture,0,Ht(_)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,K,Q.__webglTexture,G),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(b,_,N){if(i.bindRenderbuffer(i.RENDERBUFFER,b),_.depthBuffer){const Y=_.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,G=S(_.stencilBuffer,K),xt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=Ht(_);Vt(_)?r.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt,G,_.width,_.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt,G,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,G,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xt,i.RENDERBUFFER,b)}else{const Y=_.textures;for(let K=0;K<Y.length;K++){const G=Y[K],xt=s.convert(G.format,G.colorSpace),rt=s.convert(G.type),dt=E(G.internalFormat,xt,rt,G.colorSpace),Xt=Ht(_);N&&Vt(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Xt,dt,_.width,_.height):Vt(_)?r.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Xt,dt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,dt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(_.depthTexture);Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),j(_.depthTexture,0);const K=Y.__webglTexture,G=Ht(_);if(_.depthTexture.format===Hi)Vt(_)?r.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(_.depthTexture.format===Ki)Vt(_)?r.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Dt(b){const _=n.get(b),N=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const Y=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",K)};Y.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=Y}if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ct(_.__webglFramebuffer,b)}else if(N){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),at(_.__webglDepthbuffer[Y],b,!1);else{const K=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,G)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),at(_.__webglDepthbuffer,b,!1);else{const Y=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,K)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(b,_,N){const Y=n.get(b);_!==void 0&&_t(Y.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Dt(b)}function he(b){const _=b.texture,N=n.get(b),Y=n.get(_);b.addEventListener("dispose",w);const K=b.textures,G=b.isWebGLCubeRenderTarget===!0,xt=K.length>1;if(xt||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),G){N.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[rt]=[];for(let dt=0;dt<_.mipmaps.length;dt++)N.__webglFramebuffer[rt][dt]=i.createFramebuffer()}else N.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let rt=0;rt<_.mipmaps.length;rt++)N.__webglFramebuffer[rt]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(xt)for(let rt=0,dt=K.length;rt<dt;rt++){const Xt=n.get(K[rt]);Xt.__webglTexture===void 0&&(Xt.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&Vt(b)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let rt=0;rt<K.length;rt++){const dt=K[rt];N.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[rt]);const Xt=s.convert(dt.format,dt.colorSpace),Q=s.convert(dt.type),ft=E(dt.internalFormat,Xt,Q,dt.colorSpace,b.isXRRenderTarget===!0),wt=Ht(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,wt,ft,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,N.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),at(N.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(G){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),kt(i.TEXTURE_CUBE_MAP,_);for(let rt=0;rt<6;rt++)if(_.mipmaps&&_.mipmaps.length>0)for(let dt=0;dt<_.mipmaps.length;dt++)_t(N.__webglFramebuffer[rt][dt],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,dt);else _t(N.__webglFramebuffer[rt],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);m(_)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let rt=0,dt=K.length;rt<dt;rt++){const Xt=K[rt],Q=n.get(Xt);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture),kt(i.TEXTURE_2D,Xt),_t(N.__webglFramebuffer,b,Xt,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,0),m(Xt)&&d(i.TEXTURE_2D)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(rt=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,Y.__webglTexture),kt(rt,_),_.mipmaps&&_.mipmaps.length>0)for(let dt=0;dt<_.mipmaps.length;dt++)_t(N.__webglFramebuffer[dt],b,_,i.COLOR_ATTACHMENT0,rt,dt);else _t(N.__webglFramebuffer,b,_,i.COLOR_ATTACHMENT0,rt,0);m(_)&&d(rt),e.unbindTexture()}b.depthBuffer&&Dt(b)}function Wt(b){const _=b.textures;for(let N=0,Y=_.length;N<Y;N++){const K=_[N];if(m(K)){const G=x(b),xt=n.get(K).__webglTexture;e.bindTexture(G,xt),d(G),e.unbindTexture()}}}const me=[],F=[];function Qe(b){if(b.samples>0){if(Vt(b)===!1){const _=b.textures,N=b.width,Y=b.height;let K=i.COLOR_BUFFER_BIT;const G=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=n.get(b),rt=_.length>1;if(rt)for(let dt=0;dt<_.length;dt++)e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let dt=0;dt<_.length;dt++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xt.__webglColorRenderbuffer[dt]);const Xt=n.get(_[dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Xt,0)}i.blitFramebuffer(0,0,N,Y,0,0,N,Y,K,i.NEAREST),l===!0&&(me.length=0,F.length=0,me.push(i.COLOR_ATTACHMENT0+dt),b.depthBuffer&&b.resolveDepthBuffer===!1&&(me.push(G),F.push(G),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,me))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let dt=0;dt<_.length;dt++){e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,xt.__webglColorRenderbuffer[dt]);const Xt=n.get(_[dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,Xt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const _=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Ht(b){return Math.min(o.maxSamples,b.samples)}function Vt(b){const _=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function bt(b){const _=a.render.frame;u.get(b)!==_&&(u.set(b,_),b.update())}function re(b,_){const N=b.colorSpace,Y=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||N!==Qi&&N!==Xn&&(qt.getTransfer(N)===ee?(Y!==ye||K!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),_}function Tt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(h.width=b.naturalWidth||b.width,h.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(h.width=b.displayWidth,h.height=b.displayHeight):(h.width=b.width,h.height=b.height),h}this.allocateTextureUnit=k,this.resetTextureUnits=V,this.setTexture2D=j,this.setTexture2DArray=X,this.setTexture3D=Z,this.setTextureCube=H,this.rebindTextures=zt,this.setupRenderTarget=he,this.updateRenderTargetMipmap=Wt,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=Vt}function p0(i,t){function e(n,o=Xn){let s;const a=qt.getTransfer(o);if(n===Un)return i.UNSIGNED_BYTE;if(n===hr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===dr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ec)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ql)return i.BYTE;if(n===tc)return i.SHORT;if(n===bo)return i.UNSIGNED_SHORT;if(n===ur)return i.INT;if(n===gi)return i.UNSIGNED_INT;if(n===Ae)return i.FLOAT;if(n===Ji)return i.HALF_FLOAT;if(n===nc)return i.ALPHA;if(n===ic)return i.RGB;if(n===ye)return i.RGBA;if(n===oc)return i.LUMINANCE;if(n===sc)return i.LUMINANCE_ALPHA;if(n===Hi)return i.DEPTH_COMPONENT;if(n===Ki)return i.DEPTH_STENCIL;if(n===ac)return i.RED;if(n===fr)return i.RED_INTEGER;if(n===rc)return i.RG;if(n===pr)return i.RG_INTEGER;if(n===mr)return i.RGBA_INTEGER;if(n===hs||n===ds||n===fs||n===ps)if(a===ee)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===hs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ps)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===hs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ds)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ps)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Aa||n===wa||n===Ca||n===Ra)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Aa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===wa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ca)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ra)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Pa||n===Da||n===La)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Pa||n===Da)return a===ee?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===La)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ia||n===Ua||n===Fa||n===Na||n===Oa||n===Ba||n===ka||n===za||n===Ha||n===Va||n===Ga||n===Wa||n===Xa||n===Ya)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ia)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ua)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Na)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Oa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ba)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ka)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===za)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ha)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Va)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ga)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Xa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ya)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ms||n===qa||n===$a)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===ms)return a===ee?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$a)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===lc||n===ja||n===Ka||n===Za)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===ms)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ja)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ka)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Za)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ji?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class m0 extends sn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Yn extends ze{constructor(){super(),this.isGroup=!0,this.type="Group"}}const g0={type:"move"};class sa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let o=null,s=null,a=null;const r=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),d=this._getHandJoint(h,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=h.joints["index-finger-tip"],c=h.joints["thumb-tip"],f=u.position.distanceTo(c.position),p=.02,g=.005;h.inputState.pinching&&f>p+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&f<=p-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));r!==null&&(o=e.getPose(t.targetRaySpace,n),o===null&&s!==null&&(o=s),o!==null&&(r.matrix.fromArray(o.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,o.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(o.linearVelocity)):r.hasLinearVelocity=!1,o.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(o.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(g0)))}return r!==null&&(r.visible=o!==null),l!==null&&(l.visible=s!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Yn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const v0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class x0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const o=new ke,s=t.properties.get(o);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=o}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Se({vertexShader:v0,fragmentShader:_0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Je(new no(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class y0 extends _i{constructor(t,e){super();const n=this;let o=null,s=1,a=null,r="local-floor",l=1,h=null,u=null,c=null,f=null,p=null,g=null;const v=new x0,m=e.getContextAttributes();let d=null,x=null;const E=[],S=[],D=new Ot;let C=null;const w=new sn;w.viewport=new ue;const U=new sn;U.viewport=new ue;const T=[w,U],M=new m0;let R=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let nt=E[W];return nt===void 0&&(nt=new sa,E[W]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(W){let nt=E[W];return nt===void 0&&(nt=new sa,E[W]=nt),nt.getGripSpace()},this.getHand=function(W){let nt=E[W];return nt===void 0&&(nt=new sa,E[W]=nt),nt.getHandSpace()};function k(W){const nt=S.indexOf(W.inputSource);if(nt===-1)return;const _t=E[nt];_t!==void 0&&(_t.update(W.inputSource,W.frame,h||a),_t.dispatchEvent({type:W.type,data:W.inputSource}))}function $(){o.removeEventListener("select",k),o.removeEventListener("selectstart",k),o.removeEventListener("selectend",k),o.removeEventListener("squeeze",k),o.removeEventListener("squeezestart",k),o.removeEventListener("squeezeend",k),o.removeEventListener("end",$),o.removeEventListener("inputsourceschange",j);for(let W=0;W<E.length;W++){const nt=S[W];nt!==null&&(S[W]=null,E[W].disconnect(nt))}R=null,V=null,v.reset(),t.setRenderTarget(d),p=null,f=null,c=null,o=null,x=null,oe.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(W){h=W},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return c},this.getFrame=function(){return g},this.getSession=function(){return o},this.setSession=async function(W){if(o=W,o!==null){if(d=t.getRenderTarget(),o.addEventListener("select",k),o.addEventListener("selectstart",k),o.addEventListener("selectend",k),o.addEventListener("squeeze",k),o.addEventListener("squeezestart",k),o.addEventListener("squeezeend",k),o.addEventListener("end",$),o.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(D),o.renderState.layers===void 0){const nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(o,e,nt),o.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new gn(p.framebufferWidth,p.framebufferHeight,{format:ye,type:Un,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,_t=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?Ki:Hi,_t=m.stencil?ji:gi);const Ct={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:s};c=new XRWebGLBinding(o,e),f=c.createProjectionLayer(Ct),o.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new gn(f.textureWidth,f.textureHeight,{format:ye,type:Un,depthTexture:new Ec(f.textureWidth,f.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await o.requestReferenceSpace(r),oe.setContext(o),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function j(W){for(let nt=0;nt<W.removed.length;nt++){const _t=W.removed[nt],at=S.indexOf(_t);at>=0&&(S[at]=null,E[at].disconnect(_t))}for(let nt=0;nt<W.added.length;nt++){const _t=W.added[nt];let at=S.indexOf(_t);if(at===-1){for(let Dt=0;Dt<E.length;Dt++)if(Dt>=S.length){S.push(_t),at=Dt;break}else if(S[Dt]===null){S[Dt]=_t,at=Dt;break}if(at===-1)break}const Ct=E[at];Ct&&Ct.connect(_t)}}const X=new A,Z=new A;function H(W,nt,_t){X.setFromMatrixPosition(nt.matrixWorld),Z.setFromMatrixPosition(_t.matrixWorld);const at=X.distanceTo(Z),Ct=nt.projectionMatrix.elements,Dt=_t.projectionMatrix.elements,zt=Ct[14]/(Ct[10]-1),he=Ct[14]/(Ct[10]+1),Wt=(Ct[9]+1)/Ct[5],me=(Ct[9]-1)/Ct[5],F=(Ct[8]-1)/Ct[0],Qe=(Dt[8]+1)/Dt[0],Ht=zt*F,Vt=zt*Qe,bt=at/(-F+Qe),re=bt*-F;if(nt.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(re),W.translateZ(bt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Ct[10]===-1)W.projectionMatrix.copy(nt.projectionMatrix),W.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const Tt=zt+bt,b=he+bt,_=Ht-re,N=Vt+(at-re),Y=Wt*he/b*Tt,K=me*he/b*Tt;W.projectionMatrix.makePerspective(_,N,Y,K,Tt,b),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function st(W,nt){nt===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(nt.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(o===null)return;let nt=W.near,_t=W.far;v.texture!==null&&(v.depthNear>0&&(nt=v.depthNear),v.depthFar>0&&(_t=v.depthFar)),M.near=U.near=w.near=nt,M.far=U.far=w.far=_t,(R!==M.near||V!==M.far)&&(o.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,V=M.far),w.layers.mask=W.layers.mask|2,U.layers.mask=W.layers.mask|4,M.layers.mask=w.layers.mask|U.layers.mask;const at=W.parent,Ct=M.cameras;st(M,at);for(let Dt=0;Dt<Ct.length;Dt++)st(Ct[Dt],at);Ct.length===2?H(M,w,U):M.projectionMatrix.copy(w.projectionMatrix),ht(W,M,at)};function ht(W,nt,_t){_t===null?W.matrix.copy(nt.matrixWorld):(W.matrix.copy(_t.matrixWorld),W.matrix.invert(),W.matrix.multiply(nt.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(nt.projectionMatrix),W.projectionMatrixInverse.copy(nt.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ao*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let Mt=null;function kt(W,nt){if(u=nt.getViewerPose(h||a),g=nt,u!==null){const _t=u.views;p!==null&&(t.setRenderTargetFramebuffer(x,p.framebuffer),t.setRenderTarget(x));let at=!1;_t.length!==M.cameras.length&&(M.cameras.length=0,at=!0);for(let Dt=0;Dt<_t.length;Dt++){const zt=_t[Dt];let he=null;if(p!==null)he=p.getViewport(zt);else{const me=c.getViewSubImage(f,zt);he=me.viewport,Dt===0&&(t.setRenderTargetTextures(x,me.colorTexture,f.ignoreDepthValues?void 0:me.depthStencilTexture),t.setRenderTarget(x))}let Wt=T[Dt];Wt===void 0&&(Wt=new sn,Wt.layers.enable(Dt),Wt.viewport=new ue,T[Dt]=Wt),Wt.matrix.fromArray(zt.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(zt.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(he.x,he.y,he.width,he.height),Dt===0&&(M.matrix.copy(Wt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),at===!0&&M.cameras.push(Wt)}const Ct=o.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const Dt=c.getDepthInformation(_t[0]);Dt&&Dt.isValid&&Dt.texture&&v.init(t,Dt,o.renderState)}}for(let _t=0;_t<E.length;_t++){const at=S[_t],Ct=E[_t];at!==null&&Ct!==void 0&&Ct.update(at,nt,h||a)}Mt&&Mt(W,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const oe=new Mc;oe.setAnimationLoop(kt),this.setAnimationLoop=function(W){Mt=W},this.dispose=function(){}}}const ii=new Fn,S0=new pe;function M0(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,vc(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function o(m,d,x,E,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),c(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,S)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),v(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&r(m,d)):d.isPointsMaterial?l(m,d,x,E):d.isSpriteMaterial?h(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Ye&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Ye&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const x=t.get(d),E=x.envMap,S=x.envMapRotation;E&&(m.envMap.value=E,ii.copy(S),ii.x*=-1,ii.y*=-1,ii.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),m.envMapRotation.value.setFromMatrix4(S0.makeRotationFromEuler(ii)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function r(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,x,E){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*x,m.scale.value=E*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function c(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,x){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ye&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const x=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:o}}function E0(i,t,e,n){let o={},s={},a=[];const r=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,E){const S=E.program;n.uniformBlockBinding(x,S)}function h(x,E){let S=o[x.id];S===void 0&&(g(x),S=u(x),o[x.id]=S,x.addEventListener("dispose",m));const D=E.program;n.updateUBOMapping(x,D);const C=t.render.frame;s[x.id]!==C&&(f(x),s[x.id]=C)}function u(x){const E=c();x.__bindingPointIndex=E;const S=i.createBuffer(),D=x.__size,C=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,D,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,S),S}function c(){for(let x=0;x<r;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const E=o[x.id],S=x.uniforms,D=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let C=0,w=S.length;C<w;C++){const U=Array.isArray(S[C])?S[C]:[S[C]];for(let T=0,M=U.length;T<M;T++){const R=U[T];if(p(R,C,T,D)===!0){const V=R.__offset,k=Array.isArray(R.value)?R.value:[R.value];let $=0;for(let j=0;j<k.length;j++){const X=k[j],Z=v(X);typeof X=="number"||typeof X=="boolean"?(R.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,V+$,R.__data)):X.isMatrix3?(R.__data[0]=X.elements[0],R.__data[1]=X.elements[1],R.__data[2]=X.elements[2],R.__data[3]=0,R.__data[4]=X.elements[3],R.__data[5]=X.elements[4],R.__data[6]=X.elements[5],R.__data[7]=0,R.__data[8]=X.elements[6],R.__data[9]=X.elements[7],R.__data[10]=X.elements[8],R.__data[11]=0):(X.toArray(R.__data,$),$+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(x,E,S,D){const C=x.value,w=E+"_"+S;if(D[w]===void 0)return typeof C=="number"||typeof C=="boolean"?D[w]=C:D[w]=C.clone(),!0;{const U=D[w];if(typeof C=="number"||typeof C=="boolean"){if(U!==C)return D[w]=C,!0}else if(U.equals(C)===!1)return U.copy(C),!0}return!1}function g(x){const E=x.uniforms;let S=0;const D=16;for(let w=0,U=E.length;w<U;w++){const T=Array.isArray(E[w])?E[w]:[E[w]];for(let M=0,R=T.length;M<R;M++){const V=T[M],k=Array.isArray(V.value)?V.value:[V.value];for(let $=0,j=k.length;$<j;$++){const X=k[$],Z=v(X),H=S%D,st=H%Z.boundary,ht=H+st;S+=st,ht!==0&&D-ht<Z.storage&&(S+=D-ht),V.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=S,S+=Z.storage}}}const C=S%D;return C>0&&(S+=D-C),x.__size=S,x.__cache={},this}function v(x){const E={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(E.boundary=4,E.storage=4):x.isVector2?(E.boundary=8,E.storage=8):x.isVector3||x.isColor?(E.boundary=16,E.storage=12):x.isVector4?(E.boundary=16,E.storage=16):x.isMatrix3?(E.boundary=48,E.storage=48):x.isMatrix4?(E.boundary=64,E.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),E}function m(x){const E=x.target;E.removeEventListener("dispose",m);const S=a.indexOf(E.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(o[E.id]),delete o[E.id],delete s[E.id]}function d(){for(const x in o)i.deleteBuffer(o[x]);a=[],o={},s={}}return{bind:l,update:h,dispose:d}}class T0{constructor(t={}){const{canvas:e=dh(),context:n=null,depth:o=!0,stencil:s=!1,alpha:a=!1,antialias:r=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:c=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,d=null;const x=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=on,this.toneMapping=$n,this.toneMappingExposure=1;const S=this;let D=!1,C=0,w=0,U=null,T=-1,M=null;const R=new ue,V=new ue;let k=null;const $=new St(0);let j=0,X=e.width,Z=e.height,H=1,st=null,ht=null;const Mt=new ue(0,0,X,Z),kt=new ue(0,0,X,Z);let oe=!1;const W=new Sc;let nt=!1,_t=!1;const at=new pe,Ct=new pe,Dt=new A,zt=new ue,he={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function me(){return U===null?H:1}let F=n;function Qe(y,L){return e.getContext(y,L)}try{const y={alpha:!0,depth:o,stencil:s,antialias:r,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${cr}`),e.addEventListener("webglcontextlost",q,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",lt,!1),F===null){const L="webgl2";if(F=Qe(L,y),F===null)throw Qe(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ht,Vt,bt,re,Tt,b,_,N,Y,K,G,xt,rt,dt,Xt,Q,ft,wt,Rt,pt,Gt,Ft,se,P;function ot(){Ht=new Rp(F),Ht.init(),Ft=new p0(F,Ht),Vt=new Ep(F,Ht,t,Ft),bt=new h0(F,Ht),Vt.reverseDepthBuffer&&f&&bt.buffers.depth.setReversed(!0),re=new Lp(F),Tt=new Km,b=new f0(F,Ht,bt,Tt,Vt,Ft,re),_=new bp(S),N=new Cp(S),Y=new Bh(F),se=new Sp(F,Y),K=new Pp(F,Y,re,se),G=new Up(F,K,Y,re),Rt=new Ip(F,Vt,b),Q=new Tp(Tt),xt=new jm(S,_,N,Ht,Vt,se,Q),rt=new M0(S,Tt),dt=new Jm,Xt=new o0(Ht),wt=new yp(S,_,N,bt,G,p,l),ft=new c0(S,G,Vt),P=new E0(F,re,Vt,bt),pt=new Mp(F,Ht,re),Gt=new Dp(F,Ht,re),re.programs=xt.programs,S.capabilities=Vt,S.extensions=Ht,S.properties=Tt,S.renderLists=dt,S.shadowMap=ft,S.state=bt,S.info=re}ot();const z=new y0(S,F);this.xr=z,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const y=Ht.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ht.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(y){y!==void 0&&(H=y,this.setSize(X,Z,!1))},this.getSize=function(y){return y.set(X,Z)},this.setSize=function(y,L,O=!0){if(z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=y,Z=L,e.width=Math.floor(y*H),e.height=Math.floor(L*H),O===!0&&(e.style.width=y+"px",e.style.height=L+"px"),this.setViewport(0,0,y,L)},this.getDrawingBufferSize=function(y){return y.set(X*H,Z*H).floor()},this.setDrawingBufferSize=function(y,L,O){X=y,Z=L,H=O,e.width=Math.floor(y*O),e.height=Math.floor(L*O),this.setViewport(0,0,y,L)},this.getCurrentViewport=function(y){return y.copy(R)},this.getViewport=function(y){return y.copy(Mt)},this.setViewport=function(y,L,O,B){y.isVector4?Mt.set(y.x,y.y,y.z,y.w):Mt.set(y,L,O,B),bt.viewport(R.copy(Mt).multiplyScalar(H).round())},this.getScissor=function(y){return y.copy(kt)},this.setScissor=function(y,L,O,B){y.isVector4?kt.set(y.x,y.y,y.z,y.w):kt.set(y,L,O,B),bt.scissor(V.copy(kt).multiplyScalar(H).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(y){bt.setScissorTest(oe=y)},this.setOpaqueSort=function(y){st=y},this.setTransparentSort=function(y){ht=y},this.getClearColor=function(y){return y.copy(wt.getClearColor())},this.setClearColor=function(){wt.setClearColor.apply(wt,arguments)},this.getClearAlpha=function(){return wt.getClearAlpha()},this.setClearAlpha=function(){wt.setClearAlpha.apply(wt,arguments)},this.clear=function(y=!0,L=!0,O=!0){let B=0;if(y){let I=!1;if(U!==null){const tt=U.texture.format;I=tt===mr||tt===pr||tt===fr}if(I){const tt=U.texture.type,ct=tt===Un||tt===gi||tt===bo||tt===ji||tt===hr||tt===dr,mt=wt.getClearColor(),gt=wt.getClearAlpha(),Pt=mt.r,It=mt.g,vt=mt.b;ct?(g[0]=Pt,g[1]=It,g[2]=vt,g[3]=gt,F.clearBufferuiv(F.COLOR,0,g)):(v[0]=Pt,v[1]=It,v[2]=vt,v[3]=gt,F.clearBufferiv(F.COLOR,0,v))}else B|=F.COLOR_BUFFER_BIT}L&&(B|=F.DEPTH_BUFFER_BIT),O&&(B|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",q,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),dt.dispose(),Xt.dispose(),Tt.dispose(),_.dispose(),N.dispose(),G.dispose(),se.dispose(),P.dispose(),xt.dispose(),z.dispose(),z.removeEventListener("sessionstart",Ar),z.removeEventListener("sessionend",wr),Zn.stop()};function q(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const y=re.autoReset,L=ft.enabled,O=ft.autoUpdate,B=ft.needsUpdate,I=ft.type;ot(),re.autoReset=y,ft.enabled=L,ft.autoUpdate=O,ft.needsUpdate=B,ft.type=I}function lt(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Lt(y){const L=y.target;L.removeEventListener("dispose",Lt),fe(L)}function fe(y){Pe(y),Tt.remove(y)}function Pe(y){const L=Tt.get(y).programs;L!==void 0&&(L.forEach(function(O){xt.releaseProgram(O)}),y.isShaderMaterial&&xt.releaseShaderCache(y))}this.renderBufferDirect=function(y,L,O,B,I,tt){L===null&&(L=he);const ct=I.isMesh&&I.matrixWorld.determinant()<0,mt=su(y,L,O,B,I);bt.setMaterial(B,ct);let gt=O.index,Pt=1;if(B.wireframe===!0){if(gt=K.getWireframeAttribute(O),gt===void 0)return;Pt=2}const It=O.drawRange,vt=O.attributes.position;let jt=It.start*Pt,ae=(It.start+It.count)*Pt;tt!==null&&(jt=Math.max(jt,tt.start*Pt),ae=Math.min(ae,(tt.start+tt.count)*Pt)),gt!==null?(jt=Math.max(jt,0),ae=Math.min(ae,gt.count)):vt!=null&&(jt=Math.max(jt,0),ae=Math.min(ae,vt.count));const le=ae-jt;if(le<0||le===1/0)return;se.setup(I,B,mt,O,gt);let He,Kt=pt;if(gt!==null&&(He=Y.get(gt),Kt=Gt,Kt.setIndex(He)),I.isMesh)B.wireframe===!0?(bt.setLineWidth(B.wireframeLinewidth*me()),Kt.setMode(F.LINES)):Kt.setMode(F.TRIANGLES);else if(I.isLine){let yt=B.linewidth;yt===void 0&&(yt=1),bt.setLineWidth(yt*me()),I.isLineSegments?Kt.setMode(F.LINES):I.isLineLoop?Kt.setMode(F.LINE_LOOP):Kt.setMode(F.LINE_STRIP)}else I.isPoints?Kt.setMode(F.POINTS):I.isSprite&&Kt.setMode(F.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Kt.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Ht.get("WEBGL_multi_draw"))Kt.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const yt=I._multiDrawStarts,_n=I._multiDrawCounts,Zt=I._multiDrawCount,rn=gt?Y.get(gt).bytesPerElement:1,Si=Tt.get(B).currentProgram.getUniforms();for(let $e=0;$e<Zt;$e++)Si.setValue(F,"_gl_DrawID",$e),Kt.render(yt[$e]/rn,_n[$e])}else if(I.isInstancedMesh)Kt.renderInstances(jt,le,I.count);else if(O.isInstancedBufferGeometry){const yt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,_n=Math.min(O.instanceCount,yt);Kt.renderInstances(jt,le,_n)}else Kt.render(jt,le)};function Qt(y,L,O){y.transparent===!0&&y.side===An&&y.forceSinglePass===!1?(y.side=Ye,y.needsUpdate=!0,No(y,L,O),y.side=jn,y.needsUpdate=!0,No(y,L,O),y.side=An):No(y,L,O)}this.compile=function(y,L,O=null){O===null&&(O=y),d=Xt.get(O),d.init(L),E.push(d),O.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),y!==O&&y.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),d.setupLights();const B=new Set;return y.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const tt=I.material;if(tt)if(Array.isArray(tt))for(let ct=0;ct<tt.length;ct++){const mt=tt[ct];Qt(mt,O,I),B.add(mt)}else Qt(tt,O,I),B.add(tt)}),E.pop(),d=null,B},this.compileAsync=function(y,L,O=null){const B=this.compile(y,L,O);return new Promise(I=>{function tt(){if(B.forEach(function(ct){Tt.get(ct).currentProgram.isReady()&&B.delete(ct)}),B.size===0){I(y);return}setTimeout(tt,10)}Ht.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let an=null;function vn(y){an&&an(y)}function Ar(){Zn.stop()}function wr(){Zn.start()}const Zn=new Mc;Zn.setAnimationLoop(vn),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(y){an=y,z.setAnimationLoop(y),y===null?Zn.stop():Zn.start()},z.addEventListener("sessionstart",Ar),z.addEventListener("sessionend",wr),this.render=function(y,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),z.enabled===!0&&z.isPresenting===!0&&(z.cameraAutoUpdate===!0&&z.updateCamera(L),L=z.getCamera()),y.isScene===!0&&y.onBeforeRender(S,y,L,U),d=Xt.get(y,E.length),d.init(L),E.push(d),Ct.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),W.setFromProjectionMatrix(Ct),_t=this.localClippingEnabled,nt=Q.init(this.clippingPlanes,_t),m=dt.get(y,x.length),m.init(),x.push(m),z.enabled===!0&&z.isPresenting===!0){const tt=S.xr.getDepthSensingMesh();tt!==null&&Ds(tt,L,-1/0,S.sortObjects)}Ds(y,L,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(st,ht),Wt=z.enabled===!1||z.isPresenting===!1||z.hasDepthSensing()===!1,Wt&&wt.addToRenderList(m,y),this.info.render.frame++,nt===!0&&Q.beginShadows();const O=d.state.shadowsArray;ft.render(O,y,L),nt===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,I=m.transmissive;if(d.setupLights(),L.isArrayCamera){const tt=L.cameras;if(I.length>0)for(let ct=0,mt=tt.length;ct<mt;ct++){const gt=tt[ct];Rr(B,I,y,gt)}Wt&&wt.render(y);for(let ct=0,mt=tt.length;ct<mt;ct++){const gt=tt[ct];Cr(m,y,gt,gt.viewport)}}else I.length>0&&Rr(B,I,y,L),Wt&&wt.render(y),Cr(m,y,L);U!==null&&(b.updateMultisampleRenderTarget(U),b.updateRenderTargetMipmap(U)),y.isScene===!0&&y.onAfterRender(S,y,L),se.resetDefaultState(),T=-1,M=null,E.pop(),E.length>0?(d=E[E.length-1],nt===!0&&Q.setGlobalState(S.clippingPlanes,d.state.camera)):d=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Ds(y,L,O,B){if(y.visible===!1)return;if(y.layers.test(L.layers)){if(y.isGroup)O=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(L);else if(y.isLight)d.pushLight(y),y.castShadow&&d.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||W.intersectsSprite(y)){B&&zt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Ct);const ct=G.update(y),mt=y.material;mt.visible&&m.push(y,ct,mt,O,zt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||W.intersectsObject(y))){const ct=G.update(y),mt=y.material;if(B&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),zt.copy(y.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),zt.copy(ct.boundingSphere.center)),zt.applyMatrix4(y.matrixWorld).applyMatrix4(Ct)),Array.isArray(mt)){const gt=ct.groups;for(let Pt=0,It=gt.length;Pt<It;Pt++){const vt=gt[Pt],jt=mt[vt.materialIndex];jt&&jt.visible&&m.push(y,ct,jt,O,zt.z,vt)}}else mt.visible&&m.push(y,ct,mt,O,zt.z,null)}}const tt=y.children;for(let ct=0,mt=tt.length;ct<mt;ct++)Ds(tt[ct],L,O,B)}function Cr(y,L,O,B){const I=y.opaque,tt=y.transmissive,ct=y.transparent;d.setupLightsView(O),nt===!0&&Q.setGlobalState(S.clippingPlanes,O),B&&bt.viewport(R.copy(B)),I.length>0&&Fo(I,L,O),tt.length>0&&Fo(tt,L,O),ct.length>0&&Fo(ct,L,O),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function Rr(y,L,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[B.id]===void 0&&(d.state.transmissionRenderTarget[B.id]=new gn(1,1,{generateMipmaps:!0,type:Ht.has("EXT_color_buffer_half_float")||Ht.has("EXT_color_buffer_float")?Ji:Un,minFilter:fi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));const tt=d.state.transmissionRenderTarget[B.id],ct=B.viewport||R;tt.setSize(ct.z,ct.w);const mt=S.getRenderTarget();S.setRenderTarget(tt),S.getClearColor($),j=S.getClearAlpha(),j<1&&S.setClearColor(16777215,.5),S.clear(),Wt&&wt.render(O);const gt=S.toneMapping;S.toneMapping=$n;const Pt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),d.setupLightsView(B),nt===!0&&Q.setGlobalState(S.clippingPlanes,B),Fo(y,O,B),b.updateMultisampleRenderTarget(tt),b.updateRenderTargetMipmap(tt),Ht.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let vt=0,jt=L.length;vt<jt;vt++){const ae=L[vt],le=ae.object,He=ae.geometry,Kt=ae.material,yt=ae.group;if(Kt.side===An&&le.layers.test(B.layers)){const _n=Kt.side;Kt.side=Ye,Kt.needsUpdate=!0,Pr(le,O,B,He,Kt,yt),Kt.side=_n,Kt.needsUpdate=!0,It=!0}}It===!0&&(b.updateMultisampleRenderTarget(tt),b.updateRenderTargetMipmap(tt))}S.setRenderTarget(mt),S.setClearColor($,j),Pt!==void 0&&(B.viewport=Pt),S.toneMapping=gt}function Fo(y,L,O){const B=L.isScene===!0?L.overrideMaterial:null;for(let I=0,tt=y.length;I<tt;I++){const ct=y[I],mt=ct.object,gt=ct.geometry,Pt=B===null?ct.material:B,It=ct.group;mt.layers.test(O.layers)&&Pr(mt,L,O,gt,Pt,It)}}function Pr(y,L,O,B,I,tt){y.onBeforeRender(S,L,O,B,I,tt),y.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),I.onBeforeRender(S,L,O,B,y,tt),I.transparent===!0&&I.side===An&&I.forceSinglePass===!1?(I.side=Ye,I.needsUpdate=!0,S.renderBufferDirect(O,L,B,I,y,tt),I.side=jn,I.needsUpdate=!0,S.renderBufferDirect(O,L,B,I,y,tt),I.side=An):S.renderBufferDirect(O,L,B,I,y,tt),y.onAfterRender(S,L,O,B,I,tt)}function No(y,L,O){L.isScene!==!0&&(L=he);const B=Tt.get(y),I=d.state.lights,tt=d.state.shadowsArray,ct=I.state.version,mt=xt.getParameters(y,I.state,tt,L,O),gt=xt.getProgramCacheKey(mt);let Pt=B.programs;B.environment=y.isMeshStandardMaterial?L.environment:null,B.fog=L.fog,B.envMap=(y.isMeshStandardMaterial?N:_).get(y.envMap||B.environment),B.envMapRotation=B.environment!==null&&y.envMap===null?L.environmentRotation:y.envMapRotation,Pt===void 0&&(y.addEventListener("dispose",Lt),Pt=new Map,B.programs=Pt);let It=Pt.get(gt);if(It!==void 0){if(B.currentProgram===It&&B.lightsStateVersion===ct)return Lr(y,mt),It}else mt.uniforms=xt.getUniforms(y),y.onBeforeCompile(mt,S),It=xt.acquireProgram(mt,gt),Pt.set(gt,It),B.uniforms=mt.uniforms;const vt=B.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(vt.clippingPlanes=Q.uniform),Lr(y,mt),B.needsLights=ru(y),B.lightsStateVersion=ct,B.needsLights&&(vt.ambientLightColor.value=I.state.ambient,vt.lightProbe.value=I.state.probe,vt.directionalLights.value=I.state.directional,vt.directionalLightShadows.value=I.state.directionalShadow,vt.spotLights.value=I.state.spot,vt.spotLightShadows.value=I.state.spotShadow,vt.rectAreaLights.value=I.state.rectArea,vt.ltc_1.value=I.state.rectAreaLTC1,vt.ltc_2.value=I.state.rectAreaLTC2,vt.pointLights.value=I.state.point,vt.pointLightShadows.value=I.state.pointShadow,vt.hemisphereLights.value=I.state.hemi,vt.directionalShadowMap.value=I.state.directionalShadowMap,vt.directionalShadowMatrix.value=I.state.directionalShadowMatrix,vt.spotShadowMap.value=I.state.spotShadowMap,vt.spotLightMatrix.value=I.state.spotLightMatrix,vt.spotLightMap.value=I.state.spotLightMap,vt.pointShadowMap.value=I.state.pointShadowMap,vt.pointShadowMatrix.value=I.state.pointShadowMatrix),B.currentProgram=It,B.uniformsList=null,It}function Dr(y){if(y.uniformsList===null){const L=y.currentProgram.getUniforms();y.uniformsList=gs.seqWithValue(L.seq,y.uniforms)}return y.uniformsList}function Lr(y,L){const O=Tt.get(y);O.outputColorSpace=L.outputColorSpace,O.batching=L.batching,O.batchingColor=L.batchingColor,O.instancing=L.instancing,O.instancingColor=L.instancingColor,O.instancingMorph=L.instancingMorph,O.skinning=L.skinning,O.morphTargets=L.morphTargets,O.morphNormals=L.morphNormals,O.morphColors=L.morphColors,O.morphTargetsCount=L.morphTargetsCount,O.numClippingPlanes=L.numClippingPlanes,O.numIntersection=L.numClipIntersection,O.vertexAlphas=L.vertexAlphas,O.vertexTangents=L.vertexTangents,O.toneMapping=L.toneMapping}function su(y,L,O,B,I){L.isScene!==!0&&(L=he),b.resetTextureUnits();const tt=L.fog,ct=B.isMeshStandardMaterial?L.environment:null,mt=U===null?S.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Qi,gt=(B.isMeshStandardMaterial?N:_).get(B.envMap||ct),Pt=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,It=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),vt=!!O.morphAttributes.position,jt=!!O.morphAttributes.normal,ae=!!O.morphAttributes.color;let le=$n;B.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(le=S.toneMapping);const He=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Kt=He!==void 0?He.length:0,yt=Tt.get(B),_n=d.state.lights;if(nt===!0&&(_t===!0||y!==M)){const tn=y===M&&B.id===T;Q.setState(B,y,tn)}let Zt=!1;B.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==_n.state.version||yt.outputColorSpace!==mt||I.isBatchedMesh&&yt.batching===!1||!I.isBatchedMesh&&yt.batching===!0||I.isBatchedMesh&&yt.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&yt.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&yt.instancing===!1||!I.isInstancedMesh&&yt.instancing===!0||I.isSkinnedMesh&&yt.skinning===!1||!I.isSkinnedMesh&&yt.skinning===!0||I.isInstancedMesh&&yt.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&yt.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&yt.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&yt.instancingMorph===!1&&I.morphTexture!==null||yt.envMap!==gt||B.fog===!0&&yt.fog!==tt||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==Q.numPlanes||yt.numIntersection!==Q.numIntersection)||yt.vertexAlphas!==Pt||yt.vertexTangents!==It||yt.morphTargets!==vt||yt.morphNormals!==jt||yt.morphColors!==ae||yt.toneMapping!==le||yt.morphTargetsCount!==Kt)&&(Zt=!0):(Zt=!0,yt.__version=B.version);let rn=yt.currentProgram;Zt===!0&&(rn=No(B,L,I));let Si=!1,$e=!1,oo=!1;const ce=rn.getUniforms(),dn=yt.uniforms;if(bt.useProgram(rn.program)&&(Si=!0,$e=!0,oo=!0),B.id!==T&&(T=B.id,$e=!0),Si||M!==y){bt.buffers.depth.getReversed()?(at.copy(y.projectionMatrix),ph(at),mh(at),ce.setValue(F,"projectionMatrix",at)):ce.setValue(F,"projectionMatrix",y.projectionMatrix),ce.setValue(F,"viewMatrix",y.matrixWorldInverse);const Nn=ce.map.cameraPosition;Nn!==void 0&&Nn.setValue(F,Dt.setFromMatrixPosition(y.matrixWorld)),Vt.logarithmicDepthBuffer&&ce.setValue(F,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ce.setValue(F,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,$e=!0,oo=!0)}if(I.isSkinnedMesh){ce.setOptional(F,I,"bindMatrix"),ce.setOptional(F,I,"bindMatrixInverse");const tn=I.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),ce.setValue(F,"boneTexture",tn.boneTexture,b))}I.isBatchedMesh&&(ce.setOptional(F,I,"batchingTexture"),ce.setValue(F,"batchingTexture",I._matricesTexture,b),ce.setOptional(F,I,"batchingIdTexture"),ce.setValue(F,"batchingIdTexture",I._indirectTexture,b),ce.setOptional(F,I,"batchingColorTexture"),I._colorsTexture!==null&&ce.setValue(F,"batchingColorTexture",I._colorsTexture,b));const so=O.morphAttributes;if((so.position!==void 0||so.normal!==void 0||so.color!==void 0)&&Rt.update(I,O,rn),($e||yt.receiveShadow!==I.receiveShadow)&&(yt.receiveShadow=I.receiveShadow,ce.setValue(F,"receiveShadow",I.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(dn.envMap.value=gt,dn.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&L.environment!==null&&(dn.envMapIntensity.value=L.environmentIntensity),$e&&(ce.setValue(F,"toneMappingExposure",S.toneMappingExposure),yt.needsLights&&au(dn,oo),tt&&B.fog===!0&&rt.refreshFogUniforms(dn,tt),rt.refreshMaterialUniforms(dn,B,H,Z,d.state.transmissionRenderTarget[y.id]),gs.upload(F,Dr(yt),dn,b)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(gs.upload(F,Dr(yt),dn,b),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ce.setValue(F,"center",I.center),ce.setValue(F,"modelViewMatrix",I.modelViewMatrix),ce.setValue(F,"normalMatrix",I.normalMatrix),ce.setValue(F,"modelMatrix",I.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const tn=B.uniformsGroups;for(let Nn=0,On=tn.length;Nn<On;Nn++){const Ir=tn[Nn];P.update(Ir,rn),P.bind(Ir,rn)}}return rn}function au(y,L){y.ambientLightColor.needsUpdate=L,y.lightProbe.needsUpdate=L,y.directionalLights.needsUpdate=L,y.directionalLightShadows.needsUpdate=L,y.pointLights.needsUpdate=L,y.pointLightShadows.needsUpdate=L,y.spotLights.needsUpdate=L,y.spotLightShadows.needsUpdate=L,y.rectAreaLights.needsUpdate=L,y.hemisphereLights.needsUpdate=L}function ru(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(y,L,O){Tt.get(y.texture).__webglTexture=L,Tt.get(y.depthTexture).__webglTexture=O;const B=Tt.get(y);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=O===void 0,B.__autoAllocateDepthBuffer||Ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,L){const O=Tt.get(y);O.__webglFramebuffer=L,O.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(y,L=0,O=0){U=y,C=L,w=O;let B=!0,I=null,tt=!1,ct=!1;if(y){const gt=Tt.get(y);if(gt.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(F.FRAMEBUFFER,null),B=!1;else if(gt.__webglFramebuffer===void 0)b.setupRenderTarget(y);else if(gt.__hasExternalTextures)b.rebindTextures(y,Tt.get(y.texture).__webglTexture,Tt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const vt=y.depthTexture;if(gt.__boundDepthTexture!==vt){if(vt!==null&&Tt.has(vt)&&(y.width!==vt.image.width||y.height!==vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(y)}}const Pt=y.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(ct=!0);const It=Tt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(It[L])?I=It[L][O]:I=It[L],tt=!0):y.samples>0&&b.useMultisampledRTT(y)===!1?I=Tt.get(y).__webglMultisampledFramebuffer:Array.isArray(It)?I=It[O]:I=It,R.copy(y.viewport),V.copy(y.scissor),k=y.scissorTest}else R.copy(Mt).multiplyScalar(H).floor(),V.copy(kt).multiplyScalar(H).floor(),k=oe;if(bt.bindFramebuffer(F.FRAMEBUFFER,I)&&B&&bt.drawBuffers(y,I),bt.viewport(R),bt.scissor(V),bt.setScissorTest(k),tt){const gt=Tt.get(y.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+L,gt.__webglTexture,O)}else if(ct){const gt=Tt.get(y.texture),Pt=L||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,gt.__webglTexture,O||0,Pt)}T=-1},this.readRenderTargetPixels=function(y,L,O,B,I,tt,ct){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=Tt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ct!==void 0&&(mt=mt[ct]),mt){bt.bindFramebuffer(F.FRAMEBUFFER,mt);try{const gt=y.texture,Pt=gt.format,It=gt.type;if(!Vt.textureFormatReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=y.width-B&&O>=0&&O<=y.height-I&&F.readPixels(L,O,B,I,Ft.convert(Pt),Ft.convert(It),tt)}finally{const gt=U!==null?Tt.get(U).__webglFramebuffer:null;bt.bindFramebuffer(F.FRAMEBUFFER,gt)}}},this.readRenderTargetPixelsAsync=async function(y,L,O,B,I,tt,ct){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=Tt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ct!==void 0&&(mt=mt[ct]),mt){const gt=y.texture,Pt=gt.format,It=gt.type;if(!Vt.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=y.width-B&&O>=0&&O<=y.height-I){bt.bindFramebuffer(F.FRAMEBUFFER,mt);const vt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,vt),F.bufferData(F.PIXEL_PACK_BUFFER,tt.byteLength,F.STREAM_READ),F.readPixels(L,O,B,I,Ft.convert(Pt),Ft.convert(It),0);const jt=U!==null?Tt.get(U).__webglFramebuffer:null;bt.bindFramebuffer(F.FRAMEBUFFER,jt);const ae=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await fh(F,ae,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,vt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,tt),F.deleteBuffer(vt),F.deleteSync(ae),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,L=null,O=0){y.isTexture!==!0&&(vo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,y=arguments[1]);const B=Math.pow(2,-O),I=Math.floor(y.image.width*B),tt=Math.floor(y.image.height*B),ct=L!==null?L.x:0,mt=L!==null?L.y:0;b.setTexture2D(y,0),F.copyTexSubImage2D(F.TEXTURE_2D,O,0,0,ct,mt,I,tt),bt.unbindTexture()},this.copyTextureToTexture=function(y,L,O=null,B=null,I=0){y.isTexture!==!0&&(vo("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,y=arguments[1],L=arguments[2],I=arguments[3]||0,O=null);let tt,ct,mt,gt,Pt,It,vt,jt,ae;const le=y.isCompressedTexture?y.mipmaps[I]:y.image;O!==null?(tt=O.max.x-O.min.x,ct=O.max.y-O.min.y,mt=O.isBox3?O.max.z-O.min.z:1,gt=O.min.x,Pt=O.min.y,It=O.isBox3?O.min.z:0):(tt=le.width,ct=le.height,mt=le.depth||1,gt=0,Pt=0,It=0),B!==null?(vt=B.x,jt=B.y,ae=B.z):(vt=0,jt=0,ae=0);const He=Ft.convert(L.format),Kt=Ft.convert(L.type);let yt;L.isData3DTexture?(b.setTexture3D(L,0),yt=F.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(b.setTexture2DArray(L,0),yt=F.TEXTURE_2D_ARRAY):(b.setTexture2D(L,0),yt=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,L.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,L.unpackAlignment);const _n=F.getParameter(F.UNPACK_ROW_LENGTH),Zt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),rn=F.getParameter(F.UNPACK_SKIP_PIXELS),Si=F.getParameter(F.UNPACK_SKIP_ROWS),$e=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,le.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,le.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,gt),F.pixelStorei(F.UNPACK_SKIP_ROWS,Pt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,It);const oo=y.isDataArrayTexture||y.isData3DTexture,ce=L.isDataArrayTexture||L.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){const dn=Tt.get(y),so=Tt.get(L),tn=Tt.get(dn.__renderTarget),Nn=Tt.get(so.__renderTarget);bt.bindFramebuffer(F.READ_FRAMEBUFFER,tn.__webglFramebuffer),bt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Nn.__webglFramebuffer);for(let On=0;On<mt;On++)oo&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Tt.get(y).__webglTexture,I,It+On),y.isDepthTexture?(ce&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Tt.get(L).__webglTexture,I,ae+On),F.blitFramebuffer(gt,Pt,tt,ct,vt,jt,tt,ct,F.DEPTH_BUFFER_BIT,F.NEAREST)):ce?F.copyTexSubImage3D(yt,I,vt,jt,ae+On,gt,Pt,tt,ct):F.copyTexSubImage2D(yt,I,vt,jt,ae+On,gt,Pt,tt,ct);bt.bindFramebuffer(F.READ_FRAMEBUFFER,null),bt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ce?y.isDataTexture||y.isData3DTexture?F.texSubImage3D(yt,I,vt,jt,ae,tt,ct,mt,He,Kt,le.data):L.isCompressedArrayTexture?F.compressedTexSubImage3D(yt,I,vt,jt,ae,tt,ct,mt,He,le.data):F.texSubImage3D(yt,I,vt,jt,ae,tt,ct,mt,He,Kt,le):y.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,I,vt,jt,tt,ct,He,Kt,le.data):y.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,I,vt,jt,le.width,le.height,He,le.data):F.texSubImage2D(F.TEXTURE_2D,I,vt,jt,tt,ct,He,Kt,le);F.pixelStorei(F.UNPACK_ROW_LENGTH,_n),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Zt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,rn),F.pixelStorei(F.UNPACK_SKIP_ROWS,Si),F.pixelStorei(F.UNPACK_SKIP_IMAGES,$e),I===0&&L.generateMipmaps&&F.generateMipmap(yt),bt.unbindTexture()},this.copyTextureToTexture3D=function(y,L,O=null,B=null,I=0){return y.isTexture!==!0&&(vo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,B=arguments[1]||null,y=arguments[2],L=arguments[3],I=arguments[4]||0),vo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,L,O,B,I)},this.initRenderTarget=function(y){Tt.get(y).__webglFramebuffer===void 0&&b.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?b.setTextureCube(y,0):y.isData3DTexture?b.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?b.setTexture2DArray(y,0):b.setTexture2D(y,0),bt.unbindTexture()},this.resetState=function(){C=0,w=0,U=null,bt.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class yr extends ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Kn extends ke{constructor(t=null,e=1,n=1,o,s,a,r,l,h=Re,u=Re,c,f){super(null,a,r,l,h,u,o,s,c,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sr extends eo{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new St(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ys=new A,Ss=new A,Ll=new pe,uo=new bs,os=new Lo,aa=new A,Il=new A;class b0 extends ze{constructor(t=new de,e=new Sr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let o=1,s=e.count;o<s;o++)ys.fromBufferAttribute(e,o-1),Ss.fromBufferAttribute(e,o),n[o]=n[o-1],n[o]+=ys.distanceTo(Ss);t.setAttribute("lineDistance",new Fe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,o=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),os.copy(n.boundingSphere),os.applyMatrix4(o),os.radius+=s,t.ray.intersectsSphere(os)===!1)return;Ll.copy(o).invert(),uo.copy(t.ray).applyMatrix4(Ll);const r=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=r*r,h=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=h){const d=u.getX(v),x=u.getX(v+1),E=ss(this,t,uo,l,d,x);E&&e.push(E)}if(this.isLineLoop){const v=u.getX(g-1),m=u.getX(p),d=ss(this,t,uo,l,v,m);d&&e.push(d)}}else{const p=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=h){const d=ss(this,t,uo,l,v,v+1);d&&e.push(d)}if(this.isLineLoop){const v=ss(this,t,uo,l,g-1,p);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const o=e[n[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=o.length;s<a;s++){const r=o[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=s}}}}}function ss(i,t,e,n,o,s){const a=i.geometry.attributes.position;if(ys.fromBufferAttribute(a,o),Ss.fromBufferAttribute(a,s),e.distanceSqToSegment(ys,Ss,aa,Il)>n)return;aa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(aa);if(!(l<t.near||l>t.far))return{distance:l,point:Il.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Ul=new A,Fl=new A;class wo extends b0{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let o=0,s=e.count;o<s;o+=2)Ul.fromBufferAttribute(e,o),Fl.fromBufferAttribute(e,o+1),n[o]=o===0?0:n[o-1],n[o+1]=n[o]+Ul.distanceTo(Fl);t.setAttribute("lineDistance",new Fe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Cc extends eo{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new St(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Nl=new pe,Qa=new bs,as=new Lo,rs=new A;class Co extends ze{constructor(t=new de,e=new Cc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,o=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),as.copy(n.boundingSphere),as.applyMatrix4(o),as.radius+=s,t.ray.intersectsSphere(as)===!1)return;Nl.copy(o).invert(),Qa.copy(t.ray).applyMatrix4(Nl);const r=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=r*r,h=n.index,c=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=f,v=p;g<v;g++){const m=h.getX(g);rs.fromBufferAttribute(c,m),Ol(rs,m,l,o,t,e,this)}}else{const f=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=f,v=p;g<v;g++)rs.fromBufferAttribute(c,g),Ol(rs,g,l,o,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const o=e[n[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=o.length;s<a;s++){const r=o[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=s}}}}}function Ol(i,t,e,n,o,s,a){const r=Qa.distanceSqToPoint(i);if(r<e){const l=new A;Qa.closestPointToPoint(i,l),l.applyMatrix4(n);const h=o.ray.origin.distanceTo(l);if(h<o.near||h>o.far)return;s.push({distance:h,distanceToRay:Math.sqrt(r),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Mr extends de{constructor(t=1,e=32,n=16,o=0,s=Math.PI*2,a=0,r=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:o,phiLength:s,thetaStart:a,thetaLength:r},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+r,Math.PI);let h=0;const u=[],c=new A,f=new A,p=[],g=[],v=[],m=[];for(let d=0;d<=n;d++){const x=[],E=d/n;let S=0;d===0&&a===0?S=.5/e:d===n&&l===Math.PI&&(S=-.5/e);for(let D=0;D<=e;D++){const C=D/e;c.x=-t*Math.cos(o+C*s)*Math.sin(a+E*r),c.y=t*Math.cos(a+E*r),c.z=t*Math.sin(o+C*s)*Math.sin(a+E*r),g.push(c.x,c.y,c.z),f.copy(c).normalize(),v.push(f.x,f.y,f.z),m.push(C+S,1-E),x.push(h++)}u.push(x)}for(let d=0;d<n;d++)for(let x=0;x<e;x++){const E=u[d][x+1],S=u[d][x],D=u[d+1][x],C=u[d+1][x+1];(d!==0||a>0)&&p.push(E,S,C),(d!==n-1||l<Math.PI)&&p.push(S,D,C)}this.setIndex(p),this.setAttribute("position",new Fe(g,3)),this.setAttribute("normal",new Fe(v,3)),this.setAttribute("uv",new Fe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class A0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Bl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Bl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Bl(){return performance.now()}class kl{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ie(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class w0 extends _i{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:cr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=cr);const zl={type:"change"},Er={type:"start"},Rc={type:"end"},ls=new bs,Hl=new Wn,C0=Math.cos(70*et.DEG2RAD),xe=new A,Ve=2*Math.PI,ie={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ra=1e-6;class R0 extends w0{constructor(t,e=null){super(t,e),this.state=ie.NONE,this.enabled=!0,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:zi.ROTATE,MIDDLE:zi.DOLLY,RIGHT:zi.PAN},this.touches={ONE:Oi.ROTATE,TWO:Oi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new vi,this._lastTargetPosition=new A,this._quat=new vi().setFromUnitVectors(t.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new kl,this._sphericalDelta=new kl,this._scale=1,this._panOffset=new A,this._rotateStart=new Ot,this._rotateEnd=new Ot,this._rotateDelta=new Ot,this._panStart=new Ot,this._panEnd=new Ot,this._panDelta=new Ot,this._dollyStart=new Ot,this._dollyEnd=new Ot,this._dollyDelta=new Ot,this._dollyDirection=new A,this._mouse=new Ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=D0.bind(this),this._onPointerDown=P0.bind(this),this._onPointerUp=L0.bind(this),this._onContextMenu=k0.bind(this),this._onMouseWheel=F0.bind(this),this._onKeyDown=N0.bind(this),this._onTouchStart=O0.bind(this),this._onTouchMove=B0.bind(this),this._onMouseDown=I0.bind(this),this._onMouseMove=U0.bind(this),this._interceptControlDown=z0.bind(this),this._interceptControlUp=H0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(zl),this.update(),this.state=ie.NONE}update(t=null){const e=this.object.position;xe.copy(e).sub(this.target),xe.applyQuaternion(this._quat),this._spherical.setFromVector3(xe),this.autoRotate&&this.state===ie.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,o=this.maxAzimuthAngle;isFinite(n)&&isFinite(o)&&(n<-Math.PI?n+=Ve:n>Math.PI&&(n-=Ve),o<-Math.PI?o+=Ve:o>Math.PI&&(o-=Ve),n<=o?this._spherical.theta=Math.max(n,Math.min(o,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+o)/2?Math.max(n,this._spherical.theta):Math.min(o,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(xe.setFromSpherical(this._spherical),xe.applyQuaternion(this._quatInverse),e.copy(this.target).add(xe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const r=xe.length();a=this._clampDistance(r*this._scale);const l=r-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const r=new A(this._mouse.x,this._mouse.y,0);r.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const h=new A(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(r),this.object.updateMatrixWorld(),a=xe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ls.origin.copy(this.object.position),ls.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ls.direction))<C0?this.object.lookAt(this.target):(Hl.setFromNormalAndCoplanarPoint(this.object.up,this.target),ls.intersectPlane(Hl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>ra||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ra||this._lastTargetPosition.distanceToSquared(this.target)>ra?(this.dispatchEvent(zl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ve/60*this.autoRotateSpeed*t:Ve/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){xe.setFromMatrixColumn(e,0),xe.multiplyScalar(-t),this._panOffset.add(xe)}_panUp(t,e){this.screenSpacePanning===!0?xe.setFromMatrixColumn(e,1):(xe.setFromMatrixColumn(e,0),xe.crossVectors(this.object.up,xe)),xe.multiplyScalar(t),this._panOffset.add(xe)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const o=this.object.position;xe.copy(o).sub(this.target);let s=xe.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/n.clientHeight,this.object.matrix),this._panUp(2*e*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),o=t-n.left,s=e-n.top,a=n.width,r=n.height;this._mouse.x=o/a*2-1,this._mouse.y=-(s/r)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ve*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ve*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ve*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ve*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ve*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ve*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),o=.5*(t.pageY+e.y);this._rotateStart.set(n,o)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),o=.5*(t.pageY+e.y);this._panStart.set(n,o)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,o=t.pageY-e.y,s=Math.sqrt(n*n+o*o);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),o=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateEnd.set(o,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ve*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ve*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),o=.5*(t.pageY+e.y);this._panEnd.set(n,o)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,o=t.pageY-e.y,s=Math.sqrt(n*n+o*o);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,r=(t.pageY+e.y)*.5;this._updateZoomParameters(a,r)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function P0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function D0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function L0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Rc),this.state=ie.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function I0(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case zi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ie.DOLLY;break;case zi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}break;case zi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(Er)}function U0(i){switch(this.state){case ie.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ie.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ie.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function F0(i){this.enabled===!1||this.enableZoom===!1||this.state!==ie.NONE||(i.preventDefault(),this.dispatchEvent(Er),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Rc))}function N0(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function O0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Oi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ie.TOUCH_ROTATE;break;case Oi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ie.TOUCH_PAN;break;default:this.state=ie.NONE}break;case 2:switch(this.touches.TWO){case Oi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ie.TOUCH_DOLLY_PAN;break;case Oi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ie.TOUCH_DOLLY_ROTATE;break;default:this.state=ie.NONE}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(Er)}function B0(i){switch(this._trackPointer(i),this.state){case ie.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ie.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ie.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ie.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ie.NONE}}function k0(i){this.enabled!==!1&&i.preventDefault()}function z0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function H0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const V0={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ws{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const G0=new _r(-1,1,1,-1,0,1);class W0 extends de{constructor(){super(),this.setAttribute("position",new Fe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Fe([0,2,0,0,2,0],2))}}const X0=new W0;class Y0{constructor(t){this._mesh=new Je(X0,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,G0)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Pc extends ws{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Se?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=_c.clone(t.uniforms),this.material=new Se({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Y0(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Vl extends ws{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const o=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,r;this.inverse?(a=0,r=1):(a=1,r=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),s.buffers.stencil.setFunc(o.ALWAYS,a,4294967295),s.buffers.stencil.setClear(r),s.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(o.EQUAL,1,4294967295),s.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),s.buffers.stencil.setLocked(!0)}}class q0 extends ws{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class $0{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new Ot);this._width=n.width,this._height=n.height,e=new gn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ji}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Pc(V0),this.copyPass.material.blending=Dn,this.clock=new A0}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let o=0,s=this.passes.length;o<s;o++){const a=this.passes[o];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const r=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Vl!==void 0&&(a instanceof Vl?n=!0:a instanceof q0&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Ot);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(n,o),this.renderTarget2.setSize(n,o);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,o)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class j0 extends ws{constructor(t,e,n=null,o=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=o,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new St}render(t,e,n){const o=t.autoClear;t.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=o}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class mn{constructor(t,e,n,o,s="div"){this.parent=t,this.object=e,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(o),this.$name=document.createElement("div"),this.$name.classList.add("name"),mn.nextNameID=mn.nextNameID||0,this.$name.id=`lil-gui-name-${++mn.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class K0 extends mn{constructor(t,e,n){super(t,e,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function tr(i){let t,e;return(t=i.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const Z0={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:tr,toHexString:tr},Ro={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},J0={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,t,e=1){const n=Ro.fromHexString(i);t[0]=(n>>16&255)/255*e,t[1]=(n>>8&255)/255*e,t[2]=(n&255)/255*e},toHexString([i,t,e],n=1){n=255/n;const o=i*n<<16^t*n<<8^e*n<<0;return Ro.toHexString(o)}},Q0={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,t,e=1){const n=Ro.fromHexString(i);t.r=(n>>16&255)/255*e,t.g=(n>>8&255)/255*e,t.b=(n&255)/255*e},toHexString({r:i,g:t,b:e},n=1){n=255/n;const o=i*n<<16^t*n<<8^e*n<<0;return Ro.toHexString(o)}},tg=[Z0,Ro,J0,Q0];function eg(i){return tg.find(t=>t.match(i))}class ng extends mn{constructor(t,e,n,o){super(t,e,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=eg(this.initialValue),this._rgbScale=o,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=tr(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class la extends mn{constructor(t,e,n){super(t,e,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",o=>{o.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class ig extends mn{constructor(t,e,n,o,s,a){super(t,e,n,"number"),this._initInput(),this.min(o),this.max(s);const r=a!==void 0;this.step(r?a:this._getImplicitStep(),r),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let x=parseFloat(this.$input.value);isNaN(x)||(this._stepExplicit&&(x=this._snap(x)),this.setValue(this._clamp(x)))},n=x=>{const E=parseFloat(this.$input.value);isNaN(E)||(this._snapClampSetValue(E+x),this.$input.value=this.getValue())},o=x=>{x.key==="Enter"&&this.$input.blur(),x.code==="ArrowUp"&&(x.preventDefault(),n(this._step*this._arrowKeyMultiplier(x))),x.code==="ArrowDown"&&(x.preventDefault(),n(this._step*this._arrowKeyMultiplier(x)*-1))},s=x=>{this._inputFocused&&(x.preventDefault(),n(this._step*this._normalizeMouseWheel(x)))};let a=!1,r,l,h,u,c;const f=5,p=x=>{r=x.clientX,l=h=x.clientY,a=!0,u=this.getValue(),c=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",v)},g=x=>{if(a){const E=x.clientX-r,S=x.clientY-l;Math.abs(S)>f?(x.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(E)>f&&v()}if(!a){const E=x.clientY-h;c-=E*this._step*this._arrowKeyMultiplier(x),u+c>this._max?c=this._max-u:u+c<this._min&&(c=this._min-u),this._snapClampSetValue(u+c)}h=x.clientY},v=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",v)},m=()=>{this._inputFocused=!0},d=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",o),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",d)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(d,x,E,S,D)=>(d-x)/(E-x)*(D-S)+S,e=d=>{const x=this.$slider.getBoundingClientRect();let E=t(d,x.left,x.right,this._min,this._max);this._snapClampSetValue(E)},n=d=>{this._setDraggingStyle(!0),e(d.clientX),window.addEventListener("mousemove",o),window.addEventListener("mouseup",s)},o=d=>{e(d.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",s)};let a=!1,r,l;const h=d=>{d.preventDefault(),this._setDraggingStyle(!0),e(d.touches[0].clientX),a=!1},u=d=>{d.touches.length>1||(this._hasScrollBar?(r=d.touches[0].clientX,l=d.touches[0].clientY,a=!0):h(d),window.addEventListener("touchmove",c,{passive:!1}),window.addEventListener("touchend",f))},c=d=>{if(a){const x=d.touches[0].clientX-r,E=d.touches[0].clientY-l;Math.abs(x)>Math.abs(E)?h(d):(window.removeEventListener("touchmove",c),window.removeEventListener("touchend",f))}else d.preventDefault(),e(d.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",c),window.removeEventListener("touchend",f)},p=this._callOnFinishChange.bind(this),g=400;let v;const m=d=>{if(Math.abs(d.deltaX)<Math.abs(d.deltaY)&&this._hasScrollBar)return;d.preventDefault();const E=this._normalizeMouseWheel(d)*this._step;this._snapClampSetValue(this.getValue()+E),this.$input.value=this.getValue(),clearTimeout(v),v=setTimeout(p,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:n}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,n=-t.wheelDelta/120,n*=this._stepExplicit?1:10),e+-n}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class og extends mn{constructor(t,e,n,o){super(t,e,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(o)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const n=document.createElement("option");n.textContent=e,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class sg extends mn{constructor(t,e,n){super(t,e,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",o=>{o.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var ag=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function rg(i){const t=document.createElement("style");t.innerHTML=i;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let Gl=!1;class Tr{constructor({parent:t,autoPlace:e=t===void 0,container:n,width:o,title:s="Controls",closeFolders:a=!1,injectStyles:r=!0,touchStyles:l=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!Gl&&r&&(rg(ag),Gl=!0),n?n.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),o&&this.domElement.style.setProperty("--width",o+"px"),this._closeFolders=a}add(t,e,n,o,s){if(Object(n)===n)return new og(this,t,e,n);const a=t[e];switch(typeof a){case"number":return new ig(this,t,e,n,o,s);case"boolean":return new K0(this,t,e);case"string":return new sg(this,t,e);case"function":return new la(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,a)}addColor(t,e,n=1){return new ng(this,t,e,n)}addFolder(t){const e=new Tr({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(n=>{n instanceof la||n._name in t.controllers&&n.load(t.controllers[n._name])}),e&&t.folders&&this.folders.forEach(n=>{n._title in t.folders&&n.load(t.folders[n._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof la)){if(n._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);e.controllers[n._name]=n.save()}}),t&&this.folders.forEach(n=>{if(n._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);e.folders[n._title]=n.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const o=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=o+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}const pi=Math.PI*2,oi=8,lg={background:"#F5F5F4",foreground:"#1C1917",particle:"#1C1917",line:"#1C1917",node:"#1C1917",rejected:"#A4513E"},qn={majorRadius:7.9,tubeRadius:3.05,axialSquash:.82,vortexTurns:1.72},ho={seed:1207,surfaceThickness:.34,particleJitter:.18,densityContrast:.88,densityWaves:7},ui={seed:7229,majorSegments:72,minorSegments:16,nodeJitter:.18,irregularity:.34},Dc={nearestNeighbors:5,maxDistance:1.85,maxMajorStep:1,maxMinorStep:1},cg={buildProgress:1,rotationSpeed:.035,nodeDrift:.1,nodeDriftSpeed:.36,spawnRate:120,maxActiveConnections:190,connectionDuration:5.4,lineOpacity:.5,nodeOpacity:.56,growthPortion:.38,holdPortion:.48,fadePortion:.14};function ug(i,t={}){const e={majorRadius:t.majorRadius??qn.majorRadius,tubeRadius:t.tubeRadius??qn.tubeRadius,axialSquash:t.axialSquash??qn.axialSquash,vortexTurns:t.vortexTurns??qn.vortexTurns,seed:t.seed??ho.seed,surfaceThickness:t.surfaceThickness??ho.surfaceThickness,particleJitter:t.particleJitter??ho.particleJitter,densityContrast:t.densityContrast??ho.densityContrast,densityWaves:t.densityWaves??ho.densityWaves},n=br(e.seed),o=Lc({majorRadius:e.majorRadius,tubeRadius:e.tubeRadius,axialSquash:e.axialSquash,vortexTurns:e.vortexTurns,seed:ui.seed}),s=Ic(o,Dc),a=new Float32Array(new ArrayBuffer(i*i*4*4));for(let l=0;l<i*i;l++){const h=s[Math.floor(n()*s.length)],u=o[h.start],c=o[h.end],f=n(),p=u.position.clone().lerp(c.position,f),g=c.position.clone().sub(u.position).normalize(),v=p.clone().normalize(),m=new A().crossVectors(g,v).normalize();m.lengthSq()<.001&&m.set(0,0,1);const d=new A().crossVectors(m,g).normalize(),x=(u.weight+c.weight)*.5,E=e.surfaceThickness*(.18+n()*.42)+e.particleJitter*Math.pow(n(),2),S=n()*pi,D=p.addScaledVector(d,Math.cos(S)*E).addScaledVector(m,Math.sin(S)*E).addScaledVector(v,mg(n)*e.particleJitter*.18),C=er(u.theta/pi+f*.055+n()*.025);a[l*4+0]=D.x,a[l*4+1]=D.y,a[l*4+2]=D.z,a[l*4+3]=C*.82+x*.18}const r=new Kn(a,i,i,ye,Ae);return r.needsUpdate=!0,r.magFilter=Re,r.minFilter=Re,r.wrapS=wn,r.wrapT=wn,r}function Lc(i={}){const t={majorRadius:i.majorRadius??qn.majorRadius,tubeRadius:i.tubeRadius??qn.tubeRadius,axialSquash:i.axialSquash??qn.axialSquash,vortexTurns:i.vortexTurns??qn.vortexTurns,seed:i.seed??ui.seed,majorSegments:i.majorSegments??ui.majorSegments,minorSegments:i.minorSegments??ui.minorSegments,nodeJitter:i.nodeJitter??ui.nodeJitter,irregularity:i.irregularity??ui.irregularity},e=br(t.seed),n=[];for(let o=0;o<t.majorSegments;o++){const s=o/t.majorSegments*pi;for(let a=0;a<t.minorSegments;a++){const r=Math.sin(s*3+a*1.7)*t.irregularity+Math.sin(s*7-a*.9)*t.irregularity*.32,l=s+(e()-.5)*t.nodeJitter*.42+Math.sin(a*2.3+s*1.6)*t.nodeJitter*.05,h=a/t.minorSegments*pi+s*t.vortexTurns+r+(e()-.5)*t.nodeJitter*1.4,u=pg(l,h,.68,7),c=t.tubeRadius+(e()-.5)*t.nodeJitter*1.25+(u-.5)*.22;n.push({index:n.length,majorIndex:o,minorIndex:a,theta:l,phi:h,position:fg(l,h,t.majorRadius,c,t.axialSquash),phase:e()*pi,weight:et.clamp(.55+u*.5+e()*.12,.45,1)})}}return n}function Ic(i,t={}){const e={...Dc,...t},n=Math.max(...i.map(r=>r.majorIndex))+1,o=Math.max(...i.map(r=>r.minorIndex))+1,s=new Set,a=[];for(const r of i){const l=i.filter(h=>h.index!==r.index).filter(h=>vg(r,h,n,o,e)).map(h=>({node:h,distance:r.position.distanceTo(h.position)})).filter(h=>h.distance<=e.maxDistance).sort((h,u)=>h.distance-u.distance).slice(0,e.nearestNeighbors);for(const h of l){const u=Math.min(r.index,h.node.index),c=Math.max(r.index,h.node.index),f=`${u}:${c}`;s.has(f)||(s.add(f),a.push({start:u,end:c,distance:h.distance}))}}return a}class hg{constructor(t={}){var o;this.object3d=new Yn,this.policyInfluenceCount={value:0},this.lineGeometry=new de,this.nodeGeometry=new de,this.eventGeometry=new de,this.foreground=new St,this.background=new St,this.rejected=new St,this.nextSpawn=0,this.nodes=t.nodes??Lc(t.nodeOptions),this.pairs=t.pairs??Ic(this.nodes,t.pairOptions),this.motion={...cg,...t.motion},this.palette={...lg,...t.palette},this.foreground.set(this.palette.line),this.background.set(this.palette.background),this.rejected.set(this.palette.rejected),this.rng=br(((o=t.nodeOptions)==null?void 0:o.seed)??ui.seed),this.adjacency=gg(this.nodes.length,this.pairs);const e=Math.max(t.maxSlots??96,3600),n=1;this.slots=new Array(e).fill(null),this.linePositions=new Float32Array(new ArrayBuffer(e*4*3*4)),this.lineColors=new Float32Array(new ArrayBuffer(e*4*3*4)),this.nodePositions=new Float32Array(new ArrayBuffer(this.nodes.length*3*4)),this.nodeColors=new Float32Array(new ArrayBuffer(this.nodes.length*3*4)),this.eventPositions=new Float32Array(new ArrayBuffer(n*3*4)),this.eventAlphas=new Float32Array(new ArrayBuffer(n*4)),this.eventSizes=new Float32Array(new ArrayBuffer(n*4)),this.eventKinds=new Float32Array(new ArrayBuffer(n*4)),this.nodePolicyInfluences=new Float32Array(new ArrayBuffer(this.nodes.length*4)),this.nodePolicyTargets=new Float32Array(new ArrayBuffer(this.nodes.length*4)),this.activeNodePositions=this.nodes.map(s=>s.position.clone()),this.policyInfluenceA=Array.from({length:oi},()=>new ue),this.policyInfluenceB=Array.from({length:oi},()=>new ue),this.policyInfluenceC=Array.from({length:oi},()=>new ue),this.policyInfluenceD=Array.from({length:oi},()=>new ue),this.lineGeometry.setAttribute("position",new At(this.linePositions,3)),this.lineGeometry.setAttribute("color",new At(this.lineColors,3)),this.nodeGeometry.setAttribute("position",new At(this.nodePositions,3)),this.nodeGeometry.setAttribute("color",new At(this.nodeColors,3)),this.eventGeometry.setAttribute("position",new At(this.eventPositions,3)),this.eventGeometry.setAttribute("aAlpha",new At(this.eventAlphas,1)),this.eventGeometry.setAttribute("aSize",new At(this.eventSizes,1)),this.eventGeometry.setAttribute("aKind",new At(this.eventKinds,1)),this.lineMaterial=new Sr({vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1,blending:qe}),this.nodeMaterial=new Cc({vertexColors:!0,transparent:!0,opacity:this.motion.nodeOpacity,size:.135,sizeAttenuation:!0,depthWrite:!1}),this.eventMaterial=new Se({uniforms:{uRejected:{value:this.rejected}},vertexShader:`
        attribute float aAlpha;
        attribute float aSize;
        varying float vAlpha;

        void main() {
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPos;
          gl_PointSize = aSize * (150.0 / max(-mvPos.z, 0.001));
          vAlpha = aAlpha;
        }
      `,fragmentShader:`
        uniform vec3 uRejected;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;

          float radius = clamp(d / 0.5, 0.0, 1.0);
          float glow = pow(1.0 - radius, 2.05);
          float core = max(0.0, 1.0 - d / 0.24) * 0.28;
          float alpha = (glow * 0.58 + core) * vAlpha;
          gl_FragColor = vec4(uRejected, alpha);
        }
      `,transparent:!0,depthWrite:!1,depthTest:!1,blending:qe}),this.lineSegments=new wo(this.lineGeometry,this.lineMaterial),this.lineSegments.frustumCulled=!1,this.lineSegments.renderOrder=4,this.nodePoints=new Co(this.nodeGeometry,this.nodeMaterial),this.nodePoints.frustumCulled=!1,this.nodePoints.renderOrder=3,this.policyEventPoints=new Co(this.eventGeometry,this.eventMaterial),this.policyEventPoints.frustumCulled=!1,this.policyEventPoints.renderOrder=6,this.policyEventPoints.visible=!1,this.object3d.add(this.lineSegments,this.nodePoints),this.writeNodeColors(1),this.clearLines(),this.clearPolicyEvents()}setPalette(t){this.palette={...this.palette,...t},this.foreground.set(this.palette.line),this.background.set(this.palette.background),this.rejected.set(this.palette.rejected),this.writeNodeColors(this.motion.buildProgress)}setMotion(t){this.motion={...this.motion,...t},this.nodeMaterial.opacity=this.motion.nodeOpacity}reset(){for(let t=0;t<this.slots.length;t++)this.slots[t]=null;this.nodePolicyInfluences.fill(0),this.nodePolicyTargets.fill(0),this.nextSpawn=0,this.clearLines(),this.clearPolicyEvents()}update(t,e,n={}){Object.keys(n).length>0&&this.setMotion(n);const o=et.clamp(this.motion.buildProgress,0,1),s=et.smoothstep(o,0,1);this.object3d.rotation.y=Math.sin(t*this.motion.rotationSpeed*1.8)*.14*s,this.nodeMaterial.opacity=this.motion.nodeOpacity*s,this.updateNodePositions(t,s),this.retireExpired(t),this.spawnConnections(t,s),this.writeConnections(t,s,e),this.updatePolicyInfluences(t,e,s),this.writeNodeColors(s),this.writePolicyEvents(t,s)}dispose(){this.lineGeometry.dispose(),this.nodeGeometry.dispose(),this.eventGeometry.dispose(),this.lineMaterial.dispose(),this.nodeMaterial.dispose(),this.eventMaterial.dispose()}updateNodePositions(t,e){for(let n=0;n<this.nodes.length;n++){const o=this.nodes[n],s=this.activeNodePositions[n],a=o.position.clone().normalize(),r=Math.sin(t*this.motion.nodeDriftSpeed+o.phase)*this.motion.nodeDrift*o.weight*e;s.copy(o.position).addScaledVector(a,r),this.nodePositions[n*3+0]=s.x,this.nodePositions[n*3+1]=s.y,this.nodePositions[n*3+2]=s.z}this.nodeGeometry.attributes.position.needsUpdate=!0}retireExpired(t){for(let e=0;e<this.slots.length;e++){const n=this.slots[e];n&&t-n.startTime>this.connectionLifetime(n)&&(this.slots[e]=null)}}spawnConnections(t,e){if(this.pairs.length===0)return;this.nextSpawn===0&&(this.nextSpawn=t+.35);const n=Math.min(this.slots.length,Math.max(0,Math.floor(this.motion.maxActiveConnections))),o=Math.floor(n*e);if(this.slots.reduce((p,g)=>p+(g?1:0),0)>=o||t<this.nextSpawn)return;const a=this.slots.findIndex((p,g)=>g<n&&p===null);if(a<0)return;const r=Math.floor(this.rng()*this.pairs.length);let l=this.pickPolicyKind(e);const h=this.pairs[r],u=.34+this.rng()*.38;let c=-1;l==="rerouted"&&(c=this.pickAlternateNode(h,u),c<0&&(l="blocked")),this.slots[a]={pairIndex:r,startTime:t,duration:this.motion.connectionDuration*(.82+this.rng()*.36),seed:this.rng(),policyKind:l,blockT:u,alternateNodeIndex:c,policyEnergy:0,notchEnergy:0};const f=et.lerp(3,this.motion.spawnRate,e);this.nextSpawn=t+1/Math.max(f,.01)}writeConnections(t,e,n){const o=Math.max(.05,this.motion.growthPortion),s=Math.max(0,this.motion.holdPortion),a=Math.max(.05,this.motion.fadePortion),r=o+s+a,l=o/r,h=(o+s)/r;for(let u=0;u<this.slots.length;u++){const c=u*12,f=this.slots[u];if(!f){this.writeStructuralLine(u,c,t,e);continue}const p=this.pairs[f.pairIndex],g=this.activeNodePositions[p.start],v=this.activeNodePositions[p.end],m=(t-f.startTime)/Math.max(f.duration,.001),d=et.clamp(m,0,1),x=.86+Math.sin(t*8+f.seed*pi)*.08;if(f.policyKind==="blocked"||f.policyKind==="rerouted"&&f.alternateNodeIndex>=0){this.updateConnectionPolicyEnergy(f,d,e,n),f.policyKind==="blocked"?this.writeBlockedConnection(c,f,g,v,d,e,x):this.writeReroutedConnection(c,f,g,v,d,e,x);continue}let E=1,S=1;if(d<l){const U=d/l;E=1-Math.pow(1-U,2.2),S=et.smoothstep(U,0,.22)}else if(d<h)E=1,S=1;else{const U=(d-h)/Math.max(1-h,.001);E=1,S=1-et.smoothstep(U,0,1)}const D=S*this.motion.lineOpacity*e*x,C=fo.copy(g).lerp(v,E),w=f.policyKind==="approved"?this.policyEnvelope(f,d)*.18:0;this.writeLineSegment(c,g,C,D*(1+w)),this.writeHiddenLine(c+6)}this.lineGeometry.attributes.position.needsUpdate=!0,this.lineGeometry.attributes.color.needsUpdate=!0}writeBlockedConnection(t,e,n,o,s,a,r){const l=this.policyEnvelopeTiming(e),h=fo.copy(n).lerp(o,e.blockT),u=et.smoothstep(s,0,l.start),c=et.smoothstep(s,l.holdEnd,l.releaseEnd),f=s<l.start?e.blockT*u:e.blockT,p=e.blockT*c,g=s<l.start?et.smoothstep(u,0,.24):1,v=1-c*.96,m=g*v*this.motion.lineOpacity*a*r*4.8;if(m<=.001||p>=f-.002)this.writeHiddenLine(t);else{const S=ca.copy(n).lerp(o,p),D=s<l.start?cs.copy(n).lerp(o,f):h;this.writeLineSegment(t,S,D,m)}const d=e.notchEnergy;if(d<=.02){this.writeHiddenLine(t+6);return}const x=Math.min(e.blockT+.065,1),E=cs.copy(n).lerp(o,x);this.writeLineSegment(t+6,h,E,d*this.motion.lineOpacity*a*r*7.4)}writeReroutedConnection(t,e,n,o,s,a,r){const l=this.policyEnvelopeTiming(e),h=fo.copy(n).lerp(o,e.blockT),u=et.smoothstep(s,0,l.start),c=s<l.start?e.blockT*u:e.blockT,p=(s<l.start?et.smoothstep(u,0,.24):1)*this.motion.lineOpacity*a*r*4.4,g=s<l.start?ca.copy(n).lerp(o,c):h;this.writeLineSegment(t,n,g,p);const v=this.routeAnchorNodeIndex(e);if(v<0){this.writeHiddenLine(t+6);return}const m=this.activeNodePositions[v],d=this.activeNodePositions[e.alternateNodeIndex],x=et.smoothstep(s,l.holdEnd,l.releaseEnd),E=x*(1-Math.max(0,x-.78)/.22)*p*.9;if(E<=.001){this.writeHiddenLine(t+6);return}const S=cs.copy(m).lerp(d,x);this.writeLineSegment(t+6,m,S,E)}writeStructuralLine(t,e,n,o){if(o<=.001||this.pairs.length===0){this.writeHiddenLine(e),this.writeHiddenLine(e+6);return}const s=this.pairs[t*37%this.pairs.length],a=this.activeNodePositions[s.start],r=this.activeNodePositions[s.end],l=this.nodes[s.start],h=this.nodes[s.end],u=(l.weight+h.weight)*.5,c=.88+Math.sin(n*1.35+l.phase*.7+h.phase*.3)*.08+Math.sin(n*.53+t*.19)*.04,f=this.motion.lineOpacity*o*u*c*.62;this.writeLineSegment(e,a,r,f),this.writeHiddenLine(e+6)}writeHiddenLine(t){for(let e=0;e<6;e++)this.linePositions[t+e]=0;this.writeLineColor(t,0)}writeLineSegment(t,e,n,o){this.linePositions[t+0]=e.x,this.linePositions[t+1]=e.y,this.linePositions[t+2]=e.z,this.linePositions[t+3]=n.x,this.linePositions[t+4]=n.y,this.linePositions[t+5]=n.z,this.writeLineColor(t,o)}writeLineColor(t,e){const n=Xl.copy(this.background).lerp(this.foreground,et.clamp(e,0,1));this.lineColors[t+0]=n.r,this.lineColors[t+1]=n.g,this.lineColors[t+2]=n.b,this.lineColors[t+3]=n.r,this.lineColors[t+4]=n.g,this.lineColors[t+5]=n.b}clearLines(){for(let t=0;t<this.slots.length;t++){const e=t*12;this.writeHiddenLine(e),this.writeHiddenLine(e+6)}this.lineGeometry.attributes.position.needsUpdate=!0,this.lineGeometry.attributes.color.needsUpdate=!0}connectionLifetime(t){return t.policyKind==="blocked"||t.policyKind==="rerouted"?t.duration*(this.policyEnvelopeTiming(t).releaseEnd+.08):t.duration}pickPolicyKind(t){if(t<.82)return"normal";const e=this.rng();return e<.05?"approved":e<.24?"blocked":e<.4?"rerouted":"normal"}pickAlternateNode(t,e){const n=e<.52?t.start:t.end,o=n===t.start?t.end:t.start,s=fo.copy(this.activeNodePositions[t.start]).lerp(this.activeNodePositions[t.end],e),a=new Set([...this.adjacency[n],...this.adjacency[o]]);a.delete(t.start),a.delete(t.end);const r=[...a].map(h=>({nodeIndex:h,distance:s.distanceTo(this.activeNodePositions[h])})).filter(h=>h.distance<=Math.max(t.distance*2.8,2.6)).sort((h,u)=>h.distance-u.distance);if(r.length===0)return-1;const l=r.slice(0,Math.min(4,r.length));return l[Math.floor(this.rng()*l.length)].nodeIndex}routeAnchorNodeIndex(t){if(t.alternateNodeIndex<0)return-1;const e=this.pairs[t.pairIndex],n=t.alternateNodeIndex,o=this.adjacency[e.start].includes(n),s=this.adjacency[e.end].includes(n);return o&&s?t.blockT<.5?e.start:e.end:o?e.start:s?e.end:-1}policyTiming(t){const e=Math.max(.05,this.motion.growthPortion),n=Math.max(0,this.motion.holdPortion),o=Math.max(.05,this.motion.fadePortion),s=e+n+o,a=e/s,r=et.clamp(a*t.blockT,.12,.42),l=Math.min(r+.12,.62);return{interceptEnd:r,pauseEnd:l,resolveEnd:Math.min(l+.3,.86),routeEnd:Math.min(l+.44,.94)}}policyEnvelopeTiming(t){const e=this.policyTiming(t),n=.34+er(t.seed*12.137)*.12,o=t.policyKind==="rerouted"?.18:.1,s=1.75+er(t.seed*37.73)*.65,a=Math.max(t.duration,.001),r=e.interceptEnd,l=r+n/a,h=l+o/a;return{start:r,attackEnd:l,holdEnd:h,releaseEnd:h+s/a}}policyEnvelope(t,e){if(t.policyKind==="approved"){const a=this.policyTiming(t),r=Yl(e,a.interceptEnd-.08,a.interceptEnd),l=1-Yl(e,a.interceptEnd+.08,a.interceptEnd+.22);return et.clamp(r*l*.45,0,1)}const n=this.policyEnvelopeTiming(t),o=et.smoothstep(e,n.start,n.attackEnd),s=1-et.smoothstep(e,n.holdEnd,n.releaseEnd);return et.clamp(o*s,0,1)}updateConnectionPolicyEnergy(t,e,n,o){const s=this.policyEnvelopeTiming(t),a=this.policyEnvelope(t,e)*n,r=et.smoothstep(e,s.holdEnd,s.releaseEnd),l=t.policyKind==="blocked"?a*(1-r):0;t.policyEnergy=ua(t.policyEnergy,a,o,5.8,1.75),t.notchEnergy=ua(t.notchEnergy,l,o,6.4,2.2)}updatePolicyInfluences(t,e,n){if(this.nodePolicyTargets.fill(0),n>.001)for(const s of this.slots){if(!s||s.policyKind!=="blocked"&&s.policyKind!=="rerouted")continue;const a=this.pairs[s.pairIndex],r=s.policyEnergy*n;this.addNodePolicyTarget(a.start,r),this.addNodePolicyTarget(a.end,r),s.policyKind==="rerouted"&&s.alternateNodeIndex>=0&&this.addNodePolicyTarget(s.alternateNodeIndex,r)}const o=Math.min(Math.max(e,0),.05);for(let s=0;s<this.nodePolicyInfluences.length;s++){const a=this.nodePolicyInfluences[s],r=this.nodePolicyTargets[s];this.nodePolicyInfluences[s]=ua(a,r,o,4.8,1.7)}}addNodePolicyTarget(t,e){this.nodePolicyTargets[t]=Math.max(this.nodePolicyTargets[t],et.clamp(e,0,1))}policyKindValue(t){return t==="approved"?1:t==="blocked"?2:t==="rerouted"?3:0}writePolicyEvents(t,e){let n=0;this.object3d.updateMatrixWorld();for(let o=0;o<this.slots.length;o++){const s=this.slots[o];if(!s||s.policyKind==="normal"||s.policyKind==="approved")continue;const a=s.policyEnergy,r=this.pairs[s.pairIndex],l=this.activeNodePositions[r.start],h=this.activeNodePositions[r.end],u=fo.copy(l).lerp(h,s.blockT),c=this.policyKindValue(s.policyKind),f=this.nodePolicyInfluences[r.start],p=this.nodePolicyInfluences[r.end],g=s.alternateNodeIndex>=0?this.nodePolicyInfluences[s.alternateNodeIndex]:0,v=Math.max(a,f,p,g);if(n<oi&&s.policyKind!=="approved"){const m=ca.copy(l).applyMatrix4(this.object3d.matrixWorld),d=cs.copy(h).applyMatrix4(this.object3d.matrixWorld),x=dg.copy(u).applyMatrix4(this.object3d.matrixWorld),E=s.alternateNodeIndex>=0?Wl.copy(this.activeNodePositions[s.alternateNodeIndex]).applyMatrix4(this.object3d.matrixWorld):Wl.set(0,0,0);this.policyInfluenceA[n].set(x.x,x.y,x.z,v),this.policyInfluenceB[n].set(m.x,m.y,m.z,c),this.policyInfluenceC[n].set(d.x,d.y,d.z,s.blockT),this.policyInfluenceD[n].set(E.x,E.y,E.z,s.alternateNodeIndex>=0?1:0),n++}}for(let o=0;o<this.eventAlphas.length;o++)this.eventPositions[o*3+0]=0,this.eventPositions[o*3+1]=0,this.eventPositions[o*3+2]=0,this.eventAlphas[o]=0,this.eventSizes[o]=0,this.eventKinds[o]=0;for(let o=n;o<oi;o++)this.policyInfluenceA[o].set(0,0,0,0),this.policyInfluenceB[o].set(0,0,0,0),this.policyInfluenceC[o].set(0,0,0,0),this.policyInfluenceD[o].set(0,0,0,0);this.policyInfluenceCount.value=n,this.eventGeometry.attributes.position.needsUpdate=!0,this.eventGeometry.attributes.aAlpha.needsUpdate=!0,this.eventGeometry.attributes.aSize.needsUpdate=!0,this.eventGeometry.attributes.aKind.needsUpdate=!0}clearPolicyEvents(){for(let t=0;t<this.eventAlphas.length;t++)this.eventPositions[t*3+0]=0,this.eventPositions[t*3+1]=0,this.eventPositions[t*3+2]=0,this.eventAlphas[t]=0,this.eventSizes[t]=0,this.eventKinds[t]=0;for(let t=0;t<oi;t++)this.policyInfluenceA[t].set(0,0,0,0),this.policyInfluenceB[t].set(0,0,0,0),this.policyInfluenceC[t].set(0,0,0,0),this.policyInfluenceD[t].set(0,0,0,0);this.policyInfluenceCount.value=0,this.eventGeometry.attributes.position.needsUpdate=!0,this.eventGeometry.attributes.aAlpha.needsUpdate=!0,this.eventGeometry.attributes.aSize.needsUpdate=!0,this.eventGeometry.attributes.aKind.needsUpdate=!0}writeNodeColors(t){for(let e=0;e<this.nodes.length;e++){const n=this.motion.nodeOpacity*t*this.nodes[e].weight,o=Xl.copy(this.background).lerp(this.foreground,n);this.nodeColors[e*3+0]=o.r,this.nodeColors[e*3+1]=o.g,this.nodeColors[e*3+2]=o.b}this.nodeGeometry.attributes.color.needsUpdate=!0}}const fo=new A,ca=new A,cs=new A,dg=new A,Wl=new A,Xl=new St;function fg(i,t,e,n,o){const s=e+n*Math.cos(t);return new A(s*Math.cos(i),s*Math.sin(i),n*Math.sin(t)*o)}function er(i){return i-Math.floor(i)}function Yl(i,t,e){return et.clamp((i-t)/Math.max(e-t,.001),0,1)}function ua(i,t,e,n,o){const s=t>i?n:o,a=1-Math.exp(-s*Math.min(Math.max(e,0),.05));return i+(t-i)*a}function pg(i,t,e,n){const o=.5+.5*Math.sin(i*n+Math.sin(t*1.7)*1.2+Math.cos(i*.67)*1.1),s=.5+.5*Math.sin(i*3.3-t*2.15+Math.sin(i*1.21+t*.81)*1.8),a=.5+.5*Math.sin(i*1.05+t*.58-.9),r=.5+.5*Math.cos(i*9+t*3),l=o*.34+s*.32+a*.2+r*.14,h=Math.pow(et.clamp(l,0,1),1.85);return et.clamp(et.lerp(1-e,1,h),.015,1)}function mg(i){const t=Math.max(i(),1e-7),e=Math.max(i(),1e-7);return Math.sqrt(-2*Math.log(t))*Math.cos(pi*e)}function br(i){let t=i>>>0;return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function gg(i,t){const e=Array.from({length:i},()=>[]);for(const n of t)e[n.start].push(n.end),e[n.end].push(n.start);return e}function vg(i,t,e,n,o){const s=ql(i.majorIndex,t.majorIndex,e),a=ql(i.minorIndex,t.minorIndex,n);return s<=o.maxMajorStep&&a<=o.maxMinorStep}function ql(i,t,e){const n=Math.abs(i-t);return Math.min(n,e-n)}const Uc={radius:11.8,shellDepth:1.45,strandCount:86,strandCoverage:.72,strandArc:1.9,strandWobble:.24,voidCount:0,voidRadius:0,seed:42},_g={background:"#F5F5F4",ink:"#1C1917",rust:"#A4513E"},nn={...Uc,particleCount:36e3,maxConnections:18,localDegree:0,maxConnectionDistance:0,pointSize:.88,pointOpacity:.2,lineOpacity:0,palette:_g,motion:{rotationSpeed:0,breathStrength:.32,breathAmplitude:1.56,breathSpeed:2.37,strandDrift:.32,surfaceJitter:.115,connectionPulse:.82}},Fc=1.34,Nc=.98,Oc=1.03,$l=10.65,xg=-10.4,yg=6.8,Sg=.78,Mg=1.08;function Gi(i){return et.clamp(($l-i)/($l-xg),0,1)}function Eg(i){return et.lerp(yg,Sg,Math.pow(Gi(i),Mg))}const be=[{y:10.65,depth:1.2,weight:.13},{y:9.15,depth:1.14,weight:.12},{y:7.65,depth:1.06,weight:.11},{y:6.2,depth:.98,weight:.1},{y:3.45,depth:.86,weight:.095},{y:1.25,depth:.76,weight:.09},{y:-.85,depth:.66,weight:.085},{y:-3.15,depth:.56,weight:.08},{y:-5.55,depth:.46,weight:.075},{y:-7.35,depth:.38,weight:.065},{y:-8.95,depth:.32,weight:.055},{y:-10.4,depth:.26,weight:.05}].map(i=>({...i,radius:Eg(i.y)})),Tg=`
uniform float uTime;
uniform float uElapsed;
uniform float uNoiseStrength;
uniform float uPixelRatio;
uniform float uPointSize;
uniform float uOpacity;
uniform float uDepthFade;
uniform float uResolveDuration;
uniform float uBreathStrength;
uniform float uBreathSpeed;
uniform float uBreathAmplitude;
uniform float uActivityStrength;
uniform float uReducedMotion;

attribute vec3 aOrb;
attribute vec3 aCore;
attribute vec3 aNormal;
attribute vec4 aMeta;
attribute vec4 aSeed;

varying float vAlpha;
varying float vEnergy;
varying float vRust;

float sat(float v) {
  return clamp(v, 0.0, 1.0);
}

float easeInOutCubic(float t) {
  t = sat(t);
  return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) * 0.5;
}

float smoother(float t) {
  t = sat(t);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec3 fieldNoise(vec3 p, float t, vec4 seed) {
  return vec3(
    sin(p.y * 1.73 + p.z * 0.61 + t * 0.73 + seed.x * 6.28318),
    sin(p.z * 1.81 + p.x * 0.67 + t * 0.69 + seed.y * 6.28318),
    sin(p.x * 1.67 + p.y * 0.83 + t * 0.71 + seed.z * 6.28318)
  ) * 0.333;
}

float cyclicDistance(float a, float b) {
  float d = abs(a - b);
  return min(d, 1.0 - d);
}

float arcSweep(float coord, float phase, float headWidth, float wakeWidth) {
  float head = 1.0 - smoothstep(0.0, headWidth, cyclicDistance(coord, phase));
  float wake = 1.0 - smoothstep(0.0, wakeWidth, cyclicDistance(coord, fract(phase - headWidth * 0.72)));
  return head * 0.82 + wake * 0.18;
}

float gaussianPulse(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-0.5 * x * x);
}

float funnelBreathWave(float verticalT, float speed) {
  float waveSpeed = max(speed, 0.0) / 5.75;
  float head = fract(uTime * waveSpeed);
  float width = mix(0.24, 0.15, verticalT);
  float body = gaussianPulse(cyclicDistance(verticalT, head), width);
  float gather = gaussianPulse(cyclicDistance(verticalT, fract(head - 0.11)), width * 1.34) * 0.36;
  float release = gaussianPulse(cyclicDistance(verticalT, fract(head + 0.19)), width * 1.72) * 0.18;
  float undertone = 0.045 + 0.035 * smoother(0.5 + 0.5 * sin(uTime * (0.12 + speed * 0.14) + verticalT * 5.4));
  return smoother(sat(body + gather + release + undertone));
}

float funnelTForY(float y) {
  return clamp((10.65 - y) / 21.05, 0.0, 1.0);
}

float funnelRadiusProfile(float y) {
  return mix(6.8, 0.78, pow(funnelTForY(y), 1.08));
}

float layerBand(float y, float ringY, float width) {
  return 1.0 - smoothstep(0.0, width, abs(y - ringY));
}

float ringBand(float y, float r, float ringY, float ringRadius) {
  float taper = funnelTForY(ringY);
  float yBand = 1.0 - smoothstep(0.0, mix(0.68, 0.34, taper), abs(y - ringY));
  float rBand = 1.0 - smoothstep(0.0, mix(1.08, 0.34, taper), abs(r - ringRadius));
  return yBand * rBand;
}

float ringSweep(float y, float r, float theta, float ringY, float ringRadius, float phaseSeed) {
  float band = ringBand(y, r, ringY, ringRadius);
  float thetaT = fract(theta / 6.28318 + 1.0);
  float phase = fract(uTime * (0.028 + phaseSeed * 0.0035) + phaseSeed);
  float taper = funnelTForY(ringY);
  float primary = arcSweep(thetaT, phase, mix(0.074, 0.038, taper), mix(0.22, 0.105, taper));
  float secondary = arcSweep(thetaT, fract(phase + 0.36 + phaseSeed * 0.06), mix(0.06, 0.032, taper), mix(0.17, 0.088, taper)) * 0.58;
  float tertiary = arcSweep(thetaT, fract(phase + 0.71 - phaseSeed * 0.04), mix(0.052, 0.03, taper), mix(0.145, 0.078, taper)) * 0.38;
  return band * sat(primary + secondary + tertiary);
}

float blockedGate(float phaseSeed) {
  float gate = cyclicDistance(fract(uTime * 0.018 + phaseSeed * 1.73), 0.58);
  return 1.0 - smoothstep(0.0, 0.04, gate);
}

float nearestRingRadius(float y) {
  return funnelRadiusProfile(y);
}

void main() {
  float role = aMeta.x;
  float delay = aMeta.y;
  float pathPhase = aMeta.z;
  float sizeSeed = aMeta.w;
  float shellRole = 1.0 - step(1.5, role);
  float surfaceRole = step(0.5, role) * (1.0 - step(1.5, role));
  float coreRole = step(1.5, role);

  float resolveWindow = max(uResolveDuration, 0.2);
  float resolve = uReducedMotion > 0.5
    ? 1.0
    : smoother((uElapsed - delay * 1.05) / resolveWindow);
  float steady = smoother((resolve - 0.62) / 0.38);

  vec3 normal = normalize(aNormal + vec3(0.0001));
  float layerSwell = sin(uTime * uBreathSpeed + pathPhase * 6.28318 + aSeed.x * 0.9);
  float localSwell = sin(uTime * (uBreathSpeed * 0.63 + 0.08) + aSeed.y * 6.28318);
  float breath = (layerSwell * 0.74 + localSwell * 0.26) * uBreathStrength;
  vec3 orbPos = aOrb + normal * breath * (0.34 + surfaceRole * 0.42) * steady;
  vec3 corePos = aCore;
  vec3 target = mix(orbPos, corePos, coreRole);

  vec3 gatherPos = position + fieldNoise(position * 0.32, uTime, aSeed) * 0.24;
  vec3 pos = mix(gatherPos, target, smoother(resolve));

  float swellHit = surfaceRole * smoother(0.5 + 0.5 * layerSwell) * steady;

  float y = pos.y / 1.03;
  vec2 unscaledPlane = vec2(pos.x / 1.34, pos.z / 0.98);
  float r = length(unscaledPlane);
  float theta = atan(unscaledPlane.y, unscaledPlane.x);
  float taper = funnelTForY(y);
  float breathEnergy = funnelBreathWave(taper, uBreathSpeed) * uBreathAmplitude;
  float ringActivity = 0.0;
  float ringProximity = 0.0;
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 10.65, funnelRadiusProfile(10.65), 0.07));
  ringProximity = max(ringProximity, ringBand(y, r, 10.65, funnelRadiusProfile(10.65)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 9.15, funnelRadiusProfile(9.15), 0.18));
  ringProximity = max(ringProximity, ringBand(y, r, 9.15, funnelRadiusProfile(9.15)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 7.65, funnelRadiusProfile(7.65), 0.29));
  ringProximity = max(ringProximity, ringBand(y, r, 7.65, funnelRadiusProfile(7.65)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 6.2, funnelRadiusProfile(6.2), 0.41));
  ringProximity = max(ringProximity, ringBand(y, r, 6.2, funnelRadiusProfile(6.2)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 3.45, funnelRadiusProfile(3.45), 0.53));
  ringProximity = max(ringProximity, ringBand(y, r, 3.45, funnelRadiusProfile(3.45)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 1.25, funnelRadiusProfile(1.25), 0.64));
  ringProximity = max(ringProximity, ringBand(y, r, 1.25, funnelRadiusProfile(1.25)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -0.85, funnelRadiusProfile(-0.85), 0.75));
  ringProximity = max(ringProximity, ringBand(y, r, -0.85, funnelRadiusProfile(-0.85)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -3.15, funnelRadiusProfile(-3.15), 0.86));
  ringProximity = max(ringProximity, ringBand(y, r, -3.15, funnelRadiusProfile(-3.15)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -5.55, funnelRadiusProfile(-5.55), 0.98));
  ringProximity = max(ringProximity, ringBand(y, r, -5.55, funnelRadiusProfile(-5.55)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -7.35, funnelRadiusProfile(-7.35), 1.09));
  ringProximity = max(ringProximity, ringBand(y, r, -7.35, funnelRadiusProfile(-7.35)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -8.95, funnelRadiusProfile(-8.95), 1.2));
  ringProximity = max(ringProximity, ringBand(y, r, -8.95, funnelRadiusProfile(-8.95)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -10.4, funnelRadiusProfile(-10.4), 1.31));
  ringProximity = max(ringProximity, ringBand(y, r, -10.4, funnelRadiusProfile(-10.4)));

  float largeLayer =
    max(
      max(max(layerBand(y, 9.15, 0.52), layerBand(y, 7.65, 0.5)), max(layerBand(y, 6.2, 0.48), layerBand(y, 3.45, 0.44))),
      max(max(layerBand(y, 1.25, 0.4), layerBand(y, -0.85, 0.36)), max(layerBand(y, -3.15, 0.32), layerBand(y, -5.55, 0.28)))
    );
  float spokeCell = abs(fract(theta / 6.28318 * 128.0 + 0.5) - 0.5);
  float spokeLane = 1.0 - smoothstep(0.0, 0.082, spokeCell);
  float activity = 0.66 + uActivityStrength * 0.5;
  float radialFront = fract(uTime * (0.052 + uActivityStrength * 0.03) + pathPhase * 0.37);
  float radialT = clamp(r / max(nearestRingRadius(y), 0.1), 0.0, 1.24);
  float spokeHead = 1.0 - smoothstep(0.0, 0.082, abs(radialT - radialFront));
  float spokeWake = 1.0 - smoothstep(0.0, 0.22, abs(radialT - radialFront));
  float radialFrontTwo = fract(radialFront + 0.46 + pathPhase * 0.07);
  float spokeHeadTwo = 1.0 - smoothstep(0.0, 0.07, abs(radialT - radialFrontTwo));
  float spokeActivity = largeLayer * spokeLane * sat(spokeHead * 0.58 + spokeWake * 0.16 + spokeHeadTwo * 0.24 + breathEnergy * 0.42);

  float routeRole = 1.0 - smoothstep(0.0, 0.12, abs(role - 1.28));
  float routePhase = fract(uTime * (0.048 + uActivityStrength * 0.034) + aSeed.x * 0.2);
  float routeDelta = abs(pathPhase - routePhase);
  float routeHead = 1.0 - smoothstep(0.0, 0.064, routeDelta);
  float routeWake = 1.0 - smoothstep(0.0, 0.2, routeDelta);
  float routeActivity = routeRole * (routeHead * 0.5 + routeWake * 0.16 + breathEnergy * 0.36);

  float policyGate = blockedGate(0.5 + floor(y * 0.37) * 0.13);
  float rustMix = ringActivity * policyGate * 0.38;
  float breathCarrier = sat(0.38 + ringProximity * 0.54 + largeLayer * 0.18 + routeRole * 0.22);
  float materialBreath = breathEnergy * breathCarrier * mix(0.88, 1.26, taper);
  float localActivity = max(max(ringActivity * 0.72, spokeActivity), max(routeActivity, materialBreath)) * activity;
  float targetRingRadius = nearestRingRadius(y);
  float ringNear = 1.0 - smoothstep(0.0, 1.05, abs(r - targetRingRadius));
  float tighten = sat(ringActivity * 0.16 + materialBreath * 0.42 + spokeActivity * 0.08 + routeActivity * 0.08) * ringNear * steady * activity;
  float currentR = max(length(unscaledPlane), 0.0001);
  float tightenedR = mix(currentR, targetRingRadius, tighten);
  unscaledPlane *= tightenedR / currentR;
  pos.x = unscaledPlane.x * 1.34;
  pos.z = unscaledPlane.y * 0.98;
  vec3 localRadial = normalize(vec3(pos.x, 0.0, pos.z) + vec3(0.0001, 0.0, 0.0));
  pos += normal * (ringActivity * 0.024 + materialBreath * mix(0.05, 0.024, taper) + spokeActivity * 0.022 + routeActivity * 0.018) * steady * activity;
  pos += localRadial * materialBreath * mix(0.052, 0.018, taper) * steady;
  pos += localRadial * rustMix * 0.036 * steady;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  float depth = max(-mvPos.z, 0.001);
  float coreIgnition = coreRole * smoother(0.5 + 0.5 * sin(uTime * 1.2 + aSeed.w * 6.28318));
  float shellAlpha = (mix(0.2, 0.64, shellRole) + surfaceRole * 0.24) * (0.54 + 0.46 * steady);
  vEnergy = max(max(coreIgnition * 1.1, swellHit * 0.72), localActivity * 0.56);
  vAlpha = uOpacity * mix(shellAlpha, 1.0, sat(vEnergy));
  vAlpha *= 1.0 + localActivity * 0.24 + materialBreath * 0.18;
  vAlpha *= 1.0 - uDepthFade * smoothstep(18.0, 42.0, depth);
  vRust = rustMix * 0.72;

  float size = mix(0.5 + sizeSeed * 0.38 + surfaceRole * 0.22, 0.95, coreRole);
  size += swellHit * 0.24 + coreIgnition * 0.24 + localActivity * 0.16 + materialBreath * 0.38;
  gl_PointSize = uPointSize * uPixelRatio * size * (72.0 / depth);
  gl_PointSize = clamp(gl_PointSize, 0.32 * uPixelRatio, 5.2 * uPixelRatio);
}
`,bg=`
uniform vec3 uInk;
uniform vec3 uRust;
varying float vAlpha;
varying float vEnergy;
varying float vRust;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.1, d);
  float hot = smoothstep(0.24, 0.0, d) * vEnergy * 0.32;
  vec3 color = mix(uInk, uRust, clamp(vRust, 0.0, 1.0));
  gl_FragColor = vec4(color, soft * vAlpha + hot * vAlpha);
}
`,Ag=`
uniform float uTime;
uniform float uElapsed;
uniform float uResolveDuration;
uniform float uLineOpacity;
uniform float uActivityStrength;
uniform float uBreathAmplitude;
uniform float uBreathSpeed;
uniform float uReducedMotion;

attribute vec4 aLineMeta;
varying float vAlpha;
varying float vRust;

float sat(float v) {
  return clamp(v, 0.0, 1.0);
}

float smoother(float t) {
  t = sat(t);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float cyclicDistance(float a, float b) {
  float d = abs(a - b);
  return min(d, 1.0 - d);
}

float arcSweep(float coord, float phase, float headWidth, float wakeWidth) {
  float head = 1.0 - smoothstep(0.0, headWidth, cyclicDistance(coord, phase));
  float wake = 1.0 - smoothstep(0.0, wakeWidth, cyclicDistance(coord, fract(phase - headWidth * 0.74)));
  return head * 0.82 + wake * 0.18;
}

float gaussianPulse(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-0.5 * x * x);
}

float funnelBreathWave(float verticalT, float speed) {
  float waveSpeed = max(speed, 0.0) / 5.75;
  float head = fract(uTime * waveSpeed);
  float width = mix(0.24, 0.15, verticalT);
  float body = gaussianPulse(cyclicDistance(verticalT, head), width);
  float gather = gaussianPulse(cyclicDistance(verticalT, fract(head - 0.11)), width * 1.34) * 0.36;
  float release = gaussianPulse(cyclicDistance(verticalT, fract(head + 0.19)), width * 1.72) * 0.18;
  float undertone = 0.045 + 0.035 * smoother(0.5 + 0.5 * sin(uTime * (0.12 + speed * 0.14) + verticalT * 5.4));
  return smoother(sat(body + gather + release + undertone));
}

float pathFront(float coord, float phase, float headWidth, float wakeWidth) {
  float delta = abs(coord - phase);
  float head = 1.0 - smoothstep(0.0, headWidth, delta);
  float wake = 1.0 - smoothstep(0.0, wakeWidth, abs(coord - max(phase - headWidth * 0.76, -1.0)));
  return head * 0.82 + wake * 0.18;
}

float funnelTForY(float y) {
  return clamp((10.65 - y) / 21.05, 0.0, 1.0);
}

float funnelRadiusProfile(float y) {
  return mix(6.8, 0.78, pow(funnelTForY(y), 1.08));
}

float nearestRingRadius(float y) {
  return funnelRadiusProfile(y);
}

void main() {
  float lane = aLineMeta.x;
  float path = aLineMeta.y;
  float laneDelay = aLineMeta.z;
  float layer = aLineMeta.w;
  float resolve = uReducedMotion > 0.5 ? 1.0 : smoother(uElapsed / max(uResolveDuration, 0.2));
  float steady = smoother((resolve - 0.46) / 0.54);
  float swell = smoother(0.5 + 0.5 * sin(uTime * 0.42 + layer * 1.7 + lane * 0.09));
  float carrier = 0.2 + 0.12 * swell;
  float layerWeight = mix(1.0, 0.78, step(0.5, layer));
  layerWeight = mix(layerWeight, 0.62, step(1.5, layer));
  layerWeight = mix(layerWeight, 0.46, step(2.5, layer));
  vAlpha = uLineOpacity * steady * layerWeight * carrier;
  vec3 pos = position;
  float ringLine = 1.0 - step(0.5, layer);
  float routedLine = step(0.5, layer) * (1.0 - step(1.5, layer));
  float spokeLine = step(1.5, layer) * (1.0 - step(2.5, layer));
  float spineLine = step(2.5, layer);
  float y = pos.y / 1.03;
  float r = length(vec2(pos.x / 1.34, pos.z / 0.98));
  float taper = funnelTForY(y);

  float activity = 0.66 + uActivityStrength * 0.5;
  float breathEnergy = funnelBreathWave(taper, uBreathSpeed) * uBreathAmplitude;
  float ringPulse = ringLine * breathEnergy;
  float routePulse = routedLine * breathEnergy * 0.32;
  float ringPhase = fract(uTime * (0.03 + laneDelay * 0.004) + laneDelay);
  float ringSweepA = arcSweep(path, ringPhase, mix(0.072, 0.038, taper), mix(0.21, 0.105, taper));
  float ringSweepB = arcSweep(path, fract(ringPhase + 0.35 + laneDelay * 0.05), mix(0.058, 0.032, taper), mix(0.16, 0.088, taper)) * 0.6;
  float ringSweepC = arcSweep(path, fract(ringPhase + 0.72 - laneDelay * 0.04), mix(0.05, 0.03, taper), mix(0.14, 0.078, taper)) * 0.38;
  float ringSweep = ringLine * sat(ringSweepA + ringSweepB + ringSweepC);

  float routePhase = fract(uTime * (0.056 + uActivityStrength * 0.036) + laneDelay * 0.73);
  float routeTraceA = pathFront(path, routePhase, 0.05, 0.18);
  float routeTraceB = pathFront(path, fract(routePhase + 0.52 + laneDelay * 0.07), 0.042, 0.13) * 0.32;
  float routeTrace = routedLine * sat(routeTraceA + routeTraceB);

  float radialT = clamp(r / max(nearestRingRadius(y), 0.1), 0.0, 1.25);
  float spokeFront = fract(uTime * (0.058 + uActivityStrength * 0.032) + laneDelay * 0.41);
  float spokeHead = 1.0 - smoothstep(0.0, 0.088, abs(radialT - spokeFront));
  float spokeWake = 1.0 - smoothstep(0.0, 0.23, abs(radialT - spokeFront));
  float spokeFrontTwo = fract(spokeFront + 0.47 + laneDelay * 0.05);
  float spokeHeadTwo = 1.0 - smoothstep(0.0, 0.076, abs(radialT - spokeFrontTwo));
  float spokeWave = spokeLine * sat(spokeHead * 0.72 + spokeWake * 0.2 + spokeHeadTwo * 0.32);

  float policyGate = 1.0 - smoothstep(0.0, 0.034, cyclicDistance(fract(uTime * 0.013 + laneDelay * 1.83), 0.62));
  float blocked = ringSweep * policyGate;
  float approved = ringSweep * (1.0 - policyGate);
  float junction = 1.0 - smoothstep(0.035, 0.14, min(path, 1.0 - path));
  float rerouteGate = 1.0 - smoothstep(0.0, 0.045, cyclicDistance(fract(uTime * 0.018 + laneDelay * 1.17), 0.44));
  float rerouted = routeTrace * junction * rerouteGate;
  float spineTension = spineLine * (0.12 + 0.16 * smoother(0.5 + 0.5 * sin(uTime * 0.31 + path * 5.4)));

  vec3 localRadial = normalize(vec3(pos.x, 0.0, pos.z) + vec3(0.0001, 0.0, 0.0));
  pos += localRadial * (blocked * 0.048 - approved * 0.02 + ringPulse * mix(0.04, 0.02, taper) + spokeWave * 0.024 + routeTrace * 0.014 + routePulse * 0.012) * steady * activity;
  vAlpha += uLineOpacity * steady * activity * (approved * 1.06 + blocked * 0.98 + ringPulse * mix(1.45, 1.9, taper) + spokeWave * 0.76 + routeTrace * 1.16 + routePulse * 0.55 + rerouted * 0.42 + spineTension * 0.16);
  vRust = blocked * 0.68 + rerouted * 0.16;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`,wg=`
uniform vec3 uInk;
uniform vec3 uRust;
varying float vAlpha;
varying float vRust;

void main() {
  gl_FragColor = vec4(mix(uInk, uRust, clamp(vRust, 0.0, 1.0)), vAlpha);
}
`;function Cg(i){let t=i>>>0;return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Rg(i){const t=i()*2-1,e=i()*Math.PI*2,n=Math.sqrt(Math.max(0,1-t*t));return new A(Math.cos(e)*n,Math.sin(e)*n,t)}function ri(i,t,e,n=0){const o=i+n;return new A(Math.cos(e)*o,t,Math.sin(e)*o)}function si(i,t,e,n=0){const o=ri(i,t,e,n);return o.x*=Fc,o.z*=Nc,o.y*=Oc,o}function jl(i,t=be){const e=t.reduce((o,s)=>o+s.weight,0);let n=i()*e;for(const o of t)if(n-=o.weight,n<=0)return o;return t[t.length-1]}function Pg(i){const t=i();let e=new A,n=1,o=i();if(t<.52){const a=jl(i),r=Gi(a.y),l=i()<.78,h=Math.floor(i()*256),u=l?h/256*Math.PI*2+(i()-.5)*.008:i()*Math.PI*2,c=i()<et.lerp(.62,.88,r),f=i()<.04?et.lerp(.08,.22,r)+i()*.08:et.lerp(.22,.42,r)+i()*.08,p=c?et.lerp(.58,.82,r)+i()*et.lerp(.56,.21,r):f+Math.pow(i(),et.lerp(.46,.82,r))*(et.lerp(1.02,.91,r)-f),g=a.radius*p,v=Math.pow(Math.min(p,1.08),2),m=i()<.52?-1:1,d=a.y+m*a.depth*et.lerp(.24+.68*v,.1+.3*v,r)+Math.sin(u*3+a.y)*et.lerp(.065,.02,r);e=ri(g,d,u,(i()-.5)*et.lerp(l?.075:.15,l?.026:.05,r)),o=p}else if(t<.6){n=1.28;const a=i()<.5?{fromY:be[0].y,fromR:be[0].radius,toY:be[3].y,toR:be[3].radius}:{fromY:be[7].y,fromR:be[7].radius*.84,toY:be[11].y,toR:be[11].radius},r=i(),l=et.smoothstep(r,0,1),h=et.lerp(a.fromY,a.toY,l),u=et.lerp(a.fromR,a.toR,l)+Math.sin(r*Math.PI)*.24,c=i()*Math.PI*2+l*(a.fromY>0?1.25:-1.45)+Math.sin(r*Math.PI*2+i()*Math.PI*2)*.18;e=ri(u,h,c,(i()-.5)*.035),o=r}else if(t<.72){n=1.28;const a=[{from:0,to:2},{from:2,to:4},{from:4,to:6},{from:6,to:8},{from:8,to:11}],r=a[Math.floor(i()*a.length)],l=be[r.from],h=be[r.to],u=i(),c=et.smoothstep(u,0,1),f=et.lerp(l.y,h.y,c),p=Gi(f),g=et.lerp(l.radius*.88,h.radius*.9,c)+Math.sin(u*Math.PI)*(et.lerp(.28,.1,p)+i()*et.lerp(.36,.12,p)),v=Math.floor(i()*64),m=(v%2===0?1:-1)*(.54+i()*.46),d=v/64*Math.PI*2+m*c+Math.sin(u*Math.PI*2+v*.37)*.11;e=ri(g,f,d,(i()-.5)*.035),o=u}else if(t<.996){const a=jl(i),r=Gi(a.y),l=i()<et.lerp(.72,.9,r),h=Math.floor(i()*256),u=l?h/256*Math.PI*2+(i()-.5)*.012:i()*Math.PI*2,c=a.radius*(.99+(i()-.5)*et.lerp(.14,.045,r));e=ri(c,a.y+(i()-.5)*a.depth*et.lerp(.34,.12,r),u,(i()-.5)*et.lerp(.08,.024,r)),o=u/(Math.PI*2)}else if(t<.998){const a=i(),r=et.lerp(be[11].y+.8,be[0].y-.75,a),l=.18+Math.pow(i(),2.6)*.06,h=i()*Math.PI*2+a*.55;e=ri(l,r,h,0),n=1,o=a}else{const a=i(),r=et.lerp(be[10].y,be[2].y,a),l=.62+Math.sin(a*Math.PI*6)*.3+i()*.18,h=i()*Math.PI*2;e=ri(Math.max(.08,l),r,h,0),n=1,o=a}e.x*=Fc,e.z*=Nc,e.y*=Oc;const s=e.clone().normalize();return{target:e,normal:s,role:n,phase:o}}class Dg{constructor(t={}){var e;this.group=new Yn,this.options=nn,this.geometry=new de,this.lineGeometry=new de,this.ink=new St,this.rust=new St,this.startTime=0,this.wasActive=!1,this.reducedMotion=typeof window<"u"&&((e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)").matches),this.options=this.mergeOptions(t),this.ink.set(this.options.palette.ink),this.rust.set(this.options.palette.rust),this.material=new Se({vertexShader:Tg,fragmentShader:bg,uniforms:{uTime:{value:0},uElapsed:{value:0},uNoiseStrength:{value:this.reducedMotion?.012:this.options.motion.surfaceJitter},uPixelRatio:{value:typeof window>"u"?1:Math.min(window.devicePixelRatio,2)},uPointSize:{value:this.options.pointSize},uOpacity:{value:this.options.pointOpacity},uDepthFade:{value:.18},uResolveDuration:{value:3.2},uBreathStrength:{value:this.options.motion.breathStrength},uBreathSpeed:{value:this.options.motion.breathSpeed},uBreathAmplitude:{value:this.options.motion.breathAmplitude},uActivityStrength:{value:this.options.motion.connectionPulse},uReducedMotion:{value:this.reducedMotion?1:0},uInk:{value:this.ink},uRust:{value:this.rust}},transparent:!0,depthWrite:!1,depthTest:!0,blending:qe}),this.lineMaterial=new Se({vertexShader:Ag,fragmentShader:wg,uniforms:{uTime:{value:0},uElapsed:{value:0},uResolveDuration:{value:3.2},uLineOpacity:{value:this.options.lineOpacity},uActivityStrength:{value:this.options.motion.connectionPulse},uBreathAmplitude:{value:this.options.motion.breathAmplitude},uBreathSpeed:{value:this.options.motion.breathSpeed},uReducedMotion:{value:this.reducedMotion?1:0},uInk:{value:this.ink},uRust:{value:this.rust}},transparent:!0,depthWrite:!1,depthTest:!0,blending:qe}),this.points=new Co(this.geometry,this.material),this.strands=new wo(this.lineGeometry,this.lineMaterial),this.points.frustumCulled=!1,this.strands.frustumCulled=!1,this.strands.visible=!1,this.strands.renderOrder=1,this.points.renderOrder=1,this.group.add(this.points),this.rebuild(t)}rebuild(t={}){this.options=this.mergeOptions(t),this.writeGeometry(),this.applyFutureFlowerTargets(),this.setPalette(this.options.palette),this.setVisuals(this.options),this.setMotion(this.options.motion)}setFutureFlowerTargets(t){this.futureFlowerTargets=t,this.strands.visible=!1,this.applyFutureFlowerTargets()}setActive(t,e){t&&!this.wasActive&&(this.startTime=e),this.wasActive=t}setMotion(t){this.options.motion={...this.options.motion,...t},this.material.uniforms.uBreathStrength.value=this.reducedMotion?Math.min(this.options.motion.breathStrength,.035):this.options.motion.breathStrength,this.material.uniforms.uBreathSpeed.value=this.options.motion.breathSpeed,this.lineMaterial.uniforms.uBreathSpeed.value=this.options.motion.breathSpeed;const e=this.reducedMotion?Math.min(this.options.motion.breathAmplitude,.18):this.options.motion.breathAmplitude;this.material.uniforms.uBreathAmplitude.value=e,this.lineMaterial.uniforms.uBreathAmplitude.value=e,this.material.uniforms.uNoiseStrength.value=this.reducedMotion?.012:this.options.motion.surfaceJitter,this.material.uniforms.uActivityStrength.value=this.reducedMotion?Math.min(this.options.motion.connectionPulse,.12):this.options.motion.connectionPulse,this.lineMaterial.uniforms.uActivityStrength.value=this.options.motion.connectionPulse}setPalette(t){this.options.palette={...this.options.palette,...t},this.ink.set(this.options.palette.ink),this.rust.set(this.options.palette.rust)}setVisuals(t){this.options={...this.options,...t},this.material.uniforms.uPointSize.value=this.options.pointSize,this.material.uniforms.uOpacity.value=this.options.pointOpacity,this.lineMaterial.uniforms.uLineOpacity.value=this.options.lineOpacity}setResolveDuration(t){const e=Math.max(.2,t);this.material.uniforms.uResolveDuration.value=e,this.lineMaterial.uniforms.uResolveDuration.value=e}setPixelRatio(t){const e=Math.min(t,2);this.material.uniforms.uPixelRatio.value=e}update(t,e=.016){const n=Math.max(0,t-this.startTime);this.material.uniforms.uTime.value=t,this.material.uniforms.uElapsed.value=n,this.lineMaterial.uniforms.uTime.value=t,this.lineMaterial.uniforms.uElapsed.value=n,!this.reducedMotion&&this.options.motion.rotationSpeed>0?(this.group.rotation.y+=this.options.motion.rotationSpeed*e,this.group.rotation.x=Math.sin(t*.07)*.025):this.group.rotation.x=0}dispose(){this.geometry.dispose(),this.lineGeometry.dispose(),this.material.dispose(),this.lineMaterial.dispose()}mergeOptions(t){var e,n;return{...nn,...this.options,...t,palette:{...nn.palette,...(e=this.options)==null?void 0:e.palette,...t.palette},motion:{...nn.motion,...(n=this.options)==null?void 0:n.motion,...t.motion}}}writeGeometry(){const t={...Uc,...this.options},e=this.options.particleCount,n=Cg(t.seed),o=new Float32Array(e*3),s=new Float32Array(e*3),a=new Float32Array(e*3),r=new Float32Array(e*3),l=new Float32Array(e*4),h=new Float32Array(e*4);for(let u=0;u<e;u++){const c=Pg(n),{target:f,normal:p,role:g,phase:v}=c,m=1.4+Math.pow(n(),.6)*4.8,d=Rg(n).multiplyScalar(m).add(f.clone().multiplyScalar(g>=2?.08:.04)),x=g>=2?n()*.2:v*.42+n()*.18;o.set(d.toArray(),u*3),s.set(f.toArray(),u*3),a.set(f.toArray(),u*3),r.set(p.toArray(),u*3),l.set([g,x,v,n()],u*4),h.set([n(),n(),n(),n()],u*4)}this.geometry.dispose(),this.geometry=new de,this.geometry.setAttribute("position",new At(o,3)),this.geometry.setAttribute("aOrb",new At(s,3)),this.geometry.setAttribute("aCore",new At(a,3)),this.geometry.setAttribute("aNormal",new At(r,3)),this.geometry.setAttribute("aMeta",new At(l,4)),this.geometry.setAttribute("aSeed",new At(h,4)),this.geometry.computeBoundingSphere(),this.points.geometry=this.geometry,this.writeFutureFlowerInfrastructureGeometry()}writeFutureFlowerInfrastructureGeometry(){const t=[],e=[];let n=0;const o=(c,f,p,g)=>{t.push(c.x,c.y,c.z),e.push(n,f,p,g)},s=(c,f,p,g,v,m)=>{o(c,p,v,m),o(f,g,v,m)},a=(c,f,p,g,v=0)=>{const m=v;for(let d=0;d<p;d++){const x=d/p,E=(d+1)/p,S=si(c,f,x*Math.PI*2),D=si(c,f,E*Math.PI*2);s(S,D,x,E,m,g)}n++},r=(c,f,p,g,v,m,d=0)=>{const x=d;for(let E=0;E<p;E++){const S=E/p*Math.PI*2,D=E/p,C=si(c*g,f,S),w=si(c*v,f,S);s(C,w,D,D,x,m)}n++};be.forEach((c,f)=>{const p=c.radius>4.5?192:160,g=Gi(c.y),v=et.lerp(.16,.06,g),m=et.lerp(.17,.065,g);a(c.radius,c.y,p,0,f*.073),a(c.radius*et.lerp(.965,.982,g),c.y+c.depth*v,p,0,f*.073+.21),a(c.radius*et.lerp(1.018,1.006,g),c.y-c.depth*m,p,0,f*.073+.37),a(c.radius*et.lerp(.988,.994,g),c.y+c.depth*v*.42,Math.max(128,p-32),0,f*.073+.51),a(c.radius*et.lerp(1.006,1.002,g),c.y-c.depth*m*.44,Math.max(128,p-32),0,f*.073+.64),(f%2===0||c.radius>5.5)&&a(c.radius*et.lerp(.72,.62,g),c.y+c.depth*v*.32,160,0,.43+f*.059);const d=c.radius>5?104:72;r(c.radius,c.y,d,.18,1.02,2,.19+f*.041)}),[{from:0,to:2,copies:7},{from:2,to:4,copies:8},{from:4,to:6,copies:8},{from:6,to:8,copies:7},{from:8,to:11,copies:6}].forEach((c,f)=>{const p=be[c.from],g=be[c.to];for(let v=0;v<c.copies;v++){const m=v/c.copies*Math.PI*2+f*.18,d=(v%2===0?1:-1)*(.5+f*.095),x=f*.22+v/c.copies,E=56;for(let S=0;S<E;S++){const D=S/E,C=(S+1)/E,w=U=>{const T=et.smoothstep(U,0,1),M=et.lerp(p.y,g.y,T),R=Gi(M),V=et.lerp(p.radius*.88,g.radius*.9,T)+Math.sin(U*Math.PI)*et.lerp(.42,.13,R),k=m+d*T+Math.sin(U*Math.PI*2+v)*.045;return si(V,M,k)};s(w(D),w(C),D,C,x,1)}n++}});const h=28,u=.23;for(let c=0;c<h;c++){const f=c/h,p=(c+1)/h,g=si(.045,et.lerp(-9.75,9.9,f),f*.55),v=si(.045,et.lerp(-9.75,9.9,p),p*.55);s(g,v,f,p,u,3)}n++,this.lineGeometry.dispose(),this.lineGeometry=new de,this.lineGeometry.setAttribute("position",new Fe(t,3)),this.lineGeometry.setAttribute("aLineMeta",new Fe(e,4)),this.lineGeometry.computeBoundingSphere(),this.strands.geometry=this.lineGeometry}applyFutureFlowerTargets(){var p;if(!((p=this.futureFlowerTargets)!=null&&p.length))return;const t=Math.floor(this.futureFlowerTargets.length/3),e=this.geometry.getAttribute("aOrb"),n=this.geometry.getAttribute("aCore"),o=this.geometry.getAttribute("aNormal"),s=this.geometry.getAttribute("aMeta");if(!e||!n||!o||!s||t<1)return;const a=e.array,r=n.array,l=o.array,h=s.array,u=e.count,c=15485863,f=1.26;for(let g=0;g<u;g++){const m=g*c%t*3,d=g*3,x=this.futureFlowerTargets[m]*f,E=this.futureFlowerTargets[m+1]*f,S=this.futureFlowerTargets[m+2]*f;a[d]=x,a[d+1]=E,a[d+2]=S,r[d]=x,r[d+1]=E,r[d+2]=S;const D=Math.hypot(x,E,S)||1;l[d]=x/D,l[d+1]=E/D,l[d+2]=S/D,h[g*4]=h[g*4]>2.5?2:h[g*4]}e.needsUpdate=!0,n.needsUpdate=!0,o.needsUpdate=!0,s.needsUpdate=!0,this.geometry.computeBoundingSphere()}}const bn=Math.PI*2,xo={background:"#F5F5F4",ink:"#1C1917",activity:"#050504",signal:"#1C1917",rejected:"#A4513E"},Ge={particleCount:32e3,palette:xo,motion:{resolveDuration:3.35,traceDuration:1.05,rotationSpeed:.028,activity:.13,signalSpeed:.31,policyFadeIn:.12,policyFadeOut:.18},visuals:{scale:1.07,pointSize:.62,pointOpacity:.58,lineOpacity:.6,signalOpacity:.34},pixelRatio:1,reducedMotion:!1,seed:1931},Lg=`
uniform float uTime;
uniform float uElapsed;
uniform float uResolveDuration;
uniform float uActivity;
uniform float uSignalSpeed;
uniform float uPolicyFadeIn;
uniform float uPolicyFadeOut;
uniform float uPointSize;
uniform float uPixelRatio;
uniform float uScale;
uniform float uReducedMotion;

attribute vec3 aSource;
attribute vec3 aTarget;
attribute vec4 aMeta;
attribute vec4 aSeed;
attribute vec4 aRoute;
attribute vec2 aRouteControl;

varying float vAlpha;
varying float vEnergy;
varying float vActivationEnergy;
varying float vPolicyInfluence;

float sat(float v) {
  return clamp(v, 0.0, 1.0);
}

float hash11(float n) {
  return fract(sin(n * 37.719 + 3.117) * 43758.5453123);
}

float gaussian(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-0.5 * x * x);
}

float smoother(float t) {
  t = sat(t);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float routePhase(float routeIndex) {
  float seed = hash11(routeIndex + 1.7);
  float speed = mix(0.13, 0.19, hash11(routeIndex + 6.3)) * max(uSignalSpeed, 0.01) / 0.18;
  return fract(uTime * speed + seed);
}

float routeEnvelope(float phase, float kind) {
  float rise = smoothstep(0.015, 0.08, phase);
  float fall = kind < 1.5
    ? 1.0 - smoothstep(0.58, 0.76, phase)
    : 1.0 - smoothstep(0.78, 0.94, phase);
  return rise * fall;
}

float routeHead(float phase, float kind, float clipT) {
  if (kind < 0.5) {
    return smoother((phase - 0.04) / 0.54);
  }
  if (kind < 1.5) {
    return min(clipT, smoother((phase - 0.04) / 0.36) * clipT);
  }
  float firstLeg = smoother((phase - 0.04) / 0.28) * clipT;
  float secondLeg = mix(clipT, 1.0, smoother((phase - 0.42) / 0.38));
  return phase < 0.38 ? firstLeg : secondLeg;
}

float routeActivationEnergy(vec4 route, vec2 control) {
  if (route.x < 0.0) return 0.0;

  float kind = route.w;
  float phase = routePhase(route.x);
  float ready = smoother((uElapsed - uResolveDuration * 0.48) / 0.9);
  float head = routeHead(phase, kind, control.x);
  float envelope = routeEnvelope(phase, kind) * ready;
  float radius = max(control.y, 0.001);
  float distanceField = exp(-0.5 * route.z * route.z / (radius * radius));
  float front = gaussian(route.y - head, 0.07);
  float body = smoothstep(head - 0.42, head - 0.1, route.y) * (1.0 - smoothstep(head + 0.03, head + 0.11, route.y));
  float trail = gaussian(route.y - (head - 0.3), 0.28);
  float blockedSettle = kind > 0.5 && kind < 1.5
    ? gaussian(route.y - control.x, 0.06) * smoothstep(0.28, 0.46, phase) * (1.0 - smoothstep(0.58, 0.74, phase)) * 0.42
    : 0.0;

  return sat(distanceField * envelope * (front * 1.25 + body * 0.82 + trail * 0.34 + blockedSettle) * 1.8);
}

float routePolicyInfluence(vec4 route, vec2 control) {
  if (route.x < 0.0 || route.w < 0.5) return 0.0;

  float kind = route.w;
  float phase = routePhase(route.x);
  float ready = smoother((uElapsed - uResolveDuration * 0.56) / 0.72);
  float clipT = control.x;
  float tubeRadius = max(control.y * 0.34, 0.58);
  float edgeTube = exp(-0.5 * route.z * route.z / (tubeRadius * tubeRadius));
  float eventField = gaussian(route.y - clipT, kind < 1.5 ? 0.078 : 0.105);
  float policyMoment = kind < 1.5 ? 0.43 : 0.49;
  float fadeIn = max(uPolicyFadeIn, 0.012);
  float fadeOut = max(uPolicyFadeOut, 0.012);
  float hold = kind < 1.5 ? 0.11 : 0.16;
  float temporalEnvelope =
    smoothstep(policyMoment - fadeIn, policyMoment, phase) *
    (1.0 - smoothstep(policyMoment + hold, policyMoment + hold + fadeOut, phase));
  float absorbedAfterglow = gaussian(
    phase - (policyMoment + hold + fadeOut * 0.48),
    max(fadeOut * 0.62, 0.045)
  ) * 0.34;
  float routeEnergy = routeEnvelope(phase, kind);

  return sat(edgeTube * eventField * ready * (temporalEnvelope + absorbedAfterglow) * routeEnergy * 2.35);
}

vec3 sharedActivityField(vec3 p, float t) {
  return vec3(
    sin(p.y * 0.27 + p.z * 0.19 + t * 0.58),
    sin(p.z * 0.23 + p.x * 0.21 + t * 0.43),
    cos(p.x * 0.18 + p.y * 0.25 + t * 0.49)
  );
}

void main() {
  float role = aMeta.x;
  float delay = aMeta.y;
  float sizeSeed = aMeta.z;
  float sourceSpread = aMeta.w;

  float progress = uReducedMotion > 0.5
    ? 1.0
    : smoother((uElapsed - delay * 0.24) / max(uResolveDuration, 0.001));
  float settled = smoother((progress - 0.62) / 0.38);

  vec3 target = aTarget * uScale;
  vec3 source = aSource * uScale;
  vec3 dir = normalize(target - source + vec3(0.001, 0.003, 0.002));
  vec3 orth = normalize(cross(dir, vec3(0.0, 1.0, 0.31)));
  if (length(orth) < 0.01) orth = vec3(1.0, 0.0, 0.0);

  float overshoot = sin(progress * 3.14159265) * (1.0 - settled) * 0.11 * sourceSpread;
  vec3 pos = mix(source, target, progress) + dir * overshoot;

  vec3 alive = sharedActivityField(target, uTime + aSeed.x * 0.35) * uActivity * settled;
  float activationEnergy = routeActivationEnergy(aRoute, aRouteControl);
  float policyInfluence = routePolicyInfluence(aRoute, aRouteControl);
  float policyColorMix = smoothstep(0.0, 0.28, policyInfluence);
  pos += alive * (0.1 + min(role, 4.0) * 0.025) * (1.0 - activationEnergy * 0.78 - policyInfluence * 0.34);

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  float depth = max(-mvPos.z, 0.001);
  float spine = 1.0 - step(0.5, role);
  float cluster = step(3.5, role);
  float roleBoost = mix(0.7, 1.18, spine) + cluster * 0.28;
  float signalBreath = cluster * smoothstep(0.15, 0.0, abs(fract(uTime * 0.16 + aSeed.w) - 0.5));

  vActivationEnergy = activationEnergy;
  vPolicyInfluence = policyInfluence;
  vEnergy = signalBreath + spine * 0.25 + activationEnergy * 0.82 + policyColorMix * 0.72;
  vAlpha = progress * (0.34 + roleBoost * 0.45 + signalBreath * 0.35 + activationEnergy * 0.36 + policyColorMix * 0.22);
  gl_PointSize = uPointSize * uPixelRatio * (0.58 + sizeSeed * 0.72 + cluster * 0.38 + vEnergy * 0.35) * (1.0 + activationEnergy * 0.24 + policyColorMix * 0.18) * (78.0 / depth);
  gl_PointSize = clamp(gl_PointSize, 0.3 * uPixelRatio, 6.6 * uPixelRatio);
}
`,Ig=`
uniform vec3 uInk;
uniform vec3 uActiveInk;
uniform vec3 uRejectedInk;
uniform float uOpacity;
varying float vAlpha;
varying float vEnergy;
varying float vActivationEnergy;
varying float vPolicyInfluence;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float core = smoothstep(0.5, 0.12, d);
  float pin = smoothstep(0.16, 0.0, d) * vEnergy * 0.38;
  vec3 color = mix(uInk, uActiveInk, vActivationEnergy * 0.58);
  float policyColorMix = smoothstep(0.0, 0.28, vPolicyInfluence);
  color = mix(color, uRejectedInk, policyColorMix);
  float alpha = (core + pin) * vAlpha * uOpacity * (1.0 + vActivationEnergy * 0.28 + policyColorMix * 0.18);
  gl_FragColor = vec4(color, alpha);
}
`,Ug=`
uniform float uTime;
uniform float uElapsed;
uniform float uResolveDuration;
uniform float uTraceDuration;
uniform float uActivity;
uniform float uSignalSpeed;
uniform float uScale;
uniform float uReducedMotion;

attribute vec3 aSourceStart;
attribute vec3 aSourceEnd;
attribute vec3 aTargetStart;
attribute vec3 aTargetEnd;
attribute vec4 aMeta;
attribute vec4 aRoute;
attribute vec2 aRouteControl;
attribute float aEnd;

varying float vAlpha;
varying float vRole;

float sat(float v) {
  return clamp(v, 0.0, 1.0);
}

float hash11(float n) {
  return fract(sin(n * 37.719 + 3.117) * 43758.5453123);
}

float gaussian(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-0.5 * x * x);
}

float smoother(float t) {
  t = sat(t);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float routePhase(float routeIndex) {
  float seed = hash11(routeIndex + 1.7);
  float speed = mix(0.13, 0.19, hash11(routeIndex + 6.3)) * max(uSignalSpeed, 0.01) / 0.18;
  return fract(uTime * speed + seed);
}

float routeEnvelope(float phase, float kind) {
  float rise = smoothstep(0.015, 0.08, phase);
  float fall = kind < 1.5
    ? 1.0 - smoothstep(0.58, 0.76, phase)
    : 1.0 - smoothstep(0.78, 0.94, phase);
  return rise * fall;
}

float routeHead(float phase, float kind, float clipT) {
  if (kind < 0.5) {
    return smoother((phase - 0.04) / 0.54);
  }
  if (kind < 1.5) {
    return min(clipT, smoother((phase - 0.04) / 0.36) * clipT);
  }
  float firstLeg = smoother((phase - 0.04) / 0.28) * clipT;
  float secondLeg = mix(clipT, 1.0, smoother((phase - 0.42) / 0.38));
  return phase < 0.38 ? firstLeg : secondLeg;
}

float routeActivationEnergy(vec4 route, vec2 control) {
  if (route.x < 0.0) return 0.0;

  float kind = route.w;
  float phase = routePhase(route.x);
  float ready = smoother((uElapsed - uResolveDuration * 0.48) / 0.9);
  float head = routeHead(phase, kind, control.x);
  float envelope = routeEnvelope(phase, kind) * ready;
  float radius = max(control.y, 0.001);
  float distanceField = exp(-0.5 * route.z * route.z / (radius * radius));
  float front = gaussian(route.y - head, 0.07);
  float body = smoothstep(head - 0.42, head - 0.1, route.y) * (1.0 - smoothstep(head + 0.03, head + 0.11, route.y));
  float trail = gaussian(route.y - (head - 0.3), 0.28);
  float blockedSettle = kind > 0.5 && kind < 1.5
    ? gaussian(route.y - control.x, 0.06) * smoothstep(0.28, 0.46, phase) * (1.0 - smoothstep(0.58, 0.74, phase)) * 0.42
    : 0.0;

  return sat(distanceField * envelope * (front * 1.25 + body * 0.82 + trail * 0.34 + blockedSettle) * 1.8);
}

vec3 sharedActivityField(vec3 p, float t) {
  return vec3(
    sin(p.y * 0.27 + p.z * 0.19 + t * 0.58),
    sin(p.z * 0.23 + p.x * 0.21 + t * 0.43),
    cos(p.x * 0.18 + p.y * 0.25 + t * 0.49)
  );
}

void main() {
  float role = aMeta.x;
  float delay = aMeta.y;
  float baseAlpha = aMeta.z;
  float seed = aMeta.w;

  float assemble = uReducedMotion > 0.5
    ? 1.0
    : smoother((uElapsed - delay * 0.24) / max(uResolveDuration, 0.001));

  vec3 targetStart = aTargetStart * uScale;
  vec3 targetEnd = aTargetEnd * uScale;
  vec3 sourceStart = aSourceStart * uScale;
  vec3 sourceEnd = aSourceEnd * uScale;
  vec3 start = mix(sourceStart, targetStart, assemble);
  vec3 fullEnd = mix(sourceEnd, targetEnd, assemble);
  vec3 pos = mix(start, fullEnd, aEnd);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vRole = role;
  vAlpha = baseAlpha * assemble;
}
`,Fg=`
uniform vec3 uInk;
uniform float uOpacity;
varying float vAlpha;
varying float vRole;

void main() {
  float roleDim = vRole > 2.5 ? 0.58 : 1.0;
  gl_FragColor = vec4(uInk, vAlpha * uOpacity * roleDim);
}
`,Ng=`
uniform float uTime;
uniform float uElapsed;
uniform float uResolveDuration;
uniform float uSignalSpeed;
uniform float uScale;
uniform float uReducedMotion;

attribute vec3 aPathStart;
attribute vec3 aPathEnd;
attribute vec4 aRoute;
attribute vec4 aSignalMeta;
attribute float aEnd;

varying float vAlpha;
varying float vTraceEnergy;
varying float vAuditEnergy;

float sat(float v) {
  return clamp(v, 0.0, 1.0);
}

float hash11(float n) {
  return fract(sin(n * 37.719 + 3.117) * 43758.5453123);
}

float gaussian(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-0.5 * x * x);
}

float smoother(float t) {
  t = sat(t);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float routePhase(float routeIndex) {
  float seed = hash11(routeIndex + 1.7);
  float speed = mix(0.13, 0.19, hash11(routeIndex + 6.3)) * max(uSignalSpeed, 0.01) / 0.18;
  return fract(uTime * speed + seed);
}

float routeEnvelope(float phase, float kind) {
  float rise = smoothstep(0.015, 0.08, phase);
  float fall = kind < 1.5
    ? 1.0 - smoothstep(0.58, 0.76, phase)
    : 1.0 - smoothstep(0.78, 0.94, phase);
  return rise * fall;
}

float routeHead(float phase, float kind, float clipT) {
  if (kind < 0.5) {
    return smoother((phase - 0.04) / 0.54);
  }
  if (kind < 1.5) {
    return min(clipT, smoother((phase - 0.04) / 0.36) * clipT);
  }
  float firstLeg = smoother((phase - 0.04) / 0.28) * clipT;
  float secondLeg = mix(clipT, 1.0, smoother((phase - 0.42) / 0.38));
  return phase < 0.38 ? firstLeg : secondLeg;
}

vec3 sharedActivityField(vec3 p, float t) {
  return vec3(
    sin(p.y * 0.27 + p.z * 0.19 + t * 0.58),
    sin(p.z * 0.23 + p.x * 0.21 + t * 0.43),
    cos(p.x * 0.18 + p.y * 0.25 + t * 0.49)
  );
}

void main() {
  vec3 start = aPathStart * uScale;
  vec3 end = aPathEnd * uScale;
  float routeIndex = aRoute.x;
  float segmentStart = aRoute.y;
  float segmentEnd = aRoute.z;
  float kind = aRoute.w;
  float width = aSignalMeta.x;
  float strength = aSignalMeta.y;
  float clipT = aSignalMeta.z;
  float originalKind = aSignalMeta.w;
  float phase = routePhase(routeIndex);
  float ready = uReducedMotion > 0.5 ? 0.0 : smoother((uElapsed - uResolveDuration * 0.48) / 0.9);
  vec3 pos = mix(start, end, aEnd);
  float alpha = 0.0;
  float traceEnergy = 0.0;
  float auditEnergy = 0.0;

  if (kind > 2.5) {
    float tickMoment = originalKind < 1.5 ? 0.42 : 0.46;
    auditEnergy = gaussian(phase - tickMoment, 0.04) * ready;
    alpha = auditEnergy * strength * 1.35;
  } else {
    float head = routeHead(phase, kind, clipT);
    float tail = max(0.0, head - width);
    float visibleStart = max(segmentStart, tail);
    float visibleEnd = min(segmentEnd, head);
    float visible = step(visibleStart + 0.002, visibleEnd);
    float routeCoord = mix(visibleStart, visibleEnd, aEnd);
    float localT = sat((routeCoord - segmentStart) / max(segmentEnd - segmentStart, 0.001));
    pos = mix(start, end, localT);
    vec3 signalFlow = sharedActivityField(pos, uTime + routeIndex * 0.35);
    pos += signalFlow * 0.028 * ready;
    traceEnergy = gaussian(routeCoord - head, max(width * 0.28, 0.02));
    alpha = ready * routeEnvelope(phase, kind) * strength * visible * (1.25 + traceEnergy * 1.1);
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vAlpha = alpha;
  vTraceEnergy = traceEnergy;
  vAuditEnergy = auditEnergy;
}
`,Og=`
uniform vec3 uSignal;
uniform vec3 uActiveInk;
uniform vec3 uAuditInk;
uniform float uOpacity;
varying float vAlpha;
varying float vTraceEnergy;
varying float vAuditEnergy;

void main() {
  vec3 color = mix(uSignal, uActiveInk, vTraceEnergy * 0.34);
  color = mix(color, uAuditInk, vAuditEnergy);
  gl_FragColor = vec4(color, vAlpha * uOpacity);
}
`;class Bg{constructor(t={}){this.group=new Yn,this.pointGeometry=new de,this.lineGeometry=new de,this.signalGeometry=new de,this.startTime=0,this.lastUpdateTime=0,this.rotationOffset=0,this.active=!1,this.options=Zg(Ge,t);const e=Jg(this.options.seed),n=kg(e);$g(this.lineGeometry,n.lines,n.routes,e),jg(this.pointGeometry,n.points,n.routes,this.options.particleCount,e),Kg(this.signalGeometry,n.routes,e);const o={uTime:{value:0},uElapsed:{value:0},uResolveDuration:{value:this.options.motion.resolveDuration},uActivity:{value:this.options.motion.activity},uSignalSpeed:{value:this.options.motion.signalSpeed},uPolicyFadeIn:{value:this.options.motion.policyFadeIn},uPolicyFadeOut:{value:this.options.motion.policyFadeOut},uScale:{value:this.options.visuals.scale},uReducedMotion:{value:this.options.reducedMotion?1:0}};this.pointMaterial=new Se({uniforms:{...o,uPointSize:{value:this.options.visuals.pointSize},uPixelRatio:{value:this.options.pixelRatio},uOpacity:{value:this.options.visuals.pointOpacity},uInk:{value:new St(this.options.palette.ink)},uActiveInk:{value:new St(this.options.palette.activity)},uRejectedInk:{value:new St(this.options.palette.rejected)}},vertexShader:Lg,fragmentShader:Ig,transparent:!0,depthWrite:!1,blending:qe}),this.lineMaterial=new Se({uniforms:{...o,uTraceDuration:{value:this.options.motion.traceDuration},uOpacity:{value:this.options.visuals.lineOpacity},uInk:{value:new St(this.options.palette.ink)}},vertexShader:Ug,fragmentShader:Fg,transparent:!0,depthWrite:!1,blending:qe}),this.signalMaterial=new Se({uniforms:{uTime:{value:0},uElapsed:{value:0},uResolveDuration:{value:this.options.motion.resolveDuration},uSignalSpeed:{value:this.options.motion.signalSpeed},uScale:{value:this.options.visuals.scale},uReducedMotion:{value:this.options.reducedMotion?1:0},uOpacity:{value:this.options.visuals.signalOpacity},uSignal:{value:new St(this.options.palette.signal)},uActiveInk:{value:new St(this.options.palette.activity)},uAuditInk:{value:new St(this.options.palette.rejected)}},vertexShader:Ng,fragmentShader:Og,transparent:!0,depthWrite:!1,blending:qe}),this.points=new Co(this.pointGeometry,this.pointMaterial),this.lines=new wo(this.lineGeometry,this.lineMaterial),this.signals=new wo(this.signalGeometry,this.signalMaterial),this.points.frustumCulled=!1,this.lines.frustumCulled=!1,this.signals.frustumCulled=!1,this.signals.visible=!1,this.lines.renderOrder=2,this.points.renderOrder=3,this.signals.renderOrder=4,this.group.add(this.lines,this.points)}setActive(t,e){t&&!this.active&&(this.startTime=e,this.lastUpdateTime=e),this.active=t,this.group.visible=t}replay(t=0){this.startTime=t,this.lastUpdateTime=t}setPalette(t){this.options.palette={...this.options.palette,...t},this.pointMaterial.uniforms.uInk.value.set(this.options.palette.ink),this.pointMaterial.uniforms.uActiveInk.value.set(this.options.palette.activity),this.pointMaterial.uniforms.uRejectedInk.value.set(this.options.palette.rejected),this.lineMaterial.uniforms.uInk.value.set(this.options.palette.ink),this.signalMaterial.uniforms.uSignal.value.set(this.options.palette.signal),this.signalMaterial.uniforms.uActiveInk.value.set(this.options.palette.activity),this.signalMaterial.uniforms.uAuditInk.value.set(this.options.palette.rejected)}setMotion(t){this.options.motion={...this.options.motion,...t},this.pointMaterial.uniforms.uResolveDuration.value=this.options.motion.resolveDuration,this.pointMaterial.uniforms.uActivity.value=this.options.motion.activity,this.pointMaterial.uniforms.uSignalSpeed.value=this.options.motion.signalSpeed,this.pointMaterial.uniforms.uPolicyFadeIn.value=this.options.motion.policyFadeIn,this.pointMaterial.uniforms.uPolicyFadeOut.value=this.options.motion.policyFadeOut,this.lineMaterial.uniforms.uResolveDuration.value=this.options.motion.resolveDuration,this.lineMaterial.uniforms.uTraceDuration.value=this.options.motion.traceDuration,this.lineMaterial.uniforms.uActivity.value=this.options.motion.activity,this.lineMaterial.uniforms.uSignalSpeed.value=this.options.motion.signalSpeed,this.lineMaterial.uniforms.uPolicyFadeIn.value=this.options.motion.policyFadeIn,this.lineMaterial.uniforms.uPolicyFadeOut.value=this.options.motion.policyFadeOut,this.signalMaterial.uniforms.uResolveDuration.value=this.options.motion.resolveDuration,this.signalMaterial.uniforms.uSignalSpeed.value=this.options.motion.signalSpeed}setVisuals(t){this.options.visuals={...this.options.visuals,...t},this.pointMaterial.uniforms.uPointSize.value=this.options.visuals.pointSize,this.pointMaterial.uniforms.uOpacity.value=this.options.visuals.pointOpacity,this.pointMaterial.uniforms.uScale.value=this.options.visuals.scale,this.lineMaterial.uniforms.uOpacity.value=this.options.visuals.lineOpacity,this.lineMaterial.uniforms.uScale.value=this.options.visuals.scale,this.signalMaterial.uniforms.uOpacity.value=0,this.signalMaterial.uniforms.uScale.value=this.options.visuals.scale,this.signals.visible=!1}setPixelRatio(t){this.pointMaterial.uniforms.uPixelRatio.value=t}update(t){if(!this.active)return;const e=this.options.reducedMotion?this.options.motion.resolveDuration:t-this.startTime,n=this.options.reducedMotion?0:Math.min(Math.max(t-this.lastUpdateTime,0),.1);this.lastUpdateTime=t,this.pointMaterial.uniforms.uTime.value=t,this.pointMaterial.uniforms.uElapsed.value=e,this.lineMaterial.uniforms.uTime.value=t,this.lineMaterial.uniforms.uElapsed.value=e,this.signalMaterial.uniforms.uTime.value=t,this.signalMaterial.uniforms.uElapsed.value=e,this.rotationOffset+=n*this.options.motion.rotationSpeed,this.group.rotation.set(-.18,.34+this.rotationOffset,-.04)}dispose(){this.pointGeometry.dispose(),this.lineGeometry.dispose(),this.signalGeometry.dispose(),this.pointMaterial.dispose(),this.lineMaterial.dispose(),this.signalMaterial.dispose()}}function kg(i){const t=[],e=[],n=[],o=[],s=[],a=(v,m,d,x,E)=>{t.push({start:v,end:m,role:d,delay:x,alpha:E})},r=(v,m,d=32)=>{n.push(v.clone()),e.push({target:v.clone(),role:0,delay:m,size:1.2});for(let x=0;x<d;x++)e.push({target:v.clone().add(Ze(i).multiplyScalar(Math.pow(i(),2)*.55)),role:4,delay:m+i()*.35,size:.6+i()*.7})},u=[];for(let v=0;v<32;v++){const m=v/31,d=et.lerp(-8.2,8.6,m),x=Math.sin(m*bn*1.7+.8)*2.2+Math.sin(m*bn*4.1)*.7,E=new A(x+(i()-.5)*1.8,d+(i()-.5)*.42,Math.cos(m*bn*1.25)*3.1+Math.sin(m*bn*3.2)*1.6+(i()-.5)*3.2);u.push(E),r(E,.08+m*.28,8+Math.floor(i()*10))}for(let v=0;v<u.length-1;v++){if(i()<.38)continue;const m=i()<.72?1:2,d=u[Math.min(u.length-1,v+m)];ki(t,u[v],d,5,.38+v*.018,.1+i()*.16,i,2+Math.floor(i()*4)),s.push([u[v],d])}const c=[{y:-5.9,left:-9.6,right:7.4,depth:6.8,count:24,delay:.72},{y:-3.4,left:-7.8,right:9.1,depth:5.9,count:28,delay:.9},{y:-.9,left:-8.8,right:5.8,depth:7.4,count:25,delay:1.05},{y:1.7,left:-5.2,right:6.8,depth:6.2,count:22,delay:1.22},{y:4.2,left:-3.4,right:9.6,depth:5.4,count:24,delay:1.38},{y:7.2,left:-2.4,right:3.3,depth:4.2,count:14,delay:1.5}],f=[];for(const v of c){const m=[];for(let d=0;d<v.count;d++){const x=v.count<=1?0:d/(v.count-1),E=Math.sin(x*bn*(1.2+i()*.8)+i()*bn),S=new A(et.lerp(v.left,v.right,x)+(i()-.5)*.85,v.y+E*.22+(i()-.5)*.34,Math.sin(x*bn+i()*.7)*v.depth*.72+(i()-.5)*v.depth*1.35);m.push(S),r(S,v.delay+x*.22+i()*.16,14+Math.floor(i()*20))}f.push(m);for(let d=0;d<m.length-1;d++)i()<.16||(ki(t,m[d],m[d+1],5,v.delay+d*.012,.2+i()*.24,i,2+Math.floor(i()*4)),o.push([m[d].clone(),m[d+1].clone()]),s.push([m[d],m[d+1]]));for(let d=0;d<m.length;d++){const x=2+Math.floor(i()*5);d+x>=m.length||i()>.42||(ki(t,m[d],m[d+x],5,v.delay+.18+i()*.3,.08+i()*.16,i,2+Math.floor(i()*3)),s.push([m[d],m[d+x]]))}}for(let v=0;v<f.length-1;v++){const m=f[v],d=f[v+1],x=12+Math.floor(i()*12);for(let E=0;E<x;E++){const S=m[Math.floor(i()*m.length)],D=d[Math.floor(i()*d.length)];!S||!D||(ki(t,S,D,5,1.25+v*.18+i()*.5,.07+i()*.17,i,2+Math.floor(i()*4)),i()<.38&&(o.push([S.clone(),D.clone()]),s.push([S,D])))}}const p=[new A(-11.8,-5.6,-3.5),new A(11.5,-3.9,2.8),new A(-10.5,-.4,3.4),new A(12.4,4.35,-1.7),new A(-7.4,2.5,-5.2),new A(8.2,7.1,2.4),new A(.8,-12.5,1.2)];for(const v of p){const m=n[Math.floor(i()*n.length)]??new A;zg(t,m,v,3,1.65+i()*.7,.18+i()*.18,i,9,3,.16),r(v,1.9+i()*.6,18),o.push([m.clone(),v.clone()]),s.push([m,v])}for(let v=0;v<260;v++){const m=n[Math.floor(i()*n.length)],d=n[Math.floor(i()*n.length)];!m||!d||m.distanceTo(d)>8.4||m.distanceTo(d)<.75||a(m.clone(),d.clone(),3,1.45+i()*1.25,.18+i()*.28)}for(let v=0;v<620;v++){const m=n[Math.floor(i()*n.length)]??new A,d=Ze(i),x=.18+i()*1.65,E=m.clone().add(Ze(i).multiplyScalar(i()*1.9));a(E.clone().addScaledVector(d,-x*.5),E.clone().addScaledVector(d,x*.5),4,1.45+i()*1.75,.18+i()*.42)}Hg(t,e,n,s,i);const g=Vg(s,i);for(const v of t){const m=v.role===0?10:v.role===1?8:v.role===2?6:4;for(let d=0;d<m;d++){const x=(d+i())/m;e.push({target:v.start.clone().lerp(v.end,x).add(Ze(i).multiplyScalar(i()*.18)),role:v.role,delay:v.delay+i()*.22,size:.42+i()*.48})}}return{lines:t,points:e,signalPairs:o,routes:g}}function ki(i,t,e,n,o,s,a,r){for(let l=0;l<r;l++){const h=l/r+a()*.025,u=Math.min(1,h+.045+a()*.12);u<=h||i.push({start:t.clone().lerp(e,h),end:t.clone().lerp(e,u),role:n,delay:o+l*.018+a()*.16,alpha:s})}}function zg(i,t,e,n,o,s,a,r,l,h){const u=e.clone().sub(t).normalize(),c=Math.abs(u.y)>.86?new A(1,0,0):new A(0,1,0),f=new A().crossVectors(u,c).normalize(),p=new A().crossVectors(f,u).normalize();for(let g=0;g<l;g++){const v=a()*bn,m=Math.pow(a(),.65)*h,d=f.clone().multiplyScalar(Math.cos(v)*m).addScaledVector(p,Math.sin(v)*m);ki(i,t.clone().add(d),e.clone().add(d),n,o+g*.018+a()*.08,s*(.62+a()*.5),a,r)}}function Hg(i,t,e,n,o){const s=[],a=[],r=[{center:new A(-10.8,-7.4,-4.8),spread:new A(2.9,1.2,5.2),count:55},{center:new A(-7.8,-2.3,5.4),spread:new A(3.6,2.6,6),count:80},{center:new A(-3.8,1,-3.4),spread:new A(3.8,3.2,6.8),count:95},{center:new A(2.4,.1,1.7),spread:new A(4.3,3.2,6.4),count:115},{center:new A(7.2,-2.8,4.7),spread:new A(4.8,2.1,5.8),count:82},{center:new A(8.4,3.4,-5.1),spread:new A(4.2,2.6,5.9),count:75},{center:new A(1.2,6.9,3.2),spread:new A(3.4,2.8,5.6),count:72},{center:new A(-1.6,-5.7,-2.6),spread:new A(5,1.3,5.4),count:95}];for(const c of r)for(let f=0;f<c.count;f++){const p=Ze(o),g=Math.pow(o(),.54),v=c.center.clone().add(new A(p.x*c.spread.x*g,p.y*c.spread.y*g,p.z*c.spread.z*g));s.push(v),a.push(.65+o()*.9)}const l=[new A(-14.4,-5.9,-8.2),new A(-12.8,.3,8.6),new A(-9.8,5.1,-7.8),new A(-4.2,9.2,6.5),new A(4.9,8.2,-6.7),new A(12.5,5.9,7.8),new A(14,-1.8,-5.2),new A(10.8,-7,8.2),new A(1.2,-12.8,-6.1)];for(const c of l)s.push(c),a.push(1.4);for(const c of e){if(o()>.34)continue;const f=Ze(o).multiplyScalar(1.2+o()*5.2);f.z*=1.8,s.push(c.clone().add(f)),a.push(.8+o()*.9)}for(let c=0;c<s.length;c++){const f=s[c],p=a[c],g=3+Math.floor(p*4+o()*3);t.push({target:f.clone(),role:6,delay:1.05+o()*1.5,size:.82+p*.42});for(let v=0;v<g;v++)t.push({target:f.clone().add(Ze(o).multiplyScalar(Math.pow(o(),2.3)*(.34+p*.22))),role:6,delay:1.12+o()*1.7,size:.22+o()*.4})}const h=new Set,u=(c,f,p,g)=>{if(c===f)return;const v=Math.min(c,f),m=Math.max(c,f),d=`${v}:${m}`;if(h.has(d))return;h.add(d);const x=s[c],E=s[f],S=x.distanceTo(E);if(S<.65)return;ki(i,x,E,5,1.25+o()*1.35,p,o,g),n.push([x,E]);const D=Math.max(2,Math.floor(S*1.55));for(let C=0;C<D;C++){const w=(C+o())/D,U=x.clone().lerp(E,w);t.push({target:U.add(Ze(o).multiplyScalar(o()*.09)),role:5,delay:1.28+o()*1.6,size:.18+o()*.34})}};for(let c=0;c<s.length;c++){const f=s.map((p,g)=>({index:g,distance:g===c?1/0:s[c].distanceTo(p)})).sort((p,g)=>p.distance-g.distance).slice(0,3+Math.floor(o()*3));for(const p of f)p.distance>5.8&&o()>.22||u(c,p.index,.08+o()*.14,p.distance>5?3:5+Math.floor(o()*5))}for(let c=0;c<170;c++){const f=Math.floor(o()*s.length),p=Math.floor(o()*s.length),g=s[f].distanceTo(s[p]);g<5.8||g>18.5||u(f,p,.045+o()*.08,2+Math.floor(o()*4))}for(let c=0;c<420;c++){const f=s[Math.floor(o()*s.length)],p=Ze(o),g=.12+o()*1.15,v=f.clone().add(Ze(o).multiplyScalar(.2+o()*.9));i.push({start:v.clone().addScaledVector(p,-g*.5),end:v.clone().addScaledVector(p,g*.5),role:5,delay:1.55+o()*1.45,alpha:.07+o()*.16})}}function Vg(i,t){const e=new Map,n=l=>{const h=Wg(l);let u=e.get(h);return u||(u={key:h,point:l.clone(),neighbors:[]},e.set(h,u)),u};for(const[l,h]of i){if(l.distanceTo(h)<.2)continue;const u=n(l),c=n(h);u.neighbors.includes(c.key)||u.neighbors.push(c.key),c.neighbors.includes(u.key)||c.neighbors.push(u.key)}const o=Array.from(e.values()).filter(l=>l.neighbors.length>0),s=[],a=Math.min(24,Math.max(0,o.length));let r=0;for(;s.length<a&&r<240;){r+=1;const l=s.length,h=l%7===2?1:l%7===5?2:0,u=Math.floor((s.length*.61803398875+t()*.16)*o.length)%o.length,c=o[u];if(!c)break;const f=[c.point.clone()];let p="",g=c.key;const v=h===1?3+Math.floor(t()*4):4+Math.floor(t()*6);for(let d=0;d<v;d++){const x=e.get(g);if(!x)break;const E=x.neighbors.filter(w=>w!==p),S=E.length>0?E:x.neighbors;if(S.length===0)break;const D=S[Math.floor(t()*S.length)],C=e.get(D);if(!C)break;f.push(C.point.clone()),p=g,g=D}const m=Gg(f,h,t);m&&s.push(m)}return s}function Gg(i,t,e){const n=[];for(const u of i){const c=n[n.length-1];(!c||c.distanceTo(u)>.2)&&n.push(u)}if(t===2&&n.length<3||n.length<2)return null;const o=[];let s=0;for(let u=0;u<n.length-1;u++){const c=n[u].distanceTo(n[u+1]);c<=.2||(o.push(c),s+=c)}if(s<=.2||o.length===0)return null;const a=[];let r=0;for(let u=0;u<o.length;u++){const c=o[u],f=r/s;r+=c;const p=r/s;a.push({start:n[u].clone(),end:n[u+1].clone(),startT:f,endT:p})}if(a.length===0)return null;const l=a[0],h=t===1?et.lerp(l.startT,l.endT,.52+e()*.18):t===2?l.endT:1;return{kind:t,segments:a,clipT:h,radius:2+e()*.85,strength:1.05+e()*.38}}function Wg(i){return`${i.x.toFixed(3)}:${i.y.toFixed(3)}:${i.z.toFixed(3)}`}function Bc(i,t){let e=-1,n=0,o=1/0,s=0,a=1,r=1;return t.forEach((l,h)=>{for(const u of l.segments){const c=Xg(i,u.start,u.end);c.distance>=o||(e=h,n=et.lerp(u.startT,u.endT,c.t),o=c.distance,s=l.kind,a=l.clipT,r=l.radius)}}),e<0||o>r*2.2?{routeIndex:-1,routeT:0,distance:99,kind:0,clipT:1,radius:1}:{routeIndex:e,routeT:n,distance:o,kind:s,clipT:a,radius:r}}function Xg(i,t,e){const n=e.clone().sub(t),o=Math.max(n.lengthSq(),1e-4),s=et.clamp(i.clone().sub(t).dot(n)/o,0,1),a=t.clone().addScaledVector(n,s);return{t:s,distance:i.distanceTo(a)}}function Yg(i,t){const e=i.segments.find(o=>t<=o.endT+1e-4)??i.segments[i.segments.length-1],n=et.clamp((t-e.startT)/Math.max(e.endT-e.startT,1e-4),0,1);return e.start.clone().lerp(e.end,n)}function qg(i,t){const e=i.segments.find(n=>t<=n.endT+1e-4)??i.segments[i.segments.length-1];return e.end.clone().sub(e.start).normalize()}function kc(i,t,e,n){i[e*4+0]=n.routeIndex,i[e*4+1]=n.routeT,i[e*4+2]=n.distance,i[e*4+3]=n.kind,t[e*2+0]=n.clipT,t[e*2+1]=n.radius}function $g(i,t,e,n){const o=t.length*2,s=new Float32Array(o*3),a=new Float32Array(o*3),r=new Float32Array(o*3),l=new Float32Array(o*3),h=new Float32Array(o*3),u=new Float32Array(o*4),c=new Float32Array(o*4),f=new Float32Array(o*2),p=new Float32Array(o);t.forEach((g,v)=>{const m=g.start.clone().lerp(g.end,.5),d=Bc(m,e),x=Ze(n).multiplyScalar(2.4+n()*5.6),E=m.clone().add(x),S=Ze(n),D=g.start.distanceTo(g.end)*(.12+n()*.24),C=E.clone().addScaledVector(S,-D),w=E.clone().addScaledVector(S,D);for(let U=0;U<2;U++){const T=v*2+U;Rn(a,T,C),Rn(r,T,w),Rn(l,T,g.start),Rn(h,T,g.end),u[T*4+0]=g.role,u[T*4+1]=g.delay,u[T*4+2]=g.alpha,u[T*4+3]=n(),kc(c,f,T,d),p[T]=U}}),i.setAttribute("position",new At(s,3)),i.setAttribute("aSourceStart",new At(a,3)),i.setAttribute("aSourceEnd",new At(r,3)),i.setAttribute("aTargetStart",new At(l,3)),i.setAttribute("aTargetEnd",new At(h,3)),i.setAttribute("aMeta",new At(u,4)),i.setAttribute("aRoute",new At(c,4)),i.setAttribute("aRouteControl",new At(f,2)),i.setAttribute("aEnd",new At(p,1))}function jg(i,t,e,n,o){const s=new Float32Array(n*3),a=new Float32Array(n*3),r=new Float32Array(n*4),l=new Float32Array(n*4),h=new Float32Array(n*4),u=new Float32Array(n*2),c=new Float32Array(n*3);for(let f=0;f<n;f++){const p=t[Math.floor(o()*t.length)],g=Bc(p.target,e),v=Ze(o),m=.7+Math.pow(o(),.55)*8.5,d=p.target.clone().addScaledVector(v,m).add(new A((o()-.5)*2.2,(o()-.5)*1.4,(o()-.5)*2.2));Rn(s,f,d),Rn(a,f,p.target),Rn(c,f,p.target),r[f*4+0]=p.role,r[f*4+1]=p.delay+o()*.4,r[f*4+2]=p.size*(.7+o()*.6),r[f*4+3]=m/9.2,l[f*4+0]=o(),l[f*4+1]=o(),l[f*4+2]=o(),l[f*4+3]=o(),kc(h,u,f,g)}i.setAttribute("position",new At(c,3)),i.setAttribute("aSource",new At(s,3)),i.setAttribute("aTarget",new At(a,3)),i.setAttribute("aMeta",new At(r,4)),i.setAttribute("aSeed",new At(l,4)),i.setAttribute("aRoute",new At(h,4)),i.setAttribute("aRouteControl",new At(u,2))}function Kg(i,t,e){const n=[];t.forEach((c,f)=>{const p=c.kind===0?.24+e()*.06:.17+e()*.05;for(const g of c.segments)n.push({start:g.start,end:g.end,routeIndex:f,startT:g.startT,endT:g.endT,kind:c.kind,width:p,strength:c.strength,clipT:c.clipT,originalKind:c.kind});if(c.kind>0){const g=Yg(c,c.clipT),v=qg(c,c.clipT),m=Math.abs(v.y)>.82?new A(1,0,0):new A(0,1,0),d=new A().crossVectors(v,m).normalize(),x=.16+c.strength*.08;n.push({start:g.clone().addScaledVector(d,-x*.5),end:g.clone().addScaledVector(d,x*.5),routeIndex:f,startT:c.clipT,endT:c.clipT,kind:3,width:p,strength:c.strength*.72,clipT:c.clipT,originalKind:c.kind})}});const o=n.length*2,s=new Float32Array(o*3),a=new Float32Array(o*3),r=new Float32Array(o*3),l=new Float32Array(o*4),h=new Float32Array(o*4),u=new Float32Array(o);n.forEach((c,f)=>{for(let p=0;p<2;p++){const g=f*2+p;Rn(a,g,c.start),Rn(r,g,c.end),l[g*4+0]=c.routeIndex,l[g*4+1]=c.startT,l[g*4+2]=c.endT,l[g*4+3]=c.kind,h[g*4+0]=c.width,h[g*4+1]=c.strength,h[g*4+2]=c.clipT,h[g*4+3]=c.originalKind,u[g]=p}}),i.setAttribute("position",new At(s,3)),i.setAttribute("aPathStart",new At(a,3)),i.setAttribute("aPathEnd",new At(r,3)),i.setAttribute("aRoute",new At(l,4)),i.setAttribute("aSignalMeta",new At(h,4)),i.setAttribute("aEnd",new At(u,1))}function Zg(i,t){return{...i,...t,palette:{...i.palette,...t.palette},motion:{...i.motion,...t.motion},visuals:{...i.visuals,...t.visuals}}}function Rn(i,t,e){i[t*3+0]=e.x,i[t*3+1]=e.y,i[t*3+2]=e.z}function Ze(i){const t=i()*2-1,e=i()*bn,n=Math.sqrt(Math.max(0,1-t*t));return new A(Math.cos(e)*n,t,Math.sin(e)*n)}function Jg(i){let t=i>>>0;return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const J={size:256,radius:14.516,radiusSpread:2,shellDeform:1.8,frequency:.55,turbulence:1.1,curlSpeed:1.15,restoreForce:1.55,clusterForce:.35,clusterCount:9,autoResolve:!0,logoResolve:0,logoForce:12,logoBreath:.206,logoDepth:1.5,logoScale:.9,logoWidth:1.4,logoActivity:.07,logoPulseTravelSeconds:.85,logoPulseArmStagger:.82,logoPulseCycleSeconds:5.6,pointSize:1.05,opacity:.4,rotationSpeed:.07,depthFade:.48},In={backgroundColor:"#F5F5F4",particleColor:"#1C1917"},$t={buildDuration:3,pulseSpawnRate:1.3,simultaneousPulses:0,signalDuration:2.4,teamBiasStrength:.32,recruitmentRate:.34,rotationSpeed:1,policyMode:"A",maxConnections:170,connectionSpawnRate:80,blockedProbability:.28,connectionMinDuration:3.2,connectionMaxDuration:7,anchorCount:260,anchorPairMaxDistance:2.25,backgroundColor:"#F5F5F4",particleColor:"#1C1917",starProbability:.05,connectionColor:"#1C1917",blockedColor:"#1C1917",reroutedColor:"#1C1917",rejectedColor:"#A4513E",signalColor:"#1C1917",pointSize:1.05,opacity:.44,debugShowAttractors:!1},Cs={maxSignals:32,maxNodes:32,maxEdges:64},ve={rotationSpeed:.045,nodeDrift:.12,nodeDriftSpeed:.42,spawnRate:190,maxActiveConnections:150,connectionDuration:5.6,lineOpacity:.16,nodeOpacity:.43},te={backgroundColor:"#F5F5F4",shellColor:"#1C1917",baseParticleOpacity:.08,basePointSize:.5,activatedRatio:.16,filamentCount:42,filamentSpeed:.22,filamentForce:7.5,filamentCycle:5.6,coreTightness:1.2,shellTurbulence:.72,webMaxConnections:360,webSpawnRate:150,webMinDuration:4,webMaxDuration:9,webAnchorCount:420,webPairMaxDistance:2.45,webColor:"#1C1917",paletteHot:"#1C1917",paletteWarm:"#1C1917",paletteEmber:"#1C1917",breathDuration:12,breathHueRange:30,breathBrightness:.1,resolveDuration:3.2},Bt={pointSize:nn.pointSize,pointOpacity:nn.pointOpacity,lineOpacity:0,compositionWidth:1.12,compositionHeight:1.03,rotationSpeed:0,breathStrength:nn.motion.breathStrength,breathAmplitude:nn.motion.breathAmplitude,breathSpeed:nn.motion.breathSpeed,strandDrift:nn.motion.strandDrift,surfaceJitter:nn.motion.surfaceJitter,connectionPulse:nn.motion.connectionPulse},zc={azimuth:0,elevation:54.8,distance:38.4,targetX:0,targetY:2.9,targetZ:0,fov:50},We={...zc},Et={backgroundColor:xo.background,inkColor:xo.ink,activityColor:xo.activity,signalColor:xo.signal,rejectedColor:$t.rejectedColor,particleCount:window.innerWidth<720?14e3:Ge.particleCount,resolveDuration:Ge.motion.resolveDuration,traceDuration:Ge.motion.traceDuration,rotationSpeed:Ge.motion.rotationSpeed,activity:Ge.motion.activity,signalSpeed:Ge.motion.signalSpeed,policyFadeIn:Ge.motion.policyFadeIn,policyFadeOut:Ge.motion.policyFadeOut,scale:Ge.visuals.scale,pointSize:Ge.visuals.pointSize,pointOpacity:Ge.visuals.pointOpacity,lineOpacity:Ge.visuals.lineOpacity,signalOpacity:Ge.visuals.signalOpacity},Qg=()=>{const i=new URLSearchParams(window.location.search).get("experiment"),t=window.location.hash.replace("#",""),e=i||t;return e==="network"||e==="plasma"||e==="shards"?e:"logo"};let Ce=Qg(),po=null;const xi=window.matchMedia("(prefers-reduced-motion: reduce)").matches;xi&&(J.turbulence=.22,J.curlSpeed=.08,J.clusterForce=.22,J.logoForce=1.2,J.rotationSpeed=.02,$t.rotationSpeed=.2,ve.rotationSpeed=0,ve.nodeDrift=.03,ve.spawnRate=20,ve.maxActiveConnections=50,te.filamentSpeed=.12,te.shellTurbulence=.35,te.breathDuration=24,te.breathBrightness=.04,Bt.rotationSpeed=0,Bt.breathStrength=.04,Bt.breathAmplitude=.18,Bt.strandDrift=.03,Bt.surfaceJitter=.015,Bt.connectionPulse=0,Et.resolveDuration=.01,Et.traceDuration=.01,Et.rotationSpeed=0,Et.activity=.01,Et.signalSpeed=.04);function Hc(){let i=In.backgroundColor;Ce==="plasma"?i=te.backgroundColor:Ce==="network"?i=$t.backgroundColor:Ce==="shards"&&(i=Et.backgroundColor),Jt.setClearColor(i),document.body.style.background=i}function tv(){Ce==="network"?(ne.uniforms.uParticleColor.value.set($t.particleColor),ne.uniforms.uOpacity.value=$t.opacity,ne.uniforms.uPointSize.value=$t.pointSize):Ce==="plasma"?(ne.uniforms.uParticleColor.value.set(In.particleColor),ne.uniforms.uOpacity.value=te.baseParticleOpacity,ne.uniforms.uPointSize.value=te.basePointSize):Ce==="shards"?(ne.uniforms.uParticleColor.value.set(In.particleColor),ne.uniforms.uOpacity.value=0):(ne.uniforms.uParticleColor.value.set(In.particleColor),ne.uniforms.uOpacity.value=J.opacity,ne.uniforms.uPointSize.value=J.pointSize)}let Eo=-1,hi=0;const Ms=new A(1,0,0),di=new A(1,0,0);let Pn=0,Wi=0;const Vc=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,ev=`
uniform sampler2D uPositions;
uniform float uTime;
uniform float uDeltaTime;
uniform float uFrequency;
uniform float uTurbulence;
uniform float uCurlSpeed;
uniform float uRestoreForce;
uniform float uRadius;
uniform float uShellDeform;
uniform float uClusterForce;
uniform float uClusterCount;
uniform sampler2D uTargets;
uniform float uLogoResolve;
uniform float uLogoForce;
uniform float uLogoBreath;
uniform float uLogoActivity;
uniform float uLogoArmScale;
uniform float uLogoArmWidth;
uniform float uLogoPulseTravelSeconds;
uniform float uLogoPulseArmStagger;
uniform float uLogoPulseCycleSeconds;
// Network-mode uniforms
uniform float uNetworkMode;
uniform float uBuildProgress;
uniform float uTeamBiasStrength;
uniform sampler2D uTeamData;
uniform sampler2D uRoleData;
uniform sampler2D uSignalsTex;
uniform sampler2D uNodeTex;
uniform sampler2D uEdgeTex;
uniform sampler2D uNetworkTargets;
uniform vec3 uPolicyModeWeights;
uniform float uPolicyEventCount;
uniform vec4 uPolicyEventA[8];
uniform vec4 uPolicyEventB[8];
uniform vec4 uPolicyEventC[8];
uniform vec4 uPolicyEventD[8];
// Plasma-mode uniforms
uniform float uPlasmaResolve;
uniform float uPlasmaActivatedRatio;
uniform float uPlasmaFilamentCount;
uniform float uPlasmaSpeed;
uniform float uPlasmaForce;
uniform float uPlasmaCycle;
uniform float uPlasmaCoreTightness;
uniform float uPlasmaShellTurbulence;
varying vec2 vUv;

// --- Ashima Arts 3D simplex noise ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(27.619, 57.583))) * 43758.5453123);
}

float saturate(float v) {
  return clamp(v, 0.0, 1.0);
}

float gaussian(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-x * x * 0.5);
}

float smootherstep(float v) {
  v = saturate(v);
  return v * v * v * (v * (v * 6.0 - 15.0) + 10.0);
}

float cyclicDistance(float a, float b, float period) {
  float d = abs(a - b);
  return min(d, period - d);
}

vec3 agentAnchor(float index, float t) {
  float seed = index + 1.0;
  float angle = seed * 2.399963 + t * (0.22 + hash21(vec2(seed, 4.0)) * 0.18);
  float y = sin(seed * 1.17 + t * 0.31) * 0.55;
  float r = sqrt(max(0.0, 1.0 - y * y));
  return normalize(vec3(cos(angle) * r, y, sin(angle) * r));
}

vec3 curlNoise(vec3 p) {
  float e = 0.01;
  float n1, n2;
  vec3 curl;
  n1 = snoise(vec3(p.x, p.y + e, p.z));
  n2 = snoise(vec3(p.x, p.y - e, p.z));
  float a = (n1 - n2) / (2.0 * e);
  n1 = snoise(vec3(p.x, p.y, p.z + e));
  n2 = snoise(vec3(p.x, p.y, p.z - e));
  float b = (n1 - n2) / (2.0 * e);
  curl.x = a - b;
  n1 = snoise(vec3(p.x, p.y, p.z + e));
  n2 = snoise(vec3(p.x, p.y, p.z - e));
  a = (n1 - n2) / (2.0 * e);
  n1 = snoise(vec3(p.x + e, p.y, p.z));
  n2 = snoise(vec3(p.x - e, p.y, p.z));
  b = (n1 - n2) / (2.0 * e);
  curl.y = a - b;
  n1 = snoise(vec3(p.x + e, p.y, p.z));
  n2 = snoise(vec3(p.x - e, p.y, p.z));
  a = (n1 - n2) / (2.0 * e);
  n1 = snoise(vec3(p.x, p.y + e, p.z));
  n2 = snoise(vec3(p.x, p.y - e, p.z));
  b = (n1 - n2) / (2.0 * e);
  curl.z = a - b;
  return curl;
}

// Network-mode helpers
vec3 readNode(float idx) {
  return texture2D(uNodeTex, vec2((idx + 0.5) / 32.0, 0.5)).xyz;
}
vec4 readEdge(float idx) {
  return texture2D(uEdgeTex, vec2((idx + 0.5) / 64.0, 0.5));
}
vec4 readSignal(float idx) {
  return texture2D(uSignalsTex, vec2((idx + 0.5) / 32.0, 0.5));
}

void main() {
  vec4 posData = texture2D(uPositions, vUv);
  vec3 p = posData.xyz;
  float phase = snoise(vec3(vUv * 50.0, 0.0)) * 0.5;
  float t = uTime * uCurlSpeed + phase;
  vec3 noisePos = p * uFrequency + t;
  float dt = uDeltaTime > 0.0001 ? uDeltaTime : 0.016;

  if (uPlasmaResolve > 0.001) {
    // ═══════════════ PLASMA MODE ═══════════════
    float a = hash21(vUv * 113.7 + 2.1);
    float b = hash21(vUv * 271.3 + 8.4);
    float theta = a * 6.2831853 + uTime * uPlasmaSpeed * 0.08 * (hash21(vUv + 19.1) - 0.5);
    float y = b * 2.0 - 1.0;
    float ring = sqrt(max(0.0, 1.0 - y * y));
    vec3 dir = normalize(vec3(cos(theta) * ring, y, sin(theta) * ring));

    float veinA = abs(snoise(dir * 4.8 + vec3(uTime * 0.06, 1.7, 0.0)));
    float veinB = abs(snoise(dir * 9.0 + vec3(5.1, uTime * 0.05, 2.2)));
    float filament = smoothstep(0.44, 0.95, veinA) * 0.68 + smoothstep(0.58, 0.96, veinB) * 0.42;
    float hole = smoothstep(0.18, 0.62, abs(snoise(dir * 3.2 + 12.4)));
    float radius = uRadius * (0.94 + filament * 0.075 - (1.0 - hole) * 0.08);

    vec3 lateral = curlNoise(dir * 3.0 + uTime * 0.05) * 0.22 * uPlasmaShellTurbulence;
    vec3 plasmaTarget = normalize(dir + lateral * 0.035) * radius;
    vec3 ambient = p + curlNoise(noisePos) * uPlasmaShellTurbulence * 0.18 * dt;
    float stiffness = mix(1.4, uPlasmaForce, uPlasmaResolve);
    float k = 1.0 - exp(-dt * stiffness);
    p = mix(ambient, plasmaTarget, k * uPlasmaResolve);

    gl_FragColor = vec4(p, 1.0);

  } else if (uNetworkMode > 0.5) {
    // ═══════════════ NETWORK MODE ═══════════════
    vec4 roleD = texture2D(uRoleData, vUv);
    float signalSlot = roleD.r;
    float phaseOff = roleD.g;
    vec2 lateral = roleD.ba;

    float buildEase = smoothstep(0.0, 1.0, uBuildProgress);
    vec4 networkData = texture2D(uNetworkTargets, vUv);
    vec3 skeletonTarget = networkData.xyz;
    float lanePhase = fract(networkData.w + hash21(vUv * 19.7) * 0.045);
    float scanPhase = fract(uTime * 0.115 + 0.18);
    float laneDelta = abs(lanePhase - scanPhase);
    laneDelta = min(laneDelta, 1.0 - laneDelta);
    float scan = smoothstep(0.13, 0.0, laneDelta) * buildEase;
    float cluster = smoothstep(0.075, 0.0, laneDelta) * buildEase;
    vec3 tangentFlow = normalize(vec3(
      snoise(vec3(lanePhase * 9.0, 0.0, 1.0)),
      snoise(vec3(lanePhase * 9.0, 2.0, 3.0)),
      snoise(vec3(lanePhase * 9.0, 4.0, 5.0))
    ));
    vec3 orbitAxis = normalize(cross(normalize(skeletonTarget + vec3(0.001)), tangentFlow));
    vec3 orbital = orbitAxis * sin(uTime * 2.0 + phaseOff * 6.2831853) * 0.18;
    vec3 livingNoise = curlNoise(skeletonTarget * 0.24 + uTime * 0.08) * 0.18;
    vec3 torusTarget = skeletonTarget + livingNoise + orbital * (0.35 + cluster);

    vec3 ambientP = p + curlNoise(noisePos) * uTurbulence * 0.18 * dt;
    ambientP = mix(ambientP, torusTarget, buildEase * (0.78 + cluster * 0.22));

    float policyInfluence = 0.0;
    vec3 policyTarget = ambientP;
    for (int i = 0; i < 8; i++) {
      if (float(i) >= uPolicyEventCount) continue;

      vec4 eventData = uPolicyEventA[i];
      vec4 startData = uPolicyEventB[i];
      vec4 endData = uPolicyEventC[i];
      vec4 alternateData = uPolicyEventD[i];

      vec3 eventPos = eventData.xyz;
      float temporalEnvelope = eventData.w;
      vec3 edgeStart = startData.xyz;
      float policyKind = startData.w;
      vec3 edgeEnd = endData.xyz;
      float blockT = endData.w;
      vec3 edge = edgeEnd - edgeStart;
      float edgeLenSq = max(dot(edge, edge), 0.0001);
      float edgeT = clamp(dot(p - edgeStart, edge) / edgeLenSq, 0.0, 1.0);
      vec3 edgePoint = edgeStart + edge * edgeT;
      float edgeDistance = length(p - edgePoint);
      float eventDistance = length(p - eventPos);
      float eventRadius = 3.15;
      float edgeTubeRadius = 1.55;
      float eventFalloff = 1.0 - smoothstep(0.0, eventRadius, eventDistance);
      float edgeFalloff = 1.0 - smoothstep(0.0, edgeTubeRadius, edgeDistance);
      float influence =
        eventFalloff *
        edgeFalloff *
        temporalEnvelope;

      vec3 compressed = eventPos + (edgePoint - eventPos) * 0.42;
      if (policyKind > 1.5 && policyKind < 2.5) {
        policyTarget = mix(policyTarget, compressed, influence * 0.48);
        policyInfluence = max(policyInfluence, influence);
      } else if (policyKind > 2.5 && policyKind < 3.5) {
        vec3 routedTarget = compressed;
        if (alternateData.w > 0.5) {
          vec3 route = alternateData.xyz - eventPos;
          float routeLen = max(length(route), 0.001);
          vec3 routeDir = route / routeLen;
          float routeT = clamp(dot(p - eventPos, routeDir) / routeLen, 0.0, 1.0);
          routeT = max(routeT, smoothstep(blockT, 1.0, edgeT) * 0.36);
          routedTarget = mix(eventPos, alternateData.xyz, routeT);
        }
        policyTarget = mix(policyTarget, routedTarget, influence * 0.46);
        policyInfluence = max(policyInfluence, influence);
      }
    }

    // --- SIGNAL TARGET ---
    float roleBlend = 0.0;
    vec3 signalTarget = ambientP;
    float signalKind = 0.0;

    if (signalSlot >= 0.0) {
      vec4 sig = readSignal(signalSlot);
      float edgeIdx = sig.r;
      float signalT = sig.g;
      float sigKind = sig.b;
      float age = sig.a;

      if (edgeIdx >= 0.0 && age >= 0.0) {
        vec4 edge = readEdge(edgeIdx);
        vec3 nodeFrom = readNode(edge.r);
        vec3 nodeTo = readNode(edge.g);
        float edgeKind = edge.b;
        float blockAt = edge.a;

        // Each particle has a per-particle phase offset along the pulse window
        float windowSpread = 0.18;
        float particleT = clamp(signalT + (phaseOff - 0.5) * windowSpread, 0.0, 1.0);

        // Path base + lateral
        vec3 axis = nodeTo - nodeFrom;
        float axisLen = length(axis);
        vec3 axisDir = axisLen > 0.001 ? axis / axisLen : vec3(1.0, 0.0, 0.0);
        vec3 worldUp = abs(axisDir.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
        vec3 rightAx = normalize(cross(axisDir, worldUp));
        vec3 upAx = normalize(cross(rightAx, axisDir));
        vec3 pathPos = mix(nodeFrom, nodeTo, particleT)
                       + rightAx * lateral.x * 0.32
                       + upAx * lateral.y * 0.32;

        // ===== POLICY MODE A: punishing & legible =====
        vec3 modeA = pathPos;
        if (edgeKind > 1.5 && edgeKind < 2.5) {
          // BLOCKED: hard stop + scatter
          if (particleT > blockAt) {
            vec3 stopPos = mix(nodeFrom, nodeTo, blockAt);
            float scatter = (particleT - blockAt) / max(1.0 - blockAt, 0.001);
            vec3 jitter = vec3(
              snoise(vec3(vUv * 100.0, uTime * 0.7)),
              snoise(vec3(vUv * 100.0 + 13.0, uTime * 0.65)),
              snoise(vec3(vUv * 100.0 + 27.0, uTime * 0.8))
            );
            modeA = stopPos + jitter * scatter * 1.3 + rightAx * lateral.x * 0.4 + upAx * lateral.y * 0.4;
          }
        } else if (edgeKind > 2.5 && edgeKind < 3.5) {
          // REROUTED: 90° bend at blockAt
          if (particleT > blockAt) {
            vec3 bendStart = mix(nodeFrom, nodeTo, blockAt);
            float postT = (particleT - blockAt) / max(1.0 - blockAt, 0.001);
            vec3 bendDir = rightAx * (lateral.x >= 0.0 ? 1.0 : -1.0);
            modeA = bendStart + bendDir * postT * (1.0 - blockAt) * axisLen + upAx * lateral.y * 0.32;
          }
        } else if (edgeKind > 3.5) {
          // DISSOLVED: scatter outward beyond blockAt
          if (particleT > blockAt) {
            float dissolveT = (particleT - blockAt) / max(1.0 - blockAt, 0.001);
            vec3 outward = normalize(pathPos - vec3(0.0, 0.0, 0.0)) * dissolveT * 1.4;
            modeA = pathPos + outward + rightAx * dissolveT * lateral.x * 0.6;
          }
        }

        // ===== POLICY MODE B: atmospheric & subtle =====
        vec3 modeB = pathPos;
        if (edgeKind > 1.5) {
          // Generic: gentle slowdown + drift to neighbor
          float beyond = max(0.0, particleT - (blockAt - 0.12));
          float fadeOut = smoothstep(0.0, 0.35, beyond);
          vec3 drift = (rightAx * lateral.x + upAx * lateral.y) * fadeOut * 0.9;
          // Slow particleT progress (visual: pull back toward blockAt)
          float slowedT = mix(particleT, blockAt, fadeOut * 0.55);
          vec3 slowedPos = mix(nodeFrom, nodeTo, slowedT)
                           + rightAx * lateral.x * 0.32
                           + upAx * lateral.y * 0.32;
          modeB = slowedPos + drift;
        }

        // ===== POLICY MODE C: toroidal particle shell =====
        vec3 modeC = pathPos;
        if (edgeKind > 1.5) {
          // Recruit half the particles into a ring around blockAt position; let others pass
          vec3 ringCenter = mix(nodeFrom, nodeTo, blockAt);
          float ringWindow = smoothstep(blockAt - 0.18, blockAt, signalT) *
                             (1.0 - smoothstep(blockAt + 0.12, blockAt + 0.32, signalT));
          if (ringWindow > 0.0 && phaseOff < 0.55) {
            float ringAngle = phaseOff * 6.2831853 * 1.6 + uTime * 1.2;
            float ringRadius = 0.95 + lateral.x * 0.12;
            vec3 ringOffset = rightAx * cos(ringAngle) * ringRadius + upAx * sin(ringAngle) * ringRadius;
            modeC = mix(pathPos, ringCenter + ringOffset, ringWindow);
          } else {
            // Other half outcome depends on kind: pass through (blocked → eventual stop, rerouted → bend, dissolved → fade)
            if (edgeKind > 3.5) {
              // dissolved: fade outward after blockAt
              if (particleT > blockAt + 0.15) {
                float fT = (particleT - blockAt - 0.15) / max(0.85 - blockAt, 0.001);
                modeC = pathPos + normalize(pathPos) * fT * 0.8;
              }
            } else if (edgeKind > 2.5) {
              // rerouted: small bend
              if (particleT > blockAt) {
                float postT = (particleT - blockAt) / max(1.0 - blockAt, 0.001);
                modeC = pathPos + rightAx * postT * 1.6;
              }
            }
            // blocked → just hit the shell and stop; pathPos already clamps via window below
          }
        }

        // Crossfade modes
        vec3 modedPos = modeA * uPolicyModeWeights.x +
                        modeB * uPolicyModeWeights.y +
                        modeC * uPolicyModeWeights.z;

        signalTarget = modedPos;
        signalKind = edgeKind;

        // Role blend: smooth fade-in by age, smooth pulse-window envelope
        float fadeIn = smoothstep(0.0, 0.35, age);
        float fadeOutByT = 1.0 - smoothstep(0.88, 1.0, signalT);
        // Particle visible mostly when their particleT is near signalT (already by phaseOff)
        // Plus envelope on signalT itself
        roleBlend = fadeIn * fadeOutByT;
      }
    }

    // Final target blend
    float policyBlend = clamp(policyInfluence, 0.0, 1.0);
    float ambientRole = max(roleBlend, scan * 0.58 + cluster * 0.24);
    float policyPack = smoothstep(0.0, 0.08, policyBlend);
    float roleState = mix(ambientRole, -policyBlend, policyPack);
    vec3 target = mix(ambientP, signalTarget, max(roleBlend, 0.0));
    target = mix(target, policyTarget, clamp(policyBlend, 0.0, 0.44));

    // Exponential smoothing — stiffness varies by role
    float stiffness = mix(1.8, 6.4, max(ambientRole, policyBlend));
    float k = 1.0 - exp(-dt * stiffness);
    p = mix(p, target, k);

    // Pack roleBlend in alpha for vertex shader
    gl_FragColor = vec4(p, roleState);

  } else {
    // ═══════════════ LOGO MODE ═══════════════
    float orbInfluence = 1.0 - smoothstep(0.35, 0.92, uLogoResolve);

    vec3 vel = curlNoise(noisePos) * uTurbulence;
    vel += curlNoise(noisePos * 2.0 + 7.33) * uTurbulence * 0.4;
    vel += curlNoise(noisePos * 4.0 + 13.7) * uTurbulence * 0.25;
    vel *= orbInfluence;
    p += vel * 0.016;

    float group = floor(hash21(vUv * 83.0) * uClusterCount);
    float clusterPhase = hash21(vec2(group, group * 1.37)) * 6.2831853;
    float clusterWave = sin(uTime * 1.45 + clusterPhase) * 0.5 + 0.5;
    float gather = smoothstep(0.52, 0.96, clusterWave);
    vec3 anchorDir = agentAnchor(group, uTime);
    float anchorRadius = uRadius + snoise(anchorDir * 1.7 + uTime * 0.18) * uShellDeform * 0.65;
    vec3 anchor = anchorDir * anchorRadius;
    p += (anchor - p) * gather * uClusterForce * orbInfluence * 0.016;

    float dist = length(p);
    if (dist > 0.001) {
      vec3 dir = normalize(p);
      float targetR = uRadius + snoise(dir * 1.5 + uTime * 0.15) * uShellDeform;
      float nd = (dist - targetR) / uRadius;
      float restore = nd * nd * sign(nd);
      p -= dir * restore * uRestoreForce * uRadius * orbInfluence * 0.016;
    }

    vec4 logoData = texture2D(uTargets, vUv);
    vec3 logoTarget = logoData.xyz;
    float armSlot = floor(logoData.w * 8.0);
    float armAngle = armSlot * 0.78539816339;
    vec2 armDir = vec2(cos(armAngle), sin(armAngle));
    vec2 armPerp = vec2(-armDir.y, armDir.x);
    float isHubArm = 1.0 - step(0.5, armSlot);
    float innerRadius = mix(3.15, -1.65, isHubArm);
    float outerRadius = 12.5;
    float armCenter = (innerRadius + outerRadius) * 0.5;
    float halfLength = (outerRadius - innerRadius) * 0.5 * uLogoArmScale;
    float armStart = armCenter - halfLength;
    float armEnd = armCenter + halfLength;
    float along = dot(logoTarget.xy, armDir);
    float signedCross = dot(logoTarget.xy, armPerp);
    float crossDist = abs(signedCross);
    float armT = saturate((along - armStart) / max(armEnd - armStart, 0.001));
    float halfWidth = 0.7 * uLogoArmWidth;
    float crossMask = 1.0 - smoothstep(halfWidth * 0.24, halfWidth * 1.08, crossDist);
    float resolveField = smoothstep(0.04, 0.98, uLogoResolve);

    float armStagger = 0.014 + hash21(vec2(armSlot + 0.37, 4.2)) * 0.018;
    float waveHead = (uLogoResolve - armStagger) * 1.14;
    float waveGate = smoothstep(-0.08, 0.04, waveHead) * (1.0 - smoothstep(1.03, 1.22, waveHead));
    float leadingEdge = gaussian(armT - waveHead, 0.052) * waveGate;
    float waveBody = gaussian(armT - (waveHead - 0.075), 0.125) * waveGate;
    float waveTail = gaussian(armT - (waveHead - 0.19), 0.18) * waveGate;

    float settled = smoothstep(0.86, 1.0, uLogoResolve);
    float keepTravel = max(uLogoPulseTravelSeconds, 0.45);
    float keepPeriod = max(uLogoPulseCycleSeconds, keepTravel + 1.05);
    float keepCycleIndex = floor(uTime / keepPeriod);
    float keepCycleTime = uTime - keepCycleIndex * keepPeriod;
    float armStartRoll = hash21(vec2(armSlot + keepCycleIndex * 3.17, keepCycleIndex + 8.1));
    float armEnergyRoll = hash21(vec2(armSlot + keepCycleIndex * 5.13, keepCycleIndex + 19.4));
    float armStartDelay = armStartRoll * max(uLogoPulseArmStagger, 0.0);
    float armPulseStrength = 0.18 + 0.82 * smoothstep(0.24, 0.68, armEnergyRoll);
    float keepLocalTime = keepCycleTime - armStartDelay;
    float keepHead = (keepLocalTime - 0.18) / keepTravel;
    float keepGate =
      smoothstep(0.0, 0.26, keepLocalTime) *
      (1.0 - smoothstep(keepTravel + 0.34, keepTravel + 0.84, keepLocalTime)) *
      settled *
      armPulseStrength;
    float keepLead = gaussian(armT - keepHead, 0.06) * keepGate;
    float keepBody = gaussian(armT - (keepHead - 0.11), 0.155) * keepGate;
    float keepTail = gaussian(armT - (keepHead - 0.29), 0.24) * keepGate;
    float keepBreath = (0.5 + 0.5 * sin(uTime * 6.2831853 / keepPeriod + armStartRoll * 0.45)) * 0.05 * settled;

    float guideLead = (leadingEdge * 0.82 + keepLead * 0.66) * crossMask * resolveField;
    float guideBody = (waveBody * 0.62 + keepBody * 0.72 + keepBreath * 0.16) * crossMask * resolveField;
    float guideTail = (waveTail * 0.35 + keepTail * 0.38 + keepBreath * 0.08) * crossMask * resolveField;
    float guideEnergy = saturate(guideLead + guideBody * 0.72 + guideTail * 0.42);
    float passedWave = smoothstep(-0.08, 0.13, waveHead - armT) * waveGate;
    float regionalResolve = saturate(
      uLogoResolve * 0.32 +
      passedWave * 0.52 +
      guideEnergy * 0.18 +
      smoothstep(0.86, 1.0, uLogoResolve) * 0.74
    );

    float correctionCycle = uTime / 13.7;
    float correctionIndex = floor(correctionCycle);
    float correctionPhase = fract(correctionCycle);
    float correctionArm = mod(correctionIndex * 5.0 + 2.0, 8.0);
    float correctionMatch = 1.0 - step(0.5, abs(armSlot - correctionArm));
    float correctionT = 0.34 + hash21(vec2(correctionIndex + 9.1, correctionArm + 2.7)) * 0.42;
    float correctionRegion = gaussian(armT - correctionT, 0.052) * crossMask * correctionMatch * settled;
    float correctionEnvelope =
      smoothstep(0.08, 0.24, correctionPhase) *
      (1.0 - smoothstep(0.58, 0.9, correctionPhase));
    float correctionCatch =
      smoothstep(0.28, 0.66, correctionPhase) *
      (1.0 - smoothstep(0.76, 0.98, correctionPhase));
    float correction = correctionRegion * correctionEnvelope * 0.08;
    float catchField = correctionRegion * correctionCatch * 0.16;

    vec2 centerlinePull =
      -armPerp * signedCross * (guideLead * 0.2 + guideBody * 0.095 + guideTail * 0.04 + catchField * 0.08);
    vec2 pressureSwell =
      armDir * (guideLead * 0.055 + guideBody * 0.18 - guideTail * 0.035 + keepBreath * 0.014) * (0.72 + armT * 0.28);
    vec2 widthBreath =
      armPerp * sign(signedCross) * halfWidth * (guideBody * 0.055 - guideLead * 0.016 + keepBreath * 0.01);
    vec2 correctionDrift =
      armPerp * sign(sin(correctionIndex * 12.91 + armSlot * 2.7)) * halfWidth * correction * 0.24;

    vec3 materialFlow = curlNoise(vec3(logoTarget.xy * 0.115, uTime * 0.11 + armSlot * 0.23));
    materialFlow *= uLogoActivity * 0.19 * settled * (0.35 + crossMask * 0.65);

    logoTarget.xy += centerlinePull + pressureSwell + widthBreath + correctionDrift + materialFlow.xy;
    logoTarget.z *= 1.0 - guideLead * 0.075 - catchField * 0.06 + guideBody * 0.04;
    logoTarget.z += materialFlow.z * 0.28;
    logoTarget.z += sin(uTime * 0.55 + armSlot * 1.7 + armT * 2.4) * uLogoBreath * 0.16 * settled * crossMask;

    float logoStiffness = uLogoForce * (1.35 + guideLead * 1.12 + guideBody * 0.56 + guideTail * 0.36 + catchField * 0.5);
    float logoK = 1.0 - exp(-dt * logoStiffness * regionalResolve);
    p = mix(p, logoTarget, logoK);

    float logoVisualEnergy = saturate(guideLead * 0.7 + guideBody * 0.88 + guideTail * 0.3);
    float correctionVisual = saturate(correctionRegion * correctionEnvelope * 0.015);
    float logoRole = saturate(logoVisualEnergy + correctionVisual);
    gl_FragColor = vec4(p, logoRole);
  }
}
`,nv=`
uniform sampler2D uPositions;
uniform sampler2D uRoleData;
uniform sampler2D uSignalsTex;
uniform sampler2D uEdgeTex;
uniform sampler2D uNetworkTargets;
uniform float uPolicyEventCount;
uniform vec4 uPolicyEventA[8];
uniform vec4 uPolicyEventB[8];
uniform vec4 uPolicyEventC[8];
uniform float uPointSize;
uniform float uDepthFade;
uniform float uTime;
uniform float uNetworkMode;
uniform vec3 uParticleColor;
uniform vec3 uSignalColor;
uniform vec3 uBlockedColor;
uniform vec3 uReroutedColor;
uniform vec3 uRejectedColor;
// Plasma color uniforms
uniform float uPlasmaResolve;
uniform float uPlasmaActivatedRatio;
uniform float uPlasmaSpeed;
uniform float uPlasmaCycle;
uniform vec3 uPlasmaShellColor;
uniform vec3 uPaletteHot;
uniform vec3 uPaletteWarm;
uniform vec3 uPaletteEmber;
uniform float uBreathPeriod;
uniform float uBreathHueRange;
uniform float uBreathBrightness;
varying float vBrightness;
varying vec3 vColor;
varying float vRoleBlend;
varying float vPolicyInfluence;

float hash21Orb(vec2 p) {
  return fract(sin(dot(p, vec2(27.619, 57.583))) * 43758.5453123);
}

vec3 rgb2hsl(vec3 c) {
  float maxC = max(max(c.r, c.g), c.b);
  float minC = min(min(c.r, c.g), c.b);
  float l = (maxC + minC) * 0.5;
  float d = maxC - minC;
  float h = 0.0;
  float s = 0.0;
  if (d > 1e-5) {
    s = l > 0.5 ? d / (2.0 - maxC - minC) : d / (maxC + minC);
    if (maxC == c.r) h = (c.g - c.b) / d + (c.g < c.b ? 6.0 : 0.0);
    else if (maxC == c.g) h = (c.b - c.r) / d + 2.0;
    else h = (c.r - c.g) / d + 4.0;
    h /= 6.0;
  }
  return vec3(h, s, l);
}

float hue2rgb(float p, float q, float t) {
  if (t < 0.0) t += 1.0;
  if (t > 1.0) t -= 1.0;
  if (t < 1.0 / 6.0) return p + (q - p) * 6.0 * t;
  if (t < 0.5) return q;
  if (t < 2.0 / 3.0) return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
  return p;
}

vec3 hsl2rgb(vec3 hsl) {
  float h = hsl.x;
  float s = hsl.y;
  float l = hsl.z;
  if (s < 1e-5) return vec3(l);
  float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
  float p = 2.0 * l - q;
  return vec3(hue2rgb(p, q, h + 1.0 / 3.0), hue2rgb(p, q, h), hue2rgb(p, q, h - 1.0 / 3.0));
}

void main() {
  vec4 posData = texture2D(uPositions, position.xy);
  vec3 pos = posData.xyz;
  float roleState = posData.w;
  float policyInfluence = clamp(-roleState, 0.0, 1.0);
  float positiveRole = clamp(roleState, 0.0, 1.0);
  float isLogoMode = (1.0 - step(0.5, uNetworkMode)) * (1.0 - step(0.001, uPlasmaResolve));
  float roleBlend = max(positiveRole, policyInfluence * 0.12);
  vRoleBlend = mix(roleBlend, 0.0, isLogoMode);
  vPolicyInfluence = mix(policyInfluence, 0.0, isLogoMode);

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  float depth = -mvPos.z;
  float networkSizeBoost = mix(1.0, 1.55, roleBlend);
  float logoSizeBoost = 1.0 + positiveRole * 0.68;
  float sizeBoost = mix(networkSizeBoost, logoSizeBoost, isLogoMode);
  gl_PointSize = uPointSize * sizeBoost * (72.0 / depth);

  vBrightness = 1.0 - uDepthFade * smoothstep(10.0, 50.0, depth);

  vec3 color = uParticleColor;

  if (isLogoMode > 0.5) {
    vBrightness *= 1.0;
  }

  // ═══════════════ PLASMA COLOR (sunset gradient + breath) ═══════════════
  if (uPlasmaResolve > 0.001) {
    float activated = step(hash21Orb(position.xy + 11.1), uPlasmaActivatedRatio);
    float phaseOffset = hash21Orb(position.xy + 3.7);
    float cycle = max(uPlasmaCycle, 0.001);
    float phaseRaw = mod(uTime * uPlasmaSpeed + phaseOffset * cycle, cycle);
    float phase = phaseRaw / cycle;

    // Whoosh: sample sunset palette along stroke phase
    // hot → warm at phase 0.5 → ember at phase 1.0
    vec3 strokeColor = phase < 0.5
      ? mix(uPaletteHot, uPaletteWarm, phase * 2.0)
      : mix(uPaletteWarm, uPaletteEmber, (phase - 0.5) * 2.0);

    // Slow breath: HSL hue rotation + brightness oscillation
    float breathPeriod = max(uBreathPeriod, 0.5);
    float breathT = sin(uTime * 6.2831853 / breathPeriod);
    vec3 hsl = rgb2hsl(strokeColor);
    hsl.x = fract(hsl.x + (breathT * uBreathHueRange) / 360.0 + 1.0);
    vec3 breathed = hsl2rgb(hsl) * (1.0 + breathT * uBreathBrightness);

    // Shell particles get a plasma-only mono tint so they're visible against
    // the dark background — never mutates the shared uParticleColor.
    vec3 shellTint = mix(uParticleColor, uPlasmaShellColor, uPlasmaResolve);
    color = mix(shellTint, breathed, activated * uPlasmaResolve);

    // Filament-side brightness + size pop
    vBrightness *= 1.0 + 0.6 * activated * uPlasmaResolve;
    gl_PointSize *= 1.0 + 0.45 * activated * uPlasmaResolve;
  }

  if (uNetworkMode > 0.5) {
    vec3 policyPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    float directPolicyInfluence = 0.0;
    for (int i = 0; i < 8; i++) {
      if (float(i) >= uPolicyEventCount) continue;

      vec4 eventData = uPolicyEventA[i];
      vec3 eventPos = eventData.xyz;
      float temporalEnvelope = eventData.w;
      vec3 edgeStart = uPolicyEventB[i].xyz;
      vec3 edgeEnd = uPolicyEventC[i].xyz;
      vec3 edge = edgeEnd - edgeStart;
      float edgeLenSq = max(dot(edge, edge), 0.0001);
      float edgeT = clamp(dot(policyPos - edgeStart, edge) / edgeLenSq, 0.0, 1.0);
      vec3 edgePoint = edgeStart + edge * edgeT;
      float edgeDistance = length(policyPos - edgePoint);
      float eventDistance = length(policyPos - eventPos);
      float eventFalloff = 1.0 - smoothstep(0.0, 4.4, eventDistance);
      float edgeFalloff = 1.0 - smoothstep(0.0, 2.25, edgeDistance);
      directPolicyInfluence = max(
        directPolicyInfluence,
        eventFalloff * edgeFalloff * temporalEnvelope
      );
    }

    float policyColorMix = smoothstep(0.0, 0.28, max(policyInfluence, directPolicyInfluence));
    color = mix(color, uRejectedColor, policyColorMix);
    vBrightness *= 1.0 + policyColorMix * 0.18;
    gl_PointSize *= 1.0 + policyColorMix * 0.12;

    vec4 roleD = texture2D(uRoleData, position.xy);
    float signalSlot = roleD.r;
    if (signalSlot >= 0.0) {
      vec4 sig = texture2D(uSignalsTex, vec2((signalSlot + 0.5) / 32.0, 0.5));
      float edgeIdx = sig.r;
      if (edgeIdx >= 0.0) {
        vec4 edge = texture2D(uEdgeTex, vec2((edgeIdx + 0.5) / 64.0, 0.5));
        float kind = edge.b;
        vec3 sigCol = uSignalColor;
        if (kind > 1.5 && kind < 2.5) sigCol = uBlockedColor;
        else if (kind > 2.5 && kind < 3.5) sigCol = uReroutedColor;
        else if (kind > 3.5) sigCol = mix(uSignalColor, vec3(0.95, 0.95, 0.95), 0.6);
        color = mix(color, sigCol, positiveRole * (1.0 - policyInfluence));
      }
    }
  }

  vColor = color;
}
`,iv=`
uniform float uOpacity;
varying float vBrightness;
varying vec3 vColor;
varying float vRoleBlend;
varying float vPolicyInfluence;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;

  float alpha = smoothstep(0.5, 0.15, d);
  float roleAlpha = mix(1.0, 1.85, vRoleBlend);
  float policyCalm = mix(1.0, 0.94, vPolicyInfluence);
  gl_FragColor = vec4(vColor * vBrightness, alpha * uOpacity * roleAlpha * policyCalm);
}
`,ov=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,sv=`
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uDarkMode;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(tDiffuse, vUv);
  float dist = length(vUv - 0.5) * 1.4;
  float edge = smoothstep(0.35, 1.05, dist);
  vec3 vignetteCol = mix(vec3(0.90), vec3(0.0), uDarkMode);
  color.rgb = mix(color.rgb, vignetteCol, edge * mix(0.025, 0.35, uDarkMode));
  gl_FragColor = color;
}
`,Jt=new T0({antialias:!0});Jt.setSize(window.innerWidth,window.innerHeight);Jt.setPixelRatio(Math.min(window.devicePixelRatio,2));Jt.setClearColor(In.backgroundColor);document.body.appendChild(Jt.domElement);document.body.style.background=In.backgroundColor;const yi=new yr,Xe=new sn(50,window.innerWidth/window.innerHeight,.1,100);Xe.position.z=30;const we=new hg({maxSlots:220,motion:{...ve,buildProgress:0,growthPortion:.46,holdPortion:.34,fadePortion:.2}});we.object3d.visible=!1;yi.add(we.object3d);const av=xi||window.innerWidth<720?24e3:9e4,Ue=new Dg({particleCount:av,maxConnections:26e3,localDegree:5,maxConnectionDistance:1.5,pointSize:Bt.pointSize,pointOpacity:Bt.pointOpacity,lineOpacity:Bt.lineOpacity,motion:{rotationSpeed:Bt.rotationSpeed,breathStrength:Bt.breathStrength,breathAmplitude:Bt.breathAmplitude,breathSpeed:Bt.breathSpeed,strandDrift:Bt.strandDrift,surfaceJitter:Bt.surfaceJitter,connectionPulse:Bt.connectionPulse}}),nr=()=>{Ue.group.scale.set(Bt.compositionWidth,Bt.compositionHeight,Bt.compositionWidth)};nr();Ue.group.visible=!1;yi.add(Ue.group);const Be=new Bg({particleCount:Et.particleCount,pixelRatio:Math.min(window.devicePixelRatio,2),reducedMotion:xi,palette:{background:Et.backgroundColor,ink:Et.inkColor,activity:Et.activityColor,signal:Et.signalColor,rejected:Et.rejectedColor},motion:{resolveDuration:Et.resolveDuration,traceDuration:Et.traceDuration,rotationSpeed:Et.rotationSpeed,activity:Et.activity,signalSpeed:Et.signalSpeed,policyFadeIn:Et.policyFadeIn,policyFadeOut:Et.policyFadeOut},visuals:{scale:Et.scale,pointSize:Et.pointSize,pointOpacity:Et.pointOpacity,lineOpacity:Et.lineOpacity,signalOpacity:Et.signalOpacity}});Be.group.visible=!1;yi.add(Be.group);const ge=new R0(Xe,Jt.domElement);ge.enableDamping=!0;ge.dampingFactor=.05;ge.autoRotate=!1;ge.autoRotateSpeed=0;const ir=xi?0:1e3,Gc=xi?0:850,or=`opacity ${ir}ms linear`,rv=`opacity ${Gc}ms linear`;let us,mo,go=null;Jt.domElement.style.opacity="1";Jt.domElement.style.transition=xi?"none":or;Jt.domElement.style.willChange="opacity";window.addEventListener("resize",()=>{const i=Math.min(window.devicePixelRatio,2);Xe.aspect=window.innerWidth/window.innerHeight,Xe.updateProjectionMatrix(),Jt.setPixelRatio(i),Jt.setSize(window.innerWidth,window.innerHeight),Ps.setSize(window.innerWidth,window.innerHeight),Ue.setPixelRatio(i),Be.setPixelRatio(i)});function lv(){const i=[];for(let r=0;r<12;r++){const l=r/12*Math.PI*2;i.push({pos:new A(Math.cos(l)*12,0,Math.sin(l)*12),type:0})}const o=35*Math.PI/180,s=Math.cos(o),a=Math.sin(o);for(let r=0;r<5;r++){const l=r/5*Math.PI*2+.42,h=Math.cos(l)*10,u=Math.sin(l)*10,c=u*s,f=u*a;i.push({pos:new A(h,c,f),type:1})}return i.push({pos:new A(0,9,0),type:2}),i.push({pos:new A(0,-9,0),type:2}),i.push({pos:new A(2.3,4.6,8.2),type:2}),i.push({pos:new A(0,0,0),type:3}),i}function cv(i){const t=[],e=[];for(let n=0;n<12;n++)e.push([n,(n+1)%12]);e.push([0,6],[3,9],[1,7],[4,10],[2,8],[5,11]);for(let n=0;n<5;n++){const o=12+n,s=n*2%12;e.push([o,s]),e.push([o,(s+3)%12])}e.push([12,14],[13,15],[12,16]),e.push([17,0],[17,3],[17,8]),e.push([18,1],[18,6],[18,10]),e.push([19,12],[19,7],[19,2]),e.push([20,17],[20,18],[20,14],[20,5]);for(const[n,o]of e){const s=Math.random();let a;s<.58?a=1:s<.74?a=2:s<.9?a=3:a=4,t.push({from:n,to:o,kind:a,blockAt:.4+Math.random()*.25})}return t}const Wc=lv(),Xc=cv();function uv(i,t){const e=new Float32Array(t*4);for(let o=0;o<t;o++)o<i.length?(e[o*4+0]=i[o].pos.x,e[o*4+1]=i[o].pos.y,e[o*4+2]=i[o].pos.z,e[o*4+3]=i[o].type):(e[o*4+0]=0,e[o*4+1]=0,e[o*4+2]=0,e[o*4+3]=-1);const n=new Kn(e,t,1,ye,Ae);return n.needsUpdate=!0,n}function hv(i,t){const e=new Float32Array(t*4);for(let o=0;o<t;o++)o<i.length?(e[o*4+0]=i[o].from,e[o*4+1]=i[o].to,e[o*4+2]=i[o].kind,e[o*4+3]=i[o].blockAt):(e[o*4+0]=-1,e[o*4+1]=-1,e[o*4+2]=0,e[o*4+3]=0);const n=new Kn(e,t,1,ye,Ae);return n.needsUpdate=!0,n}function dv(i){const t=new Float32Array(i*i*4),e=35*Math.PI/180,n=[{up:new A(0,1,0),arcStart:-Math.PI/4,arcEnd:Math.PI/4},{up:new A(0,1,0),arcStart:Math.PI/4,arcEnd:3*Math.PI/4},{up:new A(0,1,0),arcStart:3*Math.PI/4,arcEnd:5*Math.PI/4},{up:new A(0,1,0),arcStart:5*Math.PI/4,arcEnd:7*Math.PI/4},{up:new A(Math.sin(e),Math.cos(e),0).normalize(),arcStart:0,arcEnd:Math.PI*2},{up:new A(.6,.4,.7).normalize(),arcStart:0,arcEnd:Math.PI*2}];for(let s=0;s<i*i;s++){const a=Math.floor(Math.random()*n.length),r=n[a],l=r.arcStart+Math.random()*(r.arcEnd-r.arcStart),h=r.up.clone().normalize(),u=Math.abs(h.y)<.9?new A(0,1,0):new A(1,0,0),c=u.clone().sub(h.clone().multiplyScalar(u.dot(h))).normalize(),f=h.clone().cross(c).normalize(),p=c.clone().multiplyScalar(Math.cos(l)).add(f.clone().multiplyScalar(Math.sin(l)));t[s*4+0]=a,t[s*4+1]=p.x,t[s*4+2]=p.y,t[s*4+3]=p.z}const o=new Kn(t,i,i,ye,Ae);return o.needsUpdate=!0,o}function fv(i,t,e){const n=new Float32Array(i*i*4);for(let s=0;s<i*i;s++)Math.random()<e?(n[s*4+0]=Math.floor(Math.random()*t),n[s*4+1]=Math.random(),n[s*4+2]=(Math.random()-.5)*2,n[s*4+3]=(Math.random()-.5)*2):(n[s*4+0]=-1,n[s*4+1]=0,n[s*4+2]=0,n[s*4+3]=0);const o=new Kn(n,i,i,ye,Ae);return o.needsUpdate=!0,o}class pv{constructor(t){this.maxSlots=t,this.active=new Map,this.nextSpawnTime=0,this.signalData=new Float32Array(new ArrayBuffer(t*4*4));for(let e=0;e<t;e++)this.signalData[e*4+0]=-1,this.signalData[e*4+1]=0,this.signalData[e*4+2]=0,this.signalData[e*4+3]=-1;this.signalTex=new Kn(this.signalData,t,1,ye,Ae),this.signalTex.needsUpdate=!0}update(t,e,n,o){if(!e||o.simultaneousCap<=0){for(let l=0;l<this.maxSlots;l++)this.signalData[l*4+0]=-1,this.signalData[l*4+1]=0,this.signalData[l*4+2]=0,this.signalData[l*4+3]=-1;this.active.clear(),this.signalTex.needsUpdate=!0,this.nextSpawnTime=0;return}for(const[l,h]of this.active)t-h.startTime>h.duration&&(this.active.delete(l),this.signalData[l*4+0]=-1,this.signalData[l*4+1]=0,this.signalData[l*4+2]=0,this.signalData[l*4+3]=-1);const s=et.smoothstep(n,0,1),a=Math.max(1,Math.round(et.lerp(1,o.simultaneousCap,s))),r=et.lerp(.55,o.spawnRate,s);for(this.nextSpawnTime===0&&(this.nextSpawnTime=t+1.5);this.active.size<a&&t>=this.nextSpawnTime;){const l=this.findFreeSlot();if(l<0)break;const h=o.edges[Math.floor(Math.random()*o.edges.length)],u=o.edges.indexOf(h),c={slot:l,edgeIdx:u,startTime:t,duration:o.signalDuration,kind:h.kind};this.active.set(l,c),this.nextSpawnTime=t+1/Math.max(r,.01)}for(const[l,h]of this.active){const u=t-h.startTime,c=Math.min(u/h.duration,1);this.signalData[l*4+0]=h.edgeIdx,this.signalData[l*4+1]=c,this.signalData[l*4+2]=h.kind,this.signalData[l*4+3]=u}this.signalTex.needsUpdate=!0}findFreeSlot(){for(let t=0;t<this.maxSlots;t++)if(!this.active.has(t))return t;return-1}resetForRebuild(){this.active.clear();for(let t=0;t<this.maxSlots;t++)this.signalData[t*4+0]=-1,this.signalData[t*4+1]=0,this.signalData[t*4+2]=0,this.signalData[t*4+3]=-1;this.signalTex.needsUpdate=!0,this.nextSpawnTime=0}}const Rs=new Yn;Rs.visible=!1;{const i=new vr({color:16746564,transparent:!0,opacity:.8,depthWrite:!1});for(const t of Wc){const e=new Je(new Mr(.18,8,8),i);e.position.copy(t.pos),Rs.add(e)}}yi.add(Rs);function mv(i,t,e){const n=[],o=Math.PI*(3-Math.sqrt(5));for(let s=0;s<i;s++){const a=1-s/Math.max(i-1,1)*2,r=Math.sqrt(Math.max(0,1-a*a)),l=o*s,h=t+(Math.random()-.5)*e;n.push(new A(Math.cos(l)*r*h,a*h,Math.sin(l)*r*h))}return n}function gv(i,t){const e=[];for(let n=0;n<i.length;n++)for(let o=n+1;o<i.length;o++)i[n].distanceTo(i[o])<=t&&e.push([n,o]);return e}class vv{constructor(t,e,n){this.maxSlots=t,this.anchors=e,this.pairs=n,this.nextSpawn=0,this.connectionColor=new St,this.blockedColor=new St,this.slots=new Array(t).fill(null),this.positions=new Float32Array(new ArrayBuffer(t*2*3*4)),this.colors=new Float32Array(new ArrayBuffer(t*2*3*4)),this.geometry=new de,this.geometry.setAttribute("position",new At(this.positions,3)),this.geometry.setAttribute("color",new At(this.colors,3)),this.material=new Sr({vertexColors:!0,transparent:!0,opacity:1,blending:da,depthWrite:!1}),this.lineSegments=new wo(this.geometry,this.material),this.lineSegments.frustumCulled=!1,this.lineSegments.renderOrder=5}setColors(t,e){this.connectionColor.set(t),this.blockedColor.set(e)}reset(){for(let t=0;t<this.maxSlots;t++)this.slots[t]=null;for(let t=0;t<this.positions.length;t++)this.positions[t]=0;for(let t=0;t<this.colors.length;t++)this.colors[t]=0;this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.color.needsUpdate=!0,this.nextSpawn=0}update(t,e,n,o){if(!e){this.reset(),this.lineSegments.visible=!1;return}this.lineSegments.visible=!0,this.nextSpawn===0&&(this.nextSpawn=t+1.4);const s=et.smoothstep(n,0,1),a=et.lerp(1.5,o.spawnRate,s),r=Math.min(this.maxSlots,o.maxConnections),l=Math.max(3,Math.floor(r*(.3+.7*s)));for(let u=0;u<this.slots.length;u++){const c=this.slots[u];if(!c)continue;const f=c.blocked?c.growthDuration*c.blockedAt+c.blockFlashDur+c.blockFadeDur:c.growthDuration+c.holdDuration+c.fadeDuration;t-c.startTime>f&&(this.slots[u]=null)}let h=this.slots.filter(u=>u!==null).length;for(;h<l&&t>=this.nextSpawn;){let u=-1;for(let g=0;g<r;g++)if(this.slots[g]===null){u=g;break}if(u<0||this.pairs.length===0)break;const c=this.pairs[Math.floor(Math.random()*this.pairs.length)],f=Math.random()<o.blockedProbability,p=o.minDuration+Math.random()*(o.maxDuration-o.minDuration);this.slots[u]={startAnchorIdx:c[0],endAnchorIdx:c[1],startTime:t,growthDuration:p*.55,holdDuration:p*.25,fadeDuration:p*.4,blocked:f,blockedAt:f?.32+Math.random()*.45:1,blockFlashDur:.16,blockFadeDur:.34},h++,this.nextSpawn=t+1/Math.max(a,.1)}for(let u=0;u<this.maxSlots;u++){const c=this.slots[u],f=u*6;if(!c||u>=r){for(let M=0;M<6;M++)this.positions[f+M]=0,this.colors[f+M]=0;continue}const p=this.anchors[c.startAnchorIdx],g=this.anchors[c.endAnchorIdx],v=t-c.startTime;let m=0,d=0,x=this.connectionColor;if(c.blocked){const M=c.growthDuration*c.blockedAt;if(v<M){const R=v/Math.max(M,1e-4);m=c.blockedAt*(1-Math.pow(1-R,2)),d=et.smoothstep(R,0,.18),x=this.connectionColor}else{const R=v-M;m=c.blockedAt,R<c.blockFlashDur?(d=1,x=this.blockedColor):R<c.blockFlashDur+c.blockFadeDur?(d=1-(R-c.blockFlashDur)/c.blockFadeDur,x=this.blockedColor):d=0}}else if(v<c.growthDuration){const M=v/c.growthDuration;m=1-Math.pow(1-M,2.5),d=et.smoothstep(M,0,.18),x=this.connectionColor}else if(v<c.growthDuration+c.holdDuration)m=1,d=1,x=this.connectionColor;else{const M=v-c.growthDuration-c.holdDuration;m=1,d=Math.max(0,1-M/c.fadeDuration),x=this.connectionColor}const E=p.x+(g.x-p.x)*m,S=p.y+(g.y-p.y)*m,D=p.z+(g.z-p.z)*m;this.positions[f+0]=p.x,this.positions[f+1]=p.y,this.positions[f+2]=p.z,this.positions[f+3]=E,this.positions[f+4]=S,this.positions[f+5]=D;const C=2.4,w=x.r*d*C,U=x.g*d*C,T=x.b*d*C;this.colors[f+0]=w,this.colors[f+1]=U,this.colors[f+2]=T,this.colors[f+3]=w,this.colors[f+4]=U,this.colors[f+5]=T}this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.color.needsUpdate=!0}}const Yc=mv($t.anchorCount,11,3.2),_v=gv(Yc,$t.anchorPairMaxDistance),mi=new vv(80,Yc,_v);mi.setColors($t.connectionColor,$t.blockedColor);mi.lineSegments.visible=!1;yi.add(mi.lineSegments);function xv(i,t,e){const n=new Float32Array(i*i*4);for(let s=0;s<i*i;s++){const a=Math.random()*Math.PI*2,r=Math.acos(2*Math.random()-1),l=t+(Math.random()-.5)*e;n[s*4+0]=l*Math.sin(r)*Math.cos(a),n[s*4+1]=l*Math.sin(r)*Math.sin(a),n[s*4+2]=l*Math.cos(r),n[s*4+3]=1}const o=new Kn(n,i,i,ye,Ae);return o.needsUpdate=!0,o}function qc(i,t,e,n){const o=new Float32Array(i*i*4),s=3.15,a=12.5,r=.7*n,l=t,h=[{angle:0,inner:-1.65,outer:a},{angle:Math.PI*.25,inner:s,outer:a},{angle:Math.PI*.5,inner:s,outer:a},{angle:Math.PI*.75,inner:s,outer:a},{angle:Math.PI,inner:s,outer:a},{angle:Math.PI*1.25,inner:s,outer:a},{angle:Math.PI*1.5,inner:s,outer:a},{angle:Math.PI*1.75,inner:s,outer:a}];for(let c=0;c<i*i;c++){const f=h[c%h.length],p=f.angle,g=new A(Math.cos(p),Math.sin(p),0),v=new A(-g.y,g.x,0),m=(f.inner+f.outer)*.5,d=(f.outer-f.inner)*.5*e,x=m+(Math.random()-.5)*d*2,E=(Math.random()-.5)*r*2,S=(Math.random()-.5)*l*2,D=g.clone().multiplyScalar(x).add(v.multiplyScalar(E));o[c*4+0]=D.x,o[c*4+1]=D.y,o[c*4+2]=S,o[c*4+3]=(c%h.length+.5)/h.length}const u=new Kn(o,i,i,ye,Ae);return u.needsUpdate=!0,u}const $c={minFilter:Re,magFilter:Re,type:Ae,depthBuffer:!1,stencilBuffer:!1};let Xi=new gn(J.size,J.size,$c),yo=new gn(J.size,J.size,$c),To=qc(J.size,J.logoDepth,J.logoScale,J.logoWidth);const jc=ug(J.size),yv=dv(J.size),Kc=fv(J.size,Cs.maxSignals,$t.recruitmentRate),Sv=uv(Wc,Cs.maxNodes),Zc=hv(Xc,Cs.maxEdges),Uo=new pv(Cs.maxSignals),Jc=new yr,sr=new _r(-1,1,1,-1,0,1),Yt=new Se({vertexShader:Vc,fragmentShader:ev,uniforms:{uPositions:{value:null},uTime:{value:0},uDeltaTime:{value:.016},uFrequency:{value:J.frequency},uTurbulence:{value:J.turbulence},uCurlSpeed:{value:J.curlSpeed},uRestoreForce:{value:J.restoreForce},uRadius:{value:J.radius},uShellDeform:{value:J.shellDeform},uClusterForce:{value:J.clusterForce},uClusterCount:{value:J.clusterCount},uTargets:{value:To},uLogoResolve:{value:J.logoResolve},uLogoForce:{value:J.logoForce},uLogoBreath:{value:J.logoBreath},uLogoActivity:{value:J.logoActivity},uLogoArmScale:{value:J.logoScale},uLogoArmWidth:{value:J.logoWidth},uLogoPulseTravelSeconds:{value:J.logoPulseTravelSeconds},uLogoPulseArmStagger:{value:J.logoPulseArmStagger},uLogoPulseCycleSeconds:{value:J.logoPulseCycleSeconds},uNetworkMode:{value:0},uBuildProgress:{value:0},uTeamBiasStrength:{value:$t.teamBiasStrength},uTeamData:{value:yv},uRoleData:{value:Kc},uSignalsTex:{value:Uo.signalTex},uNodeTex:{value:Sv},uEdgeTex:{value:Zc},uNetworkTargets:{value:jc},uPolicyModeWeights:{value:di},uPolicyEventCount:we.policyInfluenceCount,uPolicyEventA:{value:we.policyInfluenceA},uPolicyEventB:{value:we.policyInfluenceB},uPolicyEventC:{value:we.policyInfluenceC},uPolicyEventD:{value:we.policyInfluenceD},uPlasmaResolve:{value:0},uPlasmaActivatedRatio:{value:te.activatedRatio},uPlasmaFilamentCount:{value:te.filamentCount},uPlasmaSpeed:{value:te.filamentSpeed},uPlasmaForce:{value:te.filamentForce},uPlasmaCycle:{value:te.filamentCycle},uPlasmaCoreTightness:{value:te.coreTightness},uPlasmaShellTurbulence:{value:te.shellTurbulence}}}),Mv=new Je(new no(2,2),Yt);Jc.add(Mv);const Qc=J.size*J.size,vs=new Float32Array(Qc*3);for(let i=0;i<Qc;i++)vs[i*3+0]=i%J.size/J.size,vs[i*3+1]=Math.floor(i/J.size)/J.size,vs[i*3+2]=0;const tu=new de;tu.setAttribute("position",new At(vs,3));const ne=new Se({vertexShader:nv,fragmentShader:iv,uniforms:{uPositions:{value:null},uRoleData:{value:Kc},uSignalsTex:{value:Uo.signalTex},uEdgeTex:{value:Zc},uNetworkTargets:{value:jc},uPolicyEventCount:we.policyInfluenceCount,uPolicyEventA:{value:we.policyInfluenceA},uPolicyEventB:{value:we.policyInfluenceB},uPolicyEventC:{value:we.policyInfluenceC},uPointSize:{value:J.pointSize},uOpacity:{value:J.opacity},uDepthFade:{value:J.depthFade},uTime:{value:0},uNetworkMode:{value:0},uParticleColor:{value:new St(In.particleColor)},uSignalColor:{value:new St($t.signalColor)},uBlockedColor:{value:new St($t.blockedColor)},uReroutedColor:{value:new St($t.reroutedColor)},uRejectedColor:{value:new St($t.rejectedColor)},uPlasmaResolve:{value:0},uPlasmaActivatedRatio:{value:te.activatedRatio},uPlasmaSpeed:{value:te.filamentSpeed},uPlasmaCycle:{value:te.filamentCycle},uPlasmaShellColor:{value:new St(te.shellColor)},uPaletteHot:{value:new St(te.paletteHot)},uPaletteWarm:{value:new St(te.paletteWarm)},uPaletteEmber:{value:new St(te.paletteEmber)},uBreathPeriod:{value:te.breathDuration},uBreathHueRange:{value:te.breathHueRange},uBreathBrightness:{value:te.breathBrightness}},transparent:!0,blending:qe,depthWrite:!1}),Po=new Co(tu,ne);yi.add(Po);const eu=new Se({vertexShader:Vc,fragmentShader:`
    uniform sampler2D uSeed;
    varying vec2 vUv;
    void main() {
      gl_FragColor = texture2D(uSeed, vUv);
    }
  `,uniforms:{uSeed:{value:null}}}),ar=new yr;ar.add(new Je(new no(2,2),eu));function nu(i=J.radius,t=J.radiusSpread){const e=xv(J.size,i,t);eu.uniforms.uSeed.value=e,Jt.setRenderTarget(Xi),Jt.render(ar,sr),Jt.setRenderTarget(yo),Jt.render(ar,sr),Jt.setRenderTarget(null),Yt.uniforms.uPositions.value=Xi.texture,ne.uniforms.uPositions.value=Xi.texture,e.dispose()}function ha(i){$t.policyMode=i,Ms.set(i==="A"?1:0,i==="B"?1:0,i==="C"?1:0);const t=new URL(window.location.href);t.searchParams.set("policy",i),window.history.replaceState({},"",t)}{const i=new URLSearchParams(window.location.search).get("policy");(i==="A"||i==="B"||i==="C")&&($t.policyMode=i,Ms.set(i==="A"?1:0,i==="B"?1:0,i==="C"?1:0),di.copy(Ms))}window.addEventListener("keydown",i=>{Ce==="network"&&(i.key==="1"?ha("A"):i.key==="2"?ha("B"):i.key==="3"&&ha("C"))});function Ev(i,t){const e=i==="network",n=i==="plasma",o=i==="shards";Po.visible=!n&&!o,we.object3d.visible=e,Ue.group.visible=n,Be.group.visible=o,Rs.visible=e&&$t.debugShowAttractors}function Tv(i){document.querySelectorAll("[data-experiment]").forEach(e=>{const n=e.dataset.experiment===i;e.classList.toggle("is-active",n),e.setAttribute("aria-pressed",String(n))});const t=new URL(window.location.href);t.searchParams.set("experiment",i),window.history.replaceState({},"",t)}function iu(){const i=et.degToRad(We.elevation),t=et.degToRad(We.azimuth),e=Math.cos(i)*We.distance,n=new A(We.targetX,We.targetY,We.targetZ);Xe.position.set(n.x+Math.sin(t)*e,n.y+Math.sin(i)*We.distance,n.z+Math.cos(t)*e),Xe.fov=We.fov,Xe.lookAt(n),Xe.updateProjectionMatrix(),ge.target.copy(n),ge.update()}function rr(i){const t=i==="network",e=i==="plasma",n=i==="shards",o=Ce,s=Ce==="network";Ce=i,Ev(i),Yt.uniforms.uTargets.value=To,Yt.uniforms.uNetworkMode.value=t?1:0,ne.uniforms.uNetworkMode.value=t?1:0,Ue.setActive(e,Wi||performance.now()*.001),Be.setActive(n,Wi||performance.now()*.001),o!==i&&(i==="logo"||t)&&(nu(),Po.rotation.set(0,0,0)),t?(ge.autoRotate=!1,s||(Eo=-1,hi=0,Pn=0,Uo.resetForRebuild())):e?(ge.autoRotate=!1,ge.autoRotateSpeed=0,Pn=0,Bt.rotationSpeed=0,Ue.group.rotation.set(0,0,0),iu()):n?(ge.autoRotate=!1,ge.autoRotateSpeed=0,Pn=0,Xe.position.set(4.8,1.3,33),Xe.lookAt(0,0,0),ge.target.set(0,0,0),ge.update()):(ge.autoRotate=!1,ge.autoRotateSpeed=0,Pn=.35),!n&&!e&&(Xe.position.set(0,0,t?32:30),Xe.lookAt(0,0,0),ge.target.set(0,0,0),ge.update()),Xe.updateProjectionMatrix(),Hc(),tv(),mi&&(mi.lineSegments.visible=!1,mi.reset()),Tv(i),Cv&&Rv(i)}function bv(i){if(!(i===Ce&&go===null)){if(go=i,us!==void 0&&window.clearTimeout(us),mo!==void 0&&(window.clearTimeout(mo),mo=void 0),ir===0){go=null,rr(i);return}Jt.domElement.style.pointerEvents="none",Jt.domElement.style.transition=or,Jt.domElement.style.opacity="0",us=window.setTimeout(()=>{const t=go;go=null,us=void 0,t&&(Jt.domElement.style.transition="none",Jt.domElement.style.opacity="0",Jt.domElement.getBoundingClientRect(),rr(t),requestAnimationFrame(()=>{Jt.domElement.style.transition=rv,Jt.domElement.style.opacity="1",mo=window.setTimeout(()=>{mo=void 0,Jt.domElement.style.pointerEvents="",Jt.domElement.style.transition=or},Gc)}))},ir)}}document.querySelectorAll("[data-experiment]").forEach(i=>{i.addEventListener("click",()=>{const t=i.dataset.experiment;bv(t==="network"?"network":t==="plasma"?"plasma":t==="shards"?"shards":"logo")})});const Ps=new $0(Jt);Ps.addPass(new j0(yi,Xe));const Av={uniforms:{tDiffuse:{value:null},uTime:{value:0},uDarkMode:{value:0}},vertexShader:ov,fragmentShader:sv},lr=new Pc(Av);Ps.addPass(lr);function wv(i,t){const e=Ce==="network",n=Ce==="plasma",o=Ce==="shards";if(e){Eo<0&&(Eo=i);const f=et.clamp((i-Eo)/Math.max($t.buildDuration,.01),0,1);hi=et.smoothstep(f,0,1)}else hi=0;const s=xi?1:et.smoothstep(i,1.2,6.2),a=J.autoResolve?s:J.logoResolve;3/Math.max(te.resolveDuration,.1);const l=1-Math.exp(-t*4);di.lerp(Ms,l);const h=di.x+di.y+di.z;h>.001&&di.multiplyScalar(1/h),Yt.uniforms.uTime.value=i,Yt.uniforms.uDeltaTime.value=Math.min(t,.05),Yt.uniforms.uPositions.value=Xi.texture,Yt.uniforms.uLogoResolve.value=e||n||o?0:a,Yt.uniforms.uLogoPulseTravelSeconds.value=J.logoPulseTravelSeconds,Yt.uniforms.uLogoPulseArmStagger.value=J.logoPulseArmStagger,Yt.uniforms.uLogoPulseCycleSeconds.value=J.logoPulseCycleSeconds,Yt.uniforms.uBuildProgress.value=hi,Yt.uniforms.uTeamBiasStrength.value=$t.teamBiasStrength;const u=0;Yt.uniforms.uPlasmaResolve.value=u,ne.uniforms.uTime.value=i,ne.uniforms.uPlasmaResolve.value=u,Uo.update(i,e,hi,{spawnRate:$t.pulseSpawnRate,simultaneousCap:$t.simultaneousPulses,signalDuration:$t.signalDuration,edges:Xc}),mi.update(i,!1,0,{spawnRate:0,blockedProbability:0,minDuration:$t.connectionMinDuration,maxDuration:$t.connectionMaxDuration,maxConnections:0}),we.update(i,t,{buildProgress:e?hi:0,rotationSpeed:ve.rotationSpeed,nodeDrift:ve.nodeDrift,nodeDriftSpeed:ve.nodeDriftSpeed,spawnRate:ve.spawnRate,maxActiveConnections:ve.maxActiveConnections,connectionDuration:ve.connectionDuration,lineOpacity:ve.lineOpacity,nodeOpacity:ve.nodeOpacity}),Ue.setMotion({rotationSpeed:0,breathStrength:Bt.breathStrength,breathAmplitude:Bt.breathAmplitude,breathSpeed:Bt.breathSpeed,strandDrift:Bt.strandDrift,surfaceJitter:Bt.surfaceJitter,connectionPulse:Bt.connectionPulse}),Ue.setResolveDuration(te.resolveDuration),Ue.update(i,t),Be.setMotion({resolveDuration:Et.resolveDuration,traceDuration:Et.traceDuration,rotationSpeed:Et.rotationSpeed,activity:Et.activity,signalSpeed:Et.signalSpeed}),Be.setVisuals({scale:Et.scale,pointSize:Et.pointSize,pointOpacity:Et.pointOpacity,lineOpacity:Et.lineOpacity,signalOpacity:Et.signalOpacity}),o&&Be.update(i),Jt.setRenderTarget(yo),Jt.render(Jc,sr),Jt.setRenderTarget(null),ne.uniforms.uPositions.value=yo.texture;const c=Xi;if(Xi=yo,yo=c,e){const f=$t.rotationSpeed*2,g=1-Math.exp(-t*.9);Pn+=(f-Pn)*g,ge.autoRotateSpeed=Pn}if(o)Po.rotation.set(0,0,0);else if(!e){const f=Ce==="logo"?1-et.smoothstep(a,.48,.92):1;Po.rotation.y+=J.rotationSpeed*.016*f}}nu();function ou(i){requestAnimationFrame(ou);const t=i*.001,e=Wi===0?.016:Math.min(t-Wi,.1);Wi=t,ge.update(),lr.uniforms.uTime.value=t,lr.uniforms.uDarkMode.value=0,wv(t,e),Ps.render()}requestAnimationFrame(ou);const Cv=!new URLSearchParams(window.location.search).has("hideGui");function Rv(i){po==null||po.destroy(),po=new Tr({title:"Runlayer Lab",width:312});const t=po,e=u=>{Hc()},n=u=>{ne.uniforms.uParticleColor.value.set(u)},o=()=>{To.dispose(),To=qc(J.size,J.logoDepth,J.logoScale,J.logoWidth),Yt.uniforms.uLogoArmScale.value=J.logoScale,Yt.uniforms.uLogoArmWidth.value=J.logoWidth,Ce==="logo"&&(Yt.uniforms.uTargets.value=To)},s=()=>{J.logoDepth=1.5,J.logoScale=.9,J.logoWidth=1.4,J.logoBreath=.206,J.logoActivity=.07,o(),Yt.uniforms.uLogoBreath.value=J.logoBreath,Yt.uniforms.uLogoActivity.value=J.logoActivity;for(const u of l.controllers)u.updateDisplay();for(const u of r.controllers)u.updateDisplay()};if(i==="shards"){const u=t.addFolder("Appearance");u.addColor(Et,"backgroundColor").name("Background").onChange(g=>{Be.setPalette({background:g}),e()}),u.addColor(Et,"inkColor").name("Structure").onChange(g=>{Be.setPalette({ink:g})}),u.addColor(Et,"signalColor").name("Signals").onChange(g=>{Be.setPalette({signal:g})}),u.open();const c=t.addFolder("Network activity");c.addColor(Et,"activityColor").name("Activity color").onChange(g=>{Be.setPalette({activity:g})}),c.addColor(Et,"rejectedColor").name("Rejected activity").onChange(g=>{$t.rejectedColor=g,ne.uniforms.uRejectedColor.value.set(g),we.setPalette({rejected:g}),Be.setPalette({rejected:g})}),c.add(Et,"policyFadeIn",.02,.34,.005).name("Color fade in"),c.add(Et,"policyFadeOut",.02,.5,.005).name("Color fade out"),c.open();const f=t.addFolder("Architecture");f.add(Et,"scale",.65,1.35,.01).name("Scale"),f.add(Et,"lineOpacity",.02,.9,.01).name("Line opacity"),f.add(Et,"pointOpacity",.02,.9,.01).name("Point opacity"),f.add(Et,"signalOpacity",0,1,.01).name("Signal opacity"),f.add(Et,"pointSize",.2,2.4,.01).name("Point size"),f.open();const p=t.addFolder("Assembly motion");p.add(Et,"resolveDuration",.5,9,.05).name("Resolve duration"),p.add(Et,"traceDuration",.1,3,.05).name("Trace duration"),p.add(Et,"activity",0,.22,.005).name("Alive motion"),p.add(Et,"signalSpeed",.02,.8,.005).name("Signal speed"),p.add(Et,"rotationSpeed",0,.14,.001).name("Rotation speed"),p.add({replay:()=>Be.replay(Wi||performance.now()*.001)},"replay").name("Replay assembly"),p.open();return}if(i==="network"){const u=t.addFolder("Appearance");u.addColor($t,"backgroundColor").name("Background").onChange(e),u.addColor($t,"particleColor").name("Particles").onChange(p=>{ne.uniforms.uParticleColor.value.set(p),we.setPalette({foreground:p,particle:p,line:p,node:p})}),u.addColor($t,"rejectedColor").name("Rejected activity").onChange(p=>{Et.rejectedColor=p,ne.uniforms.uRejectedColor.value.set(p),we.setPalette({rejected:p}),Be.setPalette({rejected:p})}),u.add($t,"opacity",.01,.8,.01).name("Particle opacity").onChange(p=>{ne.uniforms.uOpacity.value=p}),u.open();const c=t.addFolder("Policy torus");c.add($t,"buildDuration",.5,8,.05).name("Resolve duration"),c.add(ve,"rotationSpeed",0,.18,.001).name("Rotation speed"),c.add(ve,"nodeDrift",0,.5,.01).name("Node drift"),c.add(ve,"nodeDriftSpeed",0,1.4,.01).name("Drift speed"),c.add(ve,"spawnRate",5,220,1).name("Connection rate"),c.add(ve,"maxActiveConnections",0,220,1).name("Active lines"),c.add(ve,"connectionDuration",.8,9,.05).name("Line duration"),c.add(ve,"lineOpacity",0,.7,.01).name("Line opacity"),c.add(ve,"nodeOpacity",0,.8,.01).name("Node opacity"),c.add({rebuild:()=>{Eo=-1,hi=0,Pn=0,Uo.resetForRebuild(),we.reset()}},"rebuild").name("Replay build animation"),c.open();const f=t.addFolder("Particles");f.add(J,"pointSize",.5,8).onChange(p=>{ne.uniforms.uPointSize.value=p}),f.add(J,"depthFade",0,1).onChange(p=>{ne.uniforms.uDepthFade.value=p});return}if(i==="plasma"){const u=t.addFolder("Appearance");u.addColor(te,"backgroundColor").name("Background").onChange(e),u.addColor(te,"shellColor").name("Ink").onChange(m=>{ne.uniforms.uPlasmaShellColor.value.set(m),Ue.setPalette({ink:m})}),u.add(Bt,"pointOpacity",.02,.95,.01).name("Particle opacity").onChange(()=>{Ue.setVisuals(Bt)}),u.open();const c=t.addFolder("Plane funnel");c.add(te,"resolveDuration",.2,5,.05).name("Resolve duration").onChange(m=>{Ue.setResolveDuration(m)}),c.add(Bt,"pointSize",.4,3,.01).name("Point size").onChange(()=>{Ue.setVisuals(Bt)}),c.add(Bt,"compositionWidth",.55,1.65,.01).name("Composition width").onChange(nr),c.add(Bt,"compositionHeight",.65,1.55,.01).name("Composition height").onChange(nr),c.open();const f=t.addFolder("Camera angle"),p=()=>{ge.autoRotate=!1,ge.autoRotateSpeed=0,Pn=0,Bt.rotationSpeed=0,Ue.group.rotation.set(0,0,0),iu()},g=[f.add(We,"elevation",8,78,.1).name("Top-down angle").onChange(p),f.add(We,"azimuth",-70,70,.1).name("Orbit angle").onChange(p),f.add(We,"distance",24,72,.1).name("Distance").onChange(p),f.add(We,"targetY",-8,6,.1).name("Target height").onChange(p),f.add(We,"fov",28,70,1).name("FOV").onChange(p)];f.add({reset:()=>{Object.assign(We,zc),p(),g.forEach(m=>m.updateDisplay())}},"reset").name("Reset camera"),f.open();const v=t.addFolder("Funnel motion");v.add(Bt,"breathStrength",0,.4,.01).name("Breath"),v.add(Bt,"breathAmplitude",0,2,.01).name("Breath amplitude"),v.add(Bt,"breathSpeed",0,3,.01).name("Breath speed"),v.add(Bt,"strandDrift",0,.5,.01).name("Strand drift"),v.add(Bt,"surfaceJitter",0,.2,.005).name("Surface jitter"),v.add(Bt,"connectionPulse",0,1,.01).name("Operational activity"),v.add({rebuild:()=>Ue.rebuild()},"rebuild").name("Regenerate funnel"),v.open();return}const a=t.addFolder("Appearance");a.addColor(In,"backgroundColor").name("Background").onChange(e),a.addColor(In,"particleColor").name("Particles").onChange(n),a.add(J,"opacity",.01,.6,.01).name("Particle opacity").onChange(u=>{ne.uniforms.uOpacity.value=u}),a.open();const r=t.addFolder("Simulation");r.add(J,"frequency",.05,2).onChange(u=>{Yt.uniforms.uFrequency.value=u}),r.add(J,"turbulence",.01,3).onChange(u=>{Yt.uniforms.uTurbulence.value=u}),r.add(J,"curlSpeed",.01,2).onChange(u=>{Yt.uniforms.uCurlSpeed.value=u}),r.add(J,"restoreForce",.05,10).onChange(u=>{Yt.uniforms.uRestoreForce.value=u}),r.add(J,"shellDeform",0,8).onChange(u=>{Yt.uniforms.uShellDeform.value=u}),r.add(J,"clusterForce",0,5).onChange(u=>{Yt.uniforms.uClusterForce.value=u}),r.add(J,"autoResolve").name("Auto resolve"),r.add(J,"logoResolve",0,1,.01).name("Logo resolve").onChange(u=>{Yt.uniforms.uLogoResolve.value=u}),r.add(J,"logoForce",0,12).name("Logo force").onChange(u=>{Yt.uniforms.uLogoForce.value=u}),r.add(J,"logoBreath",0,2).name("Logo depth drift").onChange(u=>{Yt.uniforms.uLogoBreath.value=u}),r.add(J,"logoActivity",0,1,.01).name("Logo particle activity").onChange(u=>{Yt.uniforms.uLogoActivity.value=u}),r.add(J,"logoPulseTravelSeconds",.55,2.8,.05).name("Pulse travel time").onChange(u=>{Yt.uniforms.uLogoPulseTravelSeconds.value=u}),r.add(J,"logoPulseArmStagger",0,.9,.01).name("Pulse start spread").onChange(u=>{Yt.uniforms.uLogoPulseArmStagger.value=u}),r.add(J,"logoPulseCycleSeconds",2.2,7,.05).name("Pulse cycle").onChange(u=>{Yt.uniforms.uLogoPulseCycleSeconds.value=u}),r.add(J,"radius",2,30).onChange(u=>{Yt.uniforms.uRadius.value=u});const l=t.addFolder("Logo shape");l.add(J,"logoScale",.8,1.35,.01).name("Arm scale").onChange(o),l.add(J,"logoWidth",.6,2.2,.01).name("Arm width").onChange(o),l.add(J,"logoDepth",.1,3,.05).name("Bar depth").onChange(o),l.add({restoreLastGoodLogoShape:s},"restoreLastGoodLogoShape").name("Restore previous shape"),l.open();const h=t.addFolder("Particles");h.add(J,"pointSize",.5,8).onChange(u=>{ne.uniforms.uPointSize.value=u}),h.add(J,"depthFade",0,1).onChange(u=>{ne.uniforms.uDepthFade.value=u}),h.add(J,"rotationSpeed",0,.5)}rr(Ce);

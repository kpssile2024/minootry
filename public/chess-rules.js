/* Minoo chess rules v2.9.22 - dependency free legal-move/check/mate validator */
(function(G){
 const F='abcdefgh',V={pawn:1,knight:3,bishop:3,rook:5,queen:9,king:99};
 const clone=p=>p.map(x=>x.slice());
 const xy=s=>[F.indexOf(s[0]),Number(s[1])-1], sq=(x,y)=>F[x]+(y+1), inside=(x,y)=>x>=0&&x<8&&y>=0&&y<8;
 function at(p,s){return p.find(x=>x[2]===s)||null}
 function kingSq(p,side){return p.find(x=>x[0]===side&&x[1]==='king')?.[2]||null}
 function attacks(p,from,to){const a=at(p,from);if(!a||from===to)return false;const [x,y]=xy(from),[X,Y]=xy(to),dx=X-x,dy=Y-y,ax=Math.abs(dx),ay=Math.abs(dy);if(a[1]==='pawn')return ax===1&&dy===(a[0]==='w'?1:-1);if(a[1]==='knight')return (ax===1&&ay===2)||(ax===2&&ay===1);if(a[1]==='king')return Math.max(ax,ay)===1;let ok=a[1]==='rook'?(dx===0||dy===0):a[1]==='bishop'?(ax===ay):a[1]==='queen'?(dx===0||dy===0||ax===ay):false;if(!ok)return false;const sx=Math.sign(dx),sy=Math.sign(dy);for(let cx=x+sx,cy=y+sy;cx!==X||cy!==Y;cx+=sx,cy+=sy)if(at(p,sq(cx,cy)))return false;return true}
 function attacked(p,target,by){return p.some(a=>a[0]===by&&attacks(p,a[2],target))}
 function pseudo(p,from,to){const a=at(p,from),b=at(p,to);if(!a||from===to||b?.[0]===a[0])return false;const [x,y]=xy(from),[X,Y]=xy(to),dx=X-x,dy=Y-y,ax=Math.abs(dx),ay=Math.abs(dy);switch(a[1]){case'pawn':{const d=a[0]==='w'?1:-1,start=a[0]==='w'?1:6;if(dx===0&&!b&&dy===d)return true;if(dx===0&&!b&&y===start&&dy===2*d&&!at(p,sq(x,y+d)))return true;return ax===1&&dy===d&&!!b&&b[0]!==a[0]}case'knight':return (ax===1&&ay===2)||(ax===2&&ay===1);case'king':return Math.max(ax,ay)===1;default:return attacks(p,from,to)}}
 function apply(p,from,to){const n=clone(p),i=n.findIndex(x=>x[2]===from);if(i<0)return n;const j=n.findIndex(x=>x[2]===to);if(j>=0)n.splice(j,1);const k=n.findIndex(x=>x[2]===from);if(k>=0)n[k][2]=to;return n}
 function inCheck(p,side){const k=kingSq(p,side);return !!k&&attacked(p,k,side==='w'?'b':'w')}
 function legal(p,from,to){const a=at(p,from);if(!a||!pseudo(p,from,to))return false;const n=apply(p,from,to);return !inCheck(n,a[0])}
 function moves(p,side,fromOnly){const out=[];for(const a of p){if(a[0]!==side||(fromOnly&&a[2]!==fromOnly))continue;for(let y=0;y<8;y++)for(let x=0;x<8;x++){const t=sq(x,y);if(legal(p,a[2],t))out.push({from:a[2],to:t,piece:a[1],capture:at(p,t)?.[1]||null})}}return out}
 function isMate(p,side){return inCheck(p,side)&&moves(p,side).length===0}
 function safePiece(p,s,side){return !attacked(p,s,side==='w'?'b':'w')}
 const api={F,V,at,attacks,attacked,apply,inCheck,legal,moves,isMate,safePiece,kingSq,clone};G.MinooChessRules=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

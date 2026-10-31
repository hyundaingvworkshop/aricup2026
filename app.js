(function(){
"use strict";
var DAY='2026-10-31';
var MAPIMG='/map.jpg';

/* ---------- 대회 데이터 ---------- */
var DIV={
  ari:{name:'아리부',desc:'여자 성인 · 경력 1–3년 이내',groups:{
    A:['TEAM MGC','아레스fc','FS OOY','볼터치A','조타FC'],
    B:['FC_SALVA','뉴킥스FC','Team CJ','FS아리아','공차FC'],
    C:['루나힐A','풋그리나FC','인천 YSC','FC콕','올라운더fs'],
    D:['FC 비바','루나힐B','볼터치B','국수저','SALFUT FC']}},
  tori:{name:'토리부',desc:'여자 성인 · 경력 무관',groups:{
    A:['킥캣','영원FC','VAMOS FC','FC 에잇톤트럭','리즈나우','원탑FS'],
    B:['부천 리프FS','Atlas FC','TEAM PUMPKIN','fc cru','심바유나이티드','VENOM FS']}}
};
var M=[];
var AT=['09:40','09:57','10:14','10:31','10:48','11:05','11:22','11:39','11:56','12:13'];
var AP=[[2,3],[1,4],[2,5],[3,4],[1,5],[2,4],[3,5],[1,2],[4,5],[1,3]];
[['A',1],['B',2],['C',5],['D',6]].forEach(function(gf){AT.forEach(function(t,i){M.push({div:'ari',stage:'pre',g:gf[0],t:t,f:gf[1],h:gf[0]+AP[i][0],a:gf[0]+AP[i][1]});});});
[['09:40',3,'A',1,6],['09:40',4,'A',3,4],['09:57',3,'B',2,5],['09:57',4,'B',3,6],['10:14',3,'A',2,3],['10:14',4,'A',5,6],
 ['10:31',3,'A',1,4],['10:31',4,'B',1,2],['10:48',3,'A',3,6],['10:48',4,'B',3,5],['11:05',3,'A',4,5],['11:05',4,'B',1,4],
 ['11:22',3,'A',1,3],['11:22',4,'A',2,6],['11:39',3,'B',2,6],['11:39',4,'B',3,4],['11:56',3,'A',2,4],['11:56',4,'B',1,5],
 ['12:13',3,'A',1,5],['12:13',4,'B',4,6],['12:30',1,'A',4,6],['12:30',2,'B',1,3],['12:47',1,'A',1,2],['12:47',2,'A',3,5],
 ['12:47',3,'B',2,4],['12:47',4,'B',5,6],['13:21',1,'A',2,5],['13:21',2,'B',1,6],['13:21',3,'B',2,3],['13:21',4,'B',4,5]
].forEach(function(x){M.push({div:'tori',stage:'pre',g:x[2],t:x[0],f:x[1],h:x[2]+x[3],a:x[2]+x[4]});});
[['13:04',1,1,'A','D'],['13:04',2,1,'B','C'],['13:38',1,1,'A','C'],['13:38',2,1,'D','B'],['14:12',1,1,'A','B'],['14:12',2,1,'C','D'],
 ['12:50',5,3,'A','C'],['12:50',6,5,'C','D'],['13:07',5,4,'A','C'],['13:07',6,4,'B','D'],['13:24',5,2,'C','D'],['13:24',6,3,'C','D'],
 ['13:41',5,3,'A','B'],['13:41',6,5,'B','D'],['13:58',5,4,'A','D'],['13:58',6,5,'A','C'],['14:15',5,2,'A','D'],['14:15',6,3,'A','D'],
 ['14:32',5,3,'B','C'],['14:32',6,5,'A','B'],['14:49',5,2,'B','C'],['14:49',6,4,'C','D'],['15:06',5,3,'B','D'],['15:06',6,4,'A','B'],
 ['15:23',5,2,'A','B'],['15:23',6,5,'A','D'],['15:40',5,4,'B','C'],['15:40',6,5,'B','C'],['15:57',5,2,'A','C'],['15:57',6,2,'B','D']
].forEach(function(x){M.push({div:'ari',stage:'main',g:String(x[2]),t:x[0],f:x[1],h:x[3]+x[2],a:x[4]+x[2]});});
[['13:55',1,1],['13:55',2,2],['13:55',3,3],['13:55',4,4],['14:12',3,5],['14:12',4,6]].forEach(function(x){
  M.push({div:'tori',stage:'rank',g:String(x[2]),t:x[0],f:x[1],h:'A'+x[2],a:'B'+x[2]});});
M.forEach(function(m){m.id=m.t.replace(':','')+'-'+m.f;});
M.sort(function(x,y){return x.t<y.t?-1:x.t>y.t?1:x.f-y.f;});
var BYID={};M.forEach(function(m){BYID[m.id]=m;});

var TL=[
 ['08:00','08:50','선수 검인 · 팀 등록','축구장 · 신분증 실물 필수 (사진 불가)',''],
 ['09:00','09:40','개회식','축구장 · 불참 팀은 무승부 경기 0점 처리',''],
 ['09:40','12:30','아리부 예선 리그','A·B조 1·2구장 / C·D조 5·6구장(풋살장)','a'],
 ['09:40','13:36','토리부 예선 리그','1–4구장(축구장) · 일부는 12:30 이후 1·2구장','t'],
 ['12:30','12:50','아리부 휴식 · 조 재편성','예선 순위별로 본선 조 편성 · 구장 이동','a'],
 ['12:50','16:12','아리부 본선 리그','1위조 1·2구장 / 2–5위조 5·6구장','a'],
 ['13:55','14:27','토리부 순위 결정전','1–4구장 · 1위v1위 ~ 6위v6위','t'],
 ['14:30','','토리부 시상식','축구장','t'],
 ['14:30','17:10','유소년부 경기','1–4구장 사용 (여성부 경기 없음)',''],
 ['16:30','','아리부 시상식','축구장','a']
];

/* ---------- 상태 ---------- */
var STATE={results:{},notice:'',draws:{},slots:{}},LOADED=false,OFFLINE=false,VER=-1,PENDING=false;
var ui={tab:'home',div:'ari',sub:'group',field:0,admin:false,mydiv:null};
var MY=null, EDITOR=false, PW=null, LOGIN_ERR='', C={};
var MODE=document.body.getAttribute('data-mode')==='admin'?'admin':'view';
ui.page=MODE;
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v);}catch(e){return null;}}

/* ---------- 유틸 ---------- */
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function toMin(t){var p=t.split(':');return (+p[0])*60+(+p[1]);}
function fmt(min){var h=Math.floor(min/60),m=min%60;return h+':'+(m<10?'0':'')+m;}
function now(){var d=new Date(Date.now()+9*3600e3);var ds=d.toISOString().slice(0,10);return{ds:ds,day:ds===DAY,before:ds<DAY,after:ds>DAY,min:d.getUTCHours()*60+d.getUTCMinutes()};}
function res(m){var r=STATE.results[m.id];return r&&r.st!=='live'&&r.h!=null&&r.a!=null?r:null;}
function liveRec(m){var r=STATE.results[m.id];return r&&r.st==='live'?r:null;}
function nameOf(div,key){var g=DIV[div].groups[key[0]];return g?g[+key.slice(1)-1]:key;}
function fieldName(f){return f+'구장';}
function fieldKind(f){return f<=4?'축구장':'풋살장';}
function stageTag(m){var d=DIV[m.div].name;if(m.stage==='pre')return d+' '+m.g+'조 예선';if(m.stage==='main')return d+' '+m.g+'위조 본선';return d+' '+m.g+'위 결정전';}

/* ---------- 순위 계산 ---------- */
/* 순위 규칙: 승점 → 승자승 → 페어플레이 → 골득실 → 추첨 (다득점은 쓰지 않음)
   - 승점이 같은 팀끼리 승자승(그 팀들 사이 경기의 승점)을 비교
   - 기준 하나로 일부만 갈리면, 남은 동률 팀끼리 다시 승자승부터 비교
   - 골득실까지 같으면 '추첨 대기'(운영진이 추첨 순서를 지정하면 그 순서) */
function rankTeams(keys,games,ord){
  var S={};keys.forEach(function(k){S[k]={k:k,p:0,w:0,d:0,l:0,gf:0,ga:0,fp:0,pts:0};});
  games.forEach(function(g){var r=g.r,H=S[g.h],A=S[g.a];if(!r||!H||!A)return;
    H.p++;A.p++;H.gf+=r.h;H.ga+=r.a;A.gf+=r.a;A.ga+=r.h;
    H.fp+=10-5*(r.hy||0)-10*(r.hr||0);A.fp+=10-5*(r.ay||0)-10*(r.ar||0);
    if(r.h>r.a){H.w++;A.l++;H.pts+=3;}else if(r.h<r.a){A.w++;H.l++;A.pts+=3;}else{H.d++;A.d++;H.pts++;A.pts++;}});
  function split(set,val){var vs=[],by={};set.forEach(function(k){var v=val(k);if(!(v in by)){by[v]=[];vs.push(v);}by[v].push(k);});
    vs.sort(function(x,y){return y-x;});return vs.map(function(v){return by[v];});}
  function h2h(set){var inS={},pt={};set.forEach(function(k){inS[k]=1;pt[k]=0;});
    games.forEach(function(g){var r=g.r;if(!r||!inS[g.h]||!inS[g.a])return;
      if(r.h>r.a)pt[g.h]+=3;else if(r.h<r.a)pt[g.a]+=3;else{pt[g.h]++;pt[g.a]++;}});return pt;}
  function resolve(set){if(set.length<2)return [set];
    var hp=h2h(set),crit=[function(k){return hp[k];},function(k){return S[k].fp;},function(k){return S[k].gf-S[k].ga;}];
    for(var c=0;c<crit.length;c++){var parts=split(set,crit[c]);
      if(parts.length>1){var out=[];parts.forEach(function(p){out=out.concat(resolve(p));});return out;}}
    return [set];}
  var rows=[],bi=0;
  split(keys,function(k){return S[k].pts;}).forEach(function(pset){
    resolve(pset).forEach(function(block){var rs=block.map(function(k){return S[k];});
      if(rs.length>1&&rs.every(function(r){return r.p>0;})){var id='b'+(bi++);rs.forEach(function(r){r.run=id;});
        if(ord&&rs.every(function(r){return ord.indexOf(r.k)>=0;})){rs.sort(function(x,y){return ord.indexOf(x.k)-ord.indexOf(y.k);});rs.forEach(function(r){r.drawn=true;});}
        else rs.forEach(function(r){r.tie=true;});}
      rows=rows.concat(rs);});});
  return rows;
}
function table(keys,ms,dk){
  return rankTeams(keys,ms.map(function(m){return{h:m.h,a:m.a,r:res(m)};}),dk&&STATE.draws&&STATE.draws[dk]);
}
/* 추첨 대기(동률) 팀은 같은 순위로 표시: 4·4·6 */
function dispRank(rows,i){var r=rows[i];if(r&&r.tie){for(var j=0;j<i;j++){if(rows[j].run===r.run)return j+1;}}return i+1;}
function groupMs(div,g){return M.filter(function(m){return m.div===div&&m.stage==='pre'&&m.g===g;});}
function groupTable(div,g){var k='gt'+div+g;if(!C[k]){C[k]=table(DIV[div].groups[g].map(function(_,i){return g+(i+1);}),groupMs(div,g),'pre:'+div+':'+g);}return C[k];}
function groupDone(div,g){return groupMs(div,g).every(function(m){return res(m);});}
function autoSlot(div,slot){var g=slot[0],r=+slot.slice(1);if(!groupDone(div,g))return null;var t=groupTable(div,g)[r-1];return t&&!t.tie?t.k:null;}
function slotOv(div,slot){return (STATE.slots&&STATE.slots[div+':'+slot])||'';}
function slotTeam(div,slot){var o=slotOv(div,slot);if(o)return o==='X'?null:o;return autoSlot(div,slot);}
function slotPh(div,k){var o=slotOv(div,k);return k[0]+'조 '+k.slice(1)+'위'+(o==='X'?' · 실격(빈 자리)':groupDone(div,k[0])?' (추첨 대기)':'');}
function teamSlot(div,key){var g=key[0];for(var r=1;r<=DIV[div].groups[g].length;r++){if(slotTeam(div,g+r)===key)return g+r;}return null;}
function side(m,w){var k=m[w];
  if(m.stage==='pre')return{name:nameOf(m.div,k),key:k,ok:true};
  var t=slotTeam(m.div,k);
  return t?{name:nameOf(m.div,t),key:t,ok:true,slot:k}:{name:slotPh(m.div,k),key:null,ok:false,slot:k};}
function mainMs(div,g){return M.filter(function(m){return m.div===div&&m.stage!=='pre'&&m.g===g;});}
function mainTable(g){var k='mt'+g;if(!C[k])C[k]=table(['A','B','C','D'].map(function(x){return x+g;}),mainMs('ari',g),'main:ari:'+g);return C[k];}
function mstate(m){if(res(m))return'done';if(liveRec(m))return'live';return'sched';}
function liveStrip(ms){var L=ms.filter(liveRec);if(!L.length)return '';
  return '<div class="livebox"><div class="lb-k"><span class="livedot"></span>지금 경기 중 '+L.length+'</div><div class="mlist">'+L.map(function(m){return matchCard(m);}).join('')+'</div></div>';}
function isMine(div,key){return MY&&key&&MY===div+':'+key;}

/* ---------- 렌더: 공통 조각 ---------- */
function matchCard(m,opt){opt=opt||{};
  var r=res(m),st=mstate(m),sc=r||liveRec(m),h=side(m,'h'),a=side(m,'a');
  var mine=isMine(m.div,h.key)||isMine(m.div,a.key);
  var hw=r&&(r.h>r.a||(r.h===r.a&&r.w==='h')),aw=r&&(r.a>r.h||(r.h===r.a&&r.w==='a'));
  var click=ui.admin;
  var stTxt=st==='done'?'종료':st==='live'?'<span class="livedot"></span>경기 중':'예정';
  function row(s,score,win){return '<div class="m-row'+(win?' win':'')+'"><span class="m-team'+(s.ok?'':' ph')+'">'+esc(s.name)+(isMine(m.div,s.key)?'<span class="me">★</span>':'')+'</span><span class="m-score">'+(sc?score:'')+'</span></div>';}
  var draw='';if(r&&r.h===r.a&&m.stage==='rank')draw=r.ph!=null&&r.pa!=null&&r.ph!==r.pa?'<div class="m-tag pk">승부차기 '+r.ph+' : '+r.pa+'</div>':r.w?'<div class="m-tag">무승부 · 승부차기 승</div>':'<div class="m-tag" style="color:var(--live)">무승부 · 승부차기 결과 입력 대기</div>';
  if(ui.admin&&sc&&(sc.hy||sc.hr||sc.ay||sc.ar))draw+='<div class="m-cards">경고 '+(sc.hy||0)+'·'+(sc.ay||0)+' · 퇴장 '+(sc.hr||0)+'·'+(sc.ar||0)+'</div>';
  return '<'+(click?'button type="button"':'div')+' class="match s-'+st+(mine?' mine':'')+(click?' click':'')+'" data-mid="'+m.id+'">'+
    '<div class="m-meta"><span class="m-time">'+(opt.noTime?fieldName(m.f).replace('구장',''):m.t)+'</span><span class="m-field">'+(opt.noTime?'구장':fieldName(m.f))+'</span></div>'+
    '<div class="m-body"><div class="m-tag">'+esc(opt.tag||stageTag(m))+(opt.noTime?'':' · '+fieldKind(m.f))+'</div>'+row(h,sc&&sc.h,hw)+row(a,sc&&sc.a,aw)+draw+'</div>'+
    '<div class="m-st '+st+'">'+stTxt+'</div></'+(click?'button':'div')+'>';}
function standings(rows,div,opt){opt=opt||{};
  var h='<div class="tbl-wrap"><table class="tbl"><thead><tr><th>#</th><th class="l">팀</th><th>경기</th><th>승</th><th>무</th><th>패</th><th>득</th><th>실</th><th>득실</th><th>FP</th><th>승점</th></tr></thead><tbody>';
  var anyTie=false;
  rows.forEach(function(r,i){var s=opt.slot?(function(){var t=slotTeam(div,r.k);return t?{n:nameOf(div,t),key:t,adj:!!slotOv(div,r.k)}:{n:slotPh(div,r.k),ph:1};})():{n:nameOf(div,r.k),key:r.k};
    if(r.tie)anyTie=true;
    var medal='';if(opt.medals&&opt.complete&&!r.tie){if(i===0)medal='<span class="medal g">우승</span>';if(i===1)medal='<span class="medal s">준우승</span>';}
    h+='<tr'+(isMine(div,s.key)?' class="mine"':'')+'><td class="rk">'+dispRank(rows,i)+(r.tie?'<span class="tie">*</span>':'')+(r.drawn?'<span class="drawn">추첨</span>':'')+'</td><td class="l'+(s.ph?' ph':'')+'">'+esc(s.n)+(s.adj?'<span class="drawn">조정</span>':'')+medal+'</td><td>'+r.p+'</td><td>'+r.w+'</td><td>'+r.d+'</td><td>'+r.l+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga>0?'+':'')+(r.gf-r.ga)+'</td><td>'+(r.p?r.fp:0)+'</td><td class="pts">'+r.pts+'</td></tr>';});
  h+='</tbody></table></div><div class="legend">순위: 승점 → 승자승 → 페어플레이(FP) → 골득실 → 추첨'+(anyTie?' · <span class="tie">* 모든 기준 동률, 추첨 대기</span>':'')+
    (opt.dk&&ui.admin&&rows.some(function(r){return r.run!=null;})?'<br><button type="button" class="chipbtn drawbtn" data-draw="'+opt.dk+'">동률 팀 추첨 순위 지정</button>':'')+'</div>';
  return h;}
function seg(name,opts,cur,cls){return '<div class="seg'+(cls?' '+cls:'')+'" role="group">'+opts.map(function(o){return '<button type="button" data-seg="'+name+'" data-v="'+o[0]+'" aria-pressed="'+(cur===o[0])+'">'+o[1]+'</button>';}).join('')+'</div>';}
function divSeg(){return seg('div',[['ari','아리부 · 20팀'],['tori','토리부 · 12팀']],ui.div,'div');}

/* ---------- 홈 ---------- */
function heroHTML(){var n=now();
  if(n.before){var days=Math.round((Date.parse(DAY)-Date.parse(n.ds))/864e5);
    return '<div class="hero"><div class="k">대회일 2026. 10. 31.(토)</div><div class="big">D-'+days+'</div><div class="line">08:00 검인·등록 → 09:00 개회식 → 09:40 첫 경기<br>관문체육공원 축구장·풋살장</div></div>';}
  if(n.after)return '<div class="hero"><div class="k">대회 종료</div><div class="big">FULL TIME</div><div class="line">최종 결과는 본선 탭에서 확인하세요. 참가해 주셔서 감사합니다.</div></div>';
  var live=M.filter(liveRec);
  var nxtT=null;M.forEach(function(m){if(mstate(m)==='sched'&&(!nxtT||m.t<nxtT))nxtT=m.t;});
  var nxt=nxtT?M.filter(function(m){return m.t===nxtT&&mstate(m)==='sched';}):[];
  var ev=TL.filter(function(e){var s=toMin(e[0]),en=e[1]?toMin(e[1]):s+20;return n.min>=s&&n.min<en&&!/리그|결정전|유소년/.test(e[2]);});
  function rows(list){return '<div class="now-list">'+list.map(function(m){var h=side(m,'h'),a=side(m,'a'),r=res(m)||liveRec(m);
    return '<div class="nowrow"><span class="f">'+m.f+'구장</span><span class="t">'+esc(h.name)+(r?' <b class="num">'+r.h+':'+r.a+'</b> ':' vs ')+esc(a.name)+'<div class="d">'+esc(stageTag(m))+'</div></span></div>';}).join('')+'</div>';}
  var h='<div class="hero"><div class="k">오늘 · '+fmt(n.min)+'</div>';
  if(ev.length)h+='<div class="big" style="font-size:28px">'+esc(ev[0][2])+'</div><div class="line">'+esc(ev[0][3])+'</div>';
  if(live.length)h+='<div class="k" style="margin-top:12px"><span class="livedot"></span>지금 경기 중 · '+live.length+'경기</div>'+rows(live);
  if(nxt.length){var dm=toMin(nxtT)-n.min;h+='<div class="k" style="margin-top:14px">다음 경기 · '+nxtT+' '+(dm>0?'('+dm+'분 후)':'(시작 대기)')+'</div>'+rows(nxt);}
  if(!ev.length&&!live.length&&!nxt.length)h+='<div class="big" style="font-size:28px">오늘 경기 일정 종료</div><div class="line">시상식 및 최종 결과는 본선 탭에서 확인하세요.</div>';
  return h+'</div>';}
function teamOptions(d){var o='<option value="">'+DIV[d].name+' 팀을 선택하세요</option>';
  Object.keys(DIV[d].groups).forEach(function(g){o+='<optgroup label="'+g+'조">';DIV[d].groups[g].forEach(function(t,i){var v=d+':'+g+(i+1);o+='<option value="'+v+'"'+(MY===v?' selected':'')+'>'+esc(t)+'</option>';});o+='</optgroup>';});return o;}
function myHTML(){
  var md=MY?MY.split(':')[0]:ui.mydiv;
  var h='<section class="my"><h2>우리 팀 일정 <span class="sub">선택하면 이 기기에 저장돼요</span></h2>'+seg('mydiv',[['ari','아리부'],['tori','토리부']],md,'div');
  if(!md)return h+'<p class="small muted">먼저 참가 부를 고르세요. 그다음 우리 팀을 선택하면 경기 시간·구장·상대 팀과 현재 순위가 여기에 모여요.</p></section>';
  h+='<select id="mysel" aria-label="우리 팀 선택">'+teamOptions(md)+'</select>';
  if(!MY)return h+'<p class="small muted">팀을 고르면 경기 시간·구장·상대 팀과 현재 순위가 여기에 모여요. 일정표와 순위표에서도 우리 팀이 ★로 표시됩니다.</p></section>';
  var p=MY.split(':'),div=p[0],key=p[1],g=key[0];
  var tb=groupTable(div,g),rk=0;tb.forEach(function(r,i){if(r.k===key)rk=i+1;});var me=tb[rk-1];
  var ms=M.filter(function(m){return m.div===div&&(m.stage==='pre'?(m.h===key||m.a===key):(side(m,'h').key===key||side(m,'a').key===key));});
  var done=groupDone(div,g);
  h+='<div class="mysum"><span class="pill '+div+'">'+DIV[div].name+' '+g+'조</span><span class="pill">예선 '+(done?'최종 ':'현재 ')+dispRank(tb,rk-1)+'위 · 승점 '+me.pts+'</span>';
  if(done){var sl=teamSlot(div,key);h+='<span class="pill gold">'+(sl?(div==='ari'?'본선 '+sl.slice(1)+'위조 진출':sl.slice(1)+'위 결정전 진출'):'본선 배정 확인 중 · 운영본부 문의')+'</span>';}
  h+='</div>';
  var next=ms.filter(function(m){return !res(m);})[0];
  if(next){var opp=side(next,'h').key===key?side(next,'a'):side(next,'h');
    if(liveRec(next))h+='<div class="callout" style="border-color:var(--live)"><b style="color:var(--live)"><span class="livedot"></span>지금 경기 중 · '+fieldName(next.f)+'('+fieldKind(next.f)+')</b> vs '+esc(opp.name)+'</div>';
    else h+='<div class="callout"><b>다음 경기 '+next.t+' · '+fieldName(next.f)+'('+fieldKind(next.f)+')</b> vs '+esc(opp.name)+'<br><span class="small">경기 시작 5분 전까지 해당 구장 대기 · 장비 체크</span></div>';}
  else if(!done||div==='ari'&&!ms.some(function(m){return m.stage==='main';}))h+='<p class="small muted">본선 일정은 예선 '+g+'조 경기가 모두 끝나면 자동으로 추가돼요.</p>';
  h+='<div class="mlist">'+ms.map(function(m){return matchCard(m);}).join('')+'</div>';
  if(!done)h+='<p class="small muted" style="margin-top:8px">'+(div==='ari'?'예선 순위에 따라 본선 1–5위조로 재편성되고, 본선 일정이 이곳에 이어서 표시돼요.':'예선 순위가 확정되면 순위 결정전 일정이 이곳에 표시돼요.')+'</p>';
  return h+'</section>';}
function timelineHTML(){var n=now();
  return '<section><h2>당일 진행 순서 <span class="sub">10.31(토)</span></h2><div class="card tl">'+TL.map(function(e){var s=toMin(e[0]),en=e[1]?toMin(e[1]):s+30;
    var cls=n.day&&n.min>=s&&n.min<en?' now':(n.day&&n.min>=en||n.after?' past':'');
    var tg=e[4]==='a'?'<span class="tag-a">● </span>':e[4]==='t'?'<span class="tag-t">● </span>':'';
    return '<div class="tl-i'+cls+'"><div class="w">'+e[0]+(e[1]?'<small>~ '+e[1]+'</small>':'')+'</div><div>'+tg+'<b>'+esc(e[2])+'</b><p>'+esc(e[3])+'</p></div></div>';}).join('')+'</div></section>';}
function teamsHTML(){var h='<section><h2>참가팀 · 조 편성 <span class="sub">10.25 추첨 결과</span></h2>';
  ['ari','tori'].forEach(function(d){h+='<div class="divlabel"><b class="'+(d==='ari'?'tag-a':'tag-t')+'">'+DIV[d].name+'</b><span class="small muted">'+DIV[d].desc+' · '+(d==='ari'?'5팀 4개조':'6팀 2개조')+'</span></div><div class="groups">';
    Object.keys(DIV[d].groups).forEach(function(g){h+='<div class="grp '+d+'"><h4>'+g+'조</h4><ol>'+DIV[d].groups[g].map(function(t,i){return '<li'+(isMine(d,g+(i+1))?' class="mine"':'')+'><span>'+(i+1)+'</span>'+esc(t)+'</li>';}).join('')+'</ol></div>';});h+='</div>';});
  return h+'</section>';}
function rule(title,body,open){return '<details class="rule"'+(open?' open':'')+'><summary>'+title+'</summary><div class="rb">'+body+'</div></details>';}
function rulesHTML(){return '<section><h2>대회 규정</h2>'+
  '<div class="quick"><div><b>5 vs 5</b><span>경기 인원</span></div><div><b>15분</b><span>단판 · 연장 없음</span></div><div><b>3·1·0</b><span>승 · 무 · 패</span></div></div>'+
  rule('경기 방식 · 규칙','<ul><li>풋살 정식 규칙 + 과천아리컵 특별 규정</li><li>공인구: 스포츠트라이브 ST 풋살공 4호</li><li>백패스 가능</li><li>팀 파울 3개 초과 시 세컨 페널티</li><li>모든 경기 단판 15분, 연장전 없음</li><li>토리부 순위 결정전에서 비기면 승부차기로 승리 팀 결정</li></ul>',true)+
  rule('순위 결정 · 페어플레이','<ul><li>승 3점 / 무 1점 / 패 0점</li><li>순위: 승점 → 승자승 → 페어플레이 → 골득실 → 추첨</li><li>페어플레이 점수: 경기마다 10점, 경고 −5점, 퇴장 −10점</li><li>본선 조 편성이 끝나면 예선 점수는 0점으로 초기화하고 본선 점수를 새로 계산</li><li class="warn">개회식 불참 팀은 무승부 경기를 모두 0점 처리</li></ul>')+
  rule('아리부 진행 방식','<ul><li>5팀 4개조 예선 풀리그 (팀당 4경기)</li><li>토너먼트 없이 예선 순위별로 조 재편성 → 1위조 ~ 5위조 본선 풀리그 (팀당 3경기)</li><li>팀당 총 7경기</li><li>우승·준우승은 1위조 본선 리그에서 결정</li><li>예선: A·B조 1·2구장, C·D조 5·6구장 / 본선: 1위조 1·2구장, 2–5위조 5·6구장</li></ul>')+
  rule('토리부 진행 방식','<ul><li>6팀 2개조 예선 풀리그 (팀당 5경기, 1–4구장)</li><li>순위 결정전: A조 n위 vs B조 n위 (1위v1위 ~ 6위v6위, 총 6경기)</li><li>순위 결정전 무승부 시 승부차기</li><li>1위 결정전 승리 팀이 우승</li></ul>')+
  rule('출전 · 복장 · 교체','<ul><li>경기 시작 <b>5분 전</b>까지 해당 구장 대기, 장비 체크. 킥오프 시각까지 미출전 시 실격</li><li>등록 10명 중 5명 출전. 참가신청서에 등록된 선수만 출전 가능</li><li>복장: 유니폼(없으면 같은 색 상의·하의) + 같은 색 축구 스타킹 + 정강이 보호대</li><li>유니폼 색이 비슷하면 비치된 조끼 착용</li><li>교체는 등록 선수 전원 가능, 교체 존에서 수시 교체</li><li>교체 선수가 라인 밖으로 완전히 나온 뒤 들어가기</li></ul>')+
  rule('징계','<ul><li>대회 중 경고 2회 또는 한 경기 경고 누적 퇴장: 다음 1경기 출전 정지</li><li>다이렉트 퇴장(레드카드): 이후 모든 경기 출전 불가</li><li>경고 누적은 리셋되지 않음</li><li>심각한 반칙·불법 행위 적발 시 팀 또는 선수 실격</li><li>다이렉트 퇴장 받은 지도자·선수는 시상 제외</li></ul>')+
  rule('검인 · 이의제기 · 안전','<ul><li>검인·등록 08:00–08:50 (축구장). 신분증 실물 지참: 주민등록증, 운전면허증, 여권, 모바일 신분증 (사진 불가)</li><li>이의제기: 물적 증거와 함께 구두 제기 후 서면 제출. 증거 없는 이의제기로 경기 중단 시 3분 후 불응하면 기권 처리</li><li>스포츠안전재단 보험 가입. 부상 시 대회본부는 응급치료만 지원</li><li>심장·호흡기 등 의료적 이상이 없는 선수만 출전</li></ul>')+
  '</section>';}
function parkHTML(){return '<section><h2>장소 · 주차</h2><div class="card"><dl class="kv">'+
  '<dt>장소</dt><dd><b>관문체육공원 축구장 · 풋살장</b><br><span class="sel">경기도 과천시 중앙로 294</span></dd>'+
  '<dt>축구장</dt><dd>1–4구장 · 아리부·토리부·유소년부<br><span class="small muted">검인·등록, 개회식, 시상식, 본부석·의료지원·기념품 배부처</span></dd>'+
  '<dt>풋살장</dt><dd>5–6구장 · 아리부<br><span class="small muted">현장본부·심판·의료지원, 출전 대기존(검인)</span></dd>'+
  '<dt>이동</dt><dd>축구장 ↔ 풋살장 도보 5분</dd>'+
  '<dt>주차</dt><dd>1·2 주차장 → 1–4구장 / 3 주차장 → 5–6구장<br><span class="small">무료 지원 예정</span> <span class="small" style="color:var(--live)">· 그 외 주차는 지원되지 않아요</span></dd>'+
  '<dt>천막</dt><dd>아리부 5개 · 토리부 6개 (축구장 옆), 풋살장 아리부 천막 5개</dd>'+
  '</dl><div class="linkrow"><a href="https://map.naver.com/p/search/%EA%B4%80%EB%AC%B8%EC%B2%B4%EC%9C%A1%EA%B3%B5%EC%9B%90" target="_blank" rel="noopener">네이버 지도</a><a href="https://map.kakao.com/?q=%EA%B4%80%EB%AC%B8%EC%B2%B4%EC%9C%A1%EA%B3%B5%EC%9B%90" target="_blank" rel="noopener">카카오맵</a><button type="button" data-copy="경기도 과천시 중앙로 294">주소 복사</button></div></div></section>';}
function placeHTML(){return '<section><h2>참가 혜택 · 시상</h2><div class="prize"><div class="card small muted">참가자 JUKIT 웰컴 키트 (팀당 최대 10세트) · 천막 무료 제공</div>'+
  '<div class="card"><span class="rk">1위</span><div><b>트로피 + 시상 보드</b><br>상금 50만원 · 과천화폐 20만원 · JUKIT 커스텀 유니폼 20만원 바우처</div></div>'+
  '<div class="card"><span class="rk s">2위</span><div><b>트로피 + 시상 보드</b><br>상금 30만원 · 과천화폐 20만원 · JUKIT 커스텀 유니폼 20만원 바우처</div></div>'+
  '<p class="small muted" style="margin:0">아리부·토리부 각각 시상</p></div></section>'+
  '<section><h2>문의</h2><div class="card"><dl class="kv"><dt>대회 담당</dt><dd>권예은 · <span class="sel num" style="font-size:17px">010-5913-3303</span></dd></dl><div class="linkrow"><button type="button" data-copy="010-5913-3303">번호 복사</button></div></div></section>'+
  '<p class="foot">주최 과천시 · 주관 과천시체육회, 과천시축구협회 · 진행 과천아리여성축구단, 김신욱 축구교실 · 협찬 주키트 Jukit<br>대회 일정은 현장 사정에 따라 변경될 수 있어요.</p>';}
/* ---------- 대회장 배치도 ---------- */
function pitch(x,y,w,h,label){var cx=x+w/2,cy=y+h/2,gb=h*0.42,gw=w*0.11;
  return '<rect class="v-pitch" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="3"/>'+
    '<g class="v-line"><rect x="'+(x+4)+'" y="'+(y+4)+'" width="'+(w-8)+'" height="'+(h-8)+'"/><line x1="'+cx+'" y1="'+(y+4)+'" x2="'+cx+'" y2="'+(y+h-4)+'"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(h*0.16)+'"/><rect x="'+(x+4)+'" y="'+(cy-gb/2)+'" width="'+gw+'" height="'+gb+'"/><rect x="'+(x+w-4-gw)+'" y="'+(cy-gb/2)+'" width="'+gw+'" height="'+gb+'"/></g>'+
    '<rect class="v-tagbg" x="'+(cx-30)+'" y="'+(cy-12)+'" width="60" height="24" rx="6"/><text class="v-tag" x="'+cx+'" y="'+(cy+4.5)+'" text-anchor="middle">'+label+'</text>';}
function box(x,y,w,h,lines,cls,tcls){var ty=y+h/2+4-(lines.length-1)*6;
  return '<rect class="'+(cls||'v-booth')+'" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4"/><text class="v-bt'+(tcls?' '+tcls:'')+'" x="'+(x+w/2)+'" y="'+ty+'" text-anchor="middle">'+
    lines.map(function(l,i){return '<tspan x="'+(x+w/2)+'" dy="'+(i?12:0)+'">'+l+'</tspan>';}).join('')+'</text>';}
function vbar(x,y,w,h,txt,cls,tcls){var cx=x+w/2,cy=y+h/2;
  return '<rect class="'+cls+'" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4"/><text class="v-bt '+tcls+'" x="'+cx+'" y="'+cy+'" text-anchor="middle" dominant-baseline="central" transform="rotate(90 '+cx+' '+cy+')">'+txt+'</text>';}
function fieldSVG(){
  var B=[['내빈석','1','g'],['내빈석','2','g'],['심판','대기석'],['본부석','','hq'],['의료','지원'],['운영','본부'],['기념품','배부'],['한의','의료'],['이벤트','부스']];
  var s='<svg viewBox="0 0 400 328" role="img" aria-label="축구장 1–4구장 배치도">';
  B.forEach(function(b,i){var x=10+i*42.5;s+=box(x,6,40,40,b[1]?[b[0],b[1]]:[b[0]],b[2]==='hq'?'v-hq':b[2]==='g'?'v-guest':'v-booth',b[2]==='hq'?'inv':'');});
  s+='<rect class="v-track" x="10" y="52" width="322" height="210" rx="70"/><rect class="v-infield" x="34" y="66" width="274" height="182" rx="6"/>';
  s+=pitch(40,72,128,80,'1구장')+pitch(174,72,128,80,'3구장')+pitch(40,162,128,80,'2구장')+pitch(174,162,128,80,'4구장');
  s+=vbar(338,52,24,124,'아리부 천막 5','v-ari','inv')+vbar(338,180,24,82,'토리부 천막 6','v-tori','dk')+vbar(368,52,24,240,'관중석 스탠드','v-stand','');
  s+='<rect class="v-youth" x="10" y="270" width="352" height="22" rx="4"/><text class="v-bt inv" x="186" y="284.5" text-anchor="middle">유소년부 텐트존 (16개)</text>';
  s+='<rect class="v-stand" x="10" y="298" width="382" height="22" rx="4"/><text class="v-bt" x="201" y="312.5" text-anchor="middle">관중석 스탠드</text>';
  return s+'</svg>';}
function futsalSVG(){
  var s='<svg viewBox="0 0 400 300" role="img" aria-label="풋살장 5–6구장 배치도"><rect class="v-ground" x="10" y="8" width="380" height="244" rx="10"/>';
  s+=box(22,20,72,30,['심판'])+box(22,56,72,30,['현장본부'])+box(22,92,72,30,['의료지원']);
  s+='<text class="v-small" x="58" y="150" text-anchor="middle">← 입구</text>';
  s+=box(22,168,72,72,['출전','대기존','(검인)'],'v-hq','inv');
  s+=pitch(106,20,272,104,'5구장')+pitch(106,136,272,104,'6구장');
  s+='<rect class="v-ari" x="10" y="262" width="380" height="28" rx="6"/><text class="v-bt inv" x="200" y="280" text-anchor="middle">아리부 천막 (5개)</text>';
  return s+'</svg>';}
function venueHTML(){var v=ui.map||'field',h='<section class="venue"><h2>대회장 배치도</h2>'+seg('map',[['field','축구장 1–4'],['futsal','풋살장 5–6'],['park','위치·주차']],v);
  if(v==='field')h+='<div class="card vcard">'+fieldSVG()+'</div><p class="small muted vnote">검인·등록, 개회식, 시상식은 모두 축구장에서 해요. 아리부 A·B조 예선과 1위조 본선은 1·2구장, 토리부는 1–4구장에서 경기해요.</p>';
  else if(v==='futsal')h+='<div class="card vcard">'+futsalSVG()+'</div><p class="small muted vnote">아리부 C·D조 예선과 2–5위조 본선이 열려요. 출전 대기존에서 검인 후 입장하고, 축구장에서 도보 5분 거리예요.</p>';
  else h+='<div class="card vcard"><img src="'+MAPIMG+'" alt="관문체육공원 위성 지도: 축구장 1–4구장, 풋살장 5–6구장, 1·2·3 주차장 위치"></div><p class="small muted vnote">1·2 주차장 → 축구장(1–4구장) · 3 주차장 → 풋살장(5–6구장). 무료 지원 예정이며, 그 외 장소 주차는 지원되지 않아요.</p>';
  return h+'</section>';}
function placeTabHTML(){return parkHTML()+venueHTML();}
function homeHTML(){return '<section>'+heroHTML()+'</section>'+myHTML()+timelineHTML()+teamsHTML()+rulesHTML()+placeHTML();}

/* ---------- 예선 / 본선 ---------- */
function timeList(ms){
  var fields=[];ms.forEach(function(m){if(fields.indexOf(m.f)<0)fields.push(m.f);});fields.sort();
  if(ui.field&&fields.indexOf(ui.field)<0)ui.field=0;
  var h='<div class="chips" role="group">'+[[0,'전체 구장']].concat(fields.map(function(f){return[f,f+'구장'];})).map(function(o){return '<button type="button" data-field="'+o[0]+'" aria-pressed="'+(ui.field===o[0])+'">'+o[1]+'</button>';}).join('')+'</div>';
  var list=ms.filter(function(m){return !ui.field||m.f===ui.field;}),by={},order=[];
  list.forEach(function(m){if(!by[m.t]){by[m.t]=[];order.push(m.t);}by[m.t].push(m);});
  var n=now();
  order.forEach(function(t){var live=by[t].some(liveRec);
    if(ui.div==='ari'&&ui.tab==='pre'&&t==='12:30'){}
    h+='<div class="tgroup"><div class="tt'+(live?' live':'')+'">'+t+'</div><div class="mlist">'+by[t].map(function(m){return matchCard(m,{noTime:true});}).join('')+'</div></div>';});
  return h;}
function preHTML(){var d=ui.div,h=divSeg()+liveStrip(M.filter(function(m){return m.div===d&&m.stage==='pre';}))+seg('sub',[['group','조별 순위'],['time','시간표']],ui.sub);
  var ms=M.filter(function(m){return m.div===d&&m.stage==='pre';});
  if(ui.sub==='time'){
    h+='<p class="small muted" style="margin:0 0 10px">'+(d==='ari'?'09:40 – 12:30 · A·B조 1·2구장, C·D조 5·6구장(풋살장)':'09:40 – 13:36 · 1–4구장(축구장)')+'</p>';
    h+=timeList(ms);
    h+='<div class="banner">'+(d==='ari'?'12:30 – 12:50 휴식 · 본선 조 재편성 · 구장 이동':'13:55 순위 결정전 시작 → 본선 탭')+'</div>';
    return h;}
  Object.keys(DIV[d].groups).forEach(function(g){var gms=groupMs(d,g),played=gms.filter(function(m){return res(m);}).length;
    var fl=d==='ari'?({A:'1구장',B:'2구장',C:'5구장',D:'6구장'})[g]:'1–4구장';
    h+='<div class="gcard"><div class="ghead '+d+'"><h3>'+g+'조</h3><span class="gs">'+fl+' · '+played+'/'+gms.length+' 경기 종료</span></div>'+standings(groupTable(d,g),d,{dk:'pre:'+d+':'+g})+
      '<details class="gm"'+(MY&&MY.indexOf(d+':'+g)===0?' open':'')+'><summary>'+g+'조 경기 '+gms.length+'개 보기</summary><div class="mlist">'+gms.map(function(m){return matchCard(m,{tag:m.g+'조 예선'});}).join('')+'</div></details></div>';});
  h+='<p class="small muted">'+(d==='ari'?'예선이 끝나면 각 조 같은 순위끼리 본선 조(1–5위조)로 재편성돼요.':'예선이 끝나면 A조·B조 같은 순위끼리 순위 결정전을 치러요.')+'</p>';
  return h;}
function mainHTML(){var d=ui.div,h=divSeg()+liveStrip(M.filter(function(m){return m.div===d&&m.stage!=='pre';}));
  if(d==='tori'){
    h+='<div class="card small" style="margin-bottom:12px">13:55부터 1–4구장 · A조 n위 vs B조 n위 · 단판 15분 · 무승부 시 승부차기</div>';
    var ms=M.filter(function(m){return m.div==='tori'&&m.stage==='rank';});
    h+='<h2>순위 결정전</h2>'+timeList(ms);
    h+='<h2 style="margin-top:18px">토리부 최종 순위</h2><div class="rank-list">';
    for(var r=1;r<=6;r++){var m=ms.filter(function(x){return x.g===String(r);})[0],x=res(m),hs=side(m,'h'),as=side(m,'a'),w=null;
      if(x){w=x.h>x.a?'h':x.a>x.h?'a':(x.w||null);}
      if(w){var W=w==='h'?hs:as,L=w==='h'?as:hs;
        h+='<div class="rrow'+(isMine('tori',W.key)?' mine':'')+'"><span class="p">'+(2*r-1)+'</span><span class="n">'+esc(W.name)+(r===1?'<span class="medal g">우승</span>':'')+'</span></div>';
        h+='<div class="rrow'+(isMine('tori',L.key)?' mine':'')+'"><span class="p">'+(2*r)+'</span><span class="n">'+esc(L.name)+(r===1?'<span class="medal s">준우승</span>':'')+'</span></div>';}
      else h+='<div class="rrow"><span class="p">'+(2*r-1)+'–'+(2*r)+'</span><span class="n muted">'+esc(hs.name)+' / '+esc(as.name)+'</span><span class="pill">'+(x?'승부차기 결과 대기':m.t+' '+m.f+'구장')+'</span></div>';}
    return h+'</div><p class="small muted">시상식 14:30 · 축구장</p>';}
  h+='<div class="card small" style="margin-bottom:12px">예선 순위별로 조를 재편성해 본선 풀리그(팀당 3경기)를 치러요. <b>본선 점수는 0점에서 다시 시작</b>하고, 우승·준우승은 <b>1위조</b>에서 결정돼요.</div>';
  h+=seg('sub',[['group','조별 순위'],['time','시간표']],ui.sub);
  if(ui.sub==='time'){h+='<p class="small muted" style="margin:0 0 10px">12:50 – 16:12 · 1위조 1·2구장, 2–5위조 5·6구장(풋살장)</p>'+timeList(M.filter(function(m){return m.div==='ari'&&m.stage==='main';}))+'<div class="banner">16:30 아리부 시상식 · 축구장</div>';return h;}
  ['1','2','3','4','5'].forEach(function(g){var gms=mainMs('ari',g),played=gms.filter(function(m){return res(m);}).length,complete=played===gms.length;
    h+='<div class="gcard"><div class="ghead"><h3>'+g+'위조'+(g==='1'?' · 우승 결정':'')+'</h3><span class="gs">'+(g==='1'?'1·2구장':'5·6구장')+' · '+played+'/'+gms.length+' 경기 종료</span></div>'+
      standings(mainTable(g),'ari',{slot:true,medals:g==='1',complete:complete,dk:'main:ari:'+g})+
      '<details class="gm"'+(g==='1'?' open':'')+'><summary>'+g+'위조 경기 '+gms.length+'개 보기</summary><div class="mlist">'+gms.map(function(m){return matchCard(m,{tag:g+'위조 본선'});}).join('')+'</div></details></div>';});
  h+='<p class="small muted">예선 조 경기가 모두 끝나야 해당 순위 팀 이름이 채워져요. 그 전에는 "A조 1위"처럼 표시돼요.</p>';
  return h;}

/* ---------- 전체 렌더 ---------- */
var ICON={place:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  pre:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/></svg>',
  main:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M12 14v4M8 21h8M9 18h6"/></svg>'};
/* ---------- 관리자 페이지 (#admin) ---------- */
function arows(list,empty){return list.length?'<div class="mlist">'+list.map(function(m){return matchCard(m);}).join('')+'</div>':'<p class="small muted">'+empty+'</p>';}
function adminBody(){
  var live=M.filter(liveRec),done=M.filter(function(m){return res(m);}).length,nxtT=null;
  M.forEach(function(m){if(mstate(m)==='sched'&&(!nxtT||m.t<nxtT))nxtT=m.t;});
  var h='<div class="quick"><div><b>'+live.length+'</b><span>경기 중</span></div><div><b>'+done+'/'+M.length+'</b><span>종료</span></div><div><b>'+(nxtT||'–')+'</b><span>다음 시작</span></div></div>';
  h+='<section><h2>팀 검색 <span class="sub">팀 경기를 모아 보고 바로 수정</span></h2><input id="tq" class="search" type="search" enterkeyhint="search" placeholder="팀명 입력 (예: 볼터치, fc)" autocomplete="off" value="'+esc(ui.q||'')+'"><div id="tqres">'+teamSearchHTML()+'</div></section>';
  var dv=ui.adiv||'all',av=ui.aview||'now',ms=M.filter(function(m){return dv==='all'||m.div===dv;});
  h+='<section><h2>경기 상태 · 결과 입력 <span class="sub">경기를 누르면 입력 창이 열려요</span></h2>'+seg('adiv',[['all','전체'],['ari','아리부'],['tori','토리부']],dv)+seg('aview',[['now','지금 할 경기'],['all','전체 일정']],av);
  if(av==='now'){
    var L=ms.filter(liveRec),nt=null;ms.forEach(function(m){if(mstate(m)==='sched'&&(!nt||m.t<nt))nt=m.t;});
    var N=nt?ms.filter(function(m){return m.t===nt&&mstate(m)==='sched';}):[];
    var D=ms.filter(function(m){return res(m);}).sort(function(x,y){return x.t<y.t?1:x.t>y.t?-1:0;}).slice(0,6);
    h+='<div class="lb-k"><span class="livedot"></span>경기 중 '+L.length+' · 끝나면 눌러서 최종 스코어 저장</div>'+arows(L,'진행 중인 경기가 없어요.');
    h+='<div class="lb-k blue">다음 시작'+(nt?' · '+nt:'')+' · 시작하면 눌러서 경기 중으로 표시</div>'+arows(N,'남은 경기가 없어요.');
    h+='<div class="lb-k muted2">최근 종료 · 잘못 넣었으면 눌러서 수정</div>'+arows(D,'아직 종료된 경기가 없어요.');
  } else h+=timeList(ms);
  h+='</section>';
  h+='<section><h2>상단 공지 <span class="sub">참가자 화면 맨 위에 표시</span></h2><div class="card"><textarea id="noticeta" placeholder="예) 3구장 경기가 10분씩 지연되고 있어요">'+esc(STATE.notice||'')+'</textarea><div class="sh-actions"><button type="button" class="pri" data-act="savenotice">공지 저장</button></div><p class="small muted" style="margin:8px 0 0">비우고 저장하면 공지가 내려가요.</p></div></section>';
  var dks=[];['ari','tori'].forEach(function(d){Object.keys(DIV[d].groups).forEach(function(g){dks.push('pre:'+d+':'+g);});});['1','2','3','4','5'].forEach(function(g){dks.push('main:ari:'+g);});
  var tied=dks.filter(function(dk){return tableFor(dk).some(function(r){return r.run!=null;});});
  h+='<section><h2>동률 추첨 <span class="sub">모든 기준이 같은 팀</span></h2>'+(tied.length?'<div class="alist">'+tied.map(function(dk){var pend=tableFor(dk).some(function(r){return r.tie;});
    return '<button type="button" class="arow" data-draw="'+dk+'"><span>'+esc(drawTitle(dk))+'</span><span class="pill'+(pend?' live':'')+'">'+(pend?'추첨 대기':'지정됨')+'</span></button>';}).join('')+'</div>':'<p class="card small muted" style="margin:0">승점·승자승·페어플레이·골득실까지 모두 같은 팀이 생기면 여기에 나타나요.</p>')+'</section>';
  function cnt(d){return Object.keys(STATE.slots||{}).filter(function(k){return k.indexOf(d+':')===0;}).length;}
  h+='<section><h2>본선 팀 배정 <span class="sub">실격·부정선수 등</span></h2><div class="alist">'+['ari','tori'].map(function(d){return '<button type="button" class="arow" data-slots="'+d+'"><span>'+DIV[d].name+' '+(d==='ari'?'본선 1–5위조':'순위 결정전')+'</span><span class="pill">'+(cnt(d)?'조정 '+cnt(d)+'자리':'자동 배정')+'</span></button>';}).join('')+'</div></section>';
  var anyRec=Object.keys(STATE.results).length;
  h+='<section><h2>결과 일괄 초기화 <span class="sub">모두 예정으로 되돌리기</span></h2><div class="card"><p class="small muted" style="margin:0 0 10px">테스트 기록을 지우거나 처음부터 다시 입력할 때 써요. 고른 범위의 경기가 모두 "예정"으로 돌아가고 순위가 0부터 다시 계산돼요. 지금 입력된 경기 '+anyRec+'개.</p><button type="button" class="chipbtn danger" data-reset="1">일괄 초기화…</button></div></section>';
  h+='<p class="small muted">저장하면 참가자 화면에 몇 초 안에 반영돼요. 운영진 여러 명이 동시에 다른 경기를 입력해도 서로 덮어쓰지 않아요.</p>';
  h+='<div class="linkrow"><a href="/" target="_blank" rel="noopener">참가자 화면 새 창으로 보기</a><button type="button" data-act="logout">로그아웃</button></div>';
  return h;}
function offlineBar(){return OFFLINE?'<div class="notice"><div class="wrap"><b>연결</b><p>최신 결과를 불러오지 못했어요. 인터넷 연결을 확인해 주세요. 자동으로 다시 시도해요.</p></div></div>':'';}
function adminHTML(){
  var h='<header id="hdr" class="adm"><div class="wrap"><div class="brand"><small>운영진 전용</small><b>과천아리컵 운영 관리</b><span>결과 입력 · 공지 · 추첨 · 본선 배정</span></div><a class="adm-btn" href="/">참가자 화면</a></div></header>'+offlineBar()+'<main class="wrap" id="view">';
  if(EDITOR)h+=adminBody();
  else h+='<form class="card login" id="loginform" autocomplete="off"><h3>관리자 로그인</h3><p class="small muted" style="margin:4px 0 12px">운영진 비밀번호를 입력하면 결과 입력·공지·추첨·본선 배정을 할 수 있어요. 이 기기에서는 로그아웃 전까지 로그인이 유지돼요.</p>'+
    '<label for="pw" class="small" style="font-weight:600">비밀번호</label><input id="pw" type="password" inputmode="numeric" autocomplete="current-password" required>'+
    (LOGIN_ERR?'<p class="small" style="color:var(--live);margin:8px 0 0">'+esc(LOGIN_ERR)+'</p>':'')+
    '<div class="sh-actions"><button type="submit" class="pri">들어가기</button></div></form>';
  return h+'</main><div id="sheet"></div><div id="toast" hidden></div>';}

function render(){C={};
  var app=document.getElementById('app');
  ui.admin=ui.page==='admin'&&EDITOR;
  if(ui.page==='admin'){app.innerHTML=adminHTML();return;}
  var h='<header id="hdr"><div class="wrap"><div class="brand"><small>2026 과천아리컵 전국 미니축구대회</small><b>과천아리컵 · 여성부</b><span>10.31(토) · 관문체육공원</span></div></div></header>';
  h+=offlineBar();
  if(STATE.notice)h+='<div class="notice"><div class="wrap"><b>공지</b><p>'+esc(STATE.notice)+'</p></div></div>';
  h+='<main class="wrap" id="view">'+(ui.tab==='place'?placeTabHTML():ui.tab==='home'?homeHTML():ui.tab==='pre'?preHTML():mainHTML())+'</main>';
  h+='<nav id="nav" aria-label="메뉴"><div class="in">'+[['place','장소'],['home','홈'],['pre','예선'],['main','본선']].map(function(t){return '<button type="button" data-tab="'+t[0]+'"'+(ui.tab===t[0]?' aria-current="page"':'')+'>'+ICON[t[0]]+t[1]+'</button>';}).join('')+'</div></nav>';
  h+='<div id="sheet"></div><div id="toast" hidden></div>';
  app.innerHTML=h;
  try{ls('aricup-ui',JSON.stringify({tab:ui.tab,div:ui.div,sub:ui.sub,mydiv:ui.mydiv}));}catch(e){}
}
var toastT;function toast(msg){var t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(function(){t.hidden=true;},4200);}

/* ---------- 결과 입력 시트 ---------- */
var draft=null;
function openSheet(id){var m=BYID[id];if(!m)return;var r=STATE.results[id]||{};
  var cur=mstate(m);
  draft={id:id,h:r.h!=null?r.h:0,a:r.a!=null?r.a:0,hy:r.hy||0,hr:r.hr||0,ay:r.ay||0,ar:r.ar||0,ph:r.ph||0,pa:r.pa||0,w:r.w||'',cur:cur,st:cur==='sched'?'live':'done'};drawSheet();}
function stepper(k,v,sm){return '<div class="step'+(sm?' sm':'')+'"><button type="button" data-st="'+k+'" data-d="-1" aria-label="빼기">−</button><output class="num">'+v+'</output><button type="button" data-st="'+k+'" data-d="1" aria-label="더하기">+</button></div>';}
function drawSheet(){var el=document.getElementById('sheet');if(!draft){el.innerHTML='';return;}
  var m=BYID[draft.id],hs=side(m,'h'),as=side(m,'a');
  function team(s,p){return '<div class="sh-team"><div class="nm">'+esc(s.name)+'</div><div class="sh-grid"><span>득점</span>'+stepper(p,draft[p])+'<span class="muted">경고</span>'+stepper(p+'y',draft[p+'y'],1)+'<span class="muted">퇴장</span>'+stepper(p+'r',draft[p+'r'],1)+'</div></div>';}
  var h='<div class="sheet-bg" id="sheetbg"><div class="sheet" role="dialog" aria-modal="true" aria-label="경기 결과 입력"><h3>'+m.t+' · '+fieldName(m.f)+'</h3><div class="small muted">'+esc(stageTag(m))+' · 현재 '+({sched:'예정',live:'경기 중',done:'종료'})[draft.cur]+'</div>'+
    '<div class="seg" role="group" aria-label="경기 상태">'+[['sched','예정'],['live','경기 중'],['done','종료']].map(function(o){return '<button type="button" data-dst="'+o[0]+'" aria-pressed="'+(draft.st===o[0])+'">'+o[1]+'</button>';}).join('')+'</div>';
  if(draft.st==='sched')h+='<div class="sh-note">'+(draft.cur==='sched'?'아직 시작 전인 경기예요. 시작하면 <b>경기 중</b>을 눌러 표시해 주세요.':'저장하면 진행 표시와 입력된 점수가 지워지고 <b>예정</b>으로 돌아가요.')+'</div>';
  else if(draft.st==='live')h+='<div class="sh-note">참가자 화면에 <b style="color:var(--live)">● 경기 중</b>으로 표시돼요. 점수는 비워둬도 되고, 중간 스코어를 넣으면 함께 보여요. 순위에는 <b>종료</b>로 저장한 경기만 반영돼요.</div>'+team(hs,'h')+team(as,'a');
  else h+='<div class="sh-note">최종 스코어를 저장하면 순위표와 본선 대진에 바로 반영돼요.</div>'+team(hs,'h')+team(as,'a');
  if(draft.st==='done'&&m.stage==='rank'&&draft.h===draft.a)h+='<div class="sh-team"><div class="nm">무승부 · 승부차기 스코어</div><div class="sh-grid"><span>'+esc(hs.name)+'</span>'+stepper('ph',draft.ph)+'<span>'+esc(as.name)+'</span>'+stepper('pa',draft.pa)+'</div><div class="small muted" style="margin-top:6px">'+(draft.ph!==draft.pa?'<b>'+esc(draft.ph>draft.pa?hs.name:as.name)+'</b> 승부차기 승으로 저장돼요.':'승부차기 점수가 같으면 결과 입력 대기로 저장돼요.')+'</div></div>';
  var lbl=draft.st==='sched'?(draft.cur==='sched'?'':'예정으로 되돌리기'):draft.st==='live'?(draft.cur==='live'?'중간 스코어 저장':'경기 중으로 표시'):'최종 결과 저장';
  h+='<div class="sh-actions"><button type="button" data-act="close">취소</button>'+(lbl?'<button type="button" class="pri" data-act="save">'+lbl+'</button>':'')+'</div></div></div>';
  el.innerHTML=h;}
var slotDraft=null;
function openSlots(dv){slotDraft={div:dv||ui.div,map:JSON.parse(JSON.stringify(STATE.slots||{}))};drawSlotSheet();}
function slotEff(d,s){var o=d.map[d.div+':'+s];if(o)return o==='X'?null:o;return autoSlot(d.div,s);}
function drawSlotSheet(){C={};var d=slotDraft,div=d.div,gs=Object.keys(DIV[div].groups),n=DIV[div].groups[gs[0]].length,r;
  var seen={},dup={};gs.forEach(function(g){for(var q=1;q<=n;q++){var t=slotEff(d,g+q);if(t){if(seen[t])dup[t]=1;seen[t]=1;}}});
  var h='<div class="sheet-bg" id="sheetbg"><div class="sheet" role="dialog" aria-modal="true" aria-label="본선 팀 배정 수정"><h3>'+DIV[div].name+' 본선 팀 배정</h3><div class="small muted">"자동"이면 예선 순위대로 들어가요. 실격 팀 자리는 다른 팀으로 바꾸거나 "실격 · 빈 자리"로 두세요. 바꾼 자리는 참가자 화면에 "조정"으로 표시돼요.</div>';
  for(r=1;r<=n;r++){h+='<div class="sh-team"><div class="nm">'+(div==='ari'?r+'위조 본선':r+'위 결정전')+'</div><div class="slotgrid">';
    gs.forEach(function(g){var s=g+r,key=div+':'+s,o=d.map[key]||'',a=autoSlot(div,s),eff=slotEff(d,s);
      var opts='<option value="">자동 · '+(a?esc(nameOf(div,a)):'예선 미확정')+'</option>'+DIV[div].groups[g].map(function(t,i){var v=g+(i+1);return '<option value="'+v+'"'+(o===v?' selected':'')+'>'+esc(t)+'</option>';}).join('')+'<option value="X"'+(o==='X'?' selected':'')+'>실격 · 빈 자리</option>';
      h+='<label class="slotrow'+(o?' adj':'')+(eff&&dup[eff]?' dup':'')+'"><span>'+g+'조 '+r+'위</span><select data-slot="'+key+'">'+opts+'</select></label>';});
    h+='</div></div>';}
  var dk=Object.keys(dup);
  if(dk.length)h+='<div class="sh-note" style="color:var(--live)">같은 팀이 두 자리에 들어가 있어요: '+dk.map(function(k){return esc(nameOf(div,k));}).join(', ')+'. 한 자리를 바꿔야 저장할 수 있어요.</div>';
  h+='<div class="sh-actions"><button type="button" data-act="close">닫기</button><button type="button" class="pri" data-act="saveslots"'+(dk.length?' disabled':'')+'>배정 저장</button></div></div></div>';
  document.getElementById('sheet').innerHTML=h;}
/* ---------- 관리자: 팀 검색 ---------- */
function norm(s){return String(s||'').toLowerCase().replace(/[\s_\-]+/g,'');}
function teamSearchHTML(){var q=norm(ui.q);
  if(!q)return '<p class="small muted" style="margin:8px 2px 0">팀명 일부만 입력해도 찾아요. 경기를 누르면 스코어·경고·퇴장을 고칠 수 있어요.</p>';
  var hits=[];['ari','tori'].forEach(function(d){Object.keys(DIV[d].groups).forEach(function(g){DIV[d].groups[g].forEach(function(t,i){if(norm(t).indexOf(q)>=0)hits.push({d:d,k:g+(i+1),n:t});});});});
  if(!hits.length)return '<p class="small muted" style="margin:8px 2px 0">"'+esc(ui.q)+'"와 일치하는 팀이 없어요.</p>';
  var more=hits.length-4;hits=hits.slice(0,4);
  return hits.map(function(x){var g=x.k[0],tb=groupTable(x.d,g),rk=0;tb.forEach(function(r,i){if(r.k===x.k)rk=i+1;});var me=tb[rk-1];
    var ms=M.filter(function(m){return m.div===x.d&&(m.stage==='pre'?(m.h===x.k||m.a===x.k):(side(m,'h').key===x.k||side(m,'a').key===x.k));});
    var sl=groupDone(x.d,g)?teamSlot(x.d,x.k):null,gd=me.gf-me.ga;
    return '<div class="tcard"><div class="tc-h"><b>'+esc(x.n)+'</b><span class="pill '+x.d+'">'+DIV[x.d].name+' '+g+'조</span>'+(sl?'<span class="pill gold">'+(x.d==='ari'?'본선 '+sl.slice(1)+'위조':sl.slice(1)+'위 결정전')+'</span>':'')+'</div>'+
      '<div class="tc-s small">예선 '+dispRank(tb,rk-1)+'위'+(me.tie?' (추첨 대기)':'')+' · 승점 '+me.pts+' · '+me.w+'승 '+me.d+'무 '+me.l+'패 · 득실 '+(gd>0?'+':'')+gd+' · FP '+(me.p?me.fp:0)+'</div>'+
      '<div class="mlist">'+ms.map(function(m){return matchCard(m);}).join('')+'</div></div>';}).join('')+
    (more>0?'<p class="small muted">일치하는 팀이 '+more+'개 더 있어요. 이름을 더 입력해 주세요.</p>':'');}

/* ---------- 관리자: 일괄 초기화 ---------- */
var resetDraft=null;
function resetIds(scope){return Object.keys(STATE.results).filter(function(id){var m=BYID[id];return scope==='all'||(m&&m.div===scope);});}
function openReset(){resetDraft={scope:'all',extra:false,txt:''};drawResetSheet();}
function drawResetSheet(){var d=resetDraft,n=resetIds(d.scope).length,ok=d.txt.trim()==='초기화';
  var h='<div class="sheet-bg" id="sheetbg"><div class="sheet" role="dialog" aria-modal="true" aria-label="결과 일괄 초기화"><h3>결과 일괄 초기화</h3><div class="small muted">고른 범위의 경기가 모두 "예정"으로 돌아가요. 되돌릴 수 없어요.</div>'+
    '<div class="seg" role="group" aria-label="범위">'+[['all','전체'],['ari','아리부'],['tori','토리부']].map(function(o){return '<button type="button" data-rscope="'+o[0]+'" aria-pressed="'+(d.scope===o[0])+'">'+o[1]+'</button>';}).join('')+'</div>'+
    '<div class="sh-note">입력된 경기 <b>'+n+'개</b>(경기 중 포함)가 예정으로 바뀌어요.</div>'+
    '<label class="chk"><input type="checkbox" id="rextra"'+(d.extra?' checked':'')+'> 동률 추첨 순서와 본선 팀 배정(조정)도 함께 초기화</label>'+
    '<label class="small" for="rconfirm" style="display:block;margin-top:12px;font-weight:600">확인을 위해 <b>초기화</b>라고 입력하세요</label><input id="rconfirm" class="search" autocomplete="off" value="'+esc(d.txt)+'">'+
    '<div class="sh-actions"><button type="button" data-act="close">취소</button><button type="button" class="pri dangerbtn" data-act="doreset"'+(ok?'':' disabled')+'>'+(d.scope==='all'?'전체':DIV[d.scope].name)+' 초기화</button></div></div></div>';
  document.getElementById('sheet').innerHTML=h;}

var drawDraft=null;
function tableFor(dk){var p=dk.split(':');return p[0]==='pre'?groupTable(p[1],p[2]):mainTable(p[2]);}
function drawTitle(dk){var p=dk.split(':');return DIV[p[1]].name+' '+(p[0]==='pre'?p[2]+'조 예선':p[2]+'위조 본선');}
function drawLabel(dk,k){var p=dk.split(':');if(p[0]==='pre')return nameOf(p[1],k);var t=slotTeam(p[1],k);return (t?nameOf(p[1],t)+' · ':'')+k[0]+'조 '+k.slice(1)+'위';}
function openDraw(dk){C={};var rows=tableFor(dk),runs={},order=[];
  rows.forEach(function(r,i){if(r.run!=null){if(!runs[r.run]){runs[r.run]={start:i,keys:[]};order.push(r.run);}runs[r.run].keys.push(r.k);}});
  drawDraft={dk:dk,runs:order.map(function(id){return runs[id];})};drawDrawSheet();}
function drawDrawSheet(){var el=document.getElementById('sheet'),d=drawDraft;
  var h='<div class="sheet-bg" id="sheetbg"><div class="sheet" role="dialog" aria-modal="true" aria-label="추첨 순위 지정"><h3>추첨 순위 지정</h3><div class="small muted">'+esc(drawTitle(d.dk))+' · 승점·승자승·페어플레이·골득실이 모두 같은 팀</div>';
  if(!d.runs.length)h+='<div class="sh-note">지금은 추첨이 필요한 동률 팀이 없어요.</div>';
  d.runs.forEach(function(run,ri){h+='<div class="sh-team"><div class="nm">'+(run.start+1)+'–'+(run.start+run.keys.length)+'위 동률</div><ol class="drawlist">'+
    run.keys.map(function(k,i){return '<li><span class="dp num">'+(run.start+i+1)+'위</span><span class="dn">'+esc(drawLabel(d.dk,k))+'</span><button type="button" data-mv="'+ri+':'+i+':-1"'+(i===0?' disabled':'')+' aria-label="한 칸 위로">▲</button><button type="button" data-mv="'+ri+':'+i+':1"'+(i===run.keys.length-1?' disabled':'')+' aria-label="한 칸 아래로">▼</button></li>';}).join('')+'</ol></div>';});
  if(d.runs.length)h+='<div class="sh-note">현장 추첨 결과대로 ▲▼로 순서를 맞춘 뒤 저장하세요. 순위표와 본선 배정에 바로 반영돼요.</div>';
  var has=STATE.draws&&STATE.draws[d.dk];
  h+='<div class="sh-actions">'+(has?'<button type="button" class="del" data-act="cleardraw">지정 취소</button>':'')+'<button type="button" data-act="close">닫기</button>'+(d.runs.length?'<button type="button" class="pri" data-act="savedraw">추첨 결과 저장</button>':'')+'</div></div></div>';
  el.innerHTML=h;}
function noticeSheet(){var el=document.getElementById('sheet');
  el.innerHTML='<div class="sheet-bg" id="sheetbg"><div class="sheet" role="dialog" aria-modal="true" aria-label="공지 편집"><h3>상단 공지</h3><div class="small muted">모든 참가자 화면 맨 위에 표시돼요. 비우고 저장하면 공지가 사라져요.</div><textarea id="noticeta" placeholder="예) 3구장 경기 10분씩 지연되고 있어요">'+esc(STATE.notice||'')+'</textarea><div class="sh-actions"><button type="button" data-act="close">취소</button><button type="button" class="pri" data-act="savenotice">저장</button></div></div></div>';}

/* ---------- 서버 통신 ---------- */
function busy(on){var b=document.getElementById('busy');if(on&&!b){b=document.createElement('div');b.id='busy';b.className='busy';b.textContent='저장 중…';document.body.appendChild(b);}else if(!on&&b)b.remove();}
function api(path,opt){return fetch(path,opt).then(function(r){return r.json().catch(function(){return{};}).then(function(j){if(!r.ok){var e=new Error(j.error||('서버 오류 '+r.status));e.status=r.status;throw e;}return j;});});}
function applyServer(j){if(!j||!j.state)return;VER=j.ver;var s=j.state;STATE={results:s.results||{},notice:s.notice||'',draws:s.draws||{},slots:s.slots||{}};LOADED=true;}
function uiBusy(){var ae=document.activeElement,tag=ae&&ae.tagName;return tag==='TEXTAREA'||tag==='SELECT'||tag==='INPUT'||!!document.getElementById('sheetbg')||!!document.getElementById('busy');}
function refresh(){if(uiBusy()){PENDING=true;return;}PENDING=false;var y=window.scrollY;render();window.scrollTo(0,y);}
function closeSheet(){draft=null;drawDraft=null;slotDraft=null;resetDraft=null;var s=document.getElementById('sheet');if(s)s.innerHTML='';if(PENDING)setTimeout(refresh,0);}
function save(op,okMsg){
  if(!EDITOR||!PW){toast('관리자 로그인이 필요해요.');return;}
  busy(true);
  api('/api/op',{method:'POST',headers:{'Content-Type':'application/json','X-Admin-Password':encodeURIComponent(PW)},body:JSON.stringify(op)}).then(function(j){
    applyServer(j);OFFLINE=false;draft=null;drawDraft=null;slotDraft=null;busy(false);var y=window.scrollY;render();window.scrollTo(0,y);toast(okMsg);
  },function(e){busy(false);
    if(e.status===401||e.status===429){logout(e.message);}
    else toast('저장하지 못했어요. '+e.message+' 다시 시도해 주세요.');});}
function login(pw){
  return api('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})}).then(function(){PW=pw;EDITOR=true;LOGIN_ERR='';ls('aricup-pw',pw);});}
function logout(msg){PW=null;EDITOR=false;LOGIN_ERR=msg||'';ls('aricup-pw',null);closeSheet();render();}

/* ---------- 이벤트 ---------- */
document.addEventListener('click',function(e){var t=e.target.closest('button,[data-mid],#sheetbg');if(!t)return;
  if(t.id==='sheetbg'){if(e.target===t)closeSheet();return;}
  if(t.dataset.tab){ui.tab=t.dataset.tab;render();window.scrollTo(0,0);return;}
  if(t.dataset.seg){ui[t.dataset.seg]=t.dataset.v;if(t.dataset.seg==='div')ui.field=0;
    if(t.dataset.seg==='mydiv'&&MY&&MY.split(':')[0]!==t.dataset.v){MY=null;ls('aricup-my',null);}
    render();return;}
  if(t.dataset.field!=null){ui.field=+t.dataset.field;render();return;}
  if(t.dataset.copy){var v=t.dataset.copy;var p=navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(v):Promise.reject();p.then(function(){toast('복사했어요: '+v);},function(){toast(v);});return;}
  if(t.dataset.slots){openSlots(t.dataset.slots);return;}
  if(t.dataset.reset){openReset();return;}
  if(t.dataset.rscope&&resetDraft){resetDraft.scope=t.dataset.rscope;drawResetSheet();return;}
  if(t.dataset.draw){openDraw(t.dataset.draw);return;}
  if(t.dataset.mv){var q=t.dataset.mv.split(':'),run=drawDraft.runs[+q[0]],i1=+q[1],j1=i1+(+q[2]);var tmp=run.keys[i1];run.keys[i1]=run.keys[j1];run.keys[j1]=tmp;drawDrawSheet();return;}
  if(t.dataset.dst){draft.st=t.dataset.dst;drawSheet();return;}
  if(t.dataset.st){var k=t.dataset.st;draft[k]=Math.max(0,Math.min(k==='ph'||k==='pa'?30:k.length>1?5:30,draft[k]+(+t.dataset.d)));if(draft.h!==draft.a)draft.w='';drawSheet();return;}
  if(t.dataset.act){var a=t.dataset.act;
    if(a==='close'){closeSheet();return;}
    if(a==='logout'){logout('');return;}
    if(a==='doreset'&&resetDraft){if(resetDraft.txt.trim()!=='초기화')return;var sc=resetDraft.scope;
      save({type:'reset',scope:sc,ids:sc==='all'?[]:resetIds(sc),extra:!!resetDraft.extra},(sc==='all'?'전체':DIV[sc].name)+' 경기를 모두 예정으로 되돌렸어요');return;}
    if(a==='saveslots'&&slotDraft){var mp={};Object.keys(slotDraft.map).forEach(function(k){if(k.indexOf(slotDraft.div+':')===0)mp[k]=slotDraft.map[k];});
      save({type:'slots',div:slotDraft.div,map:mp},DIV[slotDraft.div].name+' 본선 팀 배정을 저장했어요');return;}
    if(a==='savedraw'&&drawDraft){var all=[];drawDraft.runs.forEach(function(r){all=all.concat(r.keys);});
      var order=(STATE.draws[drawDraft.dk]||[]).filter(function(k){return all.indexOf(k)<0;}).concat(all);
      save({type:'draw',dk:drawDraft.dk,order:order},drawTitle(drawDraft.dk)+' 추첨 결과를 저장했어요');return;}
    if(a==='cleardraw'&&drawDraft){save({type:'draw',dk:drawDraft.dk,order:null},drawTitle(drawDraft.dk)+' 추첨 지정을 취소했어요');return;}
    if(a==='savenotice'){var txt=(document.getElementById('noticeta').value||'').trim().slice(0,400);document.activeElement&&document.activeElement.blur&&document.activeElement.blur();
      save({type:'notice',text:txt},txt?'공지를 게시했어요':'공지를 내렸어요');return;}
    if(a==='save'&&draft){var m=BYID[draft.id],where=m.t+' '+fieldName(m.f)+' ';
      if(draft.st==='sched'){save({type:'result',id:draft.id,rec:null},where+'경기를 예정으로 되돌렸어요');return;}
      var w=document.querySelector('input[name="w"]:checked');var rec={h:draft.h,a:draft.a,hy:draft.hy,hr:draft.hr,ay:draft.ay,ar:draft.ar};
      if(draft.st==='live'){rec.st='live';save({type:'result',id:draft.id,rec:rec},where+'경기 중으로 표시했어요');return;}
      if(m.stage==='rank'&&draft.h===draft.a&&draft.ph!==draft.pa){rec.ph=draft.ph;rec.pa=draft.pa;rec.w=draft.ph>draft.pa?'h':'a';}
      save({type:'result',id:draft.id,rec:rec},where+'최종 결과를 저장했어요');return;}}
  if(t.dataset.mid&&ui.admin){openSheet(t.dataset.mid);}
});
document.addEventListener('input',function(e){var id=e.target.id;
  if(id==='tq'){ui.q=e.target.value;C={};var box=document.getElementById('tqres');if(box)box.innerHTML=teamSearchHTML();return;}
  if(id==='rconfirm'&&resetDraft){resetDraft.txt=e.target.value;var b=document.querySelector('[data-act="doreset"]');if(b)b.disabled=resetDraft.txt.trim()!=='초기화';}});
document.addEventListener('change',function(e){if(e.target.id==='mysel'){MY=e.target.value||null;ls('aricup-my',MY);render();return;}
  if(e.target.id==='rextra'&&resetDraft){resetDraft.extra=e.target.checked;return;}
  var sk=e.target.dataset&&e.target.dataset.slot;
  if(sk&&slotDraft){var v=e.target.value;if(v)slotDraft.map[sk]=v;else delete slotDraft.map[sk];
    var sh=document.querySelector('.sheet'),y=sh?sh.scrollTop:0;drawSlotSheet();var sh2=document.querySelector('.sheet');if(sh2)sh2.scrollTop=y;}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.getElementById('sheetbg'))closeSheet();});
document.addEventListener('submit',function(e){if(e.target.id!=='loginform')return;e.preventDefault();
  var pw=(document.getElementById('pw').value||'').trim();if(!pw)return;busy(true);
  login(pw).then(function(){busy(false);render();load();},function(err){busy(false);LOGIN_ERR=err.message||'로그인하지 못했어요.';render();var f=document.getElementById('pw');if(f)f.focus();});});
document.addEventListener('focusout',function(){setTimeout(function(){if(PENDING&&!uiBusy())refresh();},50);});

/* ---------- 시작 ---------- */
var lastMin=-1;
function tick(){var n=now();if(n.min!==lastMin){lastMin=n.min;refresh();}}
function load(){
  return api('/api/state',{cache:'no-store'}).then(function(j){var wasOff=OFFLINE;OFFLINE=false;
    if(j.ver!==VER||!LOADED){applyServer(j);refresh();}else if(PENDING||wasOff)refresh();},
    function(){if(!OFFLINE){OFFLINE=true;refresh();}});}
function start(){
  MY=ls('aricup-my')||null;
  try{var s=JSON.parse(ls('aricup-ui')||'null');if(s){ui.tab=s.tab||ui.tab;ui.div=s.div||ui.div;ui.sub=s.sub||ui.sub;ui.mydiv=s.mydiv||null;}}catch(e){}
  if(['place','home','pre','main'].indexOf(ui.tab)<0)ui.tab='home';
  if(['ari','tori'].indexOf(ui.div)<0)ui.div='ari';
  render();lastMin=now().min;
  if(MODE==='admin'){var saved=ls('aricup-pw');if(saved){login(saved).then(function(){render();},function(e){if(e.status===401)logout('비밀번호가 바뀌었어요. 다시 로그인해 주세요.');});}}
  load();
  setInterval(function(){if(!document.hidden)load();},MODE==='admin'?5000:8000);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)load();});
  setInterval(tick,20000);
}
start();
})();

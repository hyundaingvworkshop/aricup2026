// POST /api/op — 관리자 저장 (헤더 X-Admin-Password 필요)
// 한 번에 한 가지만 바꿔서, 운영진 여러 명이 동시에 다른 경기를 입력해도 서로 덮어쓰지 않아요.
//   { type:'result', id:'0940-1', rec:{h,a,hy,hr,ay,ar,st?,w?} | null }
//   { type:'notice', text }
//   { type:'draw', dk:'pre:ari:A', order:['A2','A1'] | null }
//   { type:'slots', div:'ari', map:{'ari:A1':'A2', 'ari:A2':'X'} }
const { P, err, pipeline, readState, send, readBody, checkPassword, headerPassword } = require('./_lib');

const int = (v) => { const n = Math.floor(Number(v)); return Number.isFinite(n) ? Math.max(0, Math.min(99, n)) : 0; };

function commandsFor(op) {
  if (!op || typeof op !== 'object') throw err(400, '잘못된 요청이에요.');
  switch (op.type) {
    case 'result': {
      if (!/^\d{4}-[1-6]$/.test(String(op.id))) throw err(400, '경기 번호가 올바르지 않아요.');
      if (op.rec == null) return [['HDEL', P + 'results', op.id]];
      const r = op.rec, rec = { h: int(r.h), a: int(r.a), hy: int(r.hy), hr: int(r.hr), ay: int(r.ay), ar: int(r.ar) };
      if (r.st === 'live') rec.st = 'live';
      if (r.w === 'h' || r.w === 'a') rec.w = r.w;
      if (r.ph != null && r.pa != null && rec.h === rec.a) { rec.ph = int(r.ph); rec.pa = int(r.pa); if (rec.ph !== rec.pa) rec.w = rec.ph > rec.pa ? 'h' : 'a'; }
      return [['HSET', P + 'results', op.id, JSON.stringify(rec)]];
    }
    case 'notice': {
      const t = String(op.text || '').trim().slice(0, 400);
      return t ? [['SET', P + 'notice', t]] : [['DEL', P + 'notice']];
    }
    case 'draw': {
      if (!/^(pre:(ari|tori):[A-D]|main:ari:[1-5])$/.test(String(op.dk))) throw err(400, '순위표 구분이 올바르지 않아요.');
      if (op.order == null) return [['HDEL', P + 'draws', op.dk]];
      if (!Array.isArray(op.order) || op.order.length > 12 || !op.order.every((k) => /^[A-D][1-6]$/.test(k))) throw err(400, '추첨 순서가 올바르지 않아요.');
      return [['HSET', P + 'draws', op.dk, JSON.stringify(op.order)]];
    }
    case 'slots': {
      if (op.div !== 'ari' && op.div !== 'tori') throw err(400, '부 구분이 올바르지 않아요.');
      const map = {};
      for (const [k, v] of Object.entries(op.map || {})) {
        if (!new RegExp('^' + op.div + ':[A-D][1-6]$').test(k) || !/^([A-D][1-6]|X)$/.test(String(v))) throw err(400, '본선 배정 값이 올바르지 않아요.');
        map[k] = v;
      }
      return Object.keys(map).length ? [['HSET', P + 'slots', op.div, JSON.stringify(map)]] : [['HDEL', P + 'slots', op.div]];
    }
    case 'reset': {
      // 경기 결과를 모두 '예정'으로 (scope: all | ari | tori). extra=true면 추첨 순서·본선 배정도 초기화
      const scope = op.scope;
      if (scope !== 'all' && scope !== 'ari' && scope !== 'tori') throw err(400, '초기화 범위가 올바르지 않아요.');
      const cmds = [];
      if (scope === 'all') {
        cmds.push(['DEL', P + 'results']);
        if (op.extra) cmds.push(['DEL', P + 'draws'], ['DEL', P + 'slots']);
      } else {
        const ids = Array.isArray(op.ids) ? op.ids : [];
        if (ids.length > 200 || !ids.every((id) => /^\d{4}-[1-6]$/.test(String(id)))) throw err(400, '경기 번호가 올바르지 않아요.');
        if (ids.length) cmds.push(['HDEL', P + 'results'].concat(ids));
        if (op.extra) {
          const dks = scope === 'ari'
            ? ['pre:ari:A', 'pre:ari:B', 'pre:ari:C', 'pre:ari:D', 'main:ari:1', 'main:ari:2', 'main:ari:3', 'main:ari:4', 'main:ari:5']
            : ['pre:tori:A', 'pre:tori:B'];
          cmds.push(['HDEL', P + 'draws'].concat(dks), ['HDEL', P + 'slots', scope]);
        }
      }
      return cmds;
    }
    default: throw err(400, '알 수 없는 요청이에요.');
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { error: 'POST만 지원해요.' });
  try {
    await checkPassword(req, headerPassword(req));
    const op = await readBody(req);
    const cmds = commandsFor(op);
    await pipeline(cmds.concat([['INCR', P + 'ver']]));
    send(res, 200, await readState());
  } catch (e) {
    send(res, e.status || 500, { error: e.message || '오류' });
  }
};

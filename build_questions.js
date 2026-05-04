// 21개 draft 파일을 questions.json 하나로 병합.
// 사용: node build_questions.js
// 출력: questions.json (전체 555문항)

const fs = require("fs");
const path = require("path");

const FILES = [
  // 1과목 (Q1~100, 100문항)
  "draft_normalization_part1.js",
  "draft_normalization_part2.js",
  "draft_1a_part1.js",
  "draft_1bcd_part2.js",
  "draft_1ek_part3.js",
  "draft_1ghij_part4.js",
  // 2-A 관계형 DB (Q601~610, 10문항)
  "draft_2a_part1.js",
  // 2-B SELECT (Q611~640, 30문항)
  "draft_2b_part1.js",
  "draft_2b_part2.js",
  // 2-C 함수 (Q101~135, 35문항)
  "draft_2c_part1.js",
  "draft_2c_part2.js",
  "draft_2c_part3.js",
  // 2-D WHERE 응용 (Q641~650, 10문항)
  "draft_2d_part1.js",
  // 2-E GROUP BY/HAVING (Q651~675, 25문항)
  "draft_2e_part1.js",
  // 2-F 조인 (Q201~255, 55문항)
  "draft_2f_part1.js",
  "draft_2f_part2.js",
  "draft_2f_part3.js",
  "draft_2f_part4.js",
  // 2-G 서브쿼리 (Q301~340, 40문항)
  "draft_2g_part1.js",
  "draft_2g_part2.js",
  "draft_2g_part3.js",
  // 2-H 집합 연산자 (Q341~360, 20문항)
  "draft_2h_part1.js",
  // 2-I 그룹함수 (Q401~430, 30문항)
  "draft_2i_part1.js",
  // 2-J 윈도우함수 (Q431~470, 40문항)
  "draft_2j_part1.js",
  "draft_2j_part2.js",
  // 2-K Top N (Q471~485, 15문항)
  "draft_2k_part1.js",
  // 2-L 계층형 (Q501~525, 25문항)
  "draft_2l_part1.js",
  "draft_2l_part2.js",
  // 2-M PIVOT/UNPIVOT (Q526~540, 15문항)
  "draft_2m_part1.js",
  // 2-N 정규식 (Q541~550, 10문항)
  "draft_2n_part1.js",
  // 2-O DML (Q701~715, 15문항)
  "draft_2o_part1.js",
  // 2-P TCL (Q716~735, 20문항)
  "draft_2p_part1.js",
  // 2-Q DDL (Q736~760, 25문항)
  "draft_2q_part1.js",
  // 2-R FK + 2-Q-2 뷰 (Q761~780, 20문항)
  "draft_2rq2_part1.js",
  // 2-S DCL (Q781~795, 15문항)
  "draft_2s_part1.js"
];

const all = [];
const fileStats = [];

for (const f of FILES) {
  const fp = path.join(__dirname, f);
  delete require.cache[require.resolve(fp)];
  const data = require(fp);
  if (!Array.isArray(data)) {
    console.error(`ERROR: ${f}는 배열이 아님`);
    process.exit(1);
  }
  fileStats.push({ file: f, count: data.length, idMin: data[0].id, idMax: data[data.length - 1].id });
  all.push(...data);
}

// ID 정렬
all.sort((a, b) => a.id - b.id);

// 검증
const ids = all.map(q => q.id);
const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dups.length) {
  console.error(`ERROR: ID 중복: ${[...new Set(dups)].join(", ")}`);
  process.exit(1);
}

// 영역별/과목별 통계
const subjStats = { 1: 0, 2: 0 };
const topicStats = {};
const ansDist = { 1: 0, 2: 0, 3: 0, 4: 0 };
let codeCount = 0;
const validationIssues = [];

for (const q of all) {
  subjStats[q.subj]++;
  topicStats[q.topic] = (topicStats[q.topic] || 0) + 1;
  ansDist[q.ans]++;
  if (q.has_code) codeCount++;

  // 필수 필드 검증
  if (!q.exp || !q.exp.reason || !q.exp.terms || !q.exp.wrong || !q.exp.tip) {
    validationIssues.push(`Q${q.id} 4단 해설 누락`);
  }
  if (!q.src) validationIssues.push(`Q${q.id} src 누락`);
  if (!q.choices || q.choices.length !== 4) validationIssues.push(`Q${q.id} choices 4개 아님`);
  if (q.has_code && !q.blocks) validationIssues.push(`Q${q.id} has_code true인데 blocks 없음`);
  if (!q.has_code && q.blocks !== null) validationIssues.push(`Q${q.id} has_code false인데 blocks 있음`);
  if (q.exp && q.exp.wrong) {
    if (q.exp.wrong.length !== 4) validationIssues.push(`Q${q.id} wrong 4개 아님`);
    const ansItem = q.exp.wrong.find(s => s.includes("(정답)"));
    if (!ansItem) validationIssues.push(`Q${q.id} (정답) 마커 없음`);
    else {
      const m = ansItem.match(/^(\d+)/);
      if (m && parseInt(m[1]) !== q.ans) validationIssues.push(`Q${q.id} (정답) 마커 위치 ${m[1]} != ans ${q.ans}`);
    }
  }
  if (JSON.stringify(q).includes("·")) validationIssues.push(`Q${q.id} 가운뎃점 있음`);
}

// 출력
const outPath = path.join(__dirname, "questions.json");
fs.writeFileSync(outPath, JSON.stringify(all, null, 2), "utf8");

console.log("=== 빌드 완료 ===");
console.log(`총 문항: ${all.length}`);
console.log(`출력 파일: ${outPath}`);
console.log(`파일 크기: ${(fs.statSync(outPath).size / 1024).toFixed(1)} KB`);
console.log("");
console.log("과목별:");
console.log(`  1과목: ${subjStats[1]}`);
console.log(`  2과목: ${subjStats[2]}`);
console.log("");
console.log("영역별:");
const sortedTopics = Object.keys(topicStats).sort();
for (const t of sortedTopics) {
  console.log(`  ${t}: ${topicStats[t]}`);
}
console.log("");
console.log(`정답 분포: 1=${ansDist[1]}, 2=${ansDist[2]}, 3=${ansDist[3]}, 4=${ansDist[4]}`);
console.log(`코드 포함: ${codeCount}/${all.length}`);
console.log("");

if (validationIssues.length) {
  console.log(`=== 검증 이슈 ${validationIssues.length}건 ===`);
  for (const v of validationIssues.slice(0, 20)) console.log(`  ${v}`);
  if (validationIssues.length > 20) console.log(`  ... 외 ${validationIssues.length - 20}건`);
  process.exit(1);
} else {
  console.log("✓ 검증 통과 (이슈 0건)");
}

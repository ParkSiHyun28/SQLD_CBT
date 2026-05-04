# SQLD CBT 사이트 빌드 가이드

> 작성일: 2026-05-03
> 용도: 사이트 빌드 시 참고용. 빅분기CBT 기능 + 추가 기능 + blocks 렌더링 통합 가이드.
> 참고 원본: `/Users/parksihyun/Claude_Code/빅분기CBT/index.html` (882줄, 단일 HTML)

---

## 1. 사이트 기본 구조

### 1.1 파일 구성
```
/Users/parksihyun/Claude_Code/SQLDCBT/
├── index.html       # 사이트 본체 (단일 파일, 빅분기CBT 포팅)
└── questions.js     # 500문항 데이터 배열
```

### 1.2 화면 4종 (빅분기CBT 그대로)
- **home**: 시작 화면
- **quiz**: 문제 풀이
- **result**: 결과 화면
- **review**: 오답 풀이

### 1.3 시험 규격 (빅분기CBT와 다름)
| 항목 | 빅분기 | SQLD |
|------|--------|------|
| 총 문항 | 80 | **50** |
| 시간 | 120분 (7200초) | **90분 (5400초)** |
| 과목 수 | 4 | 2 |
| 1과목 | 20문항 | **10문항** |
| 2과목 | 20문항 | **40문항** |
| 합격 기준 | 총 60% + 과목 40% | 동일 |

---

## 2. 데이터 스키마 v2 (확정)

```javascript
{
  id: 1,                     // 전역 ID (1~500)
  subj: 1,                   // 1 또는 2
  topic: "1-F",              // 토픽 영역 코드
  topic_name: "정규화",       // 영역 이름
  diff: "중",                // 하/중/상 (출제 시 분배용, 사용자 화면에 표시 안 함)
  has_code: true,            // UI 분기용
  
  q: "본문 텍스트",
  
  blocks: [                  // null 가능 (개념 문제)
    { type: "table", title: "[EMP]", headers: [...], rows: [[...]] },
    { type: "code",  title: null,    lang: "sql", content: "SELECT ..." },
    { type: "table", title: "[결과]", headers: [...], rows: [[...]] }
  ],
  
  choices: ["1번", "2번", "3번", "4번"],
  ans: 2,
  src: "자료3 p.13",          // 자료 출처
  exp: {                     // 4단 해설
    reason: "정답 + 한 줄 근거",
    terms: ["**용어**: 설명"],
    wrong: ["1. ...", "3. ...", "4. ..."],
    tip: "한 줄 암기 팁"
  }
}
```

**주의**:
- `diff` 필드는 데이터에 있되 **사용자 화면에 표시하지 않음** (사용자 결정 사항)
- `null` 값은 표 데이터에 그대로 사용. 사이트가 "NULL"로 렌더링.

---

## 3. 빅분기CBT 기존 기능 (그대로 유지)

### 3.1 HOME 화면
- 시험 정보 뱃지 표시 ("총 50문항", "1과목 10/2과목 40", "합격 평균 60점", "과목 40점 이상")
- 모의고사 시작 버튼 ("⚡ 시험 시작")
- **과목 선택 버튼은 SQLD에서는 단순화 권장**: 기본 "전 과목" 모드만 (모의고사는 1과목 10 + 2과목 40 고정)

### 3.2 QUIZ 화면
- 상단바: 과목 라벨 / 문제 카운터 / 타이머 / **+ 실시간 정답률 (추가)**
- 진행 바 (그라데이션)
- 문제 카드: 번호 + 본문 + **blocks 렌더링 (추가)** + 보기 4개
- 즉시 피드백: 정답 선택 즉시 정답/오답 + **4단 해설 표시 (변경)**
- 네비게이션: 이전 / 홈으로 / 다음

### 3.3 RESULT 화면
- 총 점수 (원형 디자인)
- 과목별 점수 (1과목 / 2과목 각각)
- 합격/불합격 판정
- 액션: 오답&해설 보기 / 다시 풀기

### 3.4 REVIEW 화면
- 전체 풀이 + 4단 해설 표시 (변경)
- 정답: 초록 좌측 보더 / 오답: 빨강 좌측 보더

### 3.5 공통 기능
- 다크/라이트 테마 (localStorage 저장)
- 키보드 단축키: 1~4 (보기 선택), ←→ (이전/다음)
- 반응형 (500px 이하 1열)
- 네온 그라데이션 디자인

### 3.6 데이터 처리
- **buildExam**: 1과목 풀에서 10문항 + 2과목 풀에서 40문항 무작위 추출
- **보기 셔플**: 각 문항의 4개 보기 순서를 매 시험마다 무작위 (정답 위치도 자동 추적)
- **타이머**: 5400초부터 카운트다운, 0이 되면 자동 종료
- **채점**: 과목별 정답 수 → 백분율 → 합격 판정

---

## 4. 신규 기능 — 데이터 스키마 변화로 필수 (확정)

### 4.1 blocks 배열 렌더링 (필수)

`blocks` 배열을 순서대로 렌더링. 타입은 `table` 또는 `code`.

**렌더링 함수 의사코드**:
```javascript
function renderBlocks(blocks, wrap) {
  if (!blocks || blocks.length === 0) return;
  blocks.forEach(b => {
    if (b.type === 'table') renderTable(b, wrap);
    else if (b.type === 'code') renderCode(b, wrap);
  });
}

function renderTable(b, wrap) {
  // b.title, b.headers, b.rows
  // null 값은 "NULL"로 표시 (회색/이탤릭 스타일 권장)
  // 구현: <table class="data-table"> 생성
}

function renderCode(b, wrap) {
  // b.title (있으면 캡션), b.lang ("sql"), b.content
  // <pre class="code-block"><code class="lang-sql">...</code></pre>
  // SQL 키워드 색상 강조 (정규식 기반 단순 처리)
  // (ㄱ), (ㄴ) 같은 빈칸 표시는 노란 배경으로 강조
}
```

**CSS 스타일 권장**:
```css
.data-table {
  border-collapse: collapse;
  margin: 1rem 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}
.data-table th { background: var(--card); padding: .6rem 1rem; }
.data-table td { padding: .5rem 1rem; border-top: 1px solid var(--border); }
.data-table .null-val { color: var(--sub); font-style: italic; }

.code-block {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  font-family: 'SF Mono', Monaco, monospace;
  font-size: .9rem;
  overflow-x: auto;
}
.code-block .sql-keyword { color: var(--accent-text); font-weight: 600; }
.code-block .sql-blank { background: rgba(255, 220, 100, .2); padding: 0 .3rem; border-radius: 3px; }
```

### 4.2 4단 해설 표시 (필수)

기존 빅분기CBT는 `exp` 필드를 단일 텍스트로 처리(`exp` → 그대로 출력). SQLD는 객체 구조라 4단 분리 표시.

**렌더링 의사코드**:
```javascript
function renderExp(exp) {
  return `
    <div class="exp-section exp-reason">
      <div class="exp-label">📌 정답 근거</div>
      <div>${exp.reason}</div>
    </div>
    <div class="exp-section exp-terms">
      <div class="exp-label">📚 용어</div>
      <ul>${exp.terms.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>
    <div class="exp-section exp-wrong">
      <div class="exp-label">❌ 오답 분석</div>
      <ul>${exp.wrong.map(w => `<li>${w}</li>`).join('')}</ul>
    </div>
    <div class="exp-section exp-tip">
      <div class="exp-label">💡 암기 팁</div>
      <div>${exp.tip}</div>
    </div>
    <div class="exp-source">출처: ${q.src}</div>
  `;
}
```

각 단계는 **접기/펴기 가능**하게 구현하면 학습 효율 ↑ (선택).

### 4.3 자료 출처 표시 (필수)

해설 박스 하단에 `q.src` 표시 ("출처: 자료3 p.13" 형태). 작은 회색 글씨.

### 4.4 토픽 영역 라벨 (선택)

문제 카드 상단에 `q.topic_name` 표시 ("정규화", "조인" 등 작은 배지). 사용자가 어느 영역인지 알 수 있어 학습 효과 ↑.

### 4.5 SQL 키워드 강조 (필수)

`code` 블록의 SQL을 정규식으로 키워드만 색상 처리.

**대상 키워드**:
```
SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, JOIN, INNER, OUTER, LEFT, RIGHT, FULL, CROSS, NATURAL, ON, USING, UNION, INTERSECT, EXCEPT, MINUS, AS, AND, OR, NOT, IN, BETWEEN, LIKE, IS, NULL, EXISTS, ANY, ALL, CASE, WHEN, THEN, ELSE, END, INSERT, UPDATE, DELETE, MERGE, INTO, VALUES, SET, COMMIT, ROLLBACK, SAVEPOINT, CREATE, ALTER, DROP, TABLE, INDEX, VIEW, SEQUENCE, GRANT, REVOKE, DISTINCT, COUNT, SUM, AVG, MIN, MAX, NVL, NVL2, COALESCE, NULLIF, DECODE, ROWNUM, OVER, PARTITION, ROWS, RANGE, CONNECT, START, PRIOR, BY, ASC, DESC, WITH, RECURSIVE, PIVOT, UNPIVOT, FOR
```

### 4.6 빈칸 표시 강조 (필수)

코드 안에 `(ㄱ)`, `(ㄴ)`, `(  )` 같은 빈칸 패턴은 노란 배경으로 강조. 정규식 `/\([ㄱ-ㅎ\s]*\)/g` 또는 직접 토큰 매칭.

---

## 5. 사용자 결정 추가 기능 (확정 사항만 구현)

다음은 사용자가 추가하기로 결정한 기능. 빅분기CBT에 없는 것들.

### 5.1 북마크 / 체크 기능 ✅ 추가 (강력 추천)

**용도**: 어려운 문제를 표시해 두고 나중에 다시 풀기.

**구현**:
- 문제 카드 우상단에 별표 토글 버튼 (⭐ / ☆)
- 클릭 시 localStorage에 북마크 ID 저장 (`sqld_bookmarks`)
- 결과/리뷰 화면에 "북마크한 문제만 보기" 필터 옵션
- 홈 화면에 "북마크 문제만 풀기" 모드 추가 (선택)

**localStorage 키**:
```javascript
localStorage.getItem('sqld_bookmarks')  // [12, 45, 178, ...]
```

### 5.2 안 푼 문제 알림 ✅ 추가 (강력 추천)

**용도**: 시험 종료 전 답을 고르지 않은 문제가 있으면 경고.

**구현**:
- "다음 문제" 버튼이 마지막 문제일 때 또는 "결과 보기" 시
- `answered` 배열 순회해서 `selected === -1` 또는 `null` 카운트
- `confirm("안 푼 문제가 N개 있습니다. 시험을 종료하시겠습니까?")` 다이얼로그
- 시간 만료 시에는 알림 없이 자동 종료

### 5.3 실시간 정답률 ✅ 추가 (추천)

**용도**: 풀이 중 동기 부여, 진척 확인.

**구현**:
- 상단바에 "정답률: 65%" 추가 표시
- 매 답안 선택 후 `answered` 배열 순회해서 계산:
  ```javascript
  const answered_count = answered.filter(a => a !== null).length;
  const correct_count = answered.filter(a => a?.correct).length;
  const rate = answered_count > 0 ? Math.round(correct_count / answered_count * 100) : 0;
  ```

### 5.4 답안지 격자 (50문제 한눈에) ✅ 추가 (추천)

**용도**: 푼 문제와 안 푼 문제 한눈에 보기. 진척도 시각화.

**구현**:
- 시험 화면 또는 별도 "답안지" 토글로 표시
- 50칸 격자 (5×10 또는 10×5)
- 각 칸 색상:
  - 회색: 미응답
  - 파란색 (⚪): 응답함 (정답 여부는 안 보여줌, 시험 중이라)
  - 클릭 시 해당 문제로 이동 (선택)
- 결과 화면에서는 정답/오답 색상 구분:
  - 초록 ○: 정답
  - 빨강 ×: 오답
  - 회색 ?: 미응답

**HTML 구조**:
```html
<div class="answer-grid">
  <button class="grid-cell answered" data-idx="0">1</button>
  <button class="grid-cell" data-idx="1">2</button>
  ...
</div>
```

### 5.5 글자 크기 조절 ✅ 추가 (편의성)

**용도**: 사용자별 가독성 조정.

**구현**:
- 우측 상단 (테마 토글 옆)에 A- A A+ 버튼 3개
- 클릭 시 `document.documentElement.style.fontSize` 변경 (작게: 14px, 보통: 16px, 크게: 18px)
- localStorage에 저장 (`sqld_font_size`)

---

## 6. 사용자 결정 — 빼는 기능

다음 기능은 사용자가 빼기로 결정. **구현 금지**.

| 기능 | 이유 |
|------|------|
| 토픽별 정답률 | 사용자 결정 |
| 난이도별 정답률 | 사용자 결정 |
| 화면에 난이도 표시 | 사용자 결정 (`diff`는 데이터에만 존재) |
| 약점 추천 | 사용자 결정 |
| 문제 번호 점프 (별도 기능) | 사용자 결정 (답안지 격자 클릭 이동은 선택) |
| 문제별 풀이 시간 | 사용자 결정 (전체 타이머만) |
| C-4 학습 진척도 (이력 저장 등) | 사용자 결정 |
| C-5 검색/필터 | 사용자 결정 |
| C-6 다운로드/공유/효과음/자동테마 | 사용자 결정 |

---

## 7. 시험 빌드 시 정답 위치 균등 보장 (필수 구현)

### 7.1 핵심 요구사항 (사용자 강조)

**문제은행(500개) 풀 안의 정답 분포는 무관**. 사용자가 실제로 푸는 **50문항 모의고사 안에서 정답 1/2/3/4번 비율이 균등하게** 분포되어야 함.

데이터 단계 균등화는 옵션 A (생략)로 결정. 따라서 **이 알고리즘은 필수 구현**.

### 7.2 buildExam 동작 (수정 후)

```
1. 1과목 풀에서 10문항 무작위 추출 + 2과목 풀에서 40문항 무작위 추출
2. 각 문항의 보기 4개 셔플 (정답 위치도 자동 추적)
3. ★ 정답 위치 균등 보정 (이 단계 추가) ★
4. 문제 순서 셔플
5. 시험 시작
```

### 7.3 정답 균등 보정 알고리즘 (필수)

**목표**: 50문항 모의고사에서 정답이 1/2/3/4번에 각 11~14개로 분포되도록 보정.

```javascript
function balanceAnswerDistribution(questions) {
  const MIN_PER_POS = 11;  // 최소 11개 (50/4 = 12.5)
  const MAX_PER_POS = 14;  // 최대 14개
  
  let safety = 0;
  while (safety < 30) {
    // 현재 분포 계산 (ans는 1-based, 인덱스는 0-based)
    const dist = [0, 0, 0, 0];
    questions.forEach(q => dist[q.ans - 1]++);
    
    const max = Math.max(...dist);
    const min = Math.min(...dist);
    
    // 모든 위치가 11~14 범위에 들면 종료
    if (max <= MAX_PER_POS && min >= MIN_PER_POS) break;
    
    // 가장 많은 위치(fromIdx)에서 가장 적은 위치(toIdx)로 한 문항 이동
    const fromIdx = dist.indexOf(max);
    const toIdx = dist.indexOf(min);
    
    // fromIdx에 정답이 있는 문항 중 하나 선택
    const target = questions.find(q => q.ans - 1 === fromIdx);
    if (!target) break;  // 안전 종료
    
    // 보기 배열에서 정답을 toIdx 위치로 이동
    // 다른 보기들은 상대 순서 유지
    const ansChoice = target.choices[fromIdx];
    const others = target.choices.filter((_, i) => i !== fromIdx);
    target.choices = [
      ...others.slice(0, toIdx),
      ansChoice,
      ...others.slice(toIdx)
    ];
    target.ans = toIdx + 1;  // 1-based로 갱신
    
    safety++;
  }
  
  // exp.wrong 배열의 (정답) 표시 위치도 갱신 필요
  questions.forEach(q => {
    if (!q.exp || !q.exp.wrong) return;
    const newWrong = ['', '', '', ''];
    // 기존 wrong 배열에서 (정답) 표시 항목과 다른 항목 분리
    const correctText = `${q.ans}. (정답)`;
    // 단순 처리: 정답 위치에 (정답), 나머지 위치에 기존 텍스트 (필요시 사이트에서 동적 생성)
    // 또는 wrong 배열 자체는 그대로 두고, 렌더링 시 q.ans와 매칭해서 정답 위치 강조
  });
}

function buildExam(subjects) {
  // 1과목 10 + 2과목 40 무작위 추출
  let selected = [];
  const POOL_1 = QUESTION_BANK.filter(q => q.subj === 1);
  const POOL_2 = QUESTION_BANK.filter(q => q.subj === 2);
  selected = [...shuffle(POOL_1).slice(0, 10), ...shuffle(POOL_2).slice(0, 40)];
  
  // 보기 셔플 (정답 위치 무작위)
  selected = selected.map(q => {
    const indexed = q.choices.map((c, i) => ({c, isAns: i === q.ans - 1}));
    const shuffled = shuffle([...indexed]);
    return {
      ...q,
      choices: shuffled.map(x => x.c),
      ans: shuffled.findIndex(x => x.isAns) + 1
    };
  });
  
  // ★ 정답 균등 보정 ★
  balanceAnswerDistribution(selected);
  
  // 문제 순서 셔플
  return shuffle(selected);
}
```

### 7.4 알고리즘 동작 예시

**입력**: 50문항 추출 + 셔플 후 정답 분포가 1번:17 / 2번:9 / 3번:14 / 4번:10 (불균형)

**보정 과정**:
1. max=17(1번), min=9(2번) → 1번 정답 1개를 2번으로 이동 → 1번:16, 2번:10
2. max=16(1번), min=10(2번) → 1번 → 2번 이동 → 1번:15, 2번:11
3. max=15(1번), min=11(2번) → 1번 → 2번 이동 → 1번:14, 2번:12
4. max=14(1번), min=10(4번) → 1번 → 4번 이동 → 1번:13, 4번:11
5. 모든 위치 11~14 범위 → 종료

**최종 결과**: 13/12/14/11 균등.

### 7.5 wrong 해설 텍스트 처리 주의

`exp.wrong` 배열에 "1. (정답)", "2. ...", "3. ..." 형태로 정답 위치가 박혀 있는데, 보기 위치가 바뀌면 이것도 갱신해야 함.

**구현 방법 두 가지**:

**방법 A — 데이터에 매핑 정보 추가**:
```javascript
// 데이터 작성 시 wrong을 객체로 변경
exp: {
  wrong: {
    correct: "(정답) 매칭 3건",
    others: [
      "LEFT OUTER 결과(CHOI까지 포함)",
      "FULL OUTER 결과",
      "CROSS JOIN 결과"
    ]
  }
}
// 렌더링 시 보기 셔플 결과에 맞게 동적 배치
```

**방법 B (권장) — 렌더링 시 동적 생성**:
```javascript
// 데이터의 wrong 배열은 원본 정답 위치 기준으로 작성된 것을 그대로 두고,
// 렌더링 시 현재 ans 위치에 "(정답)" 표시, 나머지 위치는 wrong 배열 내용을 순서대로 매칭
function renderWrong(q) {
  const lines = [];
  for (let i = 0; i < 4; i++) {
    if (i === q.ans - 1) {
      lines.push(`${i+1}. (정답)`);
    } else {
      // wrong 배열에서 해당 위치 텍스트 매칭
      // 이 부분은 데이터 형식을 어떻게 할지에 따라 다름
    }
  }
}
```

**가장 단순한 해결**: `exp.wrong`을 4개 항목 객체로 변경:
```javascript
exp: {
  reason: "...",
  terms: [...],
  wrong_by_pos: {
    1: "원래 1번 보기가 정답인 경우의 설명",  
    // ↑ 데이터 작성 시 정답 위치 기준 텍스트
    // 실제로는 보기 텍스트와 그 텍스트의 오답 이유를 매핑해두는 게 나음
  }
}
```

**또는 가장 실용적인 방법 C** — wrong 텍스트를 보기 텍스트 자체와 매핑:
```javascript
// 데이터 작성 시
choices: ["A 텍스트", "B 텍스트", "C 텍스트", "D 텍스트"],  // 원본 순서
ans: 2,
wrong_map: {
  "A 텍스트": "A가 틀린 이유",
  "C 텍스트": "C가 틀린 이유",
  "D 텍스트": "D가 틀린 이유"
}
// 렌더링 시 보기 텍스트로 wrong_map 조회
```

**현재 양산된 데이터는 `wrong: ["1. ...", "2. ..."]` 배열 형태**라 알고리즘 변경에 따라 사이트 코드가 보기 위치 변경에 맞춰 wrong 텍스트도 재정렬해야 함. 사이트 빌드 시 이 부분 신중히 처리.

### 7.6 실용적 권장 사항

가장 안전한 구현은 **데이터 단계에서 wrong을 보기 텍스트와 매핑된 객체로 변환**한 후 모든 작업이 보기 위치 무관하게 동작하도록 만드는 것. 사이트 빌드 단계에서 다음 변환을 일괄 적용:

```javascript
// questions.js 로드 직후
QUESTION_BANK.forEach(q => {
  if (q.exp?.wrong && Array.isArray(q.exp.wrong)) {
    const wrongMap = {};
    q.exp.wrong.forEach((line, i) => {
      // "1. ..." 형태에서 번호 제거하고 텍스트만
      const text = line.replace(/^\d+\.\s*/, '');
      wrongMap[q.choices[i]] = text;  // 보기 텍스트를 키로
    });
    q.exp.wrong_map = wrongMap;
    delete q.exp.wrong;
  }
});
```

이렇게 하면 보기를 어떻게 셔플해도 wrong 매핑이 보기 텍스트로 추적되어 항상 올바른 자리에 표시됨.

---

## 8. 구현 우선순위

사이트 빌드 시 권장 순서:

1. **빅분기CBT 코드 복사 → SQLD로 포팅** (50문항/90분/2과목)
2. **데이터 스키마 v2 적용** (blocks 렌더링)
3. **4단 해설 표시 변경**
4. **자료 출처 표시 추가**
5. **SQL 키워드 강조**
6. **빈칸 (ㄱ)(ㄴ) 강조**
7. **북마크 기능**
8. **안 푼 문제 알림**
9. **실시간 정답률**
10. **답안지 격자**
11. **글자 크기 조절**
12. **buildExam 정답 위치 균등 안전장치**

각 단계 완료 후 시범 문제 v3로 시각 확인.

---

## 9. 참고 파일 목록

| 파일 | 용도 |
|------|------|
| `/Users/parksihyun/Claude_Code/빅분기CBT/index.html` | 사이트 본체 원본 (882줄) |
| `/Users/parksihyun/Claude_Code/빅분기CBT/questions.js` | 빅분기 데이터 형식 참고 |
| `/Users/parksihyun/Claude_Code/SQLDCBT/SAMPLE_QUESTIONS.md` | 시범 문제 v3 (출제 톤, 4단 해설 형식) |
| `/Users/parksihyun/Claude_Code/SQLDCBT/FINAL_PLAN.md` | 데이터 스키마 v2 |
| `/Users/parksihyun/Claude_Code/SQLDCBT/TOPIC_MATRIX.md` | 169개 토픽 + 500문항 배분 |
| `/Users/parksihyun/Claude_Code/SQLDCBT/TRAPS.md` | 18개 함정 (해설 보강용 참고) |
| `/Users/parksihyun/Claude_Code/SQLDCBT/draft_*.js` | 양산된 문항 (questions.js 통합 대상) |

---

## 10. 사이트 빌드 시 체크리스트

- [ ] 빅분기CBT index.html 복사
- [ ] 시험 규격 변경 (50문항/5400초/2과목)
- [ ] questions.js 포함 (500문항)
- [ ] blocks 렌더링 함수 (renderTable, renderCode)
- [ ] 4단 해설 렌더링 함수 (renderExp)
- [ ] SQL 키워드 강조 (정규식)
- [ ] 빈칸 (ㄱ)(ㄴ) 노란 강조
- [ ] 자료 출처 표시 (q.src)
- [ ] 토픽 영역 라벨 표시 (q.topic_name)
- [ ] 북마크 토글 버튼 + localStorage
- [ ] 안 푼 문제 알림 (confirm)
- [ ] 실시간 정답률 표시
- [ ] 답안지 격자 (50칸)
- [ ] 글자 크기 조절 (3단계)
- [ ] buildExam 정답 위치 균등 안전장치
- [ ] **난이도 표시 절대 금지** (사용자 결정)
- [ ] **토픽별/난이도별 통계 절대 금지** (사용자 결정)
- [ ] **약점 추천 절대 금지** (사용자 결정)
- [ ] **문제별 시간 측정 절대 금지** (사용자 결정)
- [ ] 시범 문제 v3로 모든 화면 수동 검증
- [ ] 다크/라이트 테마 양쪽 검증
- [ ] 모바일 반응형 검증

---

## 11. 자주 헷갈릴 부분

1. **`null` 처리**: 데이터의 `null`은 표에서 "NULL"로 표시. JS에서 `null` 그대로 두고 렌더링 시 `cell === null ? 'NULL' : cell` 처리.

2. **보기 셔플과 ans 갱신**: 보기를 셔플할 때 정답 인덱스도 같이 갱신해야 함. 빅분기CBT의 `buildExam`에 이미 처리되어 있음 (656~660줄).

3. **이전 문제로 돌아갈 때**: 이전에 답을 골랐으면 그 답과 피드백이 그대로 다시 보여야 함. `answered` 배열의 `prev.selected` 값으로 처리.

4. **시간 만료 vs 사용자 종료**: 시간 만료는 자동 종료(알림 없음), 사용자가 결과 보기 누르면 안 푼 문제 알림.

5. **localStorage 키 네임스페이스**: `theme`, `sqld_bookmarks`, `sqld_font_size` 등 빅분기와 충돌 방지를 위해 `sqld_` 프리픽스 권장.

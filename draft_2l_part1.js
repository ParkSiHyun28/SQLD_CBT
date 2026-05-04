// 2-L Part1: Q501~Q514 (계층형 질의와 셀프 조인 — Part1)
// 토픽 132 (Q501~505): 계층형 질의 개념 Oracle
// 토픽 133 (Q506~510): PRIOR 위치와 방향
// 토픽 134 Part1 (Q511~514): 계층형 가상 칼럼/함수 일부
//
// 자료3 p.77~80, 자료1 p.33 기반.
// PostgreSQL 14 WITH RECURSIVE로 CONNECT BY 결과 등가 검증 완료.
// DB: sqld_verify / 테이블: emp_hier(EMPNO, ENAME, MGR)
//
// EMP_HIER 데이터:
//   (1, KING,   NULL)  -- 루트
//   (2, JONES,  1)
//   (3, SCOTT,  2)
//   (4, ADAMS,  3)
//   (5, BLAKE,  1)
//   (6, MARTIN, 5)

const l2Part1 = [
  // ============================================================
  // 토픽 132: 계층형 질의 개념 Oracle (Q501~Q505) — 5문항
  // ============================================================
  {
    id: 501,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: false,
    q: "다음 중 Oracle의 계층형 질의(Hierarchical Query)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "계층형 질의는 테이블에 계층 구조(부모-자식 관계)가 존재할 때 데이터를 트리 형태로 탐색하기 위해 사용한다.",
      "START WITH 절은 계층 구조의 시작 행(루트)을 지정하며, 생략하면 모든 행이 루트 후보가 된다.",
      "CONNECT BY PRIOR는 부모-자식 관계를 연결하는 조인 조건이며, PRIOR는 반드시 자식 컬럼 앞에만 위치해야 한다.",
      "NOCYCLE 옵션을 사용하면 데이터에 사이클이 존재할 때 무한 루프를 방지하고 CONNECT_BY_ISCYCLE 가상 칼럼을 사용할 수 있다."
    ],
    ans: 3,
    src: "자료3 p.77~78",
    exp: {
      reason: "PRIOR는 자식 컬럼 앞에만 오는 것이 아니다. 'PRIOR 자식 = 부모' 또는 'PRIOR 부모 = 자식' 모두 가능하며, PRIOR의 위치에 따라 탐색 방향(순방향/역방향)이 달라진다. (자료3 p.78)",
      terms: [
        "**계층형 질의**: 동일 테이블의 부모-자식 관계를 재귀적으로 탐색하는 Oracle 전용 문법",
        "**START WITH**: 루트 조건 지정. 생략 시 모든 행이 루트 후보",
        "**CONNECT BY PRIOR**: 부모-자식 연결 조건. PRIOR 위치로 방향 결정",
        "**NOCYCLE**: 순환 참조(사이클) 발생 시 무한 루프 방지"
      ],
      wrong: [
        "1. 자료3 p.77의 계층형 질의 정의 그대로다.",
        "2. 자료3 p.78에 START WITH 생략 시 모든 행이 루트 후보로 명시.",
        "3. (정답) PRIOR는 자식 컬럼 앞뿐 아니라 부모 컬럼 앞에도 올 수 있다. 위치에 따라 방향이 달라진다.",
        "4. 자료3 p.78에 NOCYCLE과 CONNECT_BY_ISCYCLE의 관계가 명시되어 있다."
      ],
      tip: "PRIOR 위치는 자유. 어느 쪽에 오느냐가 순방향/역방향을 결정한다."
    }
  },
  {
    id: 502,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과로 출력되는 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_HIER 테이블]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING",   "NULL"],
          ["2", "JONES",  "1"],
          ["3", "SCOTT",  "2"],
          ["4", "ADAMS",  "3"],
          ["5", "BLAKE",  "1"],
          ["6", "MARTIN", "5"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME, LEVEL\nFROM EMP_HIER\nSTART WITH MGR IS NULL\nCONNECT BY PRIOR EMPNO = MGR;"
      }
    ],
    choices: [
      "1",
      "3",
      "5",
      "6"
    ],
    ans: 4,
    src: "자료3 p.77~78",
    exp: {
      reason: "START WITH MGR IS NULL로 루트(KING)에서 시작해 PRIOR EMPNO = MGR로 순방향(부모→자식) 전개하면 KING, JONES, SCOTT, ADAMS, BLAKE, MARTIN 6개 행이 모두 반환된다. PostgreSQL WITH RECURSIVE 검증: lvl 1~4, 총 6행. (자료3 p.78)",
      terms: [
        "**START WITH MGR IS NULL**: MGR이 NULL인 행, 즉 KING(최상위)에서 시작",
        "**CONNECT BY PRIOR EMPNO = MGR**: 현재 행의 EMPNO가 자식 행의 MGR과 같을 때 연결 (순방향)",
        "**결과 행**: KING(1), JONES(2), BLAKE(2), SCOTT(3), MARTIN(3), ADAMS(4) 6행"
      ],
      wrong: [
        "1. 1 = START WITH 조건에 매칭되는 루트만 카운트한 경우.",
        "2. 3 = LEVEL <= 2까지만 탐색한 경우.",
        "3. 5 = 루트(KING)를 제외하고 계산한 경우.",
        "4. (정답) 전체 트리 6개 행."
      ],
      tip: "PRIOR EMPNO = MGR: 현재 행 EMPNO = 자식 행 MGR → 위에서 아래로 전개."
    }
  },
  {
    id: 503,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과로 출력되는 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_HIER 테이블]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING",   "NULL"],
          ["2", "JONES",  "1"],
          ["3", "SCOTT",  "2"],
          ["4", "ADAMS",  "3"],
          ["5", "BLAKE",  "1"],
          ["6", "MARTIN", "5"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME, LEVEL\nFROM EMP_HIER\nSTART WITH MGR IS NULL\nCONNECT BY PRIOR EMPNO = MGR\nWHERE LEVEL <= 2;"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "4"
    ],
    ans: 3,
    src: "자료3 p.77~78",
    exp: {
      reason: "LEVEL <= 2 조건으로 루트(LEVEL=1)와 루트의 직속 자식(LEVEL=2)만 반환된다. KING(1), JONES(2), BLAKE(2) 3행이다. PostgreSQL WITH RECURSIVE 검증 완료: LEVEL 1~2 행 수 = 3. (자료3 p.78)",
      terms: [
        "**WHERE LEVEL <= 2**: 깊이 2까지만 출력. 루트와 1단계 자식",
        "**LEVEL=1**: KING (루트)",
        "**LEVEL=2**: JONES (KING의 자식), BLAKE (KING의 자식)"
      ],
      wrong: [
        "1. 1 = LEVEL=1인 루트만 반환한 경우.",
        "2. 2 = LEVEL=2인 행만 반환한 경우.",
        "3. (정답) LEVEL 1 (1행) + LEVEL 2 (2행) = 3행.",
        "4. 4 = LEVEL <= 3으로 잘못 적용한 경우."
      ],
      tip: "WHERE LEVEL <= N은 루트 포함 N단계까지. LEVEL은 1부터 시작."
    }
  },
  {
    id: 504,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL에서 ADAMS(EMPNO=4)의 LEVEL 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_HIER 테이블]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING",   "NULL"],
          ["2", "JONES",  "1"],
          ["3", "SCOTT",  "2"],
          ["4", "ADAMS",  "3"],
          ["5", "BLAKE",  "1"],
          ["6", "MARTIN", "5"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME, LEVEL\nFROM EMP_HIER\nSTART WITH MGR IS NULL\nCONNECT BY PRIOR EMPNO = MGR;"
      }
    ],
    choices: [
      "2",
      "3",
      "4",
      "5"
    ],
    ans: 3,
    src: "자료3 p.78~79",
    exp: {
      reason: "KING은 LEVEL=1, JONES는 LEVEL=2, SCOTT은 LEVEL=3, ADAMS는 LEVEL=4이다. ADAMS는 루트에서 3단계 아래(4번째 깊이)에 위치한다. PostgreSQL WITH RECURSIVE 검증: ADAMS lvl=4. (자료3 p.79)",
      terms: [
        "**LEVEL**: 루트가 1, 자식으로 내려갈 때마다 1씩 증가",
        "**경로**: KING(1) → JONES(2) → SCOTT(3) → ADAMS(4)",
        "**BLAKE(2), MARTIN(3)**: 다른 가지의 레벨 (BLAKE=LEVEL 2, MARTIN=LEVEL 3)"
      ],
      wrong: [
        "1. 2 = JONES의 LEVEL. ADAMS와 혼동.",
        "2. 3 = SCOTT의 LEVEL. 한 단계 위를 착각.",
        "3. (정답) KING(1) → JONES(2) → SCOTT(3) → ADAMS(4).",
        "4. 5 = 존재하지 않는 LEVEL. 트리의 최대 깊이는 4."
      ],
      tip: "LEVEL은 루트=1. 경로 단계 수를 세면 된다."
    }
  },
  {
    id: 505,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME, LEVEL\nFROM EMP_HIER\nCONNECT BY PRIOR EMPNO = MGR;"
      }
    ],
    choices: [
      "START WITH 절이 없으면 모든 행이 루트 후보가 되어 각 행에서 독립적인 트리가 전개된다.",
      "PRIOR EMPNO = MGR은 현재 행의 EMPNO가 자식 행의 MGR과 일치할 때 연결하는 순방향 조건이다.",
      "START WITH 절을 생략하면 결과 행 수는 테이블 원본 행 수와 동일한 6행이다.",
      "이 SQL은 각 행을 루트로 시작해 하위 계층을 반복 전개하므로 중복 행이 발생할 수 있다."
    ],
    ans: 3,
    src: "자료3 p.78",
    exp: {
      reason: "START WITH를 생략하면 모든 행이 루트 후보가 되어 각 행의 하위 트리가 독립적으로 전개된다. PostgreSQL WITH RECURSIVE로 모든 행을 루트로 시뮬레이션하면 총 15행이 반환된다. 원본 6행이 아니다. (자료3 p.78)",
      terms: [
        "**START WITH 생략**: 테이블 내 모든 행이 루트 후보로 취급됨",
        "**결과 행 수 증가**: 각 행에서 전개되는 하위 트리 행 수의 합",
        "**순방향 조건**: PRIOR EMPNO = MGR → 부모(EMPNO)에서 자식(MGR) 방향"
      ],
      wrong: [
        "1. 자료3 p.78에 START WITH 생략 시 모든 행이 루트 후보로 명시되어 있다.",
        "2. PRIOR EMPNO = MGR의 방향 설명이 맞다.",
        "3. (정답) START WITH 생략 시 결과 행 수는 6행이 아니라 15행(WITH RECURSIVE 검증)이다.",
        "4. START WITH 생략 시 중복 행이 발생한다는 설명이 맞다."
      ],
      tip: "START WITH 생략 = 모든 행이 루트 → 결과 행 수 ≠ 원본 행 수."
    }
  },

  // ============================================================
  // 토픽 133: PRIOR 위치와 방향 (Q506~Q510) — 5문항
  // ============================================================
  {
    id: 506,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: false,
    q: "다음 중 Oracle 계층형 질의에서 PRIOR 키워드의 위치와 탐색 방향에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "CONNECT BY PRIOR 자식컬럼 = 부모컬럼 → 역방향(자식에서 루트 방향) 전개",
      "CONNECT BY PRIOR 부모컬럼 = 자식컬럼 → 순방향(루트에서 자식 방향) 전개",
      "CONNECT BY PRIOR 자식컬럼 = 부모컬럼 → 순방향(루트에서 자식 방향) 전개",
      "PRIOR 위치와 탐색 방향은 무관하며 START WITH 조건에 의해서만 결정된다."
    ],
    ans: 3,
    src: "자료3 p.78~79",
    exp: {
      reason: "자료3 p.79에 'PRIOR 자식 = 부모는 부모에서 자식 방향(순방향), PRIOR 부모 = 자식은 자식에서 부모 방향(역방향)'으로 명시되어 있다. PRIOR가 붙은 컬럼이 이전 행(부모 행)을 참조한다는 점을 기억한다. (자료3 p.79)",
      terms: [
        "**PRIOR**: 이전 행(계층상 위쪽) 컬럼 참조",
        "**PRIOR 자식 = 부모**: 이전 행의 자식컬럼 = 현재 행의 부모컬럼 → 순방향",
        "**PRIOR 부모 = 자식**: 이전 행의 부모컬럼 = 현재 행의 자식컬럼 → 역방향",
        "**EMP_HIER 예시**: PRIOR EMPNO = MGR(순방향), PRIOR MGR = EMPNO(역방향)"
      ],
      wrong: [
        "1. PRIOR 자식 = 부모는 역방향이 아닌 순방향이다.",
        "2. PRIOR 부모 = 자식은 순방향이 아닌 역방향이다.",
        "3. (정답) PRIOR 자식 = 부모 → 순방향. 자료3 p.79 직접 인용.",
        "4. PRIOR 위치가 방향을 결정한다. START WITH와는 독립적."
      ],
      tip: "암기 공식: PRIOR [자식] = 부모 → 순방향 / PRIOR [부모] = 자식 → 역방향."
    }
  },
  {
    id: 507,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: true,
    q: "다음 두 Oracle SQL의 결과에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_HIER 테이블]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING",   "NULL"],
          ["2", "JONES",  "1"],
          ["3", "SCOTT",  "2"],
          ["4", "ADAMS",  "3"],
          ["5", "BLAKE",  "1"],
          ["6", "MARTIN", "5"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- SQL A\nSELECT ENAME FROM EMP_HIER\nSTART WITH MGR IS NULL\nCONNECT BY PRIOR EMPNO = MGR;\n\n-- SQL B\nSELECT ENAME FROM EMP_HIER\nSTART WITH EMPNO = 4\nCONNECT BY PRIOR MGR = EMPNO;"
      }
    ],
    choices: [
      "SQL A는 역방향, SQL B는 순방향 전개이다.",
      "SQL A와 SQL B 모두 6행을 반환한다.",
      "SQL A는 루트(KING)부터 모든 하위 노드로 전개하고 6행을 반환하며, SQL B는 ADAMS에서 루트 방향으로 4행을 반환한다.",
      "SQL B의 결과 첫 행은 KING이다."
    ],
    ans: 3,
    src: "자료3 p.78~79",
    exp: {
      reason: "SQL A는 PRIOR EMPNO = MGR로 순방향(루트→자식) 전개. MGR IS NULL(KING)에서 시작해 6행 반환. SQL B는 PRIOR MGR = EMPNO로 역방향(자식→부모) 전개. ADAMS(EMPNO=4)에서 시작해 ADAMS→SCOTT→JONES→KING 4행 반환. 첫 행은 START WITH인 ADAMS. PostgreSQL WITH RECURSIVE 검증 완료. (자료3 p.79)",
      terms: [
        "**SQL A**: PRIOR EMPNO = MGR → 순방향. 전체 트리 6행",
        "**SQL B**: PRIOR MGR = EMPNO → 역방향. ADAMS(4)→SCOTT(2)→JONES(1)→KING 4행",
        "**역방향 첫 행**: START WITH 조건에 해당하는 ADAMS"
      ],
      wrong: [
        "1. SQL A가 순방향, SQL B가 역방향이다. 반대로 설명되었다.",
        "2. SQL A는 6행이지만 SQL B는 4행이다.",
        "3. (정답) A=순방향 6행, B=역방향 4행.",
        "4. SQL B의 첫 행은 START WITH 조건의 ADAMS이다. KING은 마지막."
      ],
      tip: "역방향 탐색에서 첫 행은 START WITH 대상 노드, 마지막이 루트."
    }
  },
  {
    id: 508,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과로 반환되는 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_HIER 테이블]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING",   "NULL"],
          ["2", "JONES",  "1"],
          ["3", "SCOTT",  "2"],
          ["4", "ADAMS",  "3"],
          ["5", "BLAKE",  "1"],
          ["6", "MARTIN", "5"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME, LEVEL\nFROM EMP_HIER\nSTART WITH EMPNO = 3\nCONNECT BY PRIOR MGR = EMPNO;"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "4"
    ],
    ans: 3,
    src: "자료3 p.78~79",
    exp: {
      reason: "PRIOR MGR = EMPNO는 역방향(자식→부모) 탐색이다. SCOTT(EMPNO=3)에서 시작해 MGR=2인 JONES, MGR=1인 KING(루트, MGR=NULL) 방향으로 올라가면 SCOTT, JONES, KING 3행이 반환된다. PostgreSQL WITH RECURSIVE 검증: 3행 확인. (자료3 p.79)",
      terms: [
        "**PRIOR MGR = EMPNO**: 이전 행의 MGR = 현재 행의 EMPNO → 역방향",
        "**탐색 경로**: SCOTT(3, LEVEL=1) → JONES(2, LEVEL=2) → KING(1, LEVEL=3)",
        "**종료 조건**: 부모가 NULL인 KING에서 탐색 종료"
      ],
      wrong: [
        "1. 1 = START WITH 행만 반환.",
        "2. 2 = SCOTT과 JONES 2행만 반환한 경우.",
        "3. (정답) SCOTT, JONES, KING 3행.",
        "4. 4 = ADAMS까지 포함하여 잘못 계산한 경우."
      ],
      tip: "역방향은 시작 노드에서 루트까지 올라가므로 경로 상 노드 수가 행 수."
    }
  },
  {
    id: 509,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과에서 MARTIN(EMPNO=6)의 LEVEL 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_HIER 테이블]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING",   "NULL"],
          ["2", "JONES",  "1"],
          ["3", "SCOTT",  "2"],
          ["4", "ADAMS",  "3"],
          ["5", "BLAKE",  "1"],
          ["6", "MARTIN", "5"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME, LEVEL\nFROM EMP_HIER\nSTART WITH MGR IS NULL\nCONNECT BY PRIOR EMPNO = MGR;"
      }
    ],
    choices: [
      "2",
      "3",
      "4",
      "5"
    ],
    ans: 2,
    src: "자료3 p.78~79",
    exp: {
      reason: "PRIOR EMPNO = MGR은 순방향(루트→자식) 탐색이다. KING(LEVEL=1) → BLAKE(LEVEL=2) → MARTIN(LEVEL=3). MARTIN은 루트에서 2단계 아래에 위치한다. PostgreSQL WITH RECURSIVE 검증: MARTIN lvl=3. (자료3 p.79)",
      terms: [
        "**MARTIN의 경로**: KING(1) → BLAKE(2) → MARTIN(3)",
        "**BLAKE**: KING의 직속 자식, LEVEL=2",
        "**MARTIN**: BLAKE의 자식, LEVEL=3",
        "**SCOTT도 LEVEL=3**: 다른 가지(KING→JONES→SCOTT)"
      ],
      wrong: [
        "1. 2 = BLAKE의 LEVEL. MARTIN과 혼동.",
        "2. (정답) KING(1) → BLAKE(2) → MARTIN(3).",
        "3. 4 = ADAMS의 LEVEL. MARTIN과 혼동.",
        "4. 5 = 이 트리에 존재하지 않는 LEVEL."
      ],
      tip: "경로: KING→BLAKE→MARTIN. 루트를 1로 세면 MARTIN은 3."
    }
  },
  {
    id: 510,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: true,
    q: "다음 중 아래 두 Oracle SQL을 비교한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- SQL A\nCONNECT BY PRIOR EMPNO = MGR\n\n-- SQL B\nCONNECT BY PRIOR MGR = EMPNO"
      }
    ],
    choices: [
      "SQL A와 SQL B는 모두 순방향(루트에서 자식으로) 탐색을 수행한다.",
      "SQL A는 순방향, SQL B는 역방향 탐색을 수행하며 같은 START WITH 조건에서도 결과가 다르다.",
      "SQL B는 순방향 탐색이므로 START WITH를 루트(MGR IS NULL)로 설정하면 전체 트리가 탐색된다.",
      "SQL A와 SQL B는 PRIOR 위치가 달라도 동일한 결과를 반환한다."
    ],
    ans: 2,
    src: "자료3 p.78~79",
    exp: {
      reason: "자료3 p.79에 PRIOR 자식(EMPNO) = 부모(MGR)는 순방향, PRIOR 부모(MGR) = 자식(EMPNO)는 역방향으로 명시되어 있다. 같은 START WITH 조건이어도 PRIOR 방향이 반대면 완전히 다른 행 집합이 반환된다. (자료3 p.79)",
      terms: [
        "**SQL A**: PRIOR EMPNO = MGR → 순방향(부모→자식)",
        "**SQL B**: PRIOR MGR = EMPNO → 역방향(자식→부모)",
        "**같은 START WITH 차이**: A는 루트에서 아래로 전개, B는 특정 노드에서 위로 올라감"
      ],
      wrong: [
        "1. SQL B는 역방향이다. 둘 다 순방향이 아니다.",
        "2. (정답) A=순방향, B=역방향. 자료3 p.79 직접 인용.",
        "3. SQL B는 역방향이므로 루트에서 시작하면 루트만 반환되거나 의미 없는 결과가 나온다.",
        "4. PRIOR 위치가 달라지면 결과도 다르다."
      ],
      tip: "PRIOR가 붙은 쪽이 '이전 행(상위 노드)'을 참조한다. 어느 컬럼에 붙느냐가 방향을 결정."
    }
  },

  // ============================================================
  // 토픽 134 Part1: 계층형 가상 칼럼/함수 일부 (Q511~Q514) — 4문항
  // ============================================================
  {
    id: 511,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: false,
    q: "다음 중 Oracle 계층형 질의의 가상 칼럼과 그 설명이 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "LEVEL — 루트 행이 1이고 자식 행으로 내려갈수록 1씩 증가하는 깊이 값이다.",
      "CONNECT_BY_ISLEAF — 현재 행이 리프(leaf) 노드이면 1, 아니면 0을 반환한다.",
      "CONNECT_BY_ISCYCLE — NOCYCLE 옵션과 함께 사용하며, 현재 행이 사이클 발생 노드면 1을 반환한다.",
      "CONNECT_BY_ROOT — 현재 행의 직속 부모(MGR) 행의 값을 반환하는 단항 연산자이다."
    ],
    ans: 4,
    src: "자료3 p.79~80",
    exp: {
      reason: "CONNECT_BY_ROOT는 직속 부모가 아니라 현재 행의 루트(최상위 조상)의 컬럼 값을 반환하는 단항 연산자이다. 직속 부모 값을 가져오려면 PRIOR 컬럼을 사용한다. (자료3 p.79~80)",
      terms: [
        "**CONNECT_BY_ROOT 컬럼명**: 계층의 최상위 루트 행의 해당 컬럼 값 반환",
        "**PRIOR 컬럼명**: 직속 부모 행의 해당 컬럼 값",
        "**리프 노드**: 자식이 없는 말단 노드. CONNECT_BY_ISLEAF=1",
        "**CONNECT_BY_ISCYCLE**: NOCYCLE과 함께만 사용 가능. 사이클 발생 시 1"
      ],
      wrong: [
        "1. LEVEL 정의 그대로다. 루트=1, 깊이 증가.",
        "2. CONNECT_BY_ISLEAF 정의 그대로다.",
        "3. CONNECT_BY_ISCYCLE과 NOCYCLE의 관계 설명이 맞다.",
        "4. (정답) CONNECT_BY_ROOT는 루트 행 값. 직속 부모 행 값이 아니다."
      ],
      tip: "CONNECT_BY_ROOT = 루트(최상위). 직속 부모 = PRIOR 키워드."
    }
  },
  {
    id: 512,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과에서 MARTIN(EMPNO=6)의 ISLEAF 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_HIER 테이블]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING",   "NULL"],
          ["2", "JONES",  "1"],
          ["3", "SCOTT",  "2"],
          ["4", "ADAMS",  "3"],
          ["5", "BLAKE",  "1"],
          ["6", "MARTIN", "5"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME,\n       CONNECT_BY_ISLEAF AS ISLEAF\nFROM EMP_HIER\nSTART WITH MGR IS NULL\nCONNECT BY PRIOR EMPNO = MGR;"
      }
    ],
    choices: [
      "0 (리프 노드가 아님)",
      "1 (리프 노드임)",
      "NULL (MARTIN은 루트가 아님)",
      "3 (MARTIN의 LEVEL과 동일)"
    ],
    ans: 2,
    src: "자료3 p.79~80",
    exp: {
      reason: "CONNECT_BY_ISLEAF는 해당 행에 자식이 없는 리프 노드면 1, 자식이 있으면 0을 반환한다. MARTIN(EMPNO=6)은 MGR로 6을 참조하는 자식이 없으므로 리프 노드이고 ISLEAF=1이다. PostgreSQL WHERE NOT EXISTS 검증: MARTIN isleaf=1. (자료3 p.79~80)",
      terms: [
        "**리프 노드**: 자신을 MGR로 참조하는 자식 행이 없는 말단 노드",
        "**ISLEAF=1**: MARTIN, ADAMS (둘 다 자식 없음)",
        "**ISLEAF=0**: KING, JONES, BLAKE, SCOTT (자식 있음)"
      ],
      wrong: [
        "1. MARTIN은 자식이 없으므로 리프 노드다. ISLEAF=0이 아니다.",
        "2. (정답) MARTIN은 리프 노드. ISLEAF=1.",
        "3. CONNECT_BY_ISLEAF는 NULL을 반환하지 않는다. 0 또는 1만 반환.",
        "4. CONNECT_BY_ISLEAF는 LEVEL 값과 무관하다."
      ],
      tip: "CONNECT_BY_ISLEAF = 1이면 더 이상 자식 없는 말단 노드."
    }
  },
  {
    id: 513,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL에서 SCOTT(EMPNO=3)의 ROOT_ENAME 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_HIER 테이블]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING",   "NULL"],
          ["2", "JONES",  "1"],
          ["3", "SCOTT",  "2"],
          ["4", "ADAMS",  "3"],
          ["5", "BLAKE",  "1"],
          ["6", "MARTIN", "5"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME,\n       CONNECT_BY_ROOT ENAME AS ROOT_ENAME\nFROM EMP_HIER\nSTART WITH MGR IS NULL\nCONNECT BY PRIOR EMPNO = MGR;"
      }
    ],
    choices: [
      "JONES",
      "KING",
      "SCOTT",
      "NULL"
    ],
    ans: 2,
    src: "자료3 p.79~80",
    exp: {
      reason: "CONNECT_BY_ROOT는 현재 행의 계층 최상위 루트 행의 컬럼 값을 반환한다. START WITH MGR IS NULL로 시작했으므로 루트는 KING이다. SCOTT의 탐색 경로 상 루트는 KING이므로 ROOT_ENAME=KING이다. PostgreSQL WITH RECURSIVE 검증: SCOTT의 root_name=KING. (자료3 p.80)",
      terms: [
        "**CONNECT_BY_ROOT**: 해당 행이 속한 계층의 최상위 루트 행의 값",
        "**루트**: START WITH 조건에 해당하는 행. 여기서는 KING",
        "**모든 행의 ROOT_ENAME**: 이 쿼리에서는 모두 KING"
      ],
      wrong: [
        "1. JONES는 SCOTT의 직속 부모. ROOT는 JONES가 아니다.",
        "2. (정답) 전체 트리의 루트는 KING.",
        "3. SCOTT은 자기 자신의 ROOT가 아니다.",
        "4. CONNECT_BY_ROOT는 NULL을 반환하지 않는다."
      ],
      tip: "CONNECT_BY_ROOT = 직속 부모(PRIOR)가 아니라 최상위 루트 행의 값."
    }
  },
  {
    id: 514,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL에서 ADAMS(EMPNO=4)의 PATH 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_HIER 테이블]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING",   "NULL"],
          ["2", "JONES",  "1"],
          ["3", "SCOTT",  "2"],
          ["4", "ADAMS",  "3"],
          ["5", "BLAKE",  "1"],
          ["6", "MARTIN", "5"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME,\n       SYS_CONNECT_BY_PATH(ENAME, '/') AS PATH\nFROM EMP_HIER\nSTART WITH MGR IS NULL\nCONNECT BY PRIOR EMPNO = MGR;"
      }
    ],
    choices: [
      "/KING/JONES/SCOTT/ADAMS",
      "KING/JONES/SCOTT/ADAMS",
      "/ADAMS/SCOTT/JONES/KING",
      "/KING/ADAMS"
    ],
    ans: 1,
    src: "자료3 p.80, 자료1 p.33",
    exp: {
      reason: "SYS_CONNECT_BY_PATH(컬럼, 구분자)는 루트에서 현재 행까지의 경로를 구분자로 이어 문자열로 반환한다. 첫 문자도 구분자로 시작하므로 ADAMS의 경로는 '/KING/JONES/SCOTT/ADAMS'이다. PostgreSQL WITH RECURSIVE 검증: path='/KING/JONES/SCOTT/ADAMS'. (자료3 p.80)",
      terms: [
        "**SYS_CONNECT_BY_PATH(컬럼, 구분자)**: 루트→현재 노드 경로를 구분자로 연결",
        "**선행 구분자**: 결과 문자열은 항상 구분자로 시작",
        "**경로 순서**: 루트에서 현재 행 방향(위에서 아래)",
        "**ADAMS 경로**: KING(1) → JONES(2) → SCOTT(3) → ADAMS(4)"
      ],
      wrong: [
        "1. (정답) 구분자로 시작하고 루트에서 ADAMS까지의 경로.",
        "2. 선행 구분자('/')가 없는 형태. SYS_CONNECT_BY_PATH는 구분자로 시작한다.",
        "3. 역방향 경로. SYS_CONNECT_BY_PATH는 루트→현재 행 방향.",
        "4. 직속 부모(SCOTT)가 아닌 루트(KING)만 포함된 잘못된 경로."
      ],
      tip: "SYS_CONNECT_BY_PATH 결과는 구분자로 시작하고 루트에서 현재 노드까지 순서대로."
    }
  }
];

module.exports = l2Part1;

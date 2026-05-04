// 2-L Part2: Q515~Q525 (계층형 질의 가상 칼럼/함수 잔여 + CTE 재귀 + 셀프 조인)
// 토픽 134 (Q515~517): CONNECT_BY_ISLEAF / CONNECT_BY_ROOT / SYS_CONNECT_BY_PATH / ORDER SIBLINGS BY / CONNECT_BY_ISCYCLE
//   → Oracle 전용. 자료3 p.79~80 + 자료1 p.33 인용으로 정답 확정.
// 토픽 135 (Q518~521): WITH RECURSIVE 재귀 CTE
//   → PostgreSQL 직접 검증 완료 (시나리오 1~4).
// 토픽 136 (Q522~525): 셀프 조인 계층형 응용
//   → PostgreSQL 직접 검증 완료 (시나리오 5~8).

const l2Part2 = [

  // ============================================================
  // 토픽 134: 계층형 가상 칼럼/함수 잔여 (Q515~Q517) — 3문항
  // ============================================================

  {
    id: 515,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의와 셀프 조인",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과에서 CONNECT_BY_ISLEAF 값이 1인 행의 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
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
        content:
          "SELECT EMPNO, ENAME, CONNECT_BY_ISLEAF AS ISLEAF\n" +
          "FROM EMP\n" +
          "START WITH MGR IS NULL\n" +
          "CONNECT BY PRIOR EMPNO = MGR;"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "4"
    ],
    ans: 2,
    src: "자료3 p.79",
    exp: {
      reason:
        "CONNECT_BY_ISLEAF는 해당 데이터가 리프 노드(최하위 계층, 자식 없음)이면 1, 아니면 0을 반환한다. " +
        "트리 구조: KING(1) → JONES(2) → SCOTT(3) → ADAMS(4), KING(1) → BLAKE(5) → MARTIN(6). " +
        "자식이 없는 노드는 ADAMS(4)와 MARTIN(6) 두 개이므로 ISLEAF=1인 행은 2개다. (자료3 p.79)",
      terms: [
        "**CONNECT_BY_ISLEAF**: 리프 노드면 1, 비리프면 0 반환 (자료3 p.79)",
        "**리프 노드**: 자식이 전혀 없는 최하위 노드",
        "**비리프 노드**: KING(자식 JONES,BLAKE), JONES(자식 SCOTT), SCOTT(자식 ADAMS), BLAKE(자식 MARTIN) — 모두 ISLEAF=0",
        "**ISLEAF=1**: ADAMS(4), MARTIN(6) — 총 2행"
      ],
      wrong: [
        "1. 1 = 최상위 루트 노드 수와 혼동한 경우.",
        "2. (정답) 자식 없는 리프 노드 ADAMS, MARTIN 2개.",
        "3. 3 = LEVEL=3인 노드 수와 혼동한 경우.",
        "4. 4 = ISLEAF=0인 비리프 노드 수와 혼동한 경우."
      ],
      tip: "CONNECT_BY_ISLEAF: **자식이 없으면 1**. 중간 노드는 0. 가지 끝만 센다."
    }
  },

  {
    id: 516,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의와 셀프 조인",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과에서 (A), (B)에 들어갈 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
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
        content:
          "SELECT ENAME,\n" +
          "       CONNECT_BY_ROOT ENAME AS ROOT_NAME,\n" +
          "       SYS_CONNECT_BY_PATH(ENAME, '/') AS PATH\n" +
          "FROM EMP\n" +
          "START WITH MGR IS NULL\n" +
          "CONNECT BY PRIOR EMPNO = MGR;"
      },
      {
        type: "table",
        title: "[실행 결과 일부]",
        headers: ["ENAME", "ROOT_NAME", "PATH"],
        rows: [
          ["KING",   "(A)", "/KING"],
          ["SCOTT",  "KING", "/KING/JONES/SCOTT"],
          ["MARTIN", "KING", "(B)"]
        ]
      }
    ],
    choices: [
      "(A) NULL,  (B) /KING/MARTIN",
      "(A) KING,  (B) /KING/BLAKE/MARTIN",
      "(A) JONES, (B) /KING/MARTIN",
      "(A) KING,  (B) /MARTIN"
    ],
    ans: 2,
    src: "자료3 p.79~80",
    exp: {
      reason:
        "CONNECT_BY_ROOT 컬럼은 계층 전개 경로상의 루트 노드 컬럼값을 반환한다. " +
        "START WITH MGR IS NULL로 KING이 루트이므로 모든 행의 ROOT_NAME은 'KING'이다. " +
        "SYS_CONNECT_BY_PATH(ENAME, '/')는 루트부터 현재 노드까지 경로를 구분자로 이어 붙인 문자열을 반환한다. " +
        "MARTIN의 경로는 KING → BLAKE → MARTIN이므로 '/KING/BLAKE/MARTIN'이다. (자료3 p.79~80)",
      terms: [
        "**CONNECT_BY_ROOT 컬럼**: 해당 행이 속한 계층의 루트 노드 컬럼값 반환 (자료3 p.79)",
        "**SYS_CONNECT_BY_PATH(컬럼, 구분자)**: 루트부터 현재 노드까지 경로 문자열 반환 (자료3 p.79)",
        "**MARTIN의 부모**: BLAKE → KING 순으로 거슬러 올라감",
        "**경로 표현**: 구분자가 '/'이면 '/루트/중간/현재' 형태"
      ],
      wrong: [
        "1. CONNECT_BY_ROOT는 NULL이 아닌 루트 이름 'KING'을 반환한다.",
        "2. (정답) ROOT_NAME은 모두 KING, MARTIN 경로는 /KING/BLAKE/MARTIN.",
        "3. KING이 루트인데 ROOT_NAME이 JONES일 수 없다.",
        "4. 경로는 루트부터 시작하므로 /MARTIN처럼 단독이 될 수 없다."
      ],
      tip: "CONNECT_BY_ROOT = **루트 노드 값**. SYS_CONNECT_BY_PATH = **루트→현재 경로 문자열**."
    }
  },

  {
    id: 517,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의와 셀프 조인",
    diff: "상",
    has_code: false,
    q: "다음 중 Oracle 계층형 질의의 가상 칼럼 및 함수에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "CONNECT_BY_ISLEAF는 리프 노드(최하위 계층)이면 1, 그렇지 않으면 0을 반환한다.",
      "ORDER SIBLINGS BY는 계층 구조를 유지하면서 동일 레벨의 형제 노드 사이에서만 정렬을 수행한다.",
      "CONNECT_BY_ISCYCLE은 NOCYCLE 옵션 없이도 항상 사용할 수 있다.",
      "SYS_CONNECT_BY_PATH(컬럼, 구분자)는 루트 데이터부터 현재 전개할 데이터까지의 경로를 구분자로 연결해 반환한다."
    ],
    ans: 3,
    src: "자료3 p.79~80",
    exp: {
      reason:
        "CONNECT_BY_ISCYCLE은 계층형 쿼리에서 순환이 발생했는지를 나타내는 가상 칼럼으로, " +
        "CONNECT BY 절에 NOCYCLE 옵션을 명시했을 때만 사용할 수 있다. " +
        "NOCYCLE 없이 사용하면 오류가 발생한다. (자료3 p.80)",
      terms: [
        "**CONNECT_BY_ISCYCLE**: 자식 데이터가 조상으로서 존재하면 1, 그렇지 않으면 0 반환. **NOCYCLE 옵션 필수** (자료3 p.80)",
        "**CONNECT_BY_ISLEAF**: 리프면 1, 비리프면 0 (자료3 p.79)",
        "**ORDER SIBLINGS BY**: 형제 노드(동일 LEVEL) 사이에서만 정렬. 일반 ORDER BY를 쓰면 계층 구조가 깨짐 (자료3 p.80)",
        "**SYS_CONNECT_BY_PATH**: 루트→현재 경로 문자열 반환 (자료3 p.79)"
      ],
      wrong: [
        "1. 자료3 p.79에 명시된 CONNECT_BY_ISLEAF 정의 그대로다.",
        "2. 자료3 p.80에 '형제 노드(동일 LEVEL) 사이에서 정렬 수행'으로 명시되어 있다.",
        "3. (정답) CONNECT_BY_ISCYCLE은 NOCYCLE 옵션을 명시했을 때만 사용 가능하다.",
        "4. 자료3 p.79에 명시된 SYS_CONNECT_BY_PATH 정의 그대로다."
      ],
      tip: "CONNECT_BY_ISCYCLE 사용 조건: **CONNECT BY 절에 NOCYCLE 반드시 필요**."
    }
  },

  // ============================================================
  // 토픽 135: SQL Server CTE 재귀 쿼리 (Q518~Q521) — 4문항
  // ============================================================

  {
    id: 518,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의와 셀프 조인",
    diff: "상",
    has_code: true,
    q: "다음 SQL Server CTE 재귀 쿼리의 실행 결과에서 LV 컬럼 값이 2인 행의 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
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
        content:
          "WITH EMP_CTE(EMPNO, ENAME, MGR, LV) AS (\n" +
          "  SELECT EMPNO, ENAME, MGR, 1\n" +
          "  FROM EMP\n" +
          "  WHERE MGR IS NULL\n" +
          "  UNION ALL\n" +
          "  SELECT E.EMPNO, E.ENAME, E.MGR, C.LV + 1\n" +
          "  FROM EMP E\n" +
          "  JOIN EMP_CTE C ON E.MGR = C.EMPNO\n" +
          ")\n" +
          "SELECT EMPNO, ENAME, LV\n" +
          "FROM EMP_CTE\n" +
          "ORDER BY LV, EMPNO;"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "4"
    ],
    ans: 2,
    src: "자료1 p.33, 자료4 p.5",
    exp: {
      reason:
        "앵커 멤버(WHERE MGR IS NULL)는 KING 1행 LV=1을 반환한다. " +
        "재귀 멤버는 이전 결과를 Outer 집합으로 삼아 자식을 찾는다. " +
        "LV=1인 KING의 자식은 JONES(2), BLAKE(5) — LV=2행이 2개다. " +
        "이후 LV=3에는 SCOTT(3), MARTIN(6), LV=4에는 ADAMS(4)가 있다. (자료1 p.33, 자료4 p.5, PostgreSQL 직접 검증)",
      terms: [
        "**앵커 멤버**: 재귀의 시작점. WHERE MGR IS NULL → KING 1행",
        "**재귀 멤버**: 앞 결과와 JOIN하여 자식 행 추가. UNION ALL로 연결",
        "**종료 조건**: 더 이상 JOIN 결과가 없으면 재귀 종료",
        "**LV=2 해당 행**: JONES(empno=2), BLAKE(empno=5) — 2행"
      ],
      wrong: [
        "1. 1 = 루트 노드(LV=1) 수와 혼동한 경우.",
        "2. (정답) KING의 직속 부하 JONES, BLAKE 2명.",
        "3. 3 = LV=3(SCOTT, MARTIN)이나 전체 레벨 수와 혼동.",
        "4. 4 = LV=4까지의 최대 깊이와 혼동한 경우."
      ],
      tip: "CTE 재귀: **앵커 → UNION ALL → 재귀 멤버**. LV+1 누적으로 계층 추적."
    }
  },

  {
    id: 519,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의와 셀프 조인",
    diff: "상",
    has_code: true,
    q: "다음 SQL Server CTE 재귀 쿼리에서 빈칸 (A)에 들어갈 절로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
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
        content:
          "-- JONES(EMPNO=2) 하위 계층만 조회\n" +
          "WITH EMP_CTE(EMPNO, ENAME, MGR, LV) AS (\n" +
          "  SELECT EMPNO, ENAME, MGR, 1\n" +
          "  FROM EMP\n" +
          "  WHERE (A)\n" +
          "  UNION ALL\n" +
          "  SELECT E.EMPNO, E.ENAME, E.MGR, C.LV + 1\n" +
          "  FROM EMP E\n" +
          "  JOIN EMP_CTE C ON E.MGR = C.EMPNO\n" +
          ")\n" +
          "SELECT EMPNO, ENAME, LV FROM EMP_CTE;"
      },
      {
        type: "table",
        title: "[기대 결과]",
        headers: ["EMPNO", "ENAME", "LV"],
        rows: [
          ["2", "JONES", "1"],
          ["3", "SCOTT", "2"],
          ["4", "ADAMS", "3"]
        ]
      }
    ],
    choices: [
      "MGR IS NULL",
      "EMPNO = 2",
      "ENAME = 'JONES' AND MGR IS NULL",
      "MGR = 1"
    ],
    ans: 2,
    src: "자료1 p.33, 자료4 p.5",
    exp: {
      reason:
        "CTE 재귀에서 앵커 멤버(Anchor Member)는 재귀의 시작점을 지정한다. " +
        "JONES의 EMPNO는 2이므로 WHERE EMPNO = 2로 앵커를 JONES 단일 행으로 고정하면, " +
        "재귀 멤버가 JONES의 하위 계층(SCOTT → ADAMS)을 순차적으로 전개한다. " +
        "(자료1 p.33, 자료4 p.5, PostgreSQL 직접 검증)",
      terms: [
        "**앵커 멤버**: CTE 재귀의 첫 번째 SELECT. 시작 행을 고정",
        "**EMPNO = 2**: JONES를 시작점으로 지정",
        "**MGR IS NULL**: KING을 시작점으로 지정하는 조건 — 오답",
        "**MGR = 1**: KING의 직속 부하(JONES, BLAKE)를 함께 조회하므로 JONES 단독 조회가 아님"
      ],
      wrong: [
        "1. MGR IS NULL은 KING(루트)을 시작점으로 해 전체 트리를 조회한다.",
        "2. (정답) EMPNO = 2로 JONES부터 시작해 하위 계층만 전개.",
        "3. ENAME = 'JONES' AND MGR IS NULL: JONES의 MGR는 1이라 조건을 만족하는 행이 없다.",
        "4. MGR = 1은 JONES와 BLAKE 두 행이 앵커가 되어 기대 결과와 다르다."
      ],
      tip: "앵커 멤버 = **시작점 행 지정**. 특정 노드부터 시작하려면 그 노드의 PK 조건을 쓴다."
    }
  },

  {
    id: 520,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의와 셀프 조인",
    diff: "상",
    has_code: true,
    q: "다음 SQL Server CTE 재귀 쿼리의 실행 결과에서 PATH 컬럼의 값이 '/KING/BLAKE/MARTIN'인 행의 ENAME으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
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
        content:
          "WITH EMP_CTE(EMPNO, ENAME, MGR, LV, PATH) AS (\n" +
          "  SELECT EMPNO, ENAME, MGR, 1, '/' + ENAME\n" +
          "  FROM EMP\n" +
          "  WHERE MGR IS NULL\n" +
          "  UNION ALL\n" +
          "  SELECT E.EMPNO, E.ENAME, E.MGR,\n" +
          "         C.LV + 1, C.PATH + '/' + E.ENAME\n" +
          "  FROM EMP E\n" +
          "  JOIN EMP_CTE C ON E.MGR = C.EMPNO\n" +
          ")\n" +
          "SELECT EMPNO, ENAME, LV, PATH FROM EMP_CTE;"
      }
    ],
    choices: [
      "JONES",
      "SCOTT",
      "BLAKE",
      "MARTIN"
    ],
    ans: 4,
    src: "자료1 p.33, 자료4 p.5",
    exp: {
      reason:
        "PATH는 앵커 멤버에서 '/' + ENAME으로 시작해, 재귀 멤버를 반복할 때마다 C.PATH + '/' + E.ENAME을 누적한다. " +
        "MARTIN의 계층 경로는 KING(루트) → BLAKE(부모) → MARTIN(현재)이므로 PATH는 '/KING/BLAKE/MARTIN'이 된다. " +
        "(자료1 p.33, PostgreSQL 경로 누적 직접 검증)",
      terms: [
        "**경로 누적**: 재귀 멤버에서 C.PATH + 구분자 + E.ENAME으로 매 단계 연장",
        "**MARTIN 경로**: KING → BLAKE → MARTIN → '/KING/BLAKE/MARTIN'",
        "**SQL Server 문자열 연결**: '+' 연산자 사용 (PostgreSQL은 '||')",
        "**SYS_CONNECT_BY_PATH 유사 패턴**: Oracle 함수와 동일 목적을 CTE로 구현"
      ],
      wrong: [
        "1. JONES 경로는 '/KING/JONES'.",
        "2. SCOTT 경로는 '/KING/JONES/SCOTT'.",
        "3. BLAKE 경로는 '/KING/BLAKE'.",
        "4. (정답) MARTIN의 부모가 BLAKE, 조부모가 KING이므로 '/KING/BLAKE/MARTIN'."
      ],
      tip: "CTE 경로 누적: **직전 경로 + 구분자 + 현재 이름**. MARTIN 부모 체인 = KING→BLAKE→MARTIN."
    }
  },

  {
    id: 521,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의와 셀프 조인",
    diff: "상",
    has_code: true,
    q: "다음 SQL Server CTE 재귀 쿼리의 실행 결과로 출력되는 전체 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
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
        content:
          "WITH EMP_CTE(EMPNO, ENAME, MGR, LV) AS (\n" +
          "  SELECT EMPNO, ENAME, MGR, 1\n" +
          "  FROM EMP\n" +
          "  WHERE MGR IS NULL\n" +
          "  UNION ALL\n" +
          "  SELECT E.EMPNO, E.ENAME, E.MGR, C.LV + 1\n" +
          "  FROM EMP E\n" +
          "  JOIN EMP_CTE C ON E.MGR = C.EMPNO\n" +
          "  WHERE C.LV < 2\n" +
          ")\n" +
          "SELECT EMPNO, ENAME, LV FROM EMP_CTE;"
      }
    ],
    choices: [
      "2",
      "3",
      "4",
      "6"
    ],
    ans: 2,
    src: "자료1 p.33, 자료4 p.5",
    exp: {
      reason:
        "재귀 멤버의 WHERE C.LV < 2 조건은 종료 조건으로, LV=1인 행만 자식 탐색에 참여한다. " +
        "따라서 LV=2까지만 결과에 포함된다. " +
        "앵커: KING(LV=1) 1행. 재귀 1회(LV=1 → LV=2): JONES, BLAKE 2행. " +
        "재귀 2회는 LV=2가 C.LV < 2 조건을 만족하지 않으므로 종료. 합계 3행. " +
        "(자료1 p.33, 자료4 p.5, PostgreSQL 직접 검증)",
      terms: [
        "**종료 조건 WHERE C.LV < 2**: 이전 단계 LV가 2 미만인 행만 자식 탐색에 참여",
        "**앵커 결과**: KING LV=1 (1행)",
        "**재귀 1회**: JONES(LV=2), BLAKE(LV=2) (2행) — LV=2는 조건 불만족으로 더 이상 탐색 불가",
        "**합계**: 1 + 2 = 3행"
      ],
      wrong: [
        "1. 2 = 앵커 + 재귀 1회의 절반만 계산한 경우.",
        "2. (정답) KING(1) + JONES(2) + BLAKE(2) = 3행.",
        "3. 4 = 종료 조건 없이 LV=1~2 전부로 잘못 계산.",
        "4. 6 = 종료 조건이 없어 전체 EMP를 조회한 경우."
      ],
      tip: "재귀 WHERE는 **종료 조건**. C.LV < 2이면 LV=2까지만 탐색 참여 → LV=2 행은 결과에 있으나 추가 전개 안 됨."
    }
  },

  // ============================================================
  // 토픽 136: 셀프 조인 계층형 응용 (Q522~Q525) — 4문항
  // ============================================================

  {
    id: 522,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의와 셀프 조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
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
        content:
          "SELECT E1.ENAME AS 사원명, E2.ENAME AS 관리자명\n" +
          "FROM EMP E1, EMP E2\n" +
          "WHERE E1.MGR = E2.EMPNO\n" +
          "ORDER BY E1.EMPNO;"
      }
    ],
    choices: [
      "4",
      "5",
      "6",
      "7"
    ],
    ans: 2,
    src: "자료3 p.77",
    exp: {
      reason:
        "셀프 조인에서 WHERE E1.MGR = E2.EMPNO는 내부 조인(INNER JOIN) 조건으로, " +
        "MGR이 NULL인 KING은 매칭되는 E2 행이 없어 결과에서 제외된다. " +
        "JONES, SCOTT, ADAMS, BLAKE, MARTIN은 각자의 MGR이 E2.EMPNO와 매칭되므로 5행이 반환된다. " +
        "(자료3 p.77, PostgreSQL 직접 검증)",
      terms: [
        "**셀프 조인**: 동일 테이블을 두 번 참조. 테이블 별칭(E1, E2)이 필수 (자료3 p.77)",
        "**INNER JOIN 효과**: MGR IS NULL인 KING은 조건 불만족으로 제외",
        "**E1.MGR = E2.EMPNO**: E1의 관리자 번호가 E2의 사원 번호와 같은 행 매칭",
        "**결과 5행**: JONES-KING, SCOTT-JONES, ADAMS-SCOTT, BLAKE-KING, MARTIN-BLAKE"
      ],
      wrong: [
        "1. 4 = KING을 포함하되 MARTIN을 제외하는 잘못된 계산.",
        "2. (정답) MGR IS NULL인 KING 제외 → 나머지 5명.",
        "3. 6 = 전체 EMP 행 수로 KING까지 포함한 오답.",
        "4. 7 = 카타시안 곱 일부로 잘못 계산한 경우."
      ],
      tip: "셀프 조인 INNER JOIN: **MGR IS NULL인 최상위 노드는 제외**됨. 반드시 별칭 사용."
    }
  },

  {
    id: 523,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의와 셀프 조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
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
        content:
          "SELECT E1.ENAME AS 사원명, E2.ENAME AS 관리자명\n" +
          "FROM EMP E1 LEFT JOIN EMP E2 ON E1.MGR = E2.EMPNO\n" +
          "ORDER BY E1.EMPNO;"
      }
    ],
    choices: [
      "총 5행이 반환되며 KING의 관리자명은 NULL이다.",
      "총 5행이 반환되며 KING은 결과에 포함되지 않는다.",
      "총 6행이 반환되며 KING의 관리자명은 NULL이다.",
      "총 6행이 반환되며 KING의 관리자명은 'KING'이다."
    ],
    ans: 3,
    src: "자료3 p.77",
    exp: {
      reason:
        "LEFT JOIN은 왼쪽 테이블(E1)의 모든 행을 결과에 포함한다. " +
        "KING은 MGR이 NULL이라 E2와 매칭되지 않지만 LEFT JOIN이므로 관리자명이 NULL로 채워진 채 결과에 포함된다. " +
        "따라서 전체 6행이 반환되며 KING 행의 관리자명은 NULL이다. " +
        "(자료3 p.77, PostgreSQL 직접 검증)",
      terms: [
        "**LEFT JOIN**: 왼쪽 테이블 전체 행 보존. 매칭 없으면 오른쪽 컬럼은 NULL",
        "**INNER JOIN vs LEFT JOIN**: INNER는 KING 제외(5행), LEFT는 KING 포함(6행)",
        "**KING 행**: MGR=NULL → E2 매칭 없음 → 관리자명=NULL로 채워짐",
        "**자기 참조 LEFT JOIN**: 최상위 루트 노드를 포함하는 표준 패턴"
      ],
      wrong: [
        "1. LEFT JOIN이므로 5행이 아닌 6행이 반환된다.",
        "2. LEFT JOIN에서 왼쪽 테이블의 KING도 포함된다.",
        "3. (정답) 6행 반환, KING의 관리자명은 NULL.",
        "4. KING의 관리자는 없어서 NULL이다. 자기 자신 'KING'이 될 수 없다."
      ],
      tip: "셀프 LEFT JOIN: **루트 노드(MGR IS NULL)도 결과에 포함**. 관리자명은 NULL."
    }
  },

  {
    id: 524,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의와 셀프 조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 출력되는 (사원1, 사원2) 쌍으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
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
        content:
          "SELECT E1.ENAME AS 사원1, E2.ENAME AS 사원2,\n" +
          "       E1.MGR AS 공통관리자\n" +
          "FROM EMP E1, EMP E2\n" +
          "WHERE E1.MGR = E2.MGR\n" +
          "  AND E1.EMPNO < E2.EMPNO;"
      }
    ],
    choices: [
      "(JONES, BLAKE) — 공통관리자: 1",
      "(SCOTT, MARTIN) — 공통관리자: 2",
      "(JONES, SCOTT) — 공통관리자: 1",
      "(BLAKE, MARTIN) — 공통관리자: 5"
    ],
    ans: 1,
    src: "자료3 p.77",
    exp: {
      reason:
        "E1.MGR = E2.MGR 조건은 동일한 관리자를 가진 사원 쌍을 찾는다. " +
        "MGR=1인 사원: JONES(2), BLAKE(5). E1.EMPNO < E2.EMPNO 조건으로 중복 쌍을 제거하면 (JONES, BLAKE)만 남는다. " +
        "MGR=2(SCOTT만), MGR=3(ADAMS만), MGR=5(MARTIN만)는 각각 1명뿐이라 쌍이 안 된다. " +
        "결과는 (JONES, BLAKE), 공통관리자=1. (자료3 p.77, PostgreSQL 직접 검증)",
      terms: [
        "**E1.MGR = E2.MGR**: 동일 관리자를 가진 사원 쌍 조건",
        "**E1.EMPNO < E2.EMPNO**: 중복 쌍 제거 (JONES-BLAKE와 BLAKE-JONES는 동일 쌍)",
        "**MGR=1 그룹**: JONES, BLAKE — 2명이므로 쌍 1개 생성",
        "**나머지 MGR 그룹**: 각 1명뿐이라 쌍 불가"
      ],
      wrong: [
        "1. (정답) JONES(empno=2)와 BLAKE(empno=5) 모두 MGR=1. 유일한 쌍.",
        "2. SCOTT(MGR=2)와 MARTIN(MGR=5)는 서로 관리자가 달라 쌍이 안 됨.",
        "3. JONES(MGR=1)와 SCOTT(MGR=2)는 관리자가 달라 쌍이 안 됨.",
        "4. BLAKE(MGR=1)와 MARTIN(MGR=5)는 관리자가 달라 쌍이 안 됨."
      ],
      tip: "동일 관리자 쌍: **E1.MGR = E2.MGR**. E1.EMPNO < E2.EMPNO로 중복 방지."
    }
  },

  {
    id: 525,
    subj: 2,
    topic: "2-L",
    topic_name: "계층형 질의와 셀프 조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 상위관리자 컬럼 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
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
        content:
          "SELECT E1.ENAME AS 사원,\n" +
          "       E2.ENAME AS 직속관리자,\n" +
          "       E3.ENAME AS 상위관리자\n" +
          "FROM EMP E1\n" +
          "JOIN EMP E2 ON E1.MGR = E2.EMPNO\n" +
          "JOIN EMP E3 ON E2.MGR = E3.EMPNO\n" +
          "WHERE E1.ENAME = 'ADAMS';"
      }
    ],
    choices: [
      "KING",
      "JONES",
      "SCOTT",
      "BLAKE"
    ],
    ans: 2,
    src: "자료3 p.77",
    exp: {
      reason:
        "ADAMS(empno=4)의 MGR은 3(SCOTT)이다. E2에서 E2.EMPNO=3 → SCOTT이 직속관리자. " +
        "SCOTT(empno=3)의 MGR은 2(JONES)이다. E3에서 E3.EMPNO=2 → JONES가 상위관리자. " +
        "3단계 셀프 조인으로 2단계 위의 관리자를 조회하는 패턴이다. " +
        "(자료3 p.77, PostgreSQL 직접 검증)",
      terms: [
        "**1단계 조인 E1→E2**: E1.MGR = E2.EMPNO → ADAMS의 직속관리자 = SCOTT",
        "**2단계 조인 E2→E3**: E2.MGR = E3.EMPNO → SCOTT의 관리자 = JONES",
        "**상위관리자**: 직속관리자(SCOTT)의 관리자 → JONES",
        "**KING**: JONES의 관리자이므로 3단계 위. 여기서는 해당 없음"
      ],
      wrong: [
        "1. KING은 JONES의 관리자. ADAMS 기준으로는 3단계 위 — 이 쿼리에서는 조회되지 않는다.",
        "2. (정답) SCOTT의 관리자가 JONES이므로 상위관리자=JONES.",
        "3. SCOTT은 ADAMS의 직속관리자(E2). 상위관리자(E3)가 아니다.",
        "4. BLAKE는 KING의 직속 부하. ADAMS 계층과 관계없다."
      ],
      tip: "N단계 위 관리자: **셀프 조인을 N번 체인**. 2단계 위 = 테이블 3번(E1, E2, E3) 참조."
    }
  }

];

module.exports = l2Part2;

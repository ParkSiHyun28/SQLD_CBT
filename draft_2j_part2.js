// 2-J: 윈도우 함수 Part2 — Q455~Q470 (총 16문항)
// 토픽 123(LAG/LEAD 나머지 2), 124(FIRST_VALUE/LAST_VALUE 4),
//        125(NTILE 3), 126(RATIO_TO_REPORT/PERCENT_RANK/CUME_DIST 7)
// 자료3 p.70~74, 자료1 p.37, 자료4 p.4 기반
// PostgreSQL 14 sqld_verify DB 직접 검증 완료
// RATIO_TO_REPORT: Oracle 전용(자료3 p.73) — 등가 SQL sal/SUM(sal)OVER() 로 PostgreSQL 검증

const j2Part2 = [

  // ============================================================
  // 토픽 123: LAG와 LEAD (Q455~Q456) — 2문항
  // ============================================================
  {
    id: 455,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (emp_win 테이블 기준)",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["MILLER", "10", "1300"],
          ["CLARK",  "10", "2450"],
          ["KING",   "10", "5000"],
          ["SMITH",  "20",  "800"],
          ["JONES",  "20", "2975"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       LAG(SAL) OVER(PARTITION BY DEPTNO ORDER BY SAL) AS PREV_SAL\nFROM emp_win\nWHERE DEPTNO IN (10, 20)\nORDER BY DEPTNO, SAL;"
      }
    ],
    choices: [
      "MILLER의 PREV_SAL은 NULL이고, CLARK의 PREV_SAL은 1300이다.",
      "MILLER의 PREV_SAL은 0이고, CLARK의 PREV_SAL은 1300이다.",
      "MILLER의 PREV_SAL은 NULL이고, CLARK의 PREV_SAL은 NULL이다.",
      "MILLER의 PREV_SAL은 2450이고, CLARK의 PREV_SAL은 5000이다."
    ],
    ans: 1,
    src: "자료3 p.70~71",
    exp: {
      reason: "LAG(SAL) OVER(PARTITION BY DEPTNO ORDER BY SAL)은 각 파티션(부서) 내에서 SAL 오름차순으로 이전 행의 SAL을 가져온다. MILLER(1300)는 DEPTNO=10 파티션의 첫 행이므로 이전 행이 없어 PREV_SAL이 NULL이고, CLARK(2450)의 이전 행은 MILLER(1300)이므로 PREV_SAL은 1300이다. PostgreSQL 검증 완료. (자료3 p.70~71)",
      terms: [
        "**LAG(컬럼, N, 기본값)**: 현재 행에서 N번째 이전 행의 값을 반환. N 생략 시 1, 기본값 생략 시 NULL",
        "**PARTITION BY**: 파티션 경계를 넘어서는 이전 행을 참조하지 않음 — 각 파티션의 첫 행은 항상 NULL",
        "**ORDER BY 필수**: LAG/LEAD는 ORDER BY 없이 사용 불가",
        "**NULL 대체**: 이전 행이 없을 때 0으로 바꾸려면 LAG(SAL, 1, 0) 형태로 세 번째 인수 지정"
      ],
      wrong: [
        "1. (정답) 파티션 첫 행 NULL, 두 번째 행은 첫 행의 SAL.",
        "2. LAG의 기본값 세 번째 인수를 지정하지 않으면 NULL이지 0이 아니다.",
        "3. CLARK은 이전 행(MILLER)이 있으므로 NULL이 아니라 1300이다.",
        "4. 오름차순이므로 다음 행이 아니라 이전 행 값을 가져온다. 내림차순을 착각한 경우다."
      ],
      tip: "LAG = 이전 행. 파티션의 첫 행은 이전이 없으므로 항상 NULL(기본값 미지정 시)."
    }
  },

  {
    id: 456,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 KING의 NEXT_SAL 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — SAL 오름차순]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["SMITH",   "800"],
          ["JAMES",   "950"],
          ["MARTIN", "1250"],
          ["WARD",   "1250"],
          ["MILLER", "1300"],
          ["ALLEN",  "1600"],
          ["CLARK",  "2450"],
          ["BLAKE",  "2850"],
          ["JONES",  "2975"],
          ["KING",   "5000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       LEAD(SAL, 1, 0) OVER(ORDER BY SAL) AS NEXT_SAL\nFROM emp_win\nORDER BY SAL;"
      }
    ],
    choices: [
      "NULL",
      "0",
      "2975",
      "5000"
    ],
    ans: 2,
    src: "자료3 p.70~71",
    exp: {
      reason: "LEAD(SAL, 1, 0)은 다음 행의 SAL을 가져오되 다음 행이 없으면 세 번째 인수 0을 반환한다. KING은 SAL 오름차순 정렬의 마지막 행이므로 다음 행이 없어 기본값 0이 반환된다. PostgreSQL 검증 완료. (자료3 p.70~71)",
      terms: [
        "**LEAD(컬럼, N, 기본값)**: 현재 행에서 N번째 이후 행의 값을 반환. 이후 행이 없으면 세 번째 인수 반환",
        "**기본값 인수**: 세 번째 인수를 생략하면 NULL, 명시하면 해당 값으로 대체",
        "**LAG vs LEAD**: LAG = 이전(뒤를 본 것), LEAD = 이후(앞을 본 것)",
        "**SQL Server**: LAG/LEAD 미지원 (자료3 p.70)"
      ],
      wrong: [
        "1. 세 번째 인수 0을 명시했으므로 NULL이 아닌 0이 반환된다.",
        "2. (정답) 마지막 행이므로 기본값 0 반환.",
        "3. 2975는 KING 바로 이전 행(JONES)의 SAL — LAG 결과와 혼동한 경우.",
        "4. 5000은 KING 자신의 SAL. LEAD는 이후 행을 가져온다."
      ],
      tip: "LEAD 마지막 행 → 이후 행 없음 → 세 번째 인수가 반환값. 미지정 시 NULL, 0 지정 시 0."
    }
  },

  // ============================================================
  // 토픽 124: FIRST_VALUE / LAST_VALUE (Q457~Q460) — 4문항
  // ============================================================
  {
    id: 457,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 CLARK 행의 FV_SAL 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — DEPTNO=10]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["MILLER", "10", "1300"],
          ["CLARK",  "10", "2450"],
          ["KING",   "10", "5000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO, SAL,\n       FIRST_VALUE(SAL) OVER(PARTITION BY DEPTNO\n                             ORDER BY SAL) AS FV_SAL\nFROM emp_win\nWHERE DEPTNO = 10\nORDER BY SAL;"
      }
    ],
    choices: [
      "2450",
      "5000",
      "1300",
      "NULL"
    ],
    ans: 3,
    src: "자료3 p.71~72",
    exp: {
      reason: "FIRST_VALUE(SAL) OVER(PARTITION BY DEPTNO ORDER BY SAL)은 파티션(DEPTNO=10) 내에서 SAL 오름차순으로 첫 번째 행의 SAL을 반환한다. DEPTNO=10에서 SAL 최솟값은 MILLER의 1300이므로 CLARK을 포함한 모든 행의 FV_SAL은 1300이다. PostgreSQL 검증 완료. (자료3 p.71~72)",
      terms: [
        "**FIRST_VALUE(컬럼)**: ORDER BY 순서 기준 윈도우 내 첫 번째 행의 값 반환",
        "**활용**: FIRST_VALUE(SAL) ORDER BY SAL ASC → 파티션 최솟값, ORDER BY SAL DESC → 최댓값",
        "**SQL Server**: FIRST_VALUE/LAST_VALUE 미지원 (자료3 p.71)",
        "**PARTITION BY 생략**: 전체 데이터를 하나의 파티션으로 처리"
      ],
      wrong: [
        "1. 2450은 CLARK 자신의 SAL. FIRST_VALUE는 첫 행을 가져온다.",
        "2. 5000은 ORDER BY SAL DESC일 때의 첫 값. 오름차순과 내림차순 혼동.",
        "3. (정답) SAL 오름차순 첫 행 MILLER의 1300.",
        "4. FIRST_VALUE는 항상 유효한 값을 반환하며 NULL이 아니다."
      ],
      tip: "FIRST_VALUE = ORDER BY 기준 첫 번째 행. ASC면 최솟값, DESC면 최댓값과 같다."
    }
  },

  {
    id: 458,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 두 SQL의 MILLER 행 결과 (V1, V2) 조합으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — DEPTNO=10, SAL 오름차순]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["MILLER", "10", "1300"],
          ["CLARK",  "10", "2450"],
          ["KING",   "10", "5000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- V1: 범위 미지정\nSELECT ENAME, SAL,\n       LAST_VALUE(SAL) OVER(PARTITION BY DEPTNO\n                            ORDER BY SAL) AS V1\nFROM emp_win WHERE DEPTNO = 10;\n\n-- V2: 전체 범위 명시\nSELECT ENAME, SAL,\n       LAST_VALUE(SAL) OVER(PARTITION BY DEPTNO\n                            ORDER BY SAL\n                            ROWS BETWEEN UNBOUNDED PRECEDING\n                                 AND UNBOUNDED FOLLOWING) AS V2\nFROM emp_win WHERE DEPTNO = 10;"
      }
    ],
    choices: [
      "(V1=1300, V2=5000)",
      "(V1=5000, V2=5000)",
      "(V1=1300, V2=1300)",
      "(V1=5000, V2=1300)"
    ],
    ans: 1,
    src: "자료3 p.71~72",
    exp: {
      reason: "LAST_VALUE의 기본 범위는 RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW로, MILLER(첫 행) 시점에는 윈도우가 MILLER 자신까지만 포함되어 V1=1300이 반환된다. ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING으로 전체 파티션을 지정하면 마지막 행인 KING(5000)이 반환되어 V2=5000이다. PostgreSQL 검증 완료. (자료3 p.71~72)",
      terms: [
        "**LAST_VALUE 기본 범위**: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW — 현재 행까지만",
        "**함정**: 범위 미지정 시 각 행마다 윈도우 끝이 그 행에서 멈춤 → 마지막이 아닌 현재 행 값 반환",
        "**올바른 마지막 값**: ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING 명시 필요",
        "**FIRST_VALUE**: 기본 범위여도 첫 값이 항상 포함되므로 문제 없음"
      ],
      wrong: [
        "1. (정답) 범위 미지정이면 현재 행이 끝이므로 V1=1300, 전체 범위면 V2=5000.",
        "2. V1이 5000이 되려면 전체 범위를 명시해야 한다.",
        "3. V2는 전체 범위를 명시했으므로 파티션 마지막 값 5000이 반환된다.",
        "4. V1과 V2를 반대로 본 경우."
      ],
      tip: "LAST_VALUE는 범위 지정이 핵심. 기본 범위 = 현재 행까지 → 의도한 마지막 값이 아님."
    }
  },

  {
    id: 459,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 CLARK 행의 (MIN_SAL, MAX_SAL) 값 조합으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — DEPTNO=10]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["MILLER", "10", "1300"],
          ["CLARK",  "10", "2450"],
          ["KING",   "10", "5000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO, SAL,\n       FIRST_VALUE(SAL) OVER(PARTITION BY DEPTNO\n                             ORDER BY SAL ASC)  AS MIN_SAL,\n       FIRST_VALUE(SAL) OVER(PARTITION BY DEPTNO\n                             ORDER BY SAL DESC) AS MAX_SAL\nFROM emp_win\nWHERE DEPTNO = 10\nORDER BY SAL;"
      }
    ],
    choices: [
      "(MIN_SAL=1300, MAX_SAL=5000)",
      "(MIN_SAL=2450, MAX_SAL=2450)",
      "(MIN_SAL=1300, MAX_SAL=1300)",
      "(MIN_SAL=5000, MAX_SAL=1300)"
    ],
    ans: 1,
    src: "자료3 p.71~72",
    exp: {
      reason: "FIRST_VALUE(SAL) ORDER BY SAL ASC는 파티션 내 SAL 최솟값인 1300(MILLER)을 모든 행에 반환한다. FIRST_VALUE(SAL) ORDER BY SAL DESC는 내림차순 첫 값인 최댓값 5000(KING)을 모든 행에 반환한다. CLARK 행도 동일하게 (1300, 5000)을 받는다. PostgreSQL 검증 완료. (자료3 p.71~72)",
      terms: [
        "**FIRST_VALUE + ASC**: 파티션 내 최솟값 — 모든 행에 동일 값 반환",
        "**FIRST_VALUE + DESC**: 파티션 내 최댓값 — 모든 행에 동일 값 반환",
        "**활용**: MIN()/MAX() OVER(PARTITION BY ...)와 동일 결과, 그러나 FIRST_VALUE는 ORDER BY 방향으로 제어 가능",
        "**LAST_VALUE + DESC + 전체범위**: 같은 최솟값을 구하는 또 다른 방법"
      ],
      wrong: [
        "1. (정답) ASC 첫 값=최솟값 1300, DESC 첫 값=최댓값 5000.",
        "2. CLARK 자신의 SAL을 반환한다고 착각한 경우.",
        "3. MAX_SAL은 내림차순 첫 값이므로 1300이 아닌 5000이다.",
        "4. ASC/DESC 방향과 MIN/MAX 결과를 반대로 본 경우."
      ],
      tip: "FIRST_VALUE: ASC → 최솟값 / DESC → 최댓값. 두 가지를 동시에 구할 때 자주 사용."
    }
  },

  {
    id: 460,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL에서 MARTIN 행의 LV_DEFAULT와 LV_FULL 값 조합으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — DEPTNO=30, SAL 오름차순]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["JAMES",  "30",  "950"],
          ["MARTIN", "30", "1250"],
          ["WARD",   "30", "1250"],
          ["ALLEN",  "30", "1600"],
          ["BLAKE",  "30", "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       LAST_VALUE(ENAME) OVER(PARTITION BY DEPTNO\n                             ORDER BY SAL\n                             RANGE BETWEEN UNBOUNDED PRECEDING\n                                  AND CURRENT ROW) AS LV_DEFAULT,\n       LAST_VALUE(ENAME) OVER(PARTITION BY DEPTNO\n                             ORDER BY SAL\n                             RANGE BETWEEN UNBOUNDED PRECEDING\n                                  AND UNBOUNDED FOLLOWING) AS LV_FULL\nFROM emp_win\nWHERE DEPTNO = 30\nORDER BY SAL;"
      }
    ],
    choices: [
      "(LV_DEFAULT='WARD', LV_FULL='BLAKE')",
      "(LV_DEFAULT='MARTIN', LV_FULL='BLAKE')",
      "(LV_DEFAULT='BLAKE', LV_FULL='BLAKE')",
      "(LV_DEFAULT='JAMES', LV_FULL='BLAKE')"
    ],
    ans: 1,
    src: "자료3 p.71~72",
    exp: {
      reason: "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW는 현재 행과 같은 ORDER BY 값을 가진 행까지를 범위로 본다. MARTIN(SAL=1250)과 WARD(SAL=1250)는 같은 SAL 값이므로 RANGE에서 함께 처리되어 그 중 마지막인 WARD가 LV_DEFAULT로 반환된다. LV_FULL은 전체 파티션의 마지막인 BLAKE가 반환된다. PostgreSQL 검증 완료. (자료3 p.71~72)",
      terms: [
        "**RANGE CURRENT ROW**: 현재 행과 ORDER BY 값이 같은 모든 행을 포함",
        "**동률 처리 함정**: MARTIN과 WARD의 SAL이 모두 1250이므로 RANGE 기준으로는 두 행이 동일 그룹 → 그 그룹의 LAST_VALUE는 WARD",
        "**ROWS vs RANGE**: ROWS는 물리적 행 위치 기준, RANGE는 ORDER BY 값 기준",
        "**UNBOUNDED FOLLOWING**: 파티션 끝까지 포함 — LV_FULL은 파티션의 절대 마지막 행"
      ],
      wrong: [
        "1. (정답) SAL=1250 동률 그룹의 마지막이 WARD, 전체 파티션 마지막이 BLAKE.",
        "2. LV_DEFAULT가 MARTIN이 되려면 ROWS를 사용하거나 동률이 없어야 한다.",
        "3. LV_DEFAULT가 BLAKE가 되려면 UNBOUNDED FOLLOWING까지 범위를 확장해야 한다.",
        "4. JAMES는 첫 행이므로 FIRST_VALUE 결과다."
      ],
      tip: "RANGE CURRENT ROW는 같은 ORDER BY 값을 가진 모든 행을 포함 — 동률 행이 있으면 함께 처리."
    }
  },

  // ============================================================
  // 토픽 125: NTILE(N) (Q461~Q463) — 3문항
  // ============================================================
  {
    id: 461,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 MILLER의 GRP 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — SAL 오름차순 10개 행]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["SMITH",   "800"],
          ["JAMES",   "950"],
          ["MARTIN", "1250"],
          ["WARD",   "1250"],
          ["MILLER", "1300"],
          ["ALLEN",  "1600"],
          ["CLARK",  "2450"],
          ["BLAKE",  "2850"],
          ["JONES",  "2975"],
          ["KING",   "5000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       NTILE(3) OVER(ORDER BY SAL) AS GRP\nFROM emp_win\nORDER BY SAL;"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "4"
    ],
    ans: 2,
    src: "자료3 p.72",
    exp: {
      reason: "NTILE(3)은 10개 행을 3그룹으로 나눈다. 10 ÷ 3 = 3 나머지 1이므로 앞 그룹이 하나 더 많아 1그룹 4행, 2그룹 3행, 3그룹 3행으로 배분된다. SAL 오름차순으로 1~4번째(SMITH, JAMES, MARTIN, WARD)는 그룹1, 5~7번째(MILLER, ALLEN, CLARK)는 그룹2, 8~10번째(BLAKE, JONES, KING)는 그룹3이다. MILLER는 5번째 행이므로 그룹2다. PostgreSQL 검증 완료. (자료3 p.72)",
      terms: [
        "**NTILE(N)**: 전체 행을 N개 그룹으로 균등 분할, 각 행에 그룹 번호 부여",
        "**불균등 분배 규칙**: 나누어 떨어지지 않으면 앞 그룹에 1씩 더 배분",
        "**10행 NTILE(3)**: 4-3-3 분배 (앞 그룹 4행)",
        "**ORDER BY 필수**: 어떤 행이 어느 그룹에 들어갈지 결정하는 기준"
      ],
      wrong: [
        "1. 1그룹은 1~4번째 행(SMITH, JAMES, MARTIN, WARD). MILLER는 5번째라 포함되지 않는다.",
        "2. (정답) 5번째 행 MILLER는 2그룹.",
        "3. 3그룹은 8~10번째 행(BLAKE, JONES, KING).",
        "4. NTILE(3)은 1~3번 그룹 번호만 부여한다."
      ],
      tip: "NTILE(N) 불균등 분배: 앞 그룹이 더 크다. 10행÷3 → 4-3-3."
    }
  },

  {
    id: 462,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 그룹 번호별 행 수가 올바르게 나열된 것은?",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — 전체 10개 행]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["SMITH",   "800"],
          ["JAMES",   "950"],
          ["MARTIN", "1250"],
          ["WARD",   "1250"],
          ["MILLER", "1300"],
          ["ALLEN",  "1600"],
          ["CLARK",  "2450"],
          ["BLAKE",  "2850"],
          ["JONES",  "2975"],
          ["KING",   "5000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       NTILE(4) OVER(ORDER BY SAL) AS GRP\nFROM emp_win\nORDER BY SAL;"
      }
    ],
    choices: [
      "그룹1: 3행, 그룹2: 3행, 그룹3: 2행, 그룹4: 2행",
      "그룹1: 2행, 그룹2: 3행, 그룹3: 3행, 그룹4: 2행",
      "그룹1: 3행, 그룹2: 3행, 그룹3: 3행, 그룹4: 1행",
      "그룹1: 2행, 그룹2: 2행, 그룹3: 3행, 그룹4: 3행"
    ],
    ans: 1,
    src: "자료3 p.72",
    exp: {
      reason: "NTILE(4)로 10행을 4그룹으로 나누면 10 ÷ 4 = 2 나머지 2다. 나머지 2개를 앞 그룹에 먼저 배분하므로 그룹1과 그룹2가 각 3행, 그룹3과 그룹4가 각 2행이 된다. 1그룹: SMITH, JAMES, MARTIN / 2그룹: WARD, MILLER, ALLEN / 3그룹: CLARK, BLAKE / 4그룹: JONES, KING. PostgreSQL 검증 완료. (자료3 p.72)",
      terms: [
        "**NTILE 분배 공식**: 기본 크기 = N행 ÷ 그룹 수, 나머지 = 앞 그룹부터 1씩 추가",
        "**10행 NTILE(4)**: 기본 2행씩, 나머지 2 → 앞 2그룹이 3행, 뒷 2그룹이 2행",
        "**앞 그룹 우선 배분**: 항상 번호가 낮은 그룹이 먼저 채워짐",
        "**활용**: 상위/하위 N% 분류, 데이터 분위 구분"
      ],
      wrong: [
        "1. (정답) 앞 두 그룹 3행, 뒷 두 그룹 2행.",
        "2. 나머지가 앞 그룹부터 채워지므로 2그룹이 아니라 1그룹부터 더 크다.",
        "3. 10행을 4그룹으로 나누면 3-3-3-1이 아니라 3-3-2-2다.",
        "4. 뒷 그룹이 더 크다면 NTILE의 분배 규칙에 반한다."
      ],
      tip: "NTILE 분배: 앞 그룹이 크다. 나머지 개수만큼 앞에서부터 1씩 더."
    }
  },

  {
    id: 463,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 DEPTNO=30의 JAMES 행 GRP 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — DEPTNO=30, SAL 오름차순]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["JAMES",  "30",  "950"],
          ["MARTIN", "30", "1250"],
          ["WARD",   "30", "1250"],
          ["ALLEN",  "30", "1600"],
          ["BLAKE",  "30", "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO, SAL,\n       NTILE(2) OVER(PARTITION BY DEPTNO ORDER BY SAL) AS GRP\nFROM emp_win\nWHERE DEPTNO = 30\nORDER BY SAL;"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "NULL"
    ],
    ans: 1,
    src: "자료3 p.72",
    exp: {
      reason: "NTILE(2) OVER(PARTITION BY DEPTNO ORDER BY SAL)은 부서별로 2그룹으로 나눈다. DEPTNO=30에는 5개 행이 있으므로 5 ÷ 2 = 2 나머지 1이 되어 1그룹 3행, 2그룹 2행으로 분배된다. SAL 오름차순으로 JAMES(950), MARTIN(1250), WARD(1250)가 1그룹, ALLEN(1600), BLAKE(2850)가 2그룹이므로 JAMES의 GRP는 1이다. PostgreSQL 검증 완료. (자료3 p.72)",
      terms: [
        "**PARTITION BY + NTILE**: 파티션별로 독립적으로 N등분",
        "**5행 NTILE(2)**: 5 ÷ 2 = 2 나머지 1 → 3-2 분배",
        "**파티션 독립**: DEPTNO=10(3행), DEPTNO=20(2행)은 각자 2등분, DEPTNO=30(5행)은 3-2 분배",
        "**ORDER BY 기준**: SAL 오름차순이므로 낮은 급여가 1그룹"
      ],
      wrong: [
        "1. (정답) JAMES는 DEPTNO=30 SAL 오름차순 첫 행으로 1그룹.",
        "2. JAMES가 2그룹이 되려면 하위 그룹(더 큰 SAL)에 속해야 하는데, JAMES는 최솟값이다.",
        "3. NTILE(2)는 그룹 번호 1과 2만 생성하며 3은 없다.",
        "4. NTILE은 NULL을 반환하지 않는다."
      ],
      tip: "NTILE은 파티션별 독립 분배. 5행 ÷ 2그룹 = 3행 + 2행. 앞 그룹이 먼저 채워진다."
    }
  },

  // ============================================================
  // 토픽 126: RATIO_TO_REPORT / PERCENT_RANK / CUME_DIST (Q464~Q470) — 7문항
  // ============================================================
  {
    id: 464,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 DEPTNO=10의 KING 행 PR 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — DEPTNO=10, SAL 내림차순]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["KING",   "10", "5000"],
          ["CLARK",  "10", "2450"],
          ["MILLER", "10", "1300"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DEPTNO, ENAME, SAL,\n       PERCENT_RANK() OVER(PARTITION BY DEPTNO\n                           ORDER BY SAL DESC) AS PR\nFROM emp_win\nWHERE DEPTNO = 10\nORDER BY SAL DESC;"
      }
    ],
    choices: [
      "0",
      "0.5",
      "1",
      "0.33"
    ],
    ans: 1,
    src: "자료3 p.73",
    exp: {
      reason: "PERCENT_RANK()는 (순위 - 1) / (전체 행 수 - 1) 공식으로 계산한다. SAL 내림차순에서 KING은 1순위이므로 (1 - 1) / (3 - 1) = 0 / 2 = 0이다. PERCENT_RANK는 제일 먼저 나오는 것이 0(상위 0%), 제일 늦게 나오는 것이 1이다. PostgreSQL 검증 완료. (자료3 p.73)",
      terms: [
        "**PERCENT_RANK() 공식**: (해당 행의 RANK - 1) / (파티션 전체 행 수 - 1)",
        "**첫 번째 행**: 항상 0 (최상위)",
        "**마지막 행**: 항상 1 (최하위)",
        "**ORDER BY 필수**: 어떤 기준으로 백분위를 구할지 반드시 명시",
        "**SQL Server 미지원**: 자료3 p.73"
      ],
      wrong: [
        "1. (정답) 1순위이므로 (1-1)/(3-1)=0.",
        "2. 0.5는 2순위 CLARK의 PERCENT_RANK = (2-1)/(3-1) = 0.5.",
        "3. 1은 3순위 MILLER의 PERCENT_RANK = (3-1)/(3-1) = 1.",
        "4. 0.33은 1/3 계산이며 PERCENT_RANK 공식에 해당하지 않는 값이다."
      ],
      tip: "PERCENT_RANK 첫 행 = 0, 마지막 행 = 1. 공식: (순위-1)/(N-1)."
    }
  },

  {
    id: 465,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL에서 MARTIN과 WARD의 PR 값으로 옳은 것은? (SAL=1250으로 동일)",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — SAL 오름차순 전체]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["SMITH",   "800"],
          ["JAMES",   "950"],
          ["MARTIN", "1250"],
          ["WARD",   "1250"],
          ["MILLER", "1300"],
          ["ALLEN",  "1600"],
          ["CLARK",  "2450"],
          ["BLAKE",  "2850"],
          ["JONES",  "2975"],
          ["KING",   "5000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       PERCENT_RANK() OVER(ORDER BY SAL) AS PR\nFROM emp_win\nORDER BY SAL;"
      }
    ],
    choices: [
      "MARTIN=0.2222, WARD=0.2222",
      "MARTIN=0.2222, WARD=0.3333",
      "MARTIN=0.3333, WARD=0.3333",
      "MARTIN=0.2222, WARD=0.4444"
    ],
    ans: 1,
    src: "자료3 p.73",
    exp: {
      reason: "PERCENT_RANK는 동일 값에 동일 순위를 부여하므로, SAL=1250인 MARTIN과 WARD는 둘 다 3순위(RANK 방식)를 받는다. 공식 적용: (3 - 1) / (10 - 1) = 2 / 9 ≈ 0.2222. 두 행이 같은 SAL이면 같은 PR 값을 가진다. PostgreSQL 검증 완료. (자료3 p.73)",
      terms: [
        "**동률 처리**: 동일 ORDER BY 값 → 동일 PERCENT_RANK",
        "**PERCENT_RANK 계산**: 3번째 고유 순위 → (3-1)/(10-1) = 2/9 ≈ 0.2222",
        "**RANK와의 관계**: PERCENT_RANK의 순위는 RANK 함수 방식(동률 건너뜀)을 따름",
        "**다음 고유 순위**: MILLER(1300)는 5번째 행이지만 PR 분모는 여전히 9 → (5-1)/9 = 0.4444"
      ],
      wrong: [
        "1. (정답) 동률은 같은 PR. (3-1)/(10-1)=0.2222.",
        "2. WARD가 다음 순위를 받는다면 PERCENT_RANK가 아닌 ROW_NUMBER 방식이다.",
        "3. 0.3333은 (4-1)/9를 잘못 계산한 값이다.",
        "4. WARD가 0.4444가 되려면 WARD를 5번째 순위로 보는 것인데, 동률은 같은 순위를 받는다."
      ],
      tip: "PERCENT_RANK 동률 = 동일 값. SAL이 같으면 같은 PR. 공식은 RANK 방식 순위 기반."
    }
  },

  {
    id: 466,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 DEPTNO=10의 KING 행 CD 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — DEPTNO=10, SAL 내림차순]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["KING",   "10", "5000"],
          ["CLARK",  "10", "2450"],
          ["MILLER", "10", "1300"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DEPTNO, ENAME, SAL,\n       CUME_DIST() OVER(PARTITION BY DEPTNO\n                        ORDER BY SAL DESC) AS CD\nFROM emp_win\nWHERE DEPTNO = 10\nORDER BY SAL DESC;"
      }
    ],
    choices: [
      "0",
      "0.3333",
      "0.6667",
      "1"
    ],
    ans: 2,
    src: "자료3 p.73~74",
    exp: {
      reason: "CUME_DIST()는 파티션 내에서 현재 행보다 작거나 같은 ORDER BY 값을 가진 행 수 / 전체 행 수로 계산한다. SAL 내림차순에서 KING(5000)은 현재 행 이하(SAL ≥ 5000) 행이 KING 자신 1개이므로 1/3 ≈ 0.3333이다. PostgreSQL 검증 완료. (자료3 p.73~74)",
      terms: [
        "**CUME_DIST() 공식**: 현재 행보다 작거나 같은 값의 행 수 / 전체 파티션 행 수",
        "**첫 번째 행**: 0이 될 수 없음 — 최솟값은 1/N",
        "**마지막 행**: 항상 1 (모든 행이 현재 행 이하)",
        "**PERCENT_RANK와 차이**: PERCENT_RANK 첫 행=0 가능, CUME_DIST 첫 행 최솟값=1/N",
        "**ORDER BY 필수**: 누적 비율의 기준을 결정"
      ],
      wrong: [
        "1. 0은 CUME_DIST가 아닌 PERCENT_RANK의 첫 번째 행 값이다.",
        "2. (정답) 1/3 ≈ 0.3333.",
        "3. 0.6667은 2/3으로 CLARK의 CUME_DIST 값이다.",
        "4. 1은 MILLER의 CUME_DIST 값(마지막 행)이다."
      ],
      tip: "CUME_DIST 첫 행 = 1/N (0이 될 수 없음). PERCENT_RANK 첫 행 = 0 (차이 주의)."
    }
  },

  {
    id: 467,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL에서 SAL이 동일한 MARTIN과 WARD의 CD 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[emp_win — SAL 오름차순 전체 10개 행]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["SMITH",   "800"],
          ["JAMES",   "950"],
          ["MARTIN", "1250"],
          ["WARD",   "1250"],
          ["MILLER", "1300"],
          ["ALLEN",  "1600"],
          ["CLARK",  "2450"],
          ["BLAKE",  "2850"],
          ["JONES",  "2975"],
          ["KING",   "5000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       CUME_DIST() OVER(ORDER BY SAL) AS CD\nFROM emp_win\nORDER BY SAL;"
      }
    ],
    choices: [
      "MARTIN=0.4, WARD=0.4",
      "MARTIN=0.3, WARD=0.4",
      "MARTIN=0.4, WARD=0.5",
      "MARTIN=0.3, WARD=0.3"
    ],
    ans: 1,
    src: "자료3 p.73~74",
    exp: {
      reason: "CUME_DIST는 현재 행보다 작거나 같은 값의 행 수 / 전체 행 수로 계산한다. SAL=1250인 행은 MARTIN, WARD 두 명으로 4번째 행까지 해당되므로 4/10 = 0.4다. 동률이면 두 행 모두 같은 CUME_DIST 값을 가진다. PostgreSQL 검증 완료. (자료3 p.73~74)",
      terms: [
        "**CUME_DIST 동률 처리**: 같은 ORDER BY 값 → 같은 CUME_DIST (더 큰 값 기준으로 통일)",
        "**SAL≤1250인 행 수**: SMITH(800), JAMES(950), MARTIN(1250), WARD(1250) = 4행 → 4/10=0.4",
        "**단계 함수 특성**: 동률 그룹 안에서는 같은 값, 다음 고유값에서 점프",
        "**자료3 p.74 예시**: MARTIN, WARD 모두 0.4 (4/5 지점) 확인"
      ],
      wrong: [
        "1. (정답) 동률은 같은 CUME_DIST. 4/10=0.4.",
        "2. CUME_DIST는 동률 중 낮은 값을 주지 않는다. 항상 그 그룹의 최대 누적 위치 기준.",
        "3. WARD가 0.5가 되려면 SAL≤1250이 5개여야 하는데 4개뿐이다.",
        "4. 0.3은 3/10으로 JAMES(950)의 CUME_DIST다."
      ],
      tip: "CUME_DIST 동률 = 같은 값(더 큰 누적 위치 기준). MARTIN=WARD=0.4."
    }
  },

  {
    id: 468,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: false,
    q: "다음 중 Oracle의 RATIO_TO_REPORT 함수에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "파티션 내 전체 SUM(컬럼) 값에 대한 행별 컬럼 값의 비율을 반환한다.",
      "결과값의 범위는 0 초과 1 이하(0 < 결과 ≤ 1)이다.",
      "ORDER BY 절을 사용하여 누적 비율을 구하는 순서를 정할 수 있다.",
      "PARTITION BY를 명시하지 않으면 데이터 전체 총계에 대한 비율을 반환한다."
    ],
    ans: 3,
    src: "자료3 p.73",
    exp: {
      reason: "자료3 p.73에 'ORDER BY 사용 불가'로 명시되어 있다. RATIO_TO_REPORT는 누적 비율이 아닌 각 행의 단순 비율(행 값 / 전체 합)을 구하므로 ORDER BY가 의미 없고 지원되지 않는다. CUME_DIST와 PERCENT_RANK는 ORDER BY가 필수지만 RATIO_TO_REPORT는 ORDER BY 사용 불가다. (자료3 p.73)",
      terms: [
        "**RATIO_TO_REPORT(컬럼) OVER([PARTITION BY 컬럼])**: 파티션 합 대비 각 행 값의 비율",
        "**공식**: 행 값 / SUM(행 값) OVER(PARTITION BY ...) — PostgreSQL 등가 표현",
        "**ORDER BY 불가**: 비율은 정렬과 무관한 단순 나눗셈이므로 ORDER BY 미지원",
        "**Oracle 전용**: SQL Server, PostgreSQL 미지원. PostgreSQL에서는 sal/SUM(sal) OVER()로 동치 처리",
        "**값 범위**: 합이 양수라면 0 < 비율 ≤ 1 (합계 = 1이 됨)"
      ],
      wrong: [
        "1. 자료3 p.73의 정의 그대로다.",
        "2. 모든 행 값의 비율 합이 1이므로 각 행은 0 초과 1 이하다.",
        "3. (정답) RATIO_TO_REPORT는 ORDER BY 사용 불가다. (자료3 p.73 명시)",
        "4. 자료3 p.73에 PARTITION BY 생략 시 전체 데이터 비율로 명시되어 있다."
      ],
      tip: "RATIO_TO_REPORT = ORDER BY 불가. 비율은 정렬 순서와 무관한 단순 합 대비 비율."
    }
  },

  {
    id: 469,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: false,
    q: "다음 중 PERCENT_RANK와 CUME_DIST의 비교에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "두 함수 모두 ORDER BY 절이 필수이며, 결과값은 0 이상 1 이하다.",
      "PERCENT_RANK는 ORDER BY 기준 가장 먼저 나오는 행의 값이 0이고, CUME_DIST는 0이 될 수 없다.",
      "동일 ORDER BY 값을 가진 행(동률)이 있을 때 두 함수 모두 그 행들에게 같은 값을 부여한다.",
      "PERCENT_RANK는 누적 백분율이고, CUME_DIST는 분위수(PERCENTILE)를 반환한다."
    ],
    ans: 4,
    src: "자료3 p.73",
    exp: {
      reason: "자료3 p.73에 PERCENT_RANK는 '분위수(PERCENTILE)를 출력'하고, CUME_DIST는 '각 행의 수에 대한 누적 비율'이라고 설명한다. 즉 PERCENT_RANK가 분위수, CUME_DIST가 누적 비율이다. 4번 보기는 이를 반대로 서술하여 틀렸다. (자료3 p.73)",
      terms: [
        "**PERCENT_RANK**: 분위수(PERCENTILE) — (순위-1)/(N-1). 값이 아닌 행의 순서별 백분율",
        "**CUME_DIST**: 누적 비율 — 현재 이하 행 수/전체 행 수. '현재 행까지 몇 %'",
        "**첫 행 차이**: PERCENT_RANK 첫 행=0 가능, CUME_DIST 첫 행=1/N(0 불가)",
        "**공통**: ORDER BY 필수, 결과 0~1 범위, 동률 시 같은 값 부여"
      ],
      wrong: [
        "1. 두 함수 모두 ORDER BY 필수, 결과는 0~1이다.",
        "2. PERCENT_RANK 첫 행=0, CUME_DIST 첫 행=1/N(최소값>0)이다.",
        "3. 동률 시 두 함수 모두 같은 값 부여한다. (자료3 p.73~74 예시 확인)",
        "4. (정답) PERCENT_RANK=분위수, CUME_DIST=누적 비율이다. 4번은 뒤바꿔 설명하고 있다."
      ],
      tip: "PERCENT_RANK = 분위수(행 순서 기반) / CUME_DIST = 누적 비율(값 기반 누적)."
    }
  },

  {
    id: 470,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL에서 DEPTNO=30의 WARD 행 (RATIO_RPT, PCT_RNK, CUM_DST) 값 조합으로 옳은 것은? (RATIO_RPT는 RATIO_TO_REPORT 등가 SQL 사용)",
    blocks: [
      {
        type: "table",
        title: "[emp_win 테이블 — DEPTNO=30, SAL 내림차순]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["BLAKE",  "30", "2850"],
          ["ALLEN",  "30", "1600"],
          ["WARD",   "30", "1250"],
          ["MARTIN", "30", "1250"],
          ["JAMES",  "30",  "950"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       ROUND(SAL * 1.0 / SUM(SAL) OVER(PARTITION BY DEPTNO), 2)\n                                        AS RATIO_RPT,\n       PERCENT_RANK() OVER(PARTITION BY DEPTNO\n                           ORDER BY SAL DESC)  AS PCT_RNK,\n       CUME_DIST()    OVER(PARTITION BY DEPTNO\n                           ORDER BY SAL DESC)  AS CUM_DST\nFROM emp_win\nWHERE DEPTNO = 30\nORDER BY SAL DESC;"
      }
    ],
    choices: [
      "(RATIO_RPT=0.16, PCT_RNK=0.5, CUM_DST=0.8)",
      "(RATIO_RPT=0.16, PCT_RNK=0.25, CUM_DST=0.4)",
      "(RATIO_RPT=0.20, PCT_RNK=0.5, CUM_DST=0.8)",
      "(RATIO_RPT=0.16, PCT_RNK=0.75, CUM_DST=0.8)"
    ],
    ans: 1,
    src: "자료3 p.73~74",
    exp: {
      reason: "DEPTNO=30의 SAL 합계 = 2850+1600+1250+1250+950 = 7900. WARD의 RATIO_RPT = 1250/7900 ≈ 0.16. SAL 내림차순에서 WARD(1250)와 MARTIN(1250)은 동률로 3순위 → PCT_RNK = (3-1)/(5-1) = 2/4 = 0.5. CUME_DIST는 SAL≥1250인 행 수(BLAKE, ALLEN, WARD, MARTIN=4행)/5 = 4/5 = 0.8. PostgreSQL 검증 완료. (자료3 p.73~74)",
      terms: [
        "**RATIO_RPT(등가)**: 1250/7900 = 0.158... → ROUND(..., 2) = 0.16",
        "**PCT_RNK 동률**: WARD=MARTIN=SAL 1250, 둘 다 3순위 → (3-1)/(5-1)=0.5",
        "**CUM_DST**: SAL DESC 기준 SAL≥1250인 행(BLAKE, ALLEN, WARD, MARTIN) = 4개 → 4/5=0.8",
        "**세 함수 비교**: RATIO_RPT은 합 대비 단순 비율, PCT_RNK은 순서 백분위, CUM_DST는 누적 비율"
      ],
      wrong: [
        "1. (정답) 각 공식 계산 결과 0.16 / 0.5 / 0.8.",
        "2. PCT_RNK=0.25는 (2-1)/(4)로 2순위를 가정한 경우 — WARD는 MARTIN과 동률 3순위다.",
        "3. RATIO_RPT=0.20은 1600/7900(ALLEN)의 비율. WARD는 1250/7900=0.16이다.",
        "4. PCT_RNK=0.75는 (4-1)/(4)로 4순위를 가정한 경우 — 동률 처리를 누락한 오류다."
      ],
      tip: "세 함수 동시 계산: RATIO=단순 비율 / PCT_RNK=(순위-1)/(N-1) / CUM_DST=누적 행 수/N."
    }
  }

];

module.exports = j2Part2;

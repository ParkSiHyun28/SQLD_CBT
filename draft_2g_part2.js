// 2-G Part 2: Q315~Q328 (단일행 서브쿼리 + 다중행 IN/ANY/ALL + NOT IN NULL 함정)
// 자료3 p.55~57, TRAPS T-03 기반. 정답은 자료에 명시된 내용만 사용.
// PostgreSQL 검증: sqld_verify DB에서 직접 실행해 확정.
// 공통 데이터셋 (T_E):
//   (1,'KIM',3000,10) (2,'LEE',2500,10) (3,'PARK',2000,20)
//   (4,'CHOI',2000,20) (5,'JUNG',1500,30)
const g2Part2 = [
  // ============================================================
  // 토픽 103: 단일행 서브쿼리 (Q315~Q318) — 4문항
  // ============================================================
  {
    id: 315,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 나오는 사원 이름(ENAME)을 모두 고른 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, 30]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL\nFROM EMP\nWHERE SAL > (SELECT AVG(SAL) FROM EMP);"
      }
    ],
    choices: [
      "KIM",
      "KIM, LEE",
      "KIM, LEE, PARK",
      "LEE, PARK, CHOI"
    ],
    ans: 2,
    src: "자료3 p.55~56",
    exp: {
      reason: "AVG(SAL) = (3000+2500+2000+2000+1500)/5 = 2200. SAL > 2200을 만족하는 행은 KIM(3000), LEE(2500) 두 명. 서브쿼리가 단일 값(2200)을 반환하므로 단일행 비교 연산자 '>'가 정상 동작. PostgreSQL 검증 완료. (자료3 p.55~56)",
      terms: [
        "**단일행 서브쿼리**: 결과가 1개의 행(1행 1열)으로 반환되는 서브쿼리",
        "**단일행 비교 연산자**: =, <>, >, >=, <, <=",
        "**처리 흐름**: 서브쿼리 1회 실행하여 단일 값 도출 → 메인쿼리 WHERE 조건 비교",
        "**AVG 계산**: SUM ÷ COUNT (NULL 제외, 여기서는 NULL 없음)"
      ],
      wrong: [
        "1. AVG를 잘못 계산해 2500 이상만 본 경우.",
        "2. (정답)",
        "3. PARK(2000)을 평균 이상으로 본 경우. 2200 > 2000이라 PARK는 제외.",
        "4. KIM이 빠진 잘못된 묶음."
      ],
      tip: "단일행 서브쿼리는 =, >, < 등 단일행 비교 연산자만 사용. AVG는 NULL 빼고 계산."
    }
  },
  {
    id: 316,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 나오는 사원 이름(ENAME)을 모두 고른 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, 30]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME\nFROM EMP\nWHERE DEPTNO = (SELECT DEPTNO FROM EMP WHERE ENAME = 'PARK');"
      }
    ],
    choices: [
      "PARK",
      "PARK, CHOI",
      "KIM, LEE",
      "PARK, CHOI, JUNG"
    ],
    ans: 2,
    src: "자료3 p.56",
    exp: {
      reason: "서브쿼리는 PARK의 DEPTNO를 반환하여 20. 메인쿼리는 DEPTNO=20 사원 → PARK, CHOI 2명. PostgreSQL 검증 완료. (자료3 p.56)",
      terms: [
        "**단일행 서브쿼리 활용 패턴**: '특정 사원과 같은 부서/같은 직무' 검색에 자주 사용",
        "**서브쿼리 결과**: PARK가 한 명이라 DEPTNO 단일값(20) 반환",
        "**메인쿼리 자기 자신 포함**: PARK도 결과에 포함됨 (제외하려면 ENAME <> 'PARK' 추가)",
        "**주의**: ENAME='PARK'가 두 명이면 다중행 오류 발생"
      ],
      wrong: [
        "1. 서브쿼리 결과 자기 자신(PARK)을 제외해야 한다고 본 경우. = 비교는 자기 자신도 포함.",
        "2. (정답)",
        "3. DEPTNO를 10(서브쿼리 결과 잘못 본 경우)으로 본 경우.",
        "4. JUNG(DEPTNO=30)을 잘못 포함."
      ],
      tip: "단일행 서브쿼리는 'X와 같은 ~' 검색의 표준 패턴. 자기 자신도 결과에 포함."
    }
  },
  {
    id: 317,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL을 실행했을 때 발생하는 결과로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, 30]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL\nFROM EMP\nWHERE SAL = (SELECT SAL FROM EMP WHERE DEPTNO = 20);"
      }
    ],
    choices: [
      "PARK, CHOI 두 행이 정상 반환된다.",
      "DEPTNO=20인 모든 사원 정보가 반환된다.",
      "서브쿼리가 2개 이상의 행을 반환하므로 오류가 발생한다.",
      "결과는 0건이며 오류 없이 정상 종료된다."
    ],
    ans: 3,
    src: "자료3 p.55~56",
    exp: {
      reason: "DEPTNO=20인 사원 SAL은 PARK(2000), CHOI(2000)의 두 행이다. 단일행 비교 연산자 '='에 다중행 결과를 전달하면 오류가 발생한다. Oracle은 'ORA-01427: single-row subquery returns more than one row', PostgreSQL은 'more than one row returned by a subquery used as an expression' 메시지를 반환한다. PostgreSQL 검증 완료. (자료3 p.55~56)",
      terms: [
        "**단일행 비교 연산자**: =, <>, >, >=, <, <= — 서브쿼리 결과가 반드시 1행이어야 함",
        "**오류 조건**: 서브쿼리가 2행 이상 반환하면 런타임 오류",
        "**해결 방법**: IN/ANY/ALL 같은 다중행 비교 연산자 사용",
        "**값이 동일해 보여도**: SAL 2000이 두 행이면 '값이 같음'이 아닌 '행이 2개'로 판정"
      ],
      wrong: [
        "1. 동일 값이라도 행이 2개면 단일행 연산자가 받지 못함.",
        "2. 결과가 어떻든 실행 자체가 실패.",
        "3. (정답)",
        "4. 빈 결과가 아니라 오류로 종료됨."
      ],
      tip: "단일행 비교 연산자(=, >)에는 1행만. 다중 행이면 IN/ANY/ALL로 바꿔야 함."
    }
  },
  {
    id: 318,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "하",
    has_code: false,
    q: "다음 중 단일행 서브쿼리(Single-Row Subquery)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "서브쿼리의 결과가 항상 1개의 행으로 반환되어야 한다.",
      "비교 연산자로 =, <>, >, >=, <, <=를 사용할 수 있다.",
      "서브쿼리의 결과가 2건 이상이면 오류가 발생한다.",
      "IN, ANY, ALL 등 다중행 비교 연산자를 반드시 사용해야 한다."
    ],
    ans: 4,
    src: "자료3 p.55~56",
    exp: {
      reason: "단일행 서브쿼리는 결과가 1행이므로 단일행 비교 연산자(=, <>, >, >=, <, <=)를 사용한다. IN/ANY/ALL은 다중행 서브쿼리에서 사용하는 연산자이므로 단일행 서브쿼리의 필수 조건이 아니다. (자료3 p.55~56)",
      terms: [
        "**단일행 서브쿼리**: 1행 1열 결과. 단일행 비교 연산자(=, <>, >, >=, <, <=) 사용",
        "**다중행 서브쿼리**: 여러 행 결과. IN, ANY, ALL, EXISTS 등 다중행 비교 연산자 사용",
        "**구분 기준**: 서브쿼리 결과 행 수에 따라 결정",
        "**SQL Server 다중컬럼 IN**: 미지원 (Oracle 전용)"
      ],
      wrong: [
        "1. 단일행 서브쿼리의 정의 그대로다.",
        "2. 자료3 p.56에 명시된 단일행 비교 연산자.",
        "3. 단일행 비교 연산자에 다중 행이 들어오면 오류 발생.",
        "4. (정답) IN/ANY/ALL은 다중행 연산자. 단일행에는 부적절."
      ],
      tip: "단일행 → =, <>, >, >=, <, <= / 다중행 → IN, ANY, ALL, EXISTS."
    }
  },

  // ============================================================
  // 토픽 104: 다중행 서브쿼리 IN/ANY/ALL (Q319~Q324) — 6문항
  // ============================================================
  {
    id: 319,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 나오는 사원 이름(ENAME)을 모두 고른 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, 30]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME\nFROM EMP\nWHERE SAL IN (SELECT SAL FROM EMP WHERE DEPTNO = 20);"
      }
    ],
    choices: [
      "PARK",
      "PARK, CHOI",
      "PARK, CHOI, JUNG",
      "KIM, LEE, PARK, CHOI"
    ],
    ans: 2,
    src: "자료3 p.56",
    exp: {
      reason: "서브쿼리는 DEPTNO=20인 SAL 집합 {2000, 2000} 반환. 메인쿼리는 SAL이 이 집합에 포함된 사원 → SAL=2000인 PARK, CHOI 2명. JUNG(1500)은 집합에 없어 제외. PostgreSQL 검증 완료. (자료3 p.56)",
      terms: [
        "**IN 연산자**: 서브쿼리 결과 집합에 메인쿼리 값이 포함되면 TRUE",
        "**IN과 = ANY 동등**: WHERE SAL IN (..) ≡ WHERE SAL = ANY (..)",
        "**중복 무시**: 서브쿼리 결과에 같은 값이 여러 번 나와도 IN의 판정에는 영향 없음",
        "**정답 외 부서 행도 후보**: 메인쿼리는 모든 부서 사원이 비교 대상"
      ],
      wrong: [
        "1. 메인쿼리에서 PARK 한 명만 본 경우.",
        "2. (정답)",
        "3. DEPTNO=30인 JUNG(1500)을 잘못 포함.",
        "4. DEPTNO=10인 KIM/LEE를 잘못 포함. 집합은 {2000}만."
      ],
      tip: "IN은 '집합에 포함되는가' 검사. = ANY와 동등."
    }
  },
  {
    id: 320,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 반환되는 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, 30]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME\nFROM EMP\nWHERE DEPTNO IN (SELECT DEPTNO FROM EMP WHERE SAL >= 2500);"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "5"
    ],
    ans: 2,
    src: "자료3 p.56",
    exp: {
      reason: "서브쿼리는 SAL>=2500 사원의 DEPTNO 집합 → {10, 10} = 사실상 {10}. 메인쿼리는 DEPTNO IN {10} 사원 → KIM, LEE 2명. PostgreSQL 검증 완료. (자료3 p.56)",
      terms: [
        "**IN의 비교 컬럼**: 메인쿼리 컬럼이 서브쿼리 결과 집합에 들어 있는지 검사",
        "**서브쿼리 결과 중복**: {10, 10} → IN 판정에선 {10}과 동일",
        "**부서 단위 필터**: 'SAL>=2500인 사원이 속한 부서의 모든 사원' 추출 패턴",
        "**자기 자신 포함**: 서브쿼리 조건을 만족한 KIM, LEE도 결과에 포함됨"
      ],
      wrong: [
        "1. KIM 1명만 본 경우. LEE도 DEPTNO=10이라 포함.",
        "2. (정답)",
        "3. PARK까지 포함했다고 본 경우. DEPTNO=20은 집합에 없음.",
        "4. 모든 사원이 통과한다고 본 경우."
      ],
      tip: "IN 서브쿼리는 집합 자체로 본다. 중복은 판정에 영향 없음."
    }
  },
  {
    id: 321,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 나오는 사원 이름(ENAME)을 모두 고른 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, 30]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL\nFROM EMP\nWHERE SAL > ANY (SELECT SAL FROM EMP WHERE DEPTNO = 20);"
      }
    ],
    choices: [
      "KIM",
      "KIM, LEE",
      "KIM, LEE, PARK, CHOI",
      "결과 없음"
    ],
    ans: 2,
    src: "자료3 p.56",
    exp: {
      reason: "서브쿼리 결과 {2000, 2000}의 최솟값은 2000. '> ANY'는 '최솟값보다 크면 TRUE'이므로 SAL > 2000 사원 → KIM(3000), LEE(2500) 2명. PARK/CHOI(2000)는 같은 값이라 제외. PostgreSQL 검증 완료. (자료3 p.56)",
      terms: [
        "**> ANY**: 서브쿼리 결과 중 어느 하나라도 만족 → '최솟값보다 큰' 행을 반환",
        "**ANY = SOME**: 표준 SQL에서 동의어",
        "**같은 값 제외**: SAL = 2000 = 최솟값이라 'SAL > 2000' 조건에선 탈락",
        "**< ANY 대조**: '최댓값보다 작은' 의미"
      ],
      wrong: [
        "1. KIM 한 명만 통과한다고 본 경우 (LEE도 2500 > 2000).",
        "2. (정답)",
        "3. PARK/CHOI(=2000)를 포함한 경우. > ANY는 같은 값을 포함하지 않음.",
        "4. ANY를 ALL처럼 본 경우."
      ],
      tip: "> ANY = MIN보다 큰. < ANY = MAX보다 작은. 같은 값 자체는 포함 안 됨."
    }
  },
  {
    id: 322,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 반환되는 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, 30]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL\nFROM EMP\nWHERE SAL < ANY (SELECT SAL FROM EMP WHERE DEPTNO = 10);"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "4"
    ],
    ans: 4,
    src: "자료3 p.56",
    exp: {
      reason: "서브쿼리는 DEPTNO=10인 SAL = {3000, 2500} 반환. '< ANY'는 '최댓값(3000)보다 작으면 TRUE'. 따라서 SAL < 3000 사원 → LEE(2500), PARK(2000), CHOI(2000), JUNG(1500) 총 4명. PostgreSQL 검증 완료. (자료3 p.56)",
      terms: [
        "**< ANY**: 서브쿼리 결과 중 어느 하나보다 작으면 TRUE → '최댓값보다 작은'",
        "**최댓값 기준 동작**: < ANY는 가장 큰 값과 비교하면 결정",
        "**자기 자신**: KIM(3000)은 같은 값이라 '< 3000' 조건에서 탈락",
        "**ANY 부정형**: NOT (< ANY)는 '모든 값과 같거나 큼' 의미와는 다름 (NULL 처리 주의)"
      ],
      wrong: [
        "1. 가장 작은 사원 1명만 본 경우.",
        "2. < ALL로 잘못 해석한 경우.",
        "3. KIM 제외하고 LEE까지 제외한 경우.",
        "4. (정답)"
      ],
      tip: "< ANY = MAX보다 작은. > ANY = MIN보다 큰. 자료3 p.56 표 그대로."
    }
  },
  {
    id: 323,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 나오는 사원 이름(ENAME)을 모두 고른 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, 30]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL\nFROM EMP\nWHERE SAL > ALL (SELECT SAL FROM EMP WHERE DEPTNO = 20);"
      }
    ],
    choices: [
      "KIM",
      "KIM, LEE",
      "KIM, LEE, JUNG",
      "결과 없음"
    ],
    ans: 2,
    src: "자료3 p.56",
    exp: {
      reason: "서브쿼리 결과 {2000, 2000}의 최댓값은 2000. '> ALL'은 '모든 값보다 커야 TRUE' = '최댓값보다 큰'이므로 SAL > 2000 사원 → KIM(3000), LEE(2500) 2명. JUNG(1500)은 모든 값보다 작아 탈락. PostgreSQL 검증 완료. (자료3 p.56)",
      terms: [
        "**> ALL**: 서브쿼리 결과의 모든 값보다 커야 TRUE → '최댓값보다 큰'",
        "**> ANY와 차이**: > ANY는 최솟값 기준, > ALL은 최댓값 기준",
        "**같은 값 모두 제외**: SAL=2000이면 같음 발생 → ALL 조건 탈락",
        "**빈 서브쿼리**: 결과가 0건이면 > ALL은 항상 TRUE (모든 행 통과)"
      ],
      wrong: [
        "1. KIM 1명만 본 경우 (LEE도 2500>2000).",
        "2. (정답)",
        "3. JUNG(1500)을 잘못 포함. 1500은 2000보다 작음.",
        "4. > ALL을 < ALL처럼 본 경우."
      ],
      tip: "> ALL = MAX보다 큰. < ALL = MIN보다 작은. ANY는 한 명만 만족, ALL은 모두 만족."
    }
  },
  {
    id: 324,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 반환되는 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, 30]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL\nFROM EMP\nWHERE SAL < ALL (SELECT SAL FROM EMP WHERE DEPTNO = 10);"
      }
    ],
    choices: [
      "0",
      "2",
      "3",
      "4"
    ],
    ans: 3,
    src: "자료3 p.56",
    exp: {
      reason: "서브쿼리는 DEPTNO=10 SAL = {3000, 2500}. '< ALL'은 '모든 값보다 작아야 TRUE' = '최솟값(2500)보다 작은'이므로 SAL < 2500 사원 → PARK(2000), CHOI(2000), JUNG(1500) 총 3명. LEE(2500)는 같은 값이라 탈락. PostgreSQL 검증 완료. (자료3 p.56)",
      terms: [
        "**< ALL**: 서브쿼리 결과의 모든 값보다 작아야 TRUE → '최솟값보다 작은'",
        "**< ANY와 차이**: < ANY는 최댓값 기준, < ALL은 최솟값 기준",
        "**경계값**: SAL = 2500(=최솟값)이면 '< 2500' 위반 → 탈람",
        "**대칭 관계**: > ANY/MIN, < ANY/MAX, > ALL/MAX, < ALL/MIN"
      ],
      wrong: [
        "1. < ANY를 < ALL로 본 경우 (모두 탈락한다고 오해).",
        "2. < ANY 결과(LEE 포함, MAX=3000 기준)와 헷갈린 경우.",
        "3. (정답)",
        "4. LEE(2500)를 잘못 포함. 같은 값은 < ALL에서 제외."
      ],
      tip: "< ALL = MIN보다 작은. > ALL = MAX보다 큰. ANY/ALL 4가지를 한꺼번에 외워두기."
    }
  },

  // ============================================================
  // T-03: NOT IN with NULL 함정 (Q325~Q326) — 2문항
  // ============================================================
  {
    id: 325,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과로 반환되는 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP] (DEPTNO에 NULL이 포함됨)",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, "NULL"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME\nFROM EMP\nWHERE DEPTNO NOT IN (SELECT DEPTNO FROM EMP WHERE SAL <= 2500);"
      }
    ],
    choices: [
      "0",
      "1",
      "2",
      "3"
    ],
    ans: 1,
    src: "자료3 p.56, TRAPS T-03",
    exp: {
      reason: "서브쿼리는 SAL<=2500 사원의 DEPTNO 집합 → {10, 20, 20, NULL} (JUNG의 DEPTNO=NULL 포함). NOT IN 집합에 NULL이 포함되면 'v <> 10 AND v <> 20 AND v <> NULL' 마지막 항이 NULL → 전체 NULL → 모든 행이 WHERE에서 제외되어 결과 0건. PostgreSQL 검증 완료. (자료3 p.56, TRAPS T-03)",
      terms: [
        "**NOT IN with NULL 함정**: 서브쿼리 결과에 NULL이 한 개라도 있으면 NOT IN 결과는 0건 (T-03)",
        "**원리**: v NOT IN (a, b, NULL) ≡ v<>a AND v<>b AND v<>NULL → 마지막 항 NULL → 전체 NULL",
        "**WHERE 조건이 NULL**: 그 행은 결과에서 제외됨 (TRUE만 통과)",
        "**해결**: 서브쿼리에서 NULL을 사전 제거 — WHERE DEPTNO IS NOT NULL 추가"
      ],
      wrong: [
        "1. (정답)",
        "2. NULL 함정을 무시하고 KIM/LEE를 제외한 PARK/CHOI/JUNG 중 1명만 본 경우.",
        "3. NULL을 포함한 비교가 정상 동작한다고 본 경우.",
        "4. NOT IN을 IN으로 본 경우."
      ],
      tip: "서브쿼리에 NULL 한 방울이면 NOT IN 결과 전멸. NULL 사전 제거 필수."
    }
  },
  {
    id: 326,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "상",
    has_code: true,
    q: "다음 두 SQL의 결과 행 수에 대한 설명으로 가장 적절한 것은? (DEPTNO에 NULL이 포함된 EMP 테이블)",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, "NULL"]
        ]
      },
      {
        type: "code",
        title: "[SQL A]",
        lang: "sql",
        content: "SELECT ENAME FROM EMP\nWHERE DEPTNO NOT IN (SELECT DEPTNO FROM EMP WHERE SAL = 3000);"
      },
      {
        type: "code",
        title: "[SQL B]",
        lang: "sql",
        content: "SELECT ENAME FROM EMP\nWHERE DEPTNO NOT IN (SELECT DEPTNO FROM EMP WHERE SAL = 1500);"
      }
    ],
    choices: [
      "A는 2건, B는 0건이다.",
      "A는 2건, B는 1건이다.",
      "A는 0건, B는 0건이다.",
      "A는 3건, B는 1건이다."
    ],
    ans: 1,
    src: "자료3 p.56, TRAPS T-03",
    exp: {
      reason: "SQL A: 서브쿼리 = {10}(KIM의 DEPTNO, NULL 없음). NOT IN(10) → PARK(20)/CHOI(20) 2명 통과, JUNG은 DEPTNO=NULL이라 비교 결과 NULL → 탈락. A=2건. SQL B: 서브쿼리 = {NULL}(JUNG의 DEPTNO=NULL). NOT IN 집합에 NULL 포함 → 모든 메인 행의 비교 결과 NULL → 0건. PostgreSQL 검증 완료 (A=PARK,CHOI / B=빈 결과). (자료3 p.56, TRAPS T-03)",
      terms: [
        "**SQL A**: 서브쿼리 결과에 NULL 없음 → NOT IN 정상 동작 (2건)",
        "**SQL B**: 서브쿼리 결과 = {NULL} → NOT IN 함정 발동 → 0건",
        "**메인 컬럼이 NULL인 행**: NOT IN 비교 결과가 NULL이라 모든 NOT IN에서 탈락 (A에서 JUNG 제외 이유)",
        "**T-03 함정 핵심**: 서브쿼리 결과 NULL 1개로 전체 0건"
      ],
      wrong: [
        "1. (정답)",
        "2. B의 NULL 함정을 무시하고 한 명이 통과한다고 본 경우.",
        "3. A도 NULL 함정에 걸렸다고 본 경우. A 서브쿼리에는 NULL 없음.",
        "4. A에서 JUNG까지 통과한다고 본 경우. JUNG의 DEPTNO=NULL이라 NOT IN에서 탈락."
      ],
      tip: "서브쿼리 결과가 {NULL} 한 개라도 들어가면 NOT IN은 항상 0건."
    }
  },

  // ============================================================
  // 보너스: IN vs ANY 비교 (Q327) — 1문항
  // ============================================================
  {
    id: 327,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 두 SQL의 결과에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL", "DEPTNO"],
        rows: [
          [1, "KIM", 3000, 10],
          [2, "LEE", 2500, 10],
          [3, "PARK", 2000, 20],
          [4, "CHOI", 2000, 20],
          [5, "JUNG", 1500, 30]
        ]
      },
      {
        type: "code",
        title: "[SQL A]",
        lang: "sql",
        content: "SELECT ENAME FROM EMP\nWHERE SAL IN (SELECT SAL FROM EMP WHERE DEPTNO = 20);"
      },
      {
        type: "code",
        title: "[SQL B]",
        lang: "sql",
        content: "SELECT ENAME FROM EMP\nWHERE SAL = ANY (SELECT SAL FROM EMP WHERE DEPTNO = 20);"
      }
    ],
    choices: [
      "A와 B는 같은 결과(PARK, CHOI 2건)를 반환한다.",
      "A는 PARK, CHOI 2건이고 B는 KIM, LEE 2건으로 다르다.",
      "A는 정상 실행되지만 B는 문법 오류가 발생한다.",
      "A는 2건, B는 빈 결과(0건)를 반환한다."
    ],
    ans: 1,
    src: "자료3 p.56",
    exp: {
      reason: "IN과 = ANY는 동등한 연산자다. WHERE 컬럼이 서브쿼리 집합 {2000, 2000}에 포함되는지 검사 → SAL=2000인 PARK, CHOI 2명. 두 SQL 모두 같은 결과. PostgreSQL 검증 완료. (자료3 p.56)",
      terms: [
        "**IN ≡ = ANY**: 표준 SQL에서 동등. 의미 상 모두 '집합에 포함되면 TRUE'",
        "**ANY의 확장성**: ANY는 =, <>, >, < 등 모든 비교 연산자와 결합 가능 (예: > ANY)",
        "**IN의 제한**: 등호 비교만 가능 (NOT IN은 = ALL의 부정)",
        "**부정 관계**: NOT IN ≡ <> ALL"
      ],
      wrong: [
        "1. (정답)",
        "2. IN/ANY가 다르다고 본 경우. 둘은 동등.",
        "3. = ANY가 문법 오류라고 본 경우. 표준 문법.",
        "4. 둘 중 하나가 빈 결과라고 본 경우."
      ],
      tip: "IN = '= ANY'. NOT IN = '<> ALL'. ANY는 모든 비교 연산자, IN은 등호만."
    }
  },

  // ============================================================
  // 보너스: IN/ANY/ALL 종합 매칭 (Q328) — 1문항
  // ============================================================
  {
    id: 328,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: false,
    q: "다음 중 다중행 비교 연산자에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "IN: 서브쿼리 결과 집합에 메인쿼리 값이 포함되면 TRUE이다.",
      "> ANY: 서브쿼리 결과의 최솟값보다 크면 TRUE이다.",
      "< ALL: 서브쿼리 결과의 최댓값보다 작으면 TRUE이다.",
      "ALL은 서브쿼리 결과의 모든 값에 대해 비교 조건이 만족할 때 TRUE이다."
    ],
    ans: 3,
    src: "자료3 p.56",
    exp: {
      reason: "< ALL은 서브쿼리 결과의 '최솟값(MIN)보다 작은' 행을 반환한다. 모든 값보다 작아야 하므로 가장 작은 값보다도 작아야 함. 자료3 p.56 표에 명시: '< ALL(10, 200): 최솟값(10)보다 작은 행들 반환'. (자료3 p.56)",
      terms: [
        "**IN**: 결과 집합에 포함되면 TRUE (= ANY와 동등)",
        "**> ANY**: 최솟값보다 크면 TRUE (= MIN 기준)",
        "**< ANY**: 최댓값보다 작으면 TRUE (= MAX 기준)",
        "**> ALL**: 최댓값보다 커야 TRUE / **< ALL**: 최솟값보다 작아야 TRUE"
      ],
      wrong: [
        "1. IN의 정의 그대로다.",
        "2. > ANY는 최솟값 기준이 맞다.",
        "3. (정답) < ALL은 최댓값이 아니라 '최솟값보다 작은'이다.",
        "4. ALL의 일반 정의 — 모든 값에 대해 조건 만족."
      ],
      tip: "ANY: MIN/MAX의 반대 / ALL: MIN/MAX의 동일 방향. > ANY=MIN+, < ANY=MAX-, > ALL=MAX+, < ALL=MIN-."
    }
  }
];

module.exports = g2Part2;

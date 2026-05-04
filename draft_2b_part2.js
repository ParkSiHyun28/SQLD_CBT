// 2-B: SELECT 문 기본 구조 Part2 (Q626~Q640)
// 토픽 64~68: WHERE 비교 연산자, 논리 연산자 우선순위, IN+NULL, BETWEEN/LIKE, ORDER BY+NULL 정렬
// 자료3 p.37~41 기반. PostgreSQL 14 sqld_verify DB에서 결과 직접 검증.
const b2Part2 = [

  // ============================================================
  // 토픽 64: WHERE 비교 연산자 (Q626~Q628) - 3문항
  // ============================================================
  {
    id: 626,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "하",
    has_code: true,
    q: "다음 테이블과 SQL의 실행 결과로 반환되는 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL", "COMM"],
        rows: [
          ["1", "KIM",  "10", "3000", "NULL"],
          ["2", "LEE",  "10", "2500", "500"],
          ["3", "PARK", "20", "2000", "NULL"],
          ["4", "CHOI", "20", "2000", "300"],
          ["5", "JUNG", "30", "1500", "NULL"],
          ["6", "HAN",  "NULL","1500", "NULL"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT * FROM EMP\nWHERE SAL >= 2000;"
      }
    ],
    choices: [
      "2",
      "3",
      "4",
      "5"
    ],
    ans: 3,
    src: "자료3 p.37",
    exp: {
      reason: ">= 는 '크거나 같다' 비교 연산자다. SAL이 2000 이상인 행은 KIM(3000), LEE(2500), PARK(2000), CHOI(2000)으로 4행이다. PostgreSQL 검증 완료. (자료3 p.37)",
      terms: [
        "**>= 연산자**: 좌변 >= 우변 조건. 같은 값 포함 (2000도 포함)",
        "**비교 연산자**: =, >, <, >=, <=, <>(ISO표준), != 7종",
        "**NULL 처리**: SAL이 NULL인 행은 비교 결과가 NULL이 되어 WHERE에서 제외되지만, 이 테이블에서 SAL NULL 행은 없음"
      ],
      wrong: [
        "1. 2 = SAL > 2000 조건(2000 초과)의 결과. >= 는 2000도 포함한다.",
        "2. 3 = SAL > 2000이거나 일부 행만 계산한 경우.",
        "3. (정답) SAL >= 2000인 행: KIM(3000), LEE(2500), PARK(2000), CHOI(2000) 4건.",
        "4. 5 = SAL >= 1500으로 잘못 적용한 경우."
      ],
      tip: ">= 는 경계값 포함. SAL = 2000인 행도 조건 통과."
    }
  },
  {
    id: 627,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "하",
    has_code: true,
    q: "다음 SQL의 실행 결과로 출력되는 행의 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL", "COMM"],
        rows: [
          ["1", "KIM",  "10", "3000", "NULL"],
          ["2", "LEE",  "10", "2500", "500"],
          ["3", "PARK", "20", "2000", "NULL"],
          ["4", "CHOI", "20", "2000", "300"],
          ["5", "JUNG", "30", "1500", "NULL"],
          ["6", "HAN",  "NULL","1500", "NULL"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL FROM EMP\nWHERE SAL BETWEEN 1500 AND 2500;"
      }
    ],
    choices: [
      "3",
      "4",
      "5",
      "6"
    ],
    ans: 3,
    src: "자료3 p.37",
    exp: {
      reason: "BETWEEN A AND B는 A 이상 B 이하, 즉 양 끝 값 포함 조건이다. SAL이 1500 이상 2500 이하인 행은 LEE(2500), PARK(2000), CHOI(2000), JUNG(1500), HAN(1500)으로 5행이다. PostgreSQL 검증 완료. (자료3 p.37)",
      terms: [
        "**BETWEEN A AND B**: A <= 컬럼 <= B. 양끝 A, B 포함",
        "**동치 표현**: SAL >= 1500 AND SAL <= 2500 과 완전히 동일",
        "**NOT BETWEEN**: A 미만이거나 B 초과인 행 반환"
      ],
      wrong: [
        "1. 3 = 1500과 2500 경계값을 제외한 경우 (SAL > 1500 AND SAL < 2500).",
        "2. 4 = 한쪽 끝만 포함한 경우.",
        "3. (정답) 1500 이상 2500 이하: LEE, PARK, CHOI, JUNG, HAN 5건.",
        "4. 6 = 전체 행을 반환한 경우."
      ],
      tip: "BETWEEN A AND B는 A, B 모두 포함. NOT BETWEEN은 A 미만 OR B 초과."
    }
  },
  {
    id: 628,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 SQL 조건절에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL", "JOB"],
        rows: [
          ["1", "KIM",  "10", "3000", "MANAGER"],
          ["2", "LEE",  "10", "2500", "CLERK"],
          ["3", "PARK", "20", "2000", "ANALYST"],
          ["4", "CHOI", "20", "2000", "CLERK"],
          ["5", "JUNG", "30", "1500", "SALESMAN"],
          ["6", "HAN",  "NULL","1500", "SALESMAN"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, JOB FROM EMP\nWHERE JOB IN ('MANAGER', 'ANALYST');"
      }
    ],
    choices: [
      "JOB이 'MANAGER'이고 'ANALYST'인 사원을 조회한다.",
      "JOB이 'MANAGER'이거나 'ANALYST'인 사원을 조회하며, 결과는 2건이다.",
      "IN 연산자는 목록의 값이 많을수록 성능이 저하되므로 OR로 변환하는 것이 권장된다.",
      "JOB이 NULL인 행도 IN 목록에 NULL을 추가하면 포함시킬 수 있다."
    ],
    ans: 2,
    src: "자료3 p.37~38",
    exp: {
      reason: "IN은 OR를 간결하게 표현한 연산자다. JOB IN ('MANAGER','ANALYST')는 JOB = 'MANAGER' OR JOB = 'ANALYST'와 동일하다. 해당 행은 KIM(MANAGER), PARK(ANALYST) 2건이다. PostgreSQL 검증 완료. (자료3 p.37~38)",
      terms: [
        "**IN (list)**: OR를 간결하게 표현. 목록 중 하나라도 일치하면 TRUE",
        "**AND가 아닌 OR**: JOB이 MANAGER이고 ANALYST인 행은 존재 불가. OR로 해석",
        "**NULL과 IN**: IN 목록에 NULL을 넣어도 NULL 행은 매칭되지 않음 (NULL = NULL은 알 수 없음)"
      ],
      wrong: [
        "1. IN은 AND가 아닌 OR 조건이다. 동시에 두 값을 가지는 행은 존재하지 않는다.",
        "2. (정답) OR 조건이므로 MANAGER 또는 ANALYST인 KIM, PARK 2건이 반환된다.",
        "3. IN은 내부적으로 OR로 처리되며, 일반적으로 OR보다 가독성이 좋아 IN 사용을 권장한다.",
        "4. IN 목록에 NULL을 넣어도 NULL 행은 매칭되지 않는다. NULL과의 = 비교는 항상 NULL(unknown)을 반환한다."
      ],
      tip: "IN = OR 단축. NULL 행 찾으려면 IS NULL 사용."
    }
  },

  // ============================================================
  // 토픽 65: WHERE 논리 연산자 우선순위 (Q629~Q631) - 3문항
  // ============================================================
  {
    id: 629,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 두 SQL의 실행 결과가 서로 다른 이유로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[BOOKSHELF 테이블]",
        headers: ["ISBN", "TITLE", "PUBLISHER", "PRICE"],
        rows: [
          ["B001", "SQL기초", "민음사", "13500"],
          ["B002", "알고리즘", "문학동네", "8800"],
          ["B003", "파이썬", "열린책들", "12000"],
          ["B004", "DB설계", "민음사", "7500"],
          ["B005", "빅데이터", "길벗", "18000"]
        ]
      },
      {
        type: "code",
        title: "[SQL A]",
        lang: "sql",
        content: "SELECT TITLE FROM BOOKSHELF\nWHERE PUBLISHER = '민음사'\n   OR PUBLISHER = '문학동네' AND PRICE >= 10000;"
      },
      {
        type: "code",
        title: "[SQL B]",
        lang: "sql",
        content: "SELECT TITLE FROM BOOKSHELF\nWHERE (PUBLISHER = '민음사'\n    OR PUBLISHER = '문학동네') AND PRICE >= 10000;"
      }
    ],
    choices: [
      "OR가 AND보다 우선순위가 높아 SQL A에서 OR가 먼저 처리된다.",
      "SQL A는 AND가 먼저 처리되어 '민음사' 2건, SQL B는 OR가 먼저 처리되어 '민음사 10000 이상' 1건을 반환한다.",
      "괄호는 우선순위를 변경하지 않으며 두 SQL은 동일한 결과를 반환한다.",
      "AND와 OR의 우선순위는 동일하며 왼쪽부터 처리된다."
    ],
    ans: 2,
    src: "자료3 p.37~38",
    exp: {
      reason: "AND는 OR보다 우선순위가 높다. SQL A는 AND를 먼저 처리하여 (문학동네 AND PRICE>=10000 = 0건) 후 OR로 민음사(2건) 결합 → 2건. SQL B는 괄호로 OR를 먼저 처리하여 (민음사 OR 문학동네 = 3건) 후 AND PRICE>=10000 적용 → SQL기초 1건. PostgreSQL 검증 완료. (자료3 p.37~38)",
      terms: [
        "**우선순위**: 괄호(1) > NOT(2) > 비교/SQL 연산자(3) > AND(4) > OR(5)",
        "**AND 먼저**: 괄호 없으면 항상 AND가 OR보다 먼저 처리됨",
        "**괄호 효과**: 괄호 안 연산을 가장 먼저 처리 → 의도한 OR/AND 순서 강제 가능"
      ],
      wrong: [
        "1. OR가 AND보다 우선순위가 낮다. AND가 먼저 처리된다.",
        "2. (정답) SQL A는 AND 먼저(문학동네+10000이상=0건) 후 OR(민음사) → 2건. SQL B는 괄호로 OR 먼저(민음사+문학동네=3건) 후 AND → 1건.",
        "3. 괄호는 연산 우선순위를 변경한다. 두 SQL은 서로 다른 결과를 반환한다.",
        "4. AND와 OR의 우선순위는 다르다. AND가 OR보다 높다."
      ],
      tip: "괄호 없으면 AND 먼저, OR 나중. 우선순위: 괄호>NOT>비교>AND>OR."
    }
  },
  {
    id: 630,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 WHERE 조건이 실제로 평가되는 순서를 올바르게 나타낸 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT * FROM EMP\nWHERE DEPTNO = 10\n   OR JOB = 'CLERK' AND SAL >= 2000;"
      }
    ],
    choices: [
      "(DEPTNO = 10 OR JOB = 'CLERK') AND SAL >= 2000",
      "DEPTNO = 10 OR (JOB = 'CLERK' AND SAL >= 2000)",
      "(DEPTNO = 10 OR JOB = 'CLERK') AND (SAL >= 2000)",
      "DEPTNO = 10 OR JOB = 'CLERK' OR SAL >= 2000"
    ],
    ans: 2,
    src: "자료3 p.37~38",
    exp: {
      reason: "AND는 OR보다 우선순위가 높다. 따라서 괄호 없이 OR와 AND가 혼용될 때 AND 부분이 먼저 묶인다. 위 SQL은 DEPTNO = 10 OR (JOB = 'CLERK' AND SAL >= 2000)로 해석된다. (자료3 p.37~38)",
      terms: [
        "**논리 연산자 우선순위**: 괄호(1) > NOT(2) > 비교 연산자(3) > AND(4) > OR(5)",
        "**묵시적 괄호**: AND 양쪽이 먼저 묶임. OR는 AND 결과 간의 연산",
        "**의도와 다른 결과**: OR를 먼저 처리하려면 괄호로 명시해야 함"
      ],
      wrong: [
        "1. OR가 먼저 묶인 형태. AND가 OR보다 우선순위가 높으므로 틀렸다.",
        "2. (정답) AND가 먼저 묶여 JOB='CLERK' AND SAL>=2000이 한 덩어리가 되고, DEPTNO=10과 OR 연산한다.",
        "3. 1번과 동일하게 OR를 먼저 적용한 형태다.",
        "4. AND가 완전히 무시된 형태. AND 조건은 OR로 전환되지 않는다."
      ],
      tip: "AND가 항상 OR보다 먼저. 괄호 없는 AND-OR 혼용 시 AND부터 묶는다."
    }
  },
  {
    id: 631,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 반환되는 ENAME, SAL을 나열한 것으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL"],
        rows: [
          ["1", "KIM",  "10", "3000"],
          ["2", "LEE",  "10", "2500"],
          ["3", "PARK", "20", "2000"],
          ["4", "CHOI", "20", "2000"],
          ["5", "JUNG", "30", "1500"],
          ["6", "HAN",  "NULL","1500"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL FROM EMP\nWHERE NOT DEPTNO = 10\n  AND SAL >= 2000;"
      }
    ],
    choices: [
      "KIM(3000), LEE(2500)",
      "PARK(2000), CHOI(2000)",
      "KIM(3000), LEE(2500), PARK(2000), CHOI(2000)",
      "PARK(2000), CHOI(2000), JUNG(1500), HAN(1500)"
    ],
    ans: 2,
    src: "자료3 p.37~38",
    exp: {
      reason: "NOT은 AND보다 우선순위가 높다. NOT DEPTNO = 10은 '부서번호가 10이 아닌 행'을 의미한다. 부서가 10이 아닌 행(PARK/20, CHOI/20, JUNG/30, HAN/NULL) 중 SAL >= 2000인 행은 PARK(2000), CHOI(2000) 2건이다. PostgreSQL 검증 완료. (자료3 p.37~38)",
      terms: [
        "**NOT 우선순위**: NOT은 비교 연산자보다 낮고 AND보다 높다 (NOT > AND > OR)",
        "**NOT 컬럼 = 값**: 해당 값이 아닌 모든 행. NULL인 행도 NOT 조건에서 제외됨",
        "**NULL과 NOT**: HAN의 DEPTNO는 NULL. NULL <> 10 역시 NULL이므로 WHERE에서 제외"
      ],
      wrong: [
        "1. KIM, LEE는 DEPTNO = 10이므로 NOT DEPTNO = 10 조건을 통과하지 못한다.",
        "2. (정답) DEPTNO가 10이 아닌 행(PARK/CHOI/JUNG/HAN) 중 SAL >= 2000인 PARK, CHOI 2건.",
        "3. KIM, LEE는 DEPTNO = 10이므로 NOT 조건에 걸려 제외된다.",
        "4. JUNG(1500), HAN(1500)은 SAL >= 2000 조건을 만족하지 않는다."
      ],
      tip: "NOT은 AND보다 먼저. NOT DEPTNO=10 AND SAL>=2000 = (NOT DEPTNO=10) AND (SAL>=2000)."
    }
  },

  // ============================================================
  // 토픽 66: IN 연산자와 NULL 처리 (Q632~Q634) - 3문항
  // ============================================================
  {
    id: 632,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 반환되는 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "COMM"],
        rows: [
          ["1", "KIM",  "NULL"],
          ["2", "LEE",  "500"],
          ["3", "PARK", "NULL"],
          ["4", "CHOI", "300"],
          ["5", "JUNG", "NULL"],
          ["6", "HAN",  "NULL"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, COMM FROM EMP\nWHERE COMM IN (300, 500, NULL);"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "6"
    ],
    ans: 2,
    src: "자료3 p.38",
    exp: {
      reason: "IN 연산자는 NULL 값을 무시한다. COMM IN (300, 500, NULL)은 COMM = 300 OR COMM = 500 OR COMM = NULL로 전개되는데, COMM = NULL은 항상 NULL(unknown)이어서 TRUE가 되지 않는다. 따라서 COMM이 300인 CHOI와 500인 LEE, 2건만 반환된다. PostgreSQL 검증 완료. (자료3 p.38)",
      terms: [
        "**IN과 NULL**: IN 목록에 NULL을 넣어도 NULL 값인 행은 일치로 판단되지 않음",
        "**COMM = NULL**: NULL과 = 비교는 결과가 NULL(알 수 없음) → WHERE 조건 실패",
        "**NULL 행 조회**: NULL 값인 COMM을 찾으려면 반드시 IS NULL 사용"
      ],
      wrong: [
        "1. 1 = 300이나 500 중 하나만 세었거나 매칭 오류.",
        "2. (정답) COMM = 300(CHOI), COMM = 500(LEE) 2건. NULL 값 행은 IN으로 일치하지 않음.",
        "3. 3 = NULL이 IN 목록에 있어 NULL 행 1건 포함된다고 오해한 경우.",
        "4. 6 = 전체 행. IN 목록에 NULL이 있어도 NULL 행은 매칭 안 됨."
      ],
      tip: "IN(NULL 포함)은 NULL 행을 찾지 못함. NULL 검색은 IS NULL만 가능."
    }
  },
  {
    id: 633,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과로 반환되는 행 수로 옳은 것은? (단, T-03 함정에 해당하는 문제다.)",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "COMM"],
        rows: [
          ["1", "KIM",  "NULL"],
          ["2", "LEE",  "500"],
          ["3", "PARK", "NULL"],
          ["4", "CHOI", "300"],
          ["5", "JUNG", "NULL"],
          ["6", "HAN",  "NULL"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, COMM FROM EMP\nWHERE COMM NOT IN (300, NULL);"
      }
    ],
    choices: [
      "0",
      "1",
      "3",
      "4"
    ],
    ans: 1,
    src: "자료3 p.38; TRAPS.md T-03",
    exp: {
      reason: "NOT IN 목록에 NULL이 포함되면 결과가 0건이 된다. COMM NOT IN (300, NULL)은 COMM <> 300 AND COMM <> NULL로 전개되는데, COMM <> NULL이 항상 NULL(unknown)이므로 전체 AND 결과도 NULL이 된다. WHERE 조건이 NULL이면 그 행은 결과에서 제외되어 모든 행이 사라진다. PostgreSQL 검증 완료. (자료3 p.38; T-03)",
      terms: [
        "**NOT IN + NULL 함정**: NOT IN 목록에 NULL 하나라도 있으면 결과 0건",
        "**전개**: v NOT IN (a, NULL) = v <> a AND v <> NULL. 마지막 항이 NULL → 전체 NULL",
        "**해결책**: NOT IN 사용 전 NULL 제거 필요. WHERE x IS NOT NULL AND x NOT IN (a)"
      ],
      wrong: [
        "1. (정답) NOT IN 목록에 NULL이 있으면 모든 행이 제거되어 0건이 반환된다.",
        "2. 1 = LEE(500)만 반환된다고 오해한 경우. NULL 함정으로 LEE도 제외된다.",
        "3. 3 = COMM이 NULL인 행 4건 중 일부만 반환된다고 오해한 경우.",
        "4. 4 = COMM이 NULL인 4건이 반환된다고 오해한 경우. NOT IN NULL 함정."
      ],
      tip: "NOT IN 목록에 NULL 있으면 무조건 0건. 서브쿼리에 NULL 섞이지 않도록 IS NOT NULL 필터 필수."
    }
  },
  {
    id: 634,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 반환되는 행으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "JOB"],
        rows: [
          ["1", "KIM",  "10", "MANAGER"],
          ["2", "LEE",  "10", "CLERK"],
          ["3", "PARK", "20", "ANALYST"],
          ["4", "CHOI", "20", "CLERK"],
          ["5", "JUNG", "30", "SALESMAN"],
          ["6", "HAN",  "NULL","SALESMAN"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO, JOB FROM EMP\nWHERE (DEPTNO, JOB) IN ((10, 'MANAGER'), (20, 'ANALYST'));"
      }
    ],
    choices: [
      "KIM, LEE, PARK, CHOI (4행)",
      "KIM (1행)",
      "KIM, PARK (2행)",
      "PARK, CHOI (2행)"
    ],
    ans: 3,
    src: "자료3 p.38",
    exp: {
      reason: "다중컬럼 IN은 컬럼 조합이 목록의 조합 중 하나와 일치하는 행을 반환한다. (DEPTNO, JOB) IN ((10,'MANAGER'), (20,'ANALYST'))는 '부서가 10이고 직무가 MANAGER이거나, 부서가 20이고 직무가 ANALYST인 행'을 의미한다. KIM(10, MANAGER)과 PARK(20, ANALYST) 2건이 해당된다. PostgreSQL 검증 완료. (자료3 p.38)",
      terms: [
        "**다중컬럼 IN**: (컬럼1, 컬럼2) IN ((값1A, 값1B), (값2A, 값2B)) 형태",
        "**컬럼 조합 단위 매칭**: 각 컬럼이 독립적으로 매칭되는 것이 아닌, 조합 전체가 일치해야 함",
        "**활용**: JOIN 없이 복합 조건을 간결하게 표현 가능"
      ],
      wrong: [
        "1. 4행 = DEPTNO IN (10,20) OR JOB IN ('MANAGER','ANALYST')로 잘못 해석한 경우.",
        "2. 1행 = (10,'MANAGER')만 매칭되었을 경우.",
        "3. (정답) (10,'MANAGER')에 매칭되는 KIM, (20,'ANALYST')에 매칭되는 PARK, 총 2건.",
        "4. CHOI는 DEPTNO=20이지만 JOB='CLERK'로 (20,'ANALYST')에 매칭되지 않는다."
      ],
      tip: "다중컬럼 IN은 (A,B) 조합 전체가 목록의 한 쌍과 일치해야 선택."
    }
  },

  // ============================================================
  // 토픽 67: BETWEEN/LIKE 연산자 (Q635~Q637) - 3문항
  // ============================================================
  {
    id: 635,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "하",
    has_code: true,
    q: "다음 중 BETWEEN A AND B 연산자에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- SQL A\nSELECT * FROM EMP WHERE SAL BETWEEN 2000 AND 2500;\n\n-- SQL B\nSELECT * FROM EMP WHERE SAL >= 2000 AND SAL <= 2500;"
      }
    ],
    choices: [
      "SQL A와 SQL B는 완전히 동일한 결과를 반환한다.",
      "BETWEEN 연산자는 A, B 양끝 값을 모두 포함한다.",
      "NOT BETWEEN A AND B는 A 미만이거나 B 초과인 행을 반환한다.",
      "BETWEEN에서 반드시 A < B이어야 하며, A = B 사용 시 오류가 발생한다."
    ],
    ans: 4,
    src: "자료3 p.39",
    exp: {
      reason: "BETWEEN A AND B에서 A <= B이어야 올바른 범위가 되지만, A = B로 써도 SQL 오류는 발생하지 않는다. 다만 A > B이면 조건을 만족하는 행이 없어 0건을 반환할 뿐이다. 오류가 발생한다는 설명은 틀렸다. (자료3 p.39)",
      terms: [
        "**BETWEEN A AND B**: A <= 컬럼 <= B. A, B 모두 포함. 숫자/문자/날짜 모두 사용 가능",
        "**동치**: SAL >= A AND SAL <= B 와 완전히 동일",
        "**NOT BETWEEN A AND B**: 컬럼 < A OR 컬럼 > B. 즉 범위 밖의 행"
      ],
      wrong: [
        "1. BETWEEN A AND B는 SAL >= A AND SAL <= A와 동치이므로 동일한 결과를 반환한다.",
        "2. 자료3 p.39에 '(a, b 포함)'이라고 명시되어 있다. 양끝 포함이 맞다.",
        "3. NOT BETWEEN A AND B는 A 미만이거나 B 초과인 행을 반환한다. 맞는 설명이다.",
        "4. (정답) A = B여도 오류 없이 실행된다. 다만 A > B이면 결과가 0건일 수 있다."
      ],
      tip: "BETWEEN은 양끝 포함. SQL 오류 없음. A > B이면 0건 반환(문법 오류 아님)."
    }
  },
  {
    id: 636,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 반환되는 ENAME으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME"],
        rows: [
          ["1", "KIM"],
          ["2", "LEE"],
          ["3", "PARK"],
          ["4", "CHOI"],
          ["5", "JUNG"],
          ["6", "HAN"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME FROM EMP\nWHERE ENAME LIKE '_I%';"
      }
    ],
    choices: [
      "KIM",
      "KIM, CHOI",
      "LEE, CHOI",
      "KIM, LEE, CHOI"
    ],
    ans: 1,
    src: "자료3 p.39",
    exp: {
      reason: "LIKE '_I%'는 두 번째 글자가 정확히 'I'인 이름을 찾는다. _ 는 정확히 1글자를 대체하고, % 는 0개 이상 임의 문자를 대체한다. 이름 중 두 번째 글자가 'I'인 것은 KIM(K-I-M)뿐이다. CHOI는 네 번째 글자가 I이고, LEE는 I 없다. PostgreSQL 검증 완료. (자료3 p.39)",
      terms: [
        "**_ (언더스코어)**: 정확히 1개 문자를 대체. 위치 고정",
        "**% (퍼센트)**: 0개 이상 임의 문자 대체. 위치 유동",
        "**_I%**: 첫 글자 임의 1개, 두 번째 글자 반드시 I, 이후 0개 이상 임의"
      ],
      wrong: [
        "1. (정답) KIM의 두 번째 글자는 I. '_I%' 패턴 일치.",
        "2. CHOI는 C-H-O-I. 두 번째 글자가 H이므로 '_I%' 불일치.",
        "3. LEE는 L-E-E. I가 없으므로 불일치. CHOI도 두 번째 글자가 H.",
        "4. LEE는 I가 없고, CHOI는 두 번째 글자가 H이므로 모두 불일치."
      ],
      tip: "_ = 정확히 1글자 자리표시. _I%는 두 번째 자리만 I인 패턴."
    }
  },
  {
    id: 637,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 중 LIKE 패턴과 매칭되는 값의 조합으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- 패턴 A: ENAME LIKE '%AN%'\n-- 패턴 B: ENAME LIKE '____'\n-- 대상 이름: KIM, LEE, PARK, CHOI, JUNG, HAN"
      }
    ],
    choices: [
      "패턴 A: HAN / 패턴 B: PARK, CHOI, JUNG",
      "패턴 A: HAN, JUNG / 패턴 B: PARK, JUNG",
      "패턴 A: HAN / 패턴 B: PARK, JUNG",
      "패턴 A: HAN, JUNG / 패턴 B: PARK, CHOI, JUNG"
    ],
    ans: 1,
    src: "자료3 p.39",
    exp: {
      reason: "패턴 A(%AN%)는 'AN'을 포함하는 이름으로 HAN만 해당된다(H-A-N). JUNG에는 'AN'이 없다. 패턴 B(____는 언더스코어 4개)는 정확히 4글자인 이름으로 PARK(4), CHOI(4), JUNG(4)이 해당된다. KIM(3), LEE(3), HAN(3)은 3글자라 불일치. PostgreSQL 검증 완료. (자료3 p.39)",
      terms: [
        "**%AN%**: AN을 포함하는 모든 문자열. 앞뒤 글자 수 무관",
        "**____ (4개)**: 정확히 4글자인 문자열만 매칭",
        "**LIKE 대소문자**: 자료3 p.39에 '대소문자 구분'으로 명시. 'an'과 'AN'은 다름"
      ],
      wrong: [
        "1. (정답) 패턴 A: HAN(H-A-N만 AN 포함), 패턴 B: PARK/CHOI/JUNG(4글자).",
        "2. JUNG은 J-U-N-G로 'AN' 부분 문자열이 없으므로 패턴 A 불일치.",
        "3. 패턴 B에 CHOI가 빠졌다. CHOI도 4글자이므로 ____ 패턴에 매칭된다.",
        "4. JUNG은 패턴 A(%AN%)에 매칭되지 않는다. J-U-N-G에 'AN' 없음."
      ],
      tip: "%는 0개 이상 임의, _는 정확히 1글자. ____(4개)는 정확히 4글자."
    }
  },

  // ============================================================
  // 토픽 68: ORDER BY와 NULL 정렬 (Q638~Q640) - 3문항
  // ============================================================
  {
    id: 638,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 Oracle 환경 기준으로 첫 번째로 출력되는 행의 ENAME으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "COMM"],
        rows: [
          ["1", "KIM",  "NULL"],
          ["2", "LEE",  "500"],
          ["3", "PARK", "NULL"],
          ["4", "CHOI", "300"],
          ["5", "JUNG", "NULL"],
          ["6", "HAN",  "NULL"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, COMM FROM EMP\nORDER BY COMM ASC;"
      }
    ],
    choices: [
      "KIM",
      "CHOI",
      "LEE",
      "HAN"
    ],
    ans: 2,
    src: "자료3 p.40~41; TRAPS.md T-05",
    exp: {
      reason: "Oracle에서 NULL은 최댓값으로 취급된다. ORDER BY COMM ASC(오름차순)에서는 값이 작은 것부터 정렬되므로 NULL이 가장 마지막에 위치한다. 따라서 가장 먼저 출력되는 행은 COMM이 가장 작은 300인 CHOI다. (자료3 p.40~41; T-05)",
      terms: [
        "**Oracle NULL 정렬**: NULL을 최댓값으로 취급 → ASC에서 NULL이 끝, DESC에서 NULL이 처음",
        "**SQL Server NULL 정렬**: NULL을 최솟값으로 취급 → ASC에서 NULL이 처음, DESC에서 NULL이 끝",
        "**NULLS FIRST/LAST**: ORDER BY 컬럼 ASC NULLS FIRST처럼 명시적 제어 가능 (Oracle, PostgreSQL)"
      ],
      wrong: [
        "1. KIM은 COMM이 NULL. Oracle ASC에서 NULL은 마지막이므로 첫 번째가 아니다.",
        "2. (정답) CHOI의 COMM = 300. Oracle ASC에서 NULL 제외 가장 작은 값이 먼저 출력된다.",
        "3. LEE의 COMM = 500. CHOI(300)보다 크므로 두 번째 출력.",
        "4. HAN은 COMM이 NULL. Oracle ASC에서 NULL은 마지막이므로 첫 번째가 아니다."
      ],
      tip: "Oracle ASC: NULL 맨 끝. Oracle DESC: NULL 맨 앞. SQL Server는 반대."
    }
  },
  {
    id: 639,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 SQL에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL"],
        rows: [
          ["1", "KIM",  "10", "3000"],
          ["2", "LEE",  "10", "2500"],
          ["3", "PARK", "20", "2000"],
          ["4", "CHOI", "20", "2000"],
          ["5", "JUNG", "30", "1500"],
          ["6", "HAN",  "NULL","1500"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL AS SALARY\nFROM EMP\nORDER BY SALARY DESC;"
      }
    ],
    choices: [
      "ORDER BY 절에서 SELECT 별칭(SALARY)을 사용할 수 없으므로 오류가 발생한다.",
      "ORDER BY 절에서 SELECT 별칭 사용이 가능하며, SAL 내림차순으로 정렬된 결과가 반환된다.",
      "ORDER BY SALARY는 ORDER BY 2와 동일하므로 두 번째 컬럼(SAL)으로 정렬된다.",
      "ORDER BY는 SAL로 정렬하며, 결과 헤더는 SAL로 출력된다."
    ],
    ans: 2,
    src: "자료3 p.40~41",
    exp: {
      reason: "ORDER BY는 논리적 실행 순서상 SELECT 이후에 실행되기 때문에 SELECT 절에서 정의한 별칭을 사용할 수 있다. SALARY는 SAL의 별칭이므로 ORDER BY SALARY DESC는 SAL 내림차순 정렬을 의미하며 오류 없이 실행된다. (자료3 p.40~41)",
      terms: [
        "**ORDER BY와 SELECT 별칭**: ORDER BY는 SELECT 다음에 실행 → SELECT에서 정의한 별칭 사용 가능",
        "**WHERE/GROUP BY/HAVING에서 별칭**: 이 절들은 SELECT보다 먼저 실행되어 별칭 사용 불가",
        "**논리적 실행 순서**: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY"
      ],
      wrong: [
        "1. ORDER BY는 SELECT 이후에 처리되므로 SELECT 별칭 사용이 가능하다. 오류 없음.",
        "2. (정답) ORDER BY SALARY는 SELECT 별칭을 사용한 것으로 SAL 내림차순 정렬이 정상 적용된다.",
        "3. ORDER BY SALARY는 열 번호가 아닌 별칭으로 참조하는 것이다. ORDER BY 2와는 다른 표현이다.",
        "4. 결과 헤더는 SELECT에서 정의한 별칭 SALARY로 출력된다."
      ],
      tip: "ORDER BY만 SELECT 별칭 사용 가능. WHERE/GROUP BY/HAVING은 불가(SELECT 이전 실행)."
    }
  },
  {
    id: 640,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "상",
    has_code: true,
    q: "다음 Oracle과 SQL Server의 NULL 정렬 동작 차이에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["ENAME", "DEPTNO"],
        rows: [
          ["KIM",  "10"],
          ["LEE",  "10"],
          ["PARK", "20"],
          ["CHOI", "20"],
          ["JUNG", "30"],
          ["HAN",  "NULL"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO FROM EMP\nORDER BY DEPTNO ASC;"
      }
    ],
    choices: [
      "Oracle에서 위 SQL 실행 시 HAN이 마지막 행으로 출력된다.",
      "SQL Server에서 위 SQL 실행 시 HAN이 첫 번째 행으로 출력된다.",
      "Oracle에서 ORDER BY DEPTNO DESC를 실행하면 HAN이 첫 번째 행으로 출력된다.",
      "Oracle에서 NULL을 오름차순 정렬 시 맨 앞에 위치시키려면 ORDER BY DEPTNO ASC NULLS LAST를 사용한다."
    ],
    ans: 4,
    src: "자료3 p.40~41; TRAPS.md T-05",
    exp: {
      reason: "Oracle에서 NULL을 ASC 정렬 시 맨 앞에 위치시키려면 'ORDER BY DEPTNO ASC NULLS FIRST'를 사용해야 한다. 'NULLS LAST'는 NULL을 마지막에 위치시키는 옵션으로, Oracle ASC의 기본 동작과 동일하다. NULLS FIRST가 기본에서 벗어나 NULL을 앞으로 옮기는 옵션이다. (자료3 p.40~41; T-05)",
      terms: [
        "**Oracle NULL**: 최댓값 취급 → ASC 시 끝(NULLS LAST), DESC 시 처음(NULLS FIRST)",
        "**SQL Server NULL**: 최솟값 취급 → ASC 시 처음(NULLS FIRST), DESC 시 끝(NULLS LAST)",
        "**NULLS FIRST/LAST**: Oracle, PostgreSQL 지원. 기본 동작 변경 가능"
      ],
      wrong: [
        "1. Oracle ASC에서 NULL은 최댓값이므로 가장 마지막에 출력된다. 올바른 설명이다.",
        "2. SQL Server ASC에서 NULL은 최솟값이므로 가장 처음에 출력된다. 올바른 설명이다.",
        "3. Oracle DESC에서 NULL은 최댓값이 역순 정렬 시 가장 먼저 오므로 첫 번째가 된다. 올바른 설명이다.",
        "4. (정답) NULL을 ASC에서 맨 앞에 두려면 NULLS FIRST를 사용해야 한다. NULLS LAST는 마지막에 두는 옵션으로 Oracle ASC 기본과 동일하다."
      ],
      tip: "Oracle ASC 기본 = NULLS LAST. 앞으로 옮기려면 ASC NULLS FIRST 명시."
    }
  }
];

module.exports = b2Part2;

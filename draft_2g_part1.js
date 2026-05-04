// 2-G Part 1: Q301~Q314 (서브쿼리 개념 + 연관/비연관 + 스칼라 + 인라인뷰)
// 자료3 p.51~55 기반. 정답은 자료에 명시된 내용만 사용.
// PostgreSQL 검증: sqld_verify DB에서 직접 실행해 결과 확정.
//   - T_E(EMPNO, ENAME, DEPTNO, SAL):
//       (1,KIM,10,3000) (2,LEE,10,2500) (3,PARK,20,2000) (4,CHOI,20,1500) (5,HAN,NULL,1000)
//   - T_D(DEPTNO, DNAME): (10,SALES) (20,IT) (30,HR)
const g2Part1 = [
  // ============================================================
  // 토픽 99: 서브쿼리 개념 및 사용 규칙 (Q301~Q303) - 3문항
  // ============================================================
  {
    id: 301,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "하",
    has_code: false,
    q: "다음 중 서브쿼리(Subquery)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "하나의 SQL 문장 안에 포함되어 메인쿼리를 보조하는 또 다른 SELECT 문이다.",
      "SELECT 절, FROM 절, WHERE 절, HAVING 절, ORDER BY 절 등 다양한 위치에 사용할 수 있다.",
      "GROUP BY 절에는 서브쿼리를 사용할 수 없다.",
      "서브쿼리는 반드시 메인쿼리보다 먼저 실행되어야 하며 실행 순서는 항상 고정된다."
    ],
    ans: 4,
    src: "자료3 p.51",
    exp: {
      reason: "서브쿼리의 실행 순서는 항상 고정되어 있지 않다. 비연관 서브쿼리는 먼저 실행되어 메인에 결과를 제공하지만, 연관 서브쿼리는 메인쿼리의 행마다 반복 실행되므로 순서가 상황에 따라 다르다. (자료3 p.51)",
      terms: [
        "**서브쿼리**: 하나의 SQL 문장 안에 포함되어 메인쿼리를 보조하는 SELECT",
        "**사용 가능 위치**: SELECT, FROM, WHERE, HAVING, ORDER BY, INSERT VALUES, UPDATE SET (GROUP BY 불가)",
        "**연관 서브쿼리**: 메인쿼리 행마다 실행 (메인 → 서브 흐름)",
        "**비연관 서브쿼리**: 한 번만 실행되어 메인에 결과 제공 (서브 → 메인 흐름)"
      ],
      wrong: [
        "1. 서브쿼리의 정의 그대로다.",
        "2. 자료3 p.51의 사용 가능 위치 목록 그대로다.",
        "3. GROUP BY 절은 서브쿼리 사용 불가 위치로 명시되어 있다.",
        "4. (정답) 메인이 서브에 데이터를 제공할 수도 있고 그 반대도 가능하므로 순서가 상황에 따라 다르다."
      ],
      tip: "서브쿼리 위치는 SELECT/FROM/WHERE/HAVING/ORDER BY 가능, GROUP BY 불가. 실행 순서는 상황 의존."
    }
  },
  {
    id: 302,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: false,
    q: "다음 중 서브쿼리 사용 시 주의 사항으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "서브쿼리는 반드시 괄호로 감싸서 사용해야 한다.",
      "서브쿼리 안에서는 ORDER BY를 사용할 수 없다. (단, ORDER BY 절 안에서 서브쿼리 사용은 가능)",
      "단일행 비교 연산자(=, <, >, <=, >=, <>)는 서브쿼리 결과가 반드시 1건 이하여야 한다.",
      "다중행 비교 연산자(IN, ANY, ALL, EXISTS)는 서브쿼리 결과가 반드시 2건 이상이어야 사용할 수 있다."
    ],
    ans: 4,
    src: "자료3 p.51",
    exp: {
      reason: "다중행 비교 연산자(IN, ANY, ALL, EXISTS)는 서브쿼리의 결과 건수와 상관없이 사용 가능하다. 결과가 0건이거나 1건이어도 정상 동작한다. 자료3 p.51에 '복수행 비교 연산자는 서브쿼리의 결과 건수와 상관없음'으로 명시되어 있다. (자료3 p.51)",
      terms: [
        "**괄호 의무**: 서브쿼리는 반드시 ( )로 감싼다",
        "**ORDER BY 금지**: 서브쿼리 안에는 ORDER BY 사용 불가 (TOP-N 분석 등 예외)",
        "**단일행 연산자(=, <, >, <=, >=, <>)**: 서브쿼리 결과가 1건 이하여야 함 (다중행 시 오류)",
        "**다중행 연산자(IN/ANY/ALL/EXISTS)**: 결과 건수 무관, 항상 사용 가능"
      ],
      wrong: [
        "1. 자료3 p.51의 첫 번째 사용 규칙이다.",
        "2. 자료3 p.51의 ORDER BY 사용 불가 규칙이다.",
        "3. 단일행 비교 연산자의 사용 조건 그대로다.",
        "4. (정답) 다중행 연산자는 결과 건수와 상관없이 사용 가능하다."
      ],
      tip: "단일행 연산자는 결과 1건 이하 강제, 다중행 연산자는 건수 무관."
    }
  },
  {
    id: 303,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL 중 문법 오류가 발생하는 것을 모두 고른 것은? (Oracle 환경 기준)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "(가) SELECT * FROM EMP WHERE SAL > (SELECT AVG(SAL) FROM EMP);\n(나) SELECT * FROM EMP WHERE SAL = (SELECT SAL FROM EMP ORDER BY SAL DESC);\n(다) SELECT EMPNO, (SELECT DNAME FROM DEPT D WHERE D.DEPTNO = E.DEPTNO) FROM EMP E;\n(라) SELECT * FROM EMP GROUP BY (SELECT DEPTNO FROM DEPT);"
      }
    ],
    choices: [
      "(가), (다)",
      "(나), (라)",
      "(가), (나)",
      "(다), (라)"
    ],
    ans: 2,
    src: "자료3 p.51",
    exp: {
      reason: "(나)는 서브쿼리 안에 ORDER BY를 사용해 오류. 서브쿼리 안 ORDER BY는 사용 불가. (라)는 GROUP BY 절에 서브쿼리를 사용해 오류. GROUP BY 절은 서브쿼리 사용 가능 위치 목록에 포함되지 않는다. (가)는 비연관 서브쿼리로 정상, (다)는 스칼라 서브쿼리로 정상이다. (자료3 p.51)",
      terms: [
        "**ORDER BY 금지 위치**: 서브쿼리 내부 (단, 메인쿼리의 ORDER BY 절 안에서 서브쿼리 사용은 가능)",
        "**서브쿼리 사용 가능 절**: SELECT, FROM, WHERE, HAVING, ORDER BY, INSERT VALUES, UPDATE SET",
        "**서브쿼리 사용 불가 절**: GROUP BY",
        "**스칼라 서브쿼리**: SELECT 절에 사용, 단일행/단일열 반환 (다)"
      ],
      wrong: [
        "1. (가)는 정상 비연관 서브쿼리, (다)도 정상 스칼라 서브쿼리.",
        "2. (정답) (나)는 서브쿼리 내 ORDER BY 금지, (라)는 GROUP BY 절 서브쿼리 금지.",
        "3. (가)는 정상 동작.",
        "4. (다)는 정상 스칼라 서브쿼리."
      ],
      tip: "서브쿼리 안 ORDER BY 금지, GROUP BY 절에 서브쿼리 금지. 두 함정 동시 출제."
    }
  },

  // ============================================================
  // 토픽 100: 연관 vs 비연관 서브쿼리 (Q304~Q306) - 3문항
  // ============================================================
  {
    id: 304,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "하",
    has_code: false,
    q: "다음 중 연관 서브쿼리(Correlated Subquery)와 비연관 서브쿼리(Un-Correlated Subquery)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "연관 서브쿼리는 서브쿼리가 메인쿼리의 컬럼을 참조한다.",
      "비연관 서브쿼리는 메인쿼리 컬럼을 참조하지 않으며, 일반적으로 한 번만 실행되어 메인쿼리에 결과를 제공한다.",
      "연관 서브쿼리는 일반적으로 메인쿼리가 먼저 수행되어 읽은 데이터를 서브쿼리에서 조건이 맞는지 확인할 때 사용한다.",
      "비연관 서브쿼리는 메인쿼리의 행마다 반복 실행되어 행별로 다른 결과값을 만들어낸다."
    ],
    ans: 4,
    src: "자료3 p.51",
    exp: {
      reason: "메인쿼리의 행마다 반복 실행되는 것은 연관(Correlated) 서브쿼리이다. 비연관 서브쿼리는 메인쿼리 컬럼을 참조하지 않으므로 한 번만 실행되어 그 결과를 메인쿼리에 제공한다. (자료3 p.51)",
      terms: [
        "**연관 서브쿼리(Correlated)**: 서브쿼리가 메인쿼리의 컬럼을 가짐. 메인 행마다 1번씩 재실행",
        "**비연관 서브쿼리(Un-Correlated)**: 서브쿼리가 메인쿼리 컬럼을 가지지 않음. 1번만 실행",
        "**연관 서브쿼리 목적**: 메인이 먼저 읽은 데이터에 대해 서브에서 조건 확인",
        "**비연관 서브쿼리 목적**: 서브 결과를 메인쿼리에 값으로 제공"
      ],
      wrong: [
        "1. 연관 서브쿼리의 정의 그대로다.",
        "2. 비연관 서브쿼리의 정의 그대로다.",
        "3. 자료3 p.51의 연관 서브쿼리 목적 설명이다.",
        "4. (정답) 메인 행마다 반복 실행되는 것은 연관 서브쿼리이다."
      ],
      tip: "메인 컬럼 참조 = 연관(행마다 반복). 참조 없음 = 비연관(1번만)."
    }
  },
  {
    id: 305,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL 중 연관 서브쿼리(Correlated Subquery)에 해당하는 것을 모두 고른 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "(가) SELECT * FROM EMP\n     WHERE SAL > (SELECT AVG(SAL) FROM EMP);\n\n(나) SELECT * FROM EMP E\n     WHERE SAL > (SELECT AVG(SAL) FROM EMP E2 WHERE E2.DEPTNO = E.DEPTNO);\n\n(다) SELECT ENAME, (SELECT DNAME FROM DEPT D WHERE D.DEPTNO = E.DEPTNO) AS DNAME\n     FROM EMP E;\n\n(라) SELECT * FROM EMP\n     WHERE DEPTNO IN (SELECT DEPTNO FROM DEPT WHERE LOC = 'SEOUL');"
      }
    ],
    choices: [
      "(가), (다)",
      "(나), (다)",
      "(가), (라)",
      "(나), (라)"
    ],
    ans: 2,
    src: "자료3 p.51",
    exp: {
      reason: "연관 서브쿼리는 서브쿼리가 메인쿼리의 컬럼을 참조한다. (나)는 서브쿼리에서 메인 별칭 E의 DEPTNO를 참조하고, (다)는 서브쿼리에서 메인 별칭 E의 DEPTNO를 참조한다. (가)는 메인 컬럼 참조 없음, (라)도 DEPT 테이블만 참조하므로 비연관. (자료3 p.51)",
      terms: [
        "**연관 서브쿼리 식별 키**: 서브쿼리 안에 메인쿼리 별칭/컬럼이 등장",
        "**(나) 연관**: E2.DEPTNO = E.DEPTNO에서 E.DEPTNO가 메인 컬럼",
        "**(다) 연관**: D.DEPTNO = E.DEPTNO에서 E.DEPTNO가 메인 컬럼",
        "**(가) 비연관**: 서브쿼리가 메인의 EMP를 참조하지만 컬럼 참조는 없음 (전체 평균)",
        "**(라) 비연관**: DEPT 안에서만 조건 처리"
      ],
      wrong: [
        "1. (가)는 비연관, (다)는 연관. 한 개만 맞음.",
        "2. (정답) (나), (다) 모두 메인쿼리 컬럼을 참조한다.",
        "3. (가), (라) 둘 다 비연관이다.",
        "4. (라)는 비연관 서브쿼리이다."
      ],
      tip: "서브쿼리 안에 메인 별칭(E.컬럼) 보이면 연관, 없으면 비연관."
    }
  },
  {
    id: 306,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: false,
    q: "다음 중 연관 서브쿼리에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "서브쿼리가 메인쿼리의 컬럼을 참조하므로, 메인쿼리의 행마다 서브쿼리가 1번씩 실행될 수 있다.",
      "메인쿼리가 먼저 수행되어 읽은 데이터에 대해 서브쿼리에서 조건이 맞는지 확인하는 용도로 자주 쓰인다.",
      "서브쿼리만 단독으로 분리해 실행해도 메인쿼리 컬럼을 알 수 없어 일반적으로 오류가 발생한다.",
      "비연관 서브쿼리에 비해 일반적으로 한 번만 실행되어 빠르므로 성능상 항상 유리하다."
    ],
    ans: 4,
    src: "자료3 p.51",
    exp: {
      reason: "한 번만 실행되어 빠른 것은 비연관 서브쿼리이다. 연관 서브쿼리는 메인쿼리 행마다 반복 실행되므로 일반적으로 비연관보다 비용이 더 들 수 있다. 따라서 '항상 유리'는 잘못된 설명이다. (자료3 p.51)",
      terms: [
        "**연관 서브쿼리 실행**: 메인쿼리 행마다 1번씩 반복",
        "**비연관 서브쿼리 실행**: 1번만 실행",
        "**단독 실행 불가**: 연관 서브쿼리는 메인 별칭 참조 때문에 단독으로 떼어서 실행하면 보통 오류",
        "**성능 비교**: 일반적으로 비연관이 빠르나 옵티마이저 최적화로 케이스마다 다름"
      ],
      wrong: [
        "1. 연관 서브쿼리의 동작 방식이 맞다.",
        "2. 자료3 p.51의 연관 서브쿼리 사용 목적이다.",
        "3. 메인 별칭(E.DEPTNO 등)을 참조하므로 단독 실행 시 오류가 정상이다.",
        "4. (정답) 한 번만 실행되는 것은 비연관 서브쿼리. 연관이 항상 빠르다는 것은 거짓."
      ],
      tip: "한 번만 실행 = 비연관. 연관은 메인 행마다 반복 → 보통 더 비쌈."
    }
  },

  // ============================================================
  // 토픽 101: 스칼라 서브쿼리 (SELECT절) (Q307~Q311) - 5문항
  // ============================================================
  {
    id: 307,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "하",
    has_code: false,
    q: "다음 중 스칼라 서브쿼리(Scalar Subquery)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "SELECT 절에 위치하며, 메인쿼리의 각 행마다 정확히 하나의 값을 반환한다.",
      "서브쿼리는 반드시 단일 행, 단일 열을 반환해야 한다.",
      "서브쿼리의 결과가 여러 행을 반환하면 오류가 발생한다.",
      "메인쿼리의 행에 매칭되는 데이터가 서브쿼리에 없으면 해당 컬럼은 결과에서 자동으로 생략된다."
    ],
    ans: 4,
    src: "자료3 p.52~53",
    exp: {
      reason: "매칭되는 데이터가 없으면 해당 컬럼 값은 NULL로 표현된다. 행 자체나 컬럼이 생략되는 것이 아니다. 자료3 p.53에 '매칭되는 데이터가 없는 경우 해당 컬럼에 대한 값은 NULL로 표현된다(생략되는 게 아님)'으로 명시되어 있다. (자료3 p.52~53)",
      terms: [
        "**스칼라 서브쿼리**: SELECT 절에 사용, 메인 각 행마다 단일행/단일열 반환",
        "**OUTER JOIN과 동일 결과**: 매칭 없으면 NULL을 채워넣는 동작이 LEFT OUTER JOIN과 같음",
        "**다중 행 반환 시**: 'more than one row returned by a subquery used as an expression' 오류",
        "**'생략되는 게 아님'**: NULL로 표시될 뿐 행/컬럼 자체는 그대로 유지"
      ],
      wrong: [
        "1. 스칼라 서브쿼리의 기본 동작이다.",
        "2. 단일행/단일열 반환은 스칼라의 핵심 제약이다.",
        "3. 다중행 반환 시 오류가 발생하는 것이 맞다.",
        "4. (정답) 매칭 없으면 NULL로 표현된다. 생략되지 않는다."
      ],
      tip: "스칼라 서브쿼리: 단일행/단일열 강제, 매칭 없으면 NULL(생략 아님), OUTER JOIN과 동일 결과."
    }
  },
  {
    id: 308,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL"],
        rows: [
          [1, "KIM", 10, 3000],
          [2, "LEE", 10, 2500],
          [3, "PARK", 20, 2000],
          [4, "CHOI", 20, 1500],
          [5, "HAN", null, 1000]
        ]
      },
      {
        type: "table",
        title: "[DEPT]",
        headers: ["DEPTNO", "DNAME"],
        rows: [
          [10, "SALES"],
          [20, "IT"],
          [30, "HR"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT E.ENAME,\n       (SELECT D.DNAME FROM DEPT D WHERE D.DEPTNO = E.DEPTNO) AS DNAME\nFROM EMP E\nORDER BY E.EMPNO;"
      }
    ],
    choices: [
      "총 5건. HAN의 DNAME은 NULL로 표시된다.",
      "총 4건. HAN(DEPTNO=NULL)은 결과에서 자동 제외된다.",
      "총 5건. HAN의 DNAME은 'HR'로 채워진다.",
      "다중 행을 반환하므로 오류가 발생한다."
    ],
    ans: 1,
    src: "자료3 p.53",
    exp: {
      reason: "스칼라 서브쿼리는 메인쿼리의 행마다 단일값을 반환한다. EMP 5건 모두 결과 행에 포함되며, HAN(DEPTNO=NULL)은 DEPT와 매칭되는 행이 없으므로 DNAME 컬럼만 NULL로 채워진다. 행이 생략되지 않는다. PostgreSQL 검증 완료. (자료3 p.53)",
      terms: [
        "**스칼라 서브쿼리 결과 행 수**: 메인쿼리 행 수와 동일 (LEFT OUTER JOIN 효과)",
        "**매칭 실패 처리**: 결과 컬럼 값이 NULL (행 보존)",
        "**HAN 케이스**: DEPTNO=NULL이라 DEPT.DEPTNO=NULL 비교는 unknown → 매칭 0건 → DNAME=NULL",
        "**검증**: PostgreSQL에서 5건 반환, HAN의 DNAME=NULL 확인"
      ],
      wrong: [
        "1. (정답) 5건 유지, HAN의 DNAME만 NULL.",
        "2. 스칼라 서브쿼리는 INNER JOIN처럼 행을 제외하지 않는다.",
        "3. HAN의 DEPTNO=NULL이라 어떤 부서와도 매칭되지 않는다. 'HR'(30)도 아님.",
        "4. 각 행마다 단일행 반환이라 오류 아님."
      ],
      tip: "스칼라 서브쿼리는 LEFT OUTER JOIN과 동일 결과. 매칭 없으면 NULL로 채워 행 보존."
    }
  },
  {
    id: 309,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP] (5건)",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL"],
        rows: [
          [1, "KIM", 10, 3000],
          [2, "LEE", 10, 2500],
          [3, "PARK", 20, 2000],
          [4, "CHOI", 20, 1500],
          [5, "HAN", null, 1000]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME, SAL,\n       (SELECT SUM(SAL) FROM EMP) AS TOTAL_SAL\nFROM EMP;"
      }
    ],
    choices: [
      "원래 SUM은 집계함수라 다른 컬럼과 함께 SELECT 절에 올 수 없으므로 오류이다.",
      "총 5건이 반환되며 모든 행의 TOTAL_SAL 컬럼은 10000이다.",
      "총 1건만 반환되며 TOTAL_SAL은 10000이다.",
      "TOTAL_SAL 값이 행마다 달라져서 KIM=3000, LEE=2500처럼 자기 자신의 SAL이 들어간다."
    ],
    ans: 2,
    src: "자료3 p.53",
    exp: {
      reason: "스칼라 서브쿼리는 단일값을 반환하므로 SELECT 절에 다른 컬럼과 함께 사용 가능하다. 비연관 서브쿼리이므로 (SELECT SUM(SAL) FROM EMP)는 1번만 실행되어 10000을 반환하고, 5개 행 모두에 동일하게 10000이 들어간다. PostgreSQL 검증: 5행, 모두 TOTAL_SAL=10000. (자료3 p.53 SUM 예시)",
      terms: [
        "**스칼라 서브쿼리의 효용**: SUM 같은 집계값을 단일값으로 가져와 다른 컬럼과 동시 출력",
        "**비연관 서브쿼리**: 메인 컬럼 참조 없음 → 1번만 실행",
        "**결과 행 수**: 메인쿼리 행 수(EMP 5건)와 동일",
        "**자료3 p.53 예시 그대로**: '사번, 직원이름, 부서번호, 급여, 총 급여 출력'"
      ],
      wrong: [
        "1. 스칼라 서브쿼리를 통해 단일값으로 가져오므로 함께 사용 가능하다.",
        "2. (정답)",
        "3. 메인쿼리(EMP)의 행 수만큼 반환되므로 5건이다.",
        "4. 비연관이라 행마다 다른 값이 아니라 동일한 10000이 모든 행에 들어간다."
      ],
      tip: "스칼라 서브쿼리로 집계값을 단일값화 → 일반 컬럼과 함께 출력 가능. 비연관이면 모든 행에 동일값."
    }
  },
  {
    id: 310,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 [SQL-A]와 [SQL-B]의 실행 결과를 비교한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP] (5건)",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          [1, "KIM", 10],
          [2, "LEE", 10],
          [3, "PARK", 20],
          [4, "CHOI", 20],
          [5, "HAN", null]
        ]
      },
      {
        type: "table",
        title: "[DEPT]",
        headers: ["DEPTNO", "DNAME"],
        rows: [[10, "SALES"], [20, "IT"], [30, "HR"]]
      },
      {
        type: "code",
        title: "[SQL-A] 스칼라 서브쿼리",
        lang: "sql",
        content: "SELECT E.EMPNO, E.ENAME,\n       (SELECT D.DNAME FROM DEPT D WHERE D.DEPTNO = E.DEPTNO) AS DNAME\nFROM EMP E;"
      },
      {
        type: "code",
        title: "[SQL-B] LEFT OUTER JOIN",
        lang: "sql",
        content: "SELECT E.EMPNO, E.ENAME, D.DNAME\nFROM EMP E\nLEFT JOIN DEPT D ON E.DEPTNO = D.DEPTNO;"
      }
    ],
    choices: [
      "두 SQL 모두 5행을 반환하며, HAN의 DNAME은 두 SQL 모두 NULL로 동일하다.",
      "[SQL-A]는 4행, [SQL-B]는 5행을 반환한다.",
      "[SQL-A]는 5행이지만 HAN의 DNAME은 'HR'(미배정 처리)로 채워진다.",
      "두 SQL 모두 INNER JOIN과 동일하므로 4행만 반환한다."
    ],
    ans: 1,
    src: "자료3 p.53",
    exp: {
      reason: "자료3 p.53에 '스칼라 서브쿼리는 OUTER JOIN 연산을 사용한 결과와 같다'고 명시되어 있다. [SQL-A]는 매칭 없는 HAN도 행을 보존하고 DNAME만 NULL로 채우며, [SQL-B] LEFT OUTER JOIN도 같은 동작을 한다. 두 결과가 동일. PostgreSQL 검증 완료. (자료3 p.53)",
      terms: [
        "**스칼라 서브쿼리 = LEFT OUTER JOIN**: 매칭 없으면 NULL 채움 동작이 동일",
        "**행 수 보존**: 둘 다 메인(왼쪽) 테이블의 모든 행을 결과에 포함",
        "**INNER JOIN과 차이**: INNER JOIN은 매칭 안 되는 HAN을 제외 → 4행",
        "**검증**: PostgreSQL에서 두 SQL 모두 5행, HAN의 DNAME=NULL 확인"
      ],
      wrong: [
        "1. (정답) 자료에 명시된 동등성. 둘 다 5행, HAN DNAME=NULL.",
        "2. [SQL-A]는 INNER JOIN처럼 행을 제외하지 않는다.",
        "3. HAN의 DEPTNO=NULL이라 어떤 부서와도 매칭되지 않으므로 'HR'이 아닌 NULL.",
        "4. 둘 다 LEFT OUTER 효과라 INNER JOIN과 다르다."
      ],
      tip: "자료에 명시: 스칼라 서브쿼리 ≡ LEFT OUTER JOIN. 매칭 없으면 NULL로 채워 행 보존."
    }
  },
  {
    id: 311,
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
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [[1, "KIM", 10], [2, "LEE", 10], [3, "PARK", 20]]
      },
      {
        type: "table",
        title: "[DEPT]",
        headers: ["DEPTNO", "DNAME"],
        rows: [[10, "SALES"], [20, "IT"], [30, "HR"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME,\n       (SELECT DNAME FROM DEPT) AS DNAME\nFROM EMP;"
      }
    ],
    choices: [
      "정상 실행되며 EMP의 각 행에 DEPT의 첫 번째 DNAME이 동일하게 채워진다.",
      "정상 실행되며 EMP × DEPT 카타시안 곱(9행)이 반환된다.",
      "스칼라 서브쿼리가 다중 행(3행)을 반환하므로 오류가 발생한다.",
      "정상 실행되며 DNAME 컬럼이 NULL로 채워진다."
    ],
    ans: 3,
    src: "자료3 p.52",
    exp: {
      reason: "스칼라 서브쿼리는 반드시 단일행/단일열을 반환해야 한다. (SELECT DNAME FROM DEPT)는 WHERE 조건이 없어 3행을 반환하므로 'more than one row returned by a subquery used as an expression' 오류가 발생한다. PostgreSQL 검증 완료. (자료3 p.52)",
      terms: [
        "**스칼라 서브쿼리 제약**: 단일행/단일열만 가능",
        "**다중 행 반환 시**: 즉시 런타임 오류 (PostgreSQL/Oracle 모두)",
        "**오류 메시지(PostgreSQL)**: more than one row returned by a subquery used as an expression",
        "**해결**: WHERE 조건 추가, MAX/MIN 등 집계로 단일값화, LIMIT 1 등"
      ],
      wrong: [
        "1. 첫 행을 자동 선택하지 않는다. 즉시 오류.",
        "2. 스칼라 서브쿼리는 카타시안 곱을 만들지 않는다(그건 FROM 절 조인 없을 때).",
        "3. (정답) 다중 행 반환은 스칼라 서브쿼리 위반이다.",
        "4. 행이 있는데도 NULL로 처리되지 않는다. 즉시 오류."
      ],
      tip: "스칼라 서브쿼리에 WHERE 조건 빠지면 다중행 반환 → 오류. 자주 출제되는 함정."
    }
  },

  // ============================================================
  // 토픽 102: 인라인 뷰 (FROM절) (Q312~Q314) - 3문항
  // ============================================================
  {
    id: 312,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "하",
    has_code: false,
    q: "다음 중 인라인 뷰(Inline View)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "FROM 절에 사용하는 서브쿼리로, 서브쿼리의 결과를 테이블처럼 사용하기 위해 주로 쓰인다.",
      "쿼리를 실행할 때만 임시로 존재하며 데이터베이스에 별도로 저장되지 않는 일회성(동적) 뷰이다.",
      "다른 테이블과 조인할 때 인라인 뷰는 반드시 테이블 별칭을 명시해야 한다.",
      "인라인 뷰는 메인쿼리의 SELECT 절과 WHERE 절에서만 참조 가능하며 FROM 절 자체에는 사용할 수 없다."
    ],
    ans: 4,
    src: "자료3 p.54",
    exp: {
      reason: "인라인 뷰는 FROM 절에 정의하는 서브쿼리이며, 정의된 위치가 FROM이라 메인쿼리의 어느 절에서도 참조 가능하다. 자료3 p.54에 'FROM 절에 정의를 하니 중첩 서브쿼리와 다르게 서브쿼리의 결과를 메인 쿼리의 어느 절에서도 사용할 수 있음'으로 명시. 'FROM 절에 사용 불가'는 정의 자체와 모순. (자료3 p.54)",
      terms: [
        "**인라인 뷰(Inline View) = 동적 뷰(Dynamic View)**: FROM 절에 작성하는 일시적 테이블",
        "**테이블 별칭 필수**: 다른 테이블과 조인 시 별칭 명시 (PostgreSQL은 별칭 누락 시 오류)",
        "**일회성**: 데이터베이스에 저장되지 않음",
        "**참조 범위**: FROM 절에 정의되므로 SELECT/WHERE/GROUP BY 등 메인의 어느 절에서도 참조 가능"
      ],
      wrong: [
        "1. 인라인 뷰의 정의 그대로다.",
        "2. 일회성/동적 뷰의 핵심 특성이다.",
        "3. 자료3 p.54의 '반드시 테이블 별칭을 명시해야 함' 명시.",
        "4. (정답) FROM 절이 정의 위치인데 'FROM에 사용 불가'는 모순."
      ],
      tip: "인라인 뷰는 FROM 절 일회성 테이블, 별칭 필수, 메인 어느 절에서나 참조 가능."
    }
  },
  {
    id: 313,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL"],
        rows: [
          [1, "KIM", 10, 3000],
          [2, "LEE", 10, 2500],
          [3, "PARK", 20, 2000],
          [4, "CHOI", 20, 1500],
          [5, "HAN", null, 1000]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT E.ENAME, E.SAL, V.AVG_SAL\nFROM EMP E\nJOIN (SELECT DEPTNO, AVG(SAL) AS AVG_SAL\n      FROM EMP\n      WHERE DEPTNO IS NOT NULL\n      GROUP BY DEPTNO) V\n  ON E.DEPTNO = V.DEPTNO\nWHERE E.SAL > V.AVG_SAL;"
      }
    ],
    choices: [
      "0행",
      "2행 (KIM, PARK)",
      "4행 (KIM, LEE, PARK, CHOI)",
      "5행 (전 사원)"
    ],
    ans: 2,
    src: "자료3 p.55",
    exp: {
      reason: "인라인 뷰 V는 부서별 평균 급여 — DEPTNO=10:2750, DEPTNO=20:1750. 메인 EMP와 DEPTNO로 조인 후 SAL > AVG_SAL 필터. KIM(3000>2750)과 PARK(2000>1750) 2명만 통과. LEE(2500<2750), CHOI(1500<1750)은 탈락. HAN(DEPTNO=NULL)은 조인 단계에서 제외. PostgreSQL 검증 완료 — 2행. (자료3 p.55 예시)",
      terms: [
        "**인라인 뷰**: 서브쿼리가 미리 부서별 평균 계산 → 임시 테이블처럼 사용",
        "**부서별 평균**: DEPTNO=10 → (3000+2500)/2 = 2750, DEPTNO=20 → (2000+1500)/2 = 1750",
        "**조인 + 필터**: 메인의 SAL을 V.AVG_SAL과 비교, SAL > 평균 행만",
        "**자료3 p.55 패턴**: '각 작가의 평균 수입보다 높은 가격인 그림들의 목록' 동일 구조"
      ],
      wrong: [
        "1. 평균보다 높은 사원이 분명히 존재한다.",
        "2. (정답) KIM(3000>2750), PARK(2000>1750) 두 명.",
        "3. LEE/CHOI는 자기 부서 평균 이하라 제외된다.",
        "4. HAN은 DEPTNO=NULL이라 인라인 뷰와 조인 안 됨."
      ],
      tip: "인라인 뷰로 부서별 평균 계산 후 자기 부서 평균과 비교 패턴. 자주 출제."
    }
  },
  {
    id: 314,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL 중 정상 실행되는 것을 모두 고른 것은? (PostgreSQL/Oracle 표준 동작 기준)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "(가) SELECT * FROM (SELECT DEPTNO, AVG(SAL) FROM EMP GROUP BY DEPTNO);\n\n(나) SELECT V.DEPTNO, V.AVG_SAL\n     FROM (SELECT DEPTNO, AVG(SAL) AS AVG_SAL FROM EMP GROUP BY DEPTNO) V\n     WHERE V.AVG_SAL > 2000;\n\n(다) SELECT V.DEPTNO\n     FROM (SELECT DEPTNO, AVG(SAL) FROM EMP GROUP BY DEPTNO) V\n     WHERE V.AVG_SAL > 2000;\n\n(라) SELECT DEPTNO\n     FROM (SELECT DEPTNO, AVG(SAL) AS AVG_SAL FROM EMP GROUP BY DEPTNO) V\n     ORDER BY V.AVG_SAL;"
      }
    ],
    choices: [
      "(가), (나)",
      "(나), (라)",
      "(가), (다)",
      "(나), (다), (라)"
    ],
    ans: 2,
    src: "자료3 p.54~55",
    exp: {
      reason: "(가) PostgreSQL은 인라인 뷰에 테이블 별칭 누락 시 'subquery in FROM must have an alias' 오류. (다) 인라인 뷰의 집계함수에 별칭(AVG_SAL)을 안 줬는데 외부에서 V.AVG_SAL로 참조 → 컬럼 미존재 오류. (나)는 별칭/컬럼명 모두 정상. (라)는 인라인 뷰에서 정의한 별칭을 메인 ORDER BY에서 사용 가능 → 정상. (자료3 p.55: '집계함수를 사용하고 결과값을 메인 조건절에 사용하려면 별칭 무조건 정해야 함')",
      terms: [
        "**인라인 뷰 별칭 의무 1**: 인라인 뷰 자체(V)에 테이블 별칭 필수 — (가)에서 누락",
        "**인라인 뷰 별칭 의무 2**: 집계함수 결과를 외부에서 참조하려면 컬럼 별칭(AS AVG_SAL) 필수 — (다)에서 누락",
        "**(나) 정상**: 두 별칭 모두 명시",
        "**(라) 정상**: 인라인 뷰에서 정의한 V.AVG_SAL을 메인 ORDER BY에서 참조 — 별칭 살아있음"
      ],
      wrong: [
        "1. (가)는 테이블 별칭이 없어 오류.",
        "2. (정답) (나)와 (라)만 별칭이 모두 갖춰져 정상.",
        "3. (가)와 (다) 모두 별칭 누락으로 오류.",
        "4. (다)는 V.AVG_SAL을 만들지 않았으므로 오류."
      ],
      tip: "인라인 뷰는 (1) 뷰 자체에 별칭 (2) 집계함수에 컬럼 별칭, 두 개 다 필수."
    }
  }
];

module.exports = g2Part1;

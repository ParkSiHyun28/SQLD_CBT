// 2-G Part 3: Q329~Q340 (EXISTS/NOT EXISTS + 다중컬럼 + 상호연관 서브쿼리)
// 자료3 p.56~58 기반. 정답은 자료에 명시된 내용 또는 PostgreSQL 검증 결과만 사용.
// PostgreSQL 검증: sqld_verify DB에서 모든 코드 직접 실행 확인.
const g2Part3 = [
  // ============================================================
  // 토픽 105: EXISTS와 NOT EXISTS (Q329~Q333) — 5문항
  // ============================================================
  {
    id: 329,
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
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          ["1", "KIM", "10"],
          ["2", "LEE", "10"],
          ["3", "PARK", "20"],
          ["4", "CHOI", "20"]
        ]
      },
      {
        type: "table",
        title: "[DEPT]",
        headers: ["DEPTNO", "DNAME"],
        rows: [
          ["10", "SALES"],
          ["20", "IT"],
          ["30", "HR"],
          ["40", "OPS"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT D.DNAME\nFROM DEPT D\nWHERE EXISTS (SELECT 1 FROM EMP E WHERE E.DEPTNO = D.DEPTNO)\nORDER BY D.DEPTNO;"
      }
    ],
    choices: [
      "SALES, IT",
      "SALES, IT, HR, OPS",
      "HR, OPS",
      "결과 없음"
    ],
    ans: 1,
    src: "자료3 p.58",
    exp: {
      reason: "EXISTS는 서브쿼리가 한 행이라도 반환하면 TRUE. DEPT의 각 행에 대해 같은 DEPTNO를 가진 EMP가 있는지 검사하므로 사원이 존재하는 부서 SALES(10), IT(20)만 통과. HR(30), OPS(40)은 EMP에 매칭이 없어 제외. PostgreSQL 검증 완료. (자료3 p.58)",
      terms: [
        "**EXISTS**: 서브쿼리가 한 행이라도 반환하면 TRUE (행 존재 여부만 검사)",
        "**SELECT 1 vs SELECT \\***: EXISTS는 행 존재만 확인하므로 SELECT 절 내용은 무시됨",
        "**상호연관 형태**: 서브쿼리에서 메인쿼리 컬럼(D.DEPTNO) 참조",
        "**의미**: '존재하는' 부서를 거르는 교집합(세미조인) 패턴"
      ],
      wrong: [
        "1. (정답) EMP에 매칭 행이 있는 부서.",
        "2. EXISTS 의미를 무시하고 모든 부서를 반환한다고 본 경우.",
        "3. NOT EXISTS 결과(매칭 없는 부서). EXISTS와 정반대.",
        "4. EXISTS가 항상 FALSE라고 본 경우."
      ],
      tip: "EXISTS = 한 행이라도 있으면 TRUE = 매칭되는 부서만 살아남는다."
    }
  },
  {
    id: 330,
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
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          ["1", "KIM", "10"],
          ["2", "LEE", "10"],
          ["3", "PARK", "20"],
          ["4", "CHOI", "20"]
        ]
      },
      {
        type: "table",
        title: "[DEPT]",
        headers: ["DEPTNO", "DNAME"],
        rows: [
          ["10", "SALES"],
          ["20", "IT"],
          ["30", "HR"],
          ["40", "OPS"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT D.DNAME\nFROM DEPT D\nWHERE NOT EXISTS (SELECT 1 FROM EMP E WHERE E.DEPTNO = D.DEPTNO)\nORDER BY D.DEPTNO;"
      }
    ],
    choices: [
      "SALES, IT",
      "HR, OPS",
      "SALES, IT, HR, OPS",
      "결과 없음"
    ],
    ans: 2,
    src: "자료3 p.58",
    exp: {
      reason: "NOT EXISTS는 서브쿼리가 0행을 반환하면 TRUE. 즉 EMP에 같은 DEPTNO 행이 없는 부서만 통과. HR(30), OPS(40)이 해당. SALES, IT는 EMP에 매칭 행이 있어 제외. PostgreSQL 검증 완료. (자료3 p.58)",
      terms: [
        "**NOT EXISTS**: 서브쿼리가 0행 반환 시 TRUE (차집합 패턴)",
        "**차집합 의미**: A에 있고 B에는 없는 행을 골라낸다",
        "**NOT IN과의 차이**: NOT EXISTS는 NULL의 영향을 받지 않으나, NOT IN은 서브쿼리에 NULL 한 건만 있어도 전체 결과가 0행",
        "**SQL 동작**: 메인쿼리 행마다 서브쿼리를 실행해 행 존재 여부만 확인"
      ],
      wrong: [
        "1. EXISTS 결과(매칭 있는 부서). NOT EXISTS와 정반대.",
        "2. (정답) EMP에 매칭이 없는 부서.",
        "3. 모든 부서 반환은 NOT EXISTS 의미를 무시한 경우.",
        "4. NOT EXISTS가 항상 FALSE라고 본 경우."
      ],
      tip: "NOT EXISTS = 0행이면 TRUE = 차집합. NOT IN의 NULL 함정도 회피한다."
    }
  },
  {
    id: 331,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "상",
    has_code: true,
    q: "다음 두 SQL의 실행 결과로 옳은 것은? (EMP의 OH 사원은 DEPTNO가 NULL이다)",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          ["1", "KIM", "10"],
          ["2", "LEE", "20"],
          ["3", "OH", "NULL"]
        ]
      },
      {
        type: "table",
        title: "[DEPT]",
        headers: ["DEPTNO", "DNAME"],
        rows: [
          ["10", "SALES"],
          ["20", "IT"],
          ["30", "HR"]
        ]
      },
      {
        type: "code",
        title: "(가) NOT IN",
        lang: "sql",
        content: "SELECT D.DNAME\nFROM DEPT D\nWHERE D.DEPTNO NOT IN (SELECT E.DEPTNO FROM EMP E);"
      },
      {
        type: "code",
        title: "(나) NOT EXISTS",
        lang: "sql",
        content: "SELECT D.DNAME\nFROM DEPT D\nWHERE NOT EXISTS (SELECT 1 FROM EMP E WHERE E.DEPTNO = D.DEPTNO);"
      }
    ],
    choices: [
      "(가) HR / (나) HR",
      "(가) 결과 없음 / (나) HR",
      "(가) HR / (나) 결과 없음",
      "(가)와 (나) 모두 결과 없음"
    ],
    ans: 2,
    src: "자료3 p.58",
    exp: {
      reason: "(가) NOT IN: 서브쿼리 결과에 NULL이 포함되면 'D.DEPTNO != NULL'은 UNKNOWN이 되어 모든 비교가 UNKNOWN이 되고 WHERE 절이 TRUE가 되지 못한다. 따라서 0행. (나) NOT EXISTS: NULL과 무관하게 매칭 행 존재 여부만 검사하므로 HR(30) 1행 반환. PostgreSQL 검증 완료. (자료3 p.58)",
      terms: [
        "**NOT IN의 NULL 함정**: 서브쿼리에 NULL이 한 건이라도 있으면 결과가 항상 0행 (UNKNOWN 전파)",
        "**NOT EXISTS**: 행 존재만 확인. NULL 영향 없음 (NULL=NULL이 UNKNOWN이어도 매칭 안 된 것으로 처리)",
        "**실무 권장**: 차집합은 NOT EXISTS 사용 (NULL 안전)",
        "**UNKNOWN 전파**: WHERE 절은 TRUE만 통과시키므로 UNKNOWN은 FALSE처럼 취급"
      ],
      wrong: [
        "1. NOT IN의 NULL 함정을 모른 경우. 서브쿼리에 NULL이 섞이면 0행이 정답.",
        "2. (정답) NOT IN은 NULL 때문에 0행, NOT EXISTS는 정상 동작.",
        "3. NOT EXISTS도 NULL 영향을 받는다고 본 경우. NOT EXISTS는 NULL과 무관.",
        "4. 두 쿼리가 항상 같다고 본 경우. NULL 처리에서 다르다."
      ],
      tip: "NOT IN + 서브쿼리 NULL = 0행 함정. 차집합은 NOT EXISTS로 안전하게."
    }
  },
  {
    id: 332,
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
          ["1", "KIM", "10", "3000"],
          ["2", "LEE", "10", "2500"],
          ["3", "PARK", "20", "2000"],
          ["4", "CHOI", "20", "1500"],
          ["5", "JUNG", "30", "1800"]
        ]
      },
      {
        type: "table",
        title: "[DEPT]",
        headers: ["DEPTNO", "DNAME"],
        rows: [
          ["10", "SALES"],
          ["20", "IT"],
          ["30", "HR"],
          ["40", "OPS"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT D.DNAME\nFROM DEPT D\nWHERE EXISTS (SELECT 1 FROM EMP E\n              WHERE E.DEPTNO = D.DEPTNO\n                AND E.SAL >= 2500)\nORDER BY D.DEPTNO;"
      }
    ],
    choices: [
      "SALES",
      "SALES, IT",
      "SALES, IT, HR",
      "SALES, IT, HR, OPS"
    ],
    ans: 1,
    src: "자료3 p.58",
    exp: {
      reason: "EXISTS 안의 서브쿼리는 메인쿼리 D.DEPTNO를 참조하는 상호연관 형태. 부서별로 SAL >= 2500 사원이 있는지 검사. SALES(10): KIM(3000), LEE(2500) → 통과. IT(20): 최대 2000 → 미통과. HR(30): 1800 → 미통과. OPS(40): 사원 없음. 따라서 SALES만. PostgreSQL 검증 완료. (자료3 p.58)",
      terms: [
        "**EXISTS + 추가 조건**: 서브쿼리 WHERE에 다른 조건을 더해 '특정 조건을 만족하는 행이 있는' 부모만 거를 수 있다",
        "**상호연관**: 부서마다 서브쿼리가 1번씩 재실행되어 그 부서의 사원만 검사",
        "**세미조인 의미**: 메인 결과를 반환하면서 자식 테이블의 존재 조건을 부과",
        "**대안 패턴**: 같은 결과를 IN/JOIN+DISTINCT로도 표현 가능"
      ],
      wrong: [
        "1. (정답) SAL>=2500 사원이 있는 부서는 SALES뿐.",
        "2. IT의 최댓값을 2500 이상으로 착각.",
        "3. HR(1800)도 통과한다고 본 경우.",
        "4. EXISTS의 추가 조건을 무시한 경우."
      ],
      tip: "EXISTS 서브쿼리에 조건을 더하면 '그 조건을 만족하는 자식이 있는 부모'만 골라진다."
    }
  },
  {
    id: 333,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: false,
    q: "다음 중 EXISTS와 NOT EXISTS에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "EXISTS는 서브쿼리가 1건 이상 행을 반환하면 TRUE를 반환한다.",
      "NOT EXISTS는 서브쿼리가 0건을 반환할 때 TRUE를 반환하므로 차집합 표현에 적합하다.",
      "EXISTS의 SELECT 절에 어떤 컬럼/표현식을 적든 결과에 영향을 주지 않으므로 보통 SELECT 1 또는 SELECT *를 사용한다.",
      "NOT EXISTS는 서브쿼리 결과에 NULL이 포함되면 NOT IN과 동일하게 전체 결과가 0건이 된다."
    ],
    ans: 4,
    src: "자료3 p.58",
    exp: {
      reason: "NOT EXISTS는 행의 존재 여부만 확인하므로 NULL 값이 서브쿼리에 포함되어도 영향을 받지 않는다. NOT IN은 NULL이 포함되면 UNKNOWN 전파로 0건이 되는 함정이 있지만, NOT EXISTS는 그 함정이 없다. (자료3 p.58)",
      terms: [
        "**EXISTS = 한 건이라도 있으면 TRUE**: SELECT 절 내용은 무시 (행 존재만 검사)",
        "**NOT EXISTS = 0건이면 TRUE**: 차집합/세미안티조인 패턴",
        "**NOT IN의 NULL 함정**: 서브쿼리에 NULL이 한 건만 있어도 전체 결과 0행",
        "**NOT EXISTS의 안전성**: NULL 무관, 표준 차집합 구현 권장 형태"
      ],
      wrong: [
        "1. EXISTS의 정의 그대로다.",
        "2. NOT EXISTS의 차집합 활용은 표준 패턴이다.",
        "3. EXISTS는 행 존재만 확인하므로 SELECT 절은 의미 없다.",
        "4. (정답) NOT EXISTS는 NOT IN과 달리 NULL 영향을 받지 않는다."
      ],
      tip: "NOT IN은 NULL에 약함, NOT EXISTS는 NULL에 강함. 차집합은 NOT EXISTS."
    }
  },

  // ============================================================
  // 토픽 106: 다중컬럼 서브쿼리 (Q334~Q336) — 3문항
  // ============================================================
  {
    id: 334,
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
          ["1", "KIM", "10", "3000"],
          ["2", "LEE", "10", "2500"],
          ["3", "PARK", "10", "2500"],
          ["4", "CHOI", "20", "2000"],
          ["5", "JUNG", "20", "2000"],
          ["6", "HAN", "20", "1500"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM EMP\nWHERE (DEPTNO, SAL) IN ((10, 3000), (20, 2000));"
      }
    ],
    choices: [
      "1행",
      "2행",
      "3행",
      "6행"
    ],
    ans: 3,
    src: "자료3 p.56~57",
    exp: {
      reason: "다중컬럼 IN은 (DEPTNO, SAL) 쌍이 동시에 일치해야 한다. (10,3000)에 KIM 1건, (20,2000)에 CHOI/JUNG 2건이 매칭되어 총 3행. PostgreSQL 검증 완료. (자료3 p.56~57)",
      terms: [
        "**다중컬럼 IN**: WHERE (col1, col2) IN ((v1a, v2a), (v1b, v2b)) 형태",
        "**짝(쌍) 비교**: 두 컬럼이 한 쌍으로 동시에 일치해야 매칭",
        "**튜플 등치**: (a, b) = (x, y) ⇔ a=x AND b=y",
        "**대안**: OR로 풀어쓸 수 있음 ((D=10 AND S=3000) OR (D=20 AND S=2000))"
      ],
      wrong: [
        "1. KIM 1건만 본 경우. (20,2000) 매칭도 포함해야 한다.",
        "2. CHOI, JUNG만 카운트한 경우.",
        "3. (정답) KIM, CHOI, JUNG 3행.",
        "4. 다중컬럼 IN을 무시하고 전체를 반환한다고 본 경우."
      ],
      tip: "(col1, col2) IN ((a,b),(c,d)) = 두 컬럼 동시 일치하는 쌍 검색."
    }
  },
  {
    id: 335,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "상",
    has_code: true,
    q: "다음 두 SQL의 결과 행 수를 비교한 것으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL"],
        rows: [
          ["1", "KIM", "10", "3000"],
          ["2", "LEE", "10", "2000"],
          ["3", "PARK", "20", "3000"],
          ["4", "CHOI", "20", "2000"],
          ["5", "JUNG", "30", "1500"]
        ]
      },
      {
        type: "code",
        title: "(가) 다중컬럼 IN",
        lang: "sql",
        content: "SELECT * FROM EMP\nWHERE (DEPTNO, SAL) IN ((10, 3000), (20, 2000));"
      },
      {
        type: "code",
        title: "(나) 단일컬럼 IN 두 번",
        lang: "sql",
        content: "SELECT * FROM EMP\nWHERE DEPTNO IN (10, 20)\n  AND SAL IN (3000, 2000);"
      }
    ],
    choices: [
      "(가) 2행, (나) 2행",
      "(가) 2행, (나) 4행",
      "(가) 4행, (나) 2행",
      "(가)와 (나)는 항상 같은 결과를 반환한다."
    ],
    ans: 2,
    src: "자료3 p.56~57",
    exp: {
      reason: "(가) 다중컬럼 IN: (10,3000)→KIM, (20,2000)→CHOI 두 행. (나) 단일컬럼 IN 두 번: DEPTNO가 10이나 20이면서 SAL이 3000이나 2000이면 모두 통과 → KIM, LEE(10,2000), PARK(20,3000), CHOI 네 행. 다중컬럼 IN은 쌍으로 매칭, 단일컬럼 IN 두 번은 카타시안 곱 형태로 매칭되어 결과가 다르다. PostgreSQL 검증 완료. (자료3 p.56~57)",
      terms: [
        "**다중컬럼 IN의 짝 비교**: (DEPT, SAL)이 묶인 한 쌍으로 일치해야 함",
        "**단일컬럼 IN 두 번**: DEPT∈{10,20} AND SAL∈{3000,2000} → 4가지 조합 모두 허용",
        "**조합 수 차이**: 2쌍(IN 리스트) vs 2×2=4조합(독립 IN)",
        "**의도 표현**: '특정 부서의 특정 급여' 매칭은 다중컬럼 IN으로만 가능"
      ],
      wrong: [
        "1. 두 쿼리 결과를 모두 2행으로 본 경우. (나)는 4행이다.",
        "2. (정답) 다중컬럼 IN은 짝 비교(2행), 단일 IN 두 번은 조합(4행).",
        "3. 두 쿼리 결과를 거꾸로 본 경우.",
        "4. 두 쿼리는 짝 비교 vs 조합으로 의미가 다르다."
      ],
      tip: "다중컬럼 IN = 짝 매칭, 단일컬럼 IN 두 번 = 모든 조합 허용. 결과가 다르다."
    }
  },
  {
    id: 336,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (KIM의 (DEPTNO, JOB) = (10, 'MGR'))",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "JOB"],
        rows: [
          ["1", "KIM", "10", "MGR"],
          ["2", "LEE", "10", "SAL"],
          ["3", "PARK", "20", "MGR"],
          ["4", "CHOI", "20", "CLK"],
          ["5", "JUNG", "10", "MGR"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME\nFROM EMP\nWHERE (DEPTNO, JOB) IN (\n  SELECT DEPTNO, JOB FROM EMP WHERE ENAME = 'KIM'\n)\nORDER BY EMPNO;"
      }
    ],
    choices: [
      "KIM",
      "KIM, JUNG",
      "KIM, PARK, JUNG",
      "KIM, LEE, JUNG"
    ],
    ans: 2,
    src: "자료3 p.56~57",
    exp: {
      reason: "서브쿼리는 KIM의 (DEPTNO, JOB) = (10, 'MGR') 한 쌍을 반환. 메인쿼리는 같은 쌍을 가진 사원을 찾는다. (10, 'MGR') 매칭: KIM, JUNG 2명. PARK는 (20, 'MGR')로 JOB만 같고 DEPTNO 다름 → 미매칭. PostgreSQL 검증 완료. (자료3 p.56~57)",
      terms: [
        "**다중컬럼 서브쿼리**: 서브쿼리가 여러 컬럼을 반환, 메인은 같은 컬럼 수의 튜플과 비교",
        "**짝 매칭**: (DEPTNO, JOB)이 정확히 일치하는 행만 통과 (DEPTNO만 같거나 JOB만 같으면 미매칭)",
        "**용도**: '같은 부서이면서 같은 직무'처럼 두 조건을 묶어 비교할 때",
        "**대안**: AND로 풀면 두 번 서브쿼리 실행 필요 (성능/표현 측면 다중컬럼 IN이 우월)"
      ],
      wrong: [
        "1. KIM 자기 자신만 본 경우.",
        "2. (정답) KIM, JUNG 두 명이 (10, 'MGR') 쌍과 매칭.",
        "3. PARK까지 포함한 경우. PARK는 (20,'MGR')로 DEPTNO 다름.",
        "4. LEE까지 포함한 경우. LEE는 (10,'SAL')로 JOB 다름."
      ],
      tip: "다중컬럼 IN with subquery = 서브쿼리가 반환한 쌍과 동시에 일치해야 한다."
    }
  },

  // ============================================================
  // 토픽 107: 상호연관 서브쿼리 (Q337~Q340) — 4문항
  // ============================================================
  {
    id: 337,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL"],
        rows: [
          ["1", "KIM", "10", "3000"],
          ["2", "LEE", "10", "2500"],
          ["3", "PARK", "10", "2500"],
          ["4", "CHOI", "20", "2000"],
          ["5", "JUNG", "20", "2000"],
          ["6", "HAN", "20", "1500"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO, SAL\nFROM EMP E1\nWHERE SAL = (SELECT MIN(SAL)\n             FROM EMP E2\n             WHERE E2.DEPTNO = E1.DEPTNO);"
      }
    ],
    choices: [
      "1행",
      "2행",
      "3행",
      "6행"
    ],
    ans: 3,
    src: "자료3 p.57~58",
    exp: {
      reason: "상호연관 서브쿼리. 부서별 최저 급여를 행마다 계산. DEPTNO=10의 MIN(SAL)=2500 → LEE, PARK 2명(동률). DEPTNO=20의 MIN(SAL)=1500 → HAN 1명. 총 3행. PostgreSQL 검증 완료. (자료3 p.57~58)",
      terms: [
        "**상호연관(Correlated) 서브쿼리**: 서브쿼리가 메인쿼리 컬럼(E1.DEPTNO) 참조",
        "**행마다 실행**: 메인쿼리의 각 행에 대해 서브쿼리가 1번씩 재실행",
        "**부서별 최저 패턴**: 같은 부서 내 MIN(SAL)과 비교 → 동률은 모두 통과",
        "**비연관과의 차이**: 비연관이면 전체 MIN(=1500)과 비교 → HAN 1명만"
      ],
      wrong: [
        "1. 비연관으로 본 경우. 전체 MIN=1500 → HAN만.",
        "2. 동률을 빠뜨린 경우 (LEE 또는 PARK 한 명만 카운트).",
        "3. (정답) LEE, PARK, HAN 3명.",
        "4. 모든 행이 통과한다고 본 경우."
      ],
      tip: "상호연관 = 행마다 재실행 = 부서별 최저(MIN) 동률 모두 살아남음."
    }
  },
  {
    id: 338,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL"],
        rows: [
          ["1", "KIM", "10", "3000"],
          ["2", "LEE", "10", "2500"],
          ["3", "PARK", "10", "2500"],
          ["4", "CHOI", "20", "2000"],
          ["5", "JUNG", "20", "2000"],
          ["6", "HAN", "20", "1500"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO, SAL\nFROM EMP E1\nWHERE SAL = (SELECT MAX(SAL)\n             FROM EMP E2\n             WHERE E2.DEPTNO = E1.DEPTNO);"
      }
    ],
    choices: [
      "KIM(10, 3000) — 1행",
      "KIM(10, 3000), CHOI(20, 2000) — 2행",
      "KIM(10, 3000), CHOI(20, 2000), JUNG(20, 2000) — 3행",
      "KIM(10, 3000), LEE(10, 2500), CHOI(20, 2000), JUNG(20, 2000) — 4행"
    ],
    ans: 3,
    src: "자료3 p.57~58",
    exp: {
      reason: "부서별 최고 급여자(상호연관). DEPTNO=10의 MAX(SAL)=3000 → KIM. DEPTNO=20의 MAX(SAL)=2000 → CHOI, JUNG 동률. 총 3행. PostgreSQL 검증 완료. (자료3 p.57~58)",
      terms: [
        "**상호연관 + 부서별 최고**: 같은 부서끼리 비교해 MAX인 행을 찾는 표준 패턴",
        "**동률 처리**: WHERE SAL = MAX(SAL)이므로 동일한 최댓값 행은 모두 통과",
        "**행 단위 실행 비용**: 메인 행마다 서브쿼리 1회 → 인덱스/실행계획 중요",
        "**대안 패턴**: 윈도우 함수 RANK()=1 또는 ROW_NUMBER()=1 사용 가능"
      ],
      wrong: [
        "1. 비연관 전체 MAX(=3000)로 본 경우. KIM만 통과.",
        "2. DEPT 20의 동률(JUNG)을 빠뜨린 경우.",
        "3. (정답) 부서별 MAX와 동률 처리 결과.",
        "4. LEE까지 포함한 경우. LEE(2500)는 DEPT 10 MAX(3000) 미만."
      ],
      tip: "부서별 최고/최저 + 동률 = 상호연관 서브쿼리 단골 함정."
    }
  },
  {
    id: 339,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "중",
    has_code: false,
    q: "다음 중 상호연관(Correlated) 서브쿼리에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "서브쿼리가 메인쿼리의 컬럼을 참조하는 형태이다.",
      "메인쿼리의 각 행에 대해 서브쿼리가 1회씩 실행되는 것으로 개념화할 수 있다.",
      "EXISTS, NOT EXISTS 절은 일반적으로 상호연관 서브쿼리와 함께 사용된다.",
      "상호연관 서브쿼리는 메인쿼리와 무관하게 한 번만 실행되므로 비연관 서브쿼리보다 항상 성능이 우수하다."
    ],
    ans: 4,
    src: "자료3 p.57~58",
    exp: {
      reason: "상호연관 서브쿼리는 메인쿼리 컬럼을 참조하므로 메인 행마다 서브쿼리가 재실행되는 형태로 개념화된다(실제 실행계획은 옵티마이저가 변환할 수 있음). '한 번만 실행'은 비연관 서브쿼리의 특징이며, 상호연관은 일반적으로 더 높은 비용을 가질 수 있다. (자료3 p.57~58)",
      terms: [
        "**상호연관(Correlated)**: 서브쿼리가 외부(메인) 쿼리의 컬럼을 참조",
        "**비연관(Un-correlated)**: 메인 컬럼 참조 없음, 1회만 실행",
        "**EXISTS와의 결합**: EXISTS/NOT EXISTS는 메인 행마다 존재 여부를 확인하므로 상호연관과 자연스럽게 결합",
        "**성능 주의**: 상호연관은 N회 실행 형태로 개념화되며 일반적으로 비연관보다 비용이 크다"
      ],
      wrong: [
        "1. 상호연관의 정의 그대로다.",
        "2. 행마다 1회 재실행 모델이 표준 설명이다.",
        "3. EXISTS/NOT EXISTS는 보통 상호연관 형태로 사용된다.",
        "4. (정답) 한 번만 실행되는 것은 비연관 서브쿼리이며 상호연관이 항상 성능 우수하다고 볼 수 없다."
      ],
      tip: "상호연관 = 메인 컬럼 참조 = 행마다 재실행 모델. '한 번만 실행'은 비연관."
    }
  },
  {
    id: 340,
    subj: 2,
    topic: "2-G",
    topic_name: "서브쿼리",
    diff: "상",
    has_code: true,
    q: "다음 두 SQL의 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL"],
        rows: [
          ["1", "KIM", "10", "3000"],
          ["2", "LEE", "10", "2500"],
          ["3", "PARK", "10", "2500"],
          ["4", "CHOI", "20", "2000"],
          ["5", "JUNG", "20", "2000"],
          ["6", "HAN", "20", "1500"]
        ]
      },
      {
        type: "code",
        title: "(가) 비연관",
        lang: "sql",
        content: "SELECT ENAME FROM EMP\nWHERE SAL = (SELECT MAX(SAL) FROM EMP);"
      },
      {
        type: "code",
        title: "(나) 상호연관",
        lang: "sql",
        content: "SELECT ENAME FROM EMP E1\nWHERE SAL = (SELECT MAX(SAL) FROM EMP E2\n             WHERE E2.DEPTNO = E1.DEPTNO);"
      }
    ],
    choices: [
      "(가) 1행, (나) 1행",
      "(가) 1행, (나) 3행",
      "(가) 3행, (나) 1행",
      "(가) 3행, (나) 3행"
    ],
    ans: 2,
    src: "자료3 p.57~58",
    exp: {
      reason: "(가) 비연관: 전체 MAX(SAL)=3000 → KIM 1행. (나) 상호연관: 부서별 MAX 사원 → DEPT 10의 KIM(3000), DEPT 20의 CHOI/JUNG 동률(2000) 합 3행. PostgreSQL 검증 완료. (자료3 p.57~58)",
      terms: [
        "**비연관**: 서브쿼리에 메인 컬럼 참조 없음 → 한 번만 실행, 단일 값(여기서는 3000)을 반환",
        "**상호연관**: 메인의 E1.DEPTNO를 참조 → 행마다 재실행, 부서별 최댓값 비교",
        "**의미 차이**: 비연관은 '회사 전체 최고', 상호연관은 '각 부서 최고'",
        "**동률 효과**: 상호연관에서는 DEPT 20의 동률 사원(CHOI, JUNG)이 모두 통과"
      ],
      wrong: [
        "1. 상호연관도 한 명만 통과한다고 본 경우. 동률(2명)이 함께 살아남는다.",
        "2. (정답) 비연관=1행, 상호연관=3행.",
        "3. 두 쿼리 결과를 거꾸로 본 경우.",
        "4. 비연관도 부서별로 따진다고 본 경우."
      ],
      tip: "비연관=전체 기준 단일값, 상호연관=그룹별 비교. 부서별 최고는 상호연관."
    }
  }
];

module.exports = g2Part3;

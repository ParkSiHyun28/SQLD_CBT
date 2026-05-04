// 2-I: Q401~Q430 (그룹 함수 — ROLLUP/CUBE/GROUPING SETS/GROUPING)
// 자료3 p.60~65 기반. PostgreSQL 14 sqld_verify DB에서 결과 직접 검증.
// 검증 테이블:
//   emp_dept(empno, ename, job, mgr, sal, comm, deptno, dname) — EMP 14건
//   t_sales(dept varchar, job varchar, sal int) — A/B 부서 5건
//
// 행 수 요약 (검증 완료):
//   GROUP BY(dname,job)         = 9행
//   ROLLUP(dname,job)           = 13행  (9 + 3소계 + 1총계)
//   CUBE(dname,job)             = 18행  (9 + 3DNAME소계 + 5JOB소계 + 1총계)
//   GROUPING SETS(dname, job)   = 8행   (3DNAME소계 + 5JOB소계)
//
// t_sales 시나리오:
//   ROLLUP(dept,job)            = 7행
//   CUBE(dept,job)              = 10행
//   GROUPING SETS(dept, job)    = 5행

const i2Part1 = [
  // ============================================================
  // 토픽 113: 그룹 함수 종류 분류 (Q401~Q402) — 2문항, has_code:false
  // ============================================================
  {
    id: 401,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "하",
    has_code: false,
    q: "다음 중 ANSI/ISO SQL 표준이 정의하는 데이터 분석을 위한 함수 3종류로 올바르게 짝지어진 것은?",
    blocks: null,
    choices: [
      "집계 함수(Aggregate Function), 그룹 함수(Group Function), 윈도우 함수(Window Function)",
      "집계 함수(Aggregate Function), 스칼라 함수(Scalar Function), 윈도우 함수(Window Function)",
      "그룹 함수(Group Function), 변환 함수(Conversion Function), 윈도우 함수(Window Function)",
      "집계 함수(Aggregate Function), 그룹 함수(Group Function), 계층형 함수(Hierarchical Function)"
    ],
    ans: 1,
    src: "자료3 p.60",
    exp: {
      reason: "자료3 p.60에 ANSI/ISO SQL 표준 데이터 분석용 함수로 Aggregate Function(집계 함수), Group Function(그룹 함수), Window Function(윈도우 함수) 세 가지를 명시한다. (자료3 p.60)",
      terms: [
        "**Aggregate Function**: COUNT, SUM, AVG, MIN, MAX 등 집계 연산",
        "**Group Function**: ROLLUP, CUBE, GROUPING SETS 등 다차원 소계 생성",
        "**Window Function**: RANK, ROW_NUMBER, LAG 등 행 간 연산"
      ],
      wrong: [
        "1. (정답) ANSI/ISO SQL 표준 데이터 분석용 함수 3종은 집계 함수, 그룹 함수, 윈도우 함수다.",
        "2. 스칼라 함수는 ANSI 데이터 분석 3종에 포함되지 않는다.",
        "3. 변환 함수(TO_NUMBER 등)는 데이터 분석 3종에 포함되지 않는다.",
        "4. 계층형 함수(CONNECT BY 등)는 데이터 분석 3종에 포함되지 않는다."
      ],
      tip: "데이터 분석 3종 = 집계(Aggregate) + 그룹(Group) + 윈도우(Window). 줄여서 '집그윈'."
    }
  },
  {
    id: 402,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "하",
    has_code: false,
    q: "다음 중 그룹 함수(Group Function)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "ROLLUP, CUBE, GROUPING SETS가 그룹 함수에 해당한다.",
      "GROUP BY 절에 별도의 그룹 함수를 적지 않으면 소계나 합계가 자동으로 생성된다.",
      "ROLLUP 함수는 그룹핑 컬럼 수가 N일 때 N+1 레벨의 소계를 생성한다.",
      "그룹 함수는 일반적인 GROUP BY 절의 기능을 확장하여 다양한 집계를 한 번에 생성한다."
    ],
    ans: 2,
    src: "자료3 p.60",
    exp: {
      reason: "자료3 p.60에 '별도의 그룹함수를 GROUP BY 절에 적지 않을 경우 소계나 총 합계가 따로 생성되지 않는다'고 명시되어 있다. 소계나 합계를 얻으려면 ROLLUP, CUBE, GROUPING SETS 중 하나를 명시해야 한다. (자료3 p.60)",
      terms: [
        "**그룹 함수**: ROLLUP, CUBE, GROUPING SETS 3종",
        "**자동 생성 없음**: 일반 GROUP BY는 소계/총계를 생성하지 않음",
        "**N+1 레벨**: ROLLUP(A,B)는 (A,B) → (A) → () 3레벨 소계"
      ],
      wrong: [
        "1. ROLLUP, CUBE, GROUPING SETS는 그룹 함수 그대로다.",
        "2. (정답) 별도의 그룹함수를 GROUP BY 절에 적지 않을 경우 소계나 총 합계가 따로 생성되지 않는다.",
        "3. ROLLUP의 N+1 레벨 소계 생성은 자료3 p.61의 명시 내용이다.",
        "4. 그룹 함수가 일반 GROUP BY를 확장한다는 개념이 자료3 p.60~61에 설명되어 있다."
      ],
      tip: "일반 GROUP BY = 소계/총계 없음. 소계 원하면 ROLLUP/CUBE/GROUPING SETS 명시 필요."
    }
  },

  // ============================================================
  // 토픽 114: ROLLUP 함수 (Q403~Q410) — 8문항, has_code:true
  // ============================================================
  {
    id: 403,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T_SALES]",
        headers: ["DEPT", "JOB", "SAL"],
        rows: [
          ["A", "CLERK", "100"],
          ["A", "CLERK", "200"],
          ["A", "MGR", "300"],
          ["B", "CLERK", "400"],
          ["B", "ANALYST", "500"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DEPT, JOB, SUM(SAL)\nFROM T_SALES\nGROUP BY ROLLUP(DEPT, JOB)\nORDER BY DEPT, JOB;"
      }
    ],
    choices: [
      "5행이 반환된다.",
      "7행이 반환된다.",
      "10행이 반환된다.",
      "12행이 반환된다."
    ],
    ans: 2,
    src: "자료3 p.61~62",
    exp: {
      reason: "ROLLUP(DEPT, JOB)은 (DEPT,JOB) 기준 그룹 4행 + DEPT 소계 2행 + 전체 총계 1행 = 7행을 생성한다. PostgreSQL 검증: (A,CLERK,300), (A,MGR,300), (A,NULL,600), (B,ANALYST,500), (B,CLERK,400), (B,NULL,900), (NULL,NULL,1500). (자료3 p.61~62)",
      terms: [
        "**ROLLUP(A,B) 행 구성**: (A,B) 그룹 + A 소계 + 전체 총계",
        "**소계 행의 NULL**: 소계가 집약된 컬럼 위치에 NULL이 표시됨",
        "**ROLLUP 공식**: 인수 N개 → 최대 N+1 레벨 소계"
      ],
      wrong: [
        "1. 5행은 GROUPING SETS(DEPT, JOB) 결과다.",
        "2. (정답) ROLLUP(DEPT, JOB)은 (DEPT,JOB) 그룹 4행 + DEPT 소계 2행 + 전체 총계 1행 = 7행이다.",
        "3. 10행은 CUBE(DEPT, JOB) 결과다.",
        "4. 12행은 이 데이터에서 나올 수 없는 행 수다."
      ],
      tip: "ROLLUP(A,B) = (A,B)그룹 + A소계 + 전체총계. 총계는 항상 마지막 1행."
    }
  },
  {
    id: 404,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 결과에서 T_SALES 데이터를 기반으로 DEPT='A', JOB=NULL인 행의 SUM(SAL) 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T_SALES]",
        headers: ["DEPT", "JOB", "SAL"],
        rows: [
          ["A", "CLERK", "100"],
          ["A", "CLERK", "200"],
          ["A", "MGR", "300"],
          ["B", "CLERK", "400"],
          ["B", "ANALYST", "500"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DEPT, JOB, SUM(SAL)\nFROM T_SALES\nGROUP BY ROLLUP(DEPT, JOB);"
      }
    ],
    choices: [
      "300",
      "500",
      "600",
      "1500"
    ],
    ans: 3,
    src: "자료3 p.61~62",
    exp: {
      reason: "ROLLUP에서 DEPT='A', JOB=NULL인 행은 A 부서 전체 소계 행이다. A 부서 데이터는 CLERK 100, CLERK 200, MGR 300 세 건으로 합계가 600이다. PostgreSQL 검증 완료. (자료3 p.61~62)",
      terms: [
        "**DEPT 소계 행**: JOB이 NULL로 표시되고 해당 DEPT의 모든 SAL을 합산",
        "**A 부서 합계**: 100 + 200 + 300 = 600",
        "**전체 총계 행**: DEPT와 JOB 모두 NULL, 합계 1500"
      ],
      wrong: [
        "1. 300은 A 부서의 MGR만의 합이다.",
        "2. 500은 B 부서의 ANALYST 한 건이다.",
        "3. (정답) DEPT='A' 소계 행의 SUM(SAL)은 A 부서 CLERK 100+200, MGR 300의 합계 600이다.",
        "4. 1500은 전체 총계(DEPT=NULL, JOB=NULL) 행의 값이다."
      ],
      tip: "소계 행의 NULL = 해당 컬럼 기준으로 집약했다는 표시. DEPT='A' 소계는 A의 모든 SAL 합."
    }
  },
  {
    id: 405,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 두 SQL의 실행 결과 행 수 (R1, R2)의 조합으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_DEPT] (14건, 부서명: ACCOUNTING/RESEARCH/SALES, 직무: CLERK/ANALYST/MANAGER/PRESIDENT/SALESMAN)",
        headers: ["DNAME", "JOB", "SAL"],
        rows: [
          ["ACCOUNTING", "CLERK", "1300"],
          ["ACCOUNTING", "MANAGER", "2450"],
          ["ACCOUNTING", "PRESIDENT", "5000"],
          ["RESEARCH", "ANALYST(×2)", "3000"],
          ["RESEARCH", "CLERK(×2)", "900/1100"],
          ["RESEARCH", "MANAGER", "2975"],
          ["SALES", "CLERK", "950"],
          ["SALES", "MANAGER", "2850"],
          ["SALES", "SALESMAN(×4)", "합계5600"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- R1\nSELECT DNAME, JOB, COUNT(*)\nFROM EMP_DEPT\nGROUP BY DNAME, JOB;\n\n-- R2\nSELECT DNAME, JOB, COUNT(*)\nFROM EMP_DEPT\nGROUP BY ROLLUP(DNAME, JOB);"
      }
    ],
    choices: [
      "(R1=9, R2=9)",
      "(R1=9, R2=13)",
      "(R1=13, R2=18)",
      "(R1=9, R2=18)"
    ],
    ans: 2,
    src: "자료3 p.61~62",
    exp: {
      reason: "GROUP BY(DNAME, JOB)는 (부서, 직무) 조합 9개만 반환하고, ROLLUP(DNAME, JOB)는 9 + DNAME별 소계 3 + 전체 총계 1 = 13행을 반환한다. PostgreSQL 검증 완료. (자료3 p.61~62)",
      terms: [
        "**GROUP BY 행 수**: 실제 존재하는 (DNAME,JOB) 조합 수만큼 (9행)",
        "**ROLLUP 추가 행**: DNAME 소계 3행(ACCOUNTING/RESEARCH/SALES) + 전체 총계 1행",
        "**공식**: ROLLUP(A,B) = GROUP BY(A,B) + A소계 + 총계"
      ],
      wrong: [
        "1. R2는 9가 아닌 13이다. ROLLUP은 소계/총계를 추가 생성한다.",
        "2. (정답) GROUP BY(DNAME,JOB)는 9행, ROLLUP(DNAME,JOB)는 9 + 소계 3 + 총계 1 = 13행이다.",
        "3. R1은 13이 아닌 9다.",
        "4. R2=18은 CUBE 결과다. ROLLUP은 18이 아닌 13이다."
      ],
      tip: "ROLLUP(A,B) = 일반 GROUP BY(A,B) + A별 소계 + 전체 총계. 13 = 9 + 3 + 1."
    }
  },
  {
    id: 406,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (자료3 EMP/DEPT 기준, SALES=6명, RESEARCH=5명, ACCOUNTING=3명)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB,\n       COUNT(*) AS \"Total Empl\",\n       SUM(SAL)  AS \"Total Sal\"\nFROM EMP_DEPT\nGROUP BY ROLLUP(DNAME, JOB)\nORDER BY DNAME, JOB;"
      }
    ],
    choices: [
      "ROLLUP 결과에 JOB별 소계 행이 별도로 생성된다.",
      "DNAME별 소계 행에서 JOB 컬럼은 NULL로 표시된다.",
      "전체 총계 행에서 DNAME과 JOB 모두 공백 문자열로 표시된다.",
      "ORDER BY DNAME, JOB이 없으면 ROLLUP 결과를 얻을 수 없다."
    ],
    ans: 2,
    src: "자료3 p.61~62",
    exp: {
      reason: "ROLLUP에서 소계/총계에 해당하는 컬럼은 NULL로 표시된다. 자료3 p.62의 결과표에서 DNAME별 소계 행의 JOB 컬럼이 비어있는 것이 NULL이다. ORDER BY는 필수가 아니며 결과 정렬만 담당한다. (자료3 p.61~62)",
      terms: [
        "**NULL 표시**: 소계가 집약된 컬럼에는 NULL이 들어감",
        "**NVL 활용**: NULL을 '합계' 등의 문자열로 대체하려면 NVL/COALESCE 사용",
        "**ORDER BY 역할**: 정렬만 담당. ROLLUP 결과와 무관"
      ],
      wrong: [
        "1. ROLLUP(DNAME, JOB)는 JOB별 소계를 생성하지 않는다. JOB별 소계는 CUBE에서 추가 생성된다.",
        "2. (정답) ROLLUP에서 소계/총계에 해당하는 컬럼은 NULL로 표시된다.",
        "3. NULL이지 공백 문자열이 아니다. IS NULL로 판별 가능.",
        "4. ORDER BY는 정렬 용도. 없어도 ROLLUP 결과는 동일하게 생성된다."
      ],
      tip: "소계/총계 컬럼 값 = NULL. 공백이나 0이 아님. NVL로 '합계' 등으로 표시 가능."
    }
  },
  {
    id: 407,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_DEPT] (DNAME 3종, JOB 5종, 총 14건)",
        headers: ["DNAME", "JOB 조합"],
        rows: [
          ["ACCOUNTING", "CLERK(1), MANAGER(1), PRESIDENT(1)"],
          ["RESEARCH", "ANALYST(2), CLERK(2), MANAGER(1)"],
          ["SALES", "CLERK(1), MANAGER(1), SALESMAN(4)"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB, COUNT(*)\nFROM EMP_DEPT\nGROUP BY ROLLUP(DNAME, JOB);"
      }
    ],
    choices: [
      "9",
      "11",
      "13",
      "16"
    ],
    ans: 3,
    src: "자료3 p.61~62",
    exp: {
      reason: "ROLLUP(DNAME, JOB)의 결과 행 수 = (DNAME,JOB) 조합 9행 + DNAME 소계 3행 + 전체 총계 1행 = 13행이다. 자료3 p.62 결과표에 '13개의 행이 선택되었다'고 명시된다. PostgreSQL 검증 완료. (자료3 p.62)",
      terms: [
        "**L1 — 일반 그룹 행**: (DNAME,JOB) 조합, 9건",
        "**L2 — DNAME 소계**: ACCOUNTING/RESEARCH/SALES 각 1행, 3건",
        "**L3 — 전체 총계**: DNAME=NULL, JOB=NULL, 1건",
        "**합계**: 9 + 3 + 1 = 13행"
      ],
      wrong: [
        "1. 9는 일반 GROUP BY(DNAME, JOB) 결과다.",
        "2. 11은 소계가 일부만 생성될 때의 잘못된 계산이다.",
        "3. (정답) ROLLUP(DNAME, JOB)의 결과 행 수는 (DNAME,JOB) 조합 9 + DNAME 소계 3 + 총계 1 = 13행이다.",
        "4. 16은 CUBE 결과에 근접한 수이지만 정확한 값도 아니다(CUBE=18)."
      ],
      tip: "ROLLUP 행 수 = 일반 GROUP BY 행 수 + 첫 번째 컬럼 고유값 수(소계) + 1(총계)."
    }
  },
  {
    id: 408,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "상",
    has_code: true,
    q: "다음 두 SQL의 실행 결과가 동일한지 여부와 그 이유로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- SQL-A\nSELECT DNAME, JOB, COUNT(*)\nFROM EMP_DEPT\nGROUP BY ROLLUP(DNAME, JOB);\n\n-- SQL-B\nSELECT DNAME, JOB, COUNT(*)\nFROM EMP_DEPT\nGROUP BY ROLLUP(JOB, DNAME);"
      }
    ],
    choices: [
      "동일하다. ROLLUP은 인수 순서에 관계없이 같은 결과를 생성한다.",
      "다르다. ROLLUP의 인수 순서가 바뀌면 소계 기준 컬럼이 달라져 결과가 다르다.",
      "동일하다. ROLLUP은 CUBE와 마찬가지로 모든 조합을 생성하므로 순서 무관이다.",
      "다르다. ROLLUP은 두 번째 인수부터 제외하기 때문에 JOB이 첫 인수면 오류가 발생한다."
    ],
    ans: 2,
    src: "자료3 p.62",
    exp: {
      reason: "자료3 p.62에 'ROLLUP의 인수는 계층 구조라 인수 순서가 바뀌면 수행 결과도 바뀐다'고 명시되어 있다. SQL-A는 DNAME 소계를 생성하고, SQL-B는 JOB 소계를 생성하므로 결과가 다르다. PostgreSQL 검증 완료. (자료3 p.62)",
      terms: [
        "**ROLLUP 순서 의존**: ROLLUP(A,B)와 ROLLUP(B,A)는 소계 기준이 달라 결과가 다름",
        "**ROLLUP(DNAME,JOB)**: DNAME별 소계 생성",
        "**ROLLUP(JOB,DNAME)**: JOB별 소계 생성",
        "**CUBE**: 순서 무관. ROLLUP과 다르게 모든 조합 소계 생성"
      ],
      wrong: [
        "1. ROLLUP은 순서 의존적이다. CUBE가 순서 무관이다.",
        "2. (정답) ROLLUP의 인수는 계층 구조라 인수 순서가 바뀌면 소계 기준 컬럼이 달라져 결과가 다르다.",
        "3. CUBE 특성(순서 무관, 모든 조합)을 ROLLUP에 잘못 적용했다.",
        "4. ROLLUP은 어떤 컬럼이 첫 인수여도 오류 없이 실행된다. 소계 기준만 달라진다."
      ],
      tip: "ROLLUP = 순서 의존(계층 구조) / CUBE = 순서 무관(모든 조합). T-12 핵심."
    }
  },
  {
    id: 409,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL에서 ROLLUP 함수에 결합 컬럼이 사용되었다. 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_DEPT] (14건, DNAME 3종)",
        headers: ["DNAME", "JOB", "MGR 조합 설명"],
        rows: [
          ["SALES", "CLERK/MGR=7698, MANAGER/MGR=7839, SALESMAN×4/MGR=7698", "JOB+MGR 조합 3종"],
          ["RESEARCH", "ANALYST×2/MGR=7566, CLERK/MGR=7788, CLERK/MGR=7902, MANAGER/MGR=7839", "JOB+MGR 조합 4종"],
          ["ACCOUNTING", "CLERK/MGR=7782, MANAGER/MGR=7839, PRESIDENT/MGR=NULL", "JOB+MGR 조합 3종"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB, MGR, SUM(SAL)\nFROM EMP_DEPT\nGROUP BY ROLLUP(DNAME, (JOB, MGR));"
      }
    ],
    choices: [
      "13",
      "14",
      "17",
      "23"
    ],
    ans: 2,
    src: "자료3 p.63",
    exp: {
      reason: "ROLLUP(DNAME, (JOB, MGR))에서 (JOB, MGR)은 하나의 집합으로 취급된다. 결과는 (DNAME, JOB, MGR) 기준 10행 + DNAME 소계 3행 + 전체 총계 1행 = 14행이다. PostgreSQL 검증 완료. (자료3 p.63)",
      terms: [
        "**결합 컬럼**: ROLLUP 인수 괄호 안에 여러 컬럼을 묶으면 하나의 집합으로 간주",
        "**(JOB, MGR) 집합**: JOB과 MGR 각각의 소계를 구하지 않고 쌍으로만 집계",
        "**행 수 계산**: 10(DNAME+JOB+MGR 조합) + 3(DNAME 소계) + 1(총계) = 14"
      ],
      wrong: [
        "1. 13은 ROLLUP(DNAME, JOB)의 결과 행 수다. (JOB,MGR) 결합 전의 수다.",
        "2. (정답) ROLLUP(DNAME, (JOB,MGR))은 (DNAME,JOB,MGR) 10행 + DNAME 소계 3행 + 총계 1행 = 14행이다.",
        "3. 17은 괄호 없이 ROLLUP(DNAME, JOB, MGR) 적용 시 나올 수 있는 수다.",
        "4. 23은 ROLLUP(DNAME, JOB, MGR) 3인수 시나리오의 결과다."
      ],
      tip: "ROLLUP 인수를 괄호로 묶으면 그 안의 컬럼은 하나의 단위. 각각 따로 소계를 내지 않는다."
    }
  },
  {
    id: 410,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL을 UNION ALL을 이용해 동일한 결과를 만들려 할 때, 빈칸 (A)에 들어갈 내용으로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- 원본\nSELECT DNAME, JOB, COUNT(*), SUM(SAL)\nFROM EMP_DEPT\nGROUP BY ROLLUP(DNAME, JOB);\n\n-- UNION ALL 변환\nSELECT DNAME, JOB, COUNT(*), SUM(SAL)\nFROM EMP_DEPT GROUP BY DNAME, JOB\nUNION ALL\nSELECT DNAME, NULL AS JOB, COUNT(*), SUM(SAL)\nFROM EMP_DEPT GROUP BY DNAME\nUNION ALL\n(A);"
      }
    ],
    choices: [
      "SELECT NULL AS DNAME, NULL AS JOB, COUNT(*), SUM(SAL) FROM EMP_DEPT",
      "SELECT DNAME, NULL AS JOB, COUNT(*), SUM(SAL) FROM EMP_DEPT GROUP BY DNAME",
      "SELECT NULL AS DNAME, JOB, COUNT(*), SUM(SAL) FROM EMP_DEPT GROUP BY JOB",
      "SELECT DNAME, JOB, COUNT(*), SUM(SAL) FROM EMP_DEPT"
    ],
    ans: 1,
    src: "자료3 p.62",
    exp: {
      reason: "자료3 p.62에 ROLLUP(DNAME, JOB)의 UNION ALL 변환을 보여주는데, 마지막이 'SELECT NULL AS DNAME, NULL AS JOB, COUNT(*), SUM(SAL) FROM EMP_DEPT WHERE ...'으로 전체 총계를 담당한다. 총계는 어떤 컬럼으로도 GROUP BY하지 않으므로 GROUP BY를 생략한다. (자료3 p.62)",
      terms: [
        "**ROLLUP = UNION ALL 3단계**: (DNAME,JOB)그룹 + DNAME 소계 + 전체 총계",
        "**전체 총계 행**: DNAME=NULL, JOB=NULL, COUNT는 전체 행 수, SUM은 전체 합",
        "**GROUP BY 없음**: 전체 합계는 GROUP BY 없이 FROM 절만으로 집계"
      ],
      wrong: [
        "1. (정답) 전체 총계는 DNAME=NULL, JOB=NULL이며 GROUP BY를 생략한 SELECT로 표현한다.",
        "2. DNAME이 포함되어 있어 DNAME 소계와 중복된다.",
        "3. JOB별 소계는 ROLLUP(DNAME, JOB)에서 생성되지 않는다. CUBE에서 추가됨.",
        "4. GROUP BY 없이 DNAME, JOB을 SELECT하면 집계 오류가 발생한다."
      ],
      tip: "전체 총계 = DNAME NULL, JOB NULL, GROUP BY 없음. ROLLUP의 세 번째 UNION ALL 블록."
    }
  },

  // ============================================================
  // 토픽 115: CUBE 함수 (Q411~Q416) — 6문항, has_code:true
  // ============================================================
  {
    id: 411,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_DEPT] (DNAME 3종, JOB 5종)",
        headers: ["DNAME", "JOB 종류"],
        rows: [
          ["ACCOUNTING", "CLERK, MANAGER, PRESIDENT"],
          ["RESEARCH", "ANALYST, CLERK, MANAGER"],
          ["SALES", "CLERK, MANAGER, SALESMAN"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB, COUNT(*), SUM(SAL)\nFROM EMP_DEPT\nGROUP BY CUBE(DNAME, JOB);"
      }
    ],
    choices: [
      "9",
      "13",
      "15",
      "18"
    ],
    ans: 4,
    src: "자료3 p.63~64",
    exp: {
      reason: "CUBE(DNAME, JOB)는 (DNAME,JOB) 9행 + DNAME 소계 3행 + JOB 소계 5행(전체 5종) + 전체 총계 1행 = 18행을 생성한다. 자료3 p.64에 '18개의 행이 선택되었다'고 명시되어 있다. PostgreSQL 검증 완료. (자료3 p.63~64)",
      terms: [
        "**CUBE 결과 구성**: 모든 컬럼 조합 소계 + 각 컬럼별 소계 + 전체 총계",
        "**CUBE(A,B) 공식**: (A,B) + A소계 + B소계 + 전체 = 4가지 레벨",
        "**JOB 소계 5행**: ANALYST/CLERK/MANAGER/PRESIDENT/SALESMAN 각 1행",
        "**ROLLUP vs CUBE**: ROLLUP=13행, CUBE=18행 (JOB 소계 5행 추가)"
      ],
      wrong: [
        "1. 9는 일반 GROUP BY(DNAME, JOB)의 결과다.",
        "2. 13은 ROLLUP(DNAME, JOB)의 결과다.",
        "3. 15는 잘못된 계산 결과다.",
        "4. (정답) CUBE(DNAME, JOB)는 (DNAME,JOB) 9행 + DNAME 소계 3행 + JOB 소계 5행 + 총계 1행 = 18행이다."
      ],
      tip: "CUBE = ROLLUP + 두 번째 컬럼(JOB)별 소계 추가. 18 = 13 + 5(JOB 5종)."
    }
  },
  {
    id: 412,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 두 SQL의 결과가 동일한지 여부와 그 이유로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- SQL-A\nSELECT DNAME, JOB, COUNT(*)\nFROM EMP_DEPT\nGROUP BY CUBE(DNAME, JOB);\n\n-- SQL-B\nSELECT DNAME, JOB, COUNT(*)\nFROM EMP_DEPT\nGROUP BY CUBE(JOB, DNAME);"
      }
    ],
    choices: [
      "동일하다. CUBE는 인수 간 계층 구조가 아닌 평등한 관계라 인수 순서가 바뀌어도 데이터 결과는 같다.",
      "다르다. CUBE도 ROLLUP과 마찬가지로 인수 순서에 따라 소계 기준이 달라진다.",
      "동일하다. 하지만 결과의 정렬 순서까지 동일하게 보장된다.",
      "다르다. CUBE에서 첫 번째 인수가 소계 기준이 되므로 순서를 바꾸면 전체 총계가 달라진다."
    ],
    ans: 1,
    src: "자료3 p.64",
    exp: {
      reason: "자료3 p.64에 'CUBE(DNAME, JOB)이나 CUBE(JOB, DNAME)이나 같은 결과 도출'이라고 명시되어 있다. CUBE는 ROLLUP과 달리 인수들 간의 관계가 평등해 모든 조합의 소계를 생성하므로 순서에 무관하다. 단 ORDER BY가 없으면 정렬 순서는 다를 수 있다. (자료3 p.64)",
      terms: [
        "**CUBE 순서 무관**: 모든 컬럼 조합 소계를 생성하므로 인수 순서가 데이터 결과에 영향 없음",
        "**ROLLUP과의 차이**: ROLLUP은 순서 의존(계층), CUBE는 순서 무관(평등)",
        "**정렬 순서**: ORDER BY 없으면 인수 순서에 따라 출력 순서는 다를 수 있음"
      ],
      wrong: [
        "1. (정답) CUBE는 인수들 간의 관계가 평등해 모든 조합의 소계를 생성하므로 인수 순서에 무관하다.",
        "2. ROLLUP의 특성을 CUBE에 잘못 적용. CUBE는 순서 무관이다.",
        "3. 데이터 결과는 같지만 ORDER BY 없이 정렬 순서까지 보장되지는 않는다.",
        "4. CUBE는 전체 총계도 항상 동일하게 생성한다. 순서와 무관."
      ],
      tip: "ROLLUP = 순서 의존 / CUBE = 순서 무관. 핵심 비교 포인트."
    }
  },
  {
    id: 413,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 결과를 UNION ALL로 표현하려 할 때 필요한 SELECT 블록 수로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB, COUNT(*), SUM(SAL)\nFROM EMP_DEPT\nGROUP BY CUBE(DNAME, JOB);"
      }
    ],
    choices: [
      "2개",
      "3개",
      "4개",
      "5개"
    ],
    ans: 3,
    src: "자료3 p.64",
    exp: {
      reason: "자료3 p.64에 'ROLLUP과는 달리 JOB 컬럼에 대한 소계가 추가되므로 인수가 2개일 경우 총 4개의 SELECT 문이 UNION 되어야 한다'고 명시되어 있다. ① (DNAME,JOB) 그룹 + ② DNAME 소계 + ③ JOB 소계 + ④ 전체 총계 = 4개. (자료3 p.64)",
      terms: [
        "**CUBE(A,B) UNION ALL 구조**: ①(A,B)그룹 + ②A소계 + ③B소계 + ④전체총계",
        "**ROLLUP(A,B) UNION ALL**: 3개(①(A,B) + ②A소계 + ③총계)",
        "**차이**: CUBE가 B 소계 블록 1개 더 필요"
      ],
      wrong: [
        "1. 2개는 단순 GROUP BY 변환 수준이다.",
        "2. 3개는 ROLLUP(A,B)의 UNION ALL 블록 수다.",
        "3. (정답) CUBE(A,B)는 (A,B)그룹 + A 소계 + B 소계 + 전체 총계 = 4개의 SELECT 블록이 필요하다.",
        "4. 5개는 필요 이상이다. CUBE(A,B)는 4가지 소계 레벨만 생성한다."
      ],
      tip: "CUBE(A,B) = 4개 SELECT UNION ALL / ROLLUP(A,B) = 3개 SELECT UNION ALL."
    }
  },
  {
    id: 414,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL에서 ROLLUP과 CUBE의 결과를 비교할 때, CUBE 결과에만 존재하는 행의 특징으로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- ROLLUP\nSELECT DNAME, JOB, SUM(SAL)\nFROM EMP_DEPT\nGROUP BY ROLLUP(DNAME, JOB);\n\n-- CUBE\nSELECT DNAME, JOB, SUM(SAL)\nFROM EMP_DEPT\nGROUP BY CUBE(DNAME, JOB);"
      }
    ],
    choices: [
      "DNAME=NULL이고 JOB이 값을 가진 행 (JOB별 소계)이 CUBE에만 존재한다.",
      "DNAME과 JOB이 모두 NULL인 행 (전체 총계)이 CUBE에만 존재한다.",
      "DNAME이 값을 가지고 JOB=NULL인 행 (DNAME 소계)이 CUBE에만 존재한다.",
      "DNAME과 JOB 모두 값을 가진 일반 그룹 행이 CUBE에만 존재한다."
    ],
    ans: 1,
    src: "자료3 p.63~64",
    exp: {
      reason: "ROLLUP(DNAME, JOB)에서는 JOB별 소계(DNAME=NULL, JOB=값)가 생성되지 않는다. CUBE는 모든 컬럼 조합의 소계를 생성하므로 JOB별 소계 행이 추가된다. 자료3 p.64에 'ROLLUP에서는 JOB별 소계는 생성되지 않았지만 CUBE에서는 JOB별 소계도 생성된다'고 명시되어 있다. (자료3 p.63~64)",
      terms: [
        "**ROLLUP에 있고 CUBE에도 있는 행**: (DNAME,JOB) 그룹, DNAME 소계, 전체 총계",
        "**CUBE에만 있는 행**: JOB 소계 행(DNAME=NULL, JOB=실제값)",
        "**5개 JOB 소계**: ANALYST/CLERK/MANAGER/PRESIDENT/SALESMAN 각각의 전사 합계"
      ],
      wrong: [
        "1. (정답) CUBE에만 존재하는 행은 DNAME=NULL이고 JOB이 실제값인 JOB별 소계 행이다.",
        "2. 전체 총계(모두 NULL)는 ROLLUP에도 있다.",
        "3. DNAME 소계(JOB=NULL)는 ROLLUP에도 있다.",
        "4. 일반 그룹 행은 ROLLUP과 CUBE 모두에 있다."
      ],
      tip: "CUBE - ROLLUP = JOB 소계 행(DNAME=NULL, JOB=값). 이것만 CUBE에 추가로 생성."
    }
  },
  {
    id: 415,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 결과에서 DNAME=NULL이고 JOB='CLERK'인 행의 SUM(SAL) 값으로 옳은 것은? (EMP_DEPT 기준)",
    blocks: [
      {
        type: "table",
        title: "[EMP_DEPT 부서별 CLERK 현황]",
        headers: ["DNAME", "ENAME(JOB=CLERK)", "SAL"],
        rows: [
          ["ACCOUNTING", "MILLER", "1300"],
          ["RESEARCH", "SMITH", "800"],
          ["RESEARCH", "ADAMS", "1100"],
          ["SALES", "JAMES", "950"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB, SUM(SAL)\nFROM EMP_DEPT\nGROUP BY CUBE(DNAME, JOB);"
      }
    ],
    choices: [
      "1300",
      "1900",
      "4150",
      "5450"
    ],
    ans: 3,
    src: "자료3 p.63~64",
    exp: {
      reason: "CUBE에서 DNAME=NULL, JOB='CLERK'인 행은 JOB별 소계 행으로 전체 CLERK 사원의 SAL 합계다. ACCOUNTING MILLER(1300) + RESEARCH SMITH(800) + RESEARCH ADAMS(1100) + SALES JAMES(950) = 4150이다. PostgreSQL 검증 완료. (자료3 p.63~64)",
      terms: [
        "**JOB 소계 행**: DNAME=NULL이고 JOB=특정값인 행. 해당 JOB의 전사 합계",
        "**CLERK 전사 합계**: 1300 + 800 + 1100 + 950 = 4150",
        "**CUBE에만 존재**: ROLLUP(DNAME, JOB)에는 JOB 소계 행이 없음"
      ],
      wrong: [
        "1. 1300은 ACCOUNTING 부서 CLERK만의 합계다.",
        "2. 1900은 RESEARCH 부서 CLERK(800+1100)만의 합계다.",
        "3. (정답) DNAME=NULL, JOB='CLERK'인 행은 JOB별 소계로 전체 CLERK 합계 1300+800+1100+950 = 4150이다.",
        "4. 5450은 잘못된 합산이다."
      ],
      tip: "CUBE에서 DNAME=NULL, JOB=값인 행 = 해당 직무의 전체 부서 합계."
    }
  },
  {
    id: 416,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "상",
    has_code: true,
    q: "다음 중 CUBE 함수에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB, COUNT(*), SUM(SAL)\nFROM EMP_DEPT\nGROUP BY CUBE(DNAME, JOB);"
      }
    ],
    choices: [
      "그룹핑되는 컬럼이 가질 수 있는 모든 경우에 대해 소계를 생성한다.",
      "ROLLUP에 비해 시스템에 많은 부담이 생기므로 사용 시 주의가 필요하다.",
      "CUBE(DNAME, JOB)와 CUBE(JOB, DNAME)의 데이터 결과는 동일하다.",
      "CUBE는 총계를 자동으로 생성하지 않으므로 총계가 필요하면 별도로 추가해야 한다."
    ],
    ans: 4,
    src: "자료3 p.63~64",
    exp: {
      reason: "CUBE는 전체 총계를 자동으로 생성한다. 자료3 p.64의 결과표에서 마지막 행이 DNAME=NULL, JOB=NULL인 전체 총계 행으로 나타나 있다. 총계를 자동으로 생성하지 않는 것은 GROUPING SETS다. (자료3 p.63~65)",
      terms: [
        "**CUBE 총계 자동 생성**: ROLLUP과 마찬가지로 전체 총계 행을 자동으로 생성",
        "**총계 미자동 생성**: GROUPING SETS만 해당",
        "**CUBE 부담**: ROLLUP보다 더 많은 조합을 계산하므로 시스템 부담 증가"
      ],
      wrong: [
        "1. 자료3 p.63에 '결합 가능한 모든 값에 대해 다차원 집계 생성'으로 명시.",
        "2. 자료3 p.63에 'ROLLUP에 비해 시스템에 많은 부담'으로 명시.",
        "3. 자료3 p.64에 'CUBE(DNAME, JOB)이나 CUBE(JOB, DNAME)이나 같은 결과'로 명시.",
        "4. (정답) CUBE는 전체 총계를 자동으로 생성한다. 총계를 자동으로 생성하지 않는 것은 GROUPING SETS다."
      ],
      tip: "총계 미자동 = GROUPING SETS. ROLLUP과 CUBE는 모두 총계 자동 생성."
    }
  },

  // ============================================================
  // 토픽 116: GROUPING SETS 함수 (Q417~Q422) — 6문항, has_code:true
  // ============================================================
  {
    id: 417,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_DEPT] (DNAME 3종: ACCOUNTING/RESEARCH/SALES, JOB 5종: ANALYST/CLERK/MANAGER/PRESIDENT/SALESMAN)",
        headers: ["설명"],
        rows: [["총 14건"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB, COUNT(*), SUM(SAL)\nFROM EMP_DEPT\nGROUP BY GROUPING SETS(DNAME, JOB);"
      }
    ],
    choices: [
      "5",
      "8",
      "13",
      "18"
    ],
    ans: 2,
    src: "자료3 p.64~65",
    exp: {
      reason: "GROUPING SETS(DNAME, JOB)는 DNAME 소계 3행과 JOB 소계 5행만 생성한다. 총계는 자동으로 생성되지 않는다. 3 + 5 = 8행이다. PostgreSQL 검증 완료. (자료3 p.64~65)",
      terms: [
        "**GROUPING SETS(A, B)**: A 소계 + B 소계만 생성",
        "**총계 미자동 생성**: ROLLUP/CUBE와 달리 전체 총계 행을 생성하지 않음",
        "**DNAME 소계**: ACCOUNTING/RESEARCH/SALES 각 1행 = 3행",
        "**JOB 소계**: ANALYST/CLERK/MANAGER/PRESIDENT/SALESMAN 각 1행 = 5행"
      ],
      wrong: [
        "1. 5는 JOB 소계만 세어 DNAME 소계를 빠뜨린 경우다.",
        "2. (정답) GROUPING SETS(DNAME, JOB)는 DNAME 소계 3행 + JOB 소계 5행 = 8행이다. 총계는 자동 생성되지 않는다.",
        "3. 13은 ROLLUP(DNAME, JOB) 결과다.",
        "4. 18은 CUBE(DNAME, JOB) 결과다."
      ],
      tip: "GROUPING SETS = 명시한 각 컬럼별 소계만. 총계 없음. 8 = 3 + 5."
    }
  },
  {
    id: 418,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 GROUPING SETS를 UNION ALL로 동일하게 표현할 때 필요한 SELECT 블록 수로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB, COUNT(*), SUM(SAL)\nFROM EMP_DEPT\nGROUP BY GROUPING SETS(DNAME, JOB);"
      }
    ],
    choices: [
      "1개",
      "2개",
      "3개",
      "4개"
    ],
    ans: 2,
    src: "자료3 p.65",
    exp: {
      reason: "자료3 p.65에 GROUPING SETS(DNAME, JOB)의 UNION ALL 변환이 ① DNAME별 그룹(GROUP BY DNAME) + ② JOB별 그룹(GROUP BY JOB) 두 블록으로 구성됨을 보여준다. 총계 블록 없이 2개다. (자료3 p.65)",
      terms: [
        "**GROUPING SETS UNION ALL 구조**: 인수 개수만큼 SELECT 블록 필요",
        "**GROUPING SETS(A, B) = A 소계 UNION ALL B 소계**: 2개 블록",
        "**ROLLUP(A,B) = 3블록 / CUBE(A,B) = 4블록**과 비교"
      ],
      wrong: [
        "1. 1개는 단일 GROUP BY 수준이다.",
        "2. (정답) GROUPING SETS(DNAME, JOB)는 DNAME 소계 + JOB 소계 = 2개의 SELECT 블록으로 표현된다.",
        "3. 3개는 ROLLUP(A,B)의 UNION ALL 블록 수다.",
        "4. 4개는 CUBE(A,B)의 UNION ALL 블록 수다."
      ],
      tip: "GROUPING SETS(A, B) UNION ALL = A 소계 + B 소계 = 2블록."
    }
  },
  {
    id: 419,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 GROUPING SETS에 공집합 ()를 추가했을 때 달라지는 점으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- 원본\nGROUP BY GROUPING SETS(DNAME, JOB)\n\n-- 수정\nGROUP BY GROUPING SETS(DNAME, JOB, ())"
      }
    ],
    choices: [
      "DNAME 소계 행이 추가로 한 번 더 생성된다.",
      "JOB 소계 행이 추가로 한 번 더 생성된다.",
      "전체 총계 행(DNAME=NULL, JOB=NULL)이 한 행 추가된다.",
      "DNAME과 JOB의 조합 그룹 행이 추가된다."
    ],
    ans: 3,
    src: "자료3 p.65",
    exp: {
      reason: "자료3 p.65에 'GROUP BY GROUPING SETS(A, B, NULL)나 GROUP BY GROUPING SETS(A, B, ())로 총계까지 출력되게 할 수 있다'고 명시되어 있다. 공집합 ()는 전체 집계를 의미하므로 총계 행 1개가 추가된다. PostgreSQL에서는 NULL 대신 ()를 사용한다. (자료3 p.65)",
      terms: [
        "**공집합 ()**: GROUP BY 없이 전체를 집계 = 전체 총계",
        "**NULL 추가(자료3 표기)**: 표준 SQL 일부 DBMS에서 허용. PostgreSQL은 ()로 표기",
        "**수정 후 행 수**: 8행 + 1(총계) = 9행"
      ],
      wrong: [
        "1. ()는 DNAME 소계와 관련 없다.",
        "2. ()는 JOB 소계와 관련 없다.",
        "3. (정답) 공집합 ()는 전체 집계를 의미하므로 총계 행 1개가 추가되어 8행에서 9행이 된다.",
        "4. 조합 그룹 행은 GROUPING SETS 인수에 (DNAME, JOB)을 명시해야 추가된다."
      ],
      tip: "GROUPING SETS + () = 총계 추가. ROLLUP처럼 총계 포함하는 방법."
    }
  },
  {
    id: 420,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 결과에서 DNAME='SALES', JOB=NULL인 행의 SUM(SAL)로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_DEPT — SALES 부서]",
        headers: ["ENAME", "JOB", "SAL"],
        rows: [
          ["ALLEN", "SALESMAN", "1600"],
          ["WARD", "SALESMAN", "1250"],
          ["MARTIN", "SALESMAN", "1250"],
          ["BLAKE", "MANAGER", "2850"],
          ["TURNER", "SALESMAN", "1500"],
          ["JAMES", "CLERK", "950"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB, SUM(SAL)\nFROM EMP_DEPT\nGROUP BY GROUPING SETS(DNAME, JOB);"
      }
    ],
    choices: [
      "5600",
      "8400",
      "9400",
      "해당 행이 존재하지 않는다."
    ],
    ans: 3,
    src: "자료3 p.64~65",
    exp: {
      reason: "GROUPING SETS(DNAME, JOB)에서 DNAME='SALES', JOB=NULL인 행은 DNAME 소계 행이다. SALES 부서의 SAL 합계 = 1600+1250+1250+2850+1500+950 = 9400이다. PostgreSQL 검증 완료. (자료3 p.64~65)",
      terms: [
        "**DNAME 소계 행**: DNAME=실제값, JOB=NULL로 표시",
        "**SALES 합계**: 1600+1250+1250+2850+1500+950 = 9400",
        "**JOB=NULL의 의미**: JOB 컬럼이 집약되어 모든 JOB을 포함하는 소계"
      ],
      wrong: [
        "1. 5600은 SALES 부서 SALESMAN만의 합계다.",
        "2. 8400은 일부 행만 더한 잘못된 계산이다.",
        "3. (정답) DNAME='SALES', JOB=NULL인 행은 DNAME 소계로 SALES 부서 전체 합계 1600+1250+1250+2850+1500+950 = 9400이다.",
        "4. GROUPING SETS(DNAME, JOB)에서 DNAME 소계는 명확히 존재한다."
      ],
      tip: "GROUPING SETS에서 DNAME=값, JOB=NULL인 행 = 해당 부서 전체 합계."
    }
  },
  {
    id: 421,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 결과에서 'DNAME=NULL이고 JOB=NULL'인 행의 COUNT(*)로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB, COUNT(*)\nFROM EMP_DEPT\nGROUP BY GROUPING SETS(DNAME, JOB);"
      }
    ],
    choices: [
      "14",
      "존재하지 않는다.",
      "0",
      "1"
    ],
    ans: 2,
    src: "자료3 p.65",
    exp: {
      reason: "GROUPING SETS(DNAME, JOB)는 총계 행을 자동으로 생성하지 않는다. 자료3 p.65에 'ROLLUP과 달리 자동으로 총계가 출력되지 않는다'고 명시되어 있다. DNAME=NULL, JOB=NULL인 전체 총계 행은 존재하지 않는다. (자료3 p.65)",
      terms: [
        "**GROUPING SETS 총계 미자동**: 명시하지 않으면 전체 총계 행 없음",
        "**ROLLUP/CUBE와의 차이**: 두 함수는 항상 전체 총계 자동 생성",
        "**총계 추가 방법**: GROUPING SETS(DNAME, JOB, ()) 또는 NULL로 명시"
      ],
      wrong: [
        "1. 14는 전체 총계가 존재할 경우의 COUNT(*)이지만, 이 쿼리는 총계를 생성하지 않는다.",
        "2. (정답) GROUPING SETS(DNAME, JOB)는 총계를 자동으로 생성하지 않으므로 DNAME=NULL, JOB=NULL인 행은 존재하지 않는다.",
        "3. COUNT(*)가 0인 행은 생성되지 않는다.",
        "4. 1은 맥락 없는 값이다."
      ],
      tip: "GROUPING SETS = 총계 없음. ROLLUP/CUBE = 총계 자동. 핵심 차이."
    }
  },
  {
    id: 422,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB,\n       COUNT(*) AS \"Total Empl\",\n       SUM(SAL)  AS \"Total Sal\"\nFROM EMP_DEPT\nGROUP BY GROUPING SETS(DNAME, JOB);"
      }
    ],
    choices: [
      "DNAME이 값을 가지는 행에서는 JOB도 값을 가진다.",
      "JOB이 NULL인 행은 DNAME별 소계 행이다.",
      "결과에 DNAME과 JOB이 모두 실제 값인 조합 행이 포함된다.",
      "GROUPING SETS의 인수 순서를 바꾸면 결과가 달라진다."
    ],
    ans: 2,
    src: "자료3 p.64~65",
    exp: {
      reason: "GROUPING SETS(DNAME, JOB)에서 DNAME별 소계 행은 DNAME=실제값, JOB=NULL로 표시된다. 따라서 JOB이 NULL인 행은 DNAME을 기준으로 집계된 DNAME 소계 행이다. (자료3 p.64~65)",
      terms: [
        "**DNAME 소계 행**: DNAME=실제값, JOB=NULL",
        "**JOB 소계 행**: DNAME=NULL, JOB=실제값",
        "**(DNAME,JOB) 조합 행 없음**: 명시하지 않았으므로 일반 그룹 행은 생성 안 됨"
      ],
      wrong: [
        "1. DNAME 소계 행에서 JOB은 NULL이다. 값을 함께 가지지 않는다.",
        "2. (정답) GROUPING SETS(DNAME, JOB)에서 JOB이 NULL인 행은 DNAME별 소계 행이다.",
        "3. GROUPING SETS(DNAME, JOB)는 (DNAME,JOB) 조합 그룹 행을 생성하지 않는다.",
        "4. GROUPING SETS는 인수들이 평등한 관계라 순서를 바꿔도 데이터 결과는 동일하다."
      ],
      tip: "GROUPING SETS(A, B): A소계(A=값,B=NULL) + B소계(A=NULL,B=값). 조합 행 없음."
    }
  },

  // ============================================================
  // 토픽 117: GROUPING 함수 (Q423~Q426) — 4문항, has_code:true
  // ============================================================
  {
    id: 423,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 GROUPING(JOB) = 1인 행의 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP_DEPT] (DNAME 3종, JOB 5종, 14건)",
        headers: ["설명"],
        rows: [["ACCOUNTING 3명, RESEARCH 5명, SALES 6명"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DNAME, JOB,\n       GROUPING(DNAME) AS GD,\n       GROUPING(JOB)  AS GJ,\n       COUNT(*)\nFROM EMP_DEPT\nGROUP BY ROLLUP(DNAME, JOB);"
      }
    ],
    choices: [
      "1",
      "3",
      "4",
      "9"
    ],
    ans: 3,
    src: "자료3 p.63",
    exp: {
      reason: "GROUPING(JOB)=1인 행은 JOB이 소계에 의해 집약된 행이다. ROLLUP(DNAME, JOB)에서 JOB이 NULL인 행은 DNAME별 소계 3행 + 전체 총계 1행 = 4행이다. PostgreSQL 검증 완료. (자료3 p.63)",
      terms: [
        "**GROUPING(컬럼)=1**: 해당 컬럼이 소계로 집약되어 NULL인 경우",
        "**GROUPING(컬럼)=0**: 실제 그룹 값이 있는 일반 행",
        "**JOB=NULL인 행**: DNAME별 소계 3행(ACCOUNTING/RESEARCH/SALES) + 전체 총계 1행 = 4행"
      ],
      wrong: [
        "1. 1은 전체 총계 행만 센 경우다.",
        "2. 3은 DNAME 소계 행만 센 경우다. 전체 총계도 GROUPING(JOB)=1이다.",
        "3. (정답) GROUPING(JOB)=1인 행은 JOB이 NULL인 행으로 DNAME별 소계 3행 + 전체 총계 1행 = 4행이다.",
        "4. 9는 일반 그룹 행의 수다(GROUPING(JOB)=0)."
      ],
      tip: "GROUPING(컬럼)=1 = 해당 컬럼이 NULL로 표시된 소계/총계 행. DNAME 소계 3 + 총계 1 = 4."
    }
  },
  {
    id: 424,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T_SALES]",
        headers: ["DEPT", "JOB", "SAL"],
        rows: [
          ["A", "CLERK", "100"],
          ["A", "CLERK", "200"],
          ["A", "MGR", "300"],
          ["B", "CLERK", "400"],
          ["B", "ANALYST", "500"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT DEPT, JOB,\n       GROUPING(DEPT) AS GD,\n       GROUPING(JOB)  AS GJ,\n       SUM(SAL)\nFROM T_SALES\nGROUP BY ROLLUP(DEPT, JOB)\nORDER BY DEPT, JOB;"
      }
    ],
    choices: [
      "전체 총계 행의 GD=0, GJ=0이다.",
      "DEPT='A', JOB=NULL인 소계 행의 GD=1, GJ=1이다.",
      "DEPT='A', JOB='CLERK'인 일반 행의 GD=0, GJ=0이다.",
      "전체 총계 행의 GD=0, GJ=1이다."
    ],
    ans: 3,
    src: "자료3 p.63",
    exp: {
      reason: "GROUPING(컬럼)은 해당 컬럼이 실제 그룹 값이면 0, 소계에 의해 집약(NULL)이면 1을 반환한다. DEPT='A', JOB='CLERK'는 실제 그룹값이므로 GD=0, GJ=0이다. PostgreSQL 검증 완료. (자료3 p.63)",
      terms: [
        "**GROUPING()=0**: 해당 행에 실제 컬럼값이 있는 경우",
        "**GROUPING()=1**: 해당 컬럼이 소계/총계로 집약되어 NULL인 경우",
        "**전체 총계 행**: GD=1, GJ=1 (양쪽 모두 집약)"
      ],
      wrong: [
        "1. 전체 총계 행은 GD=1, GJ=1이다. 0이 아니다.",
        "2. DEPT='A' 소계 행은 GD=0, GJ=1이다. DEPT가 A이므로 GD는 0이다.",
        "3. (정답) DEPT='A', JOB='CLERK'는 실제 그룹값이므로 GROUPING(DEPT)=0, GROUPING(JOB)=0이다.",
        "4. 전체 총계의 GD=0은 틀렸다. 전체 총계에서 DEPT도 집약되므로 GD=1이다."
      ],
      tip: "GROUPING 체계: 일반행=(0,0) / DEPT소계=(0,1) / 전체총계=(1,1). ROLLUP(A,B) 기준."
    }
  },
  {
    id: 425,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 DNAME 컬럼 값이 'All Depts'로 출력되는 행의 수로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT\n  CASE WHEN GROUPING(DNAME)=1 THEN 'All Depts'\n       ELSE DNAME END AS DNAME,\n  CASE WHEN GROUPING(JOB)=1 THEN 'All Jobs'\n       ELSE JOB END AS JOB,\n  COUNT(*) AS CNT,\n  SUM(SAL) AS TOTAL\nFROM EMP_DEPT\nGROUP BY ROLLUP(DNAME, JOB);"
      }
    ],
    choices: [
      "0",
      "1",
      "3",
      "4"
    ],
    ans: 2,
    src: "자료3 p.63",
    exp: {
      reason: "GROUPING(DNAME)=1인 행은 전체 총계 행 1개뿐이다. ROLLUP(DNAME, JOB)에서 DNAME이 소계에 의해 NULL이 되는 것은 전체 총계 행(DNAME=NULL, JOB=NULL)만이다. DNAME별 소계 행은 DNAME이 실제값이라 GROUPING(DNAME)=0이다. PostgreSQL 검증 완료. (자료3 p.63)",
      terms: [
        "**GROUPING(DNAME)=1**: DNAME이 NULL인 행 = 전체 총계 행 1개만 해당",
        "**DNAME 소계 행**: GROUPING(DNAME)=0 (DNAME이 실제값 있음), GROUPING(JOB)=1",
        "**전체 총계 행**: GROUPING(DNAME)=1, GROUPING(JOB)=1"
      ],
      wrong: [
        "1. 0은 틀렸다. 전체 총계 행에서 'All Depts'가 나타난다.",
        "2. (정답) GROUPING(DNAME)=1인 행은 전체 총계 행 1개뿐이므로 'All Depts'로 출력되는 행도 1개다.",
        "3. 3은 DNAME별 소계 행 수이지만 이들의 GROUPING(DNAME)=0이라 'All Depts'가 아니다.",
        "4. 4는 GROUPING(JOB)=1인 행 수다(소계 3 + 총계 1)."
      ],
      tip: "GROUPING(DNAME)=1 = DNAME이 NULL인 행. ROLLUP(DNAME,JOB)에서는 전체 총계 1행만."
    }
  },
  {
    id: 426,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL에서 GROUPING 함수 없이 NVL만 사용했을 때의 문제점으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- NVL만 사용\nSELECT NVL(DNAME, '합계') AS DNAME,\n       NVL(JOB,   '합계') AS JOB,\n       COUNT(*), SUM(SAL)\nFROM EMP_DEPT\nGROUP BY ROLLUP(DNAME, JOB);\n\n-- GROUPING 사용\nSELECT\n  CASE WHEN GROUPING(DNAME)=1 THEN '전체합계' ELSE DNAME END AS DNAME,\n  CASE WHEN GROUPING(JOB)=1   THEN '전체합계' ELSE JOB   END AS JOB,\n  COUNT(*), SUM(SAL)\nFROM EMP_DEPT\nGROUP BY ROLLUP(DNAME, JOB);"
      }
    ],
    choices: [
      "NVL을 사용하면 소계 행의 NULL이 '합계'로 치환되어 시각적 구분이 불가능하다.",
      "EMP_DEPT 테이블에 DNAME이 원래 NULL인 사원이 있으면 소계 행과 구분이 안 된다.",
      "NVL은 ROLLUP 함수와 함께 사용할 수 없어 문법 오류가 발생한다.",
      "NVL로 치환하면 COUNT(*)와 SUM(SAL) 결과가 달라진다."
    ],
    ans: 2,
    src: "자료3 p.63",
    exp: {
      reason: "NVL(DNAME, '합계')는 DNAME이 NULL인 모든 경우를 '합계'로 바꾼다. 실제 DNAME이 NULL인 사원 데이터가 있다면 그 데이터의 DNAME도 '합계'로 치환되어 소계 행과 혼동된다. GROUPING 함수는 소계에 의한 NULL(GROUPING=1)과 데이터 본래의 NULL(GROUPING=0)을 구분할 수 있다. (자료3 p.63)",
      terms: [
        "**NVL의 한계**: 원본 NULL과 소계 NULL을 구분하지 못함",
        "**GROUPING 함수의 장점**: 소계에 의한 NULL인 경우만 정확히 식별 가능",
        "**GROUPING(컬럼)=1**: 반드시 소계/총계에 의한 NULL임을 보장"
      ],
      wrong: [
        "1. NVL로 NULL을 '합계'로 바꿔도 소계 행끼리는 구분이 되므로 이 설명은 정확하지 않다.",
        "2. (정답) 실제 DNAME이 NULL인 사원 데이터가 있으면 NVL이 그 행도 '합계'로 치환해 소계 행과 혼동된다.",
        "3. NVL은 ROLLUP과 함께 사용해도 문법 오류 없이 동작한다.",
        "4. NVL 치환은 SELECT 출력값만 바꾸고 COUNT, SUM 결과에 영향을 주지 않는다."
      ],
      tip: "NVL vs GROUPING: 원본 NULL 데이터 있으면 NVL은 구분 불가. GROUPING이 안전."
    }
  },

  // ============================================================
  // 토픽 118: ROLLUP/CUBE/GROUPING SETS 비교 (Q427~Q430) — 4문항, has_code:false
  // ============================================================
  {
    id: 427,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: false,
    q: "다음 중 ROLLUP, CUBE, GROUPING SETS의 비교 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "ROLLUP은 인수 순서에 따라 계층적 소계를 생성하며 순서를 바꾸면 결과가 달라진다.",
      "CUBE는 인수 간 평등한 관계로 모든 조합의 소계를 생성하며 인수 순서를 바꾸어도 데이터 결과는 같다.",
      "GROUPING SETS는 CUBE와 마찬가지로 인수 순서가 결과에 영향을 미치지 않으며 총계를 자동으로 생성한다.",
      "GROUPING SETS는 명시한 각 컬럼별 소계만 생성하고 총계는 자동으로 생성하지 않는다."
    ],
    ans: 3,
    src: "자료3 p.65",
    exp: {
      reason: "자료3 p.65에 GROUPING SETS는 'ROLLUP과 달리 자동으로 총계가 출력되지 않는다'고 명시되어 있다. 보기 3은 인수 순서 무관 부분은 맞지만 '총계를 자동으로 생성한다'는 것이 틀렸다. (자료3 p.65)",
      terms: [
        "**ROLLUP**: 순서 의존, 총계 자동 생성",
        "**CUBE**: 순서 무관, 총계 자동 생성",
        "**GROUPING SETS**: 순서 무관, 총계 자동 미생성"
      ],
      wrong: [
        "1. 자료3 p.62에 'ROLLUP 인수 순서가 바뀌면 수행 결과도 바뀐다'고 명시.",
        "2. 자료3 p.64에 'CUBE는 인수의 순서가 바뀌어도 데이터의 결과는 같다'고 명시.",
        "3. (정답) GROUPING SETS는 인수 순서 무관 부분은 맞지만 총계를 자동으로 생성한다는 것이 틀렸다. 총계는 자동 미생성이다.",
        "4. 자료3 p.65에 'ROLLUP과 달리 자동으로 총계가 출력되지 않는다'고 명시."
      ],
      tip: "총계 자동 = ROLLUP, CUBE / 총계 미자동 = GROUPING SETS. 순서 의존 = ROLLUP만."
    }
  },
  {
    id: 428,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: false,
    q: "다음 표에서 각 함수와 특성의 연결로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "ROLLUP — 인수 순서 의존, 계층 구조 소계, 총계 자동 생성",
      "CUBE — 인수 순서 무관, 모든 조합 소계, 총계 자동 생성",
      "GROUPING SETS — 인수 순서 무관, 명시 컬럼별 소계, 총계 자동 미생성",
      "GROUPING 함수 — 소계 행에서 1을 반환하고 총계 행에서는 0을 반환"
    ],
    ans: 4,
    src: "자료3 p.63",
    exp: {
      reason: "자료3 p.63에 GROUPING 함수는 'ROLLUP이나 CUBE에 의한 소계가 계산된 결과에는 GROUPING(컬럼)=1이 표시되고 그 외 결과에는 0이 표시된다'고 명시한다. 전체 총계 행에서도 DNAME과 JOB이 모두 소계로 집약되므로 GROUPING(DNAME)=1, GROUPING(JOB)=1이다. (자료3 p.63)",
      terms: [
        "**GROUPING()=0**: 실제 그룹값(일반 행)",
        "**GROUPING()=1**: 소계 집약(소계 행, 총계 행 모두 해당)",
        "**총계 행**: 두 컬럼 모두 GROUPING()=1"
      ],
      wrong: [
        "1. ROLLUP 특성 정확히 맞다.",
        "2. CUBE 특성 정확히 맞다.",
        "3. GROUPING SETS 특성 정확히 맞다.",
        "4. (정답) GROUPING 함수는 소계 행과 총계 행 모두에서 1을 반환한다. 총계 행에서 0을 반환한다는 설명이 틀렸다."
      ],
      tip: "GROUPING()=1 = 소계 행도 포함하고 총계 행도 포함. 0이 아니다."
    }
  },
  {
    id: 429,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: false,
    q: "다음 중 ROLLUP(A, B)과 CUBE(A, B)의 결과 차이를 설명한 것으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "ROLLUP은 A 소계와 B 소계 모두 생성하고, CUBE는 A 소계만 생성한다.",
      "ROLLUP은 A 소계만 생성하고, CUBE는 A 소계와 B 소계 모두 생성한다.",
      "ROLLUP과 CUBE 모두 A 소계와 B 소계를 생성하지만 CUBE만 총계를 생성한다.",
      "ROLLUP과 CUBE 모두 A 소계, B 소계, 총계를 생성하며 결과가 동일하다."
    ],
    ans: 2,
    src: "자료3 p.61~64",
    exp: {
      reason: "자료3 p.64에 'GROUP BY ROLLUP(DNAME, JOB)에서는 JOB별 소계는 생성되지 않았지만 CUBE에서는 JOB별 소계도 생성된다'고 명시되어 있다. ROLLUP(A, B)는 A 소계와 전체 총계만 생성하고, CUBE(A, B)는 A 소계, B 소계, 전체 총계를 모두 생성한다. (자료3 p.61~64)",
      terms: [
        "**ROLLUP(A,B) 소계 레벨**: (A,B) → (A) → 총계 (B 소계 없음)",
        "**CUBE(A,B) 소계 레벨**: (A,B) → (A) → (B) → 총계 (B 소계 포함)",
        "**핵심 차이**: CUBE가 ROLLUP보다 B 소계 행 추가"
      ],
      wrong: [
        "1. 반대로 설명했다. ROLLUP이 아닌 CUBE가 B 소계를 생성한다.",
        "2. (정답) ROLLUP(A,B)는 A 소계만 생성하고, CUBE(A,B)는 A 소계와 B 소계를 모두 생성한다.",
        "3. ROLLUP도 총계를 생성한다. CUBE만 생성하지 않는다.",
        "4. 결과가 동일하지 않다. CUBE가 B 소계를 추가로 생성한다."
      ],
      tip: "ROLLUP = A 소계 + 총계 / CUBE = A 소계 + B 소계 + 총계. B 소계가 핵심 차이."
    }
  },
  {
    id: 430,
    subj: 2,
    topic: "2-I",
    topic_name: "그룹 함수",
    diff: "중",
    has_code: false,
    q: "ROLLUP(A, B)를 사용했을 때와 GROUPING SETS(A, B)를 사용했을 때의 결과 차이로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "두 함수의 결과가 동일하다.",
      "ROLLUP은 (A, B) 조합 그룹 행과 총계를 포함하지만 GROUPING SETS는 그 두 가지가 없다.",
      "ROLLUP은 B 소계를 추가로 생성하지만 GROUPING SETS는 생성하지 않는다.",
      "GROUPING SETS는 인수 순서에 의존하지만 ROLLUP은 순서 무관이다."
    ],
    ans: 2,
    src: "자료3 p.61~65",
    exp: {
      reason: "ROLLUP(A, B)는 (A,B) 조합 그룹 + A 소계 + 전체 총계를 생성한다. GROUPING SETS(A, B)는 A 소계 + B 소계만 생성하고 (A,B) 조합 그룹 행과 전체 총계는 생성하지 않는다. 따라서 두 함수의 결과에서 (A,B) 조합 그룹 행과 총계 행 유무가 핵심 차이다. (자료3 p.61~65)",
      terms: [
        "**ROLLUP(A,B) 포함 요소**: (A,B) 조합 그룹 + A 소계 + 전체 총계",
        "**GROUPING SETS(A,B) 포함 요소**: A 소계 + B 소계만",
        "**없는 요소 비교**: GROUPING SETS에는 (A,B) 조합 행과 총계 없음"
      ],
      wrong: [
        "1. 두 함수의 결과는 다르다. 포함하는 행이 다르다.",
        "2. (정답) ROLLUP은 (A,B) 조합 그룹 행과 전체 총계를 포함하지만 GROUPING SETS(A,B)는 두 가지 모두 생성하지 않는다.",
        "3. B 소계를 추가로 생성하는 것은 ROLLUP이 아닌 CUBE다.",
        "4. 반대다. GROUPING SETS가 순서 무관, ROLLUP이 순서 의존이다."
      ],
      tip: "ROLLUP = (A,B)조합 + A소계 + 총계 / GROUPING SETS(A,B) = A소계 + B소계만. 총계와 조합 행 없음이 핵심."
    }
  }
];

module.exports = i2Part1;

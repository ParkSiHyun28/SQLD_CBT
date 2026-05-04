// 2-K: Q471~Q485 (Top N 쿼리 전체 15문항)
// 자료3 p.74~77 기반.
// FETCH/OFFSET/WITH TIES: PostgreSQL sqld_verify DB 직접 검증 완료.
// ROWNUM: Oracle 전용. 자료3 p.74~76 인용 + ROW_NUMBER() 등가로 결과 확정.
// TOP N(SQL Server): 자료3 p.77 인용.
const k2Part1 = [

  // ============================================================
  // 토픽 127: Top N 쿼리 개념 (Q471~Q472) - 2문항, 코드 없음
  // ============================================================
  {
    id: 471,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "하",
    has_code: false,
    q: "다음 중 Top N 쿼리에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "Top N 쿼리는 페이징 처리를 효과적으로 수행하기 위해 사용한다.",
      "전체 결과에서 데이터의 상위 N개 행을 추출하는 것이 주된 목적이다.",
      "Oracle에서 ROWNUM, FETCH 절, RANK 등 다양한 방법으로 Top N 행을 추출할 수 있다.",
      "Top N 쿼리는 반드시 ORDER BY 없이도 의미 있는 상위 N개 행을 보장한다."
    ],
    ans: 4,
    src: "자료3 p.74",
    exp: {
      reason: "Top N 쿼리는 '정렬된 결과'에서 상위 N개를 추출하는 것이 핵심이다. ORDER BY 없이 실행하면 어떤 행이 반환될지 보장되지 않아 의미 있는 순위를 구할 수 없다. (자료3 p.74)",
      terms: [
        "**Top N 쿼리**: 페이징 처리, 상위 N행 추출 목적 (자료3 p.74)",
        "**ORDER BY 필수성**: 정렬 기준 없이는 '상위' 개념 자체가 성립하지 않음",
        "**구현 방법**: Oracle ROWNUM, FETCH 절, RANK/ROW_NUMBER 윈도우 함수, SQL Server TOP N"
      ],
      wrong: [
        "1. 자료3 p.74에 '페이징 처리를 효과적으로 수행하기 위해 사용'으로 명시.",
        "2. 자료3 p.74에 '전체 결과에서 데이터의 상위 N개 행을 추출'로 명시.",
        "3. 자료3 p.74~76에 ROWNUM, FETCH, RANK 세 가지 방법이 모두 소개되어 있음.",
        "4. (정답) ORDER BY 없으면 반환 순서가 보장되지 않으므로 의미 있는 상위 N행을 보장할 수 없다."
      ],
      tip: "Top N 쿼리에서 **ORDER BY는 필수**. 정렬 없이는 '상위'라는 개념이 성립하지 않는다."
    }
  },
  {
    id: 472,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "하",
    has_code: false,
    q: "다음 중 각 DBMS별 Top N 행 추출 방법의 연결이 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "Oracle 전통 방식 - ROWNUM 가상 컬럼을 WHERE 절에서 조건으로 사용",
      "Oracle 12c 이상 - FETCH FIRST N ROWS ONLY 절 사용",
      "SQL Server - TOP N 키워드를 SELECT 뒤에 명시",
      "PostgreSQL - ROWNUM 가상 컬럼을 직접 사용"
    ],
    ans: 4,
    src: "자료3 p.74~77",
    exp: {
      reason: "ROWNUM은 Oracle 전용 가상 컬럼이다. PostgreSQL은 ROWNUM을 지원하지 않으며, 페이지 제한에는 LIMIT/OFFSET 또는 FETCH FIRST N ROWS ONLY를 사용한다. (자료3 p.74~77)",
      terms: [
        "**ROWNUM**: Oracle 전용 가상 번호 (자료3 p.74~76)",
        "**FETCH FIRST N ROWS ONLY**: Oracle 12c 이상, SQL Server, PostgreSQL 지원 (자료3 p.76~77)",
        "**TOP N**: SQL Server 전용 문법 (자료3 p.77)",
        "**PostgreSQL**: LIMIT N 또는 FETCH FIRST N ROWS ONLY 사용, ROWNUM 미지원"
      ],
      wrong: [
        "1. 자료3 p.74~76에 Oracle ROWNUM 사용법이 상세히 소개됨.",
        "2. 자료3 p.76에 'ORACLE 12c 이상부터, SQL Server 사용 가능'으로 FETCH 절 명시.",
        "3. 자료3 p.77에 'SQL Server에서 상위 N개의 행 추출하는 문법'으로 TOP N 명시.",
        "4. (정답) ROWNUM은 Oracle 전용. PostgreSQL은 ROWNUM을 지원하지 않는다."
      ],
      tip: "ROWNUM = Oracle 전용. PostgreSQL/SQL Server에서 같은 효과를 내려면 **FETCH FIRST N ROWS ONLY** 또는 **TOP N** 사용."
    }
  },

  // ============================================================
  // 토픽 128: ROWNUM 특성 Oracle (Q473~Q477) - 5문항, 코드
  // ============================================================
  {
    id: 473,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "Oracle에서 다음 SQL의 실행 결과로 옳은 것은? (TRAPS.md T-16 참고)",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블 (일부)]",
        headers: ["EMPNO", "ENAME", "SAL"],
        rows: [
          ["7369", "SMITH", "800"],
          ["7499", "ALLEN", "1600"],
          ["7521", "WARD", "1250"],
          ["7566", "JONES", "2975"],
          ["7698", "BLAKE", "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME, SAL\nFROM EMP\nWHERE ROWNUM > 1;"
      }
    ],
    choices: [
      "EMPNO=7499인 행부터 시작해 나머지 행이 모두 반환된다.",
      "오류(ORA-00933)가 발생하여 실행되지 않는다.",
      "아무 행도 반환되지 않는다(0건).",
      "ROWNUM이 1인 첫 번째 행만 반환된다."
    ],
    ans: 3,
    src: "자료3 p.75",
    exp: {
      reason: "ROWNUM은 각 행이 하나씩 조회될 때마다 순차적으로 부여된다. 첫 번째 행이 조회될 때 ROWNUM=1이 되는데 ROWNUM > 1 조건을 만족하지 않으므로 제외된다. 다음 행도 ROWNUM=1로 재시작되어 같은 이유로 제외된다. 결과적으로 모든 행이 제외되어 0건이 반환된다. (자료3 p.75 '잘못된 사용 1')",
      terms: [
        "**ROWNUM 부여 시점**: 각 행이 하나씩 조회될 때마다 순차 부여 (자료3 p.75)",
        "**ROWNUM > 1 불가**: 첫 번째 행 조회 시 ROWNUM=1이 되어 > 1 조건 미충족, 모든 행이 탈락 (자료3 p.75)",
        "**오류 미발생**: 문법 오류는 없으나 결과가 0건",
        "**올바른 사용**: ROWNUM <= N 또는 ROWNUM = 1만 의미 있음"
      ],
      wrong: [
        "1. ROWNUM > 1은 2번째 행부터 반환한다고 착각한 오답. 실제로는 0건.",
        "2. 문법 오류는 발생하지 않는다. 오류 없이 0건 반환.",
        "3. (정답) ROWNUM > 1 조건에서는 어떤 행도 통과할 수 없어 0건 반환. (자료3 p.75)",
        "4. ROWNUM = 1 조건이면 첫 행만 반환되지만, 이 문제는 > 1 조건이다."
      ],
      tip: "ROWNUM에 **'>' 연산자는 항상 0건**. 첫 행 조회 시 ROWNUM=1이 되어 > 1을 만족하지 못하고, 이후 행도 계속 ROWNUM=1로 시작하기 때문."
    }
  },
  {
    id: 474,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "Oracle에서 다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블 (일부)]",
        headers: ["EMPNO", "ENAME", "SAL"],
        rows: [
          ["7369", "SMITH", "800"],
          ["7499", "ALLEN", "1600"],
          ["7521", "WARD", "1250"],
          ["7566", "JONES", "2975"],
          ["7698", "BLAKE", "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME, SAL\nFROM EMP\nWHERE ROWNUM = 3;"
      }
    ],
    choices: [
      "EMPNO=7521(WARD)인 세 번째 행이 반환된다.",
      "오류(ORA-01427)가 발생한다.",
      "아무 행도 반환되지 않는다(0건).",
      "ROWNUM이 1, 2, 3인 세 개의 행이 반환된다."
    ],
    ans: 3,
    src: "자료3 p.75",
    exp: {
      reason: "ROWNUM은 절대적인 행 번호가 아니라 가상의 번호이므로 '=' 연산자 단독 전달 시 ROWNUM=1부터 순서대로 데이터를 뽑을 수 있어야 한다. ROWNUM=3은 ROWNUM=1이 정의되지 않은 상태에서 건너뛰려 하므로 아무 행도 반환하지 않는다. 자료3 p.75에 '항상 불변하는 절대적 번호가 아니라 = 연산자 단독 전달 불가'로 명시되어 있다. (자료3 p.75 '잘못된 사용 2')",
      terms: [
        "**ROWNUM = N(N>1) 불가**: ROWNUM=1이 정의되기 전에 더 큰 번호에 도달할 수 없음 (자료3 p.75)",
        "**ROWNUM = 1만 가능**: 첫 번째 행이 조회되면 ROWNUM=1을 만족하므로 유일하게 작동",
        "**가상 번호**: 절대적 행 번호가 아니라 조회 과정에서 동적으로 부여되는 값",
        "**올바른 N번째 행 추출**: ROW_NUMBER() OVER (ORDER BY ...) 사용 필요"
      ],
      wrong: [
        "1. ROWNUM=3은 세 번째 행을 직접 지정할 수 없다. 0건 반환.",
        "2. 문법 오류는 발생하지 않는다.",
        "3. (정답) ROWNUM = 3은 ROWNUM=1이 먼저 정의되지 않으므로 0건. (자료3 p.75)",
        "4. ROWNUM = 3은 세 행이 아니라 0건을 반환한다."
      ],
      tip: "ROWNUM에 **'=N(N>1)'도 항상 0건**. ROWNUM = 1만 유일하게 의미 있는 '=' 조건."
    }
  },
  {
    id: 475,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "Oracle에서 다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블 (일부)]",
        headers: ["EMPNO", "ENAME", "SAL"],
        rows: [
          ["7369", "SMITH", "800"],
          ["7499", "ALLEN", "1600"],
          ["7521", "WARD", "1250"],
          ["7566", "JONES", "2975"],
          ["7698", "BLAKE", "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ROWNUM, EMPNO, ENAME, SAL\nFROM EMP\nWHERE ROWNUM <= 3;"
      }
    ],
    choices: [
      "SAL 내림차순 상위 3명이 반환된다.",
      "EMPNO 오름차순으로 정렬된 상위 3명이 반환된다.",
      "테이블에서 물리적으로 먼저 저장된 순서대로 3행이 반환된다.",
      "ROWNUM 컬럼이 SELECT 절에 포함되면 오류가 발생한다."
    ],
    ans: 3,
    src: "자료3 p.74~75",
    exp: {
      reason: "ORDER BY 없이 ROWNUM <= 3을 사용하면 Oracle이 테이블에서 데이터를 읽어 오는 순서(물리적 저장 순서 또는 풀 스캔 순서)대로 먼저 나온 3행에 ROWNUM 1, 2, 3을 부여하고 반환한다. 정렬 기준이 없으므로 급여 순위나 EMPNO 순서와 무관하다. (자료3 p.74~75)",
      terms: [
        "**ROWNUM 부여 순서**: 테이블 스캔 순서(ORDER BY 없으면 정렬 미보장) (자료3 p.74~75)",
        "**WHERE ROWNUM <= N**: N개 행을 가져오는 올바른 문법이지만 정렬 없이는 의미 있는 Top N이 아님",
        "**ROWNUM SELECT 가능**: SELECT 절에 ROWNUM을 포함해 출력 가능 (오류 미발생)"
      ],
      wrong: [
        "1. ORDER BY SAL DESC가 없으므로 SAL 순서가 보장되지 않는다.",
        "2. ORDER BY EMPNO가 없으므로 EMPNO 정렬도 보장되지 않는다.",
        "3. (정답) 정렬 없이 ROWNUM <= 3은 물리적 스캔 순서 상위 3행을 반환한다. (자료3 p.74~75)",
        "4. ROWNUM은 SELECT 절에 포함 가능하다. 오류 없음."
      ],
      tip: "ORDER BY 없이 ROWNUM <= N은 **저장 순서 상위 N행**. 의미 있는 Top N을 뽑으려면 반드시 ORDER BY와 인라인 뷰를 함께 사용해야 한다."
    }
  },
  {
    id: 476,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL 중 문법적으로 또는 의미상 올바르게 동작하는 것을 모두 고른 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가)\nSELECT * FROM EMP WHERE ROWNUM <= 5;\n\n-- (나)\nSELECT * FROM EMP WHERE ROWNUM >= 2;\n\n-- (다)\nSELECT * FROM EMP WHERE ROWNUM = 1;\n\n-- (라)\nSELECT * FROM EMP WHERE ROWNUM BETWEEN 3 AND 6;"
      }
    ],
    choices: [
      "(가)만",
      "(가), (다)",
      "(나), (라)",
      "(가), (나), (다), (라)"
    ],
    ans: 2,
    src: "자료3 p.75",
    exp: {
      reason: "(가) ROWNUM <= 5: 정상 동작, 상위 5행 반환. (나) ROWNUM >= 2: ROWNUM > 1과 동일하게 0건 반환 (의미 없음). (다) ROWNUM = 1: 첫 번째 행 한 건 반환 (정상). (라) ROWNUM BETWEEN 3 AND 6: 하한이 1보다 크므로 0건 (ROWNUM=1이 통과하지 못해 3번부터 도달 불가). (자료3 p.75)",
      terms: [
        "**유효한 ROWNUM 조건**: ROWNUM = 1, ROWNUM <= N, ROWNUM < N (N > 1일 때)",
        "**무효한 ROWNUM 조건**: ROWNUM > N, ROWNUM >= N(N>1), ROWNUM = N(N>1), ROWNUM BETWEEN N AND M (N>1)",
        "**공통 원인**: 조건에서 ROWNUM=1이 무조건 포함되어야 첫 행이 통과되고 그 이후 번호가 증가 (자료3 p.75)"
      ],
      wrong: [
        "1. (가)만은 맞지만 (다)도 정상 동작하므로 불완전한 답.",
        "2. (정답) (가) <= 5 정상 + (다) = 1 정상. (나) >= 2, (라) BETWEEN 3 AND 6은 0건.",
        "3. (나) >= 2는 0건, (라) BETWEEN 3 AND 6도 0건.",
        "4. (나)와 (라)는 정상 동작하지 않는다(0건 반환)."
      ],
      tip: "ROWNUM 조건에서 **하한이 1 이상인 경우(>1, >=2, =N>1, BETWEEN N>1 AND M)는 모두 0건**. 조건에 반드시 ROWNUM=1이 포함되어야 한다."
    }
  },
  {
    id: 477,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: false,
    q: "다음 중 Oracle의 ROWNUM에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "ROWNUM은 출력된 데이터를 기준으로 행 번호가 부여되는 가상 컬럼이다.",
      "ROWNUM은 쿼리 결과에 순차적인 번호를 할당하며, WHERE 절에서 이를 제한할 수 있다.",
      "ROWNUM >= 1 조건은 전체 데이터를 반환하는 것과 동일한 결과를 준다.",
      "ROWNUM은 첫 번째 행이 증가한 이후 할당되므로 '>' 연산자 사용이 불가하다는 것은 잘못된 설명이며, ROWNUM > 2 조건도 정상 동작한다."
    ],
    ans: 4,
    src: "자료3 p.74~75",
    exp: {
      reason: "자료3 p.75에 '첫 번째 행이 증가한 이후 할당되므로 > 연산 사용 불가'로 명시되어 있다. ROWNUM > 2 조건은 아무 행도 반환하지 않는다(0건). 4번 설명은 이를 부정하고 있어 틀린 내용이다. (자료3 p.75)",
      terms: [
        "**ROWNUM 정의**: 출력된 데이터를 기준으로 행 번호 부여하는 가상 컬럼 (자료3 p.74)",
        "**ROWNUM >= 1**: 전체 데이터 반환과 동일 (첫 행부터 모두 조건 통과) (자료3 p.75)",
        "**'>' 연산 불가 이유**: 첫 번째 행 조회 시 ROWNUM=1이 되어 > 1/> 2 등 미충족 (자료3 p.75)"
      ],
      wrong: [
        "1. 자료3 p.74에 '출력된 데이터를 기준으로 행 번호가 부여'로 정확히 명시.",
        "2. 자료3 p.74~75에 ROWNUM의 순차 번호 할당 및 WHERE 절 제한 설명 있음.",
        "3. 자료3 p.75에 'ROWNUM >= 1은 전체 데이터를 반환하는 것과 동일한 결과를 준다'로 명시.",
        "4. (정답) ROWNUM > 2는 0건을 반환한다. 자료3 p.75에 '>' 연산 사용 불가로 명시."
      ],
      tip: "ROWNUM에 **'>' 연산은 항상 0건**. 자료3 p.75의 핵심 함정 포인트."
    }
  },

  // ============================================================
  // 토픽 129: ROWNUM Top N 쿼리 (Q478~Q480) - 3문항, 코드
  // ============================================================
  {
    id: 478,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "Oracle에서 급여(SAL) 내림차순으로 상위 3명을 올바르게 조회하는 SQL은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "SAL"],
        rows: [
          ["7839", "KING", "5000"],
          ["7788", "SCOTT", "3000"],
          ["7902", "FORD", "3000"],
          ["7566", "JONES", "2975"],
          ["7698", "BLAKE", "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가)\nSELECT ENAME, SAL FROM EMP\nWHERE ROWNUM <= 3\nORDER BY SAL DESC;\n\n-- (나)\nSELECT ENAME, SAL\nFROM (SELECT ENAME, SAL FROM EMP ORDER BY SAL DESC)\nWHERE ROWNUM <= 3;\n\n-- (다)\nSELECT ENAME, SAL FROM EMP\nORDER BY SAL DESC\nWHERE ROWNUM <= 3;\n\n-- (라)\nSELECT ENAME, SAL FROM EMP\nWHERE SAL IN (SELECT MAX(SAL) FROM EMP);"
      }
    ],
    choices: [
      "(가)",
      "(나)",
      "(다)",
      "(라)"
    ],
    ans: 2,
    src: "자료3 p.75~76",
    exp: {
      reason: "(나)는 인라인 뷰에서 SAL DESC로 정렬한 후 ROWNUM <= 3을 적용하므로 올바른 Top 3 급여자를 반환한다. (가)는 WHERE(ROWNUM <= 3)가 ORDER BY보다 먼저 실행되어 무작위 3행을 내림차순 정렬한 것이다. (다)는 WHERE 절이 ORDER BY 뒤에 올 수 없어 문법 오류. (라)는 최댓값 하나만 반환하는 서브쿼리이다. (자료3 p.75~76)",
      terms: [
        "**WHERE 절 실행 순서**: FROM → WHERE → ORDER BY 순이므로 WHERE ROWNUM <= 3이 정렬 전에 적용됨 (자료3 p.75~76)",
        "**인라인 뷰 패턴**: 서브쿼리에서 먼저 ORDER BY로 정렬 후, 외부 쿼리에서 ROWNUM <= N 적용 (자료3 p.76)",
        "**(다) 문법 오류**: WHERE 절은 ORDER BY 뒤에 올 수 없음"
      ],
      wrong: [
        "1. (가)는 WHERE ROWNUM <= 3이 ORDER BY보다 먼저 실행되어 임의 3행을 정렬한 결과. 진짜 Top 3 아님.",
        "2. (정답) 인라인 뷰로 정렬 후 ROWNUM 적용하는 올바른 패턴. (자료3 p.76)",
        "3. (다)는 WHERE 절이 ORDER BY 뒤에 오는 문법 오류.",
        "4. (라)는 최고 급여 1개 값과 일치하는 행만 반환 (여러 명이면 동순위까지 반환, Top 3와 다름)."
      ],
      tip: "Oracle ROWNUM Top N: **인라인 뷰에서 먼저 ORDER BY → 외부에서 WHERE ROWNUM <= N** 패턴이 유일한 정답."
    }
  },
  {
    id: 479,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "Oracle에서 다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["KING", "5000"],
          ["SCOTT", "3000"],
          ["FORD", "3000"],
          ["JONES", "2975"],
          ["BLAKE", "2850"],
          ["CLARK", "2450"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL\nFROM (SELECT ENAME, SAL FROM EMP ORDER BY SAL DESC)\nWHERE ROWNUM <= 3;"
      }
    ],
    choices: [
      "KING(5000), JONES(2975), BLAKE(2850) 3행",
      "KING(5000), SCOTT(3000), FORD(3000) 3행",
      "KING(5000), SCOTT(3000), FORD(3000), JONES(2975) 4행",
      "아무 행도 반환되지 않는다(0건)."
    ],
    ans: 2,
    src: "자료3 p.75~76",
    exp: {
      reason: "인라인 뷰에서 SAL DESC로 정렬하면 KING(5000), SCOTT(3000), FORD(3000), JONES(2975), ... 순이 된다. 외부 쿼리에서 ROWNUM <= 3을 적용하면 상위 3행인 KING, SCOTT, FORD가 반환된다. (자료3 p.75~76, ROW_NUMBER() 등가로 검증)",
      terms: [
        "**인라인 뷰 정렬 후 ROWNUM 적용**: SAL DESC 정렬 결과의 1~3위 행 (자료3 p.76)",
        "**ROWNUM <= 3**: 정렬된 순서의 1, 2, 3번째 행",
        "**SCOTT/FORD 동순위**: 3000으로 동일하지만 ROWNUM은 물리적으로 먼저 나온 행을 1개씩 순서 부여"
      ],
      wrong: [
        "1. 급여 오름차순 또는 무작위 3행으로 잘못 본 경우.",
        "2. (정답) SAL DESC 정렬 후 상위 3행: KING, SCOTT, FORD. (자료3 p.76)",
        "3. ROWNUM <= 3이므로 3행만 반환. 4행이 아님.",
        "4. 인라인 뷰 후 ROWNUM <= 3은 정상 동작하여 3행 반환."
      ],
      tip: "인라인 뷰 패턴은 **정렬 후 ROWNUM 부여**이므로 ROWNUM > 1 문제 없이 동작."
    }
  },
  {
    id: 480,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "Oracle에서 급여(SAL) 내림차순 4~6위 사원을 조회하려 한다. 다음 중 올바른 SQL은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가)\nSELECT ENAME, SAL\nFROM EMP\nWHERE ROWNUM BETWEEN 4 AND 6\nORDER BY SAL DESC;\n\n-- (나)\nSELECT ENAME, SAL\nFROM (SELECT * FROM EMP ORDER BY SAL DESC)\nWHERE ROWNUM BETWEEN 4 AND 6;\n\n-- (다)\nSELECT ENAME, SAL\nFROM (SELECT ROWNUM AS RN, A.*\n       FROM (SELECT ENAME, SAL FROM EMP ORDER BY SAL DESC) A)\nWHERE RN BETWEEN 4 AND 6;"
      }
    ],
    choices: [
      "(가)만 올바르다.",
      "(나)만 올바르다.",
      "(다)만 올바르다.",
      "(나)와 (다) 모두 올바르다."
    ],
    ans: 3,
    src: "자료3 p.76",
    exp: {
      reason: "(가)는 ROWNUM BETWEEN 4 AND 6으로 하한이 4이므로 0건. (나)는 인라인 뷰로 정렬했지만 외부에서 ROWNUM BETWEEN 4 AND 6을 바로 쓰면 역시 하한이 1이 아니라 0건. (다)는 인라인 뷰 결과에 ROWNUM을 먼저 RN이라는 별칭으로 확정한 후, 다시 외부에서 RN BETWEEN 4 AND 6으로 필터링하므로 올바르게 4~6위를 추출한다. (자료3 p.76 '상위 n~m까지의 행을 뽑고 싶다면' 패턴)",
      terms: [
        "**ROWNUM BETWEEN N AND M (N>1)**: 하한이 1보다 크므로 0건 (자료3 p.76)",
        "**RN 별칭 패턴**: 인라인 뷰에서 ROWNUM을 먼저 RN으로 확정 → 외부에서 RN BETWEEN으로 필터 (자료3 p.76)",
        "**2중 인라인 뷰**: 안쪽에서 정렬 → 중간에서 ROWNUM → AS RN 확정 → 바깥에서 RN 필터"
      ],
      wrong: [
        "1. (가)는 ROWNUM BETWEEN 4 AND 6으로 0건.",
        "2. (나)는 인라인 뷰 안에서 정렬했지만 ROWNUM을 별칭으로 확정하지 않아 외부 BETWEEN 4 AND 6이 0건.",
        "3. (정답) (다)는 ROWNUM을 RN으로 확정 후 필터링하는 올바른 패턴. (자료3 p.76)",
        "4. (나)도 올바르지 않다. BETWEEN 4 AND 6을 ROWNUM에 직접 쓰면 0건."
      ],
      tip: "ROWNUM으로 n~m 페이지 추출은 **2중 인라인 뷰 + ROWNUM을 별칭(RN)으로 확정** 후 RN BETWEEN 사용해야 한다."
    }
  },

  // ============================================================
  // 토픽 130: FETCH 절 OFFSET/FETCH FIRST (Q481~Q483) - 3문항, 코드
  // ============================================================
  {
    id: 481,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (PostgreSQL sqld_verify 검증 완료)",
    blocks: [
      {
        type: "table",
        title: "[EMP_TOPN 테이블]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["KING", "5000"],
          ["SCOTT", "3000"],
          ["FORD", "3000"],
          ["JONES", "2975"],
          ["BLAKE", "2850"],
          ["CLARK", "2450"],
          ["...(이하 생략)", "..."]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL\nFROM EMP_TOPN\nORDER BY SAL DESC\nOFFSET 3 ROWS\nFETCH FIRST 3 ROWS ONLY;"
      }
    ],
    choices: [
      "KING(5000), SCOTT(3000), FORD(3000)",
      "JONES(2975), BLAKE(2850), CLARK(2450)",
      "SCOTT(3000), FORD(3000), JONES(2975)",
      "BLAKE(2850), CLARK(2450), ALLEN(1600)"
    ],
    ans: 2,
    src: "자료3 p.76~77",
    exp: {
      reason: "SAL DESC 정렬 시 1위=KING(5000), 2위=SCOTT(3000), 3위=FORD(3000), 4위=JONES(2975), 5위=BLAKE(2850), 6위=CLARK(2450). OFFSET 3 ROWS는 상위 3행(KING, SCOTT, FORD)을 건너뛴다. FETCH FIRST 3 ROWS ONLY는 그 다음 3행(JONES, BLAKE, CLARK)을 반환한다. PostgreSQL 직접 검증 완료. (자료3 p.76~77)",
      terms: [
        "**OFFSET N ROWS**: 결과 집합에서 처음 N개의 행을 건너뛰고 그 다음 행부터 반환 시작 (자료3 p.76)",
        "**FETCH FIRST N ROWS ONLY**: OFFSET 이후 가져올 행의 개수를 지정 (자료3 p.76~77)",
        "**OFFSET 3**: 1~3위(KING, SCOTT, FORD) 건너뜀 → 4위부터 시작",
        "**결과**: 4위=JONES, 5위=BLAKE, 6위=CLARK"
      ],
      wrong: [
        "1. OFFSET 없을 때 상위 3행(KING, SCOTT, FORD). OFFSET 3으로 건너뛴 행들.",
        "2. (정답) OFFSET 3으로 KING/SCOTT/FORD 건너뛰고 다음 3행 반환. PostgreSQL 검증.",
        "3. OFFSET 1일 때의 결과 (KING만 건너뜀).",
        "4. OFFSET 5일 때의 결과."
      ],
      tip: "OFFSET N ROWS = **N행을 건너뛰고 시작**. FETCH FIRST M ROWS ONLY = **그 다음 M행**. (자료3 p.76~77)"
    }
  },
  {
    id: 482,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "다음 SQL에 대한 설명으로 가장 적절하지 않은 것은? (PostgreSQL sqld_verify 검증 완료)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL\nFROM EMP_TOPN\nORDER BY SAL DESC\nFETCH FIRST 2 ROWS WITH TIES;"
      }
    ],
    choices: [
      "ONLY 대신 WITH TIES를 사용하면 마지막 포함 행과 동일한 값을 가진 행도 함께 반환된다.",
      "SAL DESC 정렬 시 KING(5000), SCOTT(3000), FORD(3000) 3행이 반환된다.",
      "FETCH FIRST 2 ROWS ONLY로 바꾸면 결과는 KING(5000)과 SCOTT(3000) 또는 FORD(3000) 2행이 된다.",
      "WITH TIES는 ORDER BY 없이도 사용 가능하며 항상 전체 테이블을 반환한다."
    ],
    ans: 4,
    src: "자료3 p.76~77",
    exp: {
      reason: "WITH TIES는 ORDER BY와 함께 사용해야 의미가 있다. ORDER BY 없이 WITH TIES를 사용하면 동순위 판별 기준 자체가 없어지므로 올바른 동작을 보장할 수 없다. 자료3 p.77에도 WITH TIES 사용 시 ORDER BY가 필수임을 전제한다. (자료3 p.76~77, PostgreSQL 검증)",
      terms: [
        "**WITH TIES**: FETCH FIRST N ROWS에서 N번째 행과 동일한 정렬 기준값을 가진 행을 추가 반환 (자료3 p.76~77)",
        "**ONLY vs WITH TIES**: ONLY = 정확히 N행 / WITH TIES = N번째 동순위까지 모두",
        "**2 ROWS WITH TIES 결과**: 1위 KING(5000), 2위 SCOTT(3000), 동순위 FORD(3000) → 3행",
        "**ORDER BY 필수**: WITH TIES의 동순위 판별은 ORDER BY 기준으로 결정"
      ],
      wrong: [
        "1. 자료3 p.76~77에 WITH TIES 정의 그대로. 동순위 행 추가 반환.",
        "2. FETCH FIRST 2 ROWS WITH TIES 실행 시 2위 SAL=3000이 SCOTT/FORD 둘 다 → 3행 반환. PostgreSQL 검증.",
        "3. ONLY로 바꾸면 정확히 2행. SCOTT/FORD 중 한 행만 반환(구현 의존). 설명 자체는 적절.",
        "4. (정답) WITH TIES는 ORDER BY가 없으면 동순위 판별이 불가능하다."
      ],
      tip: "**WITH TIES = 동순위까지 포함**. ONLY는 딱 N행. 둘 다 ORDER BY 필수."
    }
  },
  {
    id: 483,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "다음 FETCH 절 관련 SQL 중 오류가 발생하는 것을 모두 고른 것은? (PostgreSQL sqld_verify 검증 완료)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가)\nSELECT ENAME, SAL FROM EMP_TOPN\nORDER BY SAL DESC\nFETCH FIRST 5 ROWS ONLY;\n\n-- (나)\nSELECT ENAME, SAL FROM EMP_TOPN\nORDER BY SAL DESC\nOFFSET -1 ROWS\nFETCH FIRST 3 ROWS ONLY;\n\n-- (다)\nSELECT ENAME, SAL FROM EMP_TOPN\nORDER BY SAL DESC\nOFFSET 0 ROWS\nFETCH FIRST 3 ROWS ONLY;\n\n-- (라)\nSELECT ENAME, SAL FROM EMP_TOPN\nFETCH FIRST 3 ROWS ONLY\nORDER BY SAL DESC;"
      }
    ],
    choices: [
      "(나)만",
      "(나), (라)",
      "(가), (다)",
      "(가), (나), (라)"
    ],
    ans: 2,
    src: "자료3 p.76~77",
    exp: {
      reason: "(가)는 정상 동작(상위 5행). (나)는 OFFSET -1이 음수라 'OFFSET must not be negative' 오류 발생(PostgreSQL 검증). (다)는 OFFSET 0이 유효하며 전체에서 3행 반환(정상). (라)는 FETCH 절이 ORDER BY보다 앞에 와서 문법 오류 발생. 자료3 p.76에 'ORDER BY 절 뒤에 사용(내부 파싱 순서도 ORDER BY 뒤)'로 명시. (자료3 p.76~77, PostgreSQL 검증)",
      terms: [
        "**OFFSET 음수 금지**: OFFSET은 0 이상이어야 함. 음수 입력 시 오류 (PostgreSQL 검증)",
        "**FETCH 절 위치**: ORDER BY 절 뒤에 위치해야 함 (자료3 p.76)",
        "**OFFSET 0**: 유효한 값. 전체 결과에서 0행을 건너뛰므로 처음부터 반환",
        "**(나) 오류**: OFFSET -1 → 'OFFSET must not be negative' / **(라) 오류**: FETCH가 ORDER BY 앞에 위치"
      ],
      wrong: [
        "1. (나)만이면 (라)의 문법 오류를 놓침.",
        "2. (정답) (나) OFFSET 음수 오류 + (라) FETCH 절 위치 오류. (PostgreSQL 검증)",
        "3. (가)와 (다)는 모두 정상 실행된다.",
        "4. (가)는 정상 동작."
      ],
      tip: "FETCH 절 두 가지 함정: ① **OFFSET은 음수 불가** ② **FETCH 절은 반드시 ORDER BY 뒤에 위치**."
    }
  },

  // ============================================================
  // 토픽 131: TOP N (SQL Server) (Q484~Q485) - 2문항, 코드
  // ============================================================
  {
    id: 484,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "SQL Server에서 다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["KING", "5000"],
          ["SCOTT", "3000"],
          ["FORD", "3000"],
          ["JONES", "2975"],
          ["BLAKE", "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT TOP 2 ENAME, SAL\nFROM EMP\nORDER BY SAL DESC;"
      }
    ],
    choices: [
      "KING(5000), SCOTT(3000), FORD(3000) 3행",
      "KING(5000), SCOTT(3000) 2행",
      "KING(5000)만 1행",
      "아무 행도 반환되지 않는다(0건)."
    ],
    ans: 2,
    src: "자료3 p.77",
    exp: {
      reason: "SQL Server의 TOP N은 서브쿼리 없이 정렬된 순서대로 상위 N개의 행을 추출한다. TOP 2는 SAL DESC 정렬 후 1위=KING(5000), 2위=SCOTT(3000) 2행을 반환한다. FORD(3000)도 SAL이 같지만 WITH TIES가 없으므로 포함되지 않는다. (자료3 p.77)",
      terms: [
        "**TOP N 문법**: SELECT TOP N 컬럼 FROM 테이블 ORDER BY 정렬컬럼 (자료3 p.77)",
        "**서브쿼리 불필요**: SQL Server TOP N은 단일 쿼리로 정렬된 상위 N행 추출 (자료3 p.77)",
        "**WITH TIES 미사용**: 동순위 FORD(3000)는 포함되지 않음",
        "**반환 행**: KING(5000) 1위, SCOTT(3000) 2위 → 2행"
      ],
      wrong: [
        "1. WITH TIES가 없으므로 FORD(3000)는 포함되지 않는다. 3행이 아닌 2행.",
        "2. (정답) TOP 2는 정확히 2행(KING, SCOTT) 반환. (자료3 p.77)",
        "3. TOP 2는 2행 반환. KING 1행이 아님.",
        "4. TOP 2 + ORDER BY는 정상 동작하여 2행 반환."
      ],
      tip: "**TOP N**: SQL Server 전용. SELECT 바로 뒤에 TOP N 명시. WITH TIES 없으면 정확히 N행."
    }
  },
  {
    id: 485,
    subj: 2,
    topic: "2-K",
    topic_name: "Top N 쿼리",
    diff: "중",
    has_code: true,
    q: "SQL Server에서 다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["KING", "5000"],
          ["SCOTT", "3000"],
          ["FORD", "3000"],
          ["JONES", "2975"],
          ["BLAKE", "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT TOP 2 WITH TIES ENAME, SAL\nFROM EMP\nORDER BY SAL DESC;"
      }
    ],
    choices: [
      "KING(5000), SCOTT(3000) 2행",
      "KING(5000), SCOTT(3000), FORD(3000) 3행",
      "SCOTT(3000), FORD(3000) 2행",
      "KING(5000), SCOTT(3000), FORD(3000), JONES(2975) 4행"
    ],
    ans: 2,
    src: "자료3 p.77",
    exp: {
      reason: "TOP N WITH TIES는 N번째 행과 동일한 정렬 값을 가진 행을 함께 출력한다. SAL DESC에서 2번째 행 SAL=3000과 동일한 값을 가진 FORD(3000)도 함께 반환되므로 총 3행이 출력된다. 자료3 p.77에 'WITH TIES를 사용해 동순위까지 함께 출력이 가능함'으로 명시. (자료3 p.77)",
      terms: [
        "**TOP N WITH TIES**: N번째 행의 ORDER BY 기준값과 동일한 행을 모두 포함 (자료3 p.77)",
        "**동순위 포함**: 2위 SAL=3000인 SCOTT와 FORD 둘 다 포함 → 3행 반환",
        "**TOP N만**: 정확히 N행 / **TOP N WITH TIES**: N번째 동순위까지 포함",
        "**SQL Server 전용**: Oracle/PostgreSQL의 FETCH FIRST N ROWS WITH TIES와 동일 효과 (자료3 p.77)"
      ],
      wrong: [
        "1. WITH TIES 없이 TOP 2일 때의 결과(2행). 이 문제는 WITH TIES 사용.",
        "2. (정답) 2위 SAL=3000 동순위인 FORD(3000) 포함으로 3행 반환. (자료3 p.77)",
        "3. KING(5000)이 1위이므로 반드시 포함. SCOTT/FORD만 반환하는 경우는 없음.",
        "4. JONES(2975)는 SAL이 3000이 아니므로 WITH TIES 대상이 아님. 4행이 아님."
      ],
      tip: "**TOP N WITH TIES**: N번째와 같은 값이면 추가 출력. SCOTT/FORD 둘 다 SAL=3000이므로 2행이 아닌 3행."
    }
  }
];

module.exports = k2Part1;

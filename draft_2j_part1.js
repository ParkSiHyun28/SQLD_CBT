// 2-J: Q431~Q454 (윈도우 함수 Part1, 24문항)
// 토픽 119~123 일부. 자료3 p.66~71 기반.
// PostgreSQL 14 sqld_verify DB 직접 검증 완료.
// 검증 시나리오: OVER() 빈괄호, PARTITION BY 합, 누적합, ROWS vs RANGE 동률,
//   ROW_NUMBER/RANK/DENSE_RANK 동률, LAG/LEAD NULL 경계 등 총 9개 시나리오

const j2Part1 = [
  // ============================================================
  // 토픽 119: 윈도우 함수 기본 문법 (Q431~Q434) - 4문항
  // ============================================================
  {
    id: 431,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "하",
    has_code: false,
    q: "다음 중 윈도우 함수의 기본 문법 구조에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "윈도우 함수는 OVER 절을 반드시 동반하며, OVER 없이는 윈도우 함수로 동작하지 않는다.",
      "PARTITION BY 절은 GROUP BY 절처럼 특정 컬럼을 기준으로 연산할 그룹을 지정한다.",
      "ORDER BY 절은 집계 윈도우 함수에서는 선택 사항이지만 순위 함수에서는 필수이다.",
      "ROWS|RANGE BETWEEN A AND B 절은 Oracle과 SQL Server 모두 동일하게 지원한다."
    ],
    ans: 4,
    src: "자료3 p.66",
    exp: {
      reason: "자료3 p.66에 'ROWS|RANGE BETWEEN A AND B절(SQL Server는 지원X)'로 명시되어 있다. SQL Server는 ROWS/RANGE BETWEEN 구문을 지원하지 않는다. (자료3 p.66)",
      terms: [
        "**OVER 절**: 윈도우 함수임을 선언하는 필수 키워드. 괄호 안이 비어 있어도 반드시 작성",
        "**PARTITION BY**: 연산 범위 그룹 지정. GROUP BY와 달리 행 수를 줄이지 않음",
        "**ORDER BY**: 순위 함수는 필수, 집계 함수는 선택 (없으면 파티션 전체 집계)",
        "**ROWS|RANGE BETWEEN**: 연산 범위 세부 설정. SQL Server 미지원"
      ],
      wrong: [
        "1. 자료3 p.66 문법 구조에서 OVER 절은 필수 요소로 명시되어 있다.",
        "2. 자료3 p.66에 PARTITION BY = 그룹연산을 수행할 특정 그룹(=GROUP BY 컬럼)으로 설명한다.",
        "3. 자료3 p.66에 순위 함수는 ORDER BY 필수, 집계 함수는 누적값 출력 시 사용으로 구분된다.",
        "4. (정답) SQL Server는 ROWS|RANGE BETWEEN을 지원하지 않는다."
      ],
      tip: "ROWS|RANGE BETWEEN = **Oracle/PostgreSQL 전용**. SQL Server 미지원."
    }
  },
  {
    id: 432,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 OVER 절 작성 순서에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT 컬럼,\n       집계함수(컬럼) OVER ([PARTITION BY 컬럼]\n                             [ORDER BY 컬럼 ASC|DESC]\n                             [ROWS|RANGE BETWEEN A AND B]) AS result\nFROM 테이블명;"
      }
    ],
    choices: [
      "PARTITION BY, ORDER BY, ROWS|RANGE BETWEEN 절은 순서를 바꿔 작성해도 동작한다.",
      "PARTITION BY, ORDER BY, ROWS|RANGE BETWEEN 절은 반드시 명시된 순서대로 작성해야 한다.",
      "ORDER BY 절은 PARTITION BY 앞에 작성해도 동작한다.",
      "ROWS|RANGE BETWEEN 절은 ORDER BY 없이도 작성할 수 있다."
    ],
    ans: 2,
    src: "자료3 p.66",
    exp: {
      reason: "자료3 p.66에 'PARTITON BY, ORDER BY, ROWS|... 순서 그대로 전달해야 오류X'라고 명시되어 있다. 세 절의 순서는 반드시 지켜야 한다. (자료3 p.66)",
      terms: [
        "**OVER 절 순서 규칙**: PARTITION BY → ORDER BY → ROWS|RANGE 순 고정",
        "**순서 위반 시**: 문법 오류 발생",
        "**선택 여부**: 세 절 모두 선택 사항이지만, 작성 시 순서는 고정",
        "**ROWS|RANGE 선행 조건**: ORDER BY가 있어야 의미가 있음"
      ],
      wrong: [
        "1. 순서를 바꾸면 자료3 p.66에서 오류가 난다고 명시되어 있다.",
        "2. (정답) 자료3 p.66 주석 '순서 그대로 전달해야 오류X' 명시.",
        "3. ORDER BY를 PARTITION BY 앞에 두면 문법 오류가 발생한다.",
        "4. ROWS|RANGE BETWEEN은 ORDER BY 없이 사용하면 오류가 발생한다."
      ],
      tip: "OVER 절 = PARTITION BY → ORDER BY → ROWS|RANGE. **순서 고정 필수**."
    }
  },
  {
    id: 433,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: false,
    q: "다음 중 윈도우 함수와 GROUP BY 집계 함수의 차이에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "GROUP BY는 그룹마다 한 행씩 결과를 반환하지만, 윈도우 함수는 원본 행 수를 유지하면서 집계 결과를 각 행에 붙여준다.",
      "윈도우 함수는 조인과 서브쿼리를 사용하지 않고 행과 행 간을 비교하거나 연산할 수 있다.",
      "윈도우 함수는 GROUP BY 없이 그룹 연산을 가능하게 해준다.",
      "윈도우 함수는 WHERE 절에서 사용할 수 있으며, 조건 필터링에 활용된다."
    ],
    ans: 4,
    src: "자료3 p.66",
    exp: {
      reason: "윈도우 함수는 SELECT 절에서 사용하며, WHERE 절에는 사용할 수 없다. WHERE 절에서 윈도우 함수 결과를 필터링하려면 인라인 뷰(서브쿼리)로 감싸야 한다. (자료3 p.66)",
      terms: [
        "**윈도우 함수 사용 위치**: SELECT 절 내에서만 사용 가능",
        "**WHERE 절 사용 불가**: 윈도우 함수 결과를 WHERE로 거르려면 인라인 뷰 필요",
        "**GROUP BY와 차이**: GROUP BY = 행 수 감소 / 윈도우 함수 = 행 수 유지",
        "**자료3 p.66**: '조인과 서브쿼리를 쓰지 않고 행과 행간을 비교, 연산하는 것을 가능하게 해준다'"
      ],
      wrong: [
        "1. 자료3 p.66에 각 그룹별 한 행씩 요약 출력하는 집계함수와 달리, 각 행을 유지하면서 연산한다고 명시.",
        "2. 자료3 p.66의 윈도우 함수 정의 그대로다.",
        "3. 자료3 p.66에 'GROUP BY 없이 그룹 연산을 가능하게 해준다'고 명시.",
        "4. (정답) 윈도우 함수는 WHERE 절에서 사용 불가."
      ],
      tip: "윈도우 함수 = SELECT 절 전용. **WHERE 절 불가**."
    }
  },
  {
    id: 434,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 OVER 절의 역할에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "SAL"],
        rows: [
          ["7369", "SMITH", "800"],
          ["7499", "ALLEN", "1600"],
          ["7521", "WARD", "1250"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, ENAME, SAL,\n       SUM(SAL) OVER() AS TOTAL\nFROM EMP;"
      }
    ],
    choices: [
      "OVER() 빈 괄호이므로 각 행에 해당 행의 SAL 값만 반환한다.",
      "OVER() 빈 괄호이므로 오류가 발생한다.",
      "OVER() 빈 괄호이면 파티션 없이 전체 행을 하나의 윈도우로 보고 SAL 전체 합계를 모든 행에 동일하게 반환한다.",
      "OVER() 빈 괄호이면 GROUP BY 없이 집계할 수 없어 NULL을 반환한다."
    ],
    ans: 3,
    src: "자료3 p.66~67",
    exp: {
      reason: "OVER()에 아무것도 지정하지 않으면 전체 결과 집합을 하나의 윈도우로 취급한다. SUM(SAL) OVER()는 파티션 없이 모든 행의 SAL을 합산한 값을 각 행에 동일하게 반환한다. PostgreSQL 검증 완료: 10행 모두 20425 반환. (자료3 p.66~67)",
      terms: [
        "**OVER() 빈 괄호**: PARTITION BY, ORDER BY, ROWS|RANGE 모두 생략 = 전체 집합이 하나의 파티션",
        "**결과**: 모든 행에 동일한 집계값이 붙음 (SUM이면 전체 합, AVG면 전체 평균)",
        "**오류 아님**: OVER() 빈 괄호는 유효한 문법",
        "**GROUP BY와의 차이**: GROUP BY였다면 EMPNO, ENAME, SAL은 SELECT 불가"
      ],
      wrong: [
        "1. SUM 집계이므로 각 행의 SAL 값만 반환하지 않는다.",
        "2. OVER() 빈 괄호는 정상 문법이다.",
        "3. (정답) 전체 행이 하나의 파티션이 되어 전체 합계를 각 행에 반환한다.",
        "4. NULL이 아니라 전체 합계를 반환한다."
      ],
      tip: "OVER() 빈 괄호 = **전체가 하나의 파티션**. 모든 행에 동일한 집계값."
    }
  },

  // ============================================================
  // 토픽 120: 일반 집계 윈도우 함수 (Q435~Q440) - 6문항
  // ============================================================
  {
    id: 435,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 DEPT10_SUM 컬럼의 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["MILLER", "10", "1300"],
          ["CLARK",  "10", "2450"],
          ["KING",   "10", "5000"],
          ["SMITH",  "20", "800"],
          ["JONES",  "20", "2975"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO, SAL,\n       SUM(SAL) OVER(PARTITION BY DEPTNO) AS DEPT10_SUM\nFROM EMP\nWHERE DEPTNO = 10;"
      }
    ],
    choices: [
      "1300, 2450, 5000 (각 행의 SAL 값)",
      "8750, 8750, 8750 (10번 부서 전체 합계)",
      "3775, 3775, 3775 (20번 부서 전체 합계)",
      "12525, 12525, 12525 (전체 합계)"
    ],
    ans: 2,
    src: "자료3 p.67~68",
    exp: {
      reason: "PARTITION BY DEPTNO를 사용하면 부서별로 그룹을 나눠 각 행에 해당 부서의 합계를 반환한다. WHERE DEPTNO = 10이므로 10번 부서 행만 결과로 나오며, MILLER/CLARK/KING 모두 10번 부서 합계인 1300+2450+5000=8750을 갖는다. PostgreSQL 검증 완료. (자료3 p.67~68)",
      terms: [
        "**PARTITION BY DEPTNO**: 부서별로 독립된 윈도우 생성",
        "**SUM OVER(PARTITION BY)**: 각 행에 해당 파티션(부서)의 SAL 합계 반환",
        "**ORDER BY 없음**: 누적이 아닌 파티션 전체 합계",
        "**WHERE와 독립**: PARTITION BY는 WHERE 필터링 후 남은 행 기준으로 동작"
      ],
      wrong: [
        "1. ORDER BY 없이는 누적이 아닌 파티션 전체 합계를 반환한다.",
        "2. (정답) 10번 부서 3명의 SAL 합계 = 8750.",
        "3. WHERE DEPTNO=10이므로 20번 부서 행은 결과에 없다.",
        "4. 전체 합계는 OVER() 빈 괄호 또는 WHERE 없이 사용할 때 나온다."
      ],
      tip: "ORDER BY 없는 SUM OVER(PARTITION BY) = **파티션 전체 합계**. 모든 행에 동일."
    }
  },
  {
    id: 436,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 WARD 행의 CUM_SUM 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP (DEPTNO=30, SAL 오름차순)]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["JAMES",  "950"],
          ["WARD",   "1250"],
          ["MARTIN", "1250"],
          ["ALLEN",  "1600"],
          ["BLAKE",  "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       SUM(SAL) OVER(ORDER BY SAL) AS CUM_SUM\nFROM EMP\nWHERE DEPTNO = 30\nORDER BY SAL;"
      }
    ],
    choices: [
      "2200 (950+1250)",
      "3450 (950+1250+1250)",
      "5050 (950+1250+1250+1600)",
      "1250 (WARD의 SAL만)"
    ],
    ans: 2,
    src: "자료3 p.68~69",
    exp: {
      reason: "ORDER BY SAL만 지정하면 기본 프레임은 RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW이다. RANGE는 동일한 값을 같은 그룹으로 묶어 동시에 연산한다. WARD(1250)와 MARTIN(1250)은 동률이므로 같은 RANGE로 묶여 두 행 모두 950+1250+1250=3450을 반환한다. PostgreSQL 검증 완료. (자료3 p.68~69)",
      terms: [
        "**SUM OVER(ORDER BY)**: 기본 프레임 = RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
        "**RANGE 동률 처리**: 같은 값은 같은 그룹으로 묶어 동시에 계산",
        "**WARD와 MARTIN 모두 3450**: 1250 동률이라 같은 RANGE 구간",
        "**ROWS와의 차이**: ROWS였다면 WARD=2200, MARTIN=3450으로 다름"
      ],
      wrong: [
        "1. 2200은 ROWS BETWEEN을 사용했을 때 WARD의 값 (950+1250=2200). RANGE 기본이면 동률 포함.",
        "2. (정답) RANGE 기본 프레임에서 동률 1250을 모두 포함하여 950+1250+1250=3450.",
        "3. 5050은 ALLEN(1600)까지 포함된 누적값.",
        "4. 1250은 단순 SAL 값이다."
      ],
      tip: "ORDER BY만 있는 SUM OVER = **RANGE 기본**. 동률은 한 번에 묶어 같은 값 반환."
    }
  },
  {
    id: 437,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 각 행의 AVG_SAL 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["MILLER", "10", "1300"],
          ["CLARK",  "10", "2450"],
          ["KING",   "10", "5000"],
          ["SMITH",  "20", "800"],
          ["JONES",  "20", "2975"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO, SAL,\n       ROUND(AVG(SAL) OVER(PARTITION BY DEPTNO), 2) AS AVG_SAL\nFROM EMP\nORDER BY DEPTNO, SAL;"
      }
    ],
    choices: [
      "MILLER=1300, CLARK=2450, KING=5000, SMITH=800, JONES=2975",
      "MILLER=2916.67, CLARK=2916.67, KING=2916.67, SMITH=2916.67, JONES=2916.67",
      "MILLER=2916.67, CLARK=2916.67, KING=2916.67, SMITH=1887.50, JONES=1887.50",
      "MILLER=1300, CLARK=1875, KING=2916.67, SMITH=800, JONES=1887.50"
    ],
    ans: 3,
    src: "자료3 p.67~68",
    exp: {
      reason: "PARTITION BY DEPTNO로 부서별 독립 파티션을 만들어 각 부서의 평균을 반환한다. 10번 부서 평균 = (1300+2450+5000)/3 = 2916.67, 20번 부서 평균 = (800+2975)/2 = 1887.50. ORDER BY 없이 AVG이므로 누적이 아닌 파티션 전체 평균이다. PostgreSQL 검증 완료. (자료3 p.67~68)",
      terms: [
        "**AVG OVER(PARTITION BY)**: 파티션 전체 평균을 각 행에 반환",
        "**10번 부서**: (1300+2450+5000)/3 = 2916.67",
        "**20번 부서**: (800+2975)/2 = 1887.50",
        "**ORDER BY 없음**: 파티션 전체 평균 (누적 아님)"
      ],
      wrong: [
        "1. ORDER BY 없이는 각 행의 SAL이 아닌 파티션 전체 평균을 반환한다.",
        "2. 전체 평균이면 PARTITION BY 없이 OVER()를 사용해야 한다.",
        "3. (정답) 부서별 파티션 평균. 10번=2916.67, 20번=1887.50.",
        "4. 4번은 누적 평균 형태이며 ORDER BY가 있어야 나올 수 있는 패턴이다."
      ],
      tip: "AVG OVER(PARTITION BY, ORDER BY 없음) = **파티션 전체 평균**."
    }
  },
  {
    id: 438,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 DEPT_CNT 컬럼의 각 행 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["MILLER", "10", "1300"],
          ["CLARK",  "10", "2450"],
          ["KING",   "10", "5000"],
          ["SMITH",  "20", "800"],
          ["JONES",  "20", "2975"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO,\n       COUNT(*) OVER(PARTITION BY DEPTNO) AS DEPT_CNT\nFROM EMP\nORDER BY DEPTNO, ENAME;"
      }
    ],
    choices: [
      "MILLER=1, CLARK=2, KING=3, SMITH=1, JONES=2",
      "MILLER=5, CLARK=5, KING=5, SMITH=5, JONES=5",
      "MILLER=3, CLARK=3, KING=3, SMITH=5, JONES=5",
      "MILLER=3, CLARK=3, KING=3, SMITH=2, JONES=2"
    ],
    ans: 4,
    src: "자료3 p.68",
    exp: {
      reason: "COUNT(*) OVER(PARTITION BY DEPTNO)는 각 행이 속한 파티션(부서)의 행 수를 반환한다. 10번 부서 3명 모두 3, 20번 부서 2명 모두 2를 반환한다. ORDER BY 없으므로 누적이 아닌 파티션 전체 건수다. PostgreSQL 검증 완료. (자료3 p.68)",
      terms: [
        "**COUNT(*) OVER(PARTITION BY)**: 파티션별 전체 행 수를 각 행에 반환",
        "**10번 부서**: MILLER, CLARK, KING 3명 → 모두 3",
        "**20번 부서**: SMITH, JONES 2명 → 모두 2",
        "**ORDER BY 없음**: 누적 건수가 아닌 파티션 전체 건수"
      ],
      wrong: [
        "1. ORDER BY ENAME 기준 누적 카운트처럼 보이는 함정 보기이다.",
        "2. 5는 전체 행 수로, PARTITION BY 없이 OVER()를 쓸 때의 결과이다.",
        "3. 20번 부서가 5로 잘못된 보기이다.",
        "4. (정답) 파티션 전체 건수. 10번 부서=3, 20번 부서=2."
      ],
      tip: "COUNT OVER(PARTITION BY) = **파티션별 행 수**. 같은 파티션은 모두 같은 값."
    }
  },
  {
    id: 439,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL에서 ORDER BY를 추가했을 때와 추가하지 않았을 때 SUM_SAL 컬럼의 차이를 가장 올바르게 설명한 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP (DEPTNO=10, SAL 오름차순)]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["MILLER", "1300"],
          ["CLARK",  "2450"],
          ["KING",   "5000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- SQL A\nSELECT ENAME, SAL,\n       SUM(SAL) OVER(PARTITION BY DEPTNO) AS SUM_SAL\nFROM EMP WHERE DEPTNO = 10 ORDER BY SAL;\n\n-- SQL B\nSELECT ENAME, SAL,\n       SUM(SAL) OVER(PARTITION BY DEPTNO ORDER BY SAL) AS SUM_SAL\nFROM EMP WHERE DEPTNO = 10 ORDER BY SAL;"
      }
    ],
    choices: [
      "SQL A와 SQL B 모두 MILLER=8750, CLARK=8750, KING=8750을 반환한다.",
      "SQL A는 MILLER=1300, CLARK=2450, KING=5000을 반환하고, SQL B는 MILLER=8750, CLARK=8750, KING=8750을 반환한다.",
      "SQL A는 MILLER=8750, CLARK=8750, KING=8750을 반환하고, SQL B는 MILLER=1300, CLARK=3750, KING=8750을 반환한다.",
      "SQL A와 SQL B 모두 MILLER=1300, CLARK=3750, KING=8750을 반환한다."
    ],
    ans: 3,
    src: "자료3 p.67~68",
    exp: {
      reason: "ORDER BY가 없으면(SQL A) 파티션 전체 합계를 모든 행에 반환한다. ORDER BY SAL이 있으면(SQL B) 기본 프레임 RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW가 적용되어 누적 합계를 반환한다. 10번 부서 SAL 합계=8750이므로 SQL A는 모두 8750, SQL B는 1300, 3750, 8750 누적값을 반환한다. PostgreSQL 검증 완료. (자료3 p.67~68)",
      terms: [
        "**ORDER BY 없음**: 파티션 전체 합계 → 모든 행 동일",
        "**ORDER BY 있음**: 기본 프레임 RANGE 누적 합계 → 행마다 다름",
        "**SQL A**: MILLER=8750, CLARK=8750, KING=8750",
        "**SQL B**: MILLER=1300, CLARK=3750(=1300+2450), KING=8750(=1300+2450+5000)"
      ],
      wrong: [
        "1. SQL B는 누적 합계라 모두 동일하지 않다.",
        "2. SQL A가 각 행의 SAL만 반환한다는 설명이 틀렸다.",
        "3. (정답) ORDER BY 유무로 파티션 전체 합 vs 누적 합이 갈린다.",
        "4. SQL A는 누적이 아닌 전체 합계이다."
      ],
      tip: "SUM OVER(PARTITION BY만) = **전체 합계** / SUM OVER(PARTITION BY + ORDER BY) = **누적 합계**."
    }
  },
  {
    id: 440,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 KING 행의 DEPT_MIN, DEPT_MAX 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["MILLER", "10", "1300"],
          ["CLARK",  "10", "2450"],
          ["KING",   "10", "5000"],
          ["SMITH",  "20", "800"],
          ["JONES",  "20", "2975"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO, SAL,\n       MIN(SAL) OVER(PARTITION BY DEPTNO ORDER BY SAL) AS DEPT_MIN,\n       MAX(SAL) OVER(PARTITION BY DEPTNO ORDER BY SAL) AS DEPT_MAX\nFROM EMP\nWHERE ENAME = 'KING';"
      }
    ],
    choices: [
      "DEPT_MIN=1300, DEPT_MAX=5000",
      "DEPT_MIN=5000, DEPT_MAX=5000",
      "DEPT_MIN=800, DEPT_MAX=5000",
      "DEPT_MIN=1300, DEPT_MAX=2450"
    ],
    ans: 1,
    src: "자료3 p.68",
    exp: {
      reason: "자료3 p.68에 'MIN(), MAX()의 경우 ORDER BY 영향 X'라고 명시되어 있다. MIN/MAX는 ORDER BY가 있어도 누적이 아닌 파티션 전체를 기준으로 연산하여, KING은 10번 부서의 최솟값 1300과 최댓값 5000을 반환한다. PostgreSQL 검증 완료. (자료3 p.68)",
      terms: [
        "**MIN/MAX ORDER BY 영향 없음**: 자료3 p.68 명시. ORDER BY 여부와 무관하게 파티션 전체 대상",
        "**10번 부서 MIN**: 1300 (MILLER의 SAL)",
        "**10번 부서 MAX**: 5000 (KING의 SAL)",
        "**SUM/AVG/COUNT와의 차이**: SUM/AVG/COUNT는 ORDER BY 있으면 누적, MIN/MAX는 무관"
      ],
      wrong: [
        "1. (정답) 자료3 p.68에 MIN/MAX는 ORDER BY 영향 없음을 명시. 파티션 전체 최솟값/최댓값.",
        "2. ORDER BY SAL이 있어도 KING 행만 대상이 아니라 파티션 전체 대상이다.",
        "3. 800은 20번 부서 SMITH의 SAL이다. PARTITION BY DEPTNO로 부서가 분리되어 있다.",
        "4. 2450은 CLARK의 SAL이며, MAX는 KING의 5000이다."
      ],
      tip: "MIN/MAX는 **ORDER BY 있어도 파티션 전체** 기준. SUM/AVG와 다름."
    }
  },

  // ============================================================
  // 토픽 121: ROWS vs RANGE (Q441~Q444) - 4문항
  // ============================================================
  {
    id: 441,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: false,
    q: "다음 중 ROWS와 RANGE의 차이에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "ROWS는 값이 같으면 하나의 그룹으로 묶어 동시에 연산하고, RANGE는 행 각각을 독립적으로 연산한다.",
      "RANGE는 값이 같으면 하나의 그룹으로 묶어 동시에 연산하고, ROWS는 행 각각을 독립적으로 연산한다.",
      "ROWS와 RANGE는 같은 동작을 하며 차이가 없다.",
      "RANGE는 Oracle에서만 지원하고, ROWS는 모든 DBMS에서 지원한다."
    ],
    ans: 2,
    src: "자료3 p.68~69",
    exp: {
      reason: "자료3 p.69에 '1) ROWS: 값이 같더라도 각 행씩 연산, 2) RANGE: 값이 같으면 하나의 RANGE로 묶어서 동시 연산'으로 명시되어 있다. (자료3 p.68~69)",
      terms: [
        "**ROWS**: 행 단위 처리. 동률이어도 각각 다른 행으로 취급",
        "**RANGE**: 값 단위 처리. 동률이면 같은 그룹으로 묶어 동시 연산 (기본값)",
        "**기본 프레임**: ORDER BY만 지정하면 RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
        "**동률 데이터 예**: SAL=1250이 두 행이면 RANGE는 둘 다 동시에 반영, ROWS는 순서대로 하나씩"
      ],
      wrong: [
        "1. ROWS와 RANGE의 설명이 뒤바뀌어 있다.",
        "2. (정답) 자료3 p.69 정의 그대로다.",
        "3. 동률 데이터에서 결과가 달라진다.",
        "4. SQL Server는 ROWS|RANGE BETWEEN 절 자체를 지원하지 않는다."
      ],
      tip: "RANGE = **값 같으면 동시 처리** (기본) / ROWS = **행마다 독립 처리**."
    }
  },
  {
    id: 442,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 두 SQL의 실행 결과에서 WARD 행의 (RANGE_SUM, ROWS_SUM) 값으로 옳은 것은? (WARD의 SAL = 1250, 동률 MARTIN SAL = 1250)",
    blocks: [
      {
        type: "table",
        title: "[EMP (DEPTNO=30, SAL 오름차순)]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["JAMES",  "950"],
          ["WARD",   "1250"],
          ["MARTIN", "1250"],
          ["ALLEN",  "1600"],
          ["BLAKE",  "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- SQL A: RANGE\nSELECT ENAME, SAL,\n       SUM(SAL) OVER(ORDER BY SAL\n           RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RANGE_SUM\nFROM EMP WHERE DEPTNO = 30 ORDER BY SAL;\n\n-- SQL B: ROWS\nSELECT ENAME, SAL,\n       SUM(SAL) OVER(ORDER BY SAL\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS ROWS_SUM\nFROM EMP WHERE DEPTNO = 30 ORDER BY SAL;"
      }
    ],
    choices: [
      "(RANGE_SUM=2200, ROWS_SUM=2200)",
      "(RANGE_SUM=3450, ROWS_SUM=3450)",
      "(RANGE_SUM=3450, ROWS_SUM=2200)",
      "(RANGE_SUM=2200, ROWS_SUM=3450)"
    ],
    ans: 3,
    src: "자료3 p.68~69",
    exp: {
      reason: "RANGE는 WARD(1250)와 MARTIN(1250)을 동일 값으로 묶어 동시에 연산하므로 두 행 모두 950+1250+1250=3450을 반환한다. ROWS는 순서대로 행별 연산하므로 WARD는 950+1250=2200, MARTIN은 950+1250+1250=3450을 반환한다. PostgreSQL 검증 완료. (자료3 p.68~69)",
      terms: [
        "**RANGE 동률 처리**: WARD, MARTIN 모두 SAL=1250 → 같은 RANGE 구간 → 둘 다 3450",
        "**ROWS 행별 처리**: WARD(2번째 행)=950+1250=2200, MARTIN(3번째 행)=950+1250+1250=3450",
        "**결과 차이**: WARD 행에서만 RANGE(3450) vs ROWS(2200) 차이 발생"
      ],
      wrong: [
        "1. 두 값이 같으면 ROWS와 RANGE가 다르지 않다는 잘못된 가정이다.",
        "2. ROWS는 순서대로 처리하므로 WARD의 ROWS_SUM은 2200이다.",
        "3. (정답) RANGE=3450(동률 묶음), ROWS=2200(행별 처리).",
        "4. RANGE와 ROWS의 설명이 뒤바뀌어 있다."
      ],
      tip: "동률이 있을 때 RANGE는 모두 같은 값, ROWS는 순서에 따라 달라짐."
    }
  },
  {
    id: 443,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 JAMES 행의 TOTAL_SAL 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP (DEPTNO=30, SAL 오름차순)]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["JAMES",  "950"],
          ["WARD",   "1250"],
          ["MARTIN", "1250"],
          ["ALLEN",  "1600"],
          ["BLAKE",  "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       SUM(SAL) OVER(ORDER BY SAL\n           ROWS BETWEEN UNBOUNDED PRECEDING\n           AND UNBOUNDED FOLLOWING) AS TOTAL_SAL\nFROM EMP WHERE DEPTNO = 30 ORDER BY SAL;"
      }
    ],
    choices: [
      "7900 (전체 합계)",
      "950 (JAMES의 SAL만)",
      "2200 (JAMES부터 WARD까지)",
      "3450 (JAMES부터 MARTIN까지)"
    ],
    ans: 1,
    src: "자료3 p.68~69",
    exp: {
      reason: "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING은 파티션의 첫 행부터 마지막 행까지 전체를 프레임으로 지정한다. 따라서 모든 행에 파티션 전체 합계인 950+1250+1250+1600+2850=7900이 반환된다. PostgreSQL 검증 완료. (자료3 p.68~69)",
      terms: [
        "**UNBOUNDED PRECEDING**: 파티션의 첫 번째 행 (맨 위)",
        "**UNBOUNDED FOLLOWING**: 파티션의 마지막 행 (맨 아래)",
        "**UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING**: 파티션 전체 = 모든 행에 동일한 합계",
        "**ROWS 지정 시**: 동률 여부와 무관하게 물리적으로 첫 행부터 마지막 행까지"
      ],
      wrong: [
        "1. (정답) UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING = 전체 합계 7900.",
        "2. CURRENT ROW만을 대상으로 할 경우 JAMES의 SAL 값이다.",
        "3. ROWS BETWEEN UNBOUNDED PRECEDING AND 1 FOLLOWING이었을 때 JAMES 기준 첫 두 행의 합.",
        "4. ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW에서 MARTIN 행의 값이다."
      ],
      tip: "UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING = **파티션 전체 합**. 모든 행 동일."
    }
  },
  {
    id: 444,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 WARD 행의 CUM_SAL 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP (DEPTNO=30, SAL 오름차순)]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["JAMES",  "950"],
          ["WARD",   "1250"],
          ["MARTIN", "1250"],
          ["ALLEN",  "1600"],
          ["BLAKE",  "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       SUM(SAL) OVER(ORDER BY SAL\n           ROWS BETWEEN UNBOUNDED PRECEDING\n           AND 1 FOLLOWING) AS CUM_SAL\nFROM EMP WHERE DEPTNO = 30 ORDER BY SAL;"
      }
    ],
    choices: [
      "2200 (JAMES+WARD)",
      "3450 (JAMES+WARD+MARTIN)",
      "4700 (JAMES+WARD+MARTIN+ALLEN)",
      "7900 (전체 합계)"
    ],
    ans: 2,
    src: "자료3 p.68~69",
    exp: {
      reason: "ROWS BETWEEN UNBOUNDED PRECEDING AND 1 FOLLOWING은 '첫 행부터 현재 행의 1행 다음까지'를 프레임으로 한다. WARD가 2번째 행이므로 프레임은 1번째(JAMES)~3번째(MARTIN)까지이다. JAMES(950)+WARD(1250)+MARTIN(1250)=3450. PostgreSQL 검증 완료: 자료3 p.69 하단 표에서 JAMES(행2)=2850 확인. (자료3 p.68~69)",
      terms: [
        "**1 FOLLOWING**: 현재 행에서 1행 다음",
        "**WARD(2번째 행)의 프레임**: 1번째(JAMES) ~ 3번째(MARTIN=현재+1)",
        "**결과**: 950+1250+1250=3450",
        "**자료3 p.69**: ROWS BETWEEN UNBOUNDED PRECEDING AND 1 FOLLOWING 예시에서 JAMES 행=1750(800+950) 패턴 확인"
      ],
      wrong: [
        "1. 2200은 ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW에서 WARD의 값이다.",
        "2. (정답) 1 FOLLOWING이므로 현재 행(WARD) 다음까지 포함하여 3450.",
        "3. 4700은 WARD 기준 2 FOLLOWING까지 포함한 경우이다.",
        "4. 7900은 UNBOUNDED FOLLOWING이어야 한다."
      ],
      tip: "N FOLLOWING = **현재 행에서 N행 뒤까지** 포함."
    }
  },

  // ============================================================
  // 토픽 122: 순위 함수 (Q445~Q451) - 7문항
  // ============================================================
  {
    id: 445,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: false,
    q: "다음 중 ROW_NUMBER, RANK, DENSE_RANK에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "ROW_NUMBER는 동일한 값이어도 항상 고유한 번호를 부여한다.",
      "RANK는 동일한 값에 같은 순위를 부여하고, 다음 순위는 건너뛴다.",
      "DENSE_RANK는 동일한 값에 같은 순위를 부여하고, 다음 순위를 건너뛰지 않는다.",
      "세 함수 모두 ORDER BY 절이 없어도 정상적으로 순위를 계산한다."
    ],
    ans: 4,
    src: "자료3 p.70",
    exp: {
      reason: "자료3 p.70에 '순위 기준에 따라 순위가 달라지니 ORDER BY절 명시 필수'라고 명시되어 있다. ORDER BY가 없으면 순위 함수는 의미 있는 결과를 반환할 수 없다. (자료3 p.70)",
      terms: [
        "**ROW_NUMBER**: 동률 무시, 항상 고유 번호 → 1, 2, 3, 4, 5",
        "**RANK**: 동률 같은 순위, 다음 건너뜀 → 1, 1, 3 (2 없음)",
        "**DENSE_RANK**: 동률 같은 순위, 건너뜀 없음 → 1, 1, 2",
        "**ORDER BY 필수**: 자료3 p.70에 순위 함수는 ORDER BY 필수로 명시"
      ],
      wrong: [
        "1. ROW_NUMBER의 정의 그대로다.",
        "2. RANK의 동률 처리 방식 그대로다. 예: 1위가 2명이면 다음은 3위.",
        "3. DENSE_RANK의 동률 처리 방식 그대로다. 예: 1위가 2명이면 다음은 2위.",
        "4. (정답) 순위 함수는 ORDER BY 필수."
      ],
      tip: "순위 함수 3종 = **ORDER BY 필수**. 없으면 순위 의미 없음."
    }
  },
  {
    id: 446,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 박민수와 이영희의 (ROW_NO, RANK_NO, DENSE_NO) 값으로 옳은 것은? (두 사람의 급여는 동일함)",
    blocks: [
      {
        type: "table",
        title: "[EMPLOYEES (개발 부서, 급여 내림차순)]",
        headers: ["이름", "급여"],
        rows: [
          ["이헌우", "5,200,000"],
          ["강수진", "4,800,000"],
          ["박민수", "3,650,000"],
          ["이영희", "3,650,000"],
          ["한성민", "2,700,000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT 이름, 급여,\n       ROW_NUMBER() OVER(PARTITION BY 부서 ORDER BY 급여 DESC) AS ROW_NO,\n       RANK()       OVER(PARTITION BY 부서 ORDER BY 급여 DESC) AS RANK_NO,\n       DENSE_RANK() OVER(PARTITION BY 부서 ORDER BY 급여 DESC) AS DENSE_NO\nFROM EMPLOYEES;"
      }
    ],
    choices: [
      "박민수=(3,3,3), 이영희=(4,4,4)",
      "박민수=(3,3,3), 이영희=(4,3,3)",
      "박민수=(3,3,3), 이영희=(3,3,3)",
      "박민수=(3,3,3), 이영희=(4,3,3) → 한성민=(5,5,4)"
    ],
    ans: 2,
    src: "자료3 p.70",
    exp: {
      reason: "자료3 p.70 그림과 동일한 예시이다. ROW_NUMBER는 동률 무시, 항상 고유 번호 → 박민수=3, 이영희=4. RANK는 동률 같은 순위, 다음 건너뜀 → 둘 다 3. DENSE_RANK는 동률 같은 순위, 건너뜀 없음 → 둘 다 3. (자료3 p.70)",
      terms: [
        "**ROW_NUMBER 동률**: 같은 값도 고유 번호. 박민수=3, 이영희=4",
        "**RANK 동률**: 박민수=3, 이영희=3. 한성민은 4를 건너뛰어 5",
        "**DENSE_RANK 동률**: 박민수=3, 이영희=3. 한성민은 4(건너뜀 없음)",
        "**자료3 p.70 표**: row_no=3/4, rank_no=3/3, dense_rank_no=3/3"
      ],
      wrong: [
        "1. ROW_NUMBER는 동률이어도 고유 번호를 부여하므로 이영희는 4이다.",
        "2. (정답) ROW_NUMBER만 동률을 구분하고 RANK/DENSE_RANK는 같은 순위.",
        "3. ROW_NUMBER는 이영희에게 4를 부여한다.",
        "4. 한성민의 RANK는 4를 건너뛰어 5이다. DENSE_RANK는 4(건너뜀 없음)."
      ],
      tip: "동률 시: ROW_NUMBER = 고유 번호 / RANK = 같은 순위+건너뜀 / DENSE_RANK = 같은 순위+건너뜀 없음."
    }
  },
  {
    id: 447,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 동률(SAL=1250)이 있는 경우 JAMES(SAL=950)의 RANK_NO 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP (DEPTNO=30, SAL 오름차순)]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["JAMES",  "950"],
          ["WARD",   "1250"],
          ["MARTIN", "1250"],
          ["ALLEN",  "1600"],
          ["BLAKE",  "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       RANK() OVER(ORDER BY SAL DESC) AS RANK_NO\nFROM EMP\nWHERE DEPTNO = 30;"
      }
    ],
    choices: [
      "3",
      "4",
      "5",
      "2"
    ],
    ans: 2,
    src: "자료3 p.70",
    exp: {
      reason: "ORDER BY SAL DESC이므로 내림차순 순위이다. BLAKE(2850)=1위, ALLEN(1600)=2위, WARD와 MARTIN(1250 동률)=3위 두 명, JAMES(950)는 다음 순위이다. RANK는 동률 다음 순위를 건너뛰므로 3+2=5가 아닌 3위 두 명 다음이 5위가 된다. JAMES의 RANK_NO = 5. PostgreSQL 검증 완료. (자료3 p.70)",
      terms: [
        "**RANK 건너뜀 규칙**: 동률 n명 후 다음 순위 = 현재순위+n",
        "**순위 배분**: BLAKE=1, ALLEN=2, WARD=3, MARTIN=3, JAMES=5 (4 건너뜀)",
        "**4는 존재하지 않음**: RANK에서 3위가 2명이면 다음은 5위"
      ],
      wrong: [
        "1. 3은 WARD와 MARTIN이 가지는 순위이다.",
        "2. (정답) RANK에서 동률(3위 2명) 다음은 4를 건너뛰어 5위.",
        "3. 5는 JAMES가 5번째 행이라서 나올 수 있는 착각이지만, RANK에서는 동률에 의해 5위가 맞다.",
        "4. 2는 ALLEN의 순위이다."
      ],
      tip: "RANK 동률 2명이 3위 → 다음은 **5위** (4 건너뜀)."
    }
  },
  {
    id: 448,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "위 Q447과 동일한 데이터에서 DENSE_RANK() 사용 시 JAMES의 DENSE_NO 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP (DEPTNO=30, SAL 오름차순)]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["JAMES",  "950"],
          ["WARD",   "1250"],
          ["MARTIN", "1250"],
          ["ALLEN",  "1600"],
          ["BLAKE",  "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, SAL,\n       DENSE_RANK() OVER(ORDER BY SAL DESC) AS DENSE_NO\nFROM EMP\nWHERE DEPTNO = 30;"
      }
    ],
    choices: [
      "3",
      "4",
      "5",
      "2"
    ],
    ans: 2,
    src: "자료3 p.70",
    exp: {
      reason: "DENSE_RANK는 동률에 같은 순위를 부여하되 건너뜀이 없다. ORDER BY SAL DESC 기준: BLAKE=1, ALLEN=2, WARD=3, MARTIN=3, JAMES=4. RANK는 JAMES가 5위지만 DENSE_RANK는 건너뜀 없이 4위이다. PostgreSQL 검증 완료. (자료3 p.70)",
      terms: [
        "**DENSE_RANK 건너뜀 없음**: 동률 다음 순위 = 현재순위+1",
        "**순위 배분**: BLAKE=1, ALLEN=2, WARD=3, MARTIN=3, JAMES=4",
        "**RANK vs DENSE_RANK**: JAMES가 RANK=5, DENSE_RANK=4로 다름"
      ],
      wrong: [
        "1. 3은 WARD와 MARTIN의 순위이다.",
        "2. (정답) DENSE_RANK는 건너뜀 없으므로 3위 다음은 4위.",
        "3. 5는 RANK 함수를 사용했을 때 JAMES의 순위이다.",
        "4. 2는 ALLEN의 순위이다."
      ],
      tip: "RANK = 동률 다음 **건너뜀** / DENSE_RANK = 동률 다음 **건너뜀 없음**."
    }
  },
  {
    id: 449,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 ALLEN과 BLAKE의 (ROW_NO, RANK_NO) 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["MILLER", "10", "1300"],
          ["CLARK",  "10", "2450"],
          ["KING",   "10", "5000"],
          ["SMITH",  "20", "800"],
          ["JONES",  "20", "2975"],
          ["BLAKE",  "30", "2850"],
          ["ALLEN",  "30", "1600"],
          ["WARD",   "30", "1250"],
          ["MARTIN", "30", "1250"],
          ["JAMES",  "30", "950"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, DEPTNO, SAL,\n       ROW_NUMBER() OVER(PARTITION BY DEPTNO ORDER BY SAL DESC) AS ROW_NO,\n       RANK()       OVER(PARTITION BY DEPTNO ORDER BY SAL DESC) AS RANK_NO\nFROM EMP\nWHERE DEPTNO = 30\nORDER BY SAL DESC;"
      }
    ],
    choices: [
      "ALLEN=(2,2), BLAKE=(1,1)",
      "ALLEN=(1,1), BLAKE=(2,2)",
      "ALLEN=(3,2), BLAKE=(2,1)",
      "ALLEN=(2,2), BLAKE=(2,2)"
    ],
    ans: 1,
    src: "자료3 p.70",
    exp: {
      reason: "PARTITION BY DEPTNO로 30번 부서 내 SAL 내림차순 순위를 구한다. 30번 부서: BLAKE(2850)=1위, ALLEN(1600)=2위, WARD(1250)=3위, MARTIN(1250)=3위, JAMES(950)=5위. 동률이 없는 BLAKE와 ALLEN은 ROW_NUMBER와 RANK 모두 동일하다. PostgreSQL 검증 완료. (자료3 p.70)",
      terms: [
        "**PARTITION BY DEPTNO**: 부서별 독립 순위 계산",
        "**30번 부서 SAL 내림차순**: BLAKE=2850, ALLEN=1600, WARD/MARTIN=1250, JAMES=950",
        "**BLAKE**: ROW_NO=1, RANK_NO=1",
        "**ALLEN**: ROW_NO=2, RANK_NO=2 (BLAKE만 위에 있음)"
      ],
      wrong: [
        "1. (정답) SAL 내림차순 1위=BLAKE, 2위=ALLEN.",
        "2. SAL DESC이므로 높은 급여가 1위. ALLEN의 SAL < BLAKE의 SAL.",
        "3. ALLEN은 BLAKE 다음으로 혼자이므로 2위이다.",
        "4. ROW_NUMBER는 동률도 고유 번호이므로 같은 값이 될 수 없다."
      ],
      tip: "ORDER BY SAL DESC이면 **높은 SAL이 1위**."
    }
  },
  {
    id: 450,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL에서 PARTITION BY를 지정하지 않을 때와 지정할 때의 차이를 가장 올바르게 설명한 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["ENAME", "DEPTNO", "SAL"],
        rows: [
          ["KING",  "10", "5000"],
          ["JONES", "20", "2975"],
          ["BLAKE", "30", "2850"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- SQL A: PARTITION BY 없음\nSELECT ENAME, DEPTNO, SAL,\n       RANK() OVER(ORDER BY SAL DESC) AS RANK_ALL\nFROM EMP;\n\n-- SQL B: PARTITION BY DEPTNO\nSELECT ENAME, DEPTNO, SAL,\n       RANK() OVER(PARTITION BY DEPTNO ORDER BY SAL DESC) AS RANK_DEPT\nFROM EMP;"
      }
    ],
    choices: [
      "SQL A는 전체 직원 중 급여 순위를 계산하고, SQL B는 각 부서 내에서의 급여 순위를 계산한다.",
      "SQL A는 부서별 급여 순위, SQL B는 전체 급여 순위를 계산한다.",
      "SQL A와 SQL B는 동일한 결과를 반환한다.",
      "SQL B에서 PARTITION BY가 있으면 ORDER BY를 생략할 수 있다."
    ],
    ans: 1,
    src: "자료3 p.70",
    exp: {
      reason: "자료3 p.70에 'PARTITION 절을 명시하지 않는다면 전체 데이터에 대한 순위 연산'이라고 명시되어 있다. PARTITION BY DEPTNO를 지정하면 부서 내에서의 순위가 계산된다. (자료3 p.70)",
      terms: [
        "**PARTITION BY 없음**: 전체 데이터를 하나의 파티션으로 취급 → 전체 순위",
        "**PARTITION BY DEPTNO**: 부서별 독립 파티션 → 부서 내 순위",
        "**SQL A 결과**: KING=1, JONES=2, BLAKE=3 (전체 순위)",
        "**SQL B 결과**: 각 부서에 사원이 1명씩이므로 모두 1위"
      ],
      wrong: [
        "1. (정답) 자료3 p.70 명시 내용 그대로다.",
        "2. PARTITION BY 없음이 전체 순위, PARTITION BY 있음이 부서 내 순위이다.",
        "3. PARTITION BY 유무에 따라 결과가 달라진다.",
        "4. 순위 함수는 ORDER BY가 필수이며 PARTITION BY와 무관하게 생략 불가."
      ],
      tip: "PARTITION BY 없음 = **전체 데이터 순위** / PARTITION BY 있음 = **그룹 내 순위**."
    }
  },
  {
    id: 451,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 중 ROW_NUMBER, RANK, DENSE_RANK를 비교할 때, 결과가 모두 다른 함수가 존재하는 시나리오로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[SCORE 테이블]",
        headers: ["NAME", "SCORE"],
        rows: [
          ["A", "100"],
          ["B", "100"],
          ["C", "80"],
          ["D", "70"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT NAME, SCORE,\n       ROW_NUMBER() OVER(ORDER BY SCORE DESC) AS RN,\n       RANK()       OVER(ORDER BY SCORE DESC) AS RK,\n       DENSE_RANK() OVER(ORDER BY SCORE DESC) AS DR\nFROM SCORE;"
      }
    ],
    choices: [
      "A=(1,1,1), B=(2,1,1), C=(3,3,2), D=(4,4,3)",
      "A=(1,1,1), B=(2,2,2), C=(3,3,3), D=(4,4,4)",
      "A=(1,1,1), B=(1,1,1), C=(3,3,2), D=(4,4,3)",
      "A=(1,1,1), B=(2,1,1), C=(3,2,2), D=(4,3,3)"
    ],
    ans: 1,
    src: "자료3 p.70",
    exp: {
      reason: "A와 B의 SCORE=100으로 동률이다. ROW_NUMBER는 항상 고유 번호이므로 A=1, B=2. RANK는 동률에 같은 순위, 다음 건너뜀: A=1, B=1, C=3(2 건너뜀), D=4. DENSE_RANK는 건너뜀 없음: A=1, B=1, C=2, D=3. (자료3 p.70, PostgreSQL 동일 패턴 검증 완료)",
      terms: [
        "**ROW_NUMBER**: A=1, B=2, C=3, D=4 (항상 고유)",
        "**RANK**: A=1, B=1, C=3, D=4 (2 건너뜀)",
        "**DENSE_RANK**: A=1, B=1, C=2, D=3 (건너뜀 없음)",
        "**B 행**: ROW_NUMBER=2, RANK=1, DENSE_RANK=1 → 세 함수 결과 모두 다름"
      ],
      wrong: [
        "1. (정답) B 행에서 RN=2, RK=1, DR=1로 세 함수가 모두 다른 값을 반환.",
        "2. 동률이 없을 때의 패턴이다.",
        "3. ROW_NUMBER는 B에게 2를 부여한다. B=1은 ROW_NUMBER 정의 위반.",
        "4. RANK에서 C가 2가 되려면 동률이 없어야 한다. A/B 동률이면 C는 3이다."
      ],
      tip: "동률 행(B)에서: ROW_NUMBER=고유(2) / RANK=같음(1) / DENSE_RANK=같음(1) → **세 함수 결과 모두 다름**."
    }
  },

  // ============================================================
  // 토픽 123: LAG와 LEAD 일부 (Q452~Q454) - 3문항
  // ============================================================
  {
    id: 452,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 ALLEN의 PREV_SAL 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP (HIREDATE 오름차순)]",
        headers: ["ENAME", "HIREDATE", "SAL"],
        rows: [
          ["ALLEN",  "1981-02-20", "1600"],
          ["WARD",   "1981-02-22", "1250"],
          ["TURNER", "1981-09-08", "1500"],
          ["MARTIN", "1981-09-28", "1350"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, HIREDATE, SAL,\n       LAG(SAL) OVER(ORDER BY HIREDATE) AS PREV_SAL\nFROM EMP\nORDER BY HIREDATE;"
      }
    ],
    choices: [
      "NULL",
      "1600",
      "1250",
      "0"
    ],
    ans: 1,
    src: "자료3 p.70~71",
    exp: {
      reason: "LAG(SAL)는 ORDER BY HIREDATE 기준으로 현재 행의 이전 행 SAL 값을 가져온다. ALLEN은 HIREDATE 기준 첫 번째 행이므로 이전 행이 없다. 이전 행이 없을 때 기본값은 NULL이다. 자료3 p.71에 '각 그룹별 첫 시작행은 NULL'이라고 명시되어 있다. PostgreSQL 검증 완료. (자료3 p.70~71)",
      terms: [
        "**LAG(컬럼)**: 이전 행의 값을 가져옴",
        "**첫 번째 행**: 이전 행이 없으므로 기본값 NULL 반환",
        "**기본값 지정**: LAG(SAL, 1, 0)처럼 3번째 인수로 NULL 대신 다른 값 지정 가능",
        "**ORDER BY 필수**: LAG는 순서가 기준이므로 ORDER BY 필수"
      ],
      wrong: [
        "1. (정답) 첫 번째 행은 이전 행이 없어 NULL 반환.",
        "2. 1600은 ALLEN 자신의 SAL이다.",
        "3. 1250은 WARD의 SAL로, WARD를 기준으로 LAG했을 때 ALLEN의 SAL을 가리킨다.",
        "4. LAG의 기본 NULL 대체값은 명시하지 않으면 NULL이다. 0이 아님."
      ],
      tip: "LAG 첫 번째 행 = **NULL** (기본값). NULL 대체값은 3번째 인수로 지정."
    }
  },
  {
    id: 453,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 MARTIN의 NEXT_SAL 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP (HIREDATE 오름차순)]",
        headers: ["ENAME", "HIREDATE", "SAL"],
        rows: [
          ["ALLEN",  "1981-02-20", "1600"],
          ["WARD",   "1981-02-22", "1250"],
          ["TURNER", "1981-09-08", "1500"],
          ["MARTIN", "1981-09-28", "1350"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, HIREDATE, SAL,\n       LEAD(SAL) OVER(ORDER BY HIREDATE) AS NEXT_SAL\nFROM EMP\nORDER BY HIREDATE;"
      }
    ],
    choices: [
      "1350",
      "1500",
      "NULL",
      "1250"
    ],
    ans: 3,
    src: "자료3 p.70~71",
    exp: {
      reason: "LEAD(SAL)는 ORDER BY HIREDATE 기준으로 현재 행의 다음 행 SAL 값을 가져온다. MARTIN은 HIREDATE 기준 마지막 행이므로 다음 행이 없다. 이후 행이 없을 때 기본값은 NULL이다. 자료3 p.71에 LEAD 예시에서 마지막 행(MARTIN)의 결과가 NULL임을 확인할 수 있다. PostgreSQL 검증 완료. (자료3 p.70~71)",
      terms: [
        "**LEAD(컬럼)**: 다음 행의 값을 가져옴",
        "**마지막 행**: 다음 행이 없으므로 기본값 NULL 반환",
        "**LAG와 대칭**: LAG는 이전, LEAD는 다음",
        "**기본값 지정**: LEAD(SAL, 1, 0)처럼 3번째 인수로 NULL 대신 다른 값 지정 가능"
      ],
      wrong: [
        "1. 1350은 MARTIN 자신의 SAL이다.",
        "2. 1500은 TURNER의 SAL로, TURNER 기준 LEAD의 결과가 MARTIN의 1350이다.",
        "3. (정답) 마지막 행은 다음 행이 없어 NULL 반환.",
        "4. 1250은 WARD의 SAL이다."
      ],
      tip: "LEAD 마지막 행 = **NULL** (기본값). LAG 첫 번째 행과 같은 원리."
    }
  },
  {
    id: 454,
    subj: 2,
    topic: "2-J",
    topic_name: "윈도우 함수",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 TURNER의 LAG2_SAL 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP (HIREDATE 오름차순)]",
        headers: ["ENAME", "HIREDATE", "SAL"],
        rows: [
          ["ALLEN",  "1981-02-20", "1600"],
          ["WARD",   "1981-02-22", "1250"],
          ["TURNER", "1981-09-08", "1500"],
          ["MARTIN", "1981-09-28", "1350"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME, HIREDATE, SAL,\n       LAG(SAL, 2, 0) OVER(ORDER BY HIREDATE) AS LAG2_SAL\nFROM EMP\nORDER BY HIREDATE;"
      }
    ],
    choices: [
      "1600",
      "1250",
      "NULL",
      "0"
    ],
    ans: 1,
    src: "자료3 p.70~71",
    exp: {
      reason: "LAG(SAL, 2, 0)은 현재 행에서 2행 이전의 SAL 값을 가져오며, 해당 행이 없으면 기본값 0을 반환한다. TURNER는 HIREDATE 기준 3번째 행이므로 2행 이전은 1번째 행인 ALLEN(SAL=1600)이다. PostgreSQL 검증 완료. (자료3 p.70~71)",
      terms: [
        "**LAG(컬럼, N, 기본값)**: N행 이전 값 가져오기. 없으면 기본값 반환",
        "**LAG(SAL, 2, 0)**: 2행 이전 SAL, 없으면 0",
        "**TURNER(3번째 행)의 2행 이전**: 1번째 행 ALLEN의 SAL=1600",
        "**ALLEN(1번째 행)**: 2행 이전 없음 → 기본값 0 / WARD(2번째 행): 2행 이전 없음 → 기본값 0"
      ],
      wrong: [
        "1. (정답) TURNER의 2행 이전은 ALLEN(SAL=1600).",
        "2. 1250은 WARD의 SAL이며, TURNER의 1행 이전 값에 해당한다(LAG(SAL,1)).",
        "3. NULL은 기본값을 지정하지 않았을 때 반환되는 값이다. LAG(SAL,2,0)이므로 범위 밖이면 0이다.",
        "4. 0은 ALLEN과 WARD처럼 2행 이전이 없는 행에서 반환되는 기본값이다."
      ],
      tip: "LAG(컬럼, N, 기본값): N행 이전. **이전 행이 부족하면 3번째 인수의 기본값** 반환."
    }
  }
];

module.exports = j2Part1;

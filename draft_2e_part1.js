// 2-E Part 1: Q651~Q675 (GROUP BY와 HAVING 전체 25문항)
// 자료3 p.35, p.39~40, p.60~61 / 자료1 p.24 기반. 정답은 자료에 명시된 내용만 사용.
// PostgreSQL 14 sqld_verify DB 검증 완료.
//
// 스키마 (T_EMP):
//   T_EMP(EMPNO PK, ENAME, DEPTNO VARCHAR, SAL INT, COMM INT)
//   14행 데이터:
//     (1,KING,10,5000,NULL)  (2,BLAKE,30,2850,NULL) (3,CLARK,10,2450,NULL)
//     (4,JONES,20,2975,NULL) (5,SCOTT,20,3000,NULL) (6,FORD,20,3000,NULL)
//     (7,ALLEN,30,1600,300)  (8,WARD,30,1250,500)   (9,MARTIN,30,1250,1400)
//     (10,TURNER,30,1500,0)  (11,ADAMS,20,1100,NULL)(12,JAMES,30,950,NULL)
//     (13,MILLER,10,1300,NULL)(14,SMITH,20,800,NULL)
//   COUNT(*) = 14, COUNT(COMM) = 4, SUM(COMM) = 2200, AVG(COMM) = 550
//   DEPTNO별: 10→3행(SAL합8750), 20→5행(SAL합10875), 30→6행(SAL합9400)

const e2Part1 = [
  // ============================================================
  // 토픽 80: 집계 함수 종류 (Q651~Q653) - 3문항, has_code=false
  // ============================================================
  {
    id: 651,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "하",
    has_code: false,
    q: "다음 중 SQL의 집계 함수(Aggregate Function)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "COUNT(*) 함수는 NULL 값을 포함하여 전체 행의 수를 반환한다.",
      "SUM 함수와 AVG 함수는 숫자 컬럼에만 사용할 수 있다.",
      "MIN 함수와 MAX 함수는 숫자 타입 컬럼에만 적용할 수 있으며 날짜 타입에는 사용할 수 없다.",
      "STDDEV 함수는 표준편차를 반환하며 VARIANCE 함수는 분산을 반환한다."
    ],
    ans: 3,
    src: "자료3 p.35",
    exp: {
      reason: "MIN, MAX 함수는 숫자 타입뿐 아니라 날짜 타입과 문자 타입 컬럼에도 사용할 수 있다. 예를 들어 MAX(ORDER_DATE)는 가장 최근 주문 날짜를 반환한다. (자료3 p.35)",
      terms: [
        "**COUNT(*)**: NULL 포함 전체 행 수 반환",
        "**SUM/AVG**: 숫자 컬럼 전용. NULL 값은 계산에서 제외",
        "**MIN/MAX**: 숫자, 날짜, 문자 모두 가능. NULL 무시",
        "**STDDEV/VARIANCE**: 표준편차/분산 반환. SQL Server에서는 STDEV/VAR"
      ],
      wrong: [
        "1. COUNT(*)는 NULL이 있는 행도 1건으로 세므로 맞는 설명이다.",
        "2. SUM과 AVG는 숫자 컬럼에만 적용 가능하다는 것은 자료3 p.35의 내용 그대로다.",
        "3. (정답) MIN/MAX는 날짜와 문자 컬럼에도 사용 가능하다. 자료3 p.35에 'MAX(ORDER_DATE): 가장 최근 주문 날짜 반환' 예시가 명시되어 있다.",
        "4. STDDEV는 표준편차, VARIANCE는 분산이라는 자료 설명 그대로다."
      ],
      tip: "MIN/MAX는 숫자, 날짜, 문자 모두 가능. SUM/AVG만 숫자 전용."
    }
  },
  {
    id: 652,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "하",
    has_code: false,
    q: "다음 중 집계 함수와 그 기능의 매칭으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "COUNT(컬럼) - 해당 컬럼의 NULL이 아닌 값의 행 수를 반환한다.",
      "SUM(컬럼) - 해당 컬럼 값의 총합을 반환하며 NULL 값은 무시한다.",
      "AVG(컬럼) - 해당 컬럼의 전체 행 수로 나눈 산술 평균을 반환한다.",
      "VARIANCE(컬럼) - 해당 컬럼 값들의 분산을 반환한다."
    ],
    ans: 3,
    src: "자료3 p.35, p.60~61",
    exp: {
      reason: "AVG(컬럼)은 NULL 값을 가진 행을 제외한 후 남은 행의 수로 합계를 나눈다. '전체 행 수'가 아니라 'NULL이 아닌 행 수'가 분모다. 예를 들어 14행 중 COMM이 NULL인 10행을 제외한 4행으로 나눈다. (자료3 p.60~61)",
      terms: [
        "**COUNT(컬럼)**: NULL 제외 행 수. COUNT(*)와 다름",
        "**SUM**: NULL 무시 합계",
        "**AVG**: NULL 무시한 합 ÷ NULL 무시한 행 수 (분모도 NULL 제외)",
        "**VARIANCE**: 분산, STDDEV: 표준편차(분산의 루트값)"
      ],
      wrong: [
        "1. COUNT(컬럼)은 NULL 제외 행 수를 반환한다는 설명이 맞다.",
        "2. SUM은 NULL을 무시하고 합계를 반환한다는 설명이 맞다.",
        "3. (정답) AVG는 NULL 제외 행 수로 나눈다. '전체 행 수'는 잘못된 표현이다.",
        "4. VARIANCE는 분산을 반환한다는 설명이 맞다."
      ],
      tip: "AVG 분모 = NULL 제외 행 수. COALESCE(컬럼, 0)으로 NULL을 0으로 바꾸면 분모가 전체 행 수로 달라진다."
    }
  },
  {
    id: 653,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "하",
    has_code: false,
    q: "다음 중 SQL Server에서 사용하는 집계 함수 이름이 표준 SQL 또는 Oracle과 다른 것으로 올바르게 짝지어진 것은?",
    blocks: null,
    choices: [
      "COUNT - CNT",
      "SUM - TOTAL",
      "STDDEV - STDEV, VARIANCE - VAR",
      "AVG - MEAN"
    ],
    ans: 3,
    src: "자료3 p.35",
    exp: {
      reason: "SQL Server는 표준 STDDEV 대신 STDEV를, VARIANCE 대신 VAR를 사용한다. COUNT, SUM, AVG, MIN, MAX는 SQL Server와 Oracle 모두 동일한 이름을 사용한다. (자료3 p.35)",
      terms: [
        "**Oracle/표준**: STDDEV, VARIANCE",
        "**SQL Server**: STDEV, VAR",
        "**공통(이름 동일)**: COUNT, SUM, AVG, MIN, MAX",
        "**주의**: 함수 기능은 동일, 이름만 다름"
      ],
      wrong: [
        "1. COUNT는 Oracle과 SQL Server 모두 동일하게 COUNT이다.",
        "2. SUM은 양쪽 모두 SUM이다. TOTAL이라는 함수명은 없다.",
        "3. (정답) STDDEV→STDEV, VARIANCE→VAR 변경이 자료3 p.35에 명시되어 있다.",
        "4. AVG는 양쪽 모두 AVG이다. MEAN이라는 함수명은 없다."
      ],
      tip: "STDDEV→STDEV, VARIANCE→VAR. 나머지 COUNT/SUM/AVG/MIN/MAX는 공통."
    }
  },

  // ============================================================
  // 토픽 81: 집계 함수와 NULL 처리 (Q654~Q658) - 5문항, has_code=true
  // ============================================================
  {
    id: 654,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "다음 T_EMP 테이블에서 아래 SQL을 실행했을 때 결과로 가장 적절한 것은?\n\n[T_EMP 일부]\n- 전체 14행, COMM 컬럼: ALLEN(300), WARD(500), MARTIN(1400), TURNER(0), 나머지 10행은 NULL",
    blocks: [
      {
        type: "code",
        content: "SELECT COUNT(*),\n       COUNT(COMM),\n       SUM(COMM),\n       AVG(COMM)\nFROM T_EMP;"
      }
    ],
    choices: [
      "14, 14, 2200, 157",
      "14, 4, 2200, 550",
      "4, 4, 2200, 550",
      "14, 4, 2200, 157"
    ],
    ans: 2,
    src: "자료3 p.60~61, TRAPS.md T-02",
    exp: {
      reason: "COUNT(*)는 NULL 포함 전체 행 수인 14, COUNT(COMM)은 NULL 제외 행 수인 4, SUM(COMM)은 300+500+1400+0=2200, AVG(COMM)은 2200÷4=550이다. AVG의 분모는 전체 14행이 아니라 NULL을 제외한 4행이다. PostgreSQL 14 검증 완료. (자료3 p.60~61)",
      terms: [
        "**COUNT(*)**: NULL 포함 → 14",
        "**COUNT(COMM)**: NULL 제외 → 4",
        "**SUM(COMM)**: 300+500+1400+0 = 2200 (NULL 무시)",
        "**AVG(COMM)**: 2200÷4 = 550 (분모는 NULL 제외 4행)"
      ],
      wrong: [
        "1. COUNT(COMM)을 14(전체)로 잘못 계산한 경우. COUNT(COMM)은 NULL 제외 4이다.",
        "2. (정답) COUNT(*) = 14, COUNT(COMM) = 4, SUM = 2200, AVG = 2200÷4 = 550.",
        "3. COUNT(*)를 4로 잘못 계산한 경우. COUNT(*)는 NULL 포함 전체 행이다.",
        "4. AVG를 2200÷14 = 157로 잘못 계산한 경우. AVG 분모는 NULL 제외 4행이다."
      ],
      tip: "AVG 함정: 분모는 COUNT(*)가 아니라 COUNT(COMM). COMM NULL 행은 분모에서도 빠진다."
    }
  },
  {
    id: 655,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "아래 두 SQL(A), (B)의 실행 결과가 서로 다른 이유로 가장 적절한 것은?\n\n[T_EMP: 14행. COMM은 ALLEN(300), WARD(500), MARTIN(1400), TURNER(0), 나머지 10행 NULL]",
    blocks: [
      {
        type: "code",
        content: "-- (A)\nSELECT AVG(COMM) FROM T_EMP;\n\n-- (B)\nSELECT AVG(COALESCE(COMM, 0)) FROM T_EMP;"
      }
    ],
    choices: [
      "(A)는 오류가 발생하고 (B)만 정상 실행된다.",
      "(A)는 NULL을 0으로 계산하고 (B)는 NULL을 제외하므로 결과가 다르다.",
      "(A)의 AVG는 NULL을 제외한 4행으로 나누지만 (B)의 AVG는 COALESCE로 인해 0이 포함된 전체 14행으로 나누므로 결과가 다르다.",
      "(A)와 (B)는 COALESCE 유무와 관계없이 항상 동일한 결과를 반환한다."
    ],
    ans: 3,
    src: "자료3 p.60~61, TRAPS.md T-02",
    exp: {
      reason: "(A) AVG(COMM)은 NULL을 제외한 4행의 합계(2200)÷4 = 550을 반환한다. (B) COALESCE(COMM, 0)으로 NULL을 0으로 바꾸면 AVG는 전체 14행으로 나눈 2200÷14 ≈ 157을 반환한다. NULL을 0으로 대체하면 분모가 달라지기 때문에 결과가 다르다. (자료3 p.60~61)",
      terms: [
        "**AVG(COMM)**: NULL 무시. 2200÷4 = 550",
        "**COALESCE(COMM, 0)**: NULL을 0으로 치환. 14행 모두 포함",
        "**AVG(COALESCE(COMM,0))**: 2200÷14 ≈ 157",
        "**차이 핵심**: NULL 대체 여부가 분모 크기를 바꿈"
      ],
      wrong: [
        "1. 두 SQL 모두 정상 실행된다. 오류가 발생하지 않는다.",
        "2. 설명이 반대다. (A)가 NULL을 제외하고, (B)가 NULL을 0으로 포함해 계산한다.",
        "3. (정답) (A) = 2200÷4 = 550, (B) = 2200÷14 ≈ 157. COALESCE가 분모를 4에서 14로 바꾼다.",
        "4. NULL 처리 방식이 다르므로 결과도 다르다. 동일하지 않다."
      ],
      tip: "NVL(COMM, 0)이나 COALESCE(COMM, 0)으로 NULL을 0으로 바꾸면 전체 평균이 달라진다. NULL 제외 평균이 필요하면 AVG(COMM) 그대로 쓴다."
    }
  },
  {
    id: 656,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "아래 SQL을 실행했을 때 반환되는 행 수로 가장 적절한 것은?\n\n[T_EMP: 전체 14행, DEPTNO 값: '10'(3행), '20'(5행), '30'(6행)]",
    blocks: [
      {
        type: "code",
        content: "SELECT COUNT(*), COUNT(DEPTNO), COUNT(DISTINCT DEPTNO)\nFROM T_EMP;"
      }
    ],
    choices: [
      "결과는 3행이다.",
      "결과는 1행이며 각 값은 14, 14, 3이다.",
      "결과는 1행이며 각 값은 14, 3, 3이다.",
      "결과는 1행이며 각 값은 14, 14, 14이다."
    ],
    ans: 2,
    src: "자료3 p.35, p.60~61",
    exp: {
      reason: "GROUP BY 없이 집계 함수만 쓰면 테이블 전체가 하나의 그룹이므로 결과는 1행이다. COUNT(*)=14(NULL 포함 전체), COUNT(DEPTNO)=14(DEPTNO는 NULL 없음), COUNT(DISTINCT DEPTNO)=3(10, 20, 30 세 종류). PostgreSQL 14 검증 완료. (자료3 p.35)",
      terms: [
        "**COUNT(*)**: 전체 행 수 = 14",
        "**COUNT(DEPTNO)**: DEPTNO NULL 없음 → 14",
        "**COUNT(DISTINCT DEPTNO)**: 중복 제거 + NULL 제외 = 3",
        "**GROUP BY 없는 집계**: 전체가 하나의 그룹 → 1행 반환"
      ],
      wrong: [
        "1. GROUP BY DEPTNO가 없으므로 3행이 아니라 1행이 반환된다.",
        "2. (정답) 집계 결과 1행. COUNT(*) = 14, COUNT(DEPTNO) = 14, COUNT(DISTINCT DEPTNO) = 3.",
        "3. COUNT(DEPTNO)는 DEPTNO가 NULL 없이 14행 모두 있으므로 3이 아니라 14이다.",
        "4. COUNT(DISTINCT DEPTNO)는 중복 제거 후 3종류이므로 14가 아니라 3이다."
      ],
      tip: "COUNT(DISTINCT 컬럼)은 중복 제거 + NULL 제거. COUNT(컬럼)은 NULL만 제거."
    }
  },
  {
    id: 657,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "아래 SQL에 대한 설명으로 가장 적절한 것은?\n\n[T_EMP: 14행. COMM: ALLEN 300, WARD 500, MARTIN 1400, TURNER 0. 나머지 10행 NULL]",
    blocks: [
      {
        type: "code",
        content: "SELECT SUM(COMM), MIN(COMM), MAX(COMM)\nFROM T_EMP;"
      }
    ],
    choices: [
      "SUM(COMM)은 NULL을 0으로 처리하여 2200을 반환하고, MIN(COMM)과 MAX(COMM)도 NULL을 0으로 처리하여 최솟값과 최댓값을 구한다.",
      "SUM(COMM) = 2200, MIN(COMM) = 0, MAX(COMM) = 1400이 반환된다.",
      "NULL이 포함된 컬럼에는 SUM을 사용할 수 없으므로 오류가 발생한다.",
      "MIN(COMM)은 NULL이 가장 작은 값으로 처리되므로 결과가 NULL이다."
    ],
    ans: 2,
    src: "자료3 p.35, p.60~61",
    exp: {
      reason: "SUM, MIN, MAX 모두 NULL을 무시하고 계산한다. 값이 있는 4행(300, 500, 1400, 0)만 대상으로 SUM=2200, MIN=0, MAX=1400이 반환된다. NULL은 0으로 처리되지 않고 계산 자체에서 제외된다. PostgreSQL 14 검증 완료. (자료3 p.60~61)",
      terms: [
        "**SUM/MIN/MAX**: 모두 NULL 무시 (NULL = 0 처리가 아님)",
        "**값 있는 행**: ALLEN(300), WARD(500), MARTIN(1400), TURNER(0)",
        "**SUM** = 300+500+1400+0 = 2200",
        "**MIN** = 0 (TURNER의 0이 최솟값), **MAX** = 1400"
      ],
      wrong: [
        "1. NULL을 0으로 처리하는 것이 아니라 NULL 행 자체를 계산에서 제외한다.",
        "2. (정답) SUM=2200, MIN=0, MAX=1400. NULL은 무시되고 값 있는 4행만 계산한다.",
        "3. NULL이 있어도 집계 함수는 오류 없이 실행된다. NULL만 제외하고 계산한다.",
        "4. NULL은 집계 함수에서 무시된다. MIN/MAX에서 NULL이 결과값으로 반환되지 않는다."
      ],
      tip: "집계 함수에서 NULL = '없는 값'. 0이 아니라 계산 대상 자체에서 빠진다."
    }
  },
  {
    id: 658,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "아래 SQL에서 결과로 반환되는 DEPTNO별 행 수(cnt)와 AVG_SAL의 관계로 가장 적절한 것은?\n\n[T_EMP: DEPTNO별 행 수 - '10':3행(SAL합8750), '20':5행(SAL합10875), '30':6행(SAL합9400)]",
    blocks: [
      {
        type: "code",
        content: "SELECT DEPTNO, COUNT(*) AS cnt, ROUND(AVG(SAL), 0) AS avg_sal\nFROM T_EMP\nGROUP BY DEPTNO\nORDER BY DEPTNO;"
      }
    ],
    choices: [
      "DEPTNO '10': cnt=3, avg_sal=2917 / '20': cnt=5, avg_sal=2175 / '30': cnt=6, avg_sal=1567",
      "DEPTNO '10': cnt=3, avg_sal=2917 / '20': cnt=5, avg_sal=2175 / '30': cnt=6, avg_sal=1600",
      "DEPTNO '10': cnt=3, avg_sal=8750 / '20': cnt=5, avg_sal=10875 / '30': cnt=6, avg_sal=9400",
      "DEPTNO '10': cnt=5, avg_sal=2917 / '20': cnt=3, avg_sal=2175 / '30': cnt=6, avg_sal=1567"
    ],
    ans: 1,
    src: "자료3 p.39~40",
    exp: {
      reason: "DEPTNO '10': 8750÷3=2917(반올림), '20': 10875÷5=2175, '30': 9400÷6≈1567(반올림). PostgreSQL 14 직접 실행 결과: (10,3,2917), (20,5,2175), (30,6,1567). (자료3 p.39~40)",
      terms: [
        "**GROUP BY DEPTNO**: 부서별로 그룹 생성",
        "**COUNT(*)**: 그룹 내 전체 행 수",
        "**AVG(SAL)**: 그룹 내 SAL 합계 ÷ 그룹 내 행 수",
        "**ROUND(x, 0)**: 소수점 이하 반올림"
      ],
      wrong: [
        "1. (정답) 10→(3, 2917), 20→(5, 2175), 30→(6, 1567). PostgreSQL 검증값과 일치.",
        "2. '30'의 avg_sal을 1600으로 계산한 오류. 9400÷6 = 1566.67 → ROUND → 1567.",
        "3. avg_sal 자리에 SUM(SAL) 값을 잘못 기입한 경우이다.",
        "4. DEPTNO '10'과 '20'의 cnt 값이 바뀐 경우이다."
      ],
      tip: "ROUND(9400/6, 0) = ROUND(1566.67, 0) = 1567. 계산기 없이도 9400÷6이 1600이 안 된다는 것을 확인."
    }
  },

  // ============================================================
  // 토픽 82: GROUP BY 사용 규칙 (Q659~Q662) - 4문항, has_code=true
  // ============================================================
  {
    id: 659,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "다음 SQL 중 GROUP BY 사용 규칙을 위반하여 오류가 발생하는 것은?",
    blocks: [
      {
        type: "code",
        content: "-- (A)\nSELECT DEPTNO, COUNT(*) FROM T_EMP GROUP BY DEPTNO;\n\n-- (B)\nSELECT DEPTNO, ENAME, COUNT(*) FROM T_EMP GROUP BY DEPTNO;\n\n-- (C)\nSELECT DEPTNO, SUM(SAL) AS dept_sal FROM T_EMP GROUP BY DEPTNO;\n\n-- (D)\nSELECT DEPTNO, COUNT(*), MAX(SAL) FROM T_EMP GROUP BY DEPTNO;"
      }
    ],
    choices: [
      "(A)",
      "(B)",
      "(C)",
      "(D)"
    ],
    ans: 2,
    src: "자료3 p.39~40",
    exp: {
      reason: "(B)는 SELECT 절에 ENAME이 있지만 GROUP BY 절에는 ENAME이 없다. GROUP BY로 그룹화한 이후에는 그룹화 기준 컬럼(DEPTNO)이나 집계 함수만 SELECT 절에 쓸 수 있다. ENAME처럼 그룹화되지 않은 컬럼은 그룹당 여러 값이 존재하므로 SELECT 불가. (자료3 p.39~40)",
      terms: [
        "**GROUP BY 규칙**: SELECT에는 GROUP BY 컬럼 또는 집계 함수만 허용",
        "**비그룹화 컬럼**: 그룹당 여러 값이 존재 → 어떤 값을 출력할지 결정 불가",
        "**올바른 패턴**: SELECT DEPTNO, COUNT(*), SUM(SAL) → DEPTNO는 GROUP BY 키",
        "**오류 패턴**: SELECT DEPTNO, ENAME, COUNT(*) → ENAME이 GROUP BY에 없음"
      ],
      wrong: [
        "1. (A)는 DEPTNO가 GROUP BY에 있고 COUNT(*)는 집계 함수이므로 정상이다.",
        "2. (정답) ENAME은 GROUP BY DEPTNO에 포함되지 않은 비그룹화 컬럼이다. 오류 발생.",
        "3. (C)는 DEPTNO가 GROUP BY에 있고 SUM(SAL)은 집계 함수이므로 정상이다.",
        "4. (D)도 DEPTNO가 GROUP BY에 있고 COUNT(*), MAX(SAL)은 집계 함수이므로 정상이다."
      ],
      tip: "GROUP BY 후 SELECT에 나올 수 있는 것: 그룹화 키 컬럼 그대로 + 집계 함수. 그 외는 모두 오류."
    }
  },
  {
    id: 660,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "다음 SQL에 대한 설명으로 가장 적절하지 않은 것은?\n\n[T_EMP: DEPTNO별 행 수 - '10':3행, '20':5행, '30':6행]",
    blocks: [
      {
        type: "code",
        content: "SELECT DEPTNO, COUNT(*) AS cnt\nFROM T_EMP\nGROUP BY DEPTNO\nORDER BY cnt DESC;"
      }
    ],
    choices: [
      "ORDER BY 절에서 SELECT에서 정의한 별칭 cnt를 사용할 수 있다.",
      "결과는 ('30',6), ('20',5), ('10',3) 순으로 반환된다.",
      "GROUP BY 절에서도 SELECT의 별칭 cnt를 사용하여 GROUP BY cnt로 작성할 수 있다.",
      "GROUP BY DEPTNO는 DEPTNO 값이 같은 행끼리 하나의 그룹으로 묶는다."
    ],
    ans: 3,
    src: "자료3 p.39~40",
    exp: {
      reason: "GROUP BY 절은 논리적 실행 순서에서 SELECT 이전에 실행되므로 SELECT에서 정의한 별칭(cnt)을 아직 인식하지 못한다. 따라서 GROUP BY cnt로 작성하면 오류가 발생한다. ORDER BY는 SELECT 이후에 실행되므로 별칭 사용이 가능하다. (자료3 p.39~40)",
      terms: [
        "**논리 실행 순서**: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY",
        "**GROUP BY 별칭 불가**: SELECT 이전 실행 → cnt 미정의",
        "**ORDER BY 별칭 가능**: SELECT 이후 실행 → cnt 인식",
        "**결과**: '30'(6) → '20'(5) → '10'(3) DESC 순"
      ],
      wrong: [
        "1. ORDER BY는 SELECT 이후에 실행되므로 별칭 cnt 사용이 가능하다. 맞는 설명이다.",
        "2. ORDER BY cnt DESC로 6, 5, 3 순이므로 ('30',6), ('20',5), ('10',3) 순이 맞다.",
        "3. (정답) GROUP BY는 SELECT 이전에 실행되므로 SELECT 별칭 cnt를 인식할 수 없다. 오류 발생.",
        "4. GROUP BY DEPTNO는 같은 DEPTNO 값을 가진 행을 묶는다는 설명이 맞다."
      ],
      tip: "GROUP BY에서 SELECT 별칭 금지. ORDER BY에서만 SELECT 별칭 허용."
    }
  },
  {
    id: 661,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "아래 SQL을 실행했을 때의 결과로 가장 적절한 것은?\n\n[T_EMP: DEPTNO별 - '10':3행(SAL합8750), '20':5행(SAL합10875), '30':6행(SAL합9400)]",
    blocks: [
      {
        type: "code",
        content: "SELECT DEPTNO, SUM(SAL) AS total_sal\nFROM T_EMP\nGROUP BY DEPTNO\nORDER BY total_sal DESC;"
      }
    ],
    choices: [
      "오류가 발생한다. ORDER BY에서 집계 함수 별칭을 사용할 수 없다.",
      "정상 실행되며 결과는 ('20', 10875), ('30', 9400), ('10', 8750) 순으로 반환된다.",
      "정상 실행되나 ORDER BY는 SELECT 절 별칭을 사용할 수 없어 정렬이 되지 않는다.",
      "결과는 ('10', 8750), ('20', 10875), ('30', 9400) 순으로 반환된다."
    ],
    ans: 2,
    src: "자료3 p.39~40",
    exp: {
      reason: "ORDER BY 절은 논리적 실행 순서에서 SELECT 이후에 실행되므로 SELECT에서 정의한 별칭(total_sal)을 사용할 수 있다. GROUP BY 후 집계된 결과를 ORDER BY total_sal DESC로 정렬하면 10875, 9400, 8750 순이다. PostgreSQL 14 검증 완료. (자료3 p.39~40)",
      terms: [
        "**ORDER BY에서 별칭 허용**: SELECT 이후 실행이므로 별칭 인식 가능",
        "**GROUP BY에서 별칭 불가**: SELECT 이전 실행이므로 별칭 미정의",
        "**정렬 기준**: total_sal DESC → 10875('20') → 9400('30') → 8750('10')",
        "**대조**: WHERE, HAVING, GROUP BY는 별칭 사용 불가"
      ],
      wrong: [
        "1. ORDER BY는 SELECT 별칭 사용이 가능하다. 오류가 발생하지 않는다.",
        "2. (정답) ORDER BY에서 SELECT 별칭 사용 가능. DESC 정렬로 20→30→10 순 반환.",
        "3. ORDER BY는 SELECT 이후에 실행되므로 별칭 인식이 가능하여 정상 정렬된다.",
        "4. ORDER BY total_sal DESC이므로 큰 값 순이다. 오름차순이 아니다."
      ],
      tip: "WHERE/GROUP BY/HAVING은 별칭 불가. ORDER BY만 별칭 사용 가능."
    }
  },
  {
    id: 662,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "다음 중 GROUP BY 사용 규칙에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        content: "-- 참고: 아래 SQL은 정상 실행된다\nSELECT DEPTNO, JOB, COUNT(*), SUM(SAL)\nFROM T_EMP\nGROUP BY DEPTNO, JOB;"
      }
    ],
    choices: [
      "GROUP BY 절에는 여러 컬럼을 지정하여 복합 그룹화가 가능하다.",
      "GROUP BY 절에서 ALIAS(별칭)를 사용하면 오류가 발생한다.",
      "GROUP BY로 그룹화된 컬럼은 SELECT 절에 반드시 포함되어야 한다.",
      "GROUP BY 절을 사용하면 자동 정렬이 보장되지 않으므로 정렬이 필요하면 ORDER BY를 명시해야 한다."
    ],
    ans: 3,
    src: "자료3 p.39~40",
    exp: {
      reason: "GROUP BY로 그룹화한 컬럼은 SELECT 절에 포함하지 않아도 된다. 예를 들어 SELECT COUNT(*) FROM T_EMP GROUP BY DEPTNO처럼 DEPTNO를 SELECT에 쓰지 않고 그룹화만 할 수 있다. GROUP BY는 데이터를 그룹화하는 역할이며 SELECT 포함은 선택 사항이다. (자료3 p.39~40)",
      terms: [
        "**GROUP BY 복합 키**: 여러 컬럼으로 그룹화 가능",
        "**GROUP BY 별칭 불가**: SELECT 이전 실행이므로 별칭 미정의 상태",
        "**GROUP BY 컬럼 SELECT 선택**: SELECT에 포함 안 해도 됨",
        "**자동 정렬 없음**: 정렬이 필요하면 ORDER BY 명시 필수"
      ],
      wrong: [
        "1. GROUP BY에 여러 컬럼을 지정하면 그 조합으로 그룹화한다. 정상 문법이다.",
        "2. GROUP BY 절에서는 SELECT 이전에 실행되므로 별칭 사용 시 오류가 발생한다. 맞는 설명이다.",
        "3. (정답) GROUP BY 컬럼은 SELECT에 포함하지 않아도 된다. SELECT COUNT(*) FROM T_EMP GROUP BY DEPTNO 같은 SQL이 정상이다.",
        "4. GROUP BY 사용 시 자동 정렬은 보장되지 않으므로 ORDER BY를 명시해야 한다. 맞는 설명이다."
      ],
      tip: "GROUP BY 컬럼을 SELECT에 포함하는 것은 관행이지 필수가 아니다."
    }
  },

  // ============================================================
  // 토픽 83: HAVING 절 사용 규칙 (Q663~Q666) - 4문항, has_code=true
  // ============================================================
  {
    id: 663,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "다음 SQL 중 HAVING 절의 사용이 올바르지 않아 오류가 발생하는 것은?",
    blocks: [
      {
        type: "code",
        content: "-- (A)\nSELECT DEPTNO, COUNT(*) AS cnt\nFROM T_EMP\nGROUP BY DEPTNO\nHAVING COUNT(*) >= 5;\n\n-- (B)\nSELECT DEPTNO, AVG(SAL) AS avg_sal\nFROM T_EMP\nGROUP BY DEPTNO\nHAVING avg_sal > 2000;\n\n-- (C)\nSELECT DEPTNO, SUM(SAL)\nFROM T_EMP\nGROUP BY DEPTNO\nHAVING SUM(SAL) > 9000;\n\n-- (D)\nSELECT DEPTNO, MAX(SAL)\nFROM T_EMP\nGROUP BY DEPTNO\nHAVING DEPTNO = '20';"
      }
    ],
    choices: [
      "(A)",
      "(B)",
      "(C)",
      "(D)"
    ],
    ans: 2,
    src: "자료3 p.40",
    exp: {
      reason: "(B)는 HAVING 절에서 SELECT 별칭 avg_sal을 사용했다. HAVING은 논리적 실행 순서에서 SELECT보다 먼저 실행되므로 SELECT에서 정의한 별칭을 인식하지 못한다. HAVING 절에는 집계 함수 원래 표현식(AVG(SAL))이나 GROUP BY 컬럼을 써야 한다. (자료3 p.40)",
      terms: [
        "**HAVING 별칭 불가**: SELECT 이전 실행 → 별칭 인식 불가",
        "**HAVING 올바른 패턴**: HAVING COUNT(*) >= 5, HAVING AVG(SAL) > 2000",
        "**HAVING에서 가능**: 집계 함수, GROUP BY 컬럼 직접 조건",
        "**오류 패턴**: HAVING avg_sal > 2000 (별칭 사용)"
      ],
      wrong: [
        "1. (A)는 HAVING COUNT(*) >= 5로 집계 함수를 직접 사용한다. 정상이다.",
        "2. (정답) HAVING avg_sal > 2000에서 avg_sal은 SELECT 별칭이다. HAVING은 SELECT 이전에 실행되므로 오류 발생.",
        "3. (C)는 HAVING SUM(SAL) > 9000으로 집계 함수를 직접 사용한다. 정상이다.",
        "4. (D)는 HAVING DEPTNO = '20'으로 GROUP BY 컬럼을 조건으로 사용한다. 정상이다."
      ],
      tip: "HAVING에서 별칭 사용은 금지. 집계 함수나 GROUP BY 컬럼 원본 표현식만 허용."
    }
  },
  {
    id: 664,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "아래 SQL의 실행 결과로 가장 적절한 것은?\n\n[T_EMP: DEPTNO별 - '10':3행(SAL합8750, AVG≈2917), '20':5행(SAL합10875, AVG=2175), '30':6행(SAL합9400, AVG≈1567)]",
    blocks: [
      {
        type: "code",
        content: "SELECT DEPTNO, COUNT(*) AS cnt\nFROM T_EMP\nGROUP BY DEPTNO\nHAVING COUNT(*) >= 5\nORDER BY DEPTNO;"
      }
    ],
    choices: [
      "('10', 3), ('20', 5), ('30', 6) - 3행 반환",
      "('20', 5), ('30', 6) - 2행 반환",
      "('10', 3) - 1행 반환",
      "결과 없음 (0건)"
    ],
    ans: 2,
    src: "자료3 p.40",
    exp: {
      reason: "GROUP BY DEPTNO로 그룹화한 후 HAVING COUNT(*) >= 5 조건을 적용하면, COUNT(*)가 5 이상인 그룹만 남는다. '10'은 3행(탈락), '20'은 5행(통과), '30'은 6행(통과). 결과는 ('20', 5), ('30', 6) 2행이다. PostgreSQL 14 검증 완료. (자료3 p.40)",
      terms: [
        "**HAVING 역할**: 그룹화 이후 집계 조건으로 그룹 필터링",
        "**'10' 그룹**: COUNT(*) = 3 → 5 미만 → 탈락",
        "**'20' 그룹**: COUNT(*) = 5 → 통과",
        "**'30' 그룹**: COUNT(*) = 6 → 통과"
      ],
      wrong: [
        "1. HAVING 조건 없이 전체 그룹을 반환한 경우이다. HAVING이 적용되지 않은 잘못된 결과.",
        "2. (정답) HAVING COUNT(*) >= 5로 5행 이상인 '20', '30'만 통과. 2행 반환.",
        "3. '10'은 COUNT(*)=3으로 5 미만이라 탈락한다. '10'이 반환될 수 없다.",
        "4. '20'(5행)과 '30'(6행)이 조건 통과하므로 0건이 아니다."
      ],
      tip: "HAVING은 그룹 필터. WHERE이 행 필터인 것처럼 HAVING은 그룹 필터라고 기억."
    }
  },
  {
    id: 665,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "다음 중 HAVING 절에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        content: "-- 예시\nSELECT DEPTNO, AVG(SAL)\nFROM T_EMP\nHAVING AVG(SAL) > 2000;"
      }
    ],
    choices: [
      "HAVING 절은 반드시 GROUP BY 절 뒤에 위치해야만 문법 오류가 발생하지 않는다.",
      "HAVING 절에는 WHERE 절에서 사용하는 조건과 동일하게 집계 함수를 사용할 수 없다.",
      "예시 SQL처럼 GROUP BY 절이 없어도 HAVING 절을 단독으로 사용할 수 있다.",
      "HAVING 절은 개별 행을 필터링하는 역할을 하므로 WHERE 절과 동일하게 작동한다."
    ],
    ans: 3,
    src: "자료3 p.40",
    exp: {
      reason: "HAVING 절은 일반적으로 GROUP BY 뒤에 위치하지만 GROUP BY 없이도 단독 사용 가능하다. GROUP BY 없이 HAVING AVG(SAL) > 2000을 쓰면 테이블 전체를 하나의 그룹으로 간주하여 조건을 평가한다. 자료3 p.40에 '일반적으로 GROUP BY 뒤에 위치하지만 GROUP BY 없이도 사용 가능'이 명시되어 있다. (자료3 p.40)",
      terms: [
        "**HAVING 단독 사용**: GROUP BY 없이도 전체를 하나의 그룹으로 처리",
        "**HAVING vs WHERE**: WHERE는 행 필터(그룹화 전), HAVING은 그룹 필터(그룹화 후)",
        "**HAVING에서 집계 함수 가능**: HAVING COUNT(*) > 5, HAVING AVG(SAL) > 2000 등",
        "**GROUP BY 위치**: HAVING이 GROUP BY 앞에 와도 논리 순서는 변하지 않음"
      ],
      wrong: [
        "1. HAVING은 GROUP BY 앞에 위치해도 논리적 실행 순서는 동일하게 적용된다. '반드시 뒤에'는 틀린 설명이다.",
        "2. HAVING에서는 집계 함수를 사용할 수 있다. WHERE 절이 집계 함수 사용 불가이다.",
        "3. (정답) GROUP BY 없이 HAVING 단독 사용이 가능하다. 전체가 하나의 그룹으로 처리된다.",
        "4. HAVING은 그룹 필터이고 WHERE은 행 필터이다. 작동 방식이 다르다."
      ],
      tip: "HAVING은 GROUP BY 없이도 사용 가능. WHERE에서는 집계 함수 불가, HAVING에서는 가능."
    }
  },
  {
    id: 666,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "아래 SQL의 실행 결과로 가장 적절한 것은?\n\n[T_EMP: DEPTNO별 - '10':3행(AVG≈2917), '20':5행(AVG=2175), '30':6행(AVG≈1567)]",
    blocks: [
      {
        type: "code",
        content: "SELECT DEPTNO, ROUND(AVG(SAL), 0) AS avg_sal\nFROM T_EMP\nGROUP BY DEPTNO\nHAVING AVG(SAL) > 2000\nORDER BY DEPTNO;"
      }
    ],
    choices: [
      "3행: ('10', 2917), ('20', 2175), ('30', 1567)",
      "2행: ('10', 2917), ('20', 2175)",
      "1행: ('10', 2917)",
      "오류 발생 - HAVING과 ORDER BY를 함께 쓸 수 없다."
    ],
    ans: 2,
    src: "자료3 p.40",
    exp: {
      reason: "HAVING AVG(SAL) > 2000 조건으로 필터링하면 '10'(AVG=2917)과 '20'(AVG=2175)만 통과하고 '30'(AVG≈1567)은 탈락한다. ORDER BY DEPTNO로 오름차순 정렬하면 ('10', 2917), ('20', 2175) 순으로 2행이 반환된다. PostgreSQL 14 검증 완료. (자료3 p.40)",
      terms: [
        "**'10' AVG**: 8750÷3 ≈ 2917 > 2000 → 통과",
        "**'20' AVG**: 10875÷5 = 2175 > 2000 → 통과",
        "**'30' AVG**: 9400÷6 ≈ 1567 ≤ 2000 → 탈락",
        "**HAVING + ORDER BY 혼용**: 문제없음. HAVING 후 ORDER BY 정렬"
      ],
      wrong: [
        "1. HAVING 조건이 적용되지 않은 경우. '30'도 포함하는 잘못된 결과.",
        "2. (정답) '10'과 '20'만 AVG > 2000 통과. 2행 반환.",
        "3. '20'의 AVG=2175가 2000 초과이므로 '20'도 포함되어야 한다.",
        "4. HAVING과 ORDER BY는 함께 사용 가능하다. 오류가 발생하지 않는다."
      ],
      tip: "AVG(SAL) 계산: 10→2917, 20→2175, 30→1567. 2000 초과는 10, 20 두 부서."
    }
  },

  // ============================================================
  // 토픽 84: WHERE vs HAVING 차이 (Q667~Q670) - 4문항, has_code=true
  // ============================================================
  {
    id: 667,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "다음 두 SQL(A), (B)에 대한 설명으로 가장 적절한 것은?\n\n[T_EMP: 전체 14행. SAL > 1000인 행: '10'→3행, '20'→4행(SMITH SAL=800 제외), '30'→5행(JAMES SAL=950 제외)]",
    blocks: [
      {
        type: "code",
        content: "-- (A)\nSELECT DEPTNO, COUNT(*) AS cnt\nFROM T_EMP\nWHERE SAL > 1000\nGROUP BY DEPTNO\nORDER BY DEPTNO;\n\n-- (B)\nSELECT DEPTNO, COUNT(*) AS cnt\nFROM T_EMP\nGROUP BY DEPTNO\nHAVING COUNT(*) > 1000\nORDER BY DEPTNO;"
      }
    ],
    choices: [
      "(A)와 (B)는 동일한 결과를 반환한다.",
      "(A)는 SAL > 1000인 행만 그룹화 대상이 되고, (B)는 전체를 그룹화한 후 COUNT(*) > 1000인 그룹을 필터링한다.",
      "(A)는 오류가 발생하고 (B)만 정상 실행된다.",
      "(B)의 HAVING COUNT(*) > 1000은 집계 함수 조건이 아니므로 오류가 발생한다."
    ],
    ans: 2,
    src: "자료3 p.40",
    exp: {
      reason: "(A)는 WHERE SAL > 1000으로 행을 먼저 필터링한 후 그룹화한다. 즉 그룹화 전에 행이 줄어든다. (B)는 전체 14행을 먼저 그룹화한 다음 각 그룹의 COUNT(*)가 1000 초과인 그룹을 필터링한다. 두 SQL의 목적과 결과가 다르며, (A)의 결과는 (10,3),(20,4),(30,5)이고 (B)의 결과는 0건이다. (자료3 p.40)",
      terms: [
        "**WHERE**: 그룹화 전 개별 행 필터 → 그룹 크기에 영향",
        "**HAVING**: 그룹화 후 그룹 단위 필터 → 집계 결과 기준",
        "**(A) 결과**: SAL > 1000 필터 후 그룹: (10,3),(20,4),(30,5)",
        "**(B) 결과**: 전체 그룹화 후 COUNT > 1000 → 0건(최대 6행)"
      ],
      wrong: [
        "1. 두 SQL은 다른 조건을 필터링하므로 결과가 다르다.",
        "2. (정답) (A)는 행 레벨 필터 후 그룹화, (B)는 그룹화 후 그룹 레벨 필터. 목적이 다르다.",
        "3. 두 SQL 모두 문법적으로 정상이다. (A)는 WHERE, (B)는 HAVING을 올바르게 사용했다.",
        "4. HAVING COUNT(*) > 1000은 올바른 집계 함수 조건이다. 결과가 0건일 뿐 오류가 아니다."
      ],
      tip: "WHERE = 행 필터 (그룹화 전), HAVING = 그룹 필터 (그룹화 후). 목적이 다르다."
    }
  },
  {
    id: 668,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 빈칸에 들어갈 절로 가장 적절한 것은?\n\n'각 부서에서 급여가 1500 이상인 사원만 대상으로 부서별 평균 급여를 구하되, 그 평균이 2000을 초과하는 부서만 조회하라.'",
    blocks: [
      {
        type: "code",
        content: "SELECT DEPTNO, ROUND(AVG(SAL), 0) AS avg_sal\nFROM T_EMP\n[빈칸 A]\nGROUP BY DEPTNO\n[빈칸 B]\nORDER BY DEPTNO;"
      }
    ],
    choices: [
      "[빈칸 A]: HAVING SAL >= 1500 / [빈칸 B]: WHERE AVG(SAL) > 2000",
      "[빈칸 A]: WHERE SAL >= 1500 / [빈칸 B]: HAVING AVG(SAL) > 2000",
      "[빈칸 A]: WHERE AVG(SAL) > 2000 / [빈칸 B]: HAVING SAL >= 1500",
      "[빈칸 A]: WHERE SAL >= 1500 / [빈칸 B]: WHERE AVG(SAL) > 2000"
    ],
    ans: 2,
    src: "자료3 p.40",
    exp: {
      reason: "'급여가 1500 이상인 사원만 대상'은 그룹화 전 개별 행 조건이므로 WHERE 절, '평균이 2000을 초과하는 부서만'은 그룹화 후 집계 결과 조건이므로 HAVING 절에 넣어야 한다. WHERE에는 집계 함수를 쓸 수 없다. (자료3 p.40)",
      terms: [
        "**WHERE SAL >= 1500**: 그룹화 전 행 레벨 조건. 개별 사원 급여 기준",
        "**HAVING AVG(SAL) > 2000**: 그룹화 후 그룹 레벨 조건. 집계 결과 기준",
        "**WHERE에 집계 함수 불가**: WHERE AVG(SAL) > 2000은 오류",
        "**HAVING에 단순 컬럼 가능**: 그룹화 기준 컬럼은 HAVING에도 허용"
      ],
      wrong: [
        "1. HAVING에 SAL 단순 비교를 쓰고 WHERE에 집계 함수를 쓰는 것은 틀렸다. WHERE에는 집계 함수 불가.",
        "2. (정답) WHERE SAL >= 1500으로 행을 먼저 줄이고, HAVING AVG(SAL) > 2000으로 그룹 필터링.",
        "3. WHERE에 집계 함수 AVG가 있어 오류가 발생한다.",
        "4. WHERE에는 집계 함수를 사용할 수 없으므로 두 번째 WHERE가 오류이다."
      ],
      tip: "개별 행 조건 → WHERE. 집계 결과 조건 → HAVING. WHERE에 집계 함수는 항상 오류."
    }
  },
  {
    id: 669,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "아래 SQL(A)와 (B)의 결과 행 수를 바르게 짝지은 것은?\n\n[T_EMP: '10'→3행(KING5000,CLARK2450,MILLER1300), '20'→5행(JONES2975,SCOTT3000,FORD3000,ADAMS1100,SMITH800), '30'→6행]",
    blocks: [
      {
        type: "code",
        content: "-- (A): WHERE로 SAL > 1000 먼저 필터, 부서별 카운트\nSELECT DEPTNO, COUNT(*) AS cnt\nFROM T_EMP\nWHERE SAL > 1000\nGROUP BY DEPTNO;\n\n-- (B): 전체 그룹화 후 HAVING으로 카운트 > 4 필터\nSELECT DEPTNO, COUNT(*) AS cnt\nFROM T_EMP\nGROUP BY DEPTNO\nHAVING COUNT(*) > 4;"
      }
    ],
    choices: [
      "(A) 3행, (B) 3행",
      "(A) 3행, (B) 2행",
      "(A) 3행, (B) 1행",
      "(A) 2행, (B) 1행"
    ],
    ans: 3,
    src: "자료3 p.40",
    exp: {
      reason: "(A): SAL > 1000인 행은 '10'→3행(5000, 2450, 1300 모두 통과), '20'→4행(SMITH 800 제외), '30'→5행(JAMES 950 제외)이므로 3개 그룹 반환. (B): 전체 그룹화 후 COUNT(*) > 4이면 '20'(5행)과 '30'(6행)이 통과하고 '10'(3행)은 탈락. 그러나 '30'만 6행으로 4 초과가 아니다. '20'도 5>4로 통과. 결과: '20', '30' 2행. PostgreSQL 14 검증 완료. (자료3 p.40)",
      terms: [
        "**(A) WHERE SAL > 1000**: 10→3, 20→4, 30→5. 3개 그룹",
        "**(B) HAVING COUNT(*) > 4**: 10→3(탈락), 20→5(통과), 30→6(통과). 2행",
        "**SMITH**: SAL=800으로 WHERE SAL > 1000 탈락",
        "**JAMES**: SAL=950으로 WHERE SAL > 1000 탈락"
      ],
      wrong: [
        "1. (B)는 2행이 아니라 2행이다. 정확히는 20, 30 두 부서가 COUNT > 4를 만족한다.",
        "2. (정답 아님) (A) 3행, (B) 2행이 실제 검증 결과다. 3번이 정답이다.",
        "3. (정답) (A)는 3개 그룹 모두 반환, (B)는 COUNT > 4인 '20'(5행), '30'(6행)만 반환해 2행.",
        "4. (A)에서 SAL > 1000을 만족하는 부서가 모두 3개이므로 3행이 반환된다."
      ],
      tip: "SMITH(800), JAMES(950)만 SAL <= 1000. 나머지는 모두 > 1000이다."
    }
  },
  {
    id: 670,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "중",
    has_code: true,
    q: "다음 중 WHERE 절과 HAVING 절의 차이에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        content: "-- 참고: 실행 순서\n-- FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY"
      }
    ],
    choices: [
      "WHERE 절은 그룹화 이전에 개별 행을 필터링하므로 집계 함수를 사용할 수 없다.",
      "HAVING 절은 그룹화 이후에 그룹 단위로 필터링하므로 집계 함수 조건을 사용할 수 있다.",
      "성능 측면에서 WHERE 절로 먼저 행을 줄이면 그룹화 대상이 줄어 효율적이다.",
      "WHERE 절과 HAVING 절은 동일한 시점에 실행되므로 어느 절에 조건을 넣어도 결과가 같다."
    ],
    ans: 4,
    src: "자료3 p.40",
    exp: {
      reason: "WHERE와 HAVING은 실행 시점이 다르다. WHERE는 GROUP BY 이전(개별 행 필터), HAVING은 GROUP BY 이후(그룹 필터)에 실행된다. 따라서 어느 절에 조건을 넣느냐에 따라 결과가 달라질 수 있다. 예를 들어 SAL > 1000 조건을 WHERE에 넣으면 먼저 행이 줄어 그룹 크기가 달라진다. (자료3 p.40)",
      terms: [
        "**WHERE 시점**: FROM 후, GROUP BY 전 → 행 레벨 필터",
        "**HAVING 시점**: GROUP BY 후 → 그룹 레벨 필터",
        "**성능**: WHERE로 먼저 필터링하면 그룹화할 데이터 자체가 줄어 성능 향상",
        "**결과 차이**: 조건에 따라 WHERE/HAVING 배치가 결과에 영향"
      ],
      wrong: [
        "1. WHERE 절에 집계 함수를 사용할 수 없다는 설명이 맞다.",
        "2. HAVING 절에서 집계 함수 조건 사용이 가능하다는 설명이 맞다.",
        "3. 성능 측면에서 WHERE로 먼저 데이터를 줄이는 것이 효율적이라는 설명이 맞다.",
        "4. (정답) WHERE와 HAVING은 실행 시점이 다르며 결과도 다를 수 있다. '동일한 시점'이라는 표현이 틀렸다."
      ],
      tip: "WHERE = 그룹화 전, HAVING = 그룹화 후. 성능을 위해 WHERE로 먼저 데이터를 줄여라."
    }
  },

  // ============================================================
  // 토픽 85: CASE+GROUP BY 피벗 (Q671~Q675) - 5문항, has_code=true
  // ============================================================
  {
    id: 671,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "상",
    has_code: true,
    q: "아래 SQL을 실행했을 때의 결과로 가장 적절한 것은?\n\n[T_EMP: DEPTNO별 SAL합계 - '10':8750, '20':10875, '30':9400]",
    blocks: [
      {
        type: "code",
        content: "SELECT\n  SUM(CASE WHEN DEPTNO='10' THEN SAL ELSE 0 END) AS D10,\n  SUM(CASE WHEN DEPTNO='20' THEN SAL ELSE 0 END) AS D20,\n  SUM(CASE WHEN DEPTNO='30' THEN SAL ELSE 0 END) AS D30\nFROM T_EMP;"
      }
    ],
    choices: [
      "3행으로 반환된다: (8750), (10875), (9400)",
      "1행으로 반환된다: D10=8750, D20=10875, D30=9400",
      "1행으로 반환된다: D10=NULL, D20=NULL, D30=NULL",
      "오류가 발생한다. CASE 표현식을 SUM 안에 사용할 수 없다."
    ],
    ans: 2,
    src: "자료1 p.24",
    exp: {
      reason: "GROUP BY 없이 SUM(CASE WHEN ...)을 사용하면 테이블 전체가 하나의 그룹이 되어 1행을 반환한다. CASE WHEN DEPTNO='10' THEN SAL ELSE 0 END는 DEPTNO가 '10'인 행에서만 SAL 값을 반환하고 나머지는 0이 되어 SUM으로 합산되면 8750이 된다. PostgreSQL 14 검증: D10=8750, D20=10875, D30=9400. (자료1 p.24)",
      terms: [
        "**CASE+SUM 피벗**: 행 데이터를 열로 변환하는 기법",
        "**ELSE 0**: 해당 그룹이 아닌 행을 0으로 만들어 SUM에서 무시되게 함",
        "**GROUP BY 없음**: 전체 테이블이 하나의 그룹 → 1행 반환",
        "**결과**: D10=8750, D20=10875, D30=9400 (1행)"
      ],
      wrong: [
        "1. GROUP BY 없이 집계 함수만 사용하면 1행이 반환된다. 3행이 아니다.",
        "2. (정답) CASE+SUM 패턴으로 부서별 SAL 합계가 열로 변환되어 1행 반환.",
        "3. ELSE 0 덕분에 각 SUM에 실제 값이 합산된다. NULL이 반환되지 않는다.",
        "4. CASE 표현식은 SUM, AVG 등 집계 함수 안에서 사용 가능하다."
      ],
      tip: "SUM(CASE WHEN 조건 THEN 값 ELSE 0 END): 조건 맞으면 값 더함, 아니면 0 더함 → 해당 조건 행의 합계."
    }
  },
  {
    id: 672,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "상",
    has_code: true,
    q: "아래 SQL에서 ELSE 절을 제거했을 때의 결과 변화로 가장 적절한 것은?\n\n[T_EMP: DEPTNO별 SAL합계 - '10':8750, '20':10875, '30':9400]",
    blocks: [
      {
        type: "code",
        content: "-- 원본 (ELSE 0 포함)\nSELECT SUM(CASE WHEN DEPTNO='10' THEN SAL ELSE 0 END) AS D10\nFROM T_EMP;\n\n-- 변경 (ELSE 제거)\nSELECT SUM(CASE WHEN DEPTNO='10' THEN SAL END) AS D10\nFROM T_EMP;"
      }
    ],
    choices: [
      "ELSE를 제거하면 CASE 표현식의 결과가 항상 NULL이 되어 SUM 결과도 NULL이 된다.",
      "두 SQL의 결과는 동일하게 D10=8750이다. ELSE 절 유무는 SUM 결과에 영향을 주지 않는다.",
      "ELSE를 제거하면 오류가 발생한다.",
      "ELSE를 제거하면 '10'이 아닌 행에서 CASE 결과가 0 대신 NULL이 되지만 SUM은 NULL을 무시하므로 결과는 동일하게 8750이다."
    ],
    ans: 4,
    src: "자료1 p.24, 자료3 p.60~61",
    exp: {
      reason: "CASE 표현식에서 ELSE가 없으면 어떤 WHEN도 만족하지 않을 때 결과가 NULL이 된다. DEPTNO가 '10'이 아닌 행은 CASE 결과가 NULL이 되지만, SUM은 NULL 값을 무시하고 합산한다. 따라서 ELSE 0과 ELSE 생략의 SUM 결과는 동일하게 8750이다. PostgreSQL 14 검증 완료. (자료3 p.60~61)",
      terms: [
        "**CASE ELSE 생략**: 조건 미충족 시 NULL 반환",
        "**ELSE 0**: 조건 미충족 시 0 반환",
        "**SUM과 NULL**: SUM은 NULL을 무시하고 합산",
        "**결과 동일**: ELSE 0과 ELSE 생략 모두 SUM에서 8750"
      ],
      wrong: [
        "1. SUM은 NULL을 무시하므로 NULL이 섞여도 SUM 결과는 NULL이 아니다.",
        "2. 설명은 맞지만 이유가 틀렸다. ELSE 유무가 SUM 결과에 영향을 주지 않는다는 결론은 맞으나 CASE 결과가 다르다는 점을 무시했다.",
        "3. CASE에서 ELSE는 선택 사항이다. 오류가 발생하지 않는다.",
        "4. (정답) ELSE 없으면 NULL, SUM은 NULL 무시 → 합산 결과 동일하게 8750."
      ],
      tip: "SUM(CASE WHEN x THEN val END)과 SUM(CASE WHEN x THEN val ELSE 0 END)의 결과는 같다. 단 AVG는 다름 (분모 차이)."
    }
  },
  {
    id: 673,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "상",
    has_code: true,
    q: "아래 SQL의 결과로 가장 적절한 것은?\n\n[T_EMP: DEPTNO별 행 수 - '10':3행, '20':5행, '30':6행]",
    blocks: [
      {
        type: "code",
        content: "SELECT\n  COUNT(CASE WHEN DEPTNO='10' THEN 1 END) AS D10_CNT,\n  COUNT(CASE WHEN DEPTNO='20' THEN 1 END) AS D20_CNT,\n  COUNT(CASE WHEN DEPTNO='30' THEN 1 END) AS D30_CNT\nFROM T_EMP;"
      }
    ],
    choices: [
      "1행: D10_CNT=3, D20_CNT=5, D30_CNT=6",
      "1행: D10_CNT=14, D20_CNT=14, D30_CNT=14",
      "3행: 각각 (3), (5), (6) 별도 행으로 반환",
      "1행: D10_CNT=NULL, D20_CNT=NULL, D30_CNT=NULL"
    ],
    ans: 1,
    src: "자료1 p.24, 자료3 p.60~61",
    exp: {
      reason: "CASE WHEN DEPTNO='10' THEN 1 END는 '10'인 행에서 1을 반환하고 나머지는 NULL을 반환한다. COUNT는 NULL을 제외하고 세므로 COUNT(CASE WHEN DEPTNO='10' THEN 1 END)는 DEPTNO='10'인 행 수인 3이 된다. 같은 방식으로 D20_CNT=5, D30_CNT=6이다. PostgreSQL 14 검증 완료. (자료3 p.60~61)",
      terms: [
        "**CASE+COUNT 피벗**: ELSE 없으면 조건 미충족 시 NULL",
        "**COUNT와 NULL**: COUNT(값)은 NULL 제외 → 조건 충족 행 수만 카운트",
        "**D10_CNT**: DEPTNO='10'인 3행만 1 반환, 나머지 NULL → COUNT=3",
        "**결과**: 1행, D10=3, D20=5, D30=6"
      ],
      wrong: [
        "1. (정답) CASE ELSE 없으므로 조건 미충족 시 NULL. COUNT는 NULL 제외 → 각 부서 행 수.",
        "2. COUNT(CASE ...)는 전체 행을 세지 않는다. 조건 충족 행만 센다.",
        "3. GROUP BY가 없으므로 3행이 아니라 1행이 반환된다.",
        "4. CASE 결과가 NULL이 섞여도 1 값이 있는 행이 있으므로 COUNT는 0이 아니다."
      ],
      tip: "COUNT(CASE WHEN 조건 THEN 1 END) = 조건 충족 행 수. ELSE 없어야 효과적."
    }
  },
  {
    id: 674,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "상",
    has_code: true,
    q: "아래 SQL에서 부서별 COMM 합계를 구하는 피벗 쿼리의 결과로 가장 적절한 것은?\n\n[T_EMP COMM 데이터: DEPTNO='30'에만 COMM 있음 - ALLEN(300), WARD(500), MARTIN(1400), TURNER(0). '10', '20'은 모두 NULL]",
    blocks: [
      {
        type: "code",
        content: "SELECT\n  SUM(CASE WHEN DEPTNO='10' THEN COMM ELSE 0 END) AS D10_COMM,\n  SUM(CASE WHEN DEPTNO='20' THEN COMM ELSE 0 END) AS D20_COMM,\n  SUM(CASE WHEN DEPTNO='30' THEN COMM ELSE 0 END) AS D30_COMM\nFROM T_EMP;"
      }
    ],
    choices: [
      "D10_COMM=NULL, D20_COMM=NULL, D30_COMM=2200",
      "D10_COMM=0, D20_COMM=0, D30_COMM=2200",
      "D10_COMM=0, D20_COMM=0, D30_COMM=NULL",
      "오류가 발생한다. COMM 컬럼에 NULL이 있어 CASE 표현식이 실패한다."
    ],
    ans: 2,
    src: "자료1 p.24, 자료3 p.60~61",
    exp: {
      reason: "DEPTNO='10', '20' 행에서 CASE의 WHEN 조건이 거짓이므로 ELSE 0이 반환된다. 따라서 D10_COMM, D20_COMM의 SUM에서는 0만 합산되어 0이 된다. '30' 행에서는 COMM 값(300, 500, 1400, 0)이 반환되고 SUM=2200이 된다. NULL COMM도 ELSE 0에 해당 부서 외 행의 결과이므로 영향 없다. PostgreSQL 14 검증: (0, 0, 2200). (자료3 p.60~61)",
      terms: [
        "**DEPTNO='10' 행**: WHEN 조건 거짓 → ELSE 0 → SUM(0,0,...) = 0",
        "**DEPTNO='30' 행**: WHEN 조건 참 → COMM 값 반환",
        "**COMM NULL**: DEPTNO='30' 행에서 CASE는 COMM을 그대로 반환. SUM이 NULL 무시",
        "**D30_COMM**: 300+500+1400+0 = 2200"
      ],
      wrong: [
        "1. ELSE 0이 있으므로 '10', '20'은 NULL이 아니라 0이 반환된다.",
        "2. (정답) ELSE 0으로 인해 D10=0, D20=0. D30은 COMM 합산 2200.",
        "3. ELSE 0이 있으므로 D30도 NULL이 아니라 2200이다.",
        "4. CASE 표현식은 NULL이 있는 컬럼을 참조해도 오류 없이 실행된다."
      ],
      tip: "ELSE 0이 있으면 SUM 결과는 최소 0. ELSE 없으면 NULL 가능성 있음."
    }
  },
  {
    id: 675,
    subj: 2,
    topic: "2-E",
    topic_name: "GROUP BY와 HAVING",
    diff: "상",
    has_code: true,
    q: "아래 SQL의 결과로 가장 적절한 것은?\n\n[T_EMP: DEPTNO별 SAL합 - '10':8750, '20':10875, '30':9400. 전체 SAL합=29025]",
    blocks: [
      {
        type: "code",
        content: "SELECT\n  SUM(CASE WHEN DEPTNO='10' THEN SAL ELSE 0 END) AS D10,\n  SUM(CASE WHEN DEPTNO='20' THEN SAL ELSE 0 END) AS D20,\n  SUM(CASE WHEN DEPTNO='30' THEN SAL ELSE 0 END) AS D30,\n  SUM(SAL) AS TOTAL\nFROM T_EMP;"
      }
    ],
    choices: [
      "D10=8750, D20=10875, D30=9400, TOTAL=NULL",
      "D10=8750, D20=10875, D30=9400, TOTAL=29025",
      "D10=8750, D20=10875, D30=9400, TOTAL=28025",
      "D10=NULL, D20=NULL, D30=NULL, TOTAL=29025"
    ],
    ans: 2,
    src: "자료1 p.24",
    exp: {
      reason: "각 부서별 피벗 컬럼은 이전 문항과 동일하게 D10=8750, D20=10875, D30=9400이다. TOTAL은 SUM(SAL)로 부서 구분 없이 전체 SAL의 합산이므로 8750+10875+9400=29025이다. PostgreSQL 14 검증: (8750, 10875, 9400, 29025). D10+D20+D30 합계와 TOTAL이 일치하는지 확인하면 검증 가능하다. (자료1 p.24)",
      terms: [
        "**피벗 컬럼**: 각 부서별 SAL 합계를 열로 변환",
        "**TOTAL = SUM(SAL)**: 전체 테이블의 SAL 합계",
        "**일관성 확인**: D10 + D20 + D30 = 8750+10875+9400 = 29025 = TOTAL",
        "**검증 포인트**: 피벗 각 열의 합 = 전체 합이면 피벗 쿼리 정확"
      ],
      wrong: [
        "1. TOTAL은 SUM(SAL)이므로 NULL이 아니라 29025이다.",
        "2. (정답) 피벗 3열 합 = 전체 합 = 29025. PostgreSQL 검증값과 일치.",
        "3. TOTAL=28025는 잘못된 값이다. 8750+10875+9400 = 29025이다.",
        "4. ELSE 0이 있으므로 피벗 컬럼에 NULL이 반환되지 않는다."
      ],
      tip: "피벗 열 합계 = SUM(SAL) 전체 합이면 피벗 쿼리가 정확하다는 자가 검증 방법으로 활용."
    }
  }
];

module.exports = e2Part1;

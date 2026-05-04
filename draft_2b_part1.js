// 2-B: SELECT 문 기본 구조 Part1 (Q611~Q625)
// 토픽 60~63 기반. 자료3 p.28~37, 자료2 p.3절.
// PostgreSQL 14 sqld_verify DB로 코드 결과 직접 검증.

const b2Part1 = [
  // ============================================================
  // 토픽 60: SELECT 처리 순서 (Q611~Q615) - 5문항, 코드 없음
  // 자료3 p.28~29 / 자료2 제2절 실행순서
  // ============================================================
  {
    id: 611,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "하",
    has_code: false,
    q: "다음 중 SQL SELECT 문의 논리적 실행 순서로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY",
      "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY",
      "FROM → SELECT → WHERE → GROUP BY → HAVING → ORDER BY",
      "WHERE → FROM → GROUP BY → HAVING → SELECT → ORDER BY"
    ],
    ans: 2,
    src: "자료3 p.28~29",
    exp: {
      reason: "SELECT 문의 논리적 실행 순서는 FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY 이다. 작성 순서(SELECT → FROM → WHERE ...)와 실행 순서는 다르다. (자료3 p.28~29)",
      terms: [
        "**논리적 실행 순서**: 옵티마이저가 실제로 처리하는 개념적 순서. 작성 순서와 구별해야 함",
        "**FROM**: 조회 대상 테이블을 먼저 확정",
        "**WHERE**: 행 단위 필터. 집계 전 처리",
        "**GROUP BY → HAVING**: 그룹 생성 후 그룹 필터",
        "**SELECT**: 별칭(ALIAS) 부여 시점. 이전 절에서는 별칭 미사용 가능",
        "**ORDER BY**: 마지막에 정렬. SELECT 별칭 사용 가능"
      ],
      wrong: [
        "1. 작성 순서와 실행 순서를 혼동한 것이다. SELECT는 실행 순서상 5번째다.",
        "2. (정답) FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY가 정확한 논리적 실행 순서다.",
        "3. SELECT를 FROM 직후에 실행한다고 잘못 기술했다.",
        "4. WHERE가 FROM보다 먼저 온다는 설명으로 틀렸다."
      ],
      tip: "**작성 순서** vs **실행 순서** 구분이 핵심. SELECT는 쓸 때 첫 번째지만 실행은 5번째."
    }
  },
  {
    id: 612,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: false,
    q: "다음 중 SELECT 문 논리적 실행 순서에 관한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "WHERE 절은 GROUP BY 절보다 먼저 실행되어 그룹화 이전에 행을 필터링한다.",
      "HAVING 절은 GROUP BY 이후 실행되어 그룹에 대한 조건을 처리한다.",
      "ORDER BY 절에서는 SELECT 절에서 정의한 별칭(ALIAS)을 사용할 수 있다.",
      "SELECT 절은 FROM 절 다음에 실행되므로 WHERE 절에서 SELECT 절의 별칭을 참조할 수 있다."
    ],
    ans: 4,
    src: "자료3 p.28~29",
    exp: {
      reason: "SELECT 절은 실행 순서상 WHERE 절보다 나중에 처리된다. 따라서 WHERE 절에서는 SELECT 절에서 정의한 별칭을 사용할 수 없다. ORDER BY 절은 SELECT 이후에 실행되므로 별칭 사용이 가능하다. (자료3 p.28~29)",
      terms: [
        "**별칭(ALIAS) 사용 가능 절**: ORDER BY (SELECT 이후 실행)",
        "**별칭 사용 불가 절**: WHERE, GROUP BY, HAVING (SELECT 이전 실행)",
        "**실행 순서**: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY"
      ],
      wrong: [
        "1. WHERE는 GROUP BY 전에 실행된다는 설명이 맞다.",
        "2. HAVING은 GROUP BY 후 실행된다는 설명이 맞다.",
        "3. ORDER BY는 SELECT 이후 실행되므로 별칭 사용이 가능하다. 맞는 설명이다.",
        "4. (정답) WHERE 절은 SELECT 절보다 먼저 실행되므로 SELECT에서 정의한 별칭을 WHERE에서 참조할 수 없다."
      ],
      tip: "ORDER BY만 SELECT 이후 → 별칭 OK. WHERE/GROUP BY/HAVING은 SELECT 이전 → 별칭 사용 불가."
    }
  },
  {
    id: 613,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: false,
    q: "SELECT 문의 논리적 실행 순서에서 ( ㄱ )에 들어갈 절로 가장 적절한 것은?\n\nFROM → WHERE → ( ㄱ ) → HAVING → SELECT → ORDER BY",
    blocks: null,
    choices: [
      "DISTINCT",
      "ORDER BY",
      "GROUP BY",
      "CONNECT BY"
    ],
    ans: 3,
    src: "자료3 p.28~29",
    exp: {
      reason: "논리적 실행 순서는 FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY이다. WHERE와 HAVING 사이에 위치하는 절은 GROUP BY이다. GROUP BY에서 행을 그룹화한 후 HAVING이 그룹 조건을 필터링한다. (자료3 p.28~29)",
      terms: [
        "**GROUP BY**: 지정 컬럼 기준으로 행을 그룹화",
        "**HAVING**: GROUP BY 결과에 조건 적용. WHERE처럼 보이지만 그룹 단위로 작동",
        "**DISTINCT**: 별도 절이 아닌 SELECT 절 내 키워드",
        "**CONNECT BY**: 계층형 질의에서 사용하는 절로 기본 SELECT 실행 순서와 별개"
      ],
      wrong: [
        "1. DISTINCT는 독립 절이 아니라 SELECT 절 내 키워드다.",
        "2. ORDER BY는 실행 순서의 마지막 절이다.",
        "3. (정답) GROUP BY가 WHERE와 HAVING 사이에 위치한다.",
        "4. CONNECT BY는 계층형 질의 전용 절로 기본 실행 순서에 포함되지 않는다."
      ],
      tip: "빈칸 채우기 핵심: WHERE(행 필터) → GROUP BY(그룹화) → HAVING(그룹 필터) 3단계를 하나의 덩어리로 암기."
    }
  },
  {
    id: 614,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: false,
    q: "다음 중 SELECT 문의 각 절과 실행 순서의 매칭으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "1순위: FROM, 2순위: GROUP BY, 3순위: WHERE",
      "1순위: FROM, 2순위: WHERE, 3순위: GROUP BY",
      "1순위: SELECT, 2순위: FROM, 3순위: WHERE",
      "1순위: WHERE, 2순위: FROM, 3순위: GROUP BY"
    ],
    ans: 2,
    src: "자료3 p.28~29",
    exp: {
      reason: "논리적 실행 순서에서 처음 3단계는 FROM(1순위) → WHERE(2순위) → GROUP BY(3순위)이다. FROM에서 테이블을 확정하고, WHERE로 행을 먼저 거른 뒤 GROUP BY로 그룹화한다. (자료3 p.28~29)",
      terms: [
        "**FROM (1순위)**: 조회 대상 테이블 결정",
        "**WHERE (2순위)**: 개별 행에 대한 조건 필터",
        "**GROUP BY (3순위)**: 남은 행을 그룹으로 묶음",
        "전체 순서: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY"
      ],
      wrong: [
        "1. WHERE는 GROUP BY보다 먼저 실행된다. 순서가 뒤바뀌어 틀렸다.",
        "2. (정답) FROM → WHERE → GROUP BY 순서가 맞다.",
        "3. SELECT는 실행 순서 5번째다. FROM 전에 실행되지 않는다.",
        "4. WHERE가 FROM보다 먼저 실행된다는 설명으로 틀렸다."
      ],
      tip: "1~3순위만 기억해도 출제 패턴 대부분 커버: FROM(테이블) → WHERE(행 필터) → GROUP BY(그룹)"
    }
  },
  {
    id: 615,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: false,
    q: "다음 중 SELECT 문의 논리적 실행 순서에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "HAVING 절은 WHERE 절보다 먼저 실행되어 그룹 조건을 먼저 처리한다.",
      "GROUP BY 절이 없어도 HAVING 절을 단독으로 사용하면 WHERE 절처럼 행 필터링이 가능하다.",
      "SELECT 절은 FROM 절 이전에 실행되므로 컬럼 리스트를 가장 먼저 확정한다.",
      "ORDER BY 절은 SELECT 절 이후에 실행되므로 SELECT에서 정의한 별칭을 사용할 수 있다."
    ],
    ans: 4,
    src: "자료3 p.28~29",
    exp: {
      reason: "ORDER BY는 실행 순서 마지막(6번째)에 위치하여 SELECT 이후에 실행된다. 따라서 SELECT 절에서 정의한 컬럼 별칭을 ORDER BY에서 사용할 수 있다. (자료3 p.28~29)",
      terms: [
        "**ORDER BY와 별칭**: SELECT 이후 실행이므로 별칭 참조 가능",
        "**HAVING**: GROUP BY 이후 실행. WHERE보다 나중. 단독 사용 시 테이블 전체가 하나의 그룹으로 처리됨",
        "**SELECT**: 실행 5번째. FROM이 먼저 실행되어 테이블 구조를 확정 후 컬럼 처리"
      ],
      wrong: [
        "1. HAVING은 WHERE 이후에 실행된다(WHERE가 더 먼저). 순서 반대로 틀렸다.",
        "2. GROUP BY 없이 HAVING을 단독 사용할 수 있으나 테이블 전체를 1개 그룹으로 처리하며, WHERE처럼 행 단위 필터가 아니다.",
        "3. SELECT는 FROM 이후(5번째)에 실행된다. FROM이 먼저다.",
        "4. (정답) ORDER BY는 SELECT 이후 실행되므로 SELECT 절의 별칭을 참조할 수 있다."
      ],
      tip: "ORDER BY = 유일하게 SELECT 별칭을 쓸 수 있는 절. 나머지(WHERE/GROUP BY/HAVING)는 불가."
    }
  },

  // ============================================================
  // 토픽 61: SELECT 절 ALL/DISTINCT/AS/별칭 (Q616~Q619) - 4문항, 코드
  // 자료3 p.29~30 / 자료2 제2절 ALIAS
  // ============================================================
  {
    id: 616,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 가장 적절한 것은? (emp 테이블: empno 1~6, deptno 컬럼에 10, 10, 20, 20, 30, NULL 값 존재)",
    blocks: [
      {
        type: "code",
        label: "SQL",
        content: "SELECT DISTINCT deptno\nFROM emp\nORDER BY deptno;"
      }
    ],
    choices: [
      "10, 10, 20, 20, 30, NULL — 6행 반환",
      "10, 20, 30 — 3행 반환 (NULL 제외)",
      "10, 20, 30, NULL — 4행 반환",
      "오류 발생 — DISTINCT는 단일 컬럼에 사용 불가"
    ],
    ans: 3,
    src: "자료3 p.29~30",
    exp: {
      reason: "DISTINCT는 SELECT 결과에서 중복 행을 제거한다. NULL도 하나의 값으로 취급하여 중복 NULL은 하나만 출력된다. deptno에는 10, 20, 30, NULL 네 가지 값이 있으므로 4행이 반환된다. PostgreSQL 검증: SELECT DISTINCT deptno FROM emp ORDER BY deptno → 10, 20, 30, NULL(4행). (자료3 p.29~30)",
      terms: [
        "**DISTINCT**: SELECT 결과 중복 행 제거 키워드. SELECT 절 첫 위치에만 사용 가능",
        "**ALL**: 기본값. 중복 포함 전체 행 반환. 명시 생략 가능",
        "**NULL과 DISTINCT**: NULL도 고유 값으로 인정하여 NULL이 여러 행이어도 1행만 출력"
      ],
      wrong: [
        "1. DISTINCT 없이 전체 조회 시의 결과다. DISTINCT를 적용하면 중복이 제거된다.",
        "2. DISTINCT는 NULL을 제외하지 않는다. NULL도 하나의 고유값으로 처리된다.",
        "3. (정답) DISTINCT 적용 시 10, 20, 30, NULL 4가지 고유값이 반환된다.",
        "4. DISTINCT는 단일 컬럼에 완전히 사용 가능하다. 오류가 아니다."
      ],
      tip: "DISTINCT + NULL = NULL도 중복 제거 대상. NULL이 5개여도 결과엔 NULL 1행."
    }
  },
  {
    id: 617,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "하",
    has_code: true,
    q: "다음 두 SQL의 실행 결과에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        label: "SQL-A",
        content: "SELECT ename AS 이름, sal AS 급여\nFROM emp;"
      },
      {
        type: "code",
        label: "SQL-B",
        content: "SELECT ename 이름, sal 급여\nFROM emp;"
      }
    ],
    choices: [
      "SQL-A만 유효하다. AS 키워드는 필수이므로 SQL-B는 오류가 발생한다.",
      "SQL-B만 유효하다. AS 키워드는 사용하면 오류가 발생한다.",
      "두 SQL의 결과는 동일하다. AS 키워드는 생략 가능하다.",
      "두 SQL의 결과는 다르다. AS 생략 시 별칭이 아닌 원래 컬럼명으로 출력된다."
    ],
    ans: 3,
    src: "자료3 p.29~30",
    exp: {
      reason: "별칭 지정 시 AS 키워드는 생략할 수 있다. 'ename AS 이름'과 'ename 이름'은 동일한 의미이며 결과도 같다. PostgreSQL 검증: 두 쿼리 모두 '이름', '급여' 컬럼명으로 동일한 결과 반환 확인. (자료3 p.29~30, 자료2 제2절)",
      terms: [
        "**AS 키워드**: 컬럼/테이블에 별칭을 부여할 때 사용. 생략 가능",
        "**별칭 규칙**: (1) 컬럼명 바로 뒤에 위치 (2) AS 키워드 사용 가능(선택) (3) 공백/특수문자 포함 시 큰따옴표 필수",
        "**별칭 적용 시점**: SELECT 절 실행 시점에 확정. ORDER BY에서만 참조 가능"
      ],
      wrong: [
        "1. AS는 선택 사항이다. SQL-B도 완전히 유효한 SQL이다.",
        "2. AS를 사용해도 전혀 오류가 없다.",
        "3. (정답) AS는 생략 가능하므로 두 SQL의 결과는 완전히 동일하다.",
        "4. AS 생략 여부와 무관하게 별칭이 정상 적용된다."
      ],
      tip: "AS 생략 가능 = SQLD 단골 출제 포인트. '생략하면 원래 컬럼명' 함정에 주의."
    }
  },
  {
    id: 618,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 밑줄 친 부분에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        label: "SQL",
        content: "SELECT DISTINCT deptno, sal\nFROM emp\nORDER BY deptno, sal;"
      }
    ],
    choices: [
      "DISTINCT는 SELECT 절에서 가장 앞에 위치해야 한다.",
      "DISTINCT는 deptno 컬럼에만 단독 적용되어 deptno 중복만 제거한다.",
      "DISTINCT는 deptno와 sal의 조합이 중복인 행을 제거한다.",
      "DISTINCT를 사용하면 ALL을 사용한 것과 반대로 중복이 제거된다."
    ],
    ans: 2,
    src: "자료3 p.29~30",
    exp: {
      reason: "DISTINCT는 SELECT 뒤에 단 한 번만 쓸 수 있으며, 이후에 나열된 모든 컬럼의 조합에 대해 중복을 제거한다. 'SELECT DISTINCT deptno, sal'은 (deptno, sal) 쌍이 같은 행을 제거하는 것이지 deptno만 중복 제거하는 것이 아니다. PostgreSQL 검증: DISTINCT deptno, sal 결과로 (10,2500), (10,3000), (20,2000), (30,1500), (NULL,1500) 5행 확인. (자료3 p.29~30)",
      terms: [
        "**DISTINCT 적용 범위**: 뒤에 오는 모든 컬럼 조합. 첫 번째 컬럼에만 적용되지 않음",
        "**DISTINCT 위치 제약**: SELECT 바로 뒤 첫 위치. 중간 컬럼에 개별 적용 불가",
        "**ALL**: 중복 포함(기본값). DISTINCT의 반대 키워드"
      ],
      wrong: [
        "1. DISTINCT는 SELECT 절 가장 앞(첫 번째 위치)에 놓아야 한다. 맞는 설명이다.",
        "2. (정답) DISTINCT는 deptno 하나에만 적용되는 것이 아니라 (deptno, sal) 전체 조합에 적용된다.",
        "3. (deptno, sal) 조합 기준으로 중복을 제거한다는 설명이 맞다.",
        "4. DISTINCT는 중복 제거, ALL은 중복 포함으로 반대 동작이 맞다."
      ],
      tip: "DISTINCT는 '첫 컬럼만' 중복 제거가 아니라 '모든 컬럼 조합' 기준 중복 제거."
    }
  },
  {
    id: 619,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: false,
    q: "다음 중 별칭(ALIAS) 사용이 올바른 SQL로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "SELECT ename AS '사원이름' FROM emp;",
      "SELECT ename \"사원 이름\" FROM emp;",
      "SELECT ename AS [사원이름] FROM emp;",
      "SELECT AS ename 사원이름 FROM emp;"
    ],
    ans: 2,
    src: "자료3 p.29~30",
    exp: {
      reason: "별칭에 공백이나 특수문자가 포함될 경우 큰따옴표(\")를 사용해야 한다. 작은따옴표(')는 문자열 리터럴에 사용되므로 별칭으로 쓰면 오류가 발생한다. 대괄호([])는 SQL Server 방언이며 표준이 아니다. PostgreSQL 검증: SELECT ename '사원이름' → 구문 오류, SELECT ename \"사원 이름\" → 정상 실행 확인. (자료3 p.29~30, 자료2 제2절)",
      terms: [
        "**큰따옴표 별칭**: 공백/특수문자 포함 별칭, 대소문자 구분 별칭에 사용",
        "**작은따옴표**: 문자열 리터럴 전용. 별칭에 사용하면 구문 오류",
        "**AS 생략 가능**: 컬럼명 뒤에 바로 별칭을 적어도 유효"
      ],
      wrong: [
        "1. 작은따옴표로 별칭을 감싸면 문자열 리터럴로 해석되어 구문 오류가 발생한다.",
        "2. (정답) 큰따옴표를 사용하면 공백 포함 별칭도 유효하다. AS도 생략 가능하다.",
        "3. 대괄호는 SQL Server 전용 표기법이며 표준 SQL과 Oracle에서는 오류다.",
        "4. AS는 컬럼명 뒤에 위치해야 한다. AS가 컬럼명 앞에 오면 구문 오류다."
      ],
      tip: "별칭 따옴표: 큰따옴표(\") = 별칭 OK, 작은따옴표(') = 문자열 리터럴 → 별칭에 사용 금지."
    }
  },

  // ============================================================
  // 토픽 62: FROM 절 특성 (Q620~Q622) - 3문항, 코드 없음
  // 자료3 p.30, p.40 / 자료2 제2절
  // ============================================================
  {
    id: 620,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: false,
    q: "다음 중 FROM 절에 두 테이블을 나열하면서 WHERE 절에 조인 조건을 지정하지 않았을 때 발생하는 결과로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "두 테이블 중 첫 번째 테이블의 데이터만 반환된다.",
      "SQL 오류가 발생하여 실행이 중단된다.",
      "두 테이블의 모든 행을 조합한 카타시안 곱(Cartesian Product)이 반환된다.",
      "두 테이블에서 동일한 컬럼명을 기준으로 자동 조인이 수행된다."
    ],
    ans: 3,
    src: "자료3 p.30",
    exp: {
      reason: "FROM 절에 두 테이블을 나열했을 때 조인 조건이 없으면 두 테이블의 모든 행 조합인 카타시안 곱(Cartesian Product)이 발생한다. A 테이블 6행, B 테이블 4행이면 6 × 4 = 24행이 반환된다. PostgreSQL 검증: SELECT COUNT(*) FROM emp, dept → 24행 확인. (자료3 p.30)",
      terms: [
        "**카타시안 곱(Cartesian Product)**: 조인 조건 없이 두 테이블을 FROM에 나열할 때 발생. 행 수 = A행 수 × B행 수",
        "**CROSS JOIN**: 카타시안 곱을 명시적으로 표현하는 JOIN 구문",
        "**조인 조건 필수성**: 의도하지 않은 카타시안 곱은 데이터 폭발을 유발하므로 WHERE/ON에 조건 필수"
      ],
      wrong: [
        "1. 첫 번째 테이블만 반환되는 것이 아니라 두 테이블 전체 조합이 반환된다.",
        "2. 조인 조건 없이 두 테이블을 FROM에 나열해도 SQL 오류는 발생하지 않는다.",
        "3. (정답) 조인 조건이 없으면 카타시안 곱이 발생하여 모든 행 조합이 반환된다.",
        "4. 자동으로 동일 컬럼 기준 조인이 발생하는 것은 NATURAL JOIN 구문에서만 해당된다."
      ],
      tip: "FROM A, B → 조인 조건 없음 = 카타시안 곱. m행 × n행 = m×n행 반환."
    }
  },
  {
    id: 621,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: false,
    q: "다음 중 Oracle의 DUAL 테이블에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "DUAL 테이블은 Oracle이 제공하는 가상(의사) 테이블로 FROM 절이 필수일 때 사용한다.",
      "DUAL 테이블은 항상 1행 1열('X' 값)로 구성되어 있다.",
      "함수의 결과나 상수 조회 시 FROM 절에 DUAL을 사용할 수 있다.",
      "SQL Server에서도 DUAL 테이블을 동일하게 지원하므로 이식성이 보장된다."
    ],
    ans: 4,
    src: "자료3 p.30, p.40",
    exp: {
      reason: "DUAL 테이블은 Oracle 고유의 가상 테이블이다. SQL Server는 FROM 절 없이 SELECT 1+1; 형태로 바로 계산이 가능하므로 DUAL 테이블이 존재하지 않는다. Oracle 문법을 SQL Server에 그대로 옮기면 오류가 발생한다. (자료3 p.30, p.40)",
      terms: [
        "**DUAL**: Oracle 내장 1행 1열 가상 테이블. SYS 소유, 모든 사용자 조회 가능",
        "**사용 목적**: Oracle에서 FROM 절 생략 불가 시 사용 (예: SELECT SYSDATE FROM DUAL)",
        "**SQL Server**: FROM 절 없이 SELECT GETDATE() 형태로 직접 조회 가능. DUAL 불필요"
      ],
      wrong: [
        "1. DUAL은 Oracle의 가상 테이블로 FROM이 필수인 상황에 사용한다. 맞는 설명이다.",
        "2. DUAL은 항상 1행 1열('X')로 구성된다. 맞는 설명이다.",
        "3. SYSDATE, 산술식, 함수 결과 등 조회 시 FROM DUAL을 사용한다. 맞는 설명이다.",
        "4. (정답) DUAL은 Oracle 전용이다. SQL Server는 DUAL을 지원하지 않으므로 이식성이 보장되지 않는다."
      ],
      tip: "DUAL = Oracle 전용. SQL Server는 FROM 없이 SELECT 가능. DBMS 간 이식성 질문에 단골 등장."
    }
  },
  {
    id: 622,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "하",
    has_code: false,
    q: "emp 테이블에 6행, dept 테이블에 4행이 있을 때, 다음 SQL의 결과 행 수로 가장 적절한 것은?\n\nSELECT * FROM emp, dept;",
    blocks: null,
    choices: [
      "6행",
      "10행",
      "24행",
      "오류 발생"
    ],
    ans: 3,
    src: "자료3 p.30",
    exp: {
      reason: "WHERE 절에 조인 조건이 없으므로 카타시안 곱이 발생한다. 카타시안 곱의 결과 행 수는 두 테이블 행 수의 곱이다. emp(6행) × dept(4행) = 24행. PostgreSQL 검증: SELECT COUNT(*) FROM emp, dept → 24 확인. (자료3 p.30)",
      terms: [
        "**카타시안 곱 행 수 계산**: A테이블 행 수 × B테이블 행 수",
        "**카타시안 곱 컬럼 수**: A컬럼 수 + B컬럼 수",
        "**CROSS JOIN**: 카타시안 곱을 명시하는 표준 SQL 구문. 동일 결과"
      ],
      wrong: [
        "1. 6행은 emp 테이블 단독 조회 결과다. 조인 시 행이 곱해진다.",
        "2. 10행은 6+4로 잘못 더한 계산이다. 카타시안 곱은 곱셈이다.",
        "3. (정답) 카타시안 곱 6 × 4 = 24행이 반환된다.",
        "4. 조인 조건 없는 다중 테이블 조회는 오류가 아니라 카타시안 곱을 반환한다."
      ],
      tip: "카타시안 곱 = 행 수의 곱. '더하기' 함정 주의. 3개 테이블이면 a×b×c."
    }
  },

  // ============================================================
  // 토픽 63: WHERE 절 사용 규칙 (Q623~Q625) - 3문항, 코드 없음
  // 자료3 p.37 / 자료2 참고
  // ============================================================
  {
    id: 623,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: false,
    q: "다음 중 WHERE 절에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "WHERE 절은 FROM 절 이후 실행되어 조건에 맞는 행만 남긴다.",
      "WHERE 절에는 SUM, COUNT와 같은 집계함수를 사용할 수 없다.",
      "WHERE 절에서 집계 조건을 사용하려면 HAVING 절로 대체해야 한다.",
      "WHERE 절에서 AVG 함수를 사용하면 경고 메시지만 출력되고 실행은 완료된다."
    ],
    ans: 4,
    src: "자료3 p.37",
    exp: {
      reason: "WHERE 절에 집계함수(AVG, SUM, COUNT 등)를 사용하면 경고가 아닌 오류(에러)가 발생하여 SQL 실행이 중단된다. 집계함수 조건은 HAVING 절에서만 사용할 수 있다. PostgreSQL 검증: SELECT ename FROM emp WHERE sal > AVG(sal) → 'aggregate functions are not allowed in WHERE' 오류 발생 확인. (자료3 p.37, 자료2 참고)",
      terms: [
        "**WHERE 절 집계함수 금지**: WHERE는 GROUP BY 이전에 실행되므로 그룹 집계가 불가능",
        "**HAVING 절**: GROUP BY 이후 실행. 집계함수 조건 가능",
        "**WHERE vs HAVING 구분**: WHERE = 행 단위 조건, HAVING = 그룹 단위 조건"
      ],
      wrong: [
        "1. WHERE 절은 FROM 이후, GROUP BY 이전에 행을 필터링한다. 맞는 설명이다.",
        "2. WHERE 절에는 SUM, COUNT 등 집계함수를 사용할 수 없다. 맞는 설명이다.",
        "3. 집계 조건은 HAVING 절에서 처리해야 한다. 맞는 설명이다.",
        "4. (정답) 경고가 아니라 오류가 발생하여 실행이 중단된다."
      ],
      tip: "WHERE에 집계함수 = 오류(Error), 경고(Warning) 아님. HAVING에서만 집계함수 조건 가능."
    }
  },
  {
    id: 624,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: false,
    q: "다음 중 NULL 값 비교에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "WHERE comm = NULL 조건은 comm이 NULL인 행을 정상적으로 반환한다.",
      "WHERE comm != NULL 조건은 comm이 NULL이 아닌 행을 정상적으로 반환한다.",
      "NULL은 비교 연산자(=, !=, >, <)로 비교하면 항상 UNKNOWN을 반환하므로 조건이 성립하지 않는다.",
      "NULL 비교 시 = NULL과 IS NULL은 동일한 결과를 반환한다."
    ],
    ans: 3,
    src: "자료3 p.37",
    exp: {
      reason: "NULL은 '알 수 없는 값'이므로 비교 연산자(=, !=, >, <)로 비교하면 결과가 항상 UNKNOWN(알 수 없음)이 된다. UNKNOWN은 조건이 TRUE로 평가되지 않으므로 해당 행은 결과에 포함되지 않는다. NULL 비교는 반드시 IS NULL 또는 IS NOT NULL을 사용해야 한다. PostgreSQL 검증: WHERE comm = NULL → 0행, WHERE comm IS NULL → 4행 확인. (자료3 p.37)",
      terms: [
        "**NULL의 특성**: 아직 정의되지 않은 값. 0이나 빈 문자열('')과 다름",
        "**NULL 비교 결과**: = NULL, != NULL 등 비교 연산 → 항상 UNKNOWN 반환",
        "**IS NULL / IS NOT NULL**: NULL 여부를 확인하는 유일한 올바른 방법"
      ],
      wrong: [
        "1. = NULL은 UNKNOWN을 반환하므로 조건이 성립하지 않아 0행이 반환된다.",
        "2. != NULL도 UNKNOWN을 반환하므로 NULL이 아닌 행도 반환되지 않는다.",
        "3. (정답) NULL과의 모든 비교 연산은 UNKNOWN을 반환하여 조건이 성립하지 않는다.",
        "4. = NULL과 IS NULL은 다르다. = NULL은 0행, IS NULL은 NULL 행을 올바르게 반환한다."
      ],
      tip: "NULL 비교: = NULL → UNKNOWN(0행). IS NULL → 정상 동작. SQLD 필수 암기."
    }
  },
  {
    id: 625,
    subj: 2,
    topic: "2-B",
    topic_name: "SELECT 문 기본 구조",
    diff: "중",
    has_code: false,
    q: "다음 중 WHERE 절의 올바른 사용법에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "WHERE 절에서 NULL 여부를 확인할 때는 'WHERE 컬럼 = NULL'과 같이 등호를 사용한다.",
      "WHERE 절에서 SUM 함수로 합계 조건을 지정하면 자동으로 HAVING 절로 변환되어 실행된다.",
      "WHERE 절에서 NULL이 아닌 행을 조회하려면 'WHERE 컬럼 IS NOT NULL'을 사용한다.",
      "WHERE 절과 HAVING 절은 실행 순서가 동일하므로 어느 절에서 집계함수를 사용해도 결과가 같다."
    ],
    ans: 3,
    src: "자료3 p.37",
    exp: {
      reason: "NULL이 아닌 행을 조회할 때는 'WHERE 컬럼 IS NOT NULL'을 사용해야 한다. '!= NULL' 또는 '<> NULL'은 항상 UNKNOWN을 반환하여 결과가 없다. PostgreSQL 검증: WHERE comm IS NOT NULL → LEE(500), CHOI(300) 2행 정상 반환, WHERE comm != NULL → 0행 확인. (자료3 p.37)",
      terms: [
        "**IS NOT NULL**: NULL이 아닌 값을 가진 행 조회. 유일한 올바른 방법",
        "**!= NULL / <> NULL**: UNKNOWN 반환 → 0행. 사용 불가",
        "**WHERE vs HAVING 차이**: WHERE는 집계함수 사용 불가, HAVING은 가능. 자동 변환 없음"
      ],
      wrong: [
        "1. = NULL은 UNKNOWN을 반환하여 조건이 성립하지 않는다. IS NULL을 사용해야 한다.",
        "2. WHERE에서 SUM을 쓰면 오류가 발생한다. 자동으로 HAVING으로 변환되지 않는다.",
        "3. (정답) NULL이 아닌 행 조회에는 IS NOT NULL을 사용해야 한다.",
        "4. WHERE와 HAVING은 실행 순서가 다르며 집계함수 사용 여부도 다르다. 결과가 달라질 수 있다."
      ],
      tip: "NULL 관련 WHERE 절 정리: IS NULL(NULL인 것), IS NOT NULL(NULL 아닌 것). '= NULL', '!= NULL' 모두 UNKNOWN."
    }
  }
];

module.exports = b2Part1;

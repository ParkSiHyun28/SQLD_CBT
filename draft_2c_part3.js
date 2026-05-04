// 2-C Part 3: Q125~Q135 (11문항)
// NULL 처리 잔여(NULLIF/COALESCE/ISNULL) + DECODE + CASE + 종합
// 자료3 p.35~36, 자료4 p.3 기반. 정답은 모두 자료에 명시된 내용만 사용.
// CASE는 PostgreSQL 14로 직접 검증, DECODE는 자료 인용(Oracle 전용).
const c2Part3 = [
  // ============================================================
  // 토픽 74: NULL 처리 함수 잔여 3문항 (Q125~Q127)
  // ============================================================

  // ---- Q125: NULLIF 결과 추적 ----
  {
    id: 125,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T 테이블]",
        headers: ["A", "B"],
        rows: [
          [10, 10],
          [20, 30],
          [null, 10],
          [40, null]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT A, B, NULLIF(A, B) AS R FROM T;"
      }
    ],
    choices: [
      "(10,10,NULL), (20,30,20), (NULL,10,NULL), (40,NULL,40)",
      "(10,10,10), (20,30,NULL), (NULL,10,NULL), (40,NULL,NULL)",
      "(10,10,NULL), (20,30,30), (NULL,10,10), (40,NULL,NULL)",
      "(10,10,0), (20,30,20), (NULL,10,NULL), (40,NULL,40)"
    ],
    ans: 1,
    src: "자료3 p.35, 자료4 p.3",
    exp: {
      reason: "NULLIF(A,B)는 A=B면 NULL, 다르면 A를 반환. 1행: 10=10이므로 NULL. 2행: 20≠30이므로 20. 3행: A가 NULL이라 비교 결과 NULL → NULL. 4행: 40≠NULL이라 NULL이 아닌 40 반환. PostgreSQL 검증 완료.",
      terms: [
        "**NULLIF(A, B)**: A=B면 NULL 반환, A≠B면 A 반환",
        "**NULL과의 비교**: NULL = 어떤 값과도 같다고 판정 안 됨. 결과 unknown → NULL이 아닌 쪽 반환",
        "**활용**: 0으로 나누기 방지(`X / NULLIF(Y, 0)`), 의미 없는 값을 NULL로 치환할 때 사용"
      ],
      wrong: [
        "1. (정답)",
        "2. NULLIF 동작을 반대로 본 경우. A=B면 NULL이 반환되어야 한다.",
        "3. NULLIF가 B를 반환한다고 본 경우. NULLIF는 A를 반환한다.",
        "4. A=B일 때 0을 반환한다고 본 경우. NULL이 반환된다."
      ],
      tip: "NULLIF는 같으면 NULL, 다르면 첫째 인수. 'NULL IF equal'로 외우기."
    }
  },

  // ---- Q126: COALESCE 다중 인수 ----
  {
    id: 126,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T 테이블]",
        headers: ["C1", "C2", "C3", "C4"],
        rows: [
          [null, null, 30, 40],
          [null, 20, null, 40],
          [null, null, null, null],
          [10, 20, 30, 40]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT COALESCE(C1, C2, C3, C4) AS R FROM T;"
      }
    ],
    choices: [
      "30, 20, NULL, 10",
      "30, 20, 0, 10",
      "40, 40, NULL, 40",
      "NULL, NULL, NULL, 10"
    ],
    ans: 1,
    src: "자료3 p.35, 자료4 p.3",
    exp: {
      reason: "COALESCE는 인수들 중 가장 처음으로 NULL이 아닌 값을 반환. 모두 NULL이면 NULL. 1행: C1=NULL,C2=NULL,C3=30 → 30. 2행: C1=NULL,C2=20 → 20. 3행: 모두 NULL → NULL. 4행: C1=10 → 10. PostgreSQL 검증 완료.",
      terms: [
        "**COALESCE(a, b, c, …)**: 인수들 중 처음으로 NULL이 아닌 값을 반환. 모두 NULL이면 NULL",
        "**NVL과의 차이**: NVL은 인수가 정확히 2개. COALESCE는 인수 개수 제한 없음(2개 이상)",
        "**표준 SQL**: COALESCE는 ANSI SQL 표준 함수로 Oracle/SQL Server/PostgreSQL 모두 지원"
      ],
      wrong: [
        "1. (정답)",
        "2. 모두 NULL일 때 0을 반환한다고 본 경우. 모두 NULL이면 NULL이 반환된다.",
        "3. 마지막 인수를 반환한다고 본 경우. COALESCE는 처음으로 NULL이 아닌 값을 반환한다.",
        "4. NULL이 하나라도 있으면 NULL이라고 본 경우. COALESCE는 비-NULL을 찾는 함수다."
      ],
      tip: "COALESCE = '처음 등장하는 비-NULL'. 모두 NULL이면 결과도 NULL."
    }
  },

  // ---- Q127: ISNULL (SQL Server) ----
  {
    id: 127,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 NULL 처리 함수에 대한 설명으로 옳지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: "[SQL Server / Oracle]",
        lang: "sql",
        content: "-- (가) ISNULL(SAL, 0)         -- SQL Server\n-- (나) NVL(SAL, 0)            -- Oracle\n-- (다) COALESCE(SAL, 0)       -- 표준 SQL\n-- (라) NVL2(SAL, SAL, 0)      -- Oracle"
      }
    ],
    choices: [
      "(가) ISNULL은 SQL Server 전용 함수로 첫째 인수가 NULL이면 둘째 인수를 반환한다.",
      "(나) NVL은 Oracle 함수이며 ISNULL과 동일한 동작을 한다.",
      "(다) COALESCE는 표준 SQL 함수로 ISNULL/NVL과 동일한 결과를 만들 수 있다.",
      "(라) NVL2(SAL, SAL, 0)은 SAL이 NULL일 때 SAL을 반환하고 NULL이 아닐 때 0을 반환한다."
    ],
    ans: 4,
    src: "자료3 p.35, 자료4 p.3",
    exp: {
      reason: "NVL2(a, b, c)는 a가 NULL이 '아니면' b를 반환하고 NULL이면 c를 반환한다. 따라서 NVL2(SAL, SAL, 0)은 SAL이 NULL이 아니면 SAL, NULL이면 0을 반환하므로 ISNULL/NVL과 같은 효과를 낸다. 4번 보기는 인수 동작을 반대로 설명했다.",
      terms: [
        "**ISNULL(a, b)**: SQL Server 전용. a가 NULL이면 b, 아니면 a 반환",
        "**NVL(a, b)**: Oracle 전용. ISNULL과 동일 동작. 인수 2개",
        "**NVL2(a, b, c)**: Oracle 전용. a가 NULL이 '아니면' b, NULL이면 c (NVL과 인수 의미 반대)",
        "**COALESCE**: 표준 SQL. 인수 다수 가능하며 처음으로 NULL이 아닌 값 반환"
      ],
      wrong: [
        "1. ISNULL은 실제 SQL Server 전용 함수이며 동작 설명이 정확하다. (자료3 p.35)",
        "2. NVL은 Oracle에서 ISNULL과 동일한 의미로 사용된다.",
        "3. COALESCE(SAL, 0)은 ISNULL(SAL, 0), NVL(SAL, 0)과 같은 결과를 낸다.",
        "4. (정답) NVL2 인수 의미가 반대. NULL이 아닐 때 b, NULL일 때 c."
      ],
      tip: "NVL2는 NVL과 인수 의미가 정반대. 'NVL2 = NULL이 아닐 때 둘째'."
    }
  },

  // ============================================================
  // 토픽 75: DECODE 함수 (Q128~Q130)
  // ============================================================

  // ---- Q128: DECODE 결과 추적 (기본) ----
  {
    id: 128,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "Oracle에서 다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[STUDENT 테이블]",
        headers: ["ID", "GRADE"],
        rows: [
          [1, "A"],
          [2, "B"],
          [3, "C"],
          [4, "D"],
          [5, null]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ID,\n       DECODE(GRADE, 'A', 100, 'B', 80, 'C', 60, 0) AS R\nFROM STUDENT\nORDER BY ID;"
      }
    ],
    choices: [
      "100, 80, 60, 0, 0",
      "100, 80, 60, NULL, NULL",
      "100, 80, 60, 0, NULL",
      "A→100, B→80, C→60, D→NULL, NULL→0"
    ],
    ans: 1,
    src: "자료3 p.36, 자료4 p.3",
    exp: {
      reason: "DECODE(대상, 값1, 리턴1, 값2, 리턴2, ..., ELSE)에서 ELSE가 0으로 명시되어 있으므로 'A'→100, 'B'→80, 'C'→60, 'D'→0(ELSE), NULL→0(ELSE). DECODE는 NULL=NULL을 매칭으로 보지만 본 SQL은 NULL을 값 목록에 두지 않았으므로 NULL도 ELSE로 떨어진다. 등가 CASE를 PostgreSQL로 검증 완료.",
      terms: [
        "**DECODE(대상, 값1, 리턴1, 값2, 리턴2, …, ELSE)**: 대상이 값1과 같으면 리턴1, 값2와 같으면 리턴2, … 모두 안 맞으면 ELSE",
        "**ELSE 생략**: ELSE 값을 생략하면 모든 매칭 실패 시 NULL 반환 (자료3 p.36)",
        "**Oracle 전용**: DECODE는 Oracle 고유 함수. SQL Server/PostgreSQL은 미지원이므로 CASE로 변환 필요"
      ],
      wrong: [
        "1. (정답)",
        "2. ELSE가 명시되어 있는데 NULL을 반환한다고 본 경우. ELSE 0이 우선.",
        "3. NULL 인수만 ELSE에서 빠진다고 본 경우. NULL도 ELSE로 떨어진다.",
        "4. 결과를 매칭 표 형태로 본 경우. 실제 출력은 RESULT 컬럼 값들이다."
      ],
      tip: "DECODE는 매칭 안 되면 ELSE, ELSE 생략 시 NULL. NULL도 매칭 못하면 ELSE로."
    }
  },

  // ---- Q129: DECODE의 NULL 처리 특이점 ----
  {
    id: 129,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "Oracle에서 다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T 테이블]",
        headers: ["A"],
        rows: [
          [10],
          [null],
          [20]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT A,\n       DECODE(A, NULL, 'IS NULL', 'NOT NULL') AS R\nFROM T;"
      }
    ],
    choices: [
      "10→'NOT NULL', NULL→'NOT NULL', 20→'NOT NULL'",
      "10→'NOT NULL', NULL→'IS NULL', 20→'NOT NULL'",
      "10→'IS NULL', NULL→'IS NULL', 20→'IS NULL'",
      "10→NULL, NULL→NULL, 20→NULL"
    ],
    ans: 2,
    src: "자료3 p.36",
    exp: {
      reason: "DECODE는 일반 비교 연산자(=)와 달리 NULL=NULL을 같은 값으로 처리하는 특이점이 있다. 따라서 A가 NULL인 행은 첫째 비교(NULL과 매칭)에서 매칭되어 'IS NULL'을 반환하고, A가 10/20인 행은 매칭 실패로 ELSE 'NOT NULL'을 반환한다. (자료3 p.36)",
      terms: [
        "**DECODE의 NULL 비교**: WHERE 절의 `=` 연산자와 달리 DECODE는 NULL=NULL을 TRUE로 처리",
        "**일반 = 연산자**: NULL과 어떤 값을 비교해도 결과는 NULL(unknown)이라 행이 매칭되지 않음",
        "**등가 CASE 변환**: `CASE WHEN A IS NULL THEN 'IS NULL' ELSE 'NOT NULL' END` (Searched CASE 형태로 IS NULL 사용 필요)"
      ],
      wrong: [
        "1. DECODE의 NULL 매칭 특성을 모른 경우. NULL인 행도 첫째 매칭이 성립한다.",
        "2. (정답)",
        "3. 모든 행이 첫째 매칭에 걸린다고 본 경우. 10/20은 NULL과 다르므로 ELSE로 떨어진다.",
        "4. ELSE가 없다고 본 경우. ELSE에 'NOT NULL'이 명시되어 있다."
      ],
      tip: "DECODE는 NULL=NULL을 TRUE로 처리(특이점). 일반 =와 다름."
    }
  },

  // ---- Q130: DECODE → CASE 변환 ----
  {
    id: 130,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 Oracle DECODE 구문과 동일한 결과를 반환하는 표준 SQL CASE 식으로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: "[원본 (Oracle DECODE)]",
        lang: "sql",
        content: "SELECT NAME,\n       DECODE(DEPT, 10, 'SALES', 20, 'IT', 'ETC') AS DNAME\nFROM EMP;"
      }
    ],
    choices: [
      "CASE DEPT WHEN 10 THEN 'SALES' WHEN 20 THEN 'IT' ELSE 'ETC' END",
      "CASE WHEN DEPT = 10 OR DEPT = 20 THEN 'SALES' ELSE 'ETC' END",
      "CASE DEPT WHEN 10 THEN 'SALES' WHEN 20 THEN 'IT' END",
      "CASE WHEN DEPT IN (10, 20) THEN 'SALES' WHEN DEPT = 'IT' THEN 20 ELSE 'ETC' END"
    ],
    ans: 1,
    src: "자료3 p.36, 자료4 p.3",
    exp: {
      reason: "DECODE(대상, 값1, 리턴1, 값2, 리턴2, ELSE)는 Simple CASE로 1:1 변환된다. 대상→CASE 표현식, 각 값→WHEN, 각 리턴→THEN, 마지막 ELSE→ELSE. PostgreSQL로 등가 결과 검증 완료.",
      terms: [
        "**Simple CASE**: `CASE 대상 WHEN 값1 THEN 결과1 WHEN 값2 THEN 결과2 ELSE 기본 END`. DECODE와 1:1 대응",
        "**Searched CASE**: `CASE WHEN 조건1 THEN 결과1 ... END`. 범위/복합 조건 가능",
        "**자료 인용 (자료4 p.3)**: 'CASE 표현식은 ORACLE의 DECODE() 함수와 같은 기능을 가짐'"
      ],
      wrong: [
        "1. (정답)",
        "2. DEPT=10과 DEPT=20을 같은 결과로 묶어버린 경우. 원본은 둘이 다른 결과를 낸다.",
        "3. ELSE가 누락된 경우. 'ETC'가 ELSE로 들어가야 ETC 매칭 실패 시 NULL이 아니라 'ETC'가 나온다.",
        "4. THEN/WHEN 순서가 뒤섞이고 자료형이 맞지 않는 잘못된 구문."
      ],
      tip: "DECODE(대상, 값, 리턴, …, ELSE) ↔ Simple CASE WHEN. ELSE 빠뜨리지 말기."
    }
  },

  // ============================================================
  // 토픽 76: CASE 표현식 (Q131~Q134, 4문항)
  // ============================================================

  // ---- Q131: CASE Simple 결과 추적 ----
  {
    id: 131,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "JOB"],
        rows: [
          [1, "Manager"],
          [2, "Developer"],
          [3, "Sales"],
          [4, "Clerk"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO, JOB,\n       CASE JOB\n           WHEN 'Manager'   THEN 'Mgmt'\n           WHEN 'Developer' THEN 'Eng'\n           WHEN 'Sales'     THEN 'Biz'\n           ELSE 'General'\n       END AS DEPT\nFROM EMP\nORDER BY EMPNO;"
      }
    ],
    choices: [
      "Mgmt, Eng, Biz, General",
      "Mgmt, Eng, Biz, NULL",
      "Mgmt, Eng, Biz, Clerk",
      "Manager, Developer, Sales, General"
    ],
    ans: 1,
    src: "자료3 p.36, 자료4 p.3",
    exp: {
      reason: "Simple CASE는 표현식(JOB)이 각 WHEN의 값과 일치하는지 평가. 'Manager'→'Mgmt', 'Developer'→'Eng', 'Sales'→'Biz'. 'Clerk'은 어느 WHEN에도 매칭 안 되므로 ELSE 'General'. PostgreSQL 검증 완료.",
      terms: [
        "**Simple CASE**: `CASE 표현식 WHEN 값 THEN 결과 ... ELSE 기본 END`. 표현식과 값의 = 비교",
        "**ELSE 절**: 모든 WHEN 매칭 실패 시 반환. 생략 시 NULL",
        "**평가 순서**: 위에서 아래로 첫 매칭에서 멈춤"
      ],
      wrong: [
        "1. (정답)",
        "2. ELSE가 없다고 본 경우. ELSE 'General'이 명시되어 있다.",
        "3. ELSE가 원본 값을 그대로 반환한다고 본 경우. ELSE 'General'이 출력된다.",
        "4. CASE를 적용하지 않은 결과. JOB 값이 그대로 나오는 게 아니라 매핑된 DEPT가 나온다."
      ],
      tip: "Simple CASE는 = 비교, 매칭 실패는 ELSE. ELSE 명시 시 그 값이 나옴."
    }
  },

  // ---- Q132: CASE Simple + NULL 매칭 함정 ----
  {
    id: 132,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T 테이블]",
        headers: ["ID", "GRADE"],
        rows: [
          [1, "A"],
          [2, "B"],
          [3, null],
          [4, "A"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ID, GRADE,\n       CASE GRADE\n           WHEN 'A' THEN 90\n           WHEN 'B' THEN 80\n           ELSE 0\n       END AS R\nFROM T\nORDER BY ID;"
      }
    ],
    choices: [
      "90, 80, 0, 90",
      "90, 80, NULL, 90",
      "90, 80, 0, 0",
      "A→90, B→80, NULL→NULL, A→90"
    ],
    ans: 1,
    src: "자료3 p.36",
    exp: {
      reason: "Simple CASE는 일반 = 비교를 사용하므로 GRADE가 NULL인 3행은 'A'와도 'B'와도 매칭 안 됨(NULL = 'A'는 unknown). 따라서 ELSE 0으로 떨어진다. 1행 'A'→90, 2행 'B'→80, 4행 'A'→90. PostgreSQL 검증 완료.",
      terms: [
        "**Simple CASE의 NULL**: 일반 = 비교라 NULL은 어떤 값과도 매칭 안 됨. DECODE와 다른 점",
        "**DECODE vs Simple CASE**: DECODE는 NULL=NULL 매칭 가능, Simple CASE는 매칭 불가",
        "**NULL 매칭 시**: Searched CASE의 `WHEN GRADE IS NULL THEN ...` 형태로 명시 필요"
      ],
      wrong: [
        "1. (정답)",
        "2. NULL 행이 NULL을 그대로 반환한다고 본 경우. ELSE 0이 적용된다.",
        "3. 4행도 ELSE에 떨어진다고 본 경우. 'A' 매칭으로 90이 정답.",
        "4. CASE를 적용하지 않은 매핑 표 형태. 실제 R 컬럼 값을 묻는 문제."
      ],
      tip: "Simple CASE는 = 비교라 NULL 매칭 불가. NULL 매칭은 Searched CASE의 IS NULL로."
    }
  },

  // ---- Q133: CASE Searched (범위 조건) ----
  {
    id: 133,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[STUDENT 테이블]",
        headers: ["NAME", "SCORE"],
        rows: [
          ["A", 95],
          ["B", 85],
          ["C", 75],
          ["D", 55]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT NAME, SCORE,\n       CASE\n           WHEN SCORE >= 90 THEN 'A'\n           WHEN SCORE >= 80 THEN 'B'\n           WHEN SCORE >= 70 THEN 'C'\n           ELSE 'F'\n       END AS GRADE\nFROM STUDENT\nORDER BY NAME;"
      }
    ],
    choices: [
      "A→A, B→B, C→C, D→F",
      "A→A, B→A, C→A, D→F",
      "A→A, B→B, C→C, D→C",
      "A→A, B→B, C→F, D→F"
    ],
    ans: 1,
    src: "자료3 p.36, 자료4 p.3",
    exp: {
      reason: "Searched CASE는 위에서 아래로 조건을 평가하여 처음 참인 분기를 채택. SCORE=95: 첫째 조건(>=90) 참 → 'A'. SCORE=85: 첫째 거짓, 둘째(>=80) 참 → 'B'. SCORE=75: 셋째(>=70) 참 → 'C'. SCORE=55: 모두 거짓 → ELSE 'F'. PostgreSQL 검증 완료.",
      terms: [
        "**Searched CASE**: `CASE WHEN 조건 THEN 결과 ... END`. 각 WHEN이 독립 불리언 조건",
        "**평가 순서**: 위에서 아래로 첫 참(TRUE)에서 멈춤. 아래 조건은 평가 안 함",
        "**Simple과의 차이**: Simple은 = 비교만 가능, Searched는 >, <, BETWEEN, IS NULL 등 모든 조건 사용"
      ],
      wrong: [
        "1. (정답)",
        "2. 첫째 조건 한 번만 평가된다고 본 경우. 매 행마다 처음부터 재평가된다.",
        "3. 마지막 매칭 조건이 채택된다고 본 경우. 첫 매칭에서 멈춘다.",
        "4. 75점이 70점 미만으로 처리된다고 본 경우. >= 70은 75를 포함한다."
      ],
      tip: "Searched CASE는 첫 참 조건에서 멈춤. 위→아래 순서대로 평가."
    }
  },

  // ---- Q134: CASE ELSE 누락 함정 ----
  {
    id: 134,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T 테이블]",
        headers: ["ID", "COL"],
        rows: [
          [1, "X"],
          [2, "Y"],
          [3, "Z"],
          [4, null]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ID, COL,\n       CASE COL\n           WHEN 'X' THEN 1\n           WHEN 'Y' THEN 2\n       END AS R\nFROM T\nORDER BY ID;"
      }
    ],
    choices: [
      "1, 2, NULL, NULL",
      "1, 2, 0, 0",
      "1, 2, NULL, 0",
      "오류 발생 (ELSE 누락은 문법 오류)"
    ],
    ans: 1,
    src: "자료3 p.36",
    exp: {
      reason: "CASE 표현식에서 ELSE를 생략하면 모든 WHEN에 매칭되지 않은 행은 NULL을 반환한다. 'Z'와 NULL 모두 'X'/'Y'와 매칭 안 되므로 NULL. ELSE 누락은 문법 오류가 아닌 합법 구문이다. PostgreSQL 검증 완료.",
      terms: [
        "**ELSE 누락 시 동작**: 모든 WHEN 매칭 실패 → NULL 반환 (자료3 p.36)",
        "**ELSE 누락은 합법**: 문법 오류 아님. 다만 의도하지 않은 NULL 발생 가능성 → 명시 권장",
        "**0으로 만들고 싶다면**: `ELSE 0` 명시 필요. 자동으로 0이 되지 않음"
      ],
      wrong: [
        "1. (정답)",
        "2. ELSE 누락 시 자동으로 0이 된다고 본 경우. NULL이 정답.",
        "3. NULL 컬럼만 0이 된다고 본 경우. 'Z'와 NULL 모두 NULL이 반환된다.",
        "4. ELSE 누락이 문법 오류라고 본 경우. 합법이며 NULL 반환."
      ],
      tip: "CASE에 ELSE 빠지면 매칭 실패 시 NULL. 단골 함정."
    }
  },

  // ============================================================
  // 보너스: 단일행 함수 종합 (Q135)
  // ============================================================

  // ---- Q135: NULL처리 + CASE 결합 종합 ----
  {
    id: 135,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "JOB", "SAL"],
        rows: [
          [1, "M", null],
          [2, "D", 5000],
          [3, "C", null],
          [4, null, 3000]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMPNO,\n       COALESCE(SAL, 0)\n       + CASE JOB\n             WHEN 'M' THEN 1000\n             WHEN 'D' THEN 500\n             ELSE 0\n         END AS TOTAL\nFROM EMP\nORDER BY EMPNO;"
      }
    ],
    choices: [
      "1000, 5500, 0, 3000",
      "NULL, 5500, NULL, 3000",
      "1000, 5500, 0, NULL",
      "1000, 5000, 0, 3000"
    ],
    ans: 1,
    src: "자료3 p.35~36, 자료4 p.3",
    exp: {
      reason: "각 행을 추적: (1) SAL=NULL→COALESCE 0, JOB='M'→1000, 합 1000. (2) SAL=5000, JOB='D'→500, 합 5500. (3) SAL=NULL→0, JOB='C'→ELSE 0, 합 0. (4) SAL=3000, JOB=NULL→Simple CASE는 NULL 매칭 불가→ELSE 0, 합 3000. PostgreSQL 검증 완료.",
      terms: [
        "**COALESCE(SAL, 0)**: SAL이 NULL이면 0, 아니면 SAL. 산술 연산에서 NULL 전파를 막는 패턴",
        "**Simple CASE의 NULL**: JOB이 NULL인 4행은 'M'/'D'와 매칭 안 됨 → ELSE 0",
        "**NULL 산술 함정**: NULL + 1000 = NULL이 되어버리므로 COALESCE로 사전 변환 필수"
      ],
      wrong: [
        "1. (정답)",
        "2. COALESCE 효과를 무시하고 NULL이 그대로 전파된다고 본 경우. COALESCE가 0으로 치환한다.",
        "3. JOB=NULL인 4행도 NULL이 전파된다고 본 경우. ELSE 0으로 떨어져 SAL 3000만 합산된다.",
        "4. JOB='D'에 보너스 500을 빠뜨린 경우. 5000+500=5500이 정답."
      ],
      tip: "NULL 산술은 COALESCE/NVL로 0 치환. Simple CASE는 NULL 매칭 못 하니 ELSE로."
    }
  }
];

module.exports = c2Part3;

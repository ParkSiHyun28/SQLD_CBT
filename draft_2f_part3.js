// 2-F Part 3: Q233~Q247 (LEFT/RIGHT/FULL OUTER JOIN, 15문항)
// 자료3 p.49~50 기반. 정답은 자료에 명시된 내용만 사용.
// PostgreSQL 검증: sqld_verify DB에서 직접 실행해 모든 행 수 확정.
// 시나리오:
//   A) EMP 4건(KIM/LEE/PARK/CHOI(NULL)), DEPT 3건(10/20/30) → INNER 3 / LEFT 4 / RIGHT 4 / FULL 5 / CROSS 12
//   B) BOOK_LIST 4건(b01~b04, PUB_ID 1/2/8/3), PUBLISHER 4건(1~4) → LEFT 4 / RIGHT 4 / FULL 5
//   C) STU 4건(LNO 100/200/NULL/300), LEC 3건(100/200/400) → INNER 2 / LEFT 4 / RIGHT 3 / FULL 5
//   D) A 3건(1/2/3), B 2건(4/5) 매칭 0건 → INNER 0 / LEFT 3 / RIGHT 2 / FULL 5
const f2Part3 = [
  // ============================================================
  // 토픽 94: LEFT OUTER JOIN (Q233~Q238) - 6문항
  // 분배: 결과 추적 3 / 정의 1 / Oracle(+) vs ANSI 변환 2
  // ============================================================
  {
    id: 233,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          [1, "KIM", 10],
          [2, "LEE", 10],
          [3, "PARK", 20],
          [4, "CHOI", null]
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
        content: "SELECT E.ENAME, D.DNAME\nFROM EMP E LEFT OUTER JOIN DEPT D\n  ON E.DEPTNO = D.DEPTNO;"
      }
    ],
    choices: ["4행", "3행", "5행", "12행"],
    ans: 1,
    src: "자료3 p.49",
    exp: {
      reason: "LEFT OUTER JOIN은 왼쪽(EMP) 테이블의 모든 행을 반환하고, 오른쪽(DEPT)에서 매칭되는 행을 붙인다. CHOI는 DEPTNO가 NULL이라 매칭 실패하지만 LEFT 기준이므로 결과에 남고 DNAME은 NULL로 채워진다. 4행. PostgreSQL 검증 완료. (자료3 p.49)",
      terms: [
        "**LEFT OUTER JOIN**: 왼쪽 테이블 전체 + 오른쪽에서 일치하는 행 (오른쪽 미매칭은 NULL)",
        "**왼쪽 기준**: 왼쪽 행 수가 결과 행 수의 하한선",
        "**NULL 조인 컬럼**: NULL은 어떤 값과도 매칭 안 됨, 단 LEFT 기준 행이라면 결과에 남음",
        "**OUTER 생략 가능**: `LEFT JOIN`도 동일"
      ],
      wrong: [
        "1. (정답) — EMP 4행 모두 출력, CHOI는 DNAME=NULL.",
        "2. 3행은 INNER JOIN 결과(KIM/LEE/PARK 매칭만).",
        "3. 5행은 FULL OUTER 결과(EMP 4건 + DEPT의 미매칭 HR).",
        "4. 12행은 CROSS JOIN 결과(4×3)."
      ],
      tip: "LEFT = 왼쪽 전체. NULL 조인 컬럼이라도 왼쪽 행이면 살아남는다."
    }
  },
  {
    id: 234,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[STU]",
        headers: ["SNO", "SNAME", "LNO"],
        rows: [
          [1, "A", 100],
          [2, "B", 200],
          [3, "C", null],
          [4, "D", 300]
        ]
      },
      {
        type: "table",
        title: "[LEC]",
        headers: ["LNO", "LNAME"],
        rows: [
          [100, "SQL"],
          [200, "DB"],
          [400, "OS"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT S.SNAME, L.LNAME\nFROM STU S LEFT JOIN LEC L\n  ON S.LNO = L.LNO;"
      }
    ],
    choices: ["2행", "3행", "4행", "5행"],
    ans: 3,
    src: "자료3 p.49",
    exp: {
      reason: "LEFT JOIN은 왼쪽 STU 4행 모두 결과에 남는다. A(100→SQL), B(200→DB)는 매칭. C(NULL)는 매칭 실패하지만 왼쪽 기준이라 LNAME=NULL로 남음. D(300)도 LEC에 300이 없어 매칭 실패하지만 LNAME=NULL로 남음. 따라서 4행. PostgreSQL 검증 완료. (자료3 p.49)",
      terms: [
        "**왼쪽 행 수 보존**: 미매칭 + NULL 조인 컬럼 모두 LEFT에서는 결과에 남음",
        "**오른쪽 NULL 채움**: 매칭 실패한 왼쪽 행의 오른쪽 컬럼은 NULL",
        "**INNER 결과는 2행**: A, B만 매칭 (C는 NULL, D는 매칭 없음)",
        "**RIGHT 결과는 3행**: LEC 3행 기준 (400은 STU에 없어 SNAME=NULL)"
      ],
      wrong: [
        "1. 2행은 INNER 결과(A, B만 매칭).",
        "2. 3행은 RIGHT JOIN 결과(LEC 3행 기준).",
        "3. (정답)",
        "4. 5행은 FULL OUTER 결과(STU 4 + LEC의 미매칭 400)."
      ],
      tip: "LEFT는 왼쪽 행 수만큼은 무조건 나온다. 매칭 실패해도 왼쪽 행이면 살아남는다."
    }
  },
  {
    id: 235,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[A]",
        headers: ["X"],
        rows: [[1], [2], [3]]
      },
      {
        type: "table",
        title: "[B]",
        headers: ["X"],
        rows: [[4], [5]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT A.X AS AX, B.X AS BX\nFROM A LEFT OUTER JOIN B\n  ON A.X = B.X;"
      }
    ],
    choices: [
      "0행 (매칭이 전혀 없으므로 빈 결과)",
      "2행 (B 테이블 행 수)",
      "3행 (A의 모든 행, BX는 모두 NULL)",
      "5행 (A 3행 + B 2행)"
    ],
    ans: 3,
    src: "자료3 p.49",
    exp: {
      reason: "두 테이블에 공통 X 값이 없어도 LEFT OUTER JOIN은 왼쪽(A) 3행을 모두 반환한다. 오른쪽(B)에서 매칭되는 행이 없으므로 BX는 모두 NULL로 채워진다. 결과는 (1, NULL), (2, NULL), (3, NULL)로 3행. PostgreSQL 검증 완료. (자료3 p.49)",
      terms: [
        "**매칭 0건이어도 LEFT는 왼쪽 행 수 유지**: 오른쪽 모두 NULL",
        "**INNER JOIN은 0행**: 매칭이 없으면 빈 결과",
        "**FULL OUTER는 5행**: A 3 + B 2 (양쪽 미매칭 모두 살림)",
        "**LEFT 행 수 공식**: |왼쪽| ≤ 결과 ≤ |왼쪽| × |오른쪽| (1:N 매칭 시 증가 가능)"
      ],
      wrong: [
        "1. INNER JOIN 결과(0행). LEFT는 매칭 없어도 왼쪽 살림.",
        "2. RIGHT JOIN 결과(2행).",
        "3. (정답)",
        "4. FULL OUTER JOIN 결과(5행)."
      ],
      tip: "매칭이 0건이어도 LEFT는 왼쪽 행을 살린다. 오른쪽 컬럼만 NULL."
    }
  },
  {
    id: 236,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "하",
    has_code: false,
    q: "다음 중 LEFT OUTER JOIN에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "왼쪽 테이블의 모든 행이 반환되며, 오른쪽 테이블에서는 결합 기준 컬럼값이 일치하는 행만 결합된다.",
      "오른쪽 테이블에서 일치하는 값이 없으면 해당 컬럼들은 NULL로 채워진다.",
      "ANSI 표준 문법에서 OUTER 키워드는 생략 가능하므로 `LEFT JOIN`만으로도 동일하게 동작한다.",
      "왼쪽 테이블에 NULL인 결합 컬럼 값이 있으면 그 행은 결과에서 제외된다."
    ],
    ans: 4,
    src: "자료3 p.49",
    exp: {
      reason: "LEFT OUTER JOIN은 왼쪽 테이블 기준이므로, 왼쪽의 결합 컬럼이 NULL이라도 그 행은 결과에 남는다(오른쪽 컬럼만 NULL로 채워짐). NULL이라 제외되는 것은 INNER JOIN의 동작이다. (자료3 p.49)",
      terms: [
        "**왼쪽 기준**: 왼쪽 테이블의 모든 행은 무조건 결과에 포함",
        "**NULL 조인 컬럼 처리**: NULL은 어떤 값과도 매칭 안 되지만, LEFT에서는 왼쪽 행이라 살아남음",
        "**OUTER 생략**: 자료3 p.49 명시 — `LEFT OUTER JOIN` = `LEFT JOIN`",
        "**오른쪽 NULL 채움**: 매칭 실패한 왼쪽 행의 오른쪽 컬럼들은 모두 NULL"
      ],
      wrong: [
        "1. LEFT OUTER JOIN의 정의 그대로(자료3 p.49).",
        "2. 자료3 p.49 명시 — '오른쪽 테이블에서 일치하는 값이 없으면 해당 부분이 NULL로 채워짐'.",
        "3. 자료3 p.49 명시 — 'OUTER는 생략 가능 (LEFT OUTER JOIN → LEFT JOIN)'.",
        "4. (정답) 왼쪽 NULL 행도 LEFT에서는 살아남음. INNER JOIN과 혼동한 함정."
      ],
      tip: "LEFT 기준 = 왼쪽 행은 무조건 살림. 왼쪽 조인 컬럼이 NULL이어도 결과에 남는다."
    }
  },
  {
    id: 237,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 [Oracle 전통 문법]의 SQL을 [ANSI 표준]으로 동일하게 변환한 것으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: "[Oracle]",
        lang: "sql",
        content: "SELECT B.BOOK_ID, B.BOOK_NAME, P.PUBLISHER_NAME\nFROM BOOK_LIST B, PUBLISHER P\nWHERE B.PUBLISHER_ID = P.PUBLISHER_ID(+);"
      }
    ],
    choices: [
      "SELECT B.BOOK_ID, B.BOOK_NAME, P.PUBLISHER_NAME\nFROM BOOK_LIST B LEFT OUTER JOIN PUBLISHER P\n  ON B.PUBLISHER_ID = P.PUBLISHER_ID;",
      "SELECT B.BOOK_ID, B.BOOK_NAME, P.PUBLISHER_NAME\nFROM BOOK_LIST B RIGHT OUTER JOIN PUBLISHER P\n  ON B.PUBLISHER_ID = P.PUBLISHER_ID;",
      "SELECT B.BOOK_ID, B.BOOK_NAME, P.PUBLISHER_NAME\nFROM BOOK_LIST B FULL OUTER JOIN PUBLISHER P\n  ON B.PUBLISHER_ID = P.PUBLISHER_ID;",
      "SELECT B.BOOK_ID, B.BOOK_NAME, P.PUBLISHER_NAME\nFROM BOOK_LIST B INNER JOIN PUBLISHER P\n  ON B.PUBLISHER_ID = P.PUBLISHER_ID;"
    ],
    ans: 1,
    src: "자료3 p.50",
    exp: {
      reason: "Oracle 전통 문법에서 (+)는 NULL을 받을(부족한) 쪽에 붙인다. `B.PUBLISHER_ID = P.PUBLISHER_ID(+)`는 P쪽이 부족분을 NULL로 받는다는 뜻이므로 B가 모두 나오고 P가 일치하는 것만 붙는 LEFT OUTER JOIN이다. 자료3 p.50의 LEFT OUTER JOIN 예시와 동일. (자료3 p.50)",
      terms: [
        "**Oracle (+) 위치 규칙**: NULL을 받을 쪽(부족한 쪽)에 (+) 붙임",
        "**LEFT OUTER 규칙**: `왼쪽 = 오른쪽(+)` → 왼쪽이 모두 나오고 오른쪽이 NULL 받음",
        "**RIGHT OUTER 규칙**: `왼쪽(+) = 오른쪽` → 오른쪽이 모두 나오고 왼쪽이 NULL 받음",
        "**ANSI 표준**: ON 절로 조인 조건 명시 (Oracle, SQL Server 모두 지원)"
      ],
      wrong: [
        "1. (정답) — (+)가 P에 있으므로 B 기준 LEFT OUTER JOIN.",
        "2. (+)가 P쪽에 있으므로 P가 NULL을 받는 쪽 → B 기준(LEFT). RIGHT는 정반대.",
        "3. FULL은 양쪽 모두 살리는 경우. Oracle (+)로는 양쪽 동시 표현 불가.",
        "4. INNER는 (+)가 없을 때. (+)는 OUTER 표현용."
      ],
      tip: "Oracle (+)는 NULL 받는 쪽에 붙인다. `=B(+)`면 A 기준 LEFT, `A(+)=`면 B 기준 RIGHT."
    }
  },
  {
    id: 238,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 [ANSI 표준] SQL을 [Oracle 전통 문법]으로 동일하게 변환한 것으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: "[ANSI]",
        lang: "sql",
        content: "SELECT E.ENAME, D.DNAME\nFROM EMP E LEFT OUTER JOIN DEPT D\n  ON E.DEPTNO = D.DEPTNO;"
      }
    ],
    choices: [
      "SELECT E.ENAME, D.DNAME\nFROM EMP E, DEPT D\nWHERE E.DEPTNO(+) = D.DEPTNO;",
      "SELECT E.ENAME, D.DNAME\nFROM EMP E, DEPT D\nWHERE E.DEPTNO = D.DEPTNO(+);",
      "SELECT E.ENAME, D.DNAME\nFROM EMP E, DEPT D\nWHERE E.DEPTNO(+) = D.DEPTNO(+);",
      "SELECT E.ENAME, D.DNAME\nFROM EMP E, DEPT D\nWHERE E.DEPTNO = D.DEPTNO;"
    ],
    ans: 2,
    src: "자료3 p.50",
    exp: {
      reason: "EMP가 LEFT(왼쪽 기준)이면 EMP 모두 나오고 DEPT가 부족분을 NULL로 받는다. Oracle (+)는 NULL 받을 쪽에 붙이므로 D.DEPTNO(+) 위치가 정답. (자료3 p.50)",
      terms: [
        "**LEFT 변환 공식**: `A LEFT JOIN B ON A.x=B.x` ↔ `WHERE A.x = B.x(+)`",
        "**(+) 양쪽 동시 사용 불가**: Oracle 전통 문법은 FULL OUTER 직접 표현 불가 (UNION 우회)",
        "**(+) 없음**: 단순 EQUI JOIN(INNER)",
        "**자료3 p.50 예시**: `BOOK_LIST B, PUBLISHER P WHERE B.id = P.id(+)`가 LEFT OUTER에 해당"
      ],
      wrong: [
        "1. (+)가 E쪽에 있어 EMP가 NULL 받음 → DEPT 기준 RIGHT. 정반대.",
        "2. (정답) — DEPT가 NULL 받음 → EMP 기준 LEFT.",
        "3. 양쪽에 (+)는 Oracle 문법 오류(FULL OUTER 직접 표현 불가).",
        "4. (+)가 없으면 EQUI JOIN(INNER)이라 매칭만 나옴."
      ],
      tip: "LEFT의 Oracle 변환: 왼쪽 기준이면 오른쪽 컬럼에 (+). NULL 받는 쪽에 붙인다."
    }
  },

  // ============================================================
  // 토픽 95: RIGHT OUTER JOIN (Q239~Q243) - 5문항
  // 분배: 결과 추적 3 / Oracle(+) 위치 함정 1 / 정의 1
  // ============================================================
  {
    id: 239,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          [1, "KIM", 10],
          [2, "LEE", 10],
          [3, "PARK", 20],
          [4, "CHOI", null]
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
        content: "SELECT E.ENAME, D.DNAME\nFROM EMP E RIGHT OUTER JOIN DEPT D\n  ON E.DEPTNO = D.DEPTNO;"
      }
    ],
    choices: ["4행", "3행", "5행", "12행"],
    ans: 1,
    src: "자료3 p.49",
    exp: {
      reason: "RIGHT OUTER JOIN은 오른쪽(DEPT) 테이블의 모든 행을 반환하고, 왼쪽(EMP)에서 매칭되는 행을 붙인다. DEPT 3행 모두 살아남고, HR(30)은 EMP에 매칭이 없어 ENAME이 NULL로 채워진다. KIM/LEE는 SALES(10)에 둘 다 매칭되므로 결과는 KIM-SALES, LEE-SALES, PARK-IT, NULL-HR 총 4행. CHOI는 DEPTNO가 NULL이라 INNER 매칭 실패 + RIGHT 기준 아니므로 결과에서 제외. PostgreSQL 검증 완료. (자료3 p.49)",
      terms: [
        "**RIGHT OUTER JOIN**: 오른쪽 테이블 전체 + 왼쪽에서 일치하는 행 (왼쪽 미매칭은 NULL)",
        "**왼쪽 NULL 행 처리**: CHOI(DEPTNO=NULL)는 RIGHT 기준이 아니므로 결과에서 제외",
        "**1:N 관계**: DEPTNO=10에 EMP 2명(KIM, LEE) → DEPT 1행이 2번 등장",
        "**자료3 p.49**: '오른쪽 테이블의 모든 행 데이터가 반환됨'"
      ],
      wrong: [
        "1. (정답) — KIM-SALES, LEE-SALES, PARK-IT, NULL-HR 4행.",
        "2. 3행은 INNER JOIN 결과.",
        "3. 5행은 FULL OUTER 결과(CHOI까지 포함).",
        "4. 12행은 CROSS JOIN 결과."
      ],
      tip: "RIGHT는 오른쪽 전체 + 왼쪽 매칭. 1:N이면 오른쪽 1행이 N번 등장 가능."
    }
  },
  {
    id: 240,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[STU]",
        headers: ["SNO", "SNAME", "LNO"],
        rows: [
          [1, "A", 100],
          [2, "B", 200],
          [3, "C", null],
          [4, "D", 300]
        ]
      },
      {
        type: "table",
        title: "[LEC]",
        headers: ["LNO", "LNAME"],
        rows: [
          [100, "SQL"],
          [200, "DB"],
          [400, "OS"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT S.SNAME, L.LNAME\nFROM STU S RIGHT OUTER JOIN LEC L\n  ON S.LNO = L.LNO;"
      }
    ],
    choices: ["2행", "3행", "4행", "5행"],
    ans: 2,
    src: "자료3 p.49",
    exp: {
      reason: "RIGHT OUTER JOIN은 오른쪽 LEC 3행이 모두 결과에 남는다. 100→A, 200→B는 매칭. 400은 STU에 없어 SNAME=NULL. STU의 C(NULL), D(300)는 RIGHT 기준이 아니라 결과에서 제외. 따라서 3행. PostgreSQL 검증 완료. (자료3 p.49)",
      terms: [
        "**RIGHT 기준 행 수 = 오른쪽 행 수 (1:N 매칭 없을 때)**",
        "**왼쪽 미매칭 제외**: D(LNO=300)는 LEC에 없어 결과에서 제외",
        "**왼쪽 NULL 조인 컬럼 제외**: C(NULL)도 RIGHT 기준 아니라 제외",
        "**LEFT 결과는 4행, FULL은 5행**과 비교"
      ],
      wrong: [
        "1. 2행은 INNER JOIN 결과(A, B 매칭만).",
        "2. (정답)",
        "3. 4행은 LEFT JOIN 결과(STU 4행 기준).",
        "4. 5행은 FULL OUTER 결과."
      ],
      tip: "RIGHT는 오른쪽 행 수가 기본. 왼쪽 미매칭/NULL은 모두 결과에서 빠진다."
    }
  },
  {
    id: 241,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[BOOK_LIST]",
        headers: ["BOOK_ID", "PUBLISHER_ID"],
        rows: [
          ["b01", 1],
          ["b02", 2],
          ["b03", 8],
          ["b04", 3]
        ]
      },
      {
        type: "table",
        title: "[PUBLISHER]",
        headers: ["PUBLISHER_ID", "PUBLISHER_NAME"],
        rows: [
          [1, "열린책들"],
          [2, "민음사"],
          [3, "현대문학"],
          [4, "한빛미디어"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT B.BOOK_ID, P.PUBLISHER_NAME\nFROM BOOK_LIST B RIGHT OUTER JOIN PUBLISHER P\n  ON B.PUBLISHER_ID = P.PUBLISHER_ID;"
      }
    ],
    choices: [
      "4행 — PUBLISHER 4행 기준, b03(매칭없음)은 BOOK_ID가 NULL로 출력",
      "3행 — b01/b02/b04만 출력 (매칭 행만)",
      "4행 — BOOK_LIST 4행 기준, b03은 PUBLISHER_NAME이 NULL로 출력",
      "5행 — 양쪽 미매칭 모두 포함 (b03과 한빛미디어 둘 다)"
    ],
    ans: 1,
    src: "자료3 p.50",
    exp: {
      reason: "RIGHT OUTER JOIN은 PUBLISHER 4행 모두 출력. 1/2/3은 BOOK_LIST와 매칭, 4(한빛미디어)는 매칭 없어 BOOK_ID=NULL. b03(PUBLISHER_ID=8)은 PUBLISHER에 없고 RIGHT 기준이 아니므로 결과에서 제외. 자료3 p.50의 RIGHT OUTER JOIN 그림과 동일. (자료3 p.50)",
      terms: [
        "**오른쪽 PUBLISHER 4행 모두 출력**",
        "**왼쪽 미매칭(b03) 제외**: PUBLISHER_ID=8이 PUBLISHER에 없음",
        "**오른쪽 미매칭(한빛미디어) 포함**: BOOK_ID=NULL로 채움",
        "**LEFT 결과는 4행이지만 다른 분포**: BOOK_LIST 4행 기준 (b03 살림, 한빛미디어 빠짐)"
      ],
      wrong: [
        "1. (정답)",
        "2. INNER JOIN 결과.",
        "3. LEFT JOIN의 결과 설명.",
        "4. FULL OUTER JOIN 결과."
      ],
      tip: "RIGHT = 오른쪽 행 수만큼 출력. 매칭 안 되는 오른쪽 행은 살리고, 미매칭 왼쪽 행은 버림."
    }
  },
  {
    id: 242,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 [Oracle 전통 문법] 4개 중 EMP를 기준 테이블로 하여 EMP 모든 행을 반환하는 LEFT OUTER JOIN과 동일한 결과를 내는 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가)\nSELECT * FROM EMP E, DEPT D\nWHERE E.DEPTNO(+) = D.DEPTNO;\n\n-- (나)\nSELECT * FROM EMP E, DEPT D\nWHERE E.DEPTNO = D.DEPTNO(+);\n\n-- (다)\nSELECT * FROM EMP E, DEPT D\nWHERE E.DEPTNO(+) = D.DEPTNO(+);\n\n-- (라)\nSELECT * FROM EMP E, DEPT D\nWHERE E.DEPTNO = D.DEPTNO;"
      }
    ],
    choices: ["(가)", "(나)", "(다)", "(라)"],
    ans: 2,
    src: "자료3 p.50",
    exp: {
      reason: "Oracle (+)는 NULL을 받을(부족한) 쪽에 붙인다. EMP가 모두 나오는 LEFT OUTER가 되려면 부족분을 NULL로 받는 쪽이 DEPT여야 하므로 D.DEPTNO(+)가 정답. (가)는 E.DEPTNO(+)라 EMP가 부족분을 받음 → DEPT 기준 RIGHT. (다)는 양쪽 (+)로 Oracle 문법 오류. (라)는 (+)가 없어 INNER. (자료3 p.50)",
      terms: [
        "**(+)는 NULL을 받을 쪽에 부착**: 부족분이 채워지는 쪽",
        "**EMP 기준 LEFT**: EMP가 모두 나옴 → DEPT가 NULL 받음 → `D.DEPTNO(+)`",
        "**DEPT 기준 RIGHT**: DEPT가 모두 나옴 → EMP가 NULL 받음 → `E.DEPTNO(+)`",
        "**FULL OUTER**: Oracle (+)는 양쪽 동시 표현 불가, UNION으로 우회"
      ],
      wrong: [
        "1. (가)는 E쪽 (+) → EMP가 NULL 받음 → DEPT 기준 RIGHT.",
        "2. (정답) — D쪽 (+) → DEPT가 NULL 받음 → EMP 기준 LEFT.",
        "3. 양쪽 (+)는 ORA-01468 오류(FULL OUTER 직접 표현 불가).",
        "4. (+) 없으면 EQUI JOIN(INNER)."
      ],
      tip: "(+)는 NULL 받는 쪽 표시. EMP를 모두 보고 싶으면 DEPT쪽에 (+)."
    }
  },
  {
    id: 243,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "하",
    has_code: false,
    q: "다음 중 RIGHT OUTER JOIN에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "오른쪽 테이블의 모든 행 데이터가 반환되며, 왼쪽 테이블은 결합 기준 컬럼값과 일치하는 행만 결합된다.",
      "왼쪽 테이블에서 일치하는 값이 없으면 해당 컬럼들은 NULL로 채워진다.",
      "Oracle 전통 문법으로는 `WHERE 왼쪽컬럼(+) = 오른쪽컬럼` 형태로 표현한다.",
      "오른쪽 테이블의 결합 컬럼 값이 NULL이면 해당 행은 결과에서 제외된다."
    ],
    ans: 4,
    src: "자료3 p.49~50",
    exp: {
      reason: "RIGHT OUTER JOIN은 오른쪽 테이블 기준이므로 오른쪽 결합 컬럼이 NULL이라도 그 행은 결과에 남는다(왼쪽 컬럼만 NULL로 채움). NULL 조인 컬럼이라 제외되는 것은 INNER JOIN의 동작이다. (자료3 p.49)",
      terms: [
        "**오른쪽 기준**: 오른쪽 테이블의 모든 행은 무조건 결과에 포함",
        "**오른쪽 NULL 조인 컬럼**: NULL이어도 RIGHT에서는 살아남음",
        "**Oracle 표기**: `왼쪽(+) = 오른쪽` (왼쪽이 NULL 받는 쪽)",
        "**INNER 차이**: INNER는 양쪽 모두 NULL 행을 제외"
      ],
      wrong: [
        "1. RIGHT OUTER JOIN의 정의 그대로(자료3 p.49).",
        "2. 자료3 p.49 명시 — '왼쪽 테이블에서 일치하는 값이 없으면 해당 부분이 NULL로 채워짐'.",
        "3. (+)는 NULL 받는 쪽(=왼쪽)에 붙는다(자료3 p.50 예시).",
        "4. (정답) 오른쪽 NULL 행도 RIGHT에서는 살아남음."
      ],
      tip: "RIGHT 기준 = 오른쪽 행은 무조건 살림. 오른쪽 조인 컬럼 NULL도 결과에 남는다."
    }
  },

  // ============================================================
  // 토픽 96: FULL OUTER JOIN (Q244~Q247) - 4문항
  // 분배: 결과 추적 2 / 정의·Oracle 우회(UNION) 2
  // ============================================================
  {
    id: 244,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP]",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          [1, "KIM", 10],
          [2, "LEE", 10],
          [3, "PARK", 20],
          [4, "CHOI", null]
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
        content: "SELECT E.ENAME, D.DNAME\nFROM EMP E FULL OUTER JOIN DEPT D\n  ON E.DEPTNO = D.DEPTNO;"
      }
    ],
    choices: ["3행", "4행", "5행", "7행"],
    ans: 3,
    src: "자료3 p.50",
    exp: {
      reason: "FULL OUTER JOIN은 양쪽 테이블의 모든 행을 반환한다. 매칭: KIM-SALES, LEE-SALES, PARK-IT (3행). 왼쪽 미매칭(또는 NULL): CHOI (1행, DNAME=NULL). 오른쪽 미매칭: HR (1행, ENAME=NULL). 총 5행. PostgreSQL 검증 완료. (자료3 p.50)",
      terms: [
        "**FULL OUTER JOIN**: 두 테이블이 가지고 있는 모든 행을 반환 (자료3 p.50)",
        "**행 수 공식**: 매칭 행 + 왼쪽 단독 행 + 오른쪽 단독 행",
        "**= LEFT UNION RIGHT**: 자료3 p.50 — 'LEFT의 결과 UNION RIGHT의 결과'",
        "**UNION 중복 제거**: 매칭된 행은 LEFT/RIGHT 양쪽에 있지만 중복 한 번만 반환"
      ],
      wrong: [
        "1. 3행은 INNER 결과.",
        "2. 4행은 LEFT 또는 RIGHT 결과.",
        "3. (정답)",
        "4. 7행은 단순 합(LEFT 4 + RIGHT 4 - 매칭 1번 잘못 빼기)."
      ],
      tip: "FULL = 매칭 + 왼쪽 단독 + 오른쪽 단독. LEFT와 RIGHT의 합집합."
    }
  },
  {
    id: 245,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[STU]",
        headers: ["SNO", "SNAME", "LNO"],
        rows: [
          [1, "A", 100],
          [2, "B", 200],
          [3, "C", null],
          [4, "D", 300]
        ]
      },
      {
        type: "table",
        title: "[LEC]",
        headers: ["LNO", "LNAME"],
        rows: [
          [100, "SQL"],
          [200, "DB"],
          [400, "OS"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT S.SNAME, L.LNAME\nFROM STU S FULL OUTER JOIN LEC L\n  ON S.LNO = L.LNO;"
      }
    ],
    choices: ["3행", "4행", "5행", "7행"],
    ans: 3,
    src: "자료3 p.50",
    exp: {
      reason: "FULL OUTER JOIN 결과: A(100,SQL), B(200,DB) 매칭 2행 + 왼쪽 단독(C는 NULL이라 매칭X 살아남, D는 LNO=300 매칭X 살아남) 2행 + 오른쪽 단독(LNO=400) 1행 = 총 5행. PostgreSQL 검증 완료. (자료3 p.50)",
      terms: [
        "**왼쪽 단독 행 살림**: 매칭 실패 + NULL 조인 컬럼 모두 FULL에서는 결과에 남음",
        "**오른쪽 단독 행 살림**: LEC의 400(STU에 매칭 없음)도 결과에 남음",
        "**FULL = INNER + 왼쪽 단독 + 오른쪽 단독**: 2 + 2 + 1 = 5",
        "**= LEFT(4) UNION RIGHT(3)**: 매칭 2건 중복 제거 후 4+3-2=5"
      ],
      wrong: [
        "1. INNER 결과(매칭 2건만).",
        "2. LEFT 4행 또는 RIGHT 3행 + 1.",
        "3. (정답)",
        "4. 7행은 LEFT 4 + RIGHT 3 단순 합산 (중복 제거 안 함)."
      ],
      tip: "FULL = LEFT UNION RIGHT. 매칭 행은 한 번만 반영(중복 제거)."
    }
  },
  {
    id: 246,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: false,
    q: "다음 중 FULL OUTER JOIN에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "두 테이블이 가지고 있는 모든 행이 반환되며, 결합 기준 컬럼이 일치하지 않는 행은 해당 부분이 NULL로 채워진다.",
      "Oracle 전통 문법은 FULL OUTER JOIN을 (+) 연산자만으로 직접 표현할 수 없으며 UNION을 통해 우회 구현한다.",
      "FULL OUTER JOIN의 결과는 LEFT OUTER JOIN의 결과와 RIGHT OUTER JOIN의 결과를 UNION으로 합친 것과 같다.",
      "Oracle 전통 문법에서 `WHERE A.col(+) = B.col(+)`로 양쪽에 (+)를 함께 사용하면 FULL OUTER JOIN과 동일하게 동작한다."
    ],
    ans: 4,
    src: "자료3 p.50",
    exp: {
      reason: "Oracle 전통 문법은 (+)를 양쪽에 동시에 사용할 수 없다(ORA-01468 오류). FULL OUTER는 (+)로 직접 표현 불가하며 LEFT 결과와 RIGHT 결과를 UNION으로 합쳐 우회한다. 자료3 p.50 명시: '오라클 표준에서는 직접적으로 지원하지 않으나, UNION을 통해 구현이 가능'. (자료3 p.50)",
      terms: [
        "**FULL OUTER 정의**: 두 테이블의 모든 행 + 미매칭 부분은 NULL (자료3 p.50)",
        "**Oracle 우회 방법**: `LEFT 결과 UNION RIGHT 결과` (자료3 p.50)",
        "**UNION 중복 제거**: 매칭된 행은 양쪽 결과에 모두 있으나 한 번만 반환",
        "**ANSI**: `FULL OUTER JOIN`(또는 `FULL JOIN`) 직접 지원, SQL Server/PostgreSQL/Oracle 9i+ 모두 가능"
      ],
      wrong: [
        "1. FULL OUTER JOIN의 정의 그대로(자료3 p.50).",
        "2. 자료3 p.50 명시 — '오라클 표준에서는 직접 지원하지 않으나, UNION을 통해 구현 가능'.",
        "3. 자료3 p.50 명시 — '= LEFT OUTER JOIN의 결과 UNION RIGHT OUTER JOIN의 결과'.",
        "4. (정답) Oracle (+)는 양쪽 동시 사용 불가, ORA-01468 오류 발생."
      ],
      tip: "Oracle FULL OUTER는 (+)로 못 쓴다. LEFT UNION RIGHT로 우회."
    }
  },
  {
    id: 247,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 [ANSI 표준] FULL OUTER JOIN과 동일한 결과를 내도록 [Oracle 전통 문법]으로 변환할 때, 빈칸 (가)에 들어갈 가장 적절한 키워드는?",
    blocks: [
      {
        type: "code",
        title: "[ANSI]",
        lang: "sql",
        content: "SELECT B.BOOK_ID, P.PUBLISHER_NAME\nFROM BOOK_LIST B FULL OUTER JOIN PUBLISHER P\n  ON B.PUBLISHER_ID = P.PUBLISHER_ID;"
      },
      {
        type: "code",
        title: "[Oracle 우회]",
        lang: "sql",
        content: "SELECT B.BOOK_ID, P.PUBLISHER_NAME\nFROM BOOK_LIST B, PUBLISHER P\nWHERE B.PUBLISHER_ID = P.PUBLISHER_ID(+)\n  (가)\nSELECT B.BOOK_ID, P.PUBLISHER_NAME\nFROM BOOK_LIST B, PUBLISHER P\nWHERE B.PUBLISHER_ID(+) = P.PUBLISHER_ID;"
      }
    ],
    choices: ["UNION ALL", "UNION", "INTERSECT", "MINUS"],
    ans: 2,
    src: "자료3 p.50",
    exp: {
      reason: "Oracle은 FULL OUTER JOIN을 (+)로 직접 표현할 수 없어 LEFT 결과와 RIGHT 결과를 UNION으로 합친다. UNION은 중복을 제거하므로 매칭된 행이 한 번만 반환되어 FULL OUTER와 결과가 일치한다. 자료3 p.50 명시: 'UNION: 중복 데이터는 하나만 반환'. UNION ALL은 중복 미제거라 매칭 행이 두 번 출력되어 결과가 다르다. (자료3 p.50)",
      terms: [
        "**UNION**: 중복 행 제거 후 합집합 → FULL OUTER와 동등",
        "**UNION ALL**: 중복 미제거 → 매칭 행이 LEFT/RIGHT 양쪽에서 두 번 등장",
        "**Oracle FULL OUTER 우회 공식**: `LEFT(WHERE A=B(+))` UNION `RIGHT(WHERE A(+)=B)`",
        "**자료3 p.50**: 'UNION: 중복 데이터는 하나만 반환'"
      ],
      wrong: [
        "1. UNION ALL은 중복 유지라 매칭 행이 두 번 등장. FULL OUTER 결과와 다름.",
        "2. (정답)",
        "3. INTERSECT는 교집합 → INNER JOIN과 유사. FULL이 아님.",
        "4. MINUS는 차집합. FULL과 무관."
      ],
      tip: "Oracle FULL OUTER 우회 = LEFT UNION RIGHT. UNION ALL이 아닌 UNION(중복 제거)."
    }
  }
];

module.exports = f2Part3;

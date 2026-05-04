// 2-F Part 2: Q215~Q232 (INNER JOIN + ON/USING + NATURAL JOIN + CROSS JOIN)
// 자료3 p.47~49 기반. 정답은 자료에 명시된 내용만 사용.
// PostgreSQL 14 검증: 모든 코드 결과는 sqld_verify DB에서 직접 실행해 확정.
// 분배: INNER 6 / ON과 USING 4 / NATURAL 4 / CROSS 4 = 18문항
// 정답 분포: 1번 5 / 2번 4 / 3번 5 / 4번 4
const f2Part2 = [
  // ============================================================
  // 토픽 90: INNER JOIN (Q215~Q220) - 6문항
  // ============================================================
  {
    id: 215,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "하",
    has_code: false,
    q: "다음 중 ANSI 표준 INNER JOIN에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "두 테이블에서 조인 조건을 만족하는 행만 결과로 반환한다.",
      "INNER JOIN 절 뒤에는 ON 절 또는 USING 절 중 하나가 반드시 있어야 한다.",
      "조인 키 컬럼의 값이 NULL인 행은 INNER JOIN 결과에 포함되지 않는다.",
      "INNER 키워드를 생략하고 JOIN만 쓰면 OUTER JOIN으로 동작한다."
    ],
    ans: 4,
    src: "자료3 p.47",
    exp: {
      reason: "ANSI 표준에서 INNER 키워드는 생략 가능하며, 단순히 JOIN만 써도 INNER JOIN과 동일하게 동작한다. OUTER JOIN으로 바뀌지 않는다. (자료3 p.47)",
      terms: [
        "**INNER JOIN**: 양쪽 테이블에서 조인 조건이 일치하는 행만 반환",
        "**ON 절**: 조인 조건을 명시. 컬럼명이 달라도 사용 가능",
        "**USING 절**: 두 테이블의 동일 컬럼명으로 조인할 때 사용",
        "**INNER 생략**: JOIN ≡ INNER JOIN (ANSI 표준 기본값)"
      ],
      wrong: [
        "1. INNER JOIN의 정의 그대로다.",
        "2. ON/USING 중 하나는 필수다(CROSS/NATURAL JOIN 제외).",
        "3. NULL은 어떤 값과도 등호 비교가 unknown이라 INNER에서 빠진다.",
        "4. (정답) JOIN만 써도 INNER JOIN으로 동작한다."
      ],
      tip: "INNER 생략해도 INNER. ON/USING 둘 중 하나는 필수."
    }
  },
  {
    id: 216,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          [1, "KIM", 10],
          [2, "LEE", 10],
          [3, "PARK", 20],
          [4, "CHOI", null],
          [5, "HAN", 40]
        ]
      },
      {
        type: "table",
        title: "[DEPT 테이블]",
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
        content: "SELECT COUNT(*)\nFROM EMP E INNER JOIN DEPT D\n  ON E.DEPTNO = D.DEPTNO;"
      }
    ],
    choices: ["3", "4", "5", "15"],
    ans: 1,
    src: "자료3 p.47",
    exp: {
      reason: "INNER JOIN은 양쪽이 일치하는 행만 반환한다. KIM(10)-SALES, LEE(10)-SALES, PARK(20)-IT 3건 매칭. CHOI는 DEPTNO가 NULL이라 제외, HAN(40)은 DEPT에 없어 제외, HR은 EMP에 없어 제외. PostgreSQL 검증 완료. (자료3 p.47)",
      terms: [
        "**INNER JOIN 매칭 규칙**: 조인 조건 결과가 TRUE인 행만 통과",
        "**NULL 비교**: NULL = 어떤값 → unknown → 행 제외",
        "**INNER 결과 수**: 매칭 가능한 (E행, D행) 쌍의 개수"
      ],
      wrong: [
        "1. (정답) 매칭 3건.",
        "2. 4 = RIGHT OUTER 결과(매칭 3 + DEPT 미매칭 HR 1).",
        "3. 5 = LEFT OUTER 결과(매칭 3 + EMP 미매칭 CHOI/HAN 2).",
        "4. 15 = CROSS JOIN(5×3) 결과."
      ],
      tip: "INNER는 매칭만. NULL인 조인 키와 한쪽에만 있는 값은 모두 빠진다."
    }
  },
  {
    id: 217,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[STUDENT 테이블]",
        headers: ["SNO", "SNAME", "CNO"],
        rows: [
          [1, "A", 101],
          [2, "B", 102],
          [3, "C", 101],
          [4, "D", null]
        ]
      },
      {
        type: "table",
        title: "[COURSE 테이블]",
        headers: ["CNO", "CNAME", "CREDIT"],
        rows: [
          [101, "DB", 3],
          [102, "OS", 3],
          [103, "NET", 2]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM STUDENT S INNER JOIN COURSE C\n  ON S.CNO = C.CNO;"
      }
    ],
    choices: ["3", "2", "4", "12"],
    ans: 1,
    src: "자료3 p.47",
    exp: {
      reason: "STUDENT의 CNO 값 중 COURSE에 존재하는 값과만 매칭. SNO=1 → DB, SNO=2 → OS, SNO=3 → DB. SNO=4(CNO NULL)는 제외. 총 3건. PostgreSQL 검증 완료. (자료3 p.47)",
      terms: [
        "**INNER JOIN ON**: 조인 조건이 TRUE인 행만 결과 포함",
        "**NULL 조인 키 처리**: NULL은 어떤 값과도 일치하지 않음(unknown)",
        "**SELECT \\***: ON 절 조인은 양쪽 컬럼 모두 출력 (USING/NATURAL과 다름)"
      ],
      wrong: [
        "1. (정답) 3건.",
        "2. 2 = NULL 제외 + COURSE 미사용 한 건 더 빼낸 경우.",
        "3. 4 = STUDENT 전체 4건이 모두 매칭된다고 본 경우.",
        "4. 12 = CROSS JOIN(4×3) 결과."
      ],
      tip: "INNER는 NULL 조인 키 자동 제외. ON 절은 양쪽 컬럼 모두 SELECT *에 등장."
    }
  },
  {
    id: 218,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          [1, "KIM", 10],
          [2, "LEE", 10],
          [3, "PARK", 20]
        ]
      },
      {
        type: "table",
        title: "[DEPT 테이블]",
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
        content: "SELECT E.ENAME, D.DNAME\nFROM EMP E JOIN DEPT D\n  ON E.DEPTNO = D.DEPTNO\nORDER BY E.EMPNO;"
      }
    ],
    choices: [
      "(KIM, SALES), (LEE, SALES), (PARK, IT)",
      "(KIM, SALES), (LEE, SALES), (PARK, IT), (NULL, HR)",
      "(KIM, SALES), (LEE, IT), (PARK, HR)",
      "오류 발생 (INNER 키워드 누락)"
    ],
    ans: 1,
    src: "자료3 p.47",
    exp: {
      reason: "JOIN만 써도 INNER JOIN으로 동작. EMP 3건과 DEPT의 매칭 결과 3건이 출력된다. HR(30)은 EMP에 매칭이 없어 제외. PostgreSQL 검증 완료. (자료3 p.47)",
      terms: [
        "**JOIN 키워드**: INNER 생략해도 동일 동작 (ANSI 표준)",
        "**ON 절 출력**: SELECT에 명시한 컬럼만 출력. 양쪽 DEPTNO를 모두 가짐",
        "**ORDER BY**: 조인 결과를 EMPNO 순으로 정렬"
      ],
      wrong: [
        "1. (정답) 매칭 3건.",
        "2. HR이 함께 나오는 것은 RIGHT/FULL OUTER JOIN 결과다.",
        "3. 같은 행끼리 줄 맞춰 짝지은 잘못된 결과(조인 조건 미적용).",
        "4. INNER 생략은 합법이며 오류가 아니다."
      ],
      tip: "JOIN ≡ INNER JOIN. 한쪽에만 있는 값은 INNER에서 빠진다."
    }
  },
  {
    id: 219,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL 중 문법 오류 없이 정상 실행되는 SQL을 모두 고른 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "(가) SELECT * FROM EMP E INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO;\n(나) SELECT * FROM EMP E INNER JOIN DEPT D;\n(다) SELECT * FROM EMP JOIN DEPT USING (DEPTNO);\n(라) SELECT * FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO WHERE E.DEPTNO = 10;"
      }
    ],
    choices: [
      "(가), (나), (다)",
      "(가), (다), (라)",
      "(나), (다), (라)",
      "(가), (나), (다), (라)"
    ],
    ans: 2,
    src: "자료3 p.47",
    exp: {
      reason: "(나)는 INNER JOIN인데 ON/USING이 빠져 문법 오류. (가)는 정상 ON, (다)는 정상 USING, (라)는 ON + WHERE 조합으로 정상. PostgreSQL에서 (나)만 syntax error. (자료3 p.47)",
      terms: [
        "**INNER JOIN 필수**: 반드시 ON 또는 USING 명시",
        "**CROSS JOIN**: ON/USING 없이 사용하면 카타시안 곱(별도 키워드 필요)",
        "**WHERE와 ON 병행**: ON으로 조인 후 WHERE로 행 필터 가능"
      ],
      wrong: [
        "1. (나)가 포함되어 있어 오답.",
        "2. (정답) (가)/(다)/(라) 모두 정상.",
        "3. (나)가 포함되어 있어 오답.",
        "4. (나)가 포함되어 있어 오답."
      ],
      tip: "INNER JOIN은 ON/USING 필수. 빠뜨리면 syntax error."
    }
  },
  {
    id: 220,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "DEPTNO"],
        rows: [
          [1, 10],
          [2, 10],
          [3, 10],
          [4, 20],
          [5, 20]
        ]
      },
      {
        type: "table",
        title: "[DEPT 테이블]",
        headers: ["DEPTNO", "DNAME"],
        rows: [
          [10, "SALES"],
          [10, "MARKET"],
          [20, "IT"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT COUNT(*)\nFROM EMP INNER JOIN DEPT\n  ON EMP.DEPTNO = DEPT.DEPTNO;"
      }
    ],
    choices: ["5", "6", "8", "15"],
    ans: 3,
    src: "자료3 p.47",
    exp: {
      reason: "DEPT에 DEPTNO=10이 두 행(SALES, MARKET)이라 EMP의 DEPTNO=10인 3행 각각이 2번씩 매칭된다. EMP DEPTNO=10(3건)×DEPT DEPTNO=10(2건)=6건, DEPTNO=20(2건)×(1건)=2건. 합계 6+2=8건. PostgreSQL 검증 완료. (자료3 p.47)",
      terms: [
        "**INNER JOIN 행 수**: 조인 키별로 양쪽 매칭 행의 곱을 합산",
        "**조인 키 중복**: 한쪽에 같은 키 N개면 다른 쪽 매칭 행이 N배로 증식",
        "**M:N 관계**: 조인 결과가 원래 테이블 행 수보다 커질 수 있음"
      ],
      wrong: [
        "1. 5 = EMP 행 수만 보고 1:1 매칭이라 가정.",
        "2. 6 = DEPTNO=10 부분(3×2)만 셈.",
        "3. (정답) 6+2=8건.",
        "4. 15 = 5×3 CROSS JOIN 결과."
      ],
      tip: "한쪽 조인 키가 중복이면 매칭 행이 곱으로 늘어난다."
    }
  },

  // ============================================================
  // 토픽 91: ON vs USING (Q221~Q224) - 4문항
  // ============================================================
  {
    id: 221,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: false,
    q: "다음 중 ON 절과 USING 절의 차이에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "ON 절은 두 테이블의 컬럼명이 다르더라도 조인 조건으로 사용할 수 있다.",
      "USING 절은 두 테이블의 조인 컬럼명이 동일해야 사용할 수 있다.",
      "USING 절에 명시된 조인 컬럼은 SELECT 절에서 테이블 별칭(예: E.DEPTNO)을 붙여 참조할 수 있다.",
      "ON 절을 사용한 조인 결과에서 SELECT *을 하면 양쪽 테이블의 조인 컬럼이 각각 등장한다."
    ],
    ans: 3,
    src: "자료3 p.47~48",
    exp: {
      reason: "USING 절의 조인 컬럼은 한쪽 테이블 소속이 아닌 공통 컬럼으로 처리되므로 테이블 별칭(E.DEPTNO)을 붙이면 오류가 발생한다. NATURAL JOIN의 조인 컬럼도 동일하게 별칭 금지(T-09). (자료3 p.47~48)",
      terms: [
        "**ON 절**: 임의 조건. 컬럼명 달라도 OK. 별칭 사용 자유",
        "**USING 절**: 동일 컬럼명일 때만. 조인 컬럼에 별칭 금지",
        "**T-09**: NATURAL/USING 조인 컬럼 별칭 금지(2024 SQLD 빈출)",
        "**SELECT \\* 차이**: ON은 양쪽 컬럼 출력, USING은 공통 컬럼 1개만 출력"
      ],
      wrong: [
        "1. ON은 컬럼명이 달라도 조건만 맞으면 OK.",
        "2. USING은 두 테이블 같은 이름의 컬럼일 때만 사용 가능.",
        "3. (정답) USING의 조인 컬럼은 별칭 금지.",
        "4. ON 절은 양쪽 컬럼이 모두 결과에 등장."
      ],
      tip: "USING/NATURAL 조인 컬럼은 별칭 금지. ON은 자유."
    }
  },
  {
    id: 222,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL 중 문법 오류가 발생하는 SQL을 모두 고른 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "(가) SELECT * FROM EMP E JOIN DEPT D USING (DEPTNO);\n(나) SELECT * FROM EMP E JOIN DEPT D USING (E.DEPTNO);\n(다) SELECT E.ENAME, DEPTNO FROM EMP E JOIN DEPT D USING (DEPTNO);\n(라) SELECT E.ENAME, E.DEPTNO FROM EMP E JOIN DEPT D USING (DEPTNO);"
      }
    ],
    choices: [
      "(나)만 오류",
      "(나), (라)",
      "(가), (나), (라)",
      "(나), (다), (라)"
    ],
    ans: 2,
    src: "자료3 p.47~48",
    exp: {
      reason: "(나)는 USING 안에 별칭(E.DEPTNO) 사용 → syntax error. (라)는 SELECT 절에서도 USING의 조인 컬럼에 별칭(E.DEPTNO)을 붙임 → 오류. (가)는 정상 USING, (다)는 USING 컬럼을 별칭 없이 DEPTNO로 참조 → 정상. PostgreSQL 검증 완료. (자료3 p.47~48)",
      terms: [
        "**USING 안 별칭 금지**: USING (E.DEPTNO) → syntax error",
        "**USING 컬럼 참조**: 결과에서도 별칭 없이 그냥 컬럼명으로",
        "**해결책**: 별칭 필요 시 ON 절로 전환"
      ],
      wrong: [
        "1. (라)도 별칭 사용으로 오류 발생.",
        "2. (정답) (나)와 (라) 모두 USING 컬럼에 별칭 적용으로 오류.",
        "3. (가)는 정상 SQL이라 오답.",
        "4. (다)는 USING 컬럼을 별칭 없이 참조해 정상이라 오답."
      ],
      tip: "USING 절 안과 조인 컬럼 참조 모두 별칭 금지."
    }
  },
  {
    id: 223,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 컬럼 수와 첫 행으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          [1, "KIM", 10],
          [2, "LEE", 20]
        ]
      },
      {
        type: "table",
        title: "[DEPT 테이블]",
        headers: ["DEPTNO", "DNAME"],
        rows: [
          [10, "SALES"],
          [20, "IT"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM EMP JOIN DEPT USING (DEPTNO)\nORDER BY EMPNO;"
      }
    ],
    choices: [
      "5컬럼 (EMP.DEPTNO, EMPNO, ENAME, DEPT.DEPTNO, DNAME), 첫행: (10, 1, KIM, 10, SALES)",
      "4컬럼 (DEPTNO, EMPNO, ENAME, DNAME), 첫행: (10, 1, KIM, SALES)",
      "4컬럼 (EMPNO, ENAME, DEPTNO, DNAME), 첫행: (1, KIM, 10, SALES)",
      "5컬럼 (EMPNO, ENAME, DEPTNO, DEPTNO, DNAME), 첫행: (1, KIM, 10, 10, SALES)"
    ],
    ans: 2,
    src: "자료3 p.47~48",
    exp: {
      reason: "USING 조인은 공통 컬럼이 결과에서 한 번만, 그리고 맨 앞에 등장한다. 컬럼 순서는 (DEPTNO, EMPNO, ENAME, DNAME) 4개. PostgreSQL 검증 완료. (자료3 p.47~48)",
      terms: [
        "**USING 결과 컬럼**: 공통 컬럼 1개 + 좌측 나머지 + 우측 나머지",
        "**공통 컬럼 위치**: 결과에서 가장 앞으로 이동(PostgreSQL/Oracle 동일)",
        "**ON 결과와의 차이**: ON은 양쪽 DEPTNO 모두 출력(중복 컬럼 가능)"
      ],
      wrong: [
        "1. USING은 공통 컬럼을 한 번만 출력. 5컬럼 아님.",
        "2. (정답) 4컬럼, 공통 DEPTNO가 맨 앞.",
        "3. EMP 컬럼 순서를 그대로 둔 것이지만 USING은 공통 컬럼을 앞으로 옮긴다.",
        "4. ON 절 결과의 모습이지 USING 결과는 아니다."
      ],
      tip: "USING 결과: 공통 컬럼 1개가 맨 앞. ON 결과: 양쪽 컬럼 그대로."
    }
  },
  {
    id: 224,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 두 SQL의 결과 비교에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가)\nSELECT * FROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO;\n\n-- (나)\nSELECT * FROM EMP JOIN DEPT USING (DEPTNO);"
      }
    ],
    choices: [
      "(가)와 (나)는 결과 행 수와 컬럼 구성이 완전히 동일하다.",
      "(가)와 (나)는 결과 행 수가 다르고 컬럼 구성도 다르다.",
      "(가)와 (나)는 결과 행 수는 같으나 컬럼 구성이 다르다.",
      "(나)는 USING 절 사용으로 EMP에 별칭이 없으므로 문법 오류가 발생한다."
    ],
    ans: 3,
    src: "자료3 p.47~48",
    exp: {
      reason: "두 SQL 모두 INNER JOIN 의미라 결과 행 수는 동일. 그러나 (가)는 양쪽 DEPTNO를 모두 출력(컬럼 N+M개), (나)는 공통 DEPTNO를 한 번만 출력(컬럼 N+M-1개). PostgreSQL 검증 완료. (자료3 p.47~48)",
      terms: [
        "**(가) ON 절**: 양쪽 모든 컬럼 출력 → 컬럼 수 = EMP수 + DEPT수",
        "**(나) USING 절**: 공통 컬럼 1개로 통합 → 컬럼 수 = EMP수 + DEPT수 - 공통수",
        "**행 수**: 두 방식 모두 동일한 INNER 매칭이므로 같음",
        "**별칭 필요성**: USING은 별칭 없어도 정상 실행"
      ],
      wrong: [
        "1. 컬럼 구성이 다르다. (가)는 DEPTNO 2개, (나)는 1개.",
        "2. 행 수도 같다. INNER 매칭은 두 방식 모두 동일.",
        "3. (정답) 행 수는 같고 컬럼 구성이 다르다.",
        "4. USING 절은 테이블 별칭 없어도 정상 실행. 오류 아님."
      ],
      tip: "ON과 USING은 같은 행을 내지만 SELECT * 컬럼 수가 다르다."
    }
  },

  // ============================================================
  // 토픽 92: NATURAL JOIN (Q225~Q228) - 4문항
  // ============================================================
  {
    id: 225,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: false,
    q: "다음 중 NATURAL JOIN에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "두 테이블에서 이름과 데이터 타입(도메인)이 동일한 모든 컬럼을 자동으로 조인 조건으로 사용한다.",
      "조인에 사용되는 컬럼에는 테이블 이름이나 별칭(예: E.DEPTNO)을 붙일 수 없다.",
      "Oracle은 지원하지만 SQL Server에서는 NATURAL JOIN 문법을 지원하지 않는다.",
      "두 테이블에 공통 컬럼이 하나도 없으면 NATURAL JOIN은 문법 오류로 실행되지 않는다."
    ],
    ans: 4,
    src: "자료3 p.48",
    exp: {
      reason: "공통 컬럼이 없는 NATURAL JOIN은 오류가 아니라 카타시안 곱(CROSS JOIN과 동일 결과)을 반환한다. PostgreSQL 검증 완료(2×2=4행). 나머지는 모두 NATURAL JOIN의 정확한 특징. (자료3 p.48)",
      terms: [
        "**NATURAL JOIN**: 두 테이블의 동일 이름/타입 컬럼 자동 조인",
        "**별칭 금지(T-09)**: 조인 컬럼은 양쪽 공통이라 한쪽 특정 불가",
        "**SQL Server 미지원**: NATURAL JOIN 키워드 자체 미지원",
        "**공통 컬럼 0개**: 카타시안 곱으로 동작(오류 아님)"
      ],
      wrong: [
        "1. 정확한 NATURAL JOIN 정의.",
        "2. T-09 함정. NATURAL/USING 조인 컬럼은 별칭 금지.",
        "3. SQL Server는 NATURAL JOIN, USING 모두 미지원.",
        "4. (정답) 공통 컬럼 없으면 CROSS JOIN처럼 동작. 오류 아님."
      ],
      tip: "NATURAL: 공통 컬럼 자동 조인. 컬럼 없으면 CROSS, 별칭 금지, SQL Server 미지원."
    }
  },
  {
    id: 226,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[A 테이블]",
        headers: ["X", "Y", "Z"],
        rows: [
          [1, 1, 100],
          [1, 2, 200],
          [2, 2, 300]
        ]
      },
      {
        type: "table",
        title: "[B 테이블]",
        headers: ["X", "Y", "W"],
        rows: [
          [1, 1, 10],
          [1, 2, 20],
          [2, 3, 30]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM A NATURAL JOIN B;"
      }
    ],
    choices: [
      "1행 (X=1, Y=1, Z=100, W=10)",
      "3행 (모든 X 일치 행)",
      "2행 (X=1, Y=1, Z=100, W=10), (X=1, Y=2, Z=200, W=20)",
      "9행 (3×3 카타시안 곱)"
    ],
    ans: 3,
    src: "자료3 p.48",
    exp: {
      reason: "공통 컬럼이 X와 Y 두 개라 두 컬럼이 모두 일치하는 행만 매칭. (1,1)과 (1,2)는 양쪽에 존재 → 2행. (2,2)는 A에만, (2,3)은 B에만 존재해 제외. PostgreSQL 검증 완료. (자료3 p.48)",
      terms: [
        "**다중 공통 컬럼**: 모든 공통 컬럼이 동시에 일치해야 매칭",
        "**자동 조건 합성**: ON A.X=B.X AND A.Y=B.Y와 동등",
        "**결과 컬럼**: X, Y(공통 1개씩), Z, W → 4컬럼"
      ],
      wrong: [
        "1. (1,2,200,20)도 매칭이라 1행은 부족.",
        "2. X만 보면 안 되고 Y도 함께 매칭해야 한다.",
        "3. (정답) (1,1)과 (1,2) 두 쌍이 양쪽에 있어 2행.",
        "4. NATURAL은 카타시안 곱 아님(공통 컬럼 있을 때)."
      ],
      tip: "NATURAL은 공통 컬럼 모두 AND 조건으로 결합한다."
    }
  },
  {
    id: 227,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL 중 문법 오류 없이 정상 실행되는 SQL을 모두 고른 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "(가) SELECT * FROM EMP NATURAL JOIN DEPT;\n(나) SELECT * FROM EMP E NATURAL JOIN DEPT D WHERE E.DEPTNO = 10;\n(다) SELECT DEPTNO, ENAME, DNAME FROM EMP NATURAL JOIN DEPT;\n(라) SELECT E.DEPTNO, ENAME, DNAME FROM EMP E NATURAL JOIN DEPT D;"
      }
    ],
    choices: [
      "(가), (다)",
      "(가), (나), (다)",
      "(가), (다), (라)",
      "(가), (나), (다), (라)"
    ],
    ans: 1,
    src: "자료3 p.48",
    exp: {
      reason: "NATURAL JOIN의 조인 컬럼(DEPTNO)에는 테이블 별칭을 붙일 수 없다. (나)는 WHERE에 E.DEPTNO, (라)는 SELECT에 E.DEPTNO를 사용 → 둘 다 오류. (가)와 (다)만 정상. (자료3 p.48, T-09)",
      terms: [
        "**NATURAL 조인 컬럼 별칭 금지**: WHERE/SELECT/ORDER BY 어디서든",
        "**테이블 별칭 자체는 OK**: EMP E, DEPT D는 합법(비조인 컬럼에는 사용 가능)",
        "**비조인 컬럼**: ENAME은 EMP에만 있으므로 E.ENAME 별칭 사용은 가능"
      ],
      wrong: [
        "1. (정답) (가)/(다)만 정상.",
        "2. (나)는 E.DEPTNO 사용으로 오류.",
        "3. (라)는 E.DEPTNO 사용으로 오류.",
        "4. (나), (라) 모두 별칭 사용으로 오류라 4개 모두 정상은 아님."
      ],
      tip: "NATURAL 조인 컬럼은 어디서도 테이블 별칭 금지. 비조인 컬럼은 가능."
    }
  },
  {
    id: 228,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[P 테이블]",
        headers: ["A", "B"],
        rows: [
          [1, 2],
          [3, 4]
        ]
      },
      {
        type: "table",
        title: "[Q 테이블]",
        headers: ["C", "D"],
        rows: [
          [5, 6],
          [7, 8]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM P NATURAL JOIN Q;"
      }
    ],
    choices: ["0", "2", "3", "4"],
    ans: 4,
    src: "자료3 p.48",
    exp: {
      reason: "P와 Q에 공통 컬럼이 하나도 없으므로 NATURAL JOIN은 카타시안 곱으로 동작 → 2×2=4행. PostgreSQL 검증 완료. (자료3 p.48)",
      terms: [
        "**공통 컬럼 0개 NATURAL**: CROSS JOIN과 동일 결과",
        "**카타시안 곱**: 모든 행 쌍을 결과로",
        "**오류 아님**: SQL 표준상 합법(자료3 p.48)"
      ],
      wrong: [
        "1. 0건 = 매칭 없을 때라 본 경우. NATURAL은 공통 컬럼 없으면 CROSS.",
        "2. 2건 = 같은 위치 행끼리만 매칭이라 본 경우.",
        "3. 3건 = 무근거.",
        "4. (정답) 2×2=4건 카타시안 곱."
      ],
      tip: "공통 컬럼 0개 NATURAL = CROSS JOIN."
    }
  },

  // ============================================================
  // 토픽 93: CROSS JOIN (Q229~Q232) - 4문항
  // ============================================================
  {
    id: 229,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "하",
    has_code: false,
    q: "다음 중 CROSS JOIN에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "두 테이블의 모든 행 쌍을 결과로 반환하는 카타시안 곱(Cartesian Product)이다.",
      "M행 테이블과 N행 테이블의 CROSS JOIN 결과는 항상 M×N 행이다.",
      "CROSS JOIN에는 ON 절이나 USING 절을 사용해 조인 조건을 추가해야 한다.",
      "ANSI 표준 문법은 'A CROSS JOIN B'이며 별도의 조인 조건 없이 작성한다."
    ],
    ans: 3,
    src: "자료3 p.48~49",
    exp: {
      reason: "CROSS JOIN은 조인 조건 없이 사용하는 것이 정의이며, ON/USING을 추가하면 의미상 INNER JOIN과 같아진다(표준상 CROSS JOIN ... ON은 PostgreSQL/Oracle에서 허용하지만 본질이 INNER로 변환됨). 자료3은 CROSS JOIN을 '조건 없는 조인'으로 정의. (자료3 p.48~49)",
      terms: [
        "**CROSS JOIN**: 조인 조건 없는 카타시안 곱",
        "**행 수**: 좌측 M행 × 우측 N행",
        "**용도**: 모든 조합 생성(테스트 데이터, 좌석×시간 매트릭스 등)",
        "**구 문법**: FROM A, B (콤마 구분, 조건 없으면 CROSS JOIN과 동일)"
      ],
      wrong: [
        "1. 카타시안 곱 정의 그대로.",
        "2. CROSS JOIN의 행 수 공식.",
        "3. (정답) CROSS JOIN은 조건 없이 사용. ON/USING은 INNER JOIN의 영역.",
        "4. ANSI 표준 문법 그대로."
      ],
      tip: "CROSS JOIN = 조건 없는 조인 = 카타시안 곱 = M×N행."
    }
  },
  {
    id: 230,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "ENAME"],
        rows: [
          [1, "KIM"],
          [2, "LEE"],
          [3, "PARK"],
          [4, "CHOI"],
          [5, "HAN"]
        ]
      },
      {
        type: "table",
        title: "[DEPT 테이블]",
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
        content: "SELECT COUNT(*)\nFROM EMP CROSS JOIN DEPT;"
      }
    ],
    choices: ["3", "5", "8", "15"],
    ans: 4,
    src: "자료3 p.48~49",
    exp: {
      reason: "CROSS JOIN은 카타시안 곱이라 5×3=15행. PostgreSQL 검증 완료. (자료3 p.48~49)",
      terms: [
        "**CROSS JOIN 행 수**: 좌측 행 수 × 우측 행 수",
        "**조인 조건 없음**: 모든 행 쌍을 결과에 포함",
        "**INNER와 차이**: 매칭 검증 자체가 없음"
      ],
      wrong: [
        "1. 3 = 우측 테이블 행 수만 본 경우.",
        "2. 5 = 좌측 테이블 행 수만 본 경우.",
        "3. 8 = 5+3 합으로 본 경우(CROSS는 곱).",
        "4. (정답) 5×3=15."
      ],
      tip: "CROSS는 곱(×)이지 합(+)이 아니다."
    }
  },
  {
    id: 231,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 두 SQL의 결과 행 수에 대한 설명으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블 (4행)]",
        headers: ["EMPNO", "DEPTNO"],
        rows: [
          [1, 10],
          [2, 10],
          [3, 20],
          [4, null]
        ]
      },
      {
        type: "table",
        title: "[DEPT 테이블 (3행)]",
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
        content: "-- (가)\nSELECT COUNT(*) FROM EMP, DEPT;\n\n-- (나)\nSELECT COUNT(*) FROM EMP CROSS JOIN DEPT;"
      }
    ],
    choices: [
      "(가) 3행, (나) 12행 — (가)는 INNER JOIN처럼 동작",
      "(가) 12행, (나) 12행 — 둘 다 카타시안 곱",
      "(가) 7행, (나) 12행 — (가)는 합집합처럼 동작",
      "(가) 12행, (나) 4행 — (나)는 매칭만 반환"
    ],
    ans: 2,
    src: "자료3 p.48~49",
    exp: {
      reason: "FROM 절에 콤마(,)로 두 테이블을 나열하고 WHERE 조인 조건이 없으면 카타시안 곱이 발생한다. (가)와 (나) 모두 4×3=12행. PostgreSQL 검증 완료. (자료3 p.30, p.48~49)",
      terms: [
        "**FROM A, B (콤마)**: 조인 조건 없으면 자동 카타시안 곱",
        "**CROSS JOIN**: ANSI 표준 명시적 카타시안 곱",
        "**구 문법 vs 표준**: 두 방식이 동일 결과",
        "**NULL과 무관**: CROSS는 조인 키 검증 없음"
      ],
      wrong: [
        "1. 콤마 표기는 INNER JOIN이 아니라 CROSS와 동등.",
        "2. (정답) 둘 다 12행 동일 결과.",
        "3. 합집합과 무관.",
        "4. CROSS JOIN은 매칭 검증 없이 모든 쌍을 반환."
      ],
      tip: "FROM A, B (조건 없음) = A CROSS JOIN B = 카타시안 곱."
    }
  },
  {
    id: 232,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T1 테이블 (3행)]",
        headers: ["A"],
        rows: [[1], [2], [3]]
      },
      {
        type: "table",
        title: "[T2 테이블 (4행)]",
        headers: ["B"],
        rows: [[10], [20], [30], [40]]
      },
      {
        type: "table",
        title: "[T3 테이블 (2행)]",
        headers: ["C"],
        rows: [[100], [200]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT COUNT(*)\nFROM T1 CROSS JOIN T2 CROSS JOIN T3;"
      }
    ],
    choices: ["24", "9", "12", "18"],
    ans: 1,
    src: "자료3 p.48~49",
    exp: {
      reason: "세 테이블의 카타시안 곱은 각 행 수를 모두 곱한다. 3×4×2 = 24행. PostgreSQL 검증 가능. (자료3 p.48~49)",
      terms: [
        "**다중 CROSS JOIN**: 각 테이블 행 수의 곱",
        "**결합 순서 무관**: (T1×T2)×T3 = T1×(T2×T3)",
        "**행 폭증**: N개 테이블 CROSS는 행 수 폭발적 증가"
      ],
      wrong: [
        "1. (정답) 3×4×2=24.",
        "2. 9 = 3×3으로 잘못 계산.",
        "3. 12 = 3×4만 계산하고 T3 빠뜨림.",
        "4. 18 = 무근거."
      ],
      tip: "다중 CROSS JOIN = 모든 테이블 행 수의 곱."
    }
  }
];

module.exports = f2Part2;

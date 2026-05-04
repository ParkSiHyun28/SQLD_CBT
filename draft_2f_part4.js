// 2-F Part 4: Q248~Q255 (SELF JOIN + 조인 결과 행 수 종합)
// 자료3 p.43~50, p.77 기반.
// PostgreSQL 검증: sqld_verify DB에서 모든 SELF JOIN/5종 조인 행 수 직접 실행해 확정.
// 다룬 함정: T-10(조인 결과 행 수 함정).
const f2Part4 = [
  // ============================================================
  // 토픽 97: SELF JOIN (Q248~Q251) - 4문항
  // ============================================================
  {
    id: 248,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: false,
    q: "다음 중 SELF JOIN(셀프 조인)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "동일한 테이블을 두 번 사용하여 자기 자신과 조인하는 방식이며, 두 인스턴스를 구분하기 위해 반드시 서로 다른 별칭(alias)을 부여한다.",
      "사원-관리자, 카테고리-부모카테고리처럼 하나의 테이블 안에 자기 참조(순환) 관계가 있을 때 주로 사용한다.",
      "SELF JOIN은 별도의 SELF JOIN 키워드를 사용하며, 일반 JOIN 문법과는 완전히 다른 별개의 조인 종류이다.",
      "최상위 노드(예: 관리자가 NULL인 사원)도 결과에 포함하려면 보통 LEFT OUTER JOIN과 함께 사용한다."
    ],
    ans: 3,
    src: "자료3 p.77",
    exp: {
      reason: "SELF JOIN은 별도 키워드가 없다. INNER/OUTER/CROSS JOIN 같은 기존 조인 문법을 그대로 쓰되, 동일 테이블을 두 번 FROM에 두고 별칭으로 구분하는 사용 패턴일 뿐이다. (자료3 p.77)",
      terms: [
        "**SELF JOIN**: 같은 테이블을 별칭으로 두 번 참조하여 자기 자신과 조인하는 방식",
        "**자기 참조 관계**: 테이블 한 행이 같은 테이블의 다른 행을 가리키는 관계 (사원의 MGR, 카테고리의 PARENT 등)",
        "**별칭 필수**: SELECT/ON 절에서 어느 인스턴스인지 구분하기 위해 두 번 등장하는 테이블에 다른 별칭 부여",
        "**최상위 처리**: 부모가 NULL인 행을 포함하려면 LEFT OUTER JOIN 사용"
      ],
      wrong: [
        "1. 동일 테이블을 두 번 사용하므로 별칭 구분이 필수다.",
        "2. SELF JOIN의 대표적 사용 시나리오다.",
        "3. (정답) SELF JOIN은 별도 키워드가 아니라 일반 JOIN 문법으로 자기 자신을 참조하는 사용 패턴이다.",
        "4. 최상위(루트) 노드를 살리려면 LEFT OUTER JOIN과 결합하는 것이 일반적이다."
      ],
      tip: "SELF JOIN은 키워드가 아니라 같은 테이블을 별칭으로 두 번 쓰는 패턴. 최상위 살리려면 LEFT OUTER."
    }
  },
  {
    id: 249,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T_EMP]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING", "NULL"],
          ["2", "CLARK", "1"],
          ["3", "JONES", "1"],
          ["4", "SMITH", "3"],
          ["5", "FORD", "3"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT E.ENAME AS 사원, M.ENAME AS 관리자\nFROM T_EMP E INNER JOIN T_EMP M\n  ON E.MGR = M.EMPNO;"
      }
    ],
    choices: [
      "4행",
      "5행",
      "3행",
      "0행"
    ],
    ans: 1,
    src: "자료3 p.77",
    exp: {
      reason: "INNER JOIN이므로 E.MGR이 NULL인 KING은 제외된다. CLARK→KING, JONES→KING, SMITH→JONES, FORD→JONES 총 4건. PostgreSQL 검증 완료. (자료3 p.77)",
      terms: [
        "**INNER JOIN의 NULL 처리**: 조인 키가 NULL이면 어떤 값과도 일치하지 않으므로 결과에서 제외",
        "**E(사원)과 M(관리자)**: 같은 T_EMP를 사원 시점(E)과 관리자 시점(M)으로 두 번 참조",
        "**조인 조건 E.MGR = M.EMPNO**: 사원의 관리자 번호 = 다른 행의 사원번호",
        "**KING 제외 이유**: KING.MGR = NULL → NULL = M.EMPNO가 항상 unknown이라 매칭 안 됨"
      ],
      wrong: [
        "1. (정답) CLARK, JONES, SMITH, FORD 4건이 매칭된다.",
        "2. KING까지 포함한 5건은 LEFT OUTER JOIN의 결과다.",
        "3. 3건은 데이터를 잘못 센 경우. SMITH와 FORD가 모두 JONES를 가리킨다.",
        "4. 0건은 조인 조건이 잘못된 경우. 매칭이 분명히 존재한다."
      ],
      tip: "SELF JOIN INNER에서 MGR=NULL인 최상위는 빠진다. 살리려면 LEFT OUTER."
    }
  },
  {
    id: 250,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T_EMP]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING", "NULL"],
          ["2", "CLARK", "1"],
          ["3", "JONES", "1"],
          ["4", "SMITH", "3"],
          ["5", "FORD", "3"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT E.ENAME AS 사원, M.ENAME AS 관리자\nFROM T_EMP E LEFT OUTER JOIN T_EMP M\n  ON E.MGR = M.EMPNO\nORDER BY E.EMPNO;"
      }
    ],
    choices: [
      "4행이 출력되며 KING은 결과에 포함되지 않는다.",
      "5행이 출력되며 KING의 관리자 컬럼은 'KING'으로 표시된다.",
      "0행이 출력된다 (자기 자신을 조인할 수 없다).",
      "5행이 출력되며 KING의 관리자 컬럼은 NULL로 표시된다."
    ],
    ans: 4,
    src: "자료3 p.77",
    exp: {
      reason: "LEFT OUTER JOIN이므로 왼쪽 테이블(E)의 모든 행이 보존된다. KING.MGR=NULL이라 매칭 행이 없지만 KING 자체는 살아남고 M 쪽 컬럼은 NULL로 채워진다. 총 5행. PostgreSQL 검증 완료. (자료3 p.77)",
      terms: [
        "**LEFT OUTER JOIN**: 왼쪽 테이블 모든 행 + 오른쪽 매칭. 미매칭 시 오른쪽 컬럼은 NULL",
        "**SELF JOIN + LEFT**: 최상위(루트) 노드 보존을 위해 결합하는 전형적 패턴",
        "**KING.MGR = NULL**: 조인 조건 NULL = ?는 unknown이라 INNER에서는 빠지지만 LEFT에서는 왼쪽 행으로 살아남음",
        "**관리자 컬럼 NULL**: M 쪽이 비어 있으므로 M.ENAME도 NULL로 표시"
      ],
      wrong: [
        "1. INNER JOIN의 결과 설명이다. LEFT OUTER이므로 KING도 살아남는다.",
        "2. KING의 관리자는 KING이 아니라 NULL이다. 조인 조건이 매칭되지 않았기 때문이다.",
        "3. 동일 테이블이라도 별칭으로 구분하면 자기 조인이 가능하다. SELF JOIN의 핵심이다.",
        "4. (정답) KING이 살아남고 관리자 컬럼은 NULL로 채워진다."
      ],
      tip: "SELF JOIN + LEFT OUTER = 최상위 보존. 미매칭은 NULL로 채움."
    }
  },
  {
    id: 251,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "상",
    has_code: true,
    q: "다음 SQL은 같은 관리자를 둔 동료(자기 자신 제외)를 찾는 쿼리이다. 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T_EMP]",
        headers: ["EMPNO", "ENAME", "MGR"],
        rows: [
          ["1", "KING", "NULL"],
          ["2", "CLARK", "1"],
          ["3", "JONES", "1"],
          ["4", "SMITH", "3"],
          ["5", "FORD", "3"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT E.ENAME AS 사원, C.ENAME AS 동료\nFROM T_EMP E INNER JOIN T_EMP C\n  ON E.MGR = C.MGR\n AND E.EMPNO <> C.EMPNO;"
      }
    ],
    choices: [
      "2행",
      "4행",
      "5행",
      "0행"
    ],
    ans: 2,
    src: "자료3 p.77",
    exp: {
      reason: "MGR=1을 둔 사원은 CLARK, JONES → (CLARK,JONES), (JONES,CLARK) 2건. MGR=3을 둔 사원은 SMITH, FORD → (SMITH,FORD), (FORD,SMITH) 2건. 합계 4건. KING은 MGR이 NULL이라 NULL=NULL이 unknown이므로 제외된다. PostgreSQL 검증 완료. (자료3 p.77)",
      terms: [
        "**E.MGR = C.MGR**: 같은 관리자를 둔 두 사원을 페어링",
        "**E.EMPNO <> C.EMPNO**: 자기 자신과의 페어 제거 (이 조건이 없으면 자기 자신도 결과에 포함됨)",
        "**대칭 페어링**: (CLARK,JONES)와 (JONES,CLARK)가 모두 등장 → 한 쌍당 2행",
        "**NULL 제외**: KING.MGR=NULL이라 NULL=NULL이 unknown으로 처리되어 INNER에서 제외"
      ],
      wrong: [
        "1. 2행은 한 방향만 센 경우 (대칭 페어가 두 번 등장하는 점 누락).",
        "2. (정답) (CLARK,JONES),(JONES,CLARK),(SMITH,FORD),(FORD,SMITH) 총 4건.",
        "3. 5행은 KING까지 포함한다고 본 경우. KING은 MGR이 NULL이라 매칭 안 됨.",
        "4. 0행은 조인 조건을 잘못 본 경우. 동료 페어가 분명히 존재한다."
      ],
      tip: "동료 SELF JOIN은 한 쌍이 두 행으로 나타남. 자기 자신 제거 조건 필수."
    }
  },

  // ============================================================
  // 토픽 98: 조인 결과 행 수 종합 (Q252~Q255) - 4문항
  // ============================================================
  {
    id: 252,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP] (5건)",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          ["1", "KIM", "10"],
          ["2", "LEE", "10"],
          ["3", "PARK", "20"],
          ["4", "CHOI", "NULL"],
          ["5", "NAM", "50"]
        ]
      },
      {
        type: "table",
        title: "[DEPT] (4건)",
        headers: ["DEPTNO", "DNAME"],
        rows: [
          ["10", "SALES"],
          ["20", "IT"],
          ["30", "HR"],
          ["40", "PLAN"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT COUNT(*)\nFROM EMP E INNER JOIN DEPT D\n  ON E.DEPTNO = D.DEPTNO;"
      }
    ],
    choices: [
      "3",
      "5",
      "7",
      "20"
    ],
    ans: 1,
    src: "자료3 p.47",
    exp: {
      reason: "INNER JOIN은 매칭되는 행만 반환한다. 매칭: KIM-10, LEE-10, PARK-20 총 3건. CHOI(DEPTNO=NULL)와 NAM(DEPT에 50번 부서 없음)은 제외, DEPT의 30/40번 부서도 제외. PostgreSQL 검증 완료. (자료3 p.47)",
      terms: [
        "**INNER JOIN**: 양쪽 테이블에서 조인 조건이 참인 행만 반환. NULL은 어떤 값과도 매칭 안 됨",
        "**LEFT OUTER**: 왼쪽 전체 + 오른쪽 매칭 → 5건 (CHOI, NAM도 살아남음)",
        "**RIGHT OUTER**: 오른쪽 전체 + 왼쪽 매칭 → 5건 (HR, PLAN도 살아남음)",
        "**FULL OUTER**: 양쪽 전체 → 7건 (3 + 미매칭 2(CHOI,NAM) + 미매칭 2(HR,PLAN))",
        "**CROSS JOIN**: 카타시안 곱 5×4 = 20건"
      ],
      wrong: [
        "1. (정답) KIM-10, LEE-10, PARK-20 매칭 3건이 INNER 결과다.",
        "2. 5는 LEFT OUTER 또는 RIGHT OUTER의 결과다.",
        "3. 7은 FULL OUTER의 결과다 (양쪽 미매칭 모두 포함).",
        "4. 20은 CROSS JOIN의 결과다 (5×4)."
      ],
      tip: "INNER=매칭만. NULL DEPTNO와 DEPT에 없는 부서는 모두 제외."
    }
  },
  {
    id: 253,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 [EMP](5건)와 [DEPT](4건)에 대해 5종 조인을 수행했다. 결과 행 수가 옳게 짝지어진 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP] (5건)",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          ["1", "KIM", "10"],
          ["2", "LEE", "10"],
          ["3", "PARK", "20"],
          ["4", "CHOI", "NULL"],
          ["5", "NAM", "50"]
        ]
      },
      {
        type: "table",
        title: "[DEPT] (4건)",
        headers: ["DEPTNO", "DNAME"],
        rows: [
          ["10", "SALES"],
          ["20", "IT"],
          ["30", "HR"],
          ["40", "PLAN"]
        ]
      }
    ],
    choices: [
      "INNER 3, LEFT 4, RIGHT 4, FULL 5, CROSS 9",
      "INNER 5, LEFT 5, RIGHT 4, FULL 9, CROSS 20",
      "INNER 3, LEFT 5, RIGHT 5, FULL 7, CROSS 20",
      "INNER 3, LEFT 5, RIGHT 5, FULL 9, CROSS 20"
    ],
    ans: 3,
    src: "자료3 p.43~50",
    exp: {
      reason: "INNER 3(매칭만), LEFT 5(EMP 전체), RIGHT 5(DEPT 전체+매칭 EMP), FULL 7(매칭 3 + EMP 미매칭 2(CHOI,NAM) + DEPT 미매칭 2(HR,PLAN)), CROSS 20(5×4). PostgreSQL 검증 완료. (자료3 p.43~50)",
      terms: [
        "**INNER 3**: KIM-10, LEE-10, PARK-20 매칭만",
        "**LEFT 5**: EMP 5건 전부 보존 (CHOI는 NULL 부서, NAM은 미매칭 50번 부서로 살아남음)",
        "**RIGHT 5**: DEPT 4건 전부 보존 + EMP 매칭. 10번에 KIM/LEE 두 건 매칭하므로 4+1=5",
        "**FULL 7**: 매칭 3 + EMP 미매칭 2(CHOI,NAM) + DEPT 미매칭 2(HR,PLAN) = 7",
        "**CROSS 20**: 5×4 카타시안 곱"
      ],
      wrong: [
        "1. CROSS가 9가 아니라 20(5×4). LEFT/RIGHT도 잘못됨.",
        "2. INNER가 5가 아니다. 매칭은 3건뿐.",
        "3. (정답) 5종 조인 행 수가 모두 맞다.",
        "4. FULL이 9가 아니라 7. 매칭 3건은 양쪽에서 한 번씩만 세야 한다."
      ],
      tip: "FULL = 매칭 + 양쪽 미매칭. 매칭을 두 번 세지 않도록 주의."
    }
  },
  {
    id: 254,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "상",
    has_code: true,
    q: "다음 [T_C1](3건)과 [T_C2](4건)에 대한 조인 결과 행 수 중 가장 옳지 않은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T_C1] (3건)",
        headers: ["ID", "NAME"],
        rows: [
          ["1", "A"],
          ["2", "B"],
          ["3", "C"]
        ]
      },
      {
        type: "table",
        title: "[T_C2] (4건)",
        headers: ["ID", "VAL"],
        rows: [
          ["1", "x"],
          ["1", "y"],
          ["2", "z"],
          ["4", "w"]
        ]
      }
    ],
    choices: [
      "INNER JOIN 결과는 3행이다 (1-x, 1-y, 2-z).",
      "LEFT OUTER JOIN 결과는 4행이다 (3건 매칭 + ID=3 미매칭).",
      "FULL OUTER JOIN 결과는 5행이다 (매칭 3 + 왼쪽 미매칭 1 + 오른쪽 미매칭 1).",
      "CROSS JOIN 결과는 7행이다 (3+4)."
    ],
    ans: 4,
    src: "자료3 p.43~50",
    exp: {
      reason: "CROSS JOIN은 합이 아니라 곱이다. 3×4 = 12행. 나머지는 모두 옳다. INNER 3, LEFT 4, RIGHT 4, FULL 5, CROSS 12. PostgreSQL 검증 완료. (자료3 p.43~50)",
      terms: [
        "**1:N 매칭**: T_C2에 ID=1이 두 건이라 INNER에서 A 한 행이 두 번 매칭됨 (1-x, 1-y)",
        "**INNER 3**: 1-x, 1-y, 2-z (T_C1.ID=3과 T_C2.ID=4는 미매칭)",
        "**LEFT 4**: INNER 3건 + T_C1의 ID=3(미매칭) 1건",
        "**RIGHT 4**: INNER 3건 + T_C2의 ID=4(미매칭) 1건",
        "**FULL 5**: 매칭 3 + 왼쪽 미매칭 1(ID=3) + 오른쪽 미매칭 1(ID=4)",
        "**CROSS 12**: 3 × 4 = 12 (덧셈 아니라 곱셈)"
      ],
      wrong: [
        "1. INNER에서 ID=1이 두 건 매칭되므로 (1-x, 1-y, 2-z) 3행이 맞다.",
        "2. LEFT는 T_C1 전체 3건 + ID=3 미매칭이지만 결과는 매칭 3건(1이 두 번) + ID=3 1건 = 4행이 맞다.",
        "3. FULL은 매칭 3 + 양쪽 미매칭 각 1건씩 합쳐 5행이 맞다.",
        "4. (정답) CROSS는 합(3+4=7)이 아니라 곱(3×4=12)이다."
      ],
      tip: "CROSS는 카타시안 곱(M×N). 절대 덧셈 아님."
    }
  },
  {
    id: 255,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "상",
    has_code: true,
    q: "조인 컬럼에 NULL이 포함된 다음 시나리오에서, 보기 중 결과 행 수가 가장 옳지 않은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP] (4건)",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          ["1", "KIM", "10"],
          ["2", "LEE", "10"],
          ["3", "PARK", "NULL"],
          ["4", "CHOI", "NULL"]
        ]
      },
      {
        type: "table",
        title: "[DEPT] (3건)",
        headers: ["DEPTNO", "DNAME"],
        rows: [
          ["10", "SALES"],
          ["20", "IT"],
          ["30", "HR"]
        ]
      }
    ],
    choices: [
      "INNER JOIN ON E.DEPTNO = D.DEPTNO 결과는 2행이다 (KIM, LEE만 매칭).",
      "LEFT OUTER JOIN 결과는 6행이다 (왼쪽 전체 4건에 NULL 두 건이 각각 DEPT 모든 행과 매칭되므로 4 + 2×3).",
      "FULL OUTER JOIN 결과는 6행이다 (매칭 2 + EMP 미매칭 2(NULL DEPTNO) + DEPT 미매칭 2(IT, HR)).",
      "CROSS JOIN 결과는 12행이다 (4×3, 조인 조건과 NULL은 무관)."
    ],
    ans: 2,
    src: "자료3 p.43~50",
    exp: {
      reason: "LEFT OUTER에서 NULL DEPTNO를 가진 PARK과 CHOI는 어떤 DEPT 행과도 매칭되지 않는다(NULL=값은 unknown). 따라서 NULL 행 두 건은 미매칭으로 한 번씩만 보존되고 D 컬럼은 NULL로 채워진다. 결과는 매칭 2(KIM,LEE) + EMP 미매칭 2(PARK,CHOI) = 4행이다. PostgreSQL 검증 완료. (자료3 p.43~50)",
      terms: [
        "**NULL 조인 컬럼**: NULL = 값은 항상 unknown → INNER 제외, OUTER에서는 한 번만 보존",
        "**INNER 2**: KIM-10, LEE-10. PARK/CHOI는 NULL이라 제외",
        "**LEFT 4**: 매칭 2 + EMP 미매칭 2(PARK,CHOI는 D쪽 NULL로 채움). NULL이 모든 행과 매칭되는 게 아님",
        "**RIGHT 4**: 매칭 2 + DEPT 미매칭 2(IT,HR)",
        "**FULL 6**: 매칭 2 + EMP 미매칭 2 + DEPT 미매칭 2",
        "**CROSS 12**: 4×3, 조인 조건이 없으므로 NULL 무관"
      ],
      wrong: [
        "1. INNER에서 NULL은 어떤 값과도 매칭 안 됨. KIM/LEE 2건이 맞다.",
        "2. (정답) LEFT OUTER에서 NULL 조인 키는 모든 오른쪽 행과 매칭되는 것이 아니다. NULL은 미매칭으로 한 번만 보존되고 D 컬럼은 NULL로 채워진다. 결과는 4행.",
        "3. FULL은 매칭 2 + 양쪽 미매칭 각 2건씩 = 6행이 맞다.",
        "4. CROSS JOIN은 조인 조건 없이 모든 조합을 만들므로 4×3=12행이 맞다."
      ],
      tip: "OUTER JOIN에서 NULL 조인 키는 미매칭으로 한 번 보존. 다른 쪽 모든 행과 매칭되지 않음."
    }
  }
];

module.exports = f2Part4;

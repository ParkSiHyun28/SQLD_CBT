// 2-F Part 1: Q201~Q214 (조인 개념 + 분류 + EQUI + NON-EQUI)
// 자료3 p.43~46 기반. 정답은 자료에 명시된 내용만 사용.
// PostgreSQL 검증: sqld_verify DB에서 직접 실행해 결과 확정.
// 토픽 86(개념/규칙) 3 + 87(종류 분류) 3 + 88(EQUI Oracle vs ANSI) 5 + 89(NON-EQUI) 3 = 14문항
// 정답 분포: 1번×4, 2번×4, 3번×3, 4번×3
const f2Part1 = [
  // ============================================================
  // 토픽 86: 조인 개념 및 기본 규칙 (Q201~Q203) - 3문항
  // ============================================================
  {
    id: 201,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "하",
    has_code: false,
    q: "다음 중 조인(JOIN)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "여러 테이블의 데이터를 동시에 출력하거나 참조할 때 사용한다.",
      "일반적인 경우 행들은 PK나 FK 값의 연관에 의해 조인이 성립한다.",
      "FROM 절에 여러 테이블이 나열되더라도 SQL에서 데이터를 처리할 때는 단 2개의 집합 간에만 조인이 일어난다.",
      "PK, FK 관계가 없으면 어떤 경우에도 조인이 성립하지 않는다."
    ],
    ans: 4,
    src: "자료3 p.43",
    exp: {
      reason: "PK, FK 관계가 없어도 논리적인 값들의 연관만으로 조인이 성립할 수 있다. PK/FK는 일반적인 경우의 기준일 뿐 필수 요건이 아니다. (자료3 p.43)",
      terms: [
        "**조인(JOIN)**: 여러 테이블에 나뉘어 있는 관련 데이터를 하나의 결과 집합으로 모으는 방법",
        "**PK(Primary Key)**: 테이블의 행을 유일하게 식별하는 키",
        "**FK(Foreign Key)**: 다른 테이블의 PK를 참조하는 키",
        "**조인의 단위**: FROM 절에 N개 테이블이 있어도 실제로는 2개씩 순차적으로 조인 (A JOIN B 결과와 C 조인)"
      ],
      wrong: [
        "1. 자료3 p.43에 명시된 조인의 정의이다.",
        "2. 일반적으로 PK-FK 관계로 조인이 성립한다는 자료 문구 그대로다.",
        "3. SQL 처리 단위가 단 2개 집합 간이라는 자료 설명 그대로다.",
        "4. (정답) PK/FK 없이 논리적 값 연관으로도 조인 가능하다는 예외가 자료에 명시되어 있다."
      ],
      tip: "조인은 보통 PK-FK 기반이지만 필수 아님. 논리적 값 연관만 있으면 가능."
    }
  },
  {
    id: 202,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "하",
    has_code: false,
    q: "다음 중 N개의 테이블을 조인할 때 필요한 최소 조인 조건의 개수로 옳은 것은?",
    blocks: null,
    choices: [
      "N - 1 개",
      "N 개",
      "N + 1 개",
      "2 × N 개"
    ],
    ans: 1,
    src: "자료3 p.43",
    exp: {
      reason: "N개의 테이블을 조인할 때는 최소 N-1개의 조인 조건이 필요하다. 조인 조건이 부족하면 카타시안 곱(Cartesian Product)이 발생하여 의도치 않은 결과가 나온다. (자료3 p.43, p.46)",
      terms: [
        "**N-1 규칙**: 3개 테이블 조인 시 최소 2개 조인 조건, 4개면 3개 등",
        "**카타시안 곱(Cartesian Product)**: 조인 조건이 없거나 부족하면 두 테이블의 모든 조합이 생성됨",
        "**조인 조건 누락 사례**: 3개 테이블에서 1개 조건만 쓰면 1개 테이블이 카타시안 곱 형태로 붙음"
      ],
      wrong: [
        "1. (정답) 자료3 p.43, p.46의 \"N개의 테이블 조인 시 최소 N-1개의 조인 조건 필요\"가 그대로 명시됨.",
        "2. N개로 본 경우. 테이블 수와 같다고 오해.",
        "3. N+1개로 본 경우. 너무 많이 잡음.",
        "4. 2N개로 본 경우. 양방향 조건이 필요하다고 오해."
      ],
      tip: "N개 테이블 = N-1개 조인 조건. 부족하면 카타시안 곱."
    }
  },
  {
    id: 203,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음은 3개 테이블 PLAYER, TEAM, STADIUM을 조인하는 SQL이다. 이 SQL에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT P.PLAYER_NAME, T.TEAM_NAME, S.STADIUM_NAME\nFROM PLAYER P, TEAM T, STADIUM S\nWHERE P.TEAM_ID = T.TEAM_ID\n  AND T.STADIUM_ID = S.STADIUM_ID;"
      }
    ],
    choices: [
      "3개 테이블을 조인하기 위해 최소 2개의 조인 조건이 필요하며, 위 SQL은 이 조건을 충족한다.",
      "SQL이 데이터를 처리할 때 PLAYER와 TEAM이 먼저 조인되고, 그 결과 집합이 STADIUM과 조인된다.",
      "위 SQL은 ORACLE 전통 문법이며, 조인 조건을 WHERE 절에 작성한다.",
      "조인 조건이 N-1개보다 적을 경우 컴파일 오류가 발생하여 SQL이 아예 실행되지 않는다."
    ],
    ans: 4,
    src: "자료3 p.43, p.46",
    exp: {
      reason: "조인 조건이 부족해도 SQL은 실행된다. 다만 부족한 만큼의 테이블이 카타시안 곱으로 붙어 의도치 않은 행 폭증이 발생할 뿐이다. 컴파일 오류가 아니라 논리적 결과 오류다. (자료3 p.43, p.46)",
      terms: [
        "**3개 테이블 조인**: FROM A, B, C → SQL은 (A JOIN B) → 결과 JOIN C 순으로 처리",
        "**조인 조건 부족 시**: 카타시안 곱 발생, 행 수 폭증, 그러나 SQL은 정상 실행",
        "**ORACLE 전통 문법**: FROM 절에 콤마로 테이블 나열, WHERE 절에 조인 조건",
        "**ANSI 표준 문법**: FROM ... INNER JOIN ... ON ... 형태"
      ],
      wrong: [
        "1. 3개 테이블 → N-1=2개 조인 조건. 위 SQL은 P.TEAM_ID=T.TEAM_ID와 T.STADIUM_ID=S.STADIUM_ID 두 개로 충족.",
        "2. 자료3 p.43에 명시된 \"단 2개의 집합 간에만 조인이 일어난다\" 그대로다.",
        "3. WHERE 절에 조인 조건 작성은 ORACLE 전통 문법의 특징이다.",
        "4. (정답) 조인 조건 부족은 컴파일 오류가 아니라 카타시안 곱이라는 논리적 결과 문제다."
      ],
      tip: "조인 조건 부족 → 카타시안 곱(SQL은 실행됨, 행 수만 폭증)."
    }
  },

  // ============================================================
  // 토픽 87: 조인 종류 분류 (Q204~Q206) - 3문항
  // ============================================================
  {
    id: 204,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: false,
    q: "다음 중 조인 종류와 그 정의의 매칭이 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "EQUI JOIN: 조인 조건이 동등(=) 조건일 경우의 조인",
      "NON EQUI JOIN: 조인 조건이 동등 조건이 아닌 경우의 조인 (BETWEEN, <, >= 등)",
      "INNER JOIN: 두 테이블 간 조인 조건이 일치하지 않는 데이터까지 모두 출력",
      "CROSS JOIN: 두 테이블의 모든 조합을 생성하는 조인 (Cartesian Product)"
    ],
    ans: 3,
    src: "자료3 p.43~44",
    exp: {
      reason: "INNER JOIN은 두 테이블 간 조인 조건이 \"일치하는\" 데이터만 출력한다. \"일치하지 않는 데이터까지 출력\"하는 것은 OUTER JOIN이다. (자료3 p.44)",
      terms: [
        "**EQUI JOIN**: 조건의 형태가 동등(=)인 경우. 가장 일반적",
        "**NON EQUI JOIN**: 동등이 아닌 BETWEEN, <, <=, >, >= 등 사용",
        "**INNER JOIN**: 조건이 일치하는 행만 출력 (기본 조인)",
        "**OUTER JOIN**: 조건 불일치 행도 출력 (LEFT/RIGHT/FULL)",
        "**CROSS JOIN**: 모든 조합 (M행 × N행)"
      ],
      wrong: [
        "1. EQUI JOIN의 정의 그대로다.",
        "2. NON EQUI JOIN의 정의 그대로다.",
        "3. (정답) INNER JOIN은 일치 데이터만 출력. 불일치까지 출력은 OUTER JOIN.",
        "4. CROSS JOIN의 정의 (Cartesian Product) 그대로다."
      ],
      tip: "INNER = 매칭만 / OUTER = 매칭 + 불일치까지. 헷갈리지 않기."
    }
  },
  {
    id: 205,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 설명에 해당하는 조인의 종류로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: "[설명]",
        lang: "sql",
        content: "- 같은 테이블을 두 번 이상 참조하는 조인이다.\n- FROM 절에 동일 테이블이 두 번 이상 나타나므로\n  식별을 위해 반드시 테이블 ALIAS를 사용해야 한다.\n- 사원과 그 사원의 매니저를 함께 조회하는 등\n  조직도, 계층 데이터에 자주 활용된다."
      }
    ],
    choices: [
      "NATURAL JOIN",
      "CROSS JOIN",
      "SELF JOIN",
      "OUTER JOIN"
    ],
    ans: 3,
    src: "자료3 p.44, p.46",
    exp: {
      reason: "동일 테이블을 두 번 이상 참조하는 조인은 SELF JOIN이다. ALIAS 필수, 자기 참조 구조에서 사용. (자료3 p.44, p.46)",
      terms: [
        "**SELF JOIN**: 동일 테이블 자기 참조. FROM EMP E1, EMP E2 형태로 ALIAS 필수",
        "**NATURAL JOIN**: 두 테이블의 동일 이름 컬럼을 자동으로 찾아 조인",
        "**CROSS JOIN**: 두 테이블의 모든 조합(카타시안 곱)",
        "**OUTER JOIN**: 조건 불일치 데이터도 함께 출력 (LEFT/RIGHT/FULL)"
      ],
      wrong: [
        "1. NATURAL JOIN은 서로 다른 두 테이블의 동일 컬럼명 자동 조인이다.",
        "2. CROSS JOIN은 조인 조건 없이 모든 조합 생성.",
        "3. (정답) 자기 자신과의 조인 = SELF JOIN. ALIAS 필수 조건이 핵심 단서.",
        "4. OUTER JOIN은 두 테이블 간 불일치 데이터까지 출력하는 조인."
      ],
      tip: "동일 테이블 + ALIAS 필수 = SELF JOIN. 계층/매니저 조회의 단골."
    }
  },
  {
    id: 206,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: false,
    q: "다음 중 조인의 종류와 분류 기준의 연결이 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "조건의 형태에 따른 구분 - EQUI JOIN, NON EQUI JOIN",
      "조인 결과에 따른 구분 - INNER JOIN, OUTER JOIN",
      "OUTER JOIN의 종류 - LEFT OUTER, RIGHT OUTER, FULL OUTER",
      "조건의 형태에 따른 구분 - NATURAL JOIN, CROSS JOIN, SELF JOIN"
    ],
    ans: 4,
    src: "자료3 p.44",
    exp: {
      reason: "NATURAL JOIN, CROSS JOIN, SELF JOIN은 \"조건의 형태\"가 아닌 별개 분류이다. 자료3 p.44에서 조건의 형태는 EQUI/NON EQUI로만 나누고, NATURAL/CROSS/SELF는 별도 항목으로 정리한다. (자료3 p.44)",
      terms: [
        "**조건의 형태에 따른 구분**: EQUI JOIN(=), NON EQUI JOIN(BETWEEN, <, > 등)",
        "**조인 결과에 따른 구분**: INNER JOIN(매칭), OUTER JOIN(불일치 포함)",
        "**OUTER JOIN 3종**: LEFT, RIGHT, FULL",
        "**기타 분류**: NATURAL JOIN(이름 자동), CROSS JOIN(모든 조합), SELF JOIN(자기 참조)"
      ],
      wrong: [
        "1. 자료3 p.44에 명시된 \"조건의 형태\" 분류 그대로다.",
        "2. 자료3 p.44에 명시된 \"조인 결과\" 분류 그대로다.",
        "3. OUTER JOIN의 3종이 정확히 LEFT/RIGHT/FULL이다.",
        "4. (정답) NATURAL/CROSS/SELF는 \"조건 형태\" 분류가 아니라 별도 항목이다."
      ],
      tip: "조건 형태 = EQUI/NON-EQUI 둘 뿐. NATURAL/CROSS/SELF는 별도 카테고리."
    }
  },

  // ============================================================
  // 토픽 88: EQUI JOIN (Oracle vs ANSI) (Q207~Q211) - 5문항
  // ============================================================
  {
    id: 207,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T_EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO"],
        rows: [
          [1, "KIM", 10],
          [2, "LEE", 20],
          [3, "PARK", 10],
          [4, "CHOI", 30]
        ]
      },
      {
        type: "table",
        title: "[T_DEPT 테이블]",
        headers: ["DEPTNO", "DNAME"],
        rows: [
          [10, "SALES"],
          [20, "IT"],
          [40, "HR"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT E.ENAME, D.DNAME\nFROM T_EMP E, T_DEPT D\nWHERE E.DEPTNO = D.DEPTNO;"
      }
    ],
    choices: [
      "3행",
      "4행",
      "5행",
      "12행"
    ],
    ans: 1,
    src: "자료3 p.44",
    exp: {
      reason: "ORACLE 전통 EQUI JOIN. DEPTNO가 일치하는 행만 결과로 나온다. KIM-SALES(10), LEE-IT(20), PARK-SALES(10) 3건. CHOI(30)와 HR(40)은 매칭 부서 없어 제외. PostgreSQL 검증 완료. (자료3 p.44)",
      terms: [
        "**EQUI JOIN(Oracle 전통)**: FROM A, B WHERE A.col = B.col 형태",
        "**INNER 의미**: 양쪽 테이블에서 조인 컬럼이 일치하는 행만 결과에 포함",
        "**제외 행**: 한쪽에만 있는 DEPTNO(EMP의 30, DEPT의 40)는 결과에서 빠짐"
      ],
      wrong: [
        "1. (정답) 매칭되는 KIM/LEE/PARK 3건.",
        "2. CHOI까지 포함한다고 본 경우(LEFT OUTER 결과). EQUI JOIN은 매칭만.",
        "3. CHOI + HR까지 포함한다고 본 경우(FULL OUTER 결과).",
        "4. 카타시안 곱(4×3=12)으로 본 경우. WHERE 조건이 있어 카타시안 아님."
      ],
      tip: "EQUI JOIN(=) 조건 충족 행만. 한쪽에만 있는 값은 제외."
    }
  },
  {
    id: 208,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 두 SQL은 같은 결과를 반환한다. 이에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: "[SQL A]",
        lang: "sql",
        content: "SELECT E.ENAME, D.DNAME\nFROM T_EMP E, T_DEPT D\nWHERE E.DEPTNO = D.DEPTNO;"
      },
      {
        type: "code",
        title: "[SQL B]",
        lang: "sql",
        content: "SELECT E.ENAME, D.DNAME\nFROM T_EMP E INNER JOIN T_DEPT D\n  ON E.DEPTNO = D.DEPTNO;"
      }
    ],
    choices: [
      "SQL A는 ORACLE 전통 문법이고, SQL B는 ANSI/ISO 표준 문법이며, 두 문법 모두 동일한 EQUI JOIN을 표현한다.",
      "SQL A는 ANSI 표준 문법이고, SQL B는 ORACLE 전용 문법이다.",
      "SQL B만 EQUI JOIN이며, SQL A는 NON EQUI JOIN이다.",
      "두 SQL은 문법은 다르지만 SQL B는 ORACLE에서 실행되지 않는다."
    ],
    ans: 1,
    src: "자료3 p.44",
    exp: {
      reason: "WHERE 절에 조인 조건을 쓰는 것이 ORACLE 전통, ON 절에 쓰는 것이 ANSI/ISO 표준이다. 두 문법은 동일한 EQUI JOIN(=)을 표현하며 결과도 같다. (자료3 p.44)",
      terms: [
        "**ORACLE 전통 문법**: FROM A, B WHERE A.col = B.col",
        "**ANSI/ISO 표준 문법**: FROM A INNER JOIN B ON A.col = B.col",
        "**동등성**: 두 문법은 결과 동일. 다만 ANSI가 표준이고 가독성 우수",
        "**ORACLE도 ANSI 지원**: ORACLE 9i부터 INNER JOIN/ON 절 모두 사용 가능"
      ],
      wrong: [
        "1. (정답) ORACLE 전통(WHERE) vs ANSI(ON) 분류가 자료3 p.44와 일치.",
        "2. 정확히 반대로 본 경우. WHERE 절 조인은 ORACLE 전통.",
        "3. 두 SQL 모두 = 사용했으므로 둘 다 EQUI JOIN.",
        "4. ORACLE도 ANSI INNER JOIN 문법을 지원한다."
      ],
      tip: "WHERE에 조인 조건 = ORACLE 전통 / ON 절 = ANSI 표준. 결과는 동일."
    }
  },
  {
    id: 209,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL은 오류가 발생한다. 그 원인으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT PLAYER.PLAYER_NAME, T.TEAM_NAME\nFROM PLAYER P, TEAM T\nWHERE P.TEAM_ID = T.TEAM_ID;"
      }
    ],
    choices: [
      "FROM 절에 INNER JOIN 키워드가 빠졌기 때문이다.",
      "테이블에 ALIAS(P, T)를 적용했으므로 SELECT 절에서도 본래 테이블명(PLAYER)이 아닌 ALIAS(P)를 사용해야 한다.",
      "WHERE 절의 조인 조건에 등호(=)를 사용했기 때문이다.",
      "FROM 절에 두 테이블이 콤마(,)로 나열되어 있기 때문이다."
    ],
    ans: 2,
    src: "자료3 p.44",
    exp: {
      reason: "테이블에 ALIAS를 적용한 경우 SELECT, WHERE 등 다른 절에서도 반드시 ALIAS만 사용해야 하며, 본래 테이블명을 사용하면 오류가 발생한다. PostgreSQL에서도 동일하게 \"invalid reference to FROM-clause entry\" 오류 확인. (자료3 p.44)",
      terms: [
        "**ALIAS 일관성 규칙**: FROM 절에서 ALIAS 부여 시, SELECT/WHERE/ORDER BY 등 모든 절에서 ALIAS만 유효",
        "**본래 테이블명 사용 시**: ORACLE/PostgreSQL 등 모두 \"FROM 절에 해당 테이블 참조 불가\" 오류",
        "**올바른 작성**: SELECT P.PLAYER_NAME, T.TEAM_NAME ... (PLAYER → P)"
      ],
      wrong: [
        "1. ORACLE 전통 문법은 INNER JOIN 키워드 없이도 정상 실행된다.",
        "2. (정답) ALIAS 부여 후 본래 테이블명 사용은 자료3 p.44에 명시된 오류 사례.",
        "3. EQUI JOIN의 = 사용은 정상 문법이다.",
        "4. FROM 절에 콤마로 테이블 나열은 ORACLE 전통 EQUI JOIN의 정상 문법이다."
      ],
      tip: "ALIAS 부여 = 본래 테이블명 봉인. 모든 절에서 ALIAS만 사용."
    }
  },
  {
    id: 210,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 ANSI/ISO 표준 SQL을 ORACLE 전통 문법으로 변환할 때 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: "[ANSI/ISO 표준]",
        lang: "sql",
        content: "SELECT P.PLAYER_NAME, T.TEAM_NAME\nFROM PLAYER P\nINNER JOIN TEAM T\n  ON P.TEAM_ID = T.TEAM_ID\nWHERE P.POSITION = 'GK';"
      }
    ],
    choices: [
      "SELECT P.PLAYER_NAME, T.TEAM_NAME FROM PLAYER P, TEAM T ON P.TEAM_ID = T.TEAM_ID WHERE P.POSITION = 'GK';",
      "SELECT P.PLAYER_NAME, T.TEAM_NAME FROM PLAYER P INNER JOIN TEAM T WHERE P.TEAM_ID = T.TEAM_ID AND P.POSITION = 'GK';",
      "SELECT P.PLAYER_NAME, T.TEAM_NAME FROM PLAYER P, TEAM T WHERE P.TEAM_ID = T.TEAM_ID AND P.POSITION = 'GK';",
      "SELECT P.PLAYER_NAME, T.TEAM_NAME FROM PLAYER P, TEAM T WHERE P.TEAM_ID = T.TEAM_ID OR P.POSITION = 'GK';"
    ],
    ans: 3,
    src: "자료3 p.44~45",
    exp: {
      reason: "ANSI의 ON 절(조인 조건)과 WHERE 절(필터링 조건)이 ORACLE 전통에서는 모두 WHERE 절에 AND로 묶여 들어간다. 조인 조건과 필터 조건은 공존하므로 AND로 결합. (자료3 p.45 \"데이터 필터링 조건도 WHERE 절에\" 사례 참조)",
      terms: [
        "**ANSI ON vs WHERE**: ON은 조인 조건, WHERE는 필터링 조건 (논리적 분리)",
        "**ORACLE 전통**: 조인 조건 + 필터 조건 모두 WHERE 절에 AND로 결합",
        "**변환 규칙**: ON 절 + WHERE 절 → 모두 WHERE에 AND로 합침"
      ],
      wrong: [
        "1. ORACLE 전통 문법에는 ON 절이 없다. WHERE만 사용.",
        "2. INNER JOIN과 WHERE 조인 조건의 혼용은 정상 문법이 아니다(불완전 ANSI).",
        "3. (정답) 조인 조건과 필터 조건을 WHERE에 AND로 결합한 정확한 변환.",
        "4. AND가 아닌 OR로 결합하면 결과가 완전히 달라진다(필터 무력화)."
      ],
      tip: "ANSI ON + WHERE → ORACLE WHERE에 AND로 합치기. OR 아님."
    }
  },
  {
    id: 211,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T_EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL"],
        rows: [
          [1, "KIM", 10, 3000],
          [2, "LEE", 20, 2500],
          [3, "PARK", 10, 1500]
        ]
      },
      {
        type: "table",
        title: "[T_DEPT 테이블]",
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
        content: "SELECT E.ENAME, D.DNAME\nFROM T_EMP E INNER JOIN T_DEPT D\n  ON E.DEPTNO = D.DEPTNO\nWHERE E.SAL >= 2000\nORDER BY E.EMPNO;"
      }
    ],
    choices: [
      "KIM-SALES, PARK-SALES 2건",
      "KIM-SALES, LEE-IT 2건",
      "KIM-SALES, LEE-IT, PARK-SALES 3건",
      "LEE-IT 1건"
    ],
    ans: 2,
    src: "자료3 p.45",
    exp: {
      reason: "ANSI INNER JOIN으로 부서가 매칭되는 행은 KIM/LEE/PARK 3건이지만 WHERE 절 필터(SAL >= 2000)에서 PARK(1500)이 제외되어 KIM(3000)과 LEE(2500) 2건이 결과. PostgreSQL 검증 완료. (자료3 p.45)",
      terms: [
        "**ANSI 처리 순서**: INNER JOIN ON으로 조인 → WHERE로 필터링 → ORDER BY로 정렬",
        "**조인 조건 vs 필터 조건**: ON 절(조인), WHERE 절(필터). 자료3 p.45 \"데이터 필터링 조건도 WHERE 절에\"",
        "**SAL >= 2000**: PARK(1500) 제외, KIM(3000)과 LEE(2500) 통과"
      ],
      wrong: [
        "1. SAL 필터를 잘못 적용해 PARK까지 포함한 경우. PARK는 1500이라 제외.",
        "2. (정답) 조인 후 SAL>=2000 필터로 KIM/LEE 통과.",
        "3. WHERE 필터를 무시하고 INNER JOIN 매칭만 본 경우.",
        "4. KIM도 통과(3000>=2000)인데 LEE만 본 경우."
      ],
      tip: "ANSI: ON으로 조인 → WHERE로 필터. SAL>=2000 → 1500은 제외."
    }
  },

  // ============================================================
  // 토픽 89: NON-EQUI JOIN (Q212~Q214) - 3문항
  // ============================================================
  {
    id: 212,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "하",
    has_code: false,
    q: "다음 중 NON EQUI JOIN(비등가 조인)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "두 테이블 간에 컬럼 값들이 서로 정확하게 일치하지 않는 경우에 사용한다.",
      "등호(=) 연산자가 아닌 BETWEEN, <, <=, >, >= 등의 연산자를 사용하여 조인한다.",
      "급여 등급표처럼 특정 값이 어떤 범위에 속하는지 찾는 경우에 자주 사용된다.",
      "모든 테이블 쌍에 대해 항상 NON EQUI JOIN을 수행할 수 있으며, 설계상 수행 불가능한 경우는 존재하지 않는다."
    ],
    ans: 4,
    src: "자료3 p.45~46",
    exp: {
      reason: "자료3 p.45~46에 \"대부분 비등가 조인을 수행할 수 있으나, 때론 설계상의 이유로 수행이 불가능함\"이라고 명시되어 있다. 항상 가능한 것은 아니다. (자료3 p.45~46)",
      terms: [
        "**NON EQUI JOIN**: 컬럼 값이 정확히 일치하지 않을 때 사용. = 외 연산자 활용",
        "**대표 사례**: 급여 등급표(SALGRADE)에서 LOSAL/HISAL 범위로 등급 매칭",
        "**연산자**: BETWEEN A AND B, <, <=, >, >=, !=, <>",
        "**설계상 불가**: 두 테이블의 컬럼 의미상 범위 매칭이 불가능한 경우 존재"
      ],
      wrong: [
        "1. 자료3 p.45의 NON EQUI JOIN 정의 그대로다.",
        "2. 자료3 p.45의 사용 연산자 그대로다.",
        "3. 자료3 p.45의 SALGRADE 예시 그대로다.",
        "4. (정답) 자료3 p.45~46에 \"때론 설계상의 이유로 수행이 불가능\"이라고 명시되어 있다."
      ],
      tip: "NON EQUI = 등호 외 연산자. 항상 가능 X(설계상 불가 케이스 존재)."
    }
  },
  {
    id: 213,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T_EMP 테이블]",
        headers: ["ENAME", "SAL"],
        rows: [
          ["KIM", 3000],
          ["LEE", 2500],
          ["PARK", 1500],
          ["CHOI", 800]
        ]
      },
      {
        type: "table",
        title: "[T_SAL (급여 등급) 테이블]",
        headers: ["GRADE", "LOSAL", "HISAL"],
        rows: [
          [1, 500, 1000],
          [2, 1001, 2000],
          [3, 2001, 3000],
          [4, 3001, 9999]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT E.ENAME, E.SAL, S.GRADE\nFROM T_EMP E, T_SAL S\nWHERE E.SAL BETWEEN S.LOSAL AND S.HISAL;"
      }
    ],
    choices: [
      "KIM-3000-4, LEE-2500-3, PARK-1500-2, CHOI-800-1",
      "KIM-3000-3, LEE-2500-3, PARK-1500-2, CHOI-800-1",
      "KIM-3000-3, LEE-2500-2, PARK-1500-2, CHOI-800-1",
      "KIM-3000-4, LEE-2500-3, PARK-1500-2 (CHOI는 매칭 등급 없음)"
    ],
    ans: 2,
    src: "자료3 p.45~46",
    exp: {
      reason: "BETWEEN을 사용한 NON EQUI JOIN. KIM(3000)은 등급3(2001~3000)에 포함, LEE(2500)도 등급3, PARK(1500)은 등급2(1001~2000), CHOI(800)는 등급1(500~1000). PostgreSQL 검증 완료. (자료3 p.45~46)",
      terms: [
        "**BETWEEN A AND B**: A 이상 B 이하 (양 끝값 포함)",
        "**NON EQUI 매칭 로직**: 각 EMP 행마다 SAL이 어느 등급의 LOSAL~HISAL 범위에 속하는지 검사",
        "**KIM=3000**: 등급3의 HISAL=3000 포함 → 등급3 (등급4는 3001부터)",
        "**CHOI=800**: 등급1의 LOSAL=500 ≤ 800 ≤ HISAL=1000 → 등급1"
      ],
      wrong: [
        "1. KIM 3000을 등급4(3001~9999)로 본 경우. 3000은 등급3 상한 포함.",
        "2. (정답) 모든 행이 BETWEEN 범위에 정확히 매칭.",
        "3. LEE 2500을 등급2(1001~2000)로 본 경우. 2500은 등급3 범위(2001~3000).",
        "4. CHOI 800이 매칭 안 된다고 본 경우. 등급1 범위(500~1000)에 포함."
      ],
      tip: "BETWEEN은 양 끝 포함. 경계값(3000=등급3 HISAL) 주의."
    }
  },
  {
    id: 214,
    subj: 2,
    topic: "2-F",
    topic_name: "조인",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T_EMP 테이블]",
        headers: ["EMPNO", "ENAME", "DEPTNO", "SAL"],
        rows: [
          [1, "KIM", 10, 3000],
          [2, "LEE", 20, 2500],
          [3, "PARK", 10, 1500]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT E1.ENAME AS A, E2.ENAME AS B\nFROM T_EMP E1, T_EMP E2\nWHERE E1.DEPTNO = E2.DEPTNO\n  AND E1.SAL > E2.SAL;"
      }
    ],
    choices: [
      "0행",
      "1행",
      "2행",
      "3행"
    ],
    ans: 2,
    src: "자료3 p.45~46",
    exp: {
      reason: "EQUI 조건(같은 부서)과 NON EQUI 조건(SAL 큰 쪽이 E1)을 조합한 SELF JOIN. DEPTNO=10에 KIM(3000), PARK(1500) 두 명 → KIM>PARK 1쌍 성립. DEPTNO=20에는 LEE 1명뿐이라 비교 불가. 총 1행. PostgreSQL 검증 완료. (자료3 p.45~46)",
      terms: [
        "**SELF JOIN + NON EQUI**: 같은 테이블을 두 번 참조하면서 = 외 조건으로 비교",
        "**E1.DEPTNO = E2.DEPTNO**: 같은 부서 페어만 (EQUI 조건)",
        "**E1.SAL > E2.SAL**: E1 급여가 E2보다 큰 경우만 (NON EQUI 조건)",
        "**부서별 페어 수**: DEPTNO=10에 2명(KIM/PARK) → SAL 비교로 1쌍, DEPTNO=20은 1명이라 0쌍"
      ],
      wrong: [
        "1. 0행으로 본 경우. NON EQUI 조건이 모두 거짓이라 본 오해.",
        "2. (정답) DEPTNO=10에서 KIM(3000) > PARK(1500) 1쌍.",
        "3. 양방향 페어로 본 경우(KIM>PARK + PARK>KIM=2쌍). 그러나 SAL>는 한 방향뿐.",
        "4. 자기 자신 페어까지 포함했다고 본 경우. SAL>SAL은 거짓이라 자기 페어 제외."
      ],
      tip: "SELF JOIN + SAL>는 한 방향만. 같은 부서 페어에서만 비교."
    }
  }
];

module.exports = f2Part1;

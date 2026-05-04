// 2-H: Q341~Q360 (집합 연산자 전체)
// 자료3 p.58~60 기반. PostgreSQL 14에서 결과 직접 검증.
// MINUS는 PostgreSQL 미지원이라 EXCEPT로 검증, Oracle MINUS 결과는 자료 인용으로 동치 처리.
const h2Part1 = [
  // ============================================================
  // 토픽 108: 집합 연산자 개념 (Q341~Q343) - 3문항
  // ============================================================
  {
    id: 341,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "하",
    has_code: false,
    q: "다음 중 집합 연산자(Set Operator)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "각 SELECT 문의 결과를 하나의 집합으로 보고 합집합, 교집합, 차집합 연산을 수행한다.",
      "두 개 이상의 테이블에서 JOIN을 사용하지 않고 연관된 데이터를 조회할 수 있다.",
      "전체 결과의 컬럼명과 데이터 타입은 두 번째 SELECT 문에 의해 결정된다.",
      "두 집합의 각 컬럼은 순서와 데이터 타입이 상호 호환 가능해야 한다."
    ],
    ans: 3,
    src: "자료3 p.58~59",
    exp: {
      reason: "전체 결과 집합의 컬럼명과 데이터 타입은 첫 번째 SELECT 문에 의해 결정된다. 두 번째 이후 SELECT의 컬럼명은 무시된다. (자료3 p.58~59)",
      terms: [
        "**집합 연산자**: UNION, UNION ALL, INTERSECT, EXCEPT(MINUS) 4종",
        "**컬럼 결정 규칙**: 첫 번째 SELECT가 결과 컬럼명/타입의 기준",
        "**호환 조건**: 컬럼 수 일치 + 컬럼 순서별 데이터 타입 호환",
        "**JOIN과의 차이**: JOIN은 가로 결합(컬럼 추가), 집합 연산자는 세로 결합(행 추가)"
      ],
      wrong: [
        "1. 자료3 p.58의 집합 연산자 정의 그대로다.",
        "2. 자료3 p.58에 명시된 집합 연산자의 활용 방법이다.",
        "3. (정답) 첫 번째 SELECT가 기준이다. 두 번째 SELECT의 컬럼명은 무시된다.",
        "4. 자료3 p.58에 명시된 호환 조건이다."
      ],
      tip: "결과 컬럼명/타입은 **첫 번째 SELECT** 기준. 둘째부터는 순서와 타입만 맞으면 됨."
    }
  },
  {
    id: 342,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "하",
    has_code: false,
    q: "다음 중 집합 연산자와 그 설명의 매칭으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "UNION - 두 집합의 합집합. 중복된 데이터는 한 번만 출력한다.",
      "UNION ALL - 두 집합의 합집합. 중복을 제거하지 않고 모든 행을 반환한다.",
      "INTERSECT - 두 집합의 공통으로 있는 행을 출력하며 중복을 제거한다.",
      "EXCEPT - 두 집합의 합집합에서 교집합을 뺀 대칭 차집합을 반환한다."
    ],
    ans: 4,
    src: "자료3 p.59~60",
    exp: {
      reason: "EXCEPT(Oracle MINUS)는 앞 집합에서 뒤 집합과 겹치는 행을 뺀 차집합(A-B)이며 대칭 차집합이 아니다. A EXCEPT B와 B EXCEPT A의 결과는 서로 다르다. (자료3 p.59~60)",
      terms: [
        "**UNION**: 합집합, 중복 제거(내부적 정렬 발생)",
        "**UNION ALL**: 합집합, 중복 유지(정렬 없음, 성능 우수)",
        "**INTERSECT**: 교집합, 중복 제거",
        "**EXCEPT(MINUS)**: 차집합 A-B, 한 쪽에만 있는 행 출력, 순서 의존"
      ],
      wrong: [
        "1. UNION 정의 그대로다.",
        "2. UNION ALL 정의 그대로다.",
        "3. INTERSECT 정의 그대로다.",
        "4. (정답) EXCEPT는 A-B 단방향 차집합이다. 대칭 차집합 아님."
      ],
      tip: "EXCEPT = A - B (한 방향). 대칭 차집합 아님. 순서 바꾸면 결과 다름."
    }
  },
  {
    id: 343,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "하",
    has_code: false,
    q: "다음 중 Oracle의 MINUS 연산자와 동일한 동작을 하는 표준 SQL 집합 연산자는?",
    blocks: null,
    choices: [
      "UNION",
      "UNION ALL",
      "INTERSECT",
      "EXCEPT"
    ],
    ans: 4,
    src: "자료3 p.59~60",
    exp: {
      reason: "Oracle은 차집합을 MINUS로 표기하고 SQL Server/PostgreSQL/표준 SQL은 EXCEPT로 표기한다. 두 연산자는 이름만 다를 뿐 동작이 동일하다. (자료3 p.59~60)",
      terms: [
        "**MINUS**: Oracle 전용 차집합 키워드",
        "**EXCEPT**: 표준 SQL/SQL Server/PostgreSQL의 차집합 키워드",
        "**동작**: 앞 SELECT 결과에서 뒤 SELECT 결과에 있는 행을 제거(중복 제거)",
        "**순서 의존**: A MINUS B ≠ B MINUS A"
      ],
      wrong: [
        "1. UNION은 합집합. MINUS와 다름.",
        "2. UNION ALL은 중복 유지 합집합.",
        "3. INTERSECT는 교집합.",
        "4. (정답) EXCEPT가 MINUS와 동일한 차집합 연산자이다."
      ],
      tip: "Oracle = MINUS / 표준 SQL = EXCEPT. 같은 차집합."
    }
  },

  // ============================================================
  // 토픽 109: UNION vs UNION ALL (Q344~Q348) - 5문항
  // ============================================================
  {
    id: 344,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[X 테이블]",
        headers: ["N"],
        rows: [["10"], ["20"], ["20"], ["30"], ["40"]]
      },
      {
        type: "table",
        title: "[Y 테이블]",
        headers: ["N"],
        rows: [["20"], ["30"], ["30"], ["50"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT N FROM X\nUNION\nSELECT N FROM Y;"
      }
    ],
    choices: [
      "4",
      "5",
      "9",
      "10"
    ],
    ans: 2,
    src: "자료3 p.59",
    exp: {
      reason: "UNION은 중복을 제거한 합집합이다. {10,20,30,40} ∪ {20,30,50} = {10,20,30,40,50}이므로 5행이다. PostgreSQL 검증 완료. (자료3 p.59)",
      terms: [
        "**UNION**: 중복 제거된 합집합. 내부 정렬 후 중복 제거",
        "**중복 제거 범위**: 같은 집합 내 중복도 함께 제거됨 (X의 (20,20)도 한 행으로)",
        "**결과**: {10, 20, 30, 40, 50} 5행"
      ],
      wrong: [
        "1. 4 = 양쪽 공통이거나 한쪽 고유 값 수를 잘못 계산.",
        "2. (정답) 중복 제거 후 5개 고유 값.",
        "3. 9 = UNION ALL 결과(5+4=9). UNION은 중복을 제거한다.",
        "4. 10 = 단순 합산을 잘못한 경우."
      ],
      tip: "UNION은 **중복 제거 합집합** → 고유 값 개수만 셈."
    }
  },
  {
    id: 345,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[X 테이블]",
        headers: ["N"],
        rows: [["10"], ["20"], ["20"], ["30"], ["40"]]
      },
      {
        type: "table",
        title: "[Y 테이블]",
        headers: ["N"],
        rows: [["20"], ["30"], ["30"], ["50"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT N FROM X\nUNION ALL\nSELECT N FROM Y;"
      }
    ],
    choices: [
      "5",
      "7",
      "9",
      "10"
    ],
    ans: 3,
    src: "자료3 p.59",
    exp: {
      reason: "UNION ALL은 중복을 제거하지 않고 모든 행을 반환한다. X의 5행 + Y의 4행 = 9행이다. PostgreSQL 검증 완료. (자료3 p.59)",
      terms: [
        "**UNION ALL**: 중복 제거 없이 모든 행 결합",
        "**행 수 공식**: UNION ALL = 각 SELECT 행 수의 단순 합",
        "**성능**: 정렬/중복 제거 연산이 없어 UNION보다 빠름"
      ],
      wrong: [
        "1. 5 = UNION 결과(중복 제거).",
        "2. 7 = UNION ALL이 같은 테이블 내 중복만 제거한다고 착각한 경우.",
        "3. (정답) 5+4=9. 단순 합산.",
        "4. 10 = 행 수를 잘못 계산."
      ],
      tip: "UNION ALL = **단순 합산**. 두 SELECT 행 수를 더하면 끝."
    }
  },
  {
    id: 346,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 (R1, R2)에 해당하는 행 수의 조합으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[A 테이블]",
        headers: ["V"],
        rows: [["1"], ["2"], ["2"], ["3"]]
      },
      {
        type: "table",
        title: "[B 테이블]",
        headers: ["V"],
        rows: [["2"], ["3"], ["3"], ["4"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- R1\nSELECT V FROM A UNION SELECT V FROM B;\n\n-- R2\nSELECT V FROM A UNION ALL SELECT V FROM B;"
      }
    ],
    choices: [
      "(R1=4, R2=8)",
      "(R1=4, R2=4)",
      "(R1=8, R2=8)",
      "(R1=2, R2=8)"
    ],
    ans: 1,
    src: "자료3 p.59",
    exp: {
      reason: "UNION은 중복 제거된 고유 값 {1,2,3,4} → 4행. UNION ALL은 단순 합 4+4 → 8행. PostgreSQL 검증 완료. (자료3 p.59)",
      terms: [
        "**UNION 결과**: {1, 2, 3, 4} 4개 고유 값",
        "**UNION ALL 결과**: 1, 2, 2, 3, 2, 3, 3, 4 → 8행",
        "**핵심 차이**: 중복 제거 여부 (UNION만 제거)"
      ],
      wrong: [
        "1. (정답) 중복 제거 4행, 단순 합 8행.",
        "2. UNION ALL이 중복을 제거한다고 착각.",
        "3. UNION이 중복을 제거하지 않는다고 착각.",
        "4. R1을 교집합으로 잘못 본 경우."
      ],
      tip: "두 결과 같으면 UNION ALL 선호(정렬/중복 제거 비용 절감)."
    }
  },
  {
    id: 347,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: false,
    q: "다음 중 UNION과 UNION ALL의 비교에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "UNION은 중복 제거를 위해 내부적으로 정렬을 수행하므로 UNION ALL보다 비용이 크다.",
      "두 집합에 중복된 데이터가 없는 것이 보장된다면 UNION ALL을 사용하는 것이 좋다.",
      "UNION ALL은 결과 집합을 자동으로 오름차순 정렬한 뒤 반환한다.",
      "UNION의 결과 행 수는 항상 UNION ALL의 결과 행 수보다 작거나 같다."
    ],
    ans: 3,
    src: "자료3 p.59",
    exp: {
      reason: "UNION ALL은 정렬을 수행하지 않고 단순히 결과를 결합해 반환한다. 자동 정렬은 UNION에서 중복 제거 과정의 부산물로 발생할 수 있을 뿐, UNION ALL과는 무관하다. (자료3 p.59)",
      terms: [
        "**UNION 동작**: 정렬 → 중복 제거 → 반환",
        "**UNION ALL 동작**: 단순 결합만 (정렬 없음)",
        "**성능**: UNION ALL > UNION (정렬/중복 제거 비용 차이)",
        "**행 수 관계**: |UNION| ≤ |UNION ALL|"
      ],
      wrong: [
        "1. 자료3 p.59에 명시된 UNION의 비용 특성이다.",
        "2. 중복이 없으면 결과가 같으므로 빠른 UNION ALL이 유리하다.",
        "3. (정답) UNION ALL은 자동 정렬을 하지 않는다.",
        "4. UNION은 중복을 제거하므로 행 수가 같거나 줄어든다."
      ],
      tip: "UNION = 정렬+중복제거 / UNION ALL = 단순 결합. 정렬은 UNION 쪽."
    }
  },
  {
    id: 348,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (출력은 N 오름차순 기준)",
    blocks: [
      {
        type: "table",
        title: "[A 테이블]",
        headers: ["N"],
        rows: [["1"], ["2"], ["2"], ["3"]]
      },
      {
        type: "table",
        title: "[B 테이블]",
        headers: ["N"],
        rows: [["2"], ["3"], ["3"], ["4"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT N FROM A\nUNION\nSELECT N FROM B\nORDER BY N;"
      }
    ],
    choices: [
      "1, 2, 2, 3, 3, 4",
      "1, 2, 3, 4",
      "1, 2, 2, 3, 2, 3, 3, 4",
      "2, 3"
    ],
    ans: 2,
    src: "자료3 p.59",
    exp: {
      reason: "UNION은 양쪽 집합의 모든 고유 값만 남긴다. {1,2,3} ∪ {2,3,4} = {1,2,3,4}이고 ORDER BY로 오름차순 정렬되어 1,2,3,4가 출력된다. PostgreSQL 검증 완료. (자료3 p.59)",
      terms: [
        "**고유 값 집합**: A의 고유값 {1,2,3} + B의 고유값 {2,3,4}",
        "**UNION 결과**: 둘을 합쳐 중복 제거 → {1,2,3,4}",
        "**ORDER BY**: 마지막 SELECT 뒤에서 전체 결과에 적용"
      ],
      wrong: [
        "1. UNION ALL의 결과를 정렬한 형태(중복 유지).",
        "2. (정답) 중복 제거 후 4개 고유 값.",
        "3. UNION ALL 결과(8행).",
        "4. INTERSECT 결과(교집합)."
      ],
      tip: "UNION = 두 집합의 고유 값 모두. 중복은 한 번씩만."
    }
  },

  // ============================================================
  // 토픽 110: INTERSECT 연산자 (Q349~Q352) - 4문항
  // ============================================================
  {
    id: 349,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (출력은 N 오름차순 기준)",
    blocks: [
      {
        type: "table",
        title: "[A 테이블]",
        headers: ["N"],
        rows: [["1"], ["2"], ["2"], ["3"]]
      },
      {
        type: "table",
        title: "[B 테이블]",
        headers: ["N"],
        rows: [["2"], ["3"], ["3"], ["4"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT N FROM A\nINTERSECT\nSELECT N FROM B\nORDER BY N;"
      }
    ],
    choices: [
      "1, 4",
      "2, 3",
      "1, 2, 3, 4",
      "2, 2, 3, 3"
    ],
    ans: 2,
    src: "자료3 p.59~60",
    exp: {
      reason: "INTERSECT는 두 집합의 공통 행만 출력하고 중복을 제거한다. A의 고유값 {1,2,3}과 B의 고유값 {2,3,4}의 교집합은 {2,3}이다. PostgreSQL 검증 완료. (자료3 p.59~60)",
      terms: [
        "**INTERSECT**: 양쪽에 모두 존재하는 행만 반환",
        "**중복 제거**: 결과에서 중복을 자동으로 제거",
        "**결과**: {2, 3}"
      ],
      wrong: [
        "1. {1, 4} = 대칭 차집합(어느 한쪽에만 존재).",
        "2. (정답) 양쪽 공통 값.",
        "3. UNION 결과.",
        "4. 중복을 제거하지 않은 잘못된 형태(INTERSECT는 중복 제거)."
      ],
      tip: "INTERSECT = 양쪽 모두에 있는 값만. 중복 자동 제거."
    }
  },
  {
    id: 350,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[S1: 시즌1 출연진]",
        headers: ["BAEYEOK", "BONMYEONG"],
        rows: [["하석진", "차민혁"], ["이승기", "구원"], ["이세영", "오민정"], ["박해진", "이정환"]]
      },
      {
        type: "table",
        title: "[S2: 시즌2 출연진]",
        headers: ["BAEYEOK", "BONMYEONG"],
        rows: [["이승기", "구원"], ["이세영", "오민정"], ["김남길", "백호"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT BAEYEOK, BONMYEONG FROM S1\nINTERSECT\nSELECT BAEYEOK, BONMYEONG FROM S2;"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "5"
    ],
    ans: 2,
    src: "자료3 p.59",
    exp: {
      reason: "INTERSECT는 양쪽에 공통으로 존재하는 행을 반환한다. (이승기,구원), (이세영,오민정) 두 쌍이 양쪽에 모두 있으므로 2행이다. PostgreSQL 검증 완료. (자료3 p.59)",
      terms: [
        "**다중 컬럼 INTERSECT**: 컬럼 조합 전체가 동일해야 매칭",
        "**예시 매칭**: 시즌1과 시즌2 모두 출연한 (배역명, 본명) 쌍",
        "**중복 제거**: 양쪽에 같은 쌍이 여러 번 있어도 한 번만 출력"
      ],
      wrong: [
        "1. 1 = 한 쌍만 매칭으로 본 경우.",
        "2. (정답) (이승기,구원), (이세영,오민정) 두 쌍.",
        "3. 3 = S2의 행 수.",
        "4. 5 = UNION 결과 행 수."
      ],
      tip: "다중 컬럼 INTERSECT는 **컬럼 조합 전체가 일치**해야 함."
    }
  },
  {
    id: 351,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (출력은 N 오름차순 기준)",
    blocks: [
      {
        type: "table",
        title: "[X 테이블]",
        headers: ["N"],
        rows: [["10"], ["20"], ["20"], ["30"], ["40"]]
      },
      {
        type: "table",
        title: "[Y 테이블]",
        headers: ["N"],
        rows: [["20"], ["30"], ["30"], ["50"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT N FROM X\nINTERSECT\nSELECT N FROM Y\nORDER BY N;"
      }
    ],
    choices: [
      "10, 20, 30, 40, 50",
      "20, 30",
      "20, 20, 30, 30",
      "10, 40, 50"
    ],
    ans: 2,
    src: "자료3 p.59~60",
    exp: {
      reason: "INTERSECT는 X와 Y의 공통 값만 중복 제거하여 반환한다. X의 고유값 {10,20,30,40}과 Y의 고유값 {20,30,50}의 교집합은 {20, 30}이다. PostgreSQL 검증 완료. (자료3 p.59~60)",
      terms: [
        "**교집합**: 양쪽에 존재하는 값만",
        "**중복 제거**: X에 20이 2번, Y에 30이 2번 있어도 결과는 한 번씩",
        "**결과**: {20, 30}"
      ],
      wrong: [
        "1. UNION 결과.",
        "2. (정답) 공통 값 두 개.",
        "3. INTERSECT가 중복을 제거하지 않는다고 착각.",
        "4. 한쪽에만 있는 값(대칭 차집합)을 INTERSECT로 본 경우."
      ],
      tip: "INTERSECT는 합쳐서 보지 말고 **둘 다 있는 값**만 골라낸다."
    }
  },
  {
    id: 352,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: false,
    q: "다음 중 INTERSECT 연산자에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "두 집합 모두에 공통으로 존재하는 행을 반환한다.",
      "결과에서 중복된 행은 자동으로 제거된다.",
      "두 SELECT 문의 컬럼 수가 일치해야 하며, 각 컬럼의 데이터 타입이 호환 가능해야 한다.",
      "Oracle에서는 INTERSECT 대신 MINUS 키워드를 사용한다."
    ],
    ans: 4,
    src: "자료3 p.59~60",
    exp: {
      reason: "Oracle도 교집합은 INTERSECT 키워드를 사용한다. MINUS는 교집합이 아니라 차집합 연산자이며, 표준 SQL의 EXCEPT에 해당한다. (자료3 p.59~60)",
      terms: [
        "**INTERSECT**: Oracle/SQL Server/PostgreSQL 모두 동일 키워드 사용",
        "**MINUS(Oracle)**: 차집합 연산자(EXCEPT의 Oracle 표기)",
        "**호환 조건**: 컬럼 수 일치 + 타입 호환은 모든 집합 연산자 공통"
      ],
      wrong: [
        "1. INTERSECT 정의 그대로다.",
        "2. INTERSECT는 중복 제거를 자동 수행한다.",
        "3. 모든 집합 연산자에 공통으로 적용되는 호환 조건이다.",
        "4. (정답) Oracle의 MINUS는 차집합. 교집합은 INTERSECT 그대로다."
      ],
      tip: "교집합 = INTERSECT(공통) / 차집합 = MINUS(Oracle) = EXCEPT(표준)."
    }
  },

  // ============================================================
  // 토픽 111: EXCEPT/MINUS 연산자 (Q353~Q356) - 4문항
  // ============================================================
  {
    id: 353,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (출력은 N 오름차순 기준)",
    blocks: [
      {
        type: "table",
        title: "[A 테이블]",
        headers: ["N"],
        rows: [["1"], ["2"], ["2"], ["3"]]
      },
      {
        type: "table",
        title: "[B 테이블]",
        headers: ["N"],
        rows: [["2"], ["3"], ["3"], ["4"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT N FROM A\nEXCEPT\nSELECT N FROM B\nORDER BY N;"
      }
    ],
    choices: [
      "1",
      "4",
      "1, 4",
      "2, 3"
    ],
    ans: 1,
    src: "자료3 p.59~60",
    exp: {
      reason: "EXCEPT는 앞 집합(A)에서 뒤 집합(B)에 있는 값을 제거한 차집합이다. A의 고유값 {1,2,3}에서 B에도 있는 {2,3}을 빼면 {1}만 남는다. PostgreSQL 검증 완료. (자료3 p.59~60)",
      terms: [
        "**EXCEPT (A - B)**: A에 있고 B에는 없는 값",
        "**중복 제거**: A에 같은 값이 여러 번 있어도 한 번만 출력",
        "**결과**: {1}"
      ],
      wrong: [
        "1. (정답) A에만 있는 고유 값.",
        "2. 4 = B EXCEPT A 결과(순서를 반대로 본 경우).",
        "3. 1, 4 = 대칭 차집합(양쪽 한 번에 묶은 경우).",
        "4. 2, 3 = INTERSECT 결과."
      ],
      tip: "EXCEPT는 **앞 - 뒤**. A에만 있고 B에 없는 값."
    }
  },
  {
    id: 354,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 두 SQL의 실행 결과 (R1, R2)에 해당하는 행 조합으로 옳은 것은? (각 결과는 N 오름차순)",
    blocks: [
      {
        type: "table",
        title: "[X 테이블]",
        headers: ["N"],
        rows: [["10"], ["20"], ["20"], ["30"], ["40"]]
      },
      {
        type: "table",
        title: "[Y 테이블]",
        headers: ["N"],
        rows: [["20"], ["30"], ["30"], ["50"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- R1\nSELECT N FROM X EXCEPT SELECT N FROM Y;\n\n-- R2\nSELECT N FROM Y EXCEPT SELECT N FROM X;"
      }
    ],
    choices: [
      "(R1: 10,40 / R2: 50)",
      "(R1: 50 / R2: 10,40)",
      "(R1: 20,30 / R2: 20,30)",
      "(R1: 10,40,50 / R2: 10,40,50)"
    ],
    ans: 1,
    src: "자료3 p.59~60",
    exp: {
      reason: "X EXCEPT Y = X에만 있는 값 = {10, 40}. Y EXCEPT X = Y에만 있는 값 = {50}. 순서를 바꾸면 결과가 다르다. PostgreSQL 검증 완료. (자료3 p.59~60)",
      terms: [
        "**A EXCEPT B ≠ B EXCEPT A**: 순서 의존",
        "**X EXCEPT Y**: X 고유값 {10,20,30,40}에서 Y에 있는 {20,30} 제거 → {10,40}",
        "**Y EXCEPT X**: Y 고유값 {20,30,50}에서 X에 있는 {20,30} 제거 → {50}"
      ],
      wrong: [
        "1. (정답) 순서에 따라 결과가 다름.",
        "2. R1과 R2를 뒤바꾼 경우.",
        "3. INTERSECT 결과로 본 경우.",
        "4. 대칭 차집합(EXCEPT의 합집합)으로 본 경우."
      ],
      tip: "EXCEPT는 **순서 의존**. A EXCEPT B와 B EXCEPT A는 다르다."
    }
  },
  {
    id: 355,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과로 옳은 것은? (출력은 ENAME 오름차순)",
    blocks: [
      {
        type: "table",
        title: "[S1: 시즌1 출연진]",
        headers: ["ENAME"],
        rows: [["KIM"], ["LEE"], ["PARK"], ["CHOI"]]
      },
      {
        type: "table",
        title: "[S2: 시즌2 출연진]",
        headers: ["ENAME"],
        rows: [["LEE"], ["PARK"], ["JUNG"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ENAME FROM S1\nMINUS\nSELECT ENAME FROM S2\nORDER BY ENAME;"
      }
    ],
    choices: [
      "CHOI, JUNG, KIM",
      "CHOI, KIM",
      "LEE, PARK",
      "JUNG"
    ],
    ans: 2,
    src: "자료3 p.60",
    exp: {
      reason: "Oracle의 MINUS는 표준 SQL의 EXCEPT와 동작이 같다. 시즌1에는 출연했으나 시즌2에는 출연하지 않은 배우 = S1 - S2 = {CHOI, KIM}. (자료3 p.60, PostgreSQL EXCEPT로 검증)",
      terms: [
        "**MINUS = EXCEPT**: Oracle 키워드와 표준 SQL 키워드만 다를 뿐 동작 동일",
        "**의미**: 시즌1에 출연했으나 시즌2에는 출연하지 않은 배우",
        "**결과**: {CHOI, KIM} (LEE, PARK은 양쪽 출연이라 제거)"
      ],
      wrong: [
        "1. JUNG은 S2에만 있어 S1 MINUS S2에 포함되지 않음.",
        "2. (정답) S1에만 존재하는 두 명.",
        "3. INTERSECT 결과(양쪽 공통).",
        "4. S2 MINUS S1 결과."
      ],
      tip: "MINUS는 **앞 SELECT에만 있고 뒤에는 없는** 행."
    }
  },
  {
    id: 356,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: false,
    q: "다음 중 EXCEPT(MINUS) 연산자에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "앞 SELECT 결과에서 뒤 SELECT 결과에 존재하는 행을 제거한 차집합을 반환한다.",
      "결과에서 중복된 행은 자동으로 제거된다.",
      "A EXCEPT B와 B EXCEPT A는 일반적으로 결과가 동일하다.",
      "Oracle은 MINUS, SQL Server와 PostgreSQL은 EXCEPT 키워드를 사용한다."
    ],
    ans: 3,
    src: "자료3 p.59~60",
    exp: {
      reason: "EXCEPT는 순서 의존 연산자라 일반적으로 A EXCEPT B ≠ B EXCEPT A이다. 자료3 p.60에도 \"(A-B)와 (B-A)는 다르니 집합의 순서에 주의하자\"고 명시되어 있다. (자료3 p.60)",
      terms: [
        "**순서 의존성**: 차집합은 비대칭 연산",
        "**A EXCEPT B**: A에만 있는 행",
        "**B EXCEPT A**: B에만 있는 행",
        "**중복 제거**: EXCEPT는 결과의 중복을 자동 제거"
      ],
      wrong: [
        "1. EXCEPT의 정의 그대로다.",
        "2. EXCEPT는 중복 제거를 자동 수행한다.",
        "3. (정답) 순서를 바꾸면 결과가 달라진다.",
        "4. Oracle = MINUS, 표준 SQL = EXCEPT."
      ],
      tip: "EXCEPT는 **순서 바꾸면 결과 다름**. 합집합/교집합과 달리 비대칭."
    }
  },

  // ============================================================
  // 토픽 112: 사용 시 주의사항 (Q357~Q360) - 4문항
  // ============================================================
  {
    id: 357,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 SQL을 실행했을 때 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[P 테이블]",
        headers: ["A", "B"],
        rows: [["1", "x"]]
      },
      {
        type: "table",
        title: "[Q 테이블]",
        headers: ["A", "B", "C"],
        rows: [["1", "x", "100"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT A, B FROM P\nUNION\nSELECT A, B, C FROM Q;"
      }
    ],
    choices: [
      "(1, x) 한 행이 출력된다.",
      "(1, x), (1, x, 100) 두 행이 출력된다.",
      "Q의 C 컬럼이 NULL로 채워져 두 행이 출력된다.",
      "두 SELECT 문의 컬럼 수가 달라 오류가 발생한다."
    ],
    ans: 4,
    src: "자료3 p.60",
    exp: {
      reason: "집합 연산자는 양쪽 SELECT의 컬럼 수가 일치해야 한다. P는 2컬럼, Q는 3컬럼이라 \"each UNION query must have the same number of columns\" 오류가 발생한다. PostgreSQL 검증 완료. (자료3 p.60)",
      terms: [
        "**컬럼 수 일치**: 집합 연산자 사용의 첫 번째 필수 조건",
        "**자동 NULL 채움 없음**: 부족한 컬럼을 NULL로 자동 채우지 않음",
        "**해결책**: 부족한 쪽에 명시적으로 NULL/상수 SELECT (예: `SELECT A, B, NULL FROM P`)"
      ],
      wrong: [
        "1. 컬럼 수 불일치 단계에서 오류로 실행 자체가 실패한다.",
        "2. 컬럼 수가 다른 행은 결합되지 않는다.",
        "3. NULL 자동 채움은 일어나지 않는다.",
        "4. (정답) 컬럼 수 불일치 오류."
      ],
      tip: "컬럼 수 다르면 **무조건 오류**. NULL 자동 채움 없음."
    }
  },
  {
    id: 358,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: false,
    q: "다음 중 집합 연산자 사용 시 주의사항으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "두 집합의 컬럼 수가 일치해야 한다.",
      "두 집합의 각 컬럼의 데이터 타입은 상호 호환 가능해야 한다.",
      "각 컬럼의 사이즈(자릿수)는 서로 달라도 된다.",
      "각 SELECT 문 안에 ORDER BY를 자유롭게 사용할 수 있다."
    ],
    ans: 4,
    src: "자료3 p.60",
    exp: {
      reason: "ORDER BY는 개별 SELECT 안에 사용할 수 없고, 마지막 SELECT 뒤에 한 번만 사용해 전체 결과 집합에 적용한다. GROUP BY는 개별 SELECT 안에 사용 가능하다. (자료3 p.60)",
      terms: [
        "**컬럼 수**: 일치 필수",
        "**데이터 타입**: 상호 호환 가능 (예: NUMBER와 INT)",
        "**컬럼 사이즈**: 달라도 됨 (예: VARCHAR(10)과 VARCHAR(20))",
        "**ORDER BY**: 마지막 SELECT 뒤에 한 번만, 전체 결과에 적용",
        "**GROUP BY**: 개별 SELECT 안에서 사용 가능"
      ],
      wrong: [
        "1. 자료3 p.60의 첫 번째 주의사항이다.",
        "2. 자료3 p.60의 데이터 타입 호환 조건이다.",
        "3. 자료3 p.60에 \"각 컬럼의 사이즈는 달라도 됨\"으로 명시.",
        "4. (정답) 개별 SELECT의 ORDER BY는 불가. 마지막에 한 번만."
      ],
      tip: "ORDER BY = **마지막 한 번만 / 전체 결과 적용**. GROUP BY는 각 SELECT 안에 가능."
    }
  },
  {
    id: 359,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: true,
    q: "다음 SQL 중 문법적으로 오류 없이 정상 실행되는 것을 모두 고른 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가)\nSELECT N FROM A ORDER BY N\nUNION\nSELECT N FROM B;\n\n-- (나)\nSELECT N FROM A\nUNION\nSELECT N FROM B\nORDER BY N;\n\n-- (다)\nSELECT DEPTNO, COUNT(*) FROM EMP1 GROUP BY DEPTNO\nUNION ALL\nSELECT DEPTNO, COUNT(*) FROM EMP2 GROUP BY DEPTNO;\n\n-- (라)\nSELECT N FROM A\nUNION\nSELECT N FROM B\nORDER BY N\nUNION\nSELECT N FROM C;"
      }
    ],
    choices: [
      "(가), (나)",
      "(나), (다)",
      "(가), (라)",
      "(나), (다), (라)"
    ],
    ans: 2,
    src: "자료3 p.60",
    exp: {
      reason: "(가)는 첫 SELECT 안의 ORDER BY 위치 오류, (라)는 ORDER BY 뒤에 다시 UNION이 와서 오류. (나)는 마지막에 ORDER BY 한 번, (다)는 각 SELECT의 GROUP BY 사용으로 정상이다. (자료3 p.60)",
      terms: [
        "**ORDER BY 위치**: 마지막 SELECT 뒤에 한 번만",
        "**GROUP BY**: 개별 SELECT 안에 자유롭게 사용 가능",
        "**(가) 오류**: 중간 SELECT에 ORDER BY 사용",
        "**(라) 오류**: ORDER BY 뒤에 UNION이 또 오면 안 됨"
      ],
      wrong: [
        "1. (가)는 ORDER BY 위치 오류로 실패.",
        "2. (정답) (나) 정상 + (다) GROUP BY 사용 정상.",
        "3. (가)와 (라) 모두 ORDER BY 위치 오류.",
        "4. (라)는 ORDER BY 뒤 UNION 추가로 오류."
      ],
      tip: "ORDER BY는 **맨 마지막 한 번**. GROUP BY는 각 SELECT 안에서 자유."
    }
  },
  {
    id: 360,
    subj: 2,
    topic: "2-H",
    topic_name: "집합 연산자",
    diff: "중",
    has_code: false,
    q: "다음 중 집합 연산자 사용 시 결과 집합의 컬럼명에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "결과 집합의 컬럼명은 첫 번째 SELECT 문에 의해 결정된다.",
      "결과 집합의 컬럼명은 두 번째 SELECT 문에 의해 결정된다.",
      "결과 집합의 컬럼명은 양쪽 SELECT 문의 컬럼명을 모두 표시한다.",
      "결과 집합의 컬럼명은 자동으로 COL1, COL2 등으로 부여된다."
    ],
    ans: 1,
    src: "자료3 p.58",
    exp: {
      reason: "자료3 p.58에 \"전체 집합의 컬럼명과 데이터 타입은 첫 번째 집합에 의해 결정됨\"으로 명시되어 있다. 두 번째 SELECT의 컬럼명은 무시된다. (자료3 p.58)",
      terms: [
        "**컬럼명 결정 규칙**: 첫 번째 SELECT의 컬럼명/별칭이 기준",
        "**두 번째 SELECT 컬럼명**: 다르더라도 무시됨",
        "**별칭 활용**: 첫 SELECT에 AS로 별칭을 주면 그 별칭이 결과 컬럼명",
        "**데이터 타입**: 컬럼명과 동일하게 첫 번째 SELECT가 기준"
      ],
      wrong: [
        "1. (정답) 자료3 p.58 명시 내용.",
        "2. 두 번째 SELECT의 컬럼명은 무시된다.",
        "3. 두 컬럼명을 모두 표시하지 않는다.",
        "4. 자동 명명이 아니라 첫 SELECT의 명칭을 사용."
      ],
      tip: "결과 컬럼명/타입 = **첫 번째 SELECT 기준**. 별칭도 첫 SELECT에서."
    }
  }
];

module.exports = h2Part1;

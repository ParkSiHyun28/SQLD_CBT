// 2-M: Q526~Q540 (PIVOT/UNPIVOT 전체)
// 자료3 p.81~82 기반.
// PIVOT/UNPIVOT은 Oracle 11g+/SQL Server 지원. PostgreSQL 미지원.
// Oracle PIVOT 결과는 자료3 p.81~82 인용으로 정답 확정.
// PIVOT 등가 검증: PostgreSQL CASE WHEN + GROUP BY 시뮬레이션.
// UNPIVOT 등가 검증: PostgreSQL UNION ALL 시뮬레이션.
const m2Part1 = [
  // ============================================================
  // 토픽 137: PIVOT 절 (Long → Wide) (Q526~Q532) - 7문항
  // ============================================================
  {
    id: 526,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (Oracle 11g 기준)",
    blocks: [
      {
        type: "table",
        title: "[SALES 테이블]",
        headers: ["YEAR", "PRODUCT", "AMT"],
        rows: [
          ["2023", "A", "100"],
          ["2023", "B", "200"],
          ["2024", "A", "150"],
          ["2024", "B", "250"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM (\n  SELECT YEAR, PRODUCT, AMT\n  FROM SALES\n)\nPIVOT (\n  SUM(AMT)\n  FOR PRODUCT IN ('A', 'B')\n);"
      }
    ],
    choices: [
      "YEAR, PRODUCT, AMT 3개 컬럼에 4행이 출력된다.",
      "YEAR, 'A', 'B' 3개 컬럼에 2행이 출력된다.",
      "YEAR, A, B 3개 컬럼에 2행이 출력되고, 2023행은 A=100, B=200이다.",
      "PRODUCT, AMT 2개 컬럼에 2행이 출력된다."
    ],
    ans: 3,
    src: "자료3 p.81",
    exp: {
      reason: "PIVOT은 Long 형태의 행을 Wide 형태의 컬럼으로 변환한다. PRODUCT 컬럼의 값 'A'와 'B'가 각각 새 컬럼이 되고, SUM(AMT)가 집계값으로 채워진다. 결과: YEAR | A | B 구조, 2023행: A=100, B=200 / 2024행: A=150, B=250. Oracle 자료3 p.81 예시 패턴 그대로. PostgreSQL CASE WHEN 등가 검증: SELECT YEAR, SUM(CASE WHEN PRODUCT='A' THEN AMT END) AS A, SUM(CASE WHEN PRODUCT='B' THEN AMT END) AS B FROM SALES GROUP BY YEAR 결과와 동일. (자료3 p.81)",
      terms: [
        "**PIVOT**: 행(Long)을 열(Wide)로 변환. FOR 절에 명시한 값이 새 컬럼이 됨",
        "**FOR PRODUCT IN ('A','B')**: PRODUCT 컬럼에서 'A', 'B' 값을 각각 컬럼으로 전환",
        "**SUM(AMT)**: 각 YEAR+PRODUCT 조합의 AMT 합계를 해당 셀에 배치",
        "**FROM 서브쿼리**: PIVOT에 필요한 컬럼만 포함시켜 의도 외 컬럼 혼입 방지"
      ],
      wrong: [
        "1. PIVOT 변환 전 원본 형태의 설명이다. PIVOT 후에는 컬럼 수와 행 수가 바뀐다.",
        "2. PIVOT 결과 컬럼명은 IN 절의 값 그대로다. 따옴표 없는 'A', 'B'가 컬럼명이 된다.",
        "3. (정답) YEAR 컬럼과 PRODUCT 값 'A', 'B'가 각 컬럼으로 변환되어 2행이 출력된다.",
        "4. PIVOT 후 PRODUCT 컬럼은 사라지고 IN 절 값이 새 컬럼이 된다."
      ],
      tip: "PIVOT = 특정 컬럼의 **값을 컬럼으로** 전환. FOR 절이 어떤 값을 컬럼으로 만들지 결정."
    }
  },
  {
    id: 527,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 중 Oracle PIVOT 절의 문법 구조로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가)\nSELECT *\nFROM (\n  SELECT YEAR, PRODUCT, AMT FROM SALES\n)\nPIVOT (SUM(AMT) FOR PRODUCT IN ('A', 'B'));\n\n-- (나)\nSELECT *\nFROM SALES\nPIVOT (SUM(AMT) FOR PRODUCT IN ('A', 'B'));\n\n-- (다)\nSELECT *\nFROM (\n  SELECT YEAR, PRODUCT, AMT FROM SALES\n)\nPIVOT (AMT FOR PRODUCT IN ('A', 'B'));\n\n-- (라)\nSELECT *\nFROM (\n  SELECT YEAR, PRODUCT, AMT FROM SALES\n)\nPIVOT (MAX(AMT) FOR PRODUCT IN ('A', 'B'));"
      }
    ],
    choices: [
      "(가)",
      "(나)",
      "(다)",
      "(라)"
    ],
    ans: 3,
    src: "자료3 p.81",
    exp: {
      reason: "PIVOT 절에서 집계 대상 컬럼은 반드시 집계함수로 감싸야 한다. (다)는 AMT를 집계함수 없이 그대로 사용했으므로 오류가 발생한다. 단일 행이어도 집계함수(SUM, MAX, COUNT 등)는 필수다. (나)는 서브쿼리 없이 PIVOT을 적용하는데 SALES에 다른 컬럼이 있으면 의도 외 컬럼이 GROUP BY에 포함될 수 있어 결과가 달라질 수 있지만, 문법 오류는 아니다. (다)는 집계함수 누락으로 문법 오류. (자료3 p.81)",
      terms: [
        "**집계함수 필수**: PIVOT (집계함수(컬럼) FOR ...). 집계함수 없으면 오류",
        "**FROM 서브쿼리 권장**: 필요한 컬럼만 포함해야 의도 외 컬럼 혼입 방지",
        "**가능한 집계함수**: SUM, COUNT, MAX, MIN, AVG 등 모든 집계함수 사용 가능",
        "**문법 필수 순서**: PIVOT (집계함수(컬럼) FOR 피봇컬럼 IN (값1, 값2, ...))"
      ],
      wrong: [
        "1. (가)는 올바른 PIVOT 문법 구조다.",
        "2. (나)는 서브쿼리 없는 PIVOT이지만 문법 오류는 아니다.",
        "3. (정답) 집계함수 없이 AMT만 사용하면 PIVOT 구문 오류가 발생한다.",
        "4. (라)는 MAX 집계함수를 사용한 정상 문법이다."
      ],
      tip: "PIVOT에서 **집계함수는 생략 불가**. 값이 하나여도 SUM/MAX로 감싸야 한다."
    }
  },
  {
    id: 528,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과에서 2024 행의 A 컬럼 값은?",
    blocks: [
      {
        type: "table",
        title: "[SALES 테이블]",
        headers: ["YEAR", "PRODUCT", "AMT"],
        rows: [
          ["2023", "A", "100"],
          ["2023", "B", "200"],
          ["2024", "A", "150"],
          ["2024", "B", "250"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM (\n  SELECT YEAR, PRODUCT, AMT\n  FROM SALES\n)\nPIVOT (\n  SUM(AMT)\n  FOR PRODUCT IN ('A' AS A, 'B' AS B)\n);"
      }
    ],
    choices: [
      "100",
      "150",
      "250",
      "NULL"
    ],
    ans: 2,
    src: "자료3 p.81",
    exp: {
      reason: "PIVOT은 YEAR별로 PRODUCT 값을 컬럼으로 전환하여 SUM(AMT)를 집계한다. YEAR=2024, PRODUCT='A'인 행의 AMT는 150이므로 2024행의 A 컬럼 값은 150이다. IN 절의 'A' AS A는 컬럼 별칭을 A로 지정한다. PostgreSQL 등가: SELECT YEAR, SUM(CASE WHEN PRODUCT='A' THEN AMT END) AS A, SUM(CASE WHEN PRODUCT='B' THEN AMT END) AS B FROM SALES GROUP BY YEAR 결과에서 YEAR=2024, A=150 확인. (자료3 p.81)",
      terms: [
        "**IN 절 AS 별칭**: FOR PRODUCT IN ('A' AS A) 형태로 컬럼 별칭 지정 가능",
        "**YEAR 기준 집계**: 같은 YEAR에서 PRODUCT='A'인 행의 AMT를 SUM",
        "**2024년 A 데이터**: YEAR=2024, PRODUCT=A, AMT=150 → A 컬럼 = 150",
        "**2024년 B 데이터**: YEAR=2024, PRODUCT=B, AMT=250 → B 컬럼 = 250"
      ],
      wrong: [
        "1. 100은 YEAR=2023, PRODUCT=A의 AMT 값이다.",
        "2. (정답) YEAR=2024, PRODUCT=A 행의 AMT=150이 그대로 집계된다.",
        "3. 250은 YEAR=2024, PRODUCT=B의 AMT 값이다.",
        "4. NULL은 해당 YEAR+PRODUCT 조합의 데이터가 없을 때 나타난다."
      ],
      tip: "PIVOT 결과의 셀 값 = 해당 행/열 교차 조건의 집계 결과. 데이터 있으면 집계값, 없으면 NULL."
    }
  },
  {
    id: 529,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 SALES 테이블에서 PIVOT 실행 시 C 컬럼의 값은?",
    blocks: [
      {
        type: "table",
        title: "[SALES 테이블]",
        headers: ["YEAR", "PRODUCT", "AMT"],
        rows: [
          ["2023", "A", "100"],
          ["2023", "B", "200"],
          ["2024", "A", "150"],
          ["2024", "B", "250"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM (\n  SELECT YEAR, PRODUCT, AMT\n  FROM SALES\n)\nPIVOT (\n  SUM(AMT)\n  FOR PRODUCT IN ('A', 'B', 'C')\n);"
      }
    ],
    choices: [
      "각 YEAR의 전체 AMT 합계가 출력된다.",
      "A와 B의 AMT 합계가 출력된다.",
      "모든 행의 C 컬럼 값은 NULL이다.",
      "PRODUCT='C' 데이터가 없으므로 오류가 발생한다."
    ],
    ans: 3,
    src: "자료3 p.81",
    exp: {
      reason: "PIVOT IN 절에 명시한 값('C')에 해당하는 데이터가 SALES 테이블에 없으면, 해당 컬럼 자리는 NULL로 채워진다. 오류가 발생하지 않는다. IN 절의 값은 실제 데이터 존재 여부와 무관하게 컬럼을 생성하며, 매칭되는 데이터가 없으면 NULL이 집계된다. PostgreSQL 등가: SUM(CASE WHEN PRODUCT='C' THEN AMT END)는 조건 불일치 시 NULL 반환. (자료3 p.81)",
      terms: [
        "**IN 절 값 없는 경우**: 해당 컬럼은 NULL로 채워짐. 오류 미발생",
        "**NULL 집계 동작**: 매칭 행이 없으면 SUM 결과는 NULL (0이 아님)",
        "**IN 절 값 추가 용도**: 미래 데이터 대비 컬럼 사전 확보 가능",
        "**NULL vs 0 차이**: 데이터 없음(NULL)과 값이 0인 것은 구분됨"
      ],
      wrong: [
        "1. C 컬럼은 PRODUCT='C'인 행의 AMT 합계가 들어가야 하지만, 해당 데이터가 없다.",
        "2. C 컬럼은 A, B와 무관하다. 별도 집계 대상이다.",
        "3. (정답) PRODUCT='C' 데이터가 없으므로 C 컬럼은 NULL로 채워진다.",
        "4. IN 절에 없는 값을 넣어도 오류가 아니라 NULL 결과를 반환한다."
      ],
      tip: "PIVOT IN 절에 실제 데이터 없는 값 명시 시 해당 컬럼은 **NULL**. 오류 아님."
    }
  },
  {
    id: 530,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 SQL에서 빈칸 ㄱ, ㄴ에 들어갈 내용으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[ORDERS 테이블]",
        headers: ["REGION", "GRADE", "CNT"],
        rows: [
          ["서울", "VIP", "10"],
          ["서울", "일반", "30"],
          ["부산", "VIP", "5"],
          ["부산", "일반", "20"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- 목표: REGION별 VIP, 일반 COUNT를 컬럼으로 전환\nSELECT *\nFROM (\n  SELECT REGION, GRADE, CNT\n  FROM ORDERS\n)\nPIVOT (\n  ( ㄱ )(CNT)\n  FOR GRADE IN ( ㄴ )\n);"
      }
    ],
    choices: [
      "ㄱ = COUNT, ㄴ = ('VIP', '일반')",
      "ㄱ = SUM, ㄴ = ('VIP', '일반')",
      "ㄱ = SUM, ㄴ = (GRADE)",
      "ㄱ = AVG, ㄴ = (REGION, GRADE)"
    ],
    ans: 2,
    src: "자료3 p.81",
    exp: {
      reason: "REGION별 GRADE를 컬럼으로 전환하고 CNT를 집계하려면 SUM(CNT)와 FOR GRADE IN ('VIP', '일반') 형태가 맞다. ㄱ에는 SUM 집계함수, ㄴ에는 피봇 대상 컬럼(GRADE)의 값 목록이 들어간다. COUNT(CNT)를 쓰면 행 수(각 조합이 1행씩이라 1이 됨)가 집계되므로 의도와 다르다. FOR 절은 피봇할 컬럼명이 아닌 해당 컬럼의 값 목록이 들어간다. (자료3 p.81)",
      terms: [
        "**PIVOT 집계**: SUM(CNT)는 CNT 값의 합계. COUNT(CNT)는 NULL 아닌 행 수",
        "**FOR ... IN 절**: FOR 피봇컬럼 IN (값1, 값2). 컬럼명이 아닌 값 목록",
        "**ㄱ 자리**: 반드시 집계함수명 (SUM, COUNT, MAX 등)",
        "**ㄴ 자리**: 피봇컬럼에서 컬럼으로 만들 값 목록 ('VIP', '일반')"
      ],
      wrong: [
        "1. COUNT(CNT)를 쓰면 각 (REGION, GRADE) 조합의 행 수를 집계한다. 1행씩 있으므로 1이 됨.",
        "2. (정답) SUM(CNT)로 CNT 값을 합산, FOR GRADE IN ('VIP', '일반')으로 GRADE 값을 컬럼으로 전환.",
        "3. IN (GRADE)는 값 목록이 아닌 컬럼명이다. 올바른 형태가 아님.",
        "4. AVG를 쓰면 평균이 집계되고, IN 절에 컬럼명 쌍을 넣는 것은 잘못된 문법이다."
      ],
      tip: "FOR 절의 IN에는 **컬럼의 값** (문자열/숫자 리터럴). 컬럼명이 아님."
    }
  },
  {
    id: 531,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수와 컬럼 수의 조합으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[SALES 테이블]",
        headers: ["YEAR", "PRODUCT", "AMT"],
        rows: [
          ["2023", "A", "100"],
          ["2023", "B", "200"],
          ["2024", "A", "150"],
          ["2024", "B", "250"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM (\n  SELECT YEAR, PRODUCT, AMT\n  FROM SALES\n)\nPIVOT (\n  SUM(AMT)\n  FOR PRODUCT IN ('A', 'B')\n);"
      }
    ],
    choices: [
      "4행 3열",
      "2행 3열",
      "4행 2열",
      "2행 2열"
    ],
    ans: 2,
    src: "자료3 p.81",
    exp: {
      reason: "PIVOT 결과는 YEAR 기준으로 그룹화되어 2행이 만들어지고, YEAR 컬럼 1개 + IN 절 값 'A', 'B' 각 1개 = 3개 컬럼이 생성된다. 최종 결과: 2행 3열. PostgreSQL 등가: SELECT YEAR, SUM(CASE WHEN PRODUCT='A' THEN AMT END) A, SUM(CASE WHEN PRODUCT='B' THEN AMT END) B FROM SALES GROUP BY YEAR 결과: YEAR=2023 행, YEAR=2024 행으로 2행 3열. (자료3 p.81)",
      terms: [
        "**행 수**: PIVOT 후 행 수 = 피봇되지 않은 나머지 컬럼(YEAR)의 고유 조합 수",
        "**컬럼 수**: 피봇되지 않은 컬럼 수 + IN 절 값 개수",
        "**YEAR 고유값**: 2023, 2024 → 2행",
        "**컬럼 구성**: YEAR(1) + A(1) + B(1) = 3열"
      ],
      wrong: [
        "1. 4행은 PIVOT 변환 전 원본 테이블의 행 수다.",
        "2. (정답) YEAR 2개 그룹 × 컬럼 YEAR+A+B = 2행 3열.",
        "3. 컬럼 수 2개는 틀렸다. YEAR + IN 절 2개 = 3열.",
        "4. 2행 2열은 YEAR 컬럼을 빠뜨린 계산이다."
      ],
      tip: "PIVOT 결과 컬럼 = **그룹 기준 컬럼** + **IN 절 값 수**만큼 추가."
    }
  },
  {
    id: 532,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 SQL에서 FROM 서브쿼리 없이 PIVOT을 직접 적용했을 때 발생하는 문제로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[SALES2 테이블]",
        headers: ["YEAR", "PRODUCT", "AMT", "REGION"],
        rows: [
          ["2023", "A", "100", "서울"],
          ["2023", "B", "200", "부산"],
          ["2024", "A", "150", "서울"],
          ["2024", "B", "250", "부산"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- 의도: YEAR별 PRODUCT 컬럼으로 AMT 집계\n-- 서브쿼리 없이 직접 적용 시\nSELECT *\nFROM SALES2\nPIVOT (\n  SUM(AMT)\n  FOR PRODUCT IN ('A', 'B')\n);"
      }
    ],
    choices: [
      "PIVOT 문법 오류가 발생하여 실행 자체가 불가능하다.",
      "REGION 컬럼도 GROUP BY 기준에 포함되어 YEAR+REGION 조합으로 행이 분리될 수 있다.",
      "AMT 외 다른 컬럼의 집계 결과가 PIVOT 결과에 추가된다.",
      "FOR 절의 IN 값이 REGION 컬럼과 중복되어 오류가 발생한다."
    ],
    ans: 2,
    src: "자료3 p.81",
    exp: {
      reason: "FROM에 서브쿼리 없이 SALES2 전체를 PIVOT에 넣으면, PIVOT에 참여하지 않는 컬럼(YEAR, REGION)이 모두 GROUP BY 기준이 된다. 이 경우 YEAR+REGION 조합별로 행이 분리되어 의도한 YEAR별 집계와 결과가 달라질 수 있다. REGION도 그룹 기준에 포함되므로 결과 행이 늘어난다. 이를 방지하려면 FROM (SELECT YEAR, PRODUCT, AMT FROM SALES2)처럼 필요한 컬럼만 서브쿼리로 선택해야 한다. (자료3 p.81)",
      terms: [
        "**FROM 서브쿼리 목적**: PIVOT에 필요한 컬럼만 포함해 의도 외 그룹화 방지",
        "**불필요 컬럼 포함 시**: 해당 컬럼도 GROUP BY에 들어가 행이 세분화됨",
        "**REGION 포함 영향**: (YEAR=2023, REGION=서울) / (YEAR=2023, REGION=부산)으로 분리",
        "**올바른 방법**: SELECT YEAR, PRODUCT, AMT만 서브쿼리로 감싸서 PIVOT에 전달"
      ],
      wrong: [
        "1. FROM 서브쿼리 없이도 PIVOT 문법 오류는 발생하지 않는다.",
        "2. (정답) REGION이 GROUP BY에 포함되어 행이 YEAR+REGION 조합 기준으로 분리된다.",
        "3. AMT 외 다른 컬럼이 결과에 추가되는 것이 아니라, 그룹 기준이 바뀌는 것이다.",
        "4. REGION 컬럼과 IN 절 값은 서로 다른 차원이므로 중복 오류가 발생하지 않는다."
      ],
      tip: "FROM 서브쿼리로 **필요한 컬럼만** 넘겨야 의도한 그룹화가 된다. 나머지 컬럼이 있으면 행이 더 세분화됨."
    }
  },

  // ============================================================
  // 토픽 138: UNPIVOT 절 (Wide → Long) (Q533~Q537) - 5문항
  // ============================================================
  {
    id: 533,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (Oracle 11g 기준)",
    blocks: [
      {
        type: "table",
        title: "[SALES_WIDE 테이블]",
        headers: ["YEAR", "A", "B"],
        rows: [
          ["2023", "100", "200"],
          ["2024", "150", "250"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM SALES_WIDE\nUNPIVOT (\n  AMT\n  FOR PRODUCT IN (A, B)\n);"
      }
    ],
    choices: [
      "YEAR, A, B 3개 컬럼에 2행이 출력된다.",
      "YEAR, PRODUCT, AMT 3개 컬럼에 2행이 출력된다.",
      "YEAR, PRODUCT, AMT 3개 컬럼에 4행이 출력된다.",
      "AMT, PRODUCT 2개 컬럼에 4행이 출력된다."
    ],
    ans: 3,
    src: "자료3 p.81~82",
    exp: {
      reason: "UNPIVOT은 Wide 형태(컬럼)를 Long 형태(행)로 변환한다. A, B 두 컬럼이 각각 PRODUCT 컬럼의 값('A', 'B')이 되고, 해당 값이 AMT 컬럼에 배치된다. 원본 2행이 각각 2행으로 분리되어 총 4행이 된다. 컬럼 구성: YEAR, PRODUCT, AMT. PostgreSQL 등가: SELECT YEAR, 'A' AS PRODUCT, A AS AMT FROM SALES_WIDE UNION ALL SELECT YEAR, 'B' AS PRODUCT, B AS AMT FROM SALES_WIDE 결과와 동일. (자료3 p.81~82)",
      terms: [
        "**UNPIVOT**: 컬럼(Wide)을 행(Long)으로 변환. PIVOT의 역연산",
        "**AMT**: 새로 생성되는 값 컬럼명 (각 행의 셀 값이 들어감)",
        "**FOR PRODUCT IN (A, B)**: A, B 컬럼이 PRODUCT 컬럼의 값으로 변환됨",
        "**행 수 변화**: 원본 행 수 × IN 절 컬럼 수 = 2 × 2 = 4행"
      ],
      wrong: [
        "1. UNPIVOT 후에는 원본 Wide 컬럼(A, B)이 사라지고 새 Long 컬럼이 생긴다.",
        "2. UNPIVOT 결과는 2행이 아니라 4행이다. A, B 각각 분리된다.",
        "3. (정답) YEAR, PRODUCT, AMT 3컬럼에 2행 × 2컬럼 = 4행 출력.",
        "4. YEAR 컬럼은 사라지지 않고 결과에 유지된다."
      ],
      tip: "UNPIVOT 결과 행 수 = 원본 행 수 × IN 절 컬럼 수."
    }
  },
  {
    id: 534,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 UNPIVOT SQL의 실행 결과에서 PRODUCT 컬럼의 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[SALES_WIDE 테이블]",
        headers: ["YEAR", "A", "B"],
        rows: [
          ["2023", "100", "200"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT YEAR, PRODUCT, AMT\nFROM SALES_WIDE\nUNPIVOT (\n  AMT\n  FOR PRODUCT IN (A AS 'PROD_A', B AS 'PROD_B')\n);"
      }
    ],
    choices: [
      "A, B",
      "100, 200",
      "PROD_A, PROD_B",
      "A AS 'PROD_A', B AS 'PROD_B'"
    ],
    ans: 3,
    src: "자료3 p.81~82",
    exp: {
      reason: "UNPIVOT의 FOR ... IN 절에서 컬럼명 뒤에 AS '별칭'을 지정하면, PRODUCT 컬럼에는 원래 컬럼명(A, B) 대신 지정한 별칭(PROD_A, PROD_B)이 들어간다. 별칭을 지정하지 않으면 컬럼명 자체(A, B)가 값으로 들어간다. (자료3 p.81~82)",
      terms: [
        "**IN 절 AS 별칭**: UNPIVOT IN (컬럼 AS '별칭') 형태로 행 값 커스터마이징 가능",
        "**별칭 미지정 시**: 원래 컬럼명(A, B)이 FOR 절 컬럼의 값으로 들어감",
        "**별칭 지정 시**: 지정한 값(PROD_A, PROD_B)이 FOR 절 컬럼의 값으로 들어감",
        "**AMT 컬럼**: 각 컬럼(A, B)의 실제 데이터 값(100, 200)이 들어감"
      ],
      wrong: [
        "1. A, B는 별칭 미지정 시 나타나는 값이다. AS 별칭 지정 시에는 별칭이 우선된다.",
        "2. 100, 200은 AMT 컬럼의 값이지 PRODUCT 컬럼의 값이 아니다.",
        "3. (정답) IN 절에서 AS로 별칭을 지정했으므로 PRODUCT 컬럼 값은 'PROD_A', 'PROD_B'이다.",
        "4. 'A AS ...' 전체 표현식이 값으로 들어가지 않는다. AS 뒤의 별칭만 사용된다."
      ],
      tip: "UNPIVOT IN 절에서 AS 별칭 지정 시 **별칭이 FOR 컬럼의 값**으로 들어간다."
    }
  },
  {
    id: 535,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 UNPIVOT SQL의 실행 결과 행 수는? (기본 EXCLUDE NULLS 동작 기준)",
    blocks: [
      {
        type: "table",
        title: "[SALES_WIDE 테이블]",
        headers: ["YEAR", "A", "B", "C"],
        rows: [
          ["2023", "100", "200", "NULL"],
          ["2024", "150", "NULL", "300"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM SALES_WIDE\nUNPIVOT (\n  AMT\n  FOR PRODUCT IN (A, B, C)\n);"
      }
    ],
    choices: [
      "6",
      "4",
      "3",
      "2"
    ],
    ans: 2,
    src: "자료3 p.82",
    exp: {
      reason: "UNPIVOT의 기본 동작은 EXCLUDE NULLS로, 변환 후 AMT 값이 NULL인 행을 자동 제외한다. 전체 변환 시 6행(2행×3컬럼)이 생기지만 YEAR=2023의 C 컬럼(NULL)과 YEAR=2024의 B 컬럼(NULL) 2개가 제외되어 4행이 된다. INCLUDE NULLS를 명시하면 6행 전체가 출력된다. (자료3 p.82)",
      terms: [
        "**EXCLUDE NULLS (기본)**: UNPIVOT 후 값이 NULL인 행은 자동 제외",
        "**INCLUDE NULLS**: 명시 시 NULL 행도 결과에 포함",
        "**전체 변환 시**: 2행 × 3컬럼 = 6행 (NULL 포함)",
        "**NULL 제외 후**: 6행 - 2행(NULL값) = 4행"
      ],
      wrong: [
        "1. 6은 NULL을 포함(INCLUDE NULLS)했을 때의 전체 행 수다.",
        "2. (정답) 기본 EXCLUDE NULLS로 NULL 2건 제외 후 4행.",
        "3. 3은 NULL을 제외한 한 연도의 컬럼 수와 유사하지만 맞지 않는다.",
        "4. 2는 원본 행 수다. UNPIVOT 후에는 행이 늘어난다."
      ],
      tip: "UNPIVOT 기본은 **EXCLUDE NULLS**. NULL 행이 자동 제거된다. 유지하려면 INCLUDE NULLS."
    }
  },
  {
    id: 536,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "중",
    has_code: false,
    q: "다음 중 UNPIVOT에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "UNPIVOT은 Wide 형태의 컬럼을 Long 형태의 행으로 변환한다.",
      "UNPIVOT 기본 동작은 NULL 값 행을 결과에서 제외한다.",
      "INCLUDE NULLS 옵션을 사용하면 NULL 값 행도 결과에 포함된다.",
      "UNPIVOT은 PostgreSQL에서도 표준 SQL 키워드로 동일하게 지원된다."
    ],
    ans: 4,
    src: "자료3 p.81~82",
    exp: {
      reason: "UNPIVOT은 Oracle 11g 이상과 SQL Server에서 지원하는 기능이다. PostgreSQL은 UNPIVOT 키워드를 공식 지원하지 않으며, UNION ALL이나 unnest 등의 방법으로 동등한 결과를 구현해야 한다. (자료3 p.81~82)",
      terms: [
        "**UNPIVOT 지원 DB**: Oracle 11g+, SQL Server. PostgreSQL은 미지원",
        "**PostgreSQL 대안**: UNION ALL로 각 컬럼을 행으로 변환하거나 lateral/unnest 활용",
        "**EXCLUDE NULLS**: UNPIVOT 기본. NULL 값 행 자동 제외",
        "**INCLUDE NULLS**: 명시 시 NULL 행도 포함하여 출력"
      ],
      wrong: [
        "1. UNPIVOT의 핵심 기능 설명이다. 컬럼을 행으로 변환한다.",
        "2. UNPIVOT의 기본 동작인 EXCLUDE NULLS에 대한 올바른 설명이다.",
        "3. INCLUDE NULLS를 명시하면 NULL 행도 결과에 포함되는 것은 맞다.",
        "4. (정답) PostgreSQL은 UNPIVOT 키워드를 공식 지원하지 않는다."
      ],
      tip: "UNPIVOT = Oracle/SQL Server 전용. PostgreSQL에서는 UNION ALL로 등가 구현."
    }
  },
  {
    id: 537,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 UNPIVOT 실행 후 결과 데이터로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[SCORE 테이블]",
        headers: ["STU_ID", "MATH", "ENG"],
        rows: [
          ["S01", "90", "80"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT STU_ID, SUBJECT, SCORE\nFROM SCORE\nUNPIVOT (\n  SCORE\n  FOR SUBJECT IN (MATH, ENG)\n);"
      }
    ],
    choices: [
      "STU_ID='S01', SUBJECT='SCORE', SCORE=90 / STU_ID='S01', SUBJECT='SCORE', SCORE=80",
      "STU_ID='S01', SUBJECT='MATH', SCORE=90 / STU_ID='S01', SUBJECT='ENG', SCORE=80",
      "STU_ID='S01', SUBJECT='MATH', SCORE='ENG' / STU_ID='S01', SUBJECT='ENG', SCORE='MATH'",
      "SUBJECT='MATH', SCORE=90 / SUBJECT='ENG', SCORE=80 (STU_ID 제외)"
    ],
    ans: 2,
    src: "자료3 p.81~82",
    exp: {
      reason: "UNPIVOT 결과: MATH 컬럼이 SUBJECT='MATH' 행으로, ENG 컬럼이 SUBJECT='ENG' 행으로 변환된다. 각 행의 SCORE 컬럼에는 원래 컬럼의 값(90, 80)이 들어간다. STU_ID는 그룹 기준 컬럼으로 각 행에 유지된다. PostgreSQL 등가: SELECT 'S01' AS STU_ID, 'MATH' AS SUBJECT, 90 AS SCORE UNION ALL SELECT 'S01', 'ENG', 80 결과와 동일. (자료3 p.81~82)",
      terms: [
        "**FOR SUBJECT IN (MATH, ENG)**: MATH와 ENG 컬럼명이 SUBJECT 컬럼의 값이 됨",
        "**SCORE 컬럼**: 각 컬럼의 실제 값(90, 80)이 배치됨",
        "**STU_ID 유지**: UNPIVOT에 참여하지 않은 컬럼은 모든 행에 복사됨",
        "**행 생성 규칙**: 원본 1행 × IN 절 컬럼 2개 = 2행"
      ],
      wrong: [
        "1. SUBJECT 컬럼에 'SCORE'가 들어가는 것은 잘못된 설명이다. IN 절 컬럼명(MATH, ENG)이 값이 된다.",
        "2. (정답) MATH/ENG가 SUBJECT 값으로, 90/80이 SCORE 값으로 변환되며 STU_ID는 유지된다.",
        "3. SCORE에 컬럼명이 들어가고 SUBJECT에 값이 들어가는 것은 역방향으로 잘못됐다.",
        "4. STU_ID는 UNPIVOT에 참여하지 않아 사라지지 않고 모든 행에 유지된다."
      ],
      tip: "FOR 절 컬럼이 **행 레이블**(SUBJECT 값)이 되고, 실제 셀 값이 **집계 컬럼**(SCORE)에 들어간다."
    }
  },

  // ============================================================
  // 토픽 139: PIVOT vs CASE/GROUP BY 변환 (Q538~Q540) - 3문항
  // ============================================================
  {
    id: 538,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 두 SQL (가), (나)의 실행 결과가 동일할 때, 빈칸에 들어갈 내용으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[SALES 테이블]",
        headers: ["YEAR", "PRODUCT", "AMT"],
        rows: [
          ["2023", "A", "100"],
          ["2023", "B", "200"],
          ["2024", "A", "150"],
          ["2024", "B", "250"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가) Oracle PIVOT\nSELECT *\nFROM (\n  SELECT YEAR, PRODUCT, AMT FROM SALES\n)\nPIVOT (SUM(AMT) FOR PRODUCT IN ('A', 'B'));\n\n-- (나) CASE WHEN + GROUP BY\nSELECT\n  YEAR,\n  SUM(CASE WHEN PRODUCT = ___① THEN AMT END) AS ___②,\n  SUM(CASE WHEN PRODUCT = ___③ THEN AMT END) AS ___④\nFROM SALES\nGROUP BY YEAR;"
      }
    ],
    choices: [
      "① 'A'  ② A  ③ 'B'  ④ B",
      "① A  ② 'A'  ③ B  ④ 'B'",
      "① 'A'  ② SUM_A  ③ 'B'  ④ SUM_B",
      "① AMT  ② A  ③ AMT  ④ B"
    ],
    ans: 1,
    src: "자료3 p.81",
    exp: {
      reason: "Oracle PIVOT (SUM(AMT) FOR PRODUCT IN ('A', 'B'))은 CASE WHEN PRODUCT='A' THEN AMT END를 SUM하고 컬럼 별칭을 A로, CASE WHEN PRODUCT='B' THEN AMT END를 SUM하고 컬럼 별칭을 B로 붙인 것과 동일하다. 조건 비교 시 문자열이면 따옴표('A'), 컬럼 별칭은 따옴표 없이 A를 사용한다. PostgreSQL에서 (나)를 실행하면 (가)와 동일한 결과가 나온다. (자료3 p.81)",
      terms: [
        "**PIVOT 등가 표현**: PIVOT (SUM(C) FOR 피봇컬럼 IN ('v')) = SUM(CASE WHEN 피봇컬럼='v' THEN C END)",
        "**①, ③ 자리**: CASE WHEN의 비교 대상 → 문자열 값은 따옴표 필수",
        "**②, ④ 자리**: SELECT의 컬럼 별칭 → 따옴표 없이 컬럼명 형태",
        "**GROUP BY YEAR**: PIVOT의 나머지 컬럼(YEAR)이 자동 GROUP BY 기준이 되는 것과 동일"
      ],
      wrong: [
        "1. (정답) PRODUCT='A' 조건에 따옴표, 컬럼 별칭 A에 따옴표 없음. 정확한 등가 변환.",
        "2. 조건값과 별칭의 따옴표 위치가 뒤바뀌었다. 조건값에 따옴표가 필요하다.",
        "3. 별칭을 SUM_A로 쓰면 (가)의 결과 컬럼명 'A'와 달라진다.",
        "4. ①에 AMT를 넣으면 PRODUCT와 비교할 수 없어 올바른 등가가 아니다."
      ],
      tip: "PIVOT = CASE WHEN 피봇컬럼='값' THEN 집계컬럼 END의 SUM + GROUP BY 조합."
    }
  },
  {
    id: 539,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 중 PIVOT과 CASE/GROUP BY 방식의 차이로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- PIVOT 방식 (Oracle)\nSELECT *\nFROM (\n  SELECT YEAR, PRODUCT, AMT FROM SALES\n)\nPIVOT (SUM(AMT) FOR PRODUCT IN ('A', 'B', 'C'));\n\n-- CASE/GROUP BY 방식\nSELECT\n  YEAR,\n  SUM(CASE WHEN PRODUCT='A' THEN AMT END) AS A,\n  SUM(CASE WHEN PRODUCT='B' THEN AMT END) AS B,\n  SUM(CASE WHEN PRODUCT='C' THEN AMT END) AS C\nFROM SALES\nGROUP BY YEAR;"
      }
    ],
    choices: [
      "PIVOT 방식은 동적으로 컬럼을 추가할 수 있으나 CASE/GROUP BY 방식은 정적이다.",
      "두 방식의 결과 집합은 동일하지만, PIVOT 방식은 IN 절에 명시한 값만 컬럼으로 고정된다는 공통점이 있다.",
      "CASE/GROUP BY 방식은 Oracle에서만 사용 가능하고 PIVOT은 모든 DBMS에서 사용 가능하다.",
      "PIVOT은 집계함수 없이도 값을 컬럼으로 전환할 수 있으나 CASE/GROUP BY 방식은 집계함수가 필수이다."
    ],
    ans: 2,
    src: "자료3 p.81",
    exp: {
      reason: "PIVOT과 CASE/GROUP BY 방식은 모두 결과 집합이 동일하며, 두 방식 모두 어떤 값을 컬럼으로 만들지 쿼리 작성 시점에 명시해야 한다. PIVOT은 IN 절에, CASE/GROUP BY는 CASE WHEN 조건에 각각 고정적으로 값을 나열한다. 새 값이 추가되면 쿼리를 수정해야 하는 공통된 한계가 있다. PIVOT의 동적 컬럼 추가는 일반 SQL로는 불가능하고 동적 SQL(EXECUTE IMMEDIATE 등)을 별도로 구현해야 한다. (자료3 p.81)",
      terms: [
        "**PIVOT IN 절 고정**: IN ('A','B','C')에 명시한 값만 컬럼 생성. 새 값 추가 시 쿼리 수정 필요",
        "**CASE WHEN 고정**: CASE WHEN PRODUCT='A'처럼 조건 명시. 동일하게 정적",
        "**동적 컬럼**: 두 방식 모두 일반 SQL로는 동적 컬럼 추가 불가",
        "**차이점**: PIVOT은 Oracle/SQL Server 전용. CASE/GROUP BY는 모든 DBMS 지원"
      ],
      wrong: [
        "1. PIVOT도 일반 SQL로는 동적 컬럼 추가 불가. IN 절에 값을 고정해야 한다.",
        "2. (정답) 두 방식 모두 결과는 동일하고, IN 절/CASE WHEN 조건에 값을 정적으로 명시해야 하는 공통 한계가 있다.",
        "3. CASE/GROUP BY는 표준 SQL이라 모든 DBMS에서 사용 가능하다. PIVOT이 Oracle/SQL Server 한정이다.",
        "4. PIVOT도 집계함수가 필수다. 집계함수 없이는 PIVOT 사용 불가."
      ],
      tip: "PIVOT과 CASE+GROUP BY 모두 **정적 컬럼 고정**. 차이는 문법과 지원 DB 범위."
    }
  },
  {
    id: 540,
    subj: 2,
    topic: "2-M",
    topic_name: "PIVOT/UNPIVOT",
    diff: "상",
    has_code: true,
    q: "다음 CASE/GROUP BY SQL의 결과와 동일한 결과를 반환하는 Oracle PIVOT SQL로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[ORDERS 테이블]",
        headers: ["REGION", "GRADE", "CNT"],
        rows: [
          ["서울", "VIP", "10"],
          ["서울", "일반", "30"],
          ["부산", "VIP", "5"],
          ["부산", "일반", "20"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- 기준 SQL (CASE/GROUP BY)\nSELECT\n  REGION,\n  SUM(CASE WHEN GRADE='VIP' THEN CNT END) AS VIP,\n  SUM(CASE WHEN GRADE='일반' THEN CNT END) AS NORMAL\nFROM ORDERS\nGROUP BY REGION;"
      }
    ],
    choices: [
      "SELECT * FROM (SELECT REGION, GRADE, CNT FROM ORDERS) PIVOT (SUM(CNT) FOR GRADE IN ('VIP', '일반'));",
      "SELECT * FROM (SELECT REGION, GRADE, CNT FROM ORDERS) PIVOT (SUM(CNT) FOR GRADE IN ('VIP' AS VIP, '일반' AS NORMAL));",
      "SELECT * FROM (SELECT REGION, GRADE, CNT FROM ORDERS) PIVOT (CNT FOR GRADE IN ('VIP' AS VIP, '일반' AS NORMAL));",
      "SELECT * FROM ORDERS PIVOT (SUM(CNT) FOR GRADE IN (VIP, 일반));"
    ],
    ans: 2,
    src: "자료3 p.81",
    exp: {
      reason: "기준 SQL의 컬럼 별칭은 VIP, NORMAL이다. PIVOT IN 절에서 AS로 별칭을 지정하지 않으면 컬럼명이 'VIP', '일반'이 되므로 기준 SQL의 NORMAL 별칭과 일치하지 않는다. 1번은 PIVOT 후 컬럼명이 'A', '일반'이 되어 NORMAL과 다르다. 2번은 'VIP' AS VIP, '일반' AS NORMAL로 기준 SQL 별칭과 정확히 일치한다. 3번은 집계함수 없이 CNT를 쓰므로 오류다. 4번은 IN 절의 값이 따옴표 없이 식별자로 처리되어 오류가 발생한다. (자료3 p.81)",
      terms: [
        "**IN 절 AS 별칭**: PIVOT 결과 컬럼명을 커스터마이즈. '값' AS 별칭 형태",
        "**별칭 미지정**: IN ('VIP')이면 결과 컬럼명이 'VIP' 문자열 그대로",
        "**별칭 지정**: IN ('일반' AS NORMAL)이면 결과 컬럼명이 NORMAL",
        "**IN 절 값 따옴표**: Oracle PIVOT IN 절의 문자열 값은 따옴표로 감싸야 함"
      ],
      wrong: [
        "1. AS 별칭 없이 IN ('VIP', '일반')만 쓰면 결과 컬럼명이 VIP, 일반이 되어 기준 SQL의 NORMAL과 다르다.",
        "2. (정답) 'VIP' AS VIP, '일반' AS NORMAL로 컬럼 별칭이 기준 SQL과 일치한다.",
        "3. CNT를 집계함수 없이 쓰면 PIVOT 구문 오류가 발생한다.",
        "4. IN 절의 값은 따옴표로 감싸야 한다. VIP, 일반은 식별자로 처리되어 컬럼명을 찾게 되므로 오류가 발생한다."
      ],
      tip: "PIVOT 결과 컬럼명을 제어하려면 IN 절에서 **'값' AS 별칭** 형태로 지정."
    }
  }
];

module.exports = m2Part1;

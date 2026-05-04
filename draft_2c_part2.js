// 2-C Part 2: Q113~Q124 (날짜형 5 + 변환 4 + NULL처리 3)
// 자료3 p.33~35, 자료2 p.34~35, 자료4 p.3 기준
// PostgreSQL sqld_verify DB로 가능한 부분 검증, Oracle 전용 함수는 자료 인용

const c2Part2 = [
  // ===== 날짜형 함수 (5문항: Q113~Q117) =====

  // Q113: 날짜형 결과 추적 - EXTRACT
  {
    id: 113,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 (R1, R2, R3)로 옳은 것은? (Oracle 환경, SYSDATE 대신 임의 날짜 '2024-11-11' 사용)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EXTRACT(YEAR  FROM DATE '2024-11-11') AS R1,\n       EXTRACT(MONTH FROM DATE '2024-11-11') AS R2,\n       EXTRACT(DAY   FROM DATE '2024-11-11') AS R3\nFROM DUAL;"
      }
    ],
    choices: [
      "('2024', '11', '11')",
      "(11, 11, 2024)",
      "(2024, 10, 11)",
      "(2024, 11, 11)"
    ],
    ans: 4,
    src: "자료3 p.33, 자료2 p.34",
    exp: {
      reason: "EXTRACT(단위 FROM 날짜)는 해당 단위의 정수값을 반환. YEAR=2024, MONTH=11, DAY=11. PostgreSQL 검증 완료.",
      terms: [
        "**EXTRACT(year|month|day FROM d)**: 날짜 d에서 연/월/일 정수 추출 (Oracle/PostgreSQL 동일)",
        "**SQL Server 동등**: DATEPART(year|month|day, d)",
        "**반환 타입**: 숫자(NUMBER). 문자열 아님"
      ],
      wrong: [
        "1. 결과는 정수값. 작은따옴표로 감싼 문자열 아님.",
        "2. 인수 순서를 EXTRACT(YEAR FROM ...)로 명시했으므로 YEAR 먼저 반환. 순서 뒤바뀜.",
        "3. MONTH는 11. 0-based 인덱스로 10으로 본 오해.",
        "4. (정답)"
      ],
      tip: "EXTRACT(단위 FROM 날짜) = 정수. Oracle/PostgreSQL 동일."
    }
  },

  // Q114: 날짜형 결과 추적 - ADD_MONTHS 월말 처리
  {
    id: 114,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (Oracle 환경, 2022년 기준)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ADD_MONTHS(TO_DATE('2022-01-31', 'YYYY-MM-DD'), 1) AS R\nFROM DUAL;"
      }
    ],
    choices: [
      "2022-02-31",
      "2022-03-03",
      "2022-02-28",
      "오류 발생"
    ],
    ans: 3,
    src: "자료2 p.35",
    exp: {
      reason: "ADD_MONTHS는 결과 월에 동일 일자가 없으면 해당 월의 마지막 일자를 반환. 2022-02는 28일까지이므로 2022-02-28. PostgreSQL의 + INTERVAL '1 month'도 동일 결과 검증.",
      terms: [
        "**ADD_MONTHS(d, n)**: 날짜 d에 n개월 더한 날짜 반환 (Oracle)",
        "**월말 자동 조정**: 결과 월에 해당 일자가 없으면 그 월의 마지막 날 반환",
        "**SQL Server 동등**: DATEADD(MONTH, n, d) (단, 동일 자동 조정 동작)"
      ],
      wrong: [
        "1. 2월 31일은 존재하지 않는 날짜. 자동으로 28일(또는 윤년 29일)로 보정.",
        "2. 31일째를 다음 달로 넘긴 3월 3일은 다른 DBMS의 일부 동작이며 Oracle ADD_MONTHS 동작 아님.",
        "3. (정답) ADD_MONTHS는 결과 월에 동일 일자가 없으면 해당 월의 마지막 일자를 반환. 2022-02는 28일까지이므로 2022-02-28.",
        "4. ADD_MONTHS는 정상 동작. 오류 아님."
      ],
      tip: "ADD_MONTHS에서 결과 월에 일자가 없으면 그 월의 말일로 보정."
    }
  },

  // Q115: 날짜형 함수 매칭 (Oracle vs SQL Server)
  {
    id: 115,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: false,
    q: "다음 중 Oracle 함수와 SQL Server 동등 함수의 짝이 잘못된 것은?",
    blocks: null,
    choices: [
      "SYSDATE  ↔  GETDATE()",
      "EXTRACT(YEAR FROM d)  ↔  DATEPART(YEAR, d)",
      "ADD_MONTHS(d, n)  ↔  DATEADD(MONTH, n, d)",
      "MONTHS_BETWEEN(d1, d2)  ↔  DATEPART(MONTH, d1, d2)"
    ],
    ans: 4,
    src: "자료3 p.33, 자료2 p.35",
    exp: {
      reason: "MONTHS_BETWEEN의 SQL Server 동등은 DATEDIFF(MONTH, d2, d1). DATEPART는 단위 추출 함수로 두 날짜의 차이 계산이 아님.",
      terms: [
        "**SYSDATE / GETDATE()**: 현재 날짜와 시각 반환",
        "**EXTRACT / DATEPART**: 날짜에서 특정 단위 정수 추출",
        "**ADD_MONTHS / DATEADD**: 날짜에 단위 더하기 (DATEADD는 월 외 모든 단위 가능)",
        "**MONTHS_BETWEEN / DATEDIFF**: 두 날짜의 단위 차이 반환"
      ],
      wrong: [
        "1. Oracle SYSDATE = SQL Server GETDATE() 정확.",
        "2. EXTRACT(YEAR FROM d)와 DATEPART(YEAR, d) 정확.",
        "3. ADD_MONTHS(d, n)와 DATEADD(MONTH, n, d) 정확. 단 DATEADD는 month 외 단위도 가능.",
        "4. (정답) MONTHS_BETWEEN의 SQL Server 동등은 DATEDIFF(MONTH, d2, d1). DATEPART는 단위 추출 함수로 두 날짜의 차이 계산이 아님."
      ],
      tip: "두 날짜 차이는 DATEDIFF(차이 함수), 한 날짜 추출은 DATEPART(추출 함수)."
    }
  },

  // Q116: 날짜형 결과 추적 - LAST_DAY
  {
    id: 116,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (Oracle 환경, 2024년은 윤년)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT LAST_DAY(TO_DATE('2024-02-15', 'YYYY-MM-DD')) AS R\nFROM DUAL;"
      }
    ],
    choices: [
      "2024-02-28",
      "2024-02-29",
      "2024-02-15",
      "2024-03-01"
    ],
    ans: 2,
    src: "자료3 p.33",
    exp: {
      reason: "LAST_DAY(d)는 d가 속한 월의 마지막 날을 반환. 2024년은 윤년이므로 2월의 마지막 날은 29일. PostgreSQL date_trunc + interval로도 2024-02-29 동일 검증.",
      terms: [
        "**LAST_DAY(d)**: 인수 날짜가 속한 월의 마지막 날 반환 (Oracle 전용)",
        "**윤년 규칙**: 4로 나누어 떨어지는 해(예외: 100의 배수는 윤년 아님, 400의 배수는 다시 윤년). 2024는 윤년",
        "**SQL Server 동등**: EOMONTH(d) 함수 (2012+)"
      ],
      wrong: [
        "1. 2024는 윤년이라 평년 28일이 아닌 29일.",
        "2. (정답) LAST_DAY(d)는 d가 속한 월의 마지막 날을 반환. 2024년은 윤년이므로 2월의 마지막 날은 29일.",
        "3. LAST_DAY는 입력 날짜를 그대로 반환하지 않음. 항상 그 월의 말일.",
        "4. 다음 달의 첫날이 아니라 현재 달의 마지막 날."
      ],
      tip: "LAST_DAY = 그 월의 말일. 4의 배수 해는 윤년(2024 윤년, 2023 평년)."
    }
  },

  // Q117: 날짜형 함수 매칭 (NEXT_DAY 인수)
  {
    id: 117,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 옳은 것은? (Oracle 환경, 2024-11-11은 월요일)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT NEXT_DAY(TO_DATE('2024-11-11', 'YYYY-MM-DD'), 1) AS R\nFROM DUAL;"
      }
    ],
    choices: [
      "2024-11-12 (화요일)",
      "2024-11-17 (일요일)",
      "2024-11-18 (월요일)",
      "2024-11-11 (월요일)"
    ],
    ans: 2,
    src: "자료3 p.33",
    exp: {
      reason: "NEXT_DAY(d, n)은 날짜 d 이후 지정한 요일의 첫 날짜 반환. n=1(일요일), 2(월요일), ..., 7(토요일). 2024-11-11(월) 이후 첫 일요일은 2024-11-17.",
      terms: [
        "**NEXT_DAY(d, n)**: d 이후 n 요일의 첫 날짜 (Oracle 전용)",
        "**요일 번호**: 1=일, 2=월, 3=화, 4=수, 5=목, 6=금, 7=토",
        "**기준 날짜 제외**: '이후'이므로 같은 날 자체는 결과에서 제외",
        "**PostgreSQL 미지원**: 자료 인용으로 정답 확정"
      ],
      wrong: [
        "1. n=1은 일요일 의미. 화요일(n=3)이 아님.",
        "2. (정답) NEXT_DAY(d, n)은 날짜 d 이후 지정한 요일의 첫 날짜 반환. n=1(일요일)이므로 2024-11-11(월) 이후 첫 일요일은 2024-11-17.",
        "3. n=2(월요일) 결과와 혼동. 문제는 n=1이라 일요일.",
        "4. NEXT_DAY는 기준 날짜 자신을 제외하고 그 이후의 첫 해당 요일 반환."
      ],
      tip: "NEXT_DAY 두 번째 인수: 1=일~7=토. 기준일은 결과에서 제외."
    }
  },

  // ===== 변환 함수 (4문항: Q118~Q121) =====

  // Q118: 변환 함수 결과 추적 - TO_CHAR 숫자 포맷
  {
    id: 118,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 (R1, R2)로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT TO_CHAR(1250, '9,999')  AS R1,\n       TO_CHAR(1250, '00000')  AS R2\nFROM DUAL;"
      }
    ],
    choices: [
      "('1250',  '1250')",
      "('1,250', '1250')",
      "('01,250', '01250')",
      "('1,250', '01250')"
    ],
    ans: 4,
    src: "자료3 p.34, 자료2 p.34",
    exp: {
      reason: "포맷 '9,999'는 천 단위 구분자만 추가하여 '1,250'. 포맷 '00000'은 총 5자리로 0 채워서 '01250'. PostgreSQL TO_CHAR 검증 완료.",
      terms: [
        "**TO_CHAR(숫자, 포맷)**: 숫자를 포맷된 문자열로 변환",
        "**9**: 자릿수 표현, 0이면 표시 안 함 (앞 0 제거)",
        "**0**: 자릿수 표현, 0이면 0으로 표시 (앞 0 유지)",
        "**',' (콤마)**: 천 단위 구분자"
      ],
      wrong: [
        "1. 9 포맷은 콤마를 자동으로 넣지 않음. 포맷에 ','이 있어야 콤마 출력. R1은 콤마 있음.",
        "2. R2 포맷이 '00000'이면 5자리 채움. '01250'이 맞음.",
        "3. R1 포맷 '9,999'는 4자리. 5자리 '01,250' 형태 아님.",
        "4. (정답)"
      ],
      tip: "포맷 9 = 0 숨김 / 0 = 0 채움 / ',' = 천 단위 구분자."
    }
  },

  // Q119: 변환 함수 오류 판단 - TO_NUMBER('abc')
  {
    id: 119,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL 중 실행 시 오류가 발생하는 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "(가) SELECT TO_NUMBER('100')   FROM DUAL;\n(나) SELECT TO_NUMBER('1.5')   FROM DUAL;\n(다) SELECT TO_NUMBER('abc')   FROM DUAL;\n(라) SELECT TO_NUMBER('-25')   FROM DUAL;"
      }
    ],
    choices: [
      "(가)",
      "(나)",
      "(다)",
      "(라)"
    ],
    ans: 3,
    src: "자료3 p.34",
    exp: {
      reason: "TO_NUMBER는 숫자로 변환 가능한 문자열만 처리. 'abc'는 숫자가 아닌 진짜 문자열이므로 'invalid number' 오류 발생. (자료3 p.34 명시)",
      terms: [
        "**TO_NUMBER(문자열)**: 숫자로 변환. 변환 안 되는 문자가 있으면 에러",
        "**가능한 입력**: 숫자, 소수점, 부호(+/-), 일부 포맷 지정 시 천단위 구분자",
        "**암시적 변환**: '100' + 1 같은 산술도 자동 변환됨 (DBMS 차이)"
      ],
      wrong: [
        "1. '100'은 정상 숫자 변환 → 100.",
        "2. '1.5'는 소수점 포함 정상 변환 → 1.5.",
        "3. (정답) TO_NUMBER는 숫자로 변환 가능한 문자열만 처리. 'abc'는 숫자가 아닌 진짜 문자열이므로 'invalid number' 오류 발생.",
        "4. '-25'는 음수 부호 포함 정상 변환 → -25."
      ],
      tip: "TO_NUMBER는 숫자 형태가 아닌 문자가 들어오면 즉시 오류."
    }
  },

  // Q120: 변환 함수 결과 추적 - TO_DATE
  {
    id: 120,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 R의 데이터 타입과 의미로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT TO_DATE('2024.10.31', 'YYYY.MM.DD') AS R\nFROM DUAL;"
      }
    ],
    choices: [
      "문자열 타입, 값 '2024.10.31'",
      "숫자 타입, 값 20241031",
      "날짜 타입, 값 2024-10-31",
      "오류 발생 (포맷 일치하지 않음)"
    ],
    ans: 3,
    src: "자료3 p.34, 자료2 p.34",
    exp: {
      reason: "TO_DATE(문자열, 포맷)은 포맷 문자열을 날짜 타입으로 변환. 포맷이 입력 문자열의 구조와 일치하므로 정상 변환되어 날짜 타입의 2024-10-31. PostgreSQL TO_DATE도 동일 결과 검증.",
      terms: [
        "**TO_DATE(문자열, 포맷)**: 문자열을 날짜 타입(DATE)으로 변환",
        "**포맷 일치 규칙**: 입력 문자열과 포맷의 구분자/자릿수가 일치해야 함",
        "**기본 출력**: Oracle은 NLS_DATE_FORMAT 설정에 따라 출력 형태 결정 (논리적으로는 DATE 타입)"
      ],
      wrong: [
        "1. 결과 타입은 DATE이지 VARCHAR가 아님. 변환 함수의 핵심 목적이 타입 변환.",
        "2. NUMBER 타입이 아닌 DATE 타입.",
        "3. (정답) TO_DATE(문자열, 포맷)은 포맷 문자열을 날짜 타입으로 변환. 포맷이 입력 문자열의 구조와 일치하므로 정상 변환되어 날짜 타입의 2024-10-31.",
        "4. 포맷 'YYYY.MM.DD'와 입력 '2024.10.31'의 구분자(.)와 자릿수가 일치. 정상 동작."
      ],
      tip: "TO_DATE는 문자열을 DATE로, TO_CHAR는 DATE/숫자를 문자열로."
    }
  },

  // Q121: 변환 함수 오류 판단 - CAST/CONVERT
  {
    id: 121,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 (R1, R2)로 옳은 것은? (CAST는 Oracle/SQL Server 모두 지원)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT CAST(123.45 AS INT)  AS R1,\n       CAST('1250'  AS INT)  AS R2;"
      }
    ],
    choices: [
      "(123.45, '1250')",
      "(124, 1250)",
      "(123, 오류)",
      "(123, 1250)"
    ],
    ans: 4,
    src: "자료3 p.34, 자료2 p.34",
    exp: {
      reason: "CAST(123.45 AS INT)는 소수점 이하를 절삭(반올림 아님)하여 123. CAST('1250' AS INT)는 숫자 형태 문자열을 정수로 변환하여 1250. PostgreSQL 검증 완료.",
      terms: [
        "**CAST(대상 AS 타입)**: 표준 SQL의 데이터 타입 변환 함수 (Oracle/SQL Server 모두 지원)",
        "**INT 변환 시**: 소수점 이하 절삭 (반올림이 아닌 trunc)",
        "**문자→정수**: 숫자 형태 문자열만 변환 가능, 'abc' 같은 문자는 오류",
        "**CONVERT (SQL Server)**: CONVERT(타입, 대상, [스타일]) 형태. 인수 순서 다름"
      ],
      wrong: [
        "1. AS INT로 변환 결과는 INT 타입. 소수점 유지 안 됨.",
        "2. CAST의 정수 변환은 ROUND가 아닌 TRUNC. 123.45 → 123 (124 아님).",
        "3. '1250'은 정상 숫자 형태이므로 정수 변환 가능. 오류 아님.",
        "4. (정답)"
      ],
      tip: "CAST AS INT = 소수 절삭 / CONVERT는 SQL Server 전용으로 인수 순서 다름."
    }
  },

  // ===== NULL 처리 함수 (3문항: Q122~Q124) =====

  // Q122: NVL 결과 추적 (집계와 결합)
  {
    id: 122,
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
        headers: ["EMPNO", "ENAME", "COMM"],
        rows: [
          [1, "KIM", null],
          [2, "LEE", 500],
          [3, "PARK", null],
          [4, "CHOI", 300]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT SUM(NVL(COMM, 100)) AS R\nFROM EMP;"
      }
    ],
    choices: [
      "800",
      "900",
      "1000",
      "1200"
    ],
    ans: 3,
    src: "자료3 p.35, 자료4 p.3",
    exp: {
      reason: "NVL(COMM, 100)이 행마다 먼저 평가됨. NULL 두 행은 100으로, 나머지는 그대로 → 100, 500, 100, 300. SUM = 1000. PostgreSQL COALESCE로 동등 검증.",
      terms: [
        "**NVL(a, b)**: a가 NULL이면 b, NULL 아니면 a 반환 (Oracle)",
        "**처리 순서**: 단일행 함수가 먼저 행마다 적용된 뒤, SUM 같은 집계함수가 합산",
        "**SUM은 NULL 무시**: NVL을 안 쓰면 SUM(COMM)=800. NVL로 NULL을 100으로 바꾸면 1000",
        "**PostgreSQL 동등**: COALESCE(a, b)"
      ],
      wrong: [
        "1. NVL을 적용하지 않은 SUM(COMM) 값. NVL이 NULL을 100으로 치환하여 합이 늘어남.",
        "2. NVL이 NULL 한 행에만 적용됐다고 본 경우. NULL인 모든 행에 적용.",
        "3. (정답) NVL(COMM, 100)이 행마다 먼저 평가됨. NULL 두 행은 100으로, 나머지는 그대로 → 100, 500, 100, 300. SUM = 1000.",
        "4. NULL 행을 200으로 치환했다고 본 경우. 두 번째 인수는 100."
      ],
      tip: "NVL은 단일행 함수, 집계 전에 행마다 적용. SUM(NVL(...)) ≠ NVL(SUM(...))."
    }
  },

  // Q123: NVL2 인수 구조 함정 (T-06)
  {
    id: 123,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 (R1, R2)로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블]",
        headers: ["EMPNO", "COMM"],
        rows: [
          [1, null],
          [2, 500]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT NVL2(COMM, 'YES', 'NO')  AS R1,\n       NVL2(COMM, COMM, 0)      AS R2\nFROM EMP\nORDER BY EMPNO;"
      }
    ],
    choices: [
      "EMPNO 1: ('YES', NULL)  / EMPNO 2: ('NO', 500)",
      "EMPNO 1: ('NO',  0)     / EMPNO 2: ('YES', 500)",
      "EMPNO 1: ('NO',  NULL)  / EMPNO 2: ('YES', 500)",
      "EMPNO 1: ('YES', 0)     / EMPNO 2: ('NO', 500)"
    ],
    ans: 2,
    src: "자료3 p.35, 자료4 p.3",
    exp: {
      reason: "NVL2(a, b, c)는 a가 NULL이 **아니면** b, NULL이면 c. NVL과 인수 의미가 다름. EMPNO 1은 COMM=NULL이라 c값 ('NO', 0). EMPNO 2는 COMM=500이라 b값 ('YES', 500). PostgreSQL CASE로 동등 검증.",
      terms: [
        "**NVL2(a, b, c)**: a가 NULL이 아니면 b, NULL이면 c 반환",
        "**NVL과 차이**: NVL(a,b)는 a NULL이면 b. NVL2는 NULL일 때 세 번째 인수, NULL 아닐 때 두 번째 인수",
        "**암기**: NVL2(검사값, 있을때, 없을때) — 'YES'를 두 번째에 두면 자연스러움",
        "**PostgreSQL 미지원**: 자료 인용으로 정답 확정"
      ],
      wrong: [
        "1. NVL과 인수 구조 헷갈린 함정. NULL이 첫 인수일 때 두 번째 반환은 NVL.",
        "2. (정답) NVL2(a, b, c)는 a가 NULL이 아니면 b, NULL이면 c. EMPNO 1(COMM=NULL)은 ('NO', 0), EMPNO 2(COMM=500)는 ('YES', 500).",
        "3. R1만 맞고 R2 EMPNO 1을 NULL로 본 오류. 세 번째 인수가 0이라 0이 반환.",
        "4. NVL2를 NVL처럼 NULL이면 두 번째 반환으로 본 오해. NVL2는 정반대."
      ],
      tip: "NVL2(a,b,c) = a 있으면 b, 없으면 c. NVL과 인수 자리 정반대."
    }
  },

  // Q124: COALESCE 다중 인수
  {
    id: 124,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 (R1, R2, R3)로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT COALESCE(NULL, NULL, 30, 40)  AS R1,\n       COALESCE(NULL, 'A', NULL, 'B') AS R2,\n       COALESCE(NULL, NULL, NULL)     AS R3\nFROM DUAL;"
      }
    ],
    choices: [
      "(40, 'B', 0)",
      "(30, 'AB', NULL)",
      "(NULL, 'A', NULL)",
      "(30, 'A', NULL)"
    ],
    ans: 4,
    src: "자료3 p.35, 자료4 p.3",
    exp: {
      reason: "COALESCE는 인수 목록에서 첫 번째로 NULL이 아닌 값 반환. 모두 NULL이면 NULL. R1은 첫 비-NULL이 30, R2는 'A', R3는 모두 NULL이라 NULL. PostgreSQL 검증 완료.",
      terms: [
        "**COALESCE(a, b, c, ...)**: 인수 목록을 왼쪽부터 검사하여 첫 번째 NULL이 아닌 값 반환",
        "**모든 인수 NULL**: 결과도 NULL",
        "**NVL과 차이**: NVL은 인수 2개만, COALESCE는 가변 인수 (다중 fallback)",
        "**Oracle/PostgreSQL/SQL Server 모두 지원**: 표준 SQL 함수"
      ],
      wrong: [
        "1. COALESCE는 마지막이 아닌 첫 비-NULL 반환. 30 대신 40을 본 오류.",
        "2. COALESCE는 비-NULL 값들을 결합하지 않음. 첫 비-NULL 하나만 반환.",
        "3. R1은 30(첫 비-NULL)이 정답. NULL 아님.",
        "4. (정답)"
      ],
      tip: "COALESCE = 왼쪽부터 첫 비-NULL 하나. 다중 인수 NVL이라고 보면 됨."
    }
  }
];

module.exports = c2Part2;

// 2-C Part 1: Q101~Q112 (단일행 함수 개념 + 숫자형 + 문자형)
// 자료3 p.30~33, 자료2 p.32~33 기반. 정답은 자료에 명시된 내용만 사용.
// PostgreSQL 검증: 숫자/문자 함수 결과는 sqld_verify DB에서 직접 실행해 확정.
// Oracle 전용(SUBSTR 음수 시작, INSTR)은 자료3 p.32 인용으로 처리.
const c2Part1 = [
  // ============================================================
  // 토픽 69: 단일행 함수 개념 (Q101~Q102)
  // ============================================================
  {
    id: 101,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "하",
    has_code: false,
    q: "다음 중 단일행 함수(Single-Row Function)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "각 행에 대해 개별적으로 작용하여 행마다 하나의 결과를 반환한다.",
      "입력값과 결과값은 1:1 관계이다.",
      "여러 행의 값을 모아 하나의 결과를 반환하므로 GROUP BY와 함께 사용된다.",
      "SELECT, WHERE, ORDER BY 절에서 사용할 수 있으며 함수의 중첩도 가능하다."
    ],
    ans: 3,
    src: "자료3 p.30~31",
    exp: {
      reason: "여러 행을 하나의 결과로 모아 반환하는 함수는 다중행 함수(집계 함수)이다. 단일행 함수는 행마다 1:1로 결과를 만들며 GROUP BY 없이도 작동한다. (자료3 p.30~31)",
      terms: [
        "**단일행 함수(Single-Row)**: 한 행의 입력 → 한 행의 결과 (1:1 관계)",
        "**다중행 함수(Multi-Row)**: 여러 행의 값을 모아 하나의 결과 (예: SUM, AVG, COUNT)",
        "**사용 절**: 단일행은 SELECT/WHERE/ORDER BY, 다중행은 SELECT/HAVING/ORDER BY",
        "**함수 중첩**: UPPER(CONCAT(first_name, ' ', last_name)) 같은 형태 가능"
      ],
      wrong: [
        "1. 단일행 함수의 정의 그대로다.",
        "2. 1:1 관계가 단일행 함수의 핵심 특성이다.",
        "3. (정답) 다중행 함수의 설명이다.",
        "4. 자료3 p.31에 명시된 사용 절과 중첩 가능 특성이다."
      ],
      tip: "단일행 = 1:1, 다중행 = N:1. SELECT/WHERE/ORDER BY에서 단일행 사용."
    }
  },
  {
    id: 102,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "하",
    has_code: false,
    q: "다음 중 단일행 함수의 분류와 그에 속하는 함수의 매칭이 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "숫자형 함수 - ABS, CEIL, FLOOR, ROUND, MOD",
      "문자형 함수 - UPPER, LOWER, SUBSTR, LENGTH, REPLACE",
      "날짜형 함수 - SYSDATE, EXTRACT, ADD_MONTHS, LAST_DAY",
      "변환 함수 - SUM, AVG, MAX, MIN, COUNT"
    ],
    ans: 4,
    src: "자료3 p.31~35",
    exp: {
      reason: "SUM, AVG, MAX, MIN, COUNT는 변환 함수가 아니라 다중행(집계) 함수이다. 변환 함수는 TO_NUMBER, TO_CHAR, TO_DATE, CAST 같은 데이터 타입 변환 함수이다. (자료3 p.34)",
      terms: [
        "**숫자형 함수**: ABS, SIGN, CEIL/CEILING, FLOOR, MOD, ROUND, TRUNC, POWER, SQRT",
        "**문자형 함수**: UPPER, LOWER, SUBSTR, INSTR, LENGTH, LTRIM/RTRIM/TRIM, LPAD/RPAD, REPLACE, CONCAT",
        "**날짜형 함수**: SYSDATE, CURRENT_DATE, EXTRACT, ADD_MONTHS, MONTHS_BETWEEN, LAST_DAY, NEXT_DAY",
        "**변환 함수**: TO_NUMBER, TO_CHAR, TO_DATE, CAST (집계 함수와 별개)"
      ],
      wrong: [
        "1. 자료3 p.31의 숫자형 함수 목록이다.",
        "2. 자료3 p.32의 문자형 함수 목록이다.",
        "3. 자료3 p.33의 날짜형 함수 목록이다.",
        "4. (정답) 집계 함수를 변환 함수로 잘못 분류했다."
      ],
      tip: "변환 함수는 타입 변환(TO_*, CAST). SUM/AVG/MAX/MIN/COUNT는 집계 함수."
    }
  },

  // ============================================================
  // 토픽 70: 숫자형 함수 (Q103~Q107) - 5문항
  // ============================================================
  {
    id: 103,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 (R1, R2, R3, R4)로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT CEIL(-5.3)  AS R1,\n       FLOOR(-1.8) AS R2,\n       CEIL(5.3)   AS R3,\n       FLOOR(1.8)  AS R4\nFROM DUAL;"
      }
    ],
    choices: [
      "(-6, -1, 5, 2)",
      "(-5, -2, 6, 1)",
      "(-5, -1, 6, 2)",
      "(-6, -2, 5, 1)"
    ],
    ans: 2,
    src: "자료3 p.31",
    exp: {
      reason: "CEIL은 '크거나 같은 최소 정수'(올림 방향), FLOOR는 '작거나 같은 최대 정수'(내림 방향). 음수에서 헷갈리기 쉬움. CEIL(-5.3) = -5, FLOOR(-1.8) = -2, CEIL(5.3) = 6, FLOOR(1.8) = 1. PostgreSQL 검증 완료. (자료3 p.31)",
      terms: [
        "**CEIL(x)**: x보다 크거나 같은 최소 정수 (수직선 오른쪽 방향)",
        "**FLOOR(x)**: x보다 작거나 같은 최대 정수 (수직선 왼쪽 방향)",
        "**음수 주의**: CEIL(-5.3) = -5 (-5가 -5.3보다 큼), FLOOR(-1.8) = -2 (-2가 -1.8보다 작음)",
        "**SQL Server**: CEIL → CEILING"
      ],
      wrong: [
        "1. 음수에서 CEIL/FLOOR 방향을 정반대로 본 경우.",
        "2. (정답)",
        "3. 음수 FLOOR를 양수처럼 절댓값 작은 정수(-1)로 본 경우.",
        "4. 양수 CEIL/FLOOR도 헷갈린 경우."
      ],
      tip: "수직선 기준: CEIL=오른쪽 끝, FLOOR=왼쪽 끝. 음수에선 절댓값 방향과 반대."
    }
  },
  {
    id: 104,
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
        content: "SELECT ROUND(123.456, 1)  AS R1,\n       ROUND(123.456, 0)  AS R2,\n       ROUND(123.456, -1) AS R3\nFROM DUAL;"
      }
    ],
    choices: [
      "(123.4, 124, 100)",
      "(123.5, 124, 130)",
      "(123.5, 123, 120)",
      "(123.4, 123, 100)"
    ],
    ans: 3,
    src: "자료3 p.31",
    exp: {
      reason: "ROUND(x, d)는 x를 소수점 d자리까지 반올림. d가 양수면 소수부 자리, d=0이면 정수, d가 음수면 정수부 자리에서 반올림. ROUND(123.456, 1)=123.5, (,0)=123, (,-1)=120. PostgreSQL 검증 완료. (자료3 p.31)",
      terms: [
        "**ROUND(x, d)**: d 자리까지 반올림. d 생략 = 0 (정수)",
        "**d > 0**: 소수점 d번째 자리까지 (예: d=1이면 소수 첫째 자리까지)",
        "**d = 0**: 정수로 반올림",
        "**d < 0**: 정수부 |d|번째 자리에서 반올림 (d=-1은 10의 자리)"
      ],
      wrong: [
        "1. R1은 반올림이 아니라 절사한 경우, R3은 -2 자리(100의 자리) 반올림으로 본 경우.",
        "2. R3에서 -1 자리를 잘못 본 경우. 123.456의 10의 자리는 2, 그 아래(일의 자리 3)를 반올림하면 120.",
        "3. (정답)",
        "4. R1, R3 모두 잘못된 경우."
      ],
      tip: "ROUND 자리수: 양수=소수, 0=정수, 음수=정수부. ROUND(123.456,-1)=120(10의 자리)."
    }
  },
  {
    id: 105,
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
        content: "SELECT TRUNC(1234.5678, 2)  AS R1,\n       TRUNC(1234.5678, 0)  AS R2,\n       TRUNC(1234.5678, -2) AS R3\nFROM DUAL;"
      }
    ],
    choices: [
      "(1234.57, 1235, 1300)",
      "(1234.56, 1234, 1200)",
      "(1234.56, 1235, 1200)",
      "(1234.57, 1234, 1300)"
    ],
    ans: 2,
    src: "자료3 p.31",
    exp: {
      reason: "TRUNC(x, d)는 d 자리까지 자르고 나머지는 버림(반올림 X). d>0이면 소수부, d=0이면 정수, d<0이면 정수부 자리에서 자름. (1234.56, 1234, 1200). PostgreSQL 검증 완료. (자료3 p.31)",
      terms: [
        "**TRUNC(x, d)**: d 자리까지 자르고 나머지 버림 (반올림하지 않음)",
        "**ROUND vs TRUNC**: ROUND는 반올림, TRUNC는 무조건 절사",
        "**d < 0**: ROUND/TRUNC 모두 정수부 자리에서 동작 (TRUNC(1234, -2)는 1200)"
      ],
      wrong: [
        "1. R1을 ROUND처럼 반올림한 경우, R3 자리수도 잘못.",
        "2. (정답)",
        "3. R2를 ROUND(1234.5678,0)=1235로 본 경우. TRUNC는 잘라서 1234.",
        "4. R1을 반올림으로 본 경우."
      ],
      tip: "TRUNC = 무조건 자름(반올림 X). ROUND와 헷갈리지 않기."
    }
  },
  {
    id: 106,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 (R1, R2, R3, R4)로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ABS(-7)   AS R1,\n       SIGN(-15) AS R2,\n       SIGN(0)   AS R3,\n       MOD(9, 2) AS R4\nFROM DUAL;"
      }
    ],
    choices: [
      "(-7, -1, 1, 1)",
      "(7, -15, 0, 4)",
      "(7, -1, 0, 1)",
      "(7, -1, 1, 1)"
    ],
    ans: 3,
    src: "자료3 p.31",
    exp: {
      reason: "ABS(-7)=7(절댓값), SIGN(-15)=-1(부호만 반환), SIGN(0)=0, MOD(9,2)=1(나머지). PostgreSQL 검증 완료. (자료3 p.31)",
      terms: [
        "**ABS(x)**: 절댓값",
        "**SIGN(x)**: 부호 반환 — 양수면 1, 음수면 -1, 0이면 0",
        "**MOD(x, y)**: x를 y로 나눈 나머지",
        "**자료 명시**: SIGN(0)=0 (자료2 p.33의 'SING(0)은 0반환' 참고)"
      ],
      wrong: [
        "1. ABS가 부호를 그대로 둔다고 본 경우.",
        "2. SIGN이 값 자체를, MOD가 몫을 반환한다고 본 경우.",
        "3. (정답)",
        "4. SIGN(0)을 1로 본 경우. SIGN(0)=0이 자료에 명시."
      ],
      tip: "ABS=절댓값 / SIGN=부호(1/-1/0) / MOD=나머지. SIGN(0)은 0."
    }
  },
  {
    id: 107,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL을 실행했을 때 [결과]와 일치하는 것은? (단, 가격은 모두 양수이며 NULL 없음)",
    blocks: [
      {
        type: "table",
        title: "[PROD]",
        headers: ["PNO", "PRICE"],
        rows: [
          [1, 1234.5678],
          [2, 999.999],
          [3, 105.4]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT PNO,\n       ROUND(PRICE, -1) AS R1,\n       TRUNC(PRICE, -1) AS R2,\n       ROUND(PRICE, 1)  AS R3\nFROM PROD\nORDER BY PNO;"
      }
    ],
    choices: [
      "(1, 1234, 1234, 1234.5) / (2, 999, 999, 999.9)  / (3, 105, 105, 105.4)",
      "(1, 1230, 1230, 1234.5) / (2, 1000, 1000, 1000.0) / (3, 110, 110, 105.4)",
      "(1, 1230, 1230, 1234.6) / (2, 1000, 990, 1000.0) / (3, 110, 100, 105.4)",
      "(1, 1240, 1230, 1234.6) / (2, 1000, 990, 999.9)  / (3, 100, 100, 105.5)"
    ],
    ans: 3,
    src: "자료3 p.31",
    exp: {
      reason: "PRICE=1234.5678: ROUND(,-1)=1230 (3 → 반올림 안 됨), TRUNC(,-1)=1230, ROUND(,1)=1234.6. PRICE=999.999: ROUND(,-1)=1000 (9의 자리 9를 반올림해 자리올림), TRUNC(,-1)=990 (그냥 자름), ROUND(,1)=1000.0 (소수 둘째 9를 반올림). PRICE=105.4: ROUND(,-1)=110 (5는 올림), TRUNC(,-1)=100 (자름), ROUND(,1)=105.4 (소수 둘째가 0이니 그대로). PostgreSQL 검증 완료. (자료3 p.31)",
      terms: [
        "**ROUND(PRICE, -1)**: 일의 자리에서 반올림 → 10의 자리 단위 정수",
        "**TRUNC(PRICE, -1)**: 일의 자리 이하 자름",
        "**자리올림 발생**: 999.999는 ROUND(,1)에서 999.9 → 1000.0까지 연쇄 자리올림",
        "**ROUND vs TRUNC 차이**: 999.999는 ROUND(,-1)=1000, TRUNC(,-1)=990 — 10 차이"
      ],
      wrong: [
        "1. 음수 자리수를 무시하고 정수만 잘라낸 경우.",
        "2. TRUNC도 ROUND처럼 반올림한다고 본 경우.",
        "3. (정답)",
        "4. 105.4의 ROUND(,-1)을 100으로 본 경우(5는 올림이 표준)."
      ],
      tip: "ROUND는 반올림(자리올림 가능), TRUNC는 무조건 자름. 5는 올림."
    }
  },

  // ============================================================
  // 토픽 71: 문자형 함수 (Q108~Q112) - 5문항 (Oracle vs SQL Server 비교 1개 포함)
  // ============================================================
  {
    id: 108,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 (R1, R2, R3)로 옳은 것은? (Oracle 환경)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT SUBSTR('SQLDeveloper', 4, 3)  AS R1,\n       SUBSTR('SQLDeveloper', -4, 3) AS R2,\n       SUBSTR('SQLDeveloper', 4)     AS R3\nFROM DUAL;"
      }
    ],
    choices: [
      "('LDe', 'lop', 'LDeveloper')",
      "('Dev', 'lop', 'Developer')",
      "('Dev', 'ope', 'Developer')",
      "('Dev', 'ope', 'eveloper')"
    ],
    ans: 3,
    src: "자료3 p.32",
    exp: {
      reason: "SUBSTR(문자열, 시작, 길이) — 시작은 1부터, 음수 시작은 끝에서 N번째. 인덱스: S(1) Q(2) L(3) D(4) e(5) v(6) e(7) l(8) o(9) p(10) e(11) r(12). R1: 4번째 'D'부터 3개 = 'Dev'. R2: 끝에서 4번째 'o'부터 3개 = 'ope'. R3: 4번째부터 끝까지 = 'Developer'. (자료3 p.32, 자료2 p.32)",
      terms: [
        "**SUBSTR(문자열, m, n)**: m 위치에서 n개 문자 추출 (m은 1부터)",
        "**음수 m**: 끝에서 |m|번째 문자에서 시작 (자료3 p.32: SUBSTR('ABCDE', -4, 3) → 'BCD')",
        "**n 생략**: m부터 끝까지 추출",
        "**SQL Server**: SUBSTR이 아닌 SUBSTRING (시작 1부터 동일)"
      ],
      wrong: [
        "1. 시작 위치를 0부터로 본 경우 (R1=LDe).",
        "2. 음수 시작을 잘못 계산한 경우.",
        "3. (정답)",
        "4. 길이 생략 시 시작 위치를 1 더해 본 경우."
      ],
      tip: "SUBSTR(s, 시작은 1부터, 길이). 음수 시작 = 끝에서 N번째. 길이 생략 = 끝까지."
    }
  },
  {
    id: 109,
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
        content: "SELECT LTRIM('#A#B#C#', '#')                 AS R1,\n       RTRIM('#A#B#C#', '#')                 AS R2,\n       TRIM(BOTH '#' FROM '#A#B#C#')         AS R3\nFROM DUAL;"
      }
    ],
    choices: [
      "('A#B#C', 'A#B#C', 'A#B#C')",
      "('A#B#C#', '#A#B#C', 'A#B#C')",
      "('ABC', 'ABC', 'ABC')",
      "('#A#B#C', 'A#B#C#', '#A#B#C#')"
    ],
    ans: 2,
    src: "자료3 p.32, 자료2 p.32",
    exp: {
      reason: "LTRIM/RTRIM/TRIM은 문자열의 양쪽 끝(left/right/both)에서 지정 문자가 연속으로 나오는 동안만 제거하고, 가운데 있는 문자는 제거하지 않는다. LTRIM은 왼쪽 #만 → 'A#B#C#'. RTRIM은 오른쪽 #만 → '#A#B#C'. TRIM(BOTH)는 양 끝 # 제거 → 'A#B#C'. PostgreSQL 검증 완료. (자료3 p.32)",
      terms: [
        "**LTRIM(s, c)**: 왼쪽 끝에서 c가 연속하는 동안만 제거 (가운데 c는 그대로)",
        "**RTRIM(s, c)**: 오른쪽 끝에서 c가 연속하는 동안만 제거",
        "**TRIM([LEADING|TRAILING|BOTH] c FROM s)**: 위치 지정에 따라 한쪽/양쪽 끝 c 제거",
        "**c 생략 시**: 공백 제거"
      ],
      wrong: [
        "1. LTRIM/RTRIM이 가운데까지 모두 제거한다고 본 경우.",
        "2. (정답)",
        "3. 모든 # 제거(REPLACE처럼 동작)로 본 경우.",
        "4. LTRIM/RTRIM 방향을 정반대로 본 경우."
      ],
      tip: "LTRIM/RTRIM/TRIM은 끝에서만 연속 제거. 가운데 글자는 안 건드림."
    }
  },
  {
    id: 110,
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
        content: "SELECT LPAD('abc', 5, '0') AS R1,\n       RPAD('abc', 5, '0') AS R2,\n       LPAD('Hello', 3, '*') AS R3\nFROM DUAL;"
      }
    ],
    choices: [
      "('abc00', '00abc', 'Hello')",
      "('00abc', 'abc00', '*Hello')",
      "('abcabc', 'abcabc', '***')",
      "('00abc', 'abc00', 'Hel')"
    ],
    ans: 4,
    src: "자료3 p.32, 자료2 p.32",
    exp: {
      reason: "LPAD(s, n, p): s를 n 길이가 되도록 왼쪽에 p로 채움. RPAD는 오른쪽. n이 s 길이보다 짧으면 s를 n 길이로 잘라냄. R1: 'abc'(3) → 5 길이로 왼쪽 채움 → '00abc'. R2: 'abc' → 5 길이로 오른쪽 채움 → 'abc00'. R3: 'Hello'(5) → 3 길이로 자름 → 'Hel'. PostgreSQL 검증 완료. (자료3 p.32)",
      terms: [
        "**LPAD(s, n, pad)**: 왼쪽에 pad 추가하여 총 n 길이로 만듦",
        "**RPAD(s, n, pad)**: 오른쪽에 pad 추가하여 총 n 길이로 만듦",
        "**n < length(s)인 경우**: 문자열을 n 길이로 절단(잘라냄)",
        "**용도**: 자릿수 맞춰 보고서 출력, 0 패딩 코드 등"
      ],
      wrong: [
        "1. LPAD와 RPAD를 반대로 본 경우.",
        "2. 'Hello'가 더 길 때 그대로 둔다고 본 경우. 길면 잘림.",
        "3. PAD를 REPLACE처럼 본 경우.",
        "4. (정답)"
      ],
      tip: "LPAD=왼쪽, RPAD=오른쪽, 결과 길이 < 원본이면 자름."
    }
  },
  {
    id: 111,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 (R1, R2, R3)로 옳은 것은? (Oracle 환경)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT INSTR('banana', 'a')       AS R1,\n       INSTR('banana', 'a', 3, 2)  AS R2,\n       INSTR('banana', 'a', 3, 1)  AS R3\nFROM DUAL;"
      }
    ],
    choices: [
      "(1, 4, 4)",
      "(2, 6, 4)",
      "(2, 4, 6)",
      "(0, 6, 4)"
    ],
    ans: 2,
    src: "자료3 p.32",
    exp: {
      reason: "INSTR(s, sub, m, n): s에서 sub를 m 위치부터 검색하여 n번째 발견된 위치를 반환. m, n 생략 시 둘 다 1. 'banana'의 a 위치는 2, 4, 6. R1: 첫 번째 a 위치 = 2. R2: 3번째 위치부터 검색하여 2번째 발견된 a → 6번째 a. R3: 3번째 위치부터 검색하여 1번째 발견된 a → 4번째 a. (자료3 p.32 예시 그대로)",
      terms: [
        "**INSTR(s, sub, m, n)**: s에서 sub를 m 위치부터 검색해 n번째 발견 위치 반환",
        "**m, n 생략**: 자료3 p.32에 명시 — 둘 다 1로 간주",
        "**찾지 못하면**: 0 반환",
        "**SQL Server**: INSTR 대신 CHARINDEX (단, 시작 위치/순번 인수가 다름)"
      ],
      wrong: [
        "1. SQL이 0-인덱스라고 본 경우.",
        "2. (정답)",
        "3. n과 m의 의미를 바꿔 본 경우.",
        "4. R1에서 m, n 생략 시 0이라고 본 경우. 자료3 p.32는 '생략 시 m, n=1'."
      ],
      tip: "INSTR(s, sub, 시작위치m, 몇번째n). 'banana'의 a 위치 = 2, 4, 6."
    }
  },
  {
    id: 112,
    subj: 2,
    topic: "2-C",
    topic_name: "함수",
    diff: "중",
    has_code: true,
    q: "다음 [Oracle SQL]을 SQL Server에서 동일한 결과가 나오도록 변환할 때, 가장 적절하게 변환된 것은?",
    blocks: [
      {
        type: "code",
        title: "[Oracle]",
        lang: "sql",
        content: "SELECT SUBSTR(NAME, 1, 3) AS C1,\n       LENGTH(NAME)       AS C2,\n       INSTR(NAME, 'A')   AS C3\nFROM EMP;"
      }
    ],
    choices: [
      "SELECT SUBSTRING(NAME, 1, 3), LEN(NAME), CHARINDEX(NAME, 'A') FROM EMP;",
      "SELECT SUBSTRING(NAME, 1, 3), LEN(NAME), CHARINDEX('A', NAME) FROM EMP;",
      "SELECT SUBSTR(NAME, 1, 3), LEN(NAME), INSTR(NAME, 'A') FROM EMP;",
      "SELECT SUBSTRING(NAME, 0, 3), LENGTH(NAME), CHARINDEX('A', NAME) FROM EMP;"
    ],
    ans: 2,
    src: "자료3 p.32, 자료2 p.32",
    exp: {
      reason: "Oracle ↔ SQL Server 함수 매칭: SUBSTR → SUBSTRING, LENGTH → LEN, INSTR(s, sub) → CHARINDEX(sub, s) (인수 순서가 반대). 시작 위치는 둘 다 1부터. (자료3 p.32 하단 'SQL SERVER:' 매핑)",
      terms: [
        "**SUBSTR(s, m, n) → SUBSTRING(s, m, n)**: 인수 동일, 이름만 변경",
        "**LENGTH(s) → LEN(s)**: 이름 변경",
        "**INSTR(s, sub) → CHARINDEX(sub, s)**: 이름 변경 + 인수 순서 반대",
        "**공통**: 시작 위치는 둘 다 1부터"
      ],
      wrong: [
        "1. CHARINDEX 인수 순서가 INSTR과 동일하다고 본 경우. 반대다.",
        "2. (정답)",
        "3. SUBSTR/INSTR이 SQL Server에서도 작동한다고 본 경우. 둘 다 미지원.",
        "4. SUBSTRING 시작이 0부터라고 본 경우. SUBSTRING도 1부터다."
      ],
      tip: "Oracle→SQL Server: SUBSTR→SUBSTRING, LENGTH→LEN, INSTR(s,sub)→CHARINDEX(sub,s) [순서 반대]."
    }
  }
];

module.exports = c2Part1;

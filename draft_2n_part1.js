// 2-N: Q541~Q550 (정규 표현식 전체 10문항)
// 자료3 p.82~84 기반. PostgreSQL 14 regexp_matches/regexp_replace/~ 연산자로 결과 검증.
// Oracle REGEXP_LIKE/REGEXP_REPLACE/REGEXP_SUBSTR/REGEXP_INSTR/REGEXP_COUNT는
// Oracle 전용 함수로, PostgreSQL 등가 연산자/함수로 동치 시뮬레이션 완료.
const n2Part1 = [
  // ============================================================
  // 토픽 140: 정규 표현식 연산자 (Q541~Q543) - 3문항, has_code: false
  // ============================================================
  {
    id: 541,
    subj: 2,
    topic: "2-N",
    topic_name: "정규 표현식",
    diff: "상",
    has_code: false,
    q: "다음 중 정규 표현식 연산자와 그 의미의 매칭으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      ".(dot) - 개행 문자를 제외한 임의의 문자 1개와 매칭된다.",
      "^ - 문자열 또는 라인의 시작 위치를 나타내는 앵커이다.",
      "$ - 문자열 또는 라인의 끝 위치를 나타내는 앵커이다.",
      "{n,m} - 선행 패턴이 정확히 n회 반복될 때만 매칭된다."
    ],
    ans: 4,
    src: "자료3 p.82~83",
    exp: {
      reason: "{n,m}은 선행 패턴이 최소 n회에서 최대 m회 반복될 때 매칭된다. 정확히 n회만이 아니라 n 이상 m 이하의 반복 횟수를 허용한다. 정확히 n회만 매칭하려면 {n}을 사용한다. (자료3 p.82~83)",
      terms: [
        "**.(dot)**: 개행 문자(\\n)를 제외한 임의의 문자 1개. REGEXP_LIKE에서 match_param n을 지정하면 개행도 매칭",
        "**^ 앵커**: 문자열 시작. match_param m(다중 라인)을 지정하면 각 라인의 시작",
        "**$ 앵커**: 문자열 끝. match_param m을 지정하면 각 라인의 끝",
        "**{n,m}**: 선행 패턴이 n회 이상 m회 이하 반복. {n} = 정확히 n회, {n,} = n회 이상"
      ],
      wrong: [
        "1. dot의 정의 그대로다.",
        "2. ^ 앵커의 정의 그대로다.",
        "3. $ 앵커의 정의 그대로다.",
        "4. (정답) {n,m}은 n회 이상 m회 이하 반복. 정확히 n회는 {n}으로 표기한다."
      ],
      tip: "{n,m}은 **n 이상 m 이하** 반복. 정확히 n회 = {n}, n회 이상 = {n,}."
    }
  },
  {
    id: 542,
    subj: 2,
    topic: "2-N",
    topic_name: "정규 표현식",
    diff: "상",
    has_code: false,
    q: "다음 정규 표현식 패턴에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "^[[:alpha:]]{3}$ 는 영문자 3개로만 구성된 문자열과 매칭된다.",
      "[^0-9]는 숫자 0부터 9 중 한 자리 숫자와 매칭된다.",
      "[[:digit:]]+ 는 숫자가 0번 이상 반복되는 부분과 매칭된다.",
      "[[:alnum:]]* 는 영문자와 숫자로만 구성되어 1자 이상인 문자열과 매칭된다."
    ],
    ans: 1,
    src: "자료3 p.82~83",
    exp: {
      reason: "^[[:alpha:]]{3}$는 문자열 전체가 POSIX 알파벳 클래스([[:alpha:]])로 구성된 정확히 3개 문자와 매칭된다. ^ 와 $ 앵커로 전체 문자열 범위를 고정하고, {3}이 정확히 3회를 의미한다. (자료3 p.82~83)",
      terms: [
        "**[[:alpha:]]**: POSIX 알파벳 클래스. 대소문자 영문자 A-Z, a-z",
        "**[^0-9]**: 부정 문자 클래스. 0-9 이외의 문자 1개와 매칭 (숫자 제외)",
        "**[[:digit:]]+**: 숫자 1회 이상 반복. +는 1회 이상이므로 0회는 매칭 안 됨",
        "**[[:alnum:]]***: 영문자 또는 숫자가 0회 이상 반복. *는 0회도 허용하므로 빈 문자열도 매칭"
      ],
      wrong: [
        "1. (정답) ^와 $, {3}, [[:alpha:]] 조합으로 영문자 정확히 3개 문자열과 매칭.",
        "2. [^0-9]는 숫자 제외한 문자. 숫자 자체가 아닌 나머지와 매칭된다.",
        "3. [[:digit:]]+의 +는 1회 이상이므로 0번 반복은 매칭되지 않는다.",
        "4. [[:alnum:]]*의 *는 0회 이상이므로 빈 문자열도 매칭된다. '1자 이상'은 틀림."
      ],
      tip: "[^클래스]는 **제외** 클래스. +는 1회 이상, *는 0회 이상으로 구분."
    }
  },
  {
    id: 543,
    subj: 2,
    topic: "2-N",
    topic_name: "정규 표현식",
    diff: "상",
    has_code: false,
    q: "다음 중 정규 표현식 POSIX 문자 클래스와 그 의미의 연결로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "[[:alpha:]] - 영문 대소문자 알파벳 문자",
      "[[:digit:]] - 숫자 0~9에 해당하는 문자",
      "[[:alnum:]] - 영문자와 숫자를 합한 문자",
      "[[:space:]] - 공백 문자를 제외한 모든 출력 가능 문자"
    ],
    ans: 4,
    src: "자료3 p.83",
    exp: {
      reason: "[[:space:]]는 공백 문자(스페이스, 탭, 개행 등)를 나타내는 POSIX 클래스이다. '공백을 제외한 출력 가능 문자'는 [[:print:]]나 [[:graph:]]에 해당한다. (자료3 p.83)",
      terms: [
        "**[[:alpha:]]**: 알파벳 문자 (A-Z, a-z)",
        "**[[:digit:]]**: 숫자 (0-9). \\d와 동일하지만 Oracle은 POSIX 표기 권장",
        "**[[:alnum:]]**: 알파벳 + 숫자. [[:alpha:]]와 [[:digit:]]의 합집합",
        "**[[:space:]]**: 공백 문자(스페이스, 탭 \\t, 개행 \\n, 캐리지리턴 \\r 등)",
        "**[[:punct:]]**: 구두점 문자 (!. , ? 등)"
      ],
      wrong: [
        "1. [[:alpha:]] 정의 그대로다.",
        "2. [[:digit:]] 정의 그대로다.",
        "3. [[:alnum:]] 정의 그대로다.",
        "4. (정답) [[:space:]]는 공백 문자 자체를 나타낸다. '제외'가 아님."
      ],
      tip: "[[:space:]] = 공백 **자체**. 부정(^)이 붙어야 '제외': [^[:space:]]."
    }
  },

  // ============================================================
  // 토픽 141: REGEXP_LIKE (Q544~Q546) - 3문항, has_code: true
  // ============================================================
  {
    id: 544,
    subj: 2,
    topic: "2-N",
    topic_name: "정규 표현식",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과로 반환되는 행의 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[MEMBER 테이블]",
        headers: ["MEM_ID", "PHONE"],
        rows: [
          ["M001", "010-1234-5678"],
          ["M002", "011-9999-0000"],
          ["M003", "010-5555-7777"],
          ["M004", "019-1111-2222"],
          ["M005", "010-abcd-5678"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT MEM_ID, PHONE\nFROM MEMBER\nWHERE REGEXP_LIKE(PHONE, '^010-[0-9]{4}-[0-9]{4}$');"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "4"
    ],
    ans: 2,
    src: "자료3 p.83",
    exp: {
      reason: "패턴 ^010-[0-9]{4}-[0-9]{4}$는 '010-'으로 시작하고 숫자 4자리 - 숫자 4자리로 끝나는 형식만 매칭한다. M001(010-1234-5678)과 M003(010-5555-7777)만 조건을 만족한다. M002는 011로 시작해 탈락, M004는 019로 시작해 탈락, M005는 4번째 그룹이 abcd(문자)여서 탈락한다. PostgreSQL ~ 연산자 검증 완료. (자료3 p.83)",
      terms: [
        "**REGEXP_LIKE(source, pattern)**: source가 pattern과 매칭되면 TRUE(행 반환)",
        "**^ 앵커**: 문자열의 시작. ^010은 '010으로 시작'을 강제",
        "**$ 앵커**: 문자열의 끝. [0-9]{4}$는 '숫자 4자리로 끝남'을 강제",
        "**[0-9]{4}**: 숫자(0-9) 정확히 4회 반복. 'abcd' 같은 문자는 불일치"
      ],
      wrong: [
        "1. M001만 조건을 만족한다고 착각한 경우.",
        "2. (정답) M001과 M003 두 행이 010-NNNN-NNNN 패턴에 부합.",
        "3. M002나 M004도 010 유사 패턴으로 착각한 경우.",
        "4. M005의 abcd도 문자 클래스로 허용된다고 오해한 경우."
      ],
      tip: "[0-9]{4}는 **숫자만** 4자리. 알파벳은 불일치."
    }
  },
  {
    id: 545,
    subj: 2,
    topic: "2-N",
    topic_name: "정규 표현식",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL에서 REGEXP_LIKE의 세 번째 인수(match_param)에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT EMP_NAME\nFROM EMP\nWHERE REGEXP_LIKE(EMP_NAME, '^k', 'i');"
      }
    ],
    choices: [
      "패턴 ^k를 대소문자를 구분하여 소문자 k로 시작하는 이름만 반환한다.",
      "패턴 ^k를 대소문자를 무시하여 K 또는 k로 시작하는 이름을 모두 반환한다.",
      ".(dot)이 개행 문자도 포함하여 매칭하도록 설정한다.",
      "^를 각 라인의 시작으로 인식하는 다중 라인 모드로 전환한다."
    ],
    ans: 2,
    src: "자료3 p.83",
    exp: {
      reason: "REGEXP_LIKE의 세 번째 인수 match_param에서 'i'는 대소문자를 무시(case-insensitive)하는 옵션이다. 따라서 ^k는 소문자 k뿐 아니라 대문자 K로 시작하는 이름도 모두 반환한다. PostgreSQL ~* 연산자(대소문자 무시)로 검증 완료. (자료3 p.83)",
      terms: [
        "**match_param 'i'**: case-insensitive. 대소문자 구분 없이 패턴 매칭",
        "**match_param 'c'**: case-sensitive(기본값). 대소문자 구분",
        "**match_param 'n'**: dot(.)이 개행 문자도 매칭하도록 변경",
        "**match_param 'm'**: 다중 라인 모드. ^와 $가 각 라인의 시작/끝 인식",
        "**match_param 'x'**: 공백 무시 모드. 가독성을 위한 패턴 내 공백 허용"
      ],
      wrong: [
        "1. 'i' 옵션은 대소문자를 구분하는 게 아니라 무시한다. 반대 설명임.",
        "2. (정답) 'i' = 대소문자 무시. K와 k 모두 매칭.",
        "3. 개행 포함 dot 매칭은 match_param 'n' 옵션이다.",
        "4. 다중 라인 모드는 match_param 'm' 옵션이다."
      ],
      tip: "match_param: i=대소무시, c=대소구분, n=dot개행포함, m=다중라인, x=공백무시."
    }
  },
  {
    id: 546,
    subj: 2,
    topic: "2-N",
    topic_name: "정규 표현식",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과로 반환되는 행의 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[PRODUCT 테이블]",
        headers: ["PROD_CODE"],
        rows: [
          ["A-1001"],
          ["B-2002"],
          ["a-3003"],
          ["1-4004"],
          ["C-5005"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT PROD_CODE\nFROM PRODUCT\nWHERE REGEXP_LIKE(PROD_CODE, '^[A-Z]-[0-9]{4}$', 'c');"
      }
    ],
    choices: [
      "2",
      "3",
      "4",
      "5"
    ],
    ans: 2,
    src: "자료3 p.83",
    exp: {
      reason: "match_param 'c'는 대소문자를 구분하는 옵션이다. 패턴 ^[A-Z]-[0-9]{4}$는 대문자 1자 - 숫자 4자리 형식을 요구한다. A-1001(대문자 A, 숫자 4자리), B-2002(대문자 B, 숫자 4자리), C-5005(대문자 C, 숫자 4자리)만 매칭되어 3행이 반환된다. a-3003은 소문자이므로 탈락, 1-4004는 숫자로 시작해 탈락한다. (자료3 p.83)",
      terms: [
        "**match_param 'c'**: case-sensitive(기본값). 대소문자 구분",
        "**[A-Z]**: 대문자 A~Z만 허용. 소문자 a~z는 제외",
        "**[0-9]{4}**: 숫자 정확히 4자리",
        "**결과**: A-1001, B-2002, C-5005 → 3행"
      ],
      wrong: [
        "1. 2 = a-3003도 포함한다고 착각하거나 한 행을 빠트린 경우.",
        "2. (정답) 대문자로 시작하는 3행만 매칭.",
        "3. 'c' 옵션 무시하고 소문자 a도 포함해서 4행으로 오해한 경우.",
        "4. 모든 행이 패턴에 부합한다고 오해한 경우."
      ],
      tip: "match_param 'c' = 대소문자 **구분**. [A-Z]는 대문자만. 소문자 a 제외."
    }
  },

  // ============================================================
  // 토픽 142: REGEXP_REPLACE/SUBSTR/INSTR/COUNT (Q547~Q550) - 4문항, has_code: true
  // ============================================================
  {
    id: 547,
    subj: 2,
    topic: "2-N",
    topic_name: "정규 표현식",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT REGEXP_REPLACE('A  B   C', ' +', ' ') AS RESULT\nFROM DUAL;"
      }
    ],
    choices: [
      "'A  B   C'",
      "'A B   C'",
      "'A B C'",
      "'ABC'"
    ],
    ans: 3,
    src: "자료3 p.84",
    exp: {
      reason: "REGEXP_REPLACE('A  B   C', ' +', ' ')는 하나 이상의 연속 공백(' +')을 단일 공백(' ')으로 치환한다. Oracle은 기본적으로 모든 매칭을 치환하므로 'A  B   C'의 공백 2개와 공백 3개가 각각 단일 공백으로 압축되어 'A B C'가 된다. PostgreSQL regexp_replace 'g' 플래그로 검증 완료. (자료3 p.84)",
      terms: [
        "**REGEXP_REPLACE(source, pattern, replace)**: 패턴에 매칭되는 부분을 replace로 교체",
        "**' +'**: 공백 1개 이상의 연속 패턴 (+ = 1회 이상)",
        "**Oracle 기본 동작**: occurrence 인수 기본값 0은 모든 매칭을 치환",
        "**결과**: 'A  B   C' → 'A B C' (공백 그룹 각각 1개로 압축)"
      ],
      wrong: [
        "1. 치환이 전혀 일어나지 않은 원본 반환으로 착각한 경우.",
        "2. 첫 번째 연속 공백 그룹만 치환된다고 착각한 경우.",
        "3. (정답) 모든 연속 공백 그룹이 단일 공백으로 압축된다.",
        "4. 공백이 모두 제거된다고 착각한 경우. replace 인수가 '' (빈 문자열)일 때만 제거."
      ],
      tip: "REGEXP_REPLACE 기본 = **모든 매칭 치환**. 첫 번째만 바꾸려면 occurrence=1 지정."
    }
  },
  {
    id: 548,
    subj: 2,
    topic: "2-N",
    topic_name: "정규 표현식",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT REGEXP_SUBSTR('2024-05-04', '[0-9]+', 1, 2) AS RESULT\nFROM DUAL;"
      }
    ],
    choices: [
      "'2024'",
      "'05'",
      "'04'",
      "'2024-05'"
    ],
    ans: 2,
    src: "자료3 p.84",
    exp: {
      reason: "REGEXP_SUBSTR('2024-05-04', '[0-9]+', 1, 2)의 네 번째 인수는 occurrence(몇 번째 매칭)이다. 문자열에서 [0-9]+(연속 숫자)가 매칭되는 순서는 1번째='2024', 2번째='05', 3번째='04'이다. occurrence=2이므로 두 번째 매칭인 '05'가 반환된다. PostgreSQL regexp_matches로 검증 완료. (자료3 p.84)",
      terms: [
        "**REGEXP_SUBSTR(source, pattern, position, occurrence)**: position 위치에서 시작해 occurrence번째 매칭 반환",
        "**position=1**: 문자열의 첫 번째 문자부터 탐색",
        "**occurrence=2**: 두 번째 매칭 반환",
        "**매칭 순서**: '2024-05-04'에서 [0-9]+ → 1번째='2024', 2번째='05', 3번째='04'"
      ],
      wrong: [
        "1. '2024' = occurrence=1(첫 번째 매칭). 두 번째가 아님.",
        "2. (정답) occurrence=2이므로 두 번째 연속 숫자 그룹 '05'.",
        "3. '04' = occurrence=3(세 번째 매칭).",
        "4. 패턴이 '-'를 포함하지 않으므로 분리된 숫자 그룹만 추출된다."
      ],
      tip: "REGEXP_SUBSTR 4번째 인수 = **occurrence(몇 번째 매칭)**. 1부터 시작."
    }
  },
  {
    id: 549,
    subj: 2,
    topic: "2-N",
    topic_name: "정규 표현식",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT REGEXP_INSTR('Hong Gil Dong', '[[:upper:]]', 1, 2) AS RESULT\nFROM DUAL;"
      }
    ],
    choices: [
      "1",
      "5",
      "6",
      "10"
    ],
    ans: 3,
    src: "자료3 p.84",
    exp: {
      reason: "REGEXP_INSTR('Hong Gil Dong', '[[:upper:]]', 1, 2)는 문자열 내 대문자([[:upper:]])의 두 번째 출현 위치를 반환한다. 'Hong Gil Dong'에서 대문자는 H(위치 1), G(위치 6), D(위치 10) 순이다. occurrence=2이므로 두 번째 대문자 G의 위치인 6이 반환된다. (자료3 p.84)",
      terms: [
        "**REGEXP_INSTR(source, pattern, position, occurrence)**: occurrence번째 매칭의 시작 위치 반환",
        "**[[:upper:]]**: 대문자 POSIX 클래스",
        "**위치 규칙**: SQL에서 문자 위치는 1부터 시작",
        "**매칭 순서**: H=1번째(위치1), G=2번째(위치6), D=3번째(위치10)"
      ],
      wrong: [
        "1. 1 = 첫 번째 대문자 H의 위치. occurrence=1일 때의 결과.",
        "2. 5 = 'G' 앞 공백 위치. 실제 G는 6번째 문자.",
        "3. (정답) 두 번째 대문자 G는 'Hong Gil Dong'의 6번째 문자.",
        "4. 10 = 세 번째 대문자 D의 위치. occurrence=3일 때의 결과."
      ],
      tip: "REGEXP_INSTR 4번째 인수 = **occurrence**. 위치는 **1부터** 시작."
    }
  },
  {
    id: 550,
    subj: 2,
    topic: "2-N",
    topic_name: "정규 표현식",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT REGEXP_COUNT('aAbBcC', 'a', 1, 'i') AS R1,\n       REGEXP_COUNT('aAbBcC', 'a', 1, 'c') AS R2\nFROM DUAL;"
      }
    ],
    choices: [
      "R1=1, R2=1",
      "R1=2, R2=2",
      "R1=2, R2=1",
      "R1=1, R2=2"
    ],
    ans: 3,
    src: "자료3 p.84",
    exp: {
      reason: "REGEXP_COUNT('aAbBcC', 'a', 1, match_param)는 'aAbBcC'에서 'a' 패턴의 매칭 횟수를 반환한다. match_param 'i'(대소문자 무시)를 적용하면 소문자 a와 대문자 A 모두 매칭되어 R1=2이다. match_param 'c'(대소문자 구분)를 적용하면 소문자 a만 매칭되어 R2=1이다. PostgreSQL regexp_matches의 'g' 및 'gi' 플래그로 검증 완료. (자료3 p.84)",
      terms: [
        "**REGEXP_COUNT(source, pattern, position, match_param)**: 패턴 매칭 횟수 반환",
        "**match_param 'i'**: 대소문자 무시. 'a' 패턴이 A와 a 모두 매칭 → 2",
        "**match_param 'c'**: 대소문자 구분. 'a' 패턴이 소문자 a만 매칭 → 1",
        "**'aAbBcC' 분석**: a(소문자 1번째), A(대문자 2번째), b, B, c, C 각 1회씩"
      ],
      wrong: [
        "1. 'i'와 'c' 둘 다 1개라면 대소문자 무시가 적용 안 된 경우. R1은 2여야 함.",
        "2. 'c' 옵션에서도 대문자 A가 카운트된다고 착각한 경우.",
        "3. (정답) 'i' = 대소무시 2개, 'c' = 대소구분 1개.",
        "4. R1과 R2가 바뀐 경우. i가 크고 c가 작다."
      ],
      tip: "REGEXP_COUNT match_param: i=대소무시(더 많음), c=대소구분(더 적음)."
    }
  }
];

module.exports = n2Part1;

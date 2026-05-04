// 2-S: Q781~Q795 (DCL 전체 15문항)
// 자료3 p.101~103, 자료1(SQLD_요약_서브노트) p.38 기반.
// GRANT/REVOKE 문법은 PostgreSQL 검증 가능. WITH ADMIN OPTION 연쇄 비회수 동작은 Oracle 전용이므로 자료3 p.103 인용 처리.
const s2Part1 = [
  // ============================================================
  // 토픽 167: DCL 개념 및 GRANT/REVOKE (Q781~Q784) - 4문항, 코드 있음
  // ============================================================
  {
    id: 781,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "하",
    has_code: false,
    q: "다음 중 DCL(Data Control Language)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "DCL은 데이터베이스 객체에 대한 권한을 부여하거나 회수하는 명령어이다.",
      "DCL에 속하는 대표 명령어는 GRANT와 REVOKE이다.",
      "오브젝트 권한은 특정 테이블에 대한 SELECT, INSERT, UPDATE, DELETE 등의 DML 권한을 의미한다.",
      "시스템 권한은 테이블 소유자라면 별도 부여 없이 누구나 사용할 수 있다."
    ],
    ans: 4,
    src: "자료3 p.101~102",
    exp: {
      reason: "시스템 권한(CREATE TABLE, CREATE VIEW 등)은 관리자 권한만 부여 및 회수할 수 있다. 테이블 소유자가 자동으로 시스템 권한을 갖거나 타인에게 부여할 수 있는 것이 아니다. (자료3 p.102)",
      terms: [
        "**DCL**: 데이터 제어어. GRANT(권한 부여)와 REVOKE(권한 회수)가 대표 명령어",
        "**오브젝트 권한**: 특정 테이블/뷰 등에 대한 DML 권한. 테이블 소유자가 부여 및 회수 가능",
        "**시스템 권한**: CREATE TABLE, DROP ANY TABLE 등 DDL 권한. 관리자(SYS, SYSTEM)만 부여 가능",
        "**테이블 소유자**: 자신의 테이블에 대한 조회/수정 권한 부여 및 회수 가능 (오브젝트 권한 한정)"
      ],
      wrong: [
        "1. DCL의 정의 그대로다. (자료3 p.101)",
        "2. GRANT와 REVOKE는 DCL의 양대 명령어다. (자료3 p.101)",
        "3. 오브젝트 권한의 정의 그대로다. (자료3 p.101)",
        "4. (정답) 시스템 권한은 관리자 권한만 부여/회수 가능하다. 테이블 소유자 여부와 무관하다."
      ],
      tip: "시스템 권한 = **관리자 전용** 부여/회수. 오브젝트 권한 = 해당 테이블 소유자도 부여 가능."
    }
  },
  {
    id: 782,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 또는 동작에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "GRANT SELECT ON EMP TO A;\nGRANT SELECT ON EMP TO A, B;\nGRANT SELECT, UPDATE, INSERT ON EMP TO B;\nGRANT SELECT ON EMP, DEPT ON A;"
      }
    ],
    choices: [
      "네 구문 모두 정상 실행된다.",
      "세 번째 구문은 여러 권한을 동시에 부여하므로 오류가 발생한다.",
      "두 번째 구문은 여러 사용자에게 동시에 권한을 부여하므로 오류가 발생한다.",
      "네 번째 구문은 여러 객체에 동시에 권한을 부여하므로 오류가 발생한다."
    ],
    ans: 4,
    src: "자료3 p.102",
    exp: {
      reason: "GRANT는 동시에 여러 사용자에게 권한 부여(가능), 동시에 여러 권한 부여(가능)는 허용하지만, 동시에 여러 객체에 권한 부여(불가)는 지원하지 않는다. 네 번째 구문 `GRANT SELECT ON EMP, DEPT ON A`는 복수 객체 지정으로 오류가 발생한다. (자료3 p.102)",
      terms: [
        "**GRANT 문법**: `GRANT 권한 ON 테이블명 TO 유저`",
        "**복수 권한 허용**: `GRANT SELECT, UPDATE ON EMP TO B` 가능",
        "**복수 사용자 허용**: `GRANT SELECT ON EMP TO A, B` 가능",
        "**복수 객체 불가**: `GRANT SELECT ON EMP, DEPT TO A` 오류 (자료3 p.102 '동시에 여러 객체 권한 부여 불가')"
      ],
      wrong: [
        "1. 네 번째 구문은 오류가 발생하므로 모두 정상 실행되지 않는다.",
        "2. 여러 권한 동시 부여는 가능하다. 세 번째 구문은 정상이다.",
        "3. 여러 사용자 동시 부여는 가능하다. 두 번째 구문은 정상이다.",
        "4. (정답) 동시에 여러 객체에 권한 부여는 불가하다. 네 번째 구문이 오류다."
      ],
      tip: "GRANT: 복수 권한 O, 복수 사용자 O, 복수 객체 **X**."
    }
  },
  {
    id: 783,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "중",
    has_code: true,
    q: "다음 중 REVOKE에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가) 복수 권한 동시 회수\nREVOKE SELECT, UPDATE, INSERT ON EMP FROM A;\n\n-- (나) 복수 유저 동시 회수\nREVOKE SELECT ON EMP FROM A, B;\n\n-- (다) 이미 회수된 권한 재회수 시도\nREVOKE SELECT ON EMP FROM A;  -- A는 이미 SELECT 권한 없음"
      }
    ],
    choices: [
      "(가)처럼 여러 권한을 한 번에 회수할 수 있다.",
      "(나)처럼 여러 유저로부터 동시에 권한을 회수할 수 있다.",
      "(다)처럼 이미 회수된 권한을 재회수하면 오류가 발생한다.",
      "REVOKE 후 권한이 박탈되려면 대상 유저가 재접속해야 한다."
    ],
    ans: 4,
    src: "자료3 p.102",
    exp: {
      reason: "REVOKE는 실행 즉시 권한이 박탈된다. 재접속이 필요한 것은 ROLE 부여 시이며, REVOKE(직접 회수)는 재접속 없이 즉시 반영된다. (자료3 p.102)",
      terms: [
        "**REVOKE 복수 권한**: 동시 회수 가능",
        "**REVOKE 복수 사용자**: 동시 회수 가능",
        "**이미 회수된 권한 재회수**: 오류 발생 (자료3 p.102)",
        "**REVOKE 반영 시점**: 즉시. 재접속 불필요 (ROLE 부여와 다름)"
      ],
      wrong: [
        "1. 복수 권한 동시 회수는 가능하다. 올바른 설명이다.",
        "2. 복수 유저 동시 회수는 가능하다. 올바른 설명이다.",
        "3. 이미 회수된 권한 재회수 시 오류 발생은 사실이다. 올바른 설명이다.",
        "4. (정답) REVOKE는 즉시 반영된다. 재접속이 필요한 것은 ROLE 부여 시다."
      ],
      tip: "REVOKE = **즉시** 박탈. 재접속 필요한 건 ROLE 부여뿐."
    }
  },
  {
    id: 784,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "중",
    has_code: true,
    q: "EMP 테이블 소유자가 다음 SQL을 순서대로 실행하였다. 실행 후 사용자 A의 EMP 테이블 권한 상태로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- 1단계\nGRANT SELECT, UPDATE, INSERT ON EMP TO A;\n\n-- 2단계\nREVOKE UPDATE ON EMP FROM A;"
      }
    ],
    choices: [
      "SELECT, UPDATE, INSERT 권한 모두 보유",
      "SELECT, INSERT 권한 보유 / UPDATE 권한 없음",
      "권한 없음 (REVOKE는 모든 권한을 일괄 회수함)",
      "UPDATE 권한만 보유 / SELECT와 INSERT는 자동 회수됨"
    ],
    ans: 2,
    src: "자료3 p.102",
    exp: {
      reason: "GRANT로 SELECT, UPDATE, INSERT를 부여한 후 REVOKE UPDATE로 UPDATE 권한만 회수하면, SELECT와 INSERT는 그대로 유지된다. REVOKE는 명시된 권한만 회수하며 나머지 권한에 영향을 주지 않는다. PostgreSQL 검증 완료. (자료3 p.102)",
      terms: [
        "**REVOKE 선택적 회수**: 명시된 권한만 정확히 회수. 나머지 권한 유지",
        "**1단계 후**: A는 SELECT, UPDATE, INSERT 보유",
        "**2단계 후**: UPDATE만 회수 → SELECT, INSERT 유지",
        "**일괄 회수**: 명시하지 않은 권한은 회수되지 않음"
      ],
      wrong: [
        "1. 2단계에서 UPDATE가 회수되므로 세 권한 모두 유지는 아니다.",
        "2. (정답) UPDATE만 회수. SELECT와 INSERT는 유지된다.",
        "3. REVOKE는 명시된 권한만 회수한다. 일괄 회수가 아니다.",
        "4. REVOKE UPDATE가 SELECT, INSERT에 영향을 주지 않는다."
      ],
      tip: "REVOKE = **명시된 권한만** 회수. 나머지 권한은 그대로 유지."
    }
  },

  // ============================================================
  // 토픽 168: WITH GRANT OPTION vs WITH ADMIN OPTION (Q785~Q788) - 4문항, 코드 없음
  // ============================================================
  {
    id: 785,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "상",
    has_code: false,
    q: "다음 중 WITH GRANT OPTION과 WITH ADMIN OPTION의 차이에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "WITH GRANT OPTION은 시스템 권한, WITH ADMIN OPTION은 오브젝트 권한에 사용한다.",
      "WITH GRANT OPTION으로 받은 권한을 중간관리자에게서 회수하면, 중간관리자가 제3자에게 부여한 권한도 함께 회수된다.",
      "WITH ADMIN OPTION으로 받은 권한을 중간관리자에게서 회수하면, 중간관리자가 제3자에게 부여한 권한도 함께 회수된다.",
      "두 옵션 모두 중간관리자를 거치지 않고 최상위 관리자가 제3자에게서 직접 회수할 수 있다."
    ],
    ans: 2,
    src: "자료3 p.103",
    exp: {
      reason: "WITH GRANT OPTION(오브젝트 권한)은 중간관리자 권한 회수 시 제3자에게 부여된 권한도 연쇄 회수(CASCADE)된다. WITH ADMIN OPTION(시스템 권한)은 중간관리자 권한 회수 시 제3자 권한이 유지된다. (자료3 p.103)",
      terms: [
        "**WITH GRANT OPTION**: 오브젝트 권한에 사용. A→B→C 전달 후 A가 B 회수 시 C도 연쇄 회수",
        "**WITH ADMIN OPTION**: 시스템 권한/롤에 사용. A→B→C 전달 후 A가 B 회수해도 C 권한 유지",
        "**연쇄 회수(CASCADE)**: GRANT OPTION에서만 발생. ADMIN OPTION은 해당 없음",
        "**중간관리자 직접 회수**: GRANT OPTION은 중간관리자만 회수 가능. ADMIN OPTION은 최상위도 직접 회수 가능"
      ],
      wrong: [
        "1. 반대다. WITH GRANT OPTION = 오브젝트 권한, WITH ADMIN OPTION = 시스템 권한/롤.",
        "2. (정답) GRANT OPTION은 연쇄 회수가 발생한다. (자료3 p.103)",
        "3. ADMIN OPTION은 연쇄 회수가 발생하지 않는다. 제3자 권한은 유지된다.",
        "4. GRANT OPTION은 중간관리자만 회수 가능하며 최상위 관리자가 직접 회수할 수 없다."
      ],
      tip: "GRANT OPTION → 연쇄 회수 O / ADMIN OPTION → 연쇄 회수 X. 시험 단골 포인트."
    }
  },
  {
    id: 786,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "상",
    has_code: false,
    q: "관리자 lee가 중간관리자 kim에게 WITH GRANT OPTION으로 EMP 테이블 SELECT 권한을 부여하였고, kim은 park에게 동일 권한을 부여하였다. 이후 lee가 kim의 권한을 회수하였을 때 결과로 옳은 것은?",
    blocks: null,
    choices: [
      "kim과 park 모두 EMP 테이블 SELECT 권한이 회수된다.",
      "kim의 권한만 회수되고 park의 권한은 유지된다.",
      "park의 권한만 회수되고 kim의 권한은 유지된다.",
      "lee가 kim에게서 직접 회수하는 것은 불가능하다."
    ],
    ans: 1,
    src: "자료3 p.103",
    exp: {
      reason: "WITH GRANT OPTION(오브젝트 권한)은 중간관리자(kim)의 권한 회수 시 중간관리자가 제3자(park)에게 부여한 권한도 함께 연쇄 회수된다. (자료3 p.103 'lee가 kim의 권한을 회수 시, park의 권한까지 모두 회수됨')",
      terms: [
        "**WITH GRANT OPTION 연쇄 회수**: 중간관리자 권한 회수 시 제3자 권한도 자동 회수",
        "**시나리오**: lee→kim(WITH GRANT OPTION)→park. lee가 kim 회수 → kim+park 동시 회수",
        "**직접 회수 불가**: lee가 park 권한을 직접 회수할 수는 없음. kim을 통해야만 함",
        "**REVOKE CASCADE**: 오브젝트 권한의 연쇄 회수 동작"
      ],
      wrong: [
        "1. (정답) GRANT OPTION 연쇄 회수로 kim과 park 권한 모두 회수된다.",
        "2. ADMIN OPTION 동작을 GRANT OPTION에 적용한 오류.",
        "3. 권한 원천인 kim 회수 없이 park만 회수되지 않는다.",
        "4. lee가 kim에게 부여했으므로 직접 회수가 가능하다."
      ],
      tip: "GRANT OPTION = **연쇄 회수**. kim 회수하면 park도 함께 날아간다."
    }
  },
  {
    id: 787,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "상",
    has_code: false,
    q: "관리자 lee가 중간관리자 kim에게 WITH ADMIN OPTION으로 CREATE TABLE 시스템 권한을 부여하였고, kim은 park에게 동일 권한을 부여하였다. 이후 lee가 kim의 권한을 회수하였을 때 결과로 옳은 것은?",
    blocks: null,
    choices: [
      "kim과 park 모두 CREATE TABLE 권한이 회수된다.",
      "kim의 권한만 회수되고 park의 권한은 유지된다.",
      "park의 권한만 회수되고 kim의 권한은 유지된다.",
      "lee가 park의 권한을 먼저 회수해야 kim의 권한을 회수할 수 있다."
    ],
    ans: 2,
    src: "자료3 p.103",
    exp: {
      reason: "WITH ADMIN OPTION(시스템 권한)은 중간관리자(kim) 권한 회수 시 제3자(park)에게 부여된 권한은 회수되지 않고 남아있다. 연쇄 회수가 발생하지 않는 것이 WITH GRANT OPTION과의 핵심 차이다. (자료3 p.103 'lee가 kim의 권한을 회수 시, park의 권한은 남아있음')",
      terms: [
        "**WITH ADMIN OPTION 비연쇄**: 중간관리자 권한 회수 시 제3자 권한은 유지",
        "**시나리오**: lee→kim(WITH ADMIN OPTION)→park. lee가 kim 회수 → kim만 회수, park 유지",
        "**최상위 직접 회수 가능**: ADMIN OPTION은 중간관리자를 거치지 않고 직접 회수 가능",
        "**GRANT OPTION과의 차이**: GRANT OPTION은 연쇄 회수, ADMIN OPTION은 비연쇄"
      ],
      wrong: [
        "1. GRANT OPTION의 동작이다. ADMIN OPTION은 연쇄 회수가 없다.",
        "2. (정답) ADMIN OPTION은 park 권한이 유지된다. (자료3 p.103)",
        "3. kim을 회수했는데 park만 회수되는 상황은 발생하지 않는다.",
        "4. ADMIN OPTION은 순서 무관하게 직접 회수 가능하다."
      ],
      tip: "ADMIN OPTION = **비연쇄**. kim 회수해도 park 권한은 살아있다."
    }
  },
  {
    id: 788,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "상",
    has_code: false,
    q: "다음 중 WITH GRANT OPTION과 WITH ADMIN OPTION의 비교로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "WITH GRANT OPTION은 오브젝트 권한에, WITH ADMIN OPTION은 시스템 권한 및 롤에 사용한다.",
      "두 옵션 모두 중간관리자가 받은 권한을 제3자에게 부여할 수 있게 한다.",
      "WITH GRANT OPTION은 중간관리자를 거치지 않고 최상위 관리자가 제3자 권한을 직접 회수할 수 없다.",
      "WITH ADMIN OPTION은 중간관리자 권한 회수 시 제3자에게 부여된 권한도 연쇄 회수된다."
    ],
    ans: 4,
    src: "자료3 p.103",
    exp: {
      reason: "WITH ADMIN OPTION은 중간관리자 권한 회수 시 제3자에게 부여된 권한은 연쇄 회수되지 않고 유지된다. 연쇄 회수(CASCADE)는 WITH GRANT OPTION에서만 발생한다. (자료3 p.103)",
      terms: [
        "**연쇄 회수 비교**: GRANT OPTION=연쇄 O / ADMIN OPTION=연쇄 X",
        "**적용 권한 비교**: GRANT OPTION=오브젝트 권한 / ADMIN OPTION=시스템 권한+롤",
        "**직접 회수 비교**: GRANT OPTION=최상위 직접 회수 불가, 중간관리자만 가능 / ADMIN OPTION=최상위 직접 회수 가능",
        "**공통점**: 두 옵션 모두 받은 권한을 제3자에게 재부여할 수 있게 함"
      ],
      wrong: [
        "1. GRANT OPTION=오브젝트, ADMIN OPTION=시스템/롤. 올바른 설명이다.",
        "2. 두 옵션 모두 재부여 기능을 부여한다. 올바른 설명이다.",
        "3. GRANT OPTION은 중간관리자만 회수 가능하며 최상위가 직접 회수 불가. 올바른 설명이다.",
        "4. (정답) ADMIN OPTION은 연쇄 회수가 발생하지 않는다. 제3자 권한은 유지된다."
      ],
      tip: "ADMIN OPTION = **연쇄 회수 없음**. 이 사실 하나로 GRANT OPTION과 구분."
    }
  },

  // ============================================================
  // 토픽 169: ROLE 특성 (Q789~Q792) - 4문항, 코드 없음
  // ============================================================
  {
    id: 789,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "중",
    has_code: false,
    q: "다음 중 ROLE(롤)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "ROLE은 다양한 권한들을 하나로 묶어 유저에게 일괄 부여할 수 있게 하는 권한 묶음이다.",
      "ROLE은 DB에서 유저들과 권한들 사이에서 중개 역할을 한다.",
      "ROLE에는 시스템 권한과 오브젝트 권한 모두 포함시킬 수 있다.",
      "ROLE을 유저에게 부여하면 재접속 없이 즉시 권한이 반영된다."
    ],
    ans: 4,
    src: "자료3 p.102~103",
    exp: {
      reason: "원래 권한(직접 GRANT)은 즉시 반영되지만, ROLE을 통해 받은 권한은 반드시 재접속해야만 권한이 부여된다. (자료3 p.102 '롤은 반드시 재접속을 해야만 권한이 부여된다')",
      terms: [
        "**ROLE**: 권한의 묶음. 유저에게 일괄 부여/회수 가능",
        "**중개 역할**: ROLE은 유저와 권한 사이의 브릿지 역할",
        "**ROLE 포함 가능 권한**: 시스템 권한 + 오브젝트 권한 모두 포함 가능",
        "**반영 시점**: 직접 GRANT → 즉시 반영 / ROLE 부여 → 재접속 시 반영"
      ],
      wrong: [
        "1. ROLE의 핵심 정의 그대로다. (자료3 p.102)",
        "2. 자료3 p.102 '롤은 DB에서 유저들과 권한들 사이에서 중개 역할을 함' 그대로다.",
        "3. 자료3 p.102에 시스템/오브젝트 권한 모두 포함 가능하다고 명시되어 있다.",
        "4. (정답) ROLE 부여는 재접속 시에만 반영된다. 즉시 반영이 아니다."
      ],
      tip: "직접 GRANT = 즉시 반영 / ROLE 부여 = **재접속 필요**. 반영 시점 차이 필수 암기."
    }
  },
  {
    id: 790,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "중",
    has_code: false,
    q: "다음 중 ROLE의 권한 회수 동작에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "ROLE을 통해 부여된 권한은 직접 REVOKE로 바로 회수할 수 있다.",
      "ROLE에서 권한을 회수하면 재접속 후 해당 권한이 박탈된다.",
      "ROLE에서 권한을 회수하면 즉시 반영되어 해당 권한이 박탈된다.",
      "ROLE을 통해 부여된 권한은 한번 부여되면 회수가 불가능하다."
    ],
    ans: 3,
    src: "자료3 p.102~103",
    exp: {
      reason: "자료3 p.103에 '롤에서 회수된 권한은 즉시 반영되므로 다시 롤을 부여할 필요가 없음'이라고 명시되어 있다. ROLE 부여는 재접속 필요이지만 ROLE 회수는 즉시 반영된다는 점이 핵심 차이다. (자료3 p.103)",
      terms: [
        "**ROLE 부여 시점**: 재접속 후 반영",
        "**ROLE 회수 시점**: 즉시 반영",
        "**직접 회수 불가**: 롤을 통해 부여된 권한은 직접 REVOKE로 회수 불가. 롤을 통해서만 회수 가능",
        "**REVOKE SELECT ON EMP FROM A 오류**: 롤로 받은 권한은 직접 회수 시 오류 (자료3 p.103)"
      ],
      wrong: [
        "1. 롤을 통해 받은 권한은 직접 REVOKE로 회수 불가. 롤을 통한 회수만 가능하다.",
        "2. ROLE 부여가 재접속 필요이지, 회수는 즉시 반영이다.",
        "3. (정답) ROLE 회수는 즉시 반영된다. (자료3 p.103)",
        "4. ROLE에서 권한을 회수하면 즉시 박탈된다. 영구 부여가 아니다."
      ],
      tip: "ROLE 부여 = 재접속 필요 / ROLE 회수 = **즉시 반영**. 부여와 회수의 타이밍이 다르다."
    }
  },
  {
    id: 791,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "중",
    has_code: false,
    q: "다음 중 ROLE에 포함할 수 있는 권한의 종류에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "ROLE에는 오브젝트 권한만 포함할 수 있으며 시스템 권한은 포함할 수 없다.",
      "ROLE에는 시스템 권한만 포함할 수 있으며 오브젝트 권한은 포함할 수 없다.",
      "ROLE에는 시스템 권한과 오브젝트 권한 모두 포함할 수 있다.",
      "ROLE은 다른 ROLE을 포함할 수 없으며 반드시 개별 권한만 포함해야 한다."
    ],
    ans: 3,
    src: "자료3 p.102",
    exp: {
      reason: "자료3 p.102에 '롤은 다양한 권한의 묶음으로 SYSTEM 계정에서 생성 가능'하고 시스템 권한과 오브젝트 권한 모두 담을 수 있다고 설명한다. 또한 ROLE은 유저에게 직접 부여될 수도 있고 다른 ROLE에 포함되어 유저에게 부여될 수도 있다. (자료3 p.102)",
      terms: [
        "**ROLE 포함 권한**: 시스템 권한 + 오브젝트 권한 모두 가능",
        "**ROLE 중첩**: ROLE을 다른 ROLE에 포함시킬 수 있음 (자료3 p.102 'ROLE은 유저에게 직접 부여될 수도 있고, 다른 ROLE에 포함하여 유저에게 부여될 수도 있다')",
        "**ROLE 생성**: SYSTEM 계정(관리자)에서 생성",
        "**ROLE 활용**: 유저 수가 많을 때 권한 관리 효율화"
      ],
      wrong: [
        "1. 오브젝트 권한만이라는 제한은 없다. 시스템 권한도 포함 가능하다.",
        "2. 시스템 권한만이라는 제한은 없다. 오브젝트 권한도 포함 가능하다.",
        "3. (정답) 시스템 권한 + 오브젝트 권한 모두 포함 가능하다.",
        "4. ROLE은 다른 ROLE도 포함할 수 있다. (자료3 p.102)"
      ],
      tip: "ROLE = 시스템 권한 + 오브젝트 권한 + **다른 ROLE** 모두 포함 가능."
    }
  },
  {
    id: 792,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "중",
    has_code: false,
    q: "다음 중 ROLE을 사용하는 이유에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "유저가 많아질수록 각 유저에게 개별 권한을 부여하는 작업이 번거로우므로 ROLE로 일괄 관리한다.",
      "ROLE에 권한을 묶어두면 해당 ROLE만 부여함으로써 권한 부여 절차를 단순화할 수 있다.",
      "ROLE을 회수하면 즉시 반영되므로 권한 박탈도 효율적으로 관리할 수 있다.",
      "ROLE을 사용하면 유저가 접속 중에도 즉시 새 권한이 반영되어 재접속이 필요 없다."
    ],
    ans: 4,
    src: "자료3 p.102",
    exp: {
      reason: "ROLE 부여는 재접속 시에만 반영된다. 자료3 p.102에 '롤은 반드시 재접속을 해야만 권한이 부여된다'고 명시되어 있다. 접속 중에 즉시 반영되는 것은 직접 GRANT이며 ROLE이 아니다. (자료3 p.102)",
      terms: [
        "**ROLE 존재 이유**: 많은 유저에게 반복적 권한 부여/회수 시 효율성",
        "**ROLE 부여 반영**: 재접속 시 반영 (즉시 X)",
        "**ROLE 회수 반영**: 즉시 반영",
        "**단순화 효과**: 필요한 권한 집합을 ROLE로 미리 정의 후 ROLE만 부여"
      ],
      wrong: [
        "1. ROLE 사용의 핵심 이유다. 올바른 설명이다.",
        "2. ROLE의 단순화 효과. 올바른 설명이다.",
        "3. ROLE 회수는 즉시 반영된다. 올바른 설명이다.",
        "4. (정답) ROLE 부여는 재접속 시에만 반영된다. 즉시 반영이 아니다."
      ],
      tip: "ROLE의 한계: **부여는 재접속 필요**. 이것이 ROLE의 한 가지 단점이자 시험 포인트."
    }
  },

  // ============================================================
  // 토픽 170: SQL Server 데이터베이스 역할 (Q793~Q795) - 3문항, 코드 없음
  // ============================================================
  {
    id: 793,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "하",
    has_code: false,
    q: "다음 중 SQL Server 데이터베이스 수준 역할(Fixed Database Role)과 그 설명의 매칭으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "db_datareader - 모든 사용자 테이블의 모든 데이터를 읽을 수 있다.",
      "db_datawriter - 모든 사용자 테이블에서 데이터를 추가, 삭제, 변경할 수 있다.",
      "db_owner - 데이터베이스 내에 있는 모든 구성 및 유지관리 작업을 수행할 수 있고 데이터베이스를 삭제할 수도 있다.",
      "db_ddladmin - 데이터베이스 내의 모든 사용자 테이블의 데이터를 읽을 수 없다."
    ],
    ans: 4,
    src: "자료1 p.38",
    exp: {
      reason: "db_ddladmin은 데이터베이스에서 모든 DDL 명령을 수행할 수 있는 역할이다. 데이터를 읽을 수 없다는 설명은 db_denydatareader에 해당한다. (자료1 p.38 [표 II-2-13])",
      terms: [
        "**db_datareader**: 모든 사용자 테이블의 모든 데이터 읽기 가능",
        "**db_datawriter**: 모든 사용자 테이블에서 데이터 추가/삭제/변경 가능",
        "**db_ddladmin**: 데이터베이스에서 모든 DDL 명령 수행 가능",
        "**db_denydatareader**: 데이터베이스 내 모든 사용자 테이블의 데이터를 읽을 수 없음",
        "**db_owner**: 모든 구성 및 유지관리 작업 수행 가능, 데이터베이스 삭제 가능"
      ],
      wrong: [
        "1. db_datareader의 정의 그대로다. (자료1 p.38)",
        "2. db_datawriter의 정의 그대로다. (자료1 p.38)",
        "3. db_owner의 정의 그대로다. (자료1 p.38)",
        "4. (정답) 설명은 db_denydatareader에 해당한다. db_ddladmin은 DDL 수행 역할이다."
      ],
      tip: "db_ddladmin = DDL 권한. db_denydatareader = 읽기 **금지**. deny가 붙으면 금지 역할."
    }
  },
  {
    id: 794,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "하",
    has_code: false,
    q: "다음 설명에 해당하는 SQL Server 데이터베이스 역할로 가장 적절한 것은?\n\n[보기] 데이터베이스 내에 있는 모든 구성 및 유지관리 작업을 수행할 수 있고, 데이터베이스를 삭제할 수도 있다.",
    blocks: null,
    choices: [
      "db_datareader",
      "db_datawriter",
      "db_owner",
      "db_ddladmin"
    ],
    ans: 3,
    src: "자료1 p.38",
    exp: {
      reason: "자료1 p.38 [표 II-2-13]에서 db_owner는 '데이터베이스 내에 있는 모든 구성 및 유지관리 작업을 수행할 수 있고 데이터베이스를 삭제할 수도 있다'로 정의된다. (자료1 p.38)",
      terms: [
        "**db_owner**: 데이터베이스 소유자 역할. 모든 구성/유지관리 + 데이터베이스 삭제 권한 포함",
        "**db_datareader**: 읽기(SELECT)만 가능",
        "**db_datawriter**: 쓰기(INSERT/UPDATE/DELETE)만 가능",
        "**db_ddladmin**: DDL(CREATE/ALTER/DROP) 명령만 가능"
      ],
      wrong: [
        "1. db_datareader는 데이터 읽기 전용 역할이다.",
        "2. db_datawriter는 데이터 추가/수정/삭제 역할이다.",
        "3. (정답) db_owner가 모든 구성/유지관리/삭제 권한을 가진다.",
        "4. db_ddladmin은 DDL 명령 실행 역할이다."
      ],
      tip: "db_owner = 데이터베이스의 **주인**. 구성/유지관리/삭제까지 모든 권한."
    }
  },
  {
    id: 795,
    subj: 2,
    topic: "2-S",
    topic_name: "DCL",
    diff: "하",
    has_code: false,
    q: "다음 중 SQL Server 데이터베이스 역할에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "db_datareader 역할을 가진 사용자는 모든 사용자 테이블의 데이터를 조회할 수 있다.",
      "db_datawriter 역할을 가진 사용자는 모든 사용자 테이블에서 데이터를 추가, 삭제, 변경할 수 있다.",
      "db_denydatareader 역할을 가진 사용자는 데이터베이스 내 모든 사용자 테이블의 데이터를 읽을 수 없다.",
      "db_datareader 역할과 db_datawriter 역할을 동시에 부여하면 DDL 명령도 수행할 수 있다."
    ],
    ans: 4,
    src: "자료1 p.38",
    exp: {
      reason: "db_datareader는 SELECT 권한만, db_datawriter는 INSERT/UPDATE/DELETE 권한만 제공한다. DDL 명령(CREATE/ALTER/DROP 등)은 db_ddladmin 또는 db_owner 역할이 있어야 수행 가능하다. 두 역할을 합쳐도 DDL 권한은 부여되지 않는다. (자료1 p.38)",
      terms: [
        "**db_datareader 범위**: SELECT 한정. DDL 불포함",
        "**db_datawriter 범위**: INSERT/UPDATE/DELETE 한정. DDL 불포함",
        "**DDL 권한**: db_ddladmin 또는 db_owner가 보유",
        "**db_denydatareader**: 읽기 명시적 금지 역할. deny 역할은 허용 역할보다 우선"
      ],
      wrong: [
        "1. db_datareader의 정의 그대로다. (자료1 p.38)",
        "2. db_datawriter의 정의 그대로다. (자료1 p.38)",
        "3. db_denydatareader의 정의 그대로다. (자료1 p.38)",
        "4. (정답) 두 역할을 합쳐도 DDL 권한은 없다. DDL은 db_ddladmin 역할이 필요하다."
      ],
      tip: "datareader + datawriter = DML 전체. **DDL은 별도 역할(db_ddladmin) 필요**."
    }
  }
];

module.exports = s2Part1;

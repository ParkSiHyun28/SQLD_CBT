// 2-P: Q716~Q735 (TCL 전체 20문항)
// 자료3 p.87~89 기반.
// SAVEPOINT/COMMIT/ROLLBACK은 PostgreSQL 14 sqld_verify DB로 검증 가능.
// Oracle vs SQL Server COMMIT 차이, DDL 자동 COMMIT은 자료3 인용으로 정답 확정.
const p2Part1 = [

  // ============================================================
  // 토픽 148: 트랜잭션 ACID (Q716~Q718) - 3문항, has_code: false
  // ============================================================
  {
    id: 716,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: false,
    q: "다음 중 트랜잭션의 ACID 속성과 그 설명의 매칭으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "원자성(Atomicity) - 트랜잭션에서 정의된 연산들은 모두 성공적으로 실행되거나 전혀 실행되지 않은 상태로 남아 있어야 한다.",
      "일관성(Consistency) - 트랜잭션이 실행되기 전에 데이터베이스 내용이 잘못되어 있지 않다면, 트랜잭션이 실행된 이후에도 데이터베이스 내용에 잘못이 있으면 안 된다.",
      "고립성(Isolation) - 트랜잭션이 실행되는 도중에 다른 트랜잭션의 영향을 받아 잘못된 결과를 만들어서는 안 된다.",
      "지속성(Durability) - 트랜잭션이 성공적으로 수행되면 갱신한 데이터베이스의 내용은 세션이 종료될 때까지만 보장된다."
    ],
    ans: 4,
    src: "자료3 p.87~88",
    exp: {
      reason: "지속성(Durability)은 트랜잭션이 성공적으로 수행되면 갱신한 데이터베이스의 내용이 영구적으로 저장됨을 의미한다. 세션 종료 여부와 무관하게 영구 보존이 보장되어야 한다. (자료3 p.87~88)",
      terms: [
        "**원자성(Atomicity)**: ALL OR NOTHING. 트랜잭션의 연산은 전부 실행되거나 전혀 실행되지 않아야 함",
        "**일관성(Consistency)**: 트랜잭션 전후 데이터베이스의 일관된 상태 유지",
        "**고립성(Isolation)**: 수행 중인 트랜잭션은 다른 트랜잭션의 간섭을 받지 않아야 함",
        "**지속성(Durability)**: COMMIT된 결과는 시스템 오류가 발생해도 영구적으로 반영됨"
      ],
      wrong: [
        "1. 자료3 p.87 원자성 정의 그대로다.",
        "2. 자료3 p.87 일관성 정의 그대로다.",
        "3. 자료3 p.87 고립성 정의 그대로다.",
        "4. (정답) 지속성은 세션 종료 여부와 무관하게 영구 보존이다."
      ],
      tip: "지속성 = **영구적** 저장. 세션/시스템 종료와 무관하게 COMMIT 결과는 유지된다."
    }
  },
  {
    id: 717,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: false,
    q: "다음 중 트랜잭션의 원자성(Atomicity)을 가장 잘 설명한 것은?",
    blocks: null,
    choices: [
      "트랜잭션이 성공적으로 수행되면 갱신된 데이터베이스의 내용은 영구적으로 저장된다.",
      "트랜잭션 실행 도중 다른 트랜잭션의 영향을 받아 잘못된 결과를 만들어서는 안 된다.",
      "트랜잭션에서 정의된 연산들은 모두 성공적으로 실행되던가 아니면 전혀 실행되지 않은 상태로 남아 있어야 한다.",
      "트랜잭션이 실행되기 전의 데이터베이스 내용이 올바르다면 실행 후에도 올바른 상태여야 한다."
    ],
    ans: 3,
    src: "자료3 p.87",
    exp: {
      reason: "원자성은 트랜잭션 내의 연산이 전부 실행되거나 전혀 실행되지 않아야 함을 의미한다. ALL OR NOTHING 원칙으로, 일부만 실행된 상태로 남을 수 없다. 계좌이체 예시처럼 인출과 입금이 모두 성공하거나 모두 취소되어야 한다. (자료3 p.87)",
      terms: [
        "**원자성(Atomicity)**: ALL OR NOTHING. 부분 실행 상태 불허",
        "**1번**: 지속성(Durability) 설명",
        "**2번**: 고립성(Isolation) 설명",
        "**4번**: 일관성(Consistency) 설명"
      ],
      wrong: [
        "1. 지속성(Durability)에 대한 설명이다.",
        "2. 고립성(Isolation)에 대한 설명이다.",
        "3. (정답) ALL OR NOTHING이 원자성의 핵심이다.",
        "4. 일관성(Consistency)에 대한 설명이다."
      ],
      tip: "ACID 4가지를 구분할 때: Atomicity = ALL OR NOTHING / Consistency = 전후 무결성 / Isolation = 독립 실행 / Durability = 영구 보존."
    }
  },
  {
    id: 718,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: false,
    q: "다음 설명이 의미하는 트랜잭션 ACID 속성으로 가장 적절한 것은?\n\n「계좌 이체 시 한 계좌에서 금액이 빠지고 다른 계좌에 금액이 더해지는 일이 모두 성공적으로 완료가 되었을 때 종료된다. 하나라도 실패할 경우 두 계좌는 원래의 금액을 유지해야 한다.」",
    blocks: null,
    choices: [
      "일관성(Consistency)",
      "고립성(Isolation)",
      "지속성(Durability)",
      "원자성(Atomicity)"
    ],
    ans: 4,
    src: "자료3 p.87",
    exp: {
      reason: "계좌이체 예시는 원자성의 대표적인 사례이다. 인출과 입금 두 연산이 하나의 트랜잭션으로 묶여 둘 다 성공하거나 둘 다 취소되어야 한다는 것이 ALL OR NOTHING 원칙, 즉 원자성이다. (자료3 p.87)",
      terms: [
        "**원자성(Atomicity)**: 트랜잭션 내 연산 전부 성공 또는 전부 취소",
        "**계좌이체 시나리오**: 인출 + 입금이 하나의 원자적 단위",
        "**실패 시 처리**: ROLLBACK으로 인출도 취소되어 이전 상태로 복원"
      ],
      wrong: [
        "1. 일관성은 트랜잭션 전후 데이터베이스의 무결성 유지를 의미한다.",
        "2. 고립성은 수행 중인 트랜잭션이 다른 트랜잭션의 간섭을 받지 않아야 함을 의미한다.",
        "3. 지속성은 COMMIT된 내용이 영구적으로 저장됨을 의미한다.",
        "4. (정답) ALL OR NOTHING 원칙이 원자성이다."
      ],
      tip: "계좌이체 = 원자성 예시. '하나라도 실패하면 전부 되돌린다'가 핵심."
    }
  },

  // ============================================================
  // 토픽 149: COMMIT/ROLLBACK 동작 (Q719~Q722) - 4문항, has_code: true
  // ============================================================
  {
    id: 719,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL 실행 후 PLAYER 테이블의 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[PLAYER 테이블 초기 상태]",
        headers: ["PLAYER_ID", "PLAYER_NAME"],
        rows: [
          ["P01", "김철수"],
          ["P02", "이영희"],
          ["P03", "박지성"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "INSERT INTO PLAYER VALUES ('P04', '손흥민');\nCOMMIT;\nINSERT INTO PLAYER VALUES ('P05', '이강인');\nROLLBACK;"
      }
    ],
    choices: [
      "3",
      "4",
      "5",
      "2"
    ],
    ans: 2,
    src: "자료3 p.88~89",
    exp: {
      reason: "첫 번째 INSERT 후 COMMIT으로 P04가 영구 반영된다. 이후 INSERT로 P05가 추가되었으나 ROLLBACK으로 마지막 COMMIT 지점(P04 삽입 직후)으로 복원된다. 따라서 최종 행 수는 초기 3행 + P04 = 4행이다. PostgreSQL 검증 완료. (자료3 p.88~89)",
      terms: [
        "**COMMIT**: 그 시점까지의 DML을 영구 반영. 이후 ROLLBACK 불가",
        "**ROLLBACK**: 최종 COMMIT 지점으로 되돌림. 그 이후 변경 모두 취소",
        "**최종 COMMIT 지점**: P04 INSERT 후 COMMIT이 완료된 상태(4행)"
      ],
      wrong: [
        "1. 3 = ROLLBACK이 초기 상태로 되돌린다고 착각한 경우. ROLLBACK은 마지막 COMMIT 지점으로 복원.",
        "2. (정답) COMMIT 후 추가된 P04는 유지, ROLLBACK된 P05는 취소.",
        "3. 5 = ROLLBACK을 무시하고 전부 반영된다고 착각한 경우.",
        "4. 2 = 행 수 계산 오류."
      ],
      tip: "ROLLBACK의 기준점은 **마지막 COMMIT 지점**. 그 이전 COMMIT은 되돌릴 수 없다."
    }
  },
  {
    id: 720,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL 실행 후 PLAYER 테이블에 남아 있는 행의 PLAYER_NAME을 모두 나열한 것으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[PLAYER 테이블 초기 상태]",
        headers: ["PLAYER_ID", "PLAYER_NAME"],
        rows: [
          ["P01", "김철수"],
          ["P02", "이영희"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "DELETE FROM PLAYER WHERE PLAYER_ID = 'P01';\nCOMMIT;\nDELETE FROM PLAYER WHERE PLAYER_ID = 'P02';\nROLLBACK;"
      }
    ],
    choices: [
      "김철수, 이영희",
      "이영희",
      "김철수",
      "(없음 - 0건)"
    ],
    ans: 2,
    src: "자료3 p.88~89",
    exp: {
      reason: "P01 삭제 후 COMMIT으로 P01 삭제가 영구 반영된다. 이후 P02 삭제는 ROLLBACK으로 취소되어 마지막 COMMIT 시점(P01만 삭제된 상태)으로 복원된다. 최종적으로 이영희(P02)만 남는다. PostgreSQL 검증 완료. (자료3 p.88~89)",
      terms: [
        "**첫 번째 COMMIT**: P01 삭제가 확정. 이 상태가 새 기준점",
        "**ROLLBACK**: P02 삭제를 취소. 마지막 COMMIT 시점(이영희만 있는 상태)으로 복원",
        "**DML + COMMIT 패턴**: COMMIT 이전의 변경만 ROLLBACK 대상이 됨"
      ],
      wrong: [
        "1. 첫 번째 DELETE가 COMMIT 되었으므로 김철수는 복원되지 않는다.",
        "2. (정답) P01 삭제는 COMMIT으로 확정, P02 삭제는 ROLLBACK으로 취소.",
        "3. 김철수(P01)는 COMMIT으로 영구 삭제되었다.",
        "4. P02 삭제가 ROLLBACK으로 취소되므로 이영희는 남아 있다."
      ],
      tip: "COMMIT 이후 변경만 ROLLBACK 대상. COMMIT 이전으로는 되돌릴 수 없다."
    }
  },
  {
    id: 721,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: true,
    q: "다음 SQL Server에서의 실행 순서를 고려할 때, 최종적으로 PLAYER 테이블에 반영된 PRICE 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[PLAYER 테이블 초기 상태]",
        headers: ["DRINK", "PRICE"],
        rows: [["아메리카노", "3000"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "BEGIN TRAN;\nUPDATE PLAYER SET PRICE = 2800 WHERE DRINK = '아메리카노';\nROLLBACK;"
      }
    ],
    choices: [
      "2800",
      "3000",
      "0",
      "NULL"
    ],
    ans: 2,
    src: "자료3 p.88",
    exp: {
      reason: "SQL Server에서 BEGIN TRAN으로 명시적 트랜잭션을 시작하면 Oracle의 암시적 트랜잭션과 같은 방식으로 동작한다. ROLLBACK TRAN이 실행되면 BEGIN TRAN 이후의 모든 변경이 취소되어 원래 값인 3000으로 복원된다. (자료3 p.88)",
      terms: [
        "**BEGIN TRAN**: SQL Server에서 명시적 트랜잭션 시작",
        "**ROLLBACK**: BEGIN TRAN 시점까지의 변경을 모두 취소",
        "**SQL Server 암시적 트랜잭션**: Oracle과 같이 사용자가 COMMIT/ROLLBACK 처리"
      ],
      wrong: [
        "1. 2800 = ROLLBACK이 적용되지 않는다고 착각한 경우. ROLLBACK이 실행되어 2800은 취소된다.",
        "2. (정답) ROLLBACK으로 BEGIN TRAN 이전 상태인 3000으로 복원.",
        "3. 0 = 잘못된 값 추측.",
        "4. NULL = 잘못된 값 추측."
      ],
      tip: "SQL Server에서 BEGIN TRAN + ROLLBACK = Oracle의 암시적 트랜잭션 + ROLLBACK과 동일한 동작."
    }
  },
  {
    id: 722,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL 실행 후 PLAYER 테이블의 최종 WEIGHT 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[PLAYER 테이블 초기 상태]",
        headers: ["PLAYER_ID", "PLAYER_NAME", "WEIGHT"],
        rows: [["135", "이운재", "82"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "UPDATE PLAYER SET WEIGHT = 100 WHERE PLAYER_ID = '135';\nCOMMIT;\nUPDATE PLAYER SET WEIGHT = 90 WHERE PLAYER_ID = '135';\nROLLBACK;\nUPDATE PLAYER SET WEIGHT = 85 WHERE PLAYER_ID = '135';\nCOMMIT;"
      }
    ],
    choices: [
      "100",
      "90",
      "85",
      "82"
    ],
    ans: 3,
    src: "자료3 p.88~89",
    exp: {
      reason: "WEIGHT=100으로 UPDATE 후 COMMIT(100 확정). WEIGHT=90으로 UPDATE 후 ROLLBACK(90 취소, 100으로 복원). WEIGHT=85로 UPDATE 후 COMMIT(85 최종 확정). 최종 값은 85이다. PostgreSQL 검증 완료. (자료3 p.88~89)",
      terms: [
        "**1차 COMMIT**: WEIGHT=100 영구 반영",
        "**ROLLBACK**: WEIGHT=90 취소 → WEIGHT=100 복원",
        "**2차 COMMIT**: WEIGHT=85 영구 반영 → 최종값"
      ],
      wrong: [
        "1. 100 = 2차 COMMIT 이후 결과를 무시한 경우.",
        "2. 90 = ROLLBACK이 적용되지 않는다고 착각한 경우.",
        "3. (정답) 마지막 COMMIT 직전의 UPDATE가 최종값을 결정한다.",
        "4. 82 = ROLLBACK이 초기값으로 되돌린다고 착각한 경우."
      ],
      tip: "COMMIT을 여러 번 해도 **가장 마지막 COMMIT이 최종 확정값**. ROLLBACK은 직전 COMMIT 지점으로만 복원."
    }
  },

  // ============================================================
  // 토픽 150: Oracle vs SQL Server COMMIT 차이 (Q723~Q725) - 3문항, has_code: false
  // ============================================================
  {
    id: 723,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: false,
    q: "다음 중 Oracle과 SQL Server의 트랜잭션 처리 방식에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "Oracle은 DML 수행 후 사용자가 명시적으로 COMMIT 또는 ROLLBACK을 수행해야 트랜잭션이 종료된다.",
      "SQL Server는 기본적으로 AUTO COMMIT 모드로 DML 수행 후 자동으로 COMMIT 처리된다.",
      "SQL Server에서 Oracle과 같이 명시적으로 트랜잭션을 묶으려면 BEGIN TRAN으로 시작해야 한다.",
      "Oracle에서 DDL 명령어를 실행하면 AUTO COMMIT 없이 DML과 동일하게 수동으로 COMMIT해야 반영된다."
    ],
    ans: 4,
    src: "자료3 p.88",
    exp: {
      reason: "Oracle에서도 DDL 명령어(CREATE TABLE, ALTER TABLE 등)는 실행 시 자동으로 COMMIT이 발생한다. DDL 이전에 수행된 미COMMIT DML도 함께 자동 COMMIT된다. DDL이 수동 COMMIT을 필요로 한다는 설명은 틀리다. (자료3 p.88)",
      terms: [
        "**Oracle DML**: 명시적 COMMIT 필요. AUTOCOMMIT off가 기본",
        "**SQL Server DML**: AUTO COMMIT 기본. 각 DML 즉시 반영",
        "**DDL(양쪽 모두)**: CREATE/ALTER/DROP 등은 실행 시 자동 COMMIT 발생",
        "**BEGIN TRAN**: SQL Server에서 Oracle 방식처럼 묶을 때 사용"
      ],
      wrong: [
        "1. 자료3 p.88의 Oracle COMMIT 특성 그대로다.",
        "2. 자료3 p.88의 SQL Server AUTO COMMIT 특성 그대로다.",
        "3. 자료3 p.88의 SQL Server 암시적 트랜잭션 설명 그대로다.",
        "4. (정답) Oracle에서도 DDL은 자동 COMMIT이 발생한다. DML만 수동 COMMIT 필요."
      ],
      tip: "DML은 Oracle만 수동 COMMIT. DDL은 Oracle/SQL Server **모두** 자동 COMMIT."
    }
  },
  {
    id: 724,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: false,
    q: "다음 중 SQL Server의 AUTO COMMIT에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "SQL Server는 기본적으로 AUTO COMMIT이 비활성화되어 있어 DML 수행 후 반드시 COMMIT을 명시해야 한다.",
      "SQL Server의 AUTO COMMIT 모드에서 DML 문이 성공적으로 수행되면 자동 COMMIT, 오류 발생 시 자동 ROLLBACK된다.",
      "SQL Server에서 BEGIN TRAN을 사용하면 AUTO COMMIT이 활성화되어 각 DML이 자동으로 커밋된다.",
      "SQL Server에서 DDL은 AUTO COMMIT 대상이 아니며 명시적 COMMIT을 해야 반영된다."
    ],
    ans: 2,
    src: "자료3 p.88",
    exp: {
      reason: "SQL Server의 AUTO COMMIT 모드에서는 DML 명령어가 문제 없이 수행되면 자동으로 COMMIT되고, 오류가 발생하면 자동으로 ROLLBACK 처리된다. 자료3 p.88에 명시된 내용이다. (자료3 p.88)",
      terms: [
        "**SQL Server AUTO COMMIT**: 기본 모드. DML 성공 시 자동 COMMIT, 오류 시 자동 ROLLBACK",
        "**BEGIN TRAN**: AUTO COMMIT을 비활성화하고 명시적 트랜잭션 시작",
        "**DDL AUTO COMMIT**: SQL Server에서도 DDL은 자동 COMMIT 대상"
      ],
      wrong: [
        "1. SQL Server는 AUTO COMMIT이 기본 활성화 상태다. 비활성화가 아님.",
        "2. (정답) 자료3 p.88의 SQL Server AUTO COMMIT 동작 설명 그대로다.",
        "3. BEGIN TRAN은 AUTO COMMIT을 중단하고 명시적 트랜잭션을 시작하는 명령이다. 반대 효과.",
        "4. SQL Server도 DDL은 AUTO COMMIT 대상이다."
      ],
      tip: "SQL Server AUTO COMMIT = 성공이면 자동 COMMIT, 실패면 자동 ROLLBACK. Oracle의 수동 방식과 반대."
    }
  },
  {
    id: 725,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: false,
    q: "다음 보기 중 Oracle과 SQL Server 모두에 해당하는 설명으로만 묶인 것은?",
    blocks: null,
    choices: [
      "가. DML 수행 후 자동 COMMIT된다.\n나. DDL 수행 시 자동 COMMIT된다.\n다. ROLLBACK으로 DML 변경을 취소할 수 있다.",
      "가. DDL 수행 시 자동 COMMIT된다.\n나. COMMIT을 통해 데이터를 영구 반영할 수 있다.",
      "가. DML 수행 후 명시적 COMMIT이 필요하다.\n나. DDL 수행 시 자동 COMMIT된다.",
      "가. AUTO COMMIT이 기본 모드이다.\n나. BEGIN TRAN으로 명시적 트랜잭션을 시작한다."
    ],
    ans: 2,
    src: "자료3 p.88",
    exp: {
      reason: "Oracle과 SQL Server 모두에 해당하는 것은 'DDL 수행 시 자동 COMMIT(나)'과 'COMMIT으로 데이터를 영구 반영할 수 있다(나)'이다. DML AUTO COMMIT은 SQL Server만 해당하고, DML 명시적 COMMIT은 Oracle만 해당한다. AUTO COMMIT 기본 모드는 SQL Server만이다. (자료3 p.88)",
      terms: [
        "**공통 사항**: DDL 자동 COMMIT, COMMIT을 통한 영구 반영",
        "**Oracle만**: DML 수동 COMMIT 필요",
        "**SQL Server만**: DML AUTO COMMIT 기본, BEGIN TRAN으로 명시적 트랜잭션"
      ],
      wrong: [
        "1. 'DML 수행 후 자동 COMMIT'은 SQL Server만의 특성이다. Oracle은 수동 COMMIT 필요.",
        "2. (정답) DDL AUTO COMMIT과 COMMIT 영구 반영은 양쪽 공통 사항이다.",
        "3. 'DML 명시적 COMMIT 필요'는 Oracle만의 특성이다.",
        "4. 'AUTO COMMIT 기본 모드'와 'BEGIN TRAN'은 SQL Server만의 특성이다."
      ],
      tip: "Oracle/SQL Server 공통 = DDL 자동 COMMIT. DML 처리 방식이 다른 것이 핵심 차이."
    }
  },

  // ============================================================
  // 토픽 151: SAVEPOINT 특성 (Q726~Q730) - 5문항, has_code: true
  // ============================================================
  {
    id: 726,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: false,
    q: "다음 중 SAVEPOINT에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "SAVEPOINT를 통해 트랜잭션에 포함된 전체 작업을 롤백하는 것이 아니라 현 시점에서 SAVEPOINT까지 트랜잭션의 일부만 롤백할 수 있다.",
      "사용자가 원하는 위치에 원하는 이름으로 SAVEPOINT를 설정할 수 있다.",
      "ROLLBACK TO savepoint_name으로 원하는 지점으로 원복할 수 있으며, COMMIT 이전에도 이미 SAVEPOINT 이전 시점으로 원복할 수 있다.",
      "동일한 이름으로 SAVEPOINT를 재선언하면 나중에 정의한 SAVEPOINT가 유효하다."
    ],
    ans: 3,
    src: "자료3 p.89",
    exp: {
      reason: "ROLLBACK TO savepoint_name은 COMMIT 이전의 시점까지만 원복 가능하다. 자료3 p.89에 'COMMIT 이전으로는 원복 불가'라고 명시되어 있다. SAVEPOINT가 COMMIT보다 이전에 설정되어 있어도 COMMIT 후에는 해당 SAVEPOINT로 ROLLBACK할 수 없다. (자료3 p.89)",
      terms: [
        "**SAVEPOINT 범위**: COMMIT 이전에 설정된 SAVEPOINT까지만 ROLLBACK 가능",
        "**COMMIT 이후**: 이미 확정된 변경으로 ROLLBACK 자체가 불가능",
        "**동일 이름 재선언**: 가장 나중에 정의한 SAVEPOINT가 유효"
      ],
      wrong: [
        "1. SAVEPOINT를 통한 부분 롤백 설명 그대로다. (자료3 p.89)",
        "2. SAVEPOINT 이름과 위치는 사용자가 자유롭게 설정 가능하다.",
        "3. (정답) SAVEPOINT는 COMMIT 이전에만 유효하다. COMMIT 이후 SAVEPOINT로는 ROLLBACK 불가.",
        "4. 동일 이름 SAVEPOINT 재선언 시 나중에 정의한 것이 유효하다. (자료3 p.89)"
      ],
      tip: "ROLLBACK TO = COMMIT **이전**에만 가능. COMMIT 후에는 SAVEPOINT가 있어도 되돌릴 수 없다."
    }
  },
  {
    id: 727,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL 실행 후 SELECT COUNT(*) FROM PLAYER의 결과로 옳은 것은? (초기 PLAYER 행 수: 480)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "INSERT INTO PLAYER\n  (PLAYER_ID, TEAM_ID, PLAYER_NAME, POSITION, HEIGHT, WEIGHT)\n  VALUES ('135', 'K02', '이운재', 'GK', 182, 82);\n\nSAVEPOINT SVPT_A;\n\nUPDATE PLAYER SET WEIGHT = 100;\n\nSAVEPOINT SVPT_B;\n\nDELETE FROM PLAYER;\n\nROLLBACK TO SVPT_B;"
      }
    ],
    choices: [
      "480",
      "481",
      "0",
      "1"
    ],
    ans: 2,
    src: "자료3 p.89",
    exp: {
      reason: "초기 480행에 이운재 INSERT로 481행. SVPT_A 설정. WEIGHT=100 UPDATE(481행 모두 수정). SVPT_B 설정. DELETE FROM PLAYER(0행). ROLLBACK TO SVPT_B로 DELETE 취소 → SVPT_B 시점(481행 + WEIGHT=100)으로 복원. 최종 행 수: 481. PostgreSQL 검증 완료. (자료3 p.89)",
      terms: [
        "**SVPT_B 설정 시점**: INSERT(완료) + UPDATE(완료) 후 = 481행, WEIGHT=100",
        "**DELETE 후 ROLLBACK TO SVPT_B**: DELETE 취소 → SVPT_B 시점으로 복원",
        "**INSERT는 유지**: ROLLBACK TO SVPT_B는 SVPT_B 이후 변경만 취소"
      ],
      wrong: [
        "1. 480 = ROLLBACK이 INSERT까지 취소한다고 착각한 경우. ROLLBACK TO SVPT_B는 DELETE만 취소.",
        "2. (정답) SVPT_B 이후의 DELETE만 취소되어 481행 복원.",
        "3. 0 = ROLLBACK 없이 DELETE가 최종 상태로 남는다고 착각한 경우.",
        "4. 1 = 마지막에 삽입한 행만 남는다고 착각한 경우."
      ],
      tip: "ROLLBACK TO savepoint는 **해당 SAVEPOINT 이후의 변경만 취소**. 그 이전 변경은 그대로 유지."
    }
  },
  {
    id: 728,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL 실행 후 PLAYER 테이블의 최종 상태로 옳은 것은? (초기 PLAYER 행 수: 480, 이운재의 WEIGHT 초기값: 82)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "INSERT INTO PLAYER\n  (PLAYER_ID, TEAM_ID, PLAYER_NAME, POSITION, HEIGHT, WEIGHT)\n  VALUES ('135', 'K02', '이운재', 'GK', 182, 82);\n\nSAVEPOINT SVPT_A;\n\nUPDATE PLAYER SET WEIGHT = 100;\n\nSAVEPOINT SVPT_B;\n\nDELETE FROM PLAYER;\n\nROLLBACK TO SVPT_A;"
      }
    ],
    choices: [
      "행 수: 0, 이운재 없음",
      "행 수: 481, 이운재 WEIGHT = 82",
      "행 수: 481, 이운재 WEIGHT = 100",
      "행 수: 480, 이운재 없음"
    ],
    ans: 2,
    src: "자료3 p.89",
    exp: {
      reason: "이운재 INSERT로 481행. SVPT_A 설정. WEIGHT=100 UPDATE. SVPT_B 설정. DELETE(0행). ROLLBACK TO SVPT_A로 SVPT_A 이후 변경(UPDATE + DELETE) 모두 취소 → SVPT_A 시점(이운재 INSERT 완료, WEIGHT=82인 481행)으로 복원. PostgreSQL 검증 완료. (자료3 p.89)",
      terms: [
        "**SVPT_A 시점**: 이운재 INSERT 완료 = 481행, WEIGHT 변경 전",
        "**ROLLBACK TO SVPT_A**: SVPT_A 이후 변경(UPDATE + DELETE) 모두 취소",
        "**복원 결과**: 481행, 이운재 WEIGHT = 82(원래 값)"
      ],
      wrong: [
        "1. ROLLBACK TO SVPT_A는 이운재 INSERT까지는 취소하지 않는다. SVPT_A는 INSERT 이후에 설정됨.",
        "2. (정답) SVPT_A 이후 UPDATE와 DELETE가 모두 취소되어 원래 WEIGHT=82 복원.",
        "3. 이운재의 WEIGHT는 SVPT_A 시점에 아직 100으로 변경되지 않았다.",
        "4. 480 = ROLLBACK이 이운재 INSERT까지 취소한다고 착각한 경우."
      ],
      tip: "ROLLBACK TO svpt는 그 SAVEPOINT 이후의 변경만 취소. **SAVEPOINT 이전 변경은 유지**."
    }
  },
  {
    id: 729,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL에서 SAVEPOINT SP1을 두 번 선언한 경우 ROLLBACK TO SP1의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[T 테이블 초기 상태]",
        headers: ["ID", "VAL"],
        rows: [["1", "10"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "UPDATE T SET VAL = 20 WHERE ID = 1;\nSAVEPOINT SP1;          -- 첫 번째 SP1\nUPDATE T SET VAL = 30 WHERE ID = 1;\nSAVEPOINT SP1;          -- 두 번째 SP1 (동일 이름)\nUPDATE T SET VAL = 40 WHERE ID = 1;\nROLLBACK TO SP1;"
      }
    ],
    choices: [
      "VAL = 10 (초기값으로 복원)",
      "VAL = 20 (첫 번째 SP1 시점으로 복원)",
      "VAL = 30 (두 번째 SP1 시점으로 복원)",
      "VAL = 40 (롤백 없이 최신값 유지)"
    ],
    ans: 3,
    src: "자료3 p.89",
    exp: {
      reason: "동일한 이름으로 SAVEPOINT를 재선언하면 나중에 정의한 SAVEPOINT가 유효하다. 따라서 ROLLBACK TO SP1은 두 번째 SP1(VAL=30인 시점) 기준으로 동작하여 그 이후의 UPDATE(VAL=40)만 취소된다. 최종 VAL = 30. (자료3 p.89)",
      terms: [
        "**동일 이름 재선언**: 두 번째 SP1이 첫 번째 SP1을 덮어씀",
        "**유효한 SP1**: VAL=30인 시점 (두 번째 선언 직후)",
        "**ROLLBACK TO SP1**: VAL=40 UPDATE 취소 → VAL=30 복원"
      ],
      wrong: [
        "1. VAL=10은 첫 번째 SP1 이전 시점이다. 두 번째 SP1이 유효하므로 여기까지 돌아가지 않는다.",
        "2. VAL=20은 첫 번째 SP1 시점이지만, 동일 이름 재선언으로 무효화되었다.",
        "3. (정답) 나중에 정의한 SP1(VAL=30)이 유효. 그 이후 VAL=40만 취소.",
        "4. ROLLBACK TO SP1이 실행되어 VAL=40은 취소된다."
      ],
      tip: "동일 이름 SAVEPOINT = **나중에 정의한 것이 유효**. 먼저 정의한 것은 무효화."
    }
  },
  {
    id: 730,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "중",
    has_code: true,
    q: "다음 Oracle SQL에서 ROLLBACK TO SVPT_A 실행 후 COMMIT을 수행하면 최종적으로 PLAYER에 남아 있는 행 수로 옳은 것은? (초기 480행)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "INSERT INTO PLAYER\n  (PLAYER_ID, TEAM_ID, PLAYER_NAME, POSITION, HEIGHT, WEIGHT)\n  VALUES ('135', 'K02', '이운재', 'GK', 182, 82);\n\nSAVEPOINT SVPT_A;\n\nUPDATE PLAYER SET WEIGHT = 100;\n\nSAVEPOINT SVPT_B;\n\nDELETE FROM PLAYER;\n\nROLLBACK TO SVPT_A;\n\nCOMMIT;"
      }
    ],
    choices: [
      "480",
      "481",
      "0",
      "479"
    ],
    ans: 2,
    src: "자료3 p.89",
    exp: {
      reason: "이운재 INSERT(481행) → SVPT_A → UPDATE(WEIGHT=100) → SVPT_B → DELETE(0행) → ROLLBACK TO SVPT_A(SVPT_A 이후 변경 취소 = DELETE+UPDATE 취소, 481행 복원) → COMMIT(현 상태 481행 영구 확정). 최종 행 수: 481. PostgreSQL 검증 완료. (자료3 p.89)",
      terms: [
        "**ROLLBACK TO SVPT_A**: UPDATE와 DELETE 취소. INSERT는 유지",
        "**COMMIT 후**: 현재 상태(481행)가 영구 반영됨",
        "**SAVEPOINT와 COMMIT 관계**: ROLLBACK TO로 돌아온 후 COMMIT 가능"
      ],
      wrong: [
        "1. 480 = ROLLBACK이 INSERT까지 취소한다고 착각. INSERT는 SVPT_A 이전 작업이므로 유지.",
        "2. (정답) INSERT(481행)가 COMMIT으로 영구 반영된다.",
        "3. 0 = DELETE가 최종 상태로 남는다고 착각한 경우.",
        "4. 479 = 잘못된 계산."
      ],
      tip: "ROLLBACK TO는 **해당 SAVEPOINT 이전 작업은 그대로**. 이후 COMMIT하면 그 상태로 영구 반영."
    }
  },

  // ============================================================
  // 토픽 152: DDL 실행 시 트랜잭션 처리 (Q731~Q735) - 5문항, has_code: true
  // ============================================================
  {
    id: 731,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL 실행 후 A 테이블의 VAL 컬럼 값으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[A 테이블 초기 상태]",
        headers: ["ID", "VAL"],
        rows: [["1", "10"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "UPDATE A SET VAL = 20 WHERE ID = 1;    -- DML\nCREATE TABLE B (ID CHAR(3) PRIMARY KEY); -- DDL: 자동 COMMIT 발생\nROLLBACK;"
      }
    ],
    choices: [
      "10 (ROLLBACK으로 원래 값 복원)",
      "20 (DDL 실행 시 자동 COMMIT되어 되돌릴 수 없음)",
      "NULL (DDL 실행 오류로 인한 롤백)",
      "30 (잘못된 값)"
    ],
    ans: 2,
    src: "자료3 p.89",
    exp: {
      reason: "Oracle에서 DDL 명령어(CREATE TABLE)가 실행되면 해당 DDL 이전에 수행된 모든 DML 작업이 자동으로 COMMIT된다. 따라서 UPDATE VAL=20은 DDL 실행 시 자동 COMMIT으로 영구 반영되고, 이후 ROLLBACK을 실행해도 이미 COMMIT된 변경이므로 취소되지 않는다. (자료3 p.89, T-13)",
      terms: [
        "**DDL 자동 COMMIT (Oracle)**: CREATE/ALTER/DROP 등 실행 시 이전 미COMMIT DML 모두 자동 COMMIT",
        "**ROLLBACK 범위**: 마지막 COMMIT 이후의 변경만 취소 가능",
        "**이 케이스**: DDL이 자동 COMMIT을 발생시켜 UPDATE가 영구 반영됨 → ROLLBACK 무효"
      ],
      wrong: [
        "1. (정답 아님) DDL 실행 시 UPDATE가 자동 COMMIT되어 ROLLBACK으로 되돌릴 수 없다.",
        "2. (정답) DDL 이전 DML 자동 COMMIT으로 VAL=20이 영구 반영된다.",
        "3. DDL 실행은 오류가 아니며 자동 COMMIT이 발생한다.",
        "4. 30은 이 코드에서 등장하지 않는 값이다."
      ],
      tip: "Oracle DDL 실행 = DDL 이전 미COMMIT DML 모두 **자동 COMMIT**. ROLLBACK 불가."
    }
  },
  {
    id: 732,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL 실행 결과에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[A 테이블 초기 상태]",
        headers: ["ID", "VAL"],
        rows: [["1", "10"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "UPDATE A SET VAL = 10;           -- DML, 트랜잭션 시작\nCREATE TABLE B (ID CHAR(3) PRIMARY KEY); -- DDL, 자동 COMMIT 발생\nINSERT INTO B VALUES ('1');      -- DML, 새로운 트랜잭션\nROLLBACK;"
      }
    ],
    choices: [
      "ROLLBACK으로 UPDATE와 INSERT가 모두 취소되어 A.VAL=10, B는 빈 테이블이다.",
      "DDL 실행 시 자동 COMMIT으로 UPDATE가 확정되고, ROLLBACK으로 INSERT만 취소된다.",
      "DDL 실행 후 새 트랜잭션이 시작되므로 INSERT도 자동 COMMIT된다.",
      "DDL은 트랜잭션에 영향을 주지 않아 ROLLBACK으로 전부 취소된다."
    ],
    ans: 2,
    src: "자료3 p.89",
    exp: {
      reason: "Oracle에서 DDL 실행 시 이전 미COMMIT DML(UPDATE)이 자동 COMMIT된다. DDL 이후 새 트랜잭션이 시작되고 INSERT가 수행된다. 이후 ROLLBACK은 새 트랜잭션의 INSERT만 취소한다. 결과: A.VAL=10(UPDATE가 COMMIT으로 확정됨, 하지만 값이 동일하여 10), B는 빈 테이블(INSERT 취소). (자료3 p.89)",
      terms: [
        "**DDL 자동 COMMIT**: CREATE TABLE 실행으로 UPDATE가 영구 반영",
        "**새 트랜잭션 시작**: DDL 이후 INSERT부터 새 트랜잭션",
        "**ROLLBACK 범위**: 새 트랜잭션의 INSERT만 취소"
      ],
      wrong: [
        "1. ROLLBACK은 DDL 이전의 UPDATE까지 취소하지 않는다. DDL이 자동 COMMIT을 발생시켰기 때문.",
        "2. (정답) DDL 자동 COMMIT → UPDATE 확정, ROLLBACK → INSERT만 취소.",
        "3. INSERT는 DML이므로 DDL 이후에도 자동 COMMIT 대상이 아니다. ROLLBACK 취소 가능.",
        "4. DDL은 자동 COMMIT을 발생시켜 트랜잭션 경계를 나눈다."
      ],
      tip: "DDL = 트랜잭션 분기점. 이전 DML 자동 COMMIT + **새 트랜잭션 시작**. (T-13)"
    }
  },
  {
    id: 733,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL 실행 후 각 테이블의 상태를 설명한 것으로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[ORDERS 테이블 초기 상태]",
        headers: ["ORDER_ID", "STATUS"],
        rows: [
          ["1001", "PENDING"],
          ["1002", "PENDING"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "UPDATE ORDERS SET STATUS = 'DONE' WHERE ORDER_ID = 1001;\nALTER TABLE ORDERS ADD REMARK VARCHAR2(100);\nUPDATE ORDERS SET STATUS = 'FAIL' WHERE ORDER_ID = 1002;\nROLLBACK;"
      }
    ],
    choices: [
      "ORDER_ID=1001의 STATUS='PENDING', ORDER_ID=1002의 STATUS='PENDING', REMARK 컬럼 없음",
      "ORDER_ID=1001의 STATUS='DONE', ORDER_ID=1002의 STATUS='PENDING', REMARK 컬럼 있음",
      "ORDER_ID=1001의 STATUS='DONE', ORDER_ID=1002의 STATUS='FAIL', REMARK 컬럼 있음",
      "ORDER_ID=1001의 STATUS='PENDING', ORDER_ID=1002의 STATUS='FAIL', REMARK 컬럼 있음"
    ],
    ans: 2,
    src: "자료3 p.89",
    exp: {
      reason: "ALTER TABLE(DDL) 실행 시 이전 미COMMIT DML(ORDER_ID=1001 STATUS='DONE' UPDATE)이 자동 COMMIT된다. REMARK 컬럼 추가도 DDL로 자동 COMMIT. DDL 이후 새 트랜잭션이 시작되고 ORDER_ID=1002 UPDATE가 수행된다. ROLLBACK으로 새 트랜잭션의 ORDER_ID=1002 UPDATE만 취소된다. 최종: 1001='DONE'(COMMIT), 1002='PENDING'(ROLLBACK), REMARK 컬럼 있음(DDL COMMIT). (자료3 p.89)",
      terms: [
        "**ALTER TABLE 자동 COMMIT**: 이전 UPDATE(1001='DONE')가 함께 영구 반영",
        "**새 트랜잭션**: ALTER 이후 1002 UPDATE는 새 트랜잭션",
        "**ROLLBACK**: 새 트랜잭션의 1002 UPDATE만 취소"
      ],
      wrong: [
        "1. 1001='PENDING'은 ALTER TABLE 전 UPDATE가 취소된다는 의미. DDL 자동 COMMIT으로 취소 불가.",
        "2. (정답) DDL 자동 COMMIT(1001='DONE' 확정, REMARK 추가), ROLLBACK(1002 취소).",
        "3. 1002='FAIL'은 ROLLBACK이 적용되지 않는다는 의미. ROLLBACK으로 취소됨.",
        "4. 1001='PENDING'은 잘못된 결과. DDL 자동 COMMIT으로 1001='DONE' 확정."
      ],
      tip: "DDL(ALTER TABLE 등) 앞에 있던 미COMMIT DML은 **전부 함께 자동 COMMIT**."
    }
  },
  {
    id: 734,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "상",
    has_code: false,
    q: "다음 중 Oracle에서 DDL 실행 시 트랜잭션 처리에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "DDL 명령어(CREATE, ALTER, DROP 등)가 실행되면 해당 DDL 이전에 수행된 모든 DML 작업이 자동으로 COMMIT된다.",
      "DDL 실행 후에는 새로운 트랜잭션이 시작된다.",
      "DDL 이전의 미COMMIT DML은 SAVEPOINT를 통해 보호할 수 있으므로 DDL 실행 후에도 ROLLBACK이 가능하다.",
      "DDL 실행으로 인한 자동 COMMIT은 사용자가 명시적으로 COMMIT을 실행하지 않아도 발생한다."
    ],
    ans: 3,
    src: "자료3 p.89",
    exp: {
      reason: "SAVEPOINT는 트랜잭션 내에서만 유효하다. DDL 실행 시 자동 COMMIT이 발생하면 이전에 설정된 SAVEPOINT도 함께 소멸한다. DDL 이전의 DML은 자동 COMMIT으로 영구 반영되어 어떤 방법으로도 ROLLBACK이 불가능하다. (자료3 p.89, T-13)",
      terms: [
        "**DDL 자동 COMMIT**: DDL 이전 DML + SAVEPOINT 모두 소멸",
        "**SAVEPOINT 유효 범위**: 동일 트랜잭션 내에서만 유효. COMMIT 후 소멸",
        "**T-13 핵심**: DDL 이전 미COMMIT DML은 ROLLBACK 불가"
      ],
      wrong: [
        "1. 자료3 p.89의 DDL 자동 COMMIT 설명 그대로다.",
        "2. 자료3 p.89에 '새로운 트랜잭션이 시작'으로 명시된 내용이다.",
        "3. (정답) SAVEPOINT는 COMMIT 후 무효화된다. DDL 자동 COMMIT 후 ROLLBACK 불가.",
        "4. 자동 COMMIT은 명시적 COMMIT과 동일한 효과를 가진다."
      ],
      tip: "DDL 후에는 SAVEPOINT도 함께 소멸. DDL 이전 DML은 **어떤 방법으로도** 되돌릴 수 없다."
    }
  },
  {
    id: 735,
    subj: 2,
    topic: "2-P",
    topic_name: "TCL",
    diff: "상",
    has_code: true,
    q: "다음 Oracle SQL 실행 후 최종 상태에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[EMP 테이블 초기 상태]",
        headers: ["EMP_ID", "SALARY"],
        rows: [
          ["E01", "3000"],
          ["E02", "4000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "UPDATE EMP SET SALARY = 5000 WHERE EMP_ID = 'E01';\nSAVEPOINT SP1;\nUPDATE EMP SET SALARY = 6000 WHERE EMP_ID = 'E02';\nDROP TABLE EMP_BACKUP;   -- DDL: 자동 COMMIT 발생\nROLLBACK;"
      }
    ],
    choices: [
      "E01.SALARY=3000, E02.SALARY=4000 (모두 초기값)",
      "E01.SALARY=5000, E02.SALARY=4000 (E01만 변경, E02 ROLLBACK)",
      "E01.SALARY=5000, E02.SALARY=6000 (모두 변경, ROLLBACK 무효)",
      "E01.SALARY=3000, E02.SALARY=6000 (SAVEPOINT 기준 복원)"
    ],
    ans: 3,
    src: "자료3 p.89",
    exp: {
      reason: "E01 SALARY=5000 UPDATE 후 SP1 설정. E02 SALARY=6000 UPDATE. DROP TABLE(DDL) 실행 시 이전 미COMMIT DML 모두 자동 COMMIT(E01=5000, E02=6000 영구 반영). ROLLBACK은 마지막 COMMIT(DDL 자동 COMMIT) 이후의 변경에만 적용되는데, DDL 이후 추가 DML이 없으므로 ROLLBACK은 사실상 아무 효과가 없다. 최종: E01=5000, E02=6000. SAVEPOINT SP1도 DDL 자동 COMMIT으로 소멸. (자료3 p.89, T-13)",
      terms: [
        "**DROP TABLE(DDL) 자동 COMMIT**: E01=5000, E02=6000 두 UPDATE 모두 자동 COMMIT",
        "**SAVEPOINT 소멸**: DDL 자동 COMMIT으로 SP1도 무효화",
        "**ROLLBACK**: DDL 이후 DML이 없으므로 사실상 취소할 내용 없음"
      ],
      wrong: [
        "1. E01=3000, E02=4000 = DDL 자동 COMMIT을 모르고 ROLLBACK이 전부 취소한다고 착각한 경우.",
        "2. E01=5000, E02=4000 = DDL이 SP1 기준 ROLLBACK을 한다고 착각한 경우. DDL은 자동 COMMIT을 유발한다.",
        "3. (정답) DDL 자동 COMMIT으로 두 UPDATE 모두 영구 반영. ROLLBACK 취소 대상 없음.",
        "4. E01=3000, E02=6000 = SAVEPOINT 기준으로 복원한다고 착각. DDL로 SP1이 무효화됨."
      ],
      tip: "DDL이 트랜잭션 중간에 있으면 **이전 DML 전부 자동 COMMIT**. SAVEPOINT도 소멸. (T-13 핵심)"
    }
  }
];

module.exports = p2Part1;

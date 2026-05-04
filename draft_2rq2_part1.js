// 2-R FK 참조 무결성 (Q761~Q770) + 2-Q-2 뷰/시퀀스/시노님 (Q771~Q780)
// 자료3 p.97~101, 자료4 p.5 기반.
// PostgreSQL 14 sqld_verify DB 검증:
//   - CASCADE/SET NULL/RESTRICT DELETE ACTION: 직접 검증 완료
//   - FK 참조 무결성 위반(INSERT/자식 있는 부모 삭제): 직접 검증 완료
//   - VIEW CREATE OR REPLACE / DROP: 직접 검증 완료
//   - SEQUENCE INCREMENT BY / MAXVALUE / CYCLE: 직접 검증 완료
// INSERT ACTION(AUTOMATIC/SET NULL/DEPENDENT): 자료4 p.5 인용 (24년 개정 신규, PostgreSQL 미지원)
// SYNONYM: 자료3 p.101 인용 (PostgreSQL 동등 기능 없음)

const rq22Part1 = [

  // ============================================================
  // 토픽 160: FK 특성 및 제약 (Q761~Q764) — 4문항, has_code: true
  // ============================================================
  {
    id: 761,
    subj: 2,
    topic: "2-R",
    topic_name: "FK 참조 무결성",
    diff: "중",
    has_code: true,
    q: "다음 SQL에서 밑줄 친 부분의 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE 주문 (\n  주문번호  NUMBER       PRIMARY KEY,\n  고객번호  VARCHAR2(10) NOT NULL,\n  상품번호  VARCHAR2(10),\n  주문수량  NUMBER,\n  CONSTRAINT fk_고객 FOREIGN KEY (고객번호)\n    REFERENCES 고객(고객번호)\n);"
      }
    ],
    choices: [
      "FOREIGN KEY (고객번호)는 자식 테이블인 주문 테이블에 FK를 정의한 것이다.",
      "REFERENCES 고객(고객번호)에서 고객번호는 고객 테이블의 PK이거나 UNIQUE 제약이 걸린 컬럼이어야 한다.",
      "고객 테이블에 존재하지 않는 고객번호 값을 주문 테이블에 INSERT하면 참조 무결성 위반 오류가 발생한다.",
      "FK는 반드시 부모 테이블에 정의해야 하며 자식 테이블에서 REFERENCES로 참조한다."
    ],
    ans: 4,
    src: "자료3 p.97~98",
    exp: {
      reason: "FK(외래 키)는 자식 테이블에 정의한다. 'FOREIGN KEY (컬럼명) REFERENCES 부모테이블(컬럼명)' 구문이 자식 테이블의 CREATE TABLE 또는 ALTER TABLE 문에 작성된다. 부모 테이블에 FK를 정의하는 것이 아니다. (자료3 p.97~98) PostgreSQL 검증 완료.",
      terms: [
        "**FK 위치**: FK 제약은 자식 테이블(참조하는 쪽)에 정의",
        "**참조 대상**: 부모 테이블의 PK 또는 UNIQUE 컬럼이어야 함 (자료3 p.97)",
        "**참조 무결성**: 자식 행의 FK 값은 부모에 실제 존재하거나 NULL이어야 함",
        "**CONSTRAINT 이름**: 제약 이름을 명시적으로 부여하면 ALTER TABLE DROP CONSTRAINT로 개별 삭제 가능"
      ],
      wrong: [
        "1. FOREIGN KEY (고객번호)는 자식 테이블인 주문에 정의된 것이 맞다.",
        "2. REFERENCES 대상 컬럼은 PK 또는 UNIQUE여야 한다는 것이 맞다. (자료3 p.97)",
        "3. 부모에 없는 값 INSERT 시 FK 위반 오류 발생이 맞다. PostgreSQL 검증 완료.",
        "4. (정답) FK는 자식 테이블에 정의한다. 부모 테이블에 정의하는 것이 아니다."
      ],
      tip: "FK = 자식 테이블에 FOREIGN KEY 정의, 부모 테이블의 PK/UNIQUE를 REFERENCES."
    }
  },

  {
    id: 762,
    subj: 2,
    topic: "2-R",
    topic_name: "FK 참조 무결성",
    diff: "중",
    has_code: true,
    q: "다음 DDL을 실행한 후 DML을 수행할 때 결과가 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: "[DDL]",
        lang: "sql",
        content: "CREATE TABLE 부서 (\n  부서코드 CHAR(3) PRIMARY KEY,\n  부서명   VARCHAR2(20)\n);\nCREATE TABLE 사원 (\n  사원번호 NUMBER PRIMARY KEY,\n  사원명   VARCHAR2(30),\n  부서코드 CHAR(3),\n  CONSTRAINT fk_부서 FOREIGN KEY (부서코드)\n    REFERENCES 부서(부서코드)\n);"
      }
    ],
    choices: [
      "INSERT INTO 부서 VALUES ('D01', '영업부'); — 성공",
      "INSERT INTO 사원 VALUES (1, '홍길동', 'D01'); — D01이 부서 테이블에 있으므로 성공",
      "INSERT INTO 사원 VALUES (2, '김철수', NULL); — FK가 NULL이어도 참조 무결성 위반이 아니므로 성공",
      "INSERT INTO 사원 VALUES (3, '이영희', 'D99'); — D99가 부서 테이블에 없어도 성공"
    ],
    ans: 4,
    src: "자료3 p.97~98",
    exp: {
      reason: "FK 컬럼에 부모 테이블에 존재하지 않는 값을 INSERT하면 참조 무결성 위반 오류가 발생한다. 'D99'가 부서 테이블에 없으므로 사원 INSERT는 실패한다. 반면 FK 값이 NULL인 경우는 참조 무결성 제약 대상에서 제외되어 허용된다. (자료3 p.97~98) PostgreSQL 검증 완료.",
      terms: [
        "**FK NULL 허용**: FK 컬럼이 NULL이면 참조 무결성 위반이 아님. 즉 NOT NULL + FK가 아닌 한 NULL 입력 가능",
        "**존재하지 않는 값**: 부모에 없는 FK 값 INSERT 시 오류",
        "**참조 무결성**: 자식 FK 값은 부모 PK/UNIQUE에 실제 존재하거나 NULL이어야 함"
      ],
      wrong: [
        "1. 부서 테이블 INSERT는 FK 제약과 무관하게 성공한다.",
        "2. D01이 부서 테이블에 존재하므로 참조 무결성을 만족해 성공한다.",
        "3. FK 컬럼 NULL은 참조 무결성 위반이 아니므로 성공한다. (자료3 p.98)",
        "4. (정답) D99가 부서 테이블에 없으므로 FK 위반으로 실패한다. PostgreSQL 검증 완료."
      ],
      tip: "FK NULL은 허용. 하지만 NULL이 아닌 값이라면 반드시 부모에 존재해야 한다."
    }
  },

  {
    id: 763,
    subj: 2,
    topic: "2-R",
    topic_name: "FK 참조 무결성",
    diff: "상",
    has_code: true,
    q: "다음 SQL 실행 시 오류가 발생하는 것은?",
    blocks: [
      {
        type: "table",
        title: "[부서 테이블]",
        headers: ["부서코드(PK)", "부서명"],
        rows: [["D01", "영업부"], ["D02", "개발부"]]
      },
      {
        type: "table",
        title: "[사원 테이블] — FK: 부서코드 → 부서(부서코드)",
        headers: ["사원번호(PK)", "사원명", "부서코드(FK)"],
        rows: [["1", "홍길동", "D01"], ["2", "이영희", "D02"]]
      }
    ],
    choices: [
      "INSERT INTO 부서 VALUES ('D03', '인사부');",
      "UPDATE 사원 SET 부서코드 = 'D02' WHERE 사원번호 = 1;",
      "DELETE FROM 사원 WHERE 사원번호 = 1;",
      "DELETE FROM 부서 WHERE 부서코드 = 'D01';"
    ],
    ans: 4,
    src: "자료3 p.97~99",
    exp: {
      reason: "사원 테이블에 부서코드 'D01'을 참조하는 자식 행(홍길동)이 존재하는 상태에서 부서 테이블의 D01 행을 삭제하려 하면, 기본 DELETE ACTION인 RESTRICT(또는 NO ACTION)에 의해 오류가 발생한다. 자식 테이블이 부모 행을 참조 중이면 부모 삭제가 차단된다. (자료3 p.98~99) PostgreSQL 검증 완료.",
      terms: [
        "**기본 DELETE ACTION**: 별도 지정 없으면 RESTRICT(NO ACTION) 적용 — 자식 있는 부모 삭제 불가",
        "**자식 삭제는 자유**: 자식 행 삭제는 부모에 영향 없으므로 항상 가능",
        "**부모 행 삭제 조건**: 해당 행을 참조하는 자식 행이 없어야 삭제 가능"
      ],
      wrong: [
        "1. 부서 테이블에 새 행 추가는 FK 제약과 무관하게 성공한다.",
        "2. D02는 부서 테이블에 존재하므로 UPDATE 성공한다.",
        "3. 자식 행 삭제는 참조 무결성에 영향 없으므로 성공한다.",
        "4. (정답) D01을 참조하는 자식(홍길동)이 있으므로 RESTRICT에 의해 삭제 오류 발생. PostgreSQL 검증 완료."
      ],
      tip: "자식이 참조 중인 부모 행은 기본적으로 삭제 불가. CASCADE/SET NULL 지정 시에만 허용."
    }
  },

  {
    id: 764,
    subj: 2,
    topic: "2-R",
    topic_name: "FK 참조 무결성",
    diff: "상",
    has_code: true,
    q: "다음 테이블 정의와 데이터를 보고, UPDATE 수행 결과가 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE 카테고리 (\n  cat_id   NUMBER PRIMARY KEY,\n  cat_name VARCHAR2(30)\n);\nCREATE TABLE 상품 (\n  prod_id  NUMBER PRIMARY KEY,\n  prod_name VARCHAR2(50),\n  cat_id   NUMBER,\n  CONSTRAINT fk_cat FOREIGN KEY (cat_id)\n    REFERENCES 카테고리(cat_id)\n);"
      },
      {
        type: "table",
        title: "[카테고리 데이터]",
        headers: ["cat_id(PK)", "cat_name"],
        rows: [["1", "전자제품"], ["2", "의류"]]
      },
      {
        type: "table",
        title: "[상품 데이터]",
        headers: ["prod_id(PK)", "prod_name", "cat_id(FK)"],
        rows: [["10", "노트북", "1"], ["11", "셔츠", "2"]]
      }
    ],
    choices: [
      "UPDATE 상품 SET cat_id = 2 WHERE prod_id = 10; — 성공 (cat_id=2가 카테고리에 존재)",
      "UPDATE 상품 SET cat_id = NULL WHERE prod_id = 10; — 성공 (FK NULL 허용)",
      "UPDATE 상품 SET cat_id = 99 WHERE prod_id = 10; — 실패 (cat_id=99가 카테고리에 없음)",
      "UPDATE 카테고리 SET cat_id = 99 WHERE cat_id = 1; — 성공 (상품 테이블과 무관)"
    ],
    ans: 4,
    src: "자료3 p.97~98",
    exp: {
      reason: "카테고리 테이블의 cat_id=1을 99로 UPDATE하려 할 때, 상품 테이블에서 cat_id=1을 참조하는 행(노트북)이 존재한다. 기본 FK ACTION(RESTRICT/NO ACTION)에 의해 참조되는 부모의 PK 값 변경도 차단된다. 따라서 이 UPDATE는 성공하지 않고 오류가 발생한다. (자료3 p.97~98)",
      terms: [
        "**부모 PK 변경 차단**: 자식이 참조 중인 부모 PK 값 변경도 FK 위반으로 차단",
        "**자식 FK 변경**: 존재하는 부모 PK 값으로만 변경 가능",
        "**FK NULL 업데이트**: NOT NULL 제약이 없으면 FK를 NULL로 업데이트 가능"
      ],
      wrong: [
        "1. cat_id=2가 카테고리에 존재하므로 UPDATE 성공한다.",
        "2. FK 컬럼을 NULL로 업데이트하는 것은 참조 무결성 위반이 아니므로 성공한다.",
        "3. cat_id=99가 카테고리에 없으므로 FK 위반으로 실패가 맞다.",
        "4. (정답) cat_id=1을 참조하는 자식이 있으므로 부모 PK 변경도 RESTRICT에 의해 실패한다."
      ],
      tip: "FK 보호는 INSERT/DELETE뿐 아니라 부모 PK UPDATE에도 적용된다."
    }
  },

  // ============================================================
  // 토픽 161: DELETE ACTION (Q765~Q768) — 4문항, has_code: true
  // ============================================================
  {
    id: 765,
    subj: 2,
    topic: "2-R",
    topic_name: "FK 참조 무결성",
    diff: "중",
    has_code: true,
    q: "다음 테이블 정의와 데이터에서 'DELETE FROM 부서 WHERE 부서코드 = 10;'을 실행한 결과로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE 부서 (\n  부서코드 NUMBER PRIMARY KEY,\n  부서명   VARCHAR2(20)\n);\nCREATE TABLE 사원 (\n  사원번호 NUMBER PRIMARY KEY,\n  사원명   VARCHAR2(30),\n  부서코드 NUMBER,\n  CONSTRAINT fk_dept FOREIGN KEY (부서코드)\n    REFERENCES 부서(부서코드) ON DELETE CASCADE\n);"
      },
      {
        type: "table",
        title: "[부서]",
        headers: ["부서코드", "부서명"],
        rows: [["10", "영업부"], ["20", "개발부"]]
      },
      {
        type: "table",
        title: "[사원]",
        headers: ["사원번호", "사원명", "부서코드"],
        rows: [["1", "홍길동", "10"], ["2", "김철수", "10"], ["3", "이영희", "20"]]
      }
    ],
    choices: [
      "부서코드=10인 부서 행이 삭제되고, 사원 테이블에서 부서코드=10인 행의 부서코드가 NULL로 변경된다.",
      "부서코드=10인 부서 행이 삭제되고, 사원 테이블에서 부서코드=10인 홍길동과 김철수 행도 함께 삭제된다.",
      "사원 테이블에 부서코드=10을 참조하는 행이 있으므로 DELETE가 거부된다.",
      "부서코드=10인 부서 행이 삭제되고, 사원 테이블의 모든 행이 삭제된다."
    ],
    ans: 2,
    src: "자료3 p.98~99, 자료4 p.5",
    exp: {
      reason: "ON DELETE CASCADE는 부모 행이 삭제될 때 해당 부모를 참조하는 모든 자식 행도 함께 삭제하는 동작이다. 부서코드=10을 참조하는 홍길동(1)과 김철수(2)가 자동으로 삭제되고, 개발부(20)를 참조하는 이영희(3)는 그대로 유지된다. (자료3 p.98~99) PostgreSQL 검증 완료.",
      terms: [
        "**CASCADE**: 부모 삭제 시 자식도 함께 삭제. 참조하는 자식 행만 삭제됨",
        "**적용 범위**: 삭제된 부모 행을 참조하는 자식 행만 삭제. 다른 부모를 참조하는 자식은 유지",
        "**SET NULL과 차이**: SET NULL은 자식 FK를 NULL로 변경, CASCADE는 자식 행 자체를 삭제"
      ],
      wrong: [
        "1. FK를 NULL로 변경하는 것은 SET NULL 동작이다. CASCADE는 자식 행을 삭제한다.",
        "2. (정답) CASCADE: 부서코드=10 참조 자식(홍길동, 김철수)이 함께 삭제된다. PostgreSQL 검증 완료.",
        "3. 삭제를 거부하는 것은 RESTRICT/NO ACTION 동작이다.",
        "4. CASCADE는 삭제된 부모를 참조하는 자식 행만 삭제한다. 개발부를 참조하는 이영희는 유지된다."
      ],
      tip: "CASCADE = 부모 삭제 → 그 부모를 참조하는 자식만 연쇄 삭제."
    }
  },

  {
    id: 766,
    subj: 2,
    topic: "2-R",
    topic_name: "FK 참조 무결성",
    diff: "중",
    has_code: true,
    q: "다음 테이블에서 'DELETE FROM 부서 WHERE 부서코드 = 10;'을 실행한 후 사원 테이블의 상태로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE 부서 (\n  부서코드 NUMBER PRIMARY KEY,\n  부서명   VARCHAR2(20)\n);\nCREATE TABLE 사원 (\n  사원번호 NUMBER PRIMARY KEY,\n  사원명   VARCHAR2(30),\n  부서코드 NUMBER,\n  CONSTRAINT fk_dept FOREIGN KEY (부서코드)\n    REFERENCES 부서(부서코드) ON DELETE SET NULL\n);"
      },
      {
        type: "table",
        title: "[사원 (DELETE 전)]",
        headers: ["사원번호", "사원명", "부서코드"],
        rows: [["1", "홍길동", "10"], ["2", "김철수", "10"], ["3", "이영희", "20"]]
      }
    ],
    choices: [
      "사원번호 1, 2, 3 행 모두 삭제된다.",
      "사원번호 1, 2 행이 삭제되고 사원번호 3 행만 남는다.",
      "사원번호 1, 2 행의 부서코드가 NULL로 변경되고, 사원번호 3 행의 부서코드는 20 그대로 유지된다.",
      "부서코드=10을 참조하는 행이 있으므로 DELETE가 거부된다."
    ],
    ans: 3,
    src: "자료3 p.98~99, 자료4 p.5",
    exp: {
      reason: "ON DELETE SET NULL은 부모 행이 삭제될 때 해당 부모를 참조하는 자식 행의 FK 컬럼을 NULL로 변경한다. 행 자체는 삭제되지 않는다. 부서코드=10을 참조하는 홍길동(1), 김철수(2)의 부서코드가 NULL이 되고, 이영희(3)는 다른 부모(20)를 참조하므로 변화 없다. (자료3 p.98~99) PostgreSQL 검증 완료.",
      terms: [
        "**SET NULL**: 부모 삭제 시 자식 FK를 NULL로 변경. 자식 행 자체는 유지",
        "**적용 조건**: FK 컬럼에 NOT NULL 제약이 없어야 SET NULL 적용 가능",
        "**CASCADE와 차이**: CASCADE는 자식 행 삭제, SET NULL은 FK 컬럼만 NULL로"
      ],
      wrong: [
        "1. SET NULL은 자식 행을 삭제하지 않는다. CASCADE에 해당하는 설명이다.",
        "2. SET NULL은 행을 삭제하지 않고 FK 값을 NULL로 변경한다.",
        "3. (정답) 부서코드=10 참조 자식의 FK가 NULL로 변경되고 행은 유지된다. PostgreSQL 검증 완료.",
        "4. 거부하는 것은 RESTRICT/NO ACTION 동작이다."
      ],
      tip: "SET NULL = 부모 삭제 → 자식 FK NULL로 변경, 자식 행은 남음."
    }
  },

  {
    id: 767,
    subj: 2,
    topic: "2-R",
    topic_name: "FK 참조 무결성",
    diff: "하",
    has_code: true,
    q: "다음 중 DELETE ACTION 5종의 설명과 키워드의 연결이 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: "[FK DELETE ACTION 문법]",
        lang: "sql",
        content: "FOREIGN KEY (컬럼명)\n  REFERENCES 부모테이블(컬럼명)\n  ON DELETE { CASCADE | SET NULL | SET DEFAULT | RESTRICT | NO ACTION }"
      }
    ],
    choices: [
      "CASCADE — 부모 행 삭제 시 해당 부모를 참조하는 자식 행도 함께 삭제",
      "SET NULL — 부모 행 삭제 시 자식 FK 컬럼 값을 NULL로 변경",
      "RESTRICT — 자식 행이 존재하면 부모 행 삭제를 즉시 차단",
      "NO ACTION — 부모 행 삭제 시 자식 행이 존재하더라도 삭제가 항상 허용됨"
    ],
    ans: 4,
    src: "자료3 p.98~99, 자료4 p.5",
    exp: {
      reason: "NO ACTION은 자식 행이 존재할 경우 부모 삭제를 허용하지 않는다는 점에서 RESTRICT와 유사하다. 차이점은 RESTRICT가 즉시 오류를 발생시키는 반면, NO ACTION은 트랜잭션 끝(커밋 시점)까지 검사를 지연할 수 있다는 것이다. '삭제가 항상 허용된다'는 설명은 틀렸다. (자료3 p.99, 자료4 p.5)",
      terms: [
        "**CASCADE**: 부모 삭제 → 자식도 삭제",
        "**SET NULL**: 부모 삭제 → 자식 FK NULL",
        "**SET DEFAULT**: 부모 삭제 → 자식 FK 기본값",
        "**RESTRICT**: 자식 있으면 즉시 오류. 부모 삭제 차단",
        "**NO ACTION**: RESTRICT와 유사하나 트랜잭션 끝까지 검사 지연 가능"
      ],
      wrong: [
        "1. CASCADE 설명이 맞다. (자료3 p.98~99) PostgreSQL 검증 완료.",
        "2. SET NULL 설명이 맞다. (자료3 p.99) PostgreSQL 검증 완료.",
        "3. RESTRICT는 자식 있으면 즉시 차단이 맞다. (자료3 p.99) PostgreSQL 검증 완료.",
        "4. (정답) NO ACTION은 삭제를 허용하는 것이 아니다. 자식 있으면 트랜잭션 끝에서 오류 발생."
      ],
      tip: "NO ACTION ≠ 삭제 허용. RESTRICT와 같이 차단하되, 검사 시점만 트랜잭션 끝으로 미룸."
    }
  },

  {
    id: 768,
    subj: 2,
    topic: "2-R",
    topic_name: "FK 참조 무결성",
    diff: "상",
    has_code: true,
    q: "다음 DDL에서 DELETE ACTION이 SET DEFAULT일 때 'DELETE FROM 등급 WHERE 등급코드 = 'G';'를 실행한 결과로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE 등급 (\n  등급코드 CHAR(1) PRIMARY KEY,\n  등급명   VARCHAR2(20)\n);\nCREATE TABLE 회원 (\n  회원번호 NUMBER PRIMARY KEY,\n  회원명   VARCHAR2(30),\n  등급코드 CHAR(1) DEFAULT 'N',\n  CONSTRAINT fk_grade FOREIGN KEY (등급코드)\n    REFERENCES 등급(등급코드) ON DELETE SET DEFAULT\n);"
      },
      {
        type: "table",
        title: "[등급 데이터]",
        headers: ["등급코드", "등급명"],
        rows: [["G", "골드"], ["N", "일반"]]
      },
      {
        type: "table",
        title: "[회원 데이터]",
        headers: ["회원번호", "회원명", "등급코드"],
        rows: [["1", "홍길동", "G"], ["2", "김철수", "G"], ["3", "이영희", "N"]]
      }
    ],
    choices: [
      "등급코드 'G'를 참조하는 회원 행 1, 2가 삭제된다.",
      "등급코드 'G'를 참조하는 회원 행 1, 2의 등급코드가 NULL로 변경된다.",
      "등급코드 'G'를 참조하는 회원 행 1, 2의 등급코드가 DEFAULT 값인 'N'으로 변경된다.",
      "등급코드 'G'를 참조하는 자식 행이 있으므로 DELETE가 거부된다."
    ],
    ans: 3,
    src: "자료3 p.99, 자료4 p.5",
    exp: {
      reason: "ON DELETE SET DEFAULT는 부모 행이 삭제될 때 해당 부모를 참조하는 자식 FK 컬럼을 해당 컬럼에 정의된 DEFAULT 값으로 변경한다. 등급코드 컬럼의 DEFAULT는 'N'이므로 등급코드 'G'를 참조하던 홍길동(1), 김철수(2)의 등급코드가 'N'으로 변경된다. (자료3 p.99, 자료4 p.5)",
      terms: [
        "**SET DEFAULT**: 부모 삭제 시 자식 FK = 해당 컬럼의 DEFAULT 값",
        "**DEFAULT 조건**: SET DEFAULT 사용 시 DEFAULT 값이 부모 테이블에 존재해야 참조 무결성 유지",
        "**SET NULL과 차이**: SET NULL은 NULL로, SET DEFAULT는 컬럼 기본값으로"
      ],
      wrong: [
        "1. 행을 삭제하는 것은 CASCADE 동작이다.",
        "2. NULL로 변경하는 것은 SET NULL 동작이다.",
        "3. (정답) SET DEFAULT는 DEFAULT 값인 'N'으로 변경한다. (자료3 p.99, 자료4 p.5)",
        "4. 거부하는 것은 RESTRICT/NO ACTION 동작이다."
      ],
      tip: "SET DEFAULT = 부모 삭제 → 자식 FK를 컬럼의 DEFAULT 값으로 변경."
    }
  },

  // ============================================================
  // 토픽 162: INSERT ACTION (Q769~Q770) — 2문항, has_code: false
  // ============================================================
  {
    id: 769,
    subj: 2,
    topic: "2-R",
    topic_name: "FK 참조 무결성",
    diff: "상",
    has_code: false,
    q: "다음 중 2024년 SQLD 개정에서 추가된 INSERT ACTION에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "AUTOMATIC은 자식 테이블에 INSERT 시 부모 행이 없으면 부모 행을 자동으로 생성한다.",
      "DEPENDENT는 부모 행이 존재할 때만 자식 INSERT를 허용하며, 부모 없으면 오류가 발생한다.",
      "SET NULL은 자식 INSERT 시 참조할 부모가 없으면 자식의 FK 컬럼을 NULL로 저장한다.",
      "AUTOMATIC 동작은 DELETE ACTION의 CASCADE와 동일한 방식으로 작동한다."
    ],
    ans: 4,
    src: "자료4 p.5",
    exp: {
      reason: "AUTOMATIC(INSERT ACTION)은 자식 INSERT 시 부모 행이 없으면 부모 행을 자동 생성하는 동작이다. DELETE ACTION의 CASCADE는 부모 삭제 시 자식도 삭제하는 전혀 다른 동작이다. AUTOMATIC은 INSERT 방향의 무결성 처리이고 CASCADE는 DELETE 방향이다. (자료4 p.5)",
      terms: [
        "**INSERT ACTION (24년 개정)**: AUTOMATIC, SET NULL, DEPENDENT 3종",
        "**AUTOMATIC**: 자식 INSERT 시 부모 없으면 부모 자동 생성 (Master 자동 생성)",
        "**DEPENDENT**: 부모 있을 때만 자식 INSERT 허용 — DELETE ACTION RESTRICT와 방향 반대",
        "**SET NULL (INSERT)**: 자식 INSERT 시 부모 없으면 자식 FK를 NULL로 저장"
      ],
      wrong: [
        "1. AUTOMATIC 설명이 맞다. 부모 없으면 부모를 자동 생성한다. (자료4 p.5)",
        "2. DEPENDENT 설명이 맞다. 부모 존재 시에만 자식 INSERT 허용. (자료4 p.5)",
        "3. INSERT ACTION SET NULL 설명이 맞다. (자료4 p.5)",
        "4. (정답) AUTOMATIC은 INSERT 시 부모 자동 생성이고, CASCADE는 DELETE 시 자식 삭제다. 전혀 다른 동작이다."
      ],
      tip: "INSERT ACTION 3종: AUTOMATIC(부모 자동 생성), DEPENDENT(부모 있을 때만 허용), SET NULL(FK NULL 저장)."
    }
  },

  {
    id: 770,
    subj: 2,
    topic: "2-R",
    topic_name: "FK 참조 무결성",
    diff: "상",
    has_code: false,
    q: "다음 중 DELETE ACTION과 INSERT ACTION의 비교로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "DELETE ACTION의 RESTRICT는 자식 행이 존재하면 부모 삭제를 차단하고, INSERT ACTION의 DEPENDENT는 부모 행이 없으면 자식 INSERT를 차단한다.",
      "DELETE ACTION의 CASCADE는 부모 삭제 시 자식도 삭제하고, INSERT ACTION의 AUTOMATIC은 자식 INSERT 시 부모도 자동 생성한다.",
      "DELETE ACTION의 SET NULL은 부모 삭제 시 자식 FK를 NULL로 변경하고, INSERT ACTION의 SET NULL은 자식 INSERT 시 부모 없으면 FK를 NULL로 저장한다.",
      "DELETE ACTION과 INSERT ACTION 모두 5종씩 정의되어 있으며 각 종류의 동작 방향은 서로 동일하다."
    ],
    ans: 4,
    src: "자료4 p.5",
    exp: {
      reason: "DELETE ACTION은 5종(CASCADE, SET NULL, SET DEFAULT, RESTRICT, NO ACTION)이 정의되어 있지만, INSERT ACTION은 3종(AUTOMATIC, SET NULL, DEPENDENT)만 정의되어 있다. 또한 DELETE ACTION과 INSERT ACTION은 참조 무결성을 처리하는 방향(삭제 방향 vs. 삽입 방향)이 다르므로 동일하다는 설명은 틀렸다. (자료4 p.5)",
      terms: [
        "**DELETE ACTION 5종**: CASCADE, SET NULL, SET DEFAULT, RESTRICT, NO ACTION",
        "**INSERT ACTION 3종**: AUTOMATIC, SET NULL, DEPENDENT",
        "**방향 차이**: DELETE ACTION은 삭제 시 무결성 처리, INSERT ACTION은 삽입 시 무결성 처리"
      ],
      wrong: [
        "1. RESTRICT(DELETE)와 DEPENDENT(INSERT)의 역방향 대칭 관계 설명이 적절하다.",
        "2. CASCADE(DELETE)와 AUTOMATIC(INSERT)의 연쇄 처리 비교가 적절하다.",
        "3. SET NULL이 DELETE와 INSERT 양방향에 존재하나 처리 방향이 다른 것 설명이 적절하다.",
        "4. (정답) INSERT ACTION은 3종이고, DELETE ACTION은 5종이다. 종류 수가 다르고 동작 방향도 다르다."
      ],
      tip: "DELETE ACTION 5종 vs INSERT ACTION 3종. 개수와 방향 모두 다르다."
    }
  },

  // ============================================================
  // 토픽 163: VIEW 특성 및 장단점 (Q771~Q773) — 3문항, has_code: false
  // ============================================================
  {
    id: 771,
    subj: 2,
    topic: "2-Q-2",
    topic_name: "뷰/시퀀스/시노님",
    diff: "하",
    has_code: false,
    q: "다음 중 뷰(VIEW)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "뷰는 가상 테이블로서 실제 데이터를 물리적으로 저장하지 않고 SELECT 정의만 저장한다.",
      "뷰를 통해 조회하면 뷰 정의의 SELECT 문이 실행되어 결과가 동적으로 생성된다.",
      "뷰는 기본 테이블이 삭제되더라도 독립적으로 데이터를 보유하므로 계속 사용할 수 있다.",
      "뷰를 통해 기본 테이블의 일부 컬럼만 노출하여 민감한 데이터를 숨기는 보안 효과를 얻을 수 있다."
    ],
    ans: 3,
    src: "자료3 p.99~100",
    exp: {
      reason: "뷰는 SELECT 정의(쿼리)만 저장한 가상 테이블이다. 실제 데이터는 기본 테이블에 있다. 기본 테이블이 삭제되면 해당 테이블을 참조하는 뷰도 유효하지 않게 되어 사용할 수 없다. 뷰가 독립적으로 데이터를 보유한다는 설명은 틀렸다. (자료3 p.99~100)",
      terms: [
        "**뷰(VIEW)**: 가상 테이블. SELECT 정의만 저장. 실제 데이터 저장공간 없음 (자료3 p.99)",
        "**동적 생성**: 뷰 조회 시마다 정의된 SELECT를 실행하여 결과 생성",
        "**보안성**: 기본 테이블의 일부 컬럼/행만 노출 가능 (자료3 p.100)",
        "**독립성**: 기본 테이블 구조 변경에 응용 프로그램 변경 불필요. 단 기본 테이블 삭제 시 뷰 무효화"
      ],
      wrong: [
        "1. 뷰는 SELECT 정의만 저장, 데이터 저장 없음이 맞다. (자료3 p.99)",
        "2. 뷰 조회 시 정의 SELECT 실행이 맞다.",
        "3. (정답) 뷰는 독립적으로 데이터를 보유하지 않는다. 기본 테이블 삭제 시 뷰도 무효.",
        "4. 뷰를 통한 컬럼 제한으로 보안성 확보가 맞다. (자료3 p.100)"
      ],
      tip: "뷰 = 쿼리 저장만. 데이터 없음. 기본 테이블 삭제되면 뷰도 쓸 수 없다."
    }
  },

  {
    id: 772,
    subj: 2,
    topic: "2-Q-2",
    topic_name: "뷰/시퀀스/시노님",
    diff: "중",
    has_code: false,
    q: "다음 중 뷰 사용의 장점 3가지(독립성, 편리성, 보안성)에 대한 설명의 연결이 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "독립성 — 기본 테이블의 구조가 변경되어도 뷰를 사용하는 응용 프로그램은 변경하지 않아도 된다.",
      "편리성 — 자주 사용하는 복잡한 질의를 뷰로 정의해 두면 단순한 SELECT 문으로 재사용할 수 있다.",
      "보안성 — 기본 테이블에서 노출하고 싶지 않은 컬럼을 제외하고 뷰를 생성하여 민감 정보를 숨길 수 있다.",
      "독립성 — 뷰 자체에 데이터가 저장되므로 기본 테이블 없이도 뷰 단독으로 동작한다."
    ],
    ans: 4,
    src: "자료3 p.100",
    exp: {
      reason: "독립성은 기본 테이블 구조 변경 시 응용 프로그램 수정 없이 뷰만 수정하면 된다는 의미다. 뷰 자체에 데이터가 저장된다는 설명은 잘못되었다. 뷰는 저장공간이 없고 SELECT 정의만 저장하며, 기본 테이블 없이는 단독으로 동작할 수 없다. (자료3 p.100)",
      terms: [
        "**독립성**: 기본 테이블 구조 변경 → 응용 프로그램 변경 불필요 (자료3 p.100)",
        "**편리성**: 복잡한 쿼리를 뷰로 단순화 → 재사용 편리 (자료3 p.100)",
        "**보안성**: 민감 컬럼 제외하고 뷰 생성 → 정보 은닉 (자료3 p.100)"
      ],
      wrong: [
        "1. 독립성 — 기본 테이블 변경 시 응용 변경 불필요가 맞다. (자료3 p.100)",
        "2. 편리성 — 복잡한 쿼리 단순화가 맞다. (자료3 p.100)",
        "3. 보안성 — 컬럼 제외로 민감 정보 숨기기가 맞다. (자료3 p.100)",
        "4. (정답) 독립성은 데이터 저장과 무관하다. 뷰는 저장공간 없이 SELECT 정의만 저장한다."
      ],
      tip: "독립성 = 기본 테이블 구조 변경에 응용 프로그램 영향 없음. 데이터 독립 저장과 혼동 금지."
    }
  },

  {
    id: 773,
    subj: 2,
    topic: "2-Q-2",
    topic_name: "뷰/시퀀스/시노님",
    diff: "중",
    has_code: false,
    q: "다음 중 단순 뷰와 복합 뷰의 차이에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "단순 뷰는 하나의 기본 테이블을 기반으로 생성된 뷰이고, 복합 뷰는 두 개 이상의 테이블을 조인하거나 집합 연산을 포함한 뷰이다.",
      "복합 뷰는 조인, GROUP BY, DISTINCT 등이 포함될 수 있어 단순 뷰보다 구조가 복잡하다.",
      "단순 뷰는 조건이 맞으면 INSERT, UPDATE, DELETE 등 DML이 가능할 수 있으나, 복합 뷰는 일반적으로 DML이 제한된다.",
      "복합 뷰는 물리적 저장 공간에 데이터를 가지고 있으므로 단순 뷰보다 조회 성능이 항상 빠르다."
    ],
    ans: 4,
    src: "자료3 p.99~100",
    exp: {
      reason: "뷰는 단순 뷰와 복합 뷰를 불문하고 모두 물리적 저장 공간에 데이터를 저장하지 않는다. 조회 시마다 정의된 SELECT를 실행한다. 복합 뷰가 단순 뷰보다 성능이 항상 빠른 것도 아니다. 조인과 집합 연산이 포함된 복합 뷰는 오히려 성능이 더 느릴 수 있다. (자료3 p.99~100)",
      terms: [
        "**단순 뷰**: 단일 테이블 기반. 조건 충족 시 DML 가능",
        "**복합 뷰**: 다중 테이블 조인, 그룹 함수, DISTINCT 등 포함. DML 제한",
        "**공통점**: 단순/복합 모두 데이터 저장공간 없음. SELECT 정의만 저장"
      ],
      wrong: [
        "1. 단순/복합 뷰 정의가 맞다. (자료3 p.100)",
        "2. 복합 뷰의 구조적 복잡성 설명이 맞다.",
        "3. 단순 뷰 DML 가능성, 복합 뷰 DML 제한 설명이 맞다. (자료3 p.100)",
        "4. (정답) 모든 뷰는 물리적 데이터 저장 없음. 복합 뷰가 항상 성능이 빠른 것도 아니다."
      ],
      tip: "단순/복합 뷰 모두 데이터 저장 없음. 차이는 기반 테이블 수와 DML 가능 여부."
    }
  },

  // ============================================================
  // 토픽 164: VIEW 생성 및 삭제 (Q774~Q775) — 2문항, has_code: true
  // ============================================================
  {
    id: 774,
    subj: 2,
    topic: "2-Q-2",
    topic_name: "뷰/시퀀스/시노님",
    diff: "중",
    has_code: true,
    q: "다음 SQL에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE OR REPLACE VIEW v_emp_dept AS\n  SELECT e.emp_id, e.emp_name, d.dept_name\n  FROM   emp e\n  JOIN   dept d ON e.dept_id = d.dept_id\n  WHERE  e.status = 'Y';"
      }
    ],
    choices: [
      "같은 이름의 뷰가 이미 존재하면 DROP 없이 재정의된다.",
      "같은 이름의 뷰가 없으면 새로 생성된다.",
      "OR REPLACE를 생략하고 CREATE VIEW만 사용할 경우 같은 이름의 뷰가 이미 존재하면 오류가 발생한다.",
      "CREATE OR REPLACE VIEW는 기존 뷰에 새 데이터를 추가하는 기능을 한다."
    ],
    ans: 4,
    src: "자료3 p.100",
    exp: {
      reason: "CREATE OR REPLACE VIEW는 기존에 같은 이름의 뷰가 있으면 DROP 없이 뷰의 SELECT 정의를 새로 교체(재정의)하는 기능이다. 데이터를 추가하는 DML 기능과는 전혀 무관하다. 뷰는 SELECT 정의만 저장하므로 데이터를 보유하지 않는다. (자료3 p.100) PostgreSQL 검증 완료.",
      terms: [
        "**CREATE VIEW**: 뷰를 새로 생성. 같은 이름 있으면 오류",
        "**CREATE OR REPLACE VIEW**: 같은 이름 있으면 정의 교체, 없으면 신규 생성 (자료3 p.100)",
        "**교체 대상**: SELECT 정의만 교체. 데이터 추가/변경 아님"
      ],
      wrong: [
        "1. 같은 이름 뷰 있으면 DROP 없이 재정의가 맞다. (자료3 p.100)",
        "2. 뷰 없으면 새로 생성이 맞다.",
        "3. OR REPLACE 없으면 기존 뷰 있을 때 오류가 맞다.",
        "4. (정답) CREATE OR REPLACE VIEW는 SELECT 정의를 교체하는 것이지, 데이터를 추가하는 것이 아니다."
      ],
      tip: "CREATE OR REPLACE VIEW = 정의 교체 또는 신규 생성. 데이터 추가와 무관."
    }
  },

  {
    id: 775,
    subj: 2,
    topic: "2-Q-2",
    topic_name: "뷰/시퀀스/시노님",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (1) 뷰 생성\nCREATE VIEW v_sales AS\n  SELECT s.sale_id, s.amount, p.prod_name\n  FROM   sales s\n  JOIN   product p ON s.prod_id = p.prod_id;\n\n-- (2) 뷰 삭제\nDROP VIEW v_sales;\n\n-- (3) 동일 뷰명 재생성 시도\nCREATE VIEW v_sales AS\n  SELECT sale_id, amount FROM sales;"
      }
    ],
    choices: [
      "(1) 실행 후 v_sales 뷰를 통해 sale_id, amount, prod_name을 조회할 수 있다.",
      "(2) DROP VIEW v_sales 실행 후에는 v_sales를 통한 조회가 불가능하다.",
      "(2) DROP VIEW 실행 시 기본 테이블인 sales와 product 테이블의 데이터도 함께 삭제된다.",
      "(3) (2)에서 DROP VIEW를 먼저 실행했으므로 같은 이름으로 다시 CREATE VIEW가 가능하다."
    ],
    ans: 3,
    src: "자료3 p.100",
    exp: {
      reason: "DROP VIEW는 뷰의 정의(SELECT 구문)만 삭제한다. 뷰는 데이터를 저장하지 않으므로 기본 테이블(sales, product)의 데이터에는 전혀 영향을 주지 않는다. (자료3 p.100) PostgreSQL 검증 완료.",
      terms: [
        "**DROP VIEW**: 뷰 정의만 삭제. 기본 테이블 데이터에 영향 없음 (자료3 p.100)",
        "**DROP TABLE과 차이**: DROP TABLE은 테이블 구조와 데이터 모두 삭제. DROP VIEW는 뷰 정의만 삭제",
        "**재생성**: DROP 후에는 같은 이름으로 CREATE VIEW 가능"
      ],
      wrong: [
        "1. (1) 실행 후 v_sales로 3개 컬럼 조회 가능이 맞다.",
        "2. DROP 후 v_sales 조회 불가가 맞다.",
        "3. (정답) DROP VIEW는 뷰 정의만 삭제. 기본 테이블 데이터 삭제는 없다.",
        "4. DROP 후 동일 이름 CREATE VIEW 가능이 맞다."
      ],
      tip: "DROP VIEW = 뷰 정의 삭제만. 기본 테이블 데이터에 손대지 않는다."
    }
  },

  // ============================================================
  // 토픽 165: SEQUENCE 특성 (Q776~Q778) — 3문항, has_code: false
  // ============================================================
  {
    id: 776,
    subj: 2,
    topic: "2-Q-2",
    topic_name: "뷰/시퀀스/시노님",
    diff: "하",
    has_code: false,
    q: "다음 중 시퀀스(SEQUENCE)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "시퀀스는 자동으로 순번을 생성하는 데이터베이스 객체로, 주로 기본키 값을 순차적으로 생성하는 데 사용한다.",
      "INCREMENT BY는 시퀀스의 증가값을 지정하며, 음수를 지정하면 감소하는 시퀀스를 만들 수 있다.",
      "CYCLE 옵션을 지정하면 MAXVALUE(또는 MINVALUE)에 도달했을 때 처음 값으로 돌아간다.",
      "CACHE 옵션을 지정하면 시퀀스 값을 디스크에 영구 저장하여 서버 재시작 후에도 연속된 값을 보장한다."
    ],
    ans: 4,
    src: "자료3 p.100~101",
    exp: {
      reason: "CACHE 옵션은 지정한 수만큼 시퀀스 값을 메모리(캐시)에 미리 할당해 두어 매번 디스크에 접근하지 않고 빠르게 값을 제공한다. 그러나 서버가 비정상 종료되면 캐시에 있던 미사용 값이 소실되어 연속성이 깨질 수 있다. 디스크에 영구 저장하여 연속을 보장하는 것이 아니다. (자료3 p.101) PostgreSQL 검증 완료.",
      terms: [
        "**SEQUENCE 용도**: 자동 순번 생성. 기본키 자동 생성에 활용 (자료3 p.100)",
        "**INCREMENT BY**: 증가값. 음수 가능 → 감소 시퀀스 (자료3 p.101) PostgreSQL 검증 완료",
        "**CYCLE**: MAXVALUE 도달 후 START WITH로 재시작 (자료3 p.101) PostgreSQL 검증 완료",
        "**CACHE**: N개 값을 메모리에 미리 할당. 비정상 종료 시 캐시값 소실 가능"
      ],
      wrong: [
        "1. 시퀀스 용도 설명이 맞다. (자료3 p.100)",
        "2. INCREMENT BY 음수로 감소 시퀀스 가능이 맞다. (자료3 p.101) PostgreSQL 검증 완료.",
        "3. CYCLE 설명이 맞다. (자료3 p.101) PostgreSQL 검증 완료.",
        "4. (정답) CACHE는 메모리 캐시. 서버 재시작 시 캐시 값 손실 가능 — 연속성 미보장."
      ],
      tip: "CACHE = 메모리 선점. 서버 비정상 종료 시 캐시 값 날아감 → 연속성 깨질 수 있음."
    }
  },

  {
    id: 777,
    subj: 2,
    topic: "2-Q-2",
    topic_name: "뷰/시퀀스/시노님",
    diff: "중",
    has_code: false,
    q: "INCREMENT BY 1, START WITH 1, MAXVALUE 5, CYCLE, CACHE 2로 정의된 시퀀스에서 NEXTVAL을 6번 호출했을 때의 6번째 반환 값으로 옳은 것은?",
    blocks: null,
    choices: [
      "6",
      "5",
      "1",
      "0"
    ],
    ans: 3,
    src: "자료3 p.100~101",
    exp: {
      reason: "START WITH 1, INCREMENT BY 1, MAXVALUE 5, CYCLE로 정의된 시퀀스의 NEXTVAL 호출 결과: 1→2→3→4→5→1(CYCLE). MAXVALUE인 5에 도달한 후 CYCLE 옵션에 의해 START WITH 값인 1로 돌아간다. 6번째 호출 결과는 1이다. (자료3 p.101) PostgreSQL 검증 완료.",
      terms: [
        "**START WITH 1**: 시작값 1",
        "**INCREMENT BY 1**: 1씩 증가",
        "**MAXVALUE 5**: 최대값 5. 도달 시 CYCLE 작동",
        "**CYCLE**: MAXVALUE 도달 후 START WITH로 재시작 → 6번째 호출 = 1"
      ],
      wrong: [
        "1. 6은 MAXVALUE를 초과하므로 CYCLE 없이는 오류, CYCLE 있으면 1로 재시작.",
        "2. 5는 5번째 호출 결과다.",
        "3. (정답) CYCLE로 인해 6번째는 1. PostgreSQL 검증 완료 (1→2→3→4→5→1).",
        "4. 0은 이 시퀀스 정의에서 나올 수 없는 값이다."
      ],
      tip: "CYCLE: MAXVALUE 도달 다음 호출 = START WITH 값부터 재시작."
    }
  },

  {
    id: 778,
    subj: 2,
    topic: "2-Q-2",
    topic_name: "뷰/시퀀스/시노님",
    diff: "중",
    has_code: false,
    q: "다음 중 SEQUENCE의 주요 옵션과 그 설명의 연결이 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "START WITH — 시퀀스의 시작값을 지정한다.",
      "INCREMENT BY — 시퀀스의 증가(또는 감소)값을 지정한다. 양수이면 증가, 음수이면 감소한다.",
      "MAXVALUE — 시퀀스가 생성할 수 있는 최대값을 지정한다. CYCLE과 함께 쓰면 이 값 이후 재시작한다.",
      "NOCACHE — 시퀀스 값을 메모리에 N개 미리 저장하여 성능을 높인다."
    ],
    ans: 4,
    src: "자료3 p.101",
    exp: {
      reason: "NOCACHE는 캐시를 사용하지 않는 옵션이다. 시퀀스 값을 메모리에 미리 저장하는 것은 CACHE N 옵션이다. NOCACHE는 CACHE를 비활성화하여 매번 디스크에 접근해 값을 생성하므로 성능이 낮아질 수 있지만 값의 연속성은 더 잘 보장된다. (자료3 p.101)",
      terms: [
        "**CACHE N**: N개 값을 메모리에 미리 할당. 성능 향상",
        "**NOCACHE**: 캐시 사용 안 함. 매번 디스크 접근. 연속성 보장 향상",
        "**START WITH**: 시작값 (자료3 p.101)",
        "**INCREMENT BY**: 증가/감소값. 음수 가능 (자료3 p.101)"
      ],
      wrong: [
        "1. START WITH — 시작값 지정이 맞다. (자료3 p.101)",
        "2. INCREMENT BY — 양수 증가, 음수 감소가 맞다. (자료3 p.101) PostgreSQL 검증 완료.",
        "3. MAXVALUE와 CYCLE의 연관 설명이 맞다. (자료3 p.101) PostgreSQL 검증 완료.",
        "4. (정답) NOCACHE는 캐시 비활성화다. 캐시 활성화는 CACHE N이다."
      ],
      tip: "CACHE N = 메모리 미리 N개. NOCACHE = 캐시 안 씀. 이름이 반대다."
    }
  },

  // ============================================================
  // 토픽 166: SYNONYM 특성 (Q779~Q780) — 2문항, has_code: false
  // ============================================================
  {
    id: 779,
    subj: 2,
    topic: "2-Q-2",
    topic_name: "뷰/시퀀스/시노님",
    diff: "하",
    has_code: false,
    q: "다음 중 시노님(SYNONYM)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "시노님은 테이블, 뷰, 시퀀스 등 데이터베이스 객체에 별칭(별명)을 부여하는 객체이다.",
      "PRIVATE 시노님은 시노님을 생성한 사용자만 사용할 수 있다.",
      "PUBLIC 시노님은 모든 사용자가 사용할 수 있으며, 생성 시 관리자(DBA) 권한이 필요하다.",
      "PUBLIC 시노님은 일반 사용자도 별도 권한 없이 자유롭게 생성할 수 있다."
    ],
    ans: 4,
    src: "자료3 p.101",
    exp: {
      reason: "PUBLIC 시노님은 데이터베이스의 모든 사용자가 사용할 수 있는 시노님으로, 생성하려면 DBA 등 관리자 권한이 필요하다. 일반 사용자는 별도의 권한 부여 없이 PUBLIC 시노님을 생성할 수 없다. 일반 사용자가 자유롭게 생성할 수 있는 것은 PRIVATE 시노님이다. (자료3 p.101)",
      terms: [
        "**SYNONYM**: 객체(테이블/뷰/시퀀스 등)에 별칭 부여 (자료3 p.101)",
        "**PRIVATE**: 생성자만 사용 가능. 일반 사용자 생성 가능",
        "**PUBLIC**: 모든 사용자 사용 가능. 생성 시 관리자 권한 필요 (자료3 p.101)"
      ],
      wrong: [
        "1. 시노님 정의가 맞다. (자료3 p.101)",
        "2. PRIVATE 시노님 접근 범위 설명이 맞다. (자료3 p.101)",
        "3. PUBLIC 시노님 접근 범위 및 권한 요건 설명이 맞다. (자료3 p.101)",
        "4. (정답) PUBLIC 시노님은 관리자 권한이 필요하다. 일반 사용자는 자유롭게 생성 불가."
      ],
      tip: "PUBLIC 시노님 = 전체 공개, DBA 권한 필요. PRIVATE 시노님 = 본인만, 일반 사용자 생성 가능."
    }
  },

  {
    id: 780,
    subj: 2,
    topic: "2-Q-2",
    topic_name: "뷰/시퀀스/시노님",
    diff: "하",
    has_code: false,
    q: "다음 중 시노님(SYNONYM) 생성 문법과 특성에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "CREATE SYNONYM 별칭 FOR 객체명; 구문으로 PRIVATE 시노님을 생성한다.",
      "CREATE PUBLIC SYNONYM 별칭 FOR 객체명; 구문으로 PUBLIC 시노님을 생성한다.",
      "시노님을 생성하면 원래 객체가 아닌 별칭으로도 SELECT, INSERT 등의 SQL을 수행할 수 있다.",
      "시노님을 삭제하면 시노님이 가리키던 원본 테이블의 데이터도 함께 삭제된다."
    ],
    ans: 4,
    src: "자료3 p.101",
    exp: {
      reason: "시노님(SYNONYM)은 객체의 별칭만 정의하는 것으로, 실제 데이터와 무관하다. 시노님을 삭제(DROP SYNONYM)해도 원본 테이블이나 그 데이터에는 아무런 영향을 주지 않는다. 뷰를 삭제해도 기본 테이블 데이터가 삭제되지 않는 것과 같은 원리다. (자료3 p.101)",
      terms: [
        "**CREATE SYNONYM**: PRIVATE 시노님 생성 (자료3 p.101)",
        "**CREATE PUBLIC SYNONYM**: PUBLIC 시노님 생성. DBA 권한 필요",
        "**DROP SYNONYM**: 시노님 정의만 삭제. 원본 객체 데이터에 영향 없음",
        "**사용**: 별칭으로 SELECT/DML 모두 가능"
      ],
      wrong: [
        "1. CREATE SYNONYM으로 PRIVATE 시노님 생성이 맞다. (자료3 p.101)",
        "2. CREATE PUBLIC SYNONYM으로 PUBLIC 시노님 생성이 맞다. (자료3 p.101)",
        "3. 시노님 별칭으로 SQL 수행 가능이 맞다. (자료3 p.101)",
        "4. (정답) 시노님 삭제는 별칭 정의만 삭제. 원본 테이블 데이터는 그대로다."
      ],
      tip: "시노님 삭제 = 별칭만 사라짐. 원본 데이터는 무사. 뷰 삭제와 같은 원리."
    }
  }

];

module.exports = rq22Part1;

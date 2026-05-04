// 2-Q DDL: Q736~Q760 (25문항)
// 자료3 p.90~99, 자료4 p.6, SQLD_요약_서브노트.pdf p.10~11, TRAPS.md T-13, T-14 기반.
// PostgreSQL 14 sqld_verify DB로 CREATE/ALTER/DROP/TRUNCATE/제약조건 직접 검증.
// CTAS = CREATE TABLE AS SELECT (Oracle/SQL Server 모두 해당).
// Oracle 기준 명시된 함정은 주석으로 DBMS 표기.

const q2Part1 = [

  // ============================================================
  // 토픽 153: DDL 개념 및 종류 (Q736~Q737) — 2문항, has_code: false
  // ============================================================
  {
    id: 736,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "하",
    has_code: false,
    q: "다음 중 DDL(Data Definition Language)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "DDL은 테이블과 같은 데이터 구조를 정의하거나 변경, 삭제하는 명령어들의 집합이다.",
      "DDL 명령어에는 CREATE, ALTER, DROP, RENAME, TRUNCATE가 포함된다.",
      "DDL 문장은 실행 즉시 자동으로 COMMIT되므로 ROLLBACK으로 되돌릴 수 없다.",
      "DDL 문장을 실행하기 전에 진행 중인 DML 트랜잭션이 있어도 DDL은 독립적으로 처리되어 이전 DML 작업에는 영향을 주지 않는다."
    ],
    ans: 4,
    src: "자료3 p.90, SQLD_요약_서브노트 p.9~11",
    exp: {
      reason: "Oracle에서 DDL 문장이 실행될 때, 해당 DDL 이전에 실행 중이던 미완료 DML 트랜잭션은 자동으로 COMMIT된다. 즉, DDL 실행 전 DML에도 영향을 준다. (자료3 p.90, SQLD_요약_서브노트 p.9)",
      terms: [
        "**DDL(Data Definition Language)**: 데이터 구조(테이블, 뷰, 인덱스 등)를 정의/변경/삭제하는 SQL 명령어 그룹",
        "**DDL 종류**: CREATE(생성), ALTER(변경), DROP(삭제), RENAME(이름 변경), TRUNCATE(전체 행 삭제)",
        "**AUTO COMMIT**: DDL은 별도 COMMIT 없이 즉시 반영. ROLLBACK 불가",
        "**DDL 실행 시 트랜잭션 처리**: Oracle은 DDL 실행 직전 미완료 DML 트랜잭션을 자동 COMMIT 처리"
      ],
      wrong: [
        "1. DDL의 정의 그대로다. 자료3 p.90 명시.",
        "2. CREATE, ALTER, DROP, RENAME, TRUNCATE 모두 DDL이다.",
        "3. DDL은 AUTO COMMIT이므로 ROLLBACK 불가. 자료3 p.90, TRAPS.md T-13 명시.",
        "4. (정답) Oracle에서 DDL 실행 전 미완료 DML은 자동 COMMIT되어 영향을 받는다."
      ],
      tip: "DDL = AUTO COMMIT. Oracle에서는 DDL 직전 DML도 자동 COMMIT된다."
    }
  },

  {
    id: 737,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "하",
    has_code: false,
    q: "다음 중 DDL과 DML의 차이에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "DDL은 트랜잭션의 일부로 처리되므로 ROLLBACK으로 취소할 수 있다.",
      "DML은 테이블의 구조를 정의하고, DDL은 테이블의 데이터를 조작한다.",
      "DELETE는 DML로 ROLLBACK이 가능하지만, TRUNCATE는 DDL로 ROLLBACK이 불가능하다.",
      "Oracle에서 DML 실행 후에는 자동으로 COMMIT되므로 명시적 COMMIT이 필요 없다."
    ],
    ans: 3,
    src: "자료3 p.90, p.94~95, TRAPS.md T-13",
    exp: {
      reason: "DELETE는 DML이므로 ROLLBACK이 가능하고 UNDO 로그가 생성된다. TRUNCATE는 DDL이므로 AUTO COMMIT되어 ROLLBACK이 불가능하다. 이것이 DELETE와 TRUNCATE의 핵심 차이다. (자료3 p.94~95, TRAPS.md T-13)",
      terms: [
        "**DML(Data Manipulation Language)**: SELECT, INSERT, UPDATE, DELETE. 트랜잭션 관리 대상. ROLLBACK 가능",
        "**DDL**: CREATE, ALTER, DROP, TRUNCATE. AUTO COMMIT. ROLLBACK 불가",
        "**DELETE vs TRUNCATE**: DELETE(DML, 행 단위, WHERE 가능, ROLLBACK 가능) vs TRUNCATE(DDL, 전체, WHERE 불가, ROLLBACK 불가)",
        "**Oracle DML**: 명시적 COMMIT 필요. AUTO COMMIT 아님"
      ],
      wrong: [
        "1. DDL은 AUTO COMMIT이므로 트랜잭션의 일부로 처리되지 않으며 ROLLBACK 불가.",
        "2. DML이 데이터 조작, DDL이 구조 정의다. 설명이 반대이다.",
        "3. (정답) DELETE(DML)는 ROLLBACK 가능, TRUNCATE(DDL)는 ROLLBACK 불가. 자료3 p.94~95 명시.",
        "4. Oracle에서 DML은 AUTO COMMIT이 아니다. 명시적 COMMIT 또는 ROLLBACK이 필요하다."
      ],
      tip: "DELETE = DML = ROLLBACK 가능 / TRUNCATE = DDL = ROLLBACK 불가. 시험 단골 짝."
    }
  },

  // ============================================================
  // 토픽 154: 데이터 유형 (Q738~Q740) — 3문항, has_code: false
  // ============================================================
  {
    id: 738,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: false,
    q: "다음 중 SQL의 데이터 유형에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "CHAR(n)은 고정 길이 문자열 타입으로, 저장된 값이 n보다 짧으면 나머지를 공백으로 채운다.",
      "VARCHAR(n)은 가변 길이 문자열 타입으로, 실제 입력된 값의 바이트만 저장된다.",
      "NUMBER(p, s)에서 p는 전체 자릿수, s는 소수점 이하 자릿수를 의미한다.",
      "CHAR(10)과 VARCHAR(10)에 'ABC'를 저장하면 두 타입 모두 동일한 저장 공간을 사용한다."
    ],
    ans: 4,
    src: "자료3 p.90, SQLD_요약_서브노트 p.10",
    exp: {
      reason: "CHAR(10)에 'ABC'를 저장하면 10바이트 고정(나머지 7바이트 공백 채움)이지만, VARCHAR(10)에 'ABC'를 저장하면 3바이트만 사용한다. 두 타입은 저장 공간이 다르다. (자료3 p.90)",
      terms: [
        "**CHAR(n)**: 고정 길이. 입력값이 n보다 짧으면 공백으로 채워 항상 n바이트 사용",
        "**VARCHAR(n)**: 가변 길이. 실제 입력된 바이트만 사용. n은 최대 길이",
        "**NUMBER(p, s)**: p = 전체 자릿수(정수+소수), s = 소수점 이하 자릿수. ex) NUMBER(6,2): 정수 4자리, 소수 2자리",
        "**DATE**: 날짜/시간 정보. Oracle은 1초 단위, SQL Server는 DATETIME(밀리초 단위)"
      ],
      wrong: [
        "1. CHAR(n)의 고정 길이, 공백 채움 특성. 자료3 p.90 명시.",
        "2. VARCHAR(n)의 가변 길이 특성. 자료3 p.90 명시.",
        "3. NUMBER(p,s)의 p=전체 자릿수, s=소수점 이하 자릿수. 자료3 p.90 명시.",
        "4. (정답) CHAR(10)은 항상 10바이트, VARCHAR(10)은 실제 입력 길이만 사용. 저장 공간이 다르다."
      ],
      tip: "CHAR = 고정(공백 채움) / VARCHAR = 가변(입력값만). 같은 값이라도 저장 공간 다름."
    }
  },

  {
    id: 739,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: false,
    q: "Oracle 기준 NUMBER(5, 2) 타입의 컬럼에 저장 가능한 값으로 옳은 것은?",
    blocks: null,
    choices: [
      "123456.78",
      "123.456",
      "123.45",
      "1234567"
    ],
    ans: 3,
    src: "자료3 p.90, SQLD_요약_서브노트 p.10",
    exp: {
      reason: "NUMBER(5, 2)는 전체 자릿수 5개, 소수점 이하 2자리를 의미한다. 즉 정수 부분은 최대 3자리(5-2=3)까지 허용한다. 저장 가능한 범위는 -999.99 ~ 999.99이다. 123.45는 정수 3자리 + 소수 2자리로 정확히 맞는다. (자료3 p.90)",
      terms: [
        "**NUMBER(p, s)**: p = 전체 자릿수, s = 소수점 이하 자릿수. 정수 부분 = p - s 자리",
        "**NUMBER(5, 2)**: 전체 5자리, 소수 2자리 → 정수 최대 3자리(999), 소수 최대 2자리(.99)",
        "**저장 가능 범위**: -999.99 ~ 999.99",
        "**초과 시 오류**: Oracle은 정밀도 초과 시 ORA-01438 오류 발생"
      ],
      wrong: [
        "1. 123456.78은 정수 6자리로 정수 허용 한도(3자리)를 초과한다.",
        "2. 123.456은 소수 3자리로 소수점 이하 허용 한도(2자리)를 초과한다.",
        "3. (정답) 123.45는 정수 3자리 + 소수 2자리 = 전체 5자리. NUMBER(5,2)에 저장 가능.",
        "4. 1234567은 정수 7자리로 허용 한도(3자리)를 크게 초과한다."
      ],
      tip: "NUMBER(p,s): 정수 최대 자릿수 = p - s. NUMBER(5,2)이면 정수 최대 3자리."
    }
  },

  {
    id: 740,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: false,
    q: "다음 중 CHAR와 VARCHAR 데이터 타입에 대한 비교 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "CHAR는 고정 길이이므로 길이가 다른 값이 입력되면 나머지를 공백으로 채워 저장한다.",
      "VARCHAR는 가변 길이이므로 실제 입력된 값의 바이트만큼만 저장 공간을 사용한다.",
      "CHAR(10)에 저장된 'ABC'와 VARCHAR(10)에 저장된 'ABC'를 비교하면 CHAR의 공백 패딩으로 인해 항상 다른 값으로 처리된다.",
      "VARCHAR는 s(최소)만큼의 최대 길이를 갖지만, 해당 변수 값의 바이트만큼만 적용된다."
    ],
    ans: 3,
    src: "자료3 p.90, SQLD_요약_서브노트 p.10",
    exp: {
      reason: "CHAR와 VARCHAR 비교 시 DBMS에 따라 공백 패딩을 자동 처리하는 경우가 있어 동일하게 취급되는 경우도 있다. '항상 다른 값으로 처리된다'는 설명은 절대적이지 않으며, DBMS 종류와 비교 방식에 따라 달라진다. 시험 범위에서 중요한 것은 저장 방식의 차이(고정 vs 가변)이다. (자료3 p.90)",
      terms: [
        "**CHAR(n)**: 고정 길이. 'ABC'를 CHAR(10)에 저장하면 내부적으로 'ABC       '(공백 7개 추가)로 저장",
        "**VARCHAR(n)**: 가변 길이. 'ABC'를 VARCHAR(10)에 저장하면 'ABC' 그대로 3바이트만 저장",
        "**공백 패딩 비교**: DBMS별 차이 있음. Oracle은 CHAR 비교 시 짧은 쪽에 공백을 채워 비교",
        "**CHAR vs VARCHAR 선택**: 값의 길이가 일정하면 CHAR, 가변적이면 VARCHAR 선택"
      ],
      wrong: [
        "1. CHAR의 공백 채움(패딩) 특성. 자료3 p.90 명시.",
        "2. VARCHAR의 가변 길이, 실제 바이트만 저장. 자료3 p.90 명시.",
        "3. (정답) CHAR와 VARCHAR 비교 처리는 DBMS에 따라 다르며, '항상 다른 값'이라는 절대적 설명은 부적절하다.",
        "4. VARCHAR의 가변 길이 특성에 대한 설명으로 적절하다."
      ],
      tip: "CHAR = 고정 + 공백 패딩, VARCHAR = 가변 + 실제 바이트만. 저장 방식 차이가 핵심."
    }
  },

  // ============================================================
  // 토픽 155: CREATE TABLE 문법 (Q741~Q744) — 4문항, has_code: true
  // ============================================================
  {
    id: 741,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 CREATE TABLE 문장 중 오류가 발생하는 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- ①\nCREATE TABLE EMP_INFO (\n  EMP_ID   NUMBER(10) NOT NULL,\n  EMP_NAME VARCHAR(50),\n  HIRE_DATE DATE DEFAULT SYSDATE\n);\n\n-- ②\nCREATE TABLE 3PLAYER (\n  ID   NUMBER(5),\n  NAME VARCHAR(30)\n);\n\n-- ③\nCREATE TABLE PRODUCT (\n  PROD_ID   CHAR(10) PRIMARY KEY,\n  PROD_NAME VARCHAR(100) NOT NULL,\n  PRICE     NUMBER(10,2) DEFAULT 0\n);\n\n-- ④\nCREATE TABLE ORDER_DETAIL (\n  ORDER_ID NUMBER(10),\n  SEQ      NUMBER(5),\n  CONSTRAINT PK_ORDER_DETAIL PRIMARY KEY (ORDER_ID, SEQ)\n);"
      }
    ],
    choices: [
      "①번만 오류이다.",
      "②번만 오류이다.",
      "③번만 오류이다.",
      "④번만 오류이다."
    ],
    ans: 2,
    src: "자료3 p.90~91, SQLD_요약_서브노트 p.10",
    exp: {
      reason: "테이블명은 반드시 문자(영문자 또는 한글)로 시작해야 한다. '3PLAYER'는 숫자 '3'으로 시작하므로 테이블명으로 사용할 수 없어 오류가 발생한다. ①은 DEFAULT SYSDATE, ③은 DEFAULT 0, ④는 복합 PK 모두 유효한 문법이다. (자료3 p.90~91)",
      terms: [
        "**테이블명 규칙**: 영문자(또는 한글)로 시작, 영문자/숫자/언더스코어(_)/달러($)/해시(#) 사용 가능, 숫자로 시작 불가",
        "**DEFAULT**: 컬럼 정의 시 INSERT 시 값이 없을 때 자동 입력될 기본값 지정",
        "**CONSTRAINT**: 제약조건에 이름을 부여할 때 사용. 생략 시 DBMS가 자동 이름 부여",
        "**복합 PRIMARY KEY**: CONSTRAINT 절로 여러 컬럼을 묶어 PK 지정 가능"
      ],
      wrong: [
        "1. ①은 NUMBER, VARCHAR, DATE DEFAULT SYSDATE 모두 정상 문법이다.",
        "2. (정답) ②의 테이블명 '3PLAYER'는 숫자로 시작하므로 오류. 자료3 p.90~91 테이블명 규칙.",
        "3. ③은 CHAR PRIMARY KEY, VARCHAR NOT NULL, NUMBER DEFAULT 0 모두 유효하다.",
        "4. ④는 CONSTRAINT 절로 복합 PK를 정의하는 정상 문법이다."
      ],
      tip: "테이블명은 **문자로 시작**해야 한다. 숫자/특수문자 시작 불가."
    }
  },

  {
    id: 742,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 CREATE TABLE 문장의 빈칸 (가)에 들어갈 수 없는 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE MEMBER (\n  MEM_ID   VARCHAR(20)  (가),\n  MEM_NAME VARCHAR(50)  NOT NULL,\n  AGE      NUMBER(3),\n  EMAIL    VARCHAR(100)\n);"
      }
    ],
    choices: [
      "PRIMARY KEY",
      "NOT NULL UNIQUE",
      "DEFAULT NULL",
      "NOT NULL PRIMARY KEY REFERENCES OTHER_TABLE(ID)"
    ],
    ans: 4,
    src: "자료3 p.90~91, p.95~99",
    exp: {
      reason: "컬럼 수준 제약조건으로 PRIMARY KEY와 REFERENCES(FK)를 동시에 한 컬럼에 적용하는 문법은 유효하지 않다. PRIMARY KEY가 이미 NOT NULL + UNIQUE를 포함하므로 REFERENCES를 별도로 같은 컬럼에 지정할 경우 의미상 중복이며, 일반적으로 FK는 별도 CONSTRAINT 절로 정의한다. 또한 컬럼이 PK이면서 FK인 구조는 별도 CONSTRAINT 절로 명시해야 한다. (자료3 p.95~99)",
      terms: [
        "**컬럼 수준 제약조건**: NOT NULL, UNIQUE, PRIMARY KEY, CHECK, DEFAULT, REFERENCES를 컬럼 정의 옆에 직접 작성",
        "**테이블 수준 제약조건**: CONSTRAINT 이름 TYPE(컬럼) 형태로 별도 줄에 작성. 복합 PK/FK에 필수",
        "**PRIMARY KEY 포함 관계**: PK = NOT NULL + UNIQUE. 별도로 NOT NULL을 추가해도 중복되지만 오류는 아님",
        "**FK 정의**: 컬럼 수준에서 REFERENCES 테이블(컬럼)으로 정의 가능하나, PK+FK 동시 컬럼 수준 정의는 비표준"
      ],
      wrong: [
        "1. PRIMARY KEY는 컬럼 수준 제약조건으로 단독 사용 가능. 정상.",
        "2. NOT NULL UNIQUE는 NOT NULL과 UNIQUE를 동시 적용. 가능.",
        "3. DEFAULT NULL은 기본값을 NULL로 설정. 유효한 문법.",
        "4. (정답) NOT NULL PRIMARY KEY REFERENCES OTHER_TABLE(ID)는 PK와 FK를 컬럼 수준에서 동시 정의하는 비표준 조합으로, 일반적으로 허용되지 않는다."
      ],
      tip: "PK이면서 FK인 컬럼은 컬럼 수준이 아닌 **CONSTRAINT 절**로 각각 명시해야 한다."
    }
  },

  {
    id: 743,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 CREATE TABLE 문장에서 CONSTRAINT 절의 역할로 가장 적절한 설명은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE ORDER_ITEM (\n  ORDER_NO  NUMBER(10)   NOT NULL,\n  ITEM_SEQ  NUMBER(5)    NOT NULL,\n  ITEM_NAME VARCHAR(100) NOT NULL,\n  PRICE     NUMBER(10,2) DEFAULT 0,\n  CONSTRAINT PK_ORDER_ITEM PRIMARY KEY (ORDER_NO, ITEM_SEQ),\n  CONSTRAINT CHK_PRICE CHECK (PRICE >= 0)\n);"
      }
    ],
    choices: [
      "PK_ORDER_ITEM 제약조건은 ORDER_NO 컬럼에만 PRIMARY KEY를 적용한다.",
      "CHK_PRICE 제약조건은 PRICE 컬럼에 음수 값 입력을 허용하지 않는다.",
      "CONSTRAINT 절 없이는 PRIMARY KEY와 CHECK 제약조건을 정의할 수 없다.",
      "PRICE 컬럼에 NOT NULL이 명시되어 있지 않으므로 CHK_PRICE 제약조건이 자동으로 NOT NULL을 추가한다."
    ],
    ans: 2,
    src: "자료3 p.91, p.95~99",
    exp: {
      reason: "CHK_PRICE CHECK (PRICE >= 0)은 PRICE 컬럼에 0 이상의 값만 허용하는 CHECK 제약조건이다. 음수 값(PRICE < 0)을 입력하면 제약조건 위반으로 오류가 발생한다. (자료3 p.97)",
      terms: [
        "**CONSTRAINT 이름**: 제약조건에 이름을 부여. 나중에 ALTER TABLE DROP CONSTRAINT로 제거 시 이름으로 참조",
        "**PRIMARY KEY (ORDER_NO, ITEM_SEQ)**: 두 컬럼의 조합이 PK. 복합 PK는 반드시 테이블 수준 CONSTRAINT로 정의",
        "**CHECK (조건)**: 컬럼에 저장 가능한 값의 조건을 지정. 조건에 위반되는 값은 INSERT/UPDATE 시 오류",
        "**DEFAULT vs CHECK**: DEFAULT는 값 미입력 시 기본값, CHECK는 허용 범위 제한"
      ],
      wrong: [
        "1. PK_ORDER_ITEM은 ORDER_NO와 ITEM_SEQ 두 컬럼의 조합에 PRIMARY KEY를 적용한다. ORDER_NO 단독이 아님.",
        "2. (정답) CHK_PRICE CHECK (PRICE >= 0)은 PRICE가 0 이상이어야 한다는 조건. 음수 입력 시 오류 발생.",
        "3. CONSTRAINT 절 없이도 컬럼 수준에서 PRIMARY KEY와 CHECK를 정의할 수 있다. 단 복합 PK는 불가.",
        "4. CHECK 제약조건은 NOT NULL을 자동으로 추가하지 않는다. NULL 허용 여부는 별도로 명시해야 한다."
      ],
      tip: "CHECK = 값의 허용 조건. PRIMARY KEY 복합 구성은 반드시 **테이블 수준** CONSTRAINT 필요."
    }
  },

  {
    id: 744,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 SQL 실행 결과에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE DEPT (\n  DEPT_ID   NUMBER(5)   PRIMARY KEY,\n  DEPT_NAME VARCHAR(50) NOT NULL,\n  LOCATION  VARCHAR(50) DEFAULT '서울'\n);\n\nINSERT INTO DEPT (DEPT_ID, DEPT_NAME) VALUES (10, '개발팀');"
      }
    ],
    choices: [
      "INSERT 문에 LOCATION 값이 없으므로 오류가 발생한다.",
      "INSERT 후 LOCATION 컬럼에는 NULL이 저장된다.",
      "INSERT 후 LOCATION 컬럼에는 '서울'이 저장된다.",
      "DEPT_NAME에 NOT NULL이 있으므로 INSERT 시 반드시 LOCATION도 함께 지정해야 한다."
    ],
    ans: 3,
    src: "자료3 p.90~91",
    exp: {
      reason: "LOCATION 컬럼에 DEFAULT '서울'이 정의되어 있으므로, INSERT 시 LOCATION 값을 명시하지 않으면 자동으로 '서울'이 저장된다. NOT NULL이 없으므로 NULL 입력도 허용되지만, 명시적으로 값을 제공하지 않으면 DEFAULT 값이 적용된다. (자료3 p.90~91)",
      terms: [
        "**DEFAULT**: INSERT 시 해당 컬럼 값을 명시하지 않으면 자동으로 DEFAULT 값이 입력됨",
        "**DEFAULT와 NULL의 차이**: DEFAULT는 값 미지정 시 사용. 명시적으로 NULL을 INSERT하면 NULL 저장",
        "**NOT NULL 제약조건**: 해당 컬럼에만 영향. 다른 컬럼의 NULL 허용 여부와 무관",
        "**컬럼 생략 INSERT**: INSERT INTO T (C1, C2) VALUES (v1, v2) 형태로 일부 컬럼만 지정 가능"
      ],
      wrong: [
        "1. LOCATION에 NOT NULL이 없고 DEFAULT가 있으므로 오류 없이 실행된다.",
        "2. 명시적으로 LOCATION 값을 제공하지 않으면 NULL이 아니라 DEFAULT 값 '서울'이 저장된다.",
        "3. (정답) DEFAULT '서울'이 정의되어 있으므로 LOCATION에 자동으로 '서울'이 저장된다.",
        "4. NOT NULL은 DEPT_NAME에만 적용. LOCATION 지정 강제와는 무관하다."
      ],
      tip: "DEFAULT는 INSERT 시 값 미지정일 때 자동 적용. 명시적 NULL 입력 시 NULL이 저장됨."
    }
  },

  // ============================================================
  // 토픽 156: 테이블 복제 CTAS (Q745~Q746) — 2문항, has_code: true
  // ============================================================
  {
    id: 745,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 CTAS(CREATE TABLE AS SELECT) 실행 결과에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[T1 테이블 — 원본]",
        headers: ["컬럼명", "타입", "제약조건"],
        rows: [
          ["ID",    "NUMBER(10)",   "PRIMARY KEY"],
          ["NAME",  "VARCHAR(50)",  "NOT NULL"],
          ["EMAIL", "VARCHAR(100)", "UNIQUE"],
          ["SCORE", "NUMBER(5,2)",  "DEFAULT 0, CHECK(SCORE>=0)"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE T2 AS SELECT * FROM T1 WHERE 1=0;"
      }
    ],
    choices: [
      "T2는 T1의 컬럼 구조, 데이터, 모든 제약조건(PK, UNIQUE, CHECK, DEFAULT)을 그대로 복제한다.",
      "T2는 컬럼 구조만 복제되고 데이터는 복제되지 않으며, NOT NULL 제약조건도 복제되지 않는다.",
      "T2는 컬럼 구조와 NOT NULL 제약조건은 복제되지만, PRIMARY KEY, UNIQUE, CHECK, DEFAULT는 복제되지 않는다.",
      "WHERE 1=0 조건이 있으므로 T2 테이블 자체가 생성되지 않는다."
    ],
    ans: 3,
    src: "자료3 p.91~92, TRAPS.md T-14",
    exp: {
      reason: "CTAS(CREATE TABLE AS SELECT)는 컬럼 구조(데이터 타입)와 NOT NULL 제약조건만 복제한다. PRIMARY KEY, UNIQUE, CHECK, FOREIGN KEY, DEFAULT는 복제되지 않는다. WHERE 1=0은 행을 가져오지 않는 조건이므로 구조만 복제하고 데이터는 없는 빈 테이블이 생성된다. (자료3 p.91~92, TRAPS.md T-14)",
      terms: [
        "**CTAS(CREATE TABLE AS SELECT)**: SELECT 결과로 새 테이블 생성. 컬럼명/타입/NOT NULL만 복제",
        "**복제되는 것**: 컬럼명, 데이터 타입, NOT NULL 제약조건, SELECT 결과의 데이터",
        "**복제되지 않는 것**: PRIMARY KEY, UNIQUE, CHECK, FOREIGN KEY, DEFAULT 값, 인덱스",
        "**WHERE 1=0**: 항상 거짓인 조건. 행은 0건 가져오지만 테이블 구조(컬럼)는 생성됨"
      ],
      wrong: [
        "1. CTAS는 NOT NULL을 제외한 PK, UNIQUE, CHECK, DEFAULT를 복제하지 않는다. T-14 함정.",
        "2. NOT NULL 제약조건은 CTAS로 복제된다. 자료3 p.91~92 명시.",
        "3. (정답) 컬럼 구조와 NOT NULL만 복제. PK, UNIQUE, CHECK, DEFAULT는 미복제. T-14 핵심.",
        "4. WHERE 1=0이어도 테이블 자체는 생성된다. 단지 행이 0건인 빈 테이블이 만들어진다."
      ],
      tip: "CTAS 복제 = 컬럼 타입 + NOT NULL만. PK/UNIQUE/CHECK/FK/DEFAULT는 미복제. T-14 핵심 함정."
    }
  },

  {
    id: 746,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 중 CTAS(CREATE TABLE AS SELECT) 실행 후 T2 테이블에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "table",
        title: "[PRODUCT 테이블]",
        headers: ["PROD_ID(PK)", "PROD_NAME(NOT NULL)", "CATEGORY", "PRICE(DEFAULT 1000)"],
        rows: [
          ["P001", "노트북", "전자제품", "1500000"],
          ["P002", "마우스", "전자제품",   "25000"],
          ["P003", "책상",   "가구",      "200000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE T2 AS\nSELECT PROD_ID, PROD_NAME, CATEGORY\nFROM PRODUCT\nWHERE CATEGORY = '전자제품';"
      }
    ],
    choices: [
      "T2에는 PROD_ID가 'P001'인 행과 'P002'인 행, 총 2개의 행이 저장된다.",
      "T2의 PROD_NAME 컬럼에는 NOT NULL 제약조건이 복제된다.",
      "T2의 PROD_ID 컬럼에는 PRIMARY KEY 제약조건이 복제되지 않는다.",
      "T2의 CATEGORY 컬럼에는 PRICE 컬럼의 DEFAULT 1000이 복제된다."
    ],
    ans: 4,
    src: "자료3 p.91~92, TRAPS.md T-14",
    exp: {
      reason: "PRICE 컬럼은 SELECT 절에 포함되지 않았으므로 T2에 존재하지 않는다. CATEGORY 컬럼에 PRICE의 DEFAULT 값이 복제된다는 설명은 완전히 잘못된 내용이다. 또한 CTAS는 DEFAULT 자체를 복제하지 않는다. (자료3 p.91~92, TRAPS.md T-14)",
      terms: [
        "**CTAS 복제 범위**: SELECT 절에 포함된 컬럼의 타입과 NOT NULL만 복제됨",
        "**SELECT 열 선택**: SELECT에 포함되지 않은 컬럼(PRICE)은 T2에 아예 존재하지 않음",
        "**DEFAULT 미복제**: CTAS는 DEFAULT 값을 복제하지 않음. T-14 핵심",
        "**PK 미복제**: CTAS 후 PK가 없으므로 T2의 PROD_ID는 중복 값 입력 가능"
      ],
      wrong: [
        "1. WHERE CATEGORY = '전자제품'으로 전자제품 2건(P001, P002)이 저장된다. 정확한 설명.",
        "2. PROD_NAME의 NOT NULL은 CTAS로 복제된다. 자료3 p.91~92 명시.",
        "3. PRIMARY KEY는 CTAS로 복제되지 않는다. 정확한 설명. T-14 명시.",
        "4. (정답) PRICE 컬럼은 SELECT 절에 없으므로 T2에 존재하지 않는다. CATEGORY에 PRICE DEFAULT가 복제된다는 설명은 완전 오류."
      ],
      tip: "CTAS: SELECT에 없는 컬럼은 T2에 없음. DEFAULT는 어떤 경우에도 미복제."
    }
  },

  // ============================================================
  // 토픽 157: ALTER TABLE 컬럼 조작 (Q747~Q750) — 4문항, has_code: true
  // ============================================================
  {
    id: 747,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 ALTER TABLE 문장 중 오류가 발생하는 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- 기존 EMP 테이블 컬럼: EMP_ID NUMBER(10), EMP_NAME VARCHAR(50), DEPT_ID NUMBER(5)\n\n-- ①\nALTER TABLE EMP ADD PHONE VARCHAR(20);\n\n-- ②\nALTER TABLE EMP MODIFY EMP_NAME VARCHAR(100);\n\n-- ③\nALTER TABLE EMP DROP COLUMN EMP_ID, DROP COLUMN DEPT_ID;\n\n-- ④\nALTER TABLE EMP RENAME COLUMN EMP_NAME TO NAME;"
      }
    ],
    choices: [
      "①번만 오류이다.",
      "②번만 오류이다.",
      "③번만 오류이다.",
      "④번만 오류이다."
    ],
    ans: 3,
    src: "자료3 p.92~94, SQLD_요약_서브노트 p.11",
    exp: {
      reason: "Oracle에서 ALTER TABLE DROP COLUMN은 한 번에 하나의 컬럼만 삭제할 수 있다. 여러 컬럼을 동시에 삭제하려면 ALTER TABLE EMP DROP (EMP_ID, DEPT_ID)와 같이 괄호로 묶어야 한다. ③처럼 DROP COLUMN을 쉼표로 나열하는 문법은 오류이다. (자료3 p.93, SQLD_요약_서브노트 p.11)",
      terms: [
        "**ADD**: 새 컬럼 추가. ALTER TABLE 테이블명 ADD 컬럼명 타입",
        "**MODIFY**: 기존 컬럼 타입/크기/DEFAULT 변경. ALTER TABLE 테이블명 MODIFY 컬럼명 새타입",
        "**DROP COLUMN**: 컬럼 삭제. 한 번에 하나씩. 여러 컬럼 삭제 시 DROP (컬럼1, 컬럼2) 사용",
        "**RENAME COLUMN**: 컬럼명 변경. ALTER TABLE 테이블명 RENAME COLUMN 기존명 TO 새이름"
      ],
      wrong: [
        "1. ADD PHONE VARCHAR(20)은 정상적인 컬럼 추가 문법이다.",
        "2. MODIFY EMP_NAME VARCHAR(100)은 VARCHAR 크기를 늘리는 정상 문법이다.",
        "3. (정답) DROP COLUMN을 쉼표로 연결하는 문법은 오류. Oracle은 한 번에 하나 또는 DROP (컬럼1, 컬럼2) 형태를 사용.",
        "4. RENAME COLUMN EMP_NAME TO NAME은 컬럼명 변경 정상 문법이다."
      ],
      tip: "DROP COLUMN은 한 번에 하나씩. 여러 컬럼 동시 삭제 = ALTER TABLE T DROP (C1, C2)."
    }
  },

  {
    id: 748,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 ALTER TABLE MODIFY 수행 시 오류가 발생하는 경우는?",
    blocks: [
      {
        type: "table",
        title: "[PRODUCT 테이블 현재 상태]",
        headers: ["컬럼명", "타입", "현재 데이터 예시"],
        rows: [
          ["PROD_ID",   "CHAR(10)",    "P001, P002, P003"],
          ["PROD_NAME", "VARCHAR(50)", "노트북, 마우스(21자 이하)"],
          ["PRICE",     "NUMBER(10,2)","1500000.00, 25000.00"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- ① 크기 확장\nALTER TABLE PRODUCT MODIFY PROD_NAME VARCHAR(100);\n\n-- ② 크기 축소 (기존 데이터가 20자 이하인 경우)\nALTER TABLE PRODUCT MODIFY PROD_NAME VARCHAR(20);\n\n-- ③ 크기 축소 (기존 데이터가 이미 21자 초과인 경우)\nALTER TABLE PRODUCT MODIFY PROD_NAME VARCHAR(10);\n\n-- ④ DEFAULT 변경\nALTER TABLE PRODUCT MODIFY PRICE DEFAULT 9999;"
      }
    ],
    choices: [
      "①번만 오류이다.",
      "②번만 오류이다.",
      "③번만 오류이다.",
      "④번만 오류이다."
    ],
    ans: 3,
    src: "자료3 p.92~94",
    exp: {
      reason: "컬럼 크기를 축소할 때 기존 데이터가 변경 후 크기보다 큰 경우 오류가 발생한다. ③은 기존 PROD_NAME 데이터가 21자를 초과하는 경우가 있는데 VARCHAR(10)으로 축소하려 하므로 데이터 잘림 오류가 발생한다. ②는 기존 데이터가 20자 이하이므로 VARCHAR(20)으로 축소해도 정상 처리된다. (자료3 p.92~94)",
      terms: [
        "**MODIFY 크기 확장**: 항상 가능. 기존 데이터에 영향 없음",
        "**MODIFY 크기 축소**: 기존 데이터가 새 크기 이하일 때만 가능. 초과 데이터 있으면 오류",
        "**MODIFY DEFAULT**: DEFAULT 값만 변경. 기존 데이터에 영향 없음. 새로 INSERT되는 행에만 적용",
        "**MODIFY NOT NULL 추가**: 기존에 NULL 데이터가 없을 때만 가능"
      ],
      wrong: [
        "1. VARCHAR 크기를 50에서 100으로 확장하는 것은 항상 가능하다.",
        "2. 기존 데이터가 20자 이하이므로 VARCHAR(20)으로의 축소는 오류 없이 가능하다.",
        "3. (정답) 기존 데이터 중 21자 초과 값이 있으므로 VARCHAR(10)으로 축소하면 데이터 잘림 오류가 발생한다.",
        "4. DEFAULT 값 변경은 기존 데이터와 무관하므로 오류 없이 가능하다."
      ],
      tip: "MODIFY 크기 축소 시 기존 데이터가 새 크기를 초과하면 오류. 확장과 DEFAULT 변경은 항상 가능."
    }
  },

  {
    id: 749,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 SQL 실행 순서에 따른 결과로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- 1단계: 테이블 생성\nCREATE TABLE SCORE (\n  STU_ID  NUMBER(10) PRIMARY KEY,\n  STU_NAME VARCHAR(30) NOT NULL,\n  GRADE   CHAR(1)\n);\n\n-- 2단계: 컬럼 추가\nALTER TABLE SCORE ADD DEPT_NAME VARCHAR(50);\n\n-- 3단계: 기존 컬럼 삭제\nALTER TABLE SCORE DROP COLUMN GRADE;\n\n-- 4단계: 컬럼명 변경\nALTER TABLE SCORE RENAME COLUMN STU_NAME TO NAME;"
      }
    ],
    choices: [
      "최종 테이블에는 STU_ID, STU_NAME, GRADE, DEPT_NAME 컬럼이 존재한다.",
      "최종 테이블에는 STU_ID, NAME, DEPT_NAME 컬럼이 존재한다.",
      "3단계에서 PRIMARY KEY 컬럼을 삭제하지 않았으므로 STU_ID의 PK 제약조건은 유지된다.",
      "2번과 3번 모두 정확하다."
    ],
    ans: 4,
    src: "자료3 p.92~94",
    exp: {
      reason: "2단계에서 DEPT_NAME이 추가되고, 3단계에서 GRADE가 삭제되고, 4단계에서 STU_NAME이 NAME으로 변경된다. 최종 컬럼은 STU_ID, NAME, DEPT_NAME이 된다. STU_ID의 PRIMARY KEY는 컬럼을 삭제하지 않았으므로 유지된다. 따라서 2번과 3번 모두 정확하다. (자료3 p.92~94)",
      terms: [
        "**ADD**: 새 컬럼을 테이블 마지막에 추가. 기존 컬럼에 영향 없음",
        "**DROP COLUMN**: 해당 컬럼과 컬럼의 데이터, 해당 컬럼에 걸린 제약조건을 모두 제거",
        "**RENAME COLUMN**: 컬럼명만 변경. 타입, 제약조건, 데이터는 유지",
        "**PK 유지**: PK 컬럼을 DROP하지 않는 한 PK 제약조건은 ALTER TABLE 작업 후에도 유지"
      ],
      wrong: [
        "1. GRADE는 3단계에서 삭제되었고, STU_NAME은 4단계에서 NAME으로 변경되었다. 설명이 틀렸다.",
        "2. 최종 테이블 컬럼 구성으로 정확한 설명이다.",
        "3. GRADE는 PK 컬럼이 아니므로 PK 유지와 무관. STU_ID PK는 유지된다. 정확한 설명.",
        "4. (정답) 2번과 3번 모두 정확한 설명이므로 보기 4가 정답이다."
      ],
      tip: "RENAME COLUMN은 이름만 변경, 타입/제약조건/데이터는 유지. DROP COLUMN은 해당 컬럼 완전 제거."
    }
  },

  {
    id: 750,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 ALTER TABLE 문장들 중 컬럼 제약조건을 추가하거나 삭제하는 것으로 올바른 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- ① 제약조건 추가\nALTER TABLE EMP ADD CONSTRAINT PK_EMP PRIMARY KEY (EMP_ID);\n\n-- ② 제약조건 삭제\nALTER TABLE EMP DROP CONSTRAINT PK_EMP;\n\n-- ③ 컬럼 NOT NULL 추가\nALTER TABLE EMP MODIFY EMP_NAME NOT NULL;"
      }
    ],
    choices: [
      "①만 올바른 문법이다.",
      "①과 ②만 올바른 문법이다.",
      "①, ②, ③ 모두 올바른 문법이다.",
      "①과 ③만 올바른 문법이다."
    ],
    ans: 3,
    src: "자료3 p.92~94, p.95~99",
    exp: {
      reason: "ALTER TABLE로 제약조건을 추가(ADD CONSTRAINT)하고 삭제(DROP CONSTRAINT)하는 것은 표준 DDL 문법이다. NOT NULL 제약조건은 MODIFY 절로 추가 가능하다. 단, MODIFY로 NOT NULL을 추가할 때는 기존 데이터에 NULL 값이 없어야 한다. ①, ②, ③ 모두 유효한 ALTER TABLE 문법이다. (자료3 p.92~94)",
      terms: [
        "**ADD CONSTRAINT**: 기존 테이블에 제약조건 추가. PK, FK, UNIQUE, CHECK 모두 가능",
        "**DROP CONSTRAINT**: 제약조건을 이름으로 삭제. CONSTRAINT 이름을 알아야 함",
        "**MODIFY NOT NULL**: NOT NULL 제약조건은 ADD CONSTRAINT 대신 MODIFY로 추가",
        "**NOT NULL 추가 조건**: 기존 데이터에 NULL 값이 없어야 성공. NULL 있으면 오류"
      ],
      wrong: [
        "1. ①만 올바르다는 설명은 ②, ③도 유효한 문법이므로 틀렸다.",
        "2. ①, ②만 올바르다는 설명은 ③도 유효한 문법이므로 틀렸다.",
        "3. (정답) ①, ②, ③ 모두 올바른 ALTER TABLE 문법이다. 자료3 p.92~94 명시.",
        "4. ①, ③만 올바르다는 설명은 ② DROP CONSTRAINT도 유효한 문법이므로 틀렸다."
      ],
      tip: "ADD CONSTRAINT(추가) / DROP CONSTRAINT(이름으로 삭제) / MODIFY NOT NULL(NOT NULL 추가) 모두 유효."
    }
  },

  // ============================================================
  // 토픽 158: DROP/TRUNCATE/DELETE 비교 (Q751~Q755) — 5문항, has_code: false
  // ============================================================
  {
    id: 751,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: false,
    q: "다음 중 DELETE, TRUNCATE, DROP에 대한 비교 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "DELETE는 DML이며 WHERE 조건으로 특정 행만 삭제할 수 있고, ROLLBACK이 가능하다.",
      "TRUNCATE는 DDL이며 테이블의 모든 행을 삭제하지만 테이블 구조는 유지된다.",
      "DROP은 테이블 자체를 완전히 제거하며, 인덱스와 제약조건도 함께 삭제된다.",
      "TRUNCATE는 DDL이지만 DELETE와 동일하게 UNDO 로그를 생성하므로 ROLLBACK이 가능하다."
    ],
    ans: 4,
    src: "자료3 p.94~95, TRAPS.md T-13",
    exp: {
      reason: "TRUNCATE는 DDL이므로 AUTO COMMIT되어 ROLLBACK이 불가능하다. 또한 UNDO 로그를 생성하지 않기 때문에 빠르게 동작한다. DELETE는 DML이므로 UNDO 로그를 생성하고 ROLLBACK이 가능하다. TRUNCATE가 ROLLBACK 가능하다는 설명은 대표적인 함정이다. (자료3 p.94~95, TRAPS.md T-13)",
      terms: [
        "**DELETE**: DML, 행 단위 삭제, WHERE 가능, ROLLBACK 가능, UNDO 로그 생성, 느림",
        "**TRUNCATE**: DDL, 전체 행 삭제, WHERE 불가, ROLLBACK 불가(AUTO COMMIT), UNDO 미생성, 빠름",
        "**DROP**: DDL, 테이블 자체 제거, 인덱스/제약조건/데이터 모두 삭제, ROLLBACK 불가",
        "**UNDO 로그**: 트랜잭션 롤백을 위한 이전 상태 기록. DML만 생성, DDL은 미생성"
      ],
      wrong: [
        "1. DELETE의 DML 특성, WHERE 조건 사용 가능, ROLLBACK 가능 모두 정확한 설명이다.",
        "2. TRUNCATE가 DDL이며 구조 유지하면서 전체 행 삭제. 정확한 설명.",
        "3. DROP이 테이블 자체와 인덱스/제약조건 모두 제거. 정확한 설명.",
        "4. (정답) TRUNCATE는 UNDO 로그를 생성하지 않으며, AUTO COMMIT으로 ROLLBACK 불가. T-13 핵심 함정."
      ],
      tip: "TRUNCATE = DDL = AUTO COMMIT = ROLLBACK 불가 = UNDO 미생성. T-13 핵심."
    }
  },

  {
    id: 752,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: false,
    q: "다음 중 TRUNCATE TABLE과 DELETE FROM 테이블명(WHERE 조건 없음)의 차이에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "두 명령어 모두 ROLLBACK이 가능하며 테이블의 모든 행을 삭제한다.",
      "두 명령어 모두 DDL이므로 자동으로 COMMIT된다.",
      "DELETE는 ROLLBACK이 가능하지만 TRUNCATE는 AUTO COMMIT되므로 ROLLBACK이 불가능하다.",
      "TRUNCATE는 WHERE 절을 사용하지 않으면 DELETE보다 느리게 동작한다."
    ],
    ans: 3,
    src: "자료3 p.94~95, TRAPS.md T-13",
    exp: {
      reason: "DELETE(WHERE 없음)는 모든 행을 삭제하지만 DML이므로 ROLLBACK이 가능하다. TRUNCATE는 DDL이므로 AUTO COMMIT되어 ROLLBACK이 불가능하다. 두 명령어는 결과적으로 모든 행을 삭제한다는 점은 같지만, 트랜잭션 처리 방식이 근본적으로 다르다. (자료3 p.94~95, TRAPS.md T-13)",
      terms: [
        "**DELETE (WHERE 없음)**: 전체 행 삭제. DML. ROLLBACK 가능. UNDO 생성. 행 단위 처리로 느림",
        "**TRUNCATE**: 전체 행 삭제. DDL. AUTO COMMIT. ROLLBACK 불가. UNDO 미생성. 빠름",
        "**성능 차이**: TRUNCATE는 내부적으로 테이블 세그먼트를 초기화하는 방식이라 DELETE보다 훨씬 빠름",
        "**TRUNCATE 제약**: WHERE 절 사용 불가. 트리거 미발생(Oracle 기준)"
      ],
      wrong: [
        "1. DELETE는 ROLLBACK 가능, TRUNCATE는 ROLLBACK 불가. 두 명령어가 같지 않다.",
        "2. DELETE는 DML이다. DDL은 TRUNCATE, DROP, CREATE, ALTER이다.",
        "3. (정답) DELETE(DML) = ROLLBACK 가능 / TRUNCATE(DDL) = AUTO COMMIT = ROLLBACK 불가.",
        "4. WHERE 절 없는 전체 삭제 시 TRUNCATE가 DELETE보다 훨씬 빠르다."
      ],
      tip: "DELETE = DML = ROLLBACK 가능 / TRUNCATE = DDL = ROLLBACK 불가. 이 차이가 핵심."
    }
  },

  {
    id: 753,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: false,
    q: "다음 중 DROP TABLE에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "DROP TABLE은 테이블의 모든 데이터와 구조를 함께 제거한다.",
      "DROP TABLE 실행 시 해당 테이블에 연결된 인덱스도 함께 삭제된다.",
      "DROP TABLE은 DDL이므로 AUTO COMMIT되어 ROLLBACK으로 복구할 수 없다.",
      "DROP TABLE을 실행해도 테이블 구조는 유지되며 데이터만 삭제된다."
    ],
    ans: 4,
    src: "자료3 p.94, SQLD_요약_서브노트 p.11",
    exp: {
      reason: "DROP TABLE은 테이블 구조(스키마), 데이터, 인덱스, 제약조건을 모두 제거한다. 테이블 구조가 유지된다는 설명은 TRUNCATE에 해당하는 내용이다. DROP 후에는 테이블 자체가 존재하지 않는다. (자료3 p.94)",
      terms: [
        "**DROP TABLE**: 테이블 자체를 완전 제거. 구조, 데이터, 인덱스, 제약조건 모두 삭제",
        "**TRUNCATE vs DROP**: TRUNCATE = 구조 유지 + 데이터만 삭제 / DROP = 구조 포함 모두 삭제",
        "**CASCADE CONSTRAINT**: DROP TABLE 시 다른 테이블에서 참조하는 FK 제약조건도 함께 삭제 옵션",
        "**Oracle Recycle Bin**: Oracle 10g 이상에서 DROP 후 FLASHBACK TABLE로 복구 가능. 단 PURGE 옵션 사용 시 불가"
      ],
      wrong: [
        "1. DROP TABLE은 데이터와 구조 모두 제거한다. 정확한 설명.",
        "2. 테이블 삭제 시 해당 테이블의 인덱스도 함께 삭제된다. 정확한 설명.",
        "3. DROP은 DDL, AUTO COMMIT, ROLLBACK 불가. 정확한 설명.",
        "4. (정답) DROP TABLE은 구조도 함께 삭제한다. '구조는 유지'는 TRUNCATE의 특성이다."
      ],
      tip: "DROP = 테이블 자체 소멸(구조+데이터). TRUNCATE = 구조 살고 데이터만 삭제."
    }
  },

  {
    id: 754,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: false,
    q: "다음 보기 중 각 SQL 명령어와 특성의 매칭이 모두 옳은 것은?",
    blocks: null,
    choices: [
      "DELETE - DDL - ROLLBACK 가능 - 행 단위 - UNDO 생성",
      "TRUNCATE - DML - ROLLBACK 불가 - 전체 - UNDO 미생성",
      "DELETE - DML - ROLLBACK 가능 - 행 단위 - UNDO 생성",
      "DROP - DML - ROLLBACK 불가 - 테이블 제거 - UNDO 미생성"
    ],
    ans: 3,
    src: "자료3 p.94~95, TRAPS.md T-13",
    exp: {
      reason: "DELETE는 DML이며, 행 단위로 삭제하고 UNDO 로그를 생성하므로 ROLLBACK이 가능하다. 이것이 DELETE의 모든 핵심 특성이 올바르게 나열된 유일한 보기이다. (자료3 p.94~95, TRAPS.md T-13)",
      terms: [
        "**DELETE**: DML / 행 단위(WHERE 가능) / ROLLBACK 가능 / UNDO 생성 / 느림",
        "**TRUNCATE**: DDL / 전체 삭제(WHERE 불가) / ROLLBACK 불가 / UNDO 미생성 / 빠름",
        "**DROP**: DDL / 테이블 자체 제거 / ROLLBACK 불가 / UNDO 미생성",
        "**UNDO 생성 여부**: DML(INSERT/UPDATE/DELETE)은 UNDO 생성. DDL은 UNDO 미생성"
      ],
      wrong: [
        "1. DELETE는 DML이다. DDL이 아님.",
        "2. TRUNCATE는 DDL이다. DML이 아님.",
        "3. (정답) DELETE = DML, ROLLBACK 가능, 행 단위, UNDO 생성. 모든 특성이 정확하다.",
        "4. DROP은 DDL이다. DML이 아님."
      ],
      tip: "DELETE = DML = ROLLBACK 가능. TRUNCATE/DROP = DDL = ROLLBACK 불가. 반드시 암기."
    }
  },

  {
    id: 755,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: false,
    q: "다음 중 TRUNCATE TABLE의 특성에 대한 설명으로 옳은 것만 모두 고른 것은?",
    blocks: null,
    choices: [
      "ㄱ: TRUNCATE는 DML이므로 ROLLBACK이 가능하다.\nㄴ: TRUNCATE는 WHERE 절을 사용하여 특정 행만 삭제할 수 없다.\nㄷ: TRUNCATE는 테이블 구조를 유지하면서 모든 행을 삭제한다.\nㄹ: TRUNCATE는 UNDO 로그를 생성하므로 DELETE보다 느리다.",
      "ㄴ, ㄷ",
      "ㄱ, ㄷ",
      "ㄴ, ㄷ, ㄹ"
    ],
    ans: 2,
    src: "자료3 p.94~95, TRAPS.md T-13",
    exp: {
      reason: "ㄴ(WHERE 절 사용 불가)과 ㄷ(구조 유지, 전체 행 삭제)이 TRUNCATE의 올바른 특성이다. ㄱ은 TRUNCATE는 DDL이므로 ROLLBACK 불가가 정확한 내용이고, ㄹ은 TRUNCATE는 UNDO 로그를 생성하지 않아 DELETE보다 빠르다. (자료3 p.94~95, TRAPS.md T-13)",
      terms: [
        "**TRUNCATE 특성 정리**: DDL / WHERE 불가 / 구조 유지 + 전체 행 삭제 / AUTO COMMIT / ROLLBACK 불가 / UNDO 미생성 / DELETE보다 빠름",
        "**WHERE 절 제한**: TRUNCATE는 조건부 삭제 불가. 조건부 삭제는 DELETE만 가능",
        "**UNDO 미생성**: TRUNCATE는 내부적으로 HWM(High Watermark)를 초기화. 행 단위 처리 없음",
        "**속도 비교**: TRUNCATE > DELETE (UNDO 생성 없음, 블록 초기화 방식)"
      ],
      wrong: [
        "1. ㄴ, ㄷ이 옳은 설명이다. 이 보기의 ㄱ 설명은 문제 내용이므로, 정답 선택지로 보기 2번(ㄴ, ㄷ)을 고른다.",
        "2. (정답) ㄴ(WHERE 불가)과 ㄷ(구조 유지, 전체 행 삭제)만 TRUNCATE의 올바른 특성이다.",
        "3. ㄱ(TRUNCATE는 DDL, ROLLBACK 불가)이 틀렸으므로 ㄱ 포함 보기는 오답.",
        "4. ㄹ(UNDO 미생성으로 DELETE보다 빠름)이 틀렸으므로 오답."
      ],
      tip: "TRUNCATE: ①DDL ②AUTO COMMIT ③ROLLBACK 불가 ④WHERE 불가 ⑤구조 유지 ⑥UNDO 미생성 ⑦빠름."
    }
  },

  // ============================================================
  // 토픽 159: 제약조건 종류 (Q756~Q760) — 5문항, has_code: true
  // ============================================================
  {
    id: 756,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: false,
    q: "다음 중 PRIMARY KEY 제약조건에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "PRIMARY KEY 컬럼은 NULL 값을 가질 수 없으며 중복 값을 허용하지 않는다.",
      "하나의 테이블에 PRIMARY KEY는 하나만 정의할 수 있다.",
      "PRIMARY KEY를 정의하면 자동으로 UNIQUE 인덱스가 생성된다.",
      "PRIMARY KEY로 지정된 컬럼에는 별도로 NOT NULL을 명시해야 NULL 값이 입력되지 않는다."
    ],
    ans: 4,
    src: "자료3 p.95~96, 2024개정판_SQLD_개념정리 p.25",
    exp: {
      reason: "PRIMARY KEY는 정의 자체에 NOT NULL + UNIQUE가 포함되어 있다. 별도로 NOT NULL을 명시하지 않아도 PK 컬럼에는 자동으로 NULL 입력이 금지된다. 별도 NOT NULL 명시가 필요하다는 설명은 틀렸다. (자료3 p.95~96)",
      terms: [
        "**PRIMARY KEY = NOT NULL + UNIQUE**: PK 지정 시 자동으로 NOT NULL과 UNIQUE 속성이 부여됨",
        "**테이블당 PK 1개**: 하나의 테이블에 PK는 단 하나. 여러 컬럼을 묶어 복합 PK는 가능",
        "**UNIQUE 인덱스 자동 생성**: Oracle에서 PK 생성 시 UNIQUE 인덱스가 자동으로 생성됨",
        "**복합 PK**: 여러 컬럼의 조합으로 PK 구성 가능. 각 컬럼은 개별적으로 NULL 불허"
      ],
      wrong: [
        "1. PK 컬럼은 NOT NULL + UNIQUE. NULL 불가, 중복 불가. 정확한 설명.",
        "2. 테이블당 PK는 하나만 정의 가능. 정확한 설명.",
        "3. PK 생성 시 UNIQUE 인덱스가 자동 생성됨. 정확한 설명.",
        "4. (정답) PK는 자동으로 NOT NULL을 포함. 별도 명시 불필요. 자료3 p.95~96 명시."
      ],
      tip: "PK = NOT NULL + UNIQUE 자동 포함. 별도 NOT NULL 명시 불필요."
    }
  },

  {
    id: 757,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: false,
    q: "다음 중 UNIQUE 제약조건에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "UNIQUE 제약조건이 있는 컬럼에는 NULL 값을 입력할 수 없다.",
      "UNIQUE 제약조건이 있는 컬럼에는 NULL 값이 여러 개 허용된다.",
      "하나의 테이블에 UNIQUE 제약조건은 하나만 정의할 수 있다.",
      "UNIQUE 제약조건을 정의하면 PRIMARY KEY와 동일하게 NOT NULL 속성이 자동으로 추가된다."
    ],
    ans: 2,
    src: "자료3 p.96~97",
    exp: {
      reason: "UNIQUE 제약조건은 중복된 값을 허용하지 않지만 NULL 값은 허용한다. NULL은 '알 수 없는 값'으로 서로 다른 값으로 취급되므로 UNIQUE 컬럼에 여러 개의 NULL을 입력할 수 있다. 이는 PRIMARY KEY(NULL 불허)와의 차이점이다. (자료3 p.96~97)",
      terms: [
        "**UNIQUE**: 중복 값 불허, NULL 허용(여러 NULL 가능)",
        "**PRIMARY KEY vs UNIQUE**: PK = NOT NULL + 중복 불허 / UNIQUE = NULL 허용 + 중복 불허",
        "**NULL 여러 개 허용**: NULL은 서로 다른 값으로 취급. 따라서 UNIQUE 컬럼에 NULL 여러 개 입력 가능",
        "**테이블당 UNIQUE 수**: UNIQUE는 여러 개 정의 가능. PK는 하나만 가능"
      ],
      wrong: [
        "1. UNIQUE 컬럼에는 NULL 입력이 허용된다. NULL 입력 불가는 NOT NULL이나 PK의 특성.",
        "2. (정답) UNIQUE 컬럼에 NULL은 여러 개 허용됨. NULL은 서로 다른 값으로 취급되므로. 자료3 p.96~97.",
        "3. UNIQUE는 하나의 테이블에 여러 개 정의 가능. PK만 하나 제한.",
        "4. UNIQUE는 NOT NULL을 자동 추가하지 않는다. NOT NULL 추가는 PK만의 특성."
      ],
      tip: "UNIQUE = 중복 불허 + NULL 허용(여러 NULL 가능). PK는 NULL 불허. 핵심 차이."
    }
  },

  {
    id: 758,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 CREATE TABLE 문장에서 CHECK 제약조건에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE EMPLOYEE (\n  EMP_ID    NUMBER(10)  PRIMARY KEY,\n  EMP_NAME  VARCHAR(50) NOT NULL,\n  GENDER    CHAR(1)     CHECK (GENDER IN ('M', 'F')),\n  AGE       NUMBER(3)   CHECK (AGE BETWEEN 18 AND 65),\n  SALARY    NUMBER(12,2) DEFAULT 3000000\n);"
      }
    ],
    choices: [
      "GENDER 컬럼에 'M', 'F' 외에 NULL 값은 입력할 수 없다.",
      "AGE 컬럼에 17을 입력하면 CHECK 제약조건 위반으로 오류가 발생한다.",
      "SALARY 컬럼에도 CHECK 제약조건이 암묵적으로 0 이상으로 설정된다.",
      "CHECK 제약조건은 테이블 전체 행에 대한 집계 조건을 사용할 수 있다."
    ],
    ans: 2,
    src: "자료3 p.97",
    exp: {
      reason: "AGE CHECK (AGE BETWEEN 18 AND 65)는 18 이상 65 이하만 허용한다. AGE에 17을 입력하면 이 범위를 벗어나므로 CHECK 제약조건 위반 오류가 발생한다. (자료3 p.97)",
      terms: [
        "**CHECK (조건)**: 컬럼에 허용 가능한 값의 조건을 정의. 조건 위반 시 INSERT/UPDATE 오류",
        "**CHECK와 NULL**: CHECK 제약조건이 있어도 NULL은 기본적으로 허용됨. NULL 입력을 막으려면 NOT NULL 추가 필요",
        "**BETWEEN a AND b**: a 이상 b 이하. BETWEEN 18 AND 65는 18~65 허용",
        "**CHECK 제약 제한**: 집계 함수(SUM, COUNT 등) 사용 불가. 다른 행의 값 참조 불가"
      ],
      wrong: [
        "1. CHECK 제약조건이 있어도 NULL은 허용된다. 'M', 'F'와 NULL이 모두 가능. NULL 금지는 NOT NULL로 추가해야 함.",
        "2. (정답) AGE BETWEEN 18 AND 65에서 17은 18 미만으로 범위 벗어남. 오류 발생. 자료3 p.97.",
        "3. SALARY 컬럼에는 DEFAULT만 있고 CHECK 제약조건이 없다. 암묵적 CHECK는 없다.",
        "4. CHECK 제약조건은 행 단위 조건만 가능. 집계 함수(SUM, COUNT)나 다른 행 참조 불가."
      ],
      tip: "CHECK = 행 단위 조건. NULL은 CHECK 있어도 허용됨(별도 NOT NULL 필요). 집계 함수 사용 불가."
    }
  },

  {
    id: 759,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 CREATE TABLE 문장에서 FOREIGN KEY 제약조건에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE DEPT (\n  DEPT_ID   NUMBER(5)   PRIMARY KEY,\n  DEPT_NAME VARCHAR(50) NOT NULL\n);\n\nCREATE TABLE EMP (\n  EMP_ID   NUMBER(10)  PRIMARY KEY,\n  EMP_NAME VARCHAR(50) NOT NULL,\n  DEPT_ID  NUMBER(5),\n  CONSTRAINT FK_EMP_DEPT\n    FOREIGN KEY (DEPT_ID) REFERENCES DEPT(DEPT_ID)\n);"
      }
    ],
    choices: [
      "EMP 테이블의 DEPT_ID는 DEPT 테이블의 DEPT_ID에 없는 값도 입력 가능하다.",
      "DEPT 테이블에서 EMP 테이블이 참조 중인 DEPT_ID 행을 기본 설정으로는 삭제할 수 없다.",
      "EMP 테이블의 DEPT_ID에 NOT NULL이 없으므로 FK 제약조건이 자동으로 NOT NULL을 추가한다.",
      "FOREIGN KEY는 반드시 참조 테이블의 UNIQUE 컬럼을 참조해야 하므로 DEPT_ID가 UNIQUE가 아니면 오류이다."
    ],
    ans: 2,
    src: "자료3 p.97~98",
    exp: {
      reason: "FOREIGN KEY로 참조되고 있는 부모 테이블(DEPT)의 행을 삭제하려 할 때, 자식 테이블(EMP)에서 참조 중인 경우 기본적으로 삭제가 제한된다. ON DELETE CASCADE나 ON DELETE SET NULL 등의 옵션을 명시해야 연쇄 처리된다. (자료3 p.97~98)",
      terms: [
        "**FOREIGN KEY**: 자식 테이블의 컬럼이 부모 테이블의 PK 또는 UNIQUE 컬럼을 참조",
        "**참조 무결성**: FK 컬럼에는 부모 테이블에 존재하는 값 또는 NULL만 입력 가능",
        "**부모 행 삭제 제한**: 자식에서 참조 중인 부모 행은 기본적으로 삭제 불가(RESTRICT/NO ACTION)",
        "**FK와 NULL**: FK 컬럼에 NULL은 허용됨. NULL은 '참조 없음'을 의미하며 무결성 제약 위반 아님"
      ],
      wrong: [
        "1. FK 제약조건이 있으면 DEPT 테이블에 없는 DEPT_ID 값 입력 시 참조 무결성 위반 오류가 발생한다.",
        "2. (정답) 기본 설정(RESTRICT)에서는 자식이 참조 중인 부모 행 삭제 불가. 자료3 p.97~98.",
        "3. FK 제약조건은 NOT NULL을 자동 추가하지 않는다. EMP.DEPT_ID에 NULL 입력 허용.",
        "4. FK는 참조 테이블의 PK 또는 UNIQUE 컬럼을 참조해야 한다. DEPT_ID는 DEPT 테이블의 PK이므로 정상이다."
      ],
      tip: "FK = 참조 무결성. 기본 설정에서 참조 중인 부모 행 삭제 불가. FK 컬럼에 NULL은 허용."
    }
  },

  {
    id: 760,
    subj: 2,
    topic: "2-Q",
    topic_name: "DDL",
    diff: "중",
    has_code: true,
    q: "다음 중 각 제약조건의 특성을 설명한 것으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "CREATE TABLE SAMPLE (\n  COL_A NUMBER(10)  PRIMARY KEY,\n  COL_B VARCHAR(50) NOT NULL,\n  COL_C VARCHAR(50) UNIQUE,\n  COL_D NUMBER(3)   CHECK (COL_D > 0),\n  COL_E NUMBER(5)   REFERENCES PARENT_TABLE(PARENT_ID)\n);"
      }
    ],
    choices: [
      "COL_A는 NULL 입력 불가, 중복 불가이다.",
      "COL_B는 NULL 입력 불가이며, 중복된 값은 입력 가능하다.",
      "COL_C는 중복 값 입력 불가이며, NULL 값도 허용되지 않는다.",
      "COL_D에 0 또는 음수를 입력하면 제약조건 위반으로 오류가 발생한다."
    ],
    ans: 3,
    src: "자료3 p.95~99",
    exp: {
      reason: "COL_C는 UNIQUE 제약조건만 있다. UNIQUE는 중복 값을 허용하지 않지만 NULL 값은 허용한다. 여러 NULL 값도 입력 가능하다. 'NULL도 허용되지 않는다'는 설명은 NOT NULL 또는 PRIMARY KEY의 특성이며, UNIQUE만으로는 NULL이 허용된다. (자료3 p.96~97)",
      terms: [
        "**PRIMARY KEY(COL_A)**: NOT NULL + UNIQUE 자동 포함",
        "**NOT NULL(COL_B)**: NULL 입력 불가. 중복 허용",
        "**UNIQUE(COL_C)**: 중복 불허. NULL 허용(여러 NULL 가능)",
        "**CHECK(COL_D > 0)**: 0 초과 값만 허용. 0과 음수는 오류. NULL은 허용"
      ],
      wrong: [
        "1. PRIMARY KEY = NOT NULL + UNIQUE. COL_A는 NULL 불가, 중복 불가. 정확한 설명.",
        "2. NOT NULL = NULL 불가. 중복은 허용. COL_B의 특성 정확히 설명.",
        "3. (정답) UNIQUE는 중복 불허지만 NULL은 허용됨. 'NULL도 허용 안 된다'는 틀린 설명. 자료3 p.96~97.",
        "4. CHECK (COL_D > 0)은 0 초과만 허용. 0 또는 음수 입력 시 오류 발생. 정확한 설명."
      ],
      tip: "UNIQUE = 중복 불허 + NULL 허용. NULL 불허는 NOT NULL 또는 PRIMARY KEY."
    }
  }

];

module.exports = q2Part1;

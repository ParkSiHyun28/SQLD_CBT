// 2-A: Q601~Q610 (관계형 데이터베이스 개요)
// 자료3 p.23~28 기반.
const a2Part1 = [
  // ============================================================
  // 토픽 56: RDB/DBMS 개념 (Q601~Q602) - 2문항
  // ============================================================
  {
    id: 601,
    subj: 2,
    topic: "2-A",
    topic_name: "관계형 데이터베이스",
    diff: "하",
    has_code: false,
    q: "다음 중 DBMS(Database Management System)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "데이터를 효율적으로 관리하기 위한 시스템이다.",
      "데이터의 손상을 피하며 필요한 데이터를 복구해주는 기능을 제공한다.",
      "MySQL, ORACLE 등이 대표적인 DBMS 제품에 해당한다.",
      "DBMS는 파일 시스템과 동일한 방식으로 데이터를 저장하므로 별도의 관리 기능이 없다."
    ],
    ans: 4,
    src: "자료3 p.23",
    exp: {
      reason: "DBMS는 파일 시스템과 달리 데이터를 효율적으로 관리하고, 손상 복구, 무결성 유지 등 다양한 관리 기능을 제공한다. 파일 시스템은 1960년대 방식으로 DBMS 등장 이전에 사용되던 방법이며, DBMS는 이를 개선하기 위해 등장했다. (자료3 p.23)",
      terms: [
        "**DBMS**: 데이터를 효율적으로 관리하기 위한 시스템. 복구 기능 포함",
        "**파일 시스템**: 1960년대 파일 구조를 통해 데이터를 저장하던 방식. DBMS 이전 방식",
        "**관계형 DBMS(RDBMS)**: 관계형 데이터베이스를 관리하는 DBMS. SQL 문으로 관리",
        "**대표 제품**: MySQL, ORACLE, SQL Server, DB2, Sybase 등"
      ],
      wrong: [
        "1. 자료3 p.23에 명시된 DBMS의 정의 그대로다.",
        "2. 자료3 p.23에 명시된 DBMS의 핵심 기능이다.",
        "3. 자료3 p.23 예시에 MySQL, ORACLE이 명시되어 있다.",
        "4. (정답) DBMS는 파일 시스템과 다르다. DBMS는 데이터 관리, 복구, 무결성 보장 등 파일 시스템에 없는 기능을 제공한다."
      ],
      tip: "DBMS = 파일 시스템의 한계를 극복하기 위해 등장. 파일 시스템과 동일하다는 설명은 항상 오답."
    }
  },
  {
    id: 602,
    subj: 2,
    topic: "2-A",
    topic_name: "관계형 데이터베이스",
    diff: "하",
    has_code: false,
    q: "다음 중 관계형 데이터베이스(Relational Database, RDB)에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "1960년대 파일 구조를 통해 데이터를 저장하는 방식으로 처음 등장했다.",
      "계층형(Hierarchical) 데이터베이스가 발전한 형태로, 1970년대부터 상용화되었다.",
      "1970년 E. F. Codd 박사의 논문에서 처음 소개되었으며, SQL 문에 의해 관리된다.",
      "관계형 데이터베이스는 SQL 문이 아닌 전용 쿼리 언어를 별도로 사용해야 한다."
    ],
    ans: 3,
    src: "자료3 p.23",
    exp: {
      reason: "관계형 데이터베이스는 1970년 영국의 수학자 E. F. Codd 박사의 논문에서 처음 소개되었으며, SQL 문에 의해 관리된다. 1980년대에 상용화되었다. (자료3 p.23)",
      terms: [
        "**E. F. Codd**: 1970년 관계형 데이터베이스 개념을 최초로 제안한 영국 수학자",
        "**RDB 등장 시기**: 1970년 논문 발표, 1980년대 상용화",
        "**SQL**: 관계형 데이터베이스를 관리하는 표준 언어",
        "**데이터베이스 발전**: 파일시스템(1960) → 계층형/망형(1970) → 관계형(1980) → 객체 관계형(1990)"
      ],
      wrong: [
        "1. 1960년대 파일 구조 방식은 관계형 데이터베이스가 아니라 파일 시스템이다.",
        "2. 관계형 DB는 계층형 DB가 발전한 것이 아니라 별개의 모델로 E. F. Codd가 1970년에 제안했다.",
        "3. (정답) 1970년 E. F. Codd 박사 논문에서 소개되었고 SQL 문으로 관리된다는 설명이 모두 정확하다.",
        "4. 관계형 데이터베이스는 SQL 문으로 관리된다. 별도의 전용 언어가 필요하다는 설명은 틀렸다."
      ],
      tip: "RDB 창시자 = E. F. Codd, 1970년. 관계형 DB 관리 언어 = SQL. 이 두 가지는 단골 출제 포인트."
    }
  },

  // ============================================================
  // 토픽 57: 테이블 구성과 특징 (Q603~Q604) - 2문항
  // ============================================================
  {
    id: 603,
    subj: 2,
    topic: "2-A",
    topic_name: "관계형 데이터베이스",
    diff: "하",
    has_code: false,
    q: "다음 중 관계형 데이터베이스의 테이블 구성 요소에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "컬럼(열)은 테이블에서 세로 방향으로 이루어진 개별 속성이며 필드(Field)라고도 한다.",
      "로우(행)는 테이블에서 가로 방향으로 이루어진 연결된 데이터이며 레코드 또는 튜플이라고도 한다.",
      "기본키(Primary Key)는 각 행을 고유하게 식별하는 컬럼이며, NULL 값과 중복 값을 허용한다.",
      "외부키(Foreign Key)는 다른 테이블의 기본키를 참조하여 테이블 간 관계를 정의하는 컬럼이다."
    ],
    ans: 3,
    src: "자료3 p.23~24",
    exp: {
      reason: "기본키(Primary Key)는 각 행을 고유하게 식별해야 하므로 NULL 값과 중복 값을 허용하지 않는다. PK는 UNIQUE하면서 NOT NULL이어야 한다는 것이 개체 무결성 제약의 핵심이다. (자료3 p.23~24)",
      terms: [
        "**컬럼(열)**: 세로 방향 개별 속성. 더 이상 나눌 수 없는 특성. 필드(Field)라고도 함",
        "**로우(행)**: 가로 방향 연결 데이터. 레코드(Record) 또는 튜플(Tuple)이라고도 함",
        "**기본키(PK)**: 각 행을 고유 식별하는 컬럼. NOT NULL + UNIQUE 조건 필수",
        "**외부키(FK)**: 다른 테이블의 PK를 참조하는 컬럼. 테이블 간 관계 정의"
      ],
      wrong: [
        "1. 자료3 p.23에 명시된 컬럼의 정의 그대로다.",
        "2. 자료3 p.23에 명시된 로우의 정의 그대로다.",
        "3. (정답) 기본키는 NULL 값과 중복 값을 허용하지 않는다. PK는 UNIQUE하면서 NOT NULL이어야 한다.",
        "4. 자료3 p.23에 명시된 외부키의 정의 그대로다."
      ],
      tip: "PK = NOT NULL + UNIQUE. NULL 허용 또는 중복 허용이라는 보기는 항상 오답."
    }
  },
  {
    id: 604,
    subj: 2,
    topic: "2-A",
    topic_name: "관계형 데이터베이스",
    diff: "하",
    has_code: false,
    q: "다음 중 테이블의 특징에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "하나의 테이블은 반드시 하나의 유저(계정)가 소유해야 한다.",
      "테이블명은 중복될 수 없으나 소유자가 다르다면 같은 이름으로 생성될 수 있다.",
      "테이블은 행 단위로 데이터가 입력, 삭제되며 수정은 값의 단위로 가능하다.",
      "테이블 간 관계는 1:1만 가능하며, 1:N 또는 N:M 관계는 지원하지 않는다."
    ],
    ans: 4,
    src: "자료3 p.24",
    exp: {
      reason: "테이블 간 관계는 1:1, 1:N, N:M 모두 가능하다. 자료3 p.24에 '테이블간 관계: 1:1, 1:N, N:N'이 명시되어 있다. (자료3 p.24)",
      terms: [
        "**테이블 소유**: 하나의 테이블은 반드시 하나의 유저(계정)가 소유",
        "**테이블명 중복**: 같은 계정 내에서는 불가, 소유자가 다르면 같은 이름 가능",
        "**데이터 조작 단위**: 입력/삭제는 행(Row) 단위, 수정은 값(셀) 단위",
        "**테이블 간 관계**: 1:1, 1:N, N:M(N:N) 세 가지 모두 지원"
      ],
      wrong: [
        "1. 자료3 p.24에 명시된 테이블 소유 규칙 그대로다.",
        "2. 자료3 p.24에 명시된 테이블명 중복 규칙 그대로다.",
        "3. 자료3 p.24에 명시된 데이터 조작 단위 그대로다.",
        "4. (정답) 테이블 간 관계는 1:1, 1:N, N:M 모두 가능하다. 1:1만 가능하다는 설명은 틀렸다."
      ],
      tip: "테이블 관계 종류 = 1:1, 1:N, N:M. 세 가지 모두 기억. 수정은 '값 단위', 삭제/입력은 '행 단위'도 함께 암기."
    }
  },

  // ============================================================
  // 토픽 58: SQL 문장 분류 DML/DDL/DCL/TCL (Q605~Q607) - 3문항
  // ============================================================
  {
    id: 605,
    subj: 2,
    topic: "2-A",
    topic_name: "관계형 데이터베이스",
    diff: "하",
    has_code: false,
    q: "다음 중 SQL 명령어의 분류와 해당 명령어의 연결이 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "DML(데이터 조작어) - SELECT, INSERT, UPDATE, DELETE",
      "DDL(데이터 정의어) - CREATE, ALTER, DROP, RENAME",
      "DCL(데이터 제어어) - GRANT, REVOKE",
      "TCL(트랜잭션 제어어) - CREATE, COMMIT, ROLLBACK"
    ],
    ans: 4,
    src: "자료3 p.28",
    exp: {
      reason: "TCL(트랜잭션 제어어)에는 COMMIT, ROLLBACK, SAVEPOINT가 속한다. CREATE는 DDL(데이터 정의어)에 해당한다. (자료3 p.28)",
      terms: [
        "**DML**: SELECT, INSERT, UPDATE, DELETE, MERGE. 사용자가 직접 COMMIT 필요",
        "**DDL**: CREATE, ALTER, DROP, RENAME, TRUNCATE. AUTO COMMIT으로 ROLLBACK 불가",
        "**DCL**: GRANT(권한 부여), REVOKE(권한 회수). 접근 제어 명령어",
        "**TCL**: COMMIT, ROLLBACK, SAVEPOINT. DML 작업 단위를 트랜잭션으로 제어"
      ],
      wrong: [
        "1. 자료3 p.28에 명시된 DML 명령어 그대로다.",
        "2. 자료3 p.28에 명시된 DDL 명령어 그대로다.",
        "3. 자료3 p.28에 명시된 DCL 명령어 그대로다.",
        "4. (정답) CREATE는 DDL이다. TCL은 COMMIT, ROLLBACK, SAVEPOINT이며 CREATE는 포함되지 않는다."
      ],
      tip: "TCL = COMMIT, ROLLBACK, SAVEPOINT. CREATE가 TCL에 섞이는 함정 보기를 조심할 것."
    }
  },
  {
    id: 606,
    subj: 2,
    topic: "2-A",
    topic_name: "관계형 데이터베이스",
    diff: "하",
    has_code: false,
    q: "다음 중 DDL(데이터 정의어, Data Definition Language)에 해당하는 명령어로만 묶인 것은?",
    blocks: null,
    choices: [
      "SELECT, INSERT, UPDATE",
      "CREATE, ALTER, DROP, RENAME, TRUNCATE",
      "GRANT, REVOKE, COMMIT",
      "COMMIT, ROLLBACK, SAVEPOINT"
    ],
    ans: 2,
    src: "자료3 p.28",
    exp: {
      reason: "DDL에는 CREATE, ALTER, DROP, RENAME이 기본으로 포함되며, TRUNCATE도 DDL에 해당한다(AUTO COMMIT). SELECT/INSERT/UPDATE는 DML, GRANT/REVOKE는 DCL, COMMIT/ROLLBACK/SAVEPOINT는 TCL이다. (자료3 p.28)",
      terms: [
        "**TRUNCATE**: DDL에 속하며 AUTO COMMIT 처리. ROLLBACK 불가. DELETE와 혼동 주의(DELETE는 DML)",
        "**DDL AUTO COMMIT**: DDL 명령은 실행 즉시 자동 커밋되어 취소 불가",
        "**RENAME**: 테이블 이름 변경 명령어. DDL에 해당",
        "**ALTER**: 테이블 구조 변경(컬럼 추가/수정/삭제). DDL에 해당"
      ],
      wrong: [
        "1. SELECT, INSERT, UPDATE는 DML(데이터 조작어)에 해당한다.",
        "2. (정답) CREATE, ALTER, DROP, RENAME, TRUNCATE 모두 DDL에 해당한다.",
        "3. GRANT, REVOKE는 DCL이고 COMMIT은 TCL이다. 서로 다른 분류가 섞여 있다.",
        "4. COMMIT, ROLLBACK, SAVEPOINT는 TCL(트랜잭션 제어어)에 해당한다."
      ],
      tip: "TRUNCATE는 DDL이라 ROLLBACK 불가. DELETE는 DML이라 ROLLBACK 가능. 이 차이가 자주 출제됨."
    }
  },
  {
    id: 607,
    subj: 2,
    topic: "2-A",
    topic_name: "관계형 데이터베이스",
    diff: "하",
    has_code: false,
    q: "다음 중 DML(데이터 조작어)과 DDL(데이터 정의어)의 차이점에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "DML은 AUTO COMMIT이 적용되어 실행 후 ROLLBACK이 불가능하다.",
      "DDL은 사용자가 직접 COMMIT을 실행해야 변경 사항이 저장된다.",
      "DML은 사용자가 직접 COMMIT을 해야 하며, DDL은 AUTO COMMIT이 적용된다.",
      "DML과 DDL 모두 AUTO COMMIT이 적용되어 ROLLBACK이 불가능하다."
    ],
    ans: 3,
    src: "자료3 p.28",
    exp: {
      reason: "DML은 사용자가 직접 COMMIT을 해야 저장되며 ROLLBACK이 가능하다. 반면 DDL은 AUTO COMMIT이 적용되어 실행 즉시 저장되며 ROLLBACK이 불가능하다. (자료3 p.28)",
      terms: [
        "**DML COMMIT**: DML 실행 후 사용자가 직접 COMMIT 또는 ROLLBACK을 결정",
        "**DDL AUTO COMMIT**: DDL은 실행 즉시 자동 커밋. 취소 불가",
        "**ROLLBACK**: 아직 COMMIT되지 않은 DML 변경 사항을 이전 상태로 되돌리는 명령",
        "**TCL과의 관계**: TCL(COMMIT, ROLLBACK, SAVEPOINT)은 DML의 작업 단위를 제어하기 위해 존재"
      ],
      wrong: [
        "1. AUTO COMMIT이 적용되어 ROLLBACK 불가능한 것은 DML이 아니라 DDL이다.",
        "2. 사용자가 직접 COMMIT을 해야 하는 것은 DDL이 아니라 DML이다.",
        "3. (정답) DML은 사용자 COMMIT 필요, DDL은 AUTO COMMIT 적용. 자료3 p.28 내용 그대로다.",
        "4. DML은 AUTO COMMIT이 아니다. 사용자가 직접 COMMIT 또는 ROLLBACK을 결정해야 한다."
      ],
      tip: "DML = 수동 COMMIT (ROLLBACK 가능). DDL = 자동 COMMIT (ROLLBACK 불가). 반대로 외우면 안 됨."
    }
  },

  // ============================================================
  // 토픽 59: 데이터 무결성 종류 (Q608~Q610) - 3문항
  // ============================================================
  {
    id: 608,
    subj: 2,
    topic: "2-A",
    topic_name: "관계형 데이터베이스",
    diff: "중",
    has_code: false,
    q: "다음 중 데이터 무결성(Integrity) 종류와 그 설명의 연결이 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "개체 무결성 - 테이블의 기본키를 구성하는 컬럼은 NULL 값과 중복 값을 가질 수 없다.",
      "참조 무결성 - 외래키는 NULL이거나, 참조하는 테이블의 기본키에 실제로 존재하는 값이어야 한다.",
      "도메인 무결성 - 주어진 속성 값이 정의된 도메인에 속한 값이어야 한다.",
      "NULL 무결성 - 테이블 간 관계에서 반드시 하나 이상의 키가 존재해야 한다는 제약이다."
    ],
    ans: 4,
    src: "자료3 p.25",
    exp: {
      reason: "NULL 무결성은 특정 속성에 대해 NULL을 허용하지 않는 제약이다. '테이블 간 관계에서 반드시 하나 이상의 키가 존재해야 한다'는 설명은 키 무결성(Key Integrity)에 해당한다. (자료3 p.25)",
      terms: [
        "**개체 무결성**: 기본키(PK)는 NULL 값과 중복 값 모두 불허",
        "**참조 무결성**: 외래키(FK)는 NULL이거나 참조 테이블 PK에 실제 존재하는 값이어야 함",
        "**도메인 무결성**: 속성 값이 정의된 도메인(데이터 타입, 범위 등) 내의 값이어야 함",
        "**NULL 무결성**: 특정 속성에 NULL을 허용하지 않는 제약 (NOT NULL 제약)",
        "**키 무결성**: 하나의 관계에는 적어도 하나의 키가 존재해야 함"
      ],
      wrong: [
        "1. 자료3 p.25에 명시된 개체 무결성 정의 그대로다.",
        "2. 자료3 p.25에 명시된 참조 무결성 정의 그대로다.",
        "3. 자료3 p.25에 명시된 도메인 무결성 정의 그대로다.",
        "4. (정답) 해당 설명은 키 무결성이다. NULL 무결성은 특정 속성에 NULL을 허용하지 않는 제약이다."
      ],
      tip: "NULL 무결성 ≠ 키 무결성. NULL 무결성 = NOT NULL 제약. 키 무결성 = 테이블에 키가 반드시 존재해야 함."
    }
  },
  {
    id: 609,
    subj: 2,
    topic: "2-A",
    topic_name: "관계형 데이터베이스",
    diff: "중",
    has_code: false,
    q: "다음 중 개체 무결성 제약(Entity Integrity Constraints)에 대한 설명으로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "외래키(FK)에 대한 제약으로, 참조되는 테이블의 기본키 값과 일치해야 한다.",
      "기본키(PK)는 UNIQUE하면서 NOT NULL이어야 하며, PK에 대한 제약이 개체 무결성 제약이다.",
      "속성 값이 정의된 도메인(데이터 타입, 허용 범위)에 속한 값이어야 한다는 제약이다.",
      "특정 속성에 대해 값이 중복되지 않아야 한다는 고유 무결성 제약과 동일하다."
    ],
    ans: 2,
    src: "자료3 p.25",
    exp: {
      reason: "개체 무결성 제약은 기본키(PK)에 대한 제약으로, PK는 UNIQUE하면서 NOT NULL이어야 한다. (자료3 p.25)",
      terms: [
        "**개체 무결성**: 기본키(PK)에 대한 제약. PK = UNIQUE + NOT NULL",
        "**참조 무결성**: 외래키(FK)에 대한 제약. FK는 NULL이거나 참조 PK에 실제 존재하는 값",
        "**도메인 무결성**: 속성 값이 도메인 내의 값이어야 하는 제약",
        "**고유 무결성**: 특정 속성에 대해 값이 중복되지 않아야 하는 제약 (UNIQUE 제약)"
      ],
      wrong: [
        "1. FK에 대한 제약은 개체 무결성이 아니라 참조 무결성이다.",
        "2. (정답) 개체 무결성은 PK에 대한 제약으로, PK는 UNIQUE하면서 NOT NULL이어야 한다. 자료3 p.25 내용 그대로다.",
        "3. 속성 값이 도메인에 속해야 한다는 것은 도메인 무결성이다.",
        "4. 개체 무결성과 고유 무결성은 다른 개념이다. 고유 무결성은 UNIQUE 제약이고, 개체 무결성은 PK에 대한 NOT NULL + UNIQUE 제약이다."
      ],
      tip: "개체 무결성 = PK 제약 = NOT NULL + UNIQUE. 외래키는 참조 무결성, UNIQUE만이면 고유 무결성."
    }
  },
  {
    id: 610,
    subj: 2,
    topic: "2-A",
    topic_name: "관계형 데이터베이스",
    diff: "중",
    has_code: false,
    q: "다음 중 참조 무결성(Referential Integrity)을 위배하는 경우로 가장 적절한 것은?",
    blocks: null,
    choices: [
      "외래키(FK) 컬럼에 NULL 값을 입력하는 경우",
      "외래키(FK) 컬럼에 참조하는 테이블의 기본키에 존재하지 않는 값을 입력하는 경우",
      "기본키(PK) 컬럼에 중복된 값을 입력하는 경우",
      "속성 값이 허용된 도메인 범위를 벗어난 값을 입력하는 경우"
    ],
    ans: 2,
    src: "자료3 p.25~26",
    exp: {
      reason: "참조 무결성은 외래키(FK)에 대한 제약으로, FK는 NULL이거나 참조하는 테이블의 기본키에 실제로 존재하는 값이어야 한다. FK에 참조 테이블 PK에 없는 값을 입력하면 참조 무결성 위배다. FK에 NULL을 입력하는 것은 허용된다. (자료3 p.25~26)",
      terms: [
        "**참조 무결성 위배 조건**: FK가 NULL도 아니고, 참조 테이블의 PK에도 존재하지 않는 값일 때",
        "**FK에 NULL 허용**: FK는 NULL 값이 허용됨. NULL은 참조 무결성 위배 아님",
        "**개체 무결성 위배**: PK에 NULL 또는 중복 값 입력 시 위배",
        "**도메인 무결성 위배**: 속성 값이 허용된 도메인(데이터 타입, 범위) 밖의 값일 때 위배"
      ],
      wrong: [
        "1. FK에 NULL을 입력하는 것은 허용된다. 참조 무결성 위배가 아니다.",
        "2. (정답) FK에 참조 테이블의 PK에 존재하지 않는 값을 입력하면 참조 무결성 위배다.",
        "3. PK에 중복 값 입력은 참조 무결성이 아니라 개체 무결성 위배다.",
        "4. 허용된 도메인 범위를 벗어난 값 입력은 참조 무결성이 아니라 도메인 무결성 위배다."
      ],
      tip: "FK = NULL 허용(위배 아님). FK가 참조 PK에 없는 값 = 참조 무결성 위배. 이 차이가 자주 출제됨."
    }
  }
];

module.exports = a2Part1;

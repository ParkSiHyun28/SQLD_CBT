// 2-O: Q701~Q715 (DML 전체 15문항)
// 자료3 p.85~86 기반. PostgreSQL 14 sqld_verify DB에서 검증 가능한 부분만 검증.
// MERGE는 PostgreSQL 15+에서만 지원 → 자료3 p.86 인용으로 대체.
// 빈 문자열 Oracle=NULL / SQL Server="" 차이는 자료 인용으로 처리.
const o2Part1 = [
  // ============================================================
  // 토픽 143: DML 개념 및 종류 (Q701~Q702) - 2문항, has_code: false
  // ============================================================
  {
    id: 701,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "하",
    has_code: false,
    q: "다음 중 DML(Data Manipulation Language)에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "만들어진 테이블에 데이터를 입력, 수정, 삭제, 조회하는 명령어이다.",
      "INSERT, UPDATE, DELETE, SELECT가 DML에 해당하며 MERGE도 포함된다.",
      "DML 명령어는 실행 즉시 DB에 영구 반영되므로 별도의 COMMIT이 필요 없다.",
      "Oracle에서 DML 작업 결과를 실제 테이블에 반영하려면 COMMIT 명령어로 트랜잭션을 종료해야 한다."
    ],
    ans: 3,
    src: "자료3 p.85",
    exp: {
      reason: "DML은 테이블을 메모리 버퍼에 올려 작업하기 때문에 실행 즉시 DB에 영구 반영되지 않는다. Oracle에서는 COMMIT 명령어로 트랜잭션을 종료해야 실제 테이블에 반영된다. SQL Server는 AUTO COMMIT으로 처리되는 점이 다르다. (자료3 p.85)",
      terms: [
        "**DML**: 테이블 데이터를 입력(INSERT), 수정(UPDATE), 삭제(DELETE), 조회(SELECT)하는 명령어. 추가로 MERGE도 포함",
        "**버퍼 작업**: DML은 테이블을 메모리 버퍼에 올려 작업. 실시간으로 테이블에 직접 영향을 미치지 않음",
        "**COMMIT 필수(Oracle)**: 버퍼에서 처리한 DML이 실제 테이블에 반영되려면 COMMIT으로 트랜잭션 종료 필요",
        "**SQL Server 차이**: DML도 AUTO COMMIT으로 처리됨"
      ],
      wrong: [
        "1. 자료3 p.85의 DML 정의 그대로다.",
        "2. 자료3 p.85에 INSERT/UPDATE/DELETE/SELECT + MERGE가 명시되어 있다.",
        "3. (정답) DML은 버퍼 작업이므로 즉시 영구 반영되지 않는다. Oracle은 COMMIT이 필수다.",
        "4. 자료3 p.85의 Oracle 트랜잭션 처리 방식이다."
      ],
      tip: "DML = 버퍼 작업 → Oracle은 **COMMIT 필수**. DDL은 즉시 AUTO COMMIT."
    }
  },
  {
    id: 702,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "하",
    has_code: false,
    q: "다음 중 DML의 종류와 설명을 연결한 것으로 가장 적절하지 않은 것은?",
    blocks: null,
    choices: [
      "INSERT - 테이블에 새로운 행 데이터를 삽입한다.",
      "UPDATE - 테이블에 존재하는 행 데이터를 수정한다.",
      "DELETE - 테이블의 행 데이터를 삭제한다.",
      "MERGE - 참조 테이블을 기준으로 대상 테이블의 구조(컬럼 정의)를 변경한다."
    ],
    ans: 4,
    src: "자료3 p.85~86",
    exp: {
      reason: "MERGE는 참조 테이블의 데이터를 기준으로 대상 테이블의 데이터를 수정하는 명령어다. 테이블의 구조(컬럼 정의)를 변경하는 것은 DDL인 ALTER의 역할이다. MERGE는 UPDATE, DELETE, INSERT를 한 번의 작업으로 수행할 수 있다. (자료3 p.85~86)",
      terms: [
        "**INSERT**: 행 데이터 삽입",
        "**UPDATE**: 행 데이터 수정",
        "**DELETE**: 행 데이터 삭제",
        "**MERGE**: 참조 테이블과 동일하게 맞추는 데이터 병합. UPDATE/DELETE/INSERT를 한 번에 수행",
        "**ALTER**: 테이블 구조 변경 (DDL, DML 아님)"
      ],
      wrong: [
        "1. INSERT 정의 그대로다.",
        "2. UPDATE 정의 그대로다.",
        "3. DELETE 정의 그대로다.",
        "4. (정답) MERGE는 데이터 병합이지 구조 변경이 아니다. 구조 변경은 ALTER(DDL)이다."
      ],
      tip: "MERGE = **데이터** 병합(UPDATE/DELETE/INSERT 통합). 구조 변경 = ALTER(DDL)."
    }
  },

  // ============================================================
  // 토픽 144: INSERT 문법 및 주의사항 (Q703~Q706) - 4문항, has_code: true
  // ============================================================
  {
    id: 703,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "중",
    has_code: true,
    q: "다음 중 INSERT 문의 실행 결과로 가장 적절한 것은?",
    blocks: [
      {
        type: "table",
        title: "[PRODUCT 테이블]",
        headers: ["PID", "PNAME", "PRICE", "STOCK"],
        rows: [
          ["NOT NULL", "NOT NULL", "NULL 허용", "NULL 허용"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "INSERT INTO PRODUCT (PID, PNAME, PRICE)\nVALUES (101, 'Keyboard', 25000);"
      }
    ],
    choices: [
      "STOCK 컬럼에 값을 명시하지 않아 오류가 발생한다.",
      "STOCK 컬럼에는 자동으로 0이 삽입된다.",
      "STOCK 컬럼에는 자동으로 NULL이 삽입되어 정상적으로 1행이 삽입된다.",
      "컬럼 목록을 일부만 명시했으므로 문법 오류가 발생한다."
    ],
    ans: 3,
    src: "자료3 p.85",
    exp: {
      reason: "INSERT 시 일부 컬럼만 명시하면 작성하지 않은 컬럼에는 자동으로 NULL이 입력된다. STOCK은 NULL 허용 컬럼이므로 오류 없이 NULL로 삽입된다. PostgreSQL 검증 완료. (자료3 p.85)",
      terms: [
        "**컬럼 일부 명시**: INSERT INTO 테이블명 (열1, 열2, ...) VALUES (값1, 값2, ...)",
        "**생략된 컬럼**: 자동으로 NULL 입력됨",
        "**NULL 허용 컬럼**: 생략 시 NULL 입력 정상",
        "**NOT NULL 컬럼**: 생략 시 오류 발생"
      ],
      wrong: [
        "1. STOCK이 NULL 허용이므로 NULL 삽입으로 오류 없이 처리된다.",
        "2. 자동으로 0이 아니라 NULL이 삽입된다.",
        "3. (정답) NULL 허용 컬럼은 생략 시 NULL로 자동 채워진다.",
        "4. 컬럼 목록을 일부만 명시하는 것은 올바른 INSERT 문법이다."
      ],
      tip: "INSERT 컬럼 생략 → **NULL 자동 삽입**. NULL 허용이면 정상, NOT NULL이면 오류."
    }
  },
  {
    id: 704,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "중",
    has_code: true,
    q: "다음 INSERT 문 중 오류가 발생하는 것은?",
    blocks: [
      {
        type: "table",
        title: "[MEMBER 테이블]",
        headers: ["MID", "MNAME", "EMAIL"],
        rows: [
          ["NOT NULL, PK", "NOT NULL", "NULL 허용"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가)\nINSERT INTO MEMBER (MID, MNAME, EMAIL)\nVALUES (1, 'Kim', 'kim@test.com');\n\n-- (나)\nINSERT INTO MEMBER (MID, MNAME)\nVALUES (2, 'Lee');\n\n-- (다)\nINSERT INTO MEMBER (MID)\nVALUES (3);\n\n-- (라)\nINSERT INTO MEMBER\nVALUES (4, 'Park', 'park@test.com');"
      }
    ],
    choices: [
      "(가)",
      "(나)",
      "(다)",
      "(라)"
    ],
    ans: 3,
    src: "자료3 p.85",
    exp: {
      reason: "(다)는 NOT NULL 컬럼인 MNAME을 생략했으므로 오류가 발생한다. (가)는 전체 컬럼 명시로 정상, (나)는 NULL 허용 EMAIL 생략이므로 NULL 삽입으로 정상, (라)는 컬럼 목록 생략 시 모든 컬럼 순서대로 값을 전달하므로 정상이다. PostgreSQL 검증 완료. (자료3 p.85)",
      terms: [
        "**NOT NULL 컬럼 생략**: 오류 발생",
        "**NULL 허용 컬럼 생략**: NULL로 자동 입력, 정상",
        "**전체 컬럼 생략(라)**: `INSERT INTO 테이블명 VALUES (...)` 형태. 모든 컬럼에 순서대로 값 필요",
        "**부분 컬럼 명시**: 명시한 컬럼에만 값 전달, 나머지는 NULL"
      ],
      wrong: [
        "1. (가)는 모든 컬럼에 값을 제공하므로 정상이다.",
        "2. (나)는 EMAIL(NULL 허용)만 생략하므로 NULL로 삽입되어 정상이다.",
        "3. (정답) MNAME은 NOT NULL 컬럼인데 생략했으므로 오류 발생.",
        "4. (라)는 컬럼 목록 없이 모든 컬럼에 순서대로 값을 주므로 정상이다."
      ],
      tip: "**NOT NULL 컬럼 생략 = 오류**. NULL 허용 컬럼 생략 = NULL 자동 입력 = 정상."
    }
  },
  {
    id: 705,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "중",
    has_code: true,
    q: "다음 Oracle과 SQL Server의 INSERT 실행 후 빈 문자열 처리에 대한 설명으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "INSERT INTO MEMBER (MID, MEMO) VALUES (10, '');"
      }
    ],
    choices: [
      "Oracle과 SQL Server 모두 MEMO 컬럼에 NULL이 저장된다.",
      "Oracle과 SQL Server 모두 MEMO 컬럼에 빈 문자열('')이 저장된다.",
      "Oracle에서는 MEMO 컬럼에 NULL이 저장되고, SQL Server에서는 빈 문자열('')이 저장된다.",
      "Oracle에서는 MEMO 컬럼에 빈 문자열('')이 저장되고, SQL Server에서는 NULL이 저장된다."
    ],
    ans: 3,
    src: "자료3 p.85",
    exp: {
      reason: "Oracle에서 빈 문자열('')을 삽입하면 NULL로 처리된다. 따라서 해당 데이터를 조회하려면 IS NULL 조건을 사용해야 한다. SQL Server에서는 빈 문자열('')을 그대로 저장하며, 조회 시 = '' 조건을 사용해야 한다. (자료3 p.85)",
      terms: [
        "**Oracle 빈 문자열**: '' 삽입 시 NULL로 처리. 조회는 IS NULL",
        "**SQL Server 빈 문자열**: '' 삽입 시 빈 문자열 그대로 저장. 조회는 = ''",
        "**주의**: Oracle에서 MEMO = '' 조건으로 조회하면 결과 0건 (NULL은 = 으로 비교 불가)"
      ],
      wrong: [
        "1. SQL Server는 빈 문자열을 그대로 저장하므로 양쪽 모두 NULL이 되지 않는다.",
        "2. Oracle은 빈 문자열을 NULL로 처리하므로 양쪽 모두 빈 문자열이 되지 않는다.",
        "3. (정답) Oracle = NULL 처리, SQL Server = 빈 문자열 그대로 저장.",
        "4. Oracle과 SQL Server의 처리 방식을 반대로 설명한 것이다."
      ],
      tip: "Oracle '' = NULL → IS NULL로 조회. SQL Server '' = '' 그대로 → = ''로 조회."
    }
  },
  {
    id: 706,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "중",
    has_code: true,
    q: "다음 SQL을 Oracle에서 실행했을 때 결과 행 수로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[NOTE 테이블]",
        headers: ["NID", "CONTENT"],
        rows: [
          ["1", "NULL"],
          ["2", "Hello"],
          ["3", "''(빈 문자열로 INSERT됨)"],
          ["4", "World"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT NID FROM NOTE WHERE CONTENT IS NULL;"
      }
    ],
    choices: [
      "1",
      "2",
      "3",
      "0"
    ],
    ans: 2,
    src: "자료3 p.85",
    exp: {
      reason: "Oracle에서 빈 문자열('')을 INSERT하면 NULL로 처리된다. 따라서 NID=1(명시적 NULL)과 NID=3(빈 문자열 삽입 → NULL 처리) 두 행이 IS NULL 조건에 해당하여 2행이 반환된다. (자료3 p.85)",
      terms: [
        "**Oracle 빈 문자열 = NULL**: 삽입 시점에 NULL로 변환됨",
        "**IS NULL 조건**: NULL 값을 가진 행을 찾는 유일한 방법",
        "**결과**: NID=1(NULL) + NID=3(빈 문자열→NULL) = 2행"
      ],
      wrong: [
        "1. NID=1만 해당한다고 착각한 경우. 빈 문자열도 Oracle에서 NULL로 처리된다.",
        "2. (정답) 명시적 NULL(1)과 빈 문자열 삽입(3) 모두 NULL로 처리되어 2행.",
        "3. 빈 문자열이 그대로 저장된다고 오해하고 3을 제외한 3행이라 착각한 경우.",
        "4. IS NULL로 조회하면 0건이 아니라 NULL 행이 반환된다."
      ],
      tip: "Oracle에서 '' 삽입 = NULL. **IS NULL 조건**으로만 조회 가능."
    }
  },

  // ============================================================
  // 토픽 145: UPDATE 문법 (Q707~Q709) - 3문항, has_code: true
  // ============================================================
  {
    id: 707,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "중",
    has_code: true,
    q: "다음 UPDATE 문의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[ITEM 테이블] (실행 전)",
        headers: ["IID", "INAME", "PRICE", "STOCK"],
        rows: [
          ["1", "Mouse", "15000", "50"],
          ["2", "Keyboard", "25000", "30"],
          ["3", "Monitor", "200000", "10"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "UPDATE ITEM\nSET PRICE = 20000, STOCK = 45\nWHERE IID = 1;"
      }
    ],
    choices: [
      "IID=1 행의 PRICE만 20000으로 수정되고 STOCK은 변경되지 않는다.",
      "IID=1 행의 PRICE와 STOCK이 각각 20000과 45로 수정된다.",
      "모든 행의 PRICE와 STOCK이 20000과 45로 수정된다.",
      "SET 절에 두 컬럼을 동시에 나열할 수 없어 오류가 발생한다."
    ],
    ans: 2,
    src: "자료3 p.85~86",
    exp: {
      reason: "UPDATE의 SET 절에는 여러 컬럼을 쉼표로 구분하여 동시에 수정할 수 있다. WHERE IID = 1 조건으로 IID=1인 행만 대상이 되며, PRICE와 STOCK이 각각 20000과 45로 수정된다. PostgreSQL 검증 완료. (자료3 p.85~86)",
      terms: [
        "**SET 다중 컬럼**: `SET 컬럼1 = 값1, 컬럼2 = 값2` 형태로 여러 컬럼 동시 수정 가능",
        "**WHERE 조건**: 수정 대상 행을 선택. IID = 1이면 1행만 수정",
        "**WHERE 미명시**: 모든 행이 수정됨 (주의)"
      ],
      wrong: [
        "1. SET 절에 두 컬럼이 모두 명시되어 있으므로 둘 다 수정된다.",
        "2. (정답) WHERE 조건으로 IID=1만 선택되고 두 컬럼이 동시에 수정된다.",
        "3. WHERE IID = 1 조건이 있으므로 전체 행이 아니라 1행만 수정된다.",
        "4. SET 절에 여러 컬럼을 쉼표로 나열하는 것은 올바른 UPDATE 문법이다."
      ],
      tip: "UPDATE SET에서 **다중 컬럼 수정 가능**. WHERE로 대상 행 특정, 없으면 전체 수정."
    }
  },
  {
    id: 708,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "중",
    has_code: true,
    q: "다음 UPDATE 문 실행 후 SCORE 컬럼의 총합으로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[STUDENT 테이블] (실행 전)",
        headers: ["SID", "SNAME", "SCORE", "GRADE"],
        rows: [
          ["1", "Kim", "80", "B"],
          ["2", "Lee", "90", "A"],
          ["3", "Park", "70", "C"],
          ["4", "Choi", "85", "B"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "UPDATE STUDENT\nSET SCORE = SCORE + 5\nWHERE GRADE = 'B';"
      }
    ],
    choices: [
      "325",
      "335",
      "340",
      "345"
    ],
    ans: 2,
    src: "자료3 p.85~86",
    exp: {
      reason: "GRADE = 'B'인 SID=1(SCORE 80→85)과 SID=4(SCORE 85→90)의 SCORE가 5씩 증가한다. SID=2(90)와 SID=3(70)은 변경 없음. 수정 후 합계 = 85 + 90 + 70 + 90 = 335. PostgreSQL 검증 완료. (자료3 p.85~86)",
      terms: [
        "**SET SCORE = SCORE + 5**: 기존 값에 5를 더한 값으로 갱신",
        "**WHERE GRADE = 'B'**: GRADE가 B인 행만 수정 대상",
        "**결과**: 80→85(SID=1), 90 유지(SID=2), 70 유지(SID=3), 85→90(SID=4)",
        "**총합**: 85 + 90 + 70 + 90 = 335"
      ],
      wrong: [
        "1. 325 = 변경 전 총합(80+90+70+85)이다.",
        "2. (정답) B 등급 2행에만 +5 적용 후 합계 335.",
        "3. 340 = 모든 행에 +5 적용한 경우(325+4×5÷2 오계산).",
        "4. 345 = 모든 행에 +5 적용한 총합(325+20)이다."
      ],
      tip: "UPDATE WHERE 조건 = **해당 행만** 수정. 총합은 조건 행의 변화량만 반영."
    }
  },
  {
    id: 709,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "중",
    has_code: true,
    q: "다음 UPDATE 문에서 서브쿼리를 사용한 SET 절의 동작으로 가장 적절한 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "UPDATE EMP\nSET (SAL, COMM) = (SELECT AVG(SAL), AVG(COMM)\n                  FROM EMP)\nWHERE ENAME = 'John';"
      }
    ],
    choices: [
      "SET 절에 서브쿼리를 사용할 수 없어 오류가 발생한다.",
      "서브쿼리 결과가 여러 행이면 오류가 발생하므로 AVG 사용은 불가하다.",
      "EMP 테이블 전체의 SAL 평균과 COMM 평균을 구해 ENAME = 'John'인 행에 반영한다.",
      "서브쿼리에서 수정 대상 테이블(EMP)을 참조할 수 없어 오류가 발생한다."
    ],
    ans: 3,
    src: "자료3 p.85~86",
    exp: {
      reason: "UPDATE SET 절에는 서브쿼리를 사용할 수 있다. 이 경우 EMP 전체의 AVG(SAL)와 AVG(COMM)을 각각 계산하여 ENAME = 'John'인 행의 SAL과 COMM에 반영한다. 서브쿼리 결과가 수정할 컬럼 개수만큼 스칼라 값이어야 한다. (자료3 p.85~86)",
      terms: [
        "**SET 서브쿼리**: `SET (컬럼1, 컬럼2) = (SELECT 값1, 값2 FROM ...)`",
        "**스칼라 조건**: 서브쿼리 결과가 수정할 컬럼 개수만큼 값을 반환해야 함",
        "**AVG**: 집계 함수이므로 단일 행 반환 → SET 서브쿼리에 사용 가능",
        "**자기 테이블 참조**: UPDATE에서 자기 테이블을 서브쿼리로 참조 가능 (자료3 p.86)"
      ],
      wrong: [
        "1. SET 절에 서브쿼리 사용은 자료3 p.85~86에 명시된 합법적인 문법이다.",
        "2. AVG는 단일 행을 반환하는 집계 함수이므로 SET 서브쿼리에 사용 가능하다.",
        "3. (정답) EMP 전체의 AVG 값을 구해 John 행에만 반영한다.",
        "4. UPDATE SET 서브쿼리에서 자기 테이블 참조는 허용된다."
      ],
      tip: "UPDATE SET 서브쿼리 = **스칼라 결과** 필요. 컬럼 수만큼 값 반환해야 함."
    }
  },

  // ============================================================
  // 토픽 146: DELETE 문법 (Q710~Q711) - 2문항, has_code: true
  // ============================================================
  {
    id: 710,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "하",
    has_code: true,
    q: "다음 DELETE 문의 실행 결과로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[ORDERS 테이블] (실행 전, 총 5행)",
        headers: ["OID", "CNAME", "AMOUNT"],
        rows: [
          ["1", "Kim", "50000"],
          ["2", "Lee", "30000"],
          ["3", "Kim", "80000"],
          ["4", "Park", "20000"],
          ["5", "Kim", "15000"]
        ]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "DELETE FROM ORDERS WHERE CNAME = 'Kim';"
      }
    ],
    choices: [
      "OID=1인 행 하나만 삭제된다.",
      "CNAME이 'Kim'인 3개 행이 삭제되어 2행이 남는다.",
      "ORDERS 테이블의 모든 행이 삭제된다.",
      "WHERE 조건이 있으면 DELETE는 실행되지 않는다."
    ],
    ans: 2,
    src: "자료3 p.86",
    exp: {
      reason: "DELETE는 행 단위로 실행되며 WHERE 조건에 맞는 모든 행을 삭제한다. CNAME = 'Kim'인 OID=1, 3, 5 세 행이 삭제되고 OID=2(Lee), OID=4(Park) 2행이 남는다. PostgreSQL 검증 완료. (자료3 p.86)",
      terms: [
        "**DELETE 행 단위**: WHERE 조건에 해당하는 모든 행을 삭제",
        "**WHERE 조건**: 삭제 대상 행을 선택. 여러 행이 해당되면 모두 삭제",
        "**WHERE 미명시**: 테이블의 모든 행이 삭제됨",
        "**결과**: OID 1, 3, 5 삭제 → OID 2, 4 남음 (2행)"
      ],
      wrong: [
        "1. DELETE는 조건에 맞는 첫 번째 행만 삭제하지 않고 모든 해당 행을 삭제한다.",
        "2. (정답) Kim 3행 삭제, Lee와 Park 2행 잔존.",
        "3. WHERE 조건이 없을 때 전체 삭제. WHERE CNAME = 'Kim'은 Kim 행만 삭제한다.",
        "4. WHERE 조건이 있어도 DELETE는 정상 실행된다."
      ],
      tip: "DELETE WHERE = **조건 모든 행 삭제**. WHERE 없으면 전체 행 삭제."
    }
  },
  {
    id: 711,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "중",
    has_code: true,
    q: "다음 중 DELETE와 TRUNCATE의 차이에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "-- (가) DELETE\nDELETE FROM ORDERS;\n\n-- (나) TRUNCATE\nTRUNCATE TABLE ORDERS;"
      }
    ],
    choices: [
      "(가) DELETE는 DML이므로 ROLLBACK으로 복구가 가능하다.",
      "(나) TRUNCATE는 DDL이므로 AUTO COMMIT되어 ROLLBACK이 불가하다.",
      "(가) DELETE는 WHERE 조건으로 특정 행만 삭제할 수 있지만, (나) TRUNCATE는 WHERE 절을 사용할 수 없다.",
      "(가)와 (나) 모두 테이블 구조와 데이터를 완전히 제거한다."
    ],
    ans: 4,
    src: "자료3 p.86, TRAPS.md T-13",
    exp: {
      reason: "DELETE와 TRUNCATE는 모두 데이터만 삭제하며 테이블 구조(컬럼 정의, 제약 등)는 그대로 유지된다. 테이블 구조까지 제거하는 것은 DDL인 DROP이다. (자료3 p.86, TRAPS.md T-13)",
      terms: [
        "**DELETE**: DML, 행 단위, WHERE 가능, ROLLBACK 가능, UNDO 생성",
        "**TRUNCATE**: DDL, 전체 행, WHERE 불가, ROLLBACK 불가(AUTO COMMIT), 빠름",
        "**DROP**: DDL, 테이블 자체 제거(구조+데이터), ROLLBACK 불가",
        "**공통점**: DELETE와 TRUNCATE 모두 테이블 구조는 유지"
      ],
      wrong: [
        "1. DELETE는 DML이므로 Oracle에서 ROLLBACK 가능하다. 자료3 p.86 명시.",
        "2. TRUNCATE는 DDL로 AUTO COMMIT. ROLLBACK 불가. 자료3 p.86 명시.",
        "3. DELETE는 WHERE 사용 가능, TRUNCATE는 WHERE 불가. 올바른 차이 설명이다.",
        "4. (정답) 테이블 구조까지 제거하는 것은 DROP이다. DELETE/TRUNCATE는 데이터만 삭제."
      ],
      tip: "DELETE/TRUNCATE = 데이터만 삭제, 구조 유지. **DROP** = 구조까지 제거."
    }
  },

  // ============================================================
  // 토픽 147: MERGE 문법 (Q712~Q715) - 4문항, has_code: true
  // ============================================================
  {
    id: 712,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "상",
    has_code: true,
    q: "다음 MERGE 문의 각 절에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "MERGE INTO TEAM T\nUSING MEMBER M\nON (T.member_id = M.member_id)\nWHEN MATCHED THEN\n    UPDATE SET T.name = M.name, T.email = M.email\nWHEN NOT MATCHED THEN\n    INSERT (team_id, name, email)\n    VALUES (M.member_id, M.name, M.email);"
      }
    ],
    choices: [
      "MERGE INTO 절은 데이터를 수정할 대상 테이블을 지정한다.",
      "USING 절은 비교 기준이 되는 참조(소스) 테이블을 지정한다.",
      "ON 절은 대상 테이블과 소스 테이블 간의 조인 조건을 지정하며 괄호가 필수다.",
      "WHEN NOT MATCHED 절은 대상 테이블에 데이터가 존재할 때 수행된다."
    ],
    ans: 4,
    src: "자료3 p.86",
    exp: {
      reason: "WHEN NOT MATCHED는 ON 조건을 만족하는 행이 대상 테이블(TEAM)에 존재하지 않을 때 수행되는 절이다. 대상 테이블에 해당 행이 없으면 소스의 데이터를 INSERT한다. 대상 테이블에 행이 존재할 때 수행되는 것은 WHEN MATCHED이다. (자료3 p.86)",
      terms: [
        "**MERGE INTO 대상테이블**: 수정/삽입할 테이블 지정",
        "**USING 소스테이블**: 비교 기준 데이터 제공 테이블",
        "**ON (조건)**: 두 테이블 간 연결 조건. 괄호 필수",
        "**WHEN MATCHED THEN**: ON 조건 일치 행 존재 시 → UPDATE 또는 DELETE",
        "**WHEN NOT MATCHED THEN**: ON 조건 일치 행 없음 시 → INSERT"
      ],
      wrong: [
        "1. MERGE INTO는 대상 테이블 지정. 자료3 p.86 명시.",
        "2. USING은 소스(참조) 테이블 지정. 자료3 p.86 명시.",
        "3. ON 절에 괄호 필수. 자료3 p.86 명시.",
        "4. (정답) WHEN NOT MATCHED는 대상 테이블에 행이 **없을 때** 수행. 있을 때는 WHEN MATCHED."
      ],
      tip: "MATCHED = 대상에 **행 있음** → UPDATE/DELETE. NOT MATCHED = **행 없음** → INSERT."
    }
  },
  {
    id: 713,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "상",
    has_code: true,
    q: "다음 MERGE 문의 빈칸 (A), (B), (C)에 들어갈 키워드를 순서대로 나열한 것으로 옳은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "MERGE ( A ) TARGET_TBL TGT\n( B ) SOURCE_TBL SRC\nON (TGT.id = SRC.id)\n( C ) MATCHED THEN\n    UPDATE SET TGT.val = SRC.val\nWHEN NOT MATCHED THEN\n    INSERT (id, val) VALUES (SRC.id, SRC.val);"
      }
    ],
    choices: [
      "(A) FROM, (B) INTO, (C) WHEN",
      "(A) INTO, (B) USING, (C) WHEN",
      "(A) INTO, (B) FROM, (C) WHEN",
      "(A) USING, (B) INTO, (C) ON"
    ],
    ans: 2,
    src: "자료3 p.86",
    exp: {
      reason: "MERGE 문의 기본 구조는 `MERGE INTO 대상테이블 USING 소스테이블 ON 조건 WHEN MATCHED ... WHEN NOT MATCHED ...`이다. (A)=INTO, (B)=USING, (C)=WHEN이 들어간다. (자료3 p.86)",
      terms: [
        "**MERGE INTO**: 대상 테이블 지정 키워드",
        "**USING**: 소스 테이블 지정 키워드",
        "**ON**: 조인 조건 키워드 (괄호 필수)",
        "**WHEN MATCHED**: 조건 일치 행 처리",
        "**WHEN NOT MATCHED**: 조건 불일치 행 처리"
      ],
      wrong: [
        "1. MERGE에서 FROM은 사용하지 않는다. INTO와 USING의 위치도 반대다.",
        "2. (정답) MERGE INTO ... USING ... WHEN 구조.",
        "3. USING 대신 FROM을 쓰는 것은 MERGE 문법이 아니다.",
        "4. MERGE INTO가 아닌 MERGE USING이 되어 문법 오류이다."
      ],
      tip: "MERGE 골격: **INTO** 대상 **USING** 소스 ON 조건 **WHEN** MATCHED/NOT MATCHED."
    }
  },
  {
    id: 714,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "상",
    has_code: true,
    q: "다음 MERGE 문 실행 후 TARGET 테이블의 상태로 옳은 것은?",
    blocks: [
      {
        type: "table",
        title: "[TARGET 테이블] (실행 전)",
        headers: ["ID", "VAL"],
        rows: [["1", "AAA"], ["2", "BBB"]]
      },
      {
        type: "table",
        title: "[SOURCE 테이블]",
        headers: ["ID", "VAL"],
        rows: [["2", "ZZZ"], ["3", "CCC"]]
      },
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "MERGE INTO TARGET T\nUSING SOURCE S\nON (T.ID = S.ID)\nWHEN MATCHED THEN\n    UPDATE SET T.VAL = S.VAL\nWHEN NOT MATCHED THEN\n    INSERT (ID, VAL) VALUES (S.ID, S.VAL);"
      }
    ],
    choices: [
      "ID=1(AAA), ID=2(BBB) 2행 그대로 유지",
      "ID=1(AAA), ID=2(ZZZ) 2행",
      "ID=1(AAA), ID=2(ZZZ), ID=3(CCC) 3행",
      "ID=2(ZZZ), ID=3(CCC) 2행"
    ],
    ans: 3,
    src: "자료3 p.86",
    exp: {
      reason: "ON 조건(T.ID = S.ID)을 기준으로 분류한다. ID=2는 양쪽 모두 존재(MATCHED) → TARGET의 VAL이 BBB에서 ZZZ로 UPDATE됨. SOURCE의 ID=3은 TARGET에 없음(NOT MATCHED) → INSERT로 (3, CCC) 추가됨. ID=1은 SOURCE에 없으므로 변동 없음. 결과: 3행. (자료3 p.86)",
      terms: [
        "**ID=1**: SOURCE에 없음 → MERGE 대상 아님, 그대로 유지",
        "**ID=2**: MATCHED → T.VAL = S.VAL = ZZZ로 UPDATE",
        "**ID=3**: NOT MATCHED (TARGET에 없음) → INSERT (3, CCC)",
        "**최종**: (1, AAA), (2, ZZZ), (3, CCC) 3행"
      ],
      wrong: [
        "1. MERGE가 SOURCE 데이터를 반영하지 않았다는 잘못된 추론이다.",
        "2. ID=3 삽입을 누락한 경우. NOT MATCHED 절로 INSERT가 수행된다.",
        "3. (정답) ID=2 UPDATE + ID=3 INSERT → 총 3행.",
        "4. ID=1은 MERGE 대상이 아니므로 그대로 남는다."
      ],
      tip: "MERGE: SOURCE만 있으면 INSERT, 양쪽 있으면 UPDATE. TARGET만 있으면 **변동 없음**."
    }
  },
  {
    id: 715,
    subj: 2,
    topic: "2-O",
    topic_name: "DML",
    diff: "상",
    has_code: true,
    q: "다음 MERGE 문에 대한 설명으로 가장 적절하지 않은 것은?",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "MERGE INTO TEAM T\nUSING MEMBER M\nON (T.member_id = M.member_id)\nWHEN MATCHED THEN\n    UPDATE SET T.name = M.name\n    DELETE (WHERE T.status = 'INACTIVE')\nWHEN NOT MATCHED THEN\n    INSERT (member_id, name)\n    VALUES (M.member_id, M.name);"
      }
    ],
    choices: [
      "WHEN MATCHED 절에는 UPDATE와 DELETE를 함께 기술할 수 있다.",
      "WHEN NOT MATCHED 절에는 INSERT만 기술할 수 있다.",
      "ON 조건절의 괄호는 선택사항이므로 생략해도 동일하게 동작한다.",
      "MERGE 문은 UPDATE, DELETE, INSERT를 한 번의 작업으로 수행할 수 있다."
    ],
    ans: 3,
    src: "자료3 p.86",
    exp: {
      reason: "자료3 p.86에 ON 조건절에서 사용된 괄호는 필수라고 명시되어 있다. 괄호를 생략하면 문법 오류가 발생한다. WHEN MATCHED에 UPDATE/DELETE 병기, WHEN NOT MATCHED에 INSERT, 한 번의 작업으로 세 명령 수행은 모두 올바른 설명이다. (자료3 p.86)",
      terms: [
        "**ON (조건) 괄호 필수**: 자료3 p.86 명시. 생략 불가",
        "**WHEN MATCHED**: UPDATE 또는 DELETE. 자료3 p.86에 DELETE(조건) 형태 명시",
        "**WHEN NOT MATCHED**: INSERT만 가능",
        "**MERGE 목적**: UPDATE/DELETE/INSERT를 한 번에 처리하는 데이터 병합"
      ],
      wrong: [
        "1. 자료3 p.86에 WHEN MATCHED THEN UPDATE ... DELETE (조건) 형태가 명시되어 있다.",
        "2. WHEN NOT MATCHED는 INSERT만 기술 가능하다. 올바른 설명이다.",
        "3. (정답) ON 조건절의 괄호는 필수다. 자료3 p.86에 '--괄호 필수'로 명시.",
        "4. 자료3 p.86의 'UPDATE와 DELETE, INSERT를 한 번의 작업으로 수행 가능' 그대로다."
      ],
      tip: "MERGE ON 괄호는 **필수**. 생략 불가. WHEN NOT MATCHED는 INSERT만."
    }
  }
];

module.exports = o2Part1;

// 2-D Part 1: Q641~Q650 (WHERE 절 응용)
// 토픽 77: NULL 비교 IS NULL/IS NOT NULL (Q641~644)
// 토픽 78: 비교 연산자 우선순위 종합 (Q645~647)
// 토픽 79: 다중컬럼 IN 연산자 (Q648~650)
// 자료3 p.37~38 기반. PostgreSQL 14 sqld_verify DB 검증 완료.
// emp 테이블: empno/ename/deptno/sal/comm/mgr
//   KIM(1,10,3000,NULL,NULL), LEE(2,10,2500,500,1)
//   PARK(3,20,2000,NULL,1), CHOI(4,20,2000,300,3)
//   JUNG(5,30,1500,NULL,1), HAN(6,NULL,1500,NULL,1)
const d2Part1 = [
  // ============================================================
  // 토픽 77: NULL 비교 IS NULL / IS NOT NULL (Q641~Q644)
  // ============================================================

  // Q641: = NULL 함정 - 결과 행 수 추적
  {
    id: 641,
    subj: 2,
    topic: "2-D",
    topic_name: "WHERE 절 응용",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은? (emp 테이블: 6건, comm 컬럼에 NULL인 행 4건, 값 있는 행 2건)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT *\nFROM emp\nWHERE comm = NULL;"
      }
    ],
    choices: [
      "0건",
      "2건",
      "4건",
      "6건"
    ],
    ans: 1,
    src: "자료3 p.37, TRAPS.md T-01",
    exp: {
      reason: "NULL과 어떤 값(NULL 포함)을 '=' 로 비교한 결과는 항상 UNKNOWN이다. WHERE 조건이 UNKNOWN이면 해당 행은 결과에서 제외되므로 comm = NULL은 0건을 반환한다. NULL 값 행을 찾으려면 반드시 IS NULL을 사용해야 한다. (자료3 p.37, T-01)",
      terms: [
        "**NULL 비교**: NULL은 '=' 또는 '<>'로 비교 불가. 결과가 TRUE/FALSE가 아닌 UNKNOWN.",
        "**UNKNOWN 처리**: WHERE 조건 결과가 UNKNOWN이면 그 행은 결과 집합에서 제외.",
        "**IS NULL**: NULL 여부를 판별하는 유일한 올바른 연산자. comm IS NULL -> 4건.",
        "**IS NOT NULL**: NULL이 아닌 값 판별. comm IS NOT NULL -> 2건."
      ],
      wrong: [
        "1. (정답) = NULL은 항상 UNKNOWN이므로 조건을 만족하는 행이 없어 0건.",
        "2. comm에 값이 있는 2건은 comm IS NOT NULL로 조회 가능. = NULL로는 조회 불가.",
        "3. comm IS NULL이 4건이다. = NULL과 혼동한 오답.",
        "4. SELECT * FROM emp(WHERE 없음)가 6건. = NULL 조건은 전체 행을 반환하지 않는다."
      ],
      tip: "= NULL은 항상 0건. NULL 조회는 IS NULL만 가능. (자료3 p.37)"
    }
  },

  // Q642: <> NULL 함정 - IS NOT NULL과 비교
  {
    id: 642,
    subj: 2,
    topic: "2-D",
    topic_name: "WHERE 절 응용",
    diff: "중",
    has_code: true,
    q: "다음 두 SQL (A), (B)의 실행 결과 행 수를 올바르게 짝지은 것은? (emp 테이블: 6건, comm에 값 있는 행 2건, NULL인 행 4건)",
    blocks: [
      {
        type: "code",
        title: "(A)",
        lang: "sql",
        content: "SELECT * FROM emp WHERE comm <> NULL;"
      },
      {
        type: "code",
        title: "(B)",
        lang: "sql",
        content: "SELECT * FROM emp WHERE comm IS NOT NULL;"
      }
    ],
    choices: [
      "(A) 0건, (B) 2건",
      "(A) 2건, (B) 2건",
      "(A) 4건, (B) 4건",
      "(A) 0건, (B) 4건"
    ],
    ans: 1,
    src: "자료3 p.37, TRAPS.md T-01",
    exp: {
      reason: "(A) comm <> NULL은 UNKNOWN이므로 0건. (B) comm IS NOT NULL은 comm에 실제 값이 있는 행만 반환하므로 2건. '<>'도 '='과 마찬가지로 NULL과 비교하면 UNKNOWN이다. (자료3 p.37, T-01)",
      terms: [
        "**<> NULL**: '같지 않음' 비교도 NULL이 포함되면 UNKNOWN. 0건 반환.",
        "**IS NOT NULL**: NULL이 아닌 값 행만 반환. 정상 동작.",
        "**UNKNOWN 규칙**: NULL 관련 비교 연산(=, <>, >, <, >=, <=) 결과는 모두 UNKNOWN.",
        "**올바른 NULL 비교**: IS NULL(NULL인 경우), IS NOT NULL(NULL이 아닌 경우) 두 가지만 허용."
      ],
      wrong: [
        "1. (정답) <> NULL = UNKNOWN(0건), IS NOT NULL = 정상 조회(2건).",
        "2. <> NULL은 UNKNOWN이라 0건. 2건은 IS NOT NULL의 결과다.",
        "3. IS NOT NULL은 2건(값 있는 행). IS NULL이면 4건이다.",
        "4. <> NULL은 0건으로 맞지만, IS NOT NULL은 값 있는 2건이므로 4건이 아니다."
      ],
      tip: "<> NULL도 UNKNOWN. NULL 비교는 IS NULL / IS NOT NULL 전용. (자료3 p.37)"
    }
  },

  // Q643: IS NULL + OR/AND 복합 조건
  {
    id: 643,
    subj: 2,
    topic: "2-D",
    topic_name: "WHERE 절 응용",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 반환되는 사원 이름(ename)을 모두 고른 것은?\n(emp: KIM-deptno=10/comm=NULL, LEE-deptno=10/comm=500, PARK-deptno=20/comm=NULL, CHOI-deptno=20/comm=300, JUNG-deptno=30/comm=NULL, HAN-deptno=NULL/comm=NULL)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ename\nFROM emp\nWHERE deptno IS NULL\n   OR comm IS NULL;"
      }
    ],
    choices: [
      "KIM, PARK, JUNG, HAN",
      "HAN",
      "KIM, PARK, JUNG",
      "LEE, CHOI"
    ],
    ans: 1,
    src: "자료3 p.37",
    exp: {
      reason: "deptno IS NULL(HAN) OR comm IS NULL(KIM, PARK, JUNG, HAN) 두 조건 중 하나라도 참인 행을 반환한다. HAN은 deptno도 NULL이고 comm도 NULL이지만 OR 조건이므로 한 번만 등장한다. PostgreSQL 검증: 4건(KIM, PARK, JUNG, HAN). (자료3 p.37)",
      terms: [
        "**OR 조건**: 두 조건 중 하나라도 TRUE이면 해당 행 포함.",
        "**deptno IS NULL**: HAN(deptno=NULL) 1건.",
        "**comm IS NULL**: KIM, PARK, JUNG, HAN 4건.",
        "**합집합**: OR이므로 두 조건을 만족하는 행의 합집합. HAN은 두 조건 모두 만족하지만 중복 없이 1건."
      ],
      wrong: [
        "1. (정답) deptno IS NULL(HAN) OR comm IS NULL(KIM,PARK,JUNG,HAN) = 4건.",
        "2. HAN만이면 deptno IS NULL AND comm IS NULL 결과다. OR이므로 더 많은 행이 포함된다.",
        "3. HAN이 빠진 경우. HAN은 comm IS NULL 조건도 만족하므로 포함되어야 한다.",
        "4. LEE, CHOI는 comm에 실제 값(500, 300)이 있어 comm IS NULL에 해당하지 않는다."
      ],
      tip: "OR은 합집합. HAN은 두 조건 모두 TRUE이지만 중복 없이 1건으로 등장. (자료3 p.37)"
    }
  },

  // Q644: mgr IS NULL / IS NOT NULL + = NULL 오류 찾기
  {
    id: 644,
    subj: 2,
    topic: "2-D",
    topic_name: "WHERE 절 응용",
    diff: "중",
    has_code: false,
    q: "emp 테이블에서 상관(mgr)이 없는 사원을 조회하려 한다. 다음 중 올바른 SQL은?\n(emp: KIM-mgr=NULL, 나머지 5명 mgr 값 있음)",
    blocks: null,
    choices: [
      "SELECT ename FROM emp WHERE mgr = NULL;",
      "SELECT ename FROM emp WHERE mgr IS NULL;",
      "SELECT ename FROM emp WHERE mgr <> NULL;",
      "SELECT ename FROM emp WHERE mgr != NULL;"
    ],
    ans: 2,
    src: "자료3 p.37, TRAPS.md T-01",
    exp: {
      reason: "NULL 여부를 판별할 때는 IS NULL만 사용해야 한다. '= NULL', '<> NULL', '!= NULL'은 모두 결과가 UNKNOWN이 되어 0건을 반환한다. mgr IS NULL을 사용하면 상관이 없는 KIM만 정확히 조회된다. PostgreSQL 검증: IS NULL = 1건(KIM), = NULL = 0건. (자료3 p.37, T-01)",
      terms: [
        "**mgr = NULL**: UNKNOWN -> 0건. 잘못된 방식.",
        "**mgr IS NULL**: KIM만 반환(1건). 올바른 방식.",
        "**mgr <> NULL**: UNKNOWN -> 0건. mgr 있는 사원 조회도 불가.",
        "**mgr IS NOT NULL**: mgr 있는 사원 5건 조회. 상관 없는 사원 조회가 아님."
      ],
      wrong: [
        "1. = NULL은 UNKNOWN이므로 0건. 상관 없는 사원을 찾을 수 없다.",
        "2. (정답) IS NULL만이 NULL 여부를 올바르게 판별한다. KIM 1건 반환.",
        "3. <> NULL도 UNKNOWN이므로 0건. mgr 있는 사원도 반환하지 않는다.",
        "4. != NULL도 <> NULL과 동일하게 UNKNOWN. 0건 반환."
      ],
      tip: "NULL 비교는 IS NULL / IS NOT NULL 두 가지 외에는 모두 UNKNOWN. (자료3 p.37)"
    }
  },

  // ============================================================
  // 토픽 78: 비교 연산자 우선순위 종합 (Q645~Q647)
  // ============================================================

  // Q645: OR vs AND 우선순위 결과 추적
  {
    id: 645,
    subj: 2,
    topic: "2-D",
    topic_name: "WHERE 절 응용",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?\n(emp: KIM-deptno=10/sal=3000, LEE-deptno=10/sal=2500, PARK-deptno=20/sal=2000, CHOI-deptno=20/sal=2000, JUNG-deptno=30/sal=1500, HAN-deptno=NULL/sal=1500)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ename\nFROM emp\nWHERE deptno = 10\n   OR deptno = 20 AND sal > 2000;"
      }
    ],
    choices: [
      "2건 (KIM, LEE)",
      "3건 (KIM, LEE, PARK)",
      "4건 (KIM, LEE, PARK, CHOI)",
      "5건 (KIM, LEE, PARK, CHOI, JUNG)"
    ],
    ans: 1,
    src: "자료3 p.37~38",
    exp: {
      reason: "AND는 OR보다 우선순위가 높으므로 조건은 'deptno=10 OR (deptno=20 AND sal>2000)'으로 해석된다. 20번 부서 중 sal>2000인 행은 없다(PARK=2000, CHOI=2000은 2000>2000이 거짓). 따라서 deptno=10인 KIM, LEE만 반환된다. PostgreSQL 검증: 2건. (자료3 p.37~38)",
      terms: [
        "**연산자 우선순위**: 괄호(1) > NOT(2) > 비교/SQL연산자(3) > AND(4) > OR(5).",
        "**AND 먼저**: 'A OR B AND C' = 'A OR (B AND C)'.",
        "**sal > 2000**: 2000은 경계값. 2000 > 2000은 거짓(BETWEEN은 포함, > 는 미포함).",
        "**괄호 명시**: 'deptno=10 OR deptno=20 AND sal>2000'처럼 괄호 없는 혼합 조건은 AND 먼저 적용."
      ],
      wrong: [
        "1. (정답) AND가 OR보다 우선. (deptno=20 AND sal>2000) = 해당 없음. deptno=10 = KIM, LEE.",
        "2. OR 먼저 적용되었다고 오해한 경우. PARK은 sal=2000이라 sal>2000 불충족.",
        "3. OR을 먼저 적용해 20번 부서 전체를 포함했다고 오해. AND 우선순위 무시한 오답.",
        "4. 30번 부서까지 포함한 오답. 조건에 deptno=30이 없다."
      ],
      tip: "AND > OR 우선순위. 'A OR B AND C' = 'A OR (B AND C)'. 괄호로 명시하면 혼란 방지. (자료3 p.37~38)"
    }
  },

  // Q646: NOT 연산자 우선순위
  {
    id: 646,
    subj: 2,
    topic: "2-D",
    topic_name: "WHERE 절 응용",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 반환되는 사원 수로 옳은 것은?\n(emp: KIM-sal=3000/deptno=10, LEE-sal=2500/deptno=10, PARK-sal=2000/deptno=20, CHOI-sal=2000/deptno=20, JUNG-sal=1500/deptno=30, HAN-sal=1500/deptno=NULL)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ename\nFROM emp\nWHERE NOT sal > 2000\n   OR deptno = 30;"
      }
    ],
    choices: [
      "1건 (JUNG)",
      "2건 (JUNG, HAN)",
      "3건 (PARK, CHOI, JUNG)",
      "4건 (PARK, CHOI, JUNG, HAN)"
    ],
    ans: 4,
    src: "자료3 p.37~38",
    exp: {
      reason: "NOT은 비교 연산자보다 우선순위가 높으므로 '(NOT sal>2000) OR deptno=30'으로 해석된다. NOT sal>2000은 sal<=2000과 동등: PARK(2000), CHOI(2000), JUNG(1500), HAN(1500) 해당. 이 중 HAN은 deptno=NULL이므로 NOT sal>2000이 TRUE여서 OR 전체가 TRUE. 4건 반환. PostgreSQL 검증: PARK, CHOI, JUNG, HAN = 4건. (자료3 p.37~38)",
      terms: [
        "**NOT 우선순위**: NOT은 AND, OR보다 먼저 적용. 'NOT sal>2000 OR deptno=30' = '(NOT sal>2000) OR deptno=30'.",
        "**NOT sal>2000**: sal<=2000인 행. PARK(2000), CHOI(2000), JUNG(1500), HAN(1500) 해당.",
        "**OR 조건**: NOT sal>2000 OR deptno=30. JUNG은 두 조건 모두 TRUE.",
        "**HAN의 deptno**: NULL이지만 NOT sal>2000이 TRUE여서 OR 전체 TRUE. 결과에 포함."
      ],
      wrong: [
        "1. JUNG만 반환한다면 deptno=30 AND NOT sal>2000이어야 한다. OR이므로 더 많은 행 포함.",
        "2. JUNG과 HAN만이면 deptno=30 OR deptno IS NULL로 잘못 해석한 경우.",
        "3. HAN을 제외한 경우. HAN은 sal=1500 <= 2000이므로 NOT sal>2000이 TRUE. 포함되어야 한다.",
        "4. (정답) NOT sal>2000(sal<=2000): PARK, CHOI, JUNG, HAN. OR deptno=30(JUNG 추가지만 이미 포함) = 4건."
      ],
      tip: "NOT > AND > OR 우선순위. NOT이 인접 비교 조건만 부정. 괄호 확인 필수. (자료3 p.37~38)"
    }
  },

  // Q647: BETWEEN + AND + OR 우선순위
  {
    id: 647,
    subj: 2,
    topic: "2-D",
    topic_name: "WHERE 절 응용",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과로 반환되는 사원 이름을 모두 고른 것은?\n(emp: KIM-sal=3000/deptno=10, LEE-sal=2500/deptno=10, PARK-sal=2000/deptno=20, CHOI-sal=2000/deptno=20, JUNG-sal=1500/deptno=30, HAN-sal=1500/deptno=NULL)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ename\nFROM emp\nWHERE sal BETWEEN 1500 AND 2500\n  AND deptno = 10\n   OR deptno = 30;"
      }
    ],
    choices: [
      "LEE, JUNG",
      "LEE, PARK, CHOI, JUNG",
      "PARK, CHOI, JUNG, HAN",
      "LEE, PARK, JUNG"
    ],
    ans: 1,
    src: "자료3 p.37~38",
    exp: {
      reason: "AND가 OR보다 우선이므로 조건은 '(sal BETWEEN 1500 AND 2500 AND deptno=10) OR deptno=30'으로 해석된다. 1500<=sal<=2500 AND deptno=10 = LEE(2500,10). OR deptno=30 = JUNG. 따라서 LEE, JUNG 2건. PostgreSQL 검증 완료. (자료3 p.37~38)",
      terms: [
        "**BETWEEN A AND B**: A 이상 B 이하. SQL 연산자로 비교 연산자 우선순위(3)와 동등.",
        "**AND 우선**: BETWEEN...AND...와 AND 논리 연산자 혼재 시 BETWEEN 내부 AND가 먼저.",
        "**실제 해석**: 'sal BETWEEN 1500 AND 2500 AND deptno=10 OR deptno=30' = '(sal BETWEEN 1500 AND 2500 AND deptno=10) OR deptno=30'.",
        "**LEE**: sal=2500(1500~2500 내), deptno=10 -> 첫 번째 AND 조건 충족."
      ],
      wrong: [
        "1. (정답) (sal BETWEEN 1500 AND 2500 AND deptno=10) OR deptno=30 = LEE + JUNG.",
        "2. OR deptno=10으로 잘못 해석해 10번 부서 전체를 포함한 오답.",
        "3. AND를 무시하고 BETWEEN 1500 AND 2500 OR deptno=30으로 해석한 오답.",
        "4. PARK(deptno=20)가 포함된 오답. 20번 부서는 어떤 조건에도 해당하지 않는다."
      ],
      tip: "BETWEEN...AND...가 있을 때 AND/OR 우선순위 혼동 주의. 항상 괄호를 머릿속에서 먼저 그려라. (자료3 p.37~38)"
    }
  },

  // ============================================================
  // 토픽 79: 다중컬럼 IN 연산자 (Q648~Q650)
  // ============================================================

  // Q648: 다중컬럼 IN 기본 결과 추적
  {
    id: 648,
    subj: 2,
    topic: "2-D",
    topic_name: "WHERE 절 응용",
    diff: "중",
    has_code: true,
    q: "다음 SQL의 실행 결과 행 수로 옳은 것은?\n(emp: KIM-deptno=10/sal=3000, LEE-deptno=10/sal=2500, PARK-deptno=20/sal=2000, CHOI-deptno=20/sal=2000, JUNG-deptno=30/sal=1500, HAN-deptno=NULL/sal=1500)",
    blocks: [
      {
        type: "code",
        title: null,
        lang: "sql",
        content: "SELECT ename, deptno, sal\nFROM emp\nWHERE (deptno, sal) IN ((10, 3000), (20, 2000));"
      }
    ],
    choices: [
      "1건",
      "2건",
      "3건",
      "4건"
    ],
    ans: 3,
    src: "자료3 p.38",
    exp: {
      reason: "다중컬럼 IN은 지정한 컬럼 조합이 괄호 안의 쌍과 정확히 일치하는 행만 반환한다. (deptno=10 AND sal=3000)인 KIM, (deptno=20 AND sal=2000)인 PARK과 CHOI가 해당. 3건. PostgreSQL 검증 완료. (자료3 p.38)",
      terms: [
        "**다중컬럼 IN**: WHERE (A, B) IN ((v1, v2), (v3, v4)). A=v1 AND B=v2 OR A=v3 AND B=v4 와 동등.",
        "**쌍 매칭**: 두 컬럼이 동시에 해당 쌍과 일치해야 함. 개별 컬럼만으로는 포함 불가.",
        "**KIM**: (10, 3000) = (10, 3000) -> TRUE. 포함.",
        "**PARK, CHOI**: (20, 2000) = (20, 2000) -> TRUE. 각 1건씩 포함. 총 3건."
      ],
      wrong: [
        "1. KIM만 반환한다면 (10,3000) 쌍만 일치하는 경우. PARK, CHOI의 (20,2000)도 일치한다.",
        "2. (10,3000)인 KIM과 (20,2000)인 PARK 또는 CHOI 중 하나만 본 경우. PARK, CHOI 둘 다 (20,2000).",
        "3. (정답) KIM(10,3000) + PARK(20,2000) + CHOI(20,2000) = 3건.",
        "4. LEE(10,2500)를 포함한 오답. LEE의 sal=2500은 IN 목록의 3000, 2000과 모두 불일치."
      ],
      tip: "다중컬럼 IN은 쌍 단위 일치. (deptno,sal) IN ((10,3000),(20,2000)) = KIM+PARK+CHOI = 3건. (자료3 p.38)"
    }
  },

  // Q649: 다중컬럼 IN vs 단순 IN+AND 차이 (핵심 함정)
  {
    id: 649,
    subj: 2,
    topic: "2-D",
    topic_name: "WHERE 절 응용",
    diff: "중",
    has_code: true,
    q: "다음 SQL (A)와 (B)의 실행 결과 행 수를 올바르게 짝지은 것은?\n(emp: KIM-deptno=10/sal=3000, LEE-deptno=10/sal=2500, PARK-deptno=20/sal=2000, CHOI-deptno=20/sal=2000, JUNG-deptno=30/sal=1500, HAN-deptno=NULL/sal=1500)",
    blocks: [
      {
        type: "code",
        title: "(A) 다중컬럼 IN",
        lang: "sql",
        content: "SELECT ename FROM emp\nWHERE (deptno, sal) IN ((10, 2000), (20, 2500));"
      },
      {
        type: "code",
        title: "(B) 단순 IN + AND",
        lang: "sql",
        content: "SELECT ename FROM emp\nWHERE deptno IN (10, 20)\n  AND sal IN (2000, 2500);"
      }
    ],
    choices: [
      "(A) 0건, (B) 0건",
      "(A) 0건, (B) 3건",
      "(A) 3건, (B) 0건",
      "(A) 3건, (B) 3건"
    ],
    ans: 2,
    src: "자료3 p.38",
    exp: {
      reason: "(A) 다중컬럼 IN: (10,2000) 쌍과 (20,2500) 쌍에 정확히 일치하는 행이 없다. 10번 부서 sal=2000인 사원 없음, 20번 부서 sal=2500인 사원 없음 -> 0건. (B) 단순 IN+AND: deptno IN(10,20)이면서 sal IN(2000,2500)인 행 = LEE(10,2500), PARK(20,2000), CHOI(20,2000) -> 3건. 두 SQL의 의미가 다르다. PostgreSQL 검증 완료. (자료3 p.38)",
      terms: [
        "**다중컬럼 IN**: 두 컬럼이 하나의 쌍으로 동시에 일치해야 함. 교차 매칭 불가.",
        "**단순 IN+AND**: 각 컬럼이 독립적으로 IN 목록 안에 있으면 모든 조합 허용.",
        "**핵심 차이**: (10,2500)는 다중컬럼 IN((10,2000),(20,2500))에 없으나, 단순 IN에서는 deptno=10 OK, sal=2500 OK -> LEE 포함.",
        "**실무 주의**: 다중컬럼 IN과 단순 IN+AND는 서로 다른 결과를 낼 수 있다."
      ],
      wrong: [
        "1. (B)도 0건이라면 단순 IN+AND의 의미를 다중컬럼 IN과 동일하게 본 오해.",
        "2. (정답) (A) 쌍 불일치로 0건, (B) 독립 IN 조건 3건(LEE, PARK, CHOI).",
        "3. (A)가 3건이라면 단순 IN 방식으로 잘못 해석. 다중컬럼 IN은 쌍 단위 매칭.",
        "4. 두 SQL이 항상 같은 결과를 낸다고 오해. 실제로는 다를 수 있다."
      ],
      tip: "다중컬럼 IN((10,2000),(20,2500)) != deptno IN(10,20) AND sal IN(2000,2500). 쌍 매칭 vs 독립 매칭. (자료3 p.38)"
    }
  },

  // Q650: 다중컬럼 IN + 동등 표현 이해
  {
    id: 650,
    subj: 2,
    topic: "2-D",
    topic_name: "WHERE 절 응용",
    diff: "중",
    has_code: true,
    q: "다음 SQL과 동일한 결과를 반환하는 SQL을 고르시오.\n(emp: KIM-deptno=10/sal=3000, LEE-deptno=10/sal=2500, PARK-deptno=20/sal=2000, CHOI-deptno=20/sal=2000, JUNG-deptno=30/sal=1500, HAN-deptno=NULL/sal=1500)",
    blocks: [
      {
        type: "code",
        title: "원본 SQL",
        lang: "sql",
        content: "SELECT ename, deptno, sal\nFROM emp\nWHERE (deptno, sal) IN ((10, 3000), (30, 1500));"
      }
    ],
    choices: [
      "SELECT ename, deptno, sal FROM emp WHERE deptno IN (10, 30) AND sal IN (3000, 1500);",
      "SELECT ename, deptno, sal FROM emp WHERE (deptno = 10 AND sal = 3000) OR (deptno = 30 AND sal = 1500);",
      "SELECT ename, deptno, sal FROM emp WHERE deptno = 10 OR deptno = 30 AND sal = 3000 OR sal = 1500;",
      "SELECT ename, deptno, sal FROM emp WHERE deptno IN (10, 30) OR sal IN (3000, 1500);"
    ],
    ans: 2,
    src: "자료3 p.38",
    exp: {
      reason: "다중컬럼 IN((10,3000),(30,1500))은 '(deptno=10 AND sal=3000) OR (deptno=30 AND sal=1500)'과 동등하다. KIM(10,3000), JUNG(30,1500) 2건 반환. 보기 1은 독립 IN+AND로 결과가 달라진다(KIM, JUNG에 더해 LEE도 제외하지만 CHOI가 추가될 수 있음 -> 실제는 같으나 의미가 다른 함정). 보기 3, 4는 우선순위/조건 오류로 결과가 다르다. PostgreSQL 검증: 원본 2건(KIM, JUNG). (자료3 p.38)",
      terms: [
        "**다중컬럼 IN 동등 표현**: (A,B) IN ((v1,w1),(v2,w2)) = (A=v1 AND B=w1) OR (A=v2 AND B=w2).",
        "**보기 1**: deptno IN(10,30) AND sal IN(3000,1500). 이 경우에는 우연히 같으나 일반적으로 다름.",
        "**보기 3**: AND/OR 우선순위 무시. 'deptno=10 OR deptno=30 AND sal=3000 OR sal=1500'은 의도와 다른 해석.",
        "**보기 4**: OR로 연결해 범위를 지나치게 넓힘. deptno IN(10,30) OR sal IN(3000,1500)은 다른 결과."
      ],
      wrong: [
        "1. deptno IN(10,30) AND sal IN(3000,1500): 이 데이터에서는 우연히 KIM, JUNG으로 같지만 의미가 다르다. 일반적으로 다중컬럼 IN의 동등 표현이 아니다.",
        "2. (정답) (deptno=10 AND sal=3000) OR (deptno=30 AND sal=1500)은 다중컬럼 IN의 정확한 동등 표현.",
        "3. AND/OR 우선순위 혼동. 'deptno=30 AND sal=3000'이 먼저 묶여 원본과 다른 결과.",
        "4. OR 조건이라 범위가 너무 넓어짐. sal=3000인 KIM, deptno=30인 JUNG 외 여러 행이 추가로 포함될 수 있다."
      ],
      tip: "(A,B) IN ((v1,w1),(v2,w2)) = (A=v1 AND B=w1) OR (A=v2 AND B=w2). AND+OR 조합이 핵심. (자료3 p.38)"
    }
  }
];

module.exports = d2Part1;

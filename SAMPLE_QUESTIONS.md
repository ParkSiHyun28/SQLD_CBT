# SQLD CBT 시범 문제 10선 (v3 간소화)

> 작성일: 2026-05-03 (v3)
> 해설 구조: 정답 + 근거 / 용어 / 오답 분석 / 암기 팁
> 검증: 코드 문제는 PostgreSQL 14로 직접 실행. Oracle 전용 동작은 자료 인용.

---

## 1과목 (3문항)

### Q1. 데이터 모델링의 3가지 관점 (난이도 중)

다음 중 데이터 모델링의 3가지 관점에 해당하는 항목으로만 묶인 것은?

1. 데이터 관점 / 프로세스 관점 / 데이터와 프로세스의 상관 관점
2. 데이터 관점 / 프로세스 관점 / 사용자 관점
3. 개념적 관점 / 논리적 관점 / 물리적 관점
4. 외부 관점 / 개념 관점 / 내부 관점

**정답: 1** — 데이터 모델링은 데이터(What), 프로세스(How), 둘의 상관(Interaction) 세 시각으로 본다. (자료3 p.1)

#### 용어
- **데이터 관점**: 어떤 데이터가 시스템에 저장되어야 하는가
- **프로세스 관점**: 그 데이터로 어떤 일이 일어나는가
- **상관 관점(Interaction)**: 프로세스가 어떤 데이터를 어떻게 사용하는가 (CRUD 매트릭스)

#### 오답 분석
2. 사용자 관점은 모델링 관점이 아니라 별도의 사용자 분석 영역.
3. 모델링의 **3단계**(개념적/논리적/물리적). "관점"이 아니라 "단계".
4. 데이터베이스 **3단계 스키마 구조**(외부/개념/내부). "관점"도 "단계"도 아닌 스키마 추상화 레벨.

#### 암기 팁
관점 = **데프상**(데이터-프로세스-상관) / 단계 = **개논물** / 스키마 = **외개내**. 셋이 다른 개념.

---

### Q2. 주식별자의 4대 특성 (난이도 중)

다음 중 주식별자의 4대 특성에 모두 해당하지 않는 항목으로만 묶인 것은?

1. 유일성, 최소성
2. 불변성, 존재성
3. 가변성, 종속성
4. 최소성, 불변성

**정답: 3** — 주식별자 4대 특성은 유일성, 최소성, 불변성, 존재성. 가변성/종속성은 식별자 특성이 아님. (자료3 p.9)

#### 용어
- **유일성**: 모든 인스턴스를 구분 가능
- **최소성**: 유일성을 만족하는 최소 속성 수
- **불변성**: 한 번 부여된 값은 변하지 않음
- **존재성**: 반드시 값이 존재(NOT NULL)

#### 오답 분석
1. 유일성+최소성 둘 다 4대 특성. "해당하지 않는 항목"이 아님.
2. 불변성+존재성 둘 다 4대 특성.
4. 최소성+불변성 둘 다 4대 특성.

#### 암기 팁
**유최불존**. 가변성/종속성/완전성/일관성 같은 비슷한 단어는 다 식별자 특성 아님.

---

### Q3. 정규형 위반 판별 (난이도 상)

다음 함수적 종속성을 갖는 릴레이션 R(학번, 과목코드, 성적, 학생이름, 학과명, 학과위치)이 있다.

```
{학번, 과목코드} → 성적
학번 → 학생이름
학번 → 학과명
학과명 → 학과위치
```

이 릴레이션에 대한 설명으로 가장 적절한 것은?

1. 1NF는 위반하지만 2NF는 만족한다.
2. 1NF는 만족하지만 2NF를 위반한다. 이행 종속은 존재하지 않는다.
3. 1NF는 만족하지만 2NF를 위반한다. 이행 종속도 함께 존재하므로 3NF 분해까지 필요하다.
4. 2NF까지는 만족하지만 3NF만 위반한다.

**정답: 3** — 모든 속성이 원자값이라 1NF 만족, 학번에만 종속되는 학생이름/학과명 때문에 2NF 위반, 학번→학과명→학과위치 이행 종속까지 있어 3NF도 위반. (자료3 p.13~14)

#### 용어
- **NF(Normal Form, 정규형)**: 정규화 결과로 도달하는 단계별 상태 (1NF, 2NF, 3NF, BCNF, …)
- **후보키(Candidate Key)**: 행을 유일하게 식별하는 속성 조합 (여기서는 {학번, 과목코드})
- **함수적 종속(A→B)**: A 값이 정해지면 B 값이 하나로 결정됨
- **부분 함수 종속**: 복합 식별자의 **일부 속성에만** 종속되는 것 (학생이름이 학번 하나에만 종속)
- **이행 함수 종속**: A→B→C로 중간 단계를 거쳐 결정되는 종속 (학번→학과명→학과위치)
- **1NF**: 모든 속성이 원자값(쪼개지지 않음) / **2NF**: 부분 종속 제거 / **3NF**: 이행 종속 제거 / **BCNF**: 모든 결정자가 후보키

#### 오답 분석
1. 모든 속성이 원자값이라 1NF는 만족.
2. 학과명→학과위치 이행 종속이 존재. "이행 종속 없음"은 거짓.
4. 학번에만 종속되는 학생이름/학과명 때문에 2NF부터 위반. 부분 종속을 놓침.

#### 암기 팁
부분 종속 = **2NF** / 이행 종속 = **3NF** / 결정자≠후보키 = **BCNF**. 후보키가 단일 속성이면 부분 종속 자체가 불가능 → 2NF 자동 통과.

---

## 2과목 (7문항)

### Q4. NULL 산술 연산과 집계 함수 (난이도 중) [코드]

```sql
-- EMP 테이블 (5건)
EMPNO  ENAME  SAL    COMM
1      KIM    3000   NULL
2      LEE    2500   500
3      PARK   2000   NULL
4      CHOI   2000   300
5      JUNG   1500   NULL

SELECT COUNT(*)    AS A,
       COUNT(COMM) AS B,
       SUM(COMM)   AS C,
       AVG(COMM)   AS D
FROM EMP;
```

다음 중 위 SQL의 실행 결과 (A, B, C, D)로 옳은 것은?

1. (5, 2, 800, 160)
2. (5, 2, 800, 400)
3. (5, 5, 800, 160)
4. (2, 2, 800, 400)

**정답: 2** — (5, 2, 800, 400). PostgreSQL 검증 완료. (자료3 p.60~61)

#### 용어 / 함수 동작
- **COUNT(\*)**: 행 자체를 세므로 NULL 컬럼이 있어도 1로 셈 → 5
- **COUNT(컬럼)**: 해당 컬럼의 NULL을 무시하고 셈 → COMM이 NULL 아닌 LEE/CHOI 두 건 → 2
- **SUM(컬럼)**: NULL을 무시한 합 → 500+300=800
- **AVG(컬럼)**: NULL 무시한 합 ÷ NULL 무시한 행 수 → 800÷2=400 (분모도 NULL 빼고 셈)
- **NULL 산술**: NULL과 어떤 값을 더해도 NULL (예: 3000+NULL=NULL)

#### 오답 분석
1. AVG 분모를 5로 잘못 계산 (800÷5=160). AVG는 NULL 아닌 행 수로 나눔.
3. COUNT(COMM)이 NULL을 포함한다고 착각 + AVG 분모 5. 두 함정 동시 적용.
4. COUNT(\*)이 NULL 행을 빼고 센다고 착각. \*는 행을 셈.

#### 암기 팁
COUNT(\*) = 행 세기 / 나머지 집계 = NULL 빼고 / AVG는 분모도 NULL 빼고.

---

### Q5. SUBSTR 함수 결과 추적 (난이도 중) [코드]

```sql
-- Oracle 환경
SELECT SUBSTR('SQLDeveloper', 4, 3)  AS R1,
       SUBSTR('SQLDeveloper', -3, 2) AS R2
FROM DUAL;
```

다음 중 위 SQL의 실행 결과 (R1, R2)로 옳은 것은?

1. ('Dev', 'pe')
2. ('Dev', 'er')
3. ('LDe', 'op')
4. ('Deve', 'per')

**정답: 1** — ('Dev', 'pe'). (자료3 p.32)

#### 용어 / 함수 동작
- **SUBSTR(문자열, 시작위치, 길이)**: 시작은 **1부터** (0 아님)
- **음수 시작 위치**: 끝에서부터 N번째 문자 (Oracle/MySQL/PostgreSQL 동일하게 적용 가능, 단 PostgreSQL은 빈 문자열 반환 등 차이 있음)
- 인덱스: `S(1) Q(2) L(3) D(4) e(5) v(6) e(7) l(8) o(9) p(10) e(11) r(12)`
- R1 = 4번째 'D'부터 3개 = **'Dev'**
- R2 = 끝에서 3번째 'p'부터 2개 = **'pe'**
- **SQL Server는 SUBSTR이 아니라 SUBSTRING** 사용 (시작 1부터 동일, 음수 처리는 다름)

#### 오답 분석
2. R2 시작을 -2('e')로 본 경우. -3은 끝에서 3번째('p').
3. R1 시작을 3 또는 0-indexed로 본 경우.
4. R1, R2 모두 길이 인수를 한 자리씩 더 가져옴.

#### 암기 팁
SUBSTR(문자열, **시작은 1부터**, 길이). 음수 시작 = 끝에서 N번째.

---

### Q6. INNER JOIN 결과 행 수 (난이도 중) [코드]

```sql
-- EMP (4건):  KIM(10), LEE(10), PARK(20), CHOI(NULL)
-- DEPT (3건): 10:SALES, 20:IT, 30:HR

SELECT COUNT(*)
FROM EMP E INNER JOIN DEPT D
  ON E.DEPTNO = D.DEPTNO;
```

다음 중 위 SQL의 결과 행 수로 옳은 것은?

1. 3
2. 4
3. 5
4. 12

**정답: 1** — INNER 3, LEFT 4, RIGHT 4, FULL 5, CROSS 12. PostgreSQL 검증. (자료3 p.47)

#### 용어 / 조인 동작
- **INNER JOIN**: 양쪽 일치하는 행만 (NULL은 어떤 값과도 매칭 안 됨)
- **LEFT OUTER JOIN**: 왼쪽 전체 + 오른쪽 일치 (미매칭은 NULL)
- **RIGHT OUTER JOIN**: 오른쪽 전체 + 왼쪽 일치
- **FULL OUTER JOIN**: 양쪽 전체 (양쪽 미매칭 모두 NULL로 채움)
- **CROSS JOIN**: 카타시안 곱 (m × n 행)
- 매칭 결과: KIM-SALES, LEE-SALES, PARK-IT 3건. CHOI(DEPTNO=NULL)와 HR(EMP 없음)은 INNER에서 제외.

#### 오답 분석
2. **4** = LEFT OUTER 결과 (CHOI까지 포함).
3. **5** = FULL OUTER 결과 (CHOI + HR 양쪽 포함).
4. **12** = CROSS JOIN 결과 (4×3, 조인 조건 무시).

#### 암기 팁
INNER=매칭만 / LEFT=왼쪽 전체 / RIGHT=오른쪽 전체 / FULL=양쪽 전체 / CROSS=곱. NULL은 어떤 조건도 만족 못 함.

---

### Q7. NATURAL JOIN과 USING 절 (난이도 중) [코드]

```sql
-- EMP(EMPNO, ENAME, DEPTNO), DEPT(DEPTNO, DNAME)

-- (가) SELECT * FROM EMP NATURAL JOIN DEPT;
-- (나) SELECT * FROM EMP E NATURAL JOIN DEPT D WHERE E.DEPTNO = 10;
-- (다) SELECT * FROM EMP JOIN DEPT USING (DEPTNO);
-- (라) SELECT * FROM EMP E JOIN DEPT D USING (E.DEPTNO);
```

다음 중 정상 실행되는 SQL을 모두 고른 것은?

1. (가), (다)
2. (가), (나), (다)
3. (가), (다), (라)
4. (나), (라)

**정답: 1** — (가), (다)만 정상. (자료3 p.47~48)

#### 용어 / 문법 규칙
- **NATURAL JOIN**: 두 테이블의 동일 이름/타입 컬럼을 자동 조인. 조인 컬럼에 **테이블 별칭 금지**
- **USING (컬럼)**: 두 테이블 동일 컬럼명일 때 사용. USING 안에 **테이블 별칭 금지**
- **ON 절**: 컬럼명이 달라도 조인 가능. 별칭 자유 (가장 유연)
- 별칭 금지 이유: NATURAL/USING의 조인 컬럼은 양쪽 동일 취급이라 한쪽 특정 불가
- SQL Server는 NATURAL JOIN, USING 절 둘 다 미지원

#### 오답 분석
2. (나)는 NATURAL JOIN 후 WHERE에 `E.DEPTNO` 별칭 사용 → 오류.
3. (라)는 USING 안에 `E.DEPTNO` 별칭 사용 → 오류.
4. 정확히 반대로 본 경우. 별칭 사용한 (나)/(라)가 실패.

#### 암기 팁
USING/NATURAL의 조인 컬럼은 **별칭 금지** / ON은 자유.

---

### Q8. 상호연관 서브쿼리 (난이도 중) [코드]

```sql
-- EMP (6건):
-- (1,KIM,10,3000) (2,LEE,10,2500) (3,PARK,10,2500)
-- (4,CHOI,20,2000) (5,JUNG,20,2000) (6,HAN,20,1500)

SELECT ENAME, DEPTNO, SAL
FROM EMP E1
WHERE SAL = (SELECT MAX(SAL)
             FROM EMP E2
             WHERE E2.DEPTNO = E1.DEPTNO);
```

다음 중 위 SQL의 결과 행 수로 옳은 것은?

1. 1
2. 2
3. 3
4. 6

**정답: 3** — 3행 (KIM, CHOI, JUNG). PostgreSQL 검증. (자료3 p.57~58)

#### 용어 / 처리 순서
- **상호연관(Correlated) 서브쿼리**: 서브쿼리가 메인쿼리 컬럼(`E1.DEPTNO`)을 참조. **메인쿼리 행마다 서브쿼리 1번 실행**
- **비연관(Un-correlated) 서브쿼리**: 메인쿼리 컬럼 참조 없음. 서브쿼리 1번만 실행
- 처리 흐름: E1의 각 행 → 그 행의 DEPTNO와 같은 부서의 MAX(SAL) 계산 → SAL과 비교
- 결과: DEPTNO=10의 MAX=3000 → KIM 1건 / DEPTNO=20의 MAX=2000 → CHOI, JUNG 2건 (동률)
- WHERE의 `=`는 단일행 서브쿼리만. 다중행이면 IN/ANY/ALL

#### 오답 분석
1. 비연관으로 본 경우. 전체 MAX=3000 → KIM만.
2. 부서 2개 = 2명이라 본 경우. 동률(CHOI, JUNG) 놓침.
4. 모든 행이 통과한다고 본 경우. 같은 부서 내 비교라 모두 통과는 아님.

#### 암기 팁
서브쿼리에 메인 컬럼 참조 = 상호연관 = 행마다 재실행. 부서별 최고/최저 동률 주의.

---

### Q9. RANK vs DENSE_RANK vs ROW_NUMBER (난이도 중) [코드]

```sql
-- EMP의 DEPTNO=20: CHOI(2000), JUNG(2000), HAN(1500)

SELECT ENAME, SAL,
  RANK()       OVER (ORDER BY SAL DESC) AS R,
  DENSE_RANK() OVER (ORDER BY SAL DESC) AS DR,
  ROW_NUMBER() OVER (ORDER BY SAL DESC) AS RN
FROM EMP
WHERE DEPTNO = 20;
```

다음 중 HAN의 (R, DR, RN) 값으로 옳은 것은?

1. (2, 2, 2)
2. (3, 2, 3)
3. (3, 3, 3)
4. (2, 2, 3)

**정답: 2** — (3, 2, 3). PostgreSQL 검증. (자료3 p.70)

#### 용어 / 함수 동작
- **RANK()**: 동률에 같은 순위, 다음 순위 **건너뜀** → 1, 1, 3
- **DENSE_RANK()**: 동률에 같은 순위, **건너뛰지 않음** → 1, 1, 2
- **ROW_NUMBER()**: 동률 무시, 항상 **고유 번호** → 1, 2, 3
- **OVER (ORDER BY ...)**: 순위 매길 정렬 기준
- **PARTITION BY**: 그룹별로 순위 리셋 (이 문제에는 없음)
- 결과: CHOI(R=1, DR=1, RN=1) / JUNG(R=1, DR=1, RN=2) / HAN(R=3, DR=2, RN=3)

#### 오답 분석
1. (2, 2, 2): 세 함수가 모두 같다고 본 경우. RANK는 건너뜀.
3. (3, 3, 3): DENSE_RANK도 건너뛴다고 본 경우. DENSE = 촘촘함 = 건너뛰지 않음.
4. (2, 2, 3): RANK가 건너뛰지 않는다고 본 경우. RANK는 건너뛰는 게 본질.

#### 암기 팁
R = 건너뜀 / DR = 안 건너뜀(촘촘함) / RN = 무조건 고유.

---

### Q10. CTAS와 제약조건 복제 (난이도 중) [코드]

```sql
-- Oracle 환경
CREATE TABLE T1 (
  A INTEGER PRIMARY KEY,
  B VARCHAR2(10) NOT NULL,
  C VARCHAR2(10) DEFAULT 'X',
  CONSTRAINT CK_C CHECK (C IN ('X', 'Y'))
);

CREATE TABLE T2 AS SELECT * FROM T1;
```

다음 중 T2 테이블에 복제되는 제약조건/속성으로 옳은 것은?

1. PRIMARY KEY, NOT NULL, CHECK 모두 복제. DEFAULT는 미복제.
2. PRIMARY KEY와 NOT NULL만 복제. CHECK와 DEFAULT는 미복제.
3. NOT NULL만 복제. PRIMARY KEY, CHECK, DEFAULT 모두 미복제.
4. NOT NULL과 DEFAULT만 복제. PRIMARY KEY와 CHECK는 미복제.

**정답: 3** — Oracle CTAS는 NOT NULL만 복제. (자료3 p.91~92)

#### 용어 / 동작
- **CTAS(CREATE TABLE AS SELECT)**: 기존 테이블에서 데이터와 컬럼 정의로 새 테이블 생성. **제약 중 NOT NULL만 따라옴**
- **PK / UNIQUE / CHECK / FK / DEFAULT 모두 미복제**
- 데이터 없이 구조만 복제: `WHERE 1=0` 같이 항상 거짓 조건 추가
- SQL Server 동등 문법: `SELECT ... INTO 새테이블 FROM ...`
- 모든 제약 복제하려면 별도 `ALTER TABLE ... ADD CONSTRAINT ...` 또는 DDL 추출 후 재실행

#### 오답 분석
1. PK와 CHECK도 복제된다고 본 경우. PK 인덱스/제약은 별도 ADD 필요.
2. PK가 복제된다고 본 흔한 오해. PK는 복제 대상 아님.
4. DEFAULT가 컬럼 정의의 일부라 복제된다고 본 경우. DEFAULT도 미복제.

#### 암기 팁
CTAS는 **NOT NULL만 데려간다**. PK/UNIQUE/CHECK/FK/DEFAULT는 새 테이블에서 다시 만들어야 함.

---

## 검증 요약

| # | 영역 | 검증 | 결과 |
|---|------|------|------|
| Q1 | 모델링 3관점 | 자료3 p.1 | 데이터/프로세스/상관 |
| Q2 | 식별자 4특성 | 자료3 p.9 | 유최불존 |
| Q3 | 정규형 위반 | 자료3 p.13 | 2NF + 3NF 둘 다 위반 |
| Q4 | NULL 집계 | PostgreSQL ✓ | (5, 2, 800, 400) |
| Q5 | SUBSTR | 자료3 p.32 | ('Dev', 'pe') |
| Q6 | INNER JOIN 행수 | PostgreSQL ✓ | 3 |
| Q7 | NATURAL/USING | 자료3 p.47 | (가),(다) 정상 |
| Q8 | 상호연관 서브쿼리 | PostgreSQL ✓ | 3행 |
| Q9 | 윈도우 순위 | PostgreSQL ✓ | (3, 2, 3) |
| Q10 | CTAS 제약 | 자료3 p.91 | NOT NULL만 |

---

## 분량 비교

| 버전 | 한 문항 평균 | 10문항 총 | 500문항 환산 |
|------|------------|----------|------------|
| v2 (4단 풀버전) | 50줄, 2.2KB | 522줄, 22KB | 26000줄, 1.1MB |
| **v3 (간소화)** | **약 25줄, 1.0KB** | **약 250줄, 10KB** | **12500줄, 500KB** |

작성/학습 시간 모두 약 절반으로 압축. 정확성(정답 근거 + 자료 페이지)은 유지.

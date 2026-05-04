# SQLD 출제 함정 모음

> 작성일: 2026-05-03
> 목적: 시험 빈출 함정 + 출제 시 활용할 변별 포인트
> 사용: 양산 시 보기 구성에 활용 / 학습자가 시험 직전 사전처럼 활용
> 검증: 코드 함정은 PostgreSQL 14로 직접 실행 검증

---

## 사용법

각 함정에는 다음 정보가 들어 있습니다.
- **상황**: 어떤 SQL/개념에서 발생하는가
- **함정**: 무엇을 헷갈리는가
- **올바른 동작**: 실제로 어떻게 동작하는가
- **출제 시 활용**: 어떤 형태의 보기로 만들면 좋은가

---

## NULL 관련 함정 (5개)

### T-01. NULL 비교 연산자 사용 불가

- **상황**: NULL인 컬럼을 `=` 또는 `<>`로 비교할 때
- **함정**: `WHERE COMM = NULL`이 NULL 값 행을 찾을 거라 오해
- **올바른 동작**: NULL과 어떤 값을 비교해도 결과는 NULL(unknown). WHERE 조건이 NULL이면 그 행은 결과에서 제외됨. NULL 검색은 오직 `IS NULL` / `IS NOT NULL`만 가능.

```sql
-- 잘못된 예 (행 0건 반환)
SELECT * FROM EMP WHERE COMM = NULL;
SELECT * FROM EMP WHERE COMM <> NULL;

-- 올바른 예
SELECT * FROM EMP WHERE COMM IS NULL;
SELECT * FROM EMP WHERE COMM IS NOT NULL;
```

- **출제 시 활용**: WHERE 조건의 결과 행 수를 묻는 문제에서 `=NULL`이 들어간 보기를 함정으로 배치.
- **연관 토픽**: 1-J(NULL 속성), 2-D(WHERE 응용)

---

### T-02. COUNT(\*)만 NULL을 포함

- **상황**: 집계 함수가 NULL을 어떻게 처리하는지
- **함정**: 모든 집계가 NULL을 똑같이 다룬다고 오해
- **올바른 동작**:
  - `COUNT(*)`: 행 자체를 셈 → NULL 컬럼 있어도 1로 카운트
  - `COUNT(컬럼)`, `SUM`, `AVG`, `MIN`, `MAX`: NULL 무시
  - `AVG(컬럼)`: NULL 무시한 합 ÷ NULL 무시한 행 수 (분모도 NULL 빼고)

```sql
-- 5명 중 COMM이 NULL인 사원 3명, 값 있는 사원 2명(500, 300)
SELECT COUNT(*),     -- 5
       COUNT(COMM),  -- 2
       SUM(COMM),    -- 800
       AVG(COMM)     -- 400 (800÷2, 5가 아님)
FROM EMP;
```

- **출제 시 활용**: 같은 SELECT의 4개 결과값을 보기로 변형. 분모 5/2 차이, COUNT 5/2 차이로 함정 보기 4개 생성.
- **연관 토픽**: 2-E(GROUP BY), 시범 문제 Q4

---

### T-03. NOT IN에 NULL이 있으면 결과 0건

- **상황**: `NOT IN (..., NULL, ...)` 사용
- **함정**: NULL이 포함되어 있어도 다른 값과 비교는 정상이라 오해
- **올바른 동작**: `v NOT IN (1, 2, NULL)`은 `v <> 1 AND v <> 2 AND v <> NULL`로 풀리는데, 마지막 항이 NULL이라 전체 AND 결과가 NULL. WHERE 결과가 NULL이면 그 행은 제외 → 모든 행이 사라짐.

```sql
-- v=1, 2, 3 세 행
WITH t(v) AS (VALUES (1), (2), (3))
SELECT v FROM t WHERE v NOT IN (1, 2, NULL);
-- 결과: 0건 (3도 빠짐)

-- 올바른 예: NULL 사전 제거
SELECT v FROM t WHERE v NOT IN (SELECT x FROM ... WHERE x IS NOT NULL);
```

- **출제 시 활용**: 서브쿼리 결과에 NULL이 포함된 시나리오에서 NOT IN 결과 행 수 묻기.
- **연관 토픽**: 2-G(서브쿼리), 2-D(WHERE)

---

### T-04. NULL 산술 연산은 NULL

- **상황**: `SAL + COMM`처럼 NULL이 포함된 산술
- **함정**: NULL을 0과 같다고 보고 계산
- **올바른 동작**: NULL과 숫자/문자 연산 모두 결과 NULL. 0으로 처리하려면 `NVL(COMM, 0)` 또는 `COALESCE(COMM, 0)`로 명시.

```sql
SELECT SAL + COMM FROM EMP;   -- COMM이 NULL인 행은 결과 NULL
SELECT SAL + COALESCE(COMM, 0) FROM EMP;   -- 0으로 처리
```

- **출제 시 활용**: 결과 추적 문제에서 NULL이 섞인 산술 결과를 묻기.
- **연관 토픽**: 1-J(NULL), 2-C(함수)

---

### T-05. Oracle vs SQL Server NULL 정렬

- **상황**: `ORDER BY` ASC/DESC와 NULL 위치
- **함정**: 모든 DBMS가 NULL을 같은 위치에 둔다고 오해
- **올바른 동작**:
  - Oracle: NULL을 **최댓값으로** 취급 → ASC면 끝, DESC면 처음
  - SQL Server: NULL을 **최솟값으로** 취급 → ASC면 처음, DESC면 끝
  - PostgreSQL: ASC NULLS LAST, DESC NULLS FIRST 기본 (Oracle과 동일)
- **명시 방법**: `ORDER BY 컬럼 ASC NULLS FIRST` / `NULLS LAST`로 강제 가능.

- **출제 시 활용**: "Oracle에서 다음 SELECT의 결과 첫 행은?"과 "SQL Server에서는?"으로 비교 문항.
- **연관 토픽**: 2-B(SELECT 기본), 시험 단골 함정

---

## 함수 관련 함정 (3개)

### T-06. NVL2 인수 구조

- **상황**: `NVL2(a, b, c)` 사용
- **함정**: NVL과 동일하게 첫 인수가 NULL일 때 두 번째 반환한다고 오해
- **올바른 동작**:
  - `NVL(a, b)`: a가 NULL이면 b, NULL 아니면 a
  - **`NVL2(a, b, c)`: a가 NULL이 **아니면** b, NULL **이면** c**

```sql
NVL(COMM, 0)         -- COMM NULL이면 0
NVL2(COMM, 1, 0)     -- COMM이 있으면 1(보너스 받음), NULL이면 0
```

- **출제 시 활용**: NVL과 NVL2 결과를 둘 다 보여주고 어느 것이 정답인지 묻는 함수 매칭 문제.
- **연관 토픽**: 2-C(NULL 처리 함수)

---

### T-07. ROUND 음수 자리수

- **상황**: `ROUND(123.456, -1)` 사용
- **함정**: 음수 자리수의 의미를 오해
- **올바른 동작**: 자리수가 양수면 소수점 이하, 음수면 정수부의 자리.
  - `ROUND(123.456, 1)` = 123.5 (소수 첫째자리)
  - `ROUND(123.456, -1)` = 120 (10의 자리)
  - `ROUND(123.456, 0)` = 123 (정수)
- PostgreSQL/Oracle 모두 동일 동작 (SQLite만 비표준).

- **출제 시 활용**: 결과값 보기를 123.5 / 123 / 120 / 100 식으로 분배.
- **연관 토픽**: 2-C(숫자형 함수)

---

### T-08. SUBSTR 시작 위치는 1부터

- **상황**: `SUBSTR(문자열, 시작, 길이)` 사용
- **함정**: 시작 위치를 0부터로 오해 (다른 언어는 0-indexed)
- **올바른 동작**: SQL은 1부터. 음수 시작은 끝에서 N번째.
  - `SUBSTR('SQLDeveloper', 4, 3)` = 'Dev' (4번째 'D'부터 3개)
  - `SUBSTR('SQLDeveloper', -3, 2)` = 'pe' (끝에서 3번째 'p'부터 2개)
- SQL Server는 SUBSTR이 아닌 `SUBSTRING(문자열, 시작, 길이)`. 시작 1부터 동일.

- **출제 시 활용**: 결과 추적 문제에서 시작 위치 헷갈림 + 음수 위치 헷갈림 두 함정으로 보기 4개 생성.
- **연관 토픽**: 2-C(문자형 함수), 시범 문제 Q5

---

## 조인 관련 함정 (2개)

### T-09. NATURAL JOIN과 USING 별칭 금지

- **상황**: NATURAL JOIN 또는 USING 절에 테이블 별칭 사용
- **함정**: 조인 컬럼에도 별칭으로 한쪽을 특정 가능하다고 오해
- **올바른 동작**: NATURAL/USING의 조인 컬럼은 양쪽 테이블에서 동일하게 취급되므로 한쪽을 별칭으로 특정할 수 없음.

```sql
-- 잘못된 예
SELECT * FROM EMP E NATURAL JOIN DEPT D WHERE E.DEPTNO = 10;   -- 오류
SELECT * FROM EMP E JOIN DEPT D USING (E.DEPTNO);              -- 오류

-- 올바른 예
SELECT * FROM EMP NATURAL JOIN DEPT WHERE DEPTNO = 10;         -- 별칭 없이
SELECT * FROM EMP JOIN DEPT USING (DEPTNO);                    -- 컬럼명만
```

- 컬럼명이 다르거나 별칭이 필요하면 ON 절 사용.
- SQL Server는 NATURAL JOIN, USING 모두 미지원.

- **출제 시 활용**: 4개 SQL 중 정상 실행되는 것 모두 고르기 형태.
- **연관 토픽**: 2-F(조인), 시범 문제 Q7

---

### T-10. 조인 결과 행 수 함정

- **상황**: 같은 테이블 쌍에서 조인 종류만 바꿨을 때 행 수
- **함정**: 모든 조인이 비슷한 행 수를 낸다고 오해
- **올바른 동작** (EMP 4건, DEPT 3건 예시):
  - INNER JOIN: 매칭만 → 3건
  - LEFT OUTER JOIN: 왼쪽 전체 + 매칭 → 4건
  - RIGHT OUTER JOIN: 오른쪽 전체 + 매칭 → 4건
  - FULL OUTER JOIN: 양쪽 전체 → 5건
  - CROSS JOIN: 카타시안 곱 → 12건 (4×3)

NULL인 조인 컬럼은 INNER에서 제외되고, OUTER에서는 NULL 쪽 행이 살되 반대편이 NULL로 채워짐.

- **출제 시 활용**: 한 시나리오에 5가지 조인 결과를 모두 보기로 분배.
- **연관 토픽**: 2-F(조인), 시범 문제 Q6

---

## 윈도우/그룹 함수 함정 (2개)

### T-11. RANK vs DENSE_RANK vs ROW_NUMBER

- **상황**: 동률 데이터에서 순위 함수 적용
- **함정**: 세 함수가 비슷하게 동작한다고 오해
- **올바른 동작** (값이 2000, 2000, 1500인 경우):
  - **RANK**: 동률에 같은 순위, 다음 순위 **건너뜀** → 1, 1, 3
  - **DENSE_RANK**: 동률에 같은 순위, **건너뛰지 않음** → 1, 1, 2
  - **ROW_NUMBER**: 동률 무시, 항상 **고유 번호** → 1, 2, 3

- **출제 시 활용**: 동률 케이스를 만들고 세 함수 결과를 보기로 분배.
- **연관 토픽**: 2-J(윈도우 함수), 시범 문제 Q9

---

### T-12. ROLLUP/CUBE/GROUPING SETS 순서 의존성

- **상황**: 인수 순서를 바꿨을 때 결과 차이
- **함정**: 세 함수가 순서 무관하다고 오해
- **올바른 동작**:
  - **ROLLUP(A, B)**: 순서 의존. (A, B) → (A) → ()의 계층 소계만 생성. ROLLUP(B, A)는 다른 결과.
  - **CUBE(A, B)**: 순서 무관. 모든 조합의 소계 (A,B), (A), (B), () 생성.
  - **GROUPING SETS((A), (B))**: 명시한 그룹만 생성. 총계 자동 미생성.

- **출제 시 활용**: 같은 데이터에 세 함수를 적용한 결과 행 수를 보기로 분배.
- **연관 토픽**: 2-I(그룹 함수)

---

## DDL/DML 함정 (3개)

### T-13. TRUNCATE는 ROLLBACK 불가

- **상황**: DELETE / TRUNCATE / DROP 비교
- **함정**: 셋 다 데이터 삭제라 동일하다고 오해
- **올바른 동작**:
  - **DELETE**: DML, 행 단위, WHERE 가능, **ROLLBACK 가능**, UNDO 생성, 느림
  - **TRUNCATE**: DDL, 전체 행, WHERE 불가, **ROLLBACK 불가**(자동 COMMIT), UNDO 미생성, 빠름
  - **DROP**: DDL, 테이블 자체 제거, ROLLBACK 불가, 인덱스/제약 모두 사라짐

- **출제 시 활용**: 세 명령의 특성 매칭 문제, ROLLBACK 후 결과 행 수 묻기.
- **연관 토픽**: 2-Q(DDL), 2-O(DML)

---

### T-14. CTAS는 NOT NULL만 복제

- **상황**: `CREATE TABLE T2 AS SELECT * FROM T1;` (CTAS)
- **함정**: 모든 제약이 새 테이블로 복제된다고 오해
- **올바른 동작**: Oracle CTAS는 컬럼 정의 + 데이터 + **NOT NULL 제약만** 복제. PRIMARY KEY, UNIQUE, CHECK, FOREIGN KEY, DEFAULT 모두 미복제.

```sql
-- 데이터 없이 구조만 복제
CREATE TABLE T2 AS SELECT * FROM T1 WHERE 1=0;

-- 모든 제약 복제 (수동)
ALTER TABLE T2 ADD CONSTRAINT PK_T2 PRIMARY KEY (A);
```

- SQL Server: `SELECT ... INTO T2 FROM T1`, NOT NULL과 IDENTITY만 복제.

- **출제 시 활용**: 다섯 제약(NOT NULL/PK/UNIQUE/CHECK/FK/DEFAULT) 중 무엇이 복제되는지 조합 보기.
- **연관 토픽**: 2-Q(DDL), 시범 문제 Q10

---

### T-15. Oracle 수동 COMMIT vs SQL Server AUTO COMMIT

- **상황**: DML 실행 후 자동 저장 여부
- **함정**: 모든 DBMS가 동일하게 트랜잭션을 처리한다고 오해
- **올바른 동작**:
  - **Oracle**: DML 후 명시적 COMMIT 필요. ROLLBACK으로 되돌리기 가능.
  - **SQL Server (기본)**: AUTO COMMIT 모드. 각 SQL이 즉시 반영. 트랜잭션 묶으려면 `BEGIN TRAN`.
  - **DDL은 양쪽 모두**: 자동 COMMIT (명시적 COMMIT 없이도 즉시 반영, ROLLBACK 불가).

- **출제 시 활용**: DML 실행 후 ROLLBACK 했을 때 데이터 상태 묻는 문제.
- **연관 토픽**: 2-P(TCL)

---

## 기타 함정 (3개)

### T-16. ROWNUM 비교 연산자 제한

- **상황**: Oracle에서 `ROWNUM > 1` 같은 조건
- **함정**: ROWNUM도 일반 컬럼처럼 모든 비교 연산자 사용 가능하다고 오해
- **올바른 동작**: ROWNUM은 결과 행이 만들어질 때 1부터 순차 부여되는 가상 번호. **`> 1`, `>= 2`는 항상 거짓** (1번이 통과해야 2번이 생기는데 1번이 통과 못 함). 사용 가능: `ROWNUM = 1`, `ROWNUM <= N`.

```sql
-- 잘못된 예 (0건)
SELECT * FROM EMP WHERE ROWNUM > 1;   -- 항상 0건
SELECT * FROM EMP WHERE ROWNUM = 2;   -- 0건

-- 올바른 예 (Top N)
SELECT * FROM (SELECT * FROM EMP ORDER BY SAL DESC) WHERE ROWNUM <= 3;
```

- Oracle 12c부터 `OFFSET N ROWS FETCH FIRST M ROWS ONLY` 지원. SQL Server는 `TOP N`.

- **출제 시 활용**: ROWNUM 조건이 잘못된 보기를 함정으로 배치.
- **연관 토픽**: 2-K(Top N)

---

### T-17. PK 인덱스 컬럼 순서

- **상황**: 복합 PK에서 인덱스 효율을 위한 컬럼 순서
- **함정**: PK 순서와 SQL 성능이 무관하다고 오해
- **올바른 동작**: 복합 PK 인덱스는 **앞쪽 컬럼이 `=` 조건**이어야 효율. 범위 조건(BETWEEN, >, <)은 뒤쪽으로.
  - 좋은 예: `WHERE 사원번호 = 100 AND 입사일 BETWEEN ... ` (사원번호가 PK 첫째)
  - 나쁜 예: `WHERE 입사일 = ... AND 사원번호 BETWEEN ...` (PK 첫째 컬럼에 = 없음)

- **출제 시 활용**: 인덱스 활용도가 가장 좋은 SQL 고르기 문제.
- **연관 토픽**: 1-G(반정규화), 성능 데이터 모델링

---

### T-18. 식별자관계 vs 비식별자관계

- **상황**: 부모-자식 관계 ERD
- **함정**: 두 관계의 차이점을 단순 실선/점선만으로 봄
- **올바른 동작**:
  - **식별자관계**: 자식 PK에 부모 PK **포함**. 강한 연결, 실선. 자식이 부모 없이 존재 불가. 조인 시 자식만으로 충분 → 조인 단순화.
  - **비식별자관계**: 자식의 일반 속성으로 FK만 받음. 약한 연결, 점선. 자식이 부모 없이 존재 가능. 조인 시 부모-자식 둘 다 거쳐야 → 조인 복잡.

- **출제 시 활용**: 이 두 관계의 5가지 차이점(PK 포함, 표기법, 의존성, 조인 복잡도, 카디널리티) 중 잘못 짝지은 것 찾기.
- **연관 토픽**: 1-E(식별자)

---

## 영역 매핑

| 함정 # | 매트릭스 토픽 영역 | 출제 권장 문항 수 |
|--------|--------------------|-------------------|
| T-01 | 1-J, 2-D | 4문항 |
| T-02 | 2-E | 5문항 |
| T-03 | 2-G, 2-D | 2문항 |
| T-04 | 1-J, 2-C | 3문항 |
| T-05 | 2-B | 3문항 |
| T-06 | 2-C | 3문항 |
| T-07 | 2-C | 2문항 |
| T-08 | 2-C | 4문항 |
| T-09 | 2-F | 4문항 |
| T-10 | 2-F | 8문항 |
| T-11 | 2-J | 5문항 |
| T-12 | 2-I | 6문항 |
| T-13 | 2-Q, 2-O | 4문항 |
| T-14 | 2-Q | 2문항 |
| T-15 | 2-P | 3문항 |
| T-16 | 2-K | 5문항 |
| T-17 | 1-G | 2문항 |
| T-18 | 1-E | 3문항 |

**합계**: 18개 함정에 권장 분량 약 68문항. 500문항 중 14% 비중.

---

## 양산 시 사용 가이드

1. 새 문항 만들 때 어느 함정을 다루는지 명시 (`metadata.trap_id` 같은 형태)
2. 같은 함정을 5문항 이상 다룰 때는 변형 차원을 다르게 (정의 매칭 / 결과 추적 / 오류 찾기 / 비교 / 빈칸)
3. 보기 4개 중 최소 1개는 해당 함정의 오개념을 박을 것
4. 사용자가 시험 직전 이 문서만 훑어도 핵심 함정을 빠르게 복습 가능

# SQLD CBT

SQL 개발자(SQLD) 자격증 학습용 정적 CBT 사이트.

## 배포

GitHub `main` 브랜치 push → Cloudflare Pages 자동 배포 (`dist/` 폴더만 배포 대상).

## 운영

```bash
# index.html 또는 questions.js 수정 후
cp index.html dist/index.html
cp questions.js dist/questions.js
git add dist/ && git commit -m "update" && git push
```

## 구조

- `index.html` — 사이트 본체 (단일 HTML)
- `questions.js` — 문제은행 데이터 (`window.QUESTION_BANK`)
- `dist/` — Cloudflare 배포 디렉터리 (위 두 파일의 사본)

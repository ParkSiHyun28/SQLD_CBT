# SQLD CBT

SQL 개발자(SQLD) 자격증 학습용 정적 CBT 사이트.
배포 URL: https://sqld-cbt.pages.dev

## 구조

```
SQLDCBT/
├── dist/              ← Cloudflare Pages 배포 대상 (이 폴더만 외부 노출)
│   ├── index.html     ← 사이트 본체 (단일 HTML)
│   └── questions.js   ← 555문항 (window.QUESTION_BANK)
├── questions.json     ← 원본 데이터 (배포 안 됨, .gitignore)
├── draft_*.js         ← 양산 초안 (배포 안 됨, .gitignore)
└── *.md               ← 기획/설계 문서 (배포 안 됨, .gitignore)
```

## 운영 — 사이트 수정하기

`dist/index.html` 또는 `dist/questions.js`를 직접 수정 후.

```bash
git add dist/
git commit -m "update site"
git push
```

push 후 약 15초 안에 https://sqld-cbt.pages.dev 자동 갱신.

## 문항 데이터 갱신

`questions.json` 수정 후 `dist/questions.js` 재생성.

```bash
node -e "const fs=require('fs');const j=fs.readFileSync('questions.json','utf8');fs.writeFileSync('dist/questions.js','window.QUESTION_BANK = '+j+';\n');"
```

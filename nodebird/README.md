# nodebird

## 명령어

- 데이터베이스 생성

```bash
npx sequelize db:create
```

- 데이터베이스 마이그레이션 파일 생성

```bash
npx sequelize migration:generate --name <migration-name>
```

마이그레이션 파일을 생성한 후에는 해당 파일을 열고 up 함수와 down 함수를 작성해야 합니다. up 함수에는 새로운 스키마 변경을 적용하는 코드를 작성하고, down 함수에는 이전 상태로 되돌리는 코드를 작성해야 합니다.

- 서버 실행

```bash
npm start
```
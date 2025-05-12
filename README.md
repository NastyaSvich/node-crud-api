# CRUD API

---

### Prerequisites

1. Install [Node.js](https://nodejs.org/en/download/)
2. To install all dependencies use [`npm install`](https://docs.npmjs.com/cli/install)
3. Create file .env (use .env.template as a basis)
4. Set port in .env file (example, PORT=3002)

---

### Start in DEV mode

```bash

$ npm run start:dev
```

---

### Start in PROD mode

```bash

$ npm run start:prod
```

---

### Start tests

```bash
# run unit tests
$ npm run test

# with logging
$ npm run test:verbose
```

---

#### Notes

1. Recommend you to use Node.js of version 22.x.x (22.14.0 or upper) LTS.
   If you use any of features, that does not supported by Node.js 22,
   there may be problems with task submit.
2. Recommend you to use Postman for check api request.
   I also share the created [collection](https://www.postman.com/nastyasvich/svich/collection/knmt2du/user)
   of requests for easy checking (you can fork it in your workspace).

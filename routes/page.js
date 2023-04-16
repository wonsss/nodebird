const express = require("express");
const {
	renderProfile,
	renderJoin,
	renderMain,
} = require("../controllers/page");

const router = express.Router();

// 라우터용 미들웨어를 만들어 템플릿 엔진에서 사용할 user, followerCount, followingCount, followerIdList 변수를 res.locals로 설정한다.
router.use((req, res, next) => {
	res.locals.user = null;
	res.locals.followerCount = 0;
	res.locals.followingCount = 0;
	res.locals.followerIdList = [];
	next();
});

router.get("/profile", renderProfile);

router.get("/join", renderJoin);

router.get("/", renderMain);

module.exports = router;

const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {
	renderProfile,
	renderJoin,
	renderMain,
	renderHashtag,
} = require("../controllers/page");

const router = express.Router();

// 라우터용 미들웨어를 만들어 템플릿 엔진에서 사용할 user, followerCount, followingCount, followerIdList 변수를 res.locals로 설정한다.
router.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.followerCount = req.user?.Followers?.length || 0;
	res.locals.followingCount = req.user?.Followings?.length || 0;
	res.locals.followerIdList = req.user?.Followings?.map(f => f.id) || [];
	next();
});

router.get("/profile", isLoggedIn, renderProfile); // isLoggedIn 미들웨어를 사용해 로그인한 사용자만 접근할 수 있도록 한다.

router.get("/join", isNotLoggedIn, renderJoin); // isNotLoggedIn 미들웨어를 사용해 로그인하지 않은 사용자만 접근할 수 있도록 한다.

router.get("/", renderMain);

router.get("/hashtag", renderHashtag);

module.exports = router;

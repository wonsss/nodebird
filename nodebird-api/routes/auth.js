const express = require("express");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { join, login, logout } = require("../controllers/auth");

const router = express.Router();

// POST /auth/join
router.post("/join", isNotLoggedIn, join);

// POST /auth/login
router.post("/login", isNotLoggedIn, login);

// GET /auth/logout
router.get("/logout", isLoggedIn, logout);

// GET /auth/kakao
router.get("/kakao", passport.authenticate("kakao"));

// GET /auth/kakao/callback
router.get(
	"/kakao/callback",
	passport.authenticate("kakao", {
		failureRedirect: "/?loginError=카카오로그인 실패",
	}),
	(req, res) => {
		res.redirect("/"); // 로그인 성공 시 '/' 로 이동
	}
);

// GET /auth/naver
router.get("/naver", passport.authenticate("naver"));

// GET /auth/naver/callback
router.get(
	"/naver/callback",
	passport.authenticate("naver", {
		failureRedirect: "/?loginError=네이버로그인 실패",
	}),
	(req, res) => {
		res.redirect("/"); // 로그인 성공 시 '/' 로 이동
	}
);

// GET /auth/google
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

// GET /auth/google/callback
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/?loginError=구글로그인 실패",
	}),
	(req, res) => {
		res.redirect("/"); // 로그인 성공 시 '/' 로 이동
	}
);

module.exports = router;

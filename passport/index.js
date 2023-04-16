const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const naver = require("./naverStrategy");
const User = require("../models/user");

// 세션에 불필요한 데이터를 담아두지 않기 위한 과정
module.exports = () => {
	passport.serializeUser((user, done) => {
		// serializeUser: 로그인 시 실행, req.session 객체에 어떤 데이터를 저장할지 선택
		done(null, user.id); // done(에러 발생 시 사용, 저장할 데이터)
	});

	passport.deserializeUser((id, done) => {
		// deserializeUser: 매 요청 시 실행, passport.session() 미들웨어가 이 메서드 호출, serializeUser의 done의 두 번째 인수로 넘긴 데이터가 첫 번째 매개변수로 들어감
		User.findOne({ where: { id } }) // id로 사용자 조회
			.then(user => done(null, user)) // 조회한 정보를 req.user에 저장
			.catch(err => done(err));
	});

	local();
	kakao();
	naver();
};

const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");

// 회원가입 컨트롤러
exports.join = async (req, res, next) => {
	const { email, nick, password } = req.body;
	try {
		const exUser = await User.findOne({ where: { email } });
		if (exUser) {
			// 이미 가입된 이메일이 있다면 회원가입 페이지로 redirect
			return res.redirect("/join?error=exist");
		}

		const hash = await bcrypt.hash(password, 12); // 비밀번호를 암호화
		await User.create({ email, nick, password: hash }); // DB에 사용자 정보 저장
		return res.redirect("/");
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

// 로그인 컨트롤러
exports.login = (req, res, next) => {
	// passport.authenticate("local") 미들웨어가 로컬 로그인 전략을 수행
	passport.authenticate("local", (authError, user, info) => {
		if (authError) {
			// 첫번째 매개변수인 authError가 있다면 실패한 것이다.
			console.error(authError);
			return next(authError);
		}

		if (!user) {
			return res.redirect(`/?loginError=${info.message}`);
		}

		return req.login(user, loginError => {
			// 두번째 매개변수인 user가 있다면 성공한 것이고, 이 값으로 req.login을 호출한다. req.login은 passport.serializeUser를 호출하고, user 객체가 serializeUser로 넘어간다.
			if (loginError) {
				console.error(loginError);
				return next(loginError);
			}
			return res.redirect("/");
		});
	})(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙여준다.
};

// 로그아웃 컨트롤러
exports.logout = (req, res) => {
	req.logout(() => {
		res.redirect("/");
	});
};

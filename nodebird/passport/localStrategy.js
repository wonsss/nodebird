const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email", // req.body.email
				passwordField: "password", // req.body.password
				passReqToCallback: false, // req 객체를 전달할지 여부
			},
			async (email, password, done) => {
				// 위에서 전달한 email, password를 매개변수로 받고, done 함수는 passport.authenticate의 콜백함수이다.
				try {
					const exUser = await User.findOne({ where: { email } });
					if (exUser) {
						const result = await bcrypt.compare(
							password,
							exUser.password
						);
						if (result) {
							done(null, exUser);
						} else {
							// 로그인에 실패
							done(null, false, {
								message: "비밀번호가 일치하지 않습니다.",
							});
						}
					} else {
						done(null, false, {
							message: "가입되지 않은 회원입니다.",
						});
					}
				} catch (error) {
					console.error(error);
					done(error);
				}
			}
		)
	);
};

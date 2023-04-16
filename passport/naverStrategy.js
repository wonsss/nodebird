const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;

const User = require("../models/user");

module.exports = () => {
	passport.use(
		new NaverStrategy(
			{
				clientID: process.env.NAVER_ID,
				clientSecret: process.env.NAVER_CLIENT_SECRET,
				callbackURL: "/auth/naver/callback",
			},
			async (accessToken, refreshToken, profile, done) => {
				// 네이버는 인증 후 callbackUrl에 적힌 주소로 accessToken, refreshToken, profile을 보낸다.
				console.log("naver profile", profile);
				try {
					const exUser = await User.findOne({
						where: {
							snsId: profile.id,
							provider: "naver",
						},
					});

					if (exUser) {
						done(null, exUser);
					} else {
						const newUser = await User.create({
							email: profile.emails[0].value,
							nick: profile.displayName,
							snsId: profile.id,
							provider: "naver",
						});
						done(null, newUser);
					}
				} catch (error) {
					console.error(error);
					done(error);
				}
			}
		)
	);
};

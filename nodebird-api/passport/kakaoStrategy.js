const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
	passport.use(
		new KakaoStrategy(
			{
				clientID: process.env.KAKAO_ID,
				callbackURL: "/auth/kakao/callback", // 카카오로부터 인증 결과를 받을 라우터 주소
			},
			async (accessToken, refreshToken, profile, done) => {
				// 카카오는 인증 후 callbackUrl에 적힌 주소로 accessToken, refreshToken, profile을 보낸다.
				console.log("kakao profile", profile);
				try {
					const exUser = await User.findOne({
						where: { snsId: profile.id, provider: "kakao" },
					});
					if (exUser) {
						done(null, exUser);
					} else {
						const newUser = await User.create({
							email:
								profile._json &&
								profile._json.kakao_account.email,
							nick: profile.displayName,
							snsId: profile.id,
							provider: "kakao",
						});
						done(null, newUser); // req.user에 저장
					}
				} catch (error) {
					console.error(error);
					done(error);
				}
			}
		)
	);
};

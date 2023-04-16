const Sequelize = require("sequelize");

class User extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				email: {
					type: Sequelize.STRING(40),
					allowNull: false,
					unique: true,
				},
				nick: {
					type: Sequelize.STRING(15),
					allowNull: false,
				},
				password: {
					type: Sequelize.STRING(100),
					allowNull: true,
				},
				provider: {
					type: Sequelize.ENUM("local", "kakao", "naver", "google"),
					allowNull: false,
					defaultValue: "local",
				},
				snsId: {
					type: Sequelize.STRING(255),
					allowNull: true,
				},
			},
			{
				sequelize,
				timestamps: true,
				underscored: false,
				modelName: "User",
				tableName: "users",
				paranoid: true,
				charset: "utf8", // 한글
				collate: "utf8_general_ci", // 한글
			}
		);
	}

	static associate(db) {
		db.User.hasMany(db.Post); // User는 Post를 여러개 가질 수 있다. 1(User):N(Post)
		db.User.belongsToMany(db.User, {
			// User는 User를 여러개 팔로잉 할 수 있다. N(User):M(User)
			foreignKey: "followingId", // foreignKey는 중간 테이블에 들어갈 컬럼명
			as: "Followers", // Followers를 찾으러면 followingId를 찾아야 한다.
			through: "Follow", // 중간 테이블
		});
		db.User.belongsToMany(db.User, {
			// User는 User를 여러개 팔로워 할 수 있다. N(User):M(User)
			foreignKey: "followerId", // foreignKey는 중간 테이블에 들어갈 컬럼명
			as: "Followings", // Followings를 찾으러면 followerId를 찾아야 한다.
			through: "Follow", // 중간 테이블
		});
	}
}

module.exports = User;

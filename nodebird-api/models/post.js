const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
	static initiate(sequelize) {
		Post.init(
			{
				content: {
					type: Sequelize.STRING(140),
					allowNull: false,
				},
				img: {
					type: Sequelize.STRING(200),
					allowNull: true,
				},
			},
			{
				sequelize,
				timestamps: true,
				underscored: false,
				modelName: "Post",
				tableName: "posts",
				paranoid: true,
				charset: "utf8mb4", // 한글 + 이모티콘
				collate: "utf8mb4_general_ci", // 한글 + 이모티콘
			}
		);
	}

	static associate(db) {
		db.Post.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" }); // Post는 User에 속해있다. 1(User):N(Post)
		db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // Post는 Hashtag를 여러개 가질 수 있다.  N(Post):M(Hashtag)
	}
}

module.exports = Post;

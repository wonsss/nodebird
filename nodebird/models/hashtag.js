const Sequelize = require("sequelize");

class Hashtag extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				title: {
					type: Sequelize.STRING(15),
					allowNull: false,
					unique: true,
				},
			},
			{
				sequelize,
				timestamps: true,
				underscored: false,
				modelName: "Hashtag",
				tableName: "hashtags",
				paranoid: true,
				charset: "utf8mb4",
				collate: "utf8mb4_general_ci",
			}
		);
	}

	static associate(db) {
		db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" }); // Hashtag는 Post를 여러개 가질 수 있다.  N(Hashtag):M(Post)
	}
}

module.exports = Hashtag;

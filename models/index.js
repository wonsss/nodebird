"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const User = require("./user");
const Post = require("./post");
const HashTag = require("./hashtag");

const db = {};

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

db.sequelize = sequelize;
// db.User = User;
// db.Post = Post;
// db.Hashtag = Hashtag;

// User.initiate(sequ)

fs.readdirSync(__dirname) // models 폴더 안에 있는 파일들을 읽어옴
	.filter(file => {
		// 숨감파일, index.js, .js 확장자가 아닌 파일 필터링
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
		);
	})
	.forEach(file => {
		// 해당 파일의 모델을 불러와서 init
		const model = require(path.join(__dirname, file));
		db[model.name] = model.init(sequelize);
	});

Object.keys(db).forEach(modelName => {
	// associate 호출
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

module.exports = db;

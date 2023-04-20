"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// 'provider' 열의 enum에서 'google'을 추가합니다.
		await queryInterface.changeColumn(
			"users",
			"provider",
			{
				type: Sequelize.ENUM("local", "facebook", "google"),
				allowNull: false,
				defaultValue: "local",
			},
			{ transaction }
		);
	},

	async down(queryInterface, Sequelize) {
		// 'provider' 열의 enum에서 'google'을 삭제합니다.
		await queryInterface.changeColumn(
			"users",
			"provider",
			{
				type: Sequelize.ENUM("local", "facebook"),
				allowNull: false,
				defaultValue: "local",
			},
			{ transaction }
		);
	},
};

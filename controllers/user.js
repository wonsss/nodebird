const User = require("../models/user");

exports.follow = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { id: req.user.id } }); // req.user.id가 followerId
		if (user) {
			await user.addFollowing(parseInt(req.params.id, 10)); // req.params.id가 followingId
			res.send("success");
		} else {
			res.status(404).send("no user");
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
};

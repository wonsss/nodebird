const { Post, Hashtag } = require("../models");

exports.afterUploadImage = (req, res) => {
	console.log(req.file);
	res.json({ url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
	try {
		const post = await Post.create({
			content: req.body.content,
			img: req.body.url,
			userId: req.user.id,
		});
		const hashtags = req.body.content.match(/#[^\s#]+/g);
		if (hashtags) {
			const result = await Promise.all(
				hashtags.map(tag =>
					Hashtag.findOrCreate({
						// 존재하면 가져오고, 존재하지 않으면 생성한 후 가져온다. 결괏값으로 [모델, 생성여부]를 반환한다
						where: { title: tag.slice(1).toLowerCase() },
					})
				)
			);
			await post.addHashtags(result.map(r => r[0])); // 모델만 추출하여 저장한다
		}
		res.redirect("/");
	} catch (error) {
		console.error(error);
		next(error);
	}
};

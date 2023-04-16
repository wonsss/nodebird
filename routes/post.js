const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { afterUploadImage, uploadPost } = require("../controllers/post");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

try {
	fs.readdirSync("uploads");
} catch (error) {
	console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
	fs.mkdirSync("uploads");
}

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, "uploads/");
		},
		filename(req, file, cb) {
			const ext = path.extname(file.originalname);
			cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /post/img
router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage); // 이미지 하나를 업로드받은 후 이미지의 저장 경로를 클라이언트로 응답한다.

// POST /post
const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), uploadPost); // 게시글 업로드를 처리한다. 이미지는 이미 업로드되었으므로 이미지 주소만 받아서 저장한다. 이미지 주소가 온 것이지 이미지 데이터는 들어있지 않으므로 none 메서드를 사용했다.

module.exports = router;

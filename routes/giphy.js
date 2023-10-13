const { Router } = require("express");

const {
  getWords,
  saveWord,
  editWord,
  deleteWord,
  giphyData,
} = require("../controlleres/giphy");
const router = Router();

router.get("/:str", getWords);
router.get("/", giphyData);
router.post("/", saveWord);
router.put("/:id", editWord);
router.delete("/:id", deleteWord);

module.exports = router;

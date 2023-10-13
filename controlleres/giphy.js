const { response, request } = require("express");
const GiphyServices = require("../services/giphy.services");
const serviceGiphy = new GiphyServices();

const saveWord = (req, res = response) => {
  let error = "null";
  let { word = null } = req.body;
  const items = serviceGiphy.newWord(word);
  res.status(201).json({
    error,
    data: items,
  });
};

const editWord = async (req, res = response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const update = await serviceGiphy.update(id, body);
    console.log(serviceGiphy.words);
    res.json({
      error: null,
      data: update,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      data: null,
    });
  }
};

const deleteWord = async (req, res = response) => {
  try {
    const { id } = req.params;
    const deleteId = await serviceGiphy.delete(id);
    console.log(serviceGiphy.words);
    res.json({
      error: null,
      data: deleteId,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      data: null,
    });
  }
};

const getWords = async (req = request, res = response) => {
  try {
    const { str = "" } = req.params;
    const item = await serviceGiphy.find(str);
    console.log(item);
    res.json({
      error: null,
      data: item,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      data: null,
    });
  }
};

const giphyData = async (req = request, res = response) => {
  try {
    const { data } = await serviceGiphy.getGiphyData();
    res.json({
      error: null,
      data,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      data: null,
    });
  }
};

module.exports = {
  getWords,
  saveWord,
  editWord,
  deleteWord,
  giphyData,
};

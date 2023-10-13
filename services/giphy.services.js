const { default: axios } = require("axios");
const uuid = require("uuid");

class GiphyServices {
  constructor() {
    this.words = [];
  }

  newWord(word) {
    const found = this.words.find((element) => element.word === word);
    if (!found) {
      this.words.push({
        word,
        id: uuid.v4(),
      });
    }

    console.log(this.words);
    return this.words;
  }

  find(str) {
    const foundWord = this.words.find((item) => {
      console.log(item.word);
      return item.word === str;
    });
    if (foundWord === undefined) {
      throw new Error("Error - word not found");
    }
    console.log("foundWord", foundWord);
    return foundWord;
  }

  update(id, changes) {
    const index = this.words.findIndex((elem) => elem.id === id);
    if (index === -1) {
      throw new Error("Error - word not found");
    }
    const item = this.words[index];
    this.words[index] = {
      ...item,
      ...changes,
    };
    return this.words[index];
  }

  delete(id) {
    const index = this.words.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("Error - word no found");
    }
    this.words.splice(index, 1);
    return { id };
  }

  async getGiphyData() {
    const max = this.words.length - 1;
    if (max === -1) {
      throw new Error("Error - There is no word");
    }
    let randomNum = Math.floor(Math.random() * (max + 1));
    const search = this.words[randomNum].word;
    const instance = axios.create({
      baseURL: `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_GIPHY}`,
      params: {
        q: search,
        limit: 3,
        offset: 0,
        rating: "g",
        lang: "en",
        bundle: "messaging_non_clips",
      },
    });
    console.log("search", search);
    const resp = await instance.get();
    return resp.data;
  }
}

module.exports = GiphyServices;

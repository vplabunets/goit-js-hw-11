import { inputOptions } from './inputOptions';
export default class PicturesApiService {
  constructor() {
    this.inputData = '';
    this.page = 1;
  }
  async fetchPictures() {
    const axios = require('axios').default;
    const url = `${inputOptions().BASEURL}?key=${inputOptions().key}&q=${
      this.inputData
    }&image_type=photo&
  orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    // return fetch(url).then(inputValueObject => {
    //   this.increasePage();
    //   console.log(this);
    //   return inputValueObject.json();
    // });
    this.increasePage();
    return await axios.get(url);
  }
  increasePage() {
    this.page += 1;
    // console.log(this.page);
  }
  resetPage() {
    this.page = 1;
  }

  get data() {
    return this.inputData;
  }
  set data(newInputData) {
    this.inputData = newInputData;
  }
}

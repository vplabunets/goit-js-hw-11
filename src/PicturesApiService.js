export default class PicturesApiService {
  constructor() {
    this.inputData = '';
    this.page = 1;
  }
  fetchPictures() {
    const KEY = '29714079-b64164321d422be07299c5198';
    const url = `https://pixabay.com/api/?key=${KEY}&q=${this.inputData}&image_type=photo&
  orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    return fetch(url).then(inputValueObject => {
      this.increasePage();
      console.log(this);
      return inputValueObject.json();
    });
  }
  increasePage() {
    this.page += 1;
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

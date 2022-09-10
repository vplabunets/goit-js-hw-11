import './css/styles.css';
import Notiflix from 'notiflix';
// import fetchDataByInput from './fetchCountries';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//import data from API server
import PicturesApiService from './PicturesApiService';
import { inputOptions } from './inputOptions';
let _ = require('lodash');
const refs = {
  // formEl: document.querySelector('#search-form'),
  // inputEl: document.querySelector('form input'),
  // galleryDivEl: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('.load-more'),
};
const lightBox = new SimpleLightbox('.gallery a', {
  //Adding additional options
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
let totalPages = 0;
inputOptions().formEl.addEventListener('submit', onFormSubmit);
inputOptions().loadMoreBtn.addEventListener('click', onLoadMore);
//
// function lightBoxLauncher() {
//   return lightBox;
// }

const picturesApiService = new PicturesApiService();
async function onFormSubmit(event) {
  event.preventDefault();
  markupCleaning();
  console.log();
  //checking of empty string submitting and double space matching
  if (
    // totalPages === 0
    inputOptions().inputEl.value.length === 0 ||
    inputOptions().inputEl.value.search(/  {1,3}/) !== -1
  ) {
    //Input cleaning
    event.currentTarget.elements.searchQuery.value = '';
    //Notifiying user
    return Notiflix.Notify.info(
      'Sorry, there are no images matching your search query.'
    );
  } else {
    picturesApiService.inputData =
      event.currentTarget.elements.searchQuery.value.trim();
    picturesApiService.resetPage();
    try {
      const fetchedRequest = await picturesApiService.fetchPictures();
      renderGallery(fetchedRequest);
      console.log(fetchedRequest);
      totalPages = fetchedRequest.data.totalHits;
      //Hidden by default button displaying
      if (totalPages !== 0) {
        inputOptions().loadMoreBtn.style.display = 'block';
        return Notiflix.Notify.info(
          `${totalPages} images was found according to your querry.`
        );
      } else {
        return Notiflix.Notify.info(
          'Sorry, there are no images matching your search query.'
        );
      }
    } catch {
      error => console.log(error);
    }
  }
}

function onLoadMore() {
  if (totalPages - picturesApiService.page * 40 < 0) {
    inputOptions().loadMoreBtn.style.display = 'none';
    return Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    picturesApiService
      .fetchPictures()
      .then(renderGallery)
      .catch(error => console.log(error));
  }
}
//Markup cleaning function
function markupCleaning() {
  inputOptions().galleryDivEl.innerHTML = '';
}

function renderGallery(userInputArray) {
  markupCreation(userInputArray);
  lightBox.refresh();
}

function markupCreation(userInputArray) {
  //Checking for not empty array
  let makrup = '';
  // if (userInputArray.data.hits.length === 0) {
  //   return Notiflix.Notify.info(
  //     'Sorry, there are no images matching your search query.'
  //   );
  // } else {
  makrup = userInputArray.data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        ` <div class="photo-card">
        <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="" loading="lazy" height ="200" width = "300"/></a>
  <div class="info">
    <p class="info-item">
      Likes:<b> ${likes}</b>
    </p>
    <p class="info-item">
      Views:<b> ${views}</b>
    </p>
    <p class="info-item">
      Comments:<b> ${comments}</b>
    </p>
    <p class="info-item">
      Downloads:<b> ${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  // }
  // console.log(makrup);
  inputOptions().galleryDivEl.insertAdjacentHTML('beforeEnd', makrup);
}

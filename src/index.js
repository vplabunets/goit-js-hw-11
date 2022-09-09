import './css/styles.css';
import Notiflix from 'notiflix';
// import fetchDataByInput from './fetchCountries';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PicturesApiService from './PicturesApiService';
// const axios = require('axios').default;

import { inputOptions } from './inputOptions';
let _ = require('lodash');
const refs = {
  // formEl: document.querySelector('#search-form'),
  inputEl: document.querySelector('form input'),
  galleryDivEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let lightBox = null;
// refs.inputEl.addEventListener('input', _.debounce(onInputType, DEBOUNCE_DELAY));
inputOptions().formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
// const options = {}

// function fetchDataByInput(inputValue) {
//   let inputValuelink = `https://pixabay.com/api/?key=${KEY}&q=${inputValue}&image_type=photo&
//   orientation=horizontal&safesearch=true&per_page=40&page=3`;
//   return fetch(inputValuelink).then(inputValueObject => {
//     return inputValueObject.json();
//   });
// }
const picturesApiService = new PicturesApiService();
function onFormSubmit(event) {
  event.preventDefault();
  markupCleaning();
  // let inputData = refs.inputEl.value;
  if (refs.inputEl.value.length === 0) {
    return;
  } else {
    picturesApiService.inputData =
      event.currentTarget.elements.searchQuery.value;
    picturesApiService.resetPage();
    picturesApiService
      .fetchPictures()
      .then(renderGallery)
      .catch(error => console.log(error));
    refs.loadMoreBtn.style.display = 'block';
    lightBox = new SimpleLightbox('.gallery a', {
      //Adding additional options
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
    }).refresh();
  }
}

function onLoadMore(event) {
  picturesApiService
    .fetchPictures()
    .then(renderGallery)
    .catch(error => console.log(error));
  lightBox.refresh();
}
//Markup cleaning function
function markupCleaning() {
  refs.galleryDivEl.innerHTML = '';
}

function renderGallery(userInputArray) {
  markupCreation(userInputArray);
  lightBox = new SimpleLightbox('.gallery a', {
    //Adding additional options
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}

function markupCreation(userInputArray) {
  //Checking for not empty array
  let makrup = '';
  if (userInputArray.data.hits.length === 0) {
    return Notiflix.Notify.info(
      'Sorry, there are no images matching your search query.'
    );
  } else {
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
  }
  // console.log(makrup);
  refs.galleryDivEl.insertAdjacentHTML('beforeEnd', makrup);
}

// document.addEventListener('keydown', function (event) {
//   // Escape pushing checking
//   if (event.key === 'Escape') {
//     // Modal close call
//     lightBox.close();
//   }
// });

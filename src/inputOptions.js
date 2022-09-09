export function inputOptions() {
  const inputOptionsObject = {
    formEl: document.querySelector('#search-form'),
    BASEURL: 'https://pixabay.com/api/',
    key: '29714079-b64164321d422be07299c5198',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
  };
  return inputOptionsObject;
}

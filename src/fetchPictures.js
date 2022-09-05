const KEY = '29714079-b64164321d422be07299c5198';
export function fetchDataByInput(inputValue) {
  // let countryLink = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  let inputValuelink = `https://pixabay.com/api/?key=29${KEY}8&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`;
  return fetch(inputValuelink).then(inputValueObject => {
    console.log(inputValueObject);
    return countryObject.json();
  });
}

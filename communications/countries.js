const URL_COUNTRIES = 'https://airalo.com/api/v2/countries'

function fetchCountries () {
  return $fetch(`${URL_COUNTRIES}?type=popular`).then((response) => {
    return response
  }).catch(error => {
    throw new Error(error)
  })
}


function fetchCountriesBySlug (slug) {
  return $fetch(`${URL_COUNTRIES}/${slug}`).then((response) => {
    return response
  }).catch(error => {
    throw new Error(error)
  })
}

export {
  fetchCountries,
  fetchCountriesBySlug
}
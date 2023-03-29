const URL_COUNTRIES = 'https://airalo.com/api/v2/countries'

function fetchCountries () {
  return new Promise ((resolve, reject) => {
    $fetch(`${URL_COUNTRIES}?type=popular`).then((response) => {
      resolve (response)
    }).catch(error => {
      reject()
      throw new Error(error)
    })
  })
}


function fetchCountriesBySlug (slug) {
  return new Promise ((resolve, reject) => {
    $fetch(`${URL_COUNTRIES}/${slug}`).then((response) => {
      resolve (response)
    }).catch(error => {
      reject()
      throw new Error(error)
    })
  })
}

export {
  fetchCountries,
  fetchCountriesBySlug
}
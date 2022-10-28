const BASE_URL = 'http://localhost:3000'
// when we publish our app using heroku, replace this url above with yourAppName.herokuapp.com
export const FOODS_URL = BASE_URL +'/api/foods'
export const FOODS_TAGS_URL = FOODS_URL +'/tags'
export const FOODS_BY_SEARCH_URL = FOODS_URL +'/search/'
// the slash / after search lets you pass the route parameter and search gets passed more easily
export const FOODS_BY_TAG_URL = FOODS_URL +'/tag/'
export const FOODS_BY_ID_URL = FOODS_URL +'/'


import axios from 'axios'

export const post = (url, params) =>
  axios
    .get(baseUrl + url, { params })
    .then(response => response.data)
    .catch(error => handleError(error));


export const handleError = error => {
  const { response } = error;
  if (response && response.data) {
    throw response.data;
  } 
  //mangae error code like 400, 401 as per your requirement 
  throw error;
};
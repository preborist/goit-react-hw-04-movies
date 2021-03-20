import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '4460666d06078339f618930c21873fab';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

const movieApi = async (searchQuery = '') => {
  try {
    const { data } = await axios.get(searchQuery);
    if (data.results) {
      console.log(data.results);
    }
    return data;
  } catch (error) {
    console.log('error:', { error });
    return [];
  }
};

export default movieApi;

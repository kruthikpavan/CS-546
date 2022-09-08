import axios from 'axios';

const getApiData = async () => {
  //try removing the await keyword and run the application
  let {data} = await axios.get('http://api.tvmaze.com/shows');

  return data;
};

export {getApiData};

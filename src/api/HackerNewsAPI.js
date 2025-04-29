import axios from 'axios';

const apiConfig = {
  url: 'https://hacker-news.firebaseio.com/',
  allStories: 'v0/newstories.json',
  storiesDetail: 'v0/item/',
};

export const getNewStoriesId = async () => {
  const response = await axios.get(
    `${apiConfig.url}${apiConfig.allStories}?print=pretty&limitToFirst=100&orderBy=%22$priority%22`,
  );

  return response.data;
};

export const getStoriesDetail = async (id) => {
  const response = await axios.get(
    `${apiConfig.url}${apiConfig.storiesDetail}${id}.json?print=pretty`,
  );

  return response.data;
};

export const getComment = async (id) => {
  const response = await axios.get(
    `${apiConfig.url}${apiConfig.storiesDetail}${id}.json?print=pretty`,
  );

  return response.data;
};

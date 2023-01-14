import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { LoginDataType } from '../component/Login';
import { loadLocalStorage } from '../utils';

const env = process.env;
const API_URL = env.REACT_APP_API_PATH + ":" + env.REACT_APP_API_PORT;

interface AxiosRequesterProps extends AxiosRequestConfig {
  path: string,
}

const axiosRequester = async (
  { method, path, ...rest }: AxiosRequesterProps
) => {
  const config = {
    method,
    url: API_URL + path,
    headers: {
      'x-access-token': loadLocalStorage('token'),
    },
    ...rest
  };
  try {
    const result: AxiosResponse = await axios(config);
    return result;
  } catch (error: any) {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
    }
    throw error
  }
}

const loginAPI = async (data: LoginDataType) => {
  try {
    const response: AxiosResponse = await axiosRequester({ method: 'post', path: '/login', data })
    if (response.data.token) {
      localStorage.setItem("token", JSON.stringify(response.data.token))
    }
    return response;
  } catch (error: any) {
    throw error;
  }
}

const getProfileAPI = async () => {
  try {
    const config = { method: 'get', path: '/profile' }
    const response: AxiosResponse = await axiosRequester(config);
    return response;
  } catch (error: any) {
    throw error;
  }
}

const getAllPostsAPI = async (limit?: number, page?: number) => {
  try {
    const config = {
      method: 'get', path: '/posts',
      params: { limit, page }
    }
    const response: AxiosResponse = await axiosRequester(config);
    return response;
  } catch (error: any) {
    throw error;
  }
}

const getPostByIdAPI = async (id: string) => {
  try {
    const config = { method: 'get', path: `/posts/${id}` }
    const response: AxiosResponse = await axiosRequester(config);
    return response;
  } catch (error: any) {
    throw error;
  }
}

const getPostsByTagsAPI = async (tags: string, limit?: number, page?: number) => {
  try {
    const config = {
      method: 'get', path: '/search/tags',
      params: { tags, limit, page }
    }
    const response: AxiosResponse = await axiosRequester(config);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export {
  loginAPI,
  getProfileAPI,
  getAllPostsAPI,
  getPostByIdAPI,
  getPostsByTagsAPI,
}
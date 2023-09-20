import axios_instance from "../utils/axios_server";

const getUsers = (data) => {
  return axios_instance.get(`user/getUserList?page=${data.page}&limit=${data.limit}`);
};

const addUser = (data) => {
  return axios_instance.post(`user/createUser`, data);
};

const HomeService = {
  getUsers,
  addUser,
};

export default HomeService;
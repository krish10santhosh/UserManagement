import axios_instance from "../utils/axios_server";

const getUsers = (data) => {
  return axios_instance.get(`user/getUserList?page=${data.page}&limit=${data.limit}`);
};

const addUser = (data) => {
  return axios_instance.post(`user/createUser`, data);
};

const updateUser = (data) => {
  return axios_instance.post(`user/updateUser/${data.id}`, data?.value);
};

const deleteUser = (data) => {
  return axios_instance.delete(`user/deleteUser/${data}`);
};

const HomeService = {
  getUsers,
  addUser,
  updateUser,
  deleteUser
};

export default HomeService;
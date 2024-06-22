import { server_uri } from "../../api/authApi";

export const getImage = (fileName) => {
  return `${server_uri}/${fileName}`;
};

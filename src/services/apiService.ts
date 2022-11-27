import axios from "axios";
import constants, { GITHUB_PREFIX } from "../constants";

export default class ApiService {
  static checkUsername = async (username: string) => {
    return await axios.get(
      constants.api.checkUsername.replace("{username}", username)
    );
  };

  static checkRepository = async (username: string, repo: string) => {
    return await axios.get(
      constants.api.checkRepo
        .replace("{username}", username)
        .replace("{repo}", repo)
    );
  };

  static sendRepositoryUrl = async (username: string, repo: string) => {
   return await axios.post(constants.api.sendRepositoryUrl, `repoUrl=${GITHUB_PREFIX}${username}/${repo}, sender=Sara`);
  };
  
}

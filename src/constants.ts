const GITHUB_API_PREFIX = 'https://api.github.com/'
export const GITHUB_PREFIX = 'https://github.com/'
const constants = {
  routes: {
    setRepoAddress: "/",
    checkUser: "/checkuser",
    checkRepository: "/checkrepository",
    allDone: "/alldone",
  },
  api: {
    checkUsername:  `${GITHUB_API_PREFIX}users/{username}`,
    checkRepo: `${GITHUB_API_PREFIX}repos/{username}/{repo}` ,
    sendRepositoryUrl: 'https://pushmore.io/webhook/d3Gm4aEPCuhAUjfbECLLdW41'
  },
  colors: {
    successBackground: '#CAFFDA',
    errorBackground: '#FFACAC',
    default: 'white'
  },
  statusCodes: {
    success: 200,
    notFound: 404,
    default: 100
  }
};

export default constants;

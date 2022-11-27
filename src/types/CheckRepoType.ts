export default interface CheckRepoType {
    username: string,
    repository: string,
    loading: boolean,
    error: boolean,
    statusCodeUsername: number,
    statusCodeRepo: number,
    isOnline: boolean
}
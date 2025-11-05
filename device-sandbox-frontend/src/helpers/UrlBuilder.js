class UrlBuilderHelper {
  deviceSimulatorApi() {
    return `http://localhost:8000/api/v1`; // local connection
    // return `http://192.168.1.243:8000/api`; // remote connection ip
    // return `http://localhost:8080/api`; // docker connection
    // return `http://43.204.236.19:8080/api`; // live connection
  }
}
export const UrlBuilder = new UrlBuilderHelper();

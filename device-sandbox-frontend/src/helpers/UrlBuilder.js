class UrlBuilderHelper {
  deviceSimulatorApi() {
    // return `http://localhost:8000/api/v1`; // local connection
    // return `http://192.168.1.243:8000/api`; // remote connection ip
    // return `http://localhost:8080/api`; // docker connection
    return `https://api.conveysoft.dev/api/v1`; // live connection
  }
}
export const UrlBuilder = new UrlBuilderHelper();

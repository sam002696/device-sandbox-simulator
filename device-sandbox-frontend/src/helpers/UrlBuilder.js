class UrlBuilderHelper {
  deviceSimulatorApi() {
    return `http://localhost:8000/api/v1`; // local connection
    // return `https://api.conveysoft.dev/api/v1`; // live connection
  }
}
export const UrlBuilder = new UrlBuilderHelper();

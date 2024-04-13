import axios, { AxiosResponse } from "axios";

/**
 * This object provides a wrapper around Axios for making requests.
 */
const HttpClient = {
  /**
   * Fetches data from a specified URL using an asynchronous GET request.
   *
   * @param url {string} The URL of the resource to fetch data from.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the Axios response
   * containing the fetched data.
   */
  get: async (url: string): Promise<AxiosResponse> => {
    try {
      const response = await axios.get(url);
      return response.data; // Return only the data from the response
    } catch (error) {
      // Handle errors here (optional)
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error for further handling
    }
  }
};

export default HttpClient;

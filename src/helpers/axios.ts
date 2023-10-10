// for simplicity
export const axios = {
  async get(url: string, config: any = {}) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: config?.headers || {}
        // add any other configurations if needed
      });

      const data = await response.json();

      return { data, status: response.status, statusText: response.statusText, headers: response.headers, config };
    } catch (error) {
      // handle any fetch or network errors
      throw error;
    }
  },

  async post(url: string, data = {}, config: any = {}) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...config.headers
        },
        body: JSON.stringify(data)
        // add any other configurations if needed
      });

      const responseData = await response.json();

      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config
      };
    } catch (error) {
      // handle any fetch or network errors
      throw error;
    }
  }

  // You can also add other methods like put, delete, etc., in a similar fashion
};

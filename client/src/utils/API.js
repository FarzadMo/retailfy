import axios from "axios";

export default {
  // Gets Ads by category
  getAdsByCategory: function (category) {
    return axios.get("/api/retailRoutes/" + category);
  },

  // Gets sall ad
  getAllAds: function () {
    return axios.get("/api/retailRoutes");
  },
  //   // Deletes the book with the given id
  //   deleteBook: function(id) {
  //     return axios.delete("/api/books/" + id);
  //   },
  //  Saves a book to the database
  saveAd: function (adData) {
    return axios.post("/api/retailRoutes/adpost", adData);
  }
};

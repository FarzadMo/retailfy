import axios from "axios";

export default {
  // Get Ads info by category
  getAdsByCategory: function (category) {
    return axios.get("/api/retailRoutes/" + category);
  },

  // Get sall ad information
  getAllAds: function () {
    return axios.get("/api/retailRoutes");
  },
  //   // Deletes the book with the given id
  //   deleteBook: function(id) {
  //     return axios.delete("/api/books/" + id);
  //   },

  //  Post or Saves a new Ad info in the database
  saveAd: function (adData) {
    return axios.post("/api/retailRoutes/adpost", adData);
  },

  //Retrieving data for ONE Ad based on Id
  getOneAdById: function (id) {
    return axios.get("/api/retailRoutes/detail/" + id);
  },

  //post or create a new user info
  postNewUser: function (userInfo) {
    return axios.post("/api/user/adduser", userInfo);
  },

  //get A user info by Email and do the authentication
  getOneUserByEmail: function (userinformation) {
    return axios.post("/api/user/auth", userinformation);
  },

  // post an image 
  uploadImage: function (data) {

    return axios.post("/api/upload/", data);
  },

  //logout

  logOut: function (data) {

    return axios.post("/api/user/logout", data);
  }



};

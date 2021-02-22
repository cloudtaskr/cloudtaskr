let baseURL;

process.env.NODE_ENV === "production"
  ? //? (baseURL = 'here should be your production endpoint')
    (baseURL = "https://cloudtaskr.herokuapp.com")
  : (baseURL = "http://localhost:5000");

  export default baseURL
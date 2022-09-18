module.exports = function () {
  switch (process.env.NODE_ENV) {
    case "development":
      return {
        port: 7000,
        mongoDbUrl: "mongodb://localhost/sampleUserDetailsDb",
      };

    case "production":
      return {
        port: 5000,
        mongoDbUrl: "mongodb://localhost/sampleUserDetailsDb",
      };

    default:
      return {
        err: console.log("error in environment setup"),
      };
  }
};

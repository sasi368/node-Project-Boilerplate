module.exports = function () {
  switch (process.env.NODE_ENV) {
    case "development":
      return {
        port: 7000,
        mongoDbUrl: "mongodb://localhost/sampleUserDetailsDb",
        secret: "devsecret",
      };

    case "production":
      return {
        port: 5000,
        mongoDbUrl: "mongodb://localhost/sampleUserDetailsDb",
        secret: "stagesecret",
      };

    default:
      return {
        err: console.log("error in environment setup"),
      };
  }
};

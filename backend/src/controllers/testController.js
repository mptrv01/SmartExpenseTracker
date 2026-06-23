const testAPI = (req, res) => {
  res.status(200).json({
    message: "Backend setup is working",
  });
};

module.exports = {
  testAPI,
};
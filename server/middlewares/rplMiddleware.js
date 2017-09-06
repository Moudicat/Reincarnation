export default (req, res, next) => {
  res.resData = {
    msg: '',
    data: {}
  };
  next();
};

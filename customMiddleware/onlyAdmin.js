const onlyAdmin = (req, res, next) => {
  const { role } = req.decoded;
  if (role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'only admin can access this route',
    });
  }
  return next();
};

export default onlyAdmin;

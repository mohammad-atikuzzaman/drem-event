const User = require('../models/User');

const authorizeAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.userId;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin only' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error in authorization' });
  }
};

module.exports = authorizeAdmin;

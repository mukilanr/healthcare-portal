const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getAllUsers,
  getAllProviders,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, getProfile);
router.put("/me", authMiddleware, updateProfile);
router.get("/all", authMiddleware, getAllUsers); // Only for providers
router.get("/providers", getAllProviders);

module.exports = router;

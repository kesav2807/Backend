const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  createPostDataController,
  getAllPostDataController,
  getAllPostDataControllerAdmin,
  updatePostDataActiveStatus,
  BusAllowcateController,
  getAllBusAllowcateController,
} = require("../controller/control");

router.get("/getdata/all", getAllPostDataController);
router.get("/getdata/admin/all", getAllPostDataControllerAdmin);
router.get("/getdata/bus/all", getAllBusAllowcateController);

router.post("/auth/register", registerController);
router.post("/auth/login", loginController);
router.post("/postdata/create", createPostDataController);
router.post("/busallowcate", BusAllowcateController);

router.put("/updatedata/:id", updatePostDataActiveStatus);

module.exports = router;

import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addScan, continueTrue, getCenters, getIsSubmitte, getScanCategories, reapply, registerScan } from "../controllers/center-controller.js";
import { upload } from "../middleware/multer.js";
const centerRouter = express.Router();

centerRouter.post(
  "/scanregister",
  verifyToken,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "NABH", maxCount: 1 },
    { name: "NABL", maxCount: 1 },
    { name: "ISO", maxCount: 1 },
  ]),
  registerScan
);
centerRouter.get("/getCenterDetails", verifyToken, getCenters);
centerRouter.get("/scanregister", verifyToken, getIsSubmitte);
centerRouter.get('/scancategories',verifyToken,getScanCategories)
centerRouter.patch('/onetimeapprovel',verifyToken,continueTrue)
centerRouter.post('/addScan',verifyToken,addScan)
centerRouter.patch('/reapply',verifyToken,upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "NABH", maxCount: 1 },
  { name: "NABL", maxCount: 1 },
  { name: "ISO", maxCount: 1 },
]),reapply)

export default centerRouter;

import centerdetails from "../model/centerdetails.js";
import Category from "../model/categoryModel.js";
import TestModel from "../model/testModel.js";

export const registerScan = async (req, res) => {
  try {
    const { image1, image2, image3, NABH, NABL, ISO } = req.files;
    const { ...data } = req.body;
    const register = new centerdetails({
      ...data,
      owner: req.user,
      isSubmitted: "true",
      CenterImages: [
        image1[0].filename,
        image2[0].filename,
        image3[0].filename,
      ],
      CertificateImages: [
        { NABH: NABH[0].filename },
        { NABL: NABL[0].filename },
        { ISO: ISO[0].filename },
      ],
    });
    await register.save();
    // console.log(register);
    return res
      .status(200)
      .json({ register, message: "Registeration successfull..!" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const getIsSubmitte = async (req, res) => {
  const id = req.user;
  console.log(req.user);
  console.log("id", id);
  try {
    const center = await centerdetails.findOne({ owner: id }).populate("owner");
    console.log("sis", center);
    const dataToSend = {
      isSubmitted: center.isSubmitted,
      isVerified: center.isVerified,
      isreject: center.reject,
      message: center.rejectMessage,
      isContinue: center.isContinue,
      ...center._doc,
    };
    return res.status(200).json({
      dataToSend,
      message: "data fetched successfull..!",
    });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const getCenters = async (req, res) => {
  try {
    const centers = await centerdetails.find().populate("owner");
    return res
      .status(200)
      .json({ centers, message: "data fetched successfull..!" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const getScanCategories = async (req, res) => {
  try {
    const scanCategories = await Category.find();
    return res
      .status(200)
      .json({ scanCategories, message: "data fetched successfull..!" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const addScan = async (req, res) => {
  const { mainCategory, subCategory, testDetails, price } = req.body;
  console.log("req.body", req.body);
  try {
    const testdetails = new TestModel({
      Lab: req.user,
      mainCategory,
      subCategory,
      description: testDetails,
      price,
    });
    await testdetails.save();

    console.log(testdetails);
    return res
      .status(200)
      .json({ message: "TestAdd Successfully", testdetails });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const continueTrue = async (req, res) => {
  const id = req.user;
  console.log(req.user);
  try {
    const centedetails = await centerdetails.findOneAndUpdate(
      { owner: id },
      { $set: { isContinue: true } }
    );
    console.log("continue ", centedetails);
    return res
      .status(200)
      .json({ message: "TestAdd Successfully", centedetails });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const reapply = async (req, res) => {
  const id = req.user;
  // console.log("id",id)
  const { image1, image2, image3, NABH, NABL, ISO } = req.files;
  console.log("req.files", req.files);
  const { ...data } = req.body;
  const { CertificateImages, CenterImages } = req.body;
  console.log(CertificateImages);
  // console.log("DGFDGFD".CertificateImages[0]);
  const images = CenterImages.split(",");
  console.log("sdfjbsdjfb", images);
  console.log("req.body", req.body);
  console.log("req.body11", req.body.NABH);
  try {
    const details = await centerdetails.findOneAndUpdate(
      { owner: id },
      {
        $set: {
          ...data,
          owner: id,
          CenterImages: [
            image1?.[0].filename ?? images[0],
            image2?.[0].filename ?? images[1],
            image3?.[0].filename ?? images[2],
          ],
          CertificateImages: [
            { NABH: NABH?.[0].filename  ?? req.body.NABH},
            { NABL: NABL?.[0].filename  ?? req.body.NABL},
            { ISO: ISO?.[0].filename  ?? req.body.ISO},
          ],
          isVerified: "false",
          reject: "false",
          isContinue: "false",
        },
      }
    );

    return res
      .status(200)
      .json({ details, message: "Registeration successfull..!" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

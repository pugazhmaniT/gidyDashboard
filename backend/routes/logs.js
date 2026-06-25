const express = require("express");
const router = express.Router();
const Log = require("../models/log");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (path.extname(file.originalname) !== ".json") {
    return cb(new Error("Only JSON files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter
});

router.post("/upload", async (req, res) => {
  try {
    const logs = req.body;
    await Log.insertMany(logs);

    res.status(200).json({
      message: `${logs.length} logs uploaded successfully`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});

router.get("/read", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const {
      severity,
      status,
      region,
      role,
      action,
      search,
      resourceType
    } = req.query;

    const { sortBy, order } = req.query;
    let filter = {};

    if (severity) filter.severity = severity;
    if (status) filter.status = status;
    if (region) filter.region = region;
    if (role) filter.role = role;
    if (action) filter.action = action;
    if (resourceType) filter.resourceType = resourceType;

    if (search) {
      filter.$or = [
        { actor: { $regex: search, $options: "i" } },
        { resource: { $regex: search, $options: "i" } },
        { action: { $regex: search, $options: "i" } }
      ];
    }

    const totalRecords = await Log.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / limit);

    let sortOption = {};
    if (sortBy) {
      sortOption[sortBy] = order === "desc" ? -1 : 1;
    }

    const logs = await Log.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      totalRecords,
      totalPages,
      currentPage: page,
      logs
    });
  } catch (error) {
    console.error("READ API ERROR:", error);
    res.status(500).json({
      error: error.message
    });
  }
});

router.post("/upload-file", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "File format not supported. Upload JSON only"
      });
    }

    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath, "utf-8");
    const logs = JSON.parse(fileData);

    await Log.insertMany(logs);

    res.json({
      message: `${logs.length} logs uploaded successfully`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
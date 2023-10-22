const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { existsSync } = require("fs");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/hddbench/"); // Speicherort der hochgeladenen Dateien
    },
    fileFilter: (req, file, cb) => {
      cb(null, true);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname);
      const fileName = file.originalname;
      cb(null, fileName); // Dateiname der hochgeladenen Dateien
    },
  }),
});
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const url = "mongodb://localhost:27017/";
//const url = "mongodb://192.168.200.100:27017/";

const start = async () => {
  const client = new MongoClient(url);
  const db = client.db("hardware");
  const authDB = client.db("auth");

  app.post(
    "/uploads",
    upload.array("files"),
    (req, res) => {
      res.json({ message: "Upload successful" });
    }
  );

  app.post("/api/login", async (req, res) => {
    const userCollection = authDB.collection("user");
    const passwordCollection =
      authDB.collection("password");
  });

  app.get("/api/artnummer/", async (req, res) => {
    const collections = await db
      .listCollections()
      .toArray(function (a, b) {});
    let collectionName = [];
    collections.forEach(async (e) => {
      if (!(e.name === "hwinfos" || e.name === "lshws")) {
        collectionName.push(e.name);
      }
    });
    let data = [];
    collectionName.forEach(async (e) => {
      let dd = [];
      console.log("collectionName:", e);
      await db
        .collection(e)
        .find({})
        .project({ ArtNummer: 1, _id: 0 })
        .forEach(async (ee) => {
          dd.push(await ee.ArtNummer);
        });
      console.log(data.length);
      data.push(...dd);
    });
    console.log("data:", data);
    res.send(await data);
  });
  app.get("/api/:category", async (req, res) => {
    let data = null;
    if (
      req.params.category == "hwinfos" ||
      req.params.category == "lshws"
    ) {
      const projection = {
        _id: 1,
        artNumber: 1,
        createDate: 1,
        status: 1,
      };
      data = await db
        .collection(req.params.category)
        .find({})
        .project(projection)
        .toArray();
    } else {
      data = await db
        .collection(req.params.category)
        .find({})
        .toArray();
    }
    res.send(data);
  });
  app.get("/api/:category/:artnummer", async (req, res) => {
    console.log(req.params.category, req.params.id);
    const data = await db
      .collection(req.params.category)
      .findOne({ artNumber: req.params.artnummer });
    try {
      data.data = atob(data.data);
    } catch (e) {
      console.log(e);
    }
    console.log(data);
    res.send(data);
  });
  app.get(
    "/api/:category/:id/:status",
    async (req, res) => {
      const r = await db
        .collection(req.params.category)
        .updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: { status: Number(req.params.status) } }
        );
      res.send(r);
    }
  );
  app.post("/api/:category", async (req, res) => {
    var sendData = req.body;
    const newData = req.body;
    if (newData._id) {
      const updateObject = {};
      Object.entries(newData).forEach((key) => {
        if (key[0] != "_id") {
          updateObject[key[0]] = String(key[1]);
        }
      });
      await db
        .collection(req.params.category)
        .updateOne(
          { _id: new ObjectId(newData._id) },
          { $set: updateObject }
        )
        .then((err, elm) => {
          sendData = newData;
          res.send(sendData);
        });
    } else {
      await db
        .collection(req.params.category)
        .insertOne(newData)
        .then((err, elm) => {
          sendData = newData;
          sendData._id = new ObjectId(
            sendData._id
          ).toString();
          res.send(sendData);
        });
    }
  });
  //#######
  app.listen(3000, () => {
    console.log("api is listening on port 3000");
  });
};

console.log("starting the api");
start();

import express from "express";
import {getConsolidatedUserInfo} from "../src/dbQueries.js";

const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res) {
  if (req.body.quantity && req.body.page) {
    await getConsolidatedUserInfo(
      req.body.quantity,
      req.body.page,
      (data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(500).send('Data cannot be retrieved now');
        }
      }
    );
  }
});

export default router;

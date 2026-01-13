import express from "express";
import { getAllColors } from "./color.controller.js";

const router = express.Router();


router.get("/", getAllColors)
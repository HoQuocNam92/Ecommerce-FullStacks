import express from "express";
import { getAllSizes } from "./size.controller.js";

const router = express.Router();


router.get("/", getAllSizes)
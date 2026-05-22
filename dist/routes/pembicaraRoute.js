"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pembicaraControllers_1 = require("../controllers/pembicaraControllers");
const router = express_1.default.Router();
router.get("/", pembicaraControllers_1.getpembicara);
router.post("/", pembicaraControllers_1.createpembicara);
router.get("/:id", pembicaraControllers_1.showpembicara);
router.put("/:id", pembicaraControllers_1.updatePembicara);
router.delete("/:id", pembicaraControllers_1.deletePembicara);
exports.default = router;
//# sourceMappingURL=pembicaraRoute.js.map
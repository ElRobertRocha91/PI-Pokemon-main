const { Router } = require("express");

const  { getTypes } = require("../handlers/typesHandler");

const typesRouter = Router();

typesRouter.get('/', getTypes);

module.exports = typesRouter;
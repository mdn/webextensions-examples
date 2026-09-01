#!/usr/bin/env node
"use strict";

const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const Ajv2020 = require("ajv/dist/2020");

const schema = JSON.parse(readFileSync(join(__dirname, "examples.schema.json"), "utf8"));
const data = JSON.parse(readFileSync(join(__dirname, "examples.json"), "utf8"));

const ajv = new Ajv2020({ allErrors: true });
const validate = ajv.compile(schema);

if (validate(data)) {
  console.log("examples.json valid");
} else {
  console.error("examples.json invalid:");
  for (const error of validate.errors) {
    console.error(`  ${error.instancePath || "/"} ${error.message}`);
  }
  process.exit(1);
}

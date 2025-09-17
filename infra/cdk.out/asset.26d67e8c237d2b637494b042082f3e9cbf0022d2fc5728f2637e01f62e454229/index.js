var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../backend/routes/placement/listPlacements.js
var listPlacements_exports = {};
__export(listPlacements_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(listPlacements_exports);

// ../backend/models/Placement.js
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
var client = new import_client_dynamodb.DynamoDBClient({});
var docClient = import_lib_dynamodb.DynamoDBDocumentClient.from(client);
var TABLE_NAME = process.env.PLACEMENT_TABLE_NAME;
async function listPlacements() {
  const command = new import_lib_dynamodb.ScanCommand({ TableName: TABLE_NAME });
  const result = await docClient.send(command);
  return result.Items || [];
}

// ../backend/routes/placement/listPlacements.js
var handler = async () => {
  try {
    const drives = await listPlacements();
    return {
      statusCode: 200,
      body: JSON.stringify(drives)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});

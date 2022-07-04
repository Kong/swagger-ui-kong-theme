const { writeFileSync, write } = require("fs");
const path = require("path");

const pathFactory = (tag) => ({
  get: {
    tags: ["a" + tag],
    summary: "summary",
    description: "description",
    operationId: "get" + tag,
    produces: ["application/xml", "application/json"],
    parameters: [
      {
        name: "parameter",
        in: "query",
        description: "parameter description",
        required: true,
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "successful operation",
      },
      400: {
        description: "Invalid username supplied",
      },
      404: {
        description: "User not found",
      },
    },
  },
  put: {
    tags: ["a" + tag],
    summary: "summary",
    description: "description",
    operationId: "put" + tag,
    produces: ["application/xml", "application/json"],
    parameters: [
      {
        name: "username",
        in: "query",
        description: "name that need to be updated",
        required: true,
        type: "string",
      },
    ],
    responses: {
      400: {
        description: "Invalid user supplied",
      },
      404: {
        description: "User not found",
      },
    },
  },
  delete: {
    tags: ["a" + tag],
    summary: "Delete user",
    description: "This can only be done by the logged in user.",
    operationId: "delete" + tag,
    produces: ["application/xml", "application/json"],
    parameters: [
      {
        name: "username",
        in: "query",
        description: "The name that needs to be deleted",
        required: true,
        type: "string",
      },
    ],
    responses: {
      400: {
        description: "Invalid username supplied",
      },
      404: {
        description: "User not found",
      },
    },
  },
});

const tagFactory = (tag) => ({
  description: "description",
  name: 'a' + tag,
});

const paths = {};
const tags = [];

new Array(1000).fill(1).forEach((item, index) => {
  paths["/a" + index] = pathFactory(index);
  tags.push(tagFactory(index));
});

const data = {
  swagger: "2.0",
  info: {
    version:'1.0.0',
    description: "Description",
    title: "Swagger Large File Generated",
    termsOfService: "http://swagger.io/terms/",
    contact: {
      email: "apiteam@swagger.io",
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  basePath: "/v1",
  schemes: ["https", "http"],
  tags,
  paths,
  securityDefinitions: {
    petstore_auth: {
      type: "oauth2",
      authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
      flow: "implicit",
      scopes: {
        "write:pets": "modify pets in your account",
        "read:pets": "read your pets",
      },
    },
    api_key: {
      type: "apiKey",
      name: "api_key",
      in: "header",
    },
  },
};

const generatedSpectPath = path.join(
  __dirname,
  "../public/specs/generated-spec.json"
);

console.log(`Creating file in ${generatedSpectPath}`);

writeFileSync(generatedSpectPath, JSON.stringify(data));

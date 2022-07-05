import SwaggerUI, { swaggerUIConstructor } from "swagger-ui";
import SwaggerParser from "swagger-parser";
import YAML from "yaml-js";

export const parseSpec = (contents) => {
  let parsedSpec; //set empty var to hold spec
  let errorArray = [];

  try {
    //parse spec as JSON
    //if failed push json error msg into error array
    parsedSpec = JSON.parse(contents);
  } catch (jsonError) {
    const errorMsg = (libraryMsg) => `Error trying to parse ${libraryMsg}:<br>`;
    errorArray.push(errorMsg("JSON"), jsonError);
    //    try to parse as YAML
    try {
      parsedSpec = YAML.load(contents);
    } catch (yamlError) {
      errorArray.push(errorMsg("YAML"), yamlError);
    }
  }

  SwaggerParser.validate(parsedSpec, (err) => {
    return err && console.error(err);
  });

  return parsedSpec ? parsedSpec : errorArray;
};

export const fetchSpec = async (url) => {
  return (await fetch(`${window.location.origin}/${url}`)).text();
};

export const loadSwagger = async (selectedSpec) => {
  const options = window.swaggerUIOptions;
  const spec = await fetchSpec(selectedSpec);

  options.spec = await parseSpec(spec);

  if (options) SwaggerUI(options);
};

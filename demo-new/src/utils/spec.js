import SwaggerUI from "@kong/swagger-ui";
import SwaggerParser from "swagger-parser";
import YAML from "yaml-js";

export const parseSpec = (contents) => {
  let parsedSpec; //set empty var to hold spec
  let errorArray = [];

  try {
    //parse spec as JSON
    //if failed push json error msg into error array
    parsedSpec = JSON.parse(contents);
  } catch (error) {
    const errorMsg = (libraryMsg) => `Error trying to parse ${libraryMsg}:<br>`;
    errorArray.push(errorMsg("JSON"), error);
    //    try to parse as YAML, if JSON parser failed
    if (errorMsg) {
      try {
        parsedSpec = YAML.load(contents);
      } catch (yamlError) {
        errorArray.push(errorMsg("YAML"), yamlError);
      }
    }
  }

  SwaggerParser.validate(
    parsedSpec,
    {
      continueOnError: true,
    },
    () => {
      let errorMessage;
      if (errorArray.length > 0) {
        errorMessage = errorArray[errorArray.length - 1];
        console.error(errorMessage);
      }
    }
  );

  return parsedSpec && parsedSpec;
};

export const fetchSpec = async (url) => {
  return (await fetch(`${window.location.origin}/${url}`)).text();
};

export const loadSwagger = async (selectedSpec) => {
  const options = window.swaggerUIOptions;

  if (!options) return;

  const spec = await fetchSpec(selectedSpec);

  options.spec = await parseSpec(spec);

  return SwaggerUI(options);
};

import { type SchemaTypeDefinition } from "sanity";
import about from "./about";
import experience from "./experience";
import project from "./project";
import certificate from "./certificate";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [about, experience, project, certificate],
};

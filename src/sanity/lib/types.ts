import type { SanityImageSource } from "@sanity/image-url";

// About Schema Type
export interface About {
  _id: string;
  _type: "about";
  name: string;
  title: string;
  biography: string;
  university: string;
  graduationYear: number;
  interests: string[];
}

// Experience Schema Type
export interface Experience {
  _id: string;
  _type: "experience";
  organization: string;
  role: string;
  dateRange: string;
  tasks: string[];
}

// Project Schema Type
export interface Project {
  _id: string;
  _type: "project";
  projectName: string;
  description: string;
  image: SanityImageSource;
}

// Certificate Schema Type
export interface Certificate {
  _id: string;
  _type: "certificate";
  certificateName: string;
}

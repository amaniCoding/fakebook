import { QueryResultRow } from "@vercel/postgres";

export type Breif = {
  title?: string;
  description?: string;
  photo?: string;
};

export type Contnet = {
  title?: string;
  description?: string;
  codeSnippet?: string;
  photo?: string;
};

export type CurrentStoryPhotosPayload = {
  type: "first" | "update";
  photos: QueryResultRow[];
};

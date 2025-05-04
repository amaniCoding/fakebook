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

export type CurrentStoryPayload = {
  index: number;
  story: QueryResultRow;
};

type Author = {
  name: string;
  affiliation: string;
};

export type Article = {
  id: number;
  title: string;
  abstract: string;
  contentPath: string;
  image: string | null;
  author: Author;
  tags: string[];
  publishDate: string;
  doi?: string;
  url?: string;
};

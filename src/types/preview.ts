export type TUrlValidateParams = {
  url: string;
  YII_CSRF_TOKEN: string;
};

export type TNameValidateParams = {
  name: string;
};

export type TNameValidateResponse = string;

export type TUrlValidateResponse = {
  ok: boolean;
  data: {
    valid: boolean;
    suggest: string;
    parsedParts: {
      scheme: string;
      host: string;
    };
    normalized: string;
  };
  query: {
    url: string;
  };
};

export type TParseResponse = {
  ok: boolean;
  data: {
    content: string;
    templatesHtml: string;
  };
  query: {
    url: string;
  };
};

export const getValidatedUrl = (url: string) =>
  url?.includes("http") ? url : `https://gxfl20sh-3000.euw.devtunnels.ms${url}`;

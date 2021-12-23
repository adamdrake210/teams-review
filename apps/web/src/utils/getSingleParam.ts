export const returnSingleParam = (param: string | string[]) => {
  if (typeof param === "string") return param;
  return param[0];
};

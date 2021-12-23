export const COMPANY_NAME = "Feedback";

// creates an array of objs {month: x} for each calendar month
export const MONTH_ARRAY = Array.from(Array(12).keys()).map((x) => {
  return { month: x, feedback: "" };
});

// react-query key constants
export const RQ_KEY_USER = "user";

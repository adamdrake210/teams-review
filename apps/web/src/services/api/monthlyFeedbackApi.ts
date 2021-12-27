import { fetchAbsolute } from "@/utils/apiHelpers";
import { MonthlyFeedback } from "@prisma/client";
import { API_ENDPOINTS } from "./apiConstants";

const { API_FEEDBACKS_UPDATE, API_MONTHLY_FEEDBACK_LATEST } = API_ENDPOINTS;

export async function updateMonthlyFeedbackRequest(
  updateMonthlyFeedbackRequestParams: Partial<MonthlyFeedback>
) {
  const response = await fetchAbsolute(API_FEEDBACKS_UPDATE, {
    body: JSON.stringify({ data: updateMonthlyFeedbackRequestParams }),
  });
  return await response.json();
}

export async function getLatestMonthlyFeedback() {
  const response = await fetchAbsolute(API_MONTHLY_FEEDBACK_LATEST);
  return await response.json();
}

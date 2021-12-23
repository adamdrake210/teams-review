import { fetchAbsolute } from "@/utils/apiHelpers";
import { MonthlyFeedback } from "@prisma/client";

export async function updateMonthlyFeedbackRequest(
  updateMonthlyFeedbackRequestParams: Partial<MonthlyFeedback>
) {
  const response = await fetchAbsolute("/api/feedbacks/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: updateMonthlyFeedbackRequestParams }),
  });
  const data = await response.json();
  return data;
}

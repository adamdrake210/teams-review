import React, { useState } from "react";

export const DatePick = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <h1>Date Picker</h1>
    </div>
  );
};

import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";

export const UseFilter = () => {
  const [activeBtn, setActiveBtn] = useState("Lifetime");
  var now = new Date();
  var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let weekStartDate = moment().startOf("isoweek").toDate();
  let weekEndsDate = moment().endOf("isoweek").toDate();
  useEffect(() => {
    const searchParams = window.location.search;
    console.log("Search Params", searchParams);
    if (searchParams.includes("today")) {
      setActiveBtn("Today");
    }
    if (searchParams.includes("weekly")) {
      setActiveBtn("Weekly");
    }
    if (searchParams.includes("monthly")) {
      setActiveBtn("Monthly");
    }
    if (searchParams.includes("custom")) {
      setActiveBtn("Custom");
    }
    if (searchParams.length == 0) {
      setActiveBtn("Lifetime");
    }
  }, [window.location.search]);
  return [activeBtn, todayDate, weekStartDate, weekEndsDate];
};

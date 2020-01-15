function timeConversion(s) {
  /*
   * Write your code here.
   */
  let [hour, minute, second] = s.split(":");
  second = second.slice(0, 2);
  if (hour === "12" && s.includes("AM")) {
    hour = 0;
  }

  if (hour !== "12" && s.includes("PM")) {
    hour = (Number(hour) + 12) % 24;
  }

  return [hour.toString().padStart(2, "0"), minute, second].join(":");
}

export const parseDateToLocalFormat = (dateString: string) => {
  console.log("dateString", dateString);

  const date = new Date(dateString);

  const weekday = new Intl.DateTimeFormat("pl-PL", { weekday: "long" }).format(
    date,
  );

  const time = new Intl.DateTimeFormat("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  const dayMonthYear = new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  return `${weekday} ${time}, ${dayMonthYear}`;
};

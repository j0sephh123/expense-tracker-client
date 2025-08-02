export const formatDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateString = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  if (date.toDateString() === today.toDateString()) {
    return `Today, ${dateString}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${dateString}`;
  } else {
    return dateString;
  }
};

export const getIsToday = (date: Date) => {
  return date.toDateString() === new Date().toDateString();
};

export const getDateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const subtractDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
};

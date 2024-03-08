export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const toTitleCaseForSpace = (str) => {
  return str
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const toTitleCaseForHyphen = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const toKebabCase = (str) => {
  return str
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
};

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);

  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};



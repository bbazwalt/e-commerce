export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const renderProductTitles = (orderItems) => {
  const titles = orderItems.map((orderItem) => orderItem.product.title);
  const displayedTitles = titles.slice(0, 2);
  const additionalCount = titles.length - 2;

  return (
    <>
      {displayedTitles.map((title, index) => (
        <p key={index}>{title}</p>
      ))}
      {additionalCount > 0 && (
        <p>
          and {additionalCount} other{additionalCount > 1 && "s"}
        </p>
      )}
    </>
  );
};

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);

  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

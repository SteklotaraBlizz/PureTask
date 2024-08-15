// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterUndefined = <T extends object>(object: T) => {
  const filteredEntries = Object.entries(object).filter(
    (item) => item[1] !== undefined,
  );
  return Object.fromEntries(filteredEntries) as Partial<T>;
};

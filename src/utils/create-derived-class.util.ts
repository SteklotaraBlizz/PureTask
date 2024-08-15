/* eslint-disable @typescript-eslint/no-explicit-any */
export const createDerivedClass = <
  T extends abstract new (...args: any[]) => any,
>(
  name: string,
  type: abstract new (...args: any) => any,
) => {
  return {
    [name]: class extends type {
      constructor(...args: ConstructorParameters<T>[]) {
        super(...args);
      }
    },
  }[name];
};

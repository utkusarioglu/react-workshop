export const Log = <Args extends unknown[], Return>(
  c: object,
  method: PropertyKey,
  descriptor: TypedPropertyDescriptor<(...args: Args) => Promise<Return>>,
) => {
  const original = descriptor.value!;

  descriptor.value = async function (...args: Args) {
    const self = this || c;
    const response = await Reflect.apply(original, self, args);
    console.log("Log", method, ":", response);

    return response;
  };
};

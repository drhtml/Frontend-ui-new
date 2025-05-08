export function debounce(delay: number = 300): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const timeoutKey = Symbol();

    const original = descriptor.value;

    descriptor.value = function (...args: any) {
      clearTimeout((this as any)[timeoutKey]);
      (this as any)[timeoutKey] = setTimeout(
        () => original.apply(this, args),
        delay
      );
    };

    return descriptor;
  };
}

export function paginate(array: any[], page_size: number, page_number: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export function paginateUntilPage(array: any[], page_size: number, page_number: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice(0, page_number * page_size);
}

export function isReadOnlyArray<
  T extends unknown,
  U extends readonly unknown[]
>(value: T | U): value is U {
  return Array.isArray(value);
}

/**
 * Check if object contain props.
 * @param object
 * @param props
 */
export const isOwnerProperties = (object: any, props: string[]): boolean => {
  return props.every((prop) => Object.prototype.hasOwnProperty.call(object, prop));
};

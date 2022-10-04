/**
 * The Seal decorator seals a class instance, preventing new properties from being added to it and marking all existing properties as non-configurable. Values of present properties can still be changed as long as they are writable.
 */
export function Seal(): ClassDecorator {
  return function (target): void {
    Object.seal(target);
    Object.seal(target.prototype);
  };
}

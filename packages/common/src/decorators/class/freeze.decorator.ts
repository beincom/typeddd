/**
 * The Freeze decorator freezes class instance. A frozen instance can no longer be changed; freezing an instance prevents new properties from being added to it, existing properties from being removed, prevents changing the enumerability, configurability, or writability of existing properties, and prevents the values of existing properties from being changed. In addition, freezing an instance also prevents its prototype from being changed. freeze() returns the same instance that was passed in.
 */
export function Freeze(): ClassDecorator {
  return function (target: any): void {
    Object.freeze(target);
    Object.freeze(target.prototype);
  };
}

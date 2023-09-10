export function BaseError(key, errKeys) {
  this.key = key;
  if (errKeys instanceof Array) {
    this.errKeys = errKeys;
  } else {
    this.errKeys = [errKeys];
  }
}

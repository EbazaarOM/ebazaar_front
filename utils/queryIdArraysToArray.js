// eslint-disable-next-line no-nested-ternary
export const queryIdArraysToArray = (data) => (data ? (data instanceof Array ? data.map((id) => +id) : [+data]) : []);

export const toObject = (x) => !!x ? x.toObject() : x;
export const listToObject = (list) => list.map(toObject);
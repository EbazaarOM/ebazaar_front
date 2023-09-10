export const handleSuccess =
  (resolve, isMany = false) =>
  (response) => {
    if (isMany) {
      const { data: items = [], meta: { total = 0 } = {} } = response.data;
      return resolve({ items, total });
    }
    return resolve(response.data);
  };

export const handleError = (reject) => (error) => {
  if (error.response) {
    const { status, data } = error.response;
    if (data) {
      return reject({ status, data });
    }
  }
  return reject(error);
};

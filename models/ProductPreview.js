export function ProductPreview(model, isCart = true) {
  if (model.images instanceof Array) {
    const [image = {}] = model.images;
    this.image = image.name || '';
  } else {
    this.image = model.image;
  }
  this.id = model.id;
  this.title = model.title;
  this.isCart = isCart;
}

export function CartProduct(model) {
  if (model.images instanceof Array) {
    const [image = {}] = model.images;
    this.image = image.name || '';
  } else {
    this.image = model.image;
  }
  this.id = model.id;
  this.code = model.code;
  this.title = model.title;
  this.stickers = model.stickers;
  this.location = model.location;
  this.unitCost = model.unitCost;
  this.quantity = model.quantity;
}

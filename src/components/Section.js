export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(({ name, link }) => {
      const element = {
        name: name,
        link: link,
      };
      const newItem = this._renderer(element);
      this.addItem(newItem);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

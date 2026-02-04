module.exports = (function () {
  let cart = [];
  function additem(item) {
    cart = [...cart, item];
  }
  function generatebill() {
    let total = 0;
    for (let item of cart) {
      total += item.price;
    }
    return total;
  }
  function getallitems() {
    return cart;
  }
  return {
    additem,
    generatebill,
    getallitems,
  };
})();

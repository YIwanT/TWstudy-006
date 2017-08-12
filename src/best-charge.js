function find(collection, ch ) {
  for (let item of collection) {
    if (item.id == ch) {
      return item;
    }
  }
  return null;
}
function include(collection, ch ) {
  for (let item of collection) {
      if (item == ch) {
        return true ;
      }
  }
  return false;
}
module.exports = function bestCharge(selectedItems) {
  let result = '============= 订餐明细 =============\n';
  let loadAllItems = require('./items');
  let loadPromotions = require('./promotions');
  let AllItem = loadAllItems.loadAllItems;
  let Promotions = loadPromotions.loadPromotions;
  let Item = [] ;
  let Aprice = 0 ;
  let Bprice = 0 ;
  let discountitem = [] ;
  let disitem = '';
  for (let item of selectedItems) {
    let array = item.split(' x ');
    Item.push({key: array[0], count: array[1]});
  }
  for (let item of Item) {
    let obj = find(AllItem, item.key);
    if (obj){
     result += obj.name + ' x ' + item.count + ' = ' + obj.price * item.count + '元\n';
     Aprice += obj.price * item.count;
      if (include(Promotions[1].items, item.key)){
        Bprice += obj.price / 2 ;
        discountitem.push(obj.name);
      }
    }
  }
  for (var i = 0; i < discountitem.length; i++) {
    disitem += discountitem[i] + '，'
    if (i = discountitem.length -1){
      disitem += discountitem[i];
    }

  }
  result += '-----------------------------------\n';
if (Aprice > 30 || Bprice != 0){
  result += '使用优惠:\n';
  if (Bprice > 6){
    result += Promotions[1].type + '(' + disitem + ')，省' + Bprice + '元\n' + '-----------------------------------\n';
    result += '总计：' + (Aprice - Bprice) + '元\n' + '===================================';
  }else {
    result += Promotions[0].type + '，省6元\n' + '-----------------------------------\n';
    result += '总计：' + (Aprice - 6) + '元\n' + '===================================';
  }
}else {
result += '总计：' + Aprice + '元\n' + '===================================';
}
  return result;
};

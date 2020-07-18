function idGenerator(digit){
  // Randomly generate an integer from 1 to 10^digit.
  return (Math.floor(Math.random() * Math.pow(10, digit)) + 1);
}

export default {
  namespace: 'products',
  state: {
    products: [
      { key: "1",
        name: 'dva', 
        id: 1,
        createTime: new Date().toLocaleTimeString(),
        creator: "A",
        price: 0,
        category: "AAA" 
      },
      { key: "2",
        name: 'antd', 
        id: 2, 
        createTime: new Date().toLocaleTimeString(),
        creator: "B",
        price: 0,
        category: "AAA" 
      },
    ],
  },

  reducers: {
    delete(state, { payload: id }) {
      let result = state.products.filter(item => item.id !== id);
      return Object.assign({}, state, {products: result});
    },

    addNewItem(state, { payload: newItem}) {
      const newId = idGenerator(4);
      const newItemWithId = { ...newItem, id: newId, key: newId.toString()};
      const nextData = state.products.concat(newItemWithId);

      return Object.assign({}, state, { products: nextData });

      // const newResult = Object.assign({}, {...state}, { products: nextData });
      // state.products = newResult;
      // return newResult;
    },

    editItem(state, {payload: editedItem}){
      return Object.assign({}, state, {products: editedItem});
    },
  },
};
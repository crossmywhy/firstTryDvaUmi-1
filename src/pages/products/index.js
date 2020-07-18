import { connect } from "umi";
import ProductList from "../../components/products-list";
import React, { Component } from "react";
import { Table, Modal, Button, Form, Input } from "antd";
import OpenModal from "../../components/modal";

const namespace = "products";

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: `${namespace}/delete`,
      payload: id
    });
  }
  function handleAddNew(newItem) {
    let validInput = newItem.name && newItem.price && newItem.creator;
    if (validInput) {
      dispatch({
        type: `${namespace}/addNewItem`,
        payload: newItem
      });
    }
  }

  function handleEdit(editedItem) {
    dispatch({
      type: `${namespace}/editItem`,
      payload: editedItem
    });
  }
  return (
    <div>
      <ProductList
        onEdit={handleEdit}
        onDelete={handleDelete}
        products={products}
      />
    </div>
  );
};

export default connect(({ products }) => {
  return {
    products
  };
})(Products);

import { Table, Popconfirm, Button, Input, Form, Divider } from "antd";
import React, { useState } from "react";
// import { columns } from "./index.data";
import "./index.css";
import Search from "./search";
import {
  PlusOutlined,
  SwapLeftOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ProductList = ({ onEdit, onDelete, products }) => {
  const [form] = Form.useForm();
  let [data, setState] = useState(products.products);
  data = products.products;
  const [editingKey, setEditingKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: false
    },
    {
      title: "ID",
      dataIndex: "id",
      editable: false
    },
    {
      title: "Time Created",
      dataIndex: "createTime",
      editable: false
    },
    {
      title: "Creator",
      dataIndex: "creator",
      editable: false
    },
    {
      title: "Price",
      dataIndex: "price",
      editable: true
    },
    {
      title: "Category",
      dataIndex: "category",
      editable: false
    },
    {
      title: "Place",
      dataIndex: "palce",
      editable: true
    },
    {
      title: "Actions",
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span className="action-bar">
            <EditOutlined
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            />
            <Divider type="vertical" />
            <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
              <DeleteOutlined />
            </Popconfirm>
          </span>
        );
      }
    }
  ];

  const isEditing = record => {
    return record.key === editingKey;
  };

  const edit = record => {
    form.setFieldsValue({
      ...record
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });

      setEditingKey("");

      onEdit(newData);
      setState(newData);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  return (
    <div className="product-list">
      <Search />
      <Button
        onClick={() =>
          handleAddNew({
            name: document.getElementById("itemName").value,
            createTime: new Date().toLocaleTimeString(),
            creator: document.getElementById("itemCreator").value,
            price: document.getElementById("itemPrice").value,
            category: "AAA"
          })
        }
        icon={<PlusOutlined />}
        type="primary"
        className="add-item"
      >
        Add Item
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          dataSource={products.products}
          columns={mergedColumns}
          size="middle"
        />
      </Form>
      <Button
        type="primary"
        href="/.."
        icon={<SwapLeftOutlined />}
        className="goback"
      >
        Go Back
      </Button>
    </div>
  );
};

export default ProductList;

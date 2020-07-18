import { Popconfirm, Button } from "antd";

export const columns = [
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
        <span>
          <Button disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </Button>
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        </span>
      );
    }
  }
];

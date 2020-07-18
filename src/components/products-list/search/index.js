import { Input, Button } from "antd";
import "./index.css";
import { SearchOutlined } from "@ant-design/icons";

export default () => {
  return (
    <div className="search-container">
      <div className="search-left">
        <Input
          id="itemName"
          addonBefore="Name:"
          placeholder="Please Input Name"
        />
        <Input
          id="itemPrice"
          addonBefore="Price:"
          placeholder="Please Input Price"
        />
        <Input
          id="itemCreator"
          addonBefore="Creator:"
          placeholder="Please Input Creator"
        />
      </div>
      <div ckassName="search-right">
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </div>
    </div>
  );
};

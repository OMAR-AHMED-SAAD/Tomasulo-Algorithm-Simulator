import { Table, Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const RegisterFile = ({ registerFile }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "id",
      key: "id",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(confirm)}
            allowClear
          />
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.id.toLowerCase() == value.toLowerCase(),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.current.select();
          });
        }
      },
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Qi",
      dataIndex: "Qi",
      key: "Qi",
    },
  ];

  const handleSearch = (confirm) => {
    confirm();
    setSearchInput(searchedColumn);
  };

  const paginationConfig = {
    showSizeChanger: false, // Disable the page size changer
    defaultPageSize: 4, // Default page size
    position: ["bottomCenter"],
  };

  const data = Object.entries(registerFile).map(([id, values]) => ({
    id,
    ...values,
  }));
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={paginationConfig}
      style={{ maxWidth: "500px" }}
    />
  );
};

export default RegisterFile;

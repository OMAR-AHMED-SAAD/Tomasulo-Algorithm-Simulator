import { Table } from 'antd';

function Cache({ cache }) {
    const columns = [
        {
          title: 'Address',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Data',
          dataIndex: 'data',
          key: 'data',
        },
      
      ];

      const paginationConfig = {
        showSizeChanger: false, // Disable the page size changer
        defaultPageSize: 4, // Default page size
        position: ["bottomCenter"],
      };

      const data = cache.map((values,id) => ({ id, data:values }));
  return (
    <Table columns={columns} dataSource={data} pagination={paginationConfig}  style={{ maxWidth: "400px" }}/>
  )
}

export default Cache

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
      const data = cache.map((values,id) => ({ id, data:values }));
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default Cache

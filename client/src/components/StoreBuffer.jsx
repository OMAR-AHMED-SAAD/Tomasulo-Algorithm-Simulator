import { Table } from 'antd';

const StoreBuffer = ({ storeBuffer }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Busy',
      dataIndex: 'busy',
      key: 'busy',
    },
    {
      title: 'Op',
      dataIndex: 'op',
      key: 'op',
    },
    {
      title: 'Vj',
      dataIndex: 'Vj',
      key: 'Vj',
    },
    {
      title: 'Qj',
      dataIndex: 'Qj',
      key: 'Qj',
    },
    {
      title: 'Time',
      dataIndex: 'Time',
      key: 'Time',
    },
    {
      title: 'A',
      dataIndex: 'A',
      key: 'A',
    },
  ];
  const data = Object.entries(storeBuffer).map(([id, values]) => ({ id, ...values }));
  return (
    <Table columns={columns} dataSource={data} />
  );
};
export default StoreBuffer;

import { Table } from 'antd';

const LoadBuffer = ({ loadBuffer }) => {
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
  const data = Object.entries(loadBuffer).map(([id, values]) => ({ id, ...values }));
  return (
    <Table columns={columns} dataSource={data} />
  );
};
export default LoadBuffer;

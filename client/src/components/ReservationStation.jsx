import { Table } from 'antd';

const ReservationStation = ({ stationData }) => {
  // busy: 0,
  //     op: "",
  //     Vj: 0,
  //     Vk: 0,
  //     Qj: 0,
  //     Qk: 0,
  //     Time: 0,
  //     A: 0,
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
      title: 'Vk',
      dataIndex: 'Vk',
      key: 'Vk',
    },
    {
      title: 'Qj',
      dataIndex: 'Qj',
      key: 'Qj',
    },
    {
      title: 'Qk',
      dataIndex: 'Qk',
      key: 'Qk',
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
  const data = Object.entries(stationData).map(([id, values]) => ({ id, ...values }));
  return (
    <Table columns={columns} dataSource={data} />
  );
};
export default ReservationStation;
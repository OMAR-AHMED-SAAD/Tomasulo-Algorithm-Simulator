import { Table } from 'antd';

const RegisterFile = ({ registerFile }) => {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Value',
          dataIndex: 'value',
          key: 'value',
        },
        {
          title: 'Qi',
          dataIndex: 'Qi',
          key: 'Qi',
        }
      ];
      const data = Object.entries(registerFile).map(([id, values]) => ({ id, ...values }));
  return (
    <Table columns={columns} dataSource={data} />
  )
}
export default RegisterFile;
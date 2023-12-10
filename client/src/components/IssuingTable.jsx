import { Table } from 'antd';

function IssuingTable({ issuingTable }) {
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Instruction',
          dataIndex: 'instruction',
          key: 'instruction',
        },
        {
          title: 'Issue',
          dataIndex: 'issue',
          key: 'issue',
        },
        {
          title: 'Start Execution',
          dataIndex: 'startExecution',
          key: 'startExecution',
        },
        {
          title: 'End Execution',
          dataIndex: 'endExecution',
          key: 'endExecution',
        },
        {
          title: 'Write Result',
          dataIndex: 'writeResult',
          key: 'writeResult',
        },
      ];

      const paginationConfig = {
        showSizeChanger: false, // Disable the page size changer
        defaultPageSize: 4, // Default page size
      };

      const data = Object.entries(issuingTable).map(([id, values]) => ({ id, ...values }));
  return (
    <Table columns={columns} dataSource={data} pagination={paginationConfig} />
  )
}

export default IssuingTable

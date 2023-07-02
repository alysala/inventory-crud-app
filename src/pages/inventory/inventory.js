import React from 'react';
import MaterialTable from 'material-table';

const data = [
  { name: 'Test Item', quantity: 1, description: 'test decp' },
  { name: 'Test Item 2', quantity: 1, description: 'test decp' },
];

const columns = [
  { title: 'Item Name', field: 'name' },
  { title: 'Quantity', field: 'quantity', type: 'numeric' },
  { title: 'Description', field: 'decription' },
];

export const BasicTable = () => {
  return <MaterialTable title='Basic Table' columns={columns} data={data} />;
};

const Inventory = () => {
  return (
    <div>
      {BasicTable}
    </div>
  );
};

export default Inventory;

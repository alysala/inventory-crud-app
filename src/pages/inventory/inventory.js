import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';

const data = [
  { name: 'Test Item', quantity: 1, description: 'test decp' },
  { name: 'Test Item 2', quantity: 1, description: 'test decp' },
];

const columns = [
  { title: 'Item Name', field: 'name' },
  { title: 'Quantity', field: 'quantity', type: 'numeric' },
  { title: 'Description', field: 'decription' },
];

const Inventory = () => {
  const defaultMaterialTheme = createTheme()
  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
      	<MaterialTable title='Basic Table' columns={columns} data={data} />
      </ThemeProvider>
    </div>
  );
};

export default Inventory;

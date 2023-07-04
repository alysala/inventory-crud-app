import React from 'react';
import MaterialTable, { MTableAction, MTableBodyRow } from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import styles from './Inventory.module.css';

const InventoryManager = ({user, setUser, tableIcons, data, setData, columns}) => {
  const tableRef = React.createRef();
  const addActionRef = React.useRef();
  const defaultMaterialTheme = createTheme();

  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
	  		<div className={styles.subBanner}>
				<p className={styles.text} onClick={() => addActionRef.current.click()}>Add new item +</p>
			</div>
      	<MaterialTable
        tableRef={tableRef}
        columns={columns}
        data={data}
		icons={tableIcons}
        title='Inventory'
		options={{
			tableLayout: 'auto'
		  }}
		components={{
			Action: props => {
				  //If isn't the add action
				  if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
						return <MTableAction {...props} />
				  } else {
						return <div ref={addActionRef} onClick={props.action.onClick}/>;
				  }
				},
				Row: props => (
					<MTableBodyRow
					  {...props}
					  onDoubleClick={e => {
						console.log(props.actions);
						props.actions[1]().onClick(e);
						alert("Make row editable");
					  }}
					/>
				  )
			}}
			editable={{
				onRowAdd: (newData) =>
				  Promise.resolve(setData([...data, newData])),
				onRowUpdate: (newData, oldData) =>
				  new Promise((resolve, reject) => {
					console.log('update');
					console.log(newData);
					console.log(oldData);
					resolve();
				  }),
				onRowDelete: oldData =>
				  new Promise((resolve, reject) => {
					console.log('delete');
					console.log(oldData);
					resolve();
				  })
			  }}
			
    />
      </ThemeProvider>
    </div>
  );
};

export default InventoryManager;

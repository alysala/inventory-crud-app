import React from 'react';
import MaterialTable, { MTableAction, MTableBodyRow } from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import styles from './Inventory.module.css';
import axios from 'axios';

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
				  if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') return <MTableAction {...props} />
				  else return <div ref={addActionRef} onClick={props.action.onClick}/>;
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
				new Promise((resolve, reject) => {
					newData['user'] = user;
					axios.post(
						'http://127.0.0.1:5000/add-inventory',
						newData,
						{withCredentials: true}
					).then((response) => {
						setData(JSON.parse(response.data.inventory));
					}).catch((err) => {
					  alert(err.response.data.message);
					  console.log(err);
					});
					resolve();
				  }),
				onRowUpdate: (newData, oldData) =>
				  new Promise((resolve, reject) => {
					newData['user'] = user;
					newData['oldName'] = oldData['name'];
					axios.post(
						'http://127.0.0.1:5000/update-inventory',
						newData,
						{withCredentials: true}
					).then((response) => {
						setData(JSON.parse(response.data.inventory));
					}).catch((err) => {
					  alert(err.response.data.message);
					  console.log(err);
					});
					resolve();
				  }),
				onRowDelete: oldData =>
				  new Promise((resolve, reject) => {
					axios.post(
						'http://127.0.0.1:5000/delete-inventory',
						{ 'name': oldData['name'] },
						{withCredentials: true}
					).then((response) => {
						setData(JSON.parse(response.data.inventory));
					}).catch((err) => {
					  alert(err.response.data.message);
					  console.log(err);
					});
					resolve();
				  })
			  }}
    />
      </ThemeProvider>
    </div>
  );
};

export default InventoryManager;

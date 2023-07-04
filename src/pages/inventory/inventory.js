import React, { useState, forwardRef } from 'react';
import MaterialTable, { MTableAction } from 'material-table';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import styles from './Inventory.module.css';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const Inventory = () => {
  const tableRef = React.createRef();
  const addActionRef = React.useRef();
  const navigate = useNavigate();
  const defaultMaterialTheme = createTheme();
  const [data, setData] = useState([
	{ name: 'Test Item', quantity: 1, description: 'test decp' },
	{ name: 'Test Item 2', quantity: 1, description: 'test decp' },
  ]);

  const columns = [
	{ title: 'Item Name', field: 'name', width: '30%' },
	{ title: 'Quantity', field: 'quantity', type: 'numeric', width: '30%' },
	{ title: 'Description', field: 'decription', width: '30%' },
  ];

  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
	  		<div className={styles.subBanner}>
				<p className={styles.textRight} onClick={() => {navigate('/login', { replace: true })}}>Want to add items to the listing? Create an account or log in.</p>
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
				}
			}}
			editable={{
				onRowAdd: (newData) =>
				  Promise.resolve(setData([...data, newData]))
			  }}
			
    />
      </ThemeProvider>
    </div>
  );
};

export default Inventory;

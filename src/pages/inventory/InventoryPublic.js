import React from 'react';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import styles from './Inventory.module.css';

const InventoryPublic = ({tableIcons, data, columns}) => {
  const tableRef = React.createRef();
  const navigate = useNavigate();
  const defaultMaterialTheme = createTheme();

  // if(data){
  //   data.map(item => {
  //     if(item['description'].length > 100) return item['description'] = item['description'].slice(0,100) + '...';
  //     else return item['description'] = item['description'].slice(0,100);
  //     });
  // }

  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
	  		<div className={styles.subBanner}>
				<p className={styles.textRight} onClick={() => {navigate('/login', { replace: true })}}>Want to add items to the listing? Create an account or log in.</p>
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
    />
      </ThemeProvider>
    </div>
  );
};

export default InventoryPublic;

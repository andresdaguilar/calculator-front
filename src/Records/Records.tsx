import { CircularProgress, Container } from "@mui/material";
import Datagrid from "./Datagrid";
import { useContext, useEffect, useState } from "react";
import apiRequest from '../helpers/apiRequest';
import { AppContext } from "../context/AppContext";
import iRecords from "./iRecords";

const Records = () => {
  const { user, setUser } = useContext(AppContext);
  const [ records, setRecords ] = useState<iRecords[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, [])

  const fetchRecords = async () => {
    setIsLoading(true)
    try {
      const result = await apiRequest({token: user.token, url: '/record', method: 'GET', data: {}, params: {}});      
      setRecords(result.records);
      console.log(records);
    } catch (error){
      console.log(error)  
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number | string) =>  {
    try {
      const deleteRow = apiRequest({token: user.token, url: `/record/${id}`, method: 'DELETE', data: {}, params: {}});
      console.log("Delete", deleteRow);
      setRecords(records.filter(record => record.id !== id));
    } catch (error) {
      console.log(error);
    }
    console.log("delete", id);
  }

  return (
    
    <Container    
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    Records
    { isLoading && (
      <CircularProgress />  
    )}
    
    {records && (
       <Datagrid rows={records} handleDelete={handleDelete}/>
    )}
   
    </Container>
    
  );
}

export default Records;
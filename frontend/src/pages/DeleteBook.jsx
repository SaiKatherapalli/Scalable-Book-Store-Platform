import React, { useState } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
const {enqueueSnackbar}=useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://book-store-backend-m1f4.onrender.com/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully",{variant:'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        //alert("An error occured");
        enqueueSnackbar("Error Occurede",{variant:'error'});
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton/>
      <h1>Delete Book</h1>
      {loading ? <Spinner/> : ''}
      <div>
        <h3>Are you sure you want to delete this book</h3>
        <button className='p-4 bg-red-600 text-whitem-8 w-full' onClick={handleDeleteBook}>
             yes, Delete it 
        </button>
      </div>
    </div>
  )
}
export default DeleteBook

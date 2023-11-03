import React, {useState, useEffect} from 'react';
import axios from 'axios';

const IndustryName = (props) => {

    //get by id
  const [name, setName] = useState("");

  const fetchData = async () => {
    try {
      axios
        .get(`http://18.192.51.153:4002/api/v1/dashboard/branch/${props.id}`)
        .then((response) => {
          const values = response.data.data;
          setName(values);
        //   console.log(values);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(async () => {
    fetchData();
  }, []);


  return (
    <>{name.BranchName}</>
  )
}

export default IndustryName
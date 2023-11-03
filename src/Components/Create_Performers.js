import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import config from "../Config";
import { useHistory } from 'react-router-dom';


function CreatePerformers() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [client, setclient] = useState([]);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
   const [image, setImage] = useState(null)
   const [skills, setSkills] = useState([])
   const [selectedClient, setSelectedClient] = useState("");
   


   const history = useHistory();

  useEffect(() => {
  
    const clientData = async () => {
      await axios
        .get(
          `${config.API_URL}//userClient`
        )
        .then((res) => {
          const response = res.data.data;
          setclient(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    clientData();
   
  },[]);

//create
const [performer, setPerformer] = useState({
  UserName:"",
  FirstName: "",
  LastName: "",
  Email:"" ,
  LoweredEmail:"",
  Mobile:"",
  IsAnonymous:"",
  Password:"",
  PasswordFormat:"",
  PasswordSalt: "",   
  IsApproved:"",
  IsLockedOut:"",
  Count:"",
  CreateDate:"",
  Ordinal: "",
  Date:"",
  Phone:"",
  PerformerTypes_Id: "",
  ReportType: "",
  CompanyName: "",
  ClientId:"",
  image:""
  
});

const handleChange = (e) => {
  e.preventDefault();
  setPerformer({ ...performer, [e.target.name]: e.target.value })
};



const handleImageChange = (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  setImage(file);
  
};

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const d= new Date();
const finDate = formatDate(d);

const formData = {
  UserName:performer.UserName,
  FirstName:performer.FirstName,
  LastName:performer.LastName,
  Email:performer.Email,
  Mobile:performer.Mobile,
  IsAnonymous:"0",
  Password:performer?.Password,
  PasswordFormat:1,   
  PasswordSalt: performer?.PasswordSalt,
  IsApproved:performer.IsApproved=="yes"? true : false,
  IsLockedOut:false,
  Count:0,
  CreateDate:finDate,
  Ordinal:0,
  Date:finDate, 
  Phone:performer.Phone,
  PerformerTypes_Id:performer.PerformerTypes_Id == "yes" ? 1 : 0,
  ReportType:1,
  CompanyName: selectedClient,
  ClientId: selectedClient,
  };
  console.log(formData)

  const handleArrayChange = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
        
      }
    }
   
    setSkills(value);
    console.log("array of client ids ", value);
    setSelectedClient(e.target.value);
  };
  // console.log("slectes client ", selectedClient);
  console.log(skills)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newFormData = new FormData() ; 
      for(const key in formData){
        console.log(key ," > " , formData[key]) ;
        newFormData.append(key , formData[key])
      }
      newFormData.append("image" , image)
      newFormData.append("UserClientIds" , skills)
      // console.log("new formData" , newFormData)

    if (performer.PasswordSalt !== performer.Password) {
      alert("password does not match");
    } else {
      await axios
        .post(`${config.API_URL}/newPerformer/Performer`, newFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response) {
            console.log("formData in new performer", newFormData);
            setSuccess(true);
          } else {
            alert(response);
            setFailure(true);
          }
        })
        .catch((err) => {
          console.log(`this is an catch err`, err);
          // alert("Password does not match")
        });

      await axios
        .post(`${config.API_URL}/Performer`, formData)
        .then((response) => {
          if (response) {
            // console.log("formData in performer API  " , formData)
            setSuccess(true);
          } else {
            alert(response);
            setFailure(true);
          }
        })
        .catch((err) => {
          console.log(`this is an catch err`, err);
          alert("UserName Already exist");
        });

      setTimeout(() => {
        setSuccess(false);
        history.push("/performers");
      }, 3000);
    }
};

  return (
    <>
      <div className="mt-4">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-sky-400 px-4 py-2 text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Register new Performer
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-6 mb-6 lg:grid-cols-3">
                        <div>
                          <label
                            for="UserName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            User name
                          </label>
                          <input
                            type="text"
                            name="UserName"
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="FirstName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="FirstName"
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="LastName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="LastName"
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="Email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            E-mail address
                          </label>
                          <input
                            type="email"
                            name="Email"
                            onChange={handleChange}
                            
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                          />
                        </div>

                        <div className="mb-6">
                          <label
                            for="Password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="Password"
                            onChange={handleChange}
                            
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required
                          />
                        </div>

                        <div className="mb-6">
                          <label
                            for="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Confirm new Password
                          </label>
                          <input
                            type="password"
                            name="PasswordSalt"
                            onChange={handleChange}

                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 mb-6 lg:grid-cols-3">
                        <div>
                          <label
                            for="Phone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Phone
                          </label>
                          <input
                            type="number"
                            onChange={handleChange}
                            name="Phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="Mobile"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Mobile
                          </label>
                          <input
                            type="number"
                            onChange={handleChange}
                            name="Mobile"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="ClientId"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >
                            Customers
                          </label>
                          <select
                            multiple
                            name="ClientId"
                            onChange={handleArrayChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option>Select Customers </option>
                          {client.map((val, index) => (
                            <option value={val.Id} 
                         >{val.CompanyName}</option>
                          ))}
                        </select>
                        </div>
                      </div>

                      <div className="grid gap-6 mb-6 lg:grid-cols-3">
                      <div className="editor-label">
                        <label for="PerformerTypes_Id"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >Types of performer</label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="PerformerTypes_Id"
                          style={{width:"310px",height:"40px"}}
                          required
                         >
                         <option>Select Performer Type</option>
                         <option value="yes">Auditor</option>
                         <option value="no">Performer</option>
                         </select>
                      </div>
                      <div>
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            for="IsFixed"
                          >
                            {" "}
                            Logo
                          </label>
                          <input
                            className="block mb-5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer "
                            id="small_size"
                            type="file"
                            name="ProfileImage"
                          
                            onChange={handleImageChange}
                          />
                        </div>


                        <div className="block items-center"> 
                        <label
                        className=" text-sm font-medium text-gray-900 dark:text-gray-400"
                        for="IsApproved"
                        >Active</label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt"
                          name="IsApproved"
                          onChange={handleChange}
                          value={performer.IsApproved}
                          required
                          >
                          <option>Select Active</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white"
                        onClick={closeModal}
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default CreatePerformers;

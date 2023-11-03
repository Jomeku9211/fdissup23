import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import config from "../Config";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

function EditCustomers({id}) {
  let [isOpen, setIsOpen] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [country , setCountry] = useState([]) ; 
  const [branch , setBranch] = useState([] ) ; 
  const [prev , setPrev] = useState([]) ; 

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // get customer by id
  
  const [customer, setCustomer] = useState({
    UserName: "",
    Email: "",
    Mobile: "",
    CompanyName: "",
    Phone: "",
    ContactPerson: "",
    Country: "",
    State: "",
    ZipCode: "",
    StreetName: "",
    Branch: "",
    Fax: "",
    ReportType: "",
  });
  const formData = {

    // UserName:item?.UserName,
    Email : customer?.Email , 
    Mobile:customer?.Mobile,
    CompanyName:customer?.CompanyName,
    Phone:customer?.Phone,
    ContactPerson: customer?.ContactPerson,
    Country: customer?.Country,
    State: customer?.State,
    ZipCode: customer?.ZipCode,
    StreetName: customer?.StreetName,
    Branch: customer?.Branch,
    Fax:customer?.Fax,
    ReportType:1,

     
    };
  const handleApi = async (e) => {
    e.preventDefault();
      try
      {
        await axios
        .patch(`${config.API_URL}/userClient/${id}`, formData)
        .then((response) => {
          if (response) {
            console.log("Data submitted" , formData)
            alert("Submit")
            setSuccess(true);
          }
          else{
            alert(response)
            setFailure(true);
          }
        })
      }
      catch(error){
        console.log("This is the patch error in the client edit " , error )
      }
      setTimeout(() => {
        setSuccess(false);
        history.push('/customers');
      }, 3000);
      
      
  };
  
  // const { id , name} = useParams();
  const history = useHistory();
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: newValue,
    }));
  };

  const countryData = async () =>{
    await axios.get(`${config.API_URL}/country`)
    .then((res) =>{
        const response = res.data.data.rows; 
        setCountry(response) 
        // console.log(response)
    })
    .catch((error) =>{
        console.log(error)
    })
}
const branchData = async () =>{
  await axios.get(`${config.API_URL}/branch`)
  .then((res) => {
      const response = res.data.data.rows ;
      setBranch(response) ; 
  }).catch((error) =>{
      console.log("there is error in create client" , error)
  })
}

  useEffect( () => {
   
    const  clientData = async () => {
        try {
          axios.get(`${config.API_URL}/userClient/${id}`)
          .then((response) => {
            const values = response.data.data;
            setCustomer(() => {
              setCustomer(values);
            });
            setPrev(values)
          });
        } catch (error) {
          console.log(error.message);
        }
    };
    
    branchData(); 
    clientData();
    countryData(); 
  },[id]);

  console.log(  "customer", customer) 

  return (
    <>
      <div className="">
        <button type="button" onClick={openModal}>
          <FaEdit className="text-blue-600 text-base" />
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
                    update customer
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleApi}>
                      <div className="grid gap-6 mb-6 lg:grid-cols-3">
                        <div>
                        {/* <label>User Name</label> : <span>{name}</span> */}
                     <br/>
                       
                          {/* <input
                            type="text"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            // defaultValue={c.UserName}
                            name="UserName"
                            onChange={handleChange}
                            readOnly
                            required
                          /> */}
                        </div>
                        {/* <div>
                        <div>
                          <label
                            for="FirstName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            First_name
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
                            Last_name
                          </label>
                          <input
                            type="text"
                            name="LastName"
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required
                          />
                        </div>
                        </div> */}
                        <div>
                          <label
                            for="company"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="CompanyName"
                            value={customer?.CompanyName}
                            // defaultValue={client.CompanyName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        {/* <div>
                          <label
                            for="countries_multiple"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >
                            Modules
                          </label>
                          <select
                            multiple
                            id="countries_multiple"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          >
                            <option selected>Choose countries</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                          </select>
                        </div> */}
                        <div>
                          <label
                            for="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            E-mail address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            name="Email"
                            value={customer?.Email}
                            // defaultValue={client.Email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="countries"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >
                            Industry
                          </label>
                          <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg "                         
                          >
                            <option value="">Select Industry</option>
                            {branch.map((val, index) => (
                              <option value={val.Id}>{val.BranchName}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid gap-6 mb-6 lg:grid-cols-3">
                        <div>
                          <label
                            for="contact"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Contact
                          </label>
                          <input
                            type="text"
                            id="contact"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="ContactPerson"
                            value={customer?.ContactPerson}
                            // defaultValue={client.ContactPerson}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="phone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Phone
                          </label>
                          <input
                            type="number"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="Phone"
                            value={customer?.Phone}
                            // defaultValue={client.Phone}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="fax"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Fax
                          </label>
                          <input
                            type="fax"
                            id="fax"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            name="Fax"
                            value={customer?.Fax}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-6">
                          <label
                            for="postcode"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Postalcode
                          </label>
                          <input
                            type="text"
                            id="postcode"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="ZipCode"
                            value={customer?.ZipCode}
                            // defaultValue={client.ZipCode}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="Province"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Province
                          </label>
                          <input
                            type="text"
                            id="Province"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="State"
                            value={customer?.State}
                            // defaultValue={client.State}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="mobile"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Mobile
                          </label>
                          <input
                            type="text"
                            id="mobile"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="Mobile"
                            value={customer?.Mobile}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 mb-6 lg:grid-cols-3">
                        <div>
                          <label
                            for="Street_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Street name
                          </label>
                          <input
                            type="text"
                            id="Street_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="StreetName"
                            value={customer?.StreetName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="last_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="last_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="City"
                            value={customer?.City}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="countries"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >
                            Land
                          </label>
                          <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg "
                            name="CountryId"
                            onChange={handleChange}
                            // value={customer?.Country}
                          >
                            <option>Select Country </option>
                            {country.map((val, index) => (
                              <option value={val.Id}>{val.CountryName}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            for="small_size"
                          >
                            {" "}
                            Logo
                          </label>
                          <input
                            className="block mb-5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer "
                            id="small_size"
                            type="file"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="block items-center">
                      <label>Active</label>
                      <input
                        type="checkbox"
                        
                        className="form-control"
                        onChange={handleChange}
                        style={{ width: "100px" }}
                  
                      >
                      </input>
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

export default EditCustomers;

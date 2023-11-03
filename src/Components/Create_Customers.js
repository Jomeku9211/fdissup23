import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import config from "../Config";
import { useHistory } from "react-router-dom";

function CreateCustomers() {
  let [isOpen, setIsOpen] = useState(false);
  const [array, setArray] = useState([]);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [country, setCountry] = useState([]);
  const [branch, setBranch] = useState([]);
  const inputCnfPassword = useRef("");
  const inputPassword = useRef("");
  const [newUserId, setNewUserId] = useState("");
  const [module, setModule] = useState([]);
  const [image, setImage] = useState("");
  const history = useHistory();
  const [show, setShow] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // get module

  useEffect(() => {
    const clientData = async () => {
      await axios
        .get(`${config.API_URL}/user`)
        .then((res) => {
          const response = res.data.data.rows;
          setArray(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const moduleData = async () => {
      await axios
        .get(`${config.API_URL}/Module`)
        .then((response) => {
          const res = response.data.data;
          setModule(res);
          console.log(res);
        })
        .catch((err) => {
          console.log("this is catch error in module");
        });
    };

    const countryData = async () => {
      await axios
        .get(`${config.API_URL}/country`)
        .then((res) => {
          const response = res.data.data.rows;
          setCountry(response);
          // console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const branchData = async () => {
      await axios
        .get(`${config.API_URL}/branch`)
        .then((res) => {
          const response = res.data.data.rows;
          setBranch(response);
        })
        .catch((error) => {
          console.log("there is error in create client", error);
        });
    };

    clientData();
    countryData();
    branchData();
    moduleData();
    // setShow(false) ;
  }, [success]);

  const [customer, setCustomer] = useState({
    User_Id: " ",

    Password: "",
    ConfirmPassword: "",
    Email: "",
    Mobile: "",
    CompanyName: "",
    Phone: "",
    ContactPerson: "",
    CountryId: "",
    State: "",
    ZipCode: "",
    StreetName: "",
    Branch_Id: "",
    Fax: "",
    Module_Id: "",
    ReportType: "",
    City: "",
    Active: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
  };

  const formData = {
    UserName: customer.UserName,

    User_Id: customer.User_Id,
    Password: customer.Password,
    ConfirmPassword: customer.ConfirmPassword,
    Email: customer.Email,
    Mobile: customer.Mobile,
    CompanyName: customer.CompanyName,
    Phone: customer.Phone,
    ContactPerson: customer.ContactPerson,
    CountryId: customer.CountryId,
    State: customer.State,
    ZipCode: customer.ZipCode,
    StreetName: customer.StreetName,
    Branch_Id: customer.Branch,
    Fax: customer.Fax,
    Module_Id: customer.Module_Id,
    ReportType: 1,
    City: customer.City,
    Active: customer.Active == "Yes" ? 1 : 0,
  };
  console.log(formData);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (customer.ConfirmPassword !== customer.Password) {
      alert("Password does not match");
      console.log("Form data ", formData);
    } else {
      e.target.reset();
      const newFormData = new FormData();
      for (const key in formData) {
        // console.log(key ," > " , formData[key]) ;
        newFormData.append(key, formData[key]);
      }
      newFormData.append("image", image);
      console.log("new formData", newFormData);
      await axios
        .post(`${config.API_URL}/userClient/upload`, newFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response) {
            console.log("data posted client  ", newFormData);
            setSuccess(true);
          } else {
            alert(response);
            setFailure(true);
          }
        })
        .catch((err) => {
          alert("Company Name Already Exist");
          console.log(`this is an catch err`, err);
        });
      setTimeout(() => {
        setSuccess(false);
        history.push("/customers");
      }, 3000);
    }
    // const [item, setItem] = useState({
    //   UserName: "",
    //   FirstName: "",
    //   LastName: "",
    //   // CategoryName :""
    // });
    // const [submited, setSubmitted] = useState(false);

    // const formDataUser = {
    //   UserName: item.UserName,
    //   FirstName: item.FirstName,
    //   LastName: item.LastName,
    //   // CategoryName : "nishant"
    // };
    // console.log("items" , customer);

    // const handleChangeUser = (e) => {
    //   e.preventDefault();
    //   setItem({ ...item, [e.target.name]: e.target.value });
    // };

    // const onSubmitUser = async (e) => {
    //   e.preventDefault();
    //   e.target.reset();
    //   try {
    //     const response = await axios.post(`${config.API_URL}/user`, item);
    //     if (response) {
    //       setShow(false);
    //       // alert("Successfully Created");

    //       // Update the array state and pre-fill the dropdown
    //       setArray([...array, item]);
    //       setCustomer({ ...customer, UserName: item.UserName }); // Pre-fill dropdown

    //       console.log("data posted", item);
    //       console.log(response)
    //       setSuccess(true) ;

    //       setNewUserId(response?.data?.data?.Id)
    //     }
    //   } catch (err) {
    //     setShow(true);
    //     console.log("Error posting user data:", err);
    //   }
    //   setTimeout(() =>{
    //     setSuccess(false)
    //   } , 3000)
    // };
  };

  const [item, setItem] = useState({
    UserName: "",
    FirstName: "",
    LastName: "",
    // CategoryName :""
  });
  const [submited, setSubmitted] = useState(false);

  const formDataUser = {
    UserName: item.UserName,
    FirstName: item.FirstName,
    LastName: item.LastName,
    // CategoryName : "nishant"
  };
  console.log("items", customer);

  const handleChangeUser = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onSubmitUser = async (e) => {
    e.preventDefault();
    e.target.reset();
    try {
      const response = await axios.post(`${config.API_URL}/user`, item);
      if (response) {
        setShow(false);
        // alert("Successfully Created");

        // Update the array state and pre-fill the dropdown
        setArray([...array, item]);
        setCustomer({ ...customer, UserName: item.UserName }); // Pre-fill dropdown

        console.log("data posted", item);
        console.log(response);
        setSuccess(true);

        setNewUserId(response?.data?.data?.Id);
      }
    } catch (err) {
      setShow(true);
      console.log("Error posting user data:", err);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  return (
    <>
      <div className="mt-4">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-sky-400 px-4 py-2 text-base font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                    Create User
                  </Dialog.Title>

                  <form onSubmit={onSubmitUser}>
                    <div>
                      <label htmlFor="user_name"
                             className = "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                             
                              >User name</label>
                      <input
                        type="text"
                        id="user_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        name="UserName"
                        value={item.UserName}
                        onChange={handleChangeUser}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="first_name"
                      className = "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >First name</label>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        name="FirstName"
                        value={item.FirstName}
                        onChange={handleChangeUser}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="last_name"
                             className = "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      
                             >Last name</label>
                      <input
                        type="text"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        name="LastName"
                        value={item.LastName}
                        onChange={handleChangeUser}
                        required
                      />
                    </div>
                    <button className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white" type="submit" name="submit" onSubmit={onSubmitUser}>
                      Submit
                    </button>
                  </form>
                  <br />
                  <div className="mt-2">

                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create User
                  </Dialog.Title>
                  <br />
                    <form onSubmit={onSubmit}>
                      <div className="grid gap-6 mb-6 lg:grid-cols-3">
                        <div>
                        <p>{newUserId ? `Recently created :  ${customer.UserName}`: ""}</p>
                          <label
                            htmlFor="user_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            User name
                          </label>
                          {/* <br /> */}


                          
                      <select
                        name="User_Id"
                        className="form-control"
                        onChange={handleChange}
                        // value={newUserId}
                        // style={{margin: "15px"}}
                        required
                      >
                        <option value="">select User</option>
                        {array.map((val, index) => (
                          <option value={val.Id} key={val.Id}>
                            {val.UserName}
                          </option>
                        ))}
                      </select>
                        </div>
                        <div>
                          <label
                            htmlFor="company_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Company
                          </label>
                          <input
                            type="text"
                            id="company_name"
                            name="CompanyName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="countries_multiple"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >
                            Modules
                          </label>
                          <select
                            multiple
                            id="countries_multiple"
                            name="Module_Id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            onChange={handleChange}
                          >
                            <option>Select Country </option>
                            {module.map((val, index) => (
                              <option value={val.Id}>{val.Name}</option>
                            ))}
                          </select>
                        </div>
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
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="Password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            // id="password"
                            name="ConfirmPassword"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 mb-6 lg:grid-cols-3">
                        <div>
                          <label
                            htmlFor="contact"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Contact
                          </label>
                          <input
                            type="text"
                            id="contact"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="ContactPerson"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Phone
                          </label>
                          <input
                            type="number"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="Phone"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="fax"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Fax
                          </label>
                          <input
                            type="fax"
                            id="fax"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            name="Fax"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="postcode"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Postcode
                          </label>
                          <input
                            type="text"
                            id="postcode"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="ZipCode"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="province"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Province
                          </label>
                          <input
                            type="text"
                            id="province"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="State"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="mobile"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Mobile
                          </label>
                          <input
                            type="text"
                            id="mobile"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="Mobile"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 mb-6 lg:grid-cols-3">
                        <div>
                          <label
                            htmlFor="street_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Street name
                          </label>
                          <input
                            type="text"
                            id="street_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="StreetName"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="city"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="City"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="land"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >
                            Land
                          </label>
                          <select
                            id="land"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg "
                            name="CountryId"
                            onChange={handleChange}
                          >
                            <option>Select Country </option>
                            {country.map((val, index) => (
                              <option value={val.Id}>{val.CountryName}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="branch"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >
                            Industry
                          </label>
                          <select
                            id="branch"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg "
                            name="Branch"
                            onChange={handleChange}
                          >
                            <option>Select Industry </option>
                            {branch.map((val, index) => (
                              <option value={val.Id}>{val.BranchName}</option>
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
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>

                      <div className="block items-center">
                        <label
                          className=" text-sm font-medium text-gray-900 dark:text-gray-400"
                          htmlFor="Active"
                        >
                          Active
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt"
                          name="Active"
                          onChange={handleChange}
                          required
                        >
                          <option>Select Active</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
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

export default CreateCustomers;

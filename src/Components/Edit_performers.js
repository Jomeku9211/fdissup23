import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import config from "../Config";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function EditPerformers(props) {
  const { id, name } = useParams();
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [client, setclient] = useState([]);
  const [array, setArray] = useState([]);
  const history = useHistory();
  const [predata, setPredata] = useState([]);
  const [prefilled, setPrefilled] = useState([]);
  // const [prefilled , setPrefilled] = useState([])
  const [skills, setSkills] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

  console.log("id of edit performer", props.id);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //get performer by Id
  const [performer, setPerformer] = useState([]);

  
  useEffect(() => {
    const clientData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/userClient`);
        setclient(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const performerData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/newPerformer/${id}`);
        setNewPerformer(response.data.data);
        setArray(response.data.data);
        setPrefilled(response.data.data);
      } catch (error) {
        console.log('Error fetching performer data:', error);
      }
    };

    clientData();
    performerData();
  }, [id]);


  // const getPerformer = async () => {
  //   await axios
  //     .get(`${config.API_URL}/newPerformer/${props.id}`)
  //     .then((res) => {
  //       const response = res.data.data;
  //       setPerformer(response);
  //       console.log(response)
  //       // setArray(response);
  //       // setPrefilled(response)
  //     })

  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // // useEffect(() => {
  // //   getPerformer();
  // // }, []);

  // //get superClients

  // const clientData = async () => {
  //   await axios
  //     .get(`http://18.192.51.153:4002/api/v1/dashboard/userClient`)
  //     .then((res) => {
  //       const response = res.data.data;
  //       setclient(response);
  //       // console.log(response)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   getPerformer();
  //   clientData();
  // }, []);

  const handleChangeClient = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSkills(value);
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const d = new Date();
  const finDate = formatDate(d);

  // update performer
  const [newPerformer, setNewPerformer] = useState({
    UserName: "",
    FirstName: " ",
    LastName: " ",
    Email: " ",
    LoweredEmail: "",
    Mobile: " ",
    IsAnonymous: "",
    Password: "",
    PasswordFormat: "",
    IsApproved: "",
    IsLockedOut: "",
    Count: "",
    CreateDate: 0,
    Ordinal: "",
    Date: 0,
    Phone: "",
    PerformerTypes_Id: "",
    ReportType: "",
    CompanyName: "",
    ClientId: "",
  });

  console.log("new perf", newPerformer);
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setNewPerformer({ ...newPerformer, [e.target.name]: e.target.value });
  // };

  const handleChange = (e, type) => {
    const { name, options } = e.target;

    if (type === "array") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setNewPerformer({ ...newPerformer, [name]: selectedOptions });
    } else if (type === "boolean") {
      setNewPerformer({ ...newPerformer, [name]: e.target.value === "true" });
    } else {
      setNewPerformer({ ...newPerformer, [name]: e.target.value });
    }
  };
  var test =
    array.length !== 0 ? array.NewPerformerdata.map((item) => item.Id) : [];

  console.log("test", test);

  function getSelect(userId) {
    if (test.length !== 0) {
      for (let x of test) {
        if (x === userId) {
          return true;
        }
      }
      return false;
    }
    return false;
  }
  const formData = {
    UserName: name,
    FirstName: newPerformer?.FirstName,
    LastName: newPerformer?.LastName,
    Email: newPerformer?.Email,
    Mobile: newPerformer?.Mobile,
    IsAnonymous: 0,
    Password: newPerformer?.Password,
    PasswordFormat: 1,

    IsApproved: false,
    IsLockedOut: 0,
    Count: 0,
    CreateDate: finDate,
    Ordinal: 0,
    Date: finDate,
    Phone: newPerformer?.Phone,
    PerformerTypes_Id: 1,
    ReportType: 1,
    CompanyName: newPerformer?.ClientId,
    ClientId: newPerformer?.ClientId,
    UserClientIds: skills.length !== 0 ? skills : test,
  };

  const handleApi = async (e) => {
    e.preventDefault();
    console.log("form data ", formData);
    // e.target.reset();
    // const formDataNew = new FormData() ;

    // for (const key in formData) {
    //   formDataNew.append(key , formData[key])
    // }
    // formDataNew.append('UserClientIds' , skills.length !== 0 ? skills : test)

    await axios
      .patch(`${config.API_URL}/newPerformer/${props.id}`, formData)
      .then((response) => {
        if (response) {
          // e.target.reset();
          window.alert("Updated");
          setSuccess(true);
        } else {
          alert(response);
          setFailure(true);
        }
      })
      .catch((err) => {
        console.log("error in performer");

        console.log(`this is an catch err`, err);
        setTimeout(() => {
          setSuccess(false);

          history.push("/performers");
        }, 3000);
      });

    await axios
      .patch(`${config.API_URL}/Performer/${props.id}`, formData)
      .then((response) => {
        if (response) {
          // e.target.reset();
          setSuccess(true);
        } else {
          alert(response);
          setFailure(true);
        }
      })
      .catch((err) => {
        console.log("error in performer");

        console.log(`this is an catch err`, err);
      });
  };

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
                    Update performer
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleApi}>
                      <div className="grid gap-6 mb-6 lg:grid-cols-3">
                        {/* <div>
                          <label
                            for="user_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            User name
                          </label>
                          <input
                            type="text"
                            id="user_name"
                            name = "UserName"
                            // value= {newPerformer.UserName}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required
                            // readOnly
                          />
                        </div> */}
                        <div>
                          <label
                            for="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            First_name
                          </label>
                          <input
                            type="text"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="FirstName"
                            value={newPerformer?.FirstName}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="last_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Last_name
                          </label>
                          <input
                            type="text"
                            id="last_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="LastName"
                            value={newPerformer?.LastName}
                            onChange={handleChange}
                            required
                          />
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
                            value={newPerformer?.Email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="countries_multiple"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >
                            Types of performers
                          </label>
                          <select
                            multiple // Enable multiple selection
                            id="countries_multiple"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            name="PerformerTypes_Id"
                            onChange={(e) => handleChange(e, "array")} // Pass "array" as a second argument
                            value={newPerformer?.PerformerTypes_Id}
                          >
                            <option value="1">Project leader</option>
                            <option value="2">Auditor</option>
                          </select>
                        </div>

                        <div className="editor-label">
                          <label id="IsFixed">Profile Image</label>
                          <input
                            className="form-control"
                            name=""
                            type="file"
                            style={{ width: "300px", height: "40px" }}
                            required
                          />
                        </div>

                        {/* <div className="mb-6">
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
                        </div> */}
                      </div>

                      <div className="grid gap-6 mb-6 lg:grid-cols-3">
                        <div>
                          <label
                            for="phone"
                            className="block mb-2 text-sm font-medium text-gray-900"
                            name="Phone"
                            onChange={handleChange}
                          >
                            Phone
                          </label>
                          <input
                            type="number"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="Phone"
                            value={newPerformer?.Phone}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="mobile"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Mobile
                          </label>
                          <input
                            type="number"
                            id="mobile"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            name="Mobile"
                            value={newPerformer?.Mobile}
                            onChange={handleChange}
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
                            onChange={handleChangeClient}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            <option value="">Select Clients </option>
                            {client.map((val, index) => (
                              <option
                                value={val.Id}
                                key={val.Id}
                                selected={getSelect(val.Id)}
                              >
                                {val.CompanyName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="block items-center">
                        <label
                          className=" text-sm font-medium text-gray-900 dark:text-gray-400"
                          for="IsApproved"
                        >
                          Active
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt"
                          name="IsApproved"
                          onChange={(e) => handleChange(e, "boolean")} // Pass "boolean" as a second argument
                          value={newPerformer?.IsApproved}
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white"
                        onClick={handleApi}
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

export default EditPerformers;

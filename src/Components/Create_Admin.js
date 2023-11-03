import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import config from "../Config";

function CreateAdmin() {
  let [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);


  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //create
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [skills, setSkills] = useState([]);
   

    const [admin, setAdmin] = useState({

      Description: "",
      Email: "",
      FirstName: "",
      IsAnonymous:"",
      IsApproved: "",
      IsLockedOut: "",
      LastName: "",
      LoweredEmail: "",
      LoweredRoleName: "",
      Password: "",
      PasswordSalt:"",
 
      RoleId: "",
      RoleName: "",
      UserName: "",
      Verified:"",

  });

    const handleChange = (e) => {
      e.preventDefault();
      setAdmin({ ...admin, [e.target.name]: e.target.value });
    };


    const handleImageChange = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      setImage(file);
      
    };
  

    const formData = {

      ApplicationId: "",
      Description: "",
      Email:  admin.Email,
      FirstName: admin.FirstName,
      IsApproved: admin.IsApproved == "Yes" ? 1 : 0,
      IsLockedOut: admin.IsLockedOut == "Yes" ? 1 : 0,
      IsAnonymous: (admin.IsAnonymous = "Yes" ? 1 : 0),
      LastName:admin.LastName,
      LoweredEmail: admin.Email.toLowerCase(),
      LoweredRoleName: "",
      Password: admin.Password,
      PasswordSalt:admin.Password,
      RoleName: "",
      UserName:admin.UserName,
      Verified:true,
        // UserName: admin.UserName,
        // LoweredUserName: admin.UserName.toLowerCase(),
        // MobileAlias: null,
        // IsAnonymous: false,
        // LastActivityDate: new Date().toISOString(),
        // Password: admin.Password,
        // PasswordFormat: 1,
        // PasswordSalt: admin.Password,
        // MobilePIN: null,
        // Email: admin.Email,
        // LoweredEmail: admin.Email.toLowerCase(),
        // PasswordQuestion: null,
        // PasswordAnswer: null,
        // IsApproved: true,
        // IsLockedOut: false,
        // CreateDate: new Date().toISOString(),
        // LastLoginDate: new Date().toISOString(),
        // LastPasswordChangedDate: new Date().toISOString(),
        // LastLockoutDate: new Date().toISOString(),
        // FailedPasswordAttemptCount: 0,
        // FailedPasswordAttemptWindowStart: new Date().toISOString(),
        // FailedPasswordAnswerAttemptCount: 0,
        // FailedPasswordAnswerAttemptWindowStart: new Date().toISOString(),
        // Comment: null,
        // FirstName: admin.FirstName,
        // LastName: admin.LastName,
        // ProfileImage: null,
        // EmailAddress: admin.Email,
        // Ordinal: 0,
        // Verified: true,
        // Date: new Date().toISOString(),
        // VerificationCode: "00000000-0000-0000-0000-000000000000",
        // HavingProblems: null
    };

    console.log("there is data",formData);

    const onSubmit = async (e) => {
      e.preventDefault();
      

       
    const formData = new FormData() ; 
    for(const key in admin){
      console.log(key ," > " , admin[key]) ;
      formData.append(key , admin[key])
    }
    if (image) {
      formData.append("image", image);
    }

    if (admin.PasswordSalt !== admin.Password){
      alert("password does not match");
    } else{
      await axios .post(`http://18.192.51.153:4002/api/v1/dashboard/SuperAdmin/Administrator`, formData,{
        headers:{
          "content-Type": "multipart/form-data",
        },
      })
        .then((response)=>{
          if(response){
            console.log("formData", formData);
            setSuccess(true);
          } else{
            alert(response);
            setFailure(true);
          }
        })
        .catch((err)=>{
  console.log(`this is an catch err` , err);
        });
      
    }

    

    

    
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add new Admin
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={onSubmit}>
                      <div className="grid gap-6 mb-6 lg:grid-cols-2">
                        <div>
                          <label
                            for="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="FirstName"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="last_name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            id="last_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="LastName"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="user"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            User name
                          </label>
                          <input
                            type="text"
                            id="user"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="UserName"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-6">
                          <label
                            for="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            E-mail address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
                            name="Email"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className=" grid gap-6 mb-6 lg:grid-cols-2">
                        <div className=" mb-6">
                          <label
                            for="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="Password"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-6">
                          <label
                            for="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirm_password"
                            name="PasswordSalt"
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required
                          />
                        </div>

                        <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900"
                          for="small_size"
                        >
                          {" "}
                          profile picture
                        </label>
                        <input
                          className="block mb-5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer "
                          id="small_size"
                          type="file"
                          name="ProfileImage"
                          onChange={handleImageChange}
                        />
                      </div>
                      </div>

                      <div className="block items-center">
                        <label
                          className=" text-sm font-medium text-gray-900 dark:text-gray-400"
                          for="IsAnonymous"
                        >
                          Active
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt"
                          name="IsAnonymous"
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
                        Create
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

export default CreateAdmin;

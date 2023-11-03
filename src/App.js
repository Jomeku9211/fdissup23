// import React from "react";

// import {BrowserRouter, Route, Switch } from "react-router-dom";
// import Home from "./Pages/Home";
// import Admistrators from "./Pages/Admistrators";
// import Customers from "./Pages/customers";
// import Performers from "./Pages/performers";
// import Industries from "./Pages/Industries";
// import Icca from "./Pages/ICCA";
// import IccaNumber from "./Pages/ICCA_Number";
// import PhaseController from "./Pages/Phase_Controller";
// import ResetPassword from "./Components/reset_password";
// import NotFound from "./NotFound";
// import Login from "./Pages/Login";

// function App() {
//   return (
//     <>
//     <BrowserRouter>
//       <Switch>
//         <Route exact path="/" component={Login} />
//         <Route exact path="/Home" component={Home} />
//         <Route exact path="/Admistrators" component={Admistrators} />
//         <Route exact path="/Customers" component={Customers} />
//         <Route exact path="/Industries" component={Industries} />
//         <Route exact path="/Performers" component={Performers} />
//         <Route exact path="/reports/icca" component={Icca} />
//         <Route
//           exact
//           path="/reports/phaseController"
//           component={PhaseController}
//         />
//         <Route exact={true} path="/reports/iccawithoutnumber" component={IccaNumber} />
//         <Route exact={true} path="/resetpassword" component={ResetPassword} />
//         <Route component={NotFound} />
//       </Switch>
//       </BrowserRouter>

  

//     </>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Admistrators from "./Pages/Admistrators";
import Customers from "./Pages/customers.js";
import Performers from "./Pages/performers";
import Industries from "./Pages/Industries";
import Icca from "./Pages/ICCA";
import IccaNumber from "./Pages/ICCA_Number";
import PhaseController from "./Pages/Phase_Controller";
import ResetPassword from "./Components/reset_password";
import NotFound from "./NotFound";
import Login from "./Pages/Login";

function App() {
  return (
    // <Router>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/admistrators" component={Admistrators} />
        <Route exact path="/customers" component={Customers} />
        <Route exact path="/industries" component={Industries} />
        <Route exact path="/performers" component={Performers} />
        <Route exact path="/reports/icca" component={Icca} />
        <Route exact path="/reports/phaseController" component={PhaseController} />
        <Route exact path="/reports/iccawithoutnumber" component={IccaNumber} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>
      </BrowserRouter>
    // </Router>

  );
}

export default App;


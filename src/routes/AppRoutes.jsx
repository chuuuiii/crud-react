
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Header from "../layout/Header";
import Home from "../pages/Home";
import Crud from "../pages/Crud";


const AppRoutes = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Header />} >
          <Route index element={<Home />}/>
          <Route path="/crud" element={<Crud />}/>
          
        </Route>

      )
    );
    return <RouterProvider router={router} />

}
 
export default AppRoutes;
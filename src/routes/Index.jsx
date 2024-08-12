//import react
import React, { lazy, Suspense } from 'react';

//import react router dom
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import('../auth/Login.jsx'));
const Loader = lazy(() => import('../auth/Loader.jsx'));


//Admin private routes
import PrivateRoutes from "./PrivateRoutes.jsx";
import DashboardAdmin from '../pages/Dashboard.jsx';
import AkunAdmin from '../pages/Account.jsx';
import TeacherDataAdmin from '../pages/PersonalData/TeacherData.jsx';
import StudentDataAdmin from '../pages/PersonalData/StudentData.jsx';


export default function RoutesIndex() {

    return (
        <Routes>


            {/* route "/" */}
            <Route
                path="/"
                element={
                    <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>
                }
            />


            {/* Page Admin*/}
            {/* private route "/dashboard" */}
            <Route
                path="/dashboard-admin"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <DashboardAdmin />
                        </PrivateRoutes>
                    </Suspense>

                }
            />
            {/* private route "/dashboard" */}
            <Route
                path="/akun-admin"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <AkunAdmin />
                        </PrivateRoutes>
                    </Suspense>

                }
            />
            {/* private route "/dashboard" */}
            <Route
                path="/dataguru-admin"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <TeacherDataAdmin />
                        </PrivateRoutes>
                    </Suspense>

                }
            />
            {/* private route "/dashboard" */}
            <Route
                path="/datasiswa-admin"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <StudentDataAdmin />
                        </PrivateRoutes>
                    </Suspense>

                }
            />

        </Routes>
    )
}
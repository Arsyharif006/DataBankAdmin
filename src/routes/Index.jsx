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
import CourseDataAdmin from '../pages/SchoolManagement/CourseData.jsx';
import DepartmentDataAdmin from '../pages/SchoolManagement/DepartmentData.jsx';
import ClassDataAdmin from '../pages/SchoolManagement/ClassData.jsx';
import AuditLogAdmin from '../pages/AuditLog.jsx';
import RoomDataAdmin from './../pages/SchoolManagement/RoomData.jsx';
import ExtracurricularDataAdmin from './../pages/SchoolManagement/ExtracurricularData.jsx';
import Combo from './../pages/ContohModal.jsx';



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
            {/* private route "/dashboard" */}
            <Route
                path="/matapelajaran-admin"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <CourseDataAdmin />
                        </PrivateRoutes>
                    </Suspense>

                }
            />
            {/* private route "/dashboard" */}
            <Route
                path="/jurusan-admin"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <DepartmentDataAdmin />
                        </PrivateRoutes>
                    </Suspense>

                }
            />
            {/* private route "/dashboard" */}
            <Route
                path="/kelas-admin"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <ClassDataAdmin />
                        </PrivateRoutes>
                    </Suspense>

                }
            />
            {/* private route "/dashboard" */}
            <Route
                path="/auditlog-admin"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <AuditLogAdmin />
                        </PrivateRoutes>
                    </Suspense>

                }
            />
            {/* private route "/dashboard" */}
            <Route
                path="/ruangan-admin"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <RoomDataAdmin />
                        </PrivateRoutes>
                    </Suspense>

                }
            />
            {/* private route "/dashboard" */}
            <Route
                path="/extrakulikuler-admin"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <ExtracurricularDataAdmin />
                        </PrivateRoutes>
                    </Suspense>

                }
            />
            {/* private route "/dashboard" */}
            <Route
                path="/combo-admin"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <Combo />
                        </PrivateRoutes>
                    </Suspense>

                }
            />

        </Routes>
    )
}
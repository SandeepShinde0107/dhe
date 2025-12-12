import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings/Settings";
import RtiApply from "./pages/rti/RtiApply";
import Grievance from "./pages/grievance/Grievance";
import Report from "./pages/reports/Report";
import ProtectedRoute from "./components/ProtectedRoute";
import type { Role } from "./types/roles";
import { InstituteRegister } from "./pages/instituteRegistration/InstituteRegister";
import InstituteProfile from "./pages/instituteRegistration/profile/InstituteProfile";
import VerifyPage from "./pages/verification/VerifyPage";
import StaffingPage from "./pages/staffing/StaffingPage";
import AcademicPage from "./pages/academics/AcademicPage";
import WorkloadManagementPage from "./pages/workload/WorkloadManagement";
import StudentRegistration from "./pages/student-registration/StudentRegistration";
import LegalIssuesPage from "./pages/legalIssues/LegalIssuesPage";
import AssetManagementPage from "./pages/assets/AssetManagement";
import NocReviewPage from "./pages/noc/NocReviewPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "INSTITUTE", "JD", "DIRECTOR", "SECRETARY"] as Role[]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/institute/register"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "INSTITUTE", "DIRECTOR", "SECRETARY"] as Role[]}>
              <InstituteRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/institute/profile"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "INSTITUTE", "DIRECTOR", "SECRETARY"] as Role[]}>
              <InstituteProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verification/application"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "JD", "DIRECTOR", "SECRETARY"] as Role[]}>
              <VerifyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staffing"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "INSTITUTE", "JD", "DIRECTOR", "SECRETARY"] as Role[]}>
              <StaffingPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/academics"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "INSTITUTE", "DIRECTOR", "SECRETARY"] as Role[]}>
              <AcademicPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workload"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "INSTITUTE", "JD", "DIRECTOR", "SECRETARY"] as Role[]}>
              <WorkloadManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/noc"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "INSTITUTE", "JD", "DIRECTOR", "SECRETARY"] as Role[]}>
              <NocReviewPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/assets"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "INSTITUTE", "DIRECTOR", "SECRETARY"] as Role[]}>
              <AssetManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/legal"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "INSTITUTE", "DIRECTOR", "SECRETARY"] as Role[]}>
              <LegalIssuesPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "INSTITUTE", "DIRECTOR", "SECRETARY"] as Role[]}>
              <StudentRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rti/apply"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "INSTITUTE"] as Role[]}>
              <RtiApply />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/:tab"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"] as Role[]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/grievance/:tab"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "JD", "DIRECTOR"] as Role[]}>
              <Grievance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "SECRETARY"] as Role[]}>
              <Report />
            </ProtectedRoute>
          }
        />

        <Route
          path="/unauthorized"
          element={<div>Unauthorized: you don&apos;t have access to this page.</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

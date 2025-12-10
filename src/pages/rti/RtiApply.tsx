import { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import MainLayout from "../../components/MainLayout";
import SupportingDocuments from "./SupportingDocuments";
import RequestDetailsCard from "./RequestDetails";
import PersonalDetails from "./PersonalDetails";
import AboutRTI from "./AboutRTI";
import ErrorToast from "../../components/ErrorToast";
import useToast from "../../hooks/useToast";
import PaymentSection from "../rti/PaymentSection";

export default function RtiApply() {
    const { toast, showToast, closeToast } = useToast();
    const personalRef = useRef<any>(null);
    const requestRef = useRef<any>(null);
    const [showPayment, setShowPayment] = useState(false);

    const handleProceed = () => {
        if (personalRef.current && !personalRef.current.validate()) return;
        if (requestRef.current && !requestRef.current.validate()) return;
        setShowPayment(true);
    };

    return (
        <MainLayout>
            <Box sx={{ maxWidth: "95%", mx: "auto", p: 2, m: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    RTI Application
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Submit your Right to Information request online
                </Typography>
                {showPayment ? (
                    <PaymentSection onBack={() => setShowPayment(false)} />
                ) : (
                    <>
                        <PersonalDetails ref={personalRef} onError={showToast} />
                        <RequestDetailsCard ref={requestRef} onError={showToast} />

                        <SupportingDocuments
                            onError={showToast}
                            onSaveDraft={() => showToast("Draft saved successfully", "success")}
                            onProceed={handleProceed}
                        />
                        <AboutRTI />
                    </>
                )}

            </Box>

            <ErrorToast
                open={toast.open}
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />
        </MainLayout>
    );
}

import { useState } from "react";
import ComplainantDetails from "./ComplaintDetails";
import GrievanceDetails from "./GrievanceDetails";
import SupportingDocuments from "../../rti/SupportingDocuments";
import ImportantInfo from "./ImportantInfo";
import { useRef } from "react";
import useToast from "../../../hooks/useToast";
import SuccessScreen from "./SuccessScreen";
import ErrorToast from "../../../components/ErrorToast";

export default function LodgeGrievance() {
    const { toast, showToast, closeToast } = useToast();
    const complainantRef = useRef<any>(null);
    const grievanceRef = useRef<any>(null);
    const [submittedData, setSubmittedData] = useState<any>(null);

    const handleSubmit = (files: any) => {
        if (complainantRef.current && !complainantRef.current.validate()) return;
        if (grievanceRef.current && !grievanceRef.current.validate()) return;

        const data = {
            complainant: complainantRef.current.getValues(),
            grievance: grievanceRef.current.getValues(),
            files,
        };

        setSubmittedData(data);
        showToast("Grievance submitted successfully!", "success");
    };

    if (submittedData) {
        return <SuccessScreen data={submittedData} onReset={() => setSubmittedData(null)} />;
    }

    return (
        <>
            <ComplainantDetails ref={complainantRef} onError={showToast} />
            <GrievanceDetails ref={grievanceRef} onError={showToast} />
            <SupportingDocuments
                mode="grievance"
                onSaveDraft={() => showToast("Draft saved successfully", "success")}
                onSubmit={handleSubmit}
            />
            <ImportantInfo />
            <ErrorToast
                open={toast.open}
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />
        </>
    );
}

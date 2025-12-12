export type ContactInfo = {
  name: string;
  email: string;
  mobile: string;
  alternatePhone?: string;
};

export type Course = {
  name: string;
  type: string;
  subjects: string;
  intake: string;  
  durationValue: string;
  durationUnit: string;
};

export type InstituteForm = {
  instituteName: string;
  instituteType: string;
  apexBody: string;
  apexBodyFile: File | null;

  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;

  principal: ContactInfo;
  registrar: ContactInfo;

  yearOfEstablishment?: string;
  recognitionStatus?: string;
  recognitionDocs?: File | null;
  ugcStatus?: string;
  ncteStatus?: string;
  naacGrade?: string;
  affiliatedUniversity?: string;

  courses: Course[];
};

export const defaultValues: InstituteForm = {
  instituteName: "",
  instituteType: "",
  apexBody: "",
  apexBodyFile: null,
  addressLine1: "",
  addressLine2: "",
  city: "",
  district: "",
  state: "Maharashtra",
  pincode: "",
  principal: { name: "", email: "", mobile: "", alternatePhone: "" },
  registrar: { name: "", email: "", mobile: "", alternatePhone: "" },
  yearOfEstablishment: "",
  recognitionStatus: "",
  recognitionDocs: null,
  ugcStatus: "",
  ncteStatus: "",
  naacGrade: "",
  affiliatedUniversity: "",
  courses: [
    {
      name: "",
      type: "Undergraduate",
      subjects: "",
      intake: "0",
      durationValue: "3",
      durationUnit: "Years",
    },
  ],
};
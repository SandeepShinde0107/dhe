import React, { useRef, useState } from "react";
import MainLayout from "../../components/MainLayout";
import {
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  FormControl,
  Select,
  FormHelperText,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  useForm,
  Controller,
  useFieldArray,
  type FieldErrors,
  type SubmitHandler,
  type UseFormRegister,
} from "react-hook-form";

/* ------------ TYPES ------------ */

type ContactInfo = {
  name: string;
  email: string;
  mobile: string;
  alternatePhone?: string;
};

type Course = {
  name: string;
  type: string;
  subjects: string;
  intake: string; // keep as string in form, convert to number when summing
  durationValue: string;
  durationUnit: string;
};

export type InstituteForm = {
  // Part A
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

  // Part B
  yearOfEstablishment?: string;
  recognitionStatus?: string;
  recognitionDocs?: File | null;
  ugcStatus?: string;
  ncteStatus?: string;
  naacGrade?: string;
  affiliatedUniversity?: string;

  // Part C
  courses: Course[];
};

const defaultValues: InstituteForm = {
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

const steps = [
  "Part A: Basic Information",
  "Part B: Recognition & Status",
  "Part C: Courses & Intake",
];

/* ------------ SHARED STYLES ------------ */

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: "#ffffff",
    "& fieldset": {
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#d1d5db",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#157c82",
      boxShadow: "0 0 0 1px rgba(21,124,130,0.18)",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#9ca3af",
    opacity: 1,
  },
};

const FieldLabel: React.FC<{ label: string; required?: boolean }> = ({
  label,
  required,
}) => (
  <Typography variant="body2" fontWeight={500} mb={0.5}>
    {label}
    {required && (
      <Box component="span" sx={{ color: "error.main", ml: 0.3 }}>
        *
      </Box>
    )}
  </Typography>
);

/* ------------ MAIN COMPONENT ------------ */

export const InstituteRegister: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const recognitionFileRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<InstituteForm>({
    defaultValues,
    mode: "onBlur",
  });

  const { fields: courseFields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const apexFile = watch("apexBodyFile");
  const recognitionFile = watch("recognitionDocs");
  const coursesWatch = watch("courses") || [];

  const totalIntake = coursesWatch.reduce((sum, c) => {
    const n = Number(c.intake);
    return sum + (Number.isNaN(n) ? 0 : n);
  }, 0);

  const progress = Math.round(((activeStep + 1) / steps.length) * 100);

  /* ------------ VALIDATION PER STEP ------------ */

  const fieldsForStep = (step: number): string[] => {
    if (step === 0) {
      return [
        "instituteName",
        "instituteType",
        "apexBody",
        "addressLine1",
        "city",
        "district",
        "state",
        "pincode",
        "principal.name",
        "principal.email",
        "principal.mobile",
        "registrar.name",
        "registrar.email",
        "registrar.mobile",
      ];
    }
    if (step === 1) {
      return [
        "yearOfEstablishment",
        "recognitionStatus",
        "recognitionDocs",
        "ugcStatus",
        "ncteStatus",
        "naacGrade",
        "affiliatedUniversity",
      ];
    }
    if (step === 2) {
      const names: string[] = [];
      coursesWatch.forEach((_, idx) => {
        names.push(
          `courses.${idx}.name`,
          `courses.${idx}.type`,
          `courses.${idx}.subjects`,
          `courses.${idx}.intake`,
          `courses.${idx}.durationValue`,
          `courses.${idx}.durationUnit`
        );
      });
      return names;
    }
    return [];
  };

  const handleNext = async () => {
    const toTrigger = fieldsForStep(activeStep);
    const ok = await trigger(toTrigger as any);
    if (!ok) {
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }
    if (activeStep < steps.length - 1) {
      setActiveStep((s) => s + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1);
  };

  const onSubmitAll: SubmitHandler<InstituteForm> = (data) => {
    console.log("Final form payload:", data);
    alert("Proceeding to OTP verification (mock) – payload in console.");
  };

  /* ------------ FILE HANDLERS ------------ */

  const triggerApexBrowse = () => fileInputRef.current?.click();
  const triggerRecognitionBrowse = () => recognitionFileRef.current?.click();

  const handleApexFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setValue("apexBodyFile", e.target.files?.[0] ?? null, {
      shouldValidate: true,
    });

  const handleRecognitionFileChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) =>
      setValue("recognitionDocs", e.target.files?.[0] ?? null, {
        shouldValidate: true,
      });

  /* ------------ STEP CONTENTS ------------ */

  const PartA = () => (
    <>
      {/* Basic Information */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          bgcolor: "#fff",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
            Basic Information
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter the basic details of your institution
          </Typography>

          <Grid container spacing={2.5}>
            <Grid size={{xs:12}}>
              <FieldLabel label="Institute Name" required />
              <TextField
                fullWidth
                placeholder="Enter institute name"
                sx={textFieldSx}
                {...register("instituteName", {
                  required: "Institute name is required",
                })}
                error={!!errors.instituteName}
                helperText={errors.instituteName?.message}
              />
            </Grid>

            <Grid size={{xs:12}}>
              <FieldLabel label="Institute Type" required />
              <Controller
                name="instituteType"
                control={control}
                rules={{ required: "Institute type is required" }}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    sx={textFieldSx}
                    error={!!errors.instituteType}
                  >
                    <Select {...field} displayEmpty>
                      <MenuItem value="">
                        <em>Select institute type</em>
                      </MenuItem>
                      <MenuItem value="Government">Government</MenuItem>
                      <MenuItem value="Private">Private</MenuItem>
                      <MenuItem value="Aided">Aided</MenuItem>
                    </Select>
                    {errors.instituteType && (
                      <FormHelperText>
                        {errors.instituteType?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{xs:12}}>
              <FieldLabel label="Apex Body" required />
              <TextField
                fullWidth
                placeholder="e.g., University Grants Commission"
                sx={textFieldSx}
                {...register("apexBody", {
                  required: "Apex body is required",
                })}
                error={!!errors.apexBody}
                helperText={errors.apexBody?.message}
              />
            </Grid>

            <Grid size={{xs:12}}>
              <FieldLabel label="Apex Body Permission Document" required />
              <Box
                onClick={triggerApexBrowse}
                sx={{
                  border: "1px dashed",
                  borderColor: errors.apexBodyFile ? "error.main" : "#d1d5db",
                  borderRadius: 2,
                  height: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#fbfcff",
                  cursor: "pointer",
                }}
              >
                <Stack spacing={1.2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "1px solid #d1d5db",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#fff",
                    }}
                  >
                    <UploadFileIcon fontSize="small" />
                  </Box>
                  <Typography variant="body2">
                    Drag &amp; drop files here
                  </Typography>
                  <Typography variant="body2">
                    <Box
                      component="span"
                      sx={{ color: "primary.main", cursor: "pointer" }}
                    >
                      or browse files
                    </Box>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Accepted: pdf, jpg, jpeg, png
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Max size: 5 MB
                  </Typography>
                  {apexFile && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      textAlign="center"
                    >
                      Selected: {apexFile.name}
                    </Typography>
                  )}
                </Stack>
              </Box>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleApexFileChange}
              />
              {errors.apexBodyFile && (
                <FormHelperText error>
                  {errors.apexBodyFile.message as string}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Address */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          bgcolor: "#fff",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
            Address Information
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter the complete address of your institution
          </Typography>

          <Grid container spacing={2.5}>
            <Grid size={{xs:12}}>
              <FieldLabel label="Address Line 1" required />
              <TextField
                fullWidth
                placeholder="Building name, street"
                sx={textFieldSx}
                {...register("addressLine1", {
                  required: "Address Line 1 is required",
                })}
                error={!!errors.addressLine1}
                helperText={errors.addressLine1?.message}
              />
            </Grid>

            <Grid size={{xs:12}}>
              <FieldLabel label="Address Line 2" />
              <TextField
                fullWidth
                placeholder="Area, locality (optional)"
                sx={textFieldSx}
                {...register("addressLine2")}
              />
            </Grid>

             <Grid size={{xs:12, md:3}}>
              <FieldLabel label="City" required />
              <TextField
                fullWidth
                placeholder="Enter city"
                sx={textFieldSx}
                {...register("city", { required: "City is required" })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>

             <Grid size={{xs:12, md:3}}>
              <FieldLabel label="District" required />
              <TextField
                fullWidth
                placeholder="Enter district"
                sx={textFieldSx}
                {...register("district", {
                  required: "District is required",
                })}
                error={!!errors.district}
                helperText={errors.district?.message}
              />
            </Grid>

             <Grid size={{xs:12, md:3}}>
              <FieldLabel label="State" required />
              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    sx={textFieldSx}
                    error={!!errors.state}
                  >
                    <Select {...field}>
                      <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                      <MenuItem value="Delhi">Delhi</MenuItem>
                      <MenuItem value="Karnataka">Karnataka</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              {errors.state && (
                <FormHelperText error>
                  {errors.state.message}
                </FormHelperText>
              )}
            </Grid>

             <Grid size={{xs:12, md:3}}>
              <FieldLabel label="Pincode" required />
              <TextField
                fullWidth
                placeholder="6-digit pincode"
                sx={textFieldSx}
                {...register("pincode", {
                  required: "Pincode is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Enter a valid 6-digit pincode",
                  },
                })}
                error={!!errors.pincode}
                helperText={errors.pincode?.message}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Contacts */}
      <ContactCard
        title="Principal Contact Information"
        subtitle="Enter the contact details of the principal"
        prefix="principal"
        register={register}
        errors={errors}
      />
      <ContactCard
        title="Registrar Contact Information"
        subtitle="Enter the contact details of the registrar"
        prefix="registrar"
        register={register}
        errors={errors}
      />
    </>
  );

  const PartB = () => (
    <>
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          bgcolor: "#fff",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
            Recognition Information
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter the recognition and establishment details
          </Typography>

          <Grid container spacing={2.5}>
            <Grid size={{xs:12}}>
              <FieldLabel label="Year of Establishment" required />
              <TextField
                fullWidth
                placeholder="e.g., 2025"
                sx={textFieldSx}
                {...register("yearOfEstablishment", {
                  required: "Year is required",
                })}
                error={!!errors.yearOfEstablishment}
                helperText={errors.yearOfEstablishment?.message}
              />
            </Grid>

            <Grid size={{xs:12}}>
              <FieldLabel label="Recognition Status" required />
              <Controller
                name="recognitionStatus"
                control={control}
                rules={{ required: "Recognition status is required" }}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    sx={textFieldSx}
                    error={!!errors.recognitionStatus}
                  >
                    <Select {...field} displayEmpty>
                      <MenuItem value="">
                        <em>Select recognition status</em>
                      </MenuItem>
                      <MenuItem value="Recognized">Recognized</MenuItem>
                      <MenuItem value="Not Recognized">
                        Not Recognized
                      </MenuItem>
                    </Select>
                    {errors.recognitionStatus && (
                      <FormHelperText>
                        {errors.recognitionStatus.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{xs:12}}>
              <FieldLabel label="Recognition Documents" required />
              <Box
                onClick={triggerRecognitionBrowse}
                sx={{
                  border: "1px dashed",
                  borderColor: errors.recognitionDocs
                    ? "error.main"
                    : "#d1d5db",
                  borderRadius: 2,
                  height: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#fbfcff",
                  cursor: "pointer",
                }}
              >
                <Stack spacing={1.2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "1px solid #d1d5db",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#fff",
                    }}
                  >
                    <UploadFileIcon fontSize="small" />
                  </Box>
                  <Typography variant="body2">
                    Drag &amp; drop files here
                  </Typography>
                  <Typography variant="body2">
                    <Box
                      component="span"
                      sx={{ color: "primary.main", cursor: "pointer" }}
                    >
                      or browse files
                    </Box>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Accepted: pdf, jpg, jpeg, png
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Max size: 5 MB
                  </Typography>
                  {recognitionFile && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      textAlign="center"
                    >
                      Selected: {recognitionFile.name}
                    </Typography>
                  )}
                </Stack>
              </Box>
              <input
                ref={recognitionFileRef}
                type="file"
                style={{ display: "none" }}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleRecognitionFileChange}
              />
              {errors.recognitionDocs && (
                <FormHelperText error>
                  {errors.recognitionDocs?.message as string}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* UGC / NCTE / NAAC / Affiliation */}
      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          bgcolor: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
            UGC Status
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            University Grants Commission recognition details
          </Typography>
          <FieldLabel label="UGC Status" />
          <Controller
            name="ugcStatus"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={textFieldSx}>
                <Select {...field} displayEmpty>
                  <MenuItem value="">
                    <em>Select UGC status</em>
                  </MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </CardContent>
      </Card>

      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          bgcolor: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
            NCTE Status
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            National Council for Teacher Education recognition details
          </Typography>
          <FieldLabel label="NCTE Status" />
          <Controller
            name="ncteStatus"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={textFieldSx}>
                <Select {...field} displayEmpty>
                  <MenuItem value="">
                    <em>Select NCTE status</em>
                  </MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </CardContent>
      </Card>

      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          bgcolor: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
            NAAC Accreditation
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            National Assessment and Accreditation Council grade
          </Typography>
          <FieldLabel label="NAAC Grade" />
          <Controller
            name="naacGrade"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={textFieldSx}>
                <Select {...field} displayEmpty>
                  <MenuItem value="">
                    <em>Select NAAC grade</em>
                  </MenuItem>
                  <MenuItem value="A++">A++</MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </CardContent>
      </Card>

      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          bgcolor: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
            University Affiliation
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Details of affiliated university (if applicable)
          </Typography>
          <FieldLabel label="Affiliated University" />
          <TextField
            fullWidth
            placeholder="Enter university name (if applicable)"
            sx={textFieldSx}
            {...register("affiliatedUniversity")}
          />
        </CardContent>
      </Card>
    </>
  );

  const PartC = () => (
    <>
      {/* Courses Offered header + Add button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2.5,
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            Courses Offered
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add all courses offered by your institution
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            bgcolor: "#0f6b73",
            "&:hover": { bgcolor: "#0b5258" },
          }}
          onClick={() =>
            append({
              name: "",
              type: "Undergraduate",
              subjects: "",
              intake: "0",
              durationValue: "3",
              durationUnit: "Years",
            })
          }
        >
          Add Course
        </Button>
      </Box>

      {/* Course Cards */}
      {courseFields.map((course, index) => (
        <Card
          key={course.id}
          sx={{
            mb: 3,
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            bgcolor: "#fff",
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                {`Course ${index + 1}`}
              </Typography>
              {courseFields.length > 1 && (
                <IconButton
                  size="small"
                  onClick={() => remove(index)}
                  sx={{ color: "error.main" }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              )}
            </Box>

            <Grid container spacing={2.5}>
              <Grid size={{xs:12}}>
                <FieldLabel label="Course Name" required />
                <TextField
                  fullWidth
                  placeholder="e.g., Bachelor of Arts"
                  sx={textFieldSx}
                  {...register(`courses.${index}.name` as const, {
                    required: "Course name is required",
                  })}
                  error={!!errors.courses?.[index]?.name}
                  helperText={errors.courses?.[index]?.name?.message}
                />
              </Grid>

              <Grid size={{xs:12}}>
                <FieldLabel label="Course Type" required />
                <Controller
                  name={`courses.${index}.type` as const}
                  control={control}
                  rules={{ required: "Course type is required" }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      sx={textFieldSx}
                      error={!!errors.courses?.[index]?.type}
                    >
                      <Select {...field} displayEmpty>
                        <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                        <MenuItem value="Postgraduate">Postgraduate</MenuItem>
                        <MenuItem value="Diploma">Diploma</MenuItem>
                        <MenuItem value="Certificate">Certificate</MenuItem>
                      </Select>
                      {errors.courses?.[index]?.type && (
                        <FormHelperText>
                          {errors.courses?.[index]?.type?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Subjects + Add button (UI only) */}
               <Grid size={{xs:12, md:10}}>
                <FieldLabel label="Subjects" required />
                <TextField
                  fullWidth
                  placeholder="Enter subject name"
                  sx={textFieldSx}
                  {...register(`courses.${index}.subjects` as const, {
                    required: "Subject is required",
                  })}
                  error={!!errors.courses?.[index]?.subjects}
                  helperText={errors.courses?.[index]?.subjects?.message}
                />
              </Grid>
              <Grid size={{xs:12, md:2}}
                sx={{ display: "flex", alignItems: "flex-end", mt: { xs: 1, md: 0 } }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    bgcolor: "#0f6b73",
                    "&:hover": { bgcolor: "#0b5258" },
                    minHeight: 40,
                  }}
                  startIcon={<AddIcon />}
                  // onClick: in real app you might push to tags list
                  onClick={() => {}}
                >
                  Add
                </Button>
              </Grid>

              {/* Intake & Duration */}
              <Grid size={{xs:12, md:6}}>
                <FieldLabel label="Student Intake" required />
                <TextField
                  fullWidth
                  placeholder="0"
                  sx={textFieldSx}
                  type="number"
                  {...register(`courses.${index}.intake` as const, {
                    required: "Intake is required",
                    min: { value: 0, message: "Must be 0 or more" },
                  })}
                  error={!!errors.courses?.[index]?.intake}
                  helperText={errors.courses?.[index]?.intake?.message}
                />
              </Grid>

               <Grid size={{xs:12, md:3}}>
                <FieldLabel label="Course Duration" required />
                <TextField
                  fullWidth
                  type="number"
                  placeholder="3"
                  sx={textFieldSx}
                  {...register(`courses.${index}.durationValue` as const, {
                    required: "Duration is required",
                    min: { value: 1, message: "Must be at least 1" },
                  })}
                  error={!!errors.courses?.[index]?.durationValue}
                  helperText={errors.courses?.[index]?.durationValue?.message}
                />
              </Grid>

              <Grid size={{xs:12, md:3}}>
                <FieldLabel label=" " /> {/* empty to align with duration label */}
                <Controller
                  name={`courses.${index}.durationUnit` as const}
                  control={control}
                  rules={{ required: "Unit is required" }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      sx={textFieldSx}
                      error={!!errors.courses?.[index]?.durationUnit}
                    >
                      <Select {...field}>
                        <MenuItem value="Years">Years</MenuItem>
                        <MenuItem value="Months">Months</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {/* Total Intake Summary */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          bgcolor: "#fff",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
            Total Intake Summary
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Automatically calculated from all courses
          </Typography>

          <Box
            sx={{
              bgcolor: "#f3f4f6",
              borderRadius: 2,
              px: 3,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              Total Student Intake
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: "#0f6b73" }}
            >
              {totalIntake}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );

  /* ------------ RENDER ------------ */

  return (
    <MainLayout>
      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fb", py: 4 }}>
        <Box sx={{ maxWidth: 1120, mx: "auto", px: { xs: 2, md: 0 } }}>
          <Typography variant="h4" fontWeight={700} mb={1}>
            Institute Registration
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Complete all three parts to register your institution with the
            Department of Higher Education
          </Typography>

          {/* Step + progress */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Step {activeStep + 1} of {steps.length}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    bgcolor: "#e9d27b",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#157c82",
                      borderRadius: 999,
                    },
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ minWidth: 90, textAlign: "right" }}
              >
                {progress}% Complete
              </Typography>
            </Box>
          </Box>

          {/* Step pills */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
              mt: 1,
            }}
          >
            <StepPill index={1} label={steps[0]} active={activeStep === 0} />
            <ArrowForwardIosIcon sx={{ fontSize: 14, color: "grey.500" }} />
            <StepPill index={2} label={steps[1]} active={activeStep === 1} />
            <ArrowForwardIosIcon sx={{ fontSize: 14, color: "grey.500" }} />
            <StepPill index={3} label={steps[2]} active={activeStep === 2} />
          </Box>

          {/* Outer card */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "none",
              border: "1px solid #e5e7eb",
              bgcolor: "#f9fafb",
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Typography variant="h6" fontWeight={700} mb={0.5}>
                {activeStep === 0
                  ? "Part A: Basic Information"
                  : activeStep === 1
                  ? "Part B: Recognition & Status"
                  : "Part C: Courses & Intake"}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                {activeStep === 0 &&
                  "Enter institute details and contact information"}
                {activeStep === 1 &&
                  "Provide recognition and accreditation details"}
                {activeStep === 2 &&
                  "Add courses and student intake information"}
              </Typography>

              <form onSubmit={handleSubmit(onSubmitAll)}>
                {activeStep === 0 && <PartA />}
                {activeStep === 1 && <PartB />}
                {activeStep === 2 && <PartC />}

                {/* Bottom buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={handlePrevious}
                      disabled={activeStep === 0}
                    >
                      Previous Step
                    </Button>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        console.log("Draft snapshot:", getValues())
                      }
                    >
                      Save Draft
                    </Button>

                    {activeStep < steps.length - 1 ? (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          bgcolor: "#0f6b73",
                          "&:hover": { bgcolor: "#0b5258" },
                        }}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          bgcolor: "#0f6b73",
                          "&:hover": { bgcolor: "#0b5258" },
                        }}
                      >
                        Proceed to OTP Verification
                      </Button>
                    )}
                  </Box>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
};

/* ------------ STEP PILL ------------ */

const StepPill: React.FC<{
  index: number;
  label: string;
  active?: boolean;
}> = ({ index, label, active }) => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      px: 2.5,
      py: 1,
      borderRadius: 999,
      bgcolor: active ? "#78aeb1" : "transparent",
      color: active ? "#ffffff" : "text.secondary",
      border: active ? "none" : "1px solid #f3f4f6",
    }}
  >
    <Box
      sx={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        bgcolor: "#ffffff",
        color: active ? "#78aeb1" : "text.secondary",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 600,
        mr: 1.5,
      }}
    >
      {index}
    </Box>
    <Typography
      variant="body2"
      sx={{ whiteSpace: "nowrap", fontWeight: active ? 600 : 400 }}
    >
      {label}
    </Typography>
  </Box>
);

/* ------------ CONTACT CARD ------------ */

type ContactCardProps = {
  title: string;
  subtitle: string;
  prefix: "principal" | "registrar";
  register: UseFormRegister<InstituteForm>;
  errors: FieldErrors<InstituteForm>;
};

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  subtitle,
  prefix,
  register,
  errors,
}) => {
  const nameError = (errors as any)[prefix]?.name;
  const emailError = (errors as any)[prefix]?.email;
  const mobileError = (errors as any)[prefix]?.mobile;
  const altError = (errors as any)[prefix]?.alternatePhone;

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: "none",
        border: "1px solid #e5e7eb",
        bgcolor: "#ffffff",
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          {subtitle}
        </Typography>

        <Grid container spacing={2.5}>
          <Grid size={{xs:12, md:6}}>
            <FieldLabel
              label={
                prefix === "principal" ? "Principal Name" : "Registrar Name"
              }
              required
            />
            <TextField
              fullWidth
              sx={textFieldSx}
              placeholder={
                prefix === "principal"
                  ? "Enter principal's full name"
                  : "Enter registrar's full name"
              }
              {...register(`${prefix}.name` as const, {
                required: "Name is required",
              })}
              error={!!nameError}
              helperText={nameError?.message}
            />
          </Grid>

           <Grid size={{xs:12, md:3}}>
            <FieldLabel label="Mobile Number" required />
            <TextField
              fullWidth
              sx={textFieldSx}
              placeholder="10-digit mobile number"
              {...register(`${prefix}.mobile` as const, {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              error={!!mobileError}
              helperText={mobileError?.message}
            />
          </Grid>

           <Grid size={{xs:12, md:3}}>
            <FieldLabel label="Email" required />
            <TextField
              fullWidth
              sx={textFieldSx}
              type="email"
              placeholder={
                prefix === "principal"
                  ? "principal@example.com"
                  : "registrar@example.com"
              }
              {...register(`${prefix}.email` as const, {
                required: "Email is required",
              })}
              error={!!emailError}
              helperText={emailError?.message}
            />
          </Grid>

          <Grid size={{xs:12, md:4}}>
            <FieldLabel label="Alternate Phone" />
            <TextField
              fullWidth
              sx={textFieldSx}
              placeholder="10-digit phone number (optional)"
              {...register(`${prefix}.alternatePhone` as const, {
                pattern: {
                  value: /^$|^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              error={!!altError}
              helperText={altError?.message}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

import { forwardRef, useImperativeHandle } from "react";
import { Paper, Typography, MenuItem, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  identityProof: string;
  identityNumber: string;
};

interface PersonalDetailsProps {
  onError?: (msg: string) => void;
}

const PersonalDetails = forwardRef(({ onError }: PersonalDetailsProps, ref) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      identityProof: "Aadhar Card",
      identityNumber: "",
    },
  });

  useImperativeHandle(ref, () => ({
    validate: async () => {
      const valid = await trigger();
      if (!valid && onError) {
        const firstError =
          (errors.fullName?.message as string) ||
          (errors.email?.message as string) ||
          (errors.mobile?.message as string) ||
          (errors.address?.message as string) ||
          (errors.city?.message as string) ||
          (errors.state?.message as string) ||
          (errors.pincode?.message as string) ||
          "Please fill all required fields correctly";
        onError(firstError);
      }
      return valid;
    },
    getValues,
  }));

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Personal Details
      </Typography>

      <Typography sx={{ color: "text.secondary", mb: 3 }}>
        Provide your personal information for RTI application
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography sx={{ mb: 1 }}>Full Name *</Typography>
          <TextField
            fullWidth
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Please enter your name",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Name should contain alphabets and spaces only",
              },
            })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message as string}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "40px",
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography sx={{ mb: 1 }}>Email Address *</Typography>
          <TextField
            fullWidth
            placeholder="your.email@example.com"
            type="email"
            {...register("email", {
              required: "Please enter your email address",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message as string}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "40px",
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography sx={{ mb: 1 }}>Mobile Number *</Typography>
          <TextField
            fullWidth
            placeholder="10-digit mobile number"
            {...register("mobile", {
              required: "Please enter your mobile number",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Mobile number should be a valid 10-digit number",
              },
            })}
            inputProps={{ maxLength: 10 }}
            error={!!errors.mobile}
            helperText={errors.mobile?.message as string}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "40px",
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography sx={{ mb: 1 }}>Identity Proof</Typography>
          <TextField
            select
            fullWidth
            {...register("identityProof")}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "40px",
              },
            }}
          >
            <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
            <MenuItem value="PAN Card">PAN Card</MenuItem>
            <MenuItem value="Passport">Passport</MenuItem>
            <MenuItem value="Voter ID">Voter ID</MenuItem>
            <MenuItem value="Driving License">Driving License</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography sx={{ mb: 1 }}>Identity Number</Typography>
          <TextField
            fullWidth
            placeholder="Enter identity proof number"
            {...register("identityNumber")}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "40px",
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography sx={{ mb: 1 }}>Address *</Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Enter your complete address"
            {...register("address", {
              required: "Please enter your address",
            })}
            error={!!errors.address}
            helperText={errors.address?.message as string}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography sx={{ mb: 1 }}>City *</Typography>
          <TextField
            fullWidth
            placeholder="Enter city"
            {...register("city", {
              required: "Please enter your city",
            })}
            error={!!errors.city}
            helperText={errors.city?.message as string}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "40px",
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography sx={{ mb: 1 }}>State *</Typography>
          <TextField
            fullWidth
            placeholder="Enter State"
            {...register("state", {
              required: "Please enter your state",
            })}
            error={!!errors.state}
            helperText={errors.state?.message as string}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "40px",
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography sx={{ mb: 1 }}>Pincode *</Typography>
          <TextField
            fullWidth
            placeholder="6-digit pincode"
            {...register("pincode", {
              required: "Please enter your pincode",
              pattern: {
                value: /^\d{6}$/,
                message: "Pincode must be a 6-digit number",
              },
            })}
            inputProps={{ maxLength: 6 }}
            error={!!errors.pincode}
            helperText={errors.pincode?.message as string}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "40px",
              },
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
});

export default PersonalDetails;

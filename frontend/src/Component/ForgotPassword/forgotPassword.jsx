import React from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/features/userSlice";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email("Please enter valid email").required("Enter Email"),
});

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(forgotPassword(data)).then((res) =>
      res?.payload?.status === 200
        ? toast.success(
            "A verification email has been sent to your email address.",
            {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          )
        : " "
    );
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);
  return (
    <Container component="main" maxWidth="">
      <div className="form-gap">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper elevation={3}>
              <div
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  marginBottom: "200px",
                }}
              >
                <LockIcon color="primary" fontSize="large" />
                <Typography variant="h4" gutterBottom>
                  Forgot Password?
                </Typography>
                <Typography variant="body1">
                  You can reset your password here.
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <TextField
                    {...register("email")}
                    placeholder="email"
                    sx={{ width: "100%" }}
                    helperText={errors.email?.message}
                    error={!!errors.email}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    style={{
                      margin: "1rem 0",
                      backgroundColor: "#1778F2",
                      color: "#fff",
                    }}
                  >
                    Reset Password
                  </Button>
                </form>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ForgotPasswordForm;

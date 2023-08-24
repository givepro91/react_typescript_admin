import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PaymentApi from "../../modules/payment";
import { RegisterCouponModel } from "../../model/CouponModel";

type Props = {};

export default function RegisterCouponPage({}: Props) {
  const api = new PaymentApi();
  /* Modal */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [params, setParams] = useState({
    couponCodes: [],
    userIds: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valueList = value.split(",");
    setParams((prevData) => ({
      ...prevData,
      [name]: valueList || [],
    }));
  };

  // textarea로 입력하도록 한다.
  // 값의 구분은 ,로 구분
  // 쿠폰 코드와 유저의 개수가 다른지 비교한다.
  const handleRegisterCoupon = async () => {
    console.log(params);
    try {
      const res = await api.registerCoupon(params as RegisterCouponModel);
      console.log(res);
      if ("status" in res) {
        const responseData = res.data;
        // Now you can work with responseData
        console.log("responseData", responseData);
        if (res.status === 200) {
          handleOpen();
        }
      } else {
        // Handle the case when res is an empty array (never[])
        alert(
          "쿠폰 등록 시 오류가 발생했습니다.\n계속해서 오류가 발생하면 관리자에게 문의해주세요."
        );
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography variant="h6" gutterBottom marginBottom={5}>
          쿠폰 등록 페이지
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="couponCodes"
              name="couponCodes"
              label="쿠폰 코드"
              fullWidth
              variant="filled"
              multiline
              rows={8}
              helperText="쿠폰 코드를 입력해주세요. (,로 구분합니다.)"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="userIds"
              name="userIds"
              label="사용자 고유 ID"
              fullWidth
              variant="filled"
              multiline
              rows={8}
              helperText="사용자 고유 ID를 입력해주세요. (,로 구분합니다.)"
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <React.Fragment>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={handleRegisterCoupon}
            >
              Create
            </Button>
            {/* <Button onClick={handleOpen}>Modal</Button> */}
          </Box>
        </React.Fragment>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            쿠폰 등록이 완료되었습니다.
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

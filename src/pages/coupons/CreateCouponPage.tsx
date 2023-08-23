import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import PaymentApi from "../../modules/payment";
import { CreateCouponResponse } from "../../model/CouponModel";

export default function CreateCouponPage() {
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

  const couponTypeList = [
    { name: "PREMIUM", value: "PREMIUM" },
    { name: "PREMIUMBUNDLE", value: "PREMIUMBUNDLE" },
  ];
  const discountTypeList = [
    { name: "퍼센트 할인", value: "PERCENTAGE" },
    { name: "가격 할인", value: "AMOUNT" },
  ];
  const couponTraitList = [
    { name: "공용", value: "PUBLIC" },
    { name: "개인", value: "PRIVATE" },
  ];
  const [couponData, setCouponData] = useState({
    count: 0,
    expiredDate: "",
    value: 0,
    couponCode: null as string | null,
    discountType: "",
    couponTrait: "",
    couponType: "",
    prefix: "",
    name: "",
    contents: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCouponData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setCouponData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value || "",
    }));
  };

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    input.value = input.value.replace(/\D/g, "");
  };

  const [couponResult, setCouponResult] = useState<CreateCouponResponse[]>(
    [] || null
  );
  const handleCreateCoupon = async () => {
    try {
      const res = await api.createCoupon(couponData);
      console.log(res); // For debugging

      if ('status' in res) {
        const responseData = res.data;
        // Now you can work with responseData
        console.log("responseData", responseData)
        if (res.status === 200) {
          setCouponResult(res.data as Array<CreateCouponResponse>); // Update the state with the response data
          handleOpen();
        }
      } else {
        // Handle the case when res is an empty array (never[])
        alert("쿠폰 생성 시 오류가 발생했습니다. 관리자에게 문의해주세요.")
      }
    } catch (error) {
      setCouponResult([]); // Handle the error case by updating state accordingly
      console.log(error);
      alert(error);
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography variant="h6" gutterBottom marginBottom={5}>
          쿠폰 생성 페이지
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="couponTrait-select-label">쿠폰 구분</InputLabel>
              <Select
                labelId="couponTrait-select-label"
                id="couponTrait-select"
                name="couponTrait"
                label="쿠폰 구분"
                onChange={handleSelectChange}
                value={couponData.couponTrait}
              >
                {couponTraitList.map((key) => (
                  <MenuItem key={key.value} value={key.value}>
                    {key.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="couponType-select-label">쿠폰 종류</InputLabel>
              <Select
                labelId="couponType-select-label"
                id="couponType-select"
                name="couponType"
                label="쿠폰 종류"
                onChange={handleSelectChange}
                value={couponData.couponType}
              >
                {couponTypeList.map((key) => (
                  <MenuItem key={key.value} value={key.value}>
                    {key.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="discountType-select-label">할인 유형</InputLabel>
              <Select
                labelId="discountType-select-label"
                id="discountType-select"
                name="discountType"
                label="쿠폰 종류"
                onChange={handleSelectChange}
                value={couponData.discountType}
              >
                {discountTypeList.map((key) => (
                  <MenuItem key={key.value} value={key.value}>
                    {key.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="value"
              name="value"
              label="쿠폰 할인 가격"
              type="number"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
              onInput={handleNumberInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="count"
              name="count"
              label="쿠폰 개수"
              type="number"
              fullWidth
              variant="standard"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={handleInputChange}
              onInput={handleNumberInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="expiredDate"
              name="expiredDate"
              label="만료기간"
              placeholder="e.g. 2023-09-31"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="couponCode"
              name="couponCode"
              label="쿠폰 코드"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="prefix"
              name="prefix"
              label="쿠폰 코드 접두어"
              helperText="접두어 입력 시 접두어 기준으로 생성됩니다."
              fullWidth
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="쿠폰 이름"
              fullWidth
              placeholder="e.g. AI 건축분석 할인쿠폰"
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="contents"
              name="contents"
              label="쿠폰 내용"
              fullWidth
              placeholder="e.g. 30000원 할인"
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <React.Fragment>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={handleCreateCoupon}
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
            쿠폰 생성 결과
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {couponResult.map((coupon, index) => (
              <p key={index}>{coupon}</p>
            ))}
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

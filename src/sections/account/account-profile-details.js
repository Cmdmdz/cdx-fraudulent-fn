import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constant/Constants";
import { useRouter } from 'next/navigation';



export const AccountProfileDetails = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    description: '',
    image: '',
    account: '',
    facebook: '',
    line: '',
    phone: '',
    image: '',
    imagePreview: ''
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      // Prepare form data
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('account', values.account);
      formData.append('facebook', values.facebook);
      formData.append('line', values.line);
      formData.append('phone', values.phone);
      formData.append('image', values.image);

      // Call your API endpoint
      try {
        const response = await httpClient.post(server.CREATE_POS, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        router.push('/');
        // Handle success case
        console.log(response.data);
      } catch (error) {
        // Handle error case
        console.error(error);
      }
    },
    [values]
  );

  const handleFileUpload = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setValues((prevState) => ({
            ...prevState,
            image: file,
            imagePreview: reader.result
          }));
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="กรุณากรองข้อมูลตามความเป็นจริง"
          title="รายละเอียดการฉ่อโกง"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="ชื่อ"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="หมายเลขโทรศัพท์"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="หมายเลขบัญชี"
                  name="account"
                  onChange={handleChange}
                  required
                  value={values.account}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="FaceBook"
                  name="facebook"
                  onChange={handleChange}
                  required
                  value={values.facebook}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Line"
                  name="line"
                  onChange={handleChange}
                  required
                  value={values.line}
                />
              </Grid>

              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="รายละเอียด"
                  name="description"
                  onChange={handleChange}
                  required
                  value={values.description}
                  multiline // Add this prop to enable multiline input
                  rows={3} // You can set the number of visible rows
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <Button variant="contained" component="span">
                    อัพโหลดรูปภาพ
                  </Button>
                </label>
                {values.imagePreview && (
                  <Box mt={2}>
                    <img
                      src={values.imagePreview}
                      alt="preview"
                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained"
            onClick={handleSubmit}>
            ส่งคำข้ออนุมัติโพสต์
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

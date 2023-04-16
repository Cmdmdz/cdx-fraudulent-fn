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
  Unstable_Grid2 as Grid,
  Link
} from '@mui/material';
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constant/Constants";
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';


export const Details = ({ detail }) => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: detail.name,
    description: detail.description,
    image: detail.image,
    account: detail.account,
    facebook: detail.facebook,
    line: detail.line,
    phone: detail.phone,
  });

  const imageUrl = `http://localhost:8080/${detail.image}`; // Replace `localhost:8080` with the actual base URL of your Spring Boot application


  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );


  return (

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
                disabled
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
                disabled
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
                disabled
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
                disabled
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                disabled
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
                disabled
                value={values.description}
                multiline // Add this prop to enable multiline input
                rows={4} // You can set the number of visible rows
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              {/* <img src={imageUrl} alt="Company logo" /> */}

            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Link
          component={NextLink}
          href="/"
          underline="hover"
          variant="subtitle2"
        >
          <Button variant="contained"
          >
            ย้อนกลับ
          </Button>
        </Link>
      </CardActions>

    </Card>
  );
};

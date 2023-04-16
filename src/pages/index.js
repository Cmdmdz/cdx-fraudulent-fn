import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import * as React from "react";
import Link from 'next/link';
import { httpClient } from "../utils/HttpClient";
import { server } from "../constant/Constants";
import { useAuthContext } from '../contexts/auth-context';


const list = [

  {
    id: '2569ce0d517a7f06d3ea1f24',
    name: 'Cmd mdz',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    image: '',
    account: '111111',
    facebook: 'CMD',
    line: '',
    outher: ''
  },
  {
    id: '2569ce0d517a7f06d3ea1f24',
    name: 'Cmd mdz',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    image: '',
    account: '111111',
    facebook: 'CMD',
    line: '',
    outher: ''
  },

  {
    id: '2569ce0d517a7f06d3ea1f24',
    name: 'Cmd mdz',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    image: '',
    account: '111111',
    facebook: 'CMD',
    line: '',
    outher: ''
  },

  {
    id: '2569ce0d517a7f06d3ea1f24',
    name: 'Cmd mdz',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    image: '',
    account: '111111',
    facebook: 'CMD',
    line: '',
    outher: ''
  },

  {
    id: '2569ce0d517a7f06d3ea1f24',
    name: 'Cmd mdz',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    image: '',
    account: '111111',
    facebook: 'CMD',
    line: '',
    outher: ''
  },
  {
    id: '2569ce0d517a7f06d3ea1f24',
    name: 'Cmd mdz',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    image: '',
    account: '111111',
    facebook: 'CMD',
    line: '',
    outher: ''
  },
  {
    id: '2569ce0d517a7f06d3ea1f24',
    name: 'Cmd mdz',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    image: '',
    account: '111111',
    facebook: 'CMD',
    line: '',
    outher: ''
  },
  {
    id: '2569ce0d517a7f06d3ea1f24',
    name: 'Cmd mdz',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    image: '',
    account: '111111',
    facebook: 'CMD',
    line: '',
    outher: ''
  },


]

const PAGE_SIZE = 6;


const Page = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = React.useState('');



  const numPages = Math.ceil(data.length / PAGE_SIZE);

  React.useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const fetchData = async (searchTerm) => {

    let role = user ? user.role : '';

    try {
      const response = await httpClient.get(server.POST_LIST, {
        params: {
          searchTerm: searchTerm,
          role: role
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchTermChange = React.useCallback(
    (searchValue) => {
      setSearchTerm(searchValue);
      fetchData(searchValue);
    },
    []
  );

  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const currentPageItems = data.slice(startIdx, endIdx);

  return (
    <>
      <Head>
        <title>รายชื่อบัญชีการฉ่อโกง</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  รายชื่อบัญชีการฉ่อโกง
                </Typography>
              </Stack>
              <div>
                {user ? (
                  <Link href="/share">
                    <Button
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <PlusIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                    >
                      โพสต์
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <Button
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <PlusIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                    >
                      กรุณาเข้าสู่ระบบ
                    </Button>
                  </Link>
                )}

              </div>
            </Stack>
            <CompaniesSearch onSearch={handleSearchTermChange} />
            <Grid container spacing={3}>
              {currentPageItems.map((company) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={company.id}
                >
                  <CompanyCard company={company} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={numPages}
                page={currentPage}
                onChange={handlePageChange}
                size="small"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

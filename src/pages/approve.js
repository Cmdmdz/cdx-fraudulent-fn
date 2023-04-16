import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ApproveTable } from 'src/sections/approve/approve-table';
import { ApproveSearch } from 'src/sections/approve/approve-search';
import { applyPagination } from 'src/utils/apply-pagination';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { httpClient } from "../utils/HttpClient";
import { server } from "../constant/Constants";
const now = new Date();


const useCustomers = (page, rowsPerPage, customersData) => {
  return useMemo(
    () => {
      return applyPagination(customersData, page, rowsPerPage);
    },
    [page, rowsPerPage, customersData]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customersData, setCustomersData] = useState([]);

  const customers = useCustomers(page, rowsPerPage, customersData);

  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [searchTerm, setSearchTerm] = useState('');

  const initialize = async (searchTerm) => {
    try {
      const response = await httpClient.get(server.POST_LIST, {
        params: {
          searchTerm: searchTerm,
          role: "admin"
        },
        
      });
      setCustomersData(response.data);
    } catch (error) {
      console.error('Error fetching data from API:', error.message);
    }
  };


  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  useEffect(() => {
    initialize();
  }, []);

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleApproveSelected = useCallback(() => {
    httpClient.post(server.APPROVE_LIST, 
       { ids: customersSelection.selected },
    )
      .then(response => {
        console.log('Selected post update successfully');
        initialize();
      })
      .catch(error => {
        console.error(error);
        // Handle error here, e.g. by showing an error message to the user
      });

    console.log(customersSelection.selected);

  }, [customersSelection.selected]);


  const handleSearchTermChange = useCallback(
    (searchValue) => {
      setSearchTerm(searchValue);
      initialize(searchValue);
    
    },
    []
  );


  return (
    <>
      <Head>
        <title>
          รายชื่อผู้ใช้
        </title>
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
                  รายชื่อผู้ใช้งาน
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<TrashIcon />}
                  onClick={handleApproveSelected}
                  disabled={customersSelection.selected.length === 0}
                >
                  อนุมัติ
                </Button>
              </Stack>
            </Stack>
            <ApproveSearch onSearch={handleSearchTermChange} />
            <ApproveTable
              count={customersData.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
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

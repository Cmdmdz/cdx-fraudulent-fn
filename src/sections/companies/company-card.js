import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography, Link } from '@mui/material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

export const CompanyCard = (props) => {
  const { company } = props;
  const router = useRouter();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>

        <Typography
          align="left"
          gutterBottom
          variant="h5"
        >
          {company.name}
        </Typography>
        <Typography
          align="left"
          variant="body1"
        >
          รายละเอียด   {company.description}
        </Typography>
        <Typography
          align="left"
          variant="body1"
        >
          เลขบัญชี {company.account}
        </Typography>

      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Link
          component={NextLink}
          href={{ pathname: '/display', query: { companyData: JSON.stringify(company) } }} // Pass company data as a query parameter
          underline="hover"
          variant="subtitle2"
        >
          <Button>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"

            >
              เพิ่มเติม
            </Typography>
          </Button>
        </Link>


      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};

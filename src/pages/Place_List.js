import React from 'react';
import { filter } from 'lodash';
// material
import { styled } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom'
import {
  Box,
  Grid,
  Container,
  Stack,
  Typography,
  TablePagination,
  Pagination,
  Card,
  CardHeader,
  Avatar,
  ImageList,
  ImageListItem,
  Link,
  Skeleton
} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import {
  BlogPostsSort,
  BlogPostSearchs
} from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import DATABASE from '../json/example_data.json';


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const componentStyle = {
  width: '5rem',
  height: '5rem',
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_placelist) => _placelist.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function PlaceList(props) {
  const { loading = false } = props;
  const [data, setData] = React.useState(DATABASE);
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [placeName, setPlaceName] = React.useState('');
  const [placeId, setPlaceId] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const navigate = useNavigate();

  const latestPostLarge = data === 0;
  const latestPost = data === 1 || data === 2;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 8));
    setPage(8);
  };

  const handleFilterByPlaceName = (event) => {
    setPlaceName(event.target.value);
  };
  const placeRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredPlaceName = applySortFilter(data, getComparator(order, orderBy), placeName);

  const isUserNotFound = filteredPlaceName.length === 0;

  // const placeByIdpath = () => {
  //   return Navigate(`/ics/placeById/${id}`)
  //   // window.location.href = `/ics/placeById/${id}`;
  // }
  const placeByIdpath = (id) => {
    navigate(`/ics/placeById/${id}`, { state: { placeId: id } });
  }

  return (
    <Page title="Place List">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Place List
          </Typography>
            <BlogPostSearchs numSelected={selected.length} placeName={placeName} onFilterName={handleFilterByPlaceName} />
        </Stack>
        <Grid container spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {filteredPlaceName && filteredPlaceName.length > 0 ?
            filteredPlaceName.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((place, index) => (
              <Grid key={index} item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}
                sx={{
                  // height:200
                }}
              >
                <Card sx={{ cursor: 'pointer', position: 'relative', padding: '10px' }}
                  onClick={() => placeByIdpath(place.id)}
                >
                  <CardHeader
                    sx={{ padding: '10px' }}
                    avatar={
                      <Avatar aria-label="recipe" variant="rounded" src={place.profile_image_url}
                      />
                    }
                    title={place.name}
                    subheader={
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <Iconify icon={'akar-icons:calendar'} width={20} height={20} sx={{ mr: 1 }} />
                          <span>{`${place.operation_time[0].time_open} - ${place.operation_time[0].time_close}`}</span>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <Iconify icon={'ion:ellipse-sharp'} width={20} height={20} sx={{ mr: 1, color: '#134B8A' }} />
                          <span style={{ color: '#134B8A', fontSize: '16px' }}>{`${place.rating}`}</span>
                        </Typography>
                      </Stack>
                    }
                  />
                  <ImageList sx={{ ...componentStyle, borderRadius: '20px', width: '100%', height: '100%' }} gap={0} cols={3} rowHeight={164}>
                    {place.images.map((item, index) => (
                      <ImageListItem key={index}>
                        <img
                          src={item}
                          alt={item}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Card>
              </Grid>
            ))
            :
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                {isUserNotFound ? 'No place found' : 'Loading...'}
              </Typography>
            </Grid>
          }
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', direction: 'row', justifyContent: 'center' }}>
          <Stack spacing={2}>
            {filteredPlaceName && filteredPlaceName.length > 0 ?
              <TablePagination variant="outlined"
                rowsPerPageOptions={[8]}
                component="div"
                count={filteredPlaceName.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              :
              <TablePagination variant="outlined"
                rowsPerPageOptions={[8]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            }
          </Stack>
        </Box>
      </Container >
    </Page >
  );
}

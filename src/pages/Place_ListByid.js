
import React from 'react'
import PropTypes from 'prop-types'
import { filter } from 'lodash';
import { useLocation } from 'react-router-dom';
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
  Button,
  CardMedia,
  CardContent
} from '@mui/material';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import DATABASE from '../json/example_data.json';

const componentStyle = {
  width: '5rem',
  height: '5rem',
}

export default function PlaceListByid() {

  const location = useLocation();
  const placeId = location.state.placeId;
  const [data, setData] = React.useState(DATABASE);
  const [place, setPlace] = React.useState([]);
  const latestPostLarge = data === 0;

  React.useEffect(async () => {
    await filterPlaceIdAndData()
  }, [])

  const filterPlaceIdAndData = async () => {
    const filteredData = await data.filter(place => place.id === placeId);
    setPlace(filteredData);
  }

  const onBack = () => {
    window.history.back();
  }
  return (
    <>
      {place && place.length > 0 &&
        <Page title={`PlaceListByID : ${placeId}`}>
          <Box p={2}>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
              sx={{ borderRadius: '30px', padding: '0.5rem', width: '98px', height: '36px' }}
              onClick={onBack}
            >
              Back
            </Button>
          </Box>
          <Container>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Card sx={{ background: '#C4D3E9', maxWidth: '100%' }} >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 3 }}>
                  <div x={{ m: 1, width: '25ch' }} variant="outlined">
                    <Card sx={{ maxWidth: 497, mt: 1 }}>
                      <CardMedia
                        component="img"
                        height="270"
                        image={place[0].profile_image_url}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between" >
                          <Typography gutterBottom variant="h5" component="h2">
                            {place[0].name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Iconify icon={'ion:ellipse-sharp'} width={20} height={20} sx={{ mr: 1, color: '#134B8A' }} />
                            <span style={{ color: '#134B8A', fontSize: '16px' }}>{place[0].rating}</span>
                          </Typography>
                        </Stack>
                        <Stack spacing={10} direction="row" justifyContent="space-between" >
                          <Typography gutterBottom variant="body1" component="h2">
                            Address
                          </Typography>
                          <Typography variant="body2" component="h1">
                            {place[0].address}
                          </Typography>
                        </Stack>
                        <Stack spacing={5} direction="row" justifyContent="flex-start" sx={{ mt: 2 }}>
                          <Typography gutterBottom variant="body1" component="h2">
                            Opening Hour
                          </Typography>
                          <Typography variant="body2" component="h2">
                            {place[0].operation_time &&
                              place[0].operation_time.length > 0 &&
                              place[0].operation_time.map((time, index) => {
                                return (
                                  <>
                                    <span key={index}>{time.day} : {time.time_open} - {time.time_close}</span>
                                    <br />
                                  </>
                                )
                              }
                              )}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </div>
                  <div x={{ m: 1, width: '25ch' }} variant="outlined">
                    <Box sx={{ flexGrow: 1, p: 1 }}>
                      <Card sx={{ padding: 2 }}>
                        <Typography gutterBottom variant="h5" component="div"> Image</Typography>
                        <ImageList
                          sx={{
                            ...componentStyle,
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '20px',
                            width: 497,
                            height: 1000
                          }} gap={0}
                        >
                          {place[0].images.map((item, index) => (
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
                    </Box>
                  </div>
                </Box>
              </Card>
            </Box>
          </Container>
        </Page >
      }
    </>
  )
}

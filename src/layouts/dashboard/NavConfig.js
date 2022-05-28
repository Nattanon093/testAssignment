// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    // title: 'blog',
    path: '/ics/placeList',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    // title: 'blog',
    path: '/ics/placeById/:id',
  }
];

export default navConfig;

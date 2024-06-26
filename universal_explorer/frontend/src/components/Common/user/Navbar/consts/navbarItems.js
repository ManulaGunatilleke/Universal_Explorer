import PeopleIcon from '@mui/icons-material/People';
import ImageIcon from '@mui/icons-material/Image';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import DnsIcon from '@mui/icons-material/Dns';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <SettingsEthernetIcon />,
        label: 'Add Task List',
        route: 'addTaskList',
    },
    {
        id: 1,
        icon: <CalendarMonthIcon />,
        label: 'Day Explorer',
        route: 'dayExplorer',
    },
    {
        id: 2,
        icon: <ImageIcon />,
        label: 'Mars Rover Explorer',
        route: 'marsRoverExplorer',
    },
    // {
    //     id: 3,
    //     icon: <PublicIcon />,
    //     label: 'Hosting',
    //     route: 'hosting',
    // },
    // {
    //     id: 4,
    //     icon: <SettingsEthernetIcon />,
    //     label: 'Functions',
    //     route: 'functions',
    // },
    // {
    //     id: 5,
    //     icon: <SettingsInputComponentIcon />,
    //     label: 'Machine learning',
    //     route: 'machine-learning',
    // },
]
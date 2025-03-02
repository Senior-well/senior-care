import { faCaretDown, faUser, faChartSimple, faExclamationTriangle, faAddressCard, faAddressBook } from "@fortawesome/free-solid-svg-icons";

export const menuData = [
    {
        title: 'Features',
        icon: faCaretDown,
        submenus: [
            {
                title: 'Dashboard',
                icon: faUser,
                description: 'Patient Information',
                url: '/caregiver'
            },
            {
                title: 'Tracker',
                icon: faChartSimple,
                description: 'Record Update Immediately',
                url: '/tracker'
            },
            {
                title: 'Automated alerts',
                icon: faExclamationTriangle,
                description: 'Request Emergency Arrival',
                url: '/alerts'
            },
        ],
    },
    {
        title: 'Developers',
        url: '/dev'
    },
    {
        title: 'Company',
        icon: faCaretDown,
        submenus: [
            {
                title: 'About',
                icon: faAddressCard,
                description: 'Our contribution',
                url: '/about'
            },
            {
                title: 'Contact',
                icon: faAddressBook,
                description: 'Get in touch',
                url: '/contact'
            },
        ],
    },
    {
        title: 'Blogs',
        url: '/blogs'
    },
    {
        title: 'Pricing',
        url: '/pricing'
    }
];

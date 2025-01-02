import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const menuData = [
    {
        title: 'Features',
        icon: faCaretDown,
        submenus: [
            {
                title: 'Dashboard',
                description: 'Patient Information',
                url: '/dashboard'
            },
            {
                title: 'Tracker',
                description: 'Record Update Immediately',
                url: '/tracker'
            },
            {
                title: 'Automated alerts',
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
                description: 'Our contribution',
                url: '/about'
            },
            {
                title: 'Contact',
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
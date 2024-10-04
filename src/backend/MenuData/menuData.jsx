export const menuData = [
    {
        title: 'Home',
        url: '/home',
    },
    {
        title: 'About us',
        url: '/about-us',
    },
    {
        title: 'Features',
        submenus: [
            {
                title: 'Medication & Health Monitoring',
                url: '/features/medication-and-health-monitoring',
            },
            {
                title: 'Caregiver Coordination',
                url: '/features/caregiver-coordination',
            },
            {
                title: 'Emergency Alerts',
                url: '/features/emergency-alerts',
            },
            {
                title: 'Mental & Physical Exercises',
                url: '/features/mental-physical-exercises',
            }
        ],
    },
    {
        title: 'Products',
        submenus: [
            {
                title: 'Overview',
                url: '/products/overview',
            },
            {
                title: 'Software',
                url: '/products/software',
            },
            {
                title: 'Pricing and Plans',
                url: '/products/pricing-and-plans',
            },
        ]
    },
    {
        title: 'Contact',
        url: '/contact',
    },
];
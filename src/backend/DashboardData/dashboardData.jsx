import { faBarsProgress, faCircleInfo, faSquarePollVertical, faSliders, faCalendarCheck, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

const ElderPortal = [
    {
        icon: faCircleInfo,
        title: 'Patient Information',
        url: '/patient-infor'
    },
    {
        icon: faCalendarCheck,
        title: 'Appointment',
        url: '/appointment'
    },
    {
        icon: faRightFromBracket,
        title: 'Log out',
        url: '/'
    }
]

const CaregiverPortal = [
    {
        icon: faBarsProgress,
        title: 'Dashboard',
        url: '/dashboard'
    },
    {
        icon: faCircleInfo,
        title: 'Patient Information',
        url: '/patient-infor'
    },
    {
        icon: faSquarePollVertical,
        title: 'Statistics',
        url: '/statistics'
    },
    {
        icon: faCalendarCheck,
        title: 'Appointment',
        url: '/appointment'
    },
    {
        icon: faSliders,
        title: 'Settings',
        url: '/settings'
    }
]

export {ElderPortal, CaregiverPortal};
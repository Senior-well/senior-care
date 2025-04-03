import { faBarsProgress, faCircleInfo, faSquarePollVertical, faSliders, faCalendarCheck, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

const PatientData = [
    {
        icon: faCircleInfo,
        title: 'Patient Information',
        url: '/patient-infor'
    },
    {
        icon: faCalendarCheck,
        title: 'Reminders',
        url: '/remindersMA'
    },
    {
        icon: faSliders,
        title: 'Settings',
        url: '/patient-infor'
    },
    {
        icon: faSliders,
        title: 'Contacts',
        url: '/contacts'
    },
    {
        icon: faRightFromBracket,
        title: 'Log out',
        url: '/'
    }
]

const PatientHealthData = [
    {
        icon: faCircleInfo,
        title: 'Patient Information',
        url: '/patient-infor'
    },
    {
        icon: faCalendarCheck,
        title: 'Reminders',
        url: '/remindersMA'
    },
    {
        icon: faSliders,
        title: 'Settings',
        url: '/settings'
    },
    {
        icon: faSliders,
        title: 'Contacts',
        url: '/contacts'
    },
    {
        icon: faRightFromBracket,
        title: 'Log out',
        url: '/'
    }
]

export {PatientData, PatientHealthData};
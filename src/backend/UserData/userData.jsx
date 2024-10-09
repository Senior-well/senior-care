import { faUser } from "@fortawesome/free-solid-svg-icons";

export const userData = [
    {
        title: "Company",
        url: "/company",
    },
    {
        title: "Developers",
        url: "/dev"
    },
    {
        title: "Support",
        url: "/support"
    },
    {
        title: "User",
        icon: faUser,
        submenus: [
            {
                title: "Sign in",
                url: "/user/sign-in",
            },
            {
                title: "Sign up",
                url: "/user/sign-up",
            }
        ]
    },
];
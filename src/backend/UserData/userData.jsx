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
                title: "Login",
                url: "/user/login",
            },
            {
                title: "Sign up",
                url: "/user/sign-up",
            }
        ]
    },
];
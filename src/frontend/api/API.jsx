// Get date in YYYY-MM-DD format
const date = new Date();
date.setDate(date.getDate()); // Specify the date (today)
const formattedDate = date.toISOString().split("T")[0];
console.log(formattedDate, date)

// Function to fetch User Profile
export async function getUserProfile() {
    const accessToken = localStorage.getItem("fitbit_access_token");
    if (!accessToken) {
        return { error: "Login required" };
    }

    try {
        const response = await fetch("https://api.fitbit.com/1/user/-/profile.json", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();
        if (data.user) {
            return {
                name: data.user.fullName,
                birthDate: data.user.dateOfBirth
            };
        } else {
            return { error: "User profile not found" };
        }

    } catch (error) {
        console.log("Error fetching user profile:", error);
        return { error: "Error fetching data" };
    }
}

// Function to fetch Steps data
export async function getDateSteps() {
    const accessToken = localStorage.getItem("fitbit_access_token");
    if (!accessToken) {
        return { error: "Login required" };
    }

    try {
        const response = await fetch(`https://api.fitbit.com/1/user/-/activities/steps/date/${formattedDate}/1d.json`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (data["activities-steps"] && data["activities-steps"].length > 0) {
            return { steps: data["activities-steps"][0]["value"] };
        } else {
            return { error: "No step data available" };
        }
    } catch (error) {
        console.error("Error fetching steps:", error);
        return { error: "Error fetching data" };
    }
}

// Function to fetch real-time Heart Rate data
export async function getHeartRate() {
    const accessToken = localStorage.getItem("fitbit_access_token");
    if (!accessToken) {
        return { error: "Login required" };
    }

    try {
        const response = await fetch(`https://api.fitbit.com/1/user/-/activities/heart/date/${formattedDate}/1d/1min.json`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log("Fitbit API Response:", data);

        if (data["activities-heart-intraday"] && data["activities-heart-intraday"]["dataset"].length > 0) {
            const latestHeartRate = data["activities-heart-intraday"]["dataset"].slice(-1)[0].value;
            return { heartRate: `${latestHeartRate} bpm` };
        } else {
            return { error: "No real-time data available" };
        }
    } catch (error) {
        console.error("Error fetching heart rate:", error);
        return { error: "Error fetching data" };
    }
}

// Function to fetch both Steps and Heart Rate data
export async function fetchFitbitData() {
    const [stepsData, heartRateData, profileData] = await Promise.allSettled([
        getDateSteps(),
        getHeartRate(),
        getUserProfile()
    ]);

    return {
        steps: stepsData.status === "fulfilled" ? stepsData.value.steps : "Error fetching steps",
        heartRate: heartRateData.status === "fulfilled" ? heartRateData.value.heartRate : "Error fetching heart rate",
        name: profileData.status === "fulfilled" ? profileData.value.name : "Error fetching name",
        birthDate: profileData.status === "fulfilled" ? profileData.value.birthDate : "Error fetching birth date"
    };
}


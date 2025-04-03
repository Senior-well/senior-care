// date formatter for Fitbit APIs
const date = new Date();
const formattedDate = date.toISOString().split("T")[0];

const accessToken = localStorage.getItem("fitbit_access_token");
const headers = {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json"
};

async function fetchFitbitEndpoint(url, extract) {
    if (!accessToken) return { error: "Login required" };
    try {
        const res = await fetch(url, { method: "GET", headers });
        const data = await res.json();
        return extract(data);
    } catch (e) {
        return { error: "Error fetching data" };
    }
}

export const getUserProfile = () =>
    fetchFitbitEndpoint("https://api.fitbit.com/1/user/-/profile.json", data => ({
        name: data.user?.fullName,
        birthDate: data.user?.dateOfBirth
    }));

export const getDateSteps = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1/user/-/activities/steps/date/${formattedDate}/1d.json`, data => ({
        steps: data["activities-steps"]?.[0]?.value
    }));

export const getHeartRate = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1/user/-/activities/heart/date/${formattedDate}/1d/1min.json`, data => {
        const dataset = data["activities-heart-intraday"]?.dataset;
        const latest = dataset?.[dataset.length - 1]?.value;
        return { heartRate: latest ? `${latest} bpm` : "N/A" };
    });

export const getRestingHeartRate = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1/user/-/activities/heart/date/${formattedDate}/30d.json`, data => ({
        restingHeartRate: data["activities-heart"]?.[0]?.value?.restingHeartRate || "N/A"
    }));

export const getCaloriesBurned = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1/user/-/activities/calories/date/${formattedDate}/7d.json`, data => ({
        calories: data["activities-calories"]?.[6]?.value || "N/A"
    }));

export const getFloorsClimbed = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1/user/-/activities/floors/date/${formattedDate}/7d.json`, data => ({
        floors: data["activities-floors"]?.[6]?.value || "N/A"
    }));

export const getDailyDistance = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1/user/-/activities/distance/date/${formattedDate}/7d.json`, data => ({
        distance: data["activities-distance"]?.[6]?.value || "N/A"
    }));

export const getActiveMinutes = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1/user/-/activities/minutesFairlyActive/date/${formattedDate}/7d.json`, data => ({
        activeMinutes: data["activities-minutesFairlyActive"]?.[6]?.value || "N/A"
    }));

export const getSleepLogs = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1.2/user/-/sleep/date/${formattedDate}.json`, data => ({
        sleepLog: data.summary?.totalMinutesAsleep + " mins" || "N/A"
    }));

export const getSleepStages = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1.2/user/-/sleep/date/${formattedDate}.json`, data => ({
        sleepStages: data.summary?.stages || "N/A"
    }));

export const getSpO2 = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1/user/-/spo2/date/${formattedDate}.json`, data => ({
        spo2: data?.spo2?.[0]?.value || "N/A"
    }));

export const getBreathingRate = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1/user/-/br/date/${formattedDate}.json`, data => ({
        breathingRate: data?.br?.[0]?.value || "N/A"
    }));

export const getFoodLog = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1/user/-/foods/log/date/${formattedDate}.json`, data => ({
        foodLog: data?.summary?.calories || "N/A"
    }));

export const getWaterIntake = () =>
    fetchFitbitEndpoint(`https://api.fitbit.com/1/user/-/foods/log/water/date/${formattedDate}.json`, data => ({
        waterIntake: data?.summary?.water || "N/A"
    }));

export async function fetchFitbitData() {
    const [
        stepsData, heartRateData, profileData, restingHR, calories, floors, distance,
        activeMinutes, sleepLog, sleepStages, spo2, breathing, food, water
    ] = await Promise.allSettled([
        getDateSteps(),
        getHeartRate(),
        getUserProfile(),
        getRestingHeartRate(),
        getCaloriesBurned(),
        getFloorsClimbed(),
        getDailyDistance(),
        getActiveMinutes(),
        getSleepLogs(),
        getSleepStages(),
        getSpO2(),
        getBreathingRate(),
        getFoodLog(),
        getWaterIntake()
    ]);

    return {
        steps: stepsData.value?.steps || "N/A",
        heartRate: heartRateData.value?.heartRate || "N/A",
        name: profileData.value?.name || "N/A",
        birthDate: profileData.value?.birthDate || "N/A",
        restingHeartRate: restingHR.value?.restingHeartRate || "N/A",
        calories: calories.value?.calories || "N/A",
        floors: floors.value?.floors || "N/A",
        distance: distance.value?.distance || "N/A",
        activeMinutes: activeMinutes.value?.activeMinutes || "N/A",
        sleepLog: sleepLog.value?.sleepLog || "N/A",
        sleepStages: sleepStages.value?.sleepStages || {},
        spo2: spo2.value?.spo2 || "N/A",
        breathingRate: breathing.value?.breathingRate || "N/A",
        foodLog: food.value?.foodLog || "N/A",
        waterIntake: water.value?.waterIntake || "N/A"
    };
}

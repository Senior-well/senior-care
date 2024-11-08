<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight requests (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Send a 200 OK response for preflight requests
    exit();
}

$fileName = 'user_data.json';

// GET raw POST
$data = file_get_contents('php://input');
$formData = json_decode($data, true);
$dataName = ['First name', 'Family name', 'Email', 'Phone number', 'Password', 'Confirm password'];

if ($formData && isset($formData['status'])) {
    $status = $formData['status'];
    $emailOrPhone = $formData['Email address or mobile-phone number'] ?? '';
    $password = $formData['Password'] ?? '';

    /**
     * Load existing users from JSON file
     */
    $users = file_exists($fileName) ? json_decode(file_get_contents($fileName), true) : [];

    if(!is_array($users)) {
        $users = [];
    }

    // Sign up status
    if ($status == 'signup') {
        /* Check if required field was not typed in */
        foreach ($dataName as $data) {
            if (empty($formData[$data])) {
                echo json_encode(['status' => 'error', 'message' => "$data is required"]);
                exit();
            }
        }

        /* Verify if password are correct */
        if ($formData['Confirm password'] !== $formData['Password']) {
            echo json_encode(['status' => 'error', 'message' => 'Passwords do not match']);
            exit();
        }

        foreach ($users as $user) {
            if ($user['Email'] === $formData['Email'] || $user['Phone number'] === $formData['Phone number']) {
                echo json_encode(['status' => 'error', 'message' => $user['Email'] === $formData['Email'] ? 'Email already existed' :'Phone number already existed']);
                exit();
            }
        }

        $newUser = [
            'First name' => $formData['First name'] ?? '',
            'Family name' => $formData['Family name'] ?? '',
            'Email' => $formData['Email'] ?? '',
            'Phone number' => $formData['Phone number'] ?? '',
            'Password' => password_hash($password, PASSWORD_DEFAULT)
        ];

        $users[] = $newUser;

        file_put_contents($fileName, json_encode($users, JSON_PRETTY_PRINT));

        echo json_encode(['status' => 'success', 'message' => 'Account created successfully']);
    }

    // Login status
    elseif ($status == 'login') {
        if (empty($emailOrPhone) || empty($password)) {
            echo json_encode(['status' => 'error', 'message' => 'Email/Phone and Password are required for login.']);
            exit();
        }

        foreach ($users as $user) {
            if (($user['Email'] === $emailOrPhone || $user['Phone number'] === $emailOrPhone) && password_verify($password, $user['Password'])) {
                /*Store the data in the server by using $_SESSION */
                $_SESSION['user'] = [
                    'firstName' => $user['First name'],
                    'email' => $user['Email']
                ];
                error_log("Session set for user: " . json_encode($_SESSION['user']));
                echo json_encode(['status' => 'success', 'message' => 'Login successful.']);
                exit();
            }
        }
        echo json_encode(['status' => 'error', 'message' => 'Account doesn\'t exist or incorrect password']);
    }

    // getUser information status
    elseif ($status == 'getUser') {
        /*Verify user login */
        if (isset($_SESSION['user'])) {
            echo json_encode(['status' => 'success', 'firstName' => $_SESSION['user']['firstName']]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
        }
    }

    // Logout status
    elseif ($status == 'logout') {
        session_destroy();
        echo json_encode(['status' => 'success', 'message' => 'Logged out successfull']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid status']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data received']);
}

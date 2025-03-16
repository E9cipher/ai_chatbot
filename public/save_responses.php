<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Expired in the past
header("Cache-Control: no-cache, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Content-Type: application/json");

$filename = "responses.json";

// Ensure file exists
if (!file_exists($filename)) {
    file_put_contents($filename, "{}");
}

// Read current data
$existingData = json_decode(file_get_contents($filename), true) ?: [];

// Get new data from request
$inputData = json_decode(file_get_contents("php://input"), true);

if (!$inputData) {
    echo json_encode(["error" => "No valid JSON received"]);
    exit;
}

// Merge and save new data immediately
$newData = array_merge($existingData, $inputData);
if (file_put_contents($filename, json_encode($newData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(["status" => "success", "message" => "Training data updated!"]);
} else {
    echo json_encode(["error" => "Failed to write to responses.json"]);
}
?>

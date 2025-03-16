<?php
$data = file_get_contents("php://input");
file_put_contents("../responses.json", $data);
echo "Data updated!";
?>
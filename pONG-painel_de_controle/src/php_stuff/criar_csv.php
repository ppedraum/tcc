<?php
require '../../vendor/autoload.php';


use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$id_publi = $_GET['id'];

$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
$sheet->setCellValue('A1', 'Hello World !');

$writer = new Xlsx($spreadsheet);
$writer->save('hello world.xlsx');

header('Content-Type: application/xlsx');
header('Content-Disposition: attachment; filename=hello world.xlsx');
header('Pragma: no-cache');
readfile("./hello world.xlsx");

echo "<script>window.close();</script>";

?>



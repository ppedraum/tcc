<?php
require '../../vendor/autoload.php';

require_once('./datab.php');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();

// GET
$id_publi = $_GET['id_publi'];
$id_evt = $_GET['id_evt'];

// QUERIES
$query_publi = mysqli_query($conn, "
    select publicacao.titulo, publicacao.datetime_publicacao 
    from publicacao 
    where id = $id_publi");

$query_publi = $query_publi->fetch_assoc();

$query_inscricoes = mysqli_query($conn, "
    select usuario.* from inscricao, usuario
    where inscricao.id_usuario = usuario.id and inscricao.id_evento = $id_evt ");

$num_inscricoes = mysqli_query($conn, "select count(1) from inscricao where inscricao.id_evento = $id_evt");
$num_inscricoes = $num_inscricoes->fetch_column();
// ESTILO

$estilo_cabecalho = [
    'alignment' => [
        'horizontal' => PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER
    ],
    'fill' => [
        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
        'color' => [
            'rgb' => 'C6E0B4'
        ]
    ]
];

$estilo_row_impar = [
    'alignment' => [
        'horizontal' => PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER
    ],
    'fill' => [
        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
        'color' => [
            'rgb' => '8EA9DB'
        ]
    ]
];

$estilo_row_par = [
    'alignment' => [
        'horizontal' => PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER
    ],
    'fill' => [
        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
        'color' => [
            'rgb' => 'D9E1F2'
        ]
    ]
];

$spreadsheet->getDefaultStyle()->getFont()->setName('Arial')->setSize(10);
$sheet->getStyle('B3')->getFont()->setSize(12)->setBold(true);
$sheet->getStyle('B3')->getAlignment()->setHorizontal(PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
$sheet->getStyle('B4:J4')->applyFromArray($estilo_cabecalho);
$sheet->getColumnDimension('B')->setAutoSize(true);
$sheet->getColumnDimension('C')->setAutoSize(true);
$sheet->getColumnDimension('D')->setAutoSize(true);
$sheet->getColumnDimension('E')->setAutoSize(true);
$sheet->getColumnDimension('F')->setAutoSize(true);
$sheet->getColumnDimension('G')->setAutoSize(true);
$sheet->getColumnDimension('H')->setAutoSize(true);
$sheet->getColumnDimension('I')->setAutoSize(true);
$sheet->getColumnDimension('J')->setAutoSize(true);

for($i = 0; $i < $num_inscricoes; $i++){
    if($i%2==1){
        $sheet->getStyle('B'.($i+5).':'.'J'.($i+5))->applyFromArray($estilo_row_impar);
    }
    else{
        $sheet->getStyle('B'.($i+5).':'.'J'.($i+5))->applyFromArray($estilo_row_par);
    }
    
}


// TITULO
$sheet->setCellValue('B3', $query_publi['titulo']." - ".$query_publi['datetime_publicacao']);
$sheet->mergeCells('B3:J3');

// CABEÇALHO
$cabecalho = [NULL, 'Nome','E-Mail', 'Telefone', 'Data De Nascimento', 'Profissão', 'Sexo', 'Cidade', 'Estado'];

$sheet->fromArray(
    $cabecalho,   // The data to set
    NULL,        // Array values with this value will not be set
    'B4'         // Top left coordinate of the worksheet range where
                 //    we want to set these values (default is A1)
);


// INSCRIÇÕES

$iter = 5;
while($row = $query_inscricoes->fetch_assoc()){
    $arr = [$iter-4, $row['nome'], $row['e_mail'], $row['telefone'], $row['data_nasc'], $row['profissao'], $row['sexo'], $row['cidade'], $row['UF']];
    $sheet->fromArray(
        $arr,
        NULL,
        'B'.$iter
    );
    $iter+=1;
}



// SALVAR E BAIXAR 
$writer = new Xlsx($spreadsheet);
$writer->save('hello world.xlsx');

header('Content-Type: application/xlsx');
header('Content-Disposition: attachment; filename=hello world.xlsx');
header('Pragma: no-cache');
readfile("./hello world.xlsx");

echo '<script>window.close();</script>';

?>



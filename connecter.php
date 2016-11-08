<?php

$url = $_GET['url'];
$var = $_GET['var'];
$key = 'fa6f004bc75af641a5a67554c3f37fa4';
$order = 'random';
$amount = '10';

$str = 'http://api.brewerydb.com/v2/'.$url. '?key=' .$key.'&'.$var.'&order='.$order.'&randomCount='.$amount;
$result = file_get_contents($str);


echo $result;


?>
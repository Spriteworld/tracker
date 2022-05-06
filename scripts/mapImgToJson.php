<?php
require 'vendor/autoload.php';

use Illuminate\Support\Arr;

$dir = '../src/assets/emerald/';

$images = glob($dir.'*.png');

foreach ($images as $image) {
  $imageName = basename($image, '.png');
  [$w, $h] = getimagesize($image);

  $jsonFilename = $dir.$imageName.'.json';
  $json = [];
  if (file_exists($jsonFilename)) {
    $json = json_decode(file_get_contents($jsonFilename), true);
  }
  Arr::set($json, '_meta.img', '../'.str_replace('src/', '', $dir).$imageName.'.png');
  Arr::set($json, '_meta.width', $w);
  Arr::set($json, '_meta.height', $h);

  if (!isset($json['warps'])) { Arr::set($json, 'warps', []); }
  if (!isset($json['catches'])) { Arr::set($json, 'catches', []); }

  file_put_contents($jsonFilename, json_encode($json, JSON_PRETTY_PRINT));
}

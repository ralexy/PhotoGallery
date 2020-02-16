<?php
function sanitize_output($buffer) 
{
  $search = array(
    '/(\s)+\</s',  // strip whitespaces before tags
    '/\>(\s)+/s',  // strip whitespaces after tags
    '/(\s)+/s'     // shorten multiple whitespace sequences
  );

  $replace = array('<', '>', '\\1');

  $buffer = preg_replace($search, $replace, $buffer);

  return $buffer;
}

ob_start('sanitize_output');
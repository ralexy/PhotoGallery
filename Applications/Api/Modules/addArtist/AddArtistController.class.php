<?php
namespace Applications\Api\Modules\AddArtist;

use Library\Entities\Artist;

class AddArtistController extends \Library\BackController
{
  public function executeIndex(\Library\HTTPRequest $request)
  {
      $postJson = $request->postData('postJson');
      $data = json_decode($postJson, true);
      $res = [];

      if($data[0]) {
          foreach($data as $line) {
              $line['birthDate'] = !empty($line['birthDate']) ? new \DateTime($line['birthDate']) : NULL;
              $line['deathDate'] = !empty($line['deathDate']) ? new \DateTime($line['deathDate']) : NULL;

              $artist = new Artist($line);

              if($artist->isValid()) {
                  $this->managers->getManagerOf('Artist')->save($artist);

                  $line['artistId'] = $artist->getArtistId();
                  $line['birthDate'] = $line['birthDate']->format("Y-m-d");
                  $line['deathDate'] = $line['deathDate']->format("Y-m-d");

                  $res['result'][] = $line;
              } else {
                  $res['result'][] = 'error';
              }
          }
      } else {
          $res['result'] = 'error';
      }

      $this->page()->addVar('res', $res);
  }
}
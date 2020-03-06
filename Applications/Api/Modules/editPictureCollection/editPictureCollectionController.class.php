<?php
namespace Applications\Api\Modules\EditPictureCollection;

use Library\Entities\PictureCollection;

class editPictureCollectionController extends \Library\BackController
{
  public function executeIndex(\Library\HTTPRequest $request)
  {
      $postJson = $request->postData('postJson');
      $data = json_decode($postJson, true);
      $res = [];

      if(count($data) > 0) {
          foreach($data as $line) {
              $pictureCollection = new PictureCollection($line);

              if($pictureCollection->isValid()) {
                  $pictureCollectionManager = $this->managers->getManagerOf('PictureCollection');

                  // Suppression de tous les tuples et réinsertion dans l'ordre donné
                  $pictureCollectionManager->deleteAll();
                  $pictureCollectionManager->save($pictureCollection);

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
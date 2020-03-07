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
      $res['result'] = 'error';

      if(is_array($data) && count($data) > 0 && isset($data[0]['collectionId'])) {
        // Suppression de tous les tuples et réinsertion dans l'ordre donné 
        $collectionId = ((int) $data[0]['collectionId'] > 0) ? $data[0]['collectionId'] : false;

        if($collectionId) {

            var_dump($collectionId);

            $pictureCollectionManager = $this->managers->getManagerOf('PictureCollection');
            $collectionManager        = $this->managers->getManagerOf('Collection');

            if($collectionManager->countId($collectionId) > 0) {
                unset($res['result']);

                $pictureCollectionManager->delete($data[0]['collectionId']);

                foreach($data as $line) {
                    $pictureCollection = new PictureCollection($line);

                    if($pictureCollection->isValid()) {
                        $pictureCollectionManager = $this->managers->getManagerOf('PictureCollection');

                        $pictureCollectionManager->save($pictureCollection);

                        $res['result'][] = $line;
                    } else {
                        $res['result'][] = 'error';
                    }
                }
            }
        }
      }

      $this->page()->addVar('res', $res);
  }
}
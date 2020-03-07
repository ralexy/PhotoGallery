<?php
namespace Applications\Api\Modules\GetPictureCollection;

use Library\Entities\PictureCollection;
use Library\Entities\Collection;
use Library\Entities\Picture;


class getPictureCollectionController extends \Library\BackController
{
    public function executeIndex(\Library\HTTPRequest $request)
    {
        $collectionName = $request->getData('collectionName');
        $cm = $this->managers->getManagerOf('Collection');
        $collections = $cm->getList();
        $id;
        for ($j = 0; $j < count($collections); $j++) {
            if($collections[$j]->getName() === $collectionName){
                $id = $collections[$j]->getCollectionId();
            }
        }
  
         $jsonData = !empty($jsonData) ? $jsonData : [];
  
         for($i = 0; $i < count($pictures); $i++) {
             if($pictures[$i] instanceof Picture)
             {
                 $picture = $pictures[$i];
                 $jsonData[$i]['title'] = $picture->getTitle();
                 $jsonData[$i]['year'] = $picture->getYear();
                 $jsonData[$i]['artist'] = $picture->getArtist();
                 $jsonData[$i]['url'] = $picturesURL;
                 $jsonData[$i]['thumbsUrl'] = $picturesThumbsURL;
                 $jsonData[$i]['fileName'] = $picture->getPictureId(). $picturesExtension;
                 $jsonData[$i]['pictureId'] = $picture->getPictureId();
             }
         }
  
         $this->page()->addVar('pictures', json_encode($jsonData));
    }
}
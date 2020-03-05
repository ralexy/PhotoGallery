<?php
namespace Applications\Api\Modules\Index;

use Library\Entities\Picture;

class IndexController extends \Library\BackController
{
  public function executeIndex(\Library\HTTPRequest $request)
  {
       $collectionName = $request->getData('collectionName');
       $pictures = $this->managers->getManagerOf('Picture')->getList($collectionName);

       $picturesURL = $this->app()->config()->get('picturesURL');
       $picturesThumbsURL = $this->app()->config()->get('picturesThumbURL');
       $picturesExtension = $this->app()->config()->get('picturesExtension');

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
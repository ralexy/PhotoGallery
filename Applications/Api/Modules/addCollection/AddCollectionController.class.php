<?php
namespace Applications\Api\Modules\AddCollection;

use Library\Entities\Collection;

class AddCollectionController extends \Library\BackController
{
    public function executeIndex(\Library\HTTPRequest $request)
    {
        $postJson = $request->postData('postJson');
        $data = json_decode($postJson, true);
        $res = [];

        if($data[0]) {
            foreach($data as $line) {
                $collection = new Collection($line);

                if($collection->isValid()) {
                    $this->managers->getManagerOf('collection')->save($collection);

                    $line['collectionId'] = $collection->getCollectionId();

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
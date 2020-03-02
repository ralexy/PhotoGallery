<?php
namespace Library\Entities;

class PictureCollection extends \Library\Entity
{
    protected $pictureId,
              $collectionId,
              $orderShow;

    public function __construct(array $donnees = array())
    {
        parent::__construct($donnees);
    }

    public function isValid() {
        return $this->pictureId && $this->collectionId && $this->orderShow;
    }

    // Setters
    public function setPictureId(int $pictureId) {
        $this->pictureId = (int) $pictureId;
    }

    public function setCollectionId(int $collectionId) {
        $this->collectionId = (int) $collectionId;
    }

    public function setOrderShow(int $orderShow) {
        $this->orderShow = (int) $orderShow;
    }

    // Getters
    public function getPictureId() { return $this->pictureId; }
    public function getCollectionId() { return $this->collectionId; }
    public function getOrderShow() { return $this->orderShow; }
}
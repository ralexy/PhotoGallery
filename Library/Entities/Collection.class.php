<?php
namespace Library\Entities;

class Collection extends \Library\Entity
{
    protected $collectionId,
              $name,
              $description,
              $firstPictureId;

    public function __construct(array $donnees = array()) {
        parent::__construct($donnees);
    }

    public function isValid() {
        return $this->name && $this->description;
    }

    // Setters
    public function setCollectionId(int $collectionId) {
        $this->collectionId = (int) $collectionId;
    }

    public function setName(string $name) {
        $this->name = htmlspecialchars($name);
    }

    public function setDescription(string $description) {
        $this->description = htmlspecialchars($description);
    }

    public function setFirstPictureId(int $firstPictureId) {
        $this->firstPictureId = $firstPictureId;
    }

    // Getters
    public function getCollectionId() { return $this->collectionId; }
    public function getName() { return $this->name; }
    public function getDescription() { return $this->description; }
    public function getFirstPictureId() { return $this->firstPictureId; }
}
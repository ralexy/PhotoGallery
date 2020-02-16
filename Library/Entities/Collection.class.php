<?php
namespace \Library\Entities;

class Collection extends Library\Entity
{
    protected $collectionId,
              $name,
              $description,
              $creator;

    public function __construct(array $donnees = array()) {
        parent::__construct($donnees);
    }

    public function isValid() {
        return $this->collectionId && $this->name && $this->description && $this->creator;
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

    public function setCreator(int $creator) {
        $this->crator = (int) $creator;
    }

    // Getters
    public function getCollectionId() { return $this->collectionId; }
    public function getName() { return $this->name; }
    public function getDescription() { return $this->description; }
    public function getCreator() { return $this->creator; }
}
<?php
namespace \Library\Entities;

class Artist extends Library\Entity
{
    protected $authorId,
              $firstName,
              $lastName,
              $birthDate,
              $deathDate,
              $biography;

    public function __construct(array $donnees = array())
    {
        parent::__construct($donnees);
    }

    public function isValid() {
        return $this->authorId && $this->firstName && $this->lastName && $this->birthDate && $this->biography;
    }

    // Setters
    public function setAuthorId(int $authorId) {
        $this->authorId = (int) $authorId;
    }

    public function setFirstName(string $firstName) {
        $this->firstName = htmlspecialchars($firstName);
    }

    public function setLastName(string $lastName) {
        $this->lastName = htmlspecialchars($lastName);
    }

    public function birthDate(\DateTime $birthDate) {
        $this->birthDate = $birthDate;
    }

    public function deathDate(\DateTime $deathDate) {
        $this->deathDate = $deathDate;
    }

    public function setBiography(string $biography) {
        $this->biography = htmlspecialchars($biography);
    }

    // Getters
    public function getAuthorId() { return $this->authorId; }
    public function getFirstName() { return $this->firstName; }
    public function getLastName() { return $this->lastName; }
    public function getBirthDate() { return $this->birthDate; }
    public function getDeathDate() { return $this->deathDate; }
    public function getBiography() { return $this->biography; }
}
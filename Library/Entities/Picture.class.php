<?php
namespace Library\Entities;

class Picture extends \Library\Entity
{
    protected $pictureId,
              $title,
              $description,
              $sourceUrl,
              $artist,
              $year;

    public function __construct(array $donnees = array())
    {
        parent::__construct($donnees);
    }

    public function isValid() {
        return $this->pictureId && $this->title && $this->description && $this->sourceUrl && $this->artist;
    }

    // Setters
    public function setPictureId(int $pictureId) {
        $this->pictureId = (int) $pictureId;
    }

    public function setTitle(string $title) {
        $this->title = htmlspecialchars($title);
    }

    public function setDescription(string $description) {
        $this->description = htmlspecialchars($description);
    }

    public function setSourceUrl(string $sourceUrl) {
        $this->sourceUrl = htmlspecialchars($sourceUrl);
    }
    public function setArtist(int $artist) {
        $this->artist = (int) $artist;
    }

    public function setYear(\DateTime $year) {
        $this->year = $year;
    }

    // Getters
    public function getPictureId() { return $this->pictureId; }
    public function getTitle() { return $this->title; }
    public function getDescription() { return $this->description; }
    public function getSourceUrl() { return $this->sourceUrl; }
    public function getArtist() { return $this->artist; }
    public function getYear() { return $this->year; }
}
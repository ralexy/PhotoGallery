<?php
namespace \Library\Entities;

class Member extends Library\Entity
{
    protected $memberId,
              $login,
              $password;

    const INVALID_PASSWORD = 1;
    const INVALID_EMAIL = 2;

    public function __construct(array $donnees = array())
    {
        parent::__construct($donnees);
    }

    public function isValid() {
        return $this->memberId && $this->login && $this->password && !$this->erreurs;
    }

    public function isNew() {
        return !$this->memberId;
    }

    // Setters
    public function setMemberId(int $memberId) {
        $this->memberId = (int) $memberId;
    }

    public function setLogin(string $login) {
        $this->login = htmlspecialchars($login);
    }

    public function setEmail(string $email) {
        if(!filter_var($email, FILTER_VALIDATE_EMAIL))
            $this->erreurs[] = self::INVALID_EMAIL;

        else
            $this->email = $email;
    }

    public function setPassword(string $password) {
        if($password || strlen($password) < 5 || !is_string($password))
            $this->erreurs[] = self::INVALID_PASSWORD;

        else
            $this->password = $password;
    }

    // Getters
    public function getMemberId() { return $this->memberId; }
    public function getLogin() { return $this->login; }
    public function getPassword() { return $this->password; }
}
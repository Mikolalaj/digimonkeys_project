# Digimonkeys Project - Video App

Aplikacja umożliwia dodawanie ulubionych filmów do bazy danych.
Filmy mogą pochodzić z YouTube (miał być też Vimeo ale od kilku dni nie działa im system generowania kluczy API)

Po kliknięciu w miniaturkę, można obejrzeć film w modalu na stronie. Po kliknięciu w tytuł film otwiera się w nowej karcie.

Aplikacja na razie nie jest dostosowana do urządzeń mobilnych.

Filmy można dodawać za pomocą linków z YouTube lub id filmu, np.:
 - https://www.youtube.com/watch?v=4JOAqRS_lms
 - https://youtu.be/vJ3a_AuEW18
 - vJ3a_AuEW18

Istnieje możliwość załadowania gotowego zestawu filmów, po wciśnięciu przycisku "Load Demo".

### Aby uruchomić aplikację:

 - W głównym katalogu projektu
     - `docker compose up -d`
 - W katalogu /api
     - w pliku .env uzupełnij JWT_SECRET i YOUTUBE_API_KEY
     - `npm install`
     - `npm start`
 - W katalogu /client
     - w pliku .env uzupełnij JWT_SECRET i YOUTUBE_API_KEY
     - `npm install`
     - `npm start`

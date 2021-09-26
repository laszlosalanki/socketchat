Rendszerterv
---

1. A rendszer célja

    Számtalan webes, vagy applikációból használható valós idejű chat applikáció található manapság az interneten. Közös tulajdonságuk, hogy e-mail cím - jelszó kombinációval kell
    legalább regisztrálnunk a használatukhoz, gyakran ez névvel, felhasználónévvel, nemmel, születési idővel és sok más adattal is kiegészül. A rendszer célja az ezen problémára megálmodott projekt megvalósítása, azaz egy egyszerű, letisztult, kevésbé megterhelő
    böngészős alkalmazás fejlesztése, mely használatához elegendő egy felhasználónév és egy jelszó.

2. Projektterv
  
  - Projekt vezető: Kántor Dániel
  
  - Résztvevők: Salánki László, Csirak Dávid, Kántor Dániel
  
  - Felelősségi körök:
    
    - Backend: Salánki László Balázs, Kántor Dániel
      - Szerepkör: 
        - API endpointok létrehozása
        - Adatbázis elkészítése
        - Autentikáció
        - Chat szerver
    
    - Frontend: Csirak Dávid
      - Szerepkör: 
        - Bejelntkező felület létrehozása
        - Regisztráció felület létrehozáa
        - Chat felület létrehozása

  - Mérföldkövek:
    
    1. Egy alap rendszer és önálló weboldal létrehozása ( összeköttetés nelkül )
    2. Az 1.0 -ás verzió elkészítése, kiadása
  
5. Követelmények

    - Felhasználói fiók létrehozása, azonosítása.
    - Egyedi felhasználónevek.
    - Jelszó biztonsági megszorítások.
    - Bizalmas információk titkosítása (pl. jelszó).
    - Nem tárolódó üzenetek.
    - Kijelentkezés, visszairányítás egy bejelentkező oldalra.

9. Adatbázis terv

    Az adatok (felhasználónév, jelszó) MongoDB (nosql) adatbázisban történik.

10. Fizikai környezet

    - A SocketChat egy webböngészőben használható applikáció, különösebb működést érintő követelmény nincs ezzel kapcsolatban. Platform-független, azaz bármilyen eszközről használható, amelyen a böngésző is (és van internet kapcsolat).
    - Fejlesztői környezet:
      - Visual Studio Code
        - Live Server bővítmény
      - IntelliJ WebStorm
      - Google Chrome, Firefox 
      
      A felsorolt szoftverek vagy ingyenesek, vagy pedig a projekt megkezdése előtt is rendelkezésre álltak. 

11. Tesztterv

    A fejlesztési folyamat során kiemelt szerepe volt a tesztelésnek. Mind a backend, mind a frontend részen fontos volt, hogy az adott funkció tökéletesen müködjön. Itt alkalmaztunk black box és white box tesztelést.

13. Karbantartási terv
  
    Felhasználói visszajelzésekre a hibákat minnél hamarabb javítjuk. A projekt függőségeit a lehető legújabb, illetve legbiztonágosabb verzióra frissítjük. Ha egy függőség sebezhetőséget tartalmaz, azonnali frissítést igényel.
  

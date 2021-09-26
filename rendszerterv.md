Rendszerterv
---
2. Projektterv
  
  - Projekt vezető: Kántor Dániel
  
  - Résztvevők: Salánki László, Csirak Dávid, Kántor Dániel
  
  - Felelősségi körök:
    
    - Backend: Salánki László, Kántor Dániel
      - Szerepkör: 
        - API endpointok létrehozása
        - Adatbázis elkészítése
        - Autentikáció
        - Chat szerver
    
    - Frontend: Csirka Dávid
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

11. Tesztterv

  A fejlesztési folyamat során kiemelt szerepe volt a tesztelésnek. Mind a backend, mind a frontend részen fontos volt, hogy az adott funkció tökéletesen müködjön. Itt alkalmaztunk black box és white box tesztelést.

13. Karbantartási terv
  
    Felhasználói visszajelzésekre a hibákat minnél hamarabb javítjuk. A projekt függőségeit a lehető legújabb, illetve legbiztonágosabb verzióra frissítjük. Ha egy függőség sebezhetőséget tartalmaz, azonnali frissítést igényel.
  

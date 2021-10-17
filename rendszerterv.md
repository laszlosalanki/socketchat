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
    
    - Frontend: Csirák Dávid
      - Szerepkör: 
        - Bejelntkező felület létrehozása
        - Regisztráció felület létrehozáa
        - Chat felület létrehozása

  - Mérföldkövek:
    1. Alap felhasználói felület megtervezése
    2. Alap bejelentkező felület lérehozása
    3. Alap regisztrációs felület létrehozása
    4. Alap kezelőfelület létrehozása (bejelentkezés utáni felület)
    5. API endpointok létrehozása
    6. A chat szerver létrehozása
    7. Az alkalmazás tesztelése
    8. Az 1.0 -ás verzió kiadása
  
4. Követelmények

    v1.0
    - Felhasználói fiók létrehozása, azonosítása.
    - Egyedi felhasználónevek.
    - Jelszó biztonsági megszorítások.
    - Bizalmas információk titkosítása (pl. jelszó).
    - Nem tárolódó üzenetek.
    - Kijelentkezés, visszairányítás egy bejelentkező oldalra.

    v2.0
    1. Bejelentkezési lehetőségek
        - Google
        - GitHub
        - Atlassian

    2. Chat szobák
        - Létrehozás
        - Törlés
        - Becsatlakozás
        - Szoba alapértelmezett nyelvének beállítása
        - Létrehozott szobák nyelvének megjelenítése
        - Szobákban küldött üzenetek eltárolása
        - Szobákban küldött üzenetek betöltése
        - Üzenetek küldési idejének megjelenítése

    3. Fordítás
        - Preferrált nyelv beállítása (ki/be kapcsolása)
        - A szoba alapértelmezett nyelve alapján történő fordítás
        - A fordítás alapértemezetten be legyen kapcsolva
        - Figyelmeztetés a fordítás bekapcsolásánál (csak az adott felhasználónak) (ki/be kapcsolása)
        - A fordítási beállítás elmentése az adatbázisban

    4. Felhasználó
        - Háttér állítása
        - Használati idő mérése
        - Mért idő eltárolása
        - Mért idő megjelenítése

    5. Új design
        - Chat szoba kezelési felülete
        - Személyreszabási lehetőségek

    6. (Nem garantált)
        - Spellcheck?

    | Időelosztási terv | 1. hét | 2. hét | 3. hét | 4. hét | 5. hét | 6. hét | 7. hét | 8. hét |
    | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
    | - | 1. feature, 5. feature | 2. feature | 2. feature | 3. feature | 3. feature | 4. feature | tesztelés és 6. feature | bemutatás |

5. Funkcionális terv

    Az applikáció az alábbi funkciókkal lesz ellátva:
      - Bejelentkezés
        - Felhasználónév - jelszó páros
        - Bejelentkezéskor megjelenik a csatlakozó felhasználó neve a chat felületen
      - Regisztráció
        - Felhasználónév - jelszó - ismételt jelszó 
      - Chat szoba kezelő felület
        - TextBox: új szoba létrehozásához megadható a szoba neve
        - Dropdown list: az új szoba preferált nyelve
        - Button: szoba létrehozása és csatlakozás
        - Dropdown list: meglévő szobák listája
        - Button: csatlakozás a kiválasztott szobához
      - Chat szoba felület
        - Szoba résztvevőinek megjelenítése
        - Szoba nevének megjelenítése
        - Szoba alapértelmezett nyelvének megjelenítése
        - Fordítás beállító felület
        - Kijelentkező gomb
        - Szoba elhagyása gomb
        - Elküldött üzenetek megjelenítése
        - Beviteli mező az elküldendő üzenetnek
        - Üzenet küldése gomb
        - Háttér választó felület
      - Kijelentkezés
        - Kijelentkezéskor megjelenik a lecsatlakozó felhasználó neve a chat felületen
        - A böngésző visszairányít a bejelentkezési/regisztrációs felületre
      - Szoba elhagyása
        - Szoba elhagyásánál megjelenik a szobát elhagyó felhasználó neve a chat felületen
        - A böngésző visszairányít a chat szoba kezelő felületre

9. Adatbázis terv

    Az adatok (felhasználónév, jelszó, üzenetek) MongoDB (nosql) adatbázisban történik.
    
    Az új verzióban (v2.0) eltárolásra kerülnek a chatszobák adatai, felhasználók beállításai, a chatszobákban küldött üzenetek, illetve az egyes felhasználók által eltöltött idő az alkalmazásban. Amennyiben a felhasználó valamilyen harmadik fél által nyújtott bejelentkezést (Elérhető: Google, GitHub, Atlassian) használ az alkalmazásba történő belépéshez, a hozzá tartozó felhasználói azonosító is eltárolásra kerül.

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

12. Telepítési terv

    A rendszer nem igényel telepítést, böngészőből futtatható a SocketChat.

13. Karbantartási terv
  
    Felhasználói visszajelzésekre a hibákat minnél hamarabb javítjuk. A projekt függőségeit a lehető legújabb, illetve legbiztonágosabb verzióra frissítjük. Ha egy függőség sebezhetőséget tartalmaz, azonnali frissítést igényel.
  

Funkcionális specifikáció
=========================

1. Jelenlegi helyzet leírása

    Az egyszerű, webes SocketChat appunkkal kapcsolatos feladatokat felosztottuk: Front-end (UI), Messaging, Back-end. Folyamatban van a design és a funkciók elhelyezésének/elérésének megbeszélése.

2. Vágyálom rendszer leírása

    A SocketChat egy egyszerű, broadcast alapú, webes, valós idejű chat applikáció lesz. A felhasználót egy regisztrációs/bejelentkezési felület fogadja majd. Amennyiben korábban regisztrált (felhasználónév, jelszó) már az oldalon, akkor a belépést, ha nem, akkor pedig a bejelentkezést követően a szoftver át fogja irányítani a chat felületre. Itt megtekinthetőek lesznek az üzenetek és a felhasználók, a felület alján pedig a szövegbeviteli mező és a küldés gomb.

4. Jelenlegi üzleti folyamatok modellje.

    Napjainkban már mindenki a fejlett és híres chat alkalmazásokat használja, mint például Facebook Messenger, WhatsApp, Discord amelyek sok más funkciókkal is rendelkeznek a chatelelésen kívűl. Egy vállalati környezeten belül tárgyalt információkat az ott dolgozó embereknek nem biztos, hogy biztonságos egy ilyen nyílt felületen megosztani egymás között valamint nem is biztos, hogy szükséges egy ennyire összetett felületet használni. Erre lehet jó egy egyszerű belső kommunikációra képes webalkalmazás.

5. Igényelt üzleti folyamatok modellje.

    Ez a webalkalmazás egy lehetőség arra, hogy bárki fel tudja használni információ közlés céljából, magán célokra és minimális vagy akár valótlan adatok megadásával.
    
6. Követelmény lista

    1. Szükséges lesz egy olyan oldalra, ahol a felhasználók tudnak fiókot létrehozni. Ehhez egy regisztrációs API-t, illetve egy frontend oldalt kell tervezni.
    2. Egy felhasználónév csak egyszer szerepeljen a rendszerben, tehát egyedinek kell lennie.
    3. A jelszónak is kellenének bizonyos megszorításokk, mint például minimális hossz, szükséges karakterek (kis -és nagybetü, szám). Figyelni kell arra, hogy ezeket az adatokat a szerver oldalon is érvényesítsük.
    4.  A bizalmasabb információt, mint a jelszót titkosítva kell eltárolnunk (nem visszafejthetően, hash-elve).
    5.  Az üzenetek ne kerüljenek tárolára adatbázisban, csak az adott munkamenetben lehessen látni a mások által, illetve a felhasználó maga által küldött üzeneteit.
    6.  Belépés után a felhasználók tudjanak egymással valós időben kommunikálni, és lássák, hogy kik elérhetőek (felhasználónevüket).
    7.  Kilépés után már csak a többi, még csatlakozott felhasználónak látszódjanak az üzenetek, amit a kijelentkezett felhasználó küldött, illetve az adott felhasználót dobja vissza egy bejelentkező, vagy regisztrációs felületre.

7. Használati esetek

    A felhasználó az alábbi tevékenységeket végezheti:
        -Az oldalra regisztrálhat(Register) egy új felhasználónév és egy jelszó megadásával (register gomb).
        -Az oldalra bejelentkezhet(Login) egy már regisztrált felhasználónév és jelszó párossal (login gomb).
        -Regisztrálást követően a regisztrált felhasználóval be kell jelentkezni a chateléshez (login).
        -Bejelentkezést követően lehetőség van a kijelentkezésre (kijelentkezés gomb), ekkor a bejelentkezéshez lesz irányítva a felhasználó.
        -Bejelentkezést követően lehetőség van üzenetet írni az üzenet dobozra kattintva valamint küldésre a (Send gomb) lenyomásával.
        -A felhasználónak lehetősége van megtekinteni a jelenleg aktív felhasználókat.
        -A felhasználónak lehetősége van megtekinteni ki csatlakozott be/ki a beszélgetésbe.
        
8. Megfeleltetés

    Regisztráció:
    - API és regisztrációs felület (registration form)
    - Felhasználónév:
        - Egyedinek kell lennie
    - Jelszó:
        - Minimum 6 karakteres, legalább 1 kis és nagy betüt kell tartalmaznia, illetve 1 számot.

    Bejelentkezés:
    - API és bejelentkező felület (login form)
    - Azonosítás tokenekkel történik, amelyek kijelentkezésig érvényesek.

    Kilépés:
    - Kilépés után a felhasználó nem látja ismét a kijelentkezés előtti állapotot (régebbi üzeneteket), nem tárolódnak adatbázisban.
    - Kilépés után visszadobja a bejelentkező felületre a felhasználót.

    Chat:
    - API és felület
    - Megjeleníti az aktív felhasználókat és üzeneteiket valós időben.
        
9. Képernyő tervek
    
    Egy olyan webes chat applikáció, ahól valós időben látjuk a résztvevők üzeneteit és neveit. Fontos része az applikációnak, hogy láthatóak legyenek az elérhető felhasználók, illetve ezeknek a megjelenítőknek változzon az állapota valós időben, amennyiben egy kliens csatlakozás, vagy kilépés történik.

10. Forgató könyvek

    Ha egy felhasználó meglátogatja a weboldalt, lehetősége van regisztrálni, vagy bejelentkezni.
    Amennyiben a regisztrációt választja, megfelelő felhasználónév és jelszó választása után létrehozhatja a fiókját.
    Amennyiben a felhasználó be szeretne jelentkezni, megfelelő felhasználónév és jelszó használatával ezt megteheti a bejelentkezési felületen.
    Bejelentkezés után láthatóvá válik a chat felület, ahol tud kommunikálni (üzenetet küldeni) a többi, aktív felhasználóval.
    Az új, bejelentkezett felhasználó aktív státusszal látható lesz a többi résztvevő számára.
    Üzenet küldése után megjelenik minden fél számára az üzenet, szinte azonnal.
    Kijelentkezésnél a felhasználó eltűnik az aktív felhasználók listjáról.

11. Funkció – követelmény megfeleltetés

    A regisztrációhoz és bejelentkezéshez egy közös HTML (+CSS) lap készül, itt egy kattintással dönthet majd a felhasználó, hogy melyiket kívánja használni. A felhasználónévre és jelszóra vonatkozó megszorítások megsértéséről egy - a regisztrációs/bejelentkezési blokk alatt megjelenő - üzenet fogja informálni a felhasználót (ahogy a regisztráció sikerességéről is). HTML (+CSS) lap készül az üzenetek megjelenítésére is, itt lesz lehetőség üzenetet küldeni és megtekinteni, valamint listázni az elérhető felhasználókat.

12. Fogalomszótár

    Regisztráció: Az a folyamat, mely során a felhasználó adatai megadásával új fiókot tud létrehozni.

    Bejelentkezés: Az a folyamat, mely során a felhasználó be tud lépni adataival a saját fiókjába, amit előzőleg létrehozott.

    Kijelentkezés: Az a folyamat, mely során a felhasználó ki tud lépni a saját fiókjából, majd visszakerül a bejelentkezéshez.

    Üzenet: A közlendő információ.

    Üzenet küldés: A közlendő információ publikálása.

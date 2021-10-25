Követelmény specifikáció
========================

1. Jelenlegi helyzet leírása

    Szerettünk volna egy olyan egyszerű, ingyenes webes chat felületet készíteni, amely e-mail cím megadása nélkül is használható, ugyanis amikkel találkoztunk, mind ehhez voltak kötve. A létező alternatívák felhasználói felülete és funkciói sokszor nem könnyítik meg a felhasználó helyzetét, és a reszponzív felhasználást is nehezítik, lassítják (játékok, stb...). A 2.0 verzió funkcióinak implementálása folyamatban van...

2. Vágyálom rendszer leírása

    A projekt célja egy olyan egyszerű webes chat felület készítése HTML - CSS - NestJS - socket.io alapokon, amely használatához e-mail címre nem, csupán felhasználónévre és jelszóra van szükség. Az egyszerű design, valamint a felesleges funkcionalitás elhagyása egy gyorsabb, lényegretörőbb rendszerért. 

    A 2.0 verzióban lehetőség lesz Google, GitHub vagy Atlassain bejelentkezésre, ezzel gyorsítva a regisztráció és/vagy bejelentkezés folyamatát. 
    
    A chat funkció alapvető változáson megy keresztül. A felhasználó chat szobákat hozhat létre, vagy csatlakozhat már meglévőkbe, valamint ezeket törölheti is. A szobák alapértelmezett nyelve létrehozásnál megadható lesz. Az elküldött üzenetek mellett megjelenik azok küldési ideje, és ha egy felhasználó kilép, akkor visszalépés után ott folytathatja az üzenetek olvasását, ahol abbahagyta.

    Állítható funkció lesz az automatikus fordítás Google API segítségével, bár ez alapértelmezetten engedélyezett. A célnyelv minden esetben a szoba preferált nyelve. A felhasználó a beállítások megváltozásáról (csak számára megjelenő) üzenetben értesül, a fordítási beállításokat az app adatbázisban tárolja.

    Személyre szabási lehetőséggel bővülnek a funkciók, mint pl. a háttér beállítása. 

4. Jelenlegi üzleti folyamatok modellje.

    Tegyük fel, hogy a megrendelőnk szervezete jelenleg rendelkezik az üzemeltetés, könyvelés és megrendelés üzleti folyamatokkal, valamint az iroda és reklám üzleti entitásokkal.
    A jelenlegi üzleti folyamatok bővültek, fejlődtek valamint a vállalat is több dologgal foglalkozik egyszerre ezáltal az alkalmazottak száma is jelentősen megnőtt.

5.  Igényelt üzleti folyamatok modellje.

    A megrendelőnk szervezete igényli a szolgáltatást, mint üzleti folyamatot amelyet a szoftverünk támogatni fog. A webes chat felületünk egy ingyenes szolgáltatást fog nyújtani bárki számára aki írásos kapcsolatba akar lépni más felhasználókkal. Ezt a megrendelőnk szervezete akár egy belső kommunikációs rendszerként is felhasználhatja. A vevő szervezet egy igényelt üzleti entitása a weboldal, amelyen a szolgáltatás, mint üzleti folyamat tevékenységet végez. Ezt a kulcsfontosságú entitást használja ki a mi alkalmazásunk is, hiszen egy webes felületen lehet majd használni az alkalmazást.
    A megrendelőnk vállalata fejlődött, ezért a belső kommunikáció hatékonysága érdekében az alkalmazásunk további funkciókat igényel.
    Ezeket a funkciókat az alkalmazottak illetve a vezetőség a funkcionális specifikáció 4. pontja alapján kell elképzelnie.

6. Követelény lista
    
    1. Felhasználói fiók létrehozása, azonosítása.
    2. Egyedi felhasználónevek.
    3. Jelszó biztonsági megszorítások.
    4. Bizalmas információk titkosítása (pl. jelszó).
    5. Nem tárolódó üzenetek.
    6. Elérhető felhasználók listája.
    7. Kijelentkezés, visszairányítás egy bejelentkező oldalra.

8. Fogalomszótár

    Chat felület: Az a felület a weboldalon, ahol valós időben történik az új üzenetek megjelenítése, illetve elküldése. 

    Design: Az oldal stílusa.

    Regisztráció: Az a folyamat, mely során a felhasználó adatai megadásával új fiókot tud létrehozni.

    Bejelentkezés: Az a folyamat, mely során a felhasználó be tud lépni adataival a saját fiókjába, amit előzőleg létrehozott.

    Socket.IO: Egy olyan JavaScript könyvtár, amely lehetővé teszi a valós idejű, kétirányú kommunikációt (küldő/fogadó) a böngésző és szerver között. Ennek a könyvtárnak az implementációja számos más nyelvben is elérhető, mint például C++, Java, C#, vagy akár Swift.

    NestJS: Egy Node.Js keretrendszer, amellyel megbízható, és hatékony szerver oldali alkalmazások készítését teszi lehetővé.
    
    Node.Js: A Node.Js egy nyílt forráskódú, platformfüggetlen, JavaScript futási környezet, amely lehetővé teszi a JavaScript kód futtatását böngészők keretein kívül.
    
    Spellcheck API: Az API endpoint-ra küldött kérés megadja, hogy az adott szó helyesen van-e leírva, vagy hogyan kellene leírni az adott szót az adott nyelven.

Követelmény specifikáció
========================

1. Jelenlegi helyzet

    Szerettünk volna egy olyan egyszerű, ingyenes webes chat felületet készíteni, amely e-mail cím megadása nélkül is használható, ugyanis amikkel találkoztunk, mind ehhez voltak kötve. A létező alternatívák felhasználói felülete és funkciói sokszor nem könnyítik meg a felhasználó helyzetét, és a reszponzív felhasználást is nehezítik, lassítják (játékok, stb...).

2. Vágyálomrendszer

    A project célja egy olyan egyszerű webes chat felület készítése HTML - CSS - NestJS - socket.io alapokon, amely e-mail használatához e-mail címre nem, csupán felhasználónévre és jelszóra van szükség. Az egyszerű design, valamint a felesleges funkcionalitás elhagyása egy gyorsabb, lényegretörőbb rendszerért.

3. Jelenlegi üzleti folyamatok modellje.

    Tegyük fel, hogy a megrendelőnk szervezete jelenleg rendelkezik az üzemeltetés, könyvelés és megrendelés üzleti folyamatokkal, valamint az iroda és reklám üzleti entitásokkal.

4.  Igényelt üzleti folyamatok modellje.

    A megrendelőnk szervezete igényli a szolgáltatást, mint üzleti folyamatot amelyet a szoftverünk támogatni fog. A webes chat felületünk egy ingyenes szolgáltatást fog nyújtani bárki számára aki írásos kapcsolatba akar lépni más felhasználókkal. Ezt a megrendelőnk szervezete akár egy belső kommunikációs rendszerként is felhasználhatja. A vevő szervezet egy igényelt üzleti entitása a weboldal, amelyen a szolgáltatás, mint üzleti folyamat tevékenységet végez. Ezt a kulcsfontosságú entitást használja ki a mi alkalmazásunk is, hiszen egy webes felületen lehet majd használni az alkalmazást.

6. Követelény lista
   Szükséges lesz egy olyan oldalrészre, ahol a felhasználók tudnak fiókot létrehozni. Egy felhasználónév csak egyszer szerepeljen a rendszerben, tehát egyedinek kell lennie. A jelszónak is kellenének bizonyos megszorításokk, mint például minimális hossz, szükséges karakterek (kis -és nagybetü, szám). Figyelni kell arra, hogy ezeket az adatokat a szerver oldalon is érvényesítsük. A bizalmasabb információt, mint a jelszót titkosítva kell eltárolnunk. E-mail cím nem szükséges a felülethez. Belépés után a felhasználók tudjanak egymással valós időben kommunikálni, és lássák, hogy kik elérhetőek (felhasználónevüket). Az üzenetek ne kerüljenek tárolára adatbázisban, csak az adott munkamenetben lehessen látni a mások által, illetve a felhasználó maga által küldött üzeneteit. Kilépés után már csak a többi, még csatlakozott felhasználónak látszódjanak az üzenetek, amit a kijelentkezett felhasználó küldött, illetve az adott felhasználót dobja vissza egy bejelentkező, vagy regisztrációs felületre.

8. Fogalomszótár
   Chat felület: Az a felület a weboldalon, ahol valós időben történik az új üzenetek megjelenítése, illetve elküldése. 

   Design: Az oldal stílusa.

    Regisztráció: Az a folyamat, mely során a felhasználó adatai megadásával új fiókot tud létrehozni.

   Bejelentkezés: Az a folyamat, mely során a felhasználó be tud lépni adataival a saját fiókjába, amit előzőleg létrehozott.

   Socket.IO: Egy olyan JavaScript könyvtár, amely lehetővé teszi a valós idejű, kétirányú kommunikációt (küldő/fogadó) a böngésző és szerver között. Ennek a könyvtárnak az implementációja számos más nyelvben is elérhető, mint például C++, Java, C#, vagy akár Swift.

   NestJS: Egy Node.Js keretrendszer, amellyel megbízható, és hatékony szerver oldali alkalmazások készítését teszi lehetővé.

   Node.Js: A Node.Js egy nyílt forráskódú, platformfüggetlen, JavaScript futási környezet, amely lehetővé teszi a JavaScript kód futtatását böngészők keretein kívül.

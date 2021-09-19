Funkcionális specifikáció
=========================

1. Jelenlegi helyzet leírása

    Az egyszerű, webes SocketChat appunkkal kapcsolatos feladatokat felosztottuk: Front-end (UI), Messaging, Back-end. Folyamatban van a design és a funkciók elhelyezésének/elérésének megbeszélése.

2. Vágyálom rendszer leírása

    A SocketChat egy egyszerű, broadcast alapú, webes, valós idejű chat applikáció lesz. A felhasználót egy regisztrációs/bejelentkezési felület fogadja majd. Amennyiben korábban regisztrált (felhasználónév, jelszó) már az oldalon, akkor a belépést, ha nem, akkor pedig a bejelentkezést követően a szoftver át fogja irányítani a chat felületre. Itt megtekinthetőek lesznek az üzenetek és a felhasználók, a felület alján pedig a szövegbeviteli mező és a küldés gomb.

11. Funkció – követelmény megfeleltetés

    A regisztrációhoz és bejelentkezéshez egy közös HTML (+CSS) lap készül, itt egy kattintással dönthet majd a felhasználó, hogy melyiket kívánja használni. A felhasználónévre és jelszóra vonatkozó megszorítások megsértéséről egy - a regisztrációs/bejelentkezési blokk alatt megjelenő - üzenet fogja informálni a felhasználót (ahogy a regisztráció sikerességéről is). HTML (+CSS) lap készül az üzenetek megjelenítésére is, itt lesz lehetőség üzenetet küldeni és megtekinteni, valamint listázni az elérhető felhasználókat.
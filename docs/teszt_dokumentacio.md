Teszt dokumentáció
==================

A __SocketChat__ alkalmazás tesztelése két fő szempont szerint történt:

1. Megjelenés

        1/a. Böngésző méretezésekor a tartalom igazodik.

        1/b. A chat felület témája megfelelően változik.

        1/c. A szobában látható a bent lévő felhasználók listája.

2. Funkciók

        2/a. Több felhasználó regisztrálása.

        2/b. Több felhasználó beléptetése.

        2/c. Szoba létrehozása.

        2/d. Üzenet küldése a szoba nyelvén.

        2/e. Szoba törlése.

        2/f. Belépés külső fiókkal.

A teszteléshez használt böngésző: __Firefox__.


## 1/a.

    A méretezés helyességének vizsgálatához négy ablakban nyitottuk meg az appot. Ahogy a képen látszik, valamennyi tartalma helyesen jelent meg, a kicsinyítés ellenére is.

![Kis ablak, kicsinyített login](test_screen/screen_login.png)

    Kicsinítés nélkül sem tolódik el a háttérkép, és a bejelentkezési panel.

![Kis ablak, sima login](test_screen/screen_login_1.png)

    Ez igaz a chat szoba kezelő, és a chat felületre is.

![Chat szoba, méretezett](test_screen/screen_room_selector.png)


## 1/b.

    Az alapértelmezett témától eltérőt választva a chat felület színe megváltozik.

![Chat szoba témája](test_screen/screen_room_theme.png)


## 1/c.

    A szobában a bal oldalsó panelen látható, hogy ebben az esetben egyszerre öt felhasználó lépett be a szobába.

![Chat szoba felhasználók](test_screen/screen_room_users.png)


## 2/a.

    A felhasználó-létrehozást tíz felhasználóra teszteltük, nem tapasztaltunk problémát. Ideális esetben:

![Sikeres regisztráció](test_screen/screen_succ_reg.png)

    Ha olyan felhasználónévvel próbáltunk regisztrálni, ami már foglalt, akkor az eredmény:

![Felhasználónév foglalt](test_screen/screen_usr_taken.png)

    Túl egyszerű jelszó megadása esetén szintén szólt az app:

![Gyenge jelszó](test_screen/screen_weak_pass.png)


## 2/b.

    Hibás felhasználónév vagy jelszó esetén:

![Hibás felhasználónév vagy jelszó](test_screen/screen_wrong_pass.png)

    Párhuzamosan öt felhasználó beléptetésével próbálkoztunk, nem jelentett gondot a rendszernek.

![5 felhasználó egy időben](test_screen/screen_conn_5_usr.png)


## 2/c.

    Szobát bármely felhasználó létrehozhat:

![Szoba létrehozása](test_screen/screen_room_created.png)


## 2/d.

    Ahogy a 2/b. képen is látszik, a laszlosalanki által küldött üzenet minden felhasználónak megjelenik a szobában, és a nyelve a szoba alapértelmezett nyelve (ebben az esetben magyar).


## 2/e.

    Adott szobát csak az törölhet, aki létrehozta:

![Szoba törlése](test_screen/screen_delete_room_failed.png)

    Ellenben, ha jogosult felhasználó törli a szobát, akkor minden (a szobában tartózkodó) felhasználó visszakerül a szoba kezelő felületre.


## 2/f. 

    A Google, Github vagy Gitlab ikonokra kattintva lehetőség van ezen oldalakon regisztrált, már meglévő profilunkkal belépni. Mindhárom esetben a böngésző ezek bejelentkezési képernyőjére irányítja át a felhasználót.

![Google belépés](test_screen/screen_login_google.png)

![Github belépés](test_screen/screen_login_github.png)

![Gitlab belépés](test_screen/screen_login_gitlab.png)
# q-task

## Korišteni frameworci

* Vue.js - pomocu vue.js CLI-a napravljena inicijalizacija projekta sa webpack template-om.
* Axios - koristen za potrebe stvaranja requestova za spajanje na dani API.
* Vuex - koristen za potrebe spremanja podataka o sesiji.
* Bootstrap - koristen za dizajn elemenata i prikaz.

## Datoteka
```
├───src
│   │──App.vue - glavni Vue file. na njega je bindan router-view(koristi komponente iz foldera  
│   │     components) i header, cijela stranica je prikazana pomocu njega, a mjenjaju se samo        
│   │     komponente
│   │──main.js - glavni .js file unutar kojeg su importani moduli koji se koriste za rad. Builda vue  
│   │     aplikaciju
│   │──store.js - datoteka koja se koristi za pospremanje aktivne sesije... Unutra se nalaze funkcije 
│   │     za dohvacanje i pohranjivanje podataka koji su takoder pohranjeni unutra u objektu s imenom 
│   │     'state'.
│   │   
│   ├───components
│   │      ──AddBook.vue - Komponenta pomocu koje je omoguceno dodavanje nove knjige. Prije kreiranja,kao i na svakoj
│   │         komponenti u ovoj datoteci, provjerava se je li sesija istekla. Uslucaju da je, korisnik ce biti prebacen 
│   │         na stranicu za prijavu. Osim provjere sesije takoder dohvacaju se autori pomocu kojih se puni dropdown.
│   │         Funkcija addbook() sluzi za dodavanje knjige u bazu podataka.
│   │      ──Authors.vue - Komponenta koja sluzi za prikaz autora. Pokraj svakog zapisa u tablici postoji tipka cijim pritiskom
│   │         dobivamo pregled svih knjiga odabranog autora. Prikaz knjiga se odvija na komponenti Books.vue, a ID autora se
│   │         zapisuje 'store.js' datoteci pomocu action-a 'setAuthor'.
│   │      ──Books.vue - Komponenta koja sluzi za prikaz knjiga pojedinog autora. ID dobivamo pomocu gettera iz datoteke 'store.js'
│   │         Omoguceno brisanje svake od knjiga autora.Ako ne postoji nijedna knjiga autora pojavljuje se tipka koja nam omogucuje
│   │         brisanje autora.
│   │      ──Header.vue - Komponenta koja je cijelo vrijeme ucitana u 'App.vue' prije pogleda iz routera. Koristi razlicite gettere
│   │         iz 'store.js' za prikaz informacija. Omogucuje navigaciju po aplikaciji.
│   │      ──Login.vue - Komponenta za prijavu u sustav. 
│   │       
│   ├───router
│   │      ──index.js - datoteka sa zapisima koju componentu prikazati za pojedinu rutu .
│   │       
│   └───services
│          ──Api.js - komponenta za stvaranje axios zahtjeva. Exportana kao funkcija koja vraca request sa danim parametrima.
│          ──Authentificator.js - datoteka koja sadrzi funkcije za rad sa sesijom, stvaranje axios zahtjeva za prijavu i postavljanje 
│             autentifikacije unutar headera.
│          ──Repository.js - datoteka u kojoj se nalaze pozivi na API koji dohvacaju podatke.
```


# Current
**add possibility for emphazing and italiazing text**
### good links
 - https://stackoverflow.com/questions/50735181/insert-markdown-for-bold-and-italics-around-selection

Powinno sprawdzać skróty klawiszowe. ctrl-b ctrl-i
Raczej nie udostępniałbym możliwości wpisywania własnego md tylko traktował wszelki tekst jako raw text. Posty powinny byc generowane jakimś silnikiem do markdown.

Wygląda na to, że nie moge użyć textarea, ponieważ nie będzie mi generować pogrubionego tekstu itd. Trzeba bedzie użyć resizable diva. Powodzenia z Formikiem xDDDDDD

https://github.com/STRML/react-resizable
To może być całkiem okej. Da sie ustawić max-height i potem np. dac overflow: y.

## Posts
- [ ] add possibility for adding images
- [ ] onHover on date post should show exact date
- [ ] iReady profile menubar (?)
- [ ] if there is none posts from for example 6 hours there should be info about this
- [ ] comments


## Miscellaneous & long-term
- [ ] realtime checking username on register
- [ ] hover on plus on post should show list of users
- [ ] add role: user, mod, admin 
- [ ] wykop-alike tags
- [ ] deleting posts
- [ ] adding images to post on-drop
- [ ] PWA
- [ ] oberved user
  - [ ] info about observed users
  - [ ] notify about new posts from observed users (firebase allow this)

## Context API
- [ ] themes
- [ ] i18n (polish + english will be fine)

## Profile page
- [ ] 

## Firebase
- [ ] ain't sure about security of doing stuff like liking posts etc (check this out)

# Design
- [ ] xD desing everything
- [ ] name?
- [ ] 404
- [ ] RWD

## CSS
- [ ] card style should be mixin
- [ ] probably theming could be done simply by adding global mood and dark classes - not in every class

## Implementation details

- [ ] Mainpage is totally obscure with this whole recursive achievieng posts and profiles. This should be custom hook or whatever. Don't say anything about this favoritePosts crap xD. Also this don't work well in PostPage. This should get some DRY rule with selectors etc.
- [ ] types
- [ ] tests
- [ ] padding posts on pages
- [ ] delete inline styling
- [ ] FLUX-STANDARD-ACTION for async actions?

## Done
- [X] add plus attribute for posts
- [X] add sorting on mainpage by date and pluses
- [X] format date on posts
- [X] place "Show post" to footer of postcard
- [X] on-auth different menubar
- [X] delete adding posts without being signed up
- [X] add avatars
- [X] Generalnie dobrym pomysłem będzie trzymanie jednak info o userze w firestore-database. Będzie można wtedy prawdopodobnie lepiej sie poruszać wokół bazy. Zatem createUser będzie musiał być usunięty.

## Notes

A bit colored gray background

> To nie możesz
> Po prostu
> <ThemeProvider prefixes={{ theme: "dark' }}>
> Doda Ci to dark do każdego className iirc
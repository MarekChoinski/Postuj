import * as types from "./types";
// import uuid from "uuid";

const initialState: types.PostsState = {
    // title: "TODO",
    posts: [
        // {
        //     authorName: "Testowy Użytkownik",
        //     content: "Wojskiego Woźny cicho wszedł służący, i goście głodni, chodzili daleko na koniec Hrabi z drzew raz zawitała moda francuszczyzny! gdy prace skończywszy rolnicze, na nim jakby czyjegoś przyjścia był zostawiony nóżkami drobnemi od puszcz libijskich latał do kraju. Mowy starca krążyły we dnie świeciło całe - krzyknęli wszyscy. Sędzia Podkomorzego zdał się i ustawić co pod stołem siadał i posiedzenie nasze na pana zwykł sam nie daje czasu szukać mody odsyłać konie w Litwie chodził tępy nie należy. Idąc kłaniał się nie widział, bo tak pan Podczaszyc na siano. w.",
        //     date: "14 października 2019",
        //     id: "1",
        // },
        // {
        //     authorName: "Testowy Użytkownik",
        //     content: "Takim był, opisywać długo. Dosyć, że były pod lasem zwaliska. Po drodze Woźny trybunału. Takie były rączki, co jasnej bronisz Częstochowy i fijołki. Podróżny zląkł ich się damom, starcom i zmniejsza. I wnet sierpy gromadnie dzwoniąc we dworze jak wytnie dwa tysiące kroków zamek stał patrząc, dumając wonnymi powiewami kwiatów oddychając oblicze aż na wielkim mieście miał i sejmiku bo tak na sąd Pańskiej cioci. Choć Sędzia milczał, szczyptę wziętą z Rymszą, Rymsza z kahałem, Juracha z brabanckich koronek poprawiała, to mówiąc, że były Sędziego służono niedbale.",
        //     date: "14 października 2019",
        //     id: "2",
        // },
        // {
        //     authorName: "Pewien Użytkownik",
        //     content: "Zwycięstwo i nurkiem płynął na szalach żebyśmy nasz ciężar poznali musim kogoś okiem, daleko, na nim ją wszyscy znali. Kibić miała rodzin wieść o ścianę komnaty nim i nazwisko każdego wodza legijonu i stąd się strzelbami a zwierzę nie mógł wyjść spotykać w broszurki i obyczaje, nawet o nich i, czyje były, odgadywał. Przypadkiem oczy podniósł, i niezgrabny. Zatem się drzwiczki Świeżo trącone. blisko naszego młodziana. Uczepiwszy falbaną o porządku, nikt tam pewnie miała czarniutkie oczęta białą wznosząca nad wodę. Dano trzecią potrawę. Wtem ujrzała młodzieńca i w kalendarzu można równie kłaść na szalach żebyśmy nasz ciężar.",
        //     date: "14 października 2019",
        //     id: "3",
        // },
    ],
};





const reducer = (
    state = initialState,
    action: types.PostActionTypes// | types.TitleActionTypes
): types.PostsState => {




    switch (action.type) {
        case types.ADD_POST:
            // return {
            //     ...state,
            //     posts: [
            //         ...state.posts,
            //         {
            //             // id: uuid.v1(),
            //             id: "TEST",
            //             ...action.payload,
            //         }
            //     ],
            // }
            return state;

        case types.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post =>
                    post.id !== action.payload.id
                )
            }

        default:
            // console.log("state", state);
            return state;
    }
};

export default reducer;


import React, { useEffect, useMemo } from 'react';

import PostCard from '../components/PostCard';

import { useSelector } from 'react-redux';

// import { postsSelectors } from '../state/ducks/posts';
import AddPostForm from '../components/AddPostForm';
import { useFirestoreConnect, useFirebase } from 'react-redux-firebase'
import Spinner from 'react-bootstrap/Spinner';
import SortBar from '../components/SortBar';
import PaginationBar from '../components/PaginationBar';
import { subHours, getMilliseconds } from 'date-fns';
import PostsList from '../components/PostsList';
import ObservedPopup from '../components/ObservedPopup';


const Mainpage: React.FC = () => {

    return (
        <>
            <AddPostForm />
            <SortBar />
            <PostsList />
            <PaginationBar />
            <ObservedPopup
                author="Admin"
                authorId=""
                content="W przeciwieństwie do rozpowszechnionych opinii, Lorem Ipsum nie jest tylko przypadkowym tekstem. Ma ono korzenie w klasycznej łacińskiej literaturze z 45 roku przed Chrystusem, czyli ponad 2000 lat temu! Richard McClintock, wykładowca łaciny na uniwersytecie Hampden-Sydney w Virginii, przyjrzał się uważniej jednemu z najbardziej niejasnych słów w Lorem Ipsum – consectetur – i po wielu poszukiwaniach odnalazł niezaprzeczalne źródło: Lorem Ipsum pochodzi z fragmentów (1.10.32 i 1.10.33) „de Finibus Bonorum et Malorum”, czyli „O granicy dobra i zła”, napisanej właśnie w 45 p.n.e. przez Cycerona"
                id=""
                authorProfilePicture="https://firebasestorage.googleapis.com/v0/b/bloggy-6cd0c.appspot.com/o/profilePictures%2Fav-Admin.jpg?alt=media&token=710487d2-e30d-4d39-9f03-2d22c9e74e78"
            />
        </>
    );
}

export default Mainpage;



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


const Mainpage: React.FC = () => {

    return (
        <>
            <AddPostForm />
            <SortBar />
            <PostsList />
            <PaginationBar />
        </>
    );
}

export default Mainpage;

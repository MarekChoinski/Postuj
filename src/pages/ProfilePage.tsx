

import React, { useMemo } from 'react';

import PostCard from '../components/PostCard';
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router';
import DefaultAvatar from '../assets/images/defaultAvatar.png';
import { formatDistanceToNow, subHours } from 'date-fns';
import Nav from 'react-bootstrap/Nav';

type Props = {
    match: {
        params: {
            readonly id: string;
        }
    }
};

const ProfilePage: React.FC<Props> = (props) => {


    //TODO redundancy with mainpage








    const sortMethod = useSelector((state: any) =>
        state.posts.sortMethod
    );


    const favoritePosts = useSelector((state: any) =>
        !state.firebase.auth.isEmpty ? state.firebase.profile.favoritePosts : []
    );

    // TODO make this as a selector returning tuple
    let valueToOrderTo = "createdAt";

    // let before = subHours(new Date(), 13);



    const before = useMemo(
        () => {
            if (sortMethod == "top6") {
                return subHours(new Date(), 6);
            }
            else if (sortMethod == "top12") {
                return subHours(new Date(), 12);
            }
            else if (sortMethod == "top24") {
                return subHours(new Date(), 24);
            }
            else return null;
        },
        [sortMethod]
    );

    if (sortMethod == 'newest') {
        valueToOrderTo = "createdAt";
        // before = null;
    }
    else {
        valueToOrderTo = "likes";

    }






    const authors = useSelector((state: any) =>
        state.firestore.ordered.authors ?
            state.firestore.ordered.authors.reduce((hash: any, author: any) => {
                hash[author.id] = {
                    ...author
                };
                return hash;
            }, {})
            : null
    );

    const posts = useSelector((state: any) =>
        authors ?
            state.firestore.ordered.posts.map(
                (post: any) =>
                    ({
                        ...post,
                        author: authors[post.authorId],
                        isFavorite: favoritePosts ? favoritePosts.includes(post.id) : false,
                    })
            )
            : state.firestore.ordered.posts
    );

    //console.log("posts", posts);

    const authorsQueries = posts ? posts.map((post: any) => ({
        collection: 'users',
        doc: post.authorId,
        storeAs: 'authors'
    })) : [];

    useFirestoreConnect([
        {
            collection: 'posts',
            where: before ? [
                ['createdAt', '>', before]
            ] : null,
            orderBy: !before ? [
                valueToOrderTo,
                'desc'
            ] : null,
        },
        ...authorsQueries,
    ]);

    if (before) {
        posts.sort((a: any, b: any) => (b.likes - a.likes));
    }

    const postList = (authors) ? posts.map((post: any) =>

        <PostCard
            author={post.author.username}
            authorId={post.author.id}
            content={post.content}
            authorProfilePicture={post.author.profilePicPath}
            key={post.id}
            id={post.id}
            date={post.createdAt.seconds}
            likedBy={post.likedBy}
            favorite={post.isFavorite}
        />
    ) : <Spinner
        animation="grow"
        style={{
            marginTop: "30vh",
            marginLeft: "50vw",

        }}
        role="status"
    >
            <span className="sr-only">
                Loading...
</span>
        </Spinner>;











    //TODO redundancy with mainpage



    useFirestoreConnect([
        {
            collection: 'users',
            doc: props.match.params.id,
            storeAs: 'profileFromPage'
        },
    ])

    const profile = useSelector((state: any) =>
        state.firestore.ordered.profileFromPage && state.firestore.ordered.profileFromPage[0]
        //  ?
        // state.firestore.ordered.authors.reduce((hash: any, author: any) => {
        //     hash[author.id] = {
        //         ...author
        //     };
        //     return hash;
        // }, {})
        // : null
    );


    const isRequestingProfileFromPage = useSelector((state: any) =>
        !state.firebase.isInitializing &&
        state.firestore.status.requesting.profileFromPage
    );

    console.log("isRequestingProfileFromPage", isRequestingProfileFromPage);
    console.log("profile", profile);





    return (



        !isRequestingProfileFromPage ?
            profile ?
                <>

                    <span
                        style={{
                            margin: "100px auto 0 auto",
                            width: "900px",
                            display: "block"
                        }}
                    >
                        {profile.username} <br />
                        <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={profile.profilePicPath || DefaultAvatar}
                            // alt="placeholder"
                            style={{
                                borderRadius: "5px",
                            }}
                        /><br />
                        {formatDistanceToNow(profile.createdAt.seconds * 1000, { addSuffix: true })}
                        <br />
                    </span>

                    <Nav justify variant="tabs" defaultActiveKey="/home"
                        style={{
                            margin: "50px auto 0 auto",
                            width: "900px",
                        }}
                    >
                        <Nav.Item>
                            <Nav.Link active>Najlepsze</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>Najnowsze</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>Ulubione</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>Polubione</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>Obserwowani</Nav.Link>
                        </Nav.Item>

                    </Nav>

                    {postList}
                </>
                : null//<Redirect to="/404" />

            : <Spinner
                animation="grow"
                style={{
                    marginTop: "30vh",
                    marginLeft: "50vw",

                }}
                role="status"
            >
                <span className="sr-only">
                    Loading...
                </span>
            </Spinner>

    );
}

export default ProfilePage;

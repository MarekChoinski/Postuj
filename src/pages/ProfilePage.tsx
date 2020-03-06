

import React, { useMemo, useContext } from 'react';

import PostCard from '../components/PostCard';
import SortProfileBar from '../components/SortProfileBar';
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import DefaultAvatar from '../assets/images/defaultAvatar.png';
import { formatDistanceToNow, subHours } from 'date-fns';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import { ThemeContext } from '../contexts/ThemeContext';
import { Redirect } from 'react-router';
import PostsList from '../components/PostsList';




type Props = {
    match: {
        params: {
            readonly id: string;
        }
    }
};

const ProfilePage: React.FC<Props> = (props) => {

    useFirestoreConnect([
        {
            collection: 'users',
            doc: props.match.params.id,
            storeAs: 'profileFromPage'
        },
    ])

    const profile = useSelector((state: any) =>
        state.firestore.ordered.profileFromPage &&
        state.firestore.ordered.profileFromPage[0]
    );

    const isRequestedProfileFromPage = useSelector((state: any) =>
        !state.firebase.isInitializing &&
        state.firestore.status.requested.profileFromPage
    );


    return (

        isRequestedProfileFromPage ?
            profile ?

                <>
                    <Card
                        className="profile_card"
                    >
                        <div
                            className="profile_card__background_wrapper"
                        >
                            <img

                                className="profile_card__background_image"
                                src="https://placeimg.com/900/400/arch"
                                alt="text"
                            />
                        </div>
                        <Card.Header
                            className="profile_card__header"
                        >
                            <Media>

                                <img
                                    className="profile_card__avatar"
                                    src={profile.profilePicPath || DefaultAvatar}
                                    alt="avatar"
                                />
                                <Media.Body
                                >
                                    <h4
                                        className="profile_card__username">
                                        {profile.username}
                                    </h4>
                                    <span
                                        className="text-muted"
                                    >
                                        Dołączył {formatDistanceToNow(profile.createdAt.seconds * 1000, { addSuffix: true })}
                                    </span>

                                </Media.Body>
                            </Media>

                        </Card.Header>
                        <Card.Body
                            className="post_card__body"
                            style={{
                                paddingBottom: "55px",
                            }}
                        >
                            <Card.Text
                                style={{
                                    padding: "0 20px",
                                }}
                            >
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus ipsum sequi fuga quis velit voluptas. Veritatis, quibusdam voluptates. Neque, ipsam? Asperiores voluptas cumque molestiae nisi assumenda eos officia ab blanditiis et dolores error accusantium rem, tempore fugiat, explicabo expedita aut rerum sequi vitae amet repellat! Ut molestiae nemo commodi amet cumque doloremque necessitatibus rerum nulla quasi aut corrupti accusamus, laboriosam hic voluptate, a nostrum? Quibusdam deleniti, et corrupti ipsam illum ullam aspernatur necessitatibus nam amet dolorem quia nobis omnis, velit harum rem repellendus tenetur vitae dicta hic quasi fuga, modi placeat porro architecto! Modi sint vel necessitatibus aliquid consectetur asperiores.
                            </Card.Text>

                        </Card.Body>
                    </Card>

                    <SortProfileBar />

                    <PostsList />
                </>
                : <Redirect to="/404" />
            : <LoadingSpinner />
    );
}

export default ProfilePage;

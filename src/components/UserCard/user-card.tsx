import { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../chat/chat-socket';
import { iRoom, iStore, iUser } from '../../interfaces/interfaces';
import { sortIds } from '../../utils/sortIds';
import { Avatar } from '../Avatar/avatar';
import styles from './user-card.module.css';

export function UserCard({ otherUser }: { otherUser: iUser }) {
    const user = useSelector((store: iStore) => store.user);

    const rooms = useSelector((store: iStore) => store.rooms);
    const navigate = useNavigate();

    const handleClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const ids = sortIds([otherUser._id as string, user._id as string]);
        const roomName: string = ids[0] + ids[1];
        const exists = rooms.find(
            (room) => (room.name as string) === (roomName as string)
        );

        if (!!exists) {
            socket.emit('on-conversation', {
                userId: user._id,
                token: user.token,
                roomId: exists._id,
            });
            navigate(`/room/${exists._id}`);
        } else {
            const newRoom: iRoom = {
                owner: user._id as string,
                users: [user._id as string, otherUser._id as string],
                messages: [],
                image: '',
            };
            console.log('new room esended:', newRoom);
            socket.emit('new-p2p-room', newRoom);
        }
    };

    return (
        <>
            <div
                className={styles.card_container}
                onClick={handleClick}
                data-testid="div-user-card"
            >
                <div>
                    <span className={styles.avatar_container}>
                        <Avatar
                            src={otherUser.avatar as string}
                            alt={otherUser.nickname}
                        />
                    </span>
                </div>
                <div className={styles.info_container}>
                    <span>{otherUser.nickname}</span>
                </div>
            </div>
        </>
    );
}

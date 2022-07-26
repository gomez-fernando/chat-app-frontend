import { useSelector } from 'react-redux';
import { iStore, iUser } from '../../interfaces/interfaces';
import { CreateGroupCard } from '../CreateGroupCard/create-group-card';
import { UserCard } from '../UserCard/user-card';
import styles from './index.module.css';

export function UsersList({ data, group }: { data: iUser[]; group: boolean }) {
    const user = useSelector((store: iStore) => store.user);

    const users = data.filter((item) => item._id !== user._id);

    return (
        <ul className={styles.ul_container}>
            {group
                ? users.map((item) => (
                      <li key={item._id}>
                          <CreateGroupCard otherUser={item} />
                      </li>
                  ))
                : users.map((item) => (
                      <li key={item._id}>
                          <UserCard otherUser={item} />
                      </li>
                  ))}
        </ul>
    );
}

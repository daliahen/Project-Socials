import { useAuth } from '../Contexts/AuthContext';

export const Profile = () => {
    const { user, updateUser } = useAuth();

    const handleUpdate = (newData) => {
        updateUser(newData);
    };

    return (
        <div className="Profile">

        </div>
    );
}

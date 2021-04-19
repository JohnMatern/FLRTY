import { UserData } from '../components/index'

const AddUsername = () => {
    return (
        <div className="page">
            <h6>Please add new username:</h6>
            <UserData func={'setName'} />
        </div>
    );
}

export default AddUsername;
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';
import { useEffect } from 'react';

const Users = () => {
    
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const isLoading = false;
    const error = ''  

    
    useEffect(() => {     
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {                
        console.log(users);
    }, [users])

    if(isLoading) {
        return (
            <div className='loading'>
                <h1>Loading</h1>
            </div>
        );
    }    

    if (error) {
        return (
            <div className='error'>
                <h1>Error: {error}</h1>
            </div>
        );
    }   

    return (
        <div className='users'>
            <ul>
                {
                     users.map((user) => {
                          return <li key={user.id.value}>{`${user.name.first} ${user.name.last}`}</li>
                      })
                }                
            </ul>
        </div>
    );
}

export default Users
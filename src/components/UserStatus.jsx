import {useAuth} from '../context/AuthContext'

import {useNavigate} from 'react-router-dom'

export function UserStatus()  {

	const { user, isAuth, logout } = useAuth() //zde se vrati to co mam nastavene v contextu jako value, takze object ve kterem jsou vlastnoti user a isAuth
										// takze je zde muzu destrukturovat	
    const navigate = useNavigate()

	return (
		<div className="user-status">

			{isAuth
			? <>
			<p>Prihlaseny: {user.user_metadata.firstName} {user.user_metadata.lastName}</p>
			<button onCLick={logout}>Odhlasit</button>
			</>
			: <>
			<p>Neni prihlaseny</p>
			<button onCLick={() => {navigate('/login')}}>Prihlasit</button> 
			</>
			}
		</div>
	);
}

export default UserStatus;
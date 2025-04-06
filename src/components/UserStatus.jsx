import {useAuth} from '../context/AuthContext'

import {useNavigate} from 'react-router-dom'

export function UserStatus()  {

	const { user, isAuth, logout } = useAuth()
	const navigate = useNavigate()

	return (
		<div className="user-status">
			{isAuth ? (
				<>
					<p>Přihlášený: {user.user_metadata.firstName} {user.user_metadata.lastName}</p>
					<button 
						onClick={logout}
						className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
					>
						Odhlásit
					</button>
				</>
			) : (
				<>
					<p>Nejste přihlášený</p>
					<button 
						onClick={() => navigate('/login')}
						className="mt-2 bg-[#5F99AE] hover:bg-[#336D82] text-white px-3 py-1 rounded"
					>
						Přihlásit
					</button>
				</>
			)}
		</div>
	)
}

export default UserStatus;
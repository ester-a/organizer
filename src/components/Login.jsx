import {useState} from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import { useNavigate } from 'react-router-dom'


export const Login = () => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const {login} = useAuth()

	const navigate = useNavigate() //vrati fci kterou nazvu navigate, tim ze ji zavolam mohu skocit na jakoukoli adresu

	const handleSubmit = async (e) =>{
		e.preventDefault()
		console.log('Prihlasuji...', email, password)

		//has to be await, ve videu - v reseni je chyba!!""
		// const {data, error} = await login(email, password);

		//await supabase.auth.signInWithPassword({ email, password}) - ted to taham z AuthContext.jsx

		const {data, error} = await login(email, password)

		// if (!error && data) {
		// 	console.log(data) // vratili se data o prihlasenem uzivateli
		// }
		if (error) {
			console.log(error)
			return
		}
		//pokud pri prihlaseni nedoslo k chybe, presmeruj na puvodni stranku
		navigate('/')

	}

	return (
		<>
			<h2>Přihlášení</h2>

			<form onSubmit={handleSubmit}>

				<div className="form-field">
					<label>E-mail</label>
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>

				<div className="form-field">
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>

				<button type="submit">Přihlásit se</button>

				<p>Ještě nemáš účet? <Link to="/register">Zaregistruj se.</Link></p>
			</form>
		</>
	)
}

export default Login
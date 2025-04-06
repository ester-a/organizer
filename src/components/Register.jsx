import { useState } from 'react'
import {supabase} from './../supabase/supabase-client'

export function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [age, setAge] = useState('')

    const [message, setMessage] = useState(null)

    const { register } = useAuth() 

	const handleSubmit = async (e) =>{
		e.preventDefault()

        setMessage(null) //pokazde kdyz dojde k odeslani formulare, tak to nastavim na null, aby se ta zprava vynulovala

		if (email === '' || password === '') {
            setMessage('E-mail a heslo jsou povinné.')
			return
		}
        try {
			const { data, error } = await register(email, password, firstName, lastName, age)

			if (error) {
				console.error(error)
				setMessage("Chyba při vytváření účtu")
			} else {
				console.log(data)
				setMessage("Registrace proběhla úspěšně. Zkontrolujte e-mail pro potvrzení.")
			}
		} catch (err) {
			console.error(err)
			setMessage("Neočekávaná chyba.")
		}
	}
    
	return (
		<>
			<h2>Registrace</h2>

			{message && <p>message</p>} 
 
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

				<hr />

				<div className="form-field">
					<label>Jméno</label>
					<input
						type="text"
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
					/>
				</div>

				<div className="form-field">
					<label>Příjmení</label>
					<input
						type="text"
						value={lastName}
						onChange={e => setLastName(e.target.value)}
					/>
				</div>

				<div className="form-field">
					<label>Věk</label>
					<input
						type="text"
						value={age}
						onChange={e => setAge(e.target.value)}
					/>
				</div>

				<button type="submit">Registrovat</button> 
			</form>
		</>
	)
}

export default Register;
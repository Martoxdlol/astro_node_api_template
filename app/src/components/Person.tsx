import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { API_URL } from '../constants';
import { z } from 'zod';

const personSchema = z.object({
	name: z.string(),
	age: z.number(),
})

export default function Person() {
	const [person, setPerson] = useState<z.infer<typeof personSchema>>();

	useEffect(() => {
		fetch(`${API_URL}/person/10`).then(res => res.json()).then(data => {
			const person = personSchema.parse(data)
			setPerson(person)
		});
	}, [])

	return (
		<>
			{person && (<h1>
				{person.name}
			</h1>)}
		</>
	);
}
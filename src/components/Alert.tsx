import React, { useEffect } from 'react'
import { ItemType } from './List'


interface IAlert {
	type: string
	text: string
	removeAlert: () => void
	list: ItemType[]
}



export const Alert: React.FC<IAlert> = ({ type, text, removeAlert, list }) => {
	useEffect(()=> {
		const timeout = setTimeout(() => {
			removeAlert()
		}, 2000)
		return ( )=>clearTimeout( timeout )
	}, [list, removeAlert])
	return <p className={`alert alert-${type}`}>{text}</p>;
}

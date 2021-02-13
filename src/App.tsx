import React, { useState, useEffect, FormEvent } from 'react'
import { Alert } from './components/Alert'
import { List } from './components/List'


interface Props { }


const getLocalStorage = ( ) => {
	let list = localStorage.getItem('list')
	if ( list ) {
		//@ts-ignore
		return ( list = JSON.parse( localStorage.getItem('list')))
	} else {
		return []
	}
}

const App = (props: Props) => {
	
	const [name, setName] = useState("") // name task
	const [list, setList] = useState( getLocalStorage())// all tasks
	const [isEditing, setIsEditing] = useState(false)
	const [editID, setEditID] = useState <string | null> (null)
	const [alert, setAlert] = useState({ show: false, text: "", type: "" })


	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		if ( !name ) {
			showAlert( true, 'danger', "пожалуйста, введите значение" )
		} else if ( name && isEditing ) {	
			setList(
				list.map( (item: string ) => {
					//@ts-ignore
					if ( item.id === editID ) {
						//@ts-ignore
						return { ...item, title: name }
					}
					return item
				})
			)
			setName("")
			setEditID(null)
			setIsEditing( false )
			showAlert(true, 'success', 'поле изменено');
		} else {
			const newItem = {
				id: new Date().getTime().toString(),
				title: name
			}
			//@ts-ignore
			setList([...list, newItem])
			setName("")
			showAlert(true, 'success', 'поле добавлено в список');
		}
	}

	const clearList = ( ) => {
		showAlert( true, 'danger', 'поля удалены' )
		setList([])
	} 

	useEffect(() => {
	localStorage.setItem( 'list', JSON.stringify(list) )
	}, [list])

	
const showAlert = ( show = false, type = '', text = '' ) => {
	setAlert({ show, type, text })
}

	const removeItem = ( id: string ) => {
		showAlert(true, 'danger', 'поле удалено');
		//@ts-ignore
		setList( list.filter( (item ) => item.id !== id ))
	}


	const editItem = ( id: string ) => {
		//@ts-ignore
		const editName = list.find( item => item.id === id )
		setIsEditing( true )
		setEditID( id )
		//@ts-ignore
		setName( editName.title )
	}


	return (
		<section className="section-center">
			<form className="grocery-form"
				onSubmit={handleSubmit}
			>
			 { alert.show && <Alert { ...alert } removeAlert={ showAlert } list={ list }  />}
				<h3> Ингредиенты </h3>
				<div className="form-control">
					<input
						type="text"
						className="grocery"
						value={name}
						placeholder="eggs"
						onChange={(e) => setName(e.target.value)}
					/>
					<button
						type="submit"
						className="submit-btn"
					> добавить  </button>
				</div>
			</form>
			{ list.length > 0 && (
				<div className="grocery-container">
					<List
						items={list}
						editItem={editItem}
						removeItem={removeItem}
					/>
					<button
					className="clear-btn" onClick={ clearList }
					 > 
					очистить	 
					</button>
				</div>
			)}

		</section>
	)
}

export default App

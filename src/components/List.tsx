import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

export type ItemType = {
	id: string,
	title: string
}


interface IList {
	items: ItemType[]
	removeItem: (id: string) => void
	editItem: (id: string) => void
}

export const List: React.FC<IList> = ({ items, removeItem, editItem }) => {
	return (
		<div className="grocery-list">
			{ items.map((item: any) => (
				<article className="grocery-item" key={item.id} >
					<p className="title"> {item.title} </p>
					<div className="btn-container">
						<button
							type="button"
							className="edit-btn"
							onClick={() => editItem(item.id)}
						>

							<FaEdit />
						</button>
							<button
							type="button"
							className="delete-btn"
							onClick={() => removeItem(item.id)}
						>
							<FaTrash />
							</button>
					</div>
				</article>
			))}
		</div>
	)
}

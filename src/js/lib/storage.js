export function storage(name) {
	// assumeing local storage is available
	let taskList = localStorage.getItem(name);
	if (!taskList) {
		localStorage.setItem(name, JSON.stringify({}));
	}
	let storage = JSON.parse(localStorage.getItem(name));
    let methods = {
        setItem() {
			localStorage.setItem(name, JSON.stringify(storage));
		},
		getItem() {
			return JSON.parse(localStorage.getItem(name));
		}
    }
	return {
		setItem : methods.setItem,
		getItem : methods.getItem,
		addItem : (newItem, itemId) =>{
			storage[itemId] = newItem;
			methods.setItem();
		},
		updateItem : (updatedItem, itemId) =>{
			storage[itemId] = updatedItem;
			methods.setItem();
		}
	};
}

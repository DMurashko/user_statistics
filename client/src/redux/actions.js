import { 
	FETCH_STATUS,
	SET_ALL_ELEMENTS,
	SET_CURRENT_PAGE_ELEMENTS,
	SET_ELEMENTS_PER_PAGE,
	SET_OFFSET,
	SET_PAGES_COUNT,
	SET_TOTAL_ELEMENTS_COUNT
} from './types';
import axios from "axios";

export function setFetchStatus(status) {
	return {
		type: FETCH_STATUS,
		payload: status
	}
}

export function setOffset(offset) {
	return {
		type: SET_OFFSET,
		payload: offset
	}
}

export function setCurrentPageElements(elements) {
	return {
		type: SET_CURRENT_PAGE_ELEMENTS,
		payload: elements
	}
}

export function setElementsPerPage(amount) {
	return {
		type: SET_ELEMENTS_PER_PAGE,
		payload: amount
	}
}

export function setPagesCount(amount) {
	return {
		type: SET_PAGES_COUNT,
		payload: amount
	}
}

export function setAllElements(elements) {
	return {
		type: SET_ALL_ELEMENTS,
		payload: elements
	}
}

export function setTotalElementsCount(amount) {
	return {
		type: SET_TOTAL_ELEMENTS_COUNT,
		payload: amount
	}
}











export function addPerson(person) {
	if (person) {

		return {
			type: ADD_PERSON,
			payload: person
		}

	} else {
		console.log('invalid entries');
	}
}

export function addPeople(people) {
	return async (dispatch) => {
		try {
			if (people && people.length) {
				for (let person of people) {
					dispatch(addPerson(person));
				}
			} else {
				console.log('invalid entries');
			}
		} catch(e) {
			console.log(e);
		}
	}
}

export function fetchGetAllData() {
	return async (dispatch) => {
		try {
			await dispatch(setFetchStatus(true));
			axios.get('https://swapi.dev/api/people/')
				.then(response => {
					dispatch(addPeople(response.data.results));
					dispatch(setFetchStatus(false));
				});
		} catch(e) {
			console.log(e);
		}
	}
}

//fetching planet

export function setPlanet(planet) {
	return {
		type: SET_PLANET,
		payload: planet
	}
}

export function fetchPlanet(url) {
	return async (dispatch) => {
		try {
			axios.get(url)
				.then(response => {
					dispatch(setPlanet(response.data.name));
				});
		} catch(e) {
			console.log(e);
		}
	}
}

//fetching starship

export function setStarship(starship) {
	return {
		type: SET_STARSHIP,
		payload: starship
	}
}

export function fetchStarship(url) {
	return async (dispatch) => {
		try {
			axios.get(url)
				.then(response => {
					dispatch(setStarship(response.data.name));
				});
		} catch(e) {
			console.log(e);
		}
	}
}

//fetching vehicle

export function setVehicle(vehicle) {
	return {
		type: SET_VEHICLE,
		payload: vehicle
	}
}

export function fetchVehicle(url) {
	return async (dispatch) => {
		try {
			axios.get(url)
				.then(response => {
					dispatch(setVehicle(response.data.name));
				});
		} catch(e) {
			console.log(e);
		}
	}
}

//main action for fetching planets, starships and vehicles

export function fetchAdditionalUserData(person) {
	return async (dispatch) => {
		try {
			await dispatch(setFetchStatus(true));

			if (person.homeworld instanceof Array && person.homeworld.length) {
				for (let item of person.homeworld) {
					await dispatch(fetchPlanet(item));
				}
			} else if (person.homeworld && person.homeworld.slice(0,5).includes('http')) {
				await dispatch(fetchPlanet(person.homeworld));
			}
			
			if (person.starships instanceof Array && person.starships.length) {
				for (let item of person.starships) {
					await dispatch(fetchStarship(item));
				}
			} else if (person.starships && person.starships.slice(0,5).includes('http')) {
				await dispatch(fetchStarship(person.starships));
			}

			if (person.vehicles instanceof Array && person.vehicles.length) {
				for (let item of person.vehicles) {
					await dispatch(fetchVehicle(item));
				}
			} else if (person.vehicles && person.vehicles.slice(0,5).includes('http')) {
				await dispatch(fetchVehicle(person.vehicles));
			}

			await dispatch(setFetchStatus(false));
		} catch(e) {
			console.log(e);
		}
	}
}

//pop-up actions

export function setPopUpStatus(status) {
	return {
		type: POP_UP_STATUS,
		payload: status
	}
}

export function setPopUpPerson(person) {
	return {
		type: SET_POP_UP_PERSON,
		payload: person
	}
}

export function setCharacterData(person) {
	return {
		type: SET_CHARACTER_DATA,
		payload: person
	}
}
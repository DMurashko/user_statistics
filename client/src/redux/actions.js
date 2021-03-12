import { 
	FETCH_STATUS,
	ADD_PERSON,
	POP_UP_STATUS,
	SET_POP_UP_PERSON,
	SET_CHARACTER_DATA,
	DELETE_ALL_PEOPLE,
	SET_PLANET,
	SET_STARSHIP,
	SET_VEHICLE,
	DELETE_FETCHED_DATA
} from './types';
import axios from "axios";

export function setFetchStatus(status) {
	return {
		type: FETCH_STATUS,
		payload: status
	}
}

export function deleteAllPeople() {
	return {
		type: DELETE_ALL_PEOPLE
	}
}

export function deleteFetchedData() {
	return {
		type: DELETE_FETCHED_DATA
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

export function fetchGetAllPeople() {
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
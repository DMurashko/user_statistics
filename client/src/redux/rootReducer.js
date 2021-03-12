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
} from "./types";

const initialState = {
	people: [],

	fetchStatus: false,

	popUpStatus: false,

	poppedUpPerson: false,

	characterData: false,

	fetchedPlanet: [],

	fetchedStarships: [],

	fetchedVehicles: []
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_PERSON:
			return { ...state, people: state.people.concat([action.payload]) };
		case DELETE_ALL_PEOPLE:
			return { ...state, people: [] };
		case DELETE_FETCHED_DATA:
			return { ...state, fetchedPlanet: [], fetchedStarships: [], fetchedVehicles: [] };
		case POP_UP_STATUS:
			return { ...state, popUpStatus: action.payload };
		case SET_POP_UP_PERSON:
			return { ...state, poppedUpPerson: action.payload };
		case SET_CHARACTER_DATA:
			return { ...state, characterData: action.payload };
		case FETCH_STATUS:
			return { ...state, fetchStatus: action.payload };
		case SET_PLANET:
			return { ...state, fetchedPlanet : state.fetchedPlanet.concat([action.payload]) };
		case SET_STARSHIP:
			return { ...state, fetchedStarships : state.fetchedStarships.concat([action.payload]) };
		case SET_VEHICLE:
			return { ...state, fetchedVehicles : state.fetchedVehicles.concat([action.payload]) };
		default: return state
	}
}

export default rootReducer;
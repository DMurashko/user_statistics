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
	DELETE_FETCHED_DATA,
	SET_OFFSET,
	SET_CURRENT_PAGE_ELEMENTS,
	SET_ELEMENTS_PER_PAGE,
	SET_PAGES_COUNT,
	SET_ALL_ELEMENTS,
	SET_TOTAL_ELEMENTS_COUNT
} from "./types";

const initialState = {
	offset: 0,

	currentPageElements: [],

	elementsPerPage: 15,

	pagesCount: 1,

	allElements: [],

	totalElementsCount: 0,

	fetchStatus: false
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

		case SET_OFFSET:
			return { ...state, offset: action.payload };
		case SET_CURRENT_PAGE_ELEMENTS:
			return { ...state, currentPageElements: [ ...state.currentPageElements, action.payload ] };
		case FETCH_STATUS:
			return { ...state, fetchStatus: action.payload };
		case SET_ELEMENTS_PER_PAGE:
			return { ...state, elementsPerPage : action.payload };
		case SET_PAGES_COUNT:
			return { ...state, pagesCount : action.payload };
		case SET_ALL_ELEMENTS:
			return { ...state, allElements : [ ...state.allElements, action.payload ] };
		case SET_TOTAL_ELEMENTS_COUNT:
			return { ...state, totalElementsCount : action.payload };
		default: return state
	}
}

export default rootReducer;
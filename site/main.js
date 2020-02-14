$(document).ready(function () {

	/*==============================================================================
	 * COUNTRIES
	 *============================================================================*/

	// globals
	let countryJSON = [];

	// hit the API, populate stuff
	async function getCountries() {
		console.log('getCountries ran');
		let response = [];
		await $.getJSON({
			url: 'https://xc-ajax-demo.herokuapp.com/api/countries/',
			success: json => {
				response = json;
			},
			error: (error) => displayError(error)
		});
		return response;
	}

	// build content for countries
	async function buildCountryDropdown() {
		console.log('buildCountryData ran');
		countryJSON = await getCountries();
		let countryDropdownContainer = $('#country-dropdown-item-container');
		countryJSON.forEach(item => {
			countryDropdownContainer.append(`<a class="dropdown-item x-country-list-item" ` +
					   `country-code="${item.code}" ` +
					   `href="#">` +
					   `${item.name}</a>`);
		});
		console.log('done building country list');

		// hookup event handlers
		countryDropdownContainer.on('click', (elem) => {
			let tElem = $(elem.target);
			console.log(tElem);
			console.log(tElem.text());
			countryClicked(tElem.text(), tElem.attr('country-code'));
		});
		let countrySearchField = $('#country-search-field');
		countrySearchField.keyup((e) => {
			let keyCode = e.keyCode || e.which;
			console.log('pressed ' + keyCode);
			let searchText = countrySearchField.val();
			filterCountryList(searchText);
		});
	}

	function filterCountryList(text) {
		const countryListItems = $('.x-country-list-item');
		countryListItems.each((elem) => countryListItems.remove(elem));
		countryJSON.forEach(item => {
			if (item.name.toLowerCase().includes(text.toLowerCase()) || text === "") {
				$('#country-dropdown-item-container').append(`<a class="dropdown-item x-country-list-item" ` +
					`country-code="${item.code}" ` +
					`href="#">` +
					`${item.name}</a>`);
			}
		});
	}

	function countryClicked(country, code) {
		$('#country-dropdown-btn').text(country);
		console.log('countryClicked called with code ' + code);
		buildStatesDropdown(code);
	}

	function displayError(error) {
		console.log('it broke because ' + error.message);
	}

	buildCountryDropdown();

	$('#country-search-item').click(e => e.preventDefault());

	/*==============================================================================
	 * STATES
	 *============================================================================*/

	let statesJSON = [];

	async function getStates(countryCode) {
		console.log('getCountries ran');
		let response = [];
		await $.getJSON({
			url: `https://xc-ajax-demo.herokuapp.com/api/countries/${countryCode}/states`,
			success: json => {
				response = json;
			},
			error: (error) => displayError(error)
		});
		return response;
	}

	// build content for countries
	async function buildStatesDropdown(countryCode) {
		$('#state-dropdown-btn')
			.removeAttr('disabled')
			.text('Select a state');
		statesJSON = await getStates(countryCode);
		let stateListItems = $('.x-state-list-item');
		stateListItems.each((elem) => stateListItems.remove(elem));
		let stateDropdownContainer = $('#state-dropdown-item-container');
		statesJSON.forEach(item => {
			stateDropdownContainer.append(`<a class="dropdown-item x-state-list-item" ` +
				`href="#">` +
				`${item.name}</a>`);
		});
		console.log('done building state list');

		// hookup event handlers
		stateDropdownContainer.on('click', (elem) => {
			let tElem = $(elem.target);
			console.log(tElem);
			console.log(tElem.text());
			stateClicked(tElem.text());
		});
		let stateSearchField = $('#state-search-field');
		stateSearchField.keyup((e) => {
			let keyCode = e.keyCode || e.which;
			console.log('pressed ' + keyCode);
			let searchText = stateSearchField.val();
			filterStateList(searchText);
		});
	}

	function filterStateList(text) {
		const stateListItems = $('.x-state-list-item');
		stateListItems.each((elem) => stateListItems.remove(elem));
		statesJSON.forEach(item => {
			if (item.name.toLowerCase().includes(text.toLowerCase()) || text === "") {
				$('#state-dropdown-item-container').append(`<a class="dropdown-item x-state-list-item" ` +
					`href="#">` +
					`${item.name}</a>`);
			}
		});
	}

	function stateClicked(state) {
		$('#state-dropdown-btn').text(state);
		console.log('stateClicked called with state ' + state);
	}

	$('#state-search-item').click(e => e.preventDefault());


});
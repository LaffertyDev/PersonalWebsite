import * as React from "react";
import { RegionModel } from "./region";
import { RegionGenConfig } from "./regiongenconfig";
import { RegionGenerator } from "./regiongenerator";

interface IRegionFormProp {
	onFormSubmit: (region: RegionModel) => any;
}

/**
 * Form with configuration to set up and build a region. Will call an external function when the form is submitted with the generated region
 */
export class RegionForm extends React.Component<IRegionFormProp, RegionGenConfig> {
	public regionGenerator: RegionGenerator;

	constructor(props: IRegionFormProp) {
		super(props);
		// set initial state to default configuration
		this.state = new RegionGenConfig();

		// WRITING OUT THESE SUCKED AND THERE HAS TO BE A BETTER WAY
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRegionPopulation = this.handleRegionPopulation.bind(this);
		this.handleRegionSizeMilesSq = this.handleRegionSizeMilesSq.bind(this);
		this.handleRegionAgeYears = this.handleRegionAgeYears.bind(this);
		this.handleLivestockPerPerson = this.handleLivestockPerPerson.bind(this);
		this.handlePeoplePerCastle = this.handlePeoplePerCastle.bind(this);
		this.handlePeoplePerRuinedCastle = this.handlePeoplePerRuinedCastle.bind(this);
		this.handlePercentageOfLivestockIsFowl = this.handlePercentageOfLivestockIsFowl.bind(this);
		this.handlePercentageOfCastlesInOutskirts = this.handlePercentageOfCastlesInOutskirts.bind(this);
		this.handlepeoplePerFarmlandSqMiles = this.handlepeoplePerFarmlandSqMiles.bind(this);
		this.handleAverageFarmSizeAcres = this.handleAverageFarmSizeAcres.bind(this);
		this.handleHouseholdSize = this.handleHouseholdSize.bind(this);
		this.handleWarehousesPerBuildingMultiplier = this.handleWarehousesPerBuildingMultiplier.bind(this);
		this.handlecityPeoplePerMileSq = this.handlecityPeoplePerMileSq.bind(this);

		this.regionGenerator = new RegionGenerator();
	}
	public handleAverageFarmSizeAcres(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({AverageFarmSizeAcres: Number.parseInt(event.target.value, 10)});
	}
	public handlecityPeoplePerMileSq(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({CityPeoplePerSqMile: Number.parseInt(event.target.value, 10)});
	}
	public handleHouseholdSize(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({HouseholdSize: Number.parseInt(event.target.value, 10)});
	}

	public handleLivestockPerPerson(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({LivestockPerPerson: Number.parseInt(event.target.value, 10)});
	}
	public handlePeoplePerCastle(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({PeoplePerCastle: Number.parseInt(event.target.value, 10)});
	}
	public handlepeoplePerFarmlandSqMiles(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({PeoplePerSqMileFarmland: Number.parseInt(event.target.value, 10)});
	}
	public handlePeoplePerRuinedCastle(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({PeoplePerRuinedCastle: Number.parseInt(event.target.value, 10)});
	}
	public handlePercentageOfCastlesInOutskirts(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({PercentageOfCastlesInOutskirts: Number.parseInt(event.target.value, 10)});
	}
	public handlePercentageOfLivestockIsFowl(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({PercentageOfLivestockIsFowl: Number.parseInt(event.target.value, 10)});
	}

	public handleRegionAgeYears(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({RegionAgeYears: Number.parseInt(event.target.value, 10)});
	}

	public handleRegionPopulation(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({RegionPopulation: Number.parseInt(event.target.value, 10)});
	}

	public handleRegionSizeMilesSq(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({RegionSizeSqMiles: Number.parseInt(event.target.value, 10)});
	}

	public handleSubmit(event: React.FormEvent<HTMLElement>) {
		const region = this.regionGenerator.generate(this.state);
		this.props.onFormSubmit(region);
		event.preventDefault();
	}

	public handleWarehousesPerBuildingMultiplier(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({WarehousesPerBuildingMultiplier: Number.parseInt(event.target.value, 10) });
	}

	// I could pass a "Default" settings object to the form
	// I could have the form make a callback to this

	public render() {
		const regionPop = this.state.RegionPopulation;
		const regionMilesSq = this.state.RegionSizeSqMiles;
		const regionAgeYears = this.state.RegionAgeYears;

		// adv settings
		const livestockPerPerson = this.state.LivestockPerPerson;
		const peoplePerCastle = this.state.PeoplePerCastle;
		const peoplePerRuinedCastle = this.state.PeoplePerRuinedCastle;
		const percentageOfLivestockIsFowl = this.state.PercentageOfLivestockIsFowl;
		const percentageOfCastlesInOutskirts = this.state.PercentageOfCastlesInOutskirts;
		const peoplePerFarmlandSqMiles = this.state.PeoplePerSqMileFarmland;
		const averageFarmSizeAcres = this.state.AverageFarmSizeAcres;
		const householdSize = this.state.HouseholdSize;
		const warehousesPerBuildingMultiplier = this.state.WarehousesPerBuildingMultiplier;
		const cityPeoplePerMileSq = this.state.CityPeoplePerSqMile;

		return (
			<div>
				<form action="javascript:void(0);" onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>Region Parameters</legend>
						<div>
							<label htmlFor="regionPop">Region Total Population</label>
							<input id="regionPop" type="number" min="0" 
							value={regionPop} onChange={this.handleRegionPopulation}/>
							<p>Population affects the number of castles, villages, towns, and cities</p>
						</div>
						<div>
							<label htmlFor="regionMilesSq">Region Area Size Miles²</label>
							<input id="regionMilesSq" type="number" min="0" 
							value={regionMilesSq} onChange={this.handleRegionSizeMilesSq} />
							<p>Total size of the region, including inhospitable land</p>
						</div>  
					</fieldset>
					<fieldset>
						<legend>Castle Settings</legend>
						<div>
							<label htmlFor="regionAgeYears">Region Age Years</label>
							<input id="regionAgeYears" type="number" min="0" 
							value={regionAgeYears} onChange={this.handleRegionAgeYears}/>
							<p>Older regions have more ruined / abandoned castles</p>
						</div>
						<div>
							<label htmlFor="peoplePerCastle">People per Castle</label>
							<input type="number" id="peoplePerCastle" min="0" 
							value={peoplePerCastle} onChange={this.handlePeoplePerCastle} />
						</div>
						<div>
							<label htmlFor="peoplePerRuinedCastle">People per Ruined Castle</label>
							<input type="number" id="peoplePerRuinedCastle" min="0" 
							value={peoplePerRuinedCastle} onChange={this.handlePeoplePerRuinedCastle} />
						</div>
						<div>
							<label htmlFor="percentageOfCastlesInOutskirts">Castle % in outskirts</label>
							<input type="number" id="percentageOfCastlesInOutskirts" min="0" step="0.01"
								value={percentageOfCastlesInOutskirts} onChange={this.handlePercentageOfCastlesInOutskirts}/>
						</div>
					</fieldset>
					<fieldset>
						<legend>City Settings</legend>
						<div>
							<label htmlFor="warehousesPerBuildingMultiplier">Warehouses per Building Multiplier</label>
							<input type="number" id="warehousesPerBuildingMultiplier" min="0" step="0.1"
								value={warehousesPerBuildingMultiplier} onChange={this.handleWarehousesPerBuildingMultiplier} />
							<p>Used in conjunction with people per household to determine storage requirements of the cities.</p>
						</div>
						<div>
							<label htmlFor="cityPeoplePerMileSq">City People per Miles²</label>
							<input type="number" id="cityPeoplePerMileSq" min="0"
							value={cityPeoplePerMileSq} onChange={this.handlecityPeoplePerMileSq} />
							<p>Average density is ~40,000 per Mile². Lowering this will create larger (in area) cities</p>
						</div>
					</fieldset>
					<fieldset>
						<legend>Farming Settings</legend>
						<div>
							<label htmlFor="peoplePerFarmlandSqMiles">People Per Mile² Farmland</label>
							<input type="number" id="peoplePerFarmlandSqMiles" min="0"
							value={peoplePerFarmlandSqMiles} onChange={this.handlepeoplePerFarmlandSqMiles} />
							<p>The viability of the farmable land itself, assuming maximum productivity. Higher numbers reduce sprawl, increase density</p>
						</div>
						<div>
							<label htmlFor="averageFarmSizeAcres">Average Farm Size Acres</label>
							<input type="number" id="averageFarmSizeAcres" min="0"
							value={averageFarmSizeAcres} onChange={this.handleAverageFarmSizeAcres} />
							<p>
								The productivity of a single farmer, and the amount of land they can work. Higher numbers reduce sprawl, increase density.
								The average farm size is normally between 20 to 40 acres.
							</p>
						</div>
						<div>
							<label htmlFor="householdSize">Household Size</label>
							<input type="number" id="householdSize" min="0"
							value={householdSize} onChange={this.handleHouseholdSize} />
							<p>Average people per household. Higher numbers significantly increase sprawl, reduce density</p>
						</div>
						<div>
							<label htmlFor="livestockPerPerson">Livestock per Person</label>
							<input type="number" id="livestockPerPerson" min="0" step="0.1"
							value={livestockPerPerson} onChange={this.handleLivestockPerPerson} />
							<p>Medieval societies had a lot of animals, mostly work animals. This includes Cows, Sheeps, Pigs, Chickens, etc.</p>
						</div>
						<div>
							<label htmlFor="percentageOfLivestockIsFowl">Livestock Fowl Ratio</label>
							<input type="number" id="percentageOfLivestockIsFowl" min="0" step="0.01"
							value={percentageOfLivestockIsFowl} onChange={this.handlePercentageOfLivestockIsFowl} />
							<p>Medieval societies generally raised more fowl. Higher percentages imply more fowl. (Chickens, Turkeys, etc.)</p>
						</div>
					</fieldset>
					<button className="laff-btn laff-btn-primary" type="submit">Generate Region</button>
				</form>
			</div>
		);
	}
}

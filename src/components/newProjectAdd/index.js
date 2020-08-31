import React, { Component } from 'react'

export class newProjectAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            latitude: "", 
            longitude: "",
            company: ""
        };

    }

    handleInputChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(this.state);
    }

    handleFormSubmit = e => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="form-group">
                        <label htmlFor="projectName">Project Title</label>
                        <input 
                            className="form-control" 
                            id="projectName" 
                            name="projectName"
                            placeholder="London Bridge Repair Project"
                            value={this.state.projectName}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="Latitude">Latitude</label>
                            <input 
                                className="form-control" 
                                id="latitude"
                                name="latitude" 
                                placeholder="22.302711"
                                value={this.state.latitude}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group col-sm-6">
                            <label htmlFor="Longitude">Longitude</label>
                            <input 
                                className="form-control" 
                                id="longitude"
                                name="longitude"
                                placeholder="114.177216"
                                value={this.state.longitude}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Company">Company</label>
                        <input 
                            className="form-control" 
                            id="company" 
                            name="company"
                            placeholder="Company"
                            value={this.state.company}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={this.handleFormSubmit}>    
                        Submit
                    </button>
                </form>
            </React.Fragment>
        )
    }
}

export default newProjectAdd

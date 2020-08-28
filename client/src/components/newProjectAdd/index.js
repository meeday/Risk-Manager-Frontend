import React, { Component } from 'react'

export class newProjectAdd extends Component {
    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="form-group">
                        <label htmlFor="projectName">Project Title</label>
                        <input className="form-control" id="projectName" placeholder="London Bridge Repair Project"></input>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="Latitude">Latitude</label>
                            <input className="form-control" id="latitude" placeholder="22.302711"></input>
                        </div>
                        <div className="form-group col-sm-6">
                            <label htmlFor="Longitude">Longitude</label>
                            <input className="form-control" id="longitude" placeholder="114.177216"></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Company">Company</label>
                        <select className="form-control" id="company" multiple>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}

export default newProjectAdd

import { React, Component } from 'react';
import { Project } from '../component/index';


class SingleProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div className="projects">
                <h1>Project Details</h1>
                <div>
                    <Project
                        web3={this.props.web3}
                        store={this.props.store}
                        group={this.props.group}
                        project={this.props.project}
                        vote={this.props.vote}
                        address={this.props.address} />
                </div>
            </div>
        )
    }
}

export default SingleProject;
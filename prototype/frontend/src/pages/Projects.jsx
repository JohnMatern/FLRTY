import { React, Component } from 'react';
import { ProjectList } from '../component/index';


class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
            return (
                <div className="projects">
                    <h1>Projectlist</h1>
                    <div>
                        <ProjectList
                            show={this.props.show}
                            web3={this.props.web3}
                            store={this.props.store}
                            group={this.props.group}
                            project={this.props.project}
                            vote={this.props.vote}
                            addressHandler={this.props.addressHandler}
                        />
                    </div>
                </div>
            )
    }
}

export default Projects;
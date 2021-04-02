import { React, Component } from 'react';
import { Project } from '../component/index';
import { Container } from '@material-ui/core'; 


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
                <Container>
                    <Project
                        web3={this.props.web3}
                        account={this.props.account}
                        store={this.props.store}
                        group={this.props.group}
                        project={this.props.project}
                        vote={this.props.vote}
                        manager={this.props.manager}
                        address={this.props.address} />
                </Container>
            </div>
        )
    }
}

export default SingleProject;
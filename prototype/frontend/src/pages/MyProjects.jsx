import { React, Component } from 'react';
import { NewProject } from "../component/index.js"
class MyProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <NewProject
                    show={this.props.show}
                    web3={this.props.web3}
                    account={this.props.account}
                    store={this.props.store}
                    group={this.props.group}
                    project={this.props.project}
                    vote={this.props.vote}
                    manager={this.props.manager}
                    address={this.props.address} />
            </div>
        )
    }
}

export default MyProjects;
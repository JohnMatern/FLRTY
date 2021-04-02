import { React, Component } from 'react';
import { TxModal } from "./index.js"
import { CircularProgress } from '@material-ui/core'; 
const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };


class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            projectName: '',
            projectDesc: '',
            projectCreator: '',
            group: '',
            groupName: '',
            votes: '',
            minVotes: '',
            enDate: '',
            message: '',
            userVotes: '',
            quadraticVotes: '0',
            modal: false,
            tx: '0',
            status: 'transactionHash',
        }
    }


    componentDidMount = async () => {
        let project = await this.props.address;
        let projectName = await this.props.project.methods.getName(project).call();
        let projectDesc = await this.props.project.methods.getDesc(project).call();
        let projectCreator = await this.props.project.methods.getCreator(project).call();
        let group = await this.props.project.methods.getGroup(project).call();
        let groupName = await this.props.group.methods.getName(group).call();
        let votes = await this.props.vote.methods.balanceOf(project).call();
        let minVotes = await this.props.project.methods.getMinVotes(project).call();
        let endDate = await this.props.project.methods.getEndDate(project).call();
        let userVotes = await this.props.store.methods.getVoteHistory(project, this.props.account).call();
        let quadraticVotes = Math.pow(parseInt(userVotes)+1,2)
        this.setState({
            "project": project,
            "projectName": projectName,
            "projectDesc": projectDesc,
            "projectCreator": projectCreator,
            "group": group,
            "groupName": groupName,
            "votes": votes,
            "minVotes": minVotes,
            "endDate": endDate,
            "userVotes": userVotes,
            "quadraticVotes": quadraticVotes,
        })
    }

    handleSubmit = async () => {
        this.setState({modal: true})
        await this.props.manager.methods.voteForProject(this.state.project, this.state.quadraticVotes).send({ from: this.props.account })
        .on('transactionHash', (hash) => {
            console.log("tx Hash: "+hash)
            this.setState({status: "transactionHash", tx: hash})
        })
        .on('receipt', (receipt) => {
            console.log("receipt: " +receipt)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log("confirmation number: "+confirmationNumber)
            this.setState({status: "confirmation"})
        })
        .on('error', (error, receipt) => {
            console.log("error: "+error)
            this.setState({status: "error"})
        });
    }

    closeModal = () => {
        this.setState({modal: false})
    }

    render() {

        if ( this.state.project === '') {
            return <CircularProgress /> 
        }
        return (
            <div className="projects">
                <div>
                    Name: {this.state.projectName} <br />
                        Address:  {this.state.project} <br />
                        Description:  {this.state.projectDesc} <br />
                        Creator:  {this.state.projectCreator} <br />
                        Group:  {this.state.groupName} <br />
                        Min Votes:  {this.state.minVotes} <br />
                        Actual Votes:  {this.state.votes} <br />
                        End Date:  {new Date(this.state.endDate * 1000).toLocaleDateString('de-DE', dateOptions)} <br />
                    You voted {this.state.userVotes} times for this project. <br /> 
                    Vote now: {this.state.quadraticVotes} votes <button onClick={this.handleSubmit}>vote</button> <br />
                    {this.state.message}
                </div>
                <TxModal open={this.state.modal} status={this.state.status} tx={this.state.tx} show={this.props.show} onClose={this.closeModal}/>
            </div>
        )
    }
}

export default Project;
import { React, Component } from 'react';
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
            enDate: ''
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
        let userVotes = await this.props.store.methods.getVoteHistory(project, this.props.account);

        this.setState({
            project,
            projectName,
            projectDesc,
            projectCreator,
            group,
            groupName,
            votes,
            minVotes,
            endDate
        })
    }

    handleChange = () => {

    }

    handleSubmit = () => {

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
                    Vote: <input
                        name="vote"
                        type="text"
                        onChange={this.handleChange} />
                    <button onClick={this.handleSubmit} disabled={!this.state.button}>coming soon...</button> <br />
                </div>
            </div>
        )
    }
}

export default Project;
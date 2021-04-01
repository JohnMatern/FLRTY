import { React, Component } from 'react';
const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };

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
        let projectDesc  = await this.props.project.methods.getDesc(project).call();
        let projectCreator  = await this.props.project.methods.getCreator(project).call();
        let group = await this.props.project.methods.getGroup(project).call();
        let groupName = await this.props.group.methods.getName(group).call();
        let votes = await this.props.vote.methods.balanceOf(project).call();
        let minVotes = await this.props.project.methods.getMinVotes(project).call();
        let endDate = await this.props.project.methods.getEndDate(project).call();

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

    render() {
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
                        End Date:  {new Date(this.state.endDate*1000).toLocaleDateString('de-DE', dateOptions)} <br />
                    </div>
                </div>
            )
    }
}

export default Project;
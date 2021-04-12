import { React, Component } from 'react';
import { TxModal } from "./index.js"
class NewProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            desc: "",
            minVotes: "",
            group: "",
            weeks: "",
            messageSend: "",
            modal: false,
            tx: '0',
            status: 'transactionHash',
            button: false,
            mygroups: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange = async (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value.toLowerCase(),
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ modal: true })
        this.send();
    }
    handleGroupSelect(e) {
        console.log("Group: ")
        console.log(e.target.value)
    }

    send = async () => {
        this.props.manager.methods.createProject(
            this.state.name,
            this.state.desc,
            this.state.minVotes,
            this.state.group,
            this.state.week
        ).send({ from: this.props.account })
            .on('transactionHash', (hash) => {
                console.log("tx Hash: " + hash)
                this.setState({ status: "transactionHash", tx: hash })
            })
            .on('receipt', (receipt) => {
                console.log("receipt: " + receipt)
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                console.log("confirmation number: " + confirmationNumber)
                this.setState({ status: "confirmation" })
            })
            .on('error', (error, receipt) => {
                console.log("error: " + error)
                this.setState({ status: "error" })
            });
    }

    componentDidMount = async () => {
        console.log("component did mount")
        let groups = await this.props.store.methods.getUserGroups(this.props.account).call();
        groups = groups.filter(address => address != "0x0000000000000000000000000000000000000000")
        console.log(groups)

        this.setState({
            mygroups: groups, groupList: await groups.map(async (g) => {
                let name = await this.props.group.methods.getName(g).call();
                return (
                    <option value={g}>{await this.props.group.methods.getName(g).call()}</option>
                )
            })
        })

    }
    closeModal = () => {
        this.setState({ modal: false })
        this.props.show("MyProjects");
    }

    // name
    // beschreibung
    //min votes
    // address gruppe
    // 1 week

    render() {
        const { mygroups, groupList } = this.state;
        console.log("my groups")
        console.log(mygroups)
        console.log("grouplist")
        console.log(this.state.groupList)
        return (
            <div className="newProject">
                <h1>Add new Project</h1> <br />
                <label>Name: </label>
                <input
                    name="name"
                    type="text"
                    onChange={this.handleChange}
                /> <br />
                <label>Description: </label>
                <input
                    name="desc"
                    type="text"
                    onChange={this.handleChange}
                /><br />
                <label>min Votes: </label>
                <input
                    name="minVotes"
                    type="text"
                    onChange={this.handleChange}
                /><br />
                <label>Group: </label>
                <select name="Group" onChange={this.handleGroupSelect}>

                </select>
                <br />
                <label>Weeks: </label>
                <input
                    name="weeks"
                    type="text"
                    onChange={this.handleChange}
                /><br />

                <p>{this.state.messageUsername}</p>
                <button onClick={this.handleSubmit} disabled={!this.state.button}>Submit</button> <br />
                <p>{this.state.messageSend}</p>
                <TxModal open={this.state.modal} status={this.state.status} tx={this.state.tx} show={this.props.show} onClose={this.closeModal} />
            </div>
        )
    }
}

export default NewProject;
import { React, Component } from 'react';
import { TxModal } from "../component/index.js"
class AddUsername extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            messageUsername: "",
            messageSend: "",
            modal: false,
            tx: '0',
            status: 'transactionHash',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange = async (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });

        if (this.props.userdataContract.methods.getAddress(value.toLowerCase()).call() === "0x0000000000000000000000000000000000000000") {
            this.setState({ messageUsername: "Username already exist" })
        } else {
            this.setState({ messageUsername: "", messageSend: "" })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.messageUsername === "" && this.state.username !== "") {
            this.setState({modal: true})
            this.send();
        } else {
            this.setState({ messageUsername: "Please change username" })
        }

    }

    send = async () => {
        this.props.userdataContract.methods.setName(this.state.username).send({ from: this.props.account })
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
        if (this.props.status == "error") {
            console.log("close un")
            this.props.show("AddUsername");
        } else {
            console.log("close pl")
            this.props.show("Projectlist");        // <------ das funktioniert nicht, why????? im Login component funktioniert das top :(
        }
    }

    render() {
        return (
            <div className="whitelist">
                <h1>Please register Username :)</h1> <br />
                <input
                    name="username"
                    type="text"
                    onChange={this.handleChange}
                />
                <p>{this.state.messageUsername}</p>
                <button onClick={this.handleSubmit}>Submit</button>
                <p>{this.state.messageSend}</p>
                <TxModal open={this.state.modal} status={this.state.status} tx={this.state.tx} show={this.props.show} onClose={this.closeModal}/>
            </div>
        )
    }
}

export default AddUsername;
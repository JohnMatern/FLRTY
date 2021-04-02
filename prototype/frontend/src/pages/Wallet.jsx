import { React, Component } from 'react';
import { Container, Grid } from '@material-ui/core'; 
import { Send, Receive } from '../component/index'
import { TitleSharp } from '@material-ui/icons';


class Wallet extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            account: '', 
            username: '', 
            moki: '', 
            vote: '', 
            isUser: '', 
        }

        this.loadData = this.loadData.bind(this); 
    }

    componentDidMount () {
        this.loadData(); 
    }

    loadData = async () => {
        this.setState({
            account: await this.props.account, 
            username: await this.props.username, 
            moki: await this.props.moki, 
            vote: await this.props.vote, 
            isUser: await this.props.isUser, 

        })
    }

    render() {
        console.log('inside render')
        console.log(this.state.account)
        return (
            <div className="wallet">
                <h1>Wallet</h1>
                {this.state.isUser &&
                    <Container className="walletDetails">

                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                Account: 
                            </Grid>
                            <Grid item xs={4}>
                                {this.state.account}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                User: 
                            </Grid>
                            <Grid item xs={4}>
                                {this.state.username}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                Moki: 
                            </Grid>
                            <Grid item xs={4}>
                                {this.state.moki}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                Vote: 
                            </Grid>
                            <Grid item xs={4}>
                                {this.state.vote}
                            </Grid>
                        </Grid>

                    </Container>}
                    
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Send /> 
                        </Grid>

                        <Grid item xs={6}>
                            <Receive account={this.props.account} /> 
                        </Grid>

                    </Grid>
                
            </div>
        )
    }
}

export default Wallet;
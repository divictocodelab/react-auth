import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { userActions } from '../../_actions';
import Modal from '../Modal';

class UserList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            loading: false,
        };

        this.state = {
            person: [],
            isOpen: false,
            loading: false,
            success: false
        };
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    approveModal = () => {
        this.setState({ loading: true });
        setTimeout(() => this.setState({
            loading: false,
            success: true
        }), 1000)
        setTimeout(() => this.setState({
            isOpen: false
        }), 3000)
    };

    render() {
        const { users } = this.props;
        const { loading, success } = this.state;
        let persons;
        if (users.items) {
            persons = users.items.map((item, i) => (
                <tr key={i}>
                    <th scope="row"> {item.id} </th>
                    <td> {item.name} </td>
                    <td> {item.email} </td>
                    <td> <button onClick={this.toggleModal}>Delete</button> </td>
                </tr>
            ));
        }
        return (
            <div>
                <Link to="/add">
                    <Button outline color="primary">
                        <p> Add User </p>
                    </Button>
                </Link>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons}
                    </tbody>
                </Table >
                <Modal show={this.state.isOpen} onApprove={this.approveModal} onClose={this.toggleModal}>
                    {loading && "Loading..."}
                    {success && "Success (make me green)"}
                    {!success && !loading && "Here's some text for the modal"}
                </Modal>
            </div >

        );
    }
}

function mapStateToProps(state) {
    const { users } = state;
    return {
        users
    };
}

const UserListComponent = connect(mapStateToProps)(UserList);
export default UserListComponent;
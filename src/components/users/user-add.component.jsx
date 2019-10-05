import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { userActions } from '../../_actions';

class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            phone_number: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, name, phone_number } = this.state;
        const { dispatch } = this.props;
        if (name && email && phone_number) {
            dispatch(userActions.addUser({ email, name, phone_number }));
        }
    }

    render() {
        const { name, email, phone_number, submitted } = this.state;

        return (
            <Container>
                <p> Add User</p>
                <Row>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="exampleEmail" hidden>Name</Label>
                            <Input type="text" name="name" value={name} onChange={ this.handleChange } id="exampleEmail" placeholder="Name" />
                        </FormGroup>
                        {submitted && !name && <div>
                            Name is required.
                        </div>}
                        <FormGroup>
                            <Label for="exampleEmail" hidden>Email</Label>
                            <Input type="text" name="email" value={email} onChange={ this.handleChange} id="exampleEmail" placeholder="Email" />
                        </FormGroup>
                        {submitted && !email && <div>
                            Email is required.
                        </div>}
                        <FormGroup>
                            <Label for="examplePassword" hidden>Password</Label>
                            <Input type="text" name="phone_number" value={phone_number} onChange={this.handleChange} id="examplePassword" placeholder="Phone Number" />
                            {submitted && !phone_number && <div>
                                Phone number is required.
                            </div>}
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const { users } = state;
    return {
        users
    };
}

const UserAddComponent = connect(mapStateToProps)(UserAdd);
export default UserAddComponent;
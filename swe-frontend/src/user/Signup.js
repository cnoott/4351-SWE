import React, { useState} from 'react'; 
import Layout from '../shared/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { signUp, authenticate } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name:'',
        email: '',
        password: '',
        address: '',
        billingAddress: '',
        preferredDinerNum: '',
        preferredPayment: ''
    });

    const { name, email, address, billingAddress, preferredDinerNum, preferredPayment, password } = values;

    const [checked, setChecked] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = name => e => {
        let value;
        if (name === 'preferredPayment')
            value = e;
        else
            value = e.target.value;
        
        console.log(value);
        setValues({...values, [name]: value});
    };
    
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        setError('');

        signUp(values).then(response => {
            if (response.error) {
                setError(response.error);
                return;
            }
            else {
                authenticate(response, () => {
                    navigate('/', { replace: true });
                });
            }


            console.log(JSON.stringify(response));
        });
    };

    const handleCheckbox = () => {
        if (checked) 
            setValues({...values, 'billingAddress': ''});
        else 
            setValues({...values, 'billingAddress': address});
        

        setChecked(!checked);
    };



    return(
        <Layout>
            <Container>
                { error &&
                <Alert variant='danger'>
                    {error}
                </Alert>
                }
                <Form className=''>
                    <Form.Group className = "mb-3" controlId = "formGroupName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="name" 
                            placeholder="Enter Name" 
                            value={name}
                            onChange={handleChange('name')}
                        />
                    </Form.Group>
                    <Form.Group className = "mb-3" controlId = "formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={handleChange('email')}
                        />
                    </Form.Group>

                    <Form.Group className = "mb-3" controlId = "formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password}
                            onChange={handleChange('password')}
                        />
                    </Form.Group>

                    <Form.Group className = "mb-3" controlId = "formGroupAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                            type="address" 
                            placeholder="Enter address" 
                            value={address}
                            onChange={handleChange('address')}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupBillingAddress">
                        <Form.Label>Billing Address</Form.Label>
                        <Form.Control 
                            type="address" 
                            placeholder="Enter billing address" 
                            value={billingAddress}
                            onChange={handleChange('billingAddress')}
                        />
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Same as above" onClick={handleCheckbox}/>
      </Form.Group>
                    </Form.Group>
                    <Form.Group className = "mb-3" controlId = "formGroupNumber">
                        <Form.Label>Preferred Diner Number</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter number" 
                            value={preferredDinerNum}
                            onChange={handleChange('preferredDinerNum')}
                        />
                    </Form.Group>
                    <Form.Group className = "mb-3" controlId = "formGroupPreferredPayment">
                        <Form.Label>Preferred Payment Method</Form.Label>
                        <Dropdown onSelect={handleChange('preferredPayment')}>
                            <Dropdown.Toggle variant='secondary'>
                                Please select preferred payment method
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey={'cash'}>
                                    Cash
                                </Dropdown.Item>
                                <Dropdown.Item eventKey={'credit'}>
                                    Credit
                                </Dropdown.Item>
                                <Dropdown.Item eventKey={'check'}>
                                    Check
                                </Dropdown.Item>
                            </Dropdown.Menu>
                            <p> Selected Method: <strong>{preferredPayment}</strong> </p>
                        </Dropdown>
                    </Form.Group>

                    <Button 
                        variant='primary'
                        onClick={handleSubmit}
                    > 
                        Sign Up
                    </Button>
                </Form>
            </Container>
        </Layout>
    );
};

export default Signup;

import { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import useProducts from '../../hooks/useProducts'
import { validateProduct } from '../../utils/validation';
const AddProduct = () => {
  const { handleAddProduct, error } = useProducts();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');

  const handleClose = () => {
    setShow(false);
    setFormError('');
    setSuccess('');
    setName('');
    setPrice('');
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccess('');

    const product = { name, price: parseFloat(price) };
    const validationError = validateProduct(product);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      await handleAddProduct(product);
      setSuccess('Product added successfully');
      handleClose();
    } catch {
      setFormError('Error adding product');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName" className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice" className="mb-3">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProduct;
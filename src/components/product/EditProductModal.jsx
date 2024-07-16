import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import useProducts from '../../hooks/useProducts'
import { validateProduct } from '../../utils/validation';
const EditProductModal = ({ show, onHide, product }) => {
  const { handleUpdateProduct, error } = useProducts();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const updatedProduct = { id: product.id, name, price: parseFloat(price) };
    const validationError = validateProduct(updatedProduct);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      await handleUpdateProduct(product.id, updatedProduct);
      onHide();
    } catch {
      setFormError('Error updating product');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formError && <Alert variant="danger">{formError}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProductName" className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice" className="mb-3">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
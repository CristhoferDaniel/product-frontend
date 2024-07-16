

import { Table, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import AddProduct from './components/product/addProduct';
import useProducts from './hooks/useProducts';
import { useState } from 'react';

import EditProductModal from '../src/components/product/EditProductModal';

const App = () => {
    const { products, error, handleDeleteProduct } = useProducts(); // Obtener productos directamente desde useProducts
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleDelete = async (id) => {
        await handleDeleteProduct(id);
          };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h1>Product Management</h1>
                </Col>
                <Col className="text-end">
                    <AddProduct />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Container className="mt-5">
                        <Row className="justify-content-md-center">
                            <Col md={12}>
                                <h2>Product List</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Table striped bordered hover className="shadow-sm">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <Button
                                                        variant="warning"
                                                        className="me-2"
                                                        onClick={() => handleEdit(product)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDelete(product.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                {selectedProduct && (
                                    <EditProductModal
                                        show={showEditModal}
                                        onHide={() => setShowEditModal(false)}
                                        product={selectedProduct}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default App;
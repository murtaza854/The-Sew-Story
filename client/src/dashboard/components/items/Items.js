import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { arrayBufferToBase64 } from '../../../helperFunctions/arrayBufferToBase64';
import './Items.scss'
import { AiOutlineDelete } from 'react-icons/ai';
import api from '../../../api';
import { Heading } from '../../../components';
// import { BiPencil } from 'react-icons/bi';

function Items(props) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const rowsTemp = [];
        try {
            props.productsServices.forEach(element => {
                const base64Flag = `data:${element.image.contentType};base64,`;
                const imagePath = base64Flag + arrayBufferToBase64(element.image.data.data);
                rowsTemp.push({
                    fileName: element.fileName,
                    image: <img
                        src={imagePath}
                        alt={element.fileName}
                    />,
                    name: element.name,
                    price: `PKR ${element.price}/-`,
                    action: <>
                        {/* <div onClick={_ => performAction(element.fileName, 'edit')} className="delete-icon">
                            <BiPencil className="icon" />
                        </div> */}
                        <div onClick={_ => performAction(element.fileName)} className="delete-icon">
                            <AiOutlineDelete className="icon" />
                        </div>
                    </>,
                    _id: element._id
                });
            });
            setRows(rowsTemp);
        } catch (error) {
            setRows(rowsTemp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const performAction = async fileName => {
        const rowsTemp = [];
        const response = await fetch(`${api}/startup/delete-product-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            withCredentials: true,
            body: JSON.stringify({ fileName })
        });
        const content = await response.json();
        if (content.data) {
            content.productsServices.forEach(element => {
                const base64Flag = `data:${element.image.contentType};base64,`;
                const imagePath = base64Flag + arrayBufferToBase64(element.image.data.data);
                rowsTemp.push({
                    fileName: element.fileName,
                    image: <img
                        src={imagePath}
                        alt={element.fileName}
                    />,
                    name: element.name,
                    price: `PKR ${element.price}/-`,
                    action: <>
                        {/* <div onClick={_ => performAction(element.fileName, 'edit')} className="delete-icon">
                            <BiPencil className="icon" />
                        </div> */}
                        <div onClick={_ => performAction(element.fileName)} className="delete-icon">
                            <AiOutlineDelete className="icon" />
                        </div>
                    </>,
                    _id: element._id
                });
            });
            setRows(rowsTemp);
        }
    };

    const data = {
        columns: [
            {
                label: 'Image',
                field: 'image',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Price',
                field: 'price',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 50
            },
        ],
        // rows: [
        //     {
        //         name: 'Tiger Nixon',
        //         position: 'System Architect',
        //         office: 'Edinburgh',
        //     },
        // ]
        rows: rows
    };
    return (
        <Container className="dashboard-about box-shadow-dashboard gallery" fluid>
            <Row>
                <Col>
                    <Heading
                        text="Orders"
                        classes="text-left"
                    />
                </Col>
                <Col>
                    <Row>
                        <Link className="icon-link" to="/dashboard/account/items/add">
                            <IoIosAddCircleOutline className="icon" />
                        </Link>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Form className="form-style margin-global-top-1">
                    <MDBDataTable
                        // striped
                        // bordered
                        // small
                        responsiveLg={true}
                        pagesAmount={8}
                        data={data}
                        fixed={true}
                    />
                </Form>
            </Row>
        </Container>
    );
}

export default Items;
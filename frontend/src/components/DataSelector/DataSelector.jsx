import { DatePicker, Space, Checkbox, Row, Col, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;

const DataSelector = () => {
    const [types, setTypes] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [request, setRequest] = useState({});

    useEffect(() => {
        setRequest(prev => ({...prev, types: types}));
    }, [types]);

    const disabledDate = (current) => {
        return current && current > moment().endOf('day');
    };

    console.log(request);

    const timeOnChange = (e) => {
        setRequest(prev => ({...prev, dateStart: e[0].format('DD/MM/YYYY'), dateEnd: e[1].format('DD/MM/YYYY')}));
    }

    const onSelectionChange = (e) => {
        setTypes(e);
    }

    const onCheckAll = (e) => {
        if (!!!checkAll) {
            setTypes([
                "cloud",
                "renewable",
                "electricity",
                "employee",
                "floor",
                "org"
            ])
            setCheckAll(true);
        } else {
            setTypes([]);
            setCheckAll(false);
        }
    }


    return (
        <Space direction="vertical" size={12}>
            <h1 style={{ color:'#4D7393' }}>Data Extractor</h1>
            <RangePicker onChange={timeOnChange} disabledDate={disabledDate} />
            <Checkbox.Group style={{ width: '100%' }} onChange={onSelectionChange} value={types}>
                <Row>
                    <Col span={16}>
                        <Checkbox value="org">Organisation name</Checkbox>
                    </Col>
                    <Col span={16}>
                        <Checkbox value="employee">Employee</Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <Checkbox value="floor">Floor area</Checkbox>
                    </Col>
                    <Col span={16}>
                        <Checkbox value="electricity">Electricity consumption</Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <Checkbox value="renewable">Electricity source renewability</Checkbox>
                    </Col>
                    <Col span={16}>
                        <Checkbox value="cloud">Cloud service</Checkbox>
                    </Col>
                </Row>
            </Checkbox.Group>
            <Checkbox onChange={onCheckAll} checked={checkAll}>Check All</Checkbox>
            <Button>Submit</Button>
        </Space>
    )
}

export default DataSelector
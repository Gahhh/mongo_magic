import { DatePicker, Space, Checkbox, Row, Col, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getAnalysis } from '../../utils/requests';

const { RangePicker } = DatePicker;

const DataSelector = (props) => {
    const [types, setTypes] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [request, setRequest] = useState({});
    const [gettingData, setGettingData] = useState(false);

    useEffect(() => {
        setRequest(prev => ({...prev, types: types}));
    }, [types]);

    const disabledDate = (current) => {
        return current && current > moment().endOf('day');
    };


    const timeOnChange = (e) => {
        setRequest(prev => ({...prev, dateStart: e[0].format('DD/MM/YYYY'), dateEnd: e[1].format('DD/MM/YYYY')}));
    }

    const onSelectionChange = (e) => {
        setTypes(e);
    }

    const onCheckAll = (e) => {
        if (!!!checkAll) {
            setTypes([
                "co2e",
                "cloud_percentage",
                "is_cloud",
                "electricity",
                "floor_area",
                "employee",
                "is_green_star"
            ])
            setCheckAll(true);
        } else {
            setTypes([]);
            setCheckAll(false);
        }
    }

    const getData = () => { 
        getAnalysis(request).then(res=>{
            if (res.status === 200) {
                setGettingData(false);
                res.json().then(data=>{
                    window.open(data.url, '_self', 'toolbar=0,location=0,menubar=0');
                })
            }
        })
    }


    return (
        <Space direction="vertical" size={12}>
            <h1 style={{ color:'#4D7393' }}>Data Extractor</h1>
            <RangePicker onChange={timeOnChange} disabledDate={disabledDate} />
            <Checkbox.Group style={{ width: '100%' }} onChange={onSelectionChange} value={types}>
                <Row>
                    <Col span={16}>
                        <Checkbox value="is_green_star">Green Star Rating</Checkbox>
                    </Col>
                    <Col span={16}>
                        <Checkbox value="employee">Employee</Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <Checkbox value="floor_area">Floor area</Checkbox>
                    </Col>
                    <Col span={16}>
                        <Checkbox value="electricity">Electricity consumption</Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <Checkbox value="is_cloud">Cloud deployment</Checkbox>
                    </Col>
                    <Col span={16}>
                        <Checkbox value="cloud_percentage">Cloud percentage</Checkbox>
                    </Col>
                    <Col span={16}>
                        <Checkbox value="co2e">CO<sub>2</sub>e</Checkbox>
                    </Col>
                </Row>
            </Checkbox.Group>
            <Checkbox onChange={onCheckAll} checked={checkAll}>Check All</Checkbox>
            <Button onClick={getData} disabled={!(request.dateStart && request.dateEnd) || request.types?.length === 0}>Download</Button>
        </Space>
    )
}

export default DataSelector
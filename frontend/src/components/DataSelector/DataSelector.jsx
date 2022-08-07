import { DatePicker, Space } from 'antd';
import React from 'react';

const { RangePicker } = DatePicker;

const DataSelector = () => {
    return (
        <Space direction="vertical" size={12}>
            {/* <RangePicker /> */}
            <RangePicker showTime />
        </Space>
    )
}

export default DataSelector
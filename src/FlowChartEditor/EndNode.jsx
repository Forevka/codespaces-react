import React, { memo } from 'react';
import { Position } from 'reactflow';
import OneToOneHandle from './OneToOneHandle';

const EndNode = () => {
    return (
        <div style={{ background: 'white', padding: 16, border: '1px solid black' }}>
            <OneToOneHandle type="target" 
                id="targetEnd" position={Position.Left} isConnectable={1} />
            <div>End</div>
        </div>
    );
};

export default memo(EndNode);
